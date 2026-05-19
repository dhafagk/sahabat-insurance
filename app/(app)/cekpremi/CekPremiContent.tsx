"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw, Calculator, Shield, Car } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type JenisKendaraan = "non-bus-truk" | "bus" | "truk";
type KodeWilayah = "zone-a" | "zone-b" | "zone-c";
type JenisPertanggungan = "comprehensive" | "tlo";

interface PremiForm {
  jenisKendaraan: JenisKendaraan;
  kodeWilayah: KodeWilayah;
  tahunKendaraan: string;
  hargaKendaraan: string;
  jenisPertanggungan: JenisPertanggungan;
}

interface PengajuanForm {
  nama: string;
  email: string;
  noHp: string;
  captchaInput: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const JENIS_KENDARAAN_OPTIONS: { value: JenisKendaraan; label: string }[] = [
  { value: "non-bus-truk", label: "Non Bus dan Non Truk" },
  { value: "bus", label: "Bus" },
  { value: "truk", label: "Truk" },
];

const KODE_WILAYAH_OPTIONS: { value: KodeWilayah; label: string }[] = [
  { value: "zone-a", label: "A - DKI Jakarta, Jawa Barat, Banten" },
  { value: "zone-b", label: "B - Jawa Tengah, DI Yogyakarta" },
  { value: "zone-c", label: "W - Jawa Timur" },
];

const PERTANGGUNGAN_OPTIONS: { value: JenisPertanggungan; label: string }[] = [
  { value: "comprehensive", label: "COMPREHENSIVE" },
  { value: "tlo", label: "TLO (Total Loss Only)" },
];

// OJK tariff rates (simplified)
const RATES: Record<JenisPertanggungan, Record<KodeWilayah, number>> = {
  comprehensive: { "zone-a": 0.0382, "zone-b": 0.0267, "zone-c": 0.0253 },
  tlo: { "zone-a": 0.0065, "zone-b": 0.005, "zone-c": 0.005 },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseNumber(value: string): number {
  return Number(value.replace(/\D/g, "")) || 0;
}

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID").format(Math.round(value));
}

function calculatePremi(form: PremiForm): number {
  const harga = parseNumber(form.hargaKendaraan);
  if (!harga) return 0;
  return harga * RATES[form.jenisPertanggungan][form.kodeWilayah];
}

// ─── Math Captcha Canvas ─────────────────────────────────────────────────────

function generateCaptchaQuestion(): { question: string; answer: number } {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];

  if (op === "+") return { question: `${a} + ${b}`, answer: a + b };
  if (op === "-") {
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    return { question: `${big} - ${small}`, answer: big - small };
  }
  return { question: `${a} × ${b}`, answer: a * b };
}

interface CaptchaCanvasProps {
  question: string;
}

function CaptchaCanvas({ question }: CaptchaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Noise lines
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(${Math.floor(Math.random() * 150)},${Math.floor(Math.random() * 150)},${Math.floor(Math.random() * 150)},0.4)`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Text
    ctx.font = "bold 26px 'Courier New', monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const text = `${question} = ?`;
    for (let i = 0; i < text.length; i++) {
      const x = 20 + i * 14;
      const y = canvas.height / 2 + (Math.random() * 8 - 4);
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = `hsl(${Math.floor(Math.random() * 60) + 200}, 60%, 30%)`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Noise dots
    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 2,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = `rgba(100,100,100,0.3)`;
      ctx.fill();
    }
  }, [question]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={60}
      className="rounded-lg border border-slate-200 select-none"
      aria-label="Captcha gambar"
    />
  );
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// ─── Form Field Component ─────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  children: React.ReactNode;
  hint?: string;
}

function Field({ label, children, hint }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-navy">{label}</label>
      {children}
      {hint && <p className="text-xs text-text-muted">{hint}</p>}
    </div>
  );
}

const selectClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all appearance-none cursor-pointer";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-text-primary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-all";

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CekPremiContent() {
  const [form, setForm] = useState<PremiForm>({
    jenisKendaraan: "non-bus-truk",
    kodeWilayah: "zone-c",
    tahunKendaraan: new Date().getFullYear().toString(),
    hargaKendaraan: "",
    jenisPertanggungan: "comprehensive",
  });

  const [showModal, setShowModal] = useState(false);
  const [pengajuan, setPengajuan] = useState<PengajuanForm>({
    nama: "",
    email: "",
    noHp: "",
    captchaInput: "",
  });

  const [captcha, setCaptcha] = useState<{ question: string; answer: number }>(
    generateCaptchaQuestion,
  );
  const [captchaError, setCaptchaError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hargaDisplay, setHargaDisplay] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);

  const premi = calculatePremi(form);

  useEffect(() => {
    if (!showModal) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setShowModal(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [showModal]);

  const handleHargaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setHargaDisplay(raw ? formatRupiah(Number(raw)) : "");
    setForm((f) => ({ ...f, hargaKendaraan: raw }));
  };

  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptchaQuestion());
    setCaptchaError(false);
    setPengajuan((p) => ({ ...p, captchaInput: "" }));
  }, []);

  const handleSubmitPremi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.hargaKendaraan) return;
    setCaptcha(generateCaptchaQuestion());
    setPengajuan({ nama: "", email: "", noHp: "", captchaInput: "" });
    setCaptchaError(false);
    setSubmitted(false);
    setShowModal(true);
  };

  const handleSubmitPengajuan = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(pengajuan.captchaInput) !== captcha.answer) {
      setCaptchaError(true);
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-br from-navy to-navy/85 px-6 py-5 flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15">
              <Calculator size={20} className="text-white" aria-hidden />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">
                Kalkulator Premi Kendaraan
              </h2>
              <p className="text-white/65 text-xs mt-0.5">
                Isi form berikut untuk mengetahui estimasi premi asuransi Anda
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmitPremi}
            className="px-6 py-7 flex flex-col gap-5"
          >
            <Field label="Jenis Kendaraan">
              <div className="relative">
                <select
                  value={form.jenisKendaraan}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      jenisKendaraan: e.target.value as JenisKendaraan,
                    }))
                  }
                  className={selectClass}
                >
                  {JENIS_KENDARAAN_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Car
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  aria-hidden
                />
              </div>
            </Field>

            <Field label="Kode Wilayah">
              <div className="relative">
                <select
                  value={form.kodeWilayah}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      kodeWilayah: e.target.value as KodeWilayah,
                    }))
                  }
                  className={selectClass}
                >
                  {KODE_WILAYAH_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </Field>

            <Field label="Tahun Kendaraan">
              <input
                type="number"
                min={1990}
                max={new Date().getFullYear()}
                value={form.tahunKendaraan}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tahunKendaraan: e.target.value }))
                }
                placeholder="Contoh: 2021"
                className={inputClass}
              />
            </Field>

            <Field label="Harga Kendaraan (Rp.)">
              <input
                type="text"
                inputMode="numeric"
                value={hargaDisplay}
                onChange={handleHargaChange}
                placeholder="Contoh: 100,000,000"
                className={inputClass}
              />
            </Field>

            <Field label="Jenis Pertanggungan">
              <div className="relative">
                <select
                  value={form.jenisPertanggungan}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      jenisPertanggungan: e.target.value as JenisPertanggungan,
                    }))
                  }
                  className={selectClass}
                >
                  {PERTANGGUNGAN_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <Shield
                  size={16}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  aria-hidden
                />
              </div>
            </Field>

            {/* Kalkulasi Premi (read-only) */}
            <Field
              label="Kalkulasi Premi (Rp.)"
              hint="Estimasi berdasarkan tarif OJK. Harga final dapat berbeda."
            >
              <div
                className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-navy min-h-[46px] flex items-center"
                aria-live="polite"
              >
                {premi > 0 ? (
                  formatRupiah(premi)
                ) : (
                  <span className="text-slate-400 font-normal">—</span>
                )}
              </div>
            </Field>

            <button
              type="submit"
              disabled={!form.hargaKendaraan || premi === 0}
              className="mt-1 w-full rounded-xl bg-navy text-white font-semibold py-3.5 px-6 hover:bg-navy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy/50 shadow-lg shadow-navy/20"
            >
              Ajukan Premi
            </button>
          </form>
        </div>

        {/* Info note */}
        <p className="text-center text-xs text-text-muted mt-4 px-4">
          Kalkulasi premi merupakan estimasi berdasarkan Peraturan OJK No.
          6/POJK.05/2013.
          <br />
          Premi final ditentukan oleh underwriter Sahabat Insurance.
        </p>
      </motion.div>

      {/* ── Modal ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
              aria-hidden="true"
            />

            {/* Dialog */}
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="relative w-full max-w-md pointer-events-auto rounded-2xl overflow-hidden shadow-2xl bg-white">
                {/* Modal header */}
                <div className="relative bg-gradient-to-br from-navy to-navy/80 px-6 pt-5 pb-8">
                  <button
                    ref={closeRef}
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10 cursor-pointer"
                    aria-label="Tutup modal"
                  >
                    <X size={20} />
                  </button>
                  <h2 id="modal-title" className="text-white font-bold text-xl">
                    Form Pengajuan
                  </h2>
                  <p className="text-white/60 text-xs mt-1">
                    Premi estimasi:{" "}
                    <span className="text-white font-semibold">
                      Rp {formatRupiah(premi)}
                    </span>
                  </p>
                  {/* Wave */}
                  <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                    <svg
                      viewBox="0 0 400 24"
                      preserveAspectRatio="none"
                      className="w-full h-6"
                    >
                      <path
                        d="M0,24 C80,0 320,0 400,24 L400,24 L0,24 Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </div>

                {/* Modal body */}
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-6 py-10 flex flex-col items-center gap-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-8 h-8 text-green-500"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary">
                        Pengajuan Berhasil!
                      </h3>
                      <p className="text-sm text-text-muted mt-1.5 leading-relaxed">
                        Terima kasih,{" "}
                        <span className="font-medium text-navy">
                          {pengajuan.nama}
                        </span>
                        . Tim kami akan menghubungi Anda melalui{" "}
                        <span className="font-medium text-navy">
                          {pengajuan.email}
                        </span>{" "}
                        atau{" "}
                        <span className="font-medium text-navy">
                          {pengajuan.noHp}
                        </span>
                        .
                      </p>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="mt-2 rounded-xl bg-navy text-white font-semibold py-2.5 px-8 hover:bg-navy/90 transition-all text-sm"
                    >
                      Selesai
                    </button>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmitPengajuan}
                    className="px-6 py-5 flex flex-col gap-4"
                  >
                    <Field label="Nama">
                      <input
                        type="text"
                        required
                        value={pengajuan.nama}
                        onChange={(e) =>
                          setPengajuan((p) => ({ ...p, nama: e.target.value }))
                        }
                        placeholder="Nama lengkap Anda"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Email">
                      <input
                        type="email"
                        required
                        value={pengajuan.email}
                        onChange={(e) =>
                          setPengajuan((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="email@contoh.com"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="No. HP">
                      <input
                        type="tel"
                        required
                        value={pengajuan.noHp}
                        onChange={(e) =>
                          setPengajuan((p) => ({
                            ...p,
                            noHp: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="08xxxxxxxxxx"
                        className={inputClass}
                      />
                    </Field>

                    {/* Captcha */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <CaptchaCanvas question={captcha.question} />
                        <button
                          type="button"
                          onClick={refreshCaptcha}
                          className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors flex-shrink-0 cursor-pointer"
                          aria-label="Refresh captcha"
                        >
                          <RefreshCw size={16} />
                        </button>
                      </div>

                      <Field label="Input Captcha">
                        <input
                          type="number"
                          required
                          value={pengajuan.captchaInput}
                          onChange={(e) => {
                            setPengajuan((p) => ({
                              ...p,
                              captchaInput: e.target.value,
                            }));
                            setCaptchaError(false);
                          }}
                          placeholder="Jawaban captcha"
                          className={`${inputClass} ${captchaError ? "border-red-400 focus:ring-red-300 focus:border-red-400" : ""}`}
                        />
                        {captchaError && (
                          <p className="text-xs text-red-500 mt-0.5">
                            Jawaban captcha salah, coba lagi.
                          </p>
                        )}
                      </Field>
                    </div>

                    {/* Modal footer */}
                    <div className="flex gap-3 pt-2 pb-1">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="flex-1 rounded-xl border border-slate-200 text-text-muted font-semibold py-2.5 hover:bg-slate-50 transition-all text-sm"
                      >
                        Kembali
                      </button>
                      <button
                        type="submit"
                        className="flex-1 rounded-xl bg-navy text-white font-semibold py-2.5 hover:bg-navy/90 transition-all text-sm shadow-md shadow-navy/20"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
