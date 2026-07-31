"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ShoppingBag, Globe, CreditCard, Package, Star, ArrowRight, Sparkles, Store, ShoppingCart } from "lucide-react";

const MOCK_PRODUCTS = [
  { name: "Bricklaying Service", price: "₦45,000", unit: "", rating: 4.9, reviews: 127, image: "/images/masonry-bricklaying.jpg", type: "service" as const },
  { name: "Concrete Blocks", price: "₦550", unit: "per piece", rating: 4.9, reviews: 214, image: "/images/masonry-blocks.jpg", type: "product" as const },
  { name: "General Repairs", price: "₦25,000", unit: "", rating: 4.8, reviews: 89, image: "/images/masonry-repairs.jpg", type: "service" as const },
  { name: "Building Sand", price: "₦45,000", unit: "per tipper", rating: 4.9, reviews: 176, image: "/images/masonry-sand.jpg", type: "product" as const },
];

export function BenefitStorefront() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 bg-gradient-to-br from-[#090D1F] via-[#0b1230] to-[#0a0f2e]" />
      <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#FDC304]/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#0241A8]/[0.06] rounded-full blur-[120px]" />
      </div>

      <div className="relative py-28 sm:py-36 lg:py-44">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FDC304]/10 border border-[#FDC304]/15 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#FDC304]">
              <Sparkles className="h-3 w-3" />
              EVOLVING PLATFORM
            </span>
            <h2 className="mt-5 text-[clamp(2rem,3.5vw,3.2rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-white">
              Your business deserves
              <br />
              <span className="bg-gradient-to-r from-[#FDC304] via-[#3FA9F5] to-[#0241A8] bg-clip-text text-transparent">
                its own storefront.
              </span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.75] text-[#8896B3] max-w-lg mx-auto">
              Every WorkTag profile is more than a page — it&apos;s a fully branded digital home for your business, complete with your products, services, and everything your customers need.
            </p>
          </motion.div>

          {/* Storefront showcase */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Storefront image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7"
            >
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-[#FDC304]/[0.08] via-[#0241A8]/[0.06] to-[#3FA9F5]/[0.04] rounded-[2rem] blur-[40px]" />

                <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">
                  {/* Store cover */}
                  <div className="relative h-32 sm:h-36">
                    <Image
                      src="/images/masonry-finishing.jpg"
                      alt="Bright Masonry storefront cover"
                      width={900}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f2e] via-[#0a0f2e]/40 to-transparent" />
                    <span className="absolute top-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1 text-[9px] font-bold text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FDC304] animate-pulse" />
                      worktag.com/bright-masonry
                    </span>
                  </div>

                  {/* Store header */}
                  <div className="flex items-center gap-4 p-6 pb-0 -mt-10 relative">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] flex items-center justify-center text-white font-black text-lg shadow-lg ring-4 ring-[#0a0f2e]">
                      BM
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">Bright Masonry</h3>
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/15 px-2 py-0.5 text-[9px] font-bold text-[#10B981]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                          Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-white/40 mt-0.5">Home Services · Lagos, Nigeria</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 text-[#FDC304] fill-[#FDC304]" />
                          <span className="text-[11px] font-bold text-white/70">4.9</span>
                          <span className="text-[10px] text-white/30">(127 reviews)</span>
                        </div>
                        <span className="text-white/10">·</span>
                        <span className="text-[10px] text-white/30">Trust Score: 94/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1 mt-4 px-6 border-b border-white/[0.06]">
                    {["Services", "Reviews", "About"].map((tab, i) => (
                      <span
                        key={tab}
                        className={`px-4 py-2 text-[11px] font-bold rounded-t-lg transition-colors ${
                          i === 0
                            ? "text-white bg-white/[0.04] border-b-2 border-[#0241A8]"
                            : "text-white/30 hover:text-white/50"
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>

                  {/* Product/Service cards */}
                  <div className="grid sm:grid-cols-2 gap-3 p-6">
                    {MOCK_PRODUCTS.map((product, i) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                        className="group rounded-xl bg-white/[0.04] border border-white/[0.06] overflow-hidden hover-lift"
                      >
                        <div className="relative aspect-[4/3] bg-white/[0.02] overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={480}
                            height={360}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.08]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                          <span className="absolute top-2 left-2 rounded-full bg-black/40 backdrop-blur-md border border-white/15 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white/90">
                            {product.type === "service" ? "Service" : "For Sale"}
                          </span>
                        </div>
                        <div className="p-3">
                          <h4 className="text-[11px] font-bold text-white mb-1">{product.name}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-[900] text-[#FDC304]">
                              {product.price}
                              {product.unit && <span className="ml-1 text-[9px] font-bold text-white/35 normal-case">{product.unit}</span>}
                            </span>
                            <div className="flex items-center gap-0.5">
                              <Star className="h-2.5 w-2.5 text-[#FDC304] fill-[#FDC304]" />
                              <span className="text-[10px] text-white/40 font-bold">{product.rating}</span>
                            </div>
                          </div>
                          <button className="mt-2 w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#FDC304] py-1.5 text-[10px] font-bold text-[#090D1F] shadow-[0_6px_16px_-6px_rgba(253,195,4,0.5)] hover:bg-[#FDE047] transition-colors">
                            {product.type === "service" ? <ShoppingBag className="h-3 w-3" /> : <ShoppingCart className="h-3 w-3" />}
                            {product.type === "service" ? "Book Now" : "Buy Now"}
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Feature highlights */}
            <div className="lg:col-span-5 space-y-4">
              {[
                {
                  icon: Store,
                  title: "Your Branded Storefront",
                  desc: "A custom URL for your business — worktag.com/your-name. Share it everywhere. It's your digital home base.",
                  color: "#0241A8",
                },
                {
                  icon: Package,
                  title: "Showcase Products & Services",
                  desc: "Display everything you offer with images, prices, and descriptions. Let customers browse before they reach out.",
                  color: "#0241A8",
                },
                {
                  icon: CreditCard,
                  title: "Seamless Transactions",
                  desc: "Integrated booking and payment. Customers can book your services and pay — all from your profile.",
                  color: "#0241A8",
                  badge: "Coming Soon",
                },
                {
                  icon: Globe,
                  title: "Always Accessible",
                  desc: "Your storefront works on every device, loads instantly, and is always up. No hosting headaches.",
                  color: "#0241A8",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] p-5 hover-lift"
                >
                  <span
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${feature.color}12` }}
                  >
                    <feature.icon className="h-4 w-4" style={{ color: feature.color }} />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[13px] font-bold text-white">{feature.title}</h3>
                      {feature.badge && (
                        <span className="rounded-full bg-[#FDC304]/10 border border-[#FDC304]/15 px-2 py-0.5 text-[8px] font-bold text-[#FDC304] uppercase tracking-wider">
                          {feature.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-white/40 leading-relaxed mt-1">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Subtle teaser */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-2xl bg-gradient-to-r from-[#FDC304]/[0.04] via-[#3FA9F5]/[0.03] to-[#0241A8]/[0.04] border border-white/[0.04] p-5"
              >
                <p className="text-[12px] text-white/30 leading-relaxed">
                  <span className="text-white/50 font-bold">Something exciting is brewing.</span>{" "}
                  We&apos;re building tools that will make your WorkTag storefront even more powerful.
                  Stay tuned.
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-[#FDC304]/50">
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
