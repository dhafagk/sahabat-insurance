# Image Placeholders untuk Dokumentasi

Letakkan file gambar berikut di direktori ini (`docs/images/`).
Nama file harus **persis sama** agar gambar muncul di dokumentasi.

---

## Bagian I — Panduan Pengunjung

| File                              | Deskripsi                                                  | Ukuran Disarankan |
| --------------------------------- | ---------------------------------------------------------- | ----------------- |
| `01-homepage-full.png`            | Screenshot tampilan penuh halaman utama (scroll dari atas) | 1280×800          |
| `01a-hero-section.png`            | Seksi hero/banner di halaman utama                         | 1280×500          |
| `01b-products-section.png`        | Grid produk di halaman utama                               | 1280×400          |
| `01c-navbar-dropdown.png`         | Navbar desktop dengan salah satu dropdown terbuka          | 1280×200          |
| `01d-mobile-navbar-closed.png`    | Tampilan navbar di mobile (tertutup)                       | 390×150           |
| `01e-mobile-navbar-open.png`      | Tampilan navbar di mobile (menu terbuka)                   | 390×600           |
| `02a-products-grid.png`           | Halaman/seksi daftar produk (grid kartu)                   | 1280×500          |
| `02b-product-detail.png`          | Halaman detail satu produk asuransi                        | 1280×700          |
| `03a-news-listing.png`            | Halaman daftar berita (/news)                              | 1280×700          |
| `03b-news-article.png`            | Halaman detail artikel berita                              | 1280×900          |
| `04a-cek-premi.png`               | Halaman kalkulator premi (/cekpremi) - form kosong         | 1280×600          |
| `04b-cek-premi-result.png`        | Halaman kalkulator premi - setelah menghitung              | 1280×600          |
| `05a-downloads-index.png`         | Halaman index pusat unduhan (/unduhan)                     | 1280×600          |
| `05b-downloads-accordion.png`     | Halaman detail unduhan dengan accordion terbuka            | 1280×700          |
| `05c-email-gate-form.png`         | Popup/form verifikasi email sebelum unduhan                | 600×400           |
| `05d-email-download-received.png` | Screenshot email yang diterima pengguna berisi link        | 700×500           |
| `06a-tables-index.png`            | Halaman index tabel data (/tabel)                          | 1280×500          |
| `06b-table-detail.png`            | Halaman detail tabel dengan data lengkap                   | 1280×700          |
| `07a-visi-misi.png`               | Halaman Visi & Misi penuh                                  | 1280×800          |
| `07b-nilai-sahabat.png`           | Seksi nilai-nilai SAHABAT (akronim)                        | 1280×400          |
| `08a-management.png`              | Halaman manajemen penuh                                    | 1280×800          |
| `08b-commissioners.png`           | Seksi Dewan Komisaris                                      | 1280×400          |
| `08c-directors.png`               | Seksi Dewan Direksi                                        | 1280×400          |
| `09a-contact-us.png`              | Halaman Hubungi Kami                                       | 1280×700          |

---

## Bagian II — Panduan Admin CMS

| File                            | Deskripsi                                        | Ukuran Disarankan |
| ------------------------------- | ------------------------------------------------ | ----------------- |
| `10a-admin-login.png`           | Halaman login admin (/admin)                     | 1280×700          |
| `11a-admin-dashboard.png`       | Dashboard admin setelah login                    | 1280×700          |
| `11b-admin-sidebar.png`         | Sidebar admin dengan semua menu terlihat         | 300×900           |
| `12a-admin-products-list.png`   | Daftar produk di admin panel                     | 1280×500          |
| `12b-admin-product-form.png`    | Form edit/buat produk                            | 1280×700          |
| `13a-admin-news-list.png`       | Daftar berita di admin panel                     | 1280×500          |
| `13b-admin-news-form.png`       | Form editor berita dengan rich text terbuka      | 1280×900          |
| `13c-news-publish-button.png`   | Tombol Publish di pojok kanan atas editor        | 400×100           |
| `13d-news-rich-text-editor.png` | Editor rich text Lexical                         | 800×500           |
| `14a-admin-unduhan-list.png`    | Daftar unduhan di admin panel                    | 1280×500          |
| `14b-admin-unduhan-form.png`    | Form buat paket unduhan dengan accordion terbuka | 1280×900          |
| `14c-email-gate-toggle.png`     | Toggle/checkbox email gate di form unduhan       | 600×150           |
| `15a-admin-tabel-form.png`      | Form buat/edit tabel data                        | 1280×700          |
| `16a-admin-pages-form.png`      | Form editor halaman statis                       | 1280×700          |
| `17a-global-landing-page.png`   | Editor global Landing Page (tab Hero terlihat)   | 1280×700          |
| `17b-global-navbar.png`         | Editor global Navbar Config                      | 1280×700          |
| `17c-global-footer.png`         | Editor global Footer Config                      | 1280×700          |
| `17d-global-visi-misi.png`      | Editor global Visi & Misi                        | 1280×700          |
| `17e-global-manajemen.png`      | Editor global Manajemen                          | 1280×700          |
| `17f-global-contact.png`        | Editor global Hubungi Kami                       | 1280×700          |
| `17g-site-settings.png`         | Editor Site Settings (favicon upload)            | 1280×400          |
| `18a-admin-media-list.png`      | Halaman daftar media (grid view)                 | 1280×600          |
| `18b-admin-media-upload.png`    | Form upload media baru                           | 1280×600          |
| `19a-admin-download-leads.png`  | Daftar download leads di admin                   | 1280×500          |
| `20a-admin-users.png`           | Daftar pengguna admin                            | 1280×500          |

---

## Cara Mengambil Screenshot

1. Jalankan website di lokal (`npm run dev`) atau buka versi production
2. Gunakan browser Chrome/Edge → tekan **F12** → klik ikon device toggle untuk simulasi layar
3. Untuk screenshot layar penuh: install ekstensi **GoFullPage** atau gunakan shortcut `Ctrl+Shift+P` → "Capture full size screenshot" di DevTools
4. Simpan file dengan nama persis sesuai tabel di atas
5. Letakkan di direktori `docs/images/`

## Membuat PDF dari Dokumentasi

1. Buka file `docs/user-guide.html` di browser Chrome/Edge
2. Tekan `Ctrl+P` (Print)
3. Pilih **Save as PDF** sebagai printer
4. Atur margin: **None** atau **Minimum**
5. Aktifkan **Background graphics** agar warna dan background tercetak
6. Klik Save — simpan sebagai `docs/Panduan-Pengguna-Sahabat-Insurance.pdf`
