"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function IdentityShowcase() {
  return (
    <section className="relative bg-white py-32 sm:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_40%_50%,#C9D7FF/8_0%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#0A3D91] uppercase">Professional profile</span>
          <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0F172A]">
            What customers see when they scan.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#475569] max-w-md">
            Every WorkTag profile tells your customers exactly who you are, what you do, and why they can trust you.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 sm:mt-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          <motion.div variants={fadeUp} className="flex-1 w-full max-w-lg">
            <div className="rounded-3xl bg-white border border-[#E2E8F0]/20 shadow-[0_20px_60px_-20px_rgba(10,61,145,0.08)] transition-all duration-500 hover:shadow-[0_30px_80px_-20px_rgba(10,61,145,0.12)]">
              <div className="p-8 sm:p-10 space-y-6">
                <div className="flex items-start gap-5">
                  <div className="h-16 w-16 shrink-0 rounded-full bg-gradient-to-br from-[#0A3D91] to-[#2563EB] flex items-center justify-center text-white font-bold text-xl shadow-inner shadow-black/10 ring-2 ring-[#C9D7FF]/30">
                    BM
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-[#0F172A]">Bright Masonry</h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4CAF50]/6 px-2.5 py-0.5 text-[11px] font-semibold text-[#4CAF50] border border-[#4CAF50]/15">
                        <motion.span
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]"
                        />
                        Verified
                      </span>
                    </div>
                    <p className="text-sm text-[#475569] mt-0.5">Home Services · Lagos, Nigeria</p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-[#475569]/50">
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 14 14" className="h-3 w-3" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M7 1C4.2 1 2 3.2 2 6c0 4 5 7 5 7s5-3 5-7c0-2.8-2.2-5-5-5z" /><circle cx="7" cy="6" r="2" /></svg>
                        Lagos
                      </span>
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 14 14" className="h-3 w-3" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M7 1v12M1 7h12" /></svg>
                        Member since 2024
                      </span>
                      <span className="flex items-center gap-1">
                        <svg viewBox="0 0 14 14" className="h-3 w-3" stroke="currentColor" strokeWidth="1.5" fill="none"><circle cx="7" cy="7" r="6" /><path d="M7 4v4l2.5 1.5" /></svg>
                        Responds in &lt; 2hrs
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-[#E2E8F0]/60 via-[#E2E8F0]/30 to-transparent" />

                <div className="flex flex-wrap gap-2">
                  {["Bricklaying", "General Repairs", "Finishing Works", "Consultation"].map((s) => (
                    <span key={s} className="rounded-lg bg-[#F8FAFC]/80 px-3.5 py-1.5 text-sm font-medium text-[#475569] border border-[#E2E8F0]/30 transition-all duration-300 hover:bg-[#F0F4FF] hover:border-[#C9D7FF]/50 hover:text-[#0A3D91]">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-6 py-2">
                  {[
                    { label: "Trust score", value: "94", sub: "out of 100" },
                    { label: "Reviews", value: "89", sub: "5.0 average" },
                    { label: "QR scans", value: "1,247", sub: "last 30 days" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center sm:text-left">
                      <div className="text-2xl font-bold text-[#0F172A] tracking-[-0.02em]">{stat.value}</div>
                      <div className="text-xs font-medium text-[#475569] mt-0.5">{stat.label}</div>
                      <div className="text-[10px] text-[#475569]/30 mt-0.5">{stat.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl bg-gradient-to-r from-[#F8FAFC]/80 to-white border border-[#E2E8F0]/20 p-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4CAF50]/10">
                    <svg viewBox="0 0 16 16" className="h-4 w-4 text-[#4CAF50]" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 14A6 6 0 108 2a6 6 0 000 12z" /><path d="M5 8l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div>
                    <span className="text-[11px] font-semibold text-[#0F172A]">Verified credentials</span>
                    <p className="text-[11px] text-[#475569]/60 mt-0.5">Identity · Business registration · Physical address</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex-1 flex flex-col gap-6 w-full max-w-sm">
            <div className="rounded-2xl overflow-hidden bg-white border border-[#E2E8F0]/20 shadow-sm transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(10,61,145,0.1)] group">
              <Image src="/images/business-card.png" alt="WorkTag business card" width={600} height={400} className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="px-5 py-3 text-[11px] text-[#475569]/40 font-medium flex items-center gap-2 bg-white">
                <span className="w-1 h-1 rounded-full bg-[#0A3D91]/20" />
                Premium business card with embedded WorkTag
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-[#E2E8F0]/20 shadow-sm transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(10,61,145,0.1)] group">
              <Image src="/images/window.png" alt="WorkTag on storefront window" width={600} height={400} className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="px-5 py-3 text-[11px] text-[#475569]/40 font-medium flex items-center gap-2 bg-white">
                <span className="w-1 h-1 rounded-full bg-[#0A3D91]/20" />
                Storefront display · Scannable from the street
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
