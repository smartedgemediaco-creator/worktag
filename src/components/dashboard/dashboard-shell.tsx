"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { WorkTagMark } from "@/components/landing/worktag-logo";
import { signOutAction } from "@/app/dashboard/actions";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  UserRound,
  QrCode,
  BarChart3,
  LogOut,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile", href: "/dashboard/profile", icon: UserRound },
  { label: "QR Code", href: "/dashboard/qr", icon: QrCode },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
] as const;

const TITLES: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Overview", subtitle: "Your business at a glance" },
  "/dashboard/profile": { title: "Profile", subtitle: "Manage your public WorkTag profile" },
  "/dashboard/qr": { title: "QR Code", subtitle: "Your scannable WorkTag" },
  "/dashboard/analytics": { title: "Analytics", subtitle: "See how customers discover you" },
};

type ShellUser = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type ShellProfile = {
  username?: string | null;
  businessName?: string | null;
  isPublished?: boolean;
};

type Props = {
  user: ShellUser;
  profile: ShellProfile | null;
  children: React.ReactNode;
};

function SidebarContent({
  pathname,
  user,
  onNavigate,
}: {
  pathname: string;
  user: ShellUser;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pt-7 pb-6">
        <Link href="/" onClick={onNavigate} className="group flex items-center gap-2.5">
          <WorkTagMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-[15px] font-bold tracking-tight leading-tight text-white">
              WorkTag
            </span>
            <span className="text-[7px] font-bold tracking-[0.2em] uppercase text-white/40">
              by Afara Digital
            </span>
          </div>
        </Link>
      </div>

      <div className="px-5">
        <span className="px-3 text-[9px] font-bold tracking-[0.22em] uppercase text-white/25">
          Menu
        </span>
      </div>

      <nav className="mt-3 flex-1 space-y-1 px-4">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all duration-300",
                active
                  ? "bg-white/[0.07] text-white"
                  : "text-white/50 hover:bg-white/[0.04] hover:text-white/85"
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active-dot"
                  className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[#FDC304] shadow-[0_0_12px_rgba(253,195,4,0.6)]"
                />
              )}
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300",
                  active
                    ? "bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] text-white shadow-[0_4px_16px_-2px_rgba(2,65,168,0.5)]"
                    : "bg-white/[0.03] text-white/40 group-hover:text-white/70"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 pb-5">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0241A8] via-[#0B2E7A] to-[#1a1f3a] p-5 shadow-[0_16px_40px_-12px_rgba(2,65,168,0.5)]">
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#FDC304]/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-4 h-16 w-16 rounded-full bg-[#3FA9F5]/20 blur-2xl" />
          <div className="relative">
            <span className="inline-flex rounded-lg bg-[#FDC304]/15 p-2 text-[#FDC304]">
              <Sparkles className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[13px] font-bold text-white">WorkTag Pro</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-white/55">
              Unlock verification, premium tags & priority support.
            </p>
            <Link
              href="/#pricing"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#FDC304] px-3.5 py-1.5 text-[11px] font-bold text-[#090D1F] transition-transform duration-300 hover:-translate-y-[1px]"
            >
              Start free trial <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] text-xs font-bold text-white">
              {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "W"}
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#0A0F24] bg-[#10B981]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-bold text-white">
              {user.name ?? "Business Owner"}
            </p>
            <p className="truncate text-[10px] text-white/40">{user.email}</p>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              aria-label="Sign out"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/35 transition-colors duration-300 hover:bg-white/[0.06] hover:text-white"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function DashboardShell({ user, profile, children }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const meta = TITLES[pathname] ?? TITLES["/dashboard"];
  const liveHref = profile?.username ? `/${profile.username}` : "/dashboard/profile";

  return (
    <div className="min-h-screen bg-[#F5F7FC]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] lg:block">
        <div className="relative flex h-full flex-col overflow-hidden bg-[#0A0F24]">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(600px 320px at -10% -10%, rgba(2,65,168,0.45), transparent 60%), radial-gradient(500px 300px at 110% 110%, rgba(63,169,245,0.18), transparent 60%)",
            }}
          />
          <div className="relative flex h-full flex-col">
            <SidebarContent pathname={pathname} user={user} />
          </div>
        </div>
      </aside>

      <div className="lg:pl-[264px]">
        <header className="sticky top-0 z-30 border-b border-[#E8EBF2]/80 bg-[#F5F7FC]/85 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-4 px-5 lg:px-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#E8EBF2] bg-white text-[#0F172A] lg:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-[15px] font-bold leading-tight text-[#090D1F]">
                  {meta.title}
                </h1>
                <p className="hidden text-[11px] text-[#64748B] sm:block">{meta.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={liveHref}
                target={profile?.username ? "_blank" : undefined}
                className="hidden items-center gap-1.5 rounded-full border border-[#E8EBF2] bg-white px-4 py-2 text-[12px] font-semibold text-[#0241A8] transition-all duration-300 hover:border-[#0241A8]/30 hover:shadow-[0_8px_24px_-8px_rgba(2,65,168,0.35)] sm:inline-flex"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                {profile?.username ? "View live profile" : "Set up profile"}
              </Link>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] text-xs font-bold text-white">
                {user.name?.[0]?.toUpperCase() ?? user.email?.[0]?.toUpperCase() ?? "W"}
              </span>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1280px] px-5 py-8 lg:px-10 lg:py-10">{children}</main>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-y-0 left-0 w-[280px] overflow-hidden bg-[#0A0F24]"
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(500px 300px at -10% -10%, rgba(2,65,168,0.45), transparent 60%)",
                }}
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-5 z-10 inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/[0.06] hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative flex h-full flex-col">
                <SidebarContent
                  pathname={pathname}
                  user={user}
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
