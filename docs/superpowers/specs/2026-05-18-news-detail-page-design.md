# News Detail Page — Design Spec

**Date:** 2026-05-18  
**Status:** Approved  

---

## Overview

A news detail page at `/news/[slug]` that displays a single news article fetched from Payload CMS by its slug. The page reuses the existing Navbar and Footer and follows the established design language: navy (`#21408f`), indigo accent (`#6366f1`), `#f8f9fc` background, white cards, Open Sans font, rounded-2xl corners, and framer-motion fade-up animations.

---

## Layout

Single-column editorial layout. All content is horizontally centered within a max-width container.

```
Navbar
Breadcrumb           (max-w-5xl, px-6)
Featured Image       (max-w-5xl, full-width rounded-2xl, aspect-[16/9])
  └─ Tag pill overlay (top-left corner of image)
Article header       (max-w-3xl centered)
  ├─ Tag pills row + date
  ├─ H1 title
  └─ Indigo accent line (60px gradient underline)
Rich text content    (max-w-3xl centered)
Tags footer row      (max-w-3xl, border-top divider)
Related news section (white bg, max-w-5xl, 4-card grid)
Footer
```

---

## Sections

### Breadcrumb
- Text: `Beranda › Berita › [truncated title]`
- Links: Beranda → `/`, Berita → `/news`
- Style: `text-xs text-text-muted`, last segment in `text-text-primary`

### Featured Image
- Full-width within `max-w-5xl` container, `aspect-[16/9]`, `rounded-2xl`, `overflow-hidden`
- Uses Next.js `<Image fill>` with `object-cover`
- Tag pill (first tag only) overlaid at `top-4 left-4` with the same tag color system used on the homepage cards

### Article Header
- **Meta row**: all tag pills (same `TAG_COLORS` map from `LatestNews.tsx`) + `·` separator + formatted date (`dd MMMM yyyy` in `id-ID` locale)
- **Title**: `text-3xl sm:text-4xl font-bold text-text-primary leading-snug`
- **Accent line**: `w-16 h-0.5 bg-gradient-to-r from-accent to-transparent rounded-full`

### Rich Text Content
- Rendered with `@payloadcms/richtext-lexical`'s `RichText` component (or `@payloadcms/richtext-lexical/react` renderer)
- Prose styling via Tailwind's `prose prose-slate` (or hand-rolled equivalents matching the site font/color)
- Max width `max-w-3xl mx-auto`

### Tags Footer
- Sits below the article body, above the related news section
- `border-t border-slate-200 pt-4`
- Label: `text-xs font-semibold text-text-muted uppercase tracking-wide` → "Tags:"
- Pills: same colored pill components as the meta row

### Related News
- White background section (`bg-card`) with `py-16`
- Section header: indigo badge "Berita" + `text-2xl font-bold` heading "Berita Terkait" — matches the LatestNews section header pattern
- 4-card grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- Cards: identical markup and hover behavior to `LatestNews` cards (image, tag, date, title, "Baca selengkapnya →")
- Cards link to their own `/news/[slug]`
- **Fetch strategy**: query the 4 most recent published news items excluding the current article's ID, sorted by `-date`

---

## Data Fetching

Route: `app/(app)/news/[slug]/page.tsx` — async server component.

```
1. payload.find({ collection: 'news', where: { slug: { equals: slug }, status: { equals: 'published' } }, limit: 1, depth: 2 })
   → if not found: notFound()
2. payload.find({ collection: 'news', where: { id: { not_equals: article.id }, status: { equals: 'published' } }, sort: '-date', limit: 4, depth: 1 })
   → relatedNews
```

`depth: 2` on the main article resolves `tags` (Tag objects with `name`) and `image` (Media object with `url`).

---

## Routing

- File: `app/(app)/news/[slug]/page.tsx`
- `generateMetadata`: sets `title` to `[article title] | Sahabat Insurance` and `description` to the article `excerpt`
- `export const dynamic = 'force-dynamic'` (consistent with the homepage)

---

## Components

| Component | File | Notes |
|---|---|---|
| `NewsDetailPage` | `app/(app)/news/[slug]/page.tsx` | Server component, data fetching |
| `ArticleHeader` | `app/(app)/components/ArticleHeader.tsx` | Breadcrumb + image + meta + title |
| `ArticleBody` | `app/(app)/components/ArticleBody.tsx` | Rich text renderer + tags footer |
| `RelatedNews` | Reuse `LatestNews.tsx` or inline | 4-card grid, same card component |

New shared types should extend the existing `NewsItem` interface in `LatestNews.tsx` rather than duplicating.

---

## Animations

- `ArticleHeader` elements: stagger fade-up (same `fadeUp` / `stagger` variants used in `Hero.tsx`)
- Related news cards: same `containerVariants` / `cardVariants` from `LatestNews.tsx`
- Image: no animation (avoids CLS on the hero image)

---

## Error States

- Slug not found → Next.js `notFound()` (renders the app's 404 page)
- Missing featured image → fall back to `/assets/3.png` (same fallback as homepage cards)

---

## Out of Scope

- Comments or social sharing
- Author attribution
- Print styles
- Search or filter on the `/news` listing page (separate feature)
