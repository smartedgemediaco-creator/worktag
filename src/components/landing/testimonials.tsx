"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TESTIMONIALS = [
  {
    business: "Bright Masonry",
    tagline: "Home Services · Lagos, Nigeria",
    quote:
      "WorkTag changed how my customers see my business. They scan my tag and instantly see I'm verified. The trust score gives them confidence before they even call.",
    name: "Chinedu Okafor",
    role: "Founder",
    image: "/images/avatars/chinedu.jpg",
  },
  {
    business: "Aisha's Designs",
    tagline: "Fashion · Kano, Nigeria",
    quote:
      "I was sceptical at first, but the physical tag on my shop window has brought in customers who mentioned they checked my profile before walking in. That never happened before.",
    name: "Aisha Bello",
    role: "Creative Director",
    image: "/images/avatars/aisha.jpg",
  },
  {
    business: "Segun Plumbing",
    tagline: "Plumbing · Lagos, Nigeria",
    quote:
      "My WorkTag is on my van and my uniform. When people scan it they see my licence, my insurance, and my reviews all in one place. It makes me look professional.",
    name: "Segun Adeyemi",
    role: "Owner",
    image: "/images/avatars/segun.jpg",
  },
  {
    business: "Funke's Kitchen",
    tagline: "Catering · Ibadan, Nigeria",
    quote:
      "My customers love that they can see my food handling certification and customer reviews just by scanning my tag. It's become a trust signal I can't afford to be without.",
    name: "Funke Ogunlesi",
    role: "Head Chef",
    image: "/images/avatars/funke.jpg",
  },
  {
    business: "Ngozi Properties",
    tagline: "Real Estate · Enugu, Nigeria",
    quote:
      "In real estate, trust is everything. WorkTag lets me show potential clients that I'm licensed, verified, and have a track record. It closes deals faster.",
    name: "Ngozi Eze",
    role: "Lead Agent",
    image: "/images/avatars/ngozi.jpg",
  },
  {
    business: "Tunde Auto Care",
    tagline: "Auto Repair · Port Harcourt, Nigeria",
    quote:
      "I put my WorkTag on the counter and every customer scans it before I start work. They can see my certifications and reviews. It removes the guessing game.",
    name: "Tunde Bakare",
    role: "Master Mechanic",
    image: "/images/avatars/tunde.jpg",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  function next() {
    setActive((a) => (a + 1) % TESTIMONIALS.length);
  }

  function prev() {
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const t = TESTIMONIALS[active];

  return (
    <section className="relative bg-[#F8FAFC]/50 py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,#C9D7FF/6_0%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm shrink-0"
          >
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#0241A8] uppercase">Trusted by professionals</span>
            <h2 className="mt-4 text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#0F172A]">
              How industry leaders <br className="hidden sm:block" />
              are building with WorkTag
            </h2>
            <Link
              href="/stories"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0241A8] transition-all duration-300 hover:gap-3"
            >
              More customer stories
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </motion.div>

          <div className="flex-1 w-full max-w-2xl">
            <div className="relative">
              <div className="rounded-2xl bg-white border border-[#E2E8F0]/20 shadow-[0_10px_40px_-15px_rgba(2,65,168,0.08)] p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-[#F8FAFC] ring-1 ring-[#E2E8F0]/20">
                        {t.image && (
                          <Image src={t.image} alt={t.name} width={48} height={48} className="object-cover w-full h-full" />
                        )}
                      </div>
                      <div>
                        <div className="text-base font-semibold text-[#0F172A]">{t.business}</div>
                        <div className="text-xs text-[#475569]/50">{t.tagline}</div>
                      </div>
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed text-[#475569]">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="mt-8 pt-6 border-t border-[#E2E8F0]/20 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-[#0F172A]">{t.name}</div>
                        <div className="text-xs text-[#475569]/50">{t.role}, {t.business}</div>
                      </div>
                      <Link
                        href="#"
                        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#0241A8] transition-all duration-300 hover:gap-2"
                      >
                        Read the story
                        <svg viewBox="0 0 16 16" className="h-3 w-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === active
                          ? "w-6 bg-[#0241A8]"
                          : "w-1.5 bg-[#E2E8F0] hover:bg-[#CBD5E1]"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0]/50 text-[#475569]/50 transition-all duration-300 hover:border-[#CBD5E1] hover:text-[#0F172A] hover:bg-white"
                    aria-label="Previous testimonial"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                      <path d="M10 12L6 8l4-4" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E2E8F0]/50 text-[#475569]/50 transition-all duration-300 hover:border-[#CBD5E1] hover:text-[#0F172A] hover:bg-white"
                    aria-label="Next testimonial"
                  >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
