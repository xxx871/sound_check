import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const response = await fetch("http://host.docker.internal:3000/api/v1/auth/oauth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user, profile }),
        });

        if (response.ok) {
          const token = response.headers.get('access-token');
          const client = response.headers.get('client');
          const uid = response.headers.get('uid');

          if (token && client && uid) {
            cookies().set('uid', uid);
            cookies().set('client', client);
            cookies().set('access-token', token);
            return true;
          } else {
            console.error("Failed to retrieve tokens from response headers");
            return false;
          }
        } else {
          console.error("Failed log in");
          return false;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    // async session({ session, user }) {
    //   session.user = user;
    //   return session;
    // },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};