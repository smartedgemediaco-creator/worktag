"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { WorkTagMark } from "./worktag-logo";

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "top-4 mx-auto max-w-5xl rounded-full border border-white/40 bg-white/70 shadow-[0_12px_40px_rgba(99,102,241,0.06)] backdrop-blur-xl px-4 py-1"
          : "top-0 bg-transparent py-2"
      }`}
    >
      <nav className="mx-auto flex items-center justify-between px-4 sm:px-6 h-12">
        <Link href="/" className="flex items-center gap-2 group">
          <WorkTagMark className="h-6.5 w-6.5 shrink-0 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-[14px] font-bold tracking-tight text-[#090D1F] leading-tight group-hover:text-[#6366F1] transition-colors">
              WorkTag
            </span>
            <span className="text-[8px] font-semibold tracking-[0.15em] text-[#5C6479]/40 uppercase">
              by Àfárà
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative text-xs font-semibold tracking-wide transition-colors duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-[#6366F1]"
                  : "text-[#5C6479]/85 hover:text-[#090D1F]"
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden text-xs font-semibold text-[#5C6479]/80 transition-colors duration-300 hover:text-[#090D1F] sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="relative inline-flex h-8 items-center justify-center rounded-full bg-gradient-to-r from-[#0A3D91] to-[#6366F1] px-4.5 text-xs font-bold text-white transition-all duration-300 hover:shadow-[0_8px_20px_-4px_rgba(99,102,241,0.4)] hover:-translate-y-[0.5px] active:translate-y-0"
          >
            <span className="relative z-10">Get started</span>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full md:hidden hover:bg-[#F4F6FA] transition-colors"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 20 20" className="h-4.5 w-4.5 text-[#090D1F]" stroke="currentColor" strokeWidth="2" fill="none">
              {mobileOpen ? (
                <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5.5h14" strokeLinecap="round" />
                  <path d="M3 10h14" strokeLinecap="round" />
                  <path d="M3 14.5h14" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/20 bg-white/90 backdrop-blur-xl px-4 pb-4 pt-3 md:hidden overflow-hidden rounded-2xl mt-1 shadow-lg"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-semibold text-[#5C6479] hover:text-[#090D1F] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-gray-200/50 my-1" />
              <Link
                href="/login"
                className="text-xs font-semibold text-[#5C6479] hover:text-[#090D1F] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
