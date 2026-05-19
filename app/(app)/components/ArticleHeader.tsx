// app/(app)/components/ArticleHeader.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TAG_COLORS, formatDate } from './LatestNews'
import TagPill from './ui/TagPill'

interface TagValue {
  id: string | number
  name: string
}

export interface ArticleHeaderProps {
  title: string
  date: string
  tags: TagValue[]
  imageUrl: string
  imageAlt: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}

export default function ArticleHeader({
  title,
  date,
  tags,
  imageUrl,
  imageAlt,
}: ArticleHeaderProps) {
  const firstTag = tags[0]
  const firstTagColors = firstTag
    ? TAG_COLORS[firstTag.name] ?? { bg: '#F1F5F9', text: '#64748B' }
    : null

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-xs text-text-muted pt-6 pb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-text-primary transition-colors">Beranda</Link>
        <span className="mx-1">›</span>
        <Link href="/news" className="hover:text-text-primary transition-colors">Berita</Link>
        <span className="mx-1">›</span>
        <span className="text-text-primary truncate max-w-[200px] sm:max-w-xs">{title}</span>
      </nav>

      {/* Featured image */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        {firstTag && firstTagColors && (
          <span
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: firstTagColors.bg, color: firstTagColors.text }}
          >
            {firstTag.name}
          </span>
        )}
      </div>

      {/* Article header — stagger fade-up */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-3xl mx-auto"
      >
        {/* Meta row: tags + date */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 mb-4">
          {tags.map((tag) => (
            <TagPill key={tag.id} name={tag.name} />
          ))}
          {tags.length > 0 && <span className="text-text-muted text-xs">·</span>}
          <span className="text-xs text-text-muted">{formatDate(date)}</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl sm:text-4xl font-bold text-text-primary leading-snug mb-4"
        >
          {title}
        </motion.h1>

        {/* Accent line */}
        <motion.div
          variants={fadeUp}
          className="w-16 h-0.5 rounded-full bg-gradient-to-r from-accent to-transparent mb-8"
        />
      </motion.div>
    </div>
  )
}
