"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Tag, TableProperties, X } from "lucide-react";

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

// Shared cell-value styling for the ✓ / — sentinels used across desktop + mobile.
function valueClass(v: string | undefined): string {
  if (v === "✓") return "text-success font-bold";
  if (v === "—" || v == null) return "text-slate-300";
  return "text-text-primary";
}

// Raw category values are CMS slugs (e.g. "authorize"); display them properly capitalised.
function categoryLabel(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export default function TabelContent({ tables }: TabelContentProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(tables.map((t) => t.category).filter(Boolean))),
    [tables],
  );

  const cities = useMemo(
    () => Array.from(new Set(tables.map((t) => t.title))).sort(),
    [tables],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return tables
      .filter((table) => !activeCategory || table.category === activeCategory)
      .filter((table) => !activeCity || table.title === activeCity)
      .map((table) => {
        if (!q) return table;
        const titleMatches = table.title.toLowerCase().includes(q);
        return {
          ...table,
          rows: titleMatches
            ? table.rows
            : table.rows.filter((row) =>
                Object.values(row).some((v) => v.toLowerCase().includes(q)),
              ),
        };
      })
      .filter((table) => {
        if (!q) return true;
        return (
          table.rows.length > 0 ||
          table.title.toLowerCase().includes(q) ||
          table.description.toLowerCase().includes(q)
        );
      });
  }, [search, activeCategory, activeCity, tables]);

  const totalRows = tables.reduce((sum, t) => sum + t.rows.length, 0);
  const hasActiveFilters = Boolean(search.trim() || activeCategory || activeCity);

  function clearAllFilters() {
    setSearch("");
    setActiveCategory(null);
    setActiveCity(null);
  }

  return (
    <>
      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-card rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, alamat, PIC..."
              className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-bg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all"
              aria-label="Cari data dalam tabel"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                aria-label="Hapus pencarian"
              >
                <X size={10} className="text-text-muted" aria-hidden="true" />
              </button>
            )}
          </div>
          {cities.length > 1 && (
            <div className="relative sm:w-56 shrink-0">
              <MapPin
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                aria-hidden="true"
              />
              <select
                value={activeCity ?? ""}
                onChange={(e) => setActiveCity(e.target.value || null)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-bg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all appearance-none"
                aria-label="Filter berdasarkan kota"
              >
                <option value="">Semua kota</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted mr-1">
              <Tag size={13} aria-hidden="true" />
              Kategori
            </span>
            <button
              onClick={() => setActiveCategory(null)}
              aria-pressed={activeCategory === null}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
                activeCategory === null
                  ? "bg-navy text-white border-navy"
                  : "bg-bg text-text-muted border-slate-200 hover:border-navy/40 hover:text-navy"
              }`}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                aria-pressed={activeCategory === cat}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy ${
                  activeCategory === cat
                    ? "bg-navy text-white border-navy"
                    : "bg-bg text-text-muted border-slate-200 hover:border-navy/40 hover:text-navy"
                }`}
              >
                {categoryLabel(cat)}
              </button>
            ))}
          </div>
        )}

        {/* Result summary */}
        <div className="flex items-center justify-between gap-3 mt-4 text-xs text-text-muted">
          <span>
            {totalRows} data dalam {tables.length} tabel
            {hasActiveFilters && (
              <>
                {" "}
                &middot;{" "}
                <span className="font-medium text-text-primary">
                  {filtered.reduce((sum, t) => sum + t.rows.length, 0)} cocok
                </span>
              </>
            )}
          </span>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="font-medium text-navy hover:underline shrink-0"
            >
              Hapus semua filter
            </button>
          )}
        </div>
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
            {search
              ? <>Tidak ada data yang cocok dengan &ldquo;{search}&rdquo;</>
              : "Tidak ada data yang cocok dengan filter ini."}
          </p>
          <button
            onClick={clearAllFilters}
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
                    {table.category && (
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                          {categoryLabel(table.category)}
                        </span>
                      </div>
                    )}
                    <h2 className="text-lg font-bold text-text-primary leading-snug">
                      {table.title}
                    </h2>
                    {table.description && (
                      <p className="text-sm text-text-muted mt-1 leading-relaxed">
                        {table.description}
                      </p>
                    )}
                  </div>
                  <span
                    className={`shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg border ${
                      table.rows.length === 0
                        ? "text-text-muted bg-slate-50 border-slate-100"
                        : "text-navy bg-navy/6 border-navy/10"
                    }`}
                  >
                    {table.rows.length} data
                  </span>
                </div>
              </div>

              <div className="hidden sm:block overflow-x-auto">
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

              {/* Mobile: each row stacked as label / value so nothing scrolls off-screen */}
              <div className="sm:hidden divide-y divide-slate-100">
                {table.rows.map((row, rowIndex) => {
                  const [firstCol, ...restCols] = table.columns;
                  return (
                    <div key={rowIndex} className="px-5 py-4">
                      {firstCol && (
                        <p className="font-semibold text-text-primary text-[15px] leading-snug mb-3">
                          {row[firstCol] ?? "—"}
                        </p>
                      )}
                      {restCols.length > 0 && (
                        <dl className="flex flex-col gap-2">
                          {restCols.map((col) => (
                            <div
                              key={col}
                              className="flex items-baseline justify-between gap-4"
                            >
                              <dt className="text-xs text-text-muted shrink-0">
                                {col}
                              </dt>
                              <dd
                                className={`text-sm text-right ${valueClass(row[col])}`}
                              >
                                {row[col] ?? "—"}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  );
                })}
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
