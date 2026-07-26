"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ParticleIdentity } from "./particle-identity";
import { Shield, MapPin, Star, Sparkles, Sliders, Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const particleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.3]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Live Simulator State
  const [bizName, setBizName] = useState("Bright Masonry");
  const [bizCategory, setBizCategory] = useState("Home Services");
  const [isVerified, setIsVerified] = useState(true);
  const [trustScore, setTrustScore] = useState(96);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-white">
      <motion.div style={{ opacity: particleOpacity }} className="absolute inset-0">
        <ParticleIdentity />
      </motion.div>

      <motion.div style={{ y: bgY }} className="absolute inset-0 cyber-grid opacity-30 z-[1]" />
      <div className="absolute inset-0 gradient-mesh opacity-70 z-[1]" />

      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-white z-[2]" />
      <div className="absolute inset-0 z-[2] scan-line" />

      <motion.div
        style={{ scale: heroScale }}
        className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-6 sm:px-10 lg:flex-row pt-28 pb-16 lg:py-0 z-10 gap-12"
      >
        {/* Left Copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col justify-center max-w-xl"
        >
          <div className="space-y-6">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#6366F1]/[0.08] px-4 py-1.5 text-[10px] font-bold tracking-[0.18em] text-[#6366F1] border border-[#6366F1]/[0.12] backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#6366F1] animate-ping opacity-30" />
                  <span className="relative rounded-full bg-[#6366F1] w-1.5 h-1.5" />
                </span>
                <span>PERMANENT DIGITAL WORK IDENTITY</span>
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[0.95] tracking-tight text-balance">
              <span className="text-[#090D1F]">Your life&rsquo;s work.</span>
              <br />
              <span className="text-gradient-purple text-glow">Verified forever.</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm sm:text-base leading-relaxed text-[#5C6479] max-w-lg">
              WorkTag gives tailor, electrician, mechanic, and small business owner a trusted, immutable digital footprint. One QR code. Instant verification. Reputable credibility.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/register"
                className="group relative inline-flex h-11.5 items-center justify-center rounded-full bg-gradient-to-r from-[#0A3D91] to-[#6366F1] px-7 text-xs font-bold text-white transition-all duration-300 hover:shadow-[0_12px_36px_rgba(99,102,241,0.35)] hover:-translate-y-[1px] active:translate-y-0"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Claim your WorkTag
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </span>
              </Link>
              <Link
                href="#how-it-works"
                className="group inline-flex h-11.5 items-center justify-center rounded-full border border-gray-200 bg-white/40 px-7 text-xs font-bold text-[#5C6479] transition-all duration-300 hover:border-gray-300 hover:text-[#090D1F] hover:bg-white/80 backdrop-blur-sm"
              >
                See how it works
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right - Live WorkTag Simulator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 w-full flex flex-col items-center lg:items-end justify-center"
        >
          {/* Simulator Box */}
          <div className="w-full max-w-[420px] rounded-3xl border border-[#E8EBF2]/40 bg-white/60 backdrop-blur-md p-6 shadow-cyber holographic">
            {/* Interactive Inputs */}
            <div className="mb-6 p-4 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-[#5C6479] uppercase">
                <Sliders className="h-3.5 w-3.5 text-[#6366F1]" />
                Live WorkTag Simulator
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-gray-500">Business Name</label>
                  <input
                    type="text"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value.slice(0, 24))}
                    className="w-full text-xs font-semibold px-2 py-1 rounded-md border border-gray-200 bg-white focus:outline-none focus:border-[#6366F1]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-gray-500">Category</label>
                  <select
                    value={bizCategory}
                    onChange={(e) => setBizCategory(e.target.value)}
                    className="w-full text-xs font-semibold px-2 py-1 rounded-md border border-gray-200 bg-white focus:outline-none focus:border-[#6366F1]"
                  >
                    <option value="Home Services">Home Services</option>
                    <option value="Fashion">Fashion Design</option>
                    <option value="Tech Clinic">Tech Clinic</option>
                    <option value="Automotive">Automotive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-gray-200/50">
                <span className="text-[10px] font-semibold text-gray-500">Verified status</span>
                <button
                  onClick={() => setIsVerified(!isVerified)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isVerified ? "bg-[#10B981]" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      isVerified ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Simulated Live View Mobile Card */}
            <motion.div
              whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl bg-white border border-[#E8EBF2] p-5 shadow-elevated overflow-hidden"
            >
              {/* Header inside phone card */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#6366F1]/80 uppercase">WorkTag verified</span>
                <span className="text-[9px] text-[#5C6479]/60 font-semibold bg-gray-50 px-2 py-0.5 rounded-full">ID: WT-204</span>
              </div>

              {/* Business Info Layout */}
              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-[#0A3D91] to-[#6366F1] flex items-center justify-center text-white font-black text-sm shadow-md ring-2 ring-[#6366F1]/20">
                  {bizName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "WT"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="text-sm font-bold text-[#090D1F] tracking-tight truncate max-w-[160px]">{bizName}</h3>
                    {isVerified ? (
                      <span className="inline-flex items-center justify-center rounded-full bg-[#10B981]/10 p-0.5 text-[#10B981] animate-pulse">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                    ) : (
                      <span className="text-[8px] font-semibold bg-gray-100 text-gray-400 px-1 py-0.5 rounded">Unverified</span>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-gray-300 shrink-0" />
                    Lagos, Nigeria &middot; {bizCategory}
                  </p>
                </div>
              </div>

              {/* QR scanner preview inside card */}
              <div className="relative aspect-square w-[180px] mx-auto overflow-hidden rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2 mb-4">
                <Image src="/images/qr-worktag.webp" alt="WorkTag QR Code" width={180} height={180} className="object-contain w-full h-full" priority />
                <motion.div
                  className="absolute left-[5%] right-[5%] h-[2px] bg-[#10B981]/80 shadow-[0_0_8px_#10B981]"
                  animate={{ top: ["8%", "92%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Bottom Score Grid */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100 text-center">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Trust score</div>
                  <div className="text-lg font-extrabold text-[#090D1F] tracking-tight mt-0.5 flex items-center justify-center gap-1">
                    {isVerified ? trustScore : 45}
                    <span className="text-[9px] font-normal text-gray-400">/ 100</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rating</div>
                  <div className="text-lg font-extrabold text-[#090D1F] tracking-tight mt-0.5 flex items-center justify-center gap-0.5">
                    <Star className="h-4.5 w-4.5 text-[#F59E0B] fill-[#F59E0B] shrink-0" />
                    {isVerified ? "4.9" : "3.2"}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
