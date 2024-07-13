import 'next-auth'

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
            email?: string;
        } & DefaultSession['user']
    }

    interface User {
        id?: string;
        email?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        email?: string;
    }
}