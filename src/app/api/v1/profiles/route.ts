import { NextResponse } from "next/server";
import { getAuthClient } from "@/lib/auth";
import { createProfile, getProfileByUserId, updateProfile } from "@/server/services/profile-service";
import { generateQR } from "@/server/services/qr-service";

export async function POST(req: Request) {
  try {
    const auth = await getAuthClient();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { businessName, category, phone, whatsapp, email, location } = body;

    if (!businessName || !category) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_FAILED", message: "Business name and category are required" },
        },
        { status: 400 }
      );
    }

    const existing = await getProfileByUserId(session.user.id);
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "PROFILE_EXISTS", message: "A profile already exists for this user" },
        },
        { status: 409 }
      );
    }

    const profile = await createProfile({
      userId: session.user.id,
      businessName,
      category,
      phone,
      whatsapp,
      email,
      location,
    });

    const qr = await generateQR({
      profileId: profile._id.toString(),
      username: profile.username,
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          profile: profile.toJSON(),
          qr: qr.toJSON(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Profile creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to create profile" },
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

    return NextResponse.json({ success: true, data: profile.toJSON() });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to fetch profile" },
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const auth = await getAuthClient();
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      );
    }

    const body = await req.json();
    const profile = await updateProfile(session.user.id, body);

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "PROFILE_NOT_FOUND", message: "No profile found" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: profile.toJSON() });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to update profile" },
      },
      { status: 500 }
    );
  }
}
