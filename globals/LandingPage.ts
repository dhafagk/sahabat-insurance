import type { GlobalConfig } from 'payload'

export const ICON_OPTIONS = [
  { label: 'Car', value: 'Car' },
  { label: 'Home', value: 'Home' },
  { label: 'Plane', value: 'Plane' },
  { label: 'Shield', value: 'Shield' },
  { label: 'Anchor', value: 'Anchor' },
  { label: 'Banknote', value: 'Banknote' },
  { label: 'Flame', value: 'Flame' },
  { label: 'HardHat', value: 'HardHat' },
  { label: 'Award', value: 'Award' },
  { label: 'Trophy', value: 'Trophy' },
  { label: 'MapPin', value: 'MapPin' },
  { label: 'Zap', value: 'Zap' },
]

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  admin: {
    group: 'Content',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ── Hero ──────────────────────────────────────────────────────────
        {
          name: 'hero',
          label: 'Hero',
          fields: [
            {
              name: 'taglines',
              type: 'array',
              label: 'Typewriter Taglines',
              minRows: 1,
              fields: [
                { name: 'text', type: 'text', required: true },
              ],
            },
            {
              name: 'stats',
              type: 'array',
              label: 'Stats',
              fields: [
                { name: 'value', type: 'text', required: true },
                { name: 'label', type: 'text', required: true },
              ],
            },
            {
              name: 'descriptionDesktop',
              type: 'text',
              label: 'Description (Desktop)',
            },
            {
              name: 'descriptionMobile',
              type: 'text',
              label: 'Description (Mobile)',
            },
            { name: 'phoneNumber', type: 'text', label: 'Phone Number' },
            { name: 'whatsappUrl', type: 'text', label: 'WhatsApp URL' },
            { name: 'ctaPrimaryLabel', type: 'text', label: 'Primary CTA Label' },
            { name: 'ctaPrimaryHref', type: 'text', label: 'Primary CTA Href' },
            { name: 'ctaSecondaryLabel', type: 'text', label: 'Secondary CTA Label' },
          ],
        },

        // ── Promo Strip ───────────────────────────────────────────────────
        {
          name: 'promoStrip',
          label: 'Promo Strip',
          fields: [
            { name: 'heading', type: 'text', label: 'Heading' },
            { name: 'buttonLabel', type: 'text', label: 'Button Label' },
            { name: 'buttonHref', type: 'text', label: 'Button Href' },
          ],
        },

        // ── Products ──────────────────────────────────────────────────────
        {
          name: 'productsSection',
          label: 'Products',
          fields: [
            { name: 'badge', type: 'text', label: 'Badge Label' },
            { name: 'heading', type: 'text', label: 'Section Heading' },
          ],
        },

        // ── Why Choose Us ─────────────────────────────────────────────────
        {
          name: 'whyChooseUs',
          label: 'Why Choose Us',
          fields: [
            { name: 'badge', type: 'text', label: 'Badge Label' },
            { name: 'heading', type: 'text', label: 'Section Heading' },
            { name: 'description', type: 'text', label: 'Body Text' },
            {
              name: 'reasons',
              type: 'array',
              label: 'Reasons',
              fields: [
                {
                  name: 'iconName',
                  type: 'select',
                  label: 'Icon',
                  options: ICON_OPTIONS,
                  required: true,
                },
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'text', required: true },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Section Image',
              relationTo: 'media',
            },
            { name: 'ctaLabel', type: 'text', label: 'CTA Button Label' },
            { name: 'ctaHref', type: 'text', label: 'CTA Button Href' },
          ],
        },

        // ── News ──────────────────────────────────────────────────────────
        {
          name: 'newsSection',
          label: 'News',
          fields: [
            { name: 'badge', type: 'text', label: 'Badge Label' },
            { name: 'heading', type: 'text', label: 'Section Heading' },
          ],
        },

        // ── CTA Banner ────────────────────────────────────────────────────
        {
          name: 'ctaBanner',
          label: 'CTA Banner',
          fields: [
            { name: 'heading', type: 'text', label: 'Heading' },
            { name: 'subtext', type: 'text', label: 'Subtext' },
            { name: 'primaryLabel', type: 'text', label: 'Primary Button Label' },
            { name: 'primaryHref', type: 'text', label: 'Primary Button Href' },
            { name: 'whatsappUrl', type: 'text', label: 'WhatsApp URL' },
            {
              name: 'backgroundImage',
              type: 'upload',
              label: 'Background Image',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
