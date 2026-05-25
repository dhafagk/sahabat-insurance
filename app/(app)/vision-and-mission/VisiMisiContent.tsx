"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export interface ValueItem {
  letter: string;
  title: string;
  description?: string | null;
}

export interface MisiItem {
  text: string;
}

export interface VisiMisiContentProps {
  featuredImageUrl: string;
  visiTitle: string;
  visiContent: string;
  misiTitle: string;
  misiItems: MisiItem[];
  valuesTitle: string;
  valuesSubtitle: string;
  values: ValueItem[];
}

export default function VisiMisiContent({
  featuredImageUrl,
  visiTitle,
  visiContent,
  misiTitle,
  misiItems,
  valuesTitle,
  valuesSubtitle,
  values,
}: VisiMisiContentProps) {
  return (
    <>
      {/* ── Featured Image ─────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src={featuredImageUrl}
            alt="Tim Sahabat Insurance"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* ── Visi & Misi Cards ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Visi card */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl overflow-hidden p-8 flex flex-col gap-4"
            style={{
              background: "linear-gradient(135deg, #1E3A5F 0%, #0F2744 100%)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #6366F1 0%, transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
              aria-hidden="true"
            />
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/30 text-indigo-300 font-bold text-lg">
              V
            </span>
            <h2 className="text-2xl font-bold text-white">{visiTitle}</h2>
            <p className="text-slate-300 leading-relaxed text-sm">
              {visiContent}
            </p>
          </motion.div>

          {/* Misi card */}
          <motion.div
            variants={fadeUp}
            className="relative rounded-2xl overflow-hidden p-8 flex flex-col gap-4"
            style={{
              background: "linear-gradient(135deg, #1E3A5F 0%, #0F2744 100%)",
              border: "1px solid rgba(99,102,241,0.2)",
            }}
          >
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none opacity-20"
              style={{
                background:
                  "radial-gradient(circle, #6366F1 0%, transparent 70%)",
                transform: "translate(30%, -30%)",
              }}
              aria-hidden="true"
            />
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/30 text-indigo-300 font-bold text-lg">
              M
            </span>
            <h2 className="text-2xl font-bold text-white">{misiTitle}</h2>
            <ul className="flex flex-col gap-3">
              {misiItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background:
                        "color-mix(in oklab, rgb(97 95 255) 30%, transparent)",
                      color: "#a3b3ff",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-slate-300 text-sm leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Values Section ─────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-indigo-500 text-xs font-semibold tracking-widest uppercase mb-2">
              {valuesSubtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              {valuesTitle}
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            {values.map((val, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`group flex items-center gap-6 px-6 py-5 transition-colors hover:bg-indigo-50/40 ${
                  i < values.length - 1 ? "border-b border-slate-100" : ""
                }`}
              >
                <span className="flex-shrink-0 w-10 text-center text-2xl font-extrabold text-indigo-600 leading-none select-none">
                  {val.letter}
                </span>
                <div
                  className="w-px h-8 flex-shrink-0 bg-slate-200"
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-semibold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                    {val.title}
                  </h3>
                  {val.description && (
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {val.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
