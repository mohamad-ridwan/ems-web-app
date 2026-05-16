# Proyek Implementasi Micro Frontend (Nx Workspace)

Dokumen ini berisi panduan dan rencana implementasi untuk proyek EMS menggunakan arsitektur Micro Frontend di dalam Nx Workspace. Desain antarmuka (UI) harus mengusung gaya enterprise profesional yang terinspirasi dari Bank Mandiri (elegan, tata letak bersih, dan dapat dipercaya).

## 1. Setup Shell App: `ems-dashboard`
- **Framework Frontend:** Angular versi 21
- **Styling:** Bootstrap versi 5
- **Konsep:** Bertindak sebagai Host/Shell Application.
- **Routing & Navigasi:** 
  - Menggunakan Angular Routing standar.
  - Tambahkan konfigurasi route `"/login"` yang bertugas untuk me-load dan mengarahkan navigasi ke remote app `ems-login`.
- **Integrasi MF:** Menggunakan package `@nx/module-federation/angular`.

## 2. Setup Remote App: `ems-login`
- **Framework Frontend:** Angular versi 21
- **Styling:** Bootstrap versi 5
- **Konsep:** Bertindak sebagai Remote Application yang di-load oleh shell app `ems-dashboard`.
- **Fitur Otentikasi:**
  - Form login dengan UI bergaya enterprise (mirip tata letak dan nuansa UI Bank Mandiri).
  - Melakukan integrasi dengan API endpoint dari backend.
  - **HTTP Interceptor:** Menyertakan dan mengintegrasikan HTTP Interceptor pada aplikasi ini untuk menangani penyematan JWT token (JSON Web Token) di setiap request HTTP yang membutuhkan otentikasi.
- **Integrasi MF:** Menggunakan package `@nx/module-federation/angular` dan mengekspos komponen/route login untuk dikonsumsi oleh Host.

## 3. Setup Backend: `ems-backend`
- **Directory/App Name:** `ems-backend`
- **Framework Backend:** NestJS versi 11
- **Database:** PostgreSQL versi 18
- **Konsep:** Bertindak sebagai REST API server utama.
- **Fitur Login API:**
  - **Endpoint:** `POST /api/auth/login`
  - **Otentikasi:** Menerapkan strategi JWT (JSON Web Token) authentication.
  - Endpoint ini harus dapat menerima request kredensial pengguna, melakukan validasi, dan memberikan response berupa JWT token yang akan digunakan frontend.

## 4. Desain UI (Enterprise Style - Bank Mandiri)
- Gunakan komponen-komponen UI dari Bootstrap 5 dengan penyesuaian styling khusus.
- Padukan warna yang mencerminkan profesionalisme (seperti biru tua korporat, emas, putih, dan abu-abu).
- Layout yang clean, responsif, dan mudah diakses, memprioritaskan User Experience seperti aplikasi perbankan modern.

## 5. Ringkasan Integrasi
1. User membuka `ems-dashboard` dan belum terotentikasi, lalu diarahkan ke route `/login`.
2. Route `/login` memuat (lazy load) aplikasi remote `ems-login` menggunakan `@nx/module-federation/angular`.
3. Di dalam `ems-login`, user memasukkan data login dan frontend melakukan request ke `ems-backend` di endpoint `/api/auth/login`.
4. Jika berhasil, backend merespon dengan token JWT.
5. Token disimpan di sisi client, dan HTTP Interceptor di `ems-login` akan menyisipkan token ini sebagai `Authorization: Bearer <token>` untuk permintaan API selanjutnya.
6. User diarahkan ke halaman utama dashboard.
