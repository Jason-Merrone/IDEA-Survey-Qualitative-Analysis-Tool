import { NextResponse } from 'next/server';

import { destroyUserSession } from '~/actions/session';

export async function GET() {
    await destroyUserSession();

    return NextResponse.redirect('http://localhost:3000');
}
