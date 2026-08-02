"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, Sparkles, Star, Zap, Award, BadgeCheck, TrendingUp } from "lucide-react";

const SECTORS = [
  { name: "Verified Electricians", icon: Sparkles },
  { name: "Certified Tailors", icon: ShieldCheck },
  { name: "Scannable Restaurants", icon: Star },
  { name: "Trust-Scored Mechanics", icon: Check },
  { name: "Verified Hair Stylists", icon: Sparkles },
  { name: "Certified AC Installers", icon: ShieldCheck },
  { name: "Verified Carpentry", icon: Check },
  { name: "Trusted Plumbers", icon: Zap },
  { name: "Verified Caterers", icon: Award },
  { name: "Certified Painters", icon: BadgeCheck },
  { name: "Trusted Real Estate", icon: TrendingUp },
  { name: "Verified Accountants", icon: ShieldCheck },
  { name: "Licensed Doctors", icon: Award },
  { name: "Certified Lawyers", icon: BadgeCheck },
  { name: "Qualified Pharmacists", icon: ShieldCheck },
  { name: "Registered Nurses", icon: Check },
  { name: "Trusted Architects", icon: Sparkles },
  { name: "Licensed Surveyors", icon: TrendingUp },
];

export function TrustBar() {
  return (
    <section className="relative border-y border-[#E8EBF2]/30 bg-[#F4F6FA]/30 py-5 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="flex overflow-hidden mask-fade-x">
          <motion.div
            className="flex items-center gap-4 shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[...SECTORS, ...SECTORS].map((sector, i) => {
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#E8EBF2]/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] shrink-0 whitespace-nowrap text-xs font-bold text-[#5C6479]"
                >
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-[#10B981] animate-ping opacity-45" />
                    <span className="relative rounded-full bg-[#10B981] w-2 h-2" />
                  </span>
                  <span className="text-[#090D1F]">{sector.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
