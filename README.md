# Kospintar Admin Monitoring

Repo ini adalah starter frontend admin monitoring berbasis React + Vite dengan arsitektur utama yang meniru `KospintarFE`.

Tujuan utamanya adalah memantau seluruh aktivitas operasional Kospintar:

- aktivitas perusahaan kos
- aktivitas tenant
- pembayaran
- check-in / check-out
- notifikasi dan reminder

Repo ini sengaja dipisah sebagai FE admin monitoring agar tim bisa mengembangkan panel operasional tanpa mengganggu flow owner dashboard utama.

## Arsitektur yang ditiru dari KospintarFE

Struktur utamanya dibuat sejalan dengan `KospintarFE`:

- `src/App.jsx` tetap tipis
- `src/router/` untuk route + protected route
- `src/components/templates/MainTemplate.jsx` sebagai shell halaman utama
- `src/components/atoms|organisms` untuk komponen
- `src/pages/` untuk page-level screen
- `src/services/` untuk lapisan data/API
- `src/store/action` dan `src/store/reducer` untuk state management

## Kenapa repo ini dibuat

Backend saat ini sudah punya banyak data dasar untuk monitoring:

- `UserActivityLogs`
- `NotificationLogs`
- `ReminderLogs`
- `Payments`
- `Contracts`
- `Tenants`
- `Companies`
- `Subscriptions`

Yang belum lengkap adalah lapisan admin monitoring yang menyatukan data tersebut menjadi:

- overview operasional
- timeline aktivitas tenant
- timeline aktivitas perusahaan
- payment monitoring
- notification health monitoring

## Menjalankan repo

```bash
npm install
npm run dev
```

Default akan berjalan di `http://localhost:4178`.

## Setup Login Real + Seed Monitoring

Lihat panduan di `docs/SUPER_ADMIN_MONITORING_SETUP.md` untuk:

- koneksi FE ke `KospintarBE`
- seed data super admin monitoring
- seed 3 company sample (`PT Kost Pintar Nusantara`, `kos bono`, `kos resya`)

## Isi repo

- `src/App.jsx`: bootstrap aplikasi seperti pola FE utama
- `src/router/index.jsx`: lazy routes admin monitoring
- `src/components/templates/MainTemplate.jsx`: layout utama ala dashboard KospintarFE
- `src/pages/`: Dashboard, Companies, Tenants, Notifications, Architecture, Login
- `src/services/monitoringService.js`: service data monitoring
- `src/mocks/monitoringMock.js`: data mock awal
- `src/store/`: auth, snackbar, sidebar, dan monitoring state
- `ARCHITECTURE.md`: rekomendasi arsitektur, termasuk jawaban apakah BE admin perlu dipisah

## Status

Ini sudah berbentuk scaffold arsitektural yang lebih dekat ke `KospintarFE`, tetapi belum tersambung ke API real dan belum diverifikasi lewat build karena dependency repo baru ini belum di-install.
