"use server";

import { JWT } from "next-auth/jwt";
import axiosClient from "@/app/lib/axiosClient";

export default async function refreshToken(token: JWT) {
  try {
    const res = await axiosClient.post("/refresh-token", {
      refreshToken: token.refreshToken,
    });

    return {
      ...token,
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
      accessTokenExpires: Date.now() + parseInt(res.data.expiresIn),
    };
  } catch (error) {
    console.error("Refresh token failed:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
