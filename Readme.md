````markdown
# Wighos

**Wighos** adalah CLI package manager yang dirancang untuk mempermudah pembuatan aplikasi dengan clean architecture. Dengan Wighos, Anda dapat dengan mudah membuat aplikasi berbasis **Express.js** atau **Golang** hanya dengan satu perintah!

## Fitur

- **Dukungan Stack**:
  - Express.js (Node.js)
  - Golang (Clean Architecture)
- **Customisasi Mudah**:
  - Pilih versi Node.js, npm, atau Golang yang ingin digunakan.
- **Instalasi Otomatis**:
  - Langsung menginstal dependensi setelah aplikasi dibuat.

## Instalasi

Wighos tidak memerlukan instalasi permanen di sistem Anda. Cukup gunakan `npx` untuk menjalankannya langsung.

## Penggunaan

### Membuat Aplikasi Baru

Gunakan perintah berikut untuk membuat aplikasi baru:

```bash
npx wighos generate <nama-aplikasi>
```
````

- **`<nama-aplikasi>`**: Nama aplikasi atau folder tempat aplikasi akan dibuat.

Contoh:

```bash
npx wighos generate myapp
```

### Pilihan Stack

Setelah menjalankan perintah di atas, Wighos akan meminta Anda memilih stack dan versi yang diinginkan:

- Pilih **Express.js** atau **Golang**.
- Tentukan versi **Node.js** atau **Golang** yang digunakan.
- Nama aplikasi dan versi akan secara otomatis diperbarui di konfigurasi proyek (seperti `package.json` atau `go.mod`).

### Hasil Akhir

Setelah proses selesai:

- Struktur folder aplikasi siap digunakan.
- Dependensi akan otomatis terinstal.
