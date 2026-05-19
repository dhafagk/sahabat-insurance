import type { GlobalConfig } from 'payload'

export const VisiMisi: GlobalConfig = {
  slug: 'visi-misi',
  label: 'Visi & Misi',
  admin: {
    group: 'Halaman',
    livePreview: {
      url: ({ serverURL }) => `${serverURL}/vision-and-mission`,
    },
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Judul Halaman',
      defaultValue: 'Visi Dan Misi',
    },
    {
      name: 'pageSubtitle',
      type: 'text',
      label: 'Subtitle Halaman',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Foto Utama',
      relationTo: 'media',
    },
    {
      name: 'visi',
      type: 'group',
      label: 'Visi',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          defaultValue: 'Visi',
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Isi Visi',
        },
      ],
    },
    {
      name: 'misi',
      type: 'group',
      label: 'Misi',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Judul',
          defaultValue: 'Misi',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Poin-Poin Misi',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Poin Misi',
            },
          ],
        },
      ],
    },
    {
      name: 'valuesTitle',
      type: 'text',
      label: 'Judul Seksi Nilai',
      defaultValue: 'Nilai-Nilai Perusahaan',
    },
    {
      name: 'valuesSubtitle',
      type: 'text',
      label: 'Subtitle Seksi Nilai',
      defaultValue: 'Sahabat Insurance',
    },
    {
      name: 'values',
      type: 'array',
      label: 'Nilai-Nilai (SAHABAT)',
      fields: [
        {
          name: 'letter',
          type: 'text',
          required: true,
          label: 'Huruf',
          admin: {
            description: 'Satu huruf, mis. S, A, H, A, B, A, T',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Nama Nilai',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Deskripsi',
        },
      ],
    },
  ],
}
