import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import VisiMisiContent from "./VisiMisiContent";
import { getLocale } from "../lib/locale";
import type { ValueItem, MisiItem } from "./VisiMisiContent";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPayloadInstance = cache(async () => getPayload({ config }) as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchData = cache(async (locale: string): Promise<any> => {
  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: "visi-misi", depth: 1, locale });
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = await fetchData(locale);
  return {
    title: `${data?.pageTitle ?? "Visi Dan Misi"} | Sahabat Insurance`,
    description: data?.pageSubtitle ?? undefined,
  };
}

const DEFAULT_VISI_CONTENT =
  "Menjadi perusahaan asuransi umum yang terpercaya, berdaya saing tinggi, dan memberikan manfaat optimal kepada seluruh pemangku kepentingan.";

const DEFAULT_MISI_ITEMS: MisiItem[] = [
  { text: "Offering the best general insurance policies and services." },
  { text: "Providing sustainable and profitable business performances." },
  {
    text: "Maintaining work ethics and good corporate governance, compliance with applicable laws and regulations, risk-based and highly integrated management.",
  },
  {
    text: "Developing human resources who are competent, ethical, and highly dedicated workforce.",
  },
];

const DEFAULT_VALUES: ValueItem[] = [
  {
    letter: "S",
    title: "Secure",
    description: "Providing protection and security for our clients' assets",
  },
  {
    letter: "A",
    title: "Accomplishment",
    description: "Delivering results that exceed expectations consistently",
  },
  {
    letter: "H",
    title: "Harmony",
    description: "Cultivating a harmonious working environment",
  },
  {
    letter: "A",
    title: "Assurance",
    description: "Giving confidence and certainty in every service",
  },
  {
    letter: "B",
    title: "Balance",
    description: "A foundation for fair decisions and sustainable growth",
  },
  {
    letter: "A",
    title: "Adaptability",
    description: "Staying agile and responsive to changing needs",
  },
  {
    letter: "T",
    title: "Trustworthy",
    description: "Building trust through integrity and transparency",
  },
];

export default async function VisiMisiPage() {
  const locale = await getLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any = await fetchData(locale);

  const pageTitle: string = raw?.pageTitle ?? "Visi Dan Misi";
  const pageSubtitle: string =
    raw?.pageSubtitle ??
    "Komitmen kami untuk memberikan layanan asuransi terbaik";
  const featuredImageUrl: string =
    typeof raw?.featuredImage === "object" && raw.featuredImage?.url
      ? raw.featuredImage.url
      : "/assets/2.png";

  const visiTitle: string = raw?.visi?.title ?? "Visi";
  const visiContent: string = raw?.visi?.content ?? DEFAULT_VISI_CONTENT;
  const misiTitle: string = raw?.misi?.title ?? "Misi";

  const misiItems: MisiItem[] =
    Array.isArray(raw?.misi?.items) && raw.misi.items.length > 0
      ? raw.misi.items.map((i: { text: string }) => ({ text: i.text }))
      : DEFAULT_MISI_ITEMS;

  const valuesTitle: string = raw?.valuesTitle ?? "Nilai-Nilai Perusahaan";
  const valuesSubtitle: string = raw?.valuesSubtitle ?? "Sahabat Insurance";

  const values: ValueItem[] =
    Array.isArray(raw?.values) && raw.values.length > 0
      ? raw.values.map((v: ValueItem) => ({
          letter: v.letter,
          title: v.title,
          description: v.description ?? null,
        }))
      : DEFAULT_VALUES;

  return (
    <>
      <Navbar />

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div
        className="relative pt-28 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0F172A 0%, #2887C1 60%, #1E293B 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{
            background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <nav
            className="flex items-center gap-1.5 text-xs text-white/50 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">
              Beranda
            </Link>
            <span>›</span>
            <span className="text-white/80">Vision &amp; Mission</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <p className="text-slate-400 text-base max-w-xl leading-relaxed">
              {pageSubtitle}
            </p>
          )}
        </div>
      </div>

      <main className="bg-bg min-h-screen">
        <VisiMisiContent
          featuredImageUrl={featuredImageUrl}
          visiTitle={visiTitle}
          visiContent={visiContent}
          misiTitle={misiTitle}
          misiItems={misiItems}
          valuesTitle={valuesTitle}
          valuesSubtitle={valuesSubtitle}
          values={values}
        />
        <div className="py-8" />
      </main>
    </>
  );
}
