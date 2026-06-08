# Implementasi Fitur Sidebar Toggle Responsive (Desktop Mode)

## Deskripsi Pekerjaan
Dokumen ini menguraikan langkah-langkah implementasi fitur *toggle* (buka/tutup) pada *sidebar* untuk mode desktop. Desain UI disesuaikan agar konsisten dengan gaya enterprise aplikasi EMS Portal, termasuk penggunaan icon button yang rapi dan animasi transisi yang mulus.

## Target File
- `libs/shared/ui-kit/src/lib/sidebar/sidebar.view.html`

## Penyesuaian Komponen Terkait (Saran Implementasi)

### 1. Update View HTML (`sidebar.view.html`)

Pada file `sidebar.view.html`, tambahkan elemen *button* toggle di dalam area *header* sidebar, serta perbarui *class* komponen untuk bereaksi terhadap status buka/tutup (misal `isCollapsed()`). 

Tambahkan juga pembungkus (wrapper) pada teks navigasi agar mudah disembunyikan saat sidebar dalam mode *collapse*.

```html
<!-- Contoh Update pada libs/shared/ui-kit/src/lib/sidebar/sidebar.view.html -->

@if (!isLoginPage) {
  <aside class="sidebar d-flex flex-column" 
         [class.show]="isSidebarOpen()" 
         [class.collapsed]="isDesktopCollapsed()">
    
    <!-- Sidebar Header dengan Toggle -->
    <div class="sidebar-header d-flex align-items-center justify-content-between p-3 border-bottom border-secondary border-opacity-25">
      <!-- Logo / Title -->
      <h3 class="fw-bold text-white mb-0 logo-text">
        EMS <span class="text-gold">PORTAL</span>
      </h3>
      <h3 class="fw-bold text-white mb-0 logo-icon d-none">
        <span class="text-gold">E</span>
      </h3>
      
      <!-- Desktop Toggle Button -->
      <button class="btn btn-link text-white p-1 d-none d-lg-flex align-items-center justify-content-center toggle-btn" 
              (click)="toggleDesktopSidebar()" 
              title="Toggle Sidebar">
        <i class="bi" [ngClass]="isDesktopCollapsed() ? 'bi-list' : 'bi-chevron-left'"></i>
      </button>
    </div>

    <!-- Menu Navigasi -->
    <nav class="nav flex-column mt-3 flex-grow-1">
      <a class="nav-link d-flex align-items-center" 
         routerLink="/list-employee" 
         routerLinkActive="active" 
         [routerLinkActiveOptions]="{exact: false}" 
         (click)="closeSidebar()"
         title="List Employee">
        <i class="bi bi-people-fill"></i> 
        <span class="ms-2 menu-label">List Employee</span>
      </a>
      <a class="nav-link d-flex align-items-center" 
         routerLink="/add-employee" 
         routerLinkActive="active" 
         (click)="closeSidebar()"
         title="Add Employee">
        <i class="bi bi-person-plus-fill"></i> 
        <span class="ms-2 menu-label">Add Employee</span>
      </a>
    </nav>
  </aside>
}
```

### 2. Update Component Class (`sidebar.component.ts`)

Tambahkan *signal* atau *state* untuk menyimpan kondisi sidebar desktop.

```typescript
// Tambahkan pada SidebarComponent
isDesktopCollapsed = signal(false);

toggleDesktopSidebar() {
  this.isDesktopCollapsed.update(val => !val);
}
```

### 3. Styling & Animasi (`sidebar.component.scss`)

Untuk mempertahankan gaya *enterprise*, pastikan transisi pelebaran dan penyempitan layar berjalan halus.

```scss
/* Contoh implementasi di sidebar.component.scss */

.sidebar {
  transition: width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 260px; /* Lebar standar desktop */
  overflow: hidden;

  /* State saat collapsed di desktop */
  &.collapsed {
    width: 80px;

    .sidebar-header {
      justify-content: center !important;
      padding: 1rem !important;

      .logo-text { display: none !important; }
      .logo-icon { display: block !important; }
      
      .toggle-btn {
        margin: 0 auto;
        padding: 0.5rem;
      }
    }

    .nav-link {
      justify-content: center;
      padding-left: 0;
      padding-right: 0;

      i { margin: 0 !important; font-size: 1.4rem; }
      .menu-label { display: none !important; }
    }
  }

  /* Hover effect pada tombol toggle */
  .toggle-btn {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

/* Penyesuaian margin main-content di mode desktop */
@media (min-width: 992px) {
  .main-content {
    transition: margin-left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    margin-left: 260px; /* Sesuai lebar normal sidebar */
  }

  /* Jika bisa mengakses state collapsed dari parent atau menggunakan variable */
  .sidebar.collapsed ~ .main-content {
    margin-left: 80px;
  }
}
```
