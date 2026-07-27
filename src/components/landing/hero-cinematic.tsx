"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Shield, MapPin, Star, Check, ArrowRight, Zap, ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function PhoneMockup() {
  const [scanPhase, setScanPhase] = useState<"idle" | "scanning" | "done">("idle");

  const startScan = useCallback(() => {
    setScanPhase("scanning");
    setTimeout(() => setScanPhase("done"), 2200);
  }, []);

  useEffect(() => {
    const timer = setTimeout(startScan, 1800);
    const loop = setInterval(startScan, 8000);
    return () => { clearTimeout(timer); clearInterval(loop); };
  }, [startScan]);

  return (
    <div className="relative w-full max-w-[320px] mx-auto lg:mx-0">
      {/* Ambient glow behind phone */}
      <div className="absolute -inset-16 bg-gradient-to-br from-[#0241A8]/20 via-[#3FA9F5]/10 to-[#06B6D4]/10 rounded-[3rem] blur-[60px] opacity-60" />

      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] bg-[#1a1a2e] p-[10px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]">
        {/* Screen */}
        <div className="relative rounded-[2rem] overflow-hidden bg-[#0a0e1a] aspect-[9/19.5]">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-11 z-20 flex items-center justify-between px-7">
            <span className="text-[10px] font-semibold text-white/50">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2.5 rounded-[3px] border border-white/30 relative">
                <div className="absolute inset-[1px] rounded-[1.5px] bg-white/40" />
              </div>
            </div>
          </div>

          {/* Dynamic Island / Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black z-30" />

          {/* Screen content */}
          <div className="absolute inset-0 pt-11">
            <AnimatePresence mode="wait">
              {scanPhase === "idle" && (
                <motion.div
                  key="qr"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#0a0e1a] via-[#0d1225] to-[#0a0e1a]"
                >
                  <div className="relative w-44 h-44 rounded-2xl bg-white p-3 shadow-[0_0_60px_rgba(99,102,241,0.15)]">
                    <Image src="/images/qr-worktag.webp" alt="WorkTag QR" width={160} height={160} className="w-full h-full object-contain" />
                    {/* Corner marks */}
                    <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-[#0241A8]" />
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-[#0241A8]" />
                    <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-[#0241A8]" />
                    <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-[#0241A8]" />
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-xs font-bold text-white/70 tracking-wide">Scan with any camera</p>
                    <p className="text-[10px] text-white/30 mt-1">No app needed</p>
                  </div>
                  {/* Tap to scan hint */}
                  <motion.button
                    onClick={startScan}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] text-[11px] font-semibold text-white/50 hover:text-white/70 hover:bg-white/[0.1] transition-all"
                  >
                    Tap to preview scan
                  </motion.button>
                </motion.div>
              )}

              {scanPhase === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-[#0a0e1a]"
                >
                  <div className="relative w-52 h-52">
                    {/* Camera viewfinder */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-[#10B981]/40 overflow-hidden bg-[#0d1225]">
                      {/* Scan line */}
                      <motion.div
                        className="absolute left-2 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent shadow-[0_0_20px_#10B981,0_0_40px_rgba(16,185,129,0.3)]"
                        initial={{ top: "5%" }}
                        animate={{ top: ["5%", "90%", "5%"] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      {/* Corner brackets */}
                      <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#10B981] rounded-tl-lg" />
                      <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#10B981] rounded-tr-lg" />
                      <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#10B981] rounded-bl-lg" />
                      <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#10B981] rounded-br-lg" />
                      {/* Grid overlay */}
                      <div className="absolute inset-8 grid grid-cols-3 grid-rows-3 gap-px opacity-20">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div key={i} className="border border-[#10B981]/30" />
                        ))}
                      </div>
                    </div>
                    <motion.div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-[11px] font-semibold text-[#10B981]">Scanning...</span>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {scanPhase === "done" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] to-[#0d1225] overflow-hidden"
                >
                  {/* Verified header bar */}
                  <div className="flex items-center justify-between px-5 pt-3 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider">Verified Profile</span>
                    </div>
                    <ExternalLink className="h-3 w-3 text-white/20" />
                  </div>

                  <div className="px-5">
                    {/* Profile header */}
                    <div className="flex items-center gap-3.5 py-4 border-b border-white/[0.06]">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-[#0241A8]/30">
                          <Image src="/images/avatars/chinedu.jpg" alt="Chinedu" width={56} height={56} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center ring-2 ring-[#0a0e1a]">
                          <Check className="h-2.5 w-2.5 text-white stroke-[3]" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-white truncate">Chinedu Okafor</h3>
                        </div>
                        <p className="text-[11px] text-white/40 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5 shrink-0" />
                          Bright Masonry, Lagos
                        </p>
                      </div>
                    </div>

                    {/* Trust score bar */}
                    <div className="py-3.5 border-b border-white/[0.06]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Trust Score</span>
                        <span className="text-sm font-black text-white">94<span className="text-[10px] font-normal text-white/30">/100</span></span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-[#0241A8] to-[#10B981]"
                          initial={{ width: 0 }}
                          animate={{ width: "94%" }}
                          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-3 gap-2 py-3.5 border-b border-white/[0.06]">
                      {[
                        { value: "127", label: "Reviews" },
                        { value: "4.9", label: "Rating", icon: true },
                        { value: "3yr", label: "Member" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-sm font-black text-white flex items-center justify-center gap-0.5">
                            {stat.value}
                            {stat.icon && <Star className="h-2.5 w-2.5 text-[#F59E0B] fill-[#F59E0B]" />}
                          </div>
                          <div className="text-[9px] text-white/30 font-medium mt-0.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Reviews preview */}
                    <div className="py-3.5">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Recent Reviews</span>
                      </div>
                      <div className="space-y-2.5">
                        {[
                          { name: "Adaeze K.", text: "Very professional. Fixed my wall same day.", stars: 5 },
                          { name: "Bola M.", text: "Excellent masonry work. Highly recommend.", stars: 5 },
                        ].map((review, i) => (
                          <motion.div
                            key={review.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.15 }}
                            className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-2.5"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] font-bold text-white/60">{review.name}</span>
                              <div className="flex gap-0.5">
                                {Array.from({ length: review.stars }).map((_, j) => (
                                  <Star key={j} className="h-2 w-2 text-[#F59E0B] fill-[#F59E0B]" />
                                ))}
                              </div>
                            </div>
                            <p className="text-[10px] text-white/30 leading-relaxed">{review.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scan again */}
                  <motion.button
                    onClick={() => setScanPhase("idle")}
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] font-semibold text-white/40 hover:text-white/60 transition-colors"
                  >
                    Scan another
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/20 z-20" />
        </div>
      </div>
    </div>
  );
}

export function HeroCinematic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] overflow-hidden bg-[#050816]">
      {/* Background */}
      <motion.div style={{ y: heroY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#080d1e] to-[#0a1024]" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[20%] w-[700px] h-[700px] bg-[#0241A8]/[0.1] rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] bg-[#06B6D4]/[0.05] rounded-full blur-[130px]" />
        </div>
        <div className="absolute inset-0 cyber-grid opacity-[0.06]" />
        <div className="absolute inset-0 dot-grid opacity-[0.04]" />
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[2] scan-line" />

      <motion.div style={{ opacity: heroScale ? heroOpacity : undefined, scale: heroScale }} className="relative z-10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 min-h-screen flex flex-col justify-center pt-24 pb-20 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <motion.div style={{ y: textY }} className="lg:col-span-6 xl:col-span-5">
              <div className="space-y-8">
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#10B981]/[0.08] border border-[#10B981]/[0.12] px-3.5 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#10B981]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-40" />
                      <span className="relative rounded-full bg-[#10B981] w-1.5 h-1.5" />
                    </span>
                    DIGITAL TRUST INFRASTRUCTURE
                  </span>
                </motion.div>

                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                  <h1 className="text-[clamp(2.6rem,5.5vw,4.8rem)] font-[900] leading-[0.94] tracking-[-0.035em] text-white text-shadow-hero">
                    Your life&rsquo;s work.
                    <br />
                    <span className="bg-gradient-to-r from-[#3FA9F5] via-[#0241A8] to-[#06B6D4] bg-clip-text text-transparent">
                      Verified forever.
                    </span>
                  </h1>
                </motion.div>

                <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-[15px] sm:text-base leading-[1.7] text-[#8896B3] max-w-[420px]">
                  WorkTag gives every professional a trusted, immutable digital footprint. One QR code. Instant verification. A reputation that follows you everywhere.
                </motion.p>

                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    href="/register"
                    className="group relative inline-flex h-12 items-center gap-2 rounded-full bg-[#0241A8] px-7 text-[13px] font-bold text-white transition-all duration-300 hover:shadow-[0_12px_40px_rgba(2,65,168,0.4)] hover:-translate-y-px"
                  >
                    <Zap className="h-4 w-4" />
                    Claim your WorkTag
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-6 text-[13px] font-semibold text-white/60 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-white/80"
                  >
                    See how it works
                  </Link>
                </motion.div>

                {/* Trust metrics */}
                <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-7 pt-6 border-t border-white/[0.05]">
                  <div>
                    <div className="text-lg font-extrabold text-white tracking-tight"><Counter target={10000} suffix="+" /></div>
                    <div className="text-[11px] text-[#5A6A8A] font-medium mt-0.5">Verified businesses</div>
                  </div>
                  <div className="w-px h-7 bg-white/[0.07]" />
                  <div>
                    <div className="text-lg font-extrabold text-white tracking-tight"><Counter target={98} suffix="%" /></div>
                    <div className="text-[11px] text-[#5A6A8A] font-medium mt-0.5">Trust rating</div>
                  </div>
                  <div className="w-px h-7 bg-white/[0.07]" />
                  <div>
                    <div className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1">
                      4.9 <Star className="h-3.5 w-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    </div>
                    <div className="text-[11px] text-[#5A6A8A] font-medium mt-0.5">Avg. review</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end"
            >
              <PhoneMockup />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] font-bold tracking-[0.25em] text-white/20 uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
