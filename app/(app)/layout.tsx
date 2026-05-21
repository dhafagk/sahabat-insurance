// app/layout.tsx
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import SplashScreen from "./components/SplashScreen";
import TopBarProgress from "./components/TopBarProgress";
import { getPayload } from "payload";
import config from "@payload-config";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans-var",
});

async function getFaviconUrl(): Promise<string | null> {
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });
    const favicon = settings?.favicon as { url?: string } | null;
    return favicon?.url ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const faviconUrl = await getFaviconUrl();

  return {
    title: "Sahabat Insurance | Solusi Lengkap Perlindungan Asuransi Anda",
    description:
      "PT Asuransi Sahabat Artha Proteksi | Fitch Rated A(idn), Infobank Excellent 5 tahun berturut-turut, 20+ cabang di seluruh Indonesia.",
    ...(faviconUrl && {
      icons: {
        icon: faviconUrl,
        shortcut: faviconUrl,
      },
    }),
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <SplashScreen />
        <TopBarProgress />
        {children}
      </body>
    </html>
  );
}
