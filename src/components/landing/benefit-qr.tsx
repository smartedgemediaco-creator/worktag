"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const PRODUCTS = [
  { src: "/images/acrylic.png", alt: "Acrylic Tag", label: "Premium Acrylic", desc: "For counters & storefronts" },
  { src: "/images/pvc.png", alt: "PVC Tag", label: "PVC Tag", desc: "Durable & weatherproof" },
  { src: "/images/card stack.png", alt: "Business Cards", label: "Business Cards", desc: "Embedded QR technology" },
  { src: "/images/stickers.png", alt: "Stickers", label: "Stickers", desc: "Windows, vehicles & tools" },
];

export function BenefitQR() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="benefit-qr" ref={sectionRef} className="relative bg-white py-28 sm:py-36 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#6366F1]/[0.03] rounded-full blur-[150px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#0241A8] uppercase">
              QR Ecosystem
            </span>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-[#090D1F]">
              QR codes that
              <br />
              <span className="text-gradient-purple">work everywhere.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#5A6A8A] max-w-md">
              From your shop window to your delivery van. One scan connects anyone to your verified identity.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "No app required — works with any camera",
                "Loads instantly on any device",
                "Scannable from up to 3 meters away",
                "Weatherproof physical materials",
              ].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10">
                    <Check className="h-3 w-3 text-[#10B981] stroke-[3]" />
                  </span>
                  <span className="text-[13px] text-[#5A6A8A]">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product grid */}
          <motion.div style={{ y: parallaxY }} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {PRODUCTS.map((product, i) => (
                <motion.div
                  key={product.alt}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="group"
                >
                  <div className="aspect-square rounded-3xl overflow-hidden bg-[#F8FAFC] border border-[#E8EBF2]/60 shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-1">
                    <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.5 }} className="w-full h-full">
                      <Image src={product.src} alt={product.alt} width={300} height={300} className="object-cover w-full h-full" />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                      <div className="text-sm font-bold text-white">{product.label}</div>
                      <div className="text-[11px] text-white/70 mt-0.5">{product.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-16 sm:mt-20 rounded-3xl bg-[#090D1F] p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center p-2">
              <Image src="/images/qr-worktag.webp" alt="QR" width={64} height={64} className="object-contain opacity-80" />
              <motion.div
                className="absolute left-[10%] right-[10%] h-[1.5px] bg-gradient-to-r from-transparent via-[#10B981]/80 to-transparent shadow-[0_0_12px_#10B981]/30"
                animate={{ top: ["10%", "88%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Scan. Verify. Trust.</h3>
              <p className="text-[13px] text-white/40 mt-0.5">Average load time: under 0.3 seconds</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            {[
              { value: "0.3s", label: "Load time" },
              { value: "100%", label: "Compatible" },
              { value: "0", label: "Apps needed" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-extrabold text-white tracking-tight">{stat.value}</div>
                <div className="text-[10px] text-white/30 font-medium uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
