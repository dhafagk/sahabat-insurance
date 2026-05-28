"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import type { SearchResult } from "@/app/api/search/route";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type SearchState = {
  query: string;
  results: SearchResult[];
  loading: boolean;
  error: boolean;
  focusedIndex: number;
};

const INITIAL_STATE: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: false,
  focusedIndex: -1,
};

export default function SearchOverlay({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [state, setState] = useState<SearchState>(INITIAL_STATE);
  const { query, results, loading, error, focusedIndex } = state;
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const fetchResults = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.trim().length < 2) {
      setState((s) => ({ ...s, results: [], loading: false, error: false }));
      return;
    }
    setState((s) => ({ ...s, loading: true, error: false }));
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (!res.ok) throw new Error("Search failed");
        const data: SearchResult[] = await res.json();
        setState((s) => ({
          ...s,
          results: data,
          loading: false,
          error: false,
          focusedIndex: -1,
        }));
      } catch {
        setState((s) => ({ ...s, loading: false, error: true, results: [] }));
      }
    }, 300);
  }, []);

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setState((s) => ({ ...s, query: val }));
    fetchResults(val);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      handleClose();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setState((s) => ({
        ...s,
        focusedIndex: Math.min(s.focusedIndex + 1, s.results.length - 1),
      }));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setState((s) => ({
        ...s,
        focusedIndex: Math.max(s.focusedIndex - 1, -1),
      }));
      return;
    }
    if (e.key === "Enter" && focusedIndex >= 0 && results[focusedIndex]) {
      e.preventDefault();
      router.push(results[focusedIndex].href);
      handleClose();
    }
  }

  function handleClose() {
    setState(INITIAL_STATE);
    onClose();
  }

  if (!isOpen) return null;

  return (
    // pointer-events-auto overrides the parent header's pointer-events-none
    <div
      className="animate-overlay-backdrop pointer-events-auto fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="animate-overlay-panel mx-auto mt-[6.5rem] max-w-xl px-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Unified card — input + results share one background */}
        <div className="overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
          {/* Search input */}
          <div className="flex items-center gap-3 px-5 py-4">
            <Search className="size-5 shrink-0 text-[#1e3a8a]" />
            <input
              ref={inputRef}
              value={query}
              onChange={handleQueryChange}
              onKeyDown={handleKeyDown}
              placeholder="Cari artikel, produk..."
              className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
            {query.length > 0 && (
              <button
                onClick={() => {
                  setState(INITIAL_STATE);
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="shrink-0 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Results — separated by a hairline divider */}
          {(loading || results.length > 0 || error || query.length >= 2) && (
            <div className="border-t border-slate-100">
              {loading && (
                <div className="flex items-center gap-3 px-5 py-4">
                  <div className="flex gap-1">
                    <span className="size-1.5 animate-bounce rounded-full bg-[#1e3a8a]/40 [animation-delay:0ms]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-[#1e3a8a]/40 [animation-delay:150ms]" />
                    <span className="size-1.5 animate-bounce rounded-full bg-[#1e3a8a]/40 [animation-delay:300ms]" />
                  </div>
                  <span className="text-sm text-slate-400">Mencari...</span>
                </div>
              )}
              {!loading && error && (
                <p className="px-5 py-4 text-sm text-slate-500">
                  Search unavailable. Please try again.
                </p>
              )}
              {!loading &&
                !error &&
                query.length >= 2 &&
                results.length === 0 && (
                  <p className="px-5 py-4 text-sm text-slate-500">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
              {!loading &&
                results.map((result, i) => (
                  <Link
                    key={`${result.type}-${result.href}`}
                    href={result.href}
                    onClick={handleClose}
                    className={`flex items-start gap-3 border-b border-slate-50 px-5 py-3.5 last:border-b-0 transition-colors ${
                      focusedIndex === i
                        ? "bg-[#1e3a8a]/5"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                        result.type === "news"
                          ? "bg-blue-100 text-blue-700"
                          : result.type === "product"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {result.type === "news"
                        ? "News"
                        : result.type === "product"
                          ? "Product"
                          : "Page"}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {result.title}
                      </p>
                      {result.excerpt && (
                        <p className="mt-0.5 truncate text-xs text-slate-500">
                          {result.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>

        {/* Keyboard hint */}
        <p className="mt-3 text-center text-xs text-white/70">
          ↑↓ navigate &nbsp;·&nbsp; Enter to open &nbsp;·&nbsp; ESC to close
        </p>
      </div>
    </div>
  );
}
