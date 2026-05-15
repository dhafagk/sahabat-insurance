// app/components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const whatsappUrl = "https://wa.me/622150508080";

const taglines = [
  "Perlindungan Terpercaya untuk Keluarga",
  "Klaim Cepat, Proses Mudah",
  "Solusi Asuransi Lengkap Anda",
  "Dilindungi Secara Positif",
];

function useTypewriter(words: string[], speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
    }
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  useEffect(() => {
    setDisplayed(words[wordIndex].slice(0, charIndex));
  }, [charIndex, wordIndex, words]);

  return displayed;
}

const stats = [
  { value: "13+", label: "Tahun Pengalaman" },
  { value: "20+", label: "Kantor Cabang" },
  { value: "10+", label: "Produk Asuransi" },
];

export default function Hero() {
  const tagline = useTypewriter(taglines);

  return (
    <section
      className="hero-section relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Gradient overlay — responsive via CSS class */}
      <div
        className="hero-overlay absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-4 sm:gap-5 max-w-lg sm:max-w-xl"
        >
          {/* Greeting + Brand as one heading unit */}
          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-4xl md:text-5xl leading-snug tracking-tight"
          >
            <span className="hidden sm:block font-normal text-text-primary">
              Selamat datang di
            </span>
            <span className="block font-bold text-white sm:text-navy">
              Sahabat Insurance
            </span>
          </motion.h1>

          {/* Typewriter tagline */}
          <motion.div variants={fadeUp} className="min-h-[2.5rem]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white sm:text-text-primary">
              {tagline}
              <span
                className="ml-0.5 inline-block w-0.5 h-7 align-middle bg-white sm:bg-navy animate-pulse"
                aria-hidden="true"
              />
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-white/90 sm:text-text-muted"
          >
            <span className="sm:hidden">
              Perlindungan terbaik dengan klaim cepat dan tim siap membantu
              Anda.
            </span>
            <span className="hidden sm:inline">
              Sahabat Insurance berkomitmen memberikan perlindungan terbaik
              dengan layanan klaim yang cepat, produk yang komprehensif, dan tim
              yang siap membantu kapan pun Anda membutuhkan.
            </span>
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white font-semibold hover:bg-navy/90 transition-all shadow-lg shadow-navy/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                Dapatkan Penawaran Gratis
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-slate-300 text-text-primary bg-white/70 hover:bg-white transition-all backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                Hubungi Kami
              </a>
            </div>
            {/* Mobile phone block */}
            <div className="sm:hidden flex flex-col gap-0.5">
              <span className="text-xs text-white/60 uppercase tracking-widest">
                Konsultasi Gratis
              </span>
              <a
                href="tel:02150508080"
                className="text-lg font-bold text-white hover:text-white/80 transition-colors"
              >
                (021) 5050-8080
              </a>
            </div>
            {/* Desktop phone line */}
            <p className="hidden sm:block text-sm text-text-muted">
              Atau hubungi kami langsung di{" "}
              <a
                href="tel:02150508080"
                className="font-medium text-navy hover:underline"
              >
                (021) 5050-8080
              </a>{" "}
              untuk konsultasi gratis
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-x-6 pt-2"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 sm:gap-6"
              >
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white sm:text-text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/70 sm:text-text-muted">
                    {stat.label}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="w-px h-8 bg-white/30 sm:bg-slate-300"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
