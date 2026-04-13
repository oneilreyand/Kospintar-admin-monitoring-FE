# Arsitektur Admin Monitoring

## Tujuan

Menyediakan panel admin terpusat untuk memantau:

- aktivitas perusahaan kos
- aktivitas tenant
- pembayaran
- check-in / check-out
- notifikasi
- kesehatan operasional sistem

## Prinsip implementasi frontend

Frontend repo ini sengaja meniru pola `KospintarFE` agar:

- tim tidak perlu belajar pola baru
- route dan page composition tetap familier
- komponen utama tetap memakai `MainTemplate`
- layer `pages`, `services`, dan `store` tetap konsisten
- migrasi komponen dari FE utama bisa dilakukan lebih cepat

## Rekomendasi saat ini

### FE admin monitoring: ya, bagus dipisah

Alasannya:

- kebutuhan UI admin berbeda dari owner dashboard
- admin butuh data lintas company, bukan hanya tenant isolation per owner
- release cycle admin biasanya berbeda dari aplikasi owner
- risiko perubahan UI admin tidak mengganggu FE utama

### BE admin: belum perlu dipisah sekarang

Untuk tahap sekarang, lebih aman tetap satu backend dulu lalu tambahkan lapisan `admin monitoring endpoints`.

Alasannya:

- data monitoring berasal dari model yang sama di backend saat ini
- split backend terlalu cepat akan menambah sinkronisasi auth, role, dan contract API
- kebutuhan utama sekarang adalah agregasi data, bukan pemisahan infrastruktur

## Kapan BE admin layak dipisah

Pisahkan backend admin kalau salah satu ini mulai terasa:

- query analitik/admin berat mulai mengganggu trafik aplikasi utama
- tim admin dan tim app sudah berjalan terpisah
- perlu akses audit/compliance yang jauh lebih ketat
- perlu data warehouse, event bus, atau ingestion pipeline sendiri
- admin panel butuh domain layanan yang benar-benar berbeda dari transactional API

## Tahap implementasi yang disarankan

### Tahap 1

Tetap satu backend, tambah endpoint admin khusus:

- `GET /admin/monitoring/overview`
- `GET /admin/monitoring/companies`
- `GET /admin/monitoring/companies/:companyId/timeline`
- `GET /admin/monitoring/tenants`
- `GET /admin/monitoring/tenants/:tenantId/timeline`
- `GET /admin/monitoring/payments`
- `GET /admin/monitoring/contracts`
- `GET /admin/monitoring/notifications`
- `GET /admin/monitoring/reminders`

### Tahap 2

Buat service agregasi di backend saat ini:

- normalisasi event `payment_verified`
- normalisasi event `checkin`
- normalisasi event `checkout`
- normalisasi event `subscription_activated`
- normalisasi event notification success/failed/skipped
- ringkasan per company dan per tenant

### Tahap 3

Kalau traffic dan kompleksitas naik, pecah menjadi:

- transactional backend
- admin monitoring backend
- optional event store / analytics store

## Data utama yang perlu tampil di admin panel

### Company monitoring

- total company aktif
- subscription aktif / hampir habis / inactive
- jumlah properti per company
- jumlah kamar available / occupied / maintenance
- jumlah tenant aktif per company
- pendapatan terkini
- notifikasi gagal per company

### Tenant monitoring

- status tenant
- histori check-in
- histori check-out
- histori pembayaran
- outstanding billing
- reminder status
- notifikasi yang terkirim / gagal

### Risk monitoring

- pembayaran overdue
- kontrak hampir habis
- subscription hampir habis
- delivery notification failed
- tenant tanpa kontrak aktif tapi masih punya tagihan

## Catatan penting untuk backend

Agar repo admin ini benar-benar berguna, backend sekarang sebaiknya ditambah:

- endpoint agregasi admin
- filter by company, tenant, status, tanggal
- pagination konsisten
- event timeline yang seragam antar sumber data
- role guard khusus admin superuser
