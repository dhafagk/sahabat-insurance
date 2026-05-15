# Sahabat Insurance Homepage — Design Spec

**Date:** 2026-05-15
**Project:** PT Asuransi Sahabat Artha Proteksi — sahabat-insurance
**Branch:** master

---

## Overview

Production-ready marketing homepage for Sahabat Insurance, an Indonesian general insurance company. The page communicates trust, credibility, and product breadth through a modern premium aesthetic inspired by Stripe/Linear/Notion.

---

## Tech Stack

| Item | Version / Detail |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (CSS-based config via `@theme`) |
| Animation | framer-motion (to be installed) |
| Icons | lucide-react (to be installed) |
| Fonts | Fraunces (display/headings) + Plus Jakarta Sans (body) via `next/font/google` |

> **Important:** This project runs Next.js 16 + Tailwind v4. Tailwind v4 uses no `tailwind.config.js` — all custom tokens go in the `@theme` block in `globals.css`.

---

## Design Tokens

Defined in `app/globals.css` under `@theme`:

```css
--color-navy: #21408f;
--color-accent: #6366F1;
--color-bg: #F8F9FC;
--color-card: #FFFFFF;
--color-text-primary: #0F172A;
--color-text-muted: #64748B;
--color-success: #16A34A;
--color-dark: #0F172A;
--font-fraunces: var(--font-fraunces-var);
--font-jakarta: var(--font-jakarta-var);
```

Global additions:
- `html { scroll-behavior: smooth }`
- `@keyframes float` — `y: 0px → -12px → 0px` over 3s, used on hero card

---

## File Structure

```
app/
├── layout.tsx                   ← fonts, metadata, html lang="id"
├── globals.css                  ← @theme tokens, float keyframe, scroll-behavior
├── page.tsx                     ← Server Component, imports all section components
└── components/
    ├── Navbar.tsx               ← "use client" — scroll glass effect, mobile drawer
    ├── Hero.tsx                 ← "use client" — framer-motion stagger + float card
    ├── Products.tsx             ← "use client" — framer-motion whileInView grid
    ├── WhyChooseUs.tsx          ← "use client" — framer-motion whileInView
    ├── Awards.tsx               ← "use client" — framer-motion whileInView
    ├── LatestNews.tsx           ← "use client" — framer-motion whileInView
    ├── CtaBanner.tsx            ← "use client" — framer-motion whileInView
    └── Footer.tsx               ← Server Component (static, no framer-motion)
```

---

## Dependencies to Install

```bash
npm install framer-motion lucide-react
```

---

## Section Specs

### 1. Navbar (`Navbar.tsx`)

- Sticky, `position: fixed`, full width, `z-50`
- **Scroll effect:** `useEffect` listens to `window.scrollY > 10` → adds `backdrop-blur-md bg-white/80 border-b border-slate-200/60`; below threshold → transparent
- **Logo:** Navy `S` letter in a `rounded-xl` square + "Sahabat Insurance" wordmark in Fraunces
- **Nav links:** Products, Services, About, News, Contact — each is an `<a href="#section-id">` that smooth-scrolls
- **CTAs:**
  - "Call Us" — outline pill, `href="tel:02150508080"`
  - "Get a Quote" — solid navy pill, scrolls to `#contact`
- **Mobile:** hamburger (Lucide `Menu` icon) opens a slide-in drawer from right using framer-motion `x: "100%" → 0`; `X` icon closes it; drawer overlays with `bg-black/40` backdrop

---

### 2. Hero (`Hero.tsx`)

- **Background:** gradient mesh `from-[#EEF2FF] via-[#F0F9FF] to-[#F8F9FC]` with two large blurred blob `div`s (navy and accent, `blur-3xl opacity-20`)
- **Layout:** `lg:grid-cols-2`, stacked on mobile (text above, card below)

**Left column — staggered framer-motion fade-in-up:**
1. Trust badge pill: "🏆 Fitch Rated A(idn) · Infobank Excellent 5x"
2. `h1` in Fraunces 5xl/6xl: "Your Trusted Insurance Companion"
3. Subheading (Plus Jakarta Sans): "Solusi Lengkap Perlindungan Asuransi Anda"
4. CTA row:
   - "Get a Free Quote" — navy rounded-full pill
   - "WhatsApp Us" — green (`#16A34A`) rounded-full pill with WhatsApp SVG icon; `href="https://wa.me/622150508080"` target `_blank`
5. Stats row: `13+ Years` | `20+ Branches` | `10+ Products` (Fraunces bold numbers, muted labels, pipe dividers)

**Right column — floating mock policy card:**
- Outer `div`: relative, contains dashed circle rings (`border-2 border-dashed border-navy/20 rounded-full`)
- `motion.div` card: `bg-white rounded-3xl shadow-2xl p-6`, `animate={{ y: [0, -12, 0] }}` `transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}`
- Card content: "Policy Card" label, policy number, product type ("Property All Risk"), coverage amount (IDR 500.000.000), expiry date, status badge ("Active" in green)
- Three floating badges (absolutely positioned, each with offset float delay):
  - Top-right: "Fitch A(idn)" — navy bg
  - Bottom-left: "Infobank Excellent" — accent bg
  - Bottom-right: "⚡ Fast Claims" — white bg with border

---

### 3. Products (`Products.tsx`)

- Section `id="products"`, `bg-[#F8F9FC]`
- Centered: label pill "Our Products" + Fraunces `h2` "Comprehensive Protection for Every Need"
- `motion.div` with `staggerChildren: 0.08` wrapping `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`
- **Each card:**
  - `whileInView={{ opacity: 1, y: 0 }}` fade-in-up, `whileHover={{ y: -8 }}`
  - `bg-white rounded-3xl border border-slate-100 p-6 group transition-all`
  - `hover:border-[#21408f] hover:shadow-xl`
  - Icon: emoji in `rounded-2xl` colored square, `group-hover:scale-110 transition-transform`
  - Title in semibold, short description in muted text
  - "Learn more →" in accent color, arrow slides right on `group-hover:translate-x-1`

**8 products:**
| Emoji | Title | Description |
|---|---|---|
| 🚗 | Motor Vehicle | Comprehensive coverage for cars and motorcycles |
| 🏠 | Property All Risk | Full protection for your home and assets |
| ✈️ | Travel (ANANDA) | Safe travels with comprehensive trip coverage |
| 🛡️ | Personal Accident | Protection for you and your family |
| 🚢 | Marine Cargo | Secure your shipments across sea routes |
| 💰 | Money Insurance | Safeguard your cash and valuables |
| 🔥 | Fire Insurance | Protection against fire and related perils |
| 🏗️ | Contractor's All Risk | Coverage for construction projects |

---

### 4. Why Choose Us (`WhyChooseUs.tsx`)

- `bg-[#0F172A]` full-width section
- `lg:grid-cols-2` layout

**Left col:**
- White Fraunces `h2`: "Why Indonesians Trust Sahabat"
- `text-slate-400` body paragraph about commitment to protection
- "Learn More About Us" outline pill (white border, white text)

**Right col:** `grid grid-cols-2 gap-4`

| Icon (Lucide) | Title | Body |
|---|---|---|
| `Award` | Fitch A(idn) Rating | Nationally recognized financial strength rating |
| `Trophy` | Infobank Excellent ×5 | 5 consecutive years of excellence award |
| `MapPin` | 20+ Branches Nationwide | Serving customers across Indonesia |
| `Zap` | Fast Claims Process | Efficient, transparent claims handling |

- Cards: `bg-[#1e2d4a] rounded-2xl p-5`, icon in `rounded-full bg-accent/20` circle, white title, `text-slate-400` body
- `whileInView` stagger `0.1s` on the 4 cards

---

### 5. Awards & Recognition (`Awards.tsx`)

- `bg-[#F8F9FC]`, centered label pill + Fraunces heading "Awards & Recognition"
- `motion.div` `whileInView` fade-in wrapping a `flex flex-wrap justify-center gap-3`

**8 award pills** (`rounded-full bg-white border shadow-sm px-4 py-2 text-sm`):
1. 🏆 Infobank Excellent 2020
2. 🏆 Infobank Excellent 2021
3. 🏆 Infobank Excellent 2022
4. 🏆 Infobank Excellent 2023
5. 🏆 Infobank Excellent 2024
6. ⭐ Fitch A(idn) 2026
7. 🥇 Warta Ekonomi Best Insurance 2024
8. 🥇 Warta Ekonomi Best Insurance 2025
9. 💼 The Finance Award 2024
10. 👑 Indonesia Top Leader 2026

---

### 6. Latest News (`LatestNews.tsx`)

- `bg-white`, label pill + Fraunces `h2` "Latest News"
- `grid grid-cols-1 md:grid-cols-3 gap-6`
- `staggerChildren: 0.1` `whileInView`

**Each card:** `rounded-3xl bg-white border shadow-md overflow-hidden group`
- Tag pill (accent bg/10, accent text)
- Date in muted text
- Title: `font-semibold line-clamp-2`
- Excerpt: `text-slate-500 text-sm line-clamp-3`
- "Read more →" in accent color with hover underline

**3 static news items:**
1. Tag: Community | Date: 12 Mei 2026 | Title: "Sosialisasi Pencegahan Kebakaran bersama Warga Jakarta Selatan" | Excerpt: Sahabat Insurance menggelar kegiatan sosialisasi pencegahan kebakaran kepada warga...
2. Tag: Awards | Date: 08 Mei 2026 | Title: "Sahabat Insurance Raih Penghargaan Indonesia Financial Top Leader Awards 2026" | Excerpt: PT Asuransi Sahabat Artha Proteksi kembali menorehkan prestasi dengan meraih penghargaan...
3. Tag: Training | Date: 25 Apr 2026 | Title: "Pelatihan Penanganan Klaim Properti untuk Tim Adjuster" | Excerpt: Dalam rangka meningkatkan kompetensi tim, Sahabat Insurance mengadakan sesi pelatihan intensif...

---

### 7. CTA Banner (`CtaBanner.tsx`)

- Outer padding wrapper, inner `rounded-3xl bg-[#21408f]` with `bg-gradient-to-br from-[#2d56c2]/30 to-transparent` inner glow
- Centered content: Fraunces `h2` "Protected by a friend you can trust" (white, large)
- Subtext: "Hubungi kami sekarang untuk konsultasi gratis" (muted white)
- Two pill buttons:
  - "Get a Quote" — white bg, navy text, scrolls to `#contact`
  - "WhatsApp (021) 5050-8080" — `bg-[#16A34A]` green, white text, WhatsApp SVG icon, `href="https://wa.me/622150508080"` target `_blank`
- `whileInView` fade-in-up on the content block

---

### 8. Footer (`Footer.tsx`)

- `bg-[#0F172A]`, `text-slate-400`
- `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-16 px-6`

**Col 1 — Brand:**
- Logo (same as Navbar)
- Tagline: "Solusi Lengkap Perlindungan Asuransi Anda"
- Social icons row: Twitter/X, LinkedIn, Instagram (Lucide icons), each `hover:text-white transition-colors`

**Col 2 — Products:**
- Heading: "Produk" (white, semibold)
- Links: Motor Vehicle, Property All Risk, Travel, Personal Accident, Marine Cargo, Fire Insurance

**Col 3 — Company:**
- Heading: "Perusahaan" (white, semibold)
- Links: Services, About Us, News, Contact, Careers

**Col 4 — Contact:**
- Heading: "Kontak" (white, semibold)
- Phone: (021) 5050-8080
- Email: cs@sahabatinsurance.id
- Address: Jakarta, Indonesia

**Bottom bar:** `border-t border-slate-800 mt-8 pt-8 flex justify-between`
- Left: `© 2026 PT Asuransi Sahabat Artha Proteksi. All rights reserved.`
- Right: "Diawasi oleh OJK" badge (small pill, slate border)

---

## Accessibility Requirements

- All interactive elements have `aria-label`
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`
- Focus rings visible on keyboard navigation (`focus-visible:ring-2 focus-visible:ring-navy`)
- External links: `target="_blank" rel="noopener noreferrer"`
- Color contrast meets WCAG AA on all text/background combinations

---

## Animation Patterns

| Element | Pattern |
|---|---|
| Navbar drawer | `x: "100%" → 0`, `AnimatePresence` |
| Hero content | `staggerChildren: 0.15`, `y: 40 → 0`, `opacity: 0 → 1` |
| Hero card | `animate={{ y: [0, -12, 0] }}`, `repeat: Infinity, duration: 3` |
| Floating badges | same float, `delay: 0.5s / 1s / 1.5s` offset |
| Section reveals | `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}` |
| Product cards | `staggerChildren: 0.08` + `whileHover={{ y: -8 }}` |
| Why Choose Us cards | `staggerChildren: 0.1` |

---

## Data & Content (Static)

All content is hardcoded as TypeScript constants within each component file. No CMS, no API calls. News, products, and awards are static arrays defined at the top of their respective component files.
