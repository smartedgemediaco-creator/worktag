"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { WorkTagMark } from "./worktag-logo";
import {
  Shield, QrCode, Star, Users, Globe, Zap,
  ChevronDown, ArrowRight, Sparkles, TrendingUp,
  Lock, Eye, BarChart3, MessageCircle, ScanLine,
  BadgeCheck, Store, Briefcase, Award, ClipboardCheck,
} from "lucide-react";

type MegaMenuItem = {
  label: string;
  href?: string;
  children?: {
    icon: React.ElementType;
    label: string;
    description: string;
    href: string;
    image?: string;
    badge?: string;
  }[];
};

const NAV_ITEMS: MegaMenuItem[] = [
  {
    label: "Platform",
    children: [
      {
        icon: Shield,
        label: "Digital Identity",
        description: "Permanent verified profile that follows your business everywhere",
        href: "#benefit-identity",
        badge: "Core",
      },
      {
        icon: QrCode,
        label: "QR Ecosystem",
        description: "Physical tags, stickers, and digital codes for every surface",
        href: "#benefit-qr",
      },
      {
        icon: TrendingUp,
        label: "Trust Engine",
        description: "Dynamic trust score that grows with every verified interaction",
        href: "#benefit-trust",
      },
      {
        icon: Star,
        label: "Reputation System",
        description: "Collect verified reviews from real customers",
        href: "#benefit-reviews",
      },
      {
        icon: BadgeCheck,
        label: "Verification",
        description: "Multi-layer identity and credential verification",
        href: "#benefit-verification",
      },
      {
        icon: BarChart3,
        label: "Analytics",
        description: "Track scans, profile views, and customer engagement",
        href: "#benefit-trust",
        badge: "New",
      },
    ],
  },
  {
    label: "Products",
    children: [
      {
        icon: Store,
        label: "Acrylic Tags",
        description: "Premium acrylic tags for storefronts and counters",
        href: "#qr-experience",
      },
      {
        icon: QrCode,
        label: "PVC Cards",
        description: "Durable PVC cards for business card integration",
        href: "#qr-experience",
      },
      {
        icon: Sparkles,
        label: "Stickers",
        description: "Weatherproof stickers for windows, vehicles, and equipment",
        href: "#qr-experience",
      },
      {
        icon: Briefcase,
        label: "Business Cards",
        description: "Premium cards with embedded QR technology",
        href: "#qr-experience",
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        icon: Users,
        label: "Success Stories",
        description: "How professionals are transforming their businesses",
        href: "#testimonials",
      },
      {
        icon: ClipboardCheck,
        label: "How It Works",
        description: "Three simple steps to verified trust",
        href: "#how-it-works",
      },
      {
        icon: MessageCircle,
        label: "FAQ",
        description: "Answers to common questions",
        href: "#faq",
      },
    ],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.2 } },
};

export function MegaNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 200);
  }, []);

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
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeItem = NAV_ITEMS.find((item) => item.label === activeMenu);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled ? "nav-glass-scrolled" : "bg-transparent"
        }`}
      >
        <div ref={navRef} className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <WorkTagMark className="h-7 w-7 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105" />
              <div className="flex flex-col">
                <span className={`text-[15px] font-bold tracking-tight leading-tight group-hover:text-[#6366F1] transition-colors ${scrolled ? "text-[#090D1F]" : "text-white"}`}>
                  WorkTag
                </span>
                <span className={`text-[7px] font-bold tracking-[0.2em] uppercase transition-colors ${scrolled ? "text-[#6366F1]/50" : "text-white/40"}`}>
                  by Afara Digital
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                  className="relative"
                >
                  <button
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                      activeMenu === item.label
                        ? "text-[#818CF8] bg-[#6366F1]/[0.06]"
                        : scrolled
                          ? "text-[#475569] hover:text-[#090D1F] hover:bg-[#F4F6FA]"
                          : "text-white/80 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        activeMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
              ))}
              <Link
                href="#how-it-works"
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                  scrolled
                    ? "text-[#475569] hover:text-[#090D1F] hover:bg-[#F4F6FA]"
                    : "text-white/80 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                How It Works
              </Link>
              <Link
                href="#faq"
                className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                  scrolled
                    ? "text-[#475569] hover:text-[#090D1F] hover:bg-[#F4F6FA]"
                    : "text-white/80 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                FAQ
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className={`hidden lg:inline-flex text-[13px] font-semibold transition-colors duration-300 px-3 py-2 ${
                  scrolled ? "text-[#475569] hover:text-[#090D1F]" : "text-white/70 hover:text-white"
                }`}
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0241A8] to-[#6366F1] px-5.5 py-2.5 text-[13px] font-bold text-white transition-all duration-300 hover:shadow-[0_8px_24px_-4px_rgba(99,102,241,0.4)] hover:-translate-y-[1px] active:translate-y-0"
              >
                <Zap className="h-3.5 w-3.5" />
                Get Started Free
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`flex lg:hidden h-10 w-10 items-center justify-center rounded-xl transition-colors ${scrolled ? "hover:bg-[#F4F6FA]" : "hover:bg-white/[0.06]"}`}
                aria-label="Toggle menu"
              >
                <div className="flex flex-col gap-[5px] w-[18px]">
                  <span className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${scrolled ? "bg-[#090D1F]" : "bg-white"} ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                  <span className={`block h-[2px] rounded-full transition-all duration-300 ${scrolled ? "bg-[#090D1F]" : "bg-white"} ${mobileOpen ? "opacity-0 scale-0" : ""}`} />
                  <span className={`block h-[2px] rounded-full transition-all duration-300 origin-center ${scrolled ? "bg-[#090D1F]" : "bg-white"} ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {activeMenu && activeItem?.children && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseEnter={() => handleMouseEnter(activeMenu)}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-x-0 top-full mega-menu-panel shadow-[0_20px_60px_-10px_rgba(99,102,241,0.12)] border-t border-[#E8EBF2]/30"
            >
              <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-4 xl:col-span-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#6366F1]/60 uppercase">
                        {activeMenu}
                      </span>
                      <p className="text-xs text-[#475569] leading-relaxed mt-2">
                        {activeMenu === "Platform"
                          ? "The complete digital trust infrastructure for modern professionals."
                          : activeMenu === "Products"
                          ? "Premium physical products that connect the digital and physical worlds."
                          : "Everything you need to get started with WorkTag."}
                      </p>
                    </div>
                    <div className="mt-6 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0241A8] to-[#6366F1] p-5 text-white">
                      <Shield className="h-6 w-6 mb-3 opacity-80" />
                      <p className="text-xs font-bold mb-1">Enterprise Trust</p>
                      <p className="text-[11px] text-white/70 leading-relaxed">
                        Built on immutable infrastructure. Your reputation, verified forever.
                      </p>
                      <Link
                        href="/register"
                        className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-white/90 hover:text-white transition-colors"
                      >
                        Start now <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-8 xl:col-span-9">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                      {activeItem.children.map((child, i) => {
                        const Icon = child.icon;
                        return (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.04 }}
                          >
                            <Link
                              href={child.href}
                              onClick={() => setActiveMenu(null)}
                              className="group flex items-start gap-3.5 rounded-xl p-3.5 transition-all duration-300 hover:bg-[#F4F6FA]/80"
                            >
                              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#6366F1]/[0.07] text-[#6366F1] group-hover:bg-[#6366F1]/[0.12] transition-colors duration-300">
                                <Icon className="h-4.5 w-4.5" />
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-[13px] font-bold text-[#090D1F] group-hover:text-[#6366F1] transition-colors duration-300">
                                    {child.label}
                                  </span>
                                  {child.badge && (
                                    <span className="rounded-full bg-[#6366F1]/10 px-2 py-0.5 text-[9px] font-bold text-[#6366F1] uppercase tracking-wider">
                                      {child.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-[#475569]/70 leading-relaxed mt-0.5 line-clamp-2">
                                  {child.description}
                                </p>
                              </div>
                              <ArrowRight className="h-3.5 w-3.5 text-[#475569]/20 group-hover:text-[#6366F1] transition-all duration-300 group-hover:translate-x-0.5 shrink-0 mt-1" />
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[59] lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.1)] overflow-y-auto"
            >
              <div className="p-6 pt-20">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="mb-2">
                    <button
                      onClick={() => setMobileSubmenu(mobileSubmenu === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full py-3 text-left text-[15px] font-bold text-[#090D1F]"
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 text-[#475569]/40 transition-transform duration-300 ${mobileSubmenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {mobileSubmenu === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-3 space-y-1">
                            {item.children?.map((child) => {
                              const Icon = child.icon;
                              return (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-3 py-2.5 rounded-lg hover:bg-[#F4F6FA] transition-colors"
                                >
                                  <Icon className="h-4 w-4 text-[#6366F1]" />
                                  <span className="text-sm font-medium text-[#475569]">{child.label}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="h-px bg-[#E8EBF2]/50 my-4" />
                <Link
                  href="/login"
                  className="block py-3 text-[15px] font-bold text-[#475569]"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#0241A8] to-[#6366F1] px-6 py-3.5 text-sm font-bold text-white w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  <Zap className="h-4 w-4" />
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
