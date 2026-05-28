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
      className="flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-[#1e3a8a]/20 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a]"
    >
      <Search className="size-4 shrink-0 text-[#1e3a8a]" />
    </button>
  );
}
