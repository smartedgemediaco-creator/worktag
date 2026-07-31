"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, QrCode, HeartHandshake, Star } from "lucide-react";

function AnimatedCounter({ target, suffix = "", prefix = "", decimals = 0 }: { target: number; suffix?: string; prefix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;
    const duration = 2200;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: 10000,
    suffix: "+",
    label: "Verified Businesses",
    sublabel: "across Nigeria",
    icon: Users,
    accent: false,
  },
  {
    value: 50000,
    suffix: "+",
    label: "QR Scans Monthly",
    sublabel: "and growing",
    icon: QrCode,
    accent: false,
  },
  {
    value: 98,
    suffix: "%",
    label: "Customer Trust",
    sublabel: "average rating",
    icon: HeartHandshake,
    accent: true,
  },
  {
    value: 4.9,
    suffix: "",
    decimals: 1,
    label: "Average Score",
    sublabel: "out of 5.0",
    icon: Star,
    accent: false,
  },
] as const;

export function StatsBranded() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-[#090D1F]" />
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-[420px] h-[420px] bg-[#0241A8]/25 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-[15%] w-[420px] h-[420px] bg-[#3FA9F5]/12 rounded-full blur-[110px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FDC304]/8 rounded-full blur-[100px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3FA9F5]/40 to-transparent" />

      <div className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-14">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="relative text-center px-2 lg:px-8 lg:border-l lg:border-white/10 lg:first:border-l-0"
                >
                  <span
                    className={`mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                      stat.accent
                        ? "bg-gradient-to-br from-[#FDC304] to-[#F59E0B] shadow-[0_10px_24px_-8px_rgba(253,195,4,0.6)]"
                        : "bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] shadow-[0_10px_24px_-8px_rgba(2,65,168,0.7)]"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${stat.accent ? "text-[#090D1F]" : "text-white"}`} />
                  </span>

                  <div
                    className={`text-[clamp(2rem,4vw,3.4rem)] font-[900] leading-none tracking-[-0.02em] ${
                      stat.accent
                        ? "bg-gradient-to-r from-[#FDC304] to-[#FDE047] bg-clip-text text-transparent"
                        : "text-white"
                    }`}
                  >
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={"decimals" in stat ? stat.decimals : 0} />
                  </div>
                  <div className="mt-2.5 text-sm font-bold text-white/85">{stat.label}</div>
                  <div className="mt-1 text-[11px] text-white/35">{stat.sublabel}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
