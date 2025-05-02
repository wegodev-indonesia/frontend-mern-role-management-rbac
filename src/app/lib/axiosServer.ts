import axios from "axios";
import { auth } from "@/auth";

interface SessionUser {
  user: {
    _id: string;
    accessToken: string;
  };
}

const axiosServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Setup axios interceptor
axiosServer.interceptors.request.use(
  async (config) => {
    const session = (await auth()) as SessionUser;

    if (session) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosServer;
