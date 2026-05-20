"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TAG_COLORS, formatDate } from "./newsUtils";

interface MediaValue {
  url?: string | null;
}

interface TagValue {
  id: string | number;
  name: string;
}

export interface NewsItem {
  id?: string;
  tags?: (TagValue | string)[] | null;
  date: string;
  title: string;
  excerpt: string;
  image?: MediaValue | string | null;
  slug?: string | null;
}

export interface SectionMeta {
  badge?: string | null;
  heading?: string | null;
}

interface LatestNewsProps {
  news?: NewsItem[];
  sectionMeta?: SectionMeta | null;
}

const DEFAULTS: { badge: string; heading: string; news: NewsItem[] } = {
  badge: "News",
  heading: "Latest News",
  news: [
    {
      tags: [{ id: "1", name: "Community" }],
      date: "12 Mei 2026",
      title: "Sosialisasi Pencegahan Kebakaran bersama Warga Jakarta Selatan",
      excerpt:
        "Sahabat Insurance menggelar kegiatan sosialisasi pencegahan kebakaran kepada warga Jakarta Selatan sebagai bentuk tanggung jawab sosial perusahaan.",
      image: "/assets/3.png",
    },
    {
      tags: [{ id: "2", name: "Awards" }],
      date: "08 Mei 2026",
      title:
        "Sahabat Insurance Raih Penghargaan Indonesia Financial Top Leader Awards 2026",
      excerpt:
        "PT Asuransi Sahabat Artha Proteksi kembali menorehkan prestasi dengan meraih penghargaan bergengsi di ajang Indonesia Financial Top Leader Awards 2026.",
      image: "/assets/4.png",
    },
    {
      tags: [{ id: "3", name: "Training" }],
      date: "25 Apr 2026",
      title: "Pelatihan Penanganan Klaim Properti untuk Tim Adjuster",
      excerpt:
        "Dalam rangka meningkatkan kompetensi tim, Sahabat Insurance mengadakan sesi pelatihan intensif penanganan klaim properti bagi seluruh adjuster internal.",
      image: "/assets/5.png",
    },
  ],
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function resolveImageUrl(
  image: MediaValue | string | null | undefined,
): string {
  if (!image) return "/assets/3.png";
  if (typeof image === "string") return image;
  return image.url ?? "/assets/3.png";
}

export default function LatestNews({ news, sectionMeta }: LatestNewsProps) {
  const badge = sectionMeta?.badge ?? DEFAULTS.badge;
  const heading = sectionMeta?.heading ?? DEFAULTS.heading;
  const items = news?.length ? news : DEFAULTS.news;

  return (
    <section id="news" className="py-24 bg-card" aria-label="Latest news">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            {badge}
          </span>
          <h2 className="font-open-sans text-3xl sm:text-4xl font-bold text-text-primary">
            {heading}
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item) => {
            const firstTag = item.tags?.[0];
            const tagName =
              typeof firstTag === "string" ? firstTag : firstTag?.name;
            const colors = TAG_COLORS[tagName ?? ""] ?? {
              bg: "#F1F5F9",
              text: "#64748B",
            };
            const imageUrl = resolveImageUrl(item.image);
            const displayDate = formatDate(item.date);

            const href = item.slug ? `/news/${item.slug}` : "#";
            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <Link
                  href={href}
                  className="flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>

                  <div className="p-5 flex flex-col gap-2.5 flex-1">
                    <div className="flex items-center justify-between">
                      {tagName && (
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: colors.bg, color: colors.text }}
                        >
                          {tagName}
                        </span>
                      )}
                      <span className="text-xs text-text-muted">
                        {displayDate}
                      </span>
                    </div>

                    <h3 className="font-semibold text-text-primary text-sm leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-text-muted leading-relaxed line-clamp-3 flex-1">
                      {item.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:underline mt-auto pt-1">
                      Read more →
                    </span>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View All News →
          </Link>
        </div>
      </div>
    </section>
  );
}
