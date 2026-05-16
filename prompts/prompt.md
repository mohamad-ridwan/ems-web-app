buatkan file dengan nama "implementation.md" untuk implementasi proyek dengan konsep micro frontend di nx ini.
simpan file tersebut di folder /prompts

paparkerjaan implementasi:

buat shell app dengan nama 'ems-dashboard' :
- menggunakan bootstrap terbaru versi 5
- menggunakan angular terbaru versi 21
- menggunakan angular routing untuk navigasi
- tambahkan route "/login" yang akan mengarahkan ke remote app "ems-login"

buat remote app dengan nama 'ems-login' :
- menggunakan bootstrap terbaru versi 5
- menggunakan angular terbaru versi 21

buatkan backend di folder 'ems-backend' :
- menggunakan nestjs versi terbaru 11
- menggunakan database postgresql versi 18

buatkan api endpoint untuk login di dalam ems-backend:
- endpoint /api/auth/login
- menggunakan JWT authentication
- menggunakan JWT token untuk authentication
dan integrasikan api di ems-login dengan menggunakan http interceptor 

gunakan module federation "@nx/module-federation/angular" untuk integrasi shared functionality dan remote app.

buatkan ui dengan style enterprise seperti bank mandiri