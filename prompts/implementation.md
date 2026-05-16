# Rencana Implementasi: Micro Frontend Employee Detail

Dokumen ini berisi panduan dan langkah-langkah untuk mengimplementasikan fitur detail employee dengan menggunakan arsitektur Micro Frontend (Module Federation), DDD (Domain-Driven Design), dan pola MVVM (Model-View-ViewModel) pada workspace Nx.

## 1. Pembuatan API Endpoint (`ems-backend`)
Tambahkan endpoint baru pada backend NestJS untuk mengambil data detail employee.

- **Endpoint:** `/api/employee/:email`
- **Method:** `GET`
- **Parameter:**
  ```json
  {
      "email": "string"
  }
  ```
- **Langkah-langkah:**
  - Tambahkan route handler di dalam controller (misal: `EmployeeController`) untuk menerima request GET dengan parameter `email`.
  - Implementasikan logic pada service untuk mengambil spesifik data employee berdasarkan parameter tersebut.
  - Pastikan response sesuai dengan model data yang dibutuhkan di frontend.

## 2. Pembuatan Remote App (`ems-employee-detail`)
Buat aplikasi remote Angular baru.

- **Langkah-langkah:**
  - Generate remote app menggunakan Nx CLI dengan framework Angular (Angular 21) dan mendukung Module Federation: `@nx/module-federation/angular`.
  - Setup styling global pada aplikasi remote tersebut menggunakan **Bootstrap 5** terbaru agar sesuai dengan standar enterprise.
  - Konfigurasi `module-federation.config.ts` untuk mengekspos file routing atau modul aplikasi ini.

## 3. Struktur Arsitektur (DDD & MVVM)
Bangun fitur detail employee di dalam struktur folder yang mengikuti pola DDD dan MVVM.

```text
employee-detail/               # DOMAIN: Fitur detail employee
   ├─ employee-detail/         # ViewModel: Logic Detail Employee (Smart Component / Feature)
   ├─ ui/                      # View: Komponen presentasi (Dumb Components)
   ├─ data-access/             # Model: NgRx State, Services, API Calls
   ├─ domain/                  # Model: Interfaces, DTOs, Business Logic
```

- **Domain:** Definisikan tipe data (Interfaces / Types / DTOs) untuk Employee Detail.
- **Data Access (Model):** Buat Angular Service yang membungkus pemanggilan HTTP (API) ke `/api/employee/:email`. Gunakan state management seperti NgRx, SignalStore, atau BehaviorSubject untuk mengelola siklus data, loading, dan error.
- **UI (View):** 
  - Buat komponen UI presentasional yang menerima data (via `@Input()`) dan memancarkan aksi (via `@Output()`).
  - Lakukan formating data secara lokal di View, misal membuat atau memanfaatkan Pipe untuk mengubah `basicSalary` ke dalam format **Rp. xx.xxx,xx**.
  - Gunakan class-class Bootstrap 5 untuk styling komponen agar terlihat profesional dan konsisten.
  - Tambahkan tombol **'OK'** yang berfungsi untuk kembali.
- **ViewModel (`employee-detail`):** 
  - Buat Smart Component yang berfungsi mendengarkan parameter route (misalnya dari ActivatedRoute untuk mendapatkan nilai `email`).
  - Memicu pemanggilan data di layer `data-access`.
  - Mengelola navigasi ketika event dari UI dipicu. Saat menekan tombol **'OK'**, aplikasi harus kembali ke halaman Employee List tanpa menghilangkan data pencarian. Anda dapat menggunakan injeksi `Location` dari `@angular/common` lalu mengeksekusi `location.back()`, atau melewatkan query parameter navigasi secara utuh.

## 4. Update Shell App (`ems-dashboard`)
Integrasikan aplikasi remote ke dalam aplikasi host.

- **Langkah-langkah:**
  - Deklarasikan remote `ems-employee-detail` pada konfigurasi module federation di dalam `ems-dashboard`.
  - Tambahkan route baru pada router utama `ems-dashboard`:
    ```typescript
    {
      path: 'employee-detail/:email', // atau struktur yang lebih sesuai, contoh employee/:email
      loadChildren: () => import('ems-employee-detail/Routes').then(m => m.remoteRoutes)
    }
    ```

## 5. Konsistensi UI Enterprise
- Pastikan penggunaan warna, border, spacing, dan typography Bootstrap 5 diaplikasikan secara konsisten seperti modul-modul lainnya.
- Implementasikan layout yang clean, error handling state, dan loading state di dalam UI components untuk pengalaman pengguna yang maksimal.
