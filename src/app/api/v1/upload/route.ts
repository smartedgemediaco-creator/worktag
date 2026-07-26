import { NextResponse } from "next/server";
import { getAuthClient } from "@/lib/auth";
import { uploadImage } from "@/server/services/upload-service";

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
    const { image, folder } = body;

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "VALIDATION_FAILED", message: "Image data is required" },
        },
        { status: 400 }
      );
    }

    const result = await uploadImage(image, folder ?? "worktag");

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { code: "INTERNAL_ERROR", message: "Failed to upload image" },
      },
      { status: 500 }
    );
  }
}
