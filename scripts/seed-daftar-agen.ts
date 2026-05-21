import { getPayload } from "payload";
import config from "../payload.config";

function row(...values: string[]) {
  return { cells: values.map((value) => ({ value })) };
}

const tables = [
  {
    category: "Agen",
    title: "Daftar Agent",
    columns: [{ label: "No" }, { label: "Nama" }, { label: "Kota" }],
    rows: [
      row("1", "NASRUL K", "BATAM"),
      row("2", "MEIWATI S", "BATAM"),
      row("3", "ZAINAL A", "BATAM"),
      row("4", "WULAN TW", "BATAM"),
      row("5", "HELEN", "JAKARTA"),
      row("6", "YOSEF T", "JAKARTA"),
      row("7", "FRANCISCO X", "JAKARTA"),
      row("8", "PT. GLOBAL SEJAHTERA SOLUSINDO", "JAKARTA"),
      row("9", "WIDODO S", "JAKARTA"),
      row("10", "LIE M", "JAKARTA"),
      row("11", "PT BIAN SOLUSINDO PERDANA", "JAKARTA"),
      row("12", "PRYONGGO S", "JAKARTA"),
      row("13", "NELLITA W", "JAKARTA"),
      row("14", "PT. TRIMITRA JIREH PRATAMA", "JAKARTA"),
      row("15", "PT MITRA KARYA SOLUSI CREATIVE", "JAKARTA"),
      row("16", "ANDRY H", "MAKASSAR"),
      row("17", "ADI S", "MALANG"),
      row("18", "PT ASVI GLOBAL GARANSINDO", "MALANG"),
      row("19", "VICTOR", "MALANG"),
      row("20", "RICO P", "MALANG"),
      row("21", "WILYANTO", "MEDAN"),
      row("22", "ECHAN K", "SEMARANG"),
      row("23", "MOCHAMAD C", "SURABAYA"),
      row("24", "M HERDIWISUDA", "SURABAYA"),
      row("25", "NURUL J", "SURABAYA"),
      row("26", "ENDRO W", "SURABAYA"),
      row("27", "YUDISTIRA R", "SURABAYA"),
      row("28", "PROJO W", "SURABAYA"),
      row("29", "TUNJUNG S", "SURAKARTA"),
      row("30", "ANJAS", "SURAKARTA"),
      row("31", "ARIS Y", "SURAKARTA"),
      row("32", "SUGENG P", "SURAKARTA"),
    ],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "tabel",
    where: { slug: { equals: "agent" } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log("Record already exists, updating...");
    await payload.update({
      collection: "tabel",
      id: existing.docs[0].id,
      data: {
        title: "Daftar Agent",
        status: "published",
        tables,
      },
    });
  } else {
    await payload.create({
      collection: "tabel",
      data: {
        title: "Daftar Agent",
        slug: "agent",
        status: "published",
        tables,
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
