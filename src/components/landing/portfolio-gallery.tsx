"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const GALLERY = [
  { src: "/images/storefront.jpg", alt: "WorkTag on storefront", span: "col-span-2 row-span-2", label: "Storefront Display" },
  { src: "/images/avatars/aisha.jpg", alt: "Aisha", span: "col-span-1 row-span-1", label: "Aisha's Designs" },
  { src: "/images/business-card.png", alt: "Business Card", span: "col-span-1 row-span-1", label: "Premium Card" },
  { src: "/images/acrylic.png", alt: "Acrylic Tag", span: "col-span-1 row-span-2", label: "Acrylic Tag" },
  { src: "/images/avatars/segun.jpg", alt: "Segun", span: "col-span-1 row-span-1", label: "Segun Plumbing" },
  { src: "/images/window.png", alt: "Window Display", span: "col-span-1 row-span-1", label: "Window Display" },
  { src: "/images/avatars/funke.jpg", alt: "Funke", span: "col-span-1 row-span-1", label: "Funke's Kitchen" },
  { src: "/images/stickers.png", alt: "Stickers", span: "col-span-1 row-span-1", label: "Stickers" },
  { src: "/images/avatars/ngozi.jpg", alt: "Ngozi", span: "col-span-1 row-span-1", label: "Ngozi Properties" },
  { src: "/images/pvc.png", alt: "PVC Tag", span: "col-span-1 row-span-1", label: "PVC Tag" },
];

export function PortfolioGallery() {
  return (
    <section className="relative bg-[#F8FAFC] py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#6366F1] uppercase">
            Portfolio
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-[#090D1F]">
            See WorkTag in the
            <br />
            <span className="text-gradient-purple">real world.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-lg mx-auto">
            From storefronts to delivery vans, from uniforms to business cards. WorkTag integrates into every touchpoint of your business.
          </p>
        </motion.div>

        {/* Masonry-style gallery */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px]">
          {GALLERY.map((item, i) => (
            <motion.div
              key={item.alt}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className={`group relative rounded-2xl overflow-hidden bg-[#E8EBF2]/30 ${item.span}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-sm font-bold text-white">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
