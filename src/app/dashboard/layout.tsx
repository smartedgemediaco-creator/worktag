import { getSession } from "@/lib/auth-utils";
import { getProfileByUserId } from "@/server/services/profile-service";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect(ROUTES.login);
  }

  const profile = await getProfileByUserId(session.user.id).catch(() => null);

  return (
    <DashboardShell
      user={session.user}
      profile={
        profile
          ? {
              username: profile.username,
              businessName: profile.businessName,
              isPublished: profile.isPublished,
            }
          : null
      }
    >
      {children}
    </DashboardShell>
  );
}
