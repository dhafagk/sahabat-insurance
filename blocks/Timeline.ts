import type { Block } from 'payload'

export const Timeline: Block = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline',
    plural: 'Timelines',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Timeline Items',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'date',
          type: 'text',
          required: true,
          label: 'Date',
          localized: true,
          admin: {
            description: 'e.g. "March 25, 2011"',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
          localized: true,
        },
      ],
    },
  ],
}
