import { prisma } from "@/lib/prisma";

export async function trackEvent(data: Record<string, unknown>) {
  return { success: true, toJSON() { return data; } };
}

export async function getAnalytics(profileId: string) {
  return {
    totalScans: 0,
    uniqueVisitors: 0,
    recentScans: [],
  };
}
