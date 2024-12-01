/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import React, { useState } from 'react';
import "~/styles/login.css";

import { useRouter } from 'next/navigation';

import { getUser, checkUserExists } from '~/server/db/queries/get';
import { createUserSession } from '~/actions/session';
import { type SessionData } from '~/app/api/lib';

const Login = () => {
    const router = useRouter();
    const [aNumber, setANumber] = useState("");

    async function handleLogin() {
        const userExists = await checkUserExists(aNumber);
        if (!userExists.data?.exists) {
            alert("User does not exist. Please create an account.");
        }
        else {
            const user = (await getUser(aNumber)).data?.user
            if (!user) return
            const sessionData: SessionData = {
                aNumber: user.aNumber,
                name: user.name,
                preferredName: user.preferredName ?? user.name,
                email: user.email,
                role: user.role,
                isLoggedIn: true
            };
            await createUserSession(sessionData);

            router.push('/');
        }
    };

    const handleCreateAccount = () => {
        router.push('/create-account');
    };

    const handleSSOLogin = () => {
        const ssoUrl = 'https://localhost:8000';
        const redirect = 'http://localhost:3000';
        const returnUrl = 'http://localhost:3000/api/sso';

        const redirectUrl = `${ssoUrl}/login?redirect=${encodeURIComponent(redirect)}&returnUrl=${encodeURIComponent(returnUrl)}`;
        router.push(redirectUrl);
    };

    return (
        <div>
            <div className="login-page roboto-regular">
                <div className="login">
                    <label htmlFor="aNumber">Login with A-Number</label>
                    <input
                    type="text"
                    id="aNumber"
                    value={aNumber}
                    onChange={(e) => setANumber(e.target.value)}
                    placeholder="A00000000"
                    />
                </div>

                <button onClick={handleLogin}>Login</button>
            </div>
            <div className='content login-page roboto-regular button-center'>
                <button onClick={handleCreateAccount}>Create Account</button>
                <button onClick={handleSSOLogin}>Sign-in with SSO</button>
            </div>
        </div>
    );
};

export default Login;
