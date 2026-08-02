import type { Endpoint, PayloadRequest } from 'payload'
import { addDataAndFileToRequest } from 'payload'

const MAX_ROWS = 5000
const MAX_COLS = 100

// POST /api/garage-branches/:id/import  { columns: string[], rows: string[][], locale }
// A garage-branches doc IS one table (unlike `tabel`, which nests many tables
// per doc), so this writes columns/rows directly onto the doc — no tableIndex.
export const importGarageBranchEndpoint: Endpoint = {
  path: '/:id/import',
  method: 'post',
  handler: async (req: PayloadRequest): Promise<Response> => {
    if (!req.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await addDataAndFileToRequest(req)
    const id = req.routeParams?.id as string
    const data = req.data ?? {}
    const columns = data.columns
    const rows = data.rows
    const locale =
      data.locale === 'id' || data.locale === 'en' ? data.locale : undefined

    if (!id) {
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

    const existing = await req.payload.findByID({
      collection: 'garage-branches',
      id,
      locale,
      depth: 0,
      req,
    })

    if (!existing) {
      return Response.json({ error: 'Dokumen tidak ditemukan.' }, { status: 400 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingColumns: any[] = Array.isArray(existing.columns) ? existing.columns : []
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingRows: any[] = Array.isArray(existing.rows) ? existing.rows : []

    await req.payload.update({
      collection: 'garage-branches',
      id,
      locale,
      req,
      data: {
        columns: columns.map((label, i) => ({ id: existingColumns[i]?.id, label })),
        rows: rows.map((cells, ri) => ({
          id: existingRows[ri]?.id,
          cells: cells.map((value, ci) => ({
            id: existingRows[ri]?.cells?.[ci]?.id,
            value,
          })),
        })),
      },
    })

    return Response.json({ ok: true, rows: rows.length, columns: columns.length })
  },
}
