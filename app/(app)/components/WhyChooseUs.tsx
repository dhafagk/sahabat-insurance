"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Trophy,
  MapPin,
  Zap,
  Car,
  Home,
  Plane,
  Shield,
  Anchor,
  Banknote,
  Flame,
  HardHat,
  Package,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type IconComponent = React.ComponentType<{
  size?: number;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean | "true" | "false";
}>;

const iconMap: Record<string, LucideIcon> = {
  Award,
  Trophy,
  MapPin,
  Zap,
  Car,
  Home,
  Plane,
  Shield,
  Anchor,
  Banknote,
  Flame,
  HardHat,
};

interface Reason {
  iconName: string;
  title: string;
  body: string;
}

interface MediaValue {
  url?: string | null;
}

export interface WhyChooseUsData {
  badge?: string | null;
  heading?: string | null;
  description?: string | null;
  reasons?: Reason[] | null;
  image?: MediaValue | string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

interface WhyChooseUsProps {
  data?: WhyChooseUsData | null;
}

const DEFAULTS = {
  badge: "Tentang Kami",
  heading: "Kami Hadir Sebagai Sahabat Terpercaya Anda",
  description:
    "Kami semua membutuhkan sahabat yang selalu ada — setia, dapat diandalkan, dan siap memberikan dukungan kapan pun dibutuhkan. Inilah filosofi yang mendasari Sahabat Insurance: menjadi mitra perlindungan nyata bagi jutaan nasabah di seluruh Indonesia.",
  reasons: [
    {
      iconName: "Award",
      title: "Fitch Rating A(idn)",
      body: "Kekuatan finansial yang diakui dan terpercaya secara nasional",
    },
    {
      iconName: "Trophy",
      title: "Penghargaan 5 Tahun Berturut",
      body: "Konsistensi dalam memberikan layanan asuransi terbaik",
    },
    {
      iconName: "MapPin",
      title: "20+ Cabang di Seluruh Indonesia",
      body: "Hadir dekat dengan Anda, di mana pun Anda berada",
    },
    {
      iconName: "Zap",
      title: "Proses Klaim Cepat",
      body: "Penanganan klaim yang efisien, transparan, dan mudah dipahami",
    },
  ],
  ctaLabel: "Pelajari Lebih Lanjut",
  ctaHref: "#contact",
};

function resolveImageUrl(
  image: MediaValue | string | null | undefined,
): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  return image.url ?? null;
}

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  const badge = data?.badge ?? DEFAULTS.badge;
  const heading = data?.heading ?? DEFAULTS.heading;
  const description = data?.description ?? DEFAULTS.description;
  const reasons = data?.reasons?.length ? data.reasons : DEFAULTS.reasons;
  const ctaLabel = data?.ctaLabel ?? DEFAULTS.ctaLabel;
  const ctaHref = data?.ctaHref ?? DEFAULTS.ctaHref;
  const imageUrl = resolveImageUrl(data?.image) ?? "/assets/2.png";

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#2887C1" }}
      aria-label="Why choose Sahabat Insurance"
    >
      <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2">
        <Image
          src={imageUrl}
          alt="Tim Sahabat Insurance di kantor"
          fill
          className="object-cover"
          sizes="50vw"
        />
      </div>

      <div
        className="hidden lg:block absolute inset-y-0 z-10 pointer-events-none"
        style={{
          left: "calc(50% - 48px)",
          width: "96px",
          background: "#2887C1",
          transform: "skewX(-5deg)",
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:max-w-[50%] lg:pr-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold w-fit">
            {badge}
          </span>
          <h2 className="font-open-sans text-3xl sm:text-4xl font-bold text-white leading-tight">
            {heading}
          </h2>
          <p className="text-white/75 leading-relaxed max-w-md">
            {description}
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {reasons.map(({ iconName, title, body }) => {
              const Icon = (iconMap[iconName] ?? Package) as IconComponent;
              return (
                <div
                  key={title}
                  className="flex flex-col gap-1 border-t border-white/25 pt-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      size={15}
                      style={{ color: "white" }}
                      aria-hidden="true"
                    />
                    <h3 className="font-semibold text-white text-sm">
                      {title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">
                    {body}
                  </p>
                </div>
              );
            })}
          </div>

          <a
            href={ctaHref}
            className="inline-flex items-center justify-center w-fit px-6 py-3 rounded-full bg-white text-navy font-semibold hover:bg-white/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {ctaLabel}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="lg:hidden mt-12 relative rounded-xl overflow-hidden aspect-[4/3]"
        >
          <Image
            src={imageUrl}
            alt="Tim Sahabat Insurance di kantor"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
