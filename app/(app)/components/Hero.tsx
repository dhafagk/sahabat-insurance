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

function useTypewriter(words: string[], speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];

    if (!deleting && charIndex < current?.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIndex === current?.length) {
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
    setDisplayed(words[wordIndex]?.slice(0, charIndex));
  }, [charIndex, wordIndex, words]);

  return displayed;
}

interface HeroStat {
  value: string;
  label: string;
}

export interface HeroData {
  taglines?: Array<{ text: string }> | null;
  stats?: Array<HeroStat> | null;
  descriptionDesktop?: string | null;
  descriptionMobile?: string | null;
  phoneNumber?: string | null;
  whatsappUrl?: string | null;
  ctaPrimaryLabel?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondaryLabel?: string | null;
}

interface HeroProps {
  data?: HeroData | null;
}

const DEFAULTS = {
  taglines: [
    "Perlindungan Terpercaya untuk Keluarga",
    "Klaim Cepat, Proses Mudah",
    "Solusi Asuransi Lengkap Anda",
    "Dilindungi Secara Positif",
  ],
  stats: [
    { value: "13+", label: "Tahun Pengalaman" },
    { value: "20+", label: "Kantor Cabang" },
    { value: "10+", label: "Produk Asuransi" },
  ],
  descriptionDesktop:
    "Sahabat Insurance berkomitmen memberikan perlindungan terbaik dengan layanan klaim yang cepat, produk yang komprehensif, dan tim yang siap membantu kapan pun Anda membutuhkan.",
  descriptionMobile:
    "Perlindungan terbaik dengan klaim cepat dan tim siap membantu Anda.",
  phoneNumber: "(021) 5050-8080",
  whatsappUrl: "https://wa.me/622150508080",
  ctaPrimaryLabel: "Dapatkan Penawaran Gratis",
  ctaPrimaryHref: "#contact",
  ctaSecondaryLabel: "Hubungi Kami",
};

export default function Hero({ data }: HeroProps) {
  const taglineTexts =
    data?.taglines?.map((t) => t.text).filter(Boolean) ?? DEFAULTS.taglines;

  const stats = data?.stats?.length ? data.stats : DEFAULTS.stats;

  const descDesktop = data?.descriptionDesktop ?? DEFAULTS.descriptionDesktop;
  const descMobile = data?.descriptionMobile ?? DEFAULTS.descriptionMobile;
  const phone = data?.phoneNumber ?? DEFAULTS.phoneNumber;
  const phoneHref = `tel:${phone.replace(/\D/g, "")}`;
  const whatsappUrl = data?.whatsappUrl ?? DEFAULTS.whatsappUrl;
  const ctaPrimaryLabel = data?.ctaPrimaryLabel ?? DEFAULTS.ctaPrimaryLabel;
  const ctaPrimaryHref = data?.ctaPrimaryHref ?? DEFAULTS.ctaPrimaryHref;
  const ctaSecondaryLabel =
    data?.ctaSecondaryLabel ?? DEFAULTS.ctaSecondaryLabel;

  const tagline = useTypewriter(taglineTexts);

  return (
    <section
      className="hero-section relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
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

          <motion.div variants={fadeUp} className="min-h-[2.5rem]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white sm:text-text-primary">
              {tagline}
              <span
                className="ml-0.5 inline-block w-0.5 h-7 align-middle bg-white sm:bg-navy animate-pulse"
                aria-hidden="true"
              />
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-base leading-relaxed text-white/90 sm:text-text-muted"
          >
            <span className="sm:hidden">{descMobile}</span>
            <span className="hidden sm:inline">{descDesktop}</span>
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-3">
              <a
                href={ctaPrimaryHref}
                className="hidden sm:inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-navy text-white font-semibold hover:bg-navy/90 transition-all shadow-lg shadow-navy/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                {ctaPrimaryLabel}
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-slate-300 text-text-primary bg-white/70 hover:bg-white transition-all backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              >
                {ctaSecondaryLabel}
              </a>
            </div>

            <div className="sm:hidden flex flex-col gap-0.5">
              <span className="text-xs text-white/60 uppercase tracking-widest">
                Konsultasi Gratis
              </span>
              <a
                href={phoneHref}
                className="text-lg font-bold text-white hover:text-white/80 transition-colors"
              >
                {phone}
              </a>
            </div>

            <p className="hidden sm:block text-sm text-text-muted">
              Atau hubungi kami langsung di{" "}
              <a
                href={phoneHref}
                className="font-medium text-navy hover:underline"
              >
                {phone}
              </a>{" "}
              untuk konsultasi gratis
            </p>
          </motion.div>

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
