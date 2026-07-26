import type { Endpoint, PayloadRequest } from 'payload'
import { addDataAndFileToRequest } from 'payload'

const MAX_ROWS = 5000
const MAX_COLS = 100

// POST /api/tabel/:id/import  { tableIndex, columns: string[], rows: string[][], locale }
// Writes one table's columns/rows into the existing nested-array structure, so
// no schema change / migration is needed. Reuses existing row/column/cell ids
// positionally so the other locale's text survives when counts line up.
export const importTableEndpoint: Endpoint = {
  path: '/:id/import',
  method: 'post',
  handler: async (req: PayloadRequest): Promise<Response> => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await addDataAndFileToRequest(req)
    const id = req.routeParams?.id as string
    const data = req.data ?? {}
    const tableIndex = Number(data.tableIndex)
    const columns = data.columns
    const rows = data.rows
    const locale =
      data.locale === 'id' || data.locale === 'en' ? data.locale : undefined

    // Validate at the boundary — never trust the posted payload.
    if (!id || !Number.isInteger(tableIndex) || tableIndex < 0) {
      return Response.json({ error: 'Permintaan tidak valid.' }, { status: 400 })
    }
    if (
      !Array.isArray(columns) ||
      columns.length > MAX_COLS ||
      !columns.every((c) => typeof c === 'string')
    ) {
      return Response.json({ error: 'Kolom tidak valid.' }, { status: 400 })
    }
    if (
      !Array.isArray(rows) ||
      rows.length > MAX_ROWS ||
      !rows.every((r) => Array.isArray(r) && r.every((v) => typeof v === 'string'))
    ) {
      return Response.json({ error: 'Baris tidak valid.' }, { status: 400 })
    }

    const doc = await req.payload.findByID({
      collection: 'tabel',
      id,
      locale,
      depth: 0,
      req,
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tables: any[] = Array.isArray(doc.tables) ? [...doc.tables] : []
    const existing = tables[tableIndex]
    if (!existing) {
      return Response.json({ error: 'Tabel tidak ditemukan.' }, { status: 400 })
    }

    tables[tableIndex] = {
      ...existing,
      columns: columns.map((label, i) => ({ id: existing.columns?.[i]?.id, label })),
      rows: rows.map((cells, ri) => ({
        id: existing.rows?.[ri]?.id,
        cells: cells.map((value, ci) => ({
          id: existing.rows?.[ri]?.cells?.[ci]?.id,
          value,
        })),
      })),
    }

    await req.payload.update({ collection: 'tabel', id, data: { tables }, locale, req })

    return Response.json({ ok: true, rows: rows.length, columns: columns.length })
  },
}
