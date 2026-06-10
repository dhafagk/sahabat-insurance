import type { GlobalConfig } from "payload";

export const ICON_OPTIONS = [
  { label: "Car", value: "Car" },
  { label: "Home", value: "Home" },
  { label: "Plane", value: "Plane" },
  { label: "Shield", value: "Shield" },
  { label: "Anchor", value: "Anchor" },
  { label: "Banknote", value: "Banknote" },
  { label: "Flame", value: "Flame" },
  { label: "HardHat", value: "HardHat" },
  { label: "Award", value: "Award" },
  { label: "Trophy", value: "Trophy" },
  { label: "MapPin", value: "MapPin" },
  { label: "Zap", value: "Zap" },
];

export const LandingPage: GlobalConfig = {
  slug: "landing-page",
  admin: {
    group: "Content",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        // ── Hero ──────────────────────────────────────────────────────────
        {
          name: "hero",
          label: "Hero",
          fields: [
            {
              name: "titleLines",
              type: "array",
              label: "Title Lines",
              admin: {
                description:
                  "Each entry is one line of the main hero heading. Rendered top-to-bottom with a line break between them. Leave empty to use the site default.",
              },
              fields: [
                {
                  name: "text",
                  type: "text",
                  required: true,
                  localized: true,
                  label: "Text",
                },
                {
                  name: "highlight",
                  type: "checkbox",
                  label: "Highlight (accent colour)",
                  defaultValue: false,
                  admin: {
                    description:
                      "Renders this line in the brand accent colour.",
                  },
                },
              ],
            },
            {
              name: "descriptionDesktop",
              type: "text",
              label: "Description (Desktop)",
              localized: true,
            },
            {
              name: "descriptionMobile",
              type: "text",
              label: "Description (Mobile)",
              localized: true,
            },
            { name: "whatsappUrl", type: "text", label: "WhatsApp URL" },
            {
              name: "ctaPrimaryLabel",
              type: "text",
              label: "Button 1 Label",
              localized: true,
              admin: { description: "Default: Klaim Via Whatsapp" },
            },
            {
              name: "ctaPrimaryHref",
              type: "text",
              label: "Button 1 Href",
              admin: { description: "Default: WhatsApp URL" },
            },
            // {
            //   name: "ctaSecondaryLabel",
            //   type: "text",
            //   label: "Button 2 Label",
            //   admin: { description: "Default: Cek Polis Anda" },
            // },
            // {
            //   name: "ctaSecondaryHref",
            //   type: "text",
            //   label: "Button 2 Href",
            //   admin: { description: "Default: #polis" },
            // },
            {
              name: "ctaTertiaryLabel",
              type: "text",
              label: "Button 2 Label",
              localized: true,
              admin: { description: "Default: Cek Harga Premi" },
            },
            {
              name: "ctaTertiaryHref",
              type: "text",
              label: "Button 2 Href",
              admin: { description: "Default: #premi" },
            },
          ],
        },

        // ── Promo Strip ───────────────────────────────────────────────────
        {
          name: "promoStrip",
          label: "Promo Strip",
          fields: [
            {
              name: "heading",
              type: "text",
              label: "Heading",
              localized: true,
            },
            {
              name: "buttonLabel",
              type: "text",
              label: "Button Label",
              localized: true,
            },
            { name: "buttonHref", type: "text", label: "Button Href" },
          ],
        },

        // ── Products ──────────────────────────────────────────────────────
        {
          name: "productsSection",
          label: "Products",
          fields: [
            {
              name: "badge",
              type: "text",
              label: "Badge Label",
              localized: true,
            },
            {
              name: "heading",
              type: "text",
              label: "Section Heading",
              localized: true,
            },
          ],
        },

        // ── Why Choose Us ─────────────────────────────────────────────────
        {
          name: "whyChooseUs",
          label: "Why Choose Us",
          fields: [
            {
              name: "badge",
              type: "text",
              label: "Badge Label",
              localized: true,
            },
            {
              name: "heading",
              type: "text",
              label: "Section Heading",
              localized: true,
            },
            {
              name: "description",
              type: "text",
              label: "Body Text",
              localized: true,
            },
            {
              name: "reasons",
              type: "array",
              label: "Reasons",
              fields: [
                {
                  name: "iconName",
                  type: "select",
                  label: "Icon",
                  options: ICON_OPTIONS,
                  required: true,
                },
                {
                  name: "title",
                  type: "text",
                  required: true,
                  localized: true,
                },
                { name: "body", type: "text", required: true, localized: true },
              ],
            },
            {
              name: "image",
              type: "upload",
              label: "Section Image",
              relationTo: "media",
            },
            {
              name: "ctaLabel",
              type: "text",
              label: "CTA Button Label",
              localized: true,
            },
            { name: "ctaHref", type: "text", label: "CTA Button Href" },
          ],
        },

        // ── News ──────────────────────────────────────────────────────────
        {
          name: "newsSection",
          label: "News",
          fields: [
            {
              name: "badge",
              type: "text",
              label: "Badge Label",
              localized: true,
            },
            {
              name: "heading",
              type: "text",
              label: "Section Heading",
              localized: true,
            },
          ],
        },

        // ── CTA Banner ────────────────────────────────────────────────────
        {
          name: "ctaBanner",
          label: "CTA Banner",
          fields: [
            {
              name: "heading",
              type: "text",
              label: "Heading",
              localized: true,
            },
            {
              name: "subtext",
              type: "text",
              label: "Subtext",
              localized: true,
            },
            {
              name: "primaryLabel",
              type: "text",
              label: "Primary Button Label",
              localized: true,
            },
            { name: "primaryHref", type: "text", label: "Primary Button Href" },
            { name: "whatsappUrl", type: "text", label: "WhatsApp URL" },
            {
              name: "contactAddress",
              type: "textarea",
              label: "Contact Address",
              localized: true,
            },
            { name: "contactPhone", type: "text", label: "Contact Phone" },
            { name: "contactEmail", type: "email", label: "Contact Email" },
            {
              name: "backgroundImage",
              type: "upload",
              label: "Background Image",
              relationTo: "media",
            },
            {
              name: "actionCards",
              type: "array",
              label: "Action Cards",
              fields: [
                {
                  name: "icon",
                  type: "select",
                  label: "Icon",
                  required: true,
                  options: [
                    { label: "WhatsApp", value: "whatsapp" },
                    { label: "Email / Envelope", value: "envelope" },
                    { label: "Agen / Group", value: "agen" },
                    { label: "Car", value: "car" },
                    { label: "Phone", value: "phone" },
                  ],
                },
                {
                  name: "label",
                  type: "text",
                  required: true,
                  localized: true,
                },
                { name: "sublabel", type: "text", localized: true },
                { name: "href", type: "text", label: "Link URL" },
                {
                  name: "useWhatsappUrl",
                  type: "checkbox",
                  label: "Use WhatsApp URL from above",
                  defaultValue: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
