import { cache } from "react";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import type { SerializedEditorState } from "lexical";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArticleBody from "../components/ArticleBody";
import TimelineBlock from "../components/blocks/TimelineBlock";
import TabelContent from "../tabel/TabelContent";
import type { DataTable } from "../tabel/TabelContent";
import UnduhContent from "../unduhan/UnduhContent";
import type { AccordionSection, DownloadItem } from "../unduhan/UnduhContent";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPayloadInstance = cache(async () => getPayload({ config }) as any);

const fetchPage = cache(async (slug: string) => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "pages",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
    limit: 1,
    depth: 1,
  });
  return result.docs[0] ?? null;
});

const fetchTabel = cache(async (slug: string) => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "tabel",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
    limit: 1,
    depth: 1,
  });
  return result.docs[0] ?? null;
});

const fetchUnduhan = cache(async (slug: string) => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "unduhan",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
    limit: 1,
    depth: 1,
  });
  return result.docs[0] ?? null;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normaliseTables(raw: any[]): DataTable[] {
  return raw.map((table) => {
    const columns: string[] = (table.columns ?? []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (c: any) => c.label ?? "",
    );
    const rows: Record<string, string>[] = (table.rows ?? []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (row: any) => {
        const obj: Record<string, string> = {};
        columns.forEach((col, i) => {
          obj[col] = row.cells?.[i]?.value ?? "—";
        });
        return obj;
      },
    );
    return {
      id: table.id ?? table.title,
      category: table.category ?? "",
      title: table.title ?? "",
      description: table.description ?? "",
      columns,
      rows,
    };
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normaliseSections(raw: any[]): AccordionSection[] {
  return raw.map((section) => ({
    id: section.id ?? section.title,
    category: section.category ?? "",
    title: section.title ?? "",
    description: section.description ?? null,
    items: (section.items ?? []).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any): DownloadItem => ({
        name: item.name ?? "",
        type: item.type === "link" ? "link" : "pdf",
        size: item.size ?? null,
        file:
          typeof item.file === "object" && item.file !== null
            ? {
                url: item.file.url ?? null,
                filesize: item.file.filesize ?? null,
              }
            : null,
        href: item.href ?? null,
      }),
    ),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const page = await fetchPage(slug);
  if (page) {
    return {
      title: `${page.title} | Sahabat Insurance`,
      description: page.excerpt ?? undefined,
    };
  }

  const tabel = await fetchTabel(slug);
  if (tabel) {
    return {
      title: `${tabel.title} | Sahabat Insurance`,
      description: tabel.description ?? undefined,
    };
  }

  const unduhan = await fetchUnduhan(slug);
  if (unduhan) {
    return {
      title: `${unduhan.title} | Sahabat Insurance`,
      description: unduhan.description ?? undefined,
    };
  }

  return {};
}

export default async function PageDetail({ params }: PageProps) {
  const { slug } = await params;

  // 1. Try pages collection
  const page = await fetchPage(slug);
  if (page) {
    const imageUrl: string =
      typeof page.image === "object" && page.image?.url ? page.image.url : null;

    return (
      <>
        <Navbar />

        <div
          className="relative pt-28 pb-20 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0F172A 0%, #2887C1 60%, #1E293B 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <nav
              className="flex items-center gap-1.5 text-xs text-white/50 mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white/80 transition-colors">
                Beranda
              </Link>
              <span>›</span>
              <span className="text-white/80">{page.title}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              {page.title}
            </h1>
            {page.excerpt && (
              <p className="text-slate-400 text-base max-w-xl leading-relaxed">
                {page.excerpt}
              </p>
            )}
          </div>
        </div>

        <main className="bg-bg min-h-screen py-12">
          <div className="max-w-5xl mx-auto px-6">
            {imageUrl && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10">
                <Image
                  src={imageUrl}
                  alt={page.title}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
            )}

            {page.content && (
              <ArticleBody
                content={page.content as SerializedEditorState}
                tags={[]}
              />
            )}

            {/* Render layout blocks (e.g. Timeline) */}
            {Array.isArray(page.layout) && page.layout.length > 0 && (
              <div className="max-w-3xl mx-auto px-6 mt-8">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {page.layout.map((block: any, i: number) => {
                  if (
                    block.blockType === "timeline" &&
                    Array.isArray(block.items)
                  ) {
                    return <TimelineBlock key={i} items={block.items} />;
                  }
                  return null;
                })}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // 2. Try tabel collection
  const tabelDoc = await fetchTabel(slug);
  if (tabelDoc) {
    const tables: DataTable[] =
      Array.isArray(tabelDoc.tables) && tabelDoc.tables.length > 0
        ? normaliseTables(tabelDoc.tables)
        : [];

    return (
      <>
        <Navbar />

        <div
          className="relative pt-28 pb-20 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0F172A 0%, #2887C1 60%, #1E293B 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <nav
              className="flex items-center gap-1.5 text-xs text-white/50 mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white/80 transition-colors">
                Beranda
              </Link>
              <span>›</span>
              <span className="text-white/80">{tabelDoc.title}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              {tabelDoc.title}
            </h1>
            {tabelDoc.description && (
              <p className="text-slate-400 text-base max-w-xl leading-relaxed">
                {tabelDoc.description}
              </p>
            )}
          </div>
        </div>

        <main className="bg-bg min-h-screen">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {tables.length > 0 ? (
              <TabelContent tables={tables} />
            ) : (
              <p className="text-center text-text-muted py-24">
                Belum ada tabel yang tersedia.
              </p>
            )}

            <p className="text-center text-xs text-text-muted mt-12">
              Data bersifat indikatif. Untuk penawaran resmi, hubungi{" "}
              <a
                href="tel:02150508080"
                className="text-navy font-medium hover:underline"
              >
                (021) 5050 8080
              </a>
              .
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // 3. Try unduhan collection
  const unduhanDoc = await fetchUnduhan(slug);
  if (unduhanDoc) {
    const sections: AccordionSection[] =
      Array.isArray(unduhanDoc.sections) && unduhanDoc.sections.length > 0
        ? normaliseSections(unduhanDoc.sections)
        : [];

    const requireEmailGate = Boolean(unduhanDoc.requireEmailGate);

    return (
      <>
        <Navbar />

        <div
          className="relative pt-28 pb-20 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #0F172A 0%, #2887C1 60%, #1E293B 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6">
            <nav
              className="flex items-center gap-1.5 text-xs text-white/50 mb-6"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-white/80 transition-colors">
                Beranda
              </Link>
              <span>›</span>
              <span className="text-white/80">{unduhanDoc.title}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
              {unduhanDoc.title}
            </h1>
            {unduhanDoc.description && (
              <p className="text-slate-400 text-base max-w-xl leading-relaxed">
                {unduhanDoc.description}
              </p>
            )}
          </div>
        </div>

        <main className="bg-bg min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {sections.length > 0 ? (
              <UnduhContent
                sections={sections}
                requireEmailGate={requireEmailGate}
                unduhanlId={String(unduhanDoc.id)}
              />
            ) : (
              <p className="text-center text-text-muted py-24">
                Belum ada dokumen yang tersedia.
              </p>
            )}

            <p className="text-center text-xs text-text-muted mt-10">
              Untuk bantuan, hubungi{" "}
              <a
                href="tel:02150508080"
                className="text-navy font-medium hover:underline"
              >
                (021) 5050 8080
              </a>
              .
            </p>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  notFound();
}
