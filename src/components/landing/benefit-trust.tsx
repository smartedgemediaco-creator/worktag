"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TrendingUp, Shield, BarChart3, ArrowUpRight } from "lucide-react";

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

const TRUST_FACTORS = [
  { label: "Customer Reviews", weight: 35, color: "#6366F1" },
  { label: "Verification Level", weight: 25, color: "#8B5CF6" },
  { label: "Business History", weight: 20, color: "#06B6D4" },
  { label: "Response Rate", weight: 12, color: "#10B981" },
  { label: "Profile Completeness", weight: 8, color: "#F59E0B" },
];

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
      <motion.div style={{ y: bgY }} className="absolute inset-0 benefit-gradient-2" />
      <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
      <div className="absolute inset-0">
                    <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#0241A8]/[0.07] rounded-full blur-[130px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#3FA9F5]/[0.05] rounded-full blur-[110px]" />
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
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#3FA9F5] uppercase">
              Trust Engine
            </span>
            <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-white">
              A trust score that
              <br />
              <span className="bg-gradient-to-r from-[#3FA9F5] via-[#0241A8] to-[#06B6D4] bg-clip-text text-transparent">
                grows with you.
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#8896B3] max-w-lg mx-auto">
              Your dynamic Trust Score is calculated from real interactions, verified reviews, and business credentials. The more you build, the stronger it gets.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Trust Score visualization */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl bg-white/[0.04] border border-white/[0.07] p-7 backdrop-blur-sm">
                {/* Score ring */}
                <div className="relative w-44 h-44 mx-auto mb-7">
                  <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                    <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="10" />
                    <motion.circle
                      cx="100" cy="100" r="85"
                      fill="none"
                      stroke="url(#trustGradient)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 85}
                      initial={{ strokeDashoffset: 2 * Math.PI * 85 }}
                      whileInView={{ strokeDashoffset: 2 * Math.PI * 85 * (1 - 0.94) }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <defs>
                      <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366F1" />
                        <stop offset="50%" stopColor="#8B5CF6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-4xl font-[900] text-white tracking-tight">
                      <AnimatedNumber target={94} />
                    </div>
                    <div className="text-[10px] text-white/30 font-bold uppercase tracking-wider mt-1">Trust Score</div>
                  </div>
                </div>

                {/* Trust factors */}
                <div className="space-y-3">
                  {TRUST_FACTORS.map((factor, i) => (
                    <div key={factor.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-medium text-white/50">{factor.label}</span>
                        <span className="text-[11px] font-bold" style={{ color: factor.color }}>{factor.weight}%</span>
                      </div>
                      <div className="h-1 w-full rounded-full bg-white/[0.04] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: factor.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${factor.weight}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3 + i * 0.08 }}
                        />
                      </div>
                    </div>
                  ))}
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
                    className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-6 hover-lift"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0241A8]/[0.1]">
                        <card.icon className="h-4 w-4 text-[#3FA9F5]" />
                      </span>
                      <span className="text-xl font-[900] bg-gradient-to-r from-[#3FA9F5] to-[#06B6D4] bg-clip-text text-transparent tracking-tight">{card.stat}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{card.title}</h3>
                    <p className="text-[12px] leading-relaxed text-white/40">{card.desc}</p>
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
