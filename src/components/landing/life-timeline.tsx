"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { UserPlus, BadgeCheck, QrCode, Share2 } from "lucide-react";

const MILESTONES = [
  {
    phase: "01",
    icon: UserPlus,
    title: "Sign Up",
    description:
      "Create your account in under 3 minutes. Add your name, business type, and location.",
    image: "/images/welcome letter.png",
    time: "Day 1",
    meta: "Under 3 minutes",
  },
  {
    phase: "02",
    icon: BadgeCheck,
    title: "Get Verified",
    description:
      "Submit your ID and business credentials. Our team verifies your identity within 24 hours.",
    image: "/images/invoice.png",
    time: "Day 2",
    meta: "Within 24 hours",
  },
  {
    phase: "03",
    icon: QrCode,
    title: "Receive Your Tag",
    description:
      "Your unique QR code is generated. Order physical tags or start sharing digitally.",
    image: "/images/qr-worktag.webp",
    time: "Day 3",
    meta: "Instant generation",
  },
  {
    phase: "04",
    icon: Share2,
    title: "Deploy Everywhere",
    description:
      "Place your WorkTag on your shop, vehicle, cards, and uniform. Share on WhatsApp and social media.",
    image: "/images/car.png",
    time: "Week 1",
    meta: "Any surface, any city",
  },
];

export function LifeTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.9], [0, 100]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-[#F8FAFC] py-28 sm:py-36 lg:py-44 overflow-hidden"
    >
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute inset-0 dot-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px] bg-[#3FA9F5]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[520px] h-[420px] bg-[#FDC304]/8 rounded-full blur-[130px] pointer-events-none" />

      {/* Header */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-24 sm:mb-32"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#0241A8] uppercase">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#0241A8]" />
            Our Journey
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#FDC304]" />
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-[#090D1F]">
            From sign-up to
            <br />
            <span className="bg-gradient-to-r from-[#0241A8] via-[#3FA9F5] to-[#FDC304] bg-clip-text text-transparent">
              trusted authority.
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-lg mx-auto">
            Follow the journey of thousands of professionals who transformed their businesses with WorkTag.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Connecting line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full bg-[#E8EBF2]/70 hidden lg:block">
          <motion.div
            className="w-full rounded-full bg-gradient-to-b from-[#0241A8] via-[#3FA9F5] to-[#FDC304]"
            style={{ height: lineProgress }}
          />
        </div>
        <div className="absolute left-1/2 top-0 bottom-0 w-[5px] -translate-x-1/2 rounded-full pointer-events-none hidden lg:block">
          <motion.div
            className="w-full bg-gradient-to-b from-[#3FA9F5]/0 via-[#3FA9F5]/30 to-[#FDC304]/0 blur-[4px]"
            style={{ height: lineProgress }}
          />
        </div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-0">
          {MILESTONES.map((milestone, i) => {
            const Icon = milestone.icon;
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={milestone.phase}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative lg:grid lg:grid-cols-2 lg:items-center lg:min-h-[540px]"
              >
                {/* Giant numeral on the line */}
                <div className="hidden sm:block absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[14%] z-0 select-none pointer-events-none">
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="block bg-gradient-to-b from-[#0241A8]/12 via-[#3FA9F5]/8 to-[#FDC304]/10 bg-clip-text text-transparent text-[13rem] xl:text-[16rem] font-black leading-[0.82] tracking-tighter"
                  >
                    {milestone.phase}
                  </motion.span>
                </div>

                {/* Gold node pin where the line meets each numeral */}
                <span className="hidden lg:block absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[18%] z-[1] h-4 w-4 rounded-full bg-[#FDC304] ring-4 ring-white shadow-[0_0_0_8px_rgba(253,195,4,0.15)]" />

                {/* Collage card */}
                <div
                  className={`relative z-10 max-w-md mx-auto lg:mx-0 ${
                    isEven ? "lg:col-start-1 lg:justify-self-end lg:-mr-20" : "lg:col-start-2 lg:justify-self-start lg:-ml-20"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="group relative rounded-[2rem] p-px bg-gradient-to-br from-[#3FA9F5]/50 via-[#E8EBF2]/40 to-[#FDC304]/50 transition-all duration-500 hover:shadow-[0_48px_100px_-32px_rgba(2,65,168,0.45)]"
                  >
                    <div className="relative rounded-[calc(2rem-1px)] bg-white p-7 sm:p-8 lg:p-9 lg:pb-16 overflow-hidden">
                      <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#3FA9F5]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="flex items-center gap-2.5 mb-5">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] shadow-[0_10px_24px_-10px_rgba(2,65,168,0.7)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
                          <Icon className="h-5 w-5 text-white" />
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDC304] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#090D1F]">
                          {milestone.time}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-[#090D1F] mb-2.5 transition-colors duration-300 group-hover:text-[#0241A8]">
                        {milestone.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[#475569] pr-2">
                        {milestone.description}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#0241A8]/6 to-[#3FA9F5]/6 px-3.5 py-2 text-xs font-bold text-[#0241A8]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FDC304]" />
                        {milestone.meta}
                      </div>

                      {/* Image */}
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        width={640}
                        height={400}
                        className="mt-6 lg:mt-0 w-full h-40 lg:w-44 lg:h-44 lg:absolute lg:-bottom-9 lg:-right-9 lg:rotate-6 rounded-2xl object-cover ring-4 ring-white shadow-[0_24px_50px_-16px_rgba(2,65,168,0.45)] transition-transform duration-700 group-hover:lg:rotate-3 group-hover:lg:scale-105"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
