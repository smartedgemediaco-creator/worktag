import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProfileByUsername } from "@/server/services/profile-service";
import { WorkTagMark } from "@/components/landing/worktag-logo";
import { PublicProfileActions } from "@/components/profile/public-profile-actions";
import {
  BadgeCheck,
  MapPin,
  MessageCircle,
  Phone,
  Globe,
  Mail,
  ShieldCheck,
  CalendarDays,
  Star,
  ArrowRight,
} from "lucide-react";

type PageProps = {
  params: Promise<{ username: string }>;
};

function normalizeContact(value: string | null | undefined, type: "wa" | "tel" | "web" | "mail") {
  if (!value) return "";
  if (type === "wa") {
    const digits = value.replace(/[^0-9]/g, "");
    return digits ? `https://wa.me/${digits}` : "";
  }
  if (type === "tel") return value.startsWith("+") || value.startsWith("0") ? `tel:${value.replace(/\s/g, "")}` : `tel:+${value.replace(/[^0-9]/g, "")}`;
  if (type === "web") return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return value.includes("@") ? `mailto:${value}` : "";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsername(username).catch(() => null);

  if (!profile) {
    return { title: "Profile not found — WorkTag" };
  }

  const title = `${profile.businessName} on WorkTag — Built on Trust. Proven by Work.`;
  return {
    title,
    description: profile.description ?? `Discover and connect with ${profile.businessName} on WorkTag. Verified digital identity.`,
    openGraph: {
      title,
      description: profile.description ?? `Connect with ${profile.businessName} on WorkTag.`,
      type: "profile",
      url: `/${profile.username}`,
      images: profile.logoUrl ? [profile.logoUrl] : undefined,
    },
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const profile = await getProfileByUsername(username).catch(() => null);

  if (!profile) {
    notFound();
  }

  const location =
    (profile.location as { city?: string; state?: string; country?: string } | null) ?? null;
  const locationLabel = [location?.city, location?.state, location?.country]
    .filter(Boolean)
    .join(", ");

  const actions = [
    profile.whatsapp && {
      href: normalizeContact(profile.whatsapp, "wa"),
      label: "WhatsApp",
      icon: MessageCircle,
      cls: "bg-[#25D366] hover:bg-[#1fb356] shadow-[0_12px_30px_-10px_rgba(37,211,102,0.6)]",
    },
    profile.phone && {
      href: normalizeContact(profile.phone, "tel"),
      label: "Call",
      icon: Phone,
      cls: "bg-[#0241A8] hover:bg-[#0B2E7A] shadow-[0_12px_30px_-10px_rgba(2,65,168,0.6)]",
    },
    profile.website && {
      href: normalizeContact(profile.website, "web"),
      label: "Website",
      icon: Globe,
      cls: "bg-[#6366F1] hover:bg-[#4F46E5] shadow-[0_12px_30px_-10px_rgba(99,102,241,0.6)]",
    },
    profile.email && {
      href: normalizeContact(profile.email, "mail"),
      label: "Email",
      icon: Mail,
      cls: "bg-[#F59E0B] hover:bg-[#D97706] shadow-[0_12px_30px_-10px_rgba(245,158,11,0.6)]",
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    icon: React.ElementType;
    cls: string;
  }[];

  const initials = (profile.businessName ?? "W")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const memberSince = new Date(profile.createdAt).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#070B1C]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 400px at 50% -10%, rgba(2,65,168,0.5), transparent 60%), radial-gradient(500px 320px at 110% 90%, rgba(63,169,245,0.18), transparent 60%), radial-gradient(400px 300px at -10% 95%, rgba(253,195,4,0.12), transparent 60%)",
        }}
      />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pb-10 pt-6 sm:px-8">
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <WorkTagMark className="h-7 w-7" />
            <span className="text-[15px] font-bold tracking-tight text-white">WorkTag</span>
          </Link>
          <div className="flex items-center gap-2">
            <PublicProfileActions profileId={profile.id} username={profile.username} />
            <Link
              href="/register"
              className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-[#0241A8] to-[#3FA9F5] px-4 text-[12px] font-bold text-white shadow-[0_8px_24px_-8px_rgba(2,65,168,0.8)] transition-transform duration-300 hover:-translate-y-[1px]"
            >
              Get yours
            </Link>
          </div>
        </header>

        <main className="flex-1 py-8">
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_40px_90px_-30px_rgba(2,65,168,0.45)]">
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-[#0241A8] via-[#0B2E7A] to-[#1a1f3a]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(300px 140px at 90% 0%, rgba(253,195,4,0.25), transparent 60%)",
                }}
              />
              <div className="dot-grid absolute inset-0 opacity-60" />
              {profile.coverUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.coverUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <div className="px-6 pb-7">
              <div className="-mt-10 mb-4 flex items-end justify-between">
                <div className="relative">
                  {profile.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.logoUrl}
                      alt={profile.businessName}
                      className="h-20 w-20 rounded-2xl border-4 border-white bg-white object-cover shadow-[0_16px_40px_-12px_rgba(2,65,168,0.45)]"
                    />
                  ) : (
                    <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-[#0241A8] to-[#3FA9F5] text-2xl font-extrabold text-white shadow-[0_16px_40px_-12px_rgba(2,65,168,0.45)]">
                      {initials}
                    </span>
                  )}
                  {profile.isPublished && (
                    <span className="absolute -bottom-1.5 -right-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#FDC304] text-white shadow-lg">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      profile.isPublished
                        ? "bg-[#10B981]/10 text-[#059669]"
                        : "bg-[#94A3B8]/10 text-[#64748B]"
                    }`}
                  >
                    <ShieldCheck className="h-3 w-3" />
                    {profile.isPublished ? "Verified" : "On WorkTag"}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0241A8]/[0.07] px-3 py-1 text-[10px] font-bold text-[#0241A8]">
                    {profile.category}
                  </span>
                </div>
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-[#090D1F]">
                {profile.businessName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-[#64748B]">
                <span className="font-mono font-semibold text-[#0241A8]">@{profile.username}</span>
                {locationLabel && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {locationLabel}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> Member since {memberSince}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-[#E8EBF2] bg-[#F8FAFD] p-3">
                <div className="text-center">
                  <p className="text-lg font-extrabold text-[#090D1F]">∞</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Trust</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-extrabold text-[#090D1F]">
                    {profile.isPublished ? "100" : "—"}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Identity</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-extrabold text-[#090D1F]">
                    {actions.length || "0"}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">Contact</p>
                </div>
              </div>

              {profile.description && (
                <p className="mt-5 text-[13px] leading-relaxed text-[#475569]">
                  {profile.description}
                </p>
              )}

              {actions.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  {actions.map((a) => {
                    const Icon = a.icon;
                    return (
                      <a
                        key={a.label}
                        href={a.href}
                        target={a.label === "Call" ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className={`inline-flex h-12 items-center justify-center gap-2 rounded-2xl px-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-[1px] ${a.cls}`}
                      >
                        <Icon className="h-4 w-4" /> {a.label}
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-dashed border-[#E8EBF2] bg-[#F8FAFD] px-5 py-6 text-center">
                  <p className="text-[12px] text-[#64748B]">
                    {profile.businessName} hasn&apos;t added contact buttons yet.
                  </p>
                </div>
              )}

              <div className="mt-7 flex items-center justify-center gap-1.5 border-t border-[#F0F2F7] pt-5 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">
                <Star className="h-3 w-3 text-[#FDC304]" fill="currentColor" />
                Built on Trust. Proven by Work.
              </div>
            </div>
          </div>

          <Link
            href="/register"
            className="group mt-5 flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-[13px] font-bold text-white/80 backdrop-blur transition-all duration-300 hover:border-[#FDC304]/30 hover:text-white"
          >
            Create your free WorkTag
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </main>

        <footer className="text-center text-[10px] text-white/30">
          Powered by <span className="font-bold text-white/50">Afara Digital</span> — WorkTag
        </footer>
      </div>
    </div>
  );
}
