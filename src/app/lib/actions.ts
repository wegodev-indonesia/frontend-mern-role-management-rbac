"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export interface customError extends AuthError {
  cause: {
    err: {
      message: string;
    };
  };
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      return (
        (error as customError).cause?.err?.message || "Something went wrong."
      );
    }

    throw error;
  }
}
