"use client";

import { motion } from "framer-motion";

export interface PromoStripData {
  heading?: string | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
}

interface PromoStripProps {
  data?: PromoStripData | null;
}

const DEFAULTS = {
  heading: "Solusi Lengkap Perlindungan Asuransi Anda",
  buttonLabel: "Penawaran",
  buttonHref: "#products",
};

export default function PromoStrip({ data }: PromoStripProps) {
  const heading = data?.heading ?? DEFAULTS.heading;
  const buttonLabel = data?.buttonLabel ?? DEFAULTS.buttonLabel;
  const buttonHref = data?.buttonHref ?? DEFAULTS.buttonHref;

  return (
    <section aria-label="Promotional strip" className="bg-navy">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-5 sm:px-8 py-9 sm:py-11 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-10"
      >
        <h2 className="font-open-sans text-2xl font-bold text-white leading-tight tracking-tight max-w-xl">
          {heading}
        </h2>
        <a
          href={buttonHref}
          className="shrink-0 inline-flex items-center px-8 py-3 rounded-full bg-white text-navy font-semibold text-sm sm:text-base leading-none hover:bg-white/90 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {buttonLabel}
        </a>
      </motion.div>
    </section>
  );
}
