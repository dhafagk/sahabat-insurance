import type { CollectionConfig } from 'payload'
import { importGarageBranchEndpoint } from './garageBranchImport'

export const GarageBranch: CollectionConfig = {
  slug: 'garage-branches',
  labels: {
    singular: 'Cabang Bengkel',
    plural: 'Cabang Bengkel',
  },
  endpoints: [importGarageBranchEndpoint],
  admin: {
    useAsTitle: 'title',
    group: 'Halaman',
    defaultColumns: ['title', 'category', 'page'],
  },
  fields: [
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'tabel',
      required: true,
      index: true,
      label: 'Halaman Induk',
      admin: {
        position: 'sidebar',
        description: 'Halaman "Tabel" tempat cabang ini ditampilkan, mis. Daftar Bengkel.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Kota / Wilayah',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      required: false,
      options: [
        { label: 'Authorize', value: 'authorize' },
        { label: 'General', value: 'general' },
      ],
      admin: {
        description: 'Opsional. Kosongkan jika belum dikategorikan.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan Tampil',
      admin: {
        position: 'sidebar',
        description: 'Kosongkan untuk urutan sesuai input.',
      },
    },
    {
      name: 'importer',
      type: 'ui',
      admin: {
        components: {
          Field: './components/admin/GarageBranchImporter#GarageBranchImporter',
        },
      },
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
        initCollapsed: true,
        description: 'Jumlah sel tiap baris harus sama dengan jumlah kolom di atas. Gunakan tombol Impor Excel di atas untuk mengisi cepat.',
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
}
