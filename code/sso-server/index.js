import https from 'https';
import http from 'http';

import express from 'express';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import passport from 'passport';
import { Strategy as SamlStrategy } from '@node-saml/passport-saml';

import fs from 'fs';
import xml2js from 'xml2js';

import axios from 'axios';

import dotenv from 'dotenv';
dotenv.config();

const HTTPS_PORT = process.env.HTTPS_PORT || 443;
const HTTP_PORT = process.env.HTTP_PORT || 80;


async function fetchAndParseXML() {
    try {
        const response = await axios.get(process.env.SAML_METADATA_URL, { timeout: 5000 });
        const xmlData = response.data;

        const parser = new xml2js.Parser();
        const jsonData = await parser.parseStringPromise(xmlData);

        return jsonData;
    } catch (error) {
        console.error('Error fetching or parsing the XML:', error);
    }
}

let metadata = await fetchAndParseXML();

if (!metadata) {
    console.error('Failed to fetch or parse metadata. Using latest saved metadata.');
    metadata = JSON.parse(fs.readFileSync('idp-metadata.json', 'utf8'));
}
else {
    fs.writeFileSync('idp-metadata.json', JSON.stringify(metadata));
}

const idpCert = metadata.EntityDescriptor.RoleDescriptor[0].KeyDescriptor[0].KeyInfo[0].X509Data[0].X509Certificate[0];
const entryPoint = metadata.EntityDescriptor.IDPSSODescriptor[0].SingleSignOnService[0].$.Location;

// SSL Certificate
let privateKey, certificate;
try {
    privateKey = fs.readFileSync('key.pem', 'utf8');
    certificate = fs.readFileSync('cert.pem', 'utf8');
} catch (err) {
    console.error('Failed to load SSL certificates:', err);
}
const credentials = { key: privateKey, cert: certificate };

const samlConfig = {
    entryPoint: entryPoint,
    issuer: process.env.SAML_ISSUER,
    callbackUrl: process.env.SAML_ACS,
    idpCert: idpCert,
    validateInResponseTo: 'never',
}

const app = express();

if (process.env.HTTP_ONLY === 'false') {
    app.use((req, res, next) => {
        if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
            next();
        }
        else {
            res.redirect(301, `https://${req.headers.host}${req.url}`);
        }
    });
}

app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
    },
}));

app.use(helmet.hsts({
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
}));    

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.HTTP_ONLY === 'false',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'development') {
    const loginLimiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 10,
        message: 'Too many login attempts, please try again later.',
    });
    app.use('/', loginLimiter);
    app.use('/login', loginLimiter);
    app.use('/login/callback', loginLimiter);
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

passport.use(new SamlStrategy(samlConfig, function(profile, done) {
    return done(null, profile);
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/', (req, res) => {
    const serverStatus = {
        status: 'Running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    };

    res.send(`
        <html>
            <head>
                <title>Server Status Dashboard</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #333; }
                    p { font-size: 16px; }
                </style>
            </head>
            <body>
                <h1>Server Status Dashboard</h1>
                <p>Status: ${serverStatus.status}</p>
                <p>Timestamp: ${serverStatus.timestamp}</p>
                <p>Uptime: ${Math.floor(serverStatus.uptime)} seconds</p>
            </body>
        </html>
    `);
});

// Expected Query Strings: { redirect, returnUrl }
// redirect is the URL to return to after successful login
// returnUrl is the URL to send the SAML response to
app.get('/login', (req, res, next) => {
    const redirect = req.query.redirect;
    const returnUrl = req.query.returnUrl;

    if (!redirect || !returnUrl) {
        return res.status(400).json({ error: 'Missing required query strings: redirect and returnUrl' });
    }

    req.session.redirect = redirect;
    req.session.returnUrl = returnUrl;

    passport.authenticate('saml', { passReqToCallback: true, successMessage: true, failureRedirect: redirect })(req, res, next);
});

app.post('/login/callback', async function(req, res) {
    const samlResponse = req.body.SAMLResponse;
    const decodedSamlResponse = Buffer.from(samlResponse, 'base64').toString('utf8');

    const parser = new xml2js.Parser();
    const result = await new Promise((resolve, reject) => {
        parser.parseString(decodedSamlResponse, (err, result) => {
            if (err) {
                console.error('Error parsing XML:', err);
                return reject(new Error('Error parsing XML'));
            }
            resolve(result);
        });
    });

    try {
        const response = await axios.post(req.session.returnUrl, result, {
            headers: {
                'Content-Type': 'application/json',
                timeout: 5000,
            },
        });

        const cookies = response.headers['set-cookie'];

        cookies?.forEach(cookie => {
            res.setHeader('Set-Cookie', cookie);
        });

        const redirectUrl = req.session.redirect;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error(error);
        console.error('Error sending JSON response:', error.message);
        res.status(500).send('Error processing SAML response.');
    }
});

if (process.env.HTTP_ONLY === 'true') {
    const httpServer = http.createServer(credentials, app);

    httpServer.listen(HTTP_PORT, '0.0.0.0', () => {
        console.log(`HTTP Server running on http://${process.env.HOST}:${HTTP_PORT}`);
    });
}
else {
    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(HTTPS_PORT, '0.0.0.0', () => {
        console.log(`HTTPS Server running on https://${process.env.HOST}:${HTTPS_PORT}`);
    });

    const httpServer = http.createServer((req, res) => {
        res.writeHead(301, { 'Location': `https://${process.env.HOST}:${HTTPS_PORT}${req.url}` });
        res.end();
    }).listen(HTTP_PORT, '0.0.0.0', () => {
        console.log(`HTTP Server running on http://${process.env.HOST}:${HTTP_PORT}, redirecting to HTTPS`);
    });
}