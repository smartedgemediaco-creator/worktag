"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0241A8] py-28 sm:py-36 lg:py-44">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-[0.06]" />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FDC304]/[0.08] rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full blur-[140px]" />
      </div>

      {/* Decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[1000px] sm:h-[1000px] rounded-full border border-white/[0.02] pointer-events-none" />

      <div className="relative mx-auto max-w-[900px] px-6 lg:px-10 text-center">
        {/* QR echo — bookend to the hero product */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-full border border-dashed border-[#FDC304]/40 animate-[spin_14s_linear_infinite]" />
            <div className="relative h-16 w-16 rounded-2xl bg-white p-2 shadow-[0_16px_48px_-12px_rgba(0,0,0,0.35)] ring-1 ring-white/20">
              <Image src="/images/qr-worktag.webp" alt="WorkTag QR code" width={64} height={64} className="h-full w-full object-contain" />
            </div>
          </div>
        </motion.div>

        {/* Yellow accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-10 h-[3px] w-12 rounded-full bg-[#FDC304] origin-center"
        />

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(2.2rem,5vw,4rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-white"
        >
          Ready to build trust
          <br />
          <span className="text-[#FDC304]">that lasts?</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 text-[15px] sm:text-base leading-[1.8] text-white/50 max-w-lg mx-auto"
        >
          Claim your WorkTag today and turn every scan into a verified customer.
        </motion.p>

        {/* Social proof avatars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-2.5">
            {[
              { src: "/images/avatars/chinedu.jpg", name: "Chinedu" },
              { src: "/images/avatars/aisha.jpg", name: "Aisha" },
              { src: "/images/avatars/segun.jpg", name: "Segun" },
              { src: "/images/avatars/emeka.jpg", name: "Emeka" },
              { src: "/images/avatars/ngozi.jpg", name: "Ngozi" },
            ].map((avatar, i) => (
              <div key={i} className="relative h-9 w-9 rounded-full ring-[2px] ring-[#0241A8] overflow-hidden">
                <Image src={avatar.src} alt={avatar.name} width={36} height={36} className="h-full w-full object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#10B981] ring-1 ring-[#0241A8]" />
              </div>
            ))}
          </div>
          <span className="text-[12px] text-white/50">
            <span className="text-[#FDC304] font-bold">10,000+</span> verified professionals already trust WorkTag
          </span>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="group relative inline-flex h-13 items-center gap-2.5 rounded-full bg-[#FDC304] px-8 text-sm font-bold text-[#0241A8] shadow-[0_0_40px_-8px_rgba(253,195,4,0.4)] transition-all duration-300 hover:shadow-[0_0_60px_-8px_rgba(253,195,4,0.6)] hover:-translate-y-[1px]"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-13 items-center justify-center rounded-full border-2 border-white/20 px-8 text-sm font-bold text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {["Free to start", "No credit card required", "Setup in 2 minutes"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-[#FDC304]" />
              <span className="text-[11px] font-medium text-white/35">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
