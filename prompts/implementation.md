# Implementasi Fitur Tambah Employee (Micro Frontend)

Dokumen ini memuat panduan implementasi untuk fitur Tambah Employee menggunakan arsitektur Micro Frontend di Nx workspace.

## 1. Remote App: `ems-add-employee`

Buat sebuah remote application baru dengan spesifikasi berikut:

- **Nama App:** `ems-add-employee`
- **Framework:** Angular (versi terbaru 21)
- **Styling:** Bootstrap (versi terbaru 5)
- **Integrasi:** Gunakan `@nx/module-federation/angular` untuk mengintegrasikan shared functionality dan menjadikannya remote app.
- **Konsistensi UI:** Gunakan desain UI dengan style enterprise secara konsisten yang telah dibangun pada aplikasi ini.

### Spesifikasi Form Tambah Employee

Menampilkan form menambah data employee dengan ketentuan validasi dan interaksi berikut:

1. **Mandatory Fields:** Seluruh atribut data employee bersifat wajib (mandatory). Tombol Save tidak dapat berfungsi (atau form tidak bisa disubmit) ketika ada field yang kosong.
2. **Birth Date:** Menggunakan input *datetime picker*. Validasi: tanggal yang dipilih tidak boleh melebihi hari ini.
3. **Email:** Input harus memiliki validasi format email standar.
4. **Basic Salary:** Input harus berupa angka.
5. **Group:** Berupa komponen *drop down list* yang memiliki *search textbox* di bagian atas opsinya. Isi *drop down list* dengan 10 dummy group name.
6. **Aksi Form:** Pada bagian bawah form terdapat:
   - **Button Save:** Untuk mengeksekusi proses menyimpan data.
   - **Button Cancel:** Untuk membatalkan operasi dan kembali ke halaman Employee List.

---

## 2. API Endpoint Backend (`ems-backend`)

Buat endpoint API di dalam project `ems-backend` untuk menerima dan memproses data penambahan employee.

- **URL Endpoint:** `/api/employee/add`
- **HTTP Method:** `POST`

**Format Data Request (JSON):**

```json
{
    "username": "string",
    "firstName": "string",
    "lastName": "string",
    "password": "string",
    "email": "string",
    "birthDate": "datetime",
    "basicSalary": "double",
    "status": "string",
    "group": "string",
    "description": "datetime"
}
```

---

## 3. Design Pattern & Arsitektur Kode

Pembangunan kode front-end harus mengikuti *design pattern* berikut secara ketat:

- **MVVM (Model View ViewModel):** Pemisahan jelas antara layer *View* (UI), *ViewModel* (Logic presentasi dan state interaksi), dan *Model* (Data/Akses).
- **DDD (Domain Driven Design):** Pengelompokan struktur folder dan modul berdasarkan batasan konteks fungsionalitas domain aplikasi.

### Contoh Arsitektur Folder

```text
add-employee/              # DOMAIN: Fitur add employee
   ├─ employee-add/        # ViewModel: Logic Input Employee (Smart Components / Facades)
   ├─ ui/                  # View: Komponen presentasi (dumb components)
   ├─ data-access/         # Model: NgRx State, Services, API Calls
   ├─ domain/              # Model: Interfaces, DTOs, Business Logic
```
