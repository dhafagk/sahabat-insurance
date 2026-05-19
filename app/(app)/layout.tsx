// app/layout.tsx
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import SplashScreen from "./components/SplashScreen";
import TopBarProgress from "./components/TopBarProgress";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans-var",
});

export const metadata: Metadata = {
  title: "Sahabat Insurance | Solusi Lengkap Perlindungan Asuransi Anda",
  description:
    "PT Asuransi Sahabat Artha Proteksi | Fitch Rated A(idn), Infobank Excellent 5 tahun berturut-turut, 20+ cabang di seluruh Indonesia.",
};

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
