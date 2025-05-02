"use client";

import Link from "next/link";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form action={formAction} className="space-y-4">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email address"
            required
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            required
            minLength={6}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Login
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
          <Link
            href="/auth/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mt-2 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
