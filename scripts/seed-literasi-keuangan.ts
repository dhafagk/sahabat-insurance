import { getPayload } from "payload";
import config from "../payload.config";

const BASE_URL = "https://www.sahabatinsurance.id/files/financial-literacy";

function pdf(name: string, file: string) {
  return { name, type: "pdf" as const, href: `${BASE_URL}/${file}` };
}

const sections = [
  {
    category: "Literasi Keuangan",
    title: "Materi Literasi Keuangan Semester 1 2026",
    items: [
      pdf("Materi Literasi Keuangan Semester 1 2026", "20260120115731.pdf"),
    ],
  },
  {
    category: "Literasi Keuangan",
    title: "IG LIve Manfaat Asuransi Saat Bencana Alam",
    items: [
      pdf("IG LIve Manfaat Asuransi Saat Bencana Alam", "20251110132820.pdf"),
    ],
  },
  {
    category: "Literasi Keuangan",
    title: "IG LIve Asuransi Bencana Alam",
    items: [pdf("IG LIve Asuransi Bencana Alam", "20251110132408.pdf")],
  },
  {
    category: "Literasi Keuangan",
    title: "Sahabat Insurance Goes to School",
    items: [pdf("Sahabat Insurance Goes to School", "20251110115114.pdf")],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "unduhan",
    where: { slug: { equals: "financial-literacy" } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log("Record already exists, updating...");
    await payload.update({
      collection: "unduhan",
      id: existing.docs[0].id,
      data: {
        title: "Literasi Keuangan",
        status: "published",
        sections,
      },
    });
  } else {
    await payload.create({
      collection: "unduhan",
      data: {
        title: "Literasi Keuangan",
        slug: "financial-literacy",
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
