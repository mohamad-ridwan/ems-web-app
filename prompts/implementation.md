# Pekerjaan Implementasi

Refactor struktur folder:

## Notification Case

### Flat Notification
- Pada folder `libs/shared/ui-kit/src/lib/notification` rename folder menjadi `flat-notification`
- Rubah nama kepemilikan class dan selector dengan sesuai ui nya `flat-notification`

### Popup Notification
- Pada folder `libs/shared-theme/src/lib/notification` rename folder menjadi `popup-notification`
- Rubah nama kepemilikan class dan selector dengan sesuai ui nya `popup-notification`
- Pindahkan folder `popup-notification` ke `libs/shared/ui-kit/src/lib/popup-notification`
- Refactor code di `libs/shared-theme/src/lib/notification/notification.component.ts` menjadi konsep MVVM:
  - `popup-notification.component.ts`
  - `popup-notification.view.html`
  - `popup-notification.view.scss`

## Theme Case
- Pindahkan folder `libs/shared-theme` ke folder `libs/shared/theme`
- Tujuan refactor folder theme ini adalah untuk disimpan dalam 1 folder shared.

---

**Catatan:**
- Pastikan remote maupun shell app yang menggunakan library ini sudah di perbarui dengan hasil refactor folder yang ada di `libs/` folder.
- Setelah refactor selesai, anda dapat menghapus folder `shared-theme` pada `libs/` folder karena sudah tidak digunakan lagi.
