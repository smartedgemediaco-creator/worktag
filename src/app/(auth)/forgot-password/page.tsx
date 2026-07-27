"use client";

import { useState } from "react";
import { forgetPassword } from "@/lib/auth-client";
import Link from "next/link";
import { ROUTES } from "@/constants";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: forgotError } = await forgetPassword({ email });

    if (forgotError) {
      setError(forgotError.message ?? "Failed to send reset email");
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="w-full max-w-sm space-y-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
        <p className="text-sm text-gray-500">
          If an account exists for <strong>{email}</strong>, we&apos;ve sent a password reset
          link.
        </p>
        <Link
          href={ROUTES.login}
          className="inline-block text-sm font-semibold text-[#0241A8] hover:underline"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Reset your password</h1>
        <p className="text-sm text-gray-500">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0241A8] focus:outline-none focus:ring-2 focus:ring-[#0241A8]/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#0241A8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0241A8]/90 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500">
        <Link href={ROUTES.login} className="font-semibold text-[#0241A8] hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
