"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, MapPin, Star, Check, ArrowRight, Play, Sparkles, Zap } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const floatingImages = [
  { src: "/images/avatars/chinedu.jpg", alt: "Chinedu", className: "absolute top-[15%] left-[5%] w-16 h-16 rounded-2xl object-cover shadow-xl", delay: 0 },
  { src: "/images/avatars/aisha.jpg", alt: "Aisha", className: "absolute top-[25%] right-[8%] w-14 h-14 rounded-full object-cover shadow-xl", delay: 0.5 },
  { src: "/images/avatars/funke.jpg", alt: "Funke", className: "absolute bottom-[20%] left-[8%] w-12 h-12 rounded-xl object-cover shadow-xl", delay: 1 },
  { src: "/images/avatars/ngozi.jpg", alt: "Ngozi", className: "absolute bottom-[30%] right-[5%] w-14 h-14 rounded-2xl object-cover shadow-xl", delay: 1.5 },
  { src: "/images/avatars/segun.jpg", alt: "Segun", className: "absolute top-[45%] left-[2%] w-10 h-10 rounded-full object-cover shadow-xl", delay: 2 },
  { src: "/images/avatars/tunde.jpg", alt: "Tunde", className: "absolute top-[60%] right-[3%] w-12 h-12 rounded-xl object-cover shadow-xl", delay: 0.8 },
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export function HeroCinematic() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imagesY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [bizName, setBizName] = useState("Bright Masonry");
  const [isVerified, setIsVerified] = useState(true);

  return (
    <section ref={sectionRef} className="relative min-h-[100vh] overflow-hidden bg-[#050816]">
      {/* Animated background layers */}
      <motion.div style={{ y: heroY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050816] via-[#0a0f1e] to-[#0f172a]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/8 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5CF6]/5 rounded-full blur-[150px]" />
        </div>
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="absolute inset-0 dot-grid opacity-10" />
      </motion.div>

      {/* Floating portrait images */}
      <motion.div style={{ y: imagesY }} className="absolute inset-0 z-[1] pointer-events-none">
        {floatingImages.map((img, i) => (
          <motion.div
            key={img.alt}
            className={img.className}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.25, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 + img.delay }}
          >
            <Image src={img.src} alt={img.alt} width={80} height={80} className="w-full h-full object-cover rounded-[inherit]" />
          </motion.div>
        ))}
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-[2] scan-line" />

      <motion.div style={{ opacity: heroScale ? heroOpacity : undefined, scale: heroScale }} className="relative z-10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 min-h-screen flex flex-col justify-center pt-24 pb-20 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <motion.div style={{ y: textY }} className="lg:col-span-6 xl:col-span-5">
              <div className="space-y-7">
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
                  <span className="inline-flex items-center gap-2.5 rounded-full bg-[#6366F1]/[0.12] border border-[#6366F1]/[0.15] px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-[#818CF8]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-40" />
                      <span className="relative rounded-full bg-[#10B981] w-2 h-2" />
                    </span>
                    DIGITAL TRUST INFRASTRUCTURE
                  </span>
                </motion.div>

                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                  <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-[900] leading-[0.92] tracking-[-0.04em] text-white text-shadow-hero">
                    Your life&rsquo;s work.
                    <br />
                    <span className="bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#06B6D4] bg-clip-text text-transparent">
                      Verified forever.
                    </span>
                  </h1>
                </motion.div>

                <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" className="text-base sm:text-lg leading-relaxed text-[#94A3B8] max-w-lg">
                  WorkTag gives every professional a trusted, immutable digital footprint.
                  One QR code. Instant verification. A reputation that follows you everywhere.
                </motion.p>

                <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/register"
                    className="group relative inline-flex h-13 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-8 text-[13px] font-bold text-white transition-all duration-300 hover:shadow-[0_12px_40px_rgba(99,102,241,0.4)] hover:-translate-y-[1px] active:translate-y-0"
                  >
                    <Zap className="h-4 w-4" />
                    Claim your WorkTag
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="group inline-flex h-13 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 text-[13px] font-bold text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white backdrop-blur-sm"
                  >
                    <Play className="h-3.5 w-3.5" />
                    See how it works
                  </Link>
                </motion.div>

                {/* Trust metrics strip */}
                <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-8 pt-6 border-t border-white/[0.06]">
                  <div>
                    <div className="text-xl font-extrabold text-white"><Counter target={10000} suffix="+" /></div>
                    <div className="text-[11px] text-[#64748B] font-medium">Verified businesses</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <div className="text-xl font-extrabold text-white"><Counter target={98} suffix="%" /></div>
                    <div className="text-[11px] text-[#64748B] font-medium">Trust rating</div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <div className="text-xl font-extrabold text-white flex items-center gap-1">
                      4.9 <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
                    </div>
                    <div className="text-[11px] text-[#64748B] font-medium">Avg. review</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Live WorkTag Card */}
            <motion.div
              initial={{ opacity: 0, x: 60, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[480px]">
                {/* Glow backdrop */}
                <div className="absolute -inset-10 bg-gradient-to-br from-[#6366F1]/20 via-[#8B5CF6]/10 to-[#06B6D4]/15 rounded-[3rem] blur-[60px] animate-hero-glow" />

                <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 animate-hero-glow">
                  {/* Interactive controls */}
                  <div className="mb-5 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.06] space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-[#818CF8] uppercase">
                      <Sparkles className="h-3.5 w-3.5" />
                      Live WorkTag Preview
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1 space-y-1">
                        <label className="text-[10px] font-semibold text-[#64748B]">Business Name</label>
                        <input
                          type="text"
                          value={bizName}
                          onChange={(e) => setBizName(e.target.value.slice(0, 24))}
                          className="w-full text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#6366F1]/50 placeholder:text-white/20"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <span className="text-[10px] font-semibold text-[#64748B]">Verified status</span>
                      <button
                        onClick={() => setIsVerified(!isVerified)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                          isVerified ? "bg-[#10B981]" : "bg-white/20"
                        }`}
                      >
                        <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isVerified ? "translate-x-4" : "translate-x-0"
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Simulated profile card */}
                  <motion.div
                    whileHover={{ y: -4, rotateX: 2, rotateY: -1 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-2xl bg-white/[0.06] border border-white/[0.08] p-5 backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
                      <span className="text-[9px] font-bold tracking-[0.2em] text-[#818CF8] uppercase">WorkTag Verified</span>
                      <span className="text-[9px] text-[#64748B] font-semibold bg-white/5 px-2 py-0.5 rounded-full">ID: WT-204</span>
                    </div>

                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white font-black text-base shadow-lg ring-2 ring-[#6366F1]/20">
                        {bizName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "WT"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-white tracking-tight truncate max-w-[180px]">{bizName}</h3>
                          {isVerified ? (
                            <span className="inline-flex items-center justify-center rounded-full bg-[#10B981]/15 p-0.5 text-[#10B981]">
                              <Check className="h-3 w-3 stroke-[3]" />
                            </span>
                          ) : (
                            <span className="text-[8px] font-semibold bg-white/10 text-white/40 px-1.5 py-0.5 rounded">Unverified</span>
                          )}
                        </div>
                        <p className="text-[10px] text-[#64748B] font-medium flex items-center gap-1 mt-1">
                          <MapPin className="h-3 w-3 text-[#64748B]/60 shrink-0" />
                          Lagos, Nigeria
                        </p>
                      </div>
                    </div>

                    {/* QR Scanner preview */}
                    <div className="relative aspect-square w-[200px] mx-auto overflow-hidden rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center p-3 mb-4">
                      <Image src="/images/qr-worktag.webp" alt="WorkTag QR Code" width={160} height={160} className="object-contain w-full h-full opacity-90" priority />
                      <motion.div
                        className="absolute left-[8%] right-[8%] h-[2px] bg-[#10B981]/80 shadow-[0_0_12px_#10B981]"
                        animate={{ top: ["8%", "92%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/[0.06] text-center">
                      <div>
                        <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Trust Score</div>
                        <div className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                          {isVerified ? "96" : "45"}<span className="text-[10px] font-normal text-[#64748B]">/100</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Rating</div>
                        <div className="text-xl font-extrabold text-white tracking-tight mt-0.5 flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
                          {isVerified ? "4.9" : "3.2"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-2 rounded-full bg-white/40"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
