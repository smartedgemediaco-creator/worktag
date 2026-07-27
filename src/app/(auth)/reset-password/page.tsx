"use client";

import { useState } from "react";
import { resetPassword } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constants";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setError("Invalid or missing reset token");
      return;
    }
    setError("");
    setLoading(true);

    const { error: resetError } = await resetPassword({ newPassword: password, token });

    if (resetError) {
      setError(resetError.message ?? "Failed to reset password");
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Password updated</h1>
        <p className="text-sm text-gray-500">Your password has been reset successfully.</p>
        <Link
          href={ROUTES.login}
          className="inline-block rounded-lg bg-[#0241A8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0241A8]/90"
        >
          Sign in with new password
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Choose a new password</h1>
        <p className="text-sm text-gray-500">Must be at least 8 characters</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}
        {!token && (
          <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-600">
            Invalid or missing reset token. Request a new password reset link.
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            New password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            required
            minLength={8}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0241A8] focus:outline-none focus:ring-2 focus:ring-[#0241A8]/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !token}
          className="w-full rounded-lg bg-[#0241A8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0241A8]/90 disabled:opacity-50"
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}
