"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Eye,
  QrCode,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Sparkles,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Totals = {
  views?: number;
  qrScans?: number;
  whatsappClicks?: number;
  callClicks?: number;
  emailClicks?: number;
  websiteClicks?: number;
};

type AnalyticsData = {
  uniqueVisitors?: number;
  totalScans?: number;
  recentScans?: unknown[];
  totals?: Totals;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/analytics")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .catch(() => toast.error("Failed to load analytics"))
      .finally(() => setLoading(false));
  }, []);

  const totals: Required<Totals> = {
    views: data?.totals?.views ?? data?.uniqueVisitors ?? 0,
    qrScans: data?.totals?.qrScans ?? data?.totalScans ?? 0,
    whatsappClicks: data?.totals?.whatsappClicks ?? 0,
    callClicks: data?.totals?.callClicks ?? 0,
    emailClicks: data?.totals?.emailClicks ?? 0,
    websiteClicks: data?.totals?.websiteClicks ?? 0,
  };

  const engagement = [
    { label: "WhatsApp", value: totals.whatsappClicks, icon: MessageCircle, color: "bg-[#25D366]", text: "text-[#25D366]" },
    { label: "Calls", value: totals.callClicks, icon: Phone, color: "bg-[#0241A8]", text: "text-[#0241A8]" },
    { label: "Emails", value: totals.emailClicks, icon: Mail, color: "bg-[#F59E0B]", text: "text-[#F59E0B]" },
    { label: "Website", value: totals.websiteClicks, icon: Globe, color: "bg-[#8B5CF6]", text: "text-[#8B5CF6]" },
  ];

  const maxValue = Math.max(...engagement.map((e) => e.value), 1);
  const totalActions = engagement.reduce((sum, e) => sum + e.value, 0);
  const hasData = totals.views > 0 || totals.qrScans > 0 || totalActions > 0;

  const headline = [
    { label: "Profile Views", value: totals.views, icon: Eye, tint: "bg-[#0241A8]/10 text-[#0241A8]", bar: "from-[#0241A8] to-[#3FA9F5]" },
    { label: "QR Scans", value: totals.qrScans, icon: QrCode, tint: "bg-[#FDC304]/15 text-[#F59E0B]", bar: "from-[#FDC304] to-[#F59E0B]" },
    { label: "Actions Taken", value: totalActions, icon: TrendingUp, tint: "bg-[#10B981]/10 text-[#10B981]", bar: "from-[#10B981] to-[#6EE7B7]" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-[#0241A8]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-[#090D1F] lg:text-3xl">
          Engagement <span className="text-gradient-blue">analytics</span>
        </h2>
        <p className="mt-1 text-sm text-[#64748B]">
          See how customers discover and interact with your WorkTag.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {headline.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-2xl border border-[#E8EBF2] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(2,65,168,0.12)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8]">
                    {m.label}
                  </p>
                  <p className="mt-2 text-4xl font-extrabold tracking-tight text-[#090D1F]">
                    {m.value.toLocaleString()}
                  </p>
                </div>
                <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-2xl", m.tint)}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#F4F6FA]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: hasData ? `${Math.min((m.value / Math.max(totals.views, 1)) * 100, 100)}%` : "0%" }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("h-full rounded-full bg-gradient-to-r", m.bar)}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-[#E8EBF2] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(2,65,168,0.12)] lg:p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#090D1F]">Engagement breakdown</h3>
            <p className="text-[11px] text-[#64748B]">Direct customer actions from your profile</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/10 px-3 py-1 text-[11px] font-bold text-[#10B981]">
            <Sparkles className="h-3 w-3" /> Live tracking
          </span>
        </div>

        {hasData ? (
          <div className="mt-8 space-y-6">
            {engagement.map((e, i) => {
              const Icon = e.icon;
              const pct = (e.value / maxValue) * 100;
              return (
                <div key={e.label} className="flex items-center gap-4">
                  <span className={cn("inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F6FA]", e.text)}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-semibold text-[#090D1F]">{e.label}</p>
                      <p className="text-[12px] font-bold text-[#64748B]">{e.value.toLocaleString()}</p>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#F4F6FA]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className={cn("h-full rounded-full", e.color)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-[#E8EBF2] bg-[#F8FAFD] px-6 py-12 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0241A8]/[0.06] text-[#0241A8]">
              <TrendingUp className="h-6 w-6" />
            </span>
            <h4 className="mt-4 text-[15px] font-bold text-[#090D1F]">No activity yet</h4>
            <p className="mx-auto mt-1 max-w-sm text-[12px] leading-relaxed text-[#64748B]">
              Share your WorkTag QR or link and your numbers will start climbing here the moment someone scans.
            </p>
            <Link
              href="/dashboard/qr"
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0241A8] to-[#3FA9F5] px-5 py-2.5 text-[12px] font-bold text-white shadow-[0_12px_32px_-8px_rgba(2,65,168,0.55)] transition-all duration-300 hover:-translate-y-[1px]"
            >
              <QrCode className="h-3.5 w-3.5" /> Get your QR
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
