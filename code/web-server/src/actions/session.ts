"use server"
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

import { type SessionData, sessionOptions } from "../app/api/lib";

export async function getUserSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn) {
        return null;
    }

    return session;
}

export async function createUserSession(sessionData: SessionData) {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    session.aNumber = sessionData.aNumber;
    session.name = sessionData.name;
    session.preferredName = sessionData.preferredName;
    session.email = sessionData.email;
    session.role = sessionData.role;
    session.isLoggedIn = true;

    await session.save();
}

export async function destroyUserSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.destroy();
}