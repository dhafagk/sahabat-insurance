# Sections Revamp Design

**Date:** 2026-05-15  
**Scope:** Products, WhyChooseUs, Awards, CtaBanner components  
**Goal:** Replace AI-generated feeling with Modern Corporate / Trustworthy aesthetic using real team/office photography and subtle rounded corners.

---

## Design Direction

- **Style:** Modern Corporate / Trustworthy — clean grid structure with human photo anchors
- **Corner radius:** `rounded-xl` (12px) on cards and photo frames; existing `rounded-3xl` on CtaBanner container kept
- **Photography:** `public/assets/1.png`–`4.png` (team/office shots) placed strategically once per section
- **Responsive:** All photo elements use fixed aspect ratios that adapt at breakpoints; existing grid responsiveness preserved

---

## Components

### Products (`app/components/Products.tsx`)

**Photo strip:** Full-width `<Image>` using `public/assets/1.png`, `rounded-xl`, `aspect-[21/6]` desktop / `aspect-[16/7]` mobile, placed above the card grid inside the section container.

**Icon treatment:** Replace colored emoji icon backgrounds with Lucide icons in a consistent `bg-slate-100` container, `rounded-xl`. One Lucide icon mapped per product type:
- Motor Vehicle → `Car`
- Property All Risk → `Home`
- Travel → `Plane`
- Personal Accident → `Shield`
- Marine Cargo → `Anchor`
- Money Insurance → `Banknote`
- Fire Insurance → `Flame`
- Contractor's All Risk → `HardHat`

**Cards:** Change `rounded-3xl` → `rounded-xl`. Keep hover lift, border, and shadow behavior unchanged.

---

### WhyChooseUs (`app/components/WhyChooseUs.tsx`)

**Right column:** Remove 2×2 abstract stat card grid. Replace with a single `<Image>` using `public/assets/2.png`, `rounded-xl`, `w-full h-full object-cover`. Add a caption bar at the bottom of the photo: `"Tim profesional kami siap membantu Anda"` — white text, semi-transparent dark background, `rounded-b-xl`.

**Stats relocation:** Move the 4 reasons (Fitch, Infobank, branches, claims) into a 2×2 inline grid placed below the existing paragraph text in the left column. Each cell: icon + title + body, no card background — integrated into text flow with a subtle `border-t border-white/10` separator between rows.

**Layout:** Two-column (`lg:grid-cols-2`) layout preserved. On mobile, photo stacks below text+stats with `aspect-[4/3]`.

---

### Awards (`app/components/Awards.tsx`)

**Photo strip:** Full-width `<Image>` using `public/assets/3.png`, `rounded-xl`, `aspect-[21/7]` desktop / `aspect-[16/6]` mobile, placed above the pills row. Apply a dark overlay (`bg-black/30 rounded-xl absolute inset-0`) so the photo doesn't compete with the awards content below.

**Pills:** Unchanged. Add `mt-8` spacing below the photo. Keep existing flex-wrap centered layout.

---

### CtaBanner (`app/components/CtaBanner.tsx`)

**Background:** Replace inline `background: '#21408f'` with a relative container holding:
1. `<Image>` using `public/assets/4.png`, `fill`, `object-cover`, `rounded-3xl`
2. A color overlay `div`: `absolute inset-0 rounded-3xl bg-[#21408f]/82`
3. Existing inner radial glow `div` (kept, layered above overlay)

**Content:** All text, buttons, and layout unchanged. The photo bleeds through the navy tint.

**Responsive:** `object-cover` handles all breakpoint crops automatically. No layout changes.

---

## Image Usage Summary

| Asset | Section | Placement |
|-------|---------|-----------|
| `public/assets/1.png` | Products | Masthead strip above card grid |
| `public/assets/2.png` | WhyChooseUs | Right column, replaces stat cards |
| `public/assets/3.png` | Awards | Strip above pills row |
| `public/assets/4.png` | CtaBanner | Full-bleed background with navy tint overlay |

---

## Responsive Breakpoints

| Element | Mobile | Desktop |
|---------|--------|---------|
| Products photo strip | `aspect-[16/7]` | `aspect-[21/6]` |
| WhyChooseUs photo | `aspect-[4/3]`, stacks below text | fills right column |
| Awards photo strip | `aspect-[16/6]` | `aspect-[21/7]` |
| CtaBanner photo | `object-cover` auto-crops | `object-cover` auto-crops |

---

## Out of Scope

- Hero, Navbar, Footer, LatestNews — not changed
- Content/copy changes — not changed
- Animation/motion changes — not changed
- Images 5–20 — reserved for future use
