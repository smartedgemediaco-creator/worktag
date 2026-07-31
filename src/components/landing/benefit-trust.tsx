"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  TrendingUp, Shield, BarChart3, ArrowUpRight,
  Star, ShieldCheck, Clock, CalendarDays, BadgeCheck, Sparkles,
} from "lucide-react";

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
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
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <div ref={ref}>{count}</div>;
}

const RING_C = 2 * Math.PI * 85;

const SIGNALS = [
  { icon: Star, label: "Verified reviews", value: "128", sub: "4.9 average rating", color: "#FDC304" },
  { icon: ShieldCheck, label: "Verification level", value: "Full", sub: "ID + business confirmed", color: "#10B981" },
  { icon: Clock, label: "Response time", value: "< 1 hr", sub: "answers customers fast", color: "#3FA9F5" },
  { icon: CalendarDays, label: "Business history", value: "2 yrs", sub: "active since Mar 2024", color: "#0241A8" },
];

const TREND = "M0,17 L25,16 L50,16.5 L75,15 L100,14 L125,14.5 L150,13 L175,12 L200,12.5 L225,11 L250,10 L275,9 L300,9";

const FEATURES = [
  { icon: TrendingUp, title: "Dynamic Scoring", desc: "Your trust score updates in real-time based on customer interactions, review quality, and verification completeness.", stat: "+12%" },
  { icon: Shield, title: "Immutable Records", desc: "Every review, every verification, every interaction is permanently recorded. No one can fake their way to a high score.", stat: "100%" },
  { icon: BarChart3, title: "Competitive Edge", desc: "See how your trust score compares to others in your industry. Strive for the top and watch your business grow.", stat: "#1" },
  { icon: ArrowUpRight, title: "Trust Compounds", desc: "Every positive interaction adds to your score. The longer you're on WorkTag, the more trusted you become.", stat: "3x" },
];

export function BenefitTrust() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="benefit-trust" ref={sectionRef} className="relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 benefit-gradient-1" />
      <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#0241A8]/[0.08] rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3FA9F5]/[0.05] rounded-full blur-[110px]" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FDC304]/[0.05] rounded-full blur-[100px]" />
      </div>

      <div className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#FDC304] uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDC304]" />
              Trust Engine
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#3FA9F5]" />
            </span>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-white">
              A trust score that
              <br />
              <span className="bg-gradient-to-r from-[#FDC304] via-[#3FA9F5] to-[#0241A8] bg-clip-text text-transparent">
                grows with you.
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/70 max-w-lg mx-auto">
              Your dynamic Trust Score is calculated from real interactions, verified reviews, and business credentials. The more you build, the stronger it gets.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Trust profile card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-[2rem] p-px bg-gradient-to-br from-[#3FA9F5]/40 via-white/[0.06] to-[#FDC304]/40 transition-all duration-500 hover:shadow-[0_40px_100px_-40px_rgba(253,195,4,0.3)]">
                <div className="relative rounded-[calc(2rem-1px)] bg-[#0b1230]/80 backdrop-blur-xl p-7 sm:p-8 overflow-hidden">
                  <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#3FA9F5]/40 to-transparent" />

                  {/* Business header */}
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/avatars/chinedu.jpg"
                      alt="Bright Masonry"
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-[#FDC304] ring-offset-2 ring-offset-[#0b1230]"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white truncate">Bright Masonry</h3>
                        <BadgeCheck className="h-3.5 w-3.5 text-[#3FA9F5]" />
                      </div>
                      <p className="text-[11px] text-white/50">Construction · Lagos</p>
                    </div>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#FDC304]/10 border border-[#FDC304]/30 px-2.5 py-1 text-[9px] font-bold tracking-wide text-[#FDC304] uppercase">
                      <Sparkles className="h-3 w-3" />
                      Top Rated
                    </span>
                  </div>

                  {/* Score ring */}
                  <div className="relative w-48 h-48 mx-auto mt-7">
                    <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                      <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                      <motion.circle
                        cx="100" cy="100" r="85"
                        fill="none"
                        stroke="url(#trustGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={RING_C}
                        initial={{ strokeDashoffset: RING_C }}
                        whileInView={{ strokeDashoffset: RING_C * (1 - 0.94) }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                      />
                      <defs>
                        <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#0241A8" />
                          <stop offset="55%" stopColor="#3FA9F5" />
                          <stop offset="100%" stopColor="#FDC304" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl font-[900] text-white tracking-tight">
                        <AnimatedNumber target={94} />
                      </div>
                      <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider mt-1">Trust Score</div>
                      <span className="mt-2 rounded-full bg-[#FDC304]/10 border border-[#FDC304]/30 px-2 py-0.5 text-[9px] font-bold text-[#FDC304] uppercase tracking-wide">
                        Excellent
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-[11px] text-white/50">
                    Top <span className="font-bold text-[#FDC304]">10%</span> in Construction this month
                  </p>

                  {/* Score trend */}
                  <div className="relative mt-7 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-[0.15em] text-white/50 uppercase">Score trend · 12 wks</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/25 px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
                        <TrendingUp className="h-3 w-3" />
                        +16 this quarter
                      </span>
                    </div>
                    <svg viewBox="0 0 300 60" className="w-full h-16" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="trendArea" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#3FA9F5" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#3FA9F5" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="trendLine" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#0241A8" />
                          <stop offset="100%" stopColor="#FDC304" />
                        </linearGradient>
                      </defs>
                      <path d={`${TREND} L300,60 L0,60 Z`} fill="url(#trendArea)" />
                      <motion.path
                        d={TREND}
                        fill="none"
                        stroke="url(#trendLine)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </svg>
                  </div>

                  {/* Real signals */}
                  <div className="mt-5 space-y-3">
                    {SIGNALS.map((signal, i) => (
                      <motion.div
                        key={signal.label}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                        className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5"
                      >
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: `${signal.color}1A` }}>
                          <signal.icon className="h-3.5 w-3.5" style={{ color: signal.color }} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium text-white/60">{signal.label}</p>
                          <p className="text-[10px] text-white/35">{signal.sub}</p>
                        </div>
                        <span className="text-sm font-[900] text-white">{signal.value}</span>
                      </motion.div>
                    ))}
                  </div>

                  <p className="mt-5 text-[10px] text-white/40 text-center">
                    Recalculated daily from on-platform activity · Updated today 5:12 PM
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right: Feature cards */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {FEATURES.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group relative rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6 overflow-hidden hover-lift hover:border-[#FDC304]/30"
                  >
                    <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-[#FDC304]/[0.06] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] shadow-[0_8px_20px_-8px_rgba(2,65,168,0.6)] transition-transform duration-500 group-hover:rotate-6">
                        <card.icon className="h-4.5 w-4.5 text-white" />
                      </span>
                      <span className="text-2xl font-[900] bg-gradient-to-r from-[#FDC304] to-[#FDE047] bg-clip-text text-transparent tracking-tight">{card.stat}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{card.title}</h3>
                    <p className="text-[12px] leading-relaxed text-white/70">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
