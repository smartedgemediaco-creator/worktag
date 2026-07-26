"use client";

import { motion } from "framer-motion";
import { Shield, Sparkles, QrCode, Globe, CheckCircle, Star } from "lucide-react";
import Image from "next/image";

export function FeaturesGrid() {
  return (
    <section id="features" className="relative bg-gradient-to-b from-[#F4F6FA]/60 to-white py-32 sm:py-40 overflow-hidden">
      <div className="gradient-mesh absolute inset-0 pointer-events-none opacity-40" />
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16 sm:mb-20"
        >
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#6366F1] uppercase">Platform Core</span>
          <h2 className="mt-4 text-[clamp(2rem,3.5vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-[#090D1F]">
            Built for professional credibility.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5C6479] max-w-md">
            WorkTag establishes real-world verification via digital trust infrastructure.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {/* Card 1: Large Span 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-[#E8EBF2] bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-cyber hover:-translate-y-0.5"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1 space-y-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#6366F1]/10 text-xs font-bold text-[#6366F1]">
                  01
                </span>
                <div className="flex items-center gap-1.5">
                  <Globe className="h-4.5 w-4.5 text-[#6366F1]" />
                  <h3 className="text-base font-bold text-[#090D1F] tracking-tight">Permanent Trust Profile</h3>
                </div>
                <p className="text-xs leading-relaxed text-[#5C6479]">
                  A custom professional page that belongs to your business. Fully responsive, easily shared via WhatsApp, SMS, or QR code. No complex hosting or configuration needed.
                </p>
              </div>

              {/* Graphic Widget: Simulated rating card */}
              <div className="w-full md:w-[220px] rounded-2xl bg-gray-50 border border-gray-100 p-4 shrink-0 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#0A3D91] to-[#6366F1] flex items-center justify-center text-[10px] font-bold text-white">
                    WT
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#090D1F]">Àfárà Digital</div>
                    <div className="text-[8px] text-gray-400 font-medium">Verify-score: A+</div>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="h-1.5 w-full rounded bg-gray-200 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0A3D91] to-[#6366F1]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-gray-400 font-bold uppercase">
                    <span>Trust Dial</span>
                    <span>95% verified</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Small Span 1 (QR Scanner widget) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-[#E8EBF2] bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-cyber hover:-translate-y-0.5"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#6366F1]/10 text-xs font-bold text-[#6366F1]">
                02
              </span>
              <div className="flex items-center gap-1.5">
                <QrCode className="h-4.5 w-4.5 text-[#6366F1]" />
                <h3 className="text-base font-bold text-[#090D1F] tracking-tight">QR Everywhere</h3>
              </div>
              <p className="text-xs leading-relaxed text-[#5C6479]">
                Place your WorkTag QR code on storefront windows, company vehicles, toolboxes, uniform badges, or digital emails.
              </p>

              {/* Graphic Widget: QR Code with scanning laser */}
              <div className="relative w-[110px] h-[110px] mx-auto bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center p-1.5 mt-4">
                <Image src="/images/qr-worktag.webp" alt="QR code" width={100} height={100} className="object-contain" />
                <motion.div
                  className="absolute left-[5%] right-[5%] h-[2px] bg-[#6366F1] shadow-[0_0_6px_#6366F1]"
                  animate={{ top: ["5%", "95%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Small Span 1 (Verified Badge widget) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-[#E8EBF2] bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-cyber hover:-translate-y-0.5"
          >
            <div className="space-y-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#6366F1]/10 text-xs font-bold text-[#6366F1]">
                03
              </span>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4.5 w-4.5 text-[#6366F1]" />
                <h3 className="text-base font-bold text-[#090D1F] tracking-tight">Real Verification</h3>
              </div>
              <p className="text-xs leading-relaxed text-[#5C6479]">
                Every review and trust tag is validated. Clients can leave comments knowing they are linked to physical job interactions.
              </p>

              {/* Graphic Widget: Big Verified Badge */}
              <div className="flex items-center justify-center py-4">
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 px-4 py-2 text-xs font-bold text-[#10B981] shadow-sm"
                >
                  <Shield className="h-4.5 w-4.5 text-[#10B981]" />
                  Verified Identity
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Large Span 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 group relative overflow-hidden rounded-3xl border border-[#E8EBF2] bg-white p-8 shadow-sm transition-all duration-500 hover:shadow-cyber hover:-translate-y-0.5"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center h-full">
              <div className="flex-1 space-y-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#6366F1]/10 text-xs font-bold text-[#6366F1]">
                  04
                </span>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="h-4.5 w-4.5 text-[#6366F1]" />
                  <h3 className="text-base font-bold text-[#090D1F] tracking-tight">Customer Trust Dial</h3>
                </div>
                <p className="text-xs leading-relaxed text-[#5C6479]">
                  WorkTag reduces transactional anxiety. By looking up your profile, potential clients see ratings, direct credentials, and pictures of your works instantly.
                </p>
              </div>

              {/* Graphic Widget: Mock Reviews Stack */}
              <div className="w-full md:w-[220px] flex flex-col gap-2 shrink-0">
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-2.5 shadow-sm text-[10px]">
                  <div className="flex items-center gap-1 text-[#F59E0B] font-bold mb-1">
                    <Star className="h-3 w-3 fill-[#F59E0B]" />
                    5.0 &middot; <span className="text-gray-400 font-normal">Tunde K.</span>
                  </div>
                  <p className="text-gray-500 leading-tight">Excellent tailoring. Very professional.</p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-2.5 shadow-sm text-[10px] opacity-75">
                  <div className="flex items-center gap-1 text-[#F59E0B] font-bold mb-1">
                    <Star className="h-3 w-3 fill-[#F59E0B]" />
                    4.8 &middot; <span className="text-gray-400 font-normal">Ngozi A.</span>
                  </div>
                  <p className="text-gray-500 leading-tight">Highly responsive service clinic.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
