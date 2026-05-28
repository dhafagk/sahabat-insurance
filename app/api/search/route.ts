import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

const MIN_QUERY_LENGTH = 2;

function toProductSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export interface SearchResult {
  type: "news" | "product" | "page";
  title: string;
  excerpt: string | null;
  href: string;
}

type PageCandidate = { title: string; href: string; excerpt: string | null };

function flattenNavPages(raw: unknown): PageCandidate[] {
  if (!raw || typeof raw !== "object") return [];
  const items = (raw as Record<string, unknown>).items;
  if (!Array.isArray(items)) return [];

  const pages: PageCandidate[] = [];
  const seen = new Set<string>();

  function add(title: string, href: string, excerpt: string | null) {
    if (!href.startsWith("#") && !seen.has(href)) {
      seen.add(href);
      pages.push({ title, href, excerpt });
    }
  }

  for (const item of items as Record<string, unknown>[]) {
    const href = typeof item.href === "string" ? item.href : "";
    add(String(item.label ?? ""), href, null);

    for (const navItem of (Array.isArray(item.dropdownItems)
      ? item.dropdownItems
      : []) as Record<string, unknown>[]) {
      const navHref = typeof navItem.href === "string" ? navItem.href : "";
      add(
        String(navItem.title ?? ""),
        navHref,
        typeof navItem.description === "string" ? navItem.description : null,
      );
      for (const sub of (Array.isArray(navItem.subItems)
        ? navItem.subItems
        : []) as Record<string, unknown>[]) {
        const subHref = typeof sub.href === "string" ? sub.href : "";
        add(String(sub.title ?? ""), subHref, null);
      }
    }
  }

  return pages;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";

  if (q.trim().length < MIN_QUERY_LENGTH) {
    return NextResponse.json<SearchResult[]>([]);
  }

  try {
    const payload = await getPayload({ config });

    const [newsRes, productsRes, navRaw] = await Promise.all([
      payload.find({
        collection: "news",
        where: {
          and: [{ title: { like: q } }, { status: { equals: "published" } }],
        },
        limit: 5,
        depth: 0,
      }),
      payload.find({
        collection: "products",
        where: { title: { like: q } },
        limit: 5,
        depth: 0,
      }),
      payload.findGlobal({ slug: "navbar", depth: 2 }).catch(() => null),
    ]);

    const newsResults: SearchResult[] = newsRes.docs.map((doc) => ({
      type: "news",
      title: doc.title ?? "",
      excerpt: doc.excerpt ?? "",
      href: `/news/${doc.slug}`,
    }));

    const productResults: SearchResult[] = productsRes.docs.map((doc) => ({
      type: "product",
      title: doc.title ?? "",
      excerpt: doc.description ?? "",
      href: `/products/${toProductSlug(doc.title ?? "")}`,
    }));

    const ql = q.toLowerCase();
    const pageResults: SearchResult[] = flattenNavPages(navRaw)
      .filter(
        (p) =>
          p.title.toLowerCase().includes(ql) ||
          (p.excerpt?.toLowerCase().includes(ql) ?? false),
      )
      .slice(0, 5)
      .map((p) => ({
        type: "page",
        title: p.title,
        excerpt: p.excerpt,
        href: p.href,
      }));

    const results = [...pageResults, ...newsResults, ...productResults].slice(
      0,
      10,
    );
    return NextResponse.json<SearchResult[]>(results);
  } catch (err) {
    console.error("[search]", err);
    return NextResponse.json<SearchResult[]>([], { status: 500 });
  }
}
