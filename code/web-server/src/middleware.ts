import { NextResponse } from 'next/server';
import { getUserSession } from './actions/session';
import { env } from 'process';

export async function middleware(request: Request) {
  const session = await getUserSession();

  if (env.DEMO === 'true' || env.NODE_ENV !== 'development') {
    if (!session || !session.isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    { source: '/'},
    { source: '/chat'},
    { source: '/chat/'},
    { source: '/dashboard'},
    { source: '/report'},
    { source: '/settings'}
  ],
};