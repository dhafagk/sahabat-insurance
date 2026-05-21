'use client'

import React, { useCallback } from 'react'
import { useForm, useFormFields } from '@payloadcms/ui'

export const PublishButton: React.FC = () => {
  const { submit } = useForm()
  const statusValue = useFormFields(([fields]) => fields?.status?.value as string | undefined)

  const handlePublish = useCallback(async () => {
    await submit({ overrides: { status: 'published' } })
  }, [submit])

  if (statusValue === 'published') return null

  return (
    <button
      type="button"
      onClick={handlePublish}
      style={{
        backgroundColor: '#16a34a',
        color: '#fff',
        padding: '0 16px',
        height: '38px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      Publish
    </button>
  )
}
