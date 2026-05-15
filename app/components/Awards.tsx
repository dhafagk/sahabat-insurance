// app/components/Awards.tsx
'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const awards = [
  { emoji: '🏆', label: 'Infobank Excellent', year: '2020' },
  { emoji: '🏆', label: 'Infobank Excellent', year: '2021' },
  { emoji: '🏆', label: 'Infobank Excellent', year: '2022' },
  { emoji: '🏆', label: 'Infobank Excellent', year: '2023' },
  { emoji: '🏆', label: 'Infobank Excellent', year: '2024' },
  { emoji: '⭐', label: 'Fitch A(idn)', year: '2026' },
  { emoji: '🥇', label: 'Warta Ekonomi Best Insurance', year: '2024' },
  { emoji: '🥇', label: 'Warta Ekonomi Best Insurance', year: '2025' },
  { emoji: '💼', label: 'The Finance Award', year: '2024' },
  { emoji: '👑', label: 'Indonesia Top Leader', year: '2026' },
]

export default function Awards() {
  return (
    <section id="services" className="py-24 bg-bg" aria-label="Awards and recognition">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Recognition
          </span>
          <h2 className="font-open-sans text-3xl sm:text-4xl font-bold text-text-primary">
            Awards &amp; Recognition
          </h2>
        </div>

        {/* Photo strip */}
        <div className="relative w-full aspect-[16/6] sm:aspect-[21/7] rounded-xl overflow-hidden mb-8">
          <Image
            src="/assets/3.png"
            alt="Sahabat Insurance kantor dan tim"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30 rounded-xl" aria-hidden="true" />
        </div>

        {/* Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {awards.map((award, i) => (
            <div
              key={`${award.label}-${award.year}-${i}`}
              className="flex items-center gap-2 rounded-full bg-card border border-slate-200 shadow-sm px-4 py-2 text-sm"
            >
              <span aria-hidden="true">{award.emoji}</span>
              <span className="font-medium text-text-primary">{award.label}</span>
              <span className="text-text-muted">{award.year}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
