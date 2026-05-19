import type { GlobalConfig } from "payload";

export const Manajemen: GlobalConfig = {
  slug: "manajemen",
  label: "Manajemen",
  admin: {
    group: "Halaman",
    livePreview: {
      url: ({ req }) => `${req.payload.config.serverURL}/management`,
    },
  },
  fields: [
    {
      name: "pageTitle",
      type: "text",
      label: "Judul Halaman",
      defaultValue: "Manajemen",
    },
    {
      name: "pageSubtitle",
      type: "text",
      label: "Subtitle Halaman",
      defaultValue:
        "Dipimpin oleh para profesional berpengalaman yang berkomitmen pada keunggulan",
    },
    {
      name: "highlights",
      type: "array",
      label: "Sorotan Utama",
      maxRows: 3,
      fields: [
        {
          name: "icon",
          type: "select",
          label: "Ikon",
          options: [
            { label: "Bintang", value: "Star" },
            { label: "Target", value: "Target" },
            { label: "Pengguna", value: "Users" },
            { label: "Perisai", value: "Shield" },
            { label: "Grafik", value: "TrendingUp" },
            { label: "Piala", value: "Trophy" },
          ],
          defaultValue: "Star",
        },
        {
          name: "title",
          type: "text",
          required: true,
          label: "Judul",
        },
        {
          name: "description",
          type: "textarea",
          label: "Deskripsi",
        },
      ],
    },
    {
      name: "boardOfCommissioners",
      type: "group",
      label: "Dewan Komisaris",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Judul Seksi",
          defaultValue: "Board of Commissioners",
        },
        {
          name: "members",
          type: "array",
          label: "Anggota",
          fields: [
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
              label: "Foto",
            },
            {
              name: "name",
              type: "text",
              required: true,
              label: "Nama",
            },
            {
              name: "position",
              type: "text",
              required: true,
              label: "Jabatan",
            },
          ],
        },
      ],
    },
    {
      name: "boardOfDirectors",
      type: "group",
      label: "Direksi",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Judul Seksi",
          defaultValue: "Board Of Directors",
        },
        {
          name: "members",
          type: "array",
          label: "Anggota",
          fields: [
            {
              name: "photo",
              type: "upload",
              relationTo: "media",
              label: "Foto",
            },
            {
              name: "name",
              type: "text",
              required: true,
              label: "Nama",
            },
            {
              name: "position",
              type: "text",
              required: true,
              label: "Jabatan",
            },
          ],
        },
      ],
    },
    {
      name: "tataKelola",
      type: "group",
      label: "Tata Kelola",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Judul Seksi",
          defaultValue: "Tata Kelola",
        },
        {
          name: "subtitle",
          type: "text",
          label: "Subtitle",
          defaultValue: "Good Corporate Governance",
        },
        {
          name: "columns",
          type: "array",
          label: "Kolom",
          maxRows: 3,
          fields: [
            {
              name: "content",
              type: "textarea",
              required: true,
              label: "Isi Kolom",
            },
          ],
        },
      ],
    },
  ],
};
