import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/home',
    '/readme-builder',
    '/form',
    '/dashboard',
    '/portfolio-builder',
    '/resume-builder',
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token && (url.pathname === '/signin' || url.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!token && url.pathname !== '/signin' && url.pathname !== '/signup') {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}
