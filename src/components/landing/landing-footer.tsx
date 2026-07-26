import Link from "next/link";
import { WorkTagMark } from "./worktag-logo";

const FOOTER_LINKS = {
  Product: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  Connect: [
    { label: "Support", href: "/support" },
    { label: "Contact", href: "/contact" },
  ],
};

export function LandingFooter() {
  return (
    <footer className="relative bg-white border-t border-[#E8EBF2]/40 overflow-hidden">
      <div className="gradient-mesh absolute inset-0 pointer-events-none opacity-40" />
      <div className="dot-grid absolute inset-0 pointer-events-none opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <WorkTagMark className="h-6.5 w-6.5 transition-transform duration-500 group-hover:rotate-12" />
              <span className="text-[15px] font-bold text-[#090D1F] tracking-tight group-hover:text-[#6366F1] transition-colors">WorkTag</span>
            </Link>
            <p className="text-xs text-[#5C6479] leading-relaxed max-w-xs">
              Digital trust infrastructure for every professional. Empowering local businesses with verified digital identities globally.
            </p>
            <p className="text-[10px] font-semibold text-[#6366F1]/70 uppercase tracking-widest">
              By Àfárà Digital
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[10px] font-bold tracking-[0.2em] text-[#5C6479]/40 uppercase mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-[#5C6479]/80 transition-colors duration-250 hover:text-[#6366F1] hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-[#E8EBF2]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5C6479]/50">
          <span>&copy; {new Date().getFullYear()} Àfárà Digital Solutions. All rights reserved.</span>
          <div className="flex items-center gap-5 font-medium">
            <Link href="/privacy" className="hover:text-[#6366F1] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#6366F1] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
