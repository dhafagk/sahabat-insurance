"use client";

import type { JSX } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
    aria-hidden="true"
  >
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const EnvelopeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
    aria-hidden="true"
  >
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const AgenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
    aria-hidden="true"
  >
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-7 h-7"
    aria-hidden="true"
  >
    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 shrink-0"
    aria-hidden="true"
  >
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const MailIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4 shrink-0"
    aria-hidden="true"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

interface MediaValue {
  url?: string | null;
}

export interface ActionCardData {
  icon: "whatsapp" | "envelope" | "agen" | "car" | "phone";
  label: string;
  sublabel?: string | null;
  bgColor?: string | null;
  href?: string | null;
  useWhatsappUrl?: boolean | null;
}

export interface CtaBannerData {
  heading?: string | null;
  subtext?: string | null;
  primaryLabel?: string | null;
  primaryHref?: string | null;
  whatsappUrl?: string | null;
  backgroundImage?: MediaValue | string | null;
  contactAddress?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  actionCards?: ActionCardData[] | null;
}

interface CtaBannerProps {
  data?: CtaBannerData | null;
}

const DEFAULTS = {
  heading: "Sahabat Insurance",
  subtext: "HUBUNGI KAMI",
  primaryLabel: "Konsultasi Gratis",
  primaryHref: "#products",
  whatsappUrl: "https://wa.me/622150508080",
  backgroundImage: "/assets/4.png",
  contactAddress: "Gedung Sahabat, Jl. Jend. Sudirman No. 86\nJakarta 10220",
  contactPhone: "(021) 5050-8080",
  contactEmail: "info@sahabat-insurance.co.id",
};

const ICON_MAP: Record<string, () => JSX.Element> = {
  whatsapp: WhatsAppIcon,
  envelope: EnvelopeIcon,
  agen: AgenIcon,
  car: CarIcon,
  phone: PhoneIcon,
};

const DEFAULT_ACTION_CARDS = [
  {
    icon: "whatsapp",
    label: "WhatsApp",
    sublabel: "Chat dengan kami",
    bgColor: "#16a34a",
    href: null,
    useWhatsappUrl: true,
  },
  {
    icon: "envelope",
    label: "Hubungi Kami",
    sublabel: "Kirim pesan",
    bgColor: "#0e9fad",
    href: "#contact",
    useWhatsappUrl: false,
  },
  {
    icon: "agen",
    label: "Daftar Agen",
    sublabel: "Bergabung bersama kami",
    bgColor: "#d97706",
    href: "/daftar-agen",
    useWhatsappUrl: false,
  },
  {
    icon: "car",
    label: "Bengkel Rekanan",
    sublabel: "Temukan bengkel terdekat",
    bgColor: "#ea580c",
    href: "/bengkel-rekanan",
    useWhatsappUrl: false,
  },
] satisfies ActionCardData[];

function resolveImageUrl(
  image: MediaValue | string | null | undefined,
): string {
  if (!image) return DEFAULTS.backgroundImage;
  if (typeof image === "string") return image;
  return image.url ?? DEFAULTS.backgroundImage;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CtaBanner({ data }: CtaBannerProps) {
  const heading = data?.heading ?? DEFAULTS.heading;
  const subtext = data?.subtext ?? DEFAULTS.subtext;
  const primaryLabel = data?.primaryLabel ?? DEFAULTS.primaryLabel;
  const primaryHref = data?.primaryHref ?? DEFAULTS.primaryHref;
  const whatsappUrl = data?.whatsappUrl ?? DEFAULTS.whatsappUrl;
  const imageUrl = resolveImageUrl(data?.backgroundImage);
  const contactAddress = data?.contactAddress ?? DEFAULTS.contactAddress;
  const contactPhone = data?.contactPhone ?? DEFAULTS.contactPhone;
  const contactEmail = data?.contactEmail ?? DEFAULTS.contactEmail;

  const rawCards = data?.actionCards?.length
    ? data.actionCards
    : DEFAULT_ACTION_CARDS;
  const cards = rawCards.map((card) => ({
    IconComponent: ICON_MAP[card.icon] ?? PhoneIcon,
    label: card.label,
    sublabel: card.sublabel ?? "",
    bg: card.bgColor ?? "#2887C1",
    href: card.useWhatsappUrl ? whatsappUrl : (card.href ?? "#"),
  }));

  return (
    <section
      id="contact"
      className="py-16 px-6"
      aria-label="Contact call to action"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="rounded-3xl overflow-hidden relative"
        >
          {/* Background */}
          <Image
            src={imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 1280px"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(40, 135, 193, 0.82)" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, rgba(40,135,193,0.35) 0%, transparent 65%)",
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 px-8 sm:px-12 py-14">
            {/* Left: Contact info */}
            <motion.div
              variants={itemVariants}
              className="flex-1 flex flex-col justify-center"
            >
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-navy mb-4 pb-2 border-b-2 border-navy w-fit">
                {subtext}
              </span>

              <h2 className="font-open-sans text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                {heading}
              </h2>

              <div className="flex flex-col gap-3 text-white/70 text-sm">
                <div className="flex items-start gap-2">
                  <MapPinIcon />
                  <span style={{ whiteSpace: "pre-line" }}>
                    {contactAddress}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneIcon />
                  <span>T. {contactPhone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon />
                  <span>{contactEmail}</span>
                </div>
              </div>

              <a
                href={primaryHref}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0a2846] font-semibold text-sm hover:bg-white/90 transition-all shadow-lg w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                {primaryLabel}
              </a>
            </motion.div>

            {/* Right: Action cards */}
            <div className="flex-1 grid grid-cols-2 gap-4 content-center">
              {cards.map((card) => (
                <motion.a
                  key={card.label}
                  href={card.href}
                  target={card.href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    card.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  variants={itemVariants}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex flex-col items-center justify-center gap-2 rounded-2xl p-6 text-white text-center cursor-pointer transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  style={{ backgroundColor: card.bg }}
                  aria-label={card.label}
                >
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-1">
                    <card.IconComponent />
                  </div>
                  <span className="font-semibold text-sm leading-tight">
                    {card.label}
                  </span>
                  <span className="text-white/80 text-xs">{card.sublabel}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
