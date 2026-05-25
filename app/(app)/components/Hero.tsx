"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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

export interface HeroData {
  descriptionDesktop?: string | null;
  descriptionMobile?: string | null;
  whatsappUrl?: string | null;
  ctaPrimaryLabel?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondaryLabel?: string | null;
  ctaSecondaryHref?: string | null;
  ctaTertiaryLabel?: string | null;
  ctaTertiaryHref?: string | null;
}

interface HeroProps {
  data?: HeroData | null;
}

const DEFAULTS = {
  descriptionDesktop:
    "Solusi asuransi terpercaya untuk keluarga kesehatan dan masa depan finansial bersama Sahabat Insurance",
  descriptionMobile:
    "Solusi asuransi terpercaya untuk keluarga dan masa depan finansial Anda.",
  whatsappUrl: "https://wa.me/622150508080",
  ctaPrimaryLabel: "Klaim Via Whatsapp",
  ctaPrimaryHref: "https://wa.me/622150508080",
  ctaSecondaryLabel: "Cek Polis Anda",
  ctaSecondaryHref: "#polis",
  ctaTertiaryLabel: "Cek Harga Premi",
  ctaTertiaryHref: "#premi",
};

export default function Hero({ data }: HeroProps) {
  const descDesktop = data?.descriptionDesktop ?? DEFAULTS.descriptionDesktop;
  const descMobile = data?.descriptionMobile ?? DEFAULTS.descriptionMobile;
  const whatsappUrl = data?.whatsappUrl ?? DEFAULTS.whatsappUrl;
  const ctaPrimaryLabel = data?.ctaPrimaryLabel ?? DEFAULTS.ctaPrimaryLabel;
  const ctaPrimaryHref = data?.ctaPrimaryHref ?? DEFAULTS.ctaPrimaryHref;
  const ctaSecondaryLabel =
    data?.ctaSecondaryLabel ?? DEFAULTS.ctaSecondaryLabel;
  const ctaSecondaryHref = data?.ctaSecondaryHref ?? DEFAULTS.ctaSecondaryHref;
  const ctaTertiaryLabel = data?.ctaTertiaryLabel ?? DEFAULTS.ctaTertiaryLabel;
  const ctaTertiaryHref = data?.ctaTertiaryHref ?? DEFAULTS.ctaTertiaryHref;

  return (
    <section
      className="hero-section relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      <div
        className="hero-overlay absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32 w-full">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 sm:gap-6 max-w-lg sm:max-w-3xl"
        >
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight text-white"
          >
            {/* <span className="sm:hidden">
              {tagline}
              <span
                className="ml-0.5 inline-block w-0.5 h-8 align-middle bg-white animate-pulse"
                aria-hidden="true"
              />
            </span> */}
            <span className="">
              Perlindungan Tepat
              <br />
              untuk Setiap Tahap
              <br />
              Kehidupan Anda
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg leading-relaxed text-white/90"
          >
            <span className="sm:hidden">{descMobile}</span>
            <span className="hidden sm:inline">{descDesktop}</span>
          </motion.p>

          <motion.div variants={fadeUp}>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={ctaPrimaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-navy font-semibold text-base hover:bg-white/90 transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 shrink-0 text-[#25D366]"
                  aria-hidden="true"
                >
                  <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.85.504 3.584 1.384 5.074L2.05 21.95l5.033-1.316A9.95 9.95 0 0 0 12.001 22c5.523 0 10-4.478 10-10S17.524 2 12.001 2Zm0 18a7.95 7.95 0 0 1-4.052-1.104l-.29-.173-3.004.786.806-2.932-.19-.302A7.95 7.95 0 0 1 4 12c0-4.41 3.589-8 8.001-8C16.41 4 20 7.59 20 12s-3.589 8-7.999 8Zm4.388-5.91c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.373-1.922-1.186-.71-.633-1.19-1.414-1.33-1.654-.14-.24-.015-.37.105-.49.108-.107.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.195-.47-.393-.406-.54-.413l-.46-.008c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.618.573.247 1.02.394 1.368.504.575.183 1.099.157 1.513.095.462-.069 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
                {ctaPrimaryLabel}
              </a>
              <a
                href={ctaSecondaryHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-base border-2 border-white text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
              >
                {ctaSecondaryLabel}
              </a>
              <a
                href={ctaTertiaryHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-base border-2 border-white text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
              >
                {ctaTertiaryLabel}
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 pt-2"
          >
            <span className="text-white/50 text-xs uppercase tracking-wider">
              Rated by
            </span>
            <div className="bg-white rounded-md px-4 py-2 shadow-md">
              <Image
                src="/p.jpg"
                alt="Fitch Ratings"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
