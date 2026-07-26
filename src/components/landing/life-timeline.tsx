"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { UserPlus, BadgeCheck, QrCode, Share2, TrendingUp, Award, Rocket } from "lucide-react";

const MILESTONES = [
  {
    phase: "01",
    icon: UserPlus,
    title: "Sign Up",
    description: "Create your account in under 3 minutes. Add your name, business type, and location.",
    image: "/images/avatars/chinedu.jpg",
    time: "Day 1",
    color: "#6366F1",
  },
  {
    phase: "02",
    icon: BadgeCheck,
    title: "Get Verified",
    description: "Submit your ID and business credentials. Our team verifies your identity within 24 hours.",
    image: "/images/avatars/aisha.jpg",
    time: "Day 2",
    color: "#8B5CF6",
  },
  {
    phase: "03",
    icon: QrCode,
    title: "Receive Your Tag",
    description: "Your unique QR code is generated. Order physical tags or start sharing digitally.",
    image: "/images/qr-worktag.webp",
    time: "Day 3",
    color: "#06B6D4",
  },
  {
    phase: "04",
    icon: Share2,
    title: "Deploy Everywhere",
    description: "Place your WorkTag on your shop, vehicle, cards, and uniform. Share on WhatsApp and social media.",
    image: "/images/storefront.jpg",
    time: "Week 1",
    color: "#10B981",
  },
  {
    phase: "05",
    icon: TrendingUp,
    title: "Collect Reviews",
    description: "Customers scan your tag and leave verified reviews. Your trust score begins to climb.",
    image: "/images/avatars/funke.jpg",
    time: "Month 1",
    color: "#F59E0B",
  },
  {
    phase: "06",
    icon: Award,
    title: "Build Reputation",
    description: "Your trust score grows with every interaction. Become a top-rated professional in your area.",
    image: "/images/avatars/ngozi.jpg",
    time: "Month 3",
    color: "#EC4899",
  },
  {
    phase: "07",
    icon: Rocket,
    title: "Business Grows",
    description: "More trust leads to more customers. Your WorkTag becomes your most powerful marketing tool.",
    image: "/images/avatars/segun.jpg",
    time: "Month 6+",
    color: "#6366F1",
  },
];

export function LifeTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);

  return (
    <section ref={sectionRef} className="relative bg-white py-28 sm:py-36 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute inset-0 dot-grid opacity-10" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20 sm:mb-24"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#6366F1] uppercase">
            Your Journey
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-[#090D1F]">
            From sign-up to
            <br />
            <span className="text-gradient-purple">trusted authority.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-lg mx-auto">
            Follow the journey of thousands of professionals who transformed their businesses with WorkTag.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line - desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E8EBF2]/40 -translate-x-1/2 hidden lg:block">
            <motion.div
              className="w-full bg-gradient-to-b from-[#6366F1] via-[#06B6D4] to-[#10B981]"
              style={{ height: lineProgress }}
            />
          </div>

          {/* Animated progress line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-[#6366F1] via-[#8B5CF6] to-[#06B6D4]"
              style={{ height: lineProgress }}
            />
          </div>

          {/* Mobile left line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-[#E8EBF2]/40 lg:hidden" />

          <div className="space-y-12 sm:space-y-16 lg:space-y-0">
            {MILESTONES.map((milestone, i) => {
              const Icon = milestone.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={milestone.phase}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${
                    i < MILESTONES.length - 1 ? "lg:pb-20" : ""
                  }`}
                >
                  {/* Mobile phase indicator */}
                  <div className="lg:hidden absolute left-0 top-0 flex items-center gap-3">
                    <span
                      className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border-2 text-xs font-bold text-white shadow-lg"
                      style={{ borderColor: milestone.color, backgroundColor: milestone.color }}
                    >
                      {milestone.phase}
                    </span>
                  </div>

                  {/* Desktop phase dot */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative"
                    >
                      <span
                        className="inline-flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-sm font-bold text-white shadow-lg"
                        style={{ backgroundColor: milestone.color }}
                      >
                        {milestone.phase}
                      </span>
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                        style={{ backgroundColor: milestone.color }}
                      />
                    </motion.div>
                  </div>

                  {/* Content side */}
                  <div className={`${isEven ? "lg:pr-16" : "lg:col-start-2 lg:pl-16"} pl-20 lg:pl-0`}>
                    <div className={`rounded-3xl p-7 sm:p-8 transition-all duration-500 ${
                      isEven
                        ? "bg-[#F8FAFC] border border-[#E8EBF2]/40"
                        : "bg-white border border-[#E8EBF2]/40 shadow-card"
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg"
                          style={{ backgroundColor: `${milestone.color}12` }}
                        >
                          <Icon className="h-4 w-4" style={{ color: milestone.color }} />
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.15em] uppercase" style={{ color: milestone.color }}>
                          {milestone.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#090D1F] mb-2">{milestone.title}</h3>
                      <p className="text-sm leading-relaxed text-[#475569]">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Image side */}
                  <div className={`${isEven ? "lg:col-start-2 lg:pl-16" : "lg:row-start-1 lg:pr-16"} mt-4 lg:mt-0 pl-20 lg:pl-0`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      transition={{ duration: 0.4 }}
                      className="relative rounded-2xl overflow-hidden aspect-[4/3] max-w-sm bg-[#F4F6FA] shadow-card"
                    >
                      <Image
                        src={milestone.image}
                        alt={milestone.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-[#090D1F]">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: milestone.color }} />
                          Phase {milestone.phase}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
