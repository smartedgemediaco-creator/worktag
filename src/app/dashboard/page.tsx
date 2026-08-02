"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  UserRound,
  QrCode,
  BarChart3,
  ArrowUpRight,
  BadgeCheck,
  Eye,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { PROFILE_COMPLETION_STEPS } from "@/constants";

type ProfileData = {
  businessName?: string;
  username?: string;
  category?: string;
  completedSteps?: number;
  totalSteps?: number;
  isPublished?: boolean;
};

type AnalyticsData = {
  uniqueVisitors?: number;
  totalScans?: number;
  recentScans?: unknown[];
};

const QUICK_ACTIONS = [
  {
    href: "/dashboard/profile",
    icon: UserRound,
    title: "Edit Profile",
    desc: "Your business details, contact & branding",
    accent: "from-[#0241A8] to-[#3FA9F5]",
  },
  {
    href: "/dashboard/qr",
    icon: QrCode,
    title: "Your QR Code",
    desc: "Download and share your scannable WorkTag",
    accent: "from-[#FDC304] to-[#F59E0B]",
  },
  {
    href: "/dashboard/analytics",
    icon: BarChart3,
    title: "Analytics",
    desc: "Track scans, views and customer actions",
    accent: "from-[#0F172A] to-[#334155]",
  },
];

export default function DashboardOverviewPage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    Promise.allSettled([
      fetch("/api/v1/profiles").then((r) => r.json()),
      fetch("/api/v1/analytics").then((r) => r.json()),
    ]).then(([profileRes, analyticsRes]) => {
      if (profileRes.status === "fulfilled" && profileRes.value.success) {
        setProfile(profileRes.value.data);
      }
      if (analyticsRes.status === "fulfilled" && analyticsRes.value.success) {
        setAnalytics(analyticsRes.value.data);
      }
    });
  }, []);

  const done = Math.min(profile?.completedSteps ?? 0, profile?.totalSteps ?? 10);
  const total = profile?.totalSteps ?? 10;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const name = profile?.businessName ?? "your business";

  const stats = [
    {
      label: "Unique Visitors",
      value: analytics?.uniqueVisitors ?? 0,
      icon: Eye,
      tint: "text-[#0241A8]",
    },
    {
      label: "QR Scans",
      value: analytics?.totalScans ?? 0,
      icon: QrCode,
      tint: "text-[#F59E0B]",
    },
    {
      label: "Setup Complete",
      value: `${pct}%`,
      icon: BadgeCheck,
      tint: "text-[#10B981]",
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-2xl font-bold tracking-tight text-[#090D1F] lg:text-3xl">
          Welcome back,{" "}
          <span className="text-gradient-blue">{profile?.businessName ?? "business owner"}</span>
        </h2>
        <p className="text-sm text-[#64748B]">
          {profile?.isPublished
            ? `${name} is live and ready to be discovered. Keep it sharp, keep it trusted.`
            : "Complete your profile to go live and start turning scans into customers."}
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#090D1F] via-[#0c1a3d] to-[#0241A8] p-7 text-white shadow-[0_24px_60px_-20px_rgba(2,65,168,0.6)] lg:col-span-2"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(400px 200px at 100% 0%, rgba(253,195,4,0.18), transparent 60%), radial-gradient(300px 200px at 0% 100%, rgba(63,169,245,0.25), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
            <div className="max-w-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDC304]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FDC304]">
                <Sparkles className="h-3 w-3" /> Profile strength
              </span>
              <h3 className="mt-4 text-xl font-bold leading-snug">
                {pct === 100
                  ? "Your WorkTag is complete."
                  : `Let's make ${name} impossible to miss.`}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                {pct === 100
                  ? "Everything is in place. Share your QR and let trust do the talking."
                  : `${done} of ${total} steps done. Finish the rest to unlock your live profile.`}
              </p>
              <Link
                href="/dashboard/profile"
                className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[12px] font-bold text-[#0241A8] transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_12px_32px_-8px_rgba(255,255,255,0.5)]"
              >
                {pct === 100 ? "Review profile" : "Continue setup"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="#FDC304"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - pct / 100)}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold">{pct}%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                  Complete
                </span>
              </div>
            </div>
          </div>

          <div className="relative mt-6 flex flex-wrap gap-1.5">
            {PROFILE_COMPLETION_STEPS.map((step, i) => (
              <span
                key={step}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  i < done
                    ? "bg-white/[0.12] text-white"
                    : "bg-white/[0.05] text-white/35"
                }`}
              >
                {i < done && <CheckCircle2 className="h-3 w-3 text-[#FDC304]" />}
                {step}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-4"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[#E8EBF2] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(2,65,168,0.15)]">
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-xl bg-[#10B981]/10 p-2 text-[#10B981]">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <h4 className="text-[13px] font-bold text-[#090D1F]">Trust Status</h4>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-[#64748B]">
              {profile?.isPublished
                ? "Your verified badge is active — customers see you as trustworthy at a glance."
                : "Publish your profile to begin building verified trust and collecting reviews."}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E8EBF2] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(2,65,168,0.15)]">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
              {stats[2].label}
            </p>
            <p className="mt-1 text-3xl font-extrabold text-[#090D1F]">
              {profile?.username ? (
                <>
                  /{profile.username}
                </>
              ) : (
                "Not set yet"
              )}
            </p>
            <p className="mt-1 text-[11px] text-[#64748B]">
              Your unique WorkTag link &amp; QR destination
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.22 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-[#E8EBF2] bg-white p-5 shadow-[0_8px_30px_-14px_rgba(2,65,168,0.12)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_20px_50px_-18px_rgba(2,65,168,0.25)]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4F6FA] text-[#0241A8] transition-colors group-hover:bg-[#0241A8]/[0.08]">
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-4 text-2xl font-extrabold tracking-tight text-[#090D1F]">
                {s.value}
              </p>
              <p className="text-[12px] font-medium text-[#64748B]">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {QUICK_ACTIONS.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={a.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8EBF2] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(2,65,168,0.12)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_24px_60px_-20px_rgba(2,65,168,0.3)]"
              >
                <div
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${a.accent} opacity-[0.08] blur-xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-[0.16]`}
                />
                <div className="flex items-start justify-between">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${a.accent} text-white shadow-lg`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#94A3B8] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0241A8]" />
                </div>
                <h3 className="mt-5 text-[15px] font-bold text-[#090D1F]">{a.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-[#64748B]">{a.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <p className="pt-2 text-center text-[11px] text-[#94A3B8]">
        Tip: place your WorkTag QR where customers already look — counter, window, receipts.
      </p>
    </div>
  );
}
