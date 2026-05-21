import { getPayload } from "payload";
import config from "../payload.config";

function row(...values: string[]) {
  return { cells: values.map((value) => ({ value })) };
}

const columns = [
  { label: "Kota" },
  { label: "Alamat" },
  { label: "Telepon" },
  { label: "Kepala" },
  { label: "Maps" },
];

const tables = [
  {
    category: "Jaringan Kantor",
    title: "Kantor Cabang",
    columns,
    rows: [
      row(
        "Semarang",
        "Jl. Dr. Wahidin No. 213, Ruko Kaliwiru, Candisari, Semarang 50253",
        "(024) 76423088",
        "Iik Darmastuti (Kepala Cabang)",
        "https://maps.google.com/?q=Jl. Dr. Wahidin No. 213, Ruko Kaliwiru, Candisari, Semarang 50253",
      ),
      row(
        "Medan",
        "Komplek Centrium Bisnis, Jl. Brigjen Katamso No. 18, Medan 20212",
        "(061) 80512114",
        "E l l y (Kepala Cabang)",
        "https://maps.google.com/?q=Komplek Centrium Bisnis, Jl. Brigjen Katamso No. 18, Medan 20212",
      ),
      row(
        "Pekanbaru",
        "Jl. Arifin Ahmad RT. 001 RW. 04, Sidomulyo Timur, Marpoyan Damai, Pekanbaru",
        "(0761) 8416501",
        "Dewi Sudamaicha (Kepala Cabang)",
        "https://maps.google.com/?q=Jl. Arifin Ahmad RT. 001 RW. 04, Sidomulyo Timur, Marpoyan Damai, Pekanbaru",
      ),
      row(
        "Lampung",
        "Jl. Diponegoro No. 192B, Gulak Galik, Teluk Betung Utara, Bandar Lampung",
        "(0721) 6014983",
        "Ganda Manalu (Kepala Cabang)",
        "https://maps.google.com/?q=Jl. Diponegoro No. 192B, Gulak Galik, Teluk Betung Utara, Bandar Lampung",
      ),
      row(
        "Makassar",
        "Komplek Ruko Alauddin Plaza Blok BA No. 06 Jl. Sultan Alauddin, Makassar",
        "(0411) 8988939",
        "Ida Trimurti (Kepala Cabang)",
        "https://maps.google.com/?q=Komplek Ruko Alauddin Plaza Blok BA No. 06 Jl. Sultan Alauddin, Makassar",
      ),
      row(
        "Surabaya",
        "Jl. Raya Darmo No. 175 A Wonokromo, Darmo, Surabaya",
        "(031) 99544771",
        "Erwin Parera (Kepala Cabang)",
        "https://maps.google.com/?q=Jl. Raya Darmo No. 175 A  Wonokromo, Darmo, Surabaya",
      ),
      row(
        "Bandung",
        "Jl. Lengkong Besar No. 52C, Cikawao, Lengkong, Bandung, Jawa Barat, 40261",
        "(022) 30500191",
        "Tony Supardi (Kepala Cabang)",
        "https://maps.google.com/?q=Jl. Lengkong Besar No. 52C, Cikawao, Lengkong, Bandung, Jawa Barat, 40261",
      ),
      row(
        "Jakarta",
        "Jl. Danau Sunter Utara Blok B No. 36A, Kav. 16 - 17, Sunter, Jakarta Utara 14350",
        "(021) 65310777",
        "David Budi Setiawan (Kepala Cabang)",
        "https://maps.google.com/?q=Jl. Danau Sunter Utara Blok B No. 36A, Kav. 16 - 17, Sunter, Jakarta Utara 14350",
      ),
    ],
  },
  {
    category: "Jaringan Kantor",
    title: "Representative Office",
    columns,
    rows: [
      row(
        "Cirebon",
        "Jl. Pemuda Komplek Perumahan Pemuda Estate Blok B-4, Sunyaragi, Kesambi, Cirebon",
        "(0231) 8805613",
        "M. Isa Bayu Adi (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Jl. Pemuda Komplek Perumahan Pemuda Estate Blok B-4, Sunyaragi, Kesambi, Cirebon",
      ),
      row(
        "Solo",
        "Ruko Office Park Blok B-9, Jl. Ir. Soekarno Solo Baru, Sukoharjo, Solo",
        "(0271) 5722832",
        "Danu Pranggalih (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Ruko Office Park Blok B-9, Jl. Ir. Soekarno Solo Baru, Sukoharjo, Solo",
      ),
      row(
        "Yogyakarta",
        "Ruko Kuantan Square R-11, Jl. Dr. Wahidin Sudirohusodo, Mlati Sleman, Yogyakarta",
        "(0274) 4530403",
        "Ari Kusumawati (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Ruko Kuantan Square R-11, Jl. Dr. Wahidin Sudirohusodo, Mlati Sleman, Yogyakarta",
      ),
      row(
        "Malang",
        "Jl. Sarangan (Ruko 1-B) Lowokwaru, Malang",
        "(0341) 3031188",
        "Frits Yanuar (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Jl. Sarangan (Ruko 1-B) Lowokwaru, Malang",
      ),
      row(
        "Batam",
        "Komplek Grand California Blok G-1 No. 07, Batam Centre",
        "(0778) 4808712",
        "S u t a r d i (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Komplek Grand California Blok G-1 No. 07, Batam Centre",
      ),
      row(
        "Palembang",
        "Jl. Basuki Rahmat No. 1540-D, Palembang 30126",
        "(0711) 370900",
        "Paul Effendi (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Jl. Basuki Rahmat No. 1540-D, Palembang 30126",
      ),
      row(
        "Denpasar",
        "Jl. Mahendratta No. 198 X, Ruko E, Denpasar",
        "(0361) 9005990",
        "Ida Bagus Sandi Adnyana (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Jl. Mahendratta No. 198 X, Ruko E, Denpasar",
      ),
      row(
        "Purwokerto",
        "Jl. Situmpur No. 1174 B, Purwokerto, Banyumas - Jawa Tengah",
        "(0281) 7773292",
        "Supartono (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Jl. Situmpur No. 1174 B, Purwokerto, Banyumas - Jawa Tengah",
      ),
      row(
        "Jambi",
        "Jl. Sumbiono Blok A2 RT.011, Jelutung, Jambi",
        "0741-3622176",
        "Dedy Suprayogi (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Jl. Sumbiono Blok A2 RT.011, Jelutung, Jambi",
      ),
      row(
        "Pontianak",
        "Anzon Autoplaza Lt.3, Jl. Jenderal Ahmad Yani No.89, Pontianak, Kalimantan Barat, 78112",
        "0561-8241727",
        "Yohanes Rudy (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Anzon Autoplaza Lt.3, Jl. Jenderal Ahmad Yani No.89, Pontianak, Kalimantan Barat, 78112.",
      ),
      row(
        "Banjarmasin",
        "Jl. A. Yani, KM 7,8. Citraland, Madison Avenue A Blok I/18, Banjar, Kertakhanyar, Banjarmasin, Kalimantan Selatan, 70653",
        "0511-6742067",
        "Melda Aulina (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Jl. A. Yani, KM 7,8. Citraland, Madison Avenue A  Blok I/18, Banjar, Kertakhanyar, Banjarmasin, Kalimantan Selatan, 70653.",
      ),
      row(
        "Tangerang",
        "Ruko Jalur Sutera, Jl. Jalur Sutera kav. 25 B - C no. A-6, Alam Sutera, Serpong Utara, Kota Tangerang Selatan, Banten 15320",
        "021-39707878",
        "Yongkie Avriano (Kepala Kantor Perwakilan)",
        "https://maps.google.com/?q=Ruko Jalur Sutera, Jl. Jalur Sutera kav. 25 B - C no. A-6, Alam Sutera, Serpong Utara, Kota Tangerang Selatan, Banten 15320",
      ),
    ],
  },
];

async function seed() {
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "tabel",
    where: { slug: { equals: "branch-office" } },
    limit: 1,
  });

  if (existing.totalDocs > 0) {
    console.log("Record already exists, updating...");
    await payload.update({
      collection: "tabel",
      id: existing.docs[0].id,
      data: {
        title: "Kantor Cabang",
        status: "published",
        tables,
      },
    });
  } else {
    await payload.create({
      collection: "tabel",
      data: {
        title: "Kantor Cabang",
        slug: "branch-office",
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
