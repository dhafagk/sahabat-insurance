import type { GlobalConfig } from 'payload'

export const Unduhan: GlobalConfig = {
  slug: 'unduhan',
  admin: {
    group: 'Halaman',
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Judul Halaman',
      defaultValue: 'Pusat Unduhan',
    },
    {
      name: 'pageDescription',
      type: 'textarea',
      label: 'Deskripsi Halaman',
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
          admin: {
            description: 'Label kecil di atas judul, mis. "Klaim", "Polis", "Panduan".',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul Seksi',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi Seksi',
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
              label: 'Nama File / Tautan',
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
              label: 'URL',
              admin: {
                description: 'URL manual — gunakan jika file tidak di-upload (untuk link eksternal atau PDF eksternal).',
              },
            },
            {
              name: 'size',
              type: 'text',
              label: 'Ukuran File',
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
