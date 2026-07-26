import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, resetPassword } = authClient;

export async function forgetPassword(data: { email: string }) {
  try {
    const res = await fetch("/api/auth/forget-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { error: json.error ?? null, data: json.data ?? null };
  } catch {
    return { error: { message: "Failed to send reset email" }, data: null };
  }
}
