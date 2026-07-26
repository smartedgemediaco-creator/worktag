"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const REVIEWS = [
  {
    name: "Chinedu Okafor",
    business: "Bright Masonry",
    role: "Founder",
    image: "/images/avatars/chinedu.jpg",
    rating: 5,
    text: "WorkTag changed how my customers see my business. They scan my tag and instantly see I'm verified. The trust score gives them confidence before they even call.",
  },
  {
    name: "Aisha Bello",
    business: "Aisha's Designs",
    role: "Creative Director",
    image: "/images/avatars/aisha.jpg",
    rating: 5,
    text: "The physical tag on my shop window has brought in customers who checked my profile before walking in. That never happened before WorkTag.",
  },
  {
    name: "Segun Adeyemi",
    business: "Segun Plumbing",
    role: "Owner",
    image: "/images/avatars/segun.jpg",
    rating: 5,
    text: "My WorkTag is on my van and my uniform. When people scan it they see my licence, insurance, and reviews all in one place. Professional.",
  },
  {
    name: "Funke Ogunlesi",
    business: "Funke's Kitchen",
    role: "Head Chef",
    image: "/images/avatars/funke.jpg",
    rating: 5,
    text: "Customers love seeing my food handling certification and reviews by scanning my tag. It's become a trust signal I can't afford to be without.",
  },
  {
    name: "Ngozi Eze",
    business: "Ngozi Properties",
    role: "Lead Agent",
    image: "/images/avatars/ngozi.jpg",
    rating: 5,
    text: "In real estate, trust is everything. WorkTag lets me show clients that I'm licensed and verified. It closes deals faster.",
  },
  {
    name: "Tunde Bakare",
    business: "Tunde Auto Care",
    role: "Master Mechanic",
    image: "/images/avatars/tunde.jpg",
    rating: 5,
    text: "I put my WorkTag on the counter and every customer scans it before I start work. It removes the guessing game completely.",
  },
];

export function BenefitReviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const [active, setActive] = useState(0);

  const next = () => setActive((a) => (a + 1) % REVIEWS.length);
  const prev = () => setActive((a) => (a - 1 + REVIEWS.length) % REVIEWS.length);
  const t = REVIEWS[active];

  return (
    <section id="benefit-reviews" ref={sectionRef} className="relative bg-white py-28 sm:py-36 lg:py-44 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F59E0B]/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#6366F1] uppercase">
              Benefit 04
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-[#090D1F]">
              Reviews that
              <br />
              <span className="text-gradient-purple">actually matter.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569] max-w-md">
              Every review on WorkTag is tied to a real, verified interaction. No fake reviews. No paid testimonials. Just honest feedback from real customers.
            </p>

            {/* Review stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "50K+", label: "Reviews left" },
                { value: "4.9", label: "Avg. rating" },
                { value: "98%", label: "Positive" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-[900] text-[#090D1F]">{stat.value}</div>
                  <div className="text-[11px] text-[#475569]/50 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Testimonial carousel */}
          <motion.div style={{ y: parallaxY }} className="lg:col-span-7">
            <div className="relative">
              {/* Portrait grid background */}
              <div className="absolute -inset-8 grid grid-cols-3 gap-3 opacity-[0.07] pointer-events-none">
                {REVIEWS.map((r) => (
                  <div key={r.name} className="aspect-square rounded-2xl overflow-hidden">
                    <Image src={r.image} alt={r.name} width={200} height={200} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              <div className="relative rounded-3xl bg-[#F8FAFC] border border-[#E8EBF2]/60 p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Quote className="h-8 w-8 text-[#6366F1]/20 mb-4" />
                    <p className="text-lg sm:text-xl leading-relaxed text-[#090D1F] font-medium">
                      &ldquo;{t.text}&rdquo;
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="portrait-ring">
                          <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-white">
                            <Image src={t.image} alt={t.name} width={56} height={56} className="w-full h-full object-cover" />
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#090D1F]">{t.name}</div>
                          <div className="text-xs text-[#475569]/50">{t.role}, {t.business}</div>
                          <div className="flex items-center gap-0.5 mt-1">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 text-[#F59E0B] fill-[#F59E0B]" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={prev}
                          className="h-9 w-9 rounded-full border border-[#E8EBF2] flex items-center justify-center text-[#475569]/50 hover:text-[#090D1F] hover:border-[#CBD5E1] transition-all duration-300"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={next}
                          className="h-9 w-9 rounded-full border border-[#E8EBF2] flex items-center justify-center text-[#475569]/50 hover:text-[#090D1F] hover:border-[#CBD5E1] transition-all duration-300"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex items-center gap-2 mt-6">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === active ? "w-6 bg-[#6366F1]" : "w-1.5 bg-[#E2E8F0] hover:bg-[#CBD5E1]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
