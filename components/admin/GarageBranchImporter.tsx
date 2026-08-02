'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useDocumentInfo, useLocale } from '@payloadcms/ui'
import type { UIFieldClientComponent } from 'payload'
import { downloadTemplate, parseSheet } from './tableImportShared'

export const GarageBranchImporter: UIFieldClientComponent = () => {
  const { id } = useDocumentInfo()
  const localeObj = useLocale()
  const locale = typeof localeObj === 'string' ? localeObj : localeObj?.code

  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const onFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (inputRef.current) inputRef.current.value = ''
      if (!file) return

      if (!id) {
        setMsg({ ok: false, text: 'Simpan dokumen ini dulu sebelum impor Excel.' })
        return
      }

      setBusy(true)
      setMsg(null)
      try {
        const parsed = await parseSheet(file)
        const res = await fetch(`/api/garage-branches/${id}/import`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ ...parsed, locale }),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.error || `Gagal impor (${res.status}).`)
        }
        window.location.reload()
      } catch (err) {
        setMsg({ ok: false, text: err instanceof Error ? err.message : 'Gagal impor.' })
        setBusy(false)
      }
    },
    [id, locale],
  )

  return (
    <div className="field-type" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          style={{
            backgroundColor: '#1e293b',
            color: '#fff',
            padding: '0 16px',
            height: 36,
            borderRadius: 4,
            border: 'none',
            cursor: busy ? 'wait' : 'pointer',
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          {busy ? 'Mengimpor…' : `Impor Excel (bahasa: ${locale ?? '-'})`}
        </button>
        <button
          type="button"
          onClick={downloadTemplate}
          disabled={busy}
          style={{
            backgroundColor: 'transparent',
            color: '#1e293b',
            padding: '0 16px',
            height: 36,
            borderRadius: 4,
            border: '1px solid #cbd5e1',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
          }}
        >
          Unduh Template
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={onFile}
        style={{ display: 'none' }}
      />

      <p style={{ fontSize: 12, color: '#64748b', margin: '8px 0 0' }}>
        Baris pertama file jadi nama kolom. Impor menimpa seluruh isi tabel ini
        untuk bahasa aktif. Simpan dokumen dulu sebelum impor.
      </p>

      {msg && (
        <p
          style={{
            fontSize: 13,
            margin: '6px 0 0',
            color: msg.ok ? '#16a34a' : '#dc2626',
          }}
        >
          {msg.text}
        </p>
      )}
    </div>
  )
}
