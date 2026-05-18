# Implementasi Micro Frontend (EMS)

## Tujuan
Mengaktifkan micro app untuk dapat dijalankan dan direview oleh user secara independen berdasarkan fiturnya.

Micro app yang akan diimplementasikan:
1. **`ems_add_employee`**
2. **`ems_employee_detail`**

## Arsitektur: Konsep MVVM
Setiap micro app harus menggunakan konsep MVVM pada level komponen utama.
Contoh penerapan konsep MVVM pada folder root micro app:

```text
app/                      # Folder root micro app
├── app.component.ts      # Fokus pada component class dan logic (ViewModel)
├── app.view.html         # Fokus pada template markup (View)
└── app.view.scss         # Fokus pada styling (View styling)
```

## Fitur yang Diaktifkan

### 1. `ems_add_employee`
- Mengaktifkan fitur form penambahan employee (Add Employee).

### 2. `ems_employee_detail`
- Mengaktifkan fitur detail employee.

## Panduan & Catatan Implementasi
1. **Import dari Library**: 
   Masing-masing fitur ini sebenarnya sudah tersedia di dalam workspace library. Implementasinya pada micro app hanya dengan melakukan import sebagai route menggunakan `loadComponent`.
2. **Autentikasi (Login)**: 
   Pastikan setiap micro app menggunakan fitur login. Hal ini diperlukan agar global `auth interceptor` dapat mengakses `access_token` (dari `localStorage`) pada saat melakukan request API.
3. **Konsistensi Design Pattern**: 
   Untuk struktur folder root app, ikuti referensi dari micro app yang sudah ada seperti di `apps/ems_list_employee/src/app` agar source micro app mengikuti design pattern yang konsisten.
