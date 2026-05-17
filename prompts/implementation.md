# Implementasi Refactoring Arsitektur Micro Frontend (MVVM)

## 1. Latar Belakang & Tujuan
Beberapa remote app dalam *workspace* Nx ini masih menggabungkan *logic*, *template*, dan *styling* ke dalam satu file tunggal (misalnya seperti pada `employee-add.component.ts` yang mencapai 11 ribu baris/karakter). Hal ini menyalahi prinsip *Separation of Concerns* (SoC) dan menyulitkan pemeliharaan kode seiring berkembangnya aplikasi.

Tujuan dari dokumen implementasi ini adalah untuk menstandarisasi arsitektur dari setiap *remote app* agar menggunakan pola **MVVM (Model-View-ViewModel)** yang direpresentasikan melalui layer **Component, View, dan Facade**, dengan struktur folder dan pemisahan file yang terstruktur.

## 2. Standar Konsep Struktur Folder & File (MVVM)
Setiap fitur dalam aplikasi harus direfactor mengikuti standar arsitektur berikut:

```text
feature-name/                     # Folder fitur UI utama
├── feature-name.component.ts     # Fokus pada dekorator komponen & logic UI murni, memanggil folder facade/
├── feature-name.view.html        # Fokus murni pada template struktur HTML UI
├── feature-name.component.scss   # Fokus pada styling spesifik komponen (jika ada)
└── facade/                       # Folder untuk menyimpan logic / state management
    └── feature-name.facade.ts    # Fokus pada business logic, state fitur, dan memanggil API dari data-access/
```

### Penjelasan Tanggung Jawab:
- **Component (`.component.ts`)**: Hanya bertugas menangani inisialisasi komponen, interaksi antarmuka dasar pengguna (seperti mem-bind *click event* atau menyusun UI format khusus), serta menjembatani data antara Facade dan View. Komponen dilarang memanggil HTTP Client / layer service data secara langsung.
- **View (`.view.html`)**: Murni berisi baris markup (HTML). Menjauhkan *template inline* yang padat dari file *Typescript*.
- **Facade (`.facade.ts`)**: Merupakan layer ViewModel yang memegang state aplikasi, mengurus *business logic*, memproses *loading/error states*, serta menjadi satu-satunya penghubung yang melakukan pemanggilan API ke *service* pada `data-access/`.

---

## 3. Analisis & Rencana Refactor per Remote App

Berdasarkan analisis kondisi terkini di tiap remote app, berikut adalah *blueprint* refactoring:

### A. Remote App: `ems_add_employee`
**Status Saat Ini:**
File utama berada di `apps/ems_add_employee/src/app/add-employee/employee-add/employee-add.component.ts`. Saat ini file ini menggabungkan satu kesatuan *logic* form yang sangat besar serta deklarasi template (*inline HTML*) dalam satu file yang sama secara *monolithic*.

**Rencana Eksekusi:**
1. **Ekstrak Template:** Pisahkan kode yang ada dalam blok `template: \`...\`` menjadi file `employee-add.view.html`.
2. **Ekstrak Style:** Apabila terdapat `styles: [...]`, pisahkan ke dalam `employee-add.component.scss`.
3. **Pemisahan Logic (Facade):** 
   - Buat folder baru `facade/` di dalam direktori `employee-add/`.
   - Buat file `employee-add.facade.ts`.
   - Pindahkan *logic API* (seperti `EmployeeAddService`), *FormGroup/FormControl initialization*, state loading, dan manajemen error dari dalam komponen ke dalam class Facade.
4. **Penyambungan (Binding):** Perbarui `@Component` menggunakan `templateUrl` dan `styleUrl`. Inject `EmployeeAddFacade` di konstruktor `employee-add.component.ts`.

### B. Remote App: `ems_list_employee`
**Status Saat Ini:**
File berada di `apps/ems_list_employee/src/app/employee-list/employee-list/`. Komponen ini sudah menggunakan *viewmodel* (`employee-list.viewmodel.ts`), tetapi *template HTML* masih disatukan secara *inline* dalam `employee-list.component.ts`, dan letak *viewmodel* masih di *root* fitur.

**Rencana Eksekusi:**
1. Ekstrak *inline HTML* dari `employee-list.component.ts` menjadi file eksternal `employee-list.view.html`.
2. Buat folder `facade/`.
3. Pindahkan (dan ubah nama file) `employee-list.viewmodel.ts` ke `facade/employee-list.facade.ts` agar seragam dengan pola baru.
4. Perbarui baris *import* di komponen utama untuk mengarah ke path *facade* yang baru secara tepat.

### C. Remote App: `ems_employee_detail`
**Status Saat Ini:**
File berada di `apps/ems_employee_detail/src/app/employee-detail/employee-detail/employee-detail.component.ts`. Sepertinya masih mencampur *fetching data logic* dan presentasi UI.

**Rencana Eksekusi:**
1. Pisahkan kode *template markup* ke `employee-detail.view.html`.
2. Buat folder `facade/` dan inisialisasi class `employee-detail.facade.ts`.
3. Pindahkan *logic* pengambilan detail profil (berdasarkan paramater email/id) ke *Facade*, serta pastikan semua state disimpan secara reaktif menggunakan RxJS/Signals.

### D. Remote App: `ems_login`
**Status Saat Ini:**
File di `apps/ems_login/src/app/login/`. Telah memiliki pemisahan `login.component.html` dan `login.component.scss`, akan tetapi nama HTML belum mematuhi aturan `.view.html` dan belum menerapkan layer abstraction/Facade.

**Rencana Eksekusi:**
1. Lakukan pengubahan nama (`rename`) pada file dari `login.component.html` menjadi `login.view.html` beserta penyesuaian di dalam deklarasi `@Component()`.
2. Buat folder `facade/` dengan file `login.facade.ts`.
3. Pindahkan *auth submission logic* dan error handling masuk ke dalam *facade*.

---

## 4. Panduan Eksekusi Teknis Tanpa Kesalahan (*Zero-Error Guide*)
- **Kerjakan Secara Bertahap:** Lakukan refactoring satu per satu pada tiap *remote app*. Commit setiap satu fitur beres di-refactor.
- **Cek Impor (Import Paths):** Periksa kembali dengan teliti impor relatif (`../`) pada komponen saat memindahkan file agar tidak terjadi kendala resolusi *module* / TS Error.
- **Validasi Build:** Selalu operasikan instruksi *testing compile* dengan `nx build [nama-remote-app]` (contoh: `pnpm nx build ems_add_employee`) seusai memisahkan *logic* ke facade.
- **Fokus pada UI:** File komponen `.ts` idealnya sekarang hanya dipenuhi oleh instruksi inisialisasi awal UI dan *event bindings* tipis (me-*redirect* eksekusi fungsi langsung ke metode *facade*). 
