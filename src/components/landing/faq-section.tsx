"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "What is WorkTag?",
    answer:
      "WorkTag is a digital trust platform that gives every professional a permanent, verified digital identity. Your customers scan your unique QR code to instantly view your verified profile, services, reviews, and contact information.",
  },
  {
    question: "How does the QR code work?",
    answer:
      "Every WorkTag profile generates a unique QR code linked permanently to your business. When someone scans the code with any smartphone camera, they are taken directly to your public profile. No app installation is required.",
  },
  {
    question: "Who needs a WorkTag?",
    answer:
      "Any business or professional who wants to build trust with customers before they make contact. Electricians, plumbers, caterers, fashion designers, real estate agents, mechanics, and thousands of other professionals use WorkTag to prove their identity and credibility.",
  },
  {
    question: "Is my information secure?",
    answer:
      "Yes. WorkTag uses end-to-end encryption for all data. Your personal information is never exposed without your consent. Only the information you choose to make public appears on your profile. We take security and privacy seriously.",
  },
  {
    question: "How do I get a physical tag?",
    answer:
      "When you create your WorkTag profile, you can order premium physical tags in various sizes and materials. Tags are delivered to your address and come with adhesive backing for easy placement on counters, walls, vehicles, and equipment.",
  },
  {
    question: "Can I update my profile after creation?",
    answer:
      "Yes. You can update your profile at any time from your dashboard. Services, contact details, photos, and business information can be changed whenever needed. Changes reflect instantly across all scans.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#E8EBF2]/40 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-6 text-left group"
      >
        <span className={`text-base font-semibold transition-colors duration-300 ${open ? "text-[#6366F1]" : "text-[#090D1F] group-hover:text-[#6366F1]"}`}>
          {question}
        </span>
        <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
          open ? "bg-[#6366F1] text-white rotate-0" : "bg-[#F4F6FA] text-[#475569]/40 group-hover:bg-[#6366F1]/10 group-hover:text-[#6366F1]"
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
            <p className="pb-6 text-sm leading-relaxed text-[#475569]">{answer}</p>
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6366F1]/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#6366F1] uppercase">
              FAQ
            </span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-[900] leading-[1.05] tracking-[-0.03em] text-[#090D1F]">
              Questions?
              <br />
              Answered.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[#475569] max-w-sm">
              Everything you need to know about WorkTag. Can&apos;t find what you&apos;re looking for? Contact our support team.
            </p>
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#0241A8] to-[#6366F1] p-6 text-white">
              <p className="text-xs font-bold mb-1">Still have questions?</p>
              <p className="text-[11px] text-white/70 mb-4">Our team is here to help you get started.</p>
              <a href="/contact" className="inline-flex items-center gap-2 text-xs font-bold text-white/90 hover:text-white transition-colors">
                Contact Support →
              </a>
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
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
