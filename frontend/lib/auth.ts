import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'Enter email' },
        password: { label: 'password', type: 'password', placeholder: 'Enter password' },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const { email, password } = credentials;

          if (!email || !password) {
            throw new Error("Email and Password is required");
          }

          const response = await axios.post(`${backendUrl}/api/signin`, {
            email,
            password,
          });
          return response.data.basics;
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Include user information in the token
      if (user) {
        token.id = user.id;
        token.email = user.email; // Include any other user details you need
      }
      return token;
    },
    async session({ session, token }) {
      // Include token information in the session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email; // Ensure session includes necessary user info
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
