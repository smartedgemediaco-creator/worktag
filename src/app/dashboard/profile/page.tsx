"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save } from "lucide-react";

export default function ProfileEditorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    description: "",
    phone: "",
    whatsapp: "",
    email: "",
    website: "",
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
          const p = data.data;
          setForm({
            businessName: p.businessName ?? "",
            category: p.category ?? "",
            description: p.description ?? "",
            phone: p.phone ?? "",
            whatsapp: p.whatsapp ?? "",
            email: p.email ?? "",
            website: p.website ?? "",
            address: p.location?.address ?? "",
            city: p.location?.city ?? "",
            state: p.location?.state ?? "",
            country: p.location?.country ?? "",
          });
        }
      })
      .catch(() => toast.error("Failed to load profile"));
  }, []);

  async function handleSave() {
    setLoading(true);
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
          location: {
            address: form.address,
            city: form.city,
            state: form.state,
            country: form.country,
          },
        }),
      });

      if (res.ok) {
        toast.success("Profile saved");
      } else {
        throw new Error("Failed to save");
      }
    } catch {
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-worktag-surface">
      <header className="bg-white border-b border-border h-[72px] flex items-center px-6">
        <div className="mx-auto max-w-[1440px] w-full flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <span className="font-semibold">Edit Profile</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                value={form.businessName}
                onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <textarea
                className="w-full min-h-[100px] rounded-lg border border-input bg-background p-3 text-sm"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input
                  value={form.whatsapp}
                  onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input
                  value={form.website}
                  onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input
                  value={form.state}
                  onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input
                  value={form.country}
                  onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
                />
              </div>
            </div>
            <Button onClick={handleSave} disabled={loading} className="w-full">
              <Save className="h-4 w-4 mr-2" /> {loading ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
