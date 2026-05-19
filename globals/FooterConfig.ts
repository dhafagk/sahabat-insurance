import type { GlobalConfig, Block } from "payload";

const LinkListBlock: Block = {
  slug: "linkList",
  labels: { singular: "Link List", plural: "Link Lists" },
  fields: [
    {
      name: "links",
      type: "array",
      label: "Links",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
        {
          name: "icon",
          type: "select",
          label: "Icon (optional)",
          options: [
            { label: "None", value: "none" },
            { label: "Car", value: "car" },
            { label: "Home", value: "home" },
            { label: "Shield", value: "shield" },
            { label: "Plane", value: "plane" },
            { label: "Star", value: "star" },
            { label: "Check", value: "check" },
            { label: "Arrow Right", value: "arrowRight" },
            { label: "Phone", value: "phone" },
            { label: "Mail", value: "mail" },
            { label: "Map Pin", value: "mapPin" },
            { label: "File", value: "file" },
          ],
          defaultValue: "none",
        },
      ],
    },
  ],
};

const ContactBlock: Block = {
  slug: "contactInfo",
  labels: { singular: "Contact Info", plural: "Contact Info" },
  fields: [
    { name: "companyName", type: "text", label: "Company Name" },
    { name: "subheading", type: "text", label: "Sub-heading (e.g. Pengaduan Konsumen)" },
    {
      name: "items",
      type: "array",
      label: "Contact Items",
      fields: [
        {
          name: "type",
          type: "select",
          required: true,
          label: "Type",
          options: [
            { label: "Phone", value: "phone" },
            { label: "Email", value: "email" },
            { label: "Address", value: "address" },
            { label: "WhatsApp", value: "whatsapp" },
          ],
        },
        { name: "value", type: "text", required: true, label: "Value (href or raw text)" },
        { name: "displayText", type: "text", label: "Display Text (optional, overrides value)" },
      ],
    },
  ],
};

const TextBlock: Block = {
  slug: "textContent",
  labels: { singular: "Text Block", plural: "Text Blocks" },
  fields: [
    { name: "content", type: "textarea", label: "Text Content" },
  ],
};

const ImageBlock: Block = {
  slug: "imageContent",
  labels: { singular: "Image", plural: "Images" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Image" },
    { name: "href", type: "text", label: "Link URL (optional)" },
    { name: "width", type: "number", label: "Width (px)", defaultValue: 180 },
    { name: "height", type: "number", label: "Height (px)", defaultValue: 52 },
  ],
};

const BadgeBlock: Block = {
  slug: "badge",
  labels: { singular: "Badge", plural: "Badges" },
  fields: [
    { name: "line1", type: "text", label: "Line 1" },
    { name: "line2", type: "text", label: "Line 2" },
    {
      name: "accentLine",
      type: "select",
      label: "Accent Color On",
      options: [
        { label: "None", value: "none" },
        { label: "Line 1", value: "line1" },
        { label: "Line 2", value: "line2" },
      ],
      defaultValue: "line2",
    },
  ],
};

export const FooterConfig: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  fields: [
    {
      name: "upperColumns",
      type: "array",
      label: "Upper Footer Columns (up to 5)",
      maxRows: 5,
      fields: [
        {
          name: "title",
          type: "text",
          label: "Column Title (leave empty to hide heading)",
        },
        {
          name: "content",
          type: "blocks",
          label: "Content Blocks",
          blocks: [LinkListBlock, ContactBlock, TextBlock, ImageBlock, BadgeBlock],
        },
      ],
    },
    {
      name: "lowerFooter",
      type: "group",
      label: "Lower Footer",
      fields: [
        {
          name: "links",
          type: "array",
          label: "Navigation Links",
          fields: [
            { name: "label", type: "text", required: true },
            { name: "href", type: "text", required: true },
          ],
        },
        {
          name: "socialLinks",
          type: "array",
          label: "Social Media Links",
          fields: [
            {
              name: "platform",
              type: "select",
              required: true,
              label: "Platform",
              options: [
                { label: "Facebook", value: "facebook" },
                { label: "X (Twitter)", value: "twitter" },
                { label: "Instagram", value: "instagram" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "YouTube", value: "youtube" },
                { label: "TikTok", value: "tiktok" },
              ],
            },
            { name: "href", type: "text", required: true, label: "URL" },
          ],
        },
        {
          name: "copyrightText",
          type: "text",
          label: "Copyright Text",
          defaultValue:
            "© Hak Cipta 2011–2026 ® sahabatinsurance.id ® Seluruh Hak Cipta Dilindungi.",
        },
      ],
    },
  ],
};
