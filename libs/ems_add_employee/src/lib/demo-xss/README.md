# Panduan Keamanan & Pencegahan XSS di Angular (Fitur Add Employee)

Dokumen ini menjelaskan mekanisme pencegahan **Cross-Site Scripting (XSS)** dan praktik terbaik keamanan di Angular, khususnya dalam konteks pengisian form penambahan karyawan baru (*Add Employee*).

---

## 1. Mekanisme Pencegahan Default Angular

Secara default, Angular memiliki sistem perlindungan XSS bawaan yang sangat kuat melalui **Context-Aware Sanitization/Escaping**.

### A. Interpolasi Teks (Safe)
Ketika kita merender teks menggunakan kurung kurawal ganda:
```html
<p>{{ employee.firstName }}</p>
```
Angular otomatis melakukan *encoding* HTML. Karakter berbahaya seperti `<` diubah menjadi `&lt;`, sehingga tag HTML tidak akan dieksekusi sebagai script oleh browser, melainkan hanya dirender sebagai teks biasa.

### B. Binding Properti HTML (Sanitized)
Ketika kita perlu merender elemen HTML terformat secara dinamis menggunakan binding `[innerHTML]`:
```html
<div [innerHTML]="employee.description"></div>
```
Angular akan menyaring string input melalui sanitizer internalnya.
- **Diizinkan:** Tag aman seperti `<b>`, `<i>`, `<a>`, `<p>`, dll.
- **Dihapus:** Tag berbahaya seperti `<script>`, `<style>`, `<iframe`, dan atribut pemicu script seperti `onload`, `onerror`, `onclick`, dll.

---

## 2. Praktik Berbahaya yang Harus Dihindari

Vulnerabilitas XSS biasanya muncul karena developer secara sengaja atau tidak sengaja mem-bypass sistem keamanan bawaan Angular.

### A. Bypassing dengan `DomSanitizer`
Angular menyediakan `DomSanitizer` untuk menandai bahwa suatu nilai "aman" untuk langsung dirender tanpa pembersihan.
```typescript
// SANGAT BERBAHAYA JIKA INPUT BERASAL DARI USER!
this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(userInput);
```
**Aturan Utama:** Jangan pernah memanggil metode `bypassSecurityTrust...` pada data yang diinput oleh pengguna (seperti nama karyawan, kelompok/group, atau deskripsi) sebelum data tersebut disanitasi ketat di backend.

### B. Manipulasi DOM Langsung
Menggunakan native API browser untuk memanipulasi elemen melewati compiler Angular:
```typescript
// SANGAT BERBAHAYA!
this.elementRef.nativeElement.querySelector('#name-display').innerHTML = userInput;
```
Menggunakan `innerHTML` langsung pada elemen DOM akan mem-bypass compiler dan sanitizer Angular sepenuhnya, membuat aplikasi Anda rentan terhadap **DOM-based XSS**.
**Aturan Utama:** Selalu gunakan template data-binding Angular (`{{ }}` atau `[innerHTML]`) daripada manipulasi DOM langsung menggunakan `ElementRef`.

---

## 3. Praktik Terbaik Keamanan Form *Add Employee*

Dalam konteks fitur penambahan karyawan baru (*Add Employee*), berikut adalah langkah-langkah tambahan yang harus diterapkan pada field form (seperti `username`, `firstName`, `lastName`, `email`, dan `description`):

### A. Validasi Input di Sisi Klien (Client-Side Validation)
Gunakan `Validators` Angular untuk membatasi format input sejak awal:
- **Username / Nama:** Batasi panjang karakter dan gunakan regex pattern agar hanya menerima karakter alfanumerik.
- **Email:** Gunakan validator email bawaan Angular.
- **Basic Salary:** Gunakan pattern angka saja (`^[0-9]*$`).

Contoh implementasi pada `employee-add.facade.ts`:
```typescript
this.employeeForm = this.fb.group({
  username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{3,20}$')]],
  firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]{2,50}$')]],
  lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]{2,50}$')]],
  email: ['', [Validators.required, Validators.email]],
  basicSalary: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  description: ['', [Validators.required, Validators.maxLength(500)]], // deskripsi dibatasi panjangnya
});
```

### B. Sanitasi Sisi Server (Server-Side Sanitization & Validation)
**Ingat:** Validasi frontend hanya untuk pengalaman pengguna (UX). Semua input harus divalidasi dan disanitasi ulang di server (backend) sebelum disimpan ke dalam database.
- Lakukan pembersihan tag HTML tidak dikenal (misal menggunakan library seperti `dompurify` atau `sanitize-html` di backend).
- Gunakan kueri SQL berparameter (Parameterized Queries / ORM seperti TypeORM) untuk mencegah SQL Injection jika data input disimpan ke database PostgreSQL.

### C. Content Security Policy (CSP)
Terapkan HTTP header `Content-Security-Policy` (CSP) untuk memperkuat pertahanan lapis kedua jika terjadi kebocoran XSS:
- Batasi sumber eksekusi script dengan `script-src 'self'`.
- Hindari penggunaan `'unsafe-inline'` atau `'unsafe-eval'` kecuali benar-benar diperlukan dan dikelola secara aman.
