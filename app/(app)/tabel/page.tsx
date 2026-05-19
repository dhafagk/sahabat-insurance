import { cache } from "react";
import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { ArrowRight, TableProperties } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPayloadInstance = cache(async () => getPayload({ config }) as any);

interface TabelCard {
  title: string;
  description: string | null;
  slug: string;
  tableCount: number;
  rowCount: number;
}

export default async function TabelIndexPage() {
  let cards: TabelCard[] = [];

  try {
    const payload = await getPayloadInstance();
    const result = await payload.find({
      collection: "tabel",
      where: { status: { equals: "published" } },
      sort: "title",
      depth: 0,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cards = result.docs.map((doc: any) => {
      const tables = Array.isArray(doc.tables) ? doc.tables : [];
      const rowCount = tables.reduce(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (sum: number, t: any) =>
          sum + (Array.isArray(t.rows) ? t.rows.length : 0),
        0,
      );
      return {
        title: doc.title,
        description: doc.description ?? null,
        slug: doc.slug,
        tableCount: tables.length,
        rowCount,
      };
    });
  } catch {
    // no documents yet
  }

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
            <span className="text-white/80">Data & Tabel</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            Data & Tabel Referensi
          </h1>
          <p className="text-slate-400 text-base max-w-xl leading-relaxed">
            Tarif premi, daftar cabang, dan perbandingan produk asuransi Sahabat
            Insurance dalam format tabel yang mudah dibaca dan dicari.
          </p>
        </div>
      </div>

      <main className="bg-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                <TableProperties
                  size={28}
                  className="text-text-muted"
                  aria-hidden="true"
                />
              </div>
              <p className="text-text-muted text-sm">
                Belum ada tabel yang dipublikasikan.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => (
                <Link
                  key={card.slug}
                  href={`/tabel/${card.slug}`}
                  className="group bg-card rounded-2xl border border-slate-200 p-6 hover:border-navy hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-navy/8 group-hover:bg-navy flex items-center justify-center mb-5 transition-colors duration-300">
                    <TableProperties
                      size={20}
                      className="text-navy group-hover:text-white transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  <h2 className="font-semibold text-text-primary text-base mb-2 group-hover:text-navy transition-colors duration-200">
                    {card.title}
                  </h2>

                  {card.description && (
                    <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-2">
                      {card.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xs text-text-muted">
                      {card.rowCount} baris · {card.tableCount} tabel
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                      Lihat
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
