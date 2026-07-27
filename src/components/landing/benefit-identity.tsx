"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Check, Link2, Smartphone, MessageCircle, Mail } from "lucide-react";

const TEAM_AVATARS = [
  { src: "/images/avatars/chinedu.jpg", name: "Chinedu Okafor", role: "Gas Supplier", location: "Lagos", quote: "My customers scan my tag and instantly trust me." },
  { src: "/images/avatars/aisha.jpg", name: "Aisha Bello", role: "Hair Stylist", location: "Abuja", quote: "WorkTag brought in clients who checked my profile first." },
  { src: "/images/avatars/segun.jpg", name: "Segun Adeyemi", role: "Mobile Phone Technician", location: "Ibadan", quote: "My reviews speak for themselves now." },
  { src: "/images/avatars/funke.jpg", name: "Funke Ogunlesi", role: "Catering & Events", location: "Lagos", quote: "One scan replaced all my business cards." },
];

export function BenefitIdentity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="benefit-identity" ref={sectionRef} className="relative overflow-hidden">
      <div className="relative benefit-gradient-1 py-28 sm:py-36 lg:py-44">
        <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0241A8]/[0.08] rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3FA9F5]/[0.05] rounded-full blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
            {/* Left: Profile composition */}
            <motion.div style={{ y: parallaxY }} className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* Main profile card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-3xl overflow-hidden bg-white border border-white/10 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.2)] p-6"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="relative shrink-0">
                      <div className="h-16 w-16 rounded-2xl overflow-hidden ring-2 ring-[#0241A8]/15">
                        <Image src="/images/avatars/chinedu.jpg" alt="Chinedu Okafor" width={64} height={64} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center ring-[2.5px] ring-white">
                        <Check className="h-2.5 w-2.5 text-white stroke-[3]" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-bold text-[#090D1F] leading-tight">Chinedu Okafor</h3>
                      <p className="text-[12px] text-[#5A6A8A] mt-0.5">Bright Masonry · Lagos</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/10 px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
                          <span className="w-1 h-1 rounded-full bg-[#10B981] animate-pulse" />
                          Verified
                        </span>
                        <span className="text-[9px] text-[#5A6A8A]/50">·</span>
                        <span className="text-[9px] text-[#5A6A8A]/70 font-medium">ID: WT-204</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#5A6A8A] font-medium">Trust Score</span>
                      <span className="text-[#10B981] font-bold">94/100</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#E8EBF2]/60 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#0241A8] to-[#06B6D4]"
                        initial={{ width: 0 }}
                        whileInView={{ width: "94%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="text-[10px] text-[#5A6A8A]/60">127 reviews</span>
                      <span className="text-[10px] text-[#5A6A8A]/60">4.9 rating</span>
                      <span className="text-[10px] text-[#5A6A8A]/60">3yr member</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating business card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="absolute -bottom-6 -right-6 w-44 h-28 rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border border-white/[0.1] hidden sm:block"
                >
                  <Image src="/images/business-card.png" alt="WorkTag Card" width={176} height={112} className="w-full h-full object-cover" />
                </motion.div>

                {/* Floating storefront */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="absolute -top-4 -right-4 w-32 h-32 rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] border border-white/[0.1] hidden sm:block"
                >
                  <Image src="/images/storefront.jpg" alt="Storefront" width={128} height={128} className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="space-y-7 max-w-lg">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#3FA9F5] uppercase">
                    Digital Identity
                  </span>
                  <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-white">
                    A digital identity
                    <br />
                    <span className="bg-gradient-to-r from-[#3FA9F5] to-[#06B6D4] bg-clip-text text-transparent">
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

                {/* Share methods */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-2 gap-2.5"
                >
                  {[
                    { icon: Link2, label: "Unique URL", desc: "worktag.io/chinedu" },
                    { icon: Smartphone, label: "QR Scan", desc: "Any camera works" },
                    { icon: MessageCircle, label: "WhatsApp", desc: "Share directly" },
                    { icon: Mail, label: "Email Signature", desc: "Embed in emails" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3.5 py-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0241A8]/[0.1]">
                        <item.icon className="h-3.5 w-3.5 text-[#3FA9F5]" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-white/80">{item.label}</div>
                        <div className="text-[10px] text-white/30 truncate">{item.desc}</div>
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
                    <span className="text-[12px] text-white/50 font-medium">
                      <span className="text-white font-bold">10,000+</span> professionals trust WorkTag
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
