"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Globe, Share2, Smartphone, Link2, MessageCircle, Mail } from "lucide-react";

export function BenefitIdentity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="benefit-identity" ref={sectionRef} className="relative overflow-hidden">
      {/* Dark full-width section */}
      <div className="relative benefit-gradient-1 py-28 sm:py-36 lg:py-44">
        <div className="absolute inset-0 cyber-grid opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6366F1]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#06B6D4]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left: Image composition */}
            <motion.div style={{ y: imageY }} className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative">
                {/* Main profile card */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm p-6 max-w-md"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="portrait-ring">
                      <div className="h-20 w-20 rounded-full overflow-hidden">
                        <Image src="/images/avatars/chinedu.jpg" alt="Chinedu" width={80} height={80} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">Chinedu Okafor</h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                          Verified
                        </span>
                      </div>
                      <p className="text-sm text-white/50 mt-0.5">Bright Masonry · Lagos</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#6366F1] to-[#06B6D4] rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "94%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/30 font-bold uppercase tracking-wider">
                      <span>Trust Score</span>
                      <span className="text-[#10B981]">94/100</span>
                    </div>
                  </div>
                </motion.div>

                {/* Floating product images */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="absolute -bottom-8 -right-8 w-40 h-28 rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden sm:block"
                >
                  <Image src="/images/business-card.png" alt="WorkTag Card" width={200} height={120} className="w-full h-full object-cover" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -top-6 -right-6 w-32 h-32 rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden sm:block"
                >
                  <Image src="/images/storefront.jpg" alt="Storefront" width={160} height={160} className="w-full h-full object-cover" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div style={{ y: contentY }} className="lg:col-span-6 order-1 lg:order-2">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#818CF8] uppercase">
                    Benefit 01
                  </span>
                  <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-white">
                    A digital identity
                    <br />
                    <span className="bg-gradient-to-r from-[#818CF8] to-[#06B6D4] bg-clip-text text-transparent">
                      that never expires.
                    </span>
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-base leading-relaxed text-[#94A3B8] max-w-lg"
                >
                  Your WorkTag profile is your permanent digital home. It travels with your business across every platform, every conversation, every referral. No more relying on word-of-mouth alone.
                </motion.p>

                {/* Share methods grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-2 gap-3 pt-4"
                >
                  {[
                    { icon: Link2, label: "Unique URL", desc: "worktag.io/chinedu" },
                    { icon: Smartphone, label: "QR Scan", desc: "Any camera works" },
                    { icon: MessageCircle, label: "WhatsApp", desc: "Share directly" },
                    { icon: Mail, label: "Email Signature", desc: "Embed in emails" },
                  ].map((item, i) => (
                    <div key={item.label} className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-3.5 flex items-start gap-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#6366F1]/10">
                        <item.icon className="h-4 w-4 text-[#818CF8]" />
                      </span>
                      <div>
                        <div className="text-xs font-bold text-white">{item.label}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center gap-3 pt-4"
                >
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-[#0A3D91] bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-[8px] font-bold text-white">
                        {["CO", "AB", "SA", "FO"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-white/40">
                    <span className="text-white/70 font-bold">10,000+</span> professionals trust WorkTag
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
