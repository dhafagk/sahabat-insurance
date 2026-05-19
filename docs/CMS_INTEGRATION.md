# CMS Integration Plan

## Overview

Payload CMS is integrated into this Next.js app to let editors manage landing page content, products, and news from the `/admin` dashboard. Data is fetched server-side via Payload's local API (no HTTP round-trip).

## Schema Structure

### Globals (single-instance documents)

| Global       | Slug           | Purpose                                      |
| ------------ | -------------- | -------------------------------------------- |
| Landing Page | `landing-page` | All section content for the homepage         |
| Navbar       | `navbar`       | Navigation links and CTA button _(planned)_  |
| Footer       | `footer`       | Contact info, links, social URLs _(planned)_ |

### Collections (repeatable entries)

| Collection | Slug       | Purpose                                       |
| ---------- | ---------- | --------------------------------------------- |
| Products   | `products` | Insurance product cards shown on landing page |
| News       | `news`     | News articles shown on landing page           |
| Media      | `media`    | Uploaded images (built-in)                    |
| Users      | `users`    | Admin users (built-in)                        |

---

## Landing Page Global (`landing-page`)

Fields organized by section:

### Hero

| Field                     | Type                      | Description                   |
| ------------------------- | ------------------------- | ----------------------------- |
| `hero.taglines`           | array of text             | Rotating typewriter phrases   |
| `hero.stats`              | array of `{value, label}` | Numbers shown below CTA       |
| `hero.descriptionDesktop` | text                      | Long description (desktop)    |
| `hero.descriptionMobile`  | text                      | Short description (mobile)    |
| `hero.phoneNumber`        | text                      | Phone number (display + href) |
| `hero.whatsappUrl`        | text                      | WhatsApp link                 |
| `hero.ctaPrimaryLabel`    | text                      | Primary CTA button text       |
| `hero.ctaPrimaryHref`     | text                      | Primary CTA button href       |
| `hero.ctaSecondaryLabel`  | text                      | Secondary CTA button text     |

### Products Section

| Field                     | Type | Description               |
| ------------------------- | ---- | ------------------------- |
| `productsSection.badge`   | text | Small label above heading |
| `productsSection.heading` | text | Section heading           |

### Why Choose Us

| Field                     | Type                               | Description               |
| ------------------------- | ---------------------------------- | ------------------------- |
| `whyChooseUs.badge`       | text                               | Small label above heading |
| `whyChooseUs.heading`     | text                               | Section heading           |
| `whyChooseUs.description` | text                               | Body paragraph            |
| `whyChooseUs.reasons`     | array of `{iconName, title, body}` | Feature bullets           |
| `whyChooseUs.image`       | upload → media                     | Right-side photo          |
| `whyChooseUs.ctaLabel`    | text                               | CTA button text           |
| `whyChooseUs.ctaHref`     | text                               | CTA button href           |

### News Section

| Field                 | Type | Description               |
| --------------------- | ---- | ------------------------- |
| `newsSection.badge`   | text | Small label above heading |
| `newsSection.heading` | text | Section heading           |

### CTA Banner

| Field                       | Type           | Description            |
| --------------------------- | -------------- | ---------------------- |
| `ctaBanner.heading`         | text           | Main headline          |
| `ctaBanner.subtext`         | text           | Subtitle below heading |
| `ctaBanner.primaryLabel`    | text           | Primary button label   |
| `ctaBanner.primaryHref`     | text           | Primary button href    |
| `ctaBanner.whatsappUrl`     | text           | WhatsApp button URL    |
| `ctaBanner.backgroundImage` | upload → media | Background photo       |

---

## Products Collection (`products`)

| Field         | Type   | Notes                                                                       |
| ------------- | ------ | --------------------------------------------------------------------------- |
| `title`       | text   | Product name                                                                |
| `description` | text   | Short description                                                           |
| `iconName`    | select | Lucide icon key: Car, Home, Plane, Shield, Anchor, Banknote, Flame, HardHat |
| `order`       | number | Sort order on page                                                          |

---

## News Collection (`news`)

| Field     | Type           | Notes                                |
| --------- | -------------- | ------------------------------------ |
| `title`   | text           | Article headline                     |
| `excerpt` | textarea       | Short summary                        |
| `tag`     | select         | Community, Awards, Training, Product |
| `date`    | date           | Publication date                     |
| `image`   | upload → media | Thumbnail                            |

---

## Data Flow

```
/admin dashboard
      │
      ▼
Payload DB (PostgreSQL)
      │
      ▼  (local API — no HTTP)
app/(app)/page.tsx  (server component)
      │
      ├── <Hero data={hero} />
      ├── <Products data={products} sectionMeta={productsSection} />
      ├── <WhyChooseUs data={whyChooseUs} />
      ├── <LatestNews data={news} sectionMeta={newsSection} />
      └── <CtaBanner data={ctaBanner} />
```

---

## Implementation Order

- [x] `globals/LandingPage.ts` — Global schema
- [x] `collections/Products.ts` — Products collection
- [x] `collections/News.ts` — News collection
- [x] `payload.config.ts` — Register schemas
- [x] `app/(app)/page.tsx` — Fetch data via local API
- [x] Update landing page components to accept props
- [ ] `globals/Navbar.ts` — Navbar global _(planned)_
- [ ] `globals/Footer.ts` — Footer global _(planned)_
- [ ] Update Navbar/Footer components _(planned)_
