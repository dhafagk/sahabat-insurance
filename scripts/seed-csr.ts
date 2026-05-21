import { getPayload } from "payload";
import config from "../payload.config";

const BASE_URL = "https://www.sahabatinsurance.id/files/csr";

function pdf(name: string, file: string) {
  return { name, type: "pdf" as const, href: `${BASE_URL}/${file}` };
}

const sections = [
  {
    category: "CSR",
    title: "Aksi Berbagi Kasih Ramadhan Sahabat Insurance Cirebon dan Makassar",
    items: [pdf("Aksi Berbagi Kasih Ramadhan Sahabat Insurance Cirebon dan Makassar", "20260407154308.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Aksi Peduli Banjir Sumatra bersama AAUI",
    items: [pdf("CSR Aksi Peduli Banjir Sumatra bersama AAUI", "20260407151130.pdf")],
  },
  {
    category: "CSR",
    title: "Berbagi Kasih Natal di SOS Children VIllage",
    items: [pdf("Berbagi Kasih Natal di SOS Children VIllage", "20251229100058.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Banjir Sumatra",
    items: [pdf("CSR Banjir Sumatra", "20251229095312.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Banjir Bali Bersama AAUI",
    items: [pdf("CSR Banjir Bali Bersama AAUI", "20251205125254.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Beasiswa Sahabat Insurance 2025",
    items: [pdf("CSR Beasiswa Sahabat Insurance 2025", "20251110164835.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Sahabat Insurance Menanam Mangrove 2024",
    items: [pdf("CSR Sahabat Insurance Menanam Mangrove 2024", "20251110164300.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Beasiswa Sahabat Insurance 2024",
    items: [pdf("CSR Beasiswa Sahabat Insurance 2024", "20251110164240.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Sahabat Insurance Pembuatan Buku 2023",
    items: [pdf("CSR Sahabat Insurance Pembuatan Buku 2023", "20251110163136.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Sahabat Insurance Menanam Mangrove 2023",
    items: [pdf("CSR Sahabat Insurance Menanam Mangrove 2023", "20251110163053.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Sahabat Insurance Peduli Lingkungan 2022",
    items: [pdf("CSR Sahabat Insurance Peduli Lingkungan 2022", "20251110162951.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Sahabat Insurance Peduli Gempa Cianjur 2022",
    items: [pdf("CSR Sahabat Insurance Peduli Gempa Cianjur 2022", "20251110162641.pdf")],
  },
  {
    category: "CSR",
    title: "CSR Mangrove 2022",
    items: [pdf("CSR Mangrove 2022", "20251110162607.pdf")],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "unduhan",
    where: { slug: { equals: "csr" } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log("Record already exists, updating...");
    await payload.update({
      collection: "unduhan",
      id: existing.docs[0].id,
      data: {
        title: "CSR",
        status: "published",
        sections,
      },
    });
  } else {
    await payload.create({
      collection: "unduhan",
      data: {
        title: "CSR",
        slug: "csr",
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
