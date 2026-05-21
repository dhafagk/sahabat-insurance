import { getPayload } from "payload";
import config from "../payload.config";

const BASE_URL = "https://www.sahabatinsurance.id/files/awards";

function pdf(name: string, file: string) {
  return { name, type: "pdf" as const, href: `${BASE_URL}/${file}` };
}

const sections = [
  {
    category: "Awards",
    title: "Indonesia Financial Top Leader Awards 2026",
    items: [
      pdf("Indonesia Financial Top Leader Awards 2026", "20260430090624.pdf"),
    ],
  },
  {
    category: "Awards",
    title: "Fitch Ratings",
    items: [pdf("Fitch Ratings", "20260402092131.pdf")],
  },
  {
    category: "Awards",
    title: "The Finance 2025",
    items: [pdf("The Finance 2025", "20251028212321.pdf")],
  },
  {
    category: "Awards",
    title: "Indonesia Best Insurance Awards 2025",
    items: [pdf("Indonesia Best Insurance Awards 2025", "20250828102536.pdf")],
  },
  {
    category: "Awards",
    title: "The Excellent Performance General Insurance Company 2025",
    items: [
      pdf(
        "The Excellent Performance General Insurance Company 2025",
        "20250802184805.pdf",
      ),
    ],
  },
  {
    category: "Awards",
    title:
      "Golden Champion - General Insurance with Consistent Excellent Performance For 5 Consecutive Years",
    items: [
      pdf(
        "Golden Champion - General Insurance with Consistent Excellent Performance For 5 Consecutive Years",
        "20250802183913.pdf",
      ),
    ],
  },
  {
    category: "Awards",
    title: "Pefindo Rating",
    items: [pdf("Pefindo Rating", "20250604131453.pdf")],
  },
  {
    category: "Awards",
    title: "CEO Excellence Awards 2024",
    items: [pdf("CEO Excellence Awards 2024", "20241230095020.pdf")],
  },
  {
    category: "Awards",
    title: "Indonesia Best Insurance Awards 2024",
    items: [pdf("Indonesia Best Insurance Awards 2024", "20241101171530.pdf")],
  },
  {
    category: "Awards",
    title: "The Finance Award 2024",
    items: [pdf("The Finance Award 2024", "20241022191733.pdf")],
  },
  {
    category: "Awards",
    title: "Media Asuransi - Insurance Awards 2024",
    items: [
      pdf("Media Asuransi - Insurance Awards 2024", "20241007110219.pdf"),
    ],
  },
  {
    category: "Awards",
    title: "Infobank 25th Insurance Awards 2024",
    items: [pdf("Infobank 25th Insurance Awards 2024", "20240730102125.pdf")],
  },
  {
    category: "Awards",
    title: "Pefindo Ratings 2022-2023",
    items: [pdf("Pefindo Ratings 2022-2023", "20240426084046.pdf")],
  },
  {
    category: "Awards",
    title: "Pefindo Ratings 2023-2024",
    items: [pdf("Pefindo Ratings 2023-2024", "20240424095218.pdf")],
  },
  {
    category: "Awards",
    title: "The Finance Awards",
    items: [pdf("The Finance Awards", "20231127161905.pdf")],
  },
  {
    category: "Awards",
    title: "Infobank 24th Insurance Awards 2023",
    items: [pdf("Infobank 24th Insurance Awards 2023", "20231127151649.pdf")],
  },
  {
    category: "Awards",
    title: "Infobank 23rd Insurance Awards 2022",
    items: [pdf("Infobank 23rd Insurance Awards 2022", "20231127150548.pdf")],
  },
  {
    category: "Awards",
    title: "Infobank 22nd Insurance Awards 2021",
    items: [pdf("Infobank 22nd Insurance Awards 2021", "20220729140838.pdf")],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "unduhan",
    where: { slug: { equals: "awards" } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log("Record already exists, updating...");
    await payload.update({
      collection: "unduhan",
      id: existing.docs[0].id,
      data: {
        title: "Penghargaan",
        status: "published",
        sections,
      },
    });
  } else {
    await payload.create({
      collection: "unduhan",
      data: {
        title: "Penghargaan",
        slug: "awards",
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
