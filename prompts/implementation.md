# Implementation Plan: Fix & Add Features for Sidebar

## Overview
Dokumen ini berisi rencana implementasi untuk perbaikan dan penambahan fitur pada komponen sidebar.

## Daftar Pekerjaan (Tasks)

### 1. Menonaktifkan Tooltips Saat Sidebar Aktif
- **File Target:** `libs/shared/ui-kit/src/lib/sidebar/sidebar.view.html` (dan berpotensi file komponen `.ts` terkait).
- **Aksi:** Memodifikasi binding tooltip (misalnya pada atribut Bootstrap tooltip) agar tooltip hanya muncul saat sidebar dalam keadaan *collapsed* (tidak aktif). Saat sidebar aktif (melebar), tooltip harus dinonaktifkan agar tidak menampilkan informasi yang redundan.

### 2. Posisi Sidebar Aktif di Tampilan Mobile
- **File Target:** Komponen Sidebar (`.ts`, `.html`, dan `.scss` / `.css`).
- **Aksi:** Mengembalikan fungsi sidebar agar selalu berada pada posisi "aktif" saat diakses menggunakan mode responsif (mobile). Hal ini mungkin memerlukan penyesuaian pada CSS media queries atau *event listener* pada ukuran layar (window resize).

### 3. Caching Status Tooltips / Sidebar dengan LocalStorage
- **File Target:** Komponen Sidebar (`.ts`).
- **Aksi:** Menambahkan fungsionalitas untuk menyimpan status aktif/non-aktif dari tooltip atau sidebar ke dalam `localStorage`.
- **Perilaku:** Saat pengguna melakukan *refresh* halaman, aplikasi akan membaca nilai dari `localStorage` dan mengatur status sidebar dan tooltip sesuai dengan status terakhir sebelum halaman dimuat ulang.

## Aturan Pengembangan
- Gunakan struktur folder dan konvensi penamaan yang konsisten dengan standar kode yang sudah ada saat ini di `libs/shared/ui-kit/src/lib/sidebar/`.
