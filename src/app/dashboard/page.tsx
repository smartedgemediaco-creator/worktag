import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/constants";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect(ROUTES.login);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-bold text-[#0A3D91]">WorkTag</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{session.user.email}</span>
            <form action={async () => {
              "use server";
              const { auth } = await import("@/lib/auth");
              await auth.api.signOut({ headers: await import("next/headers").then(h => h.headers()) });
              redirect(ROUTES.login);
            }}>
              <button type="submit" className="text-sm text-gray-500 hover:text-gray-700">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome, {session.user.name ?? "Business Owner"}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your WorkTag profile and trust signals
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold">Your Profile</h3>
            <p className="mt-1 text-sm text-gray-500">Set up your public work profile</p>
            <Link
              href={ROUTES.dashboard + "/profile"}
              className="mt-4 inline-block text-sm font-medium text-[#0A3D91] hover:underline"
            >
              Edit profile &rarr;
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold">QR Code</h3>
            <p className="mt-1 text-sm text-gray-500">Download and share your WorkTag QR</p>
            <Link
              href={ROUTES.dashboard + "/qr"}
              className="mt-4 inline-block text-sm font-medium text-[#0A3D91] hover:underline"
            >
              View QR &rarr;
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="font-semibold">Analytics</h3>
            <p className="mt-1 text-sm text-gray-500">Track profile views and engagement</p>
            <Link
              href={ROUTES.dashboard + "/analytics"}
              className="mt-4 inline-block text-sm font-medium text-[#0A3D91] hover:underline"
            >
              View analytics &rarr;
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
