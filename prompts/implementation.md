# Panduan Implementasi: Refactor Arsitektur Micro Frontend ke Nx Workspace Rules

## Tujuan Utama
Melakukan refactor arsitektur repositori agar sesuai dengan best practices dari Nx Workspace. Tujuan utamanya adalah memastikan semua aplikasi remote (remote apps) hanya berfungsi sebagai **entry point** (cangkang/shell), sementara seluruh logika, domain, dan fitur aplikasi dipindahkan ke dalam folder `libs/`.

## Aturan Refactor

1. **Pemindahan Domain Fitur ke `libs/`:**
   Seluruh folder fitur yang saat ini berada di dalam `apps/` (remote apps) harus dipindahkan ke dalam folder `libs/`.

2. **Penamaan Library:**
   Gunakan nama yang sama persis dengan nama remote app untuk folder library yang baru.
   *Contoh:* Fitur untuk remote app `ems_add_employee` akan dipindahkan ke folder library dengan nama `ems_add_employee` di dalam `libs/`.

3. **Struktur Direktori Library:**
   Saat memindahkan folder fitur dari remote app, **langsung pindahkan seluruh isi folder fitur tersebut** ke dalam direktori utama library yang baru, tanpa perlu membuat folder induk (parent folder) dengan nama fitur tersebut di dalam library.
   *Contoh:*
   - **Sumber (Lama):** `apps/ems_add_employee/src/app/add-employee/*`
   - **Tujuan (Baru):** Pindahkan semua isi dari folder `add-employee` langsung ke dalam root source library baru (misalnya ke dalam `libs/ems_add_employee/src/lib/` atau folder default yang digenerate Nx).

4. **Remote App sebagai Entry Point:**
   Setelah fitur dipindahkan ke `libs/`, remote app tidak boleh lagi menyimpan logika fitur. Remote app harus di-refactor agar hanya mengimpor dan memanggil domain fitur dari library yang sesuai.

## Detail Langkah Eksekusi

1. **Pembuatan Library:**
   Generate library baru menggunakan Nx (misal: `nx g @nx/angular:lib ems_add_employee`).
2. **Migrasi Kode:**
   Pindahkan kode secara menyeluruh sesuai poin 3 di atas. Pastikan arsitektur MVVM dan DDD yang ada di dalam fitur ikut terbawa dengan rapi.
3. **Ekspor Public API:**
   Pastikan entry component atau routes dari fitur tersebut di-ekspor dengan benar melalui file `index.ts` pada library agar dapat diakses oleh remote app.
4. **Pembersihan dan Update Remote App:**
   Hapus folder fitur lama di dalam `apps/`. Ubah routing atau entry point di dalam remote app untuk meload komponen/module dari library baru menggunakan alias path (contoh: `@workspace-name/ems_add_employee`).
5. **Perbaikan Import (Sangat Penting):**
   * Periksa dan perbaiki semua path import di dalam file-file yang baru dipindahkan.
   * Pastikan tidak ada *broken imports*.
   * Lakukan refactor dengan sangat hati-hati agar tidak ada file yang tertinggal atau salah referensi.

## Kriteria Sukses
- Tidak ada lagi logika fitur di dalam folder `apps/`.
- Semua remote app berjalan normal dan hanya bertugas sebagai titik masuk (entry point) dan konfigurasi Module Federation.
- Tidak ada error *import* atau *cannot find module* saat proses build maupun *serve*.
