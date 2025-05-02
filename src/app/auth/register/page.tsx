"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterForm() {
  const router = useRouter();
  const callbackUrl = "/login";

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/register", {
        fullname,
        email,
        password,
      });

      // Kalau sukses, redirect
      router.push(callbackUrl);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            id="fullname"
            type="text"
            name="fullname"
            placeholder="Enter your full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <p className="text-sm text-red-500">{errorMessage}</p>
          )}
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
