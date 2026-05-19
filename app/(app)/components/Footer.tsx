import Image from "next/image";
import Link from "next/link";

// ── Block types ────────────────────────────────────────────────────────────────

type IconName =
  | "none"
  | "car"
  | "home"
  | "shield"
  | "plane"
  | "star"
  | "check"
  | "arrowRight"
  | "phone"
  | "mail"
  | "mapPin"
  | "file";

interface LinkItem {
  label: string;
  href: string;
  icon?: IconName;
  id?: string;
}

interface LinkListBlock {
  blockType: "linkList";
  id?: string;
  links?: LinkItem[];
}

interface ContactItem {
  type: "phone" | "email" | "address" | "whatsapp";
  value: string;
  displayText?: string;
  id?: string;
}

interface ContactInfoBlock {
  blockType: "contactInfo";
  id?: string;
  companyName?: string;
  subheading?: string;
  items?: ContactItem[];
}

interface TextContentBlock {
  blockType: "textContent";
  id?: string;
  content?: string;
}

interface MediaValue {
  url?: string;
  alt?: string;
}

interface ImageContentBlock {
  blockType: "imageContent";
  id?: string;
  image?: MediaValue | string;
  href?: string;
  width?: number;
  height?: number;
}

interface BadgeBlock {
  blockType: "badge";
  id?: string;
  line1?: string;
  line2?: string;
  accentLine?: "none" | "line1" | "line2";
}

type ContentBlock =
  | LinkListBlock
  | ContactInfoBlock
  | TextContentBlock
  | ImageContentBlock
  | BadgeBlock;

// ── Footer column / lower footer types ────────────────────────────────────────

interface FooterColumn {
  id?: string;
  title?: string;
  content?: ContentBlock[];
}

interface LowerFooterLink {
  id?: string;
  label: string;
  href: string;
}

interface SocialLink {
  id?: string;
  platform:
    | "facebook"
    | "twitter"
    | "instagram"
    | "linkedin"
    | "youtube"
    | "tiktok";
  href: string;
}

interface LowerFooter {
  links?: LowerFooterLink[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
}

export interface FooterData {
  upperColumns?: FooterColumn[];
  lowerFooter?: LowerFooter;
}

// ── Defaults ───────────────────────────────────────────────────────────────────

const DEFAULT_FOOTER: FooterData = {
  upperColumns: [
    {
      title: "",
      content: [
        {
          blockType: "imageContent",
          image: { url: "/logo-white.png", alt: "Sahabat Insurance" },
          href: "/",
          width: 180,
          height: 52,
        },
        {
          blockType: "textContent",
          content: "Berizin dan Diawasi\noleh Otoritas Jasa\nKeuangan",
        },
        {
          blockType: "badge",
          line1: "Pahami & Miliki",
          line2: "Asuransi",
          accentLine: "line2",
        },
      ],
    },
    {
      title: "Profil Sahabat",
      content: [
        {
          blockType: "linkList",
          links: [
            { label: "Sejarah", href: "#about" },
            { label: "Visi Dan Misi", href: "#about" },
            { label: "Manajemen", href: "#about" },
            { label: "Laporan Keuangan", href: "#about" },
            { label: "Struktur Organisasi", href: "#about" },
            { label: "Penghargaan", href: "#about" },
            { label: "Tata Kelola Perusahaan", href: "#about" },
            { label: "Literasi Keuangan", href: "#about" },
            { label: "Inklusi Keuangan", href: "#about" },
            { label: "CSR", href: "#about" },
          ],
        },
      ],
    },
    {
      title: "Produk Terbaru",
      content: [
        {
          blockType: "linkList",
          links: [
            { label: "Motor Vehicle Insurance", href: "#products" },
            { label: "Property All Risk Insurance", href: "#products" },
            { label: "Personal Accident Insurance", href: "#products" },
            { label: "ANANDA (Travel Insurance)", href: "#products" },
            { label: "Marine Cargo Insurance", href: "#products" },
            { label: "Money Insurance", href: "#products" },
            { label: "Fire Insurance", href: "#products" },
            { label: "Marine Hull Insurance", href: "#products" },
            {
              label: "Contractors' Plant and Machinery Insurance",
              href: "#products",
            },
            { label: "Contractor's All Risk Insurance", href: "#products" },
          ],
        },
      ],
    },
    {
      title: "Kontak Layanan",
      content: [
        {
          blockType: "contactInfo",
          companyName: "PT Asuransi Sahabat Artha Proteksi",
          subheading: "Pengaduan Konsumen",
          items: [
            {
              type: "phone",
              value: "tel:02150508080",
              displayText: "(021) 5050 8080",
            },
            {
              type: "address",
              value:
                "Jl. Danau Sunter Utara Blok B 36A Kav. 16-17 Sunter Jakarta 14350",
            },
            {
              type: "email",
              value: "mailto:contact@sahabatinsurance.id",
              displayText: "contact@sahabatinsurance.id",
            },
          ],
        },
      ],
    },
    {
      title: "",
      content: [
        {
          blockType: "textContent",
          content:
            "Direktorat Jenderal\nPerlindungan Konsumen\ndan Tertib Niaga\nKementerian\nPerdagangan Republik\nIndonesia",
        },
        {
          blockType: "contactInfo",
          items: [
            {
              type: "phone",
              value: "tel:08531111010",
              displayText: "0853 1111 1010",
            },
          ],
        },
      ],
    },
  ],
  lowerFooter: {
    links: [
      { label: "Tentang Kami", href: "#about" },
      { label: "Berita", href: "#news" },
      { label: "Kebijakan Privasi", href: "#privacy" },
    ],
    socialLinks: [
      { platform: "facebook", href: "https://facebook.com" },
      { platform: "twitter", href: "https://twitter.com" },
      { platform: "instagram", href: "https://instagram.com" },
      { platform: "linkedin", href: "https://linkedin.com" },
    ],
    copyrightText:
      "© Hak Cipta 2011–2026 ® sahabatinsurance.id ® Seluruh Hak Cipta Dilindungi.",
  },
};

// ── Small icon set (inline SVG paths) ─────────────────────────────────────────

function BlockIcon({ name }: { name: IconName }) {
  const paths: Record<Exclude<IconName, "none">, string> = {
    car: "M8 10h8m-4-6 1.5 6m-7 0 1.5-6M3 14l1-4h16l1 4M5 14v4h2v-2h10v2h2v-4",
    home: "M3 12l9-9 9 9M5 10v9a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1v-9",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    plane:
      "M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 2.5S18 2 16.5 3.5L13 7 4.8 5.2 3.5 6.5l7 2-1 3-3 1-2-7L3 6.5l8.5 1.3",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    check: "M20 6L9 17l-5-5",
    arrowRight: "M5 12h14M12 5l7 7-7 7",
    phone:
      "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z M22 6l-10 7L2 6",
    mapPin:
      "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 10a3 3 0 100-6 3 3 0 000 6z",
    file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z M14 2v6h6",
  };

  if (name === "none" || !paths[name]) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={13}
      height={13}
      className="text-accent flex-shrink-0 mt-0.5"
      aria-hidden="true"
    >
      {paths[name].split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : `M${d}`} />
      ))}
    </svg>
  );
}

// ── Contact type icon ─────────────────────────────────────────────────────────

function ContactIcon({ type }: { type: ContactItem["type"] }) {
  const map: Record<ContactItem["type"], IconName> = {
    phone: "phone",
    whatsapp: "phone",
    email: "mail",
    address: "mapPin",
  };
  return <BlockIcon name={map[type]} />;
}

// ── Social icons ──────────────────────────────────────────────────────────────

const SOCIAL_ICONS: Record<SocialLink["platform"], () => React.ReactNode> = {
  facebook: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={16}
      height={16}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  twitter: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={16}
      height={16}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.855L1.205 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  ),
  instagram: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={16}
      height={16}
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  linkedin: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={16}
      height={16}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  youtube: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={16}
      height={16}
      aria-hidden="true"
    >
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  tiktok: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={16}
      height={16}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.16 8.16 0 004.77 1.52V6.8a4.85 4.85 0 01-1-.11z" />
    </svg>
  ),
};

// ── Block renderers ───────────────────────────────────────────────────────────

function RenderLinkList({ block }: { block: LinkListBlock }) {
  if (!block.links?.length) return null;
  return (
    <ul className="flex flex-col gap-2">
      {block.links.map((link, i) => (
        <li key={link.id ?? i}>
          <a
            href={link.href}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
          >
            {link.icon && link.icon !== "none" && (
              <BlockIcon name={link.icon} />
            )}
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function RenderContactInfo({ block }: { block: ContactInfoBlock }) {
  return (
    <div className="flex flex-col gap-1">
      {block.subheading && (
        <p className="text-slate-400 text-sm mb-1">{block.subheading}</p>
      )}
      {block.companyName && (
        <p className="text-white text-sm font-medium mb-2">
          {block.companyName}
        </p>
      )}
      <address className="not-italic flex flex-col gap-2.5">
        {block.items?.map((item, i) => {
          const display = item.displayText || item.value;
          const href =
            item.type === "phone" || item.type === "whatsapp"
              ? item.value.startsWith("tel:") || item.value.startsWith("wa:")
                ? item.value
                : `tel:${item.value}`
              : item.type === "email"
                ? item.value.startsWith("mailto:")
                  ? item.value
                  : `mailto:${item.value}`
                : null;

          return (
            <div key={item.id ?? i} className="flex items-start gap-2">
              <ContactIcon type={item.type} />
              {href ? (
                <a
                  href={href}
                  className="text-slate-400 hover:text-white text-sm transition-colors break-all"
                >
                  {display}
                </a>
              ) : (
                <span className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                  {display}
                </span>
              )}
            </div>
          );
        })}
      </address>
    </div>
  );
}

function RenderText({ block }: { block: TextContentBlock }) {
  if (!block.content) return null;
  return (
    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
      {block.content}
    </p>
  );
}

function RenderImage({ block }: { block: ImageContentBlock }) {
  const src = typeof block.image === "object" ? block.image?.url : block.image;
  const alt = typeof block.image === "object" ? (block.image?.alt ?? "") : "";
  if (!src) return null;

  const img = (
    <Image
      src={src}
      alt={alt}
      width={block.width ?? 180}
      height={block.height ?? 52}
      className="object-contain"
    />
  );

  if (block.href) {
    return (
      <Link href={block.href} aria-label={alt || "Image link"}>
        {img}
      </Link>
    );
  }
  return img;
}

function RenderBadge({ block }: { block: BadgeBlock }) {
  if (!block.line1 && !block.line2) return null;
  return (
    <div className="mt-1 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 w-fit">
      <div className="flex flex-col leading-tight">
        {block.line1 && (
          <span
            className={`text-[10px] font-bold uppercase tracking-wide ${
              block.accentLine === "line1" ? "text-accent" : "text-white"
            }`}
          >
            {block.line1}
          </span>
        )}
        {block.line2 && (
          <span
            className={`text-[10px] font-bold uppercase tracking-wide ${
              block.accentLine === "line2" ? "text-accent" : "text-white"
            }`}
          >
            {block.line2}
          </span>
        )}
      </div>
    </div>
  );
}

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.blockType) {
    case "linkList":
      return <RenderLinkList block={block} />;
    case "contactInfo":
      return <RenderContactInfo block={block} />;
    case "textContent":
      return <RenderText block={block} />;
    case "imageContent":
      return <RenderImage block={block} />;
    case "badge":
      return <RenderBadge block={block} />;
    default:
      return null;
  }
}

// ── Main Footer component ─────────────────────────────────────────────────────

import type React from "react";

interface FooterProps {
  data?: FooterData | null;
}

export default function Footer({ data }: FooterProps) {
  const footer = data ?? DEFAULT_FOOTER;
  const upper = footer.upperColumns ?? DEFAULT_FOOTER.upperColumns ?? [];
  const lower = footer.lowerFooter ?? DEFAULT_FOOTER.lowerFooter ?? {};

  return (
    <footer style={{ background: "#0F172A" }} aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-0">
        {/* Upper grid — up to 5 columns */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-10 pb-12 ${
            upper.length <= 3
              ? "lg:grid-cols-3"
              : upper.length === 4
                ? "lg:grid-cols-4"
                : "lg:grid-cols-5"
          }`}
        >
          {upper.map((col, i) => (
            <div key={col.id ?? i} className="flex flex-col gap-4">
              {col.title && (
                <h3 className="text-white font-semibold text-base">
                  {col.title}
                </h3>
              )}
              {col.content?.map((block, j) => (
                <RenderBlock key={block.id ?? j} block={block} />
              ))}
            </div>
          ))}
        </div>

        {/* Lower bar */}
        <div className="border-t border-slate-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Nav links */}
          {lower.links && lower.links.length > 0 && (
            <nav
              aria-label="Footer secondary navigation"
              className="flex items-center gap-1"
            >
              {lower.links.map(({ label, href, id }, i) => (
                <span key={id ?? i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-slate-600">|</span>}
                  <a
                    href={href}
                    className="text-slate-400 hover:text-white text-sm transition-colors px-1"
                  >
                    {label}
                  </a>
                </span>
              ))}
            </nav>
          )}

          {/* Social icons */}
          {lower.socialLinks && lower.socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {lower.socialLinks.map(({ platform, href, id }) => {
                const Icon = SOCIAL_ICONS[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={id ?? platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="w-7 h-7 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 py-4 text-center">
          <p className="text-slate-500 text-sm">
            {lower.copyrightText ?? DEFAULT_FOOTER.lowerFooter?.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
