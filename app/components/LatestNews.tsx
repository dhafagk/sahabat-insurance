// app/components/LatestNews.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface NewsItem {
  tag: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    tag: "Community",
    date: "12 Mei 2026",
    title: "Sosialisasi Pencegahan Kebakaran bersama Warga Jakarta Selatan",
    excerpt:
      "Sahabat Insurance menggelar kegiatan sosialisasi pencegahan kebakaran kepada warga Jakarta Selatan sebagai bentuk tanggung jawab sosial perusahaan.",
    image: "/assets/3.png",
  },
  {
    tag: "Awards",
    date: "08 Mei 2026",
    title:
      "Sahabat Insurance Raih Penghargaan Indonesia Financial Top Leader Awards 2026",
    excerpt:
      "PT Asuransi Sahabat Artha Proteksi kembali menorehkan prestasi dengan meraih penghargaan bergengsi di ajang Indonesia Financial Top Leader Awards 2026.",
    image: "/assets/4.png",
  },
  {
    tag: "Training",
    date: "25 Apr 2026",
    title: "Pelatihan Penanganan Klaim Properti untuk Tim Adjuster",
    excerpt:
      "Dalam rangka meningkatkan kompetensi tim, Sahabat Insurance mengadakan sesi pelatihan intensif penanganan klaim properti bagi seluruh adjuster internal.",
    image: "/assets/5.png",
  },
  {
    tag: "Product",
    date: "10 Apr 2026",
    title: "Peluncuran Produk Asuransi Kendaraan Bermotor Generasi Terbaru",
    excerpt:
      "Sahabat Insurance resmi meluncurkan produk asuransi kendaraan bermotor terbaru dengan fitur proteksi komprehensif dan proses klaim yang lebih mudah.",
    image: "/assets/6.png",
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Community: { bg: "#EEF2FF", text: "#4F46E5" },
  Awards: { bg: "#DBEAFE", text: "#1D4ED8" },
  Training: { bg: "#DCFCE7", text: "#15803D" },
  Product: { bg: "#FEF3C7", text: "#B45309" },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function LatestNews() {
  return (
    <section id="news" className="py-24 bg-card" aria-label="Latest news">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            News
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-text-primary">
            Latest News
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {newsItems.map((item) => {
            const colors = tagColors[item.tag] ?? {
              bg: "#F1F5F9",
              text: "#64748B",
            };
            return (
              <motion.article
                key={item.title}
                variants={cardVariants}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-2.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: colors.bg, color: colors.text }}
                    >
                      {item.tag}
                    </span>
                    <span className="text-xs text-text-muted">{item.date}</span>
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
              </motion.article>
            );
          })}
        </motion.div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="#news"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            View All News →
          </a>
        </div>
      </div>
    </section>
  );
}
