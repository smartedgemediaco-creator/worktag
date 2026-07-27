import Link from "next/link";
import Image from "next/image";
import { WorkTagMark } from "./worktag-logo";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

function NigeriaFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="20" height="40" fill="#008751" rx="2" />
      <rect x="20" y="0" width="20" height="40" fill="#FFFFFF" rx="0" />
      <rect x="40" y="0" width="20" height="40" fill="#008751" rx="2" />
    </svg>
  );
}

const FOOTER_LINKS = {
  Platform: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#benefit-identity" },
    { label: "QR Products", href: "#benefit-qr" },
    { label: "Trust Engine", href: "#benefit-trust" },
    { label: "Reviews", href: "#benefit-reviews" },
    { label: "Verification", href: "#benefit-verification" },
  ],
  Products: [
    { label: "Acrylic Tags", href: "#benefit-qr" },
    { label: "PVC Cards", href: "#benefit-qr" },
    { label: "Business Cards", href: "#benefit-qr" },
    { label: "Stickers", href: "#benefit-qr" },
    { label: "Vehicle Decals", href: "#benefit-qr" },
    { label: "Custom Formats", href: "#benefit-qr" },
  ],
  Company: [
    { label: "About Afara Digital", href: "/about" },
    { label: "Success Stories", href: "#testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press" },
  ],
  Support: [
    { label: "Help Center", href: "/support" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "API Documentation", href: "/docs" },
  ],
};

const LOCATIONS = [
  "Ibadan, Nigeria",
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Port Harcourt, Nigeria",
  "Kano, Nigeria",
];

export function MegaFooter() {
  return (
    <footer className="relative bg-[#050816] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 cyber-grid opacity-5" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/3 rounded-full blur-[120px]" />
      </div>

      {/* Main footer content */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <WorkTagMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-12" />
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-white tracking-tight group-hover:text-[#818CF8] transition-colors">
                  WorkTag
                </span>
                <span className="text-[7px] font-bold tracking-[0.2em] text-[#FDC304]/40 uppercase">
                  by Afara Digital
                </span>
              </div>
            </Link>
            <p className="text-xs text-white/30 leading-relaxed max-w-xs">
              Digital trust infrastructure for every professional. Empowering local businesses with verified digital identities across Nigeria and beyond.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-xs text-white/30">
                <Mail className="h-3.5 w-3.5 text-[#FDC304]/30" />
                <span>hello@worktag.io</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/30">
                <Phone className="h-3.5 w-3.5 text-[#FDC304]/30" />
                <span>+234 (0) 800 WORKTAG</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-white/30">
                <MapPin className="h-3.5 w-3.5 text-[#FDC304]/30" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 pt-2">
              {["X", "IG", "LI", "FB", "YT"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-[10px] font-bold text-white/30 hover:text-[#818CF8] hover:bg-[#6366F1]/10 hover:border-[#6366F1]/20 transition-all duration-300"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-white/20 uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-white/30 transition-colors duration-300 hover:text-[#818CF8] inline-flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="h-2.5 w-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Locations bar */}
      <div className="relative border-t border-white/[0.04]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            <span className="text-[10px] font-bold tracking-[0.15em] text-white/15 uppercase">Serving</span>
            {LOCATIONS.map((loc) => (
              <span key={loc} className="text-[11px] text-white/20 font-medium">{loc}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/[0.04]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 text-[11px] text-white/20">
              <span>&copy; {new Date().getFullYear()} Afara Digital Solutions. All rights reserved.</span>
              <span className="text-white/10">·</span>
              <span className="inline-flex items-center gap-1.5">
                Made with love in <NigeriaFlag className="h-3 w-auto rounded-[1px]" /> Nigeria
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="text-[11px] text-white/20 hover:text-[#818CF8] transition-colors font-medium">
                Privacy
              </Link>
              <Link href="/terms" className="text-[11px] text-white/20 hover:text-[#818CF8] transition-colors font-medium">
                Terms
              </Link>
              <Link href="/cookies" className="text-[11px] text-white/20 hover:text-[#818CF8] transition-colors font-medium">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
