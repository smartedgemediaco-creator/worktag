"use server";

import { redirect } from "next/navigation";

export async function signOutAction() {
  const { auth } = await import("@/lib/auth");
  const { headers } = await import("next/headers");
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}
