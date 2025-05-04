"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { cookies } from "next/headers";

export async function handleSignIn(email: string, password: string) {
  try {
    // Sanitize email
    const sanitizedEmail = email.toLowerCase().trim();

    const result = await signIn("credentials", {
      email: sanitizedEmail,
      password,
      redirect: false, // Important: set to false to handle redirect manually
    });

    // Check for authentication result
    if (!result) {
      return {
        success: false,
        error: "Authentication failed",
      };
    }

    // Check for error in result
    if (result.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    // Success case
    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Sign in error:", error);

    // Handle specific AuthError cases
    if (error instanceof AuthError) {
      return {
        success: false,
        error: "Invalid credentials",
      };
    }

    // Generic error case
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}

export async function handleSignInWithGoogle() {
  await signIn("google");
}
