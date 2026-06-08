# Implementasi Fitur Tooltips Sidebar

## Deskripsi Tugas
Menambahkan fitur tooltips menggunakan Bootstrap pada menu sidebar agar lebih informatif, interaktif, dan konsisten dengan *enterprise style* yang sudah ada pada aplikasi.

## File yang Diubah
- `libs/shared/ui-kit/src/lib/sidebar/sidebar.view.html`
- *Opsional: File TypeScript komponen sidebar terkait (jika inisialisasi tooltip Bootstrap diperlukan di Angular).*

## Detail Pekerjaan
1. **Modifikasi HTML**:
   Pada menu sidebar (nav-link), tambahkan atribut khusus Bootstrap tooltips:
   - Tambahkan `data-bs-toggle="tooltip"`
   - Tambahkan `data-bs-placement="right"` (atau penempatan yang sesuai, misal saat sidebar di-collapse).
   - Pastikan atribut `title` yang ada saat ini (`title="List Employee"` dan `title="Add Employee"`) dapat dirender sebagai tooltip oleh Bootstrap.

2. **Gaya Enterprise**:
   - Pastikan tooltip tidak mengganggu layout saat muncul.
   - Jika aplikasi menggunakan inisialisasi manual Bootstrap tooltips pada komponen Angular, pastikan untuk memanggil inisialisasi tersebut di siklus hidup komponen (misalnya `ngAfterViewInit`), menggunakan standar library Bootstrap JS yang ada pada proyek.
   - Sesuaikan warna dan font tooltip jika ada *custom styling* (misalnya dari SCSS Bootstrap variables) agar selaras dengan desain emas/gelap (*text-gold*, *bg-dark*) yang ada pada sidebar.

3. **Contoh Perubahan Target**:
   ```html
   <a class="nav-link d-flex align-items-center" 
      routerLink="/list-employee" 
      routerLinkActive="active" 
      [routerLinkActiveOptions]="{exact: false}" 
      (click)="closeSidebar()"
      data-bs-toggle="tooltip" 
      data-bs-placement="right"
      data-bs-title="List Employee">
     <i class="bi bi-people-fill"></i> 
     <span class="ms-2 menu-label">List Employee</span>
   </a>
   ```

## Kriteria Penerimaan
- Tooltip muncul saat hover pada menu sidebar.
- Tooltip bergaya Bootstrap standar/enterprise yang telah disesuaikan (jika ada).
- Tidak ada error pada console JavaScript terkait inisialisasi tooltip.
