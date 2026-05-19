"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X, TableProperties } from "lucide-react";

export interface DataTable {
  id: string;
  category: string;
  title: string;
  description: string;
  columns: string[];
  rows: Record<string, string>[];
}

interface TabelContentProps {
  tables: DataTable[];
}

export default function TabelContent({ tables }: TabelContentProps) {
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(tables.map((t) => t.category))),
    [tables],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return tables;
    const q = query.toLowerCase();
    return tables
      .map((table) => ({
        ...table,
        rows: table.rows.filter((row) =>
          Object.values(row).some((v) => v.toLowerCase().includes(q)),
        ),
      }))
      .filter(
        (table) =>
          table.rows.length > 0 ||
          table.title.toLowerCase().includes(q) ||
          table.description.toLowerCase().includes(q),
      );
  }, [query, tables]);

  const totalRows = tables.reduce((sum, t) => sum + t.rows.length, 0);

  return (
    <>
      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-lg">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari data, tarif, kota, fitur..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-card text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all"
              aria-label="Cari data dalam tabel"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                aria-label="Hapus pencarian"
              >
                <X size={10} className="text-text-muted" aria-hidden="true" />
              </button>
            )}
          </div>
          <p className="text-sm text-text-muted shrink-0">
            {query ? (
              <>
                Hasil untuk{" "}
                <span className="font-medium text-text-primary">
                  &ldquo;{query}&rdquo;
                </span>
              </>
            ) : (
              <>
                {totalRows} baris data dalam {tables.length} tabel
              </>
            )}
          </p>
        </div>

        {/* Category pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setQuery(cat === query ? "" : cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                  query === cat
                    ? "bg-navy text-white border-navy"
                    : "bg-white text-text-muted border-slate-200 hover:border-navy/40 hover:text-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Tables */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <TableProperties
              size={28}
              className="text-text-muted"
              aria-hidden="true"
            />
          </div>
          <p className="text-text-muted text-sm">
            Tidak ada data yang cocok dengan &ldquo;{query}&rdquo;
          </p>
          <button
            onClick={() => setQuery("")}
            className="text-navy text-sm font-medium hover:underline"
          >
            Hapus filter
          </button>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-8">
          {filtered.map((table, tableIndex) => (
            <motion.div
              key={table.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: tableIndex * 0.08 }}
              className="bg-card rounded-2xl border border-slate-100 overflow-hidden shadow-sm"
            >
              <div className="px-6 py-5 border-b border-slate-100">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                        {table.category}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-text-primary leading-snug">
                      {table.title}
                    </h2>
                    {table.description && (
                      <p className="text-sm text-text-muted mt-1 leading-relaxed">
                        {table.description}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 text-xs text-text-muted bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                    {table.rows.length} baris
                  </span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm" aria-label={table.title}>
                  <thead>
                    <tr className="bg-navy/4 border-b border-slate-100">
                      {table.columns.map((col) => (
                        <th
                          key={col}
                          className="px-5 py-3.5 text-left text-xs font-bold text-navy uppercase tracking-wide whitespace-nowrap"
                          scope="col"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {table.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`transition-colors hover:bg-navy/3 ${
                          rowIndex % 2 === 1 ? "bg-slate-50/60" : ""
                        }`}
                      >
                        {table.columns.map((col, colIndex) => (
                          <td
                            key={col}
                            className={`px-5 py-3.5 whitespace-nowrap ${
                              colIndex === 0
                                ? "font-medium text-text-primary"
                                : "text-text-muted"
                            } ${
                              row[col] === "✓"
                                ? "text-success font-bold text-base"
                                : row[col] === "—"
                                  ? "text-slate-300"
                                  : ""
                            }`}
                          >
                            {row[col] ?? "—"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {table.rows.length === 0 && (
                <div className="px-6 py-8 text-center text-sm text-text-muted">
                  Tidak ada baris yang cocok dengan pencarian ini.
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
