import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    fullname: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }

  interface Session {
    user: DefaultSession["User"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    fullname: string;
    roles: string[];
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
