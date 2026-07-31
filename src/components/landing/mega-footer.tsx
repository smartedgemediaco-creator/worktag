import Link from "next/link";
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

function SocialIcon({ name, className }: { name: string; className?: string }) {
  if (name === "X") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (name === "WA") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {name === "IG" && (
        <>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </>
      )}
      {name === "LI" && (
        <>
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A6 6 0 0 1 16 8z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </>
      )}
      {name === "FB" && (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      )}
      {name === "YT" && (
        <>
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" />
        </>
      )}
    </svg>
  );
}

const FOOTER_LINKS = {
  Platform: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#benefit-identity" },
    { label: "Pricing", href: "#pricing" },
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
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#0241A8]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#FDC304]/[0.04] rounded-full blur-[120px]" />
      </div>

      {/* Main footer content */}
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-16 sm:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <WorkTagMark className="h-8 w-8 transition-transform duration-500 group-hover:rotate-12" />
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-white tracking-tight group-hover:text-[#3FA9F5] transition-colors">
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
                <span>hello@worktag.com</span>
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
              {[
                { name: "X", hover: "hover:text-white hover:bg-white/10 hover:border-white/30" },
                { name: "IG", hover: "hover:text-[#E1306C] hover:bg-[#E1306C]/15 hover:border-[#E1306C]/40" },
                { name: "LI", hover: "hover:text-[#0A66C2] hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40" },
                { name: "FB", hover: "hover:text-[#1877F2] hover:bg-[#1877F2]/15 hover:border-[#1877F2]/40" },
                { name: "YT", hover: "hover:text-[#FF0000] hover:bg-[#FF0000]/15 hover:border-[#FF0000]/40" },
                { name: "WA", hover: "hover:text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/40" },
              ].map((social) => (
                <Link
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className={`h-8 w-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/30 transition-all duration-300 ${social.hover}`}
                >
                  <SocialIcon name={social.name} className="h-3.5 w-3.5" />
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
                      className="text-xs text-white/30 transition-colors duration-300 hover:text-[#3FA9F5] inline-flex items-center gap-1 group"
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
              <Link href="/privacy" className="text-[11px] text-white/20 hover:text-[#3FA9F5] transition-colors font-medium">
                Privacy
              </Link>
              <Link href="/terms" className="text-[11px] text-white/20 hover:text-[#3FA9F5] transition-colors font-medium">
                Terms
              </Link>
              <Link href="/cookies" className="text-[11px] text-white/20 hover:text-[#3FA9F5] transition-colors font-medium">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
