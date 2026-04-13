-- Kospintar Monitoring - Super Admin Seed (PostgreSQL)
-- Password plaintext untuk semua user pada seed ini: admin123
-- Hash bcrypt: $2a$10$FSGH8UwxDbYqpbeMRofZA.C9n6vMOkH60pQdPpwwuGOacNKg3HP9O
--
-- Jalankan di DB KospintarBE:
-- psql <connection> -f docs/super-admin-monitoring-seed.sql

BEGIN;

INSERT INTO "Users" (
  "id", "email", "password", "name", "role",
  "isEmailVerified", "emailVerificationToken",
  "createdAt", "updatedAt"
)
VALUES
  (
    '9aa27e4d-8f2a-4f9e-92e2-2f1d2c9e7c01',
    'admin.monitoring@kospintar.id',
    '$2a$10$FSGH8UwxDbYqpbeMRofZA.C9n6vMOkH60pQdPpwwuGOacNKg3HP9O',
    'Super Admin Monitoring',
    'admin',
    true,
    null,
    NOW(),
    NOW()
  ),
  (
    '9aa27e4d-8f2a-4f9e-92e2-2f1d2c9e7c02',
    'admin@kospintar.id',
    '$2a$10$FSGH8UwxDbYqpbeMRofZA.C9n6vMOkH60pQdPpwwuGOacNKg3HP9O',
    'Super Admin Monitoring',
    'admin',
    true,
    null,
    NOW(),
    NOW()
  ),
  (
    'c4915f9c-5e6c-4dd2-bf14-c0a4ea1fce11',
    'owner.nusantara@kospintar.id',
    '$2a$10$FSGH8UwxDbYqpbeMRofZA.C9n6vMOkH60pQdPpwwuGOacNKg3HP9O',
    'Owner Nusantara',
    'owner',
    true,
    null,
    NOW(),
    NOW()
  ),
  (
    'cccfed58-0537-4b58-95b0-c5bbd6f2c912',
    'owner.bono@kospintar.id',
    '$2a$10$FSGH8UwxDbYqpbeMRofZA.C9n6vMOkH60pQdPpwwuGOacNKg3HP9O',
    'Owner Bono',
    'owner',
    true,
    null,
    NOW(),
    NOW()
  ),
  (
    '9e2ccbd9-38e1-4d42-97aa-963d1b2b6d13',
    'owner.resya@kospintar.id',
    '$2a$10$FSGH8UwxDbYqpbeMRofZA.C9n6vMOkH60pQdPpwwuGOacNKg3HP9O',
    'Owner Resya',
    'owner',
    true,
    null,
    NOW(),
    NOW()
  )
ON CONFLICT ("email") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "role" = EXCLUDED."role",
  "isEmailVerified" = true,
  "updatedAt" = NOW();

INSERT INTO "Companies" (
  "id", "name", "address", "userId", "createdAt", "updatedAt"
)
VALUES
  (
    '5ce83c89-77cf-4f04-bb5f-5c9a2be80e21',
    'PT Kost Pintar Nusantara',
    'Jakarta, Indonesia',
    'c4915f9c-5e6c-4dd2-bf14-c0a4ea1fce11',
    NOW(),
    NOW()
  ),
  (
    '057f84f0-48a5-4a8c-9b3f-46c9f9c87e22',
    'kos bono',
    'Bandung, Indonesia',
    'cccfed58-0537-4b58-95b0-c5bbd6f2c912',
    NOW(),
    NOW()
  ),
  (
    '0874d56f-e2c6-4304-b5e8-2a58e3904e23',
    'kos resya',
    'Yogyakarta, Indonesia',
    '9e2ccbd9-38e1-4d42-97aa-963d1b2b6d13',
    NOW(),
    NOW()
  )
ON CONFLICT ("id") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "address" = EXCLUDED."address",
  "userId" = EXCLUDED."userId",
  "updatedAt" = NOW();

INSERT INTO "Subscriptions" (
  "id", "companyId", "status", "planId", "validUntil", "createdAt", "updatedAt"
)
VALUES
  (
    '7a42a174-2d6e-4d0d-8a9e-6d3ef5b6f001',
    '5ce83c89-77cf-4f04-bb5f-5c9a2be80e21',
    'active',
    'pro_monthly',
    NOW() + INTERVAL '28 day',
    NOW(),
    NOW()
  ),
  (
    '7a42a174-2d6e-4d0d-8a9e-6d3ef5b6f002',
    '057f84f0-48a5-4a8c-9b3f-46c9f9c87e22',
    'inactive',
    'basic_monthly',
    NOW() - INTERVAL '5 day',
    NOW(),
    NOW()
  ),
  (
    '7a42a174-2d6e-4d0d-8a9e-6d3ef5b6f003',
    '0874d56f-e2c6-4304-b5e8-2a58e3904e23',
    'pending_payment',
    'basic_monthly',
    NOW() + INTERVAL '2 day',
    NOW(),
    NOW()
  )
ON CONFLICT ("id") DO UPDATE
SET
  "status" = EXCLUDED."status",
  "planId" = EXCLUDED."planId",
  "validUntil" = EXCLUDED."validUntil",
  "updatedAt" = NOW();

INSERT INTO "BoardingHouses" (
  "id", "name", "address", "phone", "description",
  "latitude", "longitude", "companyId", "createdAt", "updatedAt"
)
VALUES
  (
    'a3216708-510c-4f09-bfb2-37cdca6e0101',
    'Kospintar HQ Jakarta',
    'Jakarta, Indonesia',
    '081200000001',
    'Cabang utama Jakarta',
    -6.2087634,
    106.8455990,
    '5ce83c89-77cf-4f04-bb5f-5c9a2be80e21',
    NOW(),
    NOW()
  ),
  (
    'a3216708-510c-4f09-bfb2-37cdca6e0102',
    'Kospintar Selatan',
    'Depok, Indonesia',
    '081200000002',
    'Cabang satelit Depok',
    -6.4024844,
    106.7942405,
    '5ce83c89-77cf-4f04-bb5f-5c9a2be80e21',
    NOW(),
    NOW()
  ),
  (
    'a3216708-510c-4f09-bfb2-37cdca6e0201',
    'Kos Bono Pasteur',
    'Bandung, Indonesia',
    '081200000003',
    'Cabang Bandung',
    -6.9174639,
    107.6191228,
    '057f84f0-48a5-4a8c-9b3f-46c9f9c87e22',
    NOW(),
    NOW()
  ),
  (
    'a3216708-510c-4f09-bfb2-37cdca6e0301',
    'Kos Resya Malioboro',
    'Yogyakarta, Indonesia',
    '081200000004',
    'Cabang Yogyakarta',
    -7.7955798,
    110.3694896,
    '0874d56f-e2c6-4304-b5e8-2a58e3904e23',
    NOW(),
    NOW()
  )
ON CONFLICT ("id") DO UPDATE
SET
  "name" = EXCLUDED."name",
  "address" = EXCLUDED."address",
  "phone" = EXCLUDED."phone",
  "description" = EXCLUDED."description",
  "latitude" = EXCLUDED."latitude",
  "longitude" = EXCLUDED."longitude",
  "companyId" = EXCLUDED."companyId",
  "updatedAt" = NOW();

COMMIT;
