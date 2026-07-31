"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, QrCode, Shield } from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Create your profile",
    description:
      "Add your business name, photos of your services, WhatsApp links, and verified credentials. Your profile is the anchor of your trust footprint.",
    image: "/images/review.png",
    tag: "Claim Identity",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Deploy your WorkTag QR",
    description:
      "Get a custom scannable QR tag linked directly to your immutable profile. Use it on stickers, business cards, vehicle decals, or storefronts.",
    image: "/images/sticker.png",
    tag: "Deploy Tag",
    icon: QrCode,
  },
  {
    number: "03",
    title: "Collect Trust Signals",
    description:
      "Customers scan your tag to verify you instantly. Every review left on your tag builds a robust digital reputation verified on-chain.",
    image: "/images/testimonials/ngozi.jpg",
    tag: "Build Trust",
    icon: Shield,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const stepItem = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white py-28 sm:py-36 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,#C9D7FF/25_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3FA9F5]/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#FDC304] uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDC304]" />
            Workflow
          </span>
          <h2 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-[#090D1F]">
            Three steps to
            <span className="bg-gradient-to-r from-[#0241A8] via-[#3FA9F5] to-[#FDC304] bg-clip-text text-transparent"> infinite trust.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5A6A8A] max-w-md">
            Setup takes less than five minutes. The professional trust you establish lasts forever.
          </p>
        </motion.div>

        {/* Connecting line */}
        <div className="relative mt-20 sm:mt-24">
          <div className="absolute top-[30%] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#0241A8]/15 via-[#3FA9F5]/30 to-[#FDC304]/20 hidden md:block" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10"
          >
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepItem}
                  className="group relative flex flex-col"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E8EBF2] bg-white shadow-[0_10px_30px_-12px_rgba(2,65,168,0.1)] transition-all duration-500 group-hover:shadow-[0_20px_50px_-20px_rgba(2,65,168,0.2)] group-hover:-translate-y-1">
                    <Image src={step.image} alt={step.title} width={600} height={450} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D1F]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur border border-[#E8EBF2] px-2.5 py-1 shadow-sm">
                      <Icon className="h-3 w-3 text-[#FDC304]" />
                      <span className="text-[9px] font-bold tracking-wider text-[#090D1F] uppercase">{step.tag}</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4 items-start">
                    <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] text-sm font-[900] text-white shrink-0 shadow-[0_6px_16px_rgba(2,65,168,0.25)]">
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#090D1F] tracking-tight">{step.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#5A6A8A]">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
