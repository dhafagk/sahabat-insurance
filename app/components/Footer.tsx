// app/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={16}
    height={16}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.855L1.205 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={16}
    height={16}
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={16}
    height={16}
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={16}
    height={16}
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const profileLinks = [
  "Sejarah",
  "Visi Dan Misi",
  "Manajemen",
  "Laporan Keuangan",
  "Struktur Organisasi",
  "Penghargaan",
  "Tata Kelola Perusahaan",
  "Literasi Keuangan",
  "Inklusi Keuangan",
  "CSR",
];

const productLinks = [
  "Motor Vehicle Insurance",
  "Property All Risk Insurance",
  "Personal Accident Insurance",
  "ANANDA (Travel Insurance)",
  "Marine Cargo Insurance",
  "Money Insurance",
  "Fire Insurance",
  "Marine Hull Insurance",
  "Contractors' Plant and Machinery Insurance",
  "Contractor's All Risk Insurance",
];

const bottomLinks = [
  { label: "Tentang Kami", href: "#about" },
  { label: "Berita", href: "#news" },
  { label: "Kebijakan Privasi", href: "#privacy" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0F172A" }} aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-0">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            <Link href="/" aria-label="Sahabat Insurance home">
              <Image
                src="/logo-white.png"
                alt="Sahabat Insurance"
                width={180}
                height={52}
                className="object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Berizin dan Diawasi
              <br />
              oleh Otoritas Jasa
              <br />
              Keuangan
            </p>
            {/* OJK badge */}
            <div className="mt-1 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 w-fit">
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] font-bold text-white uppercase tracking-wide">
                  Pahami &amp; Miliki
                </span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wide">
                  Asuransi
                </span>
              </div>
            </div>
          </div>

          {/* Col 2 — Profil Sahabat */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">
              Profil Sahabat
            </h3>
            <nav aria-label="Company profile links">
              <ul className="flex flex-col gap-2">
                {profileLinks.map((label) => (
                  <li key={label}>
                    <a
                      href="#about"
                      className="text-slate-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Produk Terbaru */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">
              Produk Terbaru
            </h3>
            <nav aria-label="Product links">
              <ul className="flex flex-col gap-2">
                {productLinks.map((label) => (
                  <li key={label}>
                    <a
                      href="#products"
                      className="text-slate-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <h3 className="text-white font-semibold mt-6 mb-3 text-base">
              Laporan Keberlanjutan
            </h3>
          </div>

          {/* Col 4 — Kontak Layanan */}
          <div>
            <h3 className="text-white font-semibold mb-1 text-base">
              Kontak Layanan
            </h3>
            <p className="text-slate-400 text-sm mb-3">Pengaduan Konsumen</p>
            <p className="text-white text-sm font-medium mb-3">
              PT Asuransi Sahabat Artha
              <br />
              Proteksi
            </p>
            <address className="not-italic flex flex-col gap-2.5">
              <div className="flex items-start gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  width={13}
                  height={13}
                  className="text-accent mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a
                  href="tel:02150508080"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  (021) 5050 8080
                </a>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  width={13}
                  height={13}
                  className="text-accent mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-slate-400 text-sm leading-relaxed">
                  Jl. Danau Sunter Utara Blok B<br />
                  36A Kav. 16-17 Sunter Jakarta
                  <br />
                  14350
                </span>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  width={13}
                  height={13}
                  className="text-accent mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:contact@sahabatinsurance.id"
                  className="text-slate-400 hover:text-white text-xs transition-colors break-all"
                >
                  contact@sahabatinsurance.id
                </a>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  width={13}
                  height={13}
                  className="text-accent mt-0.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a
                  href="tel:02150508080"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  (021) 5050 8080
                </a>
              </div>
            </address>
          </div>

          {/* Col 5 — Regulatory */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm leading-snug">
              Direktorat Jenderal
              <br />
              Perlindungan Konsumen
              <br />
              dan Tertib Niaga
              <br />
              Kementerian
              <br />
              Perdagangan Republik
              <br />
              Indonesia
            </h3>
            <a
              href="tel:08531111010"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                width={13}
                height={13}
                className="text-accent flex-shrink-0"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              0853 1111 1010
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Secondary nav */}
          <nav
            aria-label="Footer secondary navigation"
            className="flex items-center gap-1"
          >
            {bottomLinks.map(({ label, href }, i) => (
              <span key={label} className="flex items-center gap-1">
                {i > 0 && <span className="text-slate-600">|</span>}
                <a
                  href={href}
                  className="text-slate-400 hover:text-white text-sm transition-colors px-1"
                >
                  {label}
                </a>
              </span>
            ))}
          </nav>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              {
                href: "https://facebook.com",
                label: "Facebook",
                Icon: FacebookIcon,
              },
              {
                href: "https://twitter.com",
                label: "X (Twitter)",
                Icon: XIcon,
              },
              {
                href: "https://instagram.com",
                label: "Instagram",
                Icon: InstagramIcon,
              },
              {
                href: "https://linkedin.com",
                label: "LinkedIn",
                Icon: LinkedinIcon,
              },
            ].map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-7 h-7 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 py-4 text-center">
          <p className="text-slate-500 text-sm">
            © Hak Cipta 2011–2026 ®{" "}
            <a href="/" className="text-accent hover:underline">
              sahabatinsurance.id
            </a>{" "}
            ® Seluruh Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
