import { cache } from "react";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import TabelContent from "../TabelContent";
import { getLocale } from "../../lib/locale";
import type { DataTable } from "../TabelContent";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPayloadInstance = cache(async () => getPayload({ config }) as any);

const fetchDoc = cache(async (slug: string, locale: string) => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "tabel",
    where: {
      and: [{ slug: { equals: slug } }, { status: { equals: "published" } }],
    },
    limit: 1,
    depth: 1,
    locale,
  });
  return result.docs[0] ?? null;
});

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
function normaliseTables(raw: any[]): DataTable[] {
  return raw.map((table) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const columns: string[] = (table.columns ?? []).map((c: any) => c.label ?? "");
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

export default async function TabelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const doc = await fetchDoc(slug, locale);
  if (!doc) notFound();

  const tables: DataTable[] = Array.isArray(doc.tables) && doc.tables.length > 0
    ? normaliseTables(doc.tables)
    : [];

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
            <Link href="/tabel" className="hover:text-white/80 transition-colors">
              Data & Tabel
            </Link>
            <span>›</span>
            <span className="text-white/80">{doc.title}</span>
          </nav>

          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
            Informasi Produk & Layanan
          </span>
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
