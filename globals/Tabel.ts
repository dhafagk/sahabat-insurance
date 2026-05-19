import type { GlobalConfig } from 'payload'

export const Tabel: GlobalConfig = {
  slug: 'tabel',
  admin: {
    group: 'Halaman',
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Judul Halaman',
      defaultValue: 'Data & Tabel Referensi',
    },
    {
      name: 'pageDescription',
      type: 'textarea',
      label: 'Deskripsi Halaman',
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
          admin: {
            description: 'Label kecil di atas judul, mis. "Produk", "Layanan".',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Judul Tabel',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Deskripsi Tabel',
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
            },
          ],
        },
        {
          name: 'rows',
          type: 'array',
          label: 'Baris Data',
          admin: {
            description: 'Setiap baris harus memiliki jumlah sel yang sama dengan jumlah kolom di atas.',
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
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
