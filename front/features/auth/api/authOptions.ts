import { axiosInstance } from "@/lib/axios";
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
        const response = await axiosInstance.post(
          "/auth/oauth",
          { user, profile },
          { headers: {
            "Content-Type": "application/json",
          },
          }
        );

        if (response.status === 200) {
          const uid = response.headers['uid'];
          const client = response.headers['client'];
          const token = response.headers['access-token'];
          
          if (uid && client && token) {
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
        console.log(error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};
