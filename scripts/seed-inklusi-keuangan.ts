import { getPayload } from "payload";
import config from "../payload.config";

const BASE_URL = "https://www.sahabatinsurance.id/files/financial-inclusion";

function pdf(name: string, file: string) {
  return { name, type: "pdf" as const, href: `${BASE_URL}/${file}` };
}

const sections = [
  {
    category: "Inklusi Keuangan",
    title: "FIN EXPO 2025 Purwokerto",
    items: [pdf("FIN EXPO 2025 Purwokerto", "20251117081912.pdf")],
  },
  {
    category: "Inklusi Keuangan",
    title: "Opening FIN EXPO 2025",
    items: [pdf("Opening FIN EXPO 2025", "20251117081839.pdf")],
  },
  {
    category: "Inklusi Keuangan",
    title: "Pameran Bersama Mitra Bisnis 2025",
    items: [pdf("Pameran Bersama Mitra Bisnis 2025", "20251117081803.pdf")],
  },
  {
    category: "Inklusi Keuangan",
    title: "Fin Expo 2024",
    // source URL has no filename — preserving the directory link as-is
    items: [{ name: "Fin Expo 2024", type: "pdf" as const, href: BASE_URL }],
  },
  {
    category: "Inklusi Keuangan",
    title: "Pembukaan Kantor Perwakilan Sahabat Insurance Alam Sutera 2024",
    items: [
      pdf(
        "Pembukaan Kantor Perwakilan Sahabat Insurance Alam Sutera 2024",
        "20251112141759.pdf",
      ),
    ],
  },
  {
    category: "Inklusi Keuangan",
    title: "Pameran Keuangan Rakyat 2023",
    items: [pdf("Pameran Keuangan Rakyat 2023", "20251112141404.pdf")],
  },
  {
    category: "Inklusi Keuangan",
    title: "Pameran PERIKLINDO bersama MTF 2023",
    items: [pdf("Pameran PERIKLINDO bersama MTF 2023", "20251112140451.pdf")],
  },
  {
    category: "Inklusi Keuangan",
    title: "Pembukaan Kantor Sahabat Insurance Banjarmasin 2023",
    items: [
      pdf(
        "Pembukaan Kantor Sahabat Insurance Banjarmasin 2023",
        "20251112140239.pdf",
      ),
    ],
  },
  {
    category: "Inklusi Keuangan",
    title: "Pembukaan Kantor Sahabat Insurance Jambi 2022",
    items: [
      pdf(
        "Pembukaan Kantor Sahabat Insurance Jambi 2022",
        "20251112135910.pdf",
      ),
    ],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "unduhan",
    where: { slug: { equals: "financial-inclusion" } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log("Record already exists, updating...");
    await payload.update({
      collection: "unduhan",
      id: existing.docs[0].id,
      data: {
        title: "Inklusi Keuangan",
        status: "published",
        sections,
      },
    });
  } else {
    await payload.create({
      collection: "unduhan",
      data: {
        title: "Inklusi Keuangan",
        slug: "financial-inclusion",
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
