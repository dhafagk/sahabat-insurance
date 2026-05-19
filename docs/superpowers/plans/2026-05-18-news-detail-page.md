# News Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/news/[slug]` detail page that fetches a single news article from Payload CMS and renders it with a full-width hero image, article body, and 4-card related news grid.

**Architecture:** Single-column editorial layout as a Next.js async server component. Shared utilities (`TAG_COLORS`, `formatDate`) are lifted from `LatestNews.tsx` so both the listing cards and the detail page use identical styling. The rich text body is rendered with `@payloadcms/richtext-lexical/react`'s `RichText` component.

**Tech Stack:** Next.js 16 App Router, Payload CMS 3.x, `@payloadcms/richtext-lexical`, Framer Motion, Tailwind CSS v4, TypeScript.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `app/(app)/components/LatestNews.tsx` | Export `TAG_COLORS`, `formatDate`, extend `NewsItem` with `slug`, make cards `<Link>` |
| Create | `app/(app)/components/ArticleHeader.tsx` | Breadcrumb + featured image + meta row + H1 + accent line |
| Create | `app/(app)/components/ArticleBody.tsx` | Lexical rich text renderer + tags footer row |
| Create | `app/(app)/news/[slug]/page.tsx` | Server component: data fetch, `generateMetadata`, `notFound()` |

---

## Task 1: Extend `LatestNews.tsx` — export shared utilities and add slug linking

**Files:**
- Modify: `app/(app)/components/LatestNews.tsx`

The `TAG_COLORS` map and `formatDate` function are currently private to `LatestNews.tsx`. The detail page needs them too. Export both, add `slug` to `NewsItem`, and wrap each card in a `<Link>` so clicking navigates to `/news/[slug]`.

- [ ] **Step 1: Add `slug` to `NewsItem`, export `TAG_COLORS` and `formatDate`, wrap cards in `<Link>`**

Replace the top of `app/(app)/components/LatestNews.tsx` — change `TAG_COLORS`, `formatDate`, and `NewsItem` as shown:

```tsx
// app/(app)/components/LatestNews.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface MediaValue {
  url?: string | null
}

interface TagValue {
  id: string
  name: string
}

export interface NewsItem {
  id?: string
  tags?: (TagValue | string)[] | null
  date: string
  title: string
  excerpt: string
  image?: MediaValue | string | null
  slug?: string | null
}

export interface SectionMeta {
  badge?: string | null
  heading?: string | null
}

interface LatestNewsProps {
  news?: NewsItem[]
  sectionMeta?: SectionMeta | null
}

export const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Community: { bg: '#EEF2FF', text: '#4F46E5' },
  Awards: { bg: '#DBEAFE', text: '#1D4ED8' },
  Training: { bg: '#DCFCE7', text: '#15803D' },
  Product: { bg: '#FEF3C7', text: '#B45309' },
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
```

- [ ] **Step 2: Wrap each card in `<Link>` using the slug**

Inside the `.map()` in `LatestNews.tsx`, replace the `<motion.article>` element so it renders as a link. Find:

```tsx
return (
  <motion.article
    key={item.title}
    variants={cardVariants}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-lg transition-shadow duration-300 flex flex-col cursor-pointer"
  >
```

Replace with:

```tsx
const href = item.slug ? `/news/${item.slug}` : '#'
return (
  <motion.article
    key={item.title}
    variants={cardVariants}
    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-lg transition-shadow duration-300 flex flex-col"
  >
    <Link href={href} className="flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl">
```

And close the `<Link>` just before the closing `</motion.article>`:

```tsx
    </Link>
  </motion.article>
```

Also remove the `resolveImageUrl` function (it is duplicated — keep only the exported ones) and update the import of `formatDate`/`resolveImageUrl` to use the exported versions internally. The `resolveImageUrl` helper stays private (not exported) since only `LatestNews` needs it:

```tsx
function resolveImageUrl(image: MediaValue | string | null | undefined): string {
  if (!image) return '/assets/3.png'
  if (typeof image === 'string') return image
  return image.url ?? '/assets/3.png'
}
```

Keep this function as-is (it was already there). Just ensure `formatDate` is now the exported version.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd C:/Users/kdhafa/Documents/ngoding/sahabat-insurance && npx tsc --noEmit
```

Expected: no errors related to `LatestNews.tsx`.

- [ ] **Step 4: Start dev server and verify homepage cards still render**

```bash
npm run dev
```

Open `http://localhost:3969` — the Latest News section should look identical to before. Hovering a card should show a pointer cursor. No console errors.

---

## Task 2: Create `ArticleHeader.tsx`

**Files:**
- Create: `app/(app)/components/ArticleHeader.tsx`

This client component renders: breadcrumb, full-width featured image (with first-tag overlay), meta row (all tags + date), H1 title, and the indigo accent line. It uses framer-motion stagger fade-up matching the `Hero.tsx` animation pattern.

- [ ] **Step 1: Create the file**

```tsx
// app/(app)/components/ArticleHeader.tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { TAG_COLORS, formatDate } from './LatestNews'

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

function TagPill({ name }: { name: string }) {
  const colors = TAG_COLORS[name] ?? { bg: '#F1F5F9', text: '#64748B' }
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: colors.bg, color: colors.text }}
    >
      {name}
    </span>
  )
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors.

---

## Task 3: Create `ArticleBody.tsx`

**Files:**
- Create: `app/(app)/components/ArticleBody.tsx`

This client component renders the Lexical rich-text content and the tags footer below the article body.

- [ ] **Step 1: Create the file**

```tsx
// app/(app)/components/ArticleBody.tsx
'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { TAG_COLORS } from './LatestNews'

interface TagValue {
  id: string | number
  name: string
}

interface SerializedLexicalContent {
  root: {
    type: string
    children: { type: unknown; version: number; [k: string]: unknown }[]
    direction: 'ltr' | 'rtl' | null
    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''
    indent: number
    version: number
  }
}

interface ArticleBodyProps {
  content: SerializedLexicalContent
  tags: TagValue[]
}

function TagPill({ name }: { name: string }) {
  const colors = TAG_COLORS[name] ?? { bg: '#F1F5F9', text: '#64748B' }
  return (
    <span
      className="px-3 py-1 rounded-full text-xs font-semibold"
      style={{ background: colors.bg, color: colors.text }}
    >
      {name}
    </span>
  )
}

export default function ArticleBody({ content, tags }: ArticleBodyProps) {
  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Rich text */}
      <div className="prose prose-slate max-w-none text-text-primary [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_p]:leading-relaxed [&_p]:mb-4 [&_a]:text-accent [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
        <RichText data={content} />
      </div>

      {/* Tags footer */}
      {tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4 mt-8">
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
            Tags:
          </span>
          {tags.map((tag) => (
            <TagPill key={tag.id} name={tag.name} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors.

---

## Task 4: Create `app/(app)/news/[slug]/page.tsx`

**Files:**
- Create: `app/(app)/news/[slug]/page.tsx`

The main server component. Fetches the article by slug, fetches 4 related news items, renders everything, returns `notFound()` when the slug doesn't exist or the article is not published.

- [ ] **Step 1: Create the directory and file**

```bash
mkdir -p "app/(app)/news/[slug]"
```

- [ ] **Step 2: Write the page**

```tsx
// app/(app)/news/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ArticleHeader from '../../components/ArticleHeader'
import ArticleBody from '../../components/ArticleBody'
import LatestNews from '../../components/LatestNews'
import type { NewsItem } from '../../components/LatestNews'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function fetchArticle(slug: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = await getPayload({ config }) as any
  const result = await payload.find({
    collection: 'news',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

async function fetchRelated(excludeId: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = await getPayload({ config }) as any
  const result = await payload.find({
    collection: 'news',
    where: { id: { not_equals: excludeId }, status: { equals: 'published' } },
    sort: '-date',
    limit: 4,
    depth: 1,
  })
  return result.docs
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await fetchArticle(slug)
  if (!article) return {}
  return {
    title: `${article.title} | Sahabat Insurance`,
    description: article.excerpt ?? undefined,
  }
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params
  const article = await fetchArticle(slug)
  if (!article) notFound()

  const relatedDocs = await fetchRelated(article.id)

  // Resolve image URL (depth:2 resolves image to Media object)
  const imageUrl: string =
    typeof article.image === 'object' && article.image?.url
      ? article.image.url
      : '/assets/3.png'

  // Resolve tags (depth:2 resolves to Tag objects)
  const tags: { id: string | number; name: string }[] = (article.tags ?? [])
    .filter((t: unknown) => typeof t === 'object' && t !== null)
    .map((t: { id: number; name: string }) => ({ id: t.id, name: t.name }))

  // Map related docs to NewsItem shape
  const relatedNews: NewsItem[] = relatedDocs.map((doc: {
    id: number
    title: string
    excerpt?: string | null
    date: string
    slug?: string | null
    tags?: ({ id: number; name: string } | number)[] | null
    image?: { url?: string | null } | number | null
  }) => ({
    id: String(doc.id),
    title: doc.title,
    excerpt: doc.excerpt ?? '',
    date: doc.date,
    slug: doc.slug ?? null,
    tags: (doc.tags ?? [])
      .filter((t) => typeof t === 'object')
      .map((t) => ({ id: String((t as { id: number; name: string }).id), name: (t as { id: number; name: string }).name })),
    image:
      typeof doc.image === 'object' && doc.image !== null
        ? { url: doc.image.url ?? null }
        : null,
  }))

  return (
    <>
      <Navbar />
      <main className="bg-bg min-h-screen pb-0">
        {/* Article header: breadcrumb + image + meta + title */}
        <ArticleHeader
          title={article.title}
          date={article.date}
          tags={tags}
          imageUrl={imageUrl}
          imageAlt={article.title}
        />

        {/* Rich text body + tags footer */}
        <ArticleBody content={article.content} tags={tags} />

        {/* Related news */}
        {relatedNews.length > 0 && (
          <div className="mt-16">
            <LatestNews
              news={relatedNews}
              sectionMeta={{ badge: 'Berita', heading: 'Berita Terkait' }}
            />
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Test the page in the browser**

Ensure the dev server is running (`npm run dev`). 

1. Open the Payload admin at `http://localhost:3969/admin` and verify at least one news article exists with status `published` and a slug.
2. Navigate to `http://localhost:3969/news/<that-slug>`.
3. Verify:
   - Navbar and Footer render
   - Breadcrumb shows correct links
   - Featured image fills the width, tag pill overlays the top-left corner
   - Meta row shows tag pills and formatted date (Indonesian locale)
   - H1 title renders with the indigo accent line beneath
   - Article body renders formatted text
   - Tags footer appears below the body
   - Related news grid shows up to 4 cards
   - Each related news card links to its own `/news/[slug]`
4. Navigate to `http://localhost:3969/news/nonexistent-slug` — should render the Next.js 404 page.
5. On the homepage, click a news card — should navigate to the detail page.

---

## Task 5: Handle missing `/news` listing route (stub)

The breadcrumb links to `/news`. Without a listing page that route returns a 404, which is confusing. Add a minimal stub so clicking "Berita" in the breadcrumb doesn't break.

**Files:**
- Create: `app/(app)/news/page.tsx`

- [ ] **Step 1: Create the stub**

```tsx
// app/(app)/news/page.tsx
import { redirect } from 'next/navigation'

export default function NewsIndexPage() {
  redirect('/#news')
}
```

This redirects to the homepage news section anchor until a full listing page is built. It is intentionally minimal — the listing page is out of scope for this feature.

- [ ] **Step 2: Verify**

Navigate to `http://localhost:3969/news` — should redirect to `http://localhost:3969/#news`.
