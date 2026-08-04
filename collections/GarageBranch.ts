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
    defaultColumns: ['title', 'page'],
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
      name: 'entries',
      type: 'join',
      label: 'Baris Data',
      collection: 'garage-branch-rows',
      on: 'branch',
      defaultSort: 'order',
      defaultLimit: 20,
      admin: {
        defaultColumns: ['name', 'category', 'order'],
      },
    },
    {
      // Superseded by the `garage-branch-rows` collection (joined above as
      // `entries`) — a single doc holding thousands of nested array rows is
      // what made the admin edit screen lag. Kept read-only + hidden so old
      // data isn't lost; not written to by the importer or the app anymore.
      name: 'rows',
      type: 'array',
      label: 'Baris Data (lama)',
      admin: {
        hidden: true,
      },
      fields: [
        {
          name: 'category',
          type: 'select',
          label: 'Kategori',
          required: true,
          defaultValue: 'general',
          options: [
            { label: 'Authorized', value: 'authorize' },
            { label: 'Umum', value: 'general' },
          ],
        },
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
