"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const TEAM_AVATARS = [
  { src: "/images/avatars/chinedu.jpg", name: "Chinedu Okafor", role: "Gas Supplier", location: "Lagos" },
  { src: "/images/avatars/aisha.jpg", name: "Aisha Bello", role: "Hair Stylist", location: "Abuja" },
  { src: "/images/avatars/segun.jpg", name: "Segun Adeyemi", role: "Mobile Phone Technician", location: "Ibadan" },
  { src: "/images/avatars/emeka.jpg", name: "Emeka Nwosu", role: "Electrician", location: "Port Harcourt" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}

function BriefcaseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  );
}

function SaveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  );
}

export function BenefitIdentity() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="benefit-identity" ref={sectionRef} className="relative overflow-hidden">
      <div className="relative benefit-gradient-1 py-28 sm:py-36 lg:py-44">
        <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0241A8]/[0.08] rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#3FA9F5]/[0.05] rounded-full blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-center">
            {/* Left: Mobile Card */}
            <motion.div style={{ y: parallaxY }} className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative mx-auto lg:mx-0">
                {/* Phone frame */}
                <div className="relative mx-auto w-[300px] sm:w-[320px]">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-[2.5rem] bg-[#1a1a2e] p-[8px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.5)] border border-white/[0.06]"
                  >
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a2e] rounded-b-xl z-10" />

                    {/* Screen */}
                    <div className="relative rounded-[2rem] overflow-hidden bg-white">
                      {/* Status bar */}
                      <div className="flex items-center justify-between px-6 pt-7 pb-2 bg-[#0241A8]">
                        <span className="text-[10px] font-semibold text-white/60">9:41</span>
                        <div className="flex items-center gap-1">
                          <div className="h-2.5 w-3.5 rounded-[2px] border border-white/40" />
                          <div className="h-2.5 w-2.5 rounded-[2px] border border-white/40" />
                        </div>
                      </div>

                      {/* Card header — brand blue */}
                      <div className="relative bg-[#0241A8] px-5 pb-6 pt-1">
                        {/* Brand mark + ID */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-1.5">
                            <div className="h-4 w-4 rounded-sm bg-white/10 flex items-center justify-center">
                              <svg viewBox="0 0 1254 1254" fill="none" className="h-3 w-3">
                                <path fill="#FDC304" d="M556.057129,742.076294 C501.786530,745.407104 459.961334,702.722351 464.173920,648.810547 C466.747742,615.871277 491.009644,586.103210 524.089355,575.297424 C554.953674,565.215271 590.627991,575.356140 612.173401,600.336243 C655.742371,650.850769 629.973145,727.492981 564.912292,740.842224 C562.145386,741.409973 559.309326,741.640442 556.057129,742.076294 Z" />
                              </svg>
                            </div>
                            <span className="text-[8px] font-bold tracking-[0.25em] text-white/40 uppercase">WorkTag</span>
                          </div>
                          <span className="text-[8px] font-medium text-white/25 tracking-wider">WT-8F2K-9X4M</span>
                        </div>

                        {/* Avatar — large, centered, with brand gradient ring */}
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[#FDC304] via-[#0241A8] to-[#FDC304] opacity-80" />
                            <div className="relative h-24 w-24 rounded-full overflow-hidden ring-[3px] ring-[#0241A8]">
                              <Image src="/images/avatars/funke.jpg" alt="Funke Ogunlesi" width={96} height={96} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center ring-[2.5px] ring-[#0241A8]">
                              <Check className="h-3 w-3 text-white stroke-[3]" />
                            </div>
                          </div>
                        </div>

                        {/* Name + Business + Location */}
                        <div className="text-center mb-1">
                          <h3 className="text-[17px] font-bold text-white leading-tight tracking-[-0.01em]">Funke Ogunlesi</h3>
                        </div>
                        <div className="text-center mb-0.5">
                          <p className="text-[12px] text-white/60 font-medium">Funke&apos;s Kitchen</p>
                        </div>
                        <div className="text-center mb-4">
                          <p className="text-[10px] text-white/35">Catering & Events · Lagos, Nigeria</p>
                        </div>

                        {/* Trust Score + Verified */}
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[20px] font-[800] text-[#FDC304] leading-none">97</span>
                            <span className="text-[7px] text-white/30 font-medium leading-tight">Trust<br/>Score</span>
                          </div>
                          <div className="w-px h-4 bg-white/15" />
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                            <span className="text-[9px] font-semibold text-[#10B981]">Verified</span>
                          </div>
                        </div>
                      </div>

                      {/* Card body — white */}
                      <div className="bg-white px-4 py-4">
                        {/* Action buttons */}
                        <div className="grid grid-cols-4 gap-1.5 mb-4">
                          <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-[#10B981]/[0.08] border border-[#10B981]/[0.12]">
                            <WhatsAppIcon className="h-4 w-4 text-[#10B981]" />
                            <span className="text-[7px] font-bold text-[#10B981]">WhatsApp</span>
                          </button>
                          <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-[#0241A8]/[0.06] border border-[#0241A8]/[0.1]">
                            <PhoneIcon className="h-4 w-4 text-[#0241A8]" />
                            <span className="text-[7px] font-bold text-[#0241A8]">Call</span>
                          </button>
                          <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-[#FDC304]/[0.08] border border-[#FDC304]/[0.12]">
                            <BriefcaseIcon className="h-4 w-4 text-[#B8960F]" />
                            <span className="text-[7px] font-bold text-[#B8960F]">Hire Me</span>
                          </button>
                          <button className="flex flex-col items-center gap-1 py-2.5 rounded-xl bg-[#5A6A8A]/[0.06] border border-[#5A6A8A]/[0.1]">
                            <SaveIcon className="h-4 w-4 text-[#5A6A8A]" />
                            <span className="text-[7px] font-bold text-[#5A6A8A]">Save</span>
                          </button>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 gap-2.5">
                          {/* Jobs Completed */}
                          <div className="rounded-xl bg-[#F8F9FC] border border-[#E8EBF2]/60 p-2.5">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[8px] font-semibold text-[#5A6A8A]/60 uppercase tracking-wider">Jobs Done</span>
                              <span className="text-[13px] font-[800] text-[#0241A8] leading-none">94%</span>
                            </div>
                            <div className="h-1 rounded-full bg-[#E8EBF2]/60 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-[#0241A8]"
                                initial={{ width: 0 }}
                                whileInView={{ width: "94%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.2 }}
                              />
                            </div>
                          </div>

                          {/* Repeat Customers */}
                          <div className="rounded-xl bg-[#F8F9FC] border border-[#E8EBF2]/60 p-2.5">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[8px] font-semibold text-[#5A6A8A]/60 uppercase tracking-wider">Repeat</span>
                              <span className="text-[13px] font-[800] text-[#10B981] leading-none">87%</span>
                            </div>
                            <div className="h-1 rounded-full bg-[#E8EBF2]/60 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-[#10B981]"
                                initial={{ width: 0 }}
                                whileInView={{ width: "87%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                              />
                            </div>
                          </div>

                          {/* Years Experience */}
                          <div className="rounded-xl bg-[#F8F9FC] border border-[#E8EBF2]/60 p-2.5">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[8px] font-semibold text-[#5A6A8A]/60 uppercase tracking-wider">Experience</span>
                              <span className="text-[13px] font-[800] text-[#090D1F] leading-none">4yr</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4].map((yr) => (
                                <div key={yr} className="h-1 flex-1 rounded-full bg-[#0241A8]" />
                              ))}
                              {[5, 6].map((yr) => (
                                <div key={yr} className="h-1 flex-1 rounded-full bg-[#E8EBF2]/60" />
                              ))}
                            </div>
                          </div>

                          {/* Avg Response Time */}
                          <div className="rounded-xl bg-[#F8F9FC] border border-[#E8EBF2]/60 p-2.5">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[8px] font-semibold text-[#5A6A8A]/60 uppercase tracking-wider">Response</span>
                              <span className="text-[13px] font-[800] text-[#FDC304] leading-none">&lt;1hr</span>
                            </div>
                            <div className="h-1 rounded-full bg-[#E8EBF2]/60 overflow-hidden">
                              <motion.div
                                className="h-full rounded-full bg-[#FDC304]"
                                initial={{ width: 0 }}
                                whileInView={{ width: "92%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: 0.5 }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom bar */}
                      <div className="bg-white border-t border-[#E8EBF2]/60 px-5 py-2.5 flex items-center justify-between">
                        <span className="text-[8px] font-medium text-[#5A6A8A]/40">Member since 2022</span>
                        <span className="text-[8px] font-medium text-[#0241A8]/40">worktag.io/funke</span>
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-1 rounded-full bg-white/20" />
                  </motion.div>
                </div>

                {/* Floating acrylic tag */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="absolute -bottom-4 -right-6 w-40 h-24 rounded-xl overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.5)] hidden lg:block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0241A8] via-[#012d7a] to-[#011d52]" />
                  <div className="relative p-3 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden ring-1 ring-white/10">
                          <Image src="/images/avatars/funke.jpg" alt="Funke" width={24} height={24} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-[7px] font-bold text-white leading-tight">Funke Ogunlesi</div>
                          <div className="text-[5px] text-white/40">Funke&apos;s Kitchen</div>
                        </div>
                      </div>
                      <div className="h-6 w-6 rounded bg-white/5 flex items-center justify-center">
                        <div className="h-4 w-4 bg-white rounded-sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[5px] text-[#FDC304]/50 font-medium">WT-8F2K-9X4M</div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                        <span className="text-[5px] text-white/30 font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="space-y-7 max-w-lg">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#3FA9F5] uppercase">
                    Digital Identity
                  </span>
                  <h2 className="mt-4 text-[clamp(2rem,3.5vw,3.2rem)] font-[900] leading-[1.08] tracking-[-0.03em] text-white">
                    A digital identity
                    <br />
                    <span className="bg-gradient-to-r from-[#3FA9F5] to-[#06B6D4] bg-clip-text text-transparent">
                      that never expires.
                    </span>
                  </h2>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-[15px] leading-[1.75] text-[#8896B3]"
                >
                  Your WorkTag profile is your permanent digital home. It travels with your business across every platform, every conversation, every referral. No more relying on word-of-mouth alone.
                </motion.p>

                {/* How it works steps */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-3"
                >
                  {[
                    { step: "01", title: "Scan", desc: "Any phone camera scans your QR code instantly" },
                    { step: "02", title: "Trust", desc: "Your verified profile builds instant credibility" },
                    { step: "03", title: "Connect", desc: "Clients contact you directly — WhatsApp, call, or hire" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3">
                      <span className="text-[10px] font-bold text-[#FDC304]/60 mt-0.5 shrink-0">{item.step}</span>
                      <div>
                        <div className="text-[12px] font-bold text-white/80">{item.title}</div>
                        <div className="text-[11px] text-white/35 leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Trust strip with real avatars */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="pt-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {TEAM_AVATARS.map((avatar, i) => (
                      <motion.div
                        key={avatar.name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.35 + i * 0.07 }}
                        className="rounded-2xl bg-white border border-[#E8EBF2]/80 px-4 py-3 shadow-[0_4px_24px_-4px_rgba(2,65,168,0.08)]"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0">
                            <Image src={avatar.src} alt={avatar.name} width={36} height={36} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-[12px] font-bold text-[#090D1F]">{avatar.name}</div>
                            <div className="text-[10px] text-[#5A6A8A] font-medium">{avatar.role} · {avatar.location}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex -space-x-2">
                      {[
                        { src: "/images/avatars/emeka.jpg", name: "Emeka" },
                        { src: "/images/avatars/ngozi.jpg", name: "Ngozi" },
                        { src: "/images/avatars/tunde.jpg", name: "Tunde" },
                        { src: "/images/avatars/mrsadebayo.jpg", name: "Mrs Adebayo" },
                      ].map((avatar, i) => (
                        <div key={i} className="h-7 w-7 rounded-full overflow-hidden shrink-0">
                          <Image src={avatar.src} alt={avatar.name} width={28} height={28} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[12px] text-white/50 font-medium">
                      <span className="text-white font-bold">10,000+</span> professionals trust WorkTag
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
