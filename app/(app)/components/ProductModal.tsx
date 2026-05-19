"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowRight } from "lucide-react";
import type { ProductItem } from "./Products";

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
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
              {/* Header */}
              <div className="relative bg-gradient-to-br from-navy to-navy/80 pt-8 pb-10 px-6">
                <button
                  ref={closeRef}
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10 hover:cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                {/* Wave at bottom of header */}
                <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
                  <svg
                    viewBox="0 0 400 32"
                    preserveAspectRatio="none"
                    className="w-full h-8"
                  >
                    <path
                      d="M0,32 C80,0 320,0 400,32 L400,32 L0,32 Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>

              {/* Icon — straddles header/body */}
              <div className="absolute left-1/2 -translate-x-1/2 top-5">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center">
                  {product.icon?.url ? (
                    <div className="w-9 h-9 relative">
                      <Image
                        src={product.icon.url}
                        alt={product.icon.alt ?? product.title}
                        fill
                        className="object-contain"
                        sizes="36px"
                      />
                    </div>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-navy"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="px-6 pt-8 pb-6">
                <h2
                  id="modal-title"
                  className="text-xl font-bold text-text-primary mb-3 text-center"
                >
                  {product.title}
                </h2>
                <p className="text-sm text-text-muted leading-relaxed text-center">
                  {product.detailDescription ?? product.description}
                </p>
              </div>

              {/* Footer */}
              <div className="px-6 pb-6 flex gap-3">
                {product.riplayUrl ? (
                  <a
                    href={product.riplayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-navy text-navy text-sm font-semibold hover:bg-navy/5 transition-colors"
                  >
                    <ArrowRight size={15} />
                    Riplay
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-400 text-sm font-semibold cursor-not-allowed"
                  >
                    <ArrowRight size={15} />
                    Riplay
                  </button>
                )}
                {product.sppaUrl ? (
                  <a
                    href={product.sppaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy/90 transition-colors"
                  >
                    <Download size={15} />
                    Download SPPA
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-400 text-sm font-semibold cursor-not-allowed"
                  >
                    <Download size={15} />
                    Download SPPA
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
