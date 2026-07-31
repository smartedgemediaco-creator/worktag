"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Check, ShieldCheck, Star, BadgeCheck } from "lucide-react";

const PRODUCTS = [
  { src: "/images/acrylic.png", alt: "Acrylic Tag", label: "Premium Acrylic", desc: "For counters & storefronts" },
  { src: "/images/pvc.png", alt: "PVC Tag", label: "PVC Tag", desc: "Durable & weatherproof" },
  { src: "/images/card stack.png", alt: "Business Cards", label: "Business Cards", desc: "Embedded QR technology" },
  { src: "/images/stickers.png", alt: "Stickers", label: "Stickers", desc: "Windows, vehicles & tools" },
];

const FEATURES = [
  "No app required — any camera scans it",
  "Loads instantly on any device",
  "Scannable from up to 3 meters away",
  "Works with zero apps installed",
];

const STATS = [
  { value: "0.3s", label: "Load time", note: "under 0.3 seconds" },
  { value: "100%", label: "Compatible", note: "every phone, every camera" },
  { value: "0", label: "Apps needed", note: "nothing to install" },
];

export function BenefitQR() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="benefit-qr" ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0 benefit-gradient-1" />
      <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0241A8]/[0.09] rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#3FA9F5]/[0.06] rounded-full blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-28 sm:py-36 lg:py-44">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          {/* Left: QR centerpiece */}
          <motion.div style={{ y: parallaxY }} className="lg:col-span-5">
            <div className="relative mx-auto w-fit">
              {/* Glow ring behind QR */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -m-10 rounded-full bg-[#3FA9F5]/10 blur-[60px]"
              />

              {/* Corner brackets */}
              <div className="absolute -top-3 -left-3 h-8 w-8 border-t-2 border-l-2 border-[#FDC304] rounded-tl-lg z-10" />
              <div className="absolute -top-3 -right-3 h-8 w-8 border-t-2 border-r-2 border-[#FDC304] rounded-tr-lg z-10" />
              <div className="absolute -bottom-3 -left-3 h-8 w-8 border-b-2 border-l-2 border-[#FDC304] rounded-bl-lg z-10" />
              <div className="absolute -bottom-3 -right-3 h-8 w-8 border-b-2 border-r-2 border-[#FDC304] rounded-br-lg z-10" />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-60 h-60 sm:w-64 sm:h-64 rounded-3xl bg-white p-5 shadow-[0_30px_80px_-20px_rgba(2,65,168,0.5)] overflow-hidden"
              >
                <Image
                  src="/images/qr-worktag.webp"
                  alt="WorkTag QR code"
                  width={220}
                  height={220}
                  className="w-full h-full object-contain"
                />
                {/* Scan beam */}
                <motion.div
                  className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-[#3FA9F5] to-transparent shadow-[0_0_16px_rgba(63,169,245,0.9)]"
                  animate={{ top: ["12%", "86%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Floating verification chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -left-6 sm:-left-16 top-8 flex items-center gap-1.5 rounded-full bg-[#0b1230]/90 backdrop-blur border border-[#10B981]/30 px-3 py-1.5 shadow-lg"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="text-[10px] font-bold text-white">Verified</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="absolute -right-6 sm:-right-14 top-1/3 flex items-center gap-1.5 rounded-full bg-[#0b1230]/90 backdrop-blur border border-[#FDC304]/30 px-3 py-1.5 shadow-lg"
              >
                <Star className="h-3.5 w-3.5 text-[#FDC304] fill-[#FDC304]" />
                <span className="text-[10px] font-bold text-white">4.9 · 128 reviews</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#0b1230]/90 backdrop-blur border border-[#3FA9F5]/30 px-3 py-1.5 shadow-lg whitespace-nowrap"
              >
                <BadgeCheck className="h-3.5 w-3.5 text-[#3FA9F5]" />
                <span className="text-[10px] font-bold text-white">Trust Score 94</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#FDC304] uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDC304]" />
              QR
            </span>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-white">
              Scan. Verify.
              <br />
              <span className="bg-gradient-to-r from-[#FDC304] via-[#3FA9F5] to-[#0241A8] bg-clip-text text-transparent">
                Trust.
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/70 max-w-md">
              One scan connects anyone to your verified identity, your reviews, and your services.
              Average load time: <span className="font-bold text-[#FDC304]">under 0.3 seconds</span>.
            </p>

            <div className="mt-8 space-y-3">
              {FEATURES.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 border border-[#10B981]/25">
                    <Check className="h-3 w-3 text-[#10B981] stroke-[3]" />
                  </span>
                  <span className="text-[13px] text-white/70">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 grid grid-cols-3 divide-x divide-white/[0.07] rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-sm"
            >
              {STATS.map((stat) => (
                <div key={stat.label} className="px-4 py-5 sm:px-6 text-center">
                  <div className="text-2xl sm:text-3xl font-[900] bg-gradient-to-r from-[#FDC304] to-[#FDE047] bg-clip-text text-transparent tracking-tight">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] font-bold text-white/70 uppercase tracking-wider">{stat.label}</div>
                  <div className="text-[9px] text-white/35 mt-0.5 hidden sm:block">{stat.note}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Product formats */}
        <div className="mt-20 sm:mt-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold tracking-[0.15em] text-white/70 uppercase">
              Choose your physical format
            </h3>
            <span className="hidden sm:block text-[11px] text-white/40">Built for real-world wear & tear</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.alt}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.07] hover:border-[#FDC304]/30 transition-colors duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white/[0.03]">
                  <Image
                    src={product.src}
                    alt={product.alt}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-white">{product.label}</div>
                  <div className="text-[11px] text-white/40 mt-0.5">{product.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
