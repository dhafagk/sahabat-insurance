import type { Payload } from 'payload'
import React from 'react'

interface AdminIconProps {
  payload?: Payload
}

export const AdminIcon: React.FC<AdminIconProps> = async ({ payload }) => {
  if (payload) {
    try {
      const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
      const favicon = settings?.favicon as { url?: string } | null

      if (favicon?.url) {
        return (
          <img
            src={favicon.url}
            alt="Site Icon"
            style={{ width: 30, height: 30, objectFit: 'contain' }}
          />
        )
      }
    } catch {
      // fall through to default
    }
  }

  return (
    <img
      src="/favicon.ico"
      alt="Site Icon"
      style={{ width: 30, height: 30, objectFit: 'contain' }}
    />
  )
}
