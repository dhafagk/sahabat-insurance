import type { CollectionConfig } from 'payload'

export const Tabel: CollectionConfig = {
  slug: 'tabel',
  admin: {
    useAsTitle: 'title',
    group: 'Halaman',
    defaultColumns: ['title', 'status'],
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3969'
      return doc?.slug ? `${base}/${doc.slug}` : null
    },
    components: {
      edit: {
        beforeDocumentControls: ['./components/admin/PublishButton#PublishButton'],
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi Halaman',
      localized: true,
      admin: {
        description: 'Teks penjelasan singkat di bawah judul halaman.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly identifier. Auto-filled from the title.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value
            if (!data?.title) return value
            return (data.title as string)
              .toLowerCase()
              .trim()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-')
          },
        ],
      },
    },
    {
      name: 'tables',
      type: 'array',
      label: 'Tabel',
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Kategori',
          localized: true,
          admin: {
            description: 'Label kecil di atas judul, mis. "Produk", "Layanan".',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul Tabel',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi Tabel',
          localized: true,
        },
        {
          name: 'columns',
          type: 'array',
          label: 'Kolom',
          admin: {
            description: 'Daftar kolom dari kiri ke kanan. Urutan ini harus sama dengan urutan sel di setiap baris.',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Nama Kolom',
              localized: true,
            },
          ],
        },
        {
          name: 'rows',
          type: 'array',
          label: 'Baris Data',
          admin: {
            description: 'Jumlah sel tiap baris harus sama dengan jumlah kolom di atas.',
          },
          fields: [
            {
              name: 'cells',
              type: 'array',
              label: 'Sel',
              fields: [
                {
                  name: 'value',
                  type: 'text',
                  label: 'Nilai',
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
