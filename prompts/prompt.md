buatkan file dengan nama "implementation.md" untuk implementasi proyek dengan konsep micro frontend di nx ini.
simpan file tersebut di folder /prompts

paparkerjaan implementasi:

<!-- buat shell app dengan nama 'ems-dashboard' :
- menggunakan bootstrap terbaru versi 5
- menggunakan angular terbaru versi 21
- menggunakan angular routing untuk navigasi
- tambahkan route "/login" yang akan mengarahkan ke remote app "ems-login" -->

update shell app "ems-dashboard" :
- tambahkan route "/list-employee" yang akan mengarahkan ke remote app "ems-list-employee"

buat remote app dengan nama 'ems-list-employee' :
- menggunakan bootstrap terbaru versi 5
- menggunakan angular terbaru versi 21
- Menampilkan setidaknya 100 dummy data dengan mengimplementasi paging , sorting, dan searching (setidaknya 2 parameter dan rule yang digunakan AND) pada tabel.
- Memiliki pilihan untuk mengatur jumlah data dalam 1 page.
- Memilik button untuk add employee, yang menavigasi pada Add Employee Page.
- Memiliki kolom action yang berisi dummy button edit dan delete, yang menampilkan notifikasi aksi yang dilakukan dengan warna notifikasi yang berbeda (edit = kuning, delete = merah).

<!-- buatkan backend di folder 'ems-backend' :
- menggunakan nestjs versi terbaru 11
- menggunakan database postgresql versi 18 -->

buatkan api endpoint untuk get list employee di dalam ems-backend:
- endpoint /api/employee/list, GET

parameter api:

{
    “username”: string,
    “firstName”:string,
    “lastName”:string,
    "password": string,
    “email”:string,
    “birthDate”:datetime,
    “basicSalary”:double,
    “status”:string,
    “group”:string,
    “description”:datetime
}

gunakan module federation "@nx/module-federation/angular" untuk integrasi shared functionality dan remote app.

design pattern code:
- gunakan konsep MVVM (Model View ViewModel)
- gunakan konsep DDD (Domain Driven Design)

contoh folder arsitektur:
employee-list/             # DOMAIN: Fitur list employee
   ├─ employee-list/       # ViewModel: Logic List Employee
   ├─ ui/                  # View: Komponen presentasi (dumb components)
   ├─ data-access/         # Model: NgRx State, Services, API Calls
   ├─ domain/              # Model: Interfaces, DTOs, Business Logic

buatkan ui dengan style enterprise secara konsisten yang telah dibangun pada aplikasi ini.