"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BadgeCheck, Shield, FileCheck, Fingerprint, Landmark, Camera } from "lucide-react";

const VERIFICATION_STEPS = [
  {
    icon: Camera,
    title: "Photo ID",
    desc: "Submit a valid government-issued ID for instant verification",
    color: "#6366F1",
  },
  {
    icon: Landmark,
    title: "Business Registration",
    desc: "Verify your CAC registration or business license",
    color: "#8B5CF6",
  },
  {
    icon: FileCheck,
    title: "Professional Credentials",
    desc: "Add certifications, memberships, and trade qualifications",
    color: "#06B6D4",
  },
  {
    icon: Fingerprint,
    title: "Biometric Check",
    desc: "Optional biometric verification for maximum trust level",
    color: "#10B981",
  },
];

export function BenefitVerification() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="benefit-verification" ref={sectionRef} className="relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 benefit-gradient-3" />
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#10B981]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#06B6D4]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#34D399] uppercase">
              Benefit 05
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-white">
              Verification that
              <br />
              <span className="bg-gradient-to-r from-[#34D399] via-[#06B6D4] to-[#818CF8] bg-clip-text text-transparent">
                means something.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#94A3B8] max-w-lg mx-auto">
              Multi-layer verification that confirms who you are, what you do, and why customers can trust you. Not just a blue checkmark.
            </p>
          </motion.div>

          {/* Verification badge hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-16"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-4 rounded-full bg-white/[0.06] border border-white/[0.1] px-8 py-5 backdrop-blur-sm"
              >
                <div className="relative">
                  <BadgeCheck className="h-12 w-12 text-[#10B981]" />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ boxShadow: ["0 0 20px rgba(16, 185, 129, 0.2)", "0 0 40px rgba(16, 185, 129, 0.4)", "0 0 20px rgba(16, 185, 129, 0.2)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div>
                  <div className="text-xl font-[900] text-white">WorkTag Verified</div>
                  <div className="text-sm text-white/50">Multi-layer identity confirmation</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Verification steps */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFICATION_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-3xl bg-white/[0.04] border border-white/[0.06] p-7 hover-lift overflow-hidden"
              >
                {/* Step number */}
                <div className="absolute top-4 right-4 text-[64px] font-[900] text-white/[0.03] leading-none">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                  style={{ backgroundColor: `${step.color}15` }}
                >
                  <step.icon className="h-6 w-6" style={{ color: step.color }} />
                </span>

                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs leading-relaxed text-white/50">{step.desc}</p>

                {/* Connecting line */}
                {i < VERIFICATION_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Trust guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 rounded-full bg-white/[0.04] border border-white/[0.06] px-6 py-3">
              <Shield className="h-4 w-4 text-[#10B981]" />
              <span className="text-xs font-semibold text-white/60">
                All verifications are permanently recorded and publicly visible on your profile
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
