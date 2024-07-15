import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      user: {
        email?: string;
      };
      accessToken?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id?: string;
    user: {
      email?: string;
    };
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    email?: string;
    accessToken?: string;
  }
}
