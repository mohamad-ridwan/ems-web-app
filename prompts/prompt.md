buatkan file dengan nama "implementation.md" untuk implementasi proyek dengan konsep micro frontend di nx ini.
simpan file tersebut di folder /prompts

paparkerjaan implementasi:

<!-- buat shell app dengan nama 'ems-dashboard' :
- menggunakan bootstrap terbaru versi 5
- menggunakan angular terbaru versi 21
- menggunakan angular routing untuk navigasi
- tambahkan route "/login" yang akan mengarahkan ke remote app "ems-login" -->

buat remote app dengan nama 'ems-add-employee' :
- menggunakan bootstrap terbaru versi 5
- menggunakan angular terbaru versi 21
- Menampilkan form menambah data employee, seluruh atribute data employee bersifat mandatory (data tidak bisa di save ketika ada field yang kosong).
- Input birthDate menggunakan datetime picker, tidak boleh melebihi hari ini.
- Input email dengan validasi format email.
- Input basicSalary harus berupa angka.
- Input group berupa drop down list dengan search textbox diatas. Isi drop down list dengan 10 dummy group name.
- Pada bagian bawah form terdapat button save untuk menyimpan data dan cancel untuk kembali ke halaman Employee List.

<!-- buatkan backend di folder 'ems-backend' :
- menggunakan nestjs versi terbaru 11
- menggunakan database postgresql versi 18 -->

buatkan api endpoint untuk login di dalam ems-backend:
- endpoint /api/employee/add, POST

format data yang dikirim berupa json:

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
add-employee/              # DOMAIN: Fitur add employee
   ├─ employee-add/        # ViewModel: Logic Input Employee
   ├─ ui/                  # View: Komponen presentasi (dumb components)
   ├─ data-access/         # Model: NgRx State, Services, API Calls
   ├─ domain/              # Model: Interfaces, DTOs, Business Logic

buatkan ui dengan style enterprise secara konsisten yang telah dibangun pada aplikasi ini.