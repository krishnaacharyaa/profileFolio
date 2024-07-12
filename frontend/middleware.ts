export { default } from 'next-auth/middleware';
export const config = {
  matcher: [
    '/home',
    '/readme-builder',
    '/form',
    '/dashboard',
    '/portfolio-builder',
    '/resume-builder',
  ],
};
