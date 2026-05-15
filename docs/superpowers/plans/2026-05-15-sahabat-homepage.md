# Sahabat Insurance Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready marketing homepage for PT Asuransi Sahabat Artha Proteksi with 8 sections: Navbar, Hero, Products, Why Choose Us, Awards, Latest News, CTA Banner, and Footer.

**Architecture:** Server Component root page (`app/page.tsx`) imports 8 focused Client Component sections from `app/components/`. Tailwind v4 custom tokens defined in `globals.css` `@theme` block. Framer-motion handles all scroll reveals, stagger animations, and the hero floating card.

**Tech Stack:** Next.js 16.2.6 (App Router), React 19, TypeScript, Tailwind CSS v4, framer-motion, lucide-react, next/font/google (Fraunces + Plus Jakarta Sans)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `package.json` | — | framer-motion + lucide-react added via npm |
| `app/globals.css` | Modify | Tailwind v4 `@theme` tokens, float keyframe, scroll-behavior |
| `app/layout.tsx` | Modify | Fraunces + Plus Jakarta Sans fonts, metadata, lang="id" |
| `app/page.tsx` | Rewrite | Server Component shell, imports all sections |
| `app/components/Navbar.tsx` | Create | Sticky nav, glassmorphism on scroll, mobile drawer |
| `app/components/Hero.tsx` | Create | Staggered hero, floating policy card + badges |
| `app/components/Products.tsx` | Create | 4-col product grid with hover animations |
| `app/components/WhyChooseUs.tsx` | Create | Dark section, 2×2 reasons grid |
| `app/components/Awards.tsx` | Create | Award pill badges strip |
| `app/components/LatestNews.tsx` | Create | 3-col news card grid |
| `app/components/CtaBanner.tsx` | Create | Navy CTA banner with two pill buttons |
| `app/components/Footer.tsx` | Create | 4-col footer, Server Component |

---

## Task 0: Install Dependencies

**Files:** `package.json` (updated by npm)

- [ ] **Step 1: Install framer-motion and lucide-react**

```bash
npm install framer-motion lucide-react
```

Expected output: added 2 packages (versions may vary), no errors.

- [ ] **Step 2: Verify installation**

```bash
node -e "require('framer-motion'); require('lucide-react'); console.log('OK')"
```

Expected output: `OK`

---

## Task 1: Update globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css with design tokens, keyframe, and scroll behavior**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
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
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #F8F9FC;
  color: #0F172A;
  font-family: var(--font-jakarta-var), Arial, sans-serif;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delay-1 {
  animation: float 3s ease-in-out 0.5s infinite;
}

.animate-float-delay-2 {
  animation: float 3s ease-in-out 1s infinite;
}

.animate-float-delay-3 {
  animation: float 3s ease-in-out 1.5s infinite;
}
```

- [ ] **Step 2: Start dev server and verify no CSS errors**

```bash
npm run dev
```

Visit `http://localhost:3000` — expect default boilerplate page with no CSS errors in terminal.

---

## Task 2: Update layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx with Fraunces + Plus Jakarta Sans fonts and updated metadata**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces-var',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta-var',
})

export const metadata: Metadata = {
  title: 'Sahabat Insurance — Solusi Lengkap Perlindungan Asuransi Anda',
  description:
    'PT Asuransi Sahabat Artha Proteksi — Fitch Rated A(idn), Infobank Excellent 5 tahun berturut-turut, 20+ cabang di seluruh Indonesia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Verify fonts load**

With dev server running, visit `http://localhost:3000` and open DevTools → Network → filter by "font". Expect Fraunces and Plus Jakarta Sans font files to be served (or 304 cached after first load).

---

## Task 3: Create app/page.tsx

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1: Rewrite page.tsx as a Server Component that imports all sections**

```tsx
// app/page.tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import WhyChooseUs from './components/WhyChooseUs'
import Awards from './components/Awards'
import LatestNews from './components/LatestNews'
import CtaBanner from './components/CtaBanner'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <WhyChooseUs />
        <Awards />
        <LatestNews />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
```

Note: This will error until all component files exist. That's expected — proceed to create them in order.

---

## Task 4: Create Navbar.tsx

**Files:**
- Create: `app/components/Navbar.tsx`

- [ ] **Step 1: Create the Navbar component**

```tsx
// app/components/Navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-white/80 border-b border-slate-200/60 shadow-sm'
            : 'bg-transparent'
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5" aria-label="Sahabat Insurance home">
            <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center">
              <span className="text-white font-fraunces font-bold text-sm">S</span>
            </div>
            <span className="font-fraunces font-semibold text-text-primary text-lg">
              Sahabat Insurance
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:02150508080"
              className="px-4 py-2 text-sm font-medium rounded-full border border-navy text-navy hover:bg-navy hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
              aria-label="Call us at (021) 5050-8080"
            >
              Call Us
            </a>
            <a
              href="#contact"
              className="px-4 py-2 text-sm font-medium rounded-full bg-navy text-white hover:bg-navy/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 shadow-2xl flex flex-col p-6"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center">
                    <span className="text-white font-fraunces font-bold text-sm">S</span>
                  </div>
                  <span className="font-fraunces font-semibold text-text-primary">
                    Sahabat Insurance
                  </span>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setDrawerOpen(false)}
                    className="px-3 py-2.5 rounded-xl text-text-primary hover:bg-slate-50 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-6">
                <a
                  href="tel:02150508080"
                  className="px-4 py-3 text-sm font-medium rounded-full border border-navy text-navy text-center hover:bg-navy hover:text-white transition-all"
                  aria-label="Call us"
                >
                  Call Us
                </a>
                <a
                  href="#contact"
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-3 text-sm font-medium rounded-full bg-navy text-white text-center hover:bg-navy/90 transition-all"
                >
                  Get a Quote
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Verify Navbar renders**

With dev server running, visit `http://localhost:3000`. Expect: transparent navbar at top. Scroll down → navbar gets glass effect. On mobile viewport (< 768px), hamburger appears and drawer slides in.

---

## Task 5: Create Hero.tsx

**Files:**
- Create: `app/components/Hero.tsx`

- [ ] **Step 1: Create the Hero component**

```tsx
// app/components/Hero.tsx
'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const whatsappUrl = 'https://wa.me/622150508080'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const stats = [
  { value: '13+', label: 'Years' },
  { value: '20+', label: 'Branches' },
  { value: '10+', label: 'Products' },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        background: 'linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 50%, #F8F9FC 100%)',
      }}
      aria-label="Hero section"
    >
      {/* Background blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#21408f' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: '#6366F1' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left column */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {/* Trust badge */}
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-text-muted shadow-sm">
              🏆 Fitch Rated A(idn) · Infobank Excellent 5x
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight tracking-tight"
          >
            Your Trusted Insurance Companion
          </motion.h1>

          {/* Subheading */}
          <motion.p variants={fadeUp} className="text-lg text-text-muted leading-relaxed max-w-lg">
            Solusi Lengkap Perlindungan Asuransi Anda — hadir untuk melindungi
            Anda, keluarga, dan aset berharga Anda.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-navy/90 transition-all shadow-lg shadow-navy/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy"
            >
              Get a Free Quote
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success"
              style={{ background: '#16A34A' }}
              aria-label="WhatsApp us"
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp} className="flex items-center gap-6 pt-2">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-fraunces text-2xl font-bold text-text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-8 bg-slate-200" aria-hidden="true" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right column — floating policy card */}
        <div className="relative flex items-center justify-center">
          {/* Dashed circle rings */}
          <div
            className="absolute w-80 h-80 rounded-full border-2 border-dashed opacity-20 pointer-events-none"
            style={{ borderColor: '#21408f' }}
            aria-hidden="true"
          />
          <div
            className="absolute w-64 h-64 rounded-full border-2 border-dashed opacity-10 pointer-events-none"
            style={{ borderColor: '#21408f' }}
            aria-hidden="true"
          />

          {/* Policy card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="relative bg-white rounded-3xl shadow-2xl p-6 w-72"
            aria-label="Sample policy card"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center">
                  <span className="text-white font-fraunces font-bold text-xs">S</span>
                </div>
                <span className="text-xs font-medium text-text-muted">Policy Card</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-success">
                Active
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-text-muted">Policy Number</div>
                <div className="text-sm font-semibold text-text-primary">SAP-2026-00142</div>
              </div>
              <div>
                <div className="text-xs text-text-muted">Product</div>
                <div className="text-sm font-semibold text-text-primary">Property All Risk</div>
              </div>
              <div>
                <div className="text-xs text-text-muted">Coverage</div>
                <div className="text-sm font-semibold text-text-primary">IDR 500.000.000</div>
              </div>
              <div>
                <div className="text-xs text-text-muted">Valid Until</div>
                <div className="text-sm font-semibold text-text-primary">15 Mei 2027</div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-8/12 rounded-full bg-navy" />
              </div>
              <div className="text-xs text-text-muted mt-1">8 months remaining</div>
            </div>

            {/* Floating badge: Fitch */}
            <div
              className="absolute -top-4 -right-4 animate-float-delay-1 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg"
              style={{ background: '#21408f' }}
              aria-label="Fitch A(idn) rating"
            >
              ⭐ Fitch A(idn)
            </div>

            {/* Floating badge: Infobank */}
            <div
              className="absolute -bottom-4 -left-4 animate-float-delay-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg"
              style={{ background: '#6366F1' }}
              aria-label="Infobank Excellent award"
            >
              🏆 Infobank Excellent
            </div>

            {/* Floating badge: Fast Claims */}
            <div
              className="absolute -bottom-4 -right-4 animate-float-delay-3 px-3 py-1.5 rounded-full text-xs font-semibold text-text-primary bg-white border border-slate-200 shadow-lg"
              aria-label="Fast claims process"
            >
              ⚡ Fast Claims
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify Hero renders**

Visit `http://localhost:3000`. Expect: gradient hero with staggered text fade-in, floating policy card, three floating badges with offset animation delays.

---

## Task 6: Create Products.tsx

**Files:**
- Create: `app/components/Products.tsx`

- [ ] **Step 1: Create the Products component**

```tsx
// app/components/Products.tsx
'use client'

import { motion } from 'framer-motion'

interface Product {
  emoji: string
  title: string
  description: string
  color: string
}

const products: Product[] = [
  { emoji: '🚗', title: 'Motor Vehicle', description: 'Comprehensive coverage for cars and motorcycles', color: '#FEF3C7' },
  { emoji: '🏠', title: 'Property All Risk', description: 'Full protection for your home and assets', color: '#DBEAFE' },
  { emoji: '✈️', title: 'Travel (ANANDA)', description: 'Safe travels with comprehensive trip coverage', color: '#E0E7FF' },
  { emoji: '🛡️', title: 'Personal Accident', description: 'Protection for you and your family', color: '#D1FAE5' },
  { emoji: '🚢', title: 'Marine Cargo', description: 'Secure your shipments across sea routes', color: '#CFFAFE' },
  { emoji: '💰', title: 'Money Insurance', description: 'Safeguard your cash and valuables', color: '#FEF9C3' },
  { emoji: '🔥', title: 'Fire Insurance', description: 'Protection against fire and related perils', color: '#FFE4E6' },
  { emoji: '🏗️', title: "Contractor's All Risk", description: 'Coverage for construction projects', color: '#F3E8FF' },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Products() {
  return (
    <section id="products" className="py-24 bg-bg" aria-label="Our products">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Our Products
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-text-primary">
            Comprehensive Protection for Every Need
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {products.map((product) => (
            <motion.div
              key={product.title}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="bg-card rounded-3xl border border-slate-100 p-6 group transition-all duration-300 hover:border-navy hover:shadow-xl cursor-pointer"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ background: product.color }}
                aria-hidden="true"
              >
                {product.emoji}
              </div>

              {/* Content */}
              <h3 className="font-semibold text-text-primary mb-2 text-base">{product.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">{product.description}</p>

              {/* Link */}
              <span className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                Learn more
                <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                  →
                </span>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify Products renders**

Scroll down on `http://localhost:3000`. Expect: 4-column product grid (on desktop), cards fade in on scroll with stagger, hover lifts card and turns border navy.

---

## Task 7: Create WhyChooseUs.tsx

**Files:**
- Create: `app/components/WhyChooseUs.tsx`

- [ ] **Step 1: Create the WhyChooseUs component**

```tsx
// app/components/WhyChooseUs.tsx
'use client'

import { motion } from 'framer-motion'
import { Award, Trophy, MapPin, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Reason {
  Icon: LucideIcon
  title: string
  body: string
}

const reasons: Reason[] = [
  { Icon: Award, title: 'Fitch A(idn) Rating', body: 'Nationally recognized financial strength rating' },
  { Icon: Trophy, title: 'Infobank Excellent ×5', body: '5 consecutive years of excellence award' },
  { Icon: MapPin, title: '20+ Branches Nationwide', body: 'Serving customers across Indonesia' },
  { Icon: Zap, title: 'Fast Claims Process', body: 'Efficient, transparent claims handling' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="py-24"
      style={{ background: '#0F172A' }}
      aria-label="Why choose Sahabat Insurance"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold w-fit">
            Why Choose Us
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-white leading-tight">
            Why Indonesians Trust Sahabat
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-md">
            Selama lebih dari 13 tahun, kami telah memberikan perlindungan terbaik
            kepada jutaan pelanggan di seluruh Indonesia dengan layanan yang cepat,
            transparan, dan dapat diandalkan.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center w-fit px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-dark transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Learn More About Us
          </a>
        </div>

        {/* Right — 2×2 grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 gap-4"
        >
          {reasons.map(({ Icon, title, body }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: '#1e2d4a' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(99,102,241,0.2)' }}
                aria-hidden="true"
              >
                <Icon size={18} style={{ color: '#6366F1' }} />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">{title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify WhyChooseUs renders**

Scroll to the dark section. Expect: dark navy background, left text + CTA, right 2×2 grid of reason cards fading in with stagger.

---

## Task 8: Create Awards.tsx

**Files:**
- Create: `app/components/Awards.tsx`

- [ ] **Step 1: Create the Awards component**

```tsx
// app/components/Awards.tsx
'use client'

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
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            Recognition
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-text-primary">
            Awards &amp; Recognition
          </h2>
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
```

- [ ] **Step 2: Verify Awards renders**

Scroll to the awards section. Expect: flex-wrap pill badges with emoji, name, and year. All 10 pills visible.

---

## Task 9: Create LatestNews.tsx

**Files:**
- Create: `app/components/LatestNews.tsx`

- [ ] **Step 1: Create the LatestNews component**

```tsx
// app/components/LatestNews.tsx
'use client'

import { motion } from 'framer-motion'

interface NewsItem {
  tag: string
  date: string
  title: string
  excerpt: string
}

const newsItems: NewsItem[] = [
  {
    tag: 'Community',
    date: '12 Mei 2026',
    title: 'Sosialisasi Pencegahan Kebakaran bersama Warga Jakarta Selatan',
    excerpt:
      'Sahabat Insurance menggelar kegiatan sosialisasi pencegahan kebakaran kepada warga Jakarta Selatan sebagai bentuk tanggung jawab sosial perusahaan terhadap masyarakat.',
  },
  {
    tag: 'Awards',
    date: '08 Mei 2026',
    title: 'Sahabat Insurance Raih Penghargaan Indonesia Financial Top Leader Awards 2026',
    excerpt:
      'PT Asuransi Sahabat Artha Proteksi kembali menorehkan prestasi dengan meraih penghargaan bergengsi di ajang Indonesia Financial Top Leader Awards 2026.',
  },
  {
    tag: 'Training',
    date: '25 Apr 2026',
    title: 'Pelatihan Penanganan Klaim Properti untuk Tim Adjuster',
    excerpt:
      'Dalam rangka meningkatkan kompetensi tim, Sahabat Insurance mengadakan sesi pelatihan intensif penanganan klaim properti bagi seluruh adjuster internal.',
  },
]

const tagColors: Record<string, string> = {
  Community: '#6366F1',
  Awards: '#21408f',
  Training: '#16A34A',
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function LatestNews() {
  return (
    <section id="news" className="py-24 bg-card" aria-label="Latest news">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
            News
          </span>
          <h2 className="font-fraunces text-3xl sm:text-4xl font-bold text-text-primary">
            Latest News
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {newsItems.map((item) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              className="bg-card rounded-3xl border border-slate-100 shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: tagColors[item.tag] ?? '#64748B' }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-xs text-text-muted">{item.date}</span>
                </div>
                <h3 className="font-semibold text-text-primary leading-snug line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed line-clamp-3 flex-1">
                  {item.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline mt-auto">
                  Read more →
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify LatestNews renders**

Scroll to the news section. Expect: 3-column card grid with tag pills, clamped titles, and excerpts.

---

## Task 10: Create CtaBanner.tsx

**Files:**
- Create: `app/components/CtaBanner.tsx`

- [ ] **Step 1: Create the CtaBanner component**

```tsx
// app/components/CtaBanner.tsx
'use client'

import { motion } from 'framer-motion'

const whatsappUrl = 'https://wa.me/622150508080'

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

export default function CtaBanner() {
  return (
    <section id="contact" className="py-16 px-6" aria-label="Contact call to action">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl px-8 py-16 text-center relative overflow-hidden"
          style={{ background: '#21408f' }}
        >
          {/* Inner glow */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 30% 40%, rgba(45,86,194,0.4) 0%, transparent 60%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-tight">
              Protected by a friend you can trust
            </h2>
            <p className="text-white/70 text-lg">
              Hubungi kami sekarang untuk konsultasi gratis
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <a
                href="#products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-navy font-semibold hover:bg-white/90 transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Get a Quote
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success"
                style={{ background: '#16A34A' }}
                aria-label="WhatsApp us at (021) 5050-8080"
              >
                <WhatsAppIcon />
                WhatsApp (021) 5050-8080
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify CtaBanner renders**

Scroll to the CTA section. Expect: navy rounded card with inner glow, white heading, two pill buttons.

---

## Task 11: Create Footer.tsx

**Files:**
- Create: `app/components/Footer.tsx`

- [ ] **Step 1: Create the Footer component (Server Component — no "use client")**

```tsx
// app/components/Footer.tsx
import { Twitter, Linkedin, Instagram } from 'lucide-react'

const productLinks = [
  'Motor Vehicle',
  'Property All Risk',
  'Travel (ANANDA)',
  'Personal Accident',
  'Marine Cargo',
  'Fire Insurance',
]

const companyLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About Us', href: '#about' },
  { label: 'News', href: '#news' },
  { label: 'Contact', href: '#contact' },
  { label: 'Careers', href: '#careers' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0F172A' }} aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <a href="/" className="flex items-center gap-2.5" aria-label="Sahabat Insurance home">
              <div className="w-8 h-8 rounded-xl bg-navy flex items-center justify-center flex-shrink-0">
                <span className="text-white font-fraunces font-bold text-sm">S</span>
              </div>
              <span className="font-fraunces font-semibold text-white text-base">
                Sahabat Insurance
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed">
              Solusi Lengkap Perlindungan Asuransi Anda
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Col 2 — Products */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Produk</h3>
            <nav aria-label="Product links">
              <ul className="flex flex-col gap-2">
                {productLinks.map((label) => (
                  <li key={label}>
                    <a
                      href="#products"
                      className="text-slate-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Perusahaan</h3>
            <nav aria-label="Company links">
              <ul className="flex flex-col gap-2">
                {companyLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-slate-400 hover:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Kontak</h3>
            <address className="not-italic flex flex-col gap-2">
              <a
                href="tel:02150508080"
                className="text-slate-400 hover:text-white text-sm transition-colors"
                aria-label="Phone number"
              >
                (021) 5050-8080
              </a>
              <a
                href="mailto:cs@sahabatinsurance.id"
                className="text-slate-400 hover:text-white text-sm transition-colors"
                aria-label="Email address"
              >
                cs@sahabatinsurance.id
              </a>
              <span className="text-slate-400 text-sm">Jakarta, Indonesia</span>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 PT Asuransi Sahabat Artha Proteksi. All rights reserved.
          </p>
          <span className="px-3 py-1 rounded-full border border-slate-700 text-slate-500 text-xs">
            Diawasi oleh OJK
          </span>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify Footer renders**

Scroll to the bottom of `http://localhost:3000`. Expect: dark 4-column footer, social icons, product/company links, contact info, OJK badge.

---

## Task 12: Final Visual Verification

**Files:** None

- [ ] **Step 1: Run a full-page visual check on desktop**

With dev server running, open `http://localhost:3000` in a browser at 1440px width. Walk through the page top to bottom:

| Section | What to verify |
|---|---|
| Navbar | Transparent at top, glassmorphism after scrolling 10px |
| Hero | Stagger animations play, floating card bounces, 3 badges visible |
| Products | 4-column grid, cards lift on hover, border turns navy |
| Why Choose Us | Dark navy bg, 2-col layout, 2×2 grid fades in |
| Awards | 10 pill badges in flex-wrap |
| Latest News | 3-col grid, tag pills colored, line-clamp working |
| CTA Banner | Navy rounded card, inner glow visible, 2 buttons |
| Footer | 4-col dark footer, OJK badge in bottom bar |

- [ ] **Step 2: Run a mobile check**

Resize browser to 375px (iPhone SE). Verify:
- Navbar shows hamburger, desktop links hidden
- Hamburger opens slide-in drawer from right
- Hero stacks vertically (text above card)
- Products shows 1-column grid
- Footer stacks to 1 column

- [ ] **Step 3: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected output: no errors.

- [ ] **Step 4: Run lint**

```bash
npm run lint
```

Expected output: no errors.
