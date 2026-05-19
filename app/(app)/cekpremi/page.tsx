import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CekPremiContent from "./CekPremiContent";

export const metadata: Metadata = {
  title: "Cek Premi Kendaraan | Sahabat Insurance",
  description:
    "Hitung estimasi premi asuransi kendaraan Anda dengan kalkulator online Sahabat Insurance. Dapatkan penawaran terbaik.",
};

export default function CekPremiPage() {
  return (
    <>
      <Navbar />

      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div
        className="relative pt-28 pb-20 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0F172A 0%, #21408f 60%, #1E293B 100%)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{
            background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none opacity-10"
          style={{
            background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
          aria-hidden="true"
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <nav
            className="flex items-center gap-1.5 text-xs text-white/40 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white/70 transition-colors">
              Beranda
            </Link>
            <span>›</span>
            <span className="text-white/70">Cek Premi</span>
          </nav>

          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-4">
            Asuransi Kendaraan
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3">
            Cek Premi Kendaraan
          </h1>
          <p className="text-slate-400 text-base max-w-xl leading-relaxed">
            Mohon isi form di bawah ini untuk mengetahui estimasi harga premi
            kendaraan Anda.
          </p>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main className="bg-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <CekPremiContent />
        </div>
      </main>

      <Footer />
    </>
  );
}
