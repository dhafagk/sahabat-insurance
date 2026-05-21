import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactPageContent from "./ContactPageContent";
import type { ContactChannel } from "./ContactPageContent";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPayloadInstance = cache(async () => getPayload({ config }) as any);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchData = cache(async (): Promise<any> => {
  try {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: "contact-us", depth: 0 });
  } catch {
    return null;
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchData();
  return {
    title: `${data?.pageTitle ?? "Hubungi Kami"} | Sahabat Insurance`,
    description:
      data?.pageSubtitle ??
      "Hubungi tim Sahabat Insurance melalui telepon, WhatsApp, email, atau formulir pengaduan.",
  };
}

const DEFAULT_CHANNELS: ContactChannel[] = [
  {
    iconType: "phone",
    title: "021-50508080",
    description: "Untuk informasi lebih lanjut, hubungi Customer Service kami",
    href: "tel:02150508080",
    hrefLabel: "Hubungi Sekarang",
  },
  {
    iconType: "whatsapp",
    title: "Interaksi",
    description:
      "Untuk keluhan atau informasi, Anda bisa hubungi Kami melalui WhatsApp",
    href: "https://wa.me/622150508080",
    hrefLabel: "Chat WhatsApp",
  },
  {
    iconType: "email",
    title: "Hubungi Kami",
    description:
      "Hubungi kami via email jika ada pertanyaan atau informasi lainnya",
    href: "mailto:info@sahabatinsurance.id",
    hrefLabel: "Kirim Email",
  },
  {
    iconType: "form",
    title: "Form Pengaduan",
    description:
      "Dalam rangka Peraturan Otoritas Jasa Keuangan dan bentuk komitmen Sahabat Insurance untuk memberikan layanan terbaik, mohon berikan masukan kepada kami melalui Formulir Pengaduan ini",
    href: "#form-pengaduan",
    hrefLabel: "Isi Formulir",
  },
];


export default async function ContactUsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any = await fetchData();

  const pageTitle: string = raw?.pageTitle ?? "Hubungi Kami";
  const pageSubtitle: string =
    raw?.pageSubtitle ??
    "Kami siap membantu Anda. Pilih cara yang paling nyaman untuk menghubungi tim kami.";

  const sectionTitle: string = raw?.sectionTitle ?? "Kami Siap Melayani Anda";
  const sectionSubtitle: string =
    raw?.sectionSubtitle ?? "We'd love to talk about how we can help you";

  const channels: ContactChannel[] =
    Array.isArray(raw?.channels) && raw.channels.length > 0
      ? raw.channels.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (c: any): ContactChannel => ({
            iconType: c.iconType ?? "phone",
            title: c.title ?? "",
            description: c.description ?? "",
            href: c.href ?? undefined,
            hrefLabel: c.hrefLabel ?? "Selengkapnya",
          }),
        )
      : DEFAULT_CHANNELS;

  return (
    <>
      <Navbar />

      <div
        className="relative pt-28 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0F172A 0%, #2887C1 60%, #1E293B 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-5 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <nav
            className="flex items-center gap-1.5 text-xs text-white/50 mb-6"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white/80 transition-colors">
              Beranda
            </Link>
            <span>›</span>
            <span className="text-white/80">{pageTitle}</span>
          </nav>

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {pageTitle}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {pageSubtitle}
            </p>
          </div>
        </div>
      </div>

      <ContactPageContent
        sectionTitle={sectionTitle}
        sectionSubtitle={sectionSubtitle}
        channels={channels}
      />

      <Footer />
    </>
  );
}
