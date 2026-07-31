"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, BadgeCheck, ShieldCheck } from "lucide-react";

const REVIEWS = [
  {
    name: "Chinedu Okafor",
    business: "Bright Masonry",
    role: "Founder",
    image: "/images/avatars/chinedu.jpg",
    rating: 5,
    date: "2 days ago",
    text: "WorkTag changed how my customers see my business. They scan my tag and instantly see I'm verified. The trust score gives them confidence before they even call.",
  },
  {
    name: "Aisha Bello",
    business: "Aisha's Designs",
    role: "Creative Director",
    image: "/images/avatars/aisha.jpg",
    rating: 5,
    date: "1 week ago",
    text: "The physical tag on my shop window has brought in customers who checked my profile before walking in. That never happened before WorkTag.",
  },
  {
    name: "Segun Adeyemi",
    business: "Segun Plumbing",
    role: "Owner",
    image: "/images/avatars/segun.jpg",
    rating: 5,
    date: "3 days ago",
    text: "My WorkTag is on my van and my uniform. When people scan it they see my licence, insurance, and reviews all in one place. Professional.",
  },
  {
    name: "Funke Ogunlesi",
    business: "Funke's Kitchen",
    role: "Head Chef",
    image: "/images/avatars/funke.jpg",
    rating: 5,
    date: "5 days ago",
    text: "Customers love seeing my food handling certification and reviews by scanning my tag. It's become a trust signal I can't afford to be without.",
  },
  {
    name: "Ngozi Eze",
    business: "Ngozi Properties",
    role: "Lead Agent",
    image: "/images/avatars/ngozi.jpg",
    rating: 5,
    date: "2 weeks ago",
    text: "In real estate, trust is everything. WorkTag lets me show clients that I'm licensed and verified. It closes deals faster.",
  },
  {
    name: "Tunde Bakare",
    business: "Tunde Auto Care",
    role: "Master Mechanic",
    image: "/images/avatars/tunde.jpg",
    rating: 5,
    date: "1 week ago",
    text: "I put my WorkTag on the counter and every customer scans it before I start work. It removes the guessing game completely.",
  },
];

function AnimatedCounter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true); }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;
    const duration = 2000;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(target * (1 - Math.pow(1 - progress, 4)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

function ReviewCardBody({ review, dimmed = false }: { review: typeof REVIEWS[0]; dimmed?: boolean }) {
  return (
    <div className="flex h-full flex-col rounded-3xl bg-white p-6 sm:p-7 shadow-[0_40px_90px_-24px_rgba(2,65,168,0.55)] border border-[#E8EBF2] select-none">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-[#FDC304]/60 shrink-0">
          <Image src={review.image} alt={review.name} width={44} height={44} className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <div className="text-[13px] font-bold text-[#090D1F] truncate">{review.name}</div>
          <div className="text-[11px] text-[#5A6A8A] truncate">{review.business}</div>
        </div>
        <BadgeCheck className="h-5 w-5 text-[#10B981] ml-auto shrink-0" />
      </div>

      <div className="flex items-center gap-0.5 mt-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 text-[#FDC304] fill-[#FDC304]" />
        ))}
        <span className="ml-2 text-[10px] font-semibold text-[#5A6A8A]">{review.rating}.0</span>
      </div>

      <p className={`mt-4 text-sm leading-relaxed ${dimmed ? "text-[#475569]/70" : "text-[#1E293B]"}`}>
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-auto pt-4 border-t border-[#E8EBF2]/70 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#10B981]">
          <BadgeCheck className="h-2.5 w-2.5" />
          Verified review
        </span>
        <span className="text-[10px] text-[#94A3B8]">{review.date}</span>
      </div>
    </div>
  );
}

function SwipeStack({ reviews }: { reviews: typeof REVIEWS }) {
  const [index, setIndex] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const depths = [0, 1, 2];

  const handleSwiped = () => {
    setIsSwiping(false);
    setIndex((i) => (i + 1) % reviews.length);
  };

  return (
    <div className="relative mx-auto h-[460px] sm:h-[500px] w-[320px] sm:w-[400px]">
      {depths.map((depth) => {
        const review = reviews[(index + depth) % reviews.length];
        const scale = depth === 0 ? 1 : depth === 1 ? 0.94 : 0.89;
        const yOffset = depth * 16;
        const rotate = depth === 0 ? 0 : depth === 1 ? 2.5 : 4.5;
        const initial = {
          scale: depth === 0 ? 0.94 : depth === 1 ? 0.89 : 0.84,
          y: (depth + 1) * 16,
          rotate: depth === 0 ? 2.5 : depth === 1 ? 4.5 : 6.5,
        };
        const key = `${index}-${depth}`;

        if (depth === 0) {
          return (
            <TopCard
              key={key}
              review={review}
              isSwiping={isSwiping}
              onSwipeStart={() => setIsSwiping(true)}
              onSwiped={handleSwiped}
              initial={initial}
            />
          );
        }

        return (
          <motion.div
            key={key}
            initial={initial}
            animate={{ scale, y: yOffset, rotate }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="absolute inset-0"
          >
            <ReviewCardBody review={review} dimmed />
          </motion.div>
        );
      })}
    </div>
  );
}

function TopCard({
  review,
  isSwiping,
  onSwipeStart,
  onSwiped,
  initial,
}: {
  review: typeof REVIEWS[0];
  isSwiping: boolean;
  onSwipeStart: () => void;
  onSwiped: () => void;
  initial: { scale: number; y: number; rotate: number };
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-260, 260], [-12, 12]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeRight = info.offset.x > 140 || info.velocity.x > 700;
    const swipeLeft = info.offset.x < -140 || info.velocity.x < -700;
    if (!swipeRight && !swipeLeft) return;
    onSwipeStart();
    animate(x, swipeRight ? 720 : -720, { duration: 0.45, ease: "easeIn" }).then(onSwiped);
  };

  return (
    <motion.div
      initial={initial}
      animate={{ scale: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      style={{ x, rotate }}
      drag={!isSwiping ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      className="absolute inset-0 cursor-grab active:cursor-grabbing z-20"
    >
      <ReviewCardBody review={review} />
    </motion.div>
  );
}

export function BenefitReviews() {
  return (
    <section id="benefit-reviews" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[#090D1F]" />
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#0241A8]/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[400px] bg-[#3FA9F5]/10 rounded-full blur-[130px]" />
        <div className="absolute top-1/3 left-[8%] w-[350px] h-[350px] bg-[#FDC304]/8 rounded-full blur-[110px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3FA9F5]/40 to-transparent" />

      <div className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#FDC304] uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDC304]" />
              Reviews &amp; Reputation
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#3FA9F5]" />
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-white">
              Reviews that
              <br />
              <span className="bg-gradient-to-r from-[#FDC304] via-[#3FA9F5] to-[#0241A8] bg-clip-text text-transparent">
                actually matter.
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/70 max-w-lg mx-auto">
              Every review on WorkTag is tied to a real, verified interaction. No fake reviews. No paid testimonials. Just honest feedback from real customers.
            </p>
          </motion.div>

          {/* Card stack */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 lg:mt-20"
          >
            <SwipeStack reviews={REVIEWS} />

            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                {REVIEWS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === 0 ? "w-6 bg-[#FDC304]" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <p className="flex items-center gap-2 text-[12px] font-semibold text-white/50">
                <Quote className="h-3.5 w-3.5 text-[#FDC304]" />
                Push a card to the side to reveal the next verified review
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="mt-20 lg:mt-24 grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {[
              { value: 50, suffix: "K+", label: "Reviews left" },
              { value: 4.9, suffix: "", decimals: 1, label: "Average rating" },
              { value: 98, suffix: "%", label: "Positive reviews" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-[900] tracking-tight text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/60">
                  <span className="h-1 w-1 rounded-full bg-[#FDC304]" />
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Avatar crowd */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-3">
              {REVIEWS.map((r) => (
                <div key={r.name} className="h-11 w-11 rounded-full ring-2 ring-[#0a1230] overflow-hidden">
                  <Image src={r.image} alt={r.name} width={44} height={44} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#FDC304] to-[#F59E0B] ring-2 ring-[#0a1230] flex items-center justify-center text-[10px] font-black text-[#090D1F]">
                +50K
              </div>
            </div>
            <p className="flex items-center gap-2 text-sm text-white/80">
              <ShieldCheck className="h-4 w-4 text-[#10B981]" />
              <span className="font-bold text-white">10,000+ verified businesses</span>
              trust WorkTag to carry their reputation
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
