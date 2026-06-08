import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'maintenanceMode',
      type: 'checkbox',
      label: 'Maintenance Mode',
      defaultValue: false,
      admin: {
        description: 'When enabled, the public website will show the "Website Under Construction" page. The admin panel will remain accessible.',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
      admin: {
        description: 'Upload a .ico, .png, or .svg file. Recommended size: 32×32 px.',
      },
    },
  ],
}
