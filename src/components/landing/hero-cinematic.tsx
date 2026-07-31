"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star, ArrowRight, BadgeCheck, Zap, ShieldCheck } from "lucide-react";

const CATEGORIES = [
  "Verified Electricians",
  "Certified Tailors",
  "Scannable Restaurants",
  "Trust-Scored Mechanics",
  "Verified Hair Stylists",
  "Certified AC Installers",
  "Verified Carpentry",
  "Trusted Plumbers",
  "Verified Caterers",
  "Certified Painters",
  "Trusted Real Estate",
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const PROOF_AVATARS = [
  "/images/avatars/aisha.jpg",
  "/images/avatars/segun.jpg",
  "/images/avatars/funke.jpg",
  "/images/avatars/ngozi.jpg",
  "/images/avatars/tunde.jpg",
];

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

export function HeroCinematic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const qrY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0241A8]">
      {/* Blue background */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#3FA9F5]/[0.18] rounded-full blur-[140px]" />
        <div className="absolute bottom-[-25%] left-[15%] w-[520px] h-[520px] bg-[#FDC304]/[0.08] rounded-full blur-[130px]" />
        <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
      </div>

      <motion.div style={{ y: contentY }} className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 sm:pt-24 lg:pt-28">
        <div className="flex flex-col items-center text-center">
          {/* QR loader — the product, front and center */}
          <motion.div style={{ y: qrY }}>
            <div className="relative w-fit">
              {/* Pulsing glow behind */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.8, 0.45] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 -m-14 rounded-full bg-[#3FA9F5]/[0.16] blur-[70px]"
              />

              {/* Rotating dashed ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 -m-6 rounded-[3rem] border border-dashed border-[#FDC304]/30"
              />

              {/* Corner brackets */}
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 h-10 w-10 border-t-2 border-l-2 border-[#FDC304] rounded-tl-xl z-10"
              />
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
                className="absolute -top-4 -right-4 h-10 w-10 border-t-2 border-r-2 border-[#FDC304] rounded-tr-xl z-10"
              />
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute -bottom-4 -left-4 h-10 w-10 border-b-2 border-l-2 border-[#FDC304] rounded-bl-xl z-10"
              />
              <motion.div
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.45 }}
                className="absolute -bottom-4 -right-4 h-10 w-10 border-b-2 border-r-2 border-[#FDC304] rounded-br-xl z-10"
              />

              {/* The QR card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-[2rem] bg-white p-5 sm:p-7 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.55)] overflow-hidden"
              >
                <Image
                  src="/images/qr-worktag.webp"
                  alt="WorkTag QR code"
                  width={280}
                  height={280}
                  className="w-full h-full object-contain"
                />
                {/* Scan loader */}
                <motion.div
                  className="absolute left-5 right-5 h-[3px]"
                  animate={{ top: ["10%", "88%"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="h-full rounded-full bg-gradient-to-r from-transparent via-[#3FA9F5] to-transparent shadow-[0_0_18px_rgba(63,169,245,0.95)]" />
                  <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 h-[9px] w-[9px] rounded-full bg-[#3FA9F5] shadow-[0_0_14px_rgba(63,169,245,1)]" />
                </motion.div>
              </motion.div>

              {/* Floating chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="absolute -left-10 sm:-left-24 top-12 flex items-center gap-1.5 rounded-full bg-[#0b1230]/90 backdrop-blur border border-[#10B981]/30 px-3.5 py-2 shadow-xl"
              >
                <ShieldCheck className="h-4 w-4 text-[#10B981]" />
                <span className="text-[11px] font-bold text-white">100% Verified</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="absolute -right-10 sm:-right-24 top-1/3 flex items-center gap-1.5 rounded-full bg-[#FDC304] px-3.5 py-2 shadow-xl"
              >
                <Zap className="h-4 w-4 text-[#090D1F]" />
                <span className="text-[11px] font-black text-[#090D1F]">0.3s load</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-[#0b1230]/90 backdrop-blur border border-[#FDC304]/30 px-3.5 py-2 shadow-xl whitespace-nowrap"
              >
                <Star className="h-4 w-4 text-[#FDC304] fill-[#FDC304]" />
                <span className="text-[11px] font-bold text-white">4.9 · 128 reviews</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Eyebrow */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mt-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 py-1.5 text-[10px] font-bold tracking-[0.18em] text-white uppercase backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-60" />
                <span className="relative rounded-full bg-[#10B981] w-1.5 h-1.5" />
              </span>
              Digital Trust Infrastructure
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="max-w-3xl">
            <h1 className="mt-7 text-[clamp(2.8rem,6vw,5.2rem)] font-[900] leading-[1.02] tracking-[-0.035em] text-white">
              One code.
              <br />
              <span className="bg-gradient-to-r from-[#FDC304] via-[#FDE047] to-[#FDC304] bg-clip-text text-transparent">
                A lifetime of trust.
              </span>
            </h1>
            <p className="mt-6 text-[15px] sm:text-lg leading-[1.7] text-white/70 max-w-xl mx-auto">
              WorkTag gives every professional a trusted, immutable digital footprint.
              One QR code. Instant verification. A reputation that follows you everywhere.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="group relative inline-flex items-center gap-2 rounded-full bg-[#FDC304] px-8 py-3.5 text-[13px] font-bold text-[#090D1F] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(253,195,4,0.45)] hover:-translate-y-px"
            >
              <Zap className="h-4 w-4 text-[#090D1F]" />
              Claim your WorkTag
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-7 py-3.5 text-[13px] font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/[0.12]"
            >
              See how it works
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {PROOF_AVATARS.map((avatar) => (
                <Image
                  key={avatar}
                  src={avatar}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full ring-2 ring-[#0241A8] object-cover"
                />
              ))}
            </div>
            <p className="text-[12px] text-white/60">
              Trusted by <span className="font-bold text-white">10,000+</span> verified professionals
            </p>
          </motion.div>

          {/* Stats strip */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="mt-12 grid w-full max-w-2xl grid-cols-3 divide-x divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
            <div className="px-4 py-5 sm:px-6">
              <div className="text-2xl sm:text-3xl font-[900] tracking-tight text-white"><Counter target={10000} suffix="+" /></div>
              <div className="mt-1 text-[10px] font-bold text-white/60 uppercase tracking-wider">Verified businesses</div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <div className="text-2xl sm:text-3xl font-[900] tracking-tight text-white"><Counter target={98} suffix="%" /></div>
              <div className="mt-1 text-[10px] font-bold text-white/60 uppercase tracking-wider">Trust rating</div>
            </div>
            <div className="px-4 py-5 sm:px-6">
              <div className="text-2xl sm:text-3xl font-[900] tracking-tight text-white flex items-center justify-center gap-1.5">
                4.9 <Star className="h-5 w-5 text-[#FDC304] fill-[#FDC304]" />
              </div>
              <div className="mt-1 text-[10px] font-bold text-white/60 uppercase tracking-wider">Avg. review</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Verified categories marquee */}
      <div className="relative bg-[#0241A8] py-5 overflow-hidden">
        <div className="flex overflow-hidden mask-fade-x">
          <motion.div
            className="flex items-center gap-3 shrink-0 pr-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...CATEGORIES, ...CATEGORIES].map((category, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-full bg-white px-5 py-2.5 whitespace-nowrap shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)]"
              >
                <BadgeCheck className="h-3.5 w-3.5 text-[#FDC304] shrink-0" />
                <span className="text-xs font-bold text-[#0241A8]">{category}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
