import type { Endpoint, PayloadRequest } from 'payload'
import { addDataAndFileToRequest } from 'payload'

const MAX_ROWS = 5000
const MAX_COLS = 100
const CONCURRENCY = 20

async function runInBatches<T>(items: T[], size: number, fn: (item: T, index: number) => Promise<unknown>) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map((item, offset) => fn(item, i + offset)))
  }
}

// POST /api/garage-branches/:id/import  { columns: string[], rows: string[][], locale }
// A garage-branches doc IS one table (unlike `tabel`, which nests many tables
// per doc). Rows live in the `garage-branch-rows` collection (one doc per
// row) rather than an embedded array — keeps the admin edit screen from
// having to mount thousands of nested array rows at once.
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

    await req.payload.update({
      collection: 'garage-branches',
      id,
      locale,
      req,
      data: {
        columns: columns.map((label, i) => ({ id: existingColumns[i]?.id, label })),
      },
    })

    const existingRowsResult = await req.payload.find({
      collection: 'garage-branch-rows',
      where: { branch: { equals: id } },
      sort: 'order',
      locale,
      depth: 0,
      pagination: false,
      req,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingRows: any[] = existingRowsResult.docs

    // Update/create rows in place so re-importing preserves each row's id
    // and category (only 'authorize' status is admin-set — imports must not
    // reset it back to 'general').
    await runInBatches(rows, CONCURRENCY, async (cells, ri) => {
      const cellsData = cells.map((value, ci) => ({
        id: existingRows[ri]?.cells?.[ci]?.id,
        value,
      }))

      if (existingRows[ri]) {
        return req.payload.update({
          collection: 'garage-branch-rows',
          id: existingRows[ri].id,
          locale,
          req,
          data: { order: ri, cells: cellsData },
        })
      }

      return req.payload.create({
        collection: 'garage-branch-rows',
        locale,
        req,
        data: { branch: Number(id), order: ri, category: 'general', cells: cellsData },
      })
    })

    // Import replaces the whole table for this branch — drop any rows beyond
    // the newly uploaded count.
    const leftoverRows = existingRows.slice(rows.length)
    await runInBatches(leftoverRows, CONCURRENCY, (row) =>
      req.payload.delete({
        collection: 'garage-branch-rows',
        id: row.id,
        req,
      }),
    )

    return Response.json({ ok: true, rows: rows.length, columns: columns.length })
  },
}
