// app/layout.tsx
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import SplashScreen from "./components/SplashScreen";
import TopBarProgress from "./components/TopBarProgress";
import MaintenancePage from "./components/MaintenancePage";
import Footer from "./components/Footer";
import type { FooterData } from "./components/Footer";
import { getPayload } from "payload";
import config from "@payload-config";
import { getLocale } from "./lib/locale";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans-var",
});

interface SiteSettingsData {
  maintenanceMode?: boolean;
  favicon?: { url?: string } | null;
}

async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({
      slug: "site-settings",
      depth: 1,
    });
    return settings as SiteSettingsData;
  } catch {
    return {};
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { favicon } = await getSiteSettings();
  const faviconUrl = favicon?.url ?? null;

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ maintenanceMode }, locale, payload] = await Promise.all([
    getSiteSettings(),
    getLocale(),
    getPayload({ config }),
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rawFooter = await (payload as any).findGlobal({ slug: "footer", depth: 1, locale });
  const footer = rawFooter as FooterData;

  return (
    <html lang="id" className={`${openSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        {maintenanceMode ? (
          <MaintenancePage />
        ) : (
          <>
            <SplashScreen />
            <TopBarProgress />
            {children}
            <Footer data={footer} />
          </>
        )}
      </body>
    </html>
  );
}
