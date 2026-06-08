import type { Locale } from "./locale";

const translations = {
  id: {
    search: {
      placeholder: "Cari artikel, produk...",
      searching: "Mencari...",
      noResults: (q: string) => `Tidak ada hasil untuk "${q}"`,
      searchUnavailable: "Pencarian tidak tersedia. Silakan coba lagi.",
      clearSearch: "Hapus pencarian",
      navigate: "↑↓ navigasi",
      open: "Enter untuk membuka",
      close: "ESC untuk menutup",
      typeNews: "Berita",
      typeProduct: "Produk",
      typePage: "Halaman",
    },
    products: {
      termsBadge: "* S&K Berlaku",
    },
    latestNews: {
      readMore: "Baca selengkapnya →",
      viewAll: "Lihat Semua Berita →",
    },
    searchButton: {
      ariaLabel: "Buka pencarian",
    },
  },
  en: {
    search: {
      placeholder: "Search articles, products...",
      searching: "Searching...",
      noResults: (q: string) => `No results for "${q}"`,
      searchUnavailable: "Search unavailable. Please try again.",
      clearSearch: "Clear search",
      navigate: "↑↓ navigate",
      open: "Enter to open",
      close: "ESC to close",
      typeNews: "News",
      typeProduct: "Product",
      typePage: "Page",
    },
    products: {
      termsBadge: "* T&C Apply",
    },
    latestNews: {
      readMore: "Read more →",
      viewAll: "View All News →",
    },
    searchButton: {
      ariaLabel: "Open search",
    },
  },
} as const;

export function useTranslations(locale: Locale) {
  return translations[locale];
}
