# Implementasi Peningkatan Fitur Employee List & Backend API

File ini berisi panduan implementasi untuk pembaruan fitur pagination, pencarian, dan state management pada aplikasi micro frontend **Employee List**, serta penyesuaian di sisi backend.

## Detail Pekerjaan

### 1. Update Pagination Logic
**Target File:** `apps/ems_list_employee/src/app/employee-list/employee-list/employee-list.component.ts`
- Ubah logic pagination agar hanya menampilkan maksimal 5 tombol navigasi halaman (misalnya: jika berada di halaman 4, tampilkan tombol 2, 3, 4, 5, 6).
- Lakukan perubahan tampilan ini secara responsif dan dinamis, menyesuaikan halaman (pagination) yang sedang aktif.

### 2. Fetching Data Berdasarkan Pagination & Sorting
- Eksekusi *fetching data* ke backend pada setiap aksi klik di tombol pagination.
- Kirim permintaan (request) dengan menyertakan parameter pagination (seperti `page` atau `offset`).
- Batasi jumlah data yang diambil dari backend dengan menggunakan parameter `limit`. Nilai limit ini diambil dari query *items per page* yang diatur melalui *client sorting/filtering*.

### 3. Sinkronisasi State Filter & Pagination dengan URL (`searchParams`)
- Update setiap perubahan nilai pada filter maupun halaman (pagination) ke URL sebagai query string / `searchParams`.
- **Tujuan:** Memungkinkan pengguna untuk mempertahankan *active data state* yang sedang dilihat saat pengguna melakukan *refresh* halaman web (State Restoration).

### 4. Penyesuaian API Backend (`ems-backend`)
- Lakukan pembaruan pada API List Employee di aplikasi `ems-backend`.
- Tambahkan atau sesuaikan dukungan untuk parameter *Query String* yang masuk dari frontend, seperti `page`, `limit`, maupun parameter filter terkait.

## Aturan Arsitektur & Design Pattern
Pastikan seluruh perubahan dan pembuatan kode mengikuti pola arsitektur berikut:

1. **MVVM (Model View ViewModel)**
   - Pisahkan logika presentasi (UI) di View, dan pengelolaan state/logika interaksi di ViewModel (biasanya berupa Store/Facade), serta manajemen data di Model.
   
2. **DDD (Domain Driven Design)**
   - Pastikan kode dan arsitektur file difokuskan pada domain bisnis yang diisolasi dengan baik (seperti pemisahan ke modul `data-access`, `ui`, `feature`, `domain`).
