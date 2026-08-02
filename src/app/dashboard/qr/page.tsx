"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import QRCode from "qrcode";
import {
  Download,
  Copy,
  CheckCircle2,
  QrCode as QrCodeIcon,
  ScanLine,
  ArrowUpRight,
  Loader2,
  CalendarDays,
  Eye,
} from "lucide-react";
import Link from "next/link";

type ProfileData = {
  username?: string;
  businessName?: string;
};

type QRData = {
  scanCount?: number;
  createdAt?: string;
};

export default function QRPage() {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [qr, setQR] = useState<QRData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [profileRes, qrRes] = await Promise.all([
          fetch("/api/v1/profiles"),
          fetch("/api/v1/qr"),
        ]);
        const profileData = profileRes.ok ? await profileRes.json() : null;
        const qrData = qrRes.ok ? await qrRes.json() : null;
        if (cancelled) return;

        if (profileData?.success) {
          setProfile(profileData.data);
          const username = profileData.data.username as string;
          const url = `${window.location.origin}/${username}`;
          const dataUrl = await QRCode.toDataURL(url, {
            errorCorrectionLevel: "H",
            margin: 2,
            width: 720,
            color: { dark: "#012a77", light: "#ffffff" },
          });
          if (!cancelled) setQrDataUrl(dataUrl);
        }
        if (qrData?.success) setQR(qrData.data);
      } catch {
        toast.error("Failed to load QR data");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleCopy() {
    if (!profile?.username) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
      toast.success("Profile link copied");
    } catch {
      toast.error("Couldn't copy link");
    }
  }

  function handleDownload() {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `worktag-${profile?.username ?? "profile"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E8EBF2] bg-white py-24 text-center shadow-[0_12px_40px_-16px_rgba(2,65,168,0.1)]">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#0241A8]/[0.07] text-[#0241A8]">
          <ScanLine className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl font-bold text-[#090D1F]">No profile yet</h2>
        <p className="mt-1 max-w-sm text-sm text-[#64748B]">
          Set up your business profile first — your scannable WorkTag QR will be generated instantly.
        </p>
        <Link
          href="/dashboard/profile"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0241A8] to-[#3FA9F5] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(2,65,168,0.55)] transition-all duration-300 hover:-translate-y-[1px]"
        >
          Set up profile <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-[#090D1F] lg:text-3xl">
          Your <span className="text-gradient-blue">WorkTag QR</span>
        </h2>
        <p className="mt-1 text-sm text-[#64748B]">
          One scan opens your profile. Print it, stick it, share it.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center overflow-hidden rounded-3xl bg-gradient-to-br from-[#090D1F] via-[#0c1a3d] to-[#0241A8] p-8 shadow-[0_24px_60px_-20px_rgba(2,65,168,0.6)]"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(400px 200px at 100% 0%, rgba(253,195,4,0.14), transparent 60%), radial-gradient(300px 200px at 0% 100%, rgba(63,169,245,0.25), transparent 60%)",
            }}
          />
          <div className="relative mb-5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDC304]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FDC304]">
              <ScanLine className="h-3 w-3" /> Scan to connect
            </span>
          </div>

          <div className="relative">
            <div className="absolute inset-4 rounded-[28px] border border-[#FDC304]/30" />
            <div className="relative rounded-[24px] bg-white p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
              {qrDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrDataUrl} alt="WorkTag QR code" className="h-56 w-56 lg:h-64 lg:w-64" />
              ) : (
                <div className="flex h-56 w-56 items-center justify-center lg:h-64 lg:w-64">
                  <Loader2 className="h-6 w-6 animate-spin text-[#0241A8]" />
                </div>
              )}
            </div>
            <span className="absolute -right-1.5 -top-1.5 h-5 w-5 rounded-tl-xl border-l-2 border-t-2 border-[#FDC304]" />
            <span className="absolute -left-1.5 -top-1.5 h-5 w-5 rounded-tr-xl border-r-2 border-t-2 border-[#FDC304]" />
            <span className="absolute -bottom-1.5 -right-1.5 h-5 w-5 rounded-bl-xl border-b-2 border-r-2 border-[#FDC304]" />
            <span className="absolute -bottom-1.5 -left-1.5 h-5 w-5 rounded-br-xl border-b-2 border-l-2 border-[#FDC304]" />
          </div>

          <div className="relative mt-6 text-center">
            <p className="text-[13px] font-bold text-white">{profile.businessName ?? "Your Business"}</p>
            <p className="mt-0.5 font-mono text-[11px] text-white/50">
              {window.location.origin}/{profile.username}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#E8EBF2] bg-white p-5 shadow-[0_8px_30px_-14px_rgba(2,65,168,0.12)]">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDC304]/10 text-[#F59E0B]">
                <Eye className="h-4 w-4" />
              </span>
              <p className="mt-3 text-2xl font-extrabold text-[#090D1F]">{qr?.scanCount ?? 0}</p>
              <p className="text-[12px] font-medium text-[#64748B]">Total scans</p>
            </div>
            <div className="rounded-2xl border border-[#E8EBF2] bg-white p-5 shadow-[0_8px_30px_-14px_rgba(2,65,168,0.12)]">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0241A8]/[0.07] text-[#0241A8]">
                <CalendarDays className="h-4 w-4" />
              </span>
              <p className="mt-3 text-2xl font-extrabold text-[#090D1F]">
                {qr?.createdAt ? new Date(qr.createdAt).toLocaleDateString() : "—"}
              </p>
              <p className="text-[12px] font-medium text-[#64748B]">Created</p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E8EBF2] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(2,65,168,0.12)]">
            <h3 className="flex items-center gap-2 text-[13px] font-bold text-[#090D1F]">
              <QrCodeIcon className="h-4 w-4 text-[#0241A8]" /> Share your WorkTag
            </h3>
            <p className="mt-1 text-[12px] leading-relaxed text-[#64748B]">
              Print your QR on receipts, menus and invoices, or share the link in WhatsApp and bio links.
            </p>
            <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={handleDownload}
                disabled={!qrDataUrl}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0241A8] to-[#3FA9F5] px-5 text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(2,65,168,0.55)] transition-all duration-300 hover:-translate-y-[1px] disabled:pointer-events-none disabled:opacity-60"
              >
                <Download className="h-4 w-4" /> Download PNG
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-[#E8EBF2] bg-white px-5 text-sm font-bold text-[#090D1F] transition-all duration-300 hover:border-[#0241A8]/30 hover:text-[#0241A8]"
              >
                {copied ? <CheckCircle2 className="h-4 w-4 text-[#10B981]" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied!" : "Copy link"}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E8EBF2] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(2,65,168,0.12)]">
            <h3 className="text-[13px] font-bold text-[#090D1F]">What happens when it&apos;s scanned?</h3>
            <ul className="mt-3 space-y-2.5">
              {[
                "Customers land on your live WorkTag profile",
                "They can call, WhatsApp, visit or review you in one tap",
                "Every scan grows your Trust Score and analytics",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[12px] leading-relaxed text-[#64748B]">
                  <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981]">
                    <CheckCircle2 className="h-3 w-3" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
