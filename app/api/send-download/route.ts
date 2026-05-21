import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

    const from = process.env.SMTP_FROM ?? process.env.SMTP_USER;
    await transporter.sendMail({
      from: `"Sahabat Insurance" <${from}>`,
      to: email,
      subject: `Dokumen Anda: ${fileName ?? "File"}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <img src="${process.env.NEXT_PUBLIC_SITE_URL}/logo.png" alt="Sahabat Insurance" style="height: 40px; margin-bottom: 24px;" />
          <h2 style="color: #1e3a5f; margin-bottom: 8px;">Dokumen Anda Siap Diunduh</h2>
          <p style="color: #555; line-height: 1.6;">
            Terima kasih telah menggunakan layanan PT Asuransi Sahabat Artha Proteksi.
            Berikut adalah tautan untuk mengunduh dokumen <strong>${fileName ?? "yang Anda minta"}</strong>:
          </p>
          <a
            href="${fileUrl}"
            style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #1e3a5f; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;"
          >
            Unduh Dokumen
          </a>
          <p style="color: #999; font-size: 12px; margin-top: 32px; border-top: 1px solid #eee; padding-top: 16px;">
            Jika Anda tidak merasa meminta dokumen ini, abaikan email ini.<br/>
            &copy; ${new Date().getFullYear()} PT Asuransi Sahabat Artha Proteksi
          </p>
        </div>
      `,
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
