"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Zap, Sparkles, Building2, ShieldCheck } from "lucide-react";

type Billing = "monthly" | "yearly";

const PLANS = [
  {
    name: "Pro",
    icon: Sparkles,
    tagline: "Everything you need to turn scans into customers. Free for 14 days.",
    monthly: 2500,
    yearly: 1900,
    priceSuffix: "/month",
    features: [
      "Custom branded link",
      "Unlimited job portfolio",
      "Physical tag discounts up to 30%",
      "WhatsApp & booking buttons",
      "Scan analytics dashboard",
      "Verified profile & reviews",
    ],
    cta: { label: "Start 14-day free trial", href: "/register" },
    featured: true,
  },
  {
    name: "Business",
    icon: Building2,
    tagline: "For teams, multi-location brands, and growing shops.",
    monthly: 6500,
    yearly: 4900,
    priceSuffix: "/month",
    features: [
      "Everything in Pro, plus:",
      "Up to 5 team profiles",
      "Multiple business locations",
      "Full branded storefront",
      "Priority 24-hour verification",
      "API & integrations access",
    ],
    cta: { label: "Talk to Sales", href: "/contact" },
    featured: false,
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="relative overflow-hidden">
      <div className="absolute inset-0 benefit-gradient-1" />
      <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#3FA9F5]/[0.08] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-[10%] w-[450px] h-[450px] bg-[#FDC304]/[0.05] rounded-full blur-[130px]" />
      </div>

      <div className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#FDC304] uppercase">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#FDC304]" />
              Pricing
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#3FA9F5]" />
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-white">
              Simple pricing for
              <br />
              <span className="bg-gradient-to-r from-[#FDC304] via-[#3FA9F5] to-[#0241A8] bg-clip-text text-transparent">
                every stage.
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-white/70 max-w-lg mx-auto">
              Every plan starts with a 14-day free trial. No card required — upgrade when your business is ready.
            </p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 flex justify-center"
          >
            <div className="inline-flex items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.04] p-1 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 ${
                  billing === "monthly" ? "bg-white text-[#0241A8] shadow" : "text-white/60 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling("yearly")}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 ${
                  billing === "yearly" ? "bg-white text-[#0241A8] shadow" : "text-white/60 hover:text-white"
                }`}
              >
                Yearly
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-wider ${
                  billing === "yearly" ? "bg-[#FDC304] text-[#090D1F]" : "bg-[#FDC304]/15 text-[#FDC304]"
                }`}>
                  Save 24%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Plans grid */}
          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-6 items-stretch max-w-5xl mx-auto">
            {PLANS.map((plan, i) => {
              const Icon = plan.icon;
              const price = billing === "monthly" ? plan.monthly : plan.yearly;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex ${plan.featured ? "lg:scale-[1.04] z-10" : ""}`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 rounded-full bg-[#FDC304] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#090D1F] shadow-[0_10px_24px_-8px_rgba(253,195,4,0.8)]">
                      Most Popular
                    </span>
                  )}

                  {plan.featured ? (
                    <div className="relative w-full rounded-3xl bg-gradient-to-b from-[#FDC304] via-[#FDE047] to-[#FDC304] p-px shadow-[0_48px_110px_-40px_rgba(253,195,4,0.55)]">
                      <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-white p-8">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] shadow-[0_10px_24px_-10px_rgba(2,65,168,0.7)]">
                            <Icon className="h-5 w-5 text-white" />
                          </span>
                          <div>
                            <h3 className="text-lg font-[900] text-[#090D1F] tracking-tight">{plan.name}</h3>
                            <p className="text-[11px] text-[#5A6A8A] font-medium">{plan.tagline}</p>
                          </div>
                        </div>

                        <div className="mt-7 flex items-end gap-1.5">
                          <span className="text-4xl font-[900] tracking-tight text-[#090D1F]">₦{price.toLocaleString()}</span>
                          <span className="text-xs font-semibold text-[#5A6A8A] mb-1.5">{plan.priceSuffix}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDC304]/15 border border-[#FDC304]/30 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-[#C79A00]">
                            <Zap className="h-3 w-3" />
                            Free for 14 days
                          </span>
                          <span className="text-[11px] font-medium text-[#5A6A8A]">
                            {billing === "yearly" ? "billed annually" : "billed monthly"} · no card required
                          </span>
                        </div>

                        <ul className="mt-7 space-y-3 flex-1">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2.5">
                              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FDC304]/15">
                                <Check className="h-3 w-3 text-[#C79A00] stroke-[3]" />
                              </span>
                              <span className="text-[13px] leading-relaxed text-[#475569]">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href={plan.cta.href}
                          className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FDC304] px-6 text-[13px] font-bold text-[#090D1F] shadow-[0_16px_40px_-12px_rgba(253,195,4,0.6)] transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(253,195,4,0.8)] hover:-translate-y-px"
                        >
                          {plan.cta.label}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full rounded-3xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-8 flex flex-col hover:border-white/[0.16] transition-colors duration-500">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.07] border border-white/[0.1]">
                          <Icon className="h-5 w-5 text-[#3FA9F5]" />
                        </span>
                        <div>
                          <h3 className="text-lg font-[900] text-white tracking-tight">{plan.name}</h3>
                          <p className="text-[11px] text-white/50 font-medium">{plan.tagline}</p>
                        </div>
                      </div>

                      <div className="mt-7 flex items-end gap-1.5">
                        <span className="text-4xl font-[900] tracking-tight text-white">₦{price.toLocaleString()}</span>
                        <span className="text-xs font-semibold text-white/50 mb-1.5">{plan.priceSuffix}</span>
                      </div>
                      <p className="mt-1 text-[11px] font-medium text-white/35">
                        {billing === "yearly" ? "billed annually" : "billed monthly"}
                      </p>

                      <ul className="mt-7 space-y-3 flex-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#10B981]/10 border border-[#10B981]/25">
                              <Check className="h-3 w-3 text-[#10B981] stroke-[3]" />
                            </span>
                            <span className="text-[13px] leading-relaxed text-white/70">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={plan.cta.href}
                        className={`group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[13px] font-bold transition-all duration-300 hover:-translate-y-px ${
                          plan.name === "Business"
                            ? "bg-gradient-to-r from-[#0241A8] to-[#3FA9F5] text-white shadow-[0_16px_40px_-12px_rgba(2,65,168,0.6)] hover:shadow-[0_20px_50px_-12px_rgba(2,65,168,0.8)]"
                            : "border border-white/25 text-white hover:bg-white/10"
                        }`}
                      >
                        {plan.cta.label}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Guarantee strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          >
            {["14-day free trial on every plan", "No card required", "Prices in Nigerian Naira", "Cancel anytime"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
                <span className="text-[11px] font-medium text-white/45">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
