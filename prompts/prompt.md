buatkan file dengan nama "implementation.md" untuk implementasi proyek dengan konsep micro frontend di nx ini.
simpan file tersebut di folder /prompts

paparkerjaan implementasi:

<!-- buat shell app dengan nama 'ems-dashboard' :
- menggunakan bootstrap terbaru versi 5
- menggunakan angular terbaru versi 21
- menggunakan angular routing untuk navigasi
- tambahkan route "/login" yang akan mengarahkan ke remote app "ems-login" -->

update shell app "ems-dashboard" :
- tambahkan route "/employee-detail" yang akan mengarahkan ke remote app "ems-employee-detail"

buat remote app dengan nama 'ems-employee-detail' :
- menggunakan bootstrap terbaru versi 5
- menggunakan angular terbaru versi 21
- Menampilkan data detail sebuah employee, dan melakukan formating data untuk ditampilkan, contoh (basicSalary ditampilkan mengunakan format Rp. xx.xxx,xx).
- Memiliki button ‘ok’ yang menavigasi kembali ke Employee List Page, dan data search sebelumnya tidak boleh hilang.
- gunakan router angular untuk navigasi

<!-- buatkan backend di folder 'ems-backend' :
- menggunakan nestjs versi terbaru 11
- menggunakan database postgresql versi 18 -->

buatkan api endpoint untuk get employee detail di dalam ems-backend:
- endpoint /api/employee/:email, GET

parameter api:
{
    "email": string
}

gunakan module federation "@nx/module-federation/angular" untuk integrasi shared functionality dan remote app.

design pattern code:
- gunakan konsep MVVM (Model View ViewModel)
- gunakan konsep DDD (Domain Driven Design)

contoh folder arsitektur:
employee-detail/           # DOMAIN: Fitur detail employee
   ├─ employee-detail/     # ViewModel: Logic Detail Employee
   ├─ ui/                  # View: Komponen presentasi (dumb components)
   ├─ data-access/         # Model: NgRx State, Services, API Calls
   ├─ domain/              # Model: Interfaces, DTOs, Business Logic

buatkan ui dengan style enterprise secara konsisten yang telah dibangun pada aplikasi ini.