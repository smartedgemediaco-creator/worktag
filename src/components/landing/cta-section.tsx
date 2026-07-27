"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#050816] py-28 sm:py-36 lg:py-44">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-[0.04]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0241A8]/[0.12] rounded-full blur-[160px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[#3FA9F5]/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[250px] h-[250px] bg-[#06B6D4]/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Floating accent dots */}
      <div className="absolute top-20 left-[15%] w-2 h-2 rounded-full bg-[#3FA9F5]/30 animate-[float_6s_ease-in-out_infinite]" />
      <div className="absolute top-32 right-[20%] w-1.5 h-1.5 rounded-full bg-[#0241A8]/40 animate-[float_8s_ease-in-out_infinite_1s]" />
      <div className="absolute bottom-24 left-[25%] w-1 h-1 rounded-full bg-[#06B6D4]/30 animate-[float_7s_ease-in-out_infinite_2s]" />
      <div className="absolute bottom-32 right-[15%] w-2.5 h-2.5 rounded-full bg-[#3FA9F5]/20 animate-[float_9s_ease-in-out_infinite_0.5s]" />

      <div className="relative mx-auto max-w-[900px] px-6 lg:px-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-2 mb-10"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#3FA9F5]" />
          <span className="text-[11px] font-bold tracking-[0.15em] text-white/50 uppercase">Join the future of trust</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-[clamp(2.2rem,5vw,4rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-white"
        >
          Ready to build trust
          <br />
          <span className="bg-gradient-to-r from-[#3FA9F5] via-[#06B6D4] to-[#3FA9F5] bg-clip-text text-transparent">
            that lasts?
          </span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-7 text-[15px] sm:text-base leading-[1.8] text-white/40 max-w-lg mx-auto"
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
            className="group relative inline-flex h-13 items-center gap-2.5 rounded-full bg-[#0241A8] px-8 text-sm font-bold text-white shadow-[0_0_40px_-8px_rgba(2,65,168,0.5)] transition-all duration-300 hover:shadow-[0_0_60px_-8px_rgba(2,65,168,0.7)] hover:-translate-y-[1px]"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex h-13 items-center justify-center rounded-full border border-white/10 px-8 text-sm font-bold text-white/50 transition-all duration-300 hover:border-white/20 hover:text-white/80"
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
              <div className="h-1 w-1 rounded-full bg-[#10B981]" />
              <span className="text-[11px] font-medium text-white/25">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
