"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send, CheckCircle } from "lucide-react";

interface EmailGateModalProps {
  fileName: string;
  fileUrl: string;
  unduhanlId?: string;
  onClose: () => void;
}

type ModalState = "form" | "loading" | "success" | "error";

export default function EmailGateModal({
  fileName,
  fileUrl,
  unduhanlId,
  onClose,
}: EmailGateModalProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<ModalState>("form");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fileName, fileUrl, unduhanlId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? "Terjadi kesalahan.");
        setState("error");
        return;
      }

      setState("success");
    } catch {
      setErrorMsg("Tidak dapat menghubungi server. Coba lagi.");
      setState("error");
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Tutup"
          >
            <X size={16} />
          </button>

          {state === "success" ? (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-text-primary">
                Email Terkirim!
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Tautan unduhan <strong>{fileName}</strong> telah dikirimkan ke{" "}
                <strong>{email}</strong>. Silakan cek kotak masuk Anda.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-navy/90 transition-colors"
              >
                Tutup
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-navy/8 flex items-center justify-center mb-5">
                <Mail size={22} className="text-navy" />
              </div>

              <h2 className="text-xl font-bold text-text-primary mb-1">
                Masukkan Email Anda
              </h2>
              <p className="text-sm text-text-muted mb-6 leading-relaxed">
                Tautan unduhan <strong>{fileName}</strong> akan dikirimkan ke
                email Anda.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="gate-email"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Alamat Email
                  </label>
                  <input
                    id="gate-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="nama@email.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-text-primary placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition"
                  />
                </div>

                {state === "error" && (
                  <p className="text-sm text-red-500">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-navy/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {state === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Kirim & Unduh
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
