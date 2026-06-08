import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });
    const favicon = settings?.favicon as { url?: string } | null;

    if (favicon?.url) {
      return NextResponse.redirect(favicon.url);
    }
  } catch {
    // fall through to default
  }

  return NextResponse.redirect(
    new URL(
      "/favicon.ico",
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3969",
    ),
  );
}
