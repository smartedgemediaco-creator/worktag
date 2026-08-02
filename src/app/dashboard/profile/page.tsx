"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Store,
  Globe,
  MapPin,
  Image as ImageIcon,
  Save,
  CheckCircle2,
  Palette,
  UserRound,
  Loader2,
  Copy,
} from "lucide-react";
import { BUSINESS_CATEGORIES } from "@/constants";
import { cn } from "@/lib/utils";

type ProfileData = {
  businessName?: string;
  username?: string;
  category?: string;
  description?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  logoUrl?: string;
  coverUrl?: string;
  theme?: string;
  isPublished?: boolean;
  location?: {
    address?: string;
    city?: string;
    state?: string;
    country?: string;
  };
};

const fieldBase =
  "h-10 w-full rounded-xl border border-[#E8EBF2] bg-white px-3.5 text-sm text-[#090D1F] transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#0241A8]/40 focus:outline-none focus:ring-4 focus:ring-[#0241A8]/10";

const textareaBase =
  "w-full min-h-[110px] rounded-xl border border-[#E8EBF2] bg-white p-3.5 text-sm text-[#090D1F] transition-all duration-300 placeholder:text-[#94A3B8] focus:border-[#0241A8]/40 focus:outline-none focus:ring-4 focus:ring-[#0241A8]/10 resize-none";

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-[#E8EBF2] bg-white p-6 shadow-[0_12px_40px_-16px_rgba(2,65,168,0.12)] lg:p-7"
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0241A8]/[0.07] text-[#0241A8]">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div>
          <h3 className="text-[15px] font-bold text-[#090D1F]">{title}</h3>
          <p className="text-[11px] text-[#64748B]">{subtitle}</p>
        </div>
      </div>
      {children}
    </motion.section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
        {label}
      </Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={fieldBase} />
    </div>
  );
}

export default function ProfileEditorPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [username, setUsername] = useState("");
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    description: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
    logoUrl: "",
    coverUrl: "",
    theme: "light",
    isPublished: false,
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    fetch("/api/v1/profiles")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const p = data.data as ProfileData;
          setUsername(p.username ?? "");
          setForm({
            businessName: p.businessName ?? "",
            category: p.category ?? "",
            description: p.description ?? "",
            phone: p.phone ?? "",
            whatsapp: p.whatsapp ?? "",
            email: p.email ?? "",
            website: p.website ?? "",
            logoUrl: p.logoUrl ?? "",
            coverUrl: p.coverUrl ?? "",
            theme: p.theme ?? "light",
            isPublished: p.isPublished ?? false,
            address: p.location?.address ?? "",
            city: p.location?.city ?? "",
            state: p.location?.state ?? "",
            country: p.location?.country ?? "",
          });
        }
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  const set = (key: keyof typeof form) => (value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/v1/profiles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName,
          category: form.category,
          description: form.description,
          phone: form.phone,
          whatsapp: form.whatsapp,
          email: form.email,
          website: form.website,
          logoUrl: form.logoUrl || null,
          coverUrl: form.coverUrl || null,
          theme: form.theme,
          isPublished: form.isPublished,
          location: {
            address: form.address,
            city: form.city,
            state: form.state,
            country: form.country,
          },
        }),
      });

      if (res.ok) {
        toast.success(form.isPublished ? "Profile published — you're live!" : "Profile saved");
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  }

  async function copyLink() {
    if (!username) return;
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${username}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Couldn't copy link");
    }
  }

  return (
    <div className="space-y-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-[#090D1F] lg:text-3xl">
          Your <span className="text-gradient-blue">public profile</span>
        </h2>
        <p className="mt-1 text-sm text-[#64748B]">
          Everything here is what customers see when they scan your WorkTag.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-[#0241A8]" />
        </div>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <SectionCard icon={Store} title="Business Basics" subtitle="Who you are and what you do" delay={0.06}>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Business name *
                    </Label>
                    <Input
                      value={form.businessName}
                      onChange={(e) => set("businessName")(e.target.value)}
                      placeholder="e.g. Funke's Catering"
                      className={fieldBase}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Category *
                    </Label>
                    <select value={form.category} onChange={(e) => set("category")(e.target.value)} className={fieldBase}>
                      <option value="">Select a category</option>
                      {BUSINESS_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Description
                    </Label>
                    <textarea
                      value={form.description}
                      onChange={(e) => set("description")(e.target.value)}
                      placeholder="Tell customers what makes you trusted..."
                      className={textareaBase}
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon={UserRound} title="Contact & Reach" subtitle="How customers get in touch" delay={0.1}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" value={form.phone} onChange={set("phone")} placeholder="+234 800 000 0000" />
                  <Field label="WhatsApp" value={form.whatsapp} onChange={set("whatsapp")} placeholder="+234 800 000 0000" />
                  <Field label="Email" value={form.email} onChange={set("email")} type="email" placeholder="you@business.com" />
                  <Field label="Website" value={form.website} onChange={set("website")} placeholder="https://..." />
                </div>
              </SectionCard>

              <SectionCard icon={MapPin} title="Location" subtitle="Where customers can find you" delay={0.14}>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Street address
                    </Label>
                    <Input
                      value={form.address}
                      onChange={(e) => set("address")(e.target.value)}
                      placeholder="12 Adeola Odeku Street"
                      className={fieldBase}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field label="City" value={form.city} onChange={set("city")} placeholder="Lagos" />
                    <Field label="State" value={form.state} onChange={set("state")} placeholder="Lagos" />
                    <Field label="Country" value={form.country} onChange={set("country")} placeholder="Nigeria" />
                  </div>
                </div>
              </SectionCard>
            </div>

            <div className="space-y-6">
              <SectionCard icon={ImageIcon} title="Branding" subtitle="Your logo and cover visuals" delay={0.12}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Logo URL
                    </Label>
                    <Input
                      value={form.logoUrl}
                      onChange={(e) => set("logoUrl")(e.target.value)}
                      placeholder="https://.../logo.png"
                      className={fieldBase}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Cover URL
                    </Label>
                    <Input
                      value={form.coverUrl}
                      onChange={(e) => set("coverUrl")(e.target.value)}
                      placeholder="https://.../cover.jpg"
                      className={fieldBase}
                    />
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon={Palette} title="Appearance" subtitle="Style your public page" delay={0.16}>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      Theme
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: "light", label: "Light", emoji: "☀️" },
                        { value: "dark", label: "Dark", emoji: "🌙" },
                      ].map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => set("theme")(t.value)}
                          className={cn(
                            "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300",
                            form.theme === t.value
                              ? "border-[#0241A8]/40 bg-[#0241A8]/[0.06] text-[#0241A8] shadow-[0_8px_24px_-12px_rgba(2,65,168,0.4)]"
                              : "border-[#E8EBF2] bg-white text-[#64748B] hover:border-[#0241A8]/20"
                          )}
                        >
                          <span>{t.emoji}</span> {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E8EBF2] bg-[#F8FAFD] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[13px] font-bold text-[#090D1F]">Publish profile</p>
                        <p className="mt-0.5 text-[11px] text-[#64748B]">
                          Make your WorkTag link live for customers
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={form.isPublished}
                        onClick={() => set("isPublished")(!form.isPublished)}
                        className={cn(
                          "relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300",
                          form.isPublished ? "bg-[#0241A8]" : "bg-[#CBD5E1]"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-all duration-300",
                            form.isPublished ? "left-[22px]" : "left-0.5"
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </SectionCard>

              <SectionCard icon={Globe} title="Your WorkTag link" subtitle="Share this anywhere" delay={0.2}>
                <div className="flex items-center gap-2 rounded-xl border border-[#E8EBF2] bg-[#F8FAFD] p-2 pl-4">
                  <span className="min-w-0 flex-1 truncate font-mono text-[13px] font-semibold text-[#0241A8]">
                    {username ? `${window.location.origin}/${username}` : "Set your business name to create a link"}
                  </span>
                  {username && (
                    <button
                      type="button"
                      onClick={copyLink}
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#0241A8] px-3.5 text-[12px] font-bold text-white transition-all duration-300 hover:bg-[#0B2E7A]"
                    >
                      {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              </SectionCard>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="fixed inset-x-5 bottom-5 z-20 lg:left-[284px] lg:right-10"
          >
            <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 rounded-2xl border border-[#E8EBF2] bg-white/90 px-5 py-3.5 shadow-[0_20px_60px_-20px_rgba(2,65,168,0.35)] backdrop-blur-xl">
              <div className="hidden items-center gap-2 text-[12px] font-medium text-[#64748B] sm:flex">
                {form.isPublished ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10B981]/10 px-2.5 py-1 text-[11px] font-bold text-[#10B981]">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#94A3B8]/10 px-2.5 py-1 text-[11px] font-bold text-[#64748B]">
                    Draft
                  </span>
                )}
                Changes apply instantly to your public page.
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || loading}
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-[#0241A8] to-[#3FA9F5] px-6 text-sm font-bold text-white shadow-[0_12px_32px_-8px_rgba(2,65,168,0.55)] transition-all duration-300 hover:-translate-y-[1px] disabled:pointer-events-none disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
