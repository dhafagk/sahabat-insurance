import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const { email, fileName, fileUrl, unduhanlId } = body as {
    email?: string;
    fileName?: string;
    fileUrl?: string;
    unduhanlId?: string;
  };

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email tidak valid" }, { status: 400 });
  }

  if (!fileUrl) {
    return NextResponse.json({ error: "File URL diperlukan" }, { status: 400 });
  }

  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection: "download-leads",
      data: {
        email,
        fileName: fileName ?? "",
        fileUrl,
        ...(unduhanlId ? { unduhan: Number(unduhanlId) } : {}),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-download]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Coba lagi." },
      { status: 500 },
    );
  }
}
