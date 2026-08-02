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
