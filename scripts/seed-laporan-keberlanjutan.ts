import { getPayload } from "payload";
import config from "../payload.config";

const BASE_URL = "https://www.sahabatinsurance.id/files/sustainability";

function pdf(name: string, file: string) {
  return { name, type: "pdf" as const, href: `${BASE_URL}/${file}` };
}

const sections = [
  {
    category: "Sustainability",
    title: "Tahun 2024",
    items: [pdf("Laporan Keuangan Berkelanjutan 2024", "20251120055654.pdf")],
  },
  {
    category: "Sustainability",
    title: "Tahun 2023",
    items: [pdf("Laporan Keuangan Berkelanjutan 2023", "20251120055629.pdf")],
  },
  {
    category: "Sustainability",
    title: "Tahun 2022",
    items: [pdf("Laporan Keuangan Berkelanjutan 2022", "20251120055558.pdf")],
  },
  {
    category: "Sustainability",
    title: "Tahun 2021",
    items: [pdf("Laporan Keuangan Berkelanjutan 2021", "20251119185904.pdf")],
  },
  {
    category: "Sustainability",
    title: "Tahun 2020",
    items: [pdf("Laporan Keuangan Berkelanjutan 2020", "20251119183636.pdf")],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "unduhan",
    where: { slug: { equals: "sustainability" } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log("Record already exists, updating...");
    await payload.update({
      collection: "unduhan",
      id: existing.docs[0].id,
      data: {
        title: "Laporan Keberlanjutan",
        status: "published",
        sections,
      },
    });
  } else {
    await payload.create({
      collection: "unduhan",
      data: {
        title: "Laporan Keberlanjutan",
        slug: "sustainability",
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
