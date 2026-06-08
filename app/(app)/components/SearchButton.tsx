"use client";

import { Search } from "lucide-react";
import type { Locale } from "../lib/locale";
import { useTranslations } from "../lib/i18n";

interface Props {
  onClick: () => void;
  locale?: Locale;
}

export default function SearchButton({ onClick, locale = "id" }: Props) {
  const { searchButton: tr } = useTranslations(locale);
  return (
    <button
      onClick={onClick}
      aria-label={tr.ariaLabel}
      className="flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-[#1e3a8a]/20 hover:bg-[#1e3a8a]/5 hover:text-[#1e3a8a]"
    >
      <Search className="size-4 shrink-0 text-[#1e3a8a]" />
    </button>
  );
}
