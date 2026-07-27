"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Check, Link2, Smartphone, Mail } from "lucide-react";

const TEAM_AVATARS = [
  { src: "/images/avatars/chinedu.jpg", name: "Chinedu Okafor", role: "Gas Supplier", location: "Lagos" },
  { src: "/images/avatars/aisha.jpg", name: "Aisha Bello", role: "Hair Stylist", location: "Abuja" },
  { src: "/images/avatars/segun.jpg", name: "Segun Adeyemi", role: "Mobile Phone Technician", location: "Ibadan" },
  { src: "/images/avatars/emeka.jpg", name: "Emeka Nwosu", role: "Electrician", location: "Port Harcourt" },
];

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
            {/* Left: Profile composition */}
            <motion.div style={{ y: parallaxY }} className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative max-w-md mx-auto lg:mx-0">
                {/* The Official WorkTag Card — Premium */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl overflow-hidden shadow-[0_24px_80px_-12px_rgba(2,65,168,0.2)] border border-white/[0.08]"
                >
                  {/* Card background — subtle gradient, not flat */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0241A8] via-[#012d7a] to-[#011d52]" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvc3ZnPg==')] opacity-60" />

                  {/* Card content */}
                  <div className="relative p-7 pb-6">
                    {/* Top row: brand mark + ID */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-1.5">
                        <div className="h-4 w-4 rounded-sm bg-white/10 flex items-center justify-center">
                          <svg viewBox="0 0 1254 1254" fill="none" className="h-3 w-3">
                            <path fill="#FDC304" d="M556.057129,742.076294 C501.786530,745.407104 459.961334,702.722351 464.173920,648.810547 C466.747742,615.871277 491.009644,586.103210 524.089355,575.297424 C554.953674,565.215271 590.627991,575.356140 612.173401,600.336243 C655.742371,650.850769 629.973145,727.492981 564.912292,740.842224 C562.145386,741.409973 559.309326,741.640442 556.057129,742.076294 Z" />
                          </svg>
                        </div>
                        <span className="text-[8px] font-bold tracking-[0.25em] text-white/30 uppercase">WorkTag</span>
                      </div>
                      <span className="text-[9px] font-medium text-white/25 tracking-[0.08em]">WT-8F2K-9X4M</span>
                    </div>

                    {/* Photo + Info row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative shrink-0">
                        <div className="h-14 w-14 rounded-full overflow-hidden ring-2 ring-white/10">
                          <Image src="/images/avatars/funke.jpg" alt="Funke Ogunlesi" width={56} height={56} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#10B981] flex items-center justify-center ring-[2px] ring-[#0241A8]">
                          <Check className="h-2 w-2 text-white stroke-[3]" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-bold text-white leading-tight tracking-[-0.01em]">Funke Ogunlesi</h3>
                        <p className="text-[11px] text-white/50 mt-0.5">Funke&apos;s Kitchen</p>
                        <p className="text-[10px] text-white/30 mt-0.5">Catering & Events · Lagos</p>
                      </div>
                    </div>

                    {/* Trust — understated, integrated */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <div className="text-[18px] font-[800] text-white leading-none">97</div>
                        <div className="text-[8px] text-white/30 font-medium leading-tight">Trust<br/>Score</div>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        <span className="text-[10px] font-semibold text-[#10B981]">Verified</span>
                      </div>
                      <div className="w-px h-6 bg-white/10" />
                      <div className="text-[10px] text-white/30 font-medium">Since 2022</div>
                    </div>

                    {/* QR code — refined, integrated */}
                    <div className="flex justify-center mb-5">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-lg bg-white p-1.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)]">
                          <Image src="/images/qr-worktag.webp" alt="Scan to verify" width={96} height={96} className="w-full h-full object-contain" />
                        </div>
                        {/* Corner accents */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#FDC304]/40 rounded-tl-sm" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#FDC304]/40 rounded-tr-sm" />
                        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#FDC304]/40 rounded-bl-sm" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#FDC304]/40 rounded-br-sm" />
                      </div>
                    </div>

                    {/* URL */}
                    <div className="text-center">
                      <span className="text-[10px] font-medium text-white/25 tracking-wide">worktag.io/funke</span>
                    </div>
                  </div>

                  {/* Subtle bottom accent line */}
                  <div className="h-[2px] bg-gradient-to-r from-transparent via-[#FDC304]/30 to-transparent" />
                </motion.div>

                {/* Floating acrylic tag — premium */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: -3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: -3 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="absolute -bottom-5 -right-5 w-48 h-28 rounded-xl overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] hidden sm:block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0241A8] via-[#012d7a] to-[#011d52]" />
                  <div className="relative p-3 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full overflow-hidden ring-1 ring-white/10">
                          <Image src="/images/avatars/funke.jpg" alt="Funke" width={28} height={28} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-[8px] font-bold text-white leading-tight">Funke Ogunlesi</div>
                          <div className="text-[6px] text-white/40">Funke&apos;s Kitchen</div>
                        </div>
                      </div>
                      <div className="h-7 w-7 rounded bg-white/5 flex items-center justify-center">
                        <div className="h-5 w-5 bg-white rounded-sm" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[6px] text-[#FDC304]/60 font-medium">WT-8F2K-9X4M</div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                        <span className="text-[6px] text-white/30 font-medium">Verified</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating PVC card — premium */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotate: 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="absolute -top-4 -right-4 w-44 h-26 rounded-xl overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.5)] hidden sm:block"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#F8F9FC]" />
                  <div className="relative p-3 h-full flex flex-col justify-between border border-[#E8EBF2]/60 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full overflow-hidden ring-1 ring-[#0241A8]/10">
                        <Image src="/images/avatars/funke.jpg" alt="Funke" width={28} height={28} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-[8px] font-bold text-[#090D1F] leading-tight">Funke Ogunlesi</div>
                        <div className="text-[6px] text-[#5A6A8A]">Catering & Events</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[6px] font-medium text-[#0241A8]/50">WT-8F2K-9X4M</div>
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                        <span className="text-[6px] font-medium text-[#10B981]/70">Verified</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
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

                {/* Share methods */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="grid grid-cols-2 gap-2.5"
                >
                  {[
                    { icon: Link2, label: "Unique URL", desc: "worktag.io/funke" },
                    { icon: Smartphone, label: "QR Scan", desc: "Any camera works" },
                    { icon: (props: React.SVGProps<SVGSVGElement>) => (
                      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    ), label: "WhatsApp", desc: "Share directly" },
                    { icon: Mail, label: "Email Signature", desc: "Embed in emails" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.06] px-3.5 py-3">
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0241A8]/[0.1]">
                        <item.icon className="h-3.5 w-3.5 text-[#3FA9F5]" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-white/80">{item.label}</div>
                        <div className="text-[10px] text-white/30 truncate">{item.desc}</div>
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
