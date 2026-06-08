"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "../actions/locale";
import type { Locale } from "../lib/locale";

interface Props {
  currentLocale: Locale;
}

export default function LanguageSwitcher({ currentLocale }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSwitch(locale: Locale) {
    if (locale === currentLocale) return;
    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  }

  return (
    <div
      className={`flex items-center gap-0.5 text-xs font-bold transition-opacity ${isPending ? "opacity-50" : ""}`}
    >
      <button
        onClick={() => handleSwitch("id")}
        disabled={isPending}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          currentLocale === "id"
            ? "text-[#1e3a8a]"
            : "text-slate-400 hover:text-slate-600"
        }`}
        aria-label="Switch to Indonesian"
      >
        ID
      </button>
      <span className="text-slate-300 select-none">|</span>
      <button
        onClick={() => handleSwitch("en")}
        disabled={isPending}
        className={`px-1.5 py-0.5 rounded transition-colors ${
          currentLocale === "en"
            ? "text-[#1e3a8a]"
            : "text-slate-400 hover:text-slate-600"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  );
}
