================================================================
  PANDUAN INSTALASI WEBSITE SAHABAT INSURANCE
================================================================

Panduan ini akan membantu Anda memasang website ini di server.
Ikuti langkah-langkah berikut secara berurutan.

----------------------------------------------------------------
BAGIAN 1 - APA YANG DIBUTUHKAN SEBELUM MEMULAI
----------------------------------------------------------------

Sebelum memulai, pastikan server Anda sudah memiliki:

  1. Sistem operasi Linux (Ubuntu 20.04 atau lebih baru direkomendasikan)
     atau Windows Server 2019 ke atas.

  2. Koneksi internet.

  3. Akses ke terminal / command prompt sebagai administrator.

  4. Minimal spesifikasi server:
       - RAM: 1 GB (2 GB lebih baik)
       - Penyimpanan: 10 GB kosong
       - CPU: 1 core

  5. File .env yang berisi konfigurasi rahasia.
     (Minta file ini ke developer. JANGAN disebarluaskan.)


----------------------------------------------------------------
BAGIAN 2 - INSTAL NODE.JS
----------------------------------------------------------------

Node.js adalah perangkat lunak yang dibutuhkan untuk menjalankan
website ini.

--- LINUX (Ubuntu/Debian) ---

Buka terminal dan ketik perintah berikut satu per satu,
tekan Enter setelah setiap baris:

  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
  sudo apt-get install -y nodejs

Cek apakah berhasil:

  node --version

Seharusnya muncul angka seperti: v22.x.x

--- WINDOWS ---

  1. Buka browser dan pergi ke: https://nodejs.org
  2. Klik tombol "LTS" untuk mengunduh versi stabil.
  3. Jalankan file yang diunduh dan ikuti petunjuk instalasi.
  4. Setelah selesai, buka Command Prompt dan ketik:
       node --version
     Seharusnya muncul angka versi.


----------------------------------------------------------------
BAGIAN 3 - UNDUH DAN SIAPKAN FILE WEBSITE
----------------------------------------------------------------

  1. Salin seluruh folder proyek ke server Anda.
     (misalnya ke folder: /home/user/sahabat-insurance/ di Linux,
      atau C:\websites\sahabat-insurance\ di Windows)

  2. Buka terminal / Command Prompt.

  3. Masuk ke folder proyek:

     Linux:
       cd /home/user/sahabat-insurance

     Windows:
       cd C:\websites\sahabat-insurance

  4. Instal semua paket yang dibutuhkan dengan perintah:

       npm install

     Proses ini mungkin memakan waktu 2-5 menit. Tunggu sampai selesai.


----------------------------------------------------------------
BAGIAN 4 - KONFIGURASI FILE .ENV
----------------------------------------------------------------

File .env berisi informasi rahasia seperti password database dan
kunci API. File ini TIDAK disertakan dalam folder proyek demi
keamanan. Anda harus membuatnya sendiri.

  1. Di dalam folder proyek, buat file baru bernama: .env
     (perhatikan ada titik di depan nama file)

  2. Minta isi file .env kepada developer, lalu salin isinya
     ke dalam file tersebut.

     Contoh isi file .env (nilai sebenarnya dari developer):

       PAYLOAD_SECRET=isi_dari_developer
       DATABASE_URL=isi_dari_developer
       SUPABASE_URL=isi_dari_developer
       SUPABASE_ANON_KEY=isi_dari_developer
       SUPABASE_SERVICE_ROLE_KEY=isi_dari_developer
       BLOB_READ_WRITE_TOKEN=isi_dari_developer
       SMTP_USER=isi_dari_developer
       SMTP_PASS=isi_dari_developer
       SMTP_FROM=isi_dari_developer

  3. Simpan file tersebut.

  PERINGATAN: File .env sangat rahasia. Jangan kirimkan via email
  atau chat. Minta developer untuk menyerahkannya secara langsung
  atau via saluran yang aman.


----------------------------------------------------------------
BAGIAN 5 - BUILD WEBSITE
----------------------------------------------------------------

Setelah file .env sudah siap, jalankan perintah build:

  npm run build

Proses ini akan memakan waktu sekitar 3-10 menit tergantung
kecepatan server. Tunggu hingga muncul tulisan:
"Route (app)" dan tidak ada error.

Jika ada pesan error merah, hubungi developer.


----------------------------------------------------------------
BAGIAN 6 - JALANKAN WEBSITE
----------------------------------------------------------------

Setelah build selesai, jalankan website dengan perintah:

  npm start

Website akan berjalan di port 3969.
Buka browser dan akses: http://alamat-ip-server:3969

Contoh: http://192.168.1.100:3969


----------------------------------------------------------------
BAGIAN 7 - AGAR WEBSITE TETAP BERJALAN (OPSIONAL TAPI DIANJURKAN)
----------------------------------------------------------------

Secara default, website akan berhenti jika terminal ditutup.
Untuk membuat website tetap berjalan, gunakan PM2:

  1. Instal PM2:

       npm install -g pm2

  2. Jalankan website dengan PM2:

       pm2 start "npm start" --name sahabat-insurance

  3. Atur agar otomatis berjalan saat server restart:

       pm2 startup
       pm2 save

  4. Perintah PM2 yang berguna:

       pm2 list              -> melihat daftar aplikasi
       pm2 stop sahabat-insurance   -> menghentikan website
       pm2 restart sahabat-insurance -> me-restart website
       pm2 logs sahabat-insurance   -> melihat log error


----------------------------------------------------------------
BAGIAN 8 - SETTING FIREWALL (Linux)
----------------------------------------------------------------

Agar website bisa diakses dari luar, buka port 3969:

  sudo ufw allow 3969
  sudo ufw reload


----------------------------------------------------------------
BAGIAN 9 - MENGAKSES PANEL ADMIN
----------------------------------------------------------------

Website ini memiliki panel admin untuk mengelola konten.

  Alamat: http://alamat-ip-server:3969/admin

Saat pertama kali membuka /admin, Anda akan diminta membuat
akun admin. Ikuti petunjuk di layar.


----------------------------------------------------------------
BAGIAN 10 - JIKA ADA MASALAH
----------------------------------------------------------------

MASALAH: "npm: command not found"
SOLUSI:  Node.js belum terinstal. Ulangi Bagian 2.

MASALAH: "Cannot find module" saat build
SOLUSI:  Jalankan lagi: npm install

MASALAH: "Error: PAYLOAD_SECRET is required"
SOLUSI:  File .env belum dibuat atau tidak lengkap. Ulangi Bagian 4.

MASALAH: "Connection refused" / tidak bisa akses dari browser
SOLUSI:  Pastikan port 3969 terbuka di firewall. Ulangi Bagian 8.

MASALAH: Website berhenti setelah terminal ditutup
SOLUSI:  Gunakan PM2. Lihat Bagian 7.

MASALAH: Error database / "Connection to database failed"
SOLUSI:  Periksa nilai DATABASE_URL di file .env sudah benar.
         Hubungi developer.

Untuk masalah lain, hubungi developer dengan menyertakan
pesan error lengkap yang muncul di terminal.


----------------------------------------------------------------
RINGKASAN PERINTAH (Urutan Normal)
----------------------------------------------------------------

  npm install          -> instal paket (sekali saja)
  npm run build        -> build website (setelah perubahan)
  npm start            -> jalankan website
  pm2 start "npm start" --name sahabat-insurance  -> jalankan permanen

================================================================


================================================================
  PANDUAN UPDATE / REDEPLOY WEBSITE (SUDAH TERPASANG)
================================================================

Gunakan panduan ini jika website sudah berjalan dan Anda ingin
memperbarui kode atau konten.

----------------------------------------------------------------
LANGKAH UPDATE MENGGUNAKAN WINSCP
----------------------------------------------------------------

  LANGKAH 1 - Terima file baru dari developer
  --------------------------------------------
  Developer akan mengirimkan file-file yang diperbarui
  (bisa berupa zip atau file individual).

  Jika dikirim dalam bentuk zip, ekstrak dulu di komputer
  Anda sebelum diunggah ke server.


  LANGKAH 2 - Upload file ke server via WinSCP
  ---------------------------------------------
  1. Buka WinSCP dan sambungkan ke server.

  2. Di panel kiri (komputer Anda), navigasi ke folder
     berisi file baru dari developer.

  3. Di panel kanan (server), navigasi ke folder proyek:
       /home/user/sahabat-insurance/

  4. Salin file-file baru ke lokasi yang sesuai di server.
     Timpa (overwrite) file lama jika diminta.

  PERHATIAN - Jangan hapus atau timpa file berikut:
    - .env                  (konfigurasi rahasia)
    - public/media/         (file gambar dan dokumen)
    - node_modules/         (tidak perlu diupload sama sekali)

  Jika developer mengirim folder node_modules, ABAIKAN.
  Folder itu akan dibuat ulang otomatis di server.


  LANGKAH 3 - Jalankan perintah di terminal server
  --------------------------------------------------
  Setelah upload selesai, buka terminal/SSH ke server
  dan masuk ke folder proyek:

       cd /home/user/sahabat-insurance

  Kemudian jalankan perintah berikut satu per satu:

    a. Update dependensi (jika ada file package.json baru):

         npm install

    b. Build ulang website:

         npm run build

    c. Restart website:

         pm2 restart sahabat-insurance

    d. Cek apakah website berjalan normal:

         pm2 logs sahabat-insurance

  Tekan Ctrl+C untuk keluar dari tampilan log.
  Selesai. Website sudah diperbarui.

----------------------------------------------------------------
CATATAN PENTING SAAT UPDATE
----------------------------------------------------------------

  - File .env TIDAK perlu diubah kecuali developer secara
    khusus menginformasikan ada variabel baru.

  - Jika developer menambahkan variabel baru ke .env,
    tambahkan juga di file .env di server SEBELUM build.

  - Jika ada error setelah update, jalankan:

       pm2 logs sahabat-insurance

    dan kirimkan pesan error lengkap ke developer.

----------------------------------------------------------------
RINGKASAN LANGKAH UPDATE
----------------------------------------------------------------

  (WinSCP)  Upload file baru dari developer, timpa file lama
  npm install                           -> update dependensi
  npm run build                         -> build ulang
  pm2 restart sahabat-insurance         -> restart website
  pm2 logs sahabat-insurance            -> cek log


================================================================
  PANDUAN MIGRASI MEDIA: VERCEL BLOB -> PENYIMPANAN LOKAL
================================================================

Script ini digunakan untuk memindahkan semua file media yang
sebelumnya tersimpan di Vercel Blob ke folder lokal di server
(public/media/).

Jalankan script ini SATU KALI saat pertama kali pindah dari
Vercel ke server mandiri, SEBELUM melakukan build.

----------------------------------------------------------------
KAPAN MENJALANKAN SCRIPT INI
----------------------------------------------------------------

Jalankan script ini jika:

  - Website sebelumnya dihosting di Vercel dan kini dipindah
    ke server mandiri.
  - File gambar/dokumen tidak muncul setelah pindah server.
  - URL media masih mengarah ke blob.vercel-storage.com.

JANGAN jalankan script ini jika:

  - Website sudah berjalan di server mandiri dan media sudah
    ada di folder public/media/.
  - Anda tidak tahu apa itu Vercel Blob. Tanya developer dulu.

----------------------------------------------------------------
LANGKAH MENJALANKAN MIGRASI
----------------------------------------------------------------

  1. Pastikan file .env sudah lengkap dan berisi:

       SUPABASE_URL=...
       SUPABASE_SERVICE_ROLE_KEY=...

  2. Masuk ke folder proyek:

       cd /home/user/sahabat-insurance      (Linux)
       cd C:\websites\sahabat-insurance     (Windows)

  3. Jalankan script migrasi:

       node scripts/migrate-blob-to-local.mjs

  4. Tunggu sampai selesai. Script akan menampilkan progress
     seperti ini:

       Found 42 media record(s)
         [1] Downloading foto-gedung.jpg ... v
         [2] Downloading brosur.pdf ... v
         [3] Already exists: logo.png
         ...
       --------------------------------------------------
       Downloaded : 40
       Skipped    : 2
       Failed     : 0

       All files migrated. You can now switch to local storage and rebuild.

  5. Jika ada file yang gagal (Failed > 0), jalankan ulang
     script yang sama. Script aman dijalankan berulang kali --
     file yang sudah ada akan dilewati.

  6. Setelah migrasi selesai (Failed = 0), lakukan build:

       npm run build
       pm2 restart sahabat-insurance

----------------------------------------------------------------
JIKA ADA ERROR SAAT MIGRASI
----------------------------------------------------------------

MASALAH: "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set"
SOLUSI:  Periksa file .env, pastikan kedua variabel tersebut ada.

MASALAH: "Failed to fetch media records"
SOLUSI:  Periksa koneksi internet server dan nilai SUPABASE_URL
         di file .env.

MASALAH: Beberapa file gagal diunduh (HTTP 403 / 404)
SOLUSI:  File mungkin sudah dihapus dari Vercel Blob. Jalankan
         ulang script. Jika tetap gagal, hubungi developer.

================================================================
