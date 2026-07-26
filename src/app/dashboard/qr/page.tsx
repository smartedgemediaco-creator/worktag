"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Download, Share2 } from "lucide-react";

interface QRData {
  _id: string;
  identifier: string;
  imageUrl: string;
  url: string;
  scanCount: number;
  createdAt: string;
}

export default function QRPage() {
  const router = useRouter();
  const [qr, setQR] = useState<QRData | null>(null);
  const [profile, setProfile] = useState<{ username: string; businessName: string } | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [profileRes, qrRes] = await Promise.all([
          fetch("/api/v1/profiles"),
          fetch("/api/v1/qr"),
        ]);

        if (profileRes.ok) {
          const data = await profileRes.json();
          setProfile(data.data);
        }
        if (qrRes.ok) {
          const data = await qrRes.json();
          setQR(data.data);
        }
      } catch {
        toast.error("Failed to load QR data");
      }
    }
    load();
  }, []);

  async function handleDownload() {
    const a = document.createElement("a");
    a.href = "/api/v1/qr/download";
    a.download = "worktag-qr.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleShare() {
    if (profile?.username) {
      const url = `${window.location.origin}/${profile.username}`;
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Profile URL copied to clipboard");
      } catch {
        toast.error("Failed to copy URL");
      }
    }
  }

  return (
    <div className="min-h-screen bg-worktag-surface">
      <header className="bg-white border-b border-border h-[72px] flex items-center px-6">
        <div className="mx-auto max-w-[1440px] w-full flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <span className="font-semibold">QR Code Management</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Your WorkTag QR Code</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {qr?.imageUrl ? (
              <>
                <div className="bg-white border border-border rounded-xl p-6 inline-block mb-6">
                  <img src={qr.imageUrl} alt="WorkTag QR" className="w-48 h-48" />
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-worktag-text-secondary">
                    Profile URL:{" "}
                    <span className="font-mono text-worktag-blue text-xs">
                      {window.location.origin}/{profile?.username}
                    </span>
                  </p>
                  <p className="text-sm text-worktag-text-secondary">
                    Total scans: <span className="font-semibold">{qr.scanCount}</span>
                  </p>
                  <p className="text-sm text-worktag-text-secondary">
                    Created: {new Date(qr.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" /> Download PNG
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={handleShare}>
                    <Share2 className="h-4 w-4 mr-2" /> Copy Link
                  </Button>
                </div>
              </>
            ) : (
              <div className="py-12 text-center">
                <p className="text-worktag-text-secondary">
                  Complete your profile setup to generate your QR code.
                </p>
                <Button className="mt-4" onClick={() => router.push("/onboarding")}>
                  Finish Setup
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
