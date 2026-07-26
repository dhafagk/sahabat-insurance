'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useDocumentInfo, useLocale } from '@payloadcms/ui'
import type { UIFieldClientComponent } from 'payload'

type Parsed = { columns: string[]; rows: string[][] }

// exceljs cells can be strings, numbers, dates, or rich objects. Coerce to string.
function cellToString(cell: unknown): string {
  if (cell == null) return ''
  if (typeof cell === 'string') return cell.trim()
  if (typeof cell === 'number' || typeof cell === 'boolean') return String(cell)
  if (cell instanceof Date) return cell.toISOString().slice(0, 10)
  if (typeof cell === 'object') {
    const o = cell as Record<string, unknown>
    if (typeof o.text === 'string') return o.text.trim()
    if (typeof o.result === 'string' || typeof o.result === 'number') return String(o.result)
    if (typeof o.hyperlink === 'string') return String(o.text ?? o.hyperlink).trim()
    if (Array.isArray(o.richText)) return o.richText.map((r) => cellToString(r)).join('')
  }
  return String(cell).trim()
}

async function parseSheet(file: File): Promise<Parsed> {
  const ExcelJS = (await import('exceljs')).default
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.load(await file.arrayBuffer())
  const ws = wb.worksheets[0]
  if (!ws) throw new Error('File tidak punya sheet.')

  const matrix: string[][] = []
  ws.eachRow({ includeEmpty: false }, (row) => {
    matrix.push((row.values as unknown[]).slice(1).map(cellToString))
  })
  while (matrix.length && matrix[matrix.length - 1].every((c) => c === '')) matrix.pop()
  if (!matrix.length) throw new Error('Sheet kosong.')

  const [header, ...rest] = matrix
  const columns = header.map((c, i) => c || `Kolom ${i + 1}`)
  const rows = rest
    .filter((r) => r.some((c) => c !== ''))
    .map((r) => columns.map((_, i) => r[i] ?? ''))
  return { columns, rows }
}

async function downloadTemplate(): Promise<void> {
  const ExcelJS = (await import('exceljs')).default
  const wb = new ExcelJS.Workbook()
  const ws = wb.addWorksheet('Tabel')
  const cols = ['Kolom 1', 'Kolom 2', 'Kolom 3']
  ws.addRow(cols)
  ws.addRow(cols.map((_, i) => `contoh ${i + 1}`))
  ws.addRow(cols.map(() => ''))
  const buf = await wb.xlsx.writeBuffer()
  const blob = new Blob([buf], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'template-tabel.xlsx'
  a.click()
  URL.revokeObjectURL(url)
}

export const TableImporter: UIFieldClientComponent = ({ path }) => {
  const { id } = useDocumentInfo()
  const localeObj = useLocale()
  const locale = typeof localeObj === 'string' ? localeObj : localeObj?.code
  // path looks like "tables.0.importer" — the index is the middle segment.
  const tableIndex = Number(path.split('.')[1])

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
        const res = await fetch(`/api/tabel/${id}/import`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ tableIndex, ...parsed, locale }),
        })
        if (!res.ok) {
          const body = await res.json().catch(() => ({}))
          throw new Error(body?.error || `Gagal impor (${res.status}).`)
        }
        // Data written server-side; reload to show it in the form.
        window.location.reload()
      } catch (err) {
        setMsg({ ok: false, text: err instanceof Error ? err.message : 'Gagal impor.' })
        setBusy(false)
      }
    },
    [id, tableIndex, locale],
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
