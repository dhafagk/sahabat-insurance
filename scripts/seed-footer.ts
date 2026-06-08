import { getPayload } from "payload";
import config from "../payload.config";

// NOTE: imageContent blocks are excluded — they require a real media document ID.
// NOTE: sectionHeading blocks are excluded — not registered in FooterConfig.ts.
// NOTE: FooterConfig has maxRows: 5, so only 5 columns are seeded (RATING column dropped).

async function seed() {
  const payload = await getPayload({ config });

  await payload.updateGlobal({
    slug: "footer",
    data: {
      upperColumns: [
        {
          title: "PROFIL",
          content: [
            {
              blockType: "linkList",
              links: [
                { label: "Sejarah", href: "#about" },
                { label: "Visi dan Misi", href: "/vision-and-mission" },
                { label: "Manajemen", href: "/management" },
                { label: "Laporan Keuangan", href: "#about" },
                { label: "Laporan Keberlanjutan", href: "#about" },
                { label: "Tata Kelola Perusahaan", href: "#about" },
                { label: "Izin Usaha OJK", href: "#about" },
              ],
            },
            {
              blockType: "textContent",
              content: "Sahabat Insurance\nBerizin dan Diawasi\nOleh OJK",
            },
          ],
        },
        {
          title: "PRODUK",
          content: [
            {
              blockType: "linkList",
              links: [
                { label: "Cara Beli Polis", href: "#products" },
                { label: "Motor Vehicle Insurance", href: "#products" },
                { label: "Property All Risk Insurance", href: "#products" },
                { label: "Personal Accident Insurance", href: "#products" },
                { label: "ANANDA (Travel Insurance)", href: "#products" },
                { label: "Marine Cargo Insurance", href: "#products" },
                { label: "Money Insurance", href: "#products" },
                { label: "Fire Insurance", href: "#products" },
                { label: "Marine Hull Insurance", href: "#products" },
                {
                  label: "Contractors' Plant and Machinery Insurance",
                  href: "#products",
                },
                { label: "Contractor's All Risk Insurance", href: "#products" },
              ],
            },
          ],
        },
        {
          title: "LAYANAN",
          content: [
            {
              blockType: "linkList",
              links: [
                { label: "Cek Polis", href: "/cekpremi" },
                { label: "Renewal Polis", href: "#layanan" },
                { label: "Bengkel Rekanan", href: "#layanan" },
                { label: "Kebijakan Privasi", href: "#layanan" },
                { label: "Syarat dan Ketentuan", href: "#layanan" },
                { label: "Pusat Klaim", href: "#layanan" },
                { label: "Prosedur Klaim", href: "#layanan" },
                { label: "Literasi Keuangan", href: "#layanan" },
                { label: "Pusat Pengaduan", href: "#layanan" },
                { label: "Whistleblowing System", href: "#layanan" },
              ],
            },
          ],
        },
        {
          title: "BERITA",
          content: [
            {
              blockType: "linkList",
              links: [
                { label: "Tips & Trik", href: "#berita" },
                { label: "Berita", href: "#berita" },
              ],
            },
            {
              blockType: "textContent",
              content: "HUBUNGI KAMI",
            },
            {
              blockType: "linkList",
              links: [
                { label: "Lokasi Kantor", href: "#kontak" },
                { label: "Daftar Agen", href: "#kontak" },
              ],
            },
          ],
        },
        {
          title: "CSR",
          content: [
            {
              blockType: "linkList",
              links: [{ label: "Aktifitas CSR", href: "#csr" }],
            },
            {
              blockType: "textContent",
              content: "PERLINDUNGAN KONSUMEN",
            },
            {
              blockType: "textContent",
              content:
                "Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga Kementerian Perdagangan Republik Indonesia",
            },
            {
              blockType: "contactInfo",
              items: [
                {
                  type: "phone",
                  value: "tel:08531111010",
                  displayText: "0853 1111 1010",
                },
              ],
            },
          ],
        },
      ],
      lowerFooter: {
        links: [
          { label: "Tentang Kami", href: "#about" },
          { label: "Berita", href: "#news" },
          { label: "Kebijakan Privasi", href: "#privacy" },
        ],
        socialLinks: [
          {
            platform: "facebook",
            href: "https://www.facebook.com/sahabatinsurance/",
          },
          {
            platform: "instagram",
            href: "https://www.instagram.com/sahabatinsurance.id/",
          },
        ],
        copyrightText:
          "© Hak Cipta 2011-2026 ® sahabatinsurance.id ® Seluruh Hak Cipta Dilindungi.",
      },
    },
  });

  console.log("Footer seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
