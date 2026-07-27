"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const PRODUCTS = [
  { src: "/images/acrylic.png", alt: "WorkTag acrylic tag" },
  { src: "/images/pvc.png", alt: "WorkTag PVC tag" },
  { src: "/images/card stack.png", alt: "WorkTag business cards" },
  { src: "/images/stickers.png", alt: "WorkTag stickers" },
];

export function QRExperience() {
  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col items-center gap-12 sm:gap-16 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 space-y-6 max-w-md"
          >
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#0241A8] uppercase">
              QR Experience
            </span>
            <h2 className="text-[clamp(2rem,3.5vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0F172A]">
              One scan. Instant trust.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#475569]">
              A unique QR code that works everywhere — your counter, tools, vehicle, or uniform. Customers scan and see your verified profile instantly. No app. No friction.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              {["No app required", "Works on any device", "Loads instantly"].map((tag) => (
                <span key={tag} className="inline-flex rounded-full border border-[#E2E8F0]/70 px-4 py-1.5 text-sm text-[#475569] bg-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-center gap-6"
          >
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 gap-4 w-full max-w-sm"
            >
              {PRODUCTS.map((product) => (
                <motion.div
                  key={product.alt}
                  variants={item}
                  className="aspect-square rounded-2xl overflow-hidden bg-white border border-[#E2E8F0]/40 shadow-card transition-all duration-500 hover:shadow-elevated hover:-translate-y-0.5 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <Image
                      src={product.src}
                      alt={product.alt}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            <p className="text-xs text-[#475569]/30 text-center">Available in acrylic, PVC, card, and sticker formats</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
