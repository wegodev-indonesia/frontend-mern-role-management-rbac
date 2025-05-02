import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axiosClient from "@/app/lib/axiosClient";
import refreshToken from "@/app/lib/refreshToken";

export default {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          //axios
          const res = await axiosClient.post("/login", {
            email,
            password,
          });

          return {
            _id: res.data._id,
            fullname: res.data.fullname,
            roles: res.data.roles,
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            accessTokenExpires: Date.now() + parseInt(res.data.expiresIn),
          };
        } catch (error: any) {
          const message = error.response?.data?.message || "Login gagal";
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //pertama kali login
      if (user) {
        token._id = user._id;
        token.fullname = user.fullname;
        token.roles = user.roles;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      if (Date.now() > (token.accessTokenExpires as number)) {
        // Kalau token sudah expired lakukan refresh token
        return await refreshToken(token);
      } else {
        return token;
      }
    },
    async session({ session, token }) {
      session.user.id = token._id;
      session.user._id = token._id;
      session.user.fullname = token.fullname;
      session.user.roles = token.roles;
      session.user.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
