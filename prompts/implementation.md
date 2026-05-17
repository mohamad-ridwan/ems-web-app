# Rencana Implementasi Modifikasi Perilaku Password

Dokumen ini berisi langkah-langkah implementasi untuk merubah perilaku input password pada fitur Add Employee dan proses Login.

## 1. Modifikasi Frontend (Add Employee)
**Lokasi**: Aplikasi Angular `ems_add_employee` (kemungkinan di `employee-add.component.ts` dan template HTML-nya).

- **Ubah Elemen Input Password**:
  - Tambahkan atribut `readonly` atau `disabled` secara default pada input password.
  - Ubah placeholder menjadi: `"password ini akan otomatis dibuat saat submit."`
- **Modifikasi State saat Submit**:
  - Saat form disubmit, ambil nilai dari input dengan id `"birthdate"`.
  - Set nilai dari state password agar sama dengan nilai `birthdate` tersebut sebelum payload dikirimkan ke backend. Hal ini untuk menginformasikan secara implisit bahwa password default adalah tanggal lahir.

## 2. Modifikasi Backend (Add Employee)
**Lokasi**: Backend NestJS `ems-backend` (pada endpoint `/api/employee/add` atau service yang menangani pembuatan user).

- **Instalasi Package**:
  - Jalankan perintah: `npm install uuid` dan `npm install --save-dev @types/uuid` pada folder backend atau root (sesuai struktur monorepo nx).
- **Enkripsi Password**:
  - Sebelum data disimpan ke dalam database (seperti file JSON), lakukan enkripsi/hashing atau gunakan mekanisme berbasis `uuid` pada password (berdasarkan nilai tanggal lahir yang dikirim frontend).
  - *Catatan arsitektur*: Mengingat instruksi "password encrypt dengan uuid", kita akan mengimplementasikan fungsi utility yang menggunakan uuid sebagai bagian dari proses enkripsi atau pembuatan token, lalu menyimpannya di database.

## 3. Modifikasi Backend (Login)
**Lokasi**: Backend NestJS `ems-backend` (pada endpoint login/auth).

- **Dekripsi dan Verifikasi**:
  - Saat request login masuk, baca parameter `"password"` yang dikirim oleh user.
  - Ambil data user dari database, kemudian lakukan mekanisme "decrypt" atau pengecekan kecocokan antara password input user dengan password yang telah dienkripsi (menggunakan skema uuid yang diterapkan di atas).
  - Lanjutkan memberikan respons sukses (seperti token JWT/session) hanya jika verifikasi kedua password tersebut berhasil/cocok.
