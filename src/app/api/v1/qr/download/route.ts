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
    if (!qr?.imageUrl) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "QR_NOT_FOUND", message: "No QR code found" },
        },
        { status: 404 }
      );
    }

    const base64Data = qr.imageUrl.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="worktag-${profile.username}.png"`,
      },
    });
  } catch (error) {
    console.error("QR download error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to download QR" },
      },
      { status: 500 }
    );
  }
}
