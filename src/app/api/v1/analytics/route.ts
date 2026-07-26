import { NextResponse } from "next/server";
import { trackEvent, getAnalytics } from "@/server/services/analytics-service";
import { getAuthClient } from "@/lib/auth";
import { getProfileByUserId } from "@/server/services/profile-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profileId, type, userAgent, referrer, country, device } = body;

    if (!profileId || !type) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_FAILED", message: "profileId and type are required" },
        },
        { status: 400 }
      );
    }

    const validTypes = [
      "page_view",
      "qr_scan",
      "whatsapp_click",
      "call_click",
      "email_click",
      "website_click",
    ];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_FAILED", message: "Invalid event type" },
        },
        { status: 400 }
      );
    }

    const event = await trackEvent({
      profileId,
      type,
      userAgent: userAgent ?? req.headers.get("user-agent") ?? undefined,
      referrer: referrer ?? req.headers.get("referer") ?? undefined,
      country,
      device,
    });

    return NextResponse.json({ success: true, data: event.toJSON() }, { status: 201 });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to track event" },
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const auth = await getAuthClient();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );
    }

    const profile = await getProfileByUserId(session.user.id);
    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "PROFILE_NOT_FOUND", message: "No profile found" },
        },
        { status: 404 }
      );
    }

    const analytics = await getAnalytics(profile.id);
    return NextResponse.json({ success: true, data: analytics });
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to fetch analytics" },
      },
      { status: 500 }
    );
  }
}
