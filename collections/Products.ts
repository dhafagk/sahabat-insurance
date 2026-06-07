import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "icon", "order"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "icon",
      type: "upload",
      label: "Icon",
      relationTo: "media",
      admin: {
        description: "Upload an SVG or PNG icon for this product (recommended: SVG, square format)",
      },
    },
    {
      name: "riplay",
      type: "group",
      label: "Riplay",
      fields: [
        {
          name: "url",
          type: "text",
          label: "Riplay URL",
          admin: {
            description: "External link to the Riplay document or page",
          },
        },
        {
          name: "file",
          type: "upload",
          label: "Riplay PDF",
          relationTo: "media",
          admin: {
            description: "Upload a PDF file for Riplay (used if no URL is set)",
          },
        },
      ],
    },
    {
      name: "sppa",
      type: "group",
      label: "Download SPPA",
      fields: [
        {
          name: "url",
          type: "text",
          label: "SPPA URL",
          admin: {
            description: "External link to the SPPA document for download",
          },
        },
        {
          name: "file",
          type: "upload",
          label: "SPPA PDF",
          relationTo: "media",
          admin: {
            description: "Upload a PDF file for SPPA (used if no URL is set)",
          },
        },
      ],
    },
    {
      name: "order",
      type: "number",
      label: "Display Order",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first",
      },
    },
  ],
};
