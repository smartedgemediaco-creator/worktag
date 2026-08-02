"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, CheckCircle2 } from "lucide-react";

export function PublicProfileActions({
  profileId,
  username,
}: {
  profileId: string;
  username: string;
}) {
  const [copied, setCopied] = useState(false);
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current || !profileId) return;
    trackedRef.current = true;
    fetch("/api/v1/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profileId, type: "page_view" }),
    }).catch(() => {});
  }, [profileId]);

  async function handleShare() {
    const url = `${window.location.origin}/${username}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "WorkTag profile", url });
        return;
      } catch {
        // fall through to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 text-[12px] font-bold text-white backdrop-blur transition-all duration-300 hover:bg-white/[0.12]"
    >
      {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-[#FDC304]" /> : <Share2 className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Share"}
    </button>
  );
}
