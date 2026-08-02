# Garage Branches Collection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the "Daftar Bengkel" (Garage List) page's giant single-document `tables` array (4300+ lines, one Payload doc holding every city) into a proper `garage-branches` collection — one document per city/branch — while the public page at `/tabel/garage-list` keeps rendering as a single page, now with a city dropdown filter and a nullable Authorize/General category per branch.

**Architecture:** New Payload collection `garage-branches` with a `relationship` field back to the parent `tabel` page doc. The frontend page fetches both the (now-empty) inline `tabel.tables` array and the new `garage-branches` docs for that page, normalises them through the existing `normaliseTables`/`DataTable` shape, and concatenates before handing off to the existing `TabelContent` renderer — so `TabelContent` doesn't know or care where a table came from. A one-off script migrates the existing 90+ inline table entries into the new collection and empties the old array so nothing double-renders.

**Tech Stack:** Payload CMS 3 (`@payloadcms/db-postgres`), Next.js 16 App Router (RSC), TypeScript, `tsx` for one-off scripts.

## Global Constraints

- This repo has **no test runner** (`package.json` has no jest/vitest/playwright). Every "Verify" step in this plan uses `npx tsc --noEmit`, `npm run migrate:status`, direct script output, or manual browser/admin checks — not `pytest`/`jest`. Do not invent a test framework as part of this plan.
- Localized fields (`title`, `description`, `columns.label`, `rows.cells.value`) must keep both `id` and `en` locale content when migrated — never drop the `en` copy.
- Field names on the new collection must exactly match `DataTable`'s shape (`title`, `category`, `description`, `columns`, `rows`, `id`) so `normaliseTables()` in `app/(app)/tabel/[slug]/page.tsx` works unmodified on both inline and collection-sourced tables.
- `category` on the new collection is a `select` with exactly two options — `Authorize` / `General` — and is **not required** (nullable). Existing migrated rows have no historical category data; leave them `null`.
- Never run `payload migrate:fresh` or any destructive DB command against a real database as part of this plan — only `migrate:create` (generates a file, doesn't touch data) and `migrate` (applies additive/generated SQL).

---

## File Structure

| File | Responsibility |
|---|---|
| `collections/GarageBranch.ts` | New collection config: one doc = one city's table. |
| `components/admin/tableImportShared.ts` | *New* — Excel parsing/template helpers extracted from `TableImporter.tsx` so both importers reuse them (DRY). |
| `components/admin/TableImporter.tsx` | *Modified* — imports shared helpers instead of defining them inline. Behavior unchanged. |
| `components/admin/GarageBranchImporter.tsx` | *New* — Excel importer UI for a `garage-branches` doc (no `tableIndex`, posts to `/api/garage-branches/:id/import`). |
| `collections/garageBranchImport.ts` | *New* — `POST /api/garage-branches/:id/import` endpoint, sibling of `tabelImport.ts` but writes directly to the doc (no nested array index). |
| `payload.config.ts` | *Modified* — register `GarageBranch` collection. |
| `migrations/*` (auto-generated) + `migrations/index.ts` (auto-updated) | DB schema for the new collection, generated via `payload migrate:create`. |
| `scripts/migrate-garage-branches.ts` | *New* — one-off data migration: reads `tabel` doc `slug=garage-list`, creates one `garage-branches` doc per existing table entry, then empties `tabel.tables` on that doc. Idempotent. |
| `app/(app)/tabel/[slug]/page.tsx` | *Modified* — fetch `garage-branches` docs for the page and merge with inline tables before passing to `TabelContent`. |
| `app/(app)/tabel/page.tsx` | *Modified* — include `garage-branches` row/table counts in the index cards so `garage-list` doesn't show "0 data" after migration. |
| `app/(app)/tabel/TabelContent.tsx` | *Modified* — add a city `<select>` dropdown (distinct `table.title` values) and guard the category pill for empty/null category. |

---

### Task 1: `garage-branches` collection schema

**Files:**
- Create: `collections/GarageBranch.ts`
- Modify: `payload.config.ts`

**Interfaces:**
- Produces: Payload collection slug `garage-branches` with fields `page` (relationship → `tabel`), `title` (localized text, required), `category` (select: `authorize` | `general`, optional), `description` (localized textarea, optional), `columns` (array of `{ label: localized text }`), `rows` (array of `{ cells: array of { value: localized text } }`), `order` (number, optional).

- [ ] **Step 1: Create the collection config**

```typescript
// collections/GarageBranch.ts
import type { CollectionConfig } from 'payload'
import { importGarageBranchEndpoint } from './garageBranchImport'

export const GarageBranch: CollectionConfig = {
  slug: 'garage-branches',
  labels: {
    singular: 'Cabang Bengkel',
    plural: 'Cabang Bengkel',
  },
  endpoints: [importGarageBranchEndpoint],
  admin: {
    useAsTitle: 'title',
    group: 'Halaman',
    defaultColumns: ['title', 'category', 'page'],
  },
  fields: [
    {
      name: 'page',
      type: 'relationship',
      relationTo: 'tabel',
      required: true,
      index: true,
      label: 'Halaman Induk',
      admin: {
        position: 'sidebar',
        description: 'Halaman "Tabel" tempat cabang ini ditampilkan, mis. Daftar Bengkel.',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Kota / Wilayah',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategori',
      required: false,
      options: [
        { label: 'Authorize', value: 'authorize' },
        { label: 'General', value: 'general' },
      ],
      admin: {
        description: 'Opsional. Kosongkan jika belum dikategorikan.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Deskripsi',
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Urutan Tampil',
      admin: {
        position: 'sidebar',
        description: 'Kosongkan untuk urutan sesuai input.',
      },
    },
    {
      name: 'importer',
      type: 'ui',
      admin: {
        components: {
          Field: './components/admin/GarageBranchImporter#GarageBranchImporter',
        },
      },
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Kolom',
      admin: {
        description: 'Daftar kolom dari kiri ke kanan. Urutan ini harus sama dengan urutan sel di setiap baris.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Nama Kolom',
          localized: true,
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Baris Data',
      admin: {
        initCollapsed: true,
        description: 'Jumlah sel tiap baris harus sama dengan jumlah kolom di atas. Gunakan tombol Impor Excel di atas untuk mengisi cepat.',
      },
      fields: [
        {
          name: 'cells',
          type: 'array',
          label: 'Sel',
          fields: [
            {
              name: 'value',
              type: 'text',
              label: 'Nilai',
              localized: true,
            },
          ],
        },
      ],
    },
  ],
}
```

- [ ] **Step 2: Register the collection**

In `payload.config.ts`, add the import and list entry:

```typescript
import { Tabel } from "./collections/Tabel";
import { GarageBranch } from "./collections/GarageBranch";
```

```typescript
  collections: [
    Users,
    Media,
    Products,
    News,
    Tags,
    Pages,
    Unduhan,
    Tabel,
    GarageBranch,
    DownloadLeads,
  ],
```

- [ ] **Step 3: Verify config loads**

The `importer` field references `garageBranchImport.ts` and `GarageBranchImporter.tsx`, which don't exist yet — Task 2 and Task 3 create them. Skip type-checking this file in isolation; verification happens at the end of Task 3 once all three files exist.

- [ ] **Step 4: Commit** (after Task 3 — see Task 3 Step 5)

---

### Task 2: Shared Excel import helpers + garage-branch admin importer

**Files:**
- Create: `components/admin/tableImportShared.ts`
- Modify: `components/admin/TableImporter.tsx`
- Create: `components/admin/GarageBranchImporter.tsx`

**Interfaces:**
- Consumes: nothing new.
- Produces: `parseSheet(file: File): Promise<{ columns: string[]; rows: string[][] }>`, `downloadTemplate(): Promise<void>`, `cellToString(cell: unknown): string` — exported from `tableImportShared.ts`, consumed by both importer components.

- [ ] **Step 1: Extract shared helpers**

```typescript
// components/admin/tableImportShared.ts
export type Parsed = { columns: string[]; rows: string[][] }

// exceljs cells can be strings, numbers, dates, or rich objects. Coerce to string.
export function cellToString(cell: unknown): string {
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

export async function parseSheet(file: File): Promise<Parsed> {
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

export async function downloadTemplate(): Promise<void> {
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
```

- [ ] **Step 2: Update `TableImporter.tsx` to use the shared module**

Replace the inline `cellToString`/`parseSheet`/`downloadTemplate` definitions (current lines 9–65) with:

```typescript
import { cellToString, downloadTemplate, parseSheet } from './tableImportShared'
```

Delete the now-duplicate function bodies. Everything else in the file (the `TableImporter` component itself, its `/api/tabel/${id}/import` call, `tableIndex` derivation) stays exactly as-is.

- [ ] **Step 3: Create the garage-branch importer component**

```tsx
// components/admin/GarageBranchImporter.tsx
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
```

- [ ] **Step 4: Verify (deferred)**

Type-checking `TableImporter.tsx`'s new import and `GarageBranchImporter.tsx` requires `tableImportShared.ts` (done) — run `npx tsc --noEmit` after Task 3's endpoint exists too, since `payload-types.ts` isn't regenerated until then. Continue to Task 3.

---

### Task 3: Import endpoint + wire collection together

**Files:**
- Create: `collections/garageBranchImport.ts`
- Verify: `collections/GarageBranch.ts` (from Task 1), `payload.config.ts` (from Task 1)

**Interfaces:**
- Consumes: nothing new.
- Produces: `POST /api/garage-branches/:id/import` — body `{ columns: string[], rows: string[][], locale?: 'id' | 'en' }`, writes directly to the doc's `columns`/`rows` fields (no `tableIndex` — unlike `tabelImport.ts`, one doc *is* one table).

- [ ] **Step 1: Write the endpoint**

```typescript
// collections/garageBranchImport.ts
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
```

- [ ] **Step 2: Type-check everything from Tasks 1–3**

Run: `npx tsc --noEmit`

Expected: no errors referencing `GarageBranch.ts`, `garageBranchImport.ts`, `GarageBranchImporter.tsx`, or `TableImporter.tsx`. (Errors about `payload-types.ts` not yet knowing about `garage-branches` are expected here — `payload-types.ts` regenerates when the dev server or `payload generate:types` runs, which Task 4's migration step does implicitly via `getPayload`.)

- [ ] **Step 3: Start the dev server once to regenerate `payload-types.ts` and confirm the collection boots**

Run: `npm run dev` (background), then check the terminal output for Payload startup errors, then open `http://localhost:3969/admin/collections/garage-branches` and confirm the list view loads with the "Cabang Bengkel" columns and an empty state. Stop the dev server after confirming.

Expected: admin list page renders, no console errors, "Impor Excel" button visible when creating a new doc (after first save).

- [ ] **Step 4: Re-run type-check now that `payload-types.ts` includes `GarageBranch`**

Run: `npx tsc --noEmit`

Expected: PASS, zero errors.

- [ ] **Step 5: Commit**

```bash
git add collections/GarageBranch.ts collections/garageBranchImport.ts components/admin/tableImportShared.ts components/admin/TableImporter.tsx components/admin/GarageBranchImporter.tsx payload.config.ts payload-types.ts
git commit -m "feat: add garage-branches collection with Excel import"
```

---

### Task 4: Generate the DB migration

**Files:**
- Create: `migrations/<timestamp>.ts` (auto-generated filename)
- Modify: `migrations/index.ts` (auto-updated by the CLI)

**Interfaces:**
- Consumes: `GarageBranch` collection schema from Task 1.
- Produces: `garage_branches`, `garage_branches_columns`, `garage_branches_columns_locales`, `garage_branches_rows`, `garage_branches_rows_cells`, `garage_branches_rows_cells_locales`, `garage_branches_locales` tables (exact names depend on Payload/Drizzle's naming — verify against the generated file).

- [ ] **Step 1: Generate the migration**

Run: `npm run migrate:create`

When prompted for a name, use `add_garage_branches`.

- [ ] **Step 2: Read the generated file and confirm it matches the schema**

Open the new file under `migrations/`. Confirm it creates a `garage_branches` table with a `page_id` foreign key to `tabel`, a `category` varchar/enum column (nullable — no `NOT NULL`), an `order` integer column (nullable), plus the nested `columns`/`rows`/`cells` child tables with their `_locales` companions for the localized fields. If `category` was generated `NOT NULL`, fix it — it must stay nullable per the Global Constraints.

- [ ] **Step 3: Apply the migration**

Run: `npm run migrate`

- [ ] **Step 4: Verify**

Run: `npm run migrate:status`

Expected: the new migration shows as applied (batch matches the latest), no pending migrations.

- [ ] **Step 5: Commit**

```bash
git add migrations/
git commit -m "chore: add DB migration for garage_branches tables"
```

---

### Task 5: Data migration script — move inline tables into `garage-branches`

**Files:**
- Create: `scripts/migrate-garage-branches.ts`

**Interfaces:**
- Consumes: `tabel` doc where `slug = 'garage-list'` (existing `tables[]` array — see `scripts/seed-bengkel.ts` for the shape it currently holds: `{ category, title, columns: [{label}], rows: [{cells: [{value}]}] }`).
- Produces: one `garage-branches` doc per existing `tables[]` entry, `page` set to the `tabel` doc's id, `order` set to the original array index; then clears `tabel.garage-list.tables` to `[]` so the merged frontend query (Task 6) doesn't double-render.

- [ ] **Step 1: Write the script**

```typescript
// scripts/migrate-garage-branches.ts
import { getPayload } from "payload";
import config from "../payload.config";

async function migrate() {
  const payload = await getPayload({ config });

  const pageResult = await payload.find({
    collection: "tabel",
    where: { slug: { equals: "garage-list" } },
    limit: 1,
    depth: 0,
  });

  const page = pageResult.docs[0];
  if (!page) {
    console.log('No "garage-list" tabel doc found. Nothing to migrate.');
    process.exit(0);
  }

  const alreadyMigrated = await payload.find({
    collection: "garage-branches",
    where: { page: { equals: page.id } },
    limit: 1,
  });

  if (alreadyMigrated.totalDocs > 0) {
    console.log("garage-branches already has docs for this page. Skipping (idempotent).");
    process.exit(0);
  }

  // Fetch every locale's content at once so no translated copy is lost.
  const source = await payload.findByID({
    collection: "tabel",
    id: page.id,
    locale: "all",
    depth: 0,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tables: any[] = Array.isArray(source.tables) ? source.tables : [];
  console.log(`Migrating ${tables.length} tables into garage-branches...`);

  let created = 0;
  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    await payload.create({
      collection: "garage-branches",
      locale: "all",
      data: {
        page: page.id,
        title: table.title,
        description: table.description ?? undefined,
        order: i,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        columns: (table.columns ?? []).map((c: any) => ({ label: c.label })),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rows: (table.rows ?? []).map((r: any) => ({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cells: (r.cells ?? []).map((c: any) => ({ value: c.value })),
        })),
      },
    });
    created++;
  }

  if (created !== tables.length) {
    console.error(`Expected to create ${tables.length} docs, created ${created}. Aborting before clearing source data.`);
    process.exit(1);
  }

  await payload.update({
    collection: "tabel",
    id: page.id,
    data: { tables: [] },
  });

  console.log(`Done. Created ${created} garage-branches docs and cleared tabel.tables.`);
  process.exit(0);
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

- [ ] **Step 2: Dry-run check before mutating — count what will be migrated**

Run: `npx tsx -e "
import { getPayload } from 'payload';
import config from './payload.config';
const payload = await getPayload({ config });
const r = await payload.find({ collection: 'tabel', where: { slug: { equals: 'garage-list' } }, limit: 1 });
console.log('tables to migrate:', (r.docs[0]?.tables ?? []).length);
process.exit(0);
"`

Expected: prints a count matching the number of `title:` entries in `scripts/seed-bengkel.ts` (spot-check: the file has dozens of city sections — the count should be > 0 and match what you see in `/admin/collections/tabel` today for the "Daftar Bengkel" doc).

- [ ] **Step 3: Run the migration script**

Run: `npx tsx scripts/migrate-garage-branches.ts`

Expected output: `Migrating N tables into garage-branches...` then `Done. Created N garage-branches docs and cleared tabel.tables.` where N matches Step 2's count.

- [ ] **Step 4: Verify idempotency**

Run: `npx tsx scripts/migrate-garage-branches.ts` again.

Expected: `garage-branches already has docs for this page. Skipping (idempotent).` — confirms re-running the script is safe (e.g. if triggered twice in a deploy).

- [ ] **Step 5: Verify in admin**

Open `http://localhost:3969/admin/collections/garage-branches`, confirm N documents exist, spot-check 2–3 for correct `title` (city name), `columns`, and first row's `cells` values against the original `scripts/seed-bengkel.ts` source. Open `http://localhost:3969/admin/collections/tabel` → "Daftar Bengkel" and confirm its `tables` array is now empty.

- [ ] **Step 6: Commit**

```bash
git add scripts/migrate-garage-branches.ts
git commit -m "feat: add one-off migration script for garage-branches data"
```

---

### Task 6: Frontend — merge `garage-branches` docs into the page render

**Files:**
- Modify: `app/(app)/tabel/[slug]/page.tsx`
- Modify: `app/(app)/tabel/page.tsx`

**Interfaces:**
- Consumes: `normaliseTables(raw: any[]): DataTable[]` (existing function in `[slug]/page.tsx`, unchanged signature — `garage-branches` docs already match the shape it expects: `{ id, category, title, description, columns, rows }`).
- Produces: `tables: DataTable[]` passed to `<TabelContent tables={tables} />`, now sourced from both `doc.tables` (inline, still supported for other `tabel` pages) and `garage-branches` docs `where: { page: { equals: doc.id } }`.

- [ ] **Step 1: Fetch and merge branch docs in the detail page**

In `app/(app)/tabel/[slug]/page.tsx`, add a fetch alongside `fetchDoc` and merge before rendering:

```typescript
const fetchBranches = cache(async (pageId: string | number, locale: string) => {
  const payload = await getPayloadInstance();
  const result = await payload.find({
    collection: "garage-branches",
    where: { page: { equals: pageId } },
    sort: "order",
    depth: 0,
    locale,
    limit: 500,
  });
  return result.docs;
});
```

Then in `TabelDetailPage`, replace:

```typescript
  const tables: DataTable[] = Array.isArray(doc.tables) && doc.tables.length > 0
    ? normaliseTables(doc.tables)
    : [];
```

with:

```typescript
  const branches = await fetchBranches(doc.id, locale);
  const tables: DataTable[] = [
    ...(Array.isArray(doc.tables) ? normaliseTables(doc.tables) : []),
    ...(branches.length > 0 ? normaliseTables(branches) : []),
  ];
```

- [ ] **Step 2: Guard `normaliseTables` against a null `category`**

`table.category ?? ""` (existing line in `normaliseTables`) already handles `null`/`undefined` — no change needed there. Confirm by reading the current function body before moving on.

- [ ] **Step 3: Update the index page's counts**

In `app/(app)/tabel/page.tsx`, after fetching `result` from `tabel.find(...)`, fetch all `garage-branches` docs once and group by `page` id so each card's `tableCount`/`rowCount` includes branch data:

```typescript
    const branchesResult = await payload.find({
      collection: "garage-branches",
      depth: 0,
      locale,
      limit: 1000,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const branchesByPage = new Map<string, any[]>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const branch of branchesResult.docs as any[]) {
      const pageId = String(
        typeof branch.page === "object" ? branch.page?.id : branch.page,
      );
      const list = branchesByPage.get(pageId) ?? [];
      list.push(branch);
      branchesByPage.set(pageId, list);
    }
```

Then in the `cards = result.docs.map(...)` block, add the branch counts:

```typescript
    cards = result.docs.map((doc: any) => {
      const tables = Array.isArray(doc.tables) ? doc.tables : [];
      const branches = branchesByPage.get(String(doc.id)) ?? [];
      const rowCount =
        tables.reduce(
          (sum: number, t: any) => sum + (Array.isArray(t.rows) ? t.rows.length : 0),
          0,
        ) +
        branches.reduce(
          (sum: number, b: any) => sum + (Array.isArray(b.rows) ? b.rows.length : 0),
          0,
        );
      return {
        title: doc.title,
        description: doc.description ?? null,
        slug: doc.slug,
        tableCount: tables.length + branches.length,
        rowCount,
      };
    });
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — expect PASS.

Run: `npm run dev`, open `http://localhost:3969/tabel/garage-list`. Confirm:
- The page renders the same city sections as before migration (spot-check 2–3 cities and row counts against what you saw in Task 5 Step 5).
- `http://localhost:3969/tabel` index card for "Daftar Bengkel" shows the correct non-zero `tableCount`/`rowCount`.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add "app/(app)/tabel/[slug]/page.tsx" "app/(app)/tabel/page.tsx"
git commit -m "feat: merge garage-branches docs into tabel page render"
```

---

### Task 7: City dropdown filter + nullable category badge guard

**Files:**
- Modify: `app/(app)/tabel/TabelContent.tsx`

**Interfaces:**
- Consumes: `DataTable[]` (unchanged shape).
- Produces: no new exports — purely internal UI change to the existing default-exported `TabelContent` component.

- [ ] **Step 1: Add a city dropdown next to the search box**

In `app/(app)/tabel/TabelContent.tsx`, add a `cities` memo alongside the existing `categories` memo:

```typescript
  const cities = useMemo(
    () => Array.from(new Set(tables.map((t) => t.title))).sort(),
    [tables],
  );
```

Add the dropdown in the filter bar, right after the search input's closing `</div>` (before the `<p>` result-count paragraph):

```tsx
          {cities.length > 1 && (
            <select
              value={cities.includes(query) ? query : ""}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-56 shrink-0 px-4 py-3 rounded-xl border border-slate-200 bg-card text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all"
              aria-label="Filter berdasarkan kota"
            >
              <option value="">Semua kota</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          )}
```

- [ ] **Step 2: Guard the category pill for null/empty category**

In the table header block, find:

```tsx
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                        {table.category}
                      </span>
                    </div>
```

Replace with:

```tsx
                    {table.category && (
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                          {table.category}
                        </span>
                      </div>
                    )}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expect PASS.

Run: `npm run dev`, open `http://localhost:3969/tabel/garage-list`. Confirm:
- A "Semua kota" dropdown appears listing every city once, alphabetically.
- Selecting a city filters the page down to that city's table only (reuses the existing `query` state, so the search box shows the city name too — expected, same mechanism).
- Selecting "Semua kota" clears the filter.
- No empty category pill renders on any table (since all migrated rows have `category: null`).

Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add "app/(app)/tabel/TabelContent.tsx"
git commit -m "feat: add city dropdown filter and guard nullable category badge"
```

---

## Post-plan notes (not part of this plan's scope)

- `scripts/seed-bengkel.ts` becomes historical — it still seeds the old `tabel.tables` shape, which Task 5 immediately empties again if re-run after migration. Leave it in place as a record of the original data; do not delete or "fix" it as part of this plan.
- Categorizing the 90+ migrated branches as Authorize/General is a content task for whoever manages the CMS, not an engineering task — every migrated doc starts with `category: null` by design.
- If other `tabel` pages (e.g. `daftar-agen`, `jaringan-kantor` — see `scripts/seed-daftar-agen.ts`, `scripts/seed-jaringan-kantor.ts`) later need the same per-city-doc treatment, they can reuse `garage-branches`' `page` relationship pattern directly — no schema change needed, just point `page` at a different `tabel` doc.
