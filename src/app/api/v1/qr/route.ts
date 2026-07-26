import { NextResponse } from "next/server";
import { getAuthClient } from "@/lib/auth";
import { getQRByProfileId } from "@/server/services/qr-service";
import { getProfileByUserId } from "@/server/services/profile-service";

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

    const qr = await getQRByProfileId(profile._id.toString());
    if (!qr) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "QR_NOT_FOUND", message: "No QR code found" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: qr.toJSON() });
  } catch (error) {
    console.error("QR fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to fetch QR code" },
      },
      { status: 500 }
    );
  }
}
