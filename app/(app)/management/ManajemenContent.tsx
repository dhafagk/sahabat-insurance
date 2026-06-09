"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users } from "lucide-react";

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

export interface BoardMember {
  photo?: { url?: string | null } | null;
  name: string;
  position: string;
}

export interface TataKelolaColumn {
  content: string;
}

export interface ManajemenContentProps {
  boardOfCommissioners: {
    title: string;
    members: BoardMember[];
  };
  boardOfDirectors: {
    title: string;
    members: BoardMember[];
  };
  boardDisplayOrder: "directors_first" | "commissioners_first";
  tataKelola: {
    title: string;
    subtitle: string;
    columns: TataKelolaColumn[];
  };
}

function MemberCard({ member }: { member: BoardMember }) {
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

interface BoardSectionProps {
  title: string;
  members: BoardMember[];
}

function BoardSection({ title, members }: BoardSectionProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
          {title}
        </h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="flex flex-wrap justify-center gap-10"
      >
        {members.map((member, i) => (
          <MemberCard key={i} member={member} />
        ))}
      </motion.div>
    </div>
  );
}

export default function ManajemenContent({
  boardOfCommissioners,
  boardOfDirectors,
  boardDisplayOrder,
  tataKelola,
}: ManajemenContentProps) {
  const colCount = tataKelola.columns.length;
  const gridColsClass =
    colCount === 1
      ? "grid-cols-1"
      : colCount === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-3";

  const directorsSection = (
    <BoardSection
      key="directors"
      title={boardOfDirectors.title}
      members={boardOfDirectors.members}
    />
  );

  const commissionersSection = (
    <BoardSection
      key="commissioners"
      title={boardOfCommissioners.title}
      members={boardOfCommissioners.members}
    />
  );

  const orderedBoards =
    boardDisplayOrder === "commissioners_first"
      ? [commissionersSection, directorsSection]
      : [directorsSection, commissionersSection];

  return (
    <>
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col gap-20">
          {orderedBoards}
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
            className={`grid ${gridColsClass} gap-8`}
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
