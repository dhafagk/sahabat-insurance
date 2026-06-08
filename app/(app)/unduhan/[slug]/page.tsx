import { cache } from "react";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import UnduhContent from "../UnduhContent";
import { getLocale } from "../../lib/locale";
import type { AccordionSection, DownloadItem } from "../UnduhContent";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPayloadInstance = cache(async () => getPayload({ config }) as any);

const fetchDoc = cache(async (slug: string, locale: string) => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "unduhan",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
    limit: 1,
    depth: 1,
    locale,
  });
  return result.docs[0] ?? null;
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const doc = await fetchDoc(slug, locale);
  if (!doc) return {};
  return {
    title: `${doc.title} | Sahabat Insurance`,
    description: doc.description ?? undefined,
  };
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

export default async function UnduhDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const doc = await fetchDoc(slug, locale);
  if (!doc) notFound();

  const sections: AccordionSection[] =
    Array.isArray(doc.sections) && doc.sections.length > 0
      ? normaliseSections(doc.sections)
      : [];

  const requireEmailGate = Boolean(doc.requireEmailGate);

  return (
    <>
      <Navbar />

      <div className="bg-navy pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <nav
            className="flex items-center gap-1.5 text-xs text-white/50 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">
              Beranda
            </Link>
            <span>›</span>
            <Link
              href="/unduhan"
              className="hover:text-white/80 transition-colors"
            >
              Unduhan
            </Link>
            <span>›</span>
            <span className="text-white/80">{doc.title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-slate-400 text-base max-w-xl leading-relaxed">
              {doc.description}
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
              unduhanlId={String(doc.id)}
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

    </>
  );
}
