/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

import { type SessionData, sessionOptions } from "../lib";

import { checkUserExists, getUser } from '~/server/db/queries/get';
import { createUser } from '~/server/db/queries/create';

import { env } from 'process';

export async function POST(req: Request) {
    if (req.headers.get('content-type') !== 'application/json') {
        return NextResponse.json({ message: 'Invalid content type' }, { status: 400 });
    }

    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    try {
        const samlResponse = await req.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result: Record<string, any> = {};

        samlResponse['samlp:Response'].Assertion[0].AttributeStatement[0].Attribute.forEach(attr => {
            const name = attr.$.Name;
            const values = attr.AttributeValue;
            
            result[name] = values;
        });

        const identityRole = ["STUDENT", "STAFF", "SR_STUDENT_STAFF", "FACULTY"];
        const filteredRoles = result.memberOf.filter(role => identityRole.some(keyword => role.includes(keyword)));

        session.aNumber = result.cn[0];
        session.name = result.displayName[0];
        session.preferredName = result.eduPersonNickname[0];
        session.email = result.usuEmailIDAddress[0];
        if (env.DEMO === 'true') {
            session.role = 'FACULTY';
        }
        else {
            session.role = filteredRoles[0];
        }
        session.isLoggedIn = true;        

        const userExists = await checkUserExists(session.aNumber);
        if (!userExists.data?.exists) {
            const response = await createUser(session.aNumber, session.name, session.preferredName, session.email, session.role);
            console.log("Created User:", response);
        }

        // In the future, we will want to update any exisiting user data with the latest information from the SSO

        await session.save();
        
        return NextResponse.json(session);
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const ssoUrl = 'https://localhost:8000';
    const redirect = req.headers.get('referer') ?? 'http://localhost:3000';
    const returnUrl = 'http://localhost:3000/api/sso';

    const redirectUrl = `${ssoUrl}/login?redirect=${encodeURIComponent(redirect)}&returnUrl=${encodeURIComponent(returnUrl)}`;

    return NextResponse.redirect(redirectUrl);
}