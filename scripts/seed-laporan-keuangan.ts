import { getPayload } from "payload";
import config from "../payload.config";

const BASE_URL = "https://www.sahabatinsurance.id/files/financial";

function pdf(name: string, file: string) {
  return { name, type: "pdf" as const, href: `${BASE_URL}/${file}` };
}

const sections = [
  {
    category: "Financial",
    title: "Tahun 2026",
    items: [
      pdf("Laporan Keuangan Januari 2026", "20260210165219.pdf"),
      pdf("Laporan Keuangan Februari 2026", "20260310175533.pdf"),
      pdf("Laporan Keuangan Maret 2026", "20260415091432.pdf"),
      pdf("Laporan Keuangan April 2026", "20260510065900.pdf"),
    ],
  },
  {
    category: "Financial",
    title: "Tahun 2025",
    items: [
      pdf("Laporan Keuangan Januari 2025", "20250821095428.pdf"),
      pdf("Laporan Keuangan Februari 2025", "20250821095443.pdf"),
      pdf("Laporan Keuangan Maret 2025", "20250821095805.pdf"),
      pdf("Laporan Keuangan April 2025", "20250821095821.pdf"),
      pdf("Laporan Keuangan Mei 2025", "20250821095837.pdf"),
      pdf("Laporan Keuangan Juni 2025", "20250821095855.pdf"),
      pdf("Laporan Keuangan Juli 2025", "20250821102354.pdf"),
      pdf("Laporan Keuangan Agustus 2025", "20251011164553.pdf"),
      pdf("Laporan Keuangan September 2025", "20251011190811.pdf"),
      pdf("Laporan Keuangan Oktober 2025", "20251110162239.pdf"),
      pdf("Laporan Keuangan November 2025", "20251210174637.pdf"),
      pdf("Laporan Keuangan Desember 2025", "20260113094000.pdf"),
    ],
  },
  {
    category: "Financial",
    title: "Tahun 2024",
    items: [
      pdf("Laporan Keuangan Januari 2024", "20240212150954.pdf"),
      pdf("Laporan Keuangan Februari 2024", "20240313161758.pdf"),
      pdf("Laporan Keuangan Maret 2024", "20240418105655.pdf"),
      pdf("Laporan Keuangan April 2024", "20240513142922.pdf"),
      pdf("Laporan Keuangan Mei 2024", "20240610161308.pdf"),
      pdf("Laporan Keuangan Juni 2024", "20240710175137.pdf"),
      pdf("Laporan Keuangan Juli 2024", "20240828143953.pdf"),
      pdf("Laporan Keuangan Agustus 2024", "20240910163232.pdf"),
      pdf("Laporan Keuangan September 2024", "20241112102749.pdf"),
      pdf("Laporan Keuangan Oktober 2024", "20241112102909.pdf"),
      pdf("Laporan Keuangan November 2024", "20241210174557.pdf"),
      pdf("Laporan Keuangan Desember 2024", "20250110143607.pdf"),
      pdf("Laporan Keuangan Tahunan Audited 2024", "20250429170958.pdf"),
    ],
  },
  {
    category: "Financial",
    title: "Tahun 2023",
    items: [
      pdf("Laporan Keuangan Triwulan 1 2023", "20230517094126.pdf"),
      pdf("Laporan Keuangan Triwulan 2 2023", "20230801201638.pdf"),
      pdf("Laporan Keuangan April 2023", "20231017152355.pdf"),
      pdf("Laporan Keuangan Mei 2023", "20231017152418.pdf"),
      pdf("Laporan Keuangan Juni 2023", "20231017150322.pdf"),
      pdf("Laporan Keuangan Juli 2023", "20231017151116.pdf"),
      pdf("Laporan Keuangan Agustus 2023", "20231017151909.pdf"),
      pdf("Laporan Keuangan September 2023", "20231017151942.pdf"),
      pdf("Laporan Keuangan Oktober 2023", "20231110141249.pdf"),
      pdf("Laporan Keuangan November 2023", "20231211171412.pdf"),
      pdf("Laporan Keuangan Desember 2023", "20240110170028.pdf"),
      pdf(
        "Laporan Keuangan per 31 Desember 2023 (Audited)",
        "20240429090538.pdf",
      ),
    ],
  },
  {
    category: "Financial",
    title: "Tahun 2022",
    items: [
      pdf("Laporan Keuangan Triwulan 1 2022", "20220614150220.pdf"),
      pdf("Laporan Keuangan Triwulan 2 2022", "20220802175135.pdf"),
      pdf("Laporan Keuangan Triwulan 3 2022", "20221108110110.pdf"),
      pdf("Laporan Keuangan Triwulan 4 2022", "20230214094813.pdf"),
      pdf("Laporan Keuangan 2022 Audited", "20230531112850.pdf"),
    ],
  },
  {
    category: "Financial",
    title: "Tahun 2021",
    items: [
      pdf("Laporan Keuangan Triwulan 1 2021", "20220106104741.pdf"),
      pdf("Laporan Keuangan Triwulan 2 2021", "20220106104753.pdf"),
      pdf("Laporan Keuangan Triwulan 3 2021", "20220106104807.pdf"),
      pdf("Laporan Keuangan Triwulan 4 2021", "20220214102626.pdf"),
      pdf("Laporan Keuangan 2021 Audited", "20220531100807.pdf"),
    ],
  },
  {
    category: "Financial",
    title: "Tahun 2020",
    items: [pdf("Laporan Keuangan 2020 Audited", "20211102094934.pdf")],
  },
  {
    category: "Financial",
    title: "Tahun 2019",
    items: [
      pdf("Laporan Keuangan 2019 Audited", "financial-report-2019-audited.pdf"),
    ],
  },
  {
    category: "Financial",
    title: "Tahun 2018",
    items: [pdf("Laporan Keuangan 2018 Audited", "20211102094907.pdf")],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "unduhan",
    where: { slug: { equals: "financial" } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log("Record already exists, updating...");
    await payload.update({
      collection: "unduhan",
      id: existing.docs[0].id,
      data: {
        title: "Laporan Keuangan",
        status: "published",
        sections,
      },
    });
  } else {
    await payload.create({
      collection: "unduhan",
      data: {
        title: "Laporan Keuangan",
        slug: "laporan-keuangan",
        status: "published",
        sections,
      },
    });
  }

  console.log("Done.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
