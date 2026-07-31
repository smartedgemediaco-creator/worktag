"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Store, CreditCard, Car, ArrowRight, X, Plus } from "lucide-react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

const CATEGORY_META = {
  Storefront: { icon: Store },
  "Cards & Tags": { icon: CreditCard },
  "On the Move": { icon: Car },
} as const;

type Category = keyof typeof CATEGORY_META;

type GalleryItem = {
  src: string;
  alt: string;
  label: string;
  desc: string;
  category: Category;
  span: string;
};

const GALLERY: GalleryItem[] = [
  { src: "/images/window.png", alt: "WorkTag window display", label: "Window Display", desc: "Your shop sells even while you're closed.", category: "Storefront", span: "col-span-5 row-span-4" },
  { src: "/images/acrylic.png", alt: "Premium acrylic tag", label: "Premium Acrylic Tag", desc: "A counter companion that answers for you.", category: "Cards & Tags", span: "col-span-3 row-span-4" },
  { src: "/images/car.png", alt: "WorkTag vehicle decal", label: "Vehicle Decal", desc: "A billboard that drives itself.", category: "On the Move", span: "col-span-4 row-span-2" },
  { src: "/images/business-card.png", alt: "WorkTag business card", label: "Business Card", desc: "The card that keeps talking after you leave.", category: "Cards & Tags", span: "col-span-4 row-span-2" },
  { src: "/images/pvc.png", alt: "Durable PVC tag", label: "PVC Tag", desc: "Tough enough for the toolbox. Honest for the counter.", category: "Cards & Tags", span: "col-span-6 row-span-3" },
  { src: "/images/card stack.png", alt: "WorkTag business card stack", label: "Card Sets", desc: "One handshake. One scan. Instant trust.", category: "Cards & Tags", span: "col-span-6 row-span-3" },
  { src: "/images/stickers.png", alt: "WorkTag sticker pack", label: "Sticker Pack", desc: "Stick trust on anything that moves.", category: "Cards & Tags", span: "col-span-12 row-span-2" },
];

const ROW_HEIGHTS = "auto-rows-[110px] sm:auto-rows-[120px]";

export function PortfolioGallery() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

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
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#0241A8] uppercase">
            Portfolio
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-[#090D1F]">
            See WorkTag in the
            <br />
            <span className="bg-gradient-to-r from-[#0241A8] to-[#3FA9F5] bg-clip-text text-transparent">real world.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-lg mx-auto">
            From storefronts to delivery vans — WorkTag lives on every touchpoint where your customers already look.
          </p>
        </motion.div>

        {/* Editorial collage */}
        <div className={`grid grid-cols-12 [grid-auto-flow:dense] gap-3 sm:gap-4 ${ROW_HEIGHTS}`}>
          {GALLERY.map((item, i) => {
            const Icon = CATEGORY_META[item.category].icon;
            return (
              <motion.button
                type="button"
                key={item.src}
                onClick={() => setSelected(item)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative rounded-2xl overflow-hidden bg-[#E8EBF2]/30 shadow-[0_14px_40px_-16px_rgba(2,65,168,0.25)] text-left cursor-zoom-in ring-1 ring-transparent hover:ring-[#FDC304]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3FA9F5] ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={700}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#011d52]/90 via-[#011d52]/10 to-transparent" />

                {/* Editorial index */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-[9px] font-bold text-[#0241A8]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2 py-1 shadow-sm">
                    <Icon className="h-2.5 w-2.5 text-[#0241A8]" />
                    <span className="text-[8px] font-bold text-[#0241A8] uppercase tracking-wider">{item.category}</span>
                  </span>
                </div>

                {/* Zoom hint */}
                <div className="absolute top-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/40 backdrop-blur text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Plus className="h-3.5 w-3.5" />
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 sm:p-4">
                  <div className="text-[13px] sm:text-[15px] font-bold text-white">{item.label}</div>
                  <p className="mt-0.5 text-[10px] sm:text-[11px] font-semibold leading-snug text-[#FDC304] max-w-[92%]">{item.desc}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 text-center"
        >
          <Link
            href="#benefit-qr"
            className="inline-flex items-center gap-2 rounded-full bg-[#0241A8] px-7 py-3.5 text-sm font-bold text-white shadow-[0_16px_40px_-12px_rgba(2,65,168,0.6)] transition-all duration-300 hover:bg-[#012f7a] hover:-translate-y-0.5"
          >
            View all our products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Dialog open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent
          overlayClassName="bg-black/95 backdrop-blur-sm"
          className="max-w-5xl border-0 bg-transparent p-0 shadow-none ring-0"
          showCloseButton={false}
        >
          <AnimatePresence>
            {selected && (
              <motion.div
                key={selected.src}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex h-[85vh] flex-col items-center justify-center gap-6 p-4 sm:p-8"
              >
                <DialogClose
                  className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </DialogClose>

                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src={selected.src}
                    alt={selected.alt}
                    width={1200}
                    height={1200}
                    className="max-h-full w-auto max-w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                  />
                </div>

                <div className="text-center">
                  <div className="text-[15px] font-bold text-white">{selected.label}</div>
                  <p className="mt-1 text-[13px] font-semibold text-[#FDC304]">{selected.desc}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
