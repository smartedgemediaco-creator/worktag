"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, ShieldCheck, QrCode, Tags, UserRound, TrendingUp, Globe } from "lucide-react";
import { WorkTagMark } from "./worktag-logo";

const FAQS = [
  {
    category: "Getting Started",
    icon: UserRound,
    question: "What is WorkTag?",
    answer:
      "WorkTag is a digital trust platform that gives you a permanent, verified digital identity — effectively your own professional website for your business, without needing to know anything about websites. It shows what you do, every job you've completed, photos of your work, and reviews from your real customers. People scan your unique QR code and land directly on your profile, where they see your work, your history, and how to reach you.",
  },
  {
    category: "Getting Started",
    icon: UserRound,
    question: "Who needs a WorkTag?",
    answer:
      "Literally everyone who works. Business owners, freelancers, employees, apprentices, domestic workers, students, drivers, and tradespeople. Whether you run a shop or work for someone else, WorkTag proves who you are, what you've done, and what employers and customers say about you — wherever life takes you.",
  },
  {
    category: "Your Website",
    icon: Globe,
    question: "Do I really get my own website?",
    answer:
      "Yes — your WorkTag profile is your professional website. It lives at your own link, carries your business name, services, pricing, location, and portfolio of completed jobs, and stays up to date automatically from your dashboard. You get all the credibility of a website with none of the design or hosting work.",
  },
  {
    category: "Your Website",
    icon: Globe,
    question: "Can my customers leave reviews?",
    answer:
      "Yes — and this is what makes customers choose you. After a job, happy customers leave reviews right on your website. New customers who scan your QR see your rating and your history before they even contact you, so your good work keeps winning you customers around the clock.",
  },
  {
    category: "Your Website",
    icon: Globe,
    question: "Can people see all the jobs I've done?",
    answer:
      "Absolutely. Your WorkTag keeps a running record of every job you complete — a portfolio that grows with you. Customers, employers, and partners can see exactly what you've done and how well you did it, which is proof no competitor can copy.",
  },
  {
    category: "Grow Your Business",
    icon: TrendingUp,
    question: "Can customers order from my QR code?",
    answer:
      "Yes. Your profile showcases your products, goods, and services online — prices, photos, and all — so customers can browse everything you offer. When they're ready, they reach you in one tap from the same page to place their order, by call or WhatsApp. Your shop window is open around the clock, and every customer that scans your QR becomes an order waiting to happen.",
  },
  {
    category: "Grow Your Business",
    icon: TrendingUp,
    question: "How does WorkTag grow my business?",
    answer:
      "Your business stops being limited to your street. Your website is out there every minute, your reviews build trust before you meet the customer, and your QR puts your work in front of people who would never have walked past your shop. More visibility means more customers and more orders.",
  },
  {
    category: "Technology",
    icon: QrCode,
    question: "How does the QR code work, and do customers need an app?",
    answer:
      "Your WorkTag profile generates a unique QR code that acts as your link everywhere — on tags, cards, stickers, vans, and storefronts. Any smartphone camera that scans it opens your website instantly, with no app installation and no sign-up. If a customer can take a photo, they can use your WorkTag.",
  },
  {
    category: "Trust & Security",
    icon: ShieldCheck,
    question: "Can WorkTag help me get a job or a visa?",
    answer:
      "Yes — and this is where WorkTag goes beyond a business card. When you apply for a new job or a visa, you need proof of your history: where you worked, how long, what you did, and how people rate you. WorkTag keeps that verified record for life, so you can share a tamper-proof account of your work that schools, employers, and embassies can trust.",
  },
  {
    category: "Trust & Security",
    icon: ShieldCheck,
    question: "Is my information secure?",
    answer:
      "Completely. WorkTag encrypts all data and only shows what you choose to make public. Your contact details stay protected until you decide to share them, so you market yourself with full control.",
  },
  {
    category: "Trust & Security",
    icon: ShieldCheck,
    question: "Can I update my profile after creation?",
    answer:
      "Anytime, for life. Add jobs, projects, certificates, and reviews as you grow, and update services, prices, photos, and promotions from your dashboard — changes reflect instantly on every scan. Your record stays current so it keeps working for you, whether you're winning customers or proving your history for the next opportunity.",
  },
  {
    category: "Physical Tags",
    icon: Tags,
    question: "How do I get a physical tag?",
    answer:
      "Order during signup or anytime from your dashboard. Choose from acrylic, PVC, business cards, stickers, or vehicle decals — delivered to your address with adhesive backing. Every tag carries your QR, so your work and reputation are visible everywhere you go: on your counter, your tools, or your vehicle.",
  },
];

function FAQItem({ question, answer, category, icon: Icon }: { question: string; answer: string; category: string; icon: typeof UserRound }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E8EBF2]/40 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-5 text-left group"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3 pr-3">
          <span className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300 ${
            open ? "bg-[#0241A8] text-white" : "bg-[#EEF3FC] text-[#0241A8] group-hover:bg-[#0241A8]/10"
          }`}>
            <Icon className="h-4 w-4" />
          </span>
          <div>
            <span className={`text-[9px] font-bold uppercase tracking-[0.14em] ${open ? "text-[#C79A00]" : "text-[#5A6A8A]/50"}`}>
              {category}
            </span>
            <span className={`block mt-0.5 text-[15px] font-semibold transition-colors duration-300 ${open ? "text-[#090D1F]" : "text-[#090D1F] group-hover:text-[#0241A8]"}`}>
              {question}
            </span>
          </div>
        </div>
        <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          open ? "bg-[#FDC304] text-[#090D1F] rotate-0" : "bg-[#F4F6FA] text-[#475569]/40 group-hover:bg-[#FDC304]/20 group-hover:text-[#B8860B]"
        }`}>
          {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-11 text-sm leading-relaxed text-[#475569]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="relative bg-[#F8FAFC]/40 py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3FA9F5]/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#0241A8] uppercase">
              FAQ
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-[#090D1F]">
              Questions?
              <br />
              <span className="bg-gradient-to-r from-[#0241A8] to-[#3FA9F5] bg-clip-text text-transparent">Answered.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#475569] max-w-sm">
              Your business website, your reviews, your orders — all from one QR code. Plain answers, no technical talk. Can&apos;t find your answer? Our team responds fast.
            </p>

            {/* Support card */}
            <div className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0241A8] via-[#012d7a] to-[#011d52] p-6 text-white shadow-[0_24px_60px_-24px_rgba(2,65,168,0.7)]">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[#3FA9F5]/20 blur-[50px]" />
              <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#FDC304]/15 blur-[50px]" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <WorkTagMark className="h-6 w-6" />
                  <span className="text-xs font-bold tracking-[0.14em] text-[#FDC304]/90 uppercase">Support</span>
                </div>
                <p className="text-sm font-bold mb-1">Still have questions?</p>
                <p className="text-[11px] text-white/70 mb-5">Our team is here to help you get started.</p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#FDC304] px-4 py-2.5 text-xs font-bold text-[#090D1F] shadow-[0_8px_20px_-8px_rgba(253,195,4,0.7)] transition-all duration-300 hover:bg-[#FDE047] hover:-translate-y-0.5"
                >
                  Contact Support
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8">
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="rounded-3xl bg-white border border-[#E8EBF2]/40 p-6 sm:p-8 shadow-card"
            >
              {FAQS.map((faq) => (
                <FAQItem key={faq.question} {...faq} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
