import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const News: CollectionConfig = {
  slug: "news",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "status", "tag", "date"],
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3969";
      return doc?.slug ? `${base}/news/${doc.slug}` : null;
    },
    components: {
      edit: {
        beforeDocumentControls: ["./components/admin/PublishButton#PublishButton"],
      },
    },
  },
  fields: [
    // ── Main content area ─────────────────────────────────────────────────
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
      editor: lexicalEditor(),
      localized: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      admin: {
        description: "Short summary shown in news cards and previews.",
      },
    },

    // ── Sidebar ───────────────────────────────────────────────────────────
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "date",
      type: "date",
      required: true,
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "dd MMM yyyy",
        },
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      admin: {
        position: "sidebar",
        description: "Select existing tags or create new ones.",
      },
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description: "URL-friendly identifier. Auto-filled from the title.",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;
            if (!data?.title) return value;
            return (data.title as string)
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9\s-]/g, "")
              .replace(/\s+/g, "-");
          },
        ],
      },
    },
    {
      name: "image",
      label: "Featured Image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
