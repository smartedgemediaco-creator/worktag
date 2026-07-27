"use client";

import Link from "next/link";
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
          Join 10,000+ professionals who use WorkTag to verify their identity
          and earn customer trust with every scan.
        </motion.p>

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
