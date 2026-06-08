import type { GlobalConfig } from "payload";

export const ContactUs: GlobalConfig = {
  slug: "contact-us",
  label: "Contact Us",
  admin: {
    group: "Halaman",
    livePreview: {
      url: ({ req }) => `${req?.payload?.config?.serverURL ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3969'}/contact-us`,
    },
  },
  fields: [
    {
      name: "pageTitle",
      type: "text",
      label: "Judul Halaman",
      localized: true,
      defaultValue: "Hubungi Kami",
    },
    {
      name: "pageSubtitle",
      type: "text",
      label: "Subtitle Halaman",
      localized: true,
      defaultValue:
        "Kami siap membantu Anda. Pilih cara yang paling nyaman untuk menghubungi tim kami.",
    },
    {
      name: "sectionTitle",
      type: "text",
      label: "Judul Bagian Kartu Kontak",
      localized: true,
      defaultValue: "Kami Siap Melayani Anda",
    },
    {
      name: "sectionSubtitle",
      type: "text",
      label: "Subtitle Bagian Kartu Kontak",
      localized: true,
      defaultValue: "We'd love to talk about how we can help you",
    },
    {
      name: "channels",
      type: "array",
      label: "Saluran Kontak",
      admin: {
        description:
          "Kartu kontak yang ditampilkan di halaman (telepon, WA, email, dll)",
      },
      fields: [
        {
          name: "iconType",
          type: "select",
          label: "Ikon",
          required: true,
          options: [
            { label: "Telepon", value: "phone" },
            { label: "WhatsApp", value: "whatsapp" },
            { label: "Email", value: "email" },
            { label: "Formulir", value: "form" },
          ],
          defaultValue: "phone",
        },
        {
          name: "title",
          type: "text",
          label: "Judul",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Deskripsi",
          required: true,
          localized: true,
        },
        {
          name: "href",
          type: "text",
          label: "Link (URL)",
          admin: {
            description:
              "Contoh: tel:02150508080, https://wa.me/622150508080, mailto:info@..., atau #form-pengaduan",
          },
        },
        {
          name: "hrefLabel",
          type: "text",
          label: "Label Tombol",
          localized: true,
          defaultValue: "Selengkapnya",
        },
      ],
    },
  ],
};
