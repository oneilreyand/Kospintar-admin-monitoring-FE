Kospintar UI Guide

Dokumen ini adalah ringkasan visual singkat. Untuk dokumentasi yang lebih detail dan siap ditiru oleh repo lain, gunakan [UI_SYSTEM_DOCUMENTATION.md](/Users/mac/Documents/GitHub/KospintarFE/UI_SYSTEM_DOCUMENTATION.md).

Dokumen ini berisi referensi visual dan design system untuk refactor UI aplikasi Kospintar, berdasarkan eksplorasi UI preview yang sudah dibuat sebelumnya.

1. Design Goals

Tujuan perubahan UI:

membuat dashboard terasa lebih modern, bersih, dan premium

menyatukan warna CTA, badge, status, dan tipografi

meningkatkan keterbacaan tabel, form, dan navigation

membuat komponen reusable agar mudah direfactor oleh Codex

Karakter visual:

clean

rounded

modern SaaS dashboard

ringan dan mudah discan

cocok untuk aplikasi manajemen kos

2. Color Documentation

Primary Colors

Name

Hex

Usage

Primary Green

#2DCC70

tombol utama, verified badge, active state, status tersedia

Dark Navy

#2C3E50

heading utama, nama kos, sidebar text, topbar title

Accent & Status Colors

Name

Hex

Usage

Urgency Red

#E74C3C

sisa kamar, error, warning kuat, status kritis

Urgency Orange

#F39C12

countdown, promo cepat, warning ringan

Promo Pink

#E91E63

badge promo, campaign badge, special label

Supporting Colors

Name

Hex

Usage

Light Background

#F8F9FA

background app, section background, input background

Soft Gray

#E0E0E0

border, divider, outline, placeholder block

Text Secondary

#7F8C8D

deskripsi, metadata, subtext, caption

3. Global Style Rules

Typography

Heading utama menggunakan Dark Navy #2C3E50

Text sekunder menggunakan #7F8C8D

Heading harus tegas dan mudah dibaca

Hindari terlalu banyak warna pada text utama

Shape & Radius

Card utama: 24px

Section besar: 28px hingga 32px

Button: 16px hingga 20px

Input: 16px hingga 20px

Badge: rounded lembut

Shadow

gunakan shadow halus

jangan terlalu keras atau terlalu gelap

fokus pada kesan clean dan modern

Background

background utama aplikasi: #F8F9FA

card dan modal: putih

border dan divider: #E0E0E0

4. Component Guidelines

4.1 Buttons

Primary Button

background: #2DCC70

text: putih

radius: besar

usage: simpan, booking, submit, tambah data

Secondary Button

background: putih atau #F8F9FA

border: #E0E0E0

text: #2C3E50

Danger Button

background: #E74C3C

text: putih

usage: hapus, blokir, aksi permanen

4.2 Badges

Badge Type

Color

Usage

Verified

#2DCC70

kamar tersedia, akun tervalidasi

Urgent

#E74C3C

sisa 1 kamar, overdue, error

Warning

#F39C12

countdown, pending, attention

Promo

#E91E63

campaign badge, diskon, special label

4.3 Cards

Karakter card baru:

background putih

radius besar (24px)

shadow halus

title navy

subtext abu

CTA konsisten hijau

Contoh penggunaan:

dashboard summary card

room listing card

tenant summary card

financial overview card

4.4 Inputs & Forms

Aturan form:

input background: #F8F9FA

border: #E0E0E0

label: #2C3E50

placeholder: #7F8C8D

focus state: aksen hijau #2DCC70

error state: merah #E74C3C

warning state: orange #F39C12

Form harus terasa:

ringan

bersih

konsisten

tidak seperti browser default

4.5 Tables

Aturan tabel baru:

header lebih tegas dengan navy

divider pakai #E0E0E0

text isi lebih ringan

status badge harus semantik dan konsisten

row hover lembut

spacing lebih lega agar mudah discan

Cocok untuk:

daftar penghuni

daftar kamar

pembayaran

booking requests

4.6 Sidebar

Aturan sidebar baru:

background putih atau #F8F9FA

item aktif pakai aksen hijau #2DCC70

text utama navy

text tidak aktif abu sekunder

spacing antar menu lebih lega

icon lebih jelas hirarkinya

Efek yang diinginkan:

lebih premium

lebih brand-aware

tidak terlihat seperti admin template generik

4.7 Topbar / Header

Aturan topbar:

judul utama navy

search input bg #F8F9FA

icon/action button lebih clean

area filter dan search harus konsisten dengan input style

4.8 Modal / Drawer

Aturan modal:

background putih

radius besar

header navy

content rapi dan ringan

tombol utama hijau

tombol destructive merah jika perlu

5. Example UI Preview Translation

5.1 Featured Listing Card

Elemen visual:

image area dengan placeholder halus

nama kos memakai navy

lokasi memakai text secondary

promo badge pink

countdown badge orange

verified badge green

status sisa kamar merah

harga navy

tombol booking hijau

5.2 Compact List Item

Elemen visual:

thumbnail di kiri

info utama di kanan

badge status kecil

metadata abu sekunder

CTA kecil hijau

5.3 Home Preview

Elemen visual:

search bar rounded

tombol filter navy

promo banner gradient pink ke orange

list item card putih

spacing lega

6. Before vs After Transformation

Before

Ciri UI lama:

warna belum konsisten

radius kecil

card terasa generik

tabel datar

sidebar tanpa aksen brand kuat

input dan modal terlalu utilitarian

After

Ciri UI baru:

CTA utama hijau

heading navy

promo pink

urgency merah dan orange

background terang bersih

card lebih rounded dan premium

komponen lebih konsisten dan reusable

7. Recommended Refactor Order for Codex

Urutan kerja yang direkomendasikan:

theme tokens

button

badge

input / select / textarea

card

modal / drawer

table

sidebar

topbar

dashboard widgets

halaman lain yang memakai komponen turunan

8. Recommended Design Tokens

export const colors = {
  primary: "#2DCC70",
  navy: "#2C3E50",
  danger: "#E74C3C",
  warning: "#F39C12",
  promo: "#E91E63",
  background: "#F8F9FA",
  border: "#E0E0E0",
  textSecondary: "#7F8C8D",
};

Atau bisa pakai CSS variables:

:root {
  --color-primary: #2DCC70;
  --color-navy: #2C3E50;
  --color-danger: #E74C3C;
  --color-warning: #F39C12;
  --color-promo: #E91E63;
  --color-bg: #F8F9FA;
  --color-border: #E0E0E0;
  --color-text-secondary: #7F8C8D;
  --radius-xl: 20px;
  --radius-2xl: 24px;
}

9. Codex Prompt Reference

Gunakan prompt ini di Codex:

Refactor seluruh UI dashboard project ini agar mengikuti design system berikut:

COLORS
- Primary Green: #2DCC70
- Dark Navy: #2C3E50
- Urgency Red: #E74C3C
- Urgency Orange: #F39C12
- Promo Pink: #E91E63
- Light Background: #F8F9FA
- Soft Gray: #E0E0E0
- Text Secondary: #7F8C8D

STYLE RULES
- Gunakan clean modern boarding-house dashboard style
- Rounded corners besar: 20px–24px
- Shadow halus
- Typography utama memakai Dark Navy
- CTA utama memakai Primary Green
- Background utama Light Background
- Border, divider, input outline memakai Soft Gray
- Text sekunder memakai Text Secondary
- Badge promo memakai Promo Pink
- Badge urgency / sisa kamar / warning memakai Urgency Red atau Urgency Orange
- Pertahankan functionality existing, ubah visual layer dan reusable components

TASKS
1. Cari seluruh reusable UI components: button, badge, input, card, modal, table, sidebar, navbar, tabs, pagination, dropdown, toast.
2. Buat centralized design tokens / theme constants untuk semua warna di atas.
3. Refactor component dasar lebih dulu agar semua halaman ikut berubah.
4. Refactor halaman dashboard agar:
   - summary cards lebih modern
   - table lebih clean
   - forms konsisten
   - status badge mengikuti semantic colors
   - sidebar dan topbar sesuai palette baru
5. Pastikan spacing, radius, hover, focus states konsisten.
6. Jangan ubah business logic atau API calls.
7. Setelah refactor, jalankan project dan perbaiki semua error sampai app berhasil build/run.

10. Recommended File Names

Agar mudah dipakai Codex, simpan dokumen ini dengan salah satu nama berikut:

UI_GUIDE.md

DESIGN_SYSTEM.md

KOSPINTAR_UI_REFERENCE.md

Nama yang paling direkomendasikan: UI_GUIDE.md

11. Best Practice Agar Dibaca Codex

Supaya Codex mudah memakai dokumen ini:

simpan file di root project

gunakan nama file yang jelas seperti UI_GUIDE.md

tambahkan juga tokens.ts atau theme.css

saat memberi prompt, sebutkan: "ikuti UI_GUIDE.md"

minta Codex untuk audit reusable components terlebih dahulu

Contoh prompt:

Baca UI_GUIDE.md lalu refactor seluruh reusable UI component agar konsisten dengan design system di dokumen tersebut.
Mulai dari button, card, badge, input, table, modal, sidebar, dan topbar.
Jangan ubah business logic.

12. Alternative Reference Format

Selain markdown, referensi terbaik untuk Codex adalah kombinasi:

UI_GUIDE.md untuk aturan visual

tokens.ts atau theme.css untuk design tokens

AppPreview.tsx untuk contoh implementasi visual

Jadi kalau ingin hasil paling kuat, gunakan 3 lapisan referensi sekaligus:

Markdown guide

Token file

Preview component

13. Final Recommendation

Format paling efektif untuk Codex:

UI_GUIDE.md

src/styles/tokens.ts

src/examples/AppPreview.tsx

Dengan begitu Codex punya:

aturan tertulis

source of truth warna

contoh implementasi UI nyata
