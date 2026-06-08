import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import ManajemenContent from "./ManajemenContent";
import { getLocale } from "../lib/locale";
import type {
  HighlightItem,
  BoardMember,
  TataKelolaColumn,
} from "./ManajemenContent";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPayloadInstance = cache(async () => getPayload({ config }) as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchData = cache(async (locale: string): Promise<any> => {
  const payload = await getPayloadInstance();
  return payload.findGlobal({ slug: "manajemen", depth: 1, locale });
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = await fetchData(locale);
  return {
    title: `${data?.pageTitle ?? "Manajemen"} | Sahabat Insurance`,
    description: data?.pageSubtitle ?? undefined,
  };
}

const DEFAULT_HIGHLIGHTS: HighlightItem[] = [
  {
    icon: "TrendingUp",
    title: "Menghasilkan keuntungan bagi tim profesional",
    description:
      "Kami berkomitmen untuk memberikan nilai terbaik melalui kepemimpinan yang berpengalaman dan strategi bisnis yang solid.",
  },
  {
    icon: "Star",
    title: "Ciptakan semangat",
    description:
      "Mendorong inovasi dan semangat kerja tim yang tinggi untuk mencapai tujuan bersama secara berkelanjutan.",
  },
  {
    icon: "Users",
    title: "Pemberdayaan karyawan",
    description:
      "Investasi pada sumber daya manusia yang kompeten, etis, dan berdedikasi tinggi sebagai aset utama perusahaan.",
  },
];

const DEFAULT_COMMISSIONERS: BoardMember[] = [
  { name: "Retno Yuwansari", position: "President Commissioner", photo: null },
  { name: "Diana Hendarno", position: "Commissioner", photo: null },
  { name: "Cut Mariska", position: "Independent Commissioner", photo: null },
];

const DEFAULT_DIRECTORS: BoardMember[] = [
  { name: "Leonard Berty Wanrau", position: "President Director", photo: null },
  { name: "Sekar Tunggal", position: "Technical Director", photo: null },
  { name: "Iythy Setiawan", position: "Marketing Director", photo: null },
];

const DEFAULT_TATA_KELOLA_COLUMNS: TataKelolaColumn[] = [
  {
    content:
      "Sahabat Insurance memegang teguh komitmen terhadap penerapan Good Corporate Governance dengan mengembangkan prinsip-prinsip pokok sebagai berikut: keterbukaan (transparency), akuntabilitas (accountability), tanggung jawab (responsibility), kemandirian (independency), kewajaran dan kesetaraan (fairness).",
  },
  {
    content:
      "Penerapan Good Corporate Governance Sahabat Insurance antara lain: penyampaian laporan keuangan & ongoing; Direksi dan Dewan Komisaris; management & control risiko; internal & external audit & assurance; pengelolaan benturan kepentingan; Remunerasi Direksi & Dewan Komisaris; Rencana Bisnis; Pengelolaan dan Kepatuhan; sistem manajemen anti penyuapan; dan lain-lain.",
  },
  {
    content:
      "Sahabat Insurance mengimplementasikan whistleblowing system dengan menyediakan saluran pengaduan melalui media email yang telah tersedia yang dapat dipergunakan oleh seluruh karyawan & rekan bisnis.",
  },
];

export default async function ManajemenPage() {
  const locale = await getLocale();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any = await fetchData(locale);

  const pageTitle: string = raw?.pageTitle ?? "Manajemen";
  const pageSubtitle: string =
    raw?.pageSubtitle ??
    "Dipimpin oleh para profesional berpengalaman yang berkomitmen pada keunggulan";

  const highlights: HighlightItem[] =
    Array.isArray(raw?.highlights) && raw.highlights.length > 0
      ? raw.highlights.map((h: HighlightItem) => ({
          icon: h.icon ?? "Star",
          title: h.title,
          description: h.description ?? null,
        }))
      : DEFAULT_HIGHLIGHTS;

  const bocTitle: string =
    raw?.boardOfCommissioners?.title ?? "Board of Commissioners";
  const bocMembers: BoardMember[] =
    Array.isArray(raw?.boardOfCommissioners?.members) &&
    raw.boardOfCommissioners.members.length > 0
      ? raw.boardOfCommissioners.members.map((m: BoardMember) => ({
          name: m.name,
          position: m.position,
          photo: m.photo ?? null,
        }))
      : DEFAULT_COMMISSIONERS;

  const bodTitle: string = raw?.boardOfDirectors?.title ?? "Board Of Directors";
  const bodMembers: BoardMember[] =
    Array.isArray(raw?.boardOfDirectors?.members) &&
    raw.boardOfDirectors.members.length > 0
      ? raw.boardOfDirectors.members.map((m: BoardMember) => ({
          name: m.name,
          position: m.position,
          photo: m.photo ?? null,
        }))
      : DEFAULT_DIRECTORS;

  const tataTitle: string = raw?.tataKelola?.title ?? "Tata Kelola";
  const tataSubtitle: string =
    raw?.tataKelola?.subtitle ?? "Good Corporate Governance";
  const tataColumns: TataKelolaColumn[] =
    Array.isArray(raw?.tataKelola?.columns) && raw.tataKelola.columns.length > 0
      ? raw.tataKelola.columns.map((c: TataKelolaColumn) => ({
          content: c.content,
        }))
      : DEFAULT_TATA_KELOLA_COLUMNS;

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
        <div className="relative max-w-7xl mx-auto px-6">
          <nav
            className="flex items-center gap-1.5 text-xs text-white/50 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">
              Beranda
            </Link>
            <span>›</span>
            <span className="text-white/80">Management</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-3">
            {pageTitle}
          </h1>
          {pageSubtitle && (
            <p className="text-slate-400 text-base max-w-xl leading-relaxed">
              {pageSubtitle}
            </p>
          )}
        </div>
      </div>

      <main className="bg-white min-h-screen">
        <div>
          <ManajemenContent
            highlights={highlights}
            boardOfCommissioners={{ title: bocTitle, members: bocMembers }}
            boardOfDirectors={{ title: bodTitle, members: bodMembers }}
            tataKelola={{
              title: tataTitle,
              subtitle: tataSubtitle,
              columns: tataColumns,
            }}
          />
        </div>
        <div className="py-8" />
      </main>
    </>
  );
}
