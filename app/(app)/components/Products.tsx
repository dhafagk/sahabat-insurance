"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "../lib/locale";
import { useTranslations } from "../lib/i18n";

interface ProductIcon {
  url?: string | null;
  alt?: string | null;
}

interface ProductFile {
  url?: string | null;
}

interface ProductLinkGroup {
  url?: string | null;
  file?: ProductFile | null;
}

export interface ProductItem {
  id?: string;
  slug?: string | null;
  title: string;
  description: string;
  icon?: ProductIcon | null;
  riplay?: ProductLinkGroup | null;
  sppa?: ProductLinkGroup | null;
}

export interface SectionMeta {
  badge?: string | null;
  heading?: string | null;
}

interface ProductsProps {
  products?: ProductItem[];
  sectionMeta?: SectionMeta | null;
  locale?: Locale;
}

const DEFAULTS: {
  badge: string;
  heading: string;
  products: ProductItem[];
} = {
  badge: "Our Products",
  heading: "Comprehensive Protection for Every Need",
  products: [
    {
      title: "Motor Vehicle",
      description: "Comprehensive coverage for cars and motorcycles",
    },
    {
      title: "Property All Risk",
      description: "Full protection for your home and assets",
    },
    {
      title: "Travel (ANANDA)",
      description: "Safe travels with comprehensive trip coverage",
    },
    {
      title: "Personal Accident",
      description: "Protection for you and your family",
    },
    {
      title: "Marine Cargo",
      description: "Secure your shipments across sea routes",
    },
    {
      title: "Money Insurance",
      description: "Safeguard your cash and valuables",
    },
    {
      title: "Fire Insurance",
      description: "Protection against fire and related perils",
    },
    {
      title: "Contractor's All Risk",
      description: "Coverage for construction projects",
    },
    {
      title: "Marine Hull",
      description: "Protection for vessels and marine equipment",
    },
    {
      title: "Contractors' Plant & Machinery",
      description: "Coverage for construction plant and equipment",
    },
  ],
};

export function toProductSlug(title: string) {
  return title
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function FallbackIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-navy"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export default function Products({ products, sectionMeta, locale = "id" }: ProductsProps) {
  const { products: tr } = useTranslations(locale);
  const badge = sectionMeta?.badge ?? DEFAULTS.badge;
  const heading = sectionMeta?.heading ?? DEFAULTS.heading;
  const items = products?.length ? products : DEFAULTS.products;

  return (
    <section id="products" className="py-24 bg-bg" aria-label="Our products">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
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
          viewport={{ once: false, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {items.map((product, index) => (
            <motion.div
              key={product.id ?? index}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="h-full"
            >
              <Link
                href={`/products/${product.slug ?? toProductSlug(product.title)}`}
                className="flex flex-col h-full bg-card rounded-2xl border border-slate-100 p-6 group transition-all duration-300 hover:border-navy hover:shadow-xl"
              >
                <div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center mb-5 mx-auto bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-navy/5 group-hover:to-navy/10 transition-all duration-300 overflow-hidden"
                  aria-hidden="true"
                >
                  {product.icon?.url ? (
                    <div className="w-16 h-16 relative flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Image
                        src={product.icon.url}
                        alt={product.icon.alt ?? product.title}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                  ) : (
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      <FallbackIcon />
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-text-primary text-base text-center">
                  {product.title}
                </h3>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="text-center text-xs text-text-muted mt-6">
          {tr.termsBadge}
        </p>
      </div>
    </section>
  );
}
