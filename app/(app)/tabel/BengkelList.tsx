"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Search, TableProperties, X } from "lucide-react";

export interface BengkelEntry {
  id: string;
  category: string;
  city: string;
  columns: string[];
  values: Record<string, string>;
}

interface BengkelListProps {
  entries: BengkelEntry[];
}

const CATEGORY_ORDER = ["authorize", "general"];

const CATEGORY_LABELS: Record<string, string> = {
  authorize: "Authorized",
  general: "Umum",
};

function categoryLabel(category: string): string {
  return CATEGORY_LABELS[category] ?? "Belum Dikategorikan";
}

function sortCategories(categories: string[]): string[] {
  return [...categories].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

function isMapsColumn(col: string): boolean {
  return col.trim().toLowerCase() === "maps";
}

function isPhoneColumn(col: string): boolean {
  return ["telepon", "telp", "phone", "no. telepon"].includes(
    col.trim().toLowerCase(),
  );
}

// Numbers like "021-8763970/71" or "0812... // 0818..." list more than one
// contact; tel: only supports one, so take the first.
function toTelHref(raw: string): string {
  const first = raw.split(/[/,;]+/)[0] ?? raw;
  return `tel:${first.replace(/[^0-9+]/g, "")}`;
}

// Preserves first-seen order (entries already arrive sorted by branch `order`).
function groupBy<T>(items: T[], keyOf: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const key = keyOf(item);
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }
  return map;
}

export default function BengkelList({ entries }: BengkelListProps) {
  const [search, setSearch] = useState("");
  const [activeCity, setActiveCity] = useState<string | null>(null);

  const cities = useMemo(
    () =>
      Array.from(new Set(entries.map((e) => e.city).filter(Boolean))).sort(),
    [entries],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries
      .filter((entry) => !activeCity || entry.city === activeCity)
      .filter((entry) => {
        if (!q) return true;
        if (entry.city.toLowerCase().includes(q)) return true;
        return Object.values(entry.values).some((v) =>
          v.toLowerCase().includes(q),
        );
      });
  }, [search, activeCity, entries]);

  const categories = useMemo(
    () => sortCategories(Array.from(new Set(filtered.map((e) => e.category)))),
    [filtered],
  );

  const groupedByCategory = useMemo(
    () => groupBy(filtered, (e) => e.category),
    [filtered],
  );

  function clearAllFilters() {
    setSearch("");
    setActiveCity(null);
  }

  const hasActiveFilters = Boolean(search.trim() || activeCity);

  return (
    <>
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
              placeholder="Cari nama bengkel, alamat, kota..."
              className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-200 bg-bg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-navy focus:border-navy transition-all"
              aria-label="Cari bengkel"
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

        <div className="flex items-center justify-between gap-3 mt-4 text-xs text-text-muted">
          <span>
            {filtered.length} bengkel ditemukan
            {hasActiveFilters && filtered.length !== entries.length && (
              <> &middot; dari {entries.length} total</>
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

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
            <TableProperties
              size={28}
              className="text-text-muted"
              aria-hidden="true"
            />
          </div>
          <p className="text-text-muted text-sm">
            {hasActiveFilters
              ? "Tidak ada bengkel yang cocok dengan filter ini."
              : "Belum ada data bengkel."}
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-navy text-sm font-medium hover:underline"
            >
              Hapus filter
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {categories.map((category, sectionIndex) => {
            const items = groupedByCategory.get(category) ?? [];
            const byCity = groupBy(items, (e) => e.city || "Lainnya");
            const citiesInCategory = Array.from(byCity.keys());

            return (
              <motion.section
                key={category || "uncategorised"}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: sectionIndex * 0.08 }}
              >
                <div className="flex items-center gap-2 mb-5">
                  <h2 className="text-lg font-bold text-text-primary">
                    Daftar Bengkel Rekanan {categoryLabel(category)}
                  </h2>
                </div>
                <div className="flex flex-col gap-7">
                  {citiesInCategory.map((city) => {
                    const cityItems = byCity.get(city) ?? [];
                    return (
                      <div key={city}>
                        <h3 className="text-xs font-semibold text-accent uppercase tracking-wide mb-3">
                          {city}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {cityItems.map((entry) => {
                            const [nameCol, ...rest] = entry.columns;
                            const mapsCol = entry.columns.find(isMapsColumn);
                            const phoneCol = rest.find(isPhoneColumn);
                            const otherCols = rest.filter(
                              (col) => col !== mapsCol && col !== phoneCol,
                            );
                            const mapsUrl = mapsCol
                              ? entry.values[mapsCol]
                              : undefined;
                            const phone = phoneCol
                              ? entry.values[phoneCol]
                              : undefined;

                            return (
                              <div
                                key={entry.id}
                                className="bg-card rounded-xl border border-slate-200 p-4 hover:border-navy/30 hover:shadow-md transition-all duration-200"
                              >
                                {nameCol && (
                                  <p className="font-semibold text-text-primary text-[15px] leading-snug mb-1.5">
                                    {entry.values[nameCol] || "—"}
                                  </p>
                                )}
                                {otherCols.map((col) => {
                                  const value = entry.values[col];
                                  if (!value || value === "—") return null;
                                  return (
                                    <p
                                      key={col}
                                      className="text-sm text-text-muted leading-relaxed mb-1 last:mb-0"
                                    >
                                      {value}
                                    </p>
                                  );
                                })}
                                {phone && phone !== "—" && (
                                  <a
                                    href={toTelHref(phone)}
                                    className="flex w-fit items-center gap-1.5 text-sm text-navy font-medium hover:underline mt-1.5"
                                  >
                                    <Phone size={13} aria-hidden="true" />
                                    {phone}
                                  </a>
                                )}
                                {mapsUrl && mapsUrl !== "—" && (
                                  <a
                                    href={mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex w-fit items-center gap-1.5 text-xs font-semibold text-navy bg-navy/8 hover:bg-navy hover:text-white px-3 py-1.5 rounded-lg transition-colors mt-3"
                                  >
                                    <MapPin size={13} aria-hidden="true" />
                                    Lihat di Google Maps
                                  </a>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      )}
    </>
  );
}
