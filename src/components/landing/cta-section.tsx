"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0F172A]">
              Ready to build trust that lasts?
            </h2>
            <p className="text-base leading-relaxed text-[#475569] max-w-md mx-auto">
              Join thousands of professionals who use WorkTag to verify their identity and earn customer trust with every scan.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Link
              href="/register"
              className="relative inline-flex h-12 items-center justify-center rounded-[10px] bg-[#0241A8] px-7 text-sm font-semibold text-white shadow-lg shadow-[#0241A8]/15 transition-all duration-300 hover:shadow-xl hover:shadow-[#0241A8]/25 hover:-translate-y-[0.5px] active:translate-y-0"
            >
              Create your WorkTag
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-[10px] border border-[#E2E8F0]/70 px-7 text-sm font-semibold text-[#475569] transition-all duration-300 hover:border-[#CBD5E1] hover:text-[#0F172A]"
            >
              Learn more
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
