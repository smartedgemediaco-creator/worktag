"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "10,000+", label: "Verified businesses" },
  { value: "50,000+", label: "QR scans per month" },
  { value: "98%", label: "Customer trust rating" },
  { value: "4.9", label: "Average review score" },
];

const statItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
} as const;

export function StatsSection() {
  return (
    <section className="relative bg-white border-y border-[#E2E8F0]/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statItem}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              <div className="text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-[#0F172A] tracking-[-0.02em]">
                {stat.value}
              </div>
              <div className="text-sm text-[#475569] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
