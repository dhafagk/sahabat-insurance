import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TAG_COLORS, formatDate } from "../components/newsUtils";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Berita | Sahabat Insurance",
  description: "Berita terbaru dari Sahabat Insurance",
};

interface NewsDoc {
  id: number;
  title: string;
  excerpt?: string | null;
  date: string;
  slug?: string | null;
  tags?: ({ id: number; name: string } | number)[] | null;
  image?: { url?: string | null } | number | null;
}

export default async function NewsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = (await getPayload({ config })) as any;

  const result = (await payload.find({
    collection: "news",
    where: { status: { equals: "published" } },
    sort: "-date",
    limit: 100,
    depth: 1,
  })) as { docs: NewsDoc[] };

  const news = result.docs;

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
            <span className="text-white/80">Berita</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            Berita Terkini
          </h1>
          <p className="text-slate-400 text-base max-w-xl leading-relaxed">
            Informasi terbaru seputar produk, kegiatan, dan pencapaian Sahabat
            Insurance.
          </p>
        </div>
      </div>

      <main className="bg-bg min-h-screen">

        {/* News grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          {news.length === 0 ? (
            <div className="text-center py-24 text-text-muted">
              <p className="text-lg">Belum ada berita yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => {
                const firstTag = item.tags?.[0];
                const tag =
                  typeof firstTag === "object" && firstTag !== null
                    ? firstTag
                    : null;
                const tagName = tag?.name;
                const colors = TAG_COLORS[tagName ?? ""] ?? {
                  bg: "#F1F5F9",
                  text: "#64748B",
                };
                const imageUrl =
                  typeof item.image === "object" && item.image !== null
                    ? (item.image.url ?? "/assets/3.png")
                    : "/assets/3.png";
                const href = item.slug ? `/news/${item.slug}` : "#";

                return (
                  <Link
                    key={item.id}
                    href={href}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                  >
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>

                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        {tagName && (
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{
                              background: colors.bg,
                              color: colors.text,
                            }}
                          >
                            {tagName}
                          </span>
                        )}
                        <span className="text-xs text-text-muted">
                          {formatDate(item.date)}
                        </span>
                      </div>

                      <h2 className="font-semibold text-text-primary text-base leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-200">
                        {item.title}
                      </h2>

                      {item.excerpt && (
                        <p className="text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
                          {item.excerpt}
                        </p>
                      )}

                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:underline mt-auto pt-1">
                        Baca selengkapnya →
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
