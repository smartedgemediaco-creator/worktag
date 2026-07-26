"use client";

import { motion } from "framer-motion";

const TIMELINE = [
  {
    phase: "01",
    title: "Sign up in minutes",
    description: "Create your account and profile. Add your business details, services, and contact information. No technical skills required.",
  },
  {
    phase: "02",
    title: "Get verified",
    description: "Submit your credentials for verification. We confirm your identity, registration, and business details so your customers can trust what they see.",
  },
  {
    phase: "03",
    title: "Receive your QR code",
    description: "Your unique WorkTag QR is generated and ready. Download it digitally, or order premium physical tags for your storefront, cards, and vehicles.",
  },
  {
    phase: "04",
    title: "Share everywhere",
    description: "Place your WorkTag everywhere customers find you. Every scan leads to your verified profile with your services, reviews, and contact options.",
  },
  {
    phase: "05",
    title: "Build reputation over time",
    description: "Collect reviews, grow your trust score, and update your profile as your business evolves. Trust compounds with every verified interaction.",
  },
];

const lineItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
} as const;

export function TimelineSection() {
  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
      <div className="dot-grid absolute inset-0 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl"
        >
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[#0A3D91] uppercase">
            Your journey
          </span>
          <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0F172A]">
            From setup to trust.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-md">
            The path from creating your profile to building a reputation that follows you everywhere.
          </p>
        </motion.div>

        <div className="mt-20 sm:mt-24 relative">
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-[#E2E8F0]/60 hidden md:block" />

          <div className="space-y-16 sm:space-y-20">
            {TIMELINE.map((item) => (
              <motion.div
                key={item.phase}
                variants={lineItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="relative flex flex-col md:flex-row gap-6 md:gap-10"
              >
                <div className="flex md:flex-col items-center md:items-start gap-4 md:w-48 shrink-0">
                  <span className="relative z-10 inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-white border border-[#E2E8F0]/60 text-xs font-bold text-[#0A3D91]">
                    {item.phase}
                  </span>
                  <span className="text-[10px] font-semibold tracking-[0.15em] text-[#475569]/30 uppercase hidden md:block">
                    Phase {item.phase}
                  </span>
                </div>
                <div className="pt-1 md:pt-2.5">
                  <h3 className="text-lg font-semibold text-[#0F172A]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] max-w-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
