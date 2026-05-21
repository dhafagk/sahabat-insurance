import type { CollectionConfig } from 'payload'

export const DownloadLeads: CollectionConfig = {
  slug: 'download-leads',
  admin: {
    useAsTitle: 'email',
    group: 'Data',
    defaultColumns: ['email', 'fileName', 'unduhan', 'createdAt'],
    description: 'Email yang dikumpulkan dari form unduh PDF.',
  },
  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'fileName',
      type: 'text',
      label: 'Nama File',
    },
    {
      name: 'fileUrl',
      type: 'text',
      label: 'URL File',
    },
    {
      name: 'unduhan',
      type: 'relationship',
      relationTo: 'unduhan',
      label: 'Halaman Unduhan',
    },
  ],
  timestamps: true,
}
