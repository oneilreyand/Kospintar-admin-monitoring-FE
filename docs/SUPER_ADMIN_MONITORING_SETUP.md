# Super Admin Monitoring Setup

Dokumen ini untuk menghubungkan login FE monitoring ke `KospintarBE` dan menyiapkan seed data super admin + sample company.

## 1) Set API base URL FE

Buat file `.env.local` di root FE:

```bash
VITE_API_BASE_URL=http://localhost:3002
```

Sesuaikan host/port jika instance BE kamu berbeda.

## 2) Seed data admin + company

Jalankan SQL seed:

```bash
psql <connection-string-db-kospintarbe> -f docs/super-admin-monitoring-seed.sql
```

File seed akan membuat:
- user super admin monitoring
- 3 owner + 3 company:
  - `PT Kost Pintar Nusantara`
  - `kos bono`
  - `kos resya`
- subscription status campuran (`active`, `inactive`, `pending_payment`)
- boarding house dengan koordinat map (lat/long)

## 3) Login dari FE

Gunakan akun:

- Email: `admin.monitoring@kospintar.id`
- Alternatif: `admin@kospintar.id`
- Password: `12345678`

Jika `admin@kospintar.id` sudah ada di DB lama dan masih gagal login, jalankan patch cepat ini:

```sql
UPDATE "Users"
SET
  "password" = crypt('12345678', gen_salt('bf', 10)),
  "role" = 'admin',
  "isEmailVerified" = true,
  "updatedAt" = NOW()
WHERE "email" = 'admin@kospintar.id';
```

## 4) Verifikasi hasil di menu Company

Setelah login berhasil:
- menu Company harus memuat data dari DB real (bukan mock fallback)
- list company harus memunculkan nama yang sama dengan DB
- panel detail, KPI, dan map coverage harus terisi

## Catatan

- Login FE sekarang sudah pakai endpoint BE: `POST /users/login`.
- Fitur Company sekarang berjalan strict API (jika API gagal akan tampil error state), supaya mismatch data mudah dideteksi.
