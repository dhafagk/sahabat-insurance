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
    },
    {
      name: "description",
      type: "text",
      required: true,
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
      name: "detailDescription",
      type: "textarea",
      label: "Detail Description (Modal)",
      admin: {
        description: "Longer description shown inside the product modal",
      },
    },
    {
      name: "riplayUrl",
      type: "text",
      label: "Riplay URL",
      admin: {
        description: "Link to the Riplay document or page",
      },
    },
    {
      name: "sppaUrl",
      type: "text",
      label: "Download SPPA URL",
      admin: {
        description: "Link to the SPPA document for download",
      },
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
