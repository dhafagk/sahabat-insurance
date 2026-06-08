import { cache } from "react";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Phone } from "lucide-react";
import Navbar from "../../components/Navbar";
import { getLocale } from "../../lib/locale";
import type { ProductItem } from "../../components/Products";

export const dynamic = "force-dynamic";

function toProductSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const fetchProducts = cache(async (locale: string): Promise<ProductItem[]> => {
  try {
    const payload = await getPayload({ config });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = payload as any;
    const result = await p.find({
      collection: "products",
      sort: "order",
      limit: 100,
      locale,
    });
    return result.docs as ProductItem[];
  } catch {
    return [];
  }
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const products = await fetchProducts(locale);
  const product = products.find((p) => toProductSlug(p.title) === slug);
  if (!product) return {};
  return {
    title: `${product.title} | Sahabat Insurance`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const products = await fetchProducts(locale);
  const product = products.find((p) => toProductSlug(p.title) === slug);

  if (!product) notFound();

  const riplayHref = product.riplay?.url ?? (product.riplay?.file as { url?: string | null } | null)?.url ?? null;
  const sppaHref = product.sppa?.url ?? (product.sppa?.file as { url?: string | null } | null)?.url ?? null;

  return (
    <>
      <Navbar />

      {/* Header — mirrors ProductModal header */}
      <div className="relative pt-28 pb-24 bg-gradient-to-br from-navy to-navy/80 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 pointer-events-none" />

        {/* Wave — same as ProductModal */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 400 32"
            preserveAspectRatio="none"
            className="w-full h-10"
          >
            <path d="M0,32 C80,0 320,0 400,32 L400,32 L0,32 Z" fill="#f8f9fc" />
          </svg>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center">
          {/* Breadcrumb */}
          <nav
            className="flex items-center justify-center gap-1.5 text-xs text-white/50 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">
              Beranda
            </Link>
            <span>›</span>
            <Link
              href="/products"
              className="hover:text-white/80 transition-colors"
            >
              Produk
            </Link>
            <span>›</span>
            <span className="text-white/80">{product.title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {product.title}
          </h1>
        </div>
      </div>

      {/* Floating icon — straddles header/body, mirrors ProductModal */}
      <div className="flex justify-center -mt-14 mb-2 relative z-10">
        <div className="w-28 h-28 rounded-3xl bg-white shadow-lg border border-slate-100 flex items-center justify-center overflow-hidden">
          {product.icon?.url ? (
            <div className="w-20 h-20 relative">
              <Image
                src={product.icon.url}
                alt={product.icon.alt ?? product.title}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
          ) : (
            <svg
              width="40"
              height="40"
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
          )}
        </div>
      </div>

      {/* Body */}
      <main className="bg-bg">
        <div className="max-w-2xl mx-auto px-6 pt-6 pb-16">
          {/* Description */}
          <p className="text-text-muted leading-relaxed text-center text-base mb-10">
            {product.description}
          </p>

          {/* Action buttons — same style as ProductModal footer */}
          <div className="flex gap-3">
            {riplayHref ? (
              <a
                href={riplayHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-navy text-navy text-base font-bold hover:bg-navy/5 transition-colors"
              >
                <ArrowRight size={18} />
                Riplay
              </a>
            ) : (
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-slate-200 text-slate-400 text-base font-bold cursor-not-allowed"
              >
                <ArrowRight size={18} />
                Riplay
              </button>
            )}
            {sppaHref ? (
              <a
                href={sppaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-navy text-white text-base font-bold hover:bg-navy/90 transition-colors"
              >
                <Download size={18} />
                Download SPPA
              </a>
            ) : (
              <button
                disabled
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-100 text-slate-400 text-base font-bold cursor-not-allowed"
              >
                <Download size={18} />
                Download SPPA
              </button>
            )}
          </div>

          {/* Contact CTA */}
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-navy/5 to-navy/10 border border-navy/10 p-6 text-center">
            <p className="text-sm text-text-muted mb-4">
              Butuh informasi lebih lanjut tentang produk ini?
            </p>
            <a
              href="tel:02150508080"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition-colors"
            >
              <Phone size={15} />
              Hubungi Kami
            </a>
          </div>
        </div>
      </main>

    </>
  );
}
