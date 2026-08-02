import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { providerStatus } from "@/server/services/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const providers = providerStatus();

  let database = false;
  let databaseError: string | undefined;

  try {
    await prisma.$queryRaw`SELECT 1`;
    database = true;
  } catch (error) {
    databaseError = error instanceof Error ? error.message : "database unreachable";
  }

  const allReady = database && Object.values(providers).every((provider) => provider.configured);

  return NextResponse.json(
    {
      status: allReady ? "ready" : "not_ready",
      app: "myworktag",
      environment: env.APP_ENV,
      database,
      databaseError,
      providers,
      timestamp: new Date().toISOString(),
    },
    { status: allReady ? 200 : 503 }
  );
}
