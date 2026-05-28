"use client";

import { Search } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function SearchButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Open search"
      className="flex items-center gap-2 h-9 rounded-full border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-slate-500 transition-all hover:border-[#1e3a8a]/20 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a]"
    >
      <Search className="size-4 shrink-0 text-[#1e3a8a]" />
      <span className="hidden sm:inline pr-0.5">Cari...</span>
    </button>
  );
}
