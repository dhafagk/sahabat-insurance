"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Target, Users, Shield, TrendingUp, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Star,
  Target,
  Users,
  Shield,
  TrendingUp,
  Trophy,
};

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

export interface HighlightItem {
  icon: string;
  title: string;
  description?: string | null;
}

export interface BoardMember {
  photo?: { url?: string | null } | null;
  name: string;
  position: string;
}

export interface TataKelolaColumn {
  content: string;
}

export interface ManajemenContentProps {
  highlights: HighlightItem[];
  boardOfCommissioners: {
    title: string;
    members: BoardMember[];
  };
  boardOfDirectors: {
    title: string;
    members: BoardMember[];
  };
  tataKelola: {
    title: string;
    subtitle: string;
    columns: TataKelolaColumn[];
  };
}

function MemberCard({ member }: { member: BoardMember; index: number }) {
  const photoUrl = member.photo?.url ?? null;

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative mb-5">
        <div className="w-40 h-40 rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-100 group-hover:shadow-lg transition-all duration-300">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={member.name}
              fill
              className="object-cover object-top"
              sizes="160px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Users size={48} className="text-slate-300" aria-hidden />
            </div>
          )}
        </div>
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-0.5 w-12 rounded-full bg-indigo-400 transition-all duration-300 group-hover:w-20"
          aria-hidden
        />
      </div>

      <h3 className="font-bold text-slate-800 text-base leading-snug mt-3 group-hover:text-indigo-600 transition-colors">
        {member.name}
      </h3>
      <span className="mt-1.5 inline-block px-3 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-600 border border-indigo-100">
        {member.position}
      </span>
    </motion.div>
  );
}

export default function ManajemenContent({
  highlights,
  boardOfCommissioners,
  boardOfDirectors,
  tataKelola,
}: ManajemenContentProps) {
  return (
    <>
      {/* ── Highlights ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {highlights.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Star;
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-6 flex flex-col gap-3 bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-50">
                  <Icon size={20} className="text-indigo-600" aria-hidden />
                </div>
                <h3 className="font-bold text-slate-800 text-sm leading-snug">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p className="text-indigo-500 text-xs font-semibold tracking-widest uppercase mb-2">
                Pimpinan Eksekutif
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                {boardOfDirectors.title}
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-wrap justify-center gap-10"
            >
              {boardOfDirectors.members.map((member, i) => (
                <MemberCard key={i} member={member} index={i} />
              ))}
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <p className="text-indigo-500 text-xs font-semibold tracking-widest uppercase mb-2">
                Dewan Pengawas
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                {boardOfCommissioners.title}
              </h2>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-wrap justify-center gap-10"
            >
              {boardOfCommissioners.members.map((member, i) => (
                <MemberCard key={i} member={member} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Tata Kelola ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <p className="text-indigo-500 text-xs font-semibold tracking-widest uppercase mb-2">
              {tataKelola.subtitle}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
              {tataKelola.title}
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-3 gap-8"
          >
            {tataKelola.columns.map((col, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col gap-4"
              >
                <div
                  className="w-8 h-1 rounded-full bg-indigo-500"
                  aria-hidden
                />
                <p className="text-slate-600 text-sm leading-relaxed">
                  {col.content}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
