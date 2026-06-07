import type { CollectionConfig } from 'payload'

export const Unduhan: CollectionConfig = {
  slug: 'unduhan',
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
      name: 'requireEmailGate',
      type: 'checkbox',
      label: 'Wajib Email untuk Unduh PDF',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Jika aktif, pengguna harus memasukkan email sebelum mengunduh PDF. Link akan dikirimkan ke email mereka.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Seksi Accordion',
      admin: {
        description: 'Setiap seksi tampil sebagai satu item accordion yang dapat dibuka.',
      },
      fields: [
        {
          name: 'category',
          type: 'text',
          required: true,
          label: 'Kategori',
          localized: true,
          admin: {
            description: 'Label kecil di atas judul, mis. "Klaim", "Polis".',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul Seksi',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi Seksi',
          localized: true,
        },
        {
          name: 'items',
          type: 'array',
          label: 'File / Tautan',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Nama',
              localized: true,
            },
            {
              name: 'type',
              type: 'select',
              required: true,
              defaultValue: 'pdf',
              label: 'Jenis',
              options: [
                { label: 'PDF / File', value: 'pdf' },
                { label: 'Tautan (Link)', value: 'link' },
              ],
            },
            {
              name: 'file',
              type: 'upload',
              relationTo: 'media',
              label: 'Upload File',
              admin: {
                description: 'Upload file PDF ke media library.',
                condition: (_data, siblingData) => siblingData?.type === 'pdf',
              },
            },
            {
              name: 'href',
              type: 'text',
              label: 'URL Manual',
              admin: {
                description: 'URL untuk link eksternal atau PDF yang tidak di-upload.',
              },
            },
            {
              name: 'size',
              type: 'text',
              label: 'Ukuran File',
              localized: true,
              admin: {
                description: 'Tampilan ukuran, mis. "245 KB". Kosongkan untuk auto-hitung dari file.',
                condition: (_data, siblingData) => siblingData?.type === 'pdf',
              },
            },
          ],
        },
      ],
    },
  ],
}
