"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Check, Clock, ShieldCheck, Smartphone, Mail, MapPin, UserCheck, Star, Copy, Share2, Link2 } from "lucide-react";
import { WorkTagMark } from "./worktag-logo";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const TEAM_AVATARS = [
  { src: "/images/avatars/chinedu.jpg", name: "Chinedu Okafor", role: "Gas Supplier", location: "Lagos" },
  { src: "/images/avatars/aisha.jpg", name: "Aisha Bello", role: "Hair Stylist", location: "Abuja" },
  { src: "/images/avatars/segun.jpg", name: "Segun Adeyemi", role: "Mobile Phone Technician", location: "Ibadan" },
  { src: "/images/avatars/emeka.jpg", name: "Emeka Nwosu", role: "Electrician", location: "Port Harcourt" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function SaveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  );
}

export function BenefitIdentity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const profileUrl = "https://worktag.com/funke";
  const [qrOpen, setQrOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const shareQr = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Funke Ogunlesi's WorkTag",
          text: "Scan Funke's verified WorkTag profile",
          url: profileUrl,
        });
        return;
      } catch {
        /* share dismissed */
      }
    }
    await copyLink();
  };

  return (
    <section id="benefit-identity" ref={sectionRef} className="relative overflow-hidden">
      <div className="relative bg-[#F7F9FC] py-28 sm:py-36 lg:py-44">
        <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3FA9F5]/[0.05] rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FDC304]/[0.04] rounded-full blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
            {/* Left: Mobile Card */}
            <motion.div style={{ y: parallaxY }} className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative mx-auto lg:mx-0">
                {/* Phone frame */}
                <div className="relative mx-auto w-[300px] sm:w-[320px]">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-[2.5rem] bg-[#1a1a2e] p-[8px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.5)] border border-white/[0.06]"
                  >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a2e] rounded-b-xl z-10" />

                    {/* Screen */}
                    <div className="relative rounded-[2rem] overflow-hidden bg-white">
                      {/* Scan viewfinder corner brackets */}
                      <div className="absolute top-2.5 left-2.5 z-30 h-3.5 w-3.5 border-t-2 border-l-2 border-[#FDC304]/80 rounded-tl-sm pointer-events-none" />
                      <div className="absolute top-2.5 right-2.5 z-30 h-3.5 w-3.5 border-t-2 border-r-2 border-[#FDC304]/80 rounded-tr-sm pointer-events-none" />

                      {/* Signature gold scan sweep on reveal */}
                      <motion.div
                        className="absolute inset-x-0 z-30 pointer-events-none"
                        style={{ height: 64 }}
                        initial={{ top: "-15%" }}
                        whileInView={{ top: "102%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.25 }}
                      >
                        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FDC304] to-transparent shadow-[0_0_20px_rgba(253,195,4,0.9),0_0_40px_rgba(253,195,4,0.45)]" />
                        <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-[#FDC304]/[0.12] via-[#FDC304]/[0.04] to-transparent" />
                      </motion.div>

                      {/* Blue identity field */}
                      <div className="relative">
                        {/* Field gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0746b8] via-[#0241A8] to-[#02338f]" />
                        {/* Top glow */}
                        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-72 rounded-full bg-[#3FA9F5]/25 blur-[70px]" />
                        {/* Security micro-lines */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 8px)" }} />
                        {/* Ghost watermark */}
                        <div className="absolute -top-6 -right-8 pointer-events-none opacity-[0.13]" style={{ filter: "brightness(0) invert(1)" }}>
                          <WorkTagMark className="h-44 w-44" />
                        </div>

                        {/* Status bar */}
                        <div className="relative flex items-center justify-between px-6 pt-6 pb-3">
                          <span className="text-[10px] font-semibold text-white/70">9:41</span>
                          <div className="flex items-center gap-1.5">
                            {/* Signal bars */}
                            <svg viewBox="0 0 18 12" className="h-2.5 w-3.5" fill="none">
                              <rect x="0" y="9" width="3" height="3" rx="0.5" fill="rgba(255,255,255,0.7)"/>
                              <rect x="4" y="6" width="3" height="6" rx="0.5" fill="rgba(255,255,255,0.7)"/>
                              <rect x="8" y="3" width="3" height="9" rx="0.5" fill="rgba(255,255,255,0.7)"/>
                              <rect x="12" y="0" width="3" height="12" rx="0.5" fill="rgba(255,255,255,0.7)"/>
                            </svg>
                            {/* 5G */}
                            <span className="text-[8px] font-bold text-white/70">5G</span>
                            {/* Battery */}
                            <svg viewBox="0 0 28 13" className="h-2.5 w-5" fill="none">
                              <rect x="0.5" y="0.5" width="23" height="12" rx="2.5" stroke="rgba(255,255,255,0.5)"/>
                              <rect x="2" y="2" width="18" height="9" rx="1.5" fill="rgba(255,255,255,0.7)"/>
                              <path d="M25 4.5V8.5C25.8 8.5 26.5 7.8 26.5 7C26.5 6.2 25.8 4.5 25 4.5Z" fill="rgba(255,255,255,0.5)"/>
                            </svg>
                          </div>
                        </div>

                        {/* Identity content */}
                        <div className="relative px-5 pb-[96px]">
                          {/* Brand mark + ID slot */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <WorkTagMark className="h-5 w-5" />
                              <span className="text-[9px] font-bold tracking-[0.2em] text-white/55">WorkTag</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[7px] font-semibold text-[#FDC304]/80 tracking-[0.14em] border border-[#FDC304]/25 rounded-md px-1.5 py-[3px] bg-[#FDC304]/[0.07]">WT-8F2K-9X4M</span>
                              <motion.button
                                type="button"
                                onClick={() => setQrOpen(true)}
                                aria-label="Open scannable WorkTag QR code"
                                className="group relative h-9 w-9 rounded-md bg-white p-[3px] shadow-[0_10px_24px_-6px_rgba(0,0,0,0.6),0_0_0_1px_rgba(253,195,4,0.4)] hover:shadow-[0_12px_28px_-6px_rgba(253,195,4,0.55),0_0_0_1px_rgba(253,195,4,0.7)] transition-shadow cursor-pointer"
                              >
                                <Image src="/images/qr-worktag.webp" alt="WorkTag QR code" width={36} height={36} className="w-full h-full object-contain" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Avatar — double gold ring */}
                          <div className="flex justify-center mt-5 mb-4">
                            <div className="relative">
                              <div className="absolute -inset-[5px] rounded-full border border-[#FDC304]/40" />
                              <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[#FDC304] via-[#3FA9F5] to-[#0241A8]" />
                              <div className="relative h-24 w-24 rounded-full overflow-hidden ring-[3px] ring-[#0241A8]">
                                <Image src="/images/avatars/funke.jpg" alt="Funke Ogunlesi" width={96} height={96} className="w-full h-full object-cover" />
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center ring-[2.5px] ring-[#0241A8] shadow-[0_0_12px_rgba(16,185,129,0.55)]">
                                <Check className="h-3 w-3 text-white stroke-[3]" />
                              </div>
                            </div>
                          </div>

                          {/* Name + Business + Location */}
                          <div className="text-center">
                            <h3 className="text-[18px] font-bold text-white leading-tight tracking-[-0.01em]">Funke Ogunlesi</h3>
                            <p className="text-[11px] text-white/60 font-medium mt-0.5">Funke&apos;s Kitchen</p>
                            <div className="inline-flex items-center gap-1 mt-1">
                              <MapPin className="h-2.5 w-2.5 text-white/40" />
                              <p className="text-[9px] text-white/40">Catering & Events · Lagos, Nigeria</p>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 mt-2">
                              <div className="flex items-center gap-1 bg-[#FDC304]/[0.12] border border-[#FDC304]/30 rounded-full px-1.5 py-[2px]">
                                <Star className="h-2 w-2 fill-[#FDC304] text-[#FDC304]" />
                                <span className="text-[7px] font-bold text-[#FDC304]">5.0</span>
                                <span className="text-[7px] text-white/45">· 38 reviews</span>
                              </div>
                              <div className="flex items-center gap-1 bg-[#10B981]/[0.12] border border-[#10B981]/35 rounded-full px-1.5 py-[2px]">
                                <Check className="h-2 w-2 text-[#10B981]" strokeWidth={3} />
                                <span className="text-[7px] font-bold text-[#10B981]">Verified</span>
                              </div>
                            </div>
                          </div>

                          {/* Trust gauge */}
                          <div className="flex items-center justify-center gap-4 mt-4">
                            <div className="relative h-14 w-14">
                              <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90">
                                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
                                <circle cx="24" cy="24" r="20" fill="none" stroke="url(#trustGoldGrad)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="125.6" strokeDashoffset="3.77" />
                                <defs>
                                  <linearGradient id="trustGoldGrad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#FDE68A" />
                                    <stop offset="55%" stopColor="#FDC304" />
                                    <stop offset="100%" stopColor="#C79A00" />
                                  </linearGradient>
                                </defs>
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[16px] font-[800] text-[#FDC304] leading-none">97</span>
                              </div>
                            </div>
                            <div className="h-9 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                            <div>
                              <span className="text-[7px] font-semibold uppercase tracking-[0.18em] text-white/40">Trust Score</span>
                              <div className="flex items-center gap-1.5 mt-1">
                                <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
                                <span className="text-[9px] font-semibold text-[#10B981]">Verified</span>
                              </div>
                              <span className="block text-[7px] text-[#94A3B8]/70 mt-0.5">4 of 5 checks</span>
                            </div>
                          </div>

                          {/* Verifications */}
                          <div className="relative mt-4">
                            <div className="mb-2.5 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <ShieldCheck className="h-3 w-3 text-[#3FA9F5]" />
                                <span className="text-[8px] font-bold uppercase tracking-wider text-white/45">Verifications</span>
                              </div>
                              <div className="flex items-center gap-[3px]">
                                {[0, 1, 2, 3].map((i) => (
                                  <span key={i} className="h-[5px] w-[5px] rounded-full bg-[#10B981]" />
                                ))}
                                <span className="h-[5px] w-[5px] rounded-full bg-[#64748B]" />
                                <span className="ml-1 text-[7px] font-bold text-[#94A3B8]">4/5</span>
                              </div>
                            </div>

                            {/* Seal wire */}
                            <div className="absolute left-9 right-9 top-[52px] h-px bg-gradient-to-r from-[#FDC304]/0 via-[#FDC304]/25 to-[#FDC304]/0 pointer-events-none" />

                            <div className="relative flex items-start justify-between">
                              {/* Identity */}
                              <div className="flex flex-col items-center gap-1">
                                <div className="relative">
                                  <div className="h-9 w-9 rounded-full bg-[#FDC304] border-2 border-[#0241A8] ring-2 ring-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_10px_-2px_rgba(0,0,0,0.5)]">
                                    <ShieldCheck className="h-4 w-4 text-[#0241A8]" />
                                  </div>
                                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#10B981] border-2 border-[#02338f] flex items-center justify-center">
                                    <Check className="h-1.5 w-1.5 text-white stroke-[4]" />
                                  </div>
                                </div>
                                <span className="text-[7px] font-semibold text-white/45">Identity</span>
                              </div>

                              {/* Phone */}
                              <div className="flex flex-col items-center gap-1">
                                <div className="relative">
                                  <div className="h-9 w-9 rounded-full bg-[#FDC304] border-2 border-[#0241A8] ring-2 ring-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_10px_-2px_rgba(0,0,0,0.5)]">
                                    <Smartphone className="h-4 w-4 text-[#0241A8]" />
                                  </div>
                                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#10B981] border-2 border-[#02338f] flex items-center justify-center">
                                    <Check className="h-1.5 w-1.5 text-white stroke-[4]" />
                                  </div>
                                </div>
                                <span className="text-[7px] font-semibold text-white/45">Phone</span>
                              </div>

                              {/* Email */}
                              <div className="flex flex-col items-center gap-1">
                                <div className="relative">
                                  <div className="h-9 w-9 rounded-full bg-[#FDC304] border-2 border-[#0241A8] ring-2 ring-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_10px_-2px_rgba(0,0,0,0.5)]">
                                    <Mail className="h-4 w-4 text-[#0241A8]" />
                                  </div>
                                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#10B981] border-2 border-[#02338f] flex items-center justify-center">
                                    <Check className="h-1.5 w-1.5 text-white stroke-[4]" />
                                  </div>
                                </div>
                                <span className="text-[7px] font-semibold text-white/45">Email</span>
                              </div>

                              {/* Address */}
                              <div className="flex flex-col items-center gap-1">
                                <div className="relative">
                                  <div className="h-9 w-9 rounded-full bg-[#FDC304] border-2 border-[#0241A8] ring-2 ring-white flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_10px_-2px_rgba(0,0,0,0.5)]">
                                    <MapPin className="h-4 w-4 text-[#0241A8]" />
                                  </div>
                                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#10B981] border-2 border-[#02338f] flex items-center justify-center">
                                    <Check className="h-1.5 w-1.5 text-white stroke-[4]" />
                                  </div>
                                </div>
                                <span className="text-[7px] font-semibold text-white/45">Address</span>
                              </div>

                              {/* Physical — pending */}
                              <div className="flex flex-col items-center gap-1">
                                <div className="relative">
                                  <div className="h-9 w-9 rounded-full bg-white border-2 border-dashed border-[#0241A8] flex items-center justify-center shadow-[0_4px_10px_-2px_rgba(0,0,0,0.35)]">
                                    <UserCheck className="h-4 w-4 text-[#64748B]" />
                                  </div>
                                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#475569] border-2 border-[#02338f] flex items-center justify-center">
                                    <Clock className="h-1.5 w-1.5 text-white/80" strokeWidth={3} />
                                  </div>
                                </div>
                                <span className="text-[7px] font-semibold text-white/30">Physical</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Organic wave into white */}
                        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 320 92" preserveAspectRatio="none" style={{ height: 92 }}>
                          <path d="M0,30 C60,80 120,10 180,44 C240,78 290,30 320,44 L320,92 L0,92 Z" fill="#ffffff" />
                          <path d="M0,33 C60,83 120,13 180,47 C240,81 290,33 320,47" fill="none" stroke="#FDC304" strokeWidth="1.5" opacity="0.55" />
                        </svg>
                      </div>

                      {/* White field */}
                      <div className="relative bg-white px-4 pb-5 pt-4">
                        {/* Actions */}
                        <div className="relative grid grid-cols-4 gap-1.5">
                          <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-[#25D366] border border-[#1eb956] shadow-[0_6px_16px_-4px_rgba(37,211,102,0.45)]">
                            <WhatsAppIcon className="h-4 w-4 text-white" />
                            <span className="text-[7px] font-bold text-white">WhatsApp</span>
                          </button>
                          <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-[#0241A8] border border-[#012f7a] shadow-[0_6px_16px_-4px_rgba(2,65,168,0.45)]">
                            <PhoneIcon className="h-4 w-4 text-white" />
                            <span className="text-[7px] font-bold text-white">Call</span>
                          </button>
                          <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-gradient-to-br from-[#FDC304] to-[#d9a402] border border-[#FDC304]/60 shadow-[0_6px_16px_-4px_rgba(253,195,4,0.45)]">
                            <BriefcaseIcon className="h-4 w-4 text-[#090D1F]" />
                            <span className="text-[7px] font-bold text-[#090D1F]">Hire Me</span>
                          </button>
                          <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-[#475569] border border-[#334155] shadow-[0_6px_16px_-4px_rgba(71,85,105,0.45)]">
                            <SaveIcon className="h-4 w-4 text-white" />
                            <span className="text-[7px] font-bold text-white">Save</span>
                          </button>
                        </div>

                        {/* Stats band */}
                        <div className="relative mt-3 grid grid-cols-4 divide-x divide-[#E8EBF2]/70 rounded-xl border border-[#E8EBF2]/70 bg-white shadow-[0_6px_20px_-6px_rgba(2,65,168,0.08)] overflow-hidden">
                          {/* Jobs Completed */}
                          <div className="px-1.5 py-2.5 text-center">
                            <div className="text-[13px] font-[800] text-[#090D1F] leading-none">47</div>
                            <div className="text-[6.5px] font-semibold text-[#5A6A8A]/60 uppercase tracking-wider mt-1">Jobs Done</div>
                            <div className="mt-1.5 flex justify-center">
                              <svg width="34" height="10" viewBox="0 0 36 10" className="overflow-visible">
                                <defs>
                                  <linearGradient id="jobSpark" x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor="#3FA9F5" />
                                    <stop offset="100%" stopColor="#0241A8" />
                                  </linearGradient>
                                </defs>
                                <path d="M1,8.5 L9,6 L17,7 L25,3 L35,1" fill="none" stroke="url(#jobSpark)" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="35" cy="1" r="1.6" fill="#10B981" />
                              </svg>
                            </div>
                          </div>

                          {/* Repeat Customers */}
                          <div className="px-1.5 py-2.5 text-center">
                            <div className="text-[13px] font-[800] text-[#090D1F] leading-none">12</div>
                            <div className="text-[6.5px] font-semibold text-[#5A6A8A]/60 uppercase tracking-wider mt-1">Repeat</div>
                            <div className="mt-1.5 flex items-center justify-center">
                              <div className="flex -space-x-1">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#3FA9F5] border border-white" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#FDC304] border border-white" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#10B981] border border-white" />
                              </div>
                              <span className="ml-1 text-[6.5px] font-bold text-[#C79A00]">+9 more</span>
                            </div>
                          </div>

                          {/* Years Experience */}
                          <div className="px-1.5 py-2.5 text-center">
                            <div className="text-[13px] font-[800] text-[#090D1F] leading-none">4yr</div>
                            <div className="text-[6.5px] font-semibold text-[#5A6A8A]/60 uppercase tracking-wider mt-1">Experience</div>
                            <div className="mt-1.5 flex items-center justify-center gap-1">
                              <span className="text-[5.5px] font-semibold text-[#5A6A8A]/60">2022</span>
                              <div className="relative w-7">
                                <div className="h-px bg-gradient-to-r from-[#FDC304] to-[#0241A8]" />
                                <span className="absolute -top-[2.5px] left-1/2 h-1.5 w-1.5 rounded-full bg-[#FDC304] ring-1 ring-white" />
                              </div>
                              <span className="text-[5.5px] font-semibold text-[#5A6A8A]/60">2026</span>
                            </div>
                          </div>

                          {/* Avg Response Time */}
                          <div className="px-1.5 py-2.5 text-center">
                            <div className="text-[13px] font-[800] text-[#090D1F] leading-none">&lt;1hr</div>
                            <div className="text-[6.5px] font-semibold text-[#5A6A8A]/60 uppercase tracking-wider mt-1">Response</div>
                            <div className="mt-1.5 flex justify-center">
                              <svg width="34" height="12" viewBox="-1 -6 36 20">
                                <path d="M2,12 A15,15 0 0 1 32,12" fill="none" stroke="#E8EBF2" strokeWidth="2.5" strokeLinecap="round" />
                                <path d="M2,12 A15,15 0 0 1 17,-3" fill="none" stroke="#FDC304" strokeWidth="2.5" strokeLinecap="round" />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Microtype */}
                        <div className="relative flex items-center justify-between px-1 pt-3.5">
                          <span className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#5A6A8A]/50">Member since 2022</span>
                          <span className="text-[8px] font-medium text-[#0241A8]/50">worktag.com/funke</span>
                        </div>
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/20" />
                  </motion.div>
                </div>

                {/* Floating acrylic tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="absolute -bottom-4 -right-6 w-40 h-24 rounded-xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] hidden lg:block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0241A8] via-[#012d7a] to-[#011d52]" />
                  <div className="relative p-3 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden ring-1 ring-white/10">
                          <Image src="/images/avatars/funke.jpg" alt="Funke" width={24} height={24} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-[7px] font-bold text-white leading-tight">Funke Ogunlesi</div>
                          <div className="text-[5px] text-white/40">Funke&apos;s Kitchen</div>
                        </div>
                      </div>
                      <div className="h-6 w-6 rounded bg-white/5 flex items-center justify-center">
                        <div className="h-4 w-4 bg-white rounded-sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[5px] text-[#FDC304]/50 font-medium">WT-8F2K-9X4M</div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                        <span className="text-[5px] text-white/30 font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="space-y-7 max-w-lg">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#0241A8] uppercase">
                    Digital Identity
                  </span>
                  <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-[#090D1F]">
                    A digital identity
                    <br />
                    <span className="bg-gradient-to-r from-[#0241A8] via-[#3FA9F5] to-[#FDC304] bg-clip-text text-transparent">
                      that never expires.
                    </span>
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[15px] leading-[1.75] text-[#8896B3]"
                >
                  Your WorkTag profile is your permanent digital home. It travels with your business across every platform, every conversation, every referral. No more relying on word-of-mouth alone.
                </motion.p>

                {/* How it works steps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-3"
                >
                  {[
                    { step: "01", title: "Scan", desc: "Any phone camera scans your QR code instantly" },
                    { step: "02", title: "Trust", desc: "Your verified profile builds instant credibility" },
                    { step: "03", title: "Connect", desc: "Clients contact you directly — WhatsApp, call, or hire" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3.5 rounded-xl bg-white border border-[#E8EBF2]/80 px-4 py-3 shadow-[0_4px_24px_-4px_rgba(2,65,168,0.06)]">
                      <span className="text-[10px] font-bold text-[#C79A00] mt-0.5 shrink-0">{item.step}</span>
                      <div>
                        <div className="text-[12px] font-bold text-[#090D1F]">{item.title}</div>
                        <div className="text-[11px] text-[#5A6A8A] leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Trust strip with real avatars */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="pt-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {TEAM_AVATARS.map((avatar, i) => (
                      <motion.div
                        key={avatar.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                        className="rounded-2xl bg-white border border-[#E8EBF2]/80 px-4 py-3 shadow-[0_4px_24px_-4px_rgba(2,65,168,0.08)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0">
                            <Image src={avatar.src} alt={avatar.name} width={36} height={36} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[12px] font-bold text-[#090D1F]">{avatar.name}</div>
                            <div className="text-[10px] text-[#5A6A8A] font-medium">{avatar.role} · {avatar.location}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex -space-x-2">
                      {[
                        { src: "/images/avatars/emeka.jpg", name: "Emeka" },
                        { src: "/images/avatars/ngozi.jpg", name: "Ngozi" },
                        { src: "/images/avatars/tunde.jpg", name: "Tunde" },
                        { src: "/images/avatars/mrsadebayo.jpg", name: "Mrs Adebayo" },
                      ].map((avatar, i) => (
                        <div key={i} className="h-7 w-7 rounded-full overflow-hidden shrink-0">
                          <Image src={avatar.src} alt={avatar.name} width={28} height={28} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[12px] text-[#5A6A8A] font-medium">
                      <span className="text-[#C79A00] font-bold">10,000+</span> professionals trust WorkTag
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[15px] font-bold text-[#0F172A]">
              <WorkTagMark className="h-5 w-5" />
              Scan Funke&apos;s WorkTag
            </DialogTitle>
            <DialogDescription className="text-[13px] text-[#64748B]">
              Point any camera at the QR code to see her verified profile.
            </DialogDescription>
          </DialogHeader>
          <div className="mx-auto my-2 h-52 w-52 rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-[0_8px_30px_-8px_rgba(2,65,168,0.15)]">
            <Image src="/images/qr-worktag.webp" alt="Funke's WorkTag QR code" width={208} height={208} className="h-full w-full object-contain" />
          </div>
          <div className="mx-auto flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5">
            <Link2 className="h-3.5 w-3.5 text-[#94A3B8]" />
            <span className="text-[13px] font-semibold text-[#0F172A]">worktag.com/funke</span>
          </div>
          <DialogFooter className="gap-2 sm:flex-row sm:justify-center">
            <Button variant="outline" onClick={copyLink} className="flex-1 gap-1.5">
              {copied ? <Check className="h-4 w-4 text-[#10B981]" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy link"}
            </Button>
            <Button onClick={shareQr} className="flex-1 gap-1.5 bg-[#0241A8] hover:bg-[#012f7a]">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
