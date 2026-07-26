"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ShoppingBag, Globe, CreditCard, Package, Star, ArrowRight, Sparkles, Store } from "lucide-react";

const MOCK_PRODUCTS = [
  { name: "Bricklaying Service", price: "₦45,000", rating: 4.9, reviews: 127, image: "/images/acrylic.png" },
  { name: "General Repairs", price: "₦25,000", rating: 4.8, reviews: 89, image: "/images/pvc.png" },
  { name: "Finishing Works", price: "₦65,000", rating: 5.0, reviews: 203, image: "/images/card stack.png" },
];

export function BenefitStorefront() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 bg-gradient-to-br from-[#0c0520] via-[#120a30] to-[#0a0f2e]" />
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#F59E0B]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#6366F1]/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#EC4899]/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/15 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#FBBF24]">
              <Sparkles className="h-3 w-3" />
              EVOLVING PLATFORM
            </span>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-white">
              Your business deserves
              <br />
              <span className="bg-gradient-to-r from-[#FBBF24] via-[#F59E0B] to-[#EC4899] bg-clip-text text-transparent">
                its own storefront.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#94A3B8] max-w-lg mx-auto">
              Every WorkTag profile is more than a page — it&apos;s a fully branded digital home for your business, complete with your products, services, and everything your customers need.
            </p>
          </motion.div>

          {/* Storefront mockup */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Browser mockup */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <div className="relative">
                {/* Glow behind */}
                <div className="absolute -inset-6 bg-gradient-to-br from-[#F59E0B]/10 via-[#6366F1]/8 to-[#EC4898]/6 rounded-[2rem] blur-[40px]" />

                <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/60" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] border border-white/[0.06] px-3 py-1.5 max-w-md mx-auto">
                        <Globe className="h-3 w-3 text-white/20" />
                        <span className="text-[11px] text-white/30 font-medium">worktag.io/bright-masonry</span>
                      </div>
                    </div>
                  </div>

                  {/* Storefront content */}
                  <div className="p-6 sm:p-8">
                    {/* Store header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0A3D91] to-[#6366F1] flex items-center justify-center text-white font-black text-lg shadow-lg ring-2 ring-[#6366F1]/20">
                        BM
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white">Bright Masonry</h3>
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/15 px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            Verified
                          </span>
                        </div>
                        <p className="text-xs text-white/40 mt-0.5">Home Services · Lagos, Nigeria</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 text-[#F59E0B] fill-[#F59E0B]" />
                            <span className="text-xs font-bold text-white/70">4.9</span>
                            <span className="text-[10px] text-white/30">(127 reviews)</span>
                          </div>
                          <span className="text-white/10">·</span>
                          <span className="text-[10px] text-white/30">Trust Score: 94/100</span>
                        </div>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 mb-6 border-b border-white/[0.06] pb-px">
                      {["Services", "Reviews", "About"].map((tab, i) => (
                        <span
                          key={tab}
                          className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-colors ${
                            i === 0
                              ? "text-white bg-white/[0.04] border-b-2 border-[#6366F1]"
                              : "text-white/30 hover:text-white/50"
                          }`}
                        >
                          {tab}
                        </span>
                      ))}
                    </div>

                    {/* Product/Service cards */}
                    <div className="grid sm:grid-cols-3 gap-3">
                      {MOCK_PRODUCTS.map((product, i) => (
                        <motion.div
                          key={product.name}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                          className="group rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-hidden hover-lift"
                        >
                          <div className="aspect-[4/3] bg-white/[0.02] flex items-center justify-center p-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={120}
                              height={120}
                              className="object-contain w-full h-full opacity-60 group-hover:opacity-80 transition-opacity"
                            />
                          </div>
                          <div className="p-3.5">
                            <h4 className="text-xs font-bold text-white mb-1">{product.name}</h4>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-[900] text-[#FBBF24]">{product.price}</span>
                              <div className="flex items-center gap-0.5">
                                <Star className="h-2.5 w-2.5 text-[#F59E0B] fill-[#F59E0B]" />
                                <span className="text-[10px] text-white/40 font-bold">{product.rating}</span>
                              </div>
                            </div>
                            <button className="mt-2.5 w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/20 py-1.5 text-[10px] font-bold text-[#818CF8] hover:bg-[#6366F1]/20 transition-colors">
                              <ShoppingBag className="h-3 w-3" />
                              Book Now
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Feature highlights */}
            <div className="lg:col-span-5 space-y-5">
              {[
                {
                  icon: Store,
                  title: "Your Branded Storefront",
                  desc: "A custom URL for your business — worktag.io/your-name. Share it everywhere. It's your digital home base.",
                  color: "#6366F1",
                },
                {
                  icon: Package,
                  title: "Showcase Products & Services",
                  desc: "Display everything you offer with images, prices, and descriptions. Let customers browse before they reach out.",
                  color: "#8B5CF6",
                },
                {
                  icon: CreditCard,
                  title: "Seamless Transactions",
                  desc: "Integrated booking and payment. Customers can book your services and pay — all from your profile.",
                  color: "#06B6D4",
                  badge: "Coming Soon",
                },
                {
                  icon: Globe,
                  title: "Always Accessible",
                  desc: "Your storefront works on every device, loads instantly, and is always up. No hosting headaches.",
                  color: "#10B981",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] p-5 hover-lift"
                >
                  <span
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${feature.color}12` }}
                  >
                    <feature.icon className="h-5 w-5" style={{ color: feature.color }} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{feature.title}</h3>
                      {feature.badge && (
                        <span className="rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/15 px-2 py-0.5 text-[8px] font-bold text-[#FBBF24] uppercase tracking-wider">
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed mt-1.5">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Subtle teaser */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="rounded-2xl bg-gradient-to-r from-[#F59E0B]/5 via-[#EC4899]/5 to-[#6366F1]/5 border border-white/[0.05] p-5"
              >
                <p className="text-xs text-white/30 leading-relaxed">
                  <span className="text-white/50 font-bold">Something exciting is brewing.</span>{" "}
                  We&apos;re building tools that will make your WorkTag storefront even more powerful.
                  Stay tuned.
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-[#FBBF24]/60">
                  <ArrowRight className="h-3 w-3" />
                  <span>The best is yet to come</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
