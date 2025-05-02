import axios from "axios";

interface SessionUser {
  user: {
    _id: string;
    accessToken: string;
  };
}

// Buat instance axios
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // ganti sesuai backend kamu
});

// Setup axios interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    //check cuma jalan di client
    if (typeof window !== "undefined") {
      const session = (await fetchSession()) as SessionUser; // Ambil session dari storage/cookie

      if (session) {
        config.headers.Authorization = `Bearer ${session.user.accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

/*
  Helper untuk fetch session (JWT)
  Client component butuh jwt accessToken
*/
async function fetchSession() {
  const res = await fetch("/api/auth/session");
  return res.json();
}
