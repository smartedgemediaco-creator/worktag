import { NextResponse } from "next/server";
import { config } from "@/config";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    status: "ok",
    app: config.app.name,
    environment: env.APP_ENV,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  });
}
