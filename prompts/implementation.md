# Rencana Implementasi: Navbar Account Info & NgRx Global State

Dokumen ini memaparkan langkah-langkah implementasi untuk memindahkan informasi akun dari sidebar ke navbar (sebagai dropdown) menggunakan Bootstrap, serta menerapkan NgRx untuk global state management dengan arsitektur Domain-Driven Design (DDD) dan Model-View-ViewModel (MVVM).

## Fasa 1: Setup Global State (NgRx & DDD)
Karena proyek ini menggunakan arsitektur micro frontend (Nx) dan DDD, state otentikasi harus dikelola sebagai shared domain.

1.  **Inisialisasi NgRx Auth Domain**:
    *   Buat atau update library shared untuk auth (misal: `libs/shared/data-access-auth`).
    *   **State**: Definisikan `AuthState` interface berisi properti `user` (menyimpan `username`, `group`, dll).
    *   **Actions**: Buat action seperti `[Auth] Login Success`, `[Auth] Logout`.
    *   **Reducer**: Implementasikan reducer untuk memodifikasi state berdasarkan action.
    *   **Selectors**: Buat `selectCurrentUser` untuk mengambil data user dari global store.

2.  **Registrasi Store di Shell App**:
    *   Pada `apps/ems-dashboard/src/app/app.config.ts`, daftarkan NgRx Store (`provideStore`, `provideEffects`).
    *   Pastikan library dependensi NgRx di-share secara singleton pada `module-federation.config.ts` agar shell dan remote apps menggunakan state yang sama.

3.  **Update Login Remote App (`ems_login`)**:
    *   Setelah pemanggilan API login berhasil, dispatch action `[Auth] Login Success` dengan payload data user (`username`, `group`) ke dalam NgRx store.

## Fasa 2: Implementasi ViewModel (MVVM)
Shell app (`ems-dashboard`) membutuhkan ViewModel untuk menghubungkan View (`app.html`) dengan Model/State (NgRx).

1.  **Pembuatan/Penyesuaian Dashboard ViewModel**:
    *   Buat facade/ViewModel class (misal `app.viewmodel.ts`).
    *   Inject NgRx `Store`.
    *   Gunakan `selectSignal(selectCurrentUser)` dari NgRx untuk membuat *reactive signal* `user()` yang berisi data akun.
    *   Implementasikan fungsi `logout()` di ViewModel yang akan men-dispatch action `[Auth] Logout`, menghapus local storage, dan melakukan navigasi ke `/login`.

2.  **Integrasi di Component (`app.ts`)**:
    *   Inject ViewModel ke dalam komponen `App`.
    *   Ganti fungsi `logout()` eksisting untuk memanggil method `logout()` dari ViewModel.
    *   Ekspos signal `user()` dari ViewModel agar bisa dibaca oleh template HTML.

## Fasa 3: Refactoring UI (Sidebar ke Navbar)
Melakukan perombakan tampilan sesuai dengan kaidah Bootstrap dan UX backoffice modern.

1.  **Hapus Account Info dari Sidebar**:
    *   Buka `apps/ems-dashboard/src/app/app.html`.
    *   Hapus block kode `<div class="sidebar-footer">...</div>` yang berisi info Administrator dan tombol Logout (sekitar baris 24-37).

2.  **Tambahkan Account Dropdown di Navbar**:
    *   Pada bagian `<header class="navbar ...">`, lokasikan div sebelah kanan (`<div class="ms-auto d-flex align-items-center">`).
    *   Tambahkan elemen Bootstrap Dropdown reaktif yang menampilkan inisial/icon circle dan memuat info user:

```html
<!-- Account Dropdown -->
<div class="dropdown ms-3">
  <button class="btn btn-link text-dark p-0 position-relative dropdown-toggle d-flex align-items-center text-decoration-none" 
          type="button" 
          id="accountDropdown" 
          data-bs-toggle="dropdown" 
          aria-expanded="false" 
          style="outline: none; box-shadow: none;">
    <div class="rounded-circle bg-gold p-1 d-flex align-items-center justify-content-center shadow-sm" style="width: 36px; height: 36px;">
      <i class="bi bi-person-fill text-dark fs-5"></i>
    </div>
  </button>
  <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="accountDropdown" style="min-width: 220px;">
    <!-- Reactive User Info -->
    <li class="px-3 py-3 border-bottom bg-light">
      @if (vm.user()) {
        <p class="mb-0 fw-bold text-dark text-truncate">{{ vm.user()?.username }}</p>
        <p class="mb-0 text-muted small text-truncate">{{ vm.user()?.group }}</p>
      } @else {
        <p class="mb-0 fw-bold text-dark">Guest</p>
      }
    </li>
    <!-- Logout Action -->
    <li>
      <button class="dropdown-item text-danger d-flex align-items-center py-2 mt-1" (click)="vm.logout()">
        <i class="bi bi-box-arrow-right me-2"></i> Keluar
      </button>
    </li>
  </ul>
</div>
```

3.  **Pengujian Tampilan**:
    *   Pastikan script JS Bootstrap dimuat sehingga dropdown berfungsi dengan baik (bisa di klik/toggle).
    *   Pastikan dropdown menu tidak tertutup/terpotong oleh elemen lain (z-index aman).

---
Dengan langkah-langkah di atas, EMS Dashboard akan sepenuhnya berbasis arsitektur NgRx + MVVM, dan antarmuka akan lebih rapi dengan account profile diletakkan pada posisi standar aplikasi enterprise (Kanan Atas).
