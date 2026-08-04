import type { CollectionConfig } from 'payload'

// One doc = one bengkel/garage entry. Split out of `garage-branches.rows` so
// the admin edit screen doesn't have to mount hundreds of nested array rows
// at once — the parent doc now shows these paginated via a join field.
export const GarageBranchRow: CollectionConfig = {
  slug: 'garage-branch-rows',
  labels: {
    singular: 'Baris Bengkel',
    plural: 'Baris Bengkel',
  },
  admin: {
    useAsTitle: 'name',
    hidden: true,
    defaultColumns: ['name', 'category', 'order'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.cells?.[0]?.value !== undefined) {
          data.name = data.cells[0].value
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nama',
      localized: true,
      admin: {
        readOnly: true,
        description: 'Diambil otomatis dari kolom pertama (Nama).',
      },
    },
    {
      name: 'branch',
      type: 'relationship',
      relationTo: 'garage-branches',
      required: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan',
      admin: {
        position: 'sidebar',
      },
    },
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
      admin: {
        description: 'Default Umum. Hanya admin yang boleh mengubah ke Authorized.',
      },
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
}
