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
    image: "/images/storefront.jpg",
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
    <section id="how-it-works" className="relative bg-white py-32 sm:py-40 overflow-hidden">
      <div className="gradient-mesh absolute inset-0 pointer-events-none opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,#C9D7FF/8_0%,transparent_100%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#6366F1] uppercase">Workflow</span>
          <h2 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-[#090D1F]">
            Three steps to infinite trust.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5C6479] max-w-md">
            Setup takes less than five minutes. The professional trust you establish lasts forever.
          </p>
        </motion.div>

        {/* Desktop Connecting Pipeline Line */}
        <div className="relative mt-20 sm:mt-24">
          <div className="absolute top-[30%] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#6366F1]/10 via-[#06B6D4]/30 to-[#8B5CF6]/10 hidden md:block" />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8"
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepItem}
                  className="group relative flex flex-col"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-cyber group-hover:-translate-y-1 relative">
                    <Image src={step.image} alt={step.title} width={600} height={450} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="mt-6 flex gap-4 items-start relative z-10 bg-white pt-2">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#0241A8] to-[#6366F1] text-xs font-extrabold text-white shrink-0 shadow-[0_4px_12px_rgba(99,102,241,0.25)]">
                      {step.number}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Icon className="h-3.5 w-3.5 text-[#6366F1] shrink-0" />
                        <span className="text-[9px] font-bold tracking-wider text-[#6366F1]/70 uppercase">{step.tag}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#090D1F] tracking-tight">{step.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-[#5C6479]">{step.description}</p>
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
