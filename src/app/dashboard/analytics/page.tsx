"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, QrCode, MessageCircle, Phone, Mail, Globe } from "lucide-react";

interface AnalyticsData {
  totals: {
    views: number;
    qrScans: number;
    whatsappClicks: number;
    callClicks: number;
    emailClicks: number;
    websiteClicks: number;
  };
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    fetch("/api/v1/analytics")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .catch(() => {});
  }, []);

  const metrics = [
    { label: "Profile Views", value: data?.totals.views ?? 0, icon: Eye, color: "text-worktag-blue" },
    { label: "QR Scans", value: data?.totals.qrScans ?? 0, icon: QrCode, color: "text-worktag-blue" },
    { label: "WhatsApp Clicks", value: data?.totals.whatsappClicks ?? 0, icon: MessageCircle, color: "text-[#25D366]" },
    { label: "Call Clicks", value: data?.totals.callClicks ?? 0, icon: Phone, color: "text-worktag-blue" },
    { label: "Email Clicks", value: data?.totals.emailClicks ?? 0, icon: Mail, color: "text-worktag-blue" },
    { label: "Website Clicks", value: data?.totals.websiteClicks ?? 0, icon: Globe, color: "text-worktag-blue" },
  ];

  return (
    <div className="min-h-screen bg-worktag-surface">
      <header className="bg-white border-b border-border h-[72px] flex items-center px-6">
        <div className="mx-auto max-w-[1440px] w-full flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <span className="font-semibold">Analytics</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        <div className="grid grid-cols-3 gap-4">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-worktag-text-secondary">{m.label}</p>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
                <p className="text-2xl font-bold">{m.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Engagement Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-worktag-text-secondary">
              {data?.totals.views === 0 && data?.totals.qrScans === 0
                ? "No activity yet. Share your WorkTag profile to start tracking engagement."
                : "Track how customers discover and interact with your business."}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
