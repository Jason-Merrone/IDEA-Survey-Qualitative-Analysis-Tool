import { type SessionOptions } from 'iron-session';

export interface SessionData {
    aNumber: string;
    name: string;
    preferredName: string;
    email: string;
    role: string;
    isLoggedIn: boolean;
};

export const defaultSession: SessionData = {
    aNumber: "",
    name: "",
    preferredName: "",
    email: "",
    role: "",
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: "reallylongrandomstringherebecause32charactersisrequiredforsomereason",
    cookieName: "idea-ideas",
    cookieOptions: {
        secure: false,
    },
};