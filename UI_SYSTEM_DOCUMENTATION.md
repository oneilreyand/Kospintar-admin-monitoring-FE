# Kospintar UI System Documentation

Dokumen ini menjelaskan fondasi UI Kospintar secara detail agar repo lain bisa meniru gaya visual, palet warna, konfigurasi Tailwind, struktur komponen, dan pola atomic design yang dipakai di project ini.

Dokumen ini disusun berdasarkan implementasi nyata di codebase, terutama:
- `tailwind.config.js`
- `src/index.css`
- `src/styles/designSystem.js`
- `src/components/atoms`
- `src/components/molecules`
- `src/components/organisms`
- `src/components/templates`

## 1. Ringkasan Sistem UI

UI Kospintar dibangun dengan kombinasi:
- `React 19`
- `Vite`
- `Tailwind CSS`
- `lucide-react` untuk icon
- object token lokal di `src/styles/designSystem.js`
- global CSS token di `src/index.css`

Gaya visual utamanya:
- dashboard SaaS yang ringan dan bersih
- banyak sudut membulat
- hijau sebagai primary action
- navy sebagai warna heading dan identitas brand
- latar terang dengan card putih
- border tipis dan shadow halus
- dark mode berbasis class `.dark`

Repositori ini tidak memakai design token engine yang kompleks. Polanya lebih praktis:
- warna inti didefinisikan di `tailwind.config.js`
- token yang sering dipakai ulang didefinisikan lagi di `src/styles/designSystem.js`
- beberapa nilai global juga dipasang sebagai CSS variable di `src/index.css`

Artinya, jika repo lain ingin meniru gaya Kospintar, pendekatan paling aman adalah menyalin ketiga lapisan ini sekaligus:
- Tailwind theme
- JS design tokens
- CSS variables/base styles

## 2. Visual DNA

### 2.1 Karakter visual

Kospintar punya bahasa visual yang konsisten:
- ramah dan modern, bukan enterprise yang kaku
- banyak whitespace
- card-oriented layout
- CTA utama selalu jelas
- teks utama tidak terlalu banyak warna
- status memakai warna yang tegas tapi tidak neon

### 2.2 Prinsip desain

Prinsip yang terlihat paling konsisten di repo ini:
- gunakan `primary` hanya untuk aksi penting dan state aktif
- gunakan `navy` untuk heading, label penting, dan identitas brand
- latar aplikasi tetap terang agar data mudah discan
- radius cukup besar agar UI terasa lembut
- border dipakai untuk struktur, shadow dipakai untuk kedalaman ringan
- hindari warna aksen berlebihan dalam satu layar

## 3. Color Palette

Sumber utama:
- `tailwind.config.js`
- `src/styles/designSystem.js`
- `src/index.css`

### 3.1 Brand colors

| Token | Hex | Fungsi |
| --- | --- | --- |
| `primary` | `#2DCC70` | tombol utama, active state, CTA, focus accent |
| `navy` | `#2C3E50` | heading utama, text penting, identitas brand |
| `danger` | `#E74C3C` | error, destructive action |
| `warning` | `#F39C12` | warning, perhatian, pending |
| `promo` | `#E91E63` | promo, badge promosi, aksen khusus |

### 3.2 Surface & text colors

| Token | Hex | Fungsi |
| --- | --- | --- |
| `background` / `sidebar-bg` / `ui-bg` | `#F8F9FA` | latar utama aplikasi, sidebar terang, search shell |
| `border` / `ui-border` | `#E0E0E0` | border input, card, divider |
| `textSecondary` / `sidebar-text` / `ui-text-secondary` | `#7F8C8D` | deskripsi, metadata, helper text |
| `white` | `#FFFFFF` | surface card, modal, dropdown |

### 3.3 Dark mode colors

| Token | Hex | Fungsi |
| --- | --- | --- |
| `dark-bg` / `--color-dark-bg` | `#1e1e2e` | background utama dark mode |
| `dark-sidebar` / `--color-dark-sidebar` | `#252836` | sidebar dark mode |
| `dark-text` / `--color-dark-text` | `#e0e0e0` | text utama dark mode |

### 3.4 Snackbar colors

| Token | Hex |
| --- | --- |
| `snackbar-success` | `#71DD37` |
| `snackbar-info` | `#2C3E50` |
| `snackbar-warning` | `#F39C12` |
| `snackbar-error` | `#E74C3C` |
| `snackbar-question` | `#2DCC70` |

### 3.5 Rekomendasi adopsi ke repo lain

Kalau repo lain ingin meniru identitas visual Kospintar, minimal bawa token ini:

```js
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
```

## 4. Radius, Shadow, dan Spacing

Sumber utama:
- `src/styles/designSystem.js`

### 4.1 Radius tokens

```js
export const uiRadius = {
  sm: "10px",
  md: "14px",
  lg: "18px",
  xl: "22px",
};
```

Makna praktiknya:
- `sm`: elemen kecil, chip, bagian sekunder
- `md`: input, button, small container
- `lg`: card, dropdown, panel
- `xl`: modal, panel spesial, onboarding card besar

### 4.2 Shadow tokens

```js
export const uiShadow = {
  card: "0 10px 28px rgba(44, 62, 80, 0.06)",
  floating: "0 16px 40px rgba(44, 62, 80, 0.14)",
};
```

Aturan praktis:
- `card`: untuk card biasa, header, sidebar, panel statis
- `floating`: untuk dropdown, popover, onboarding, modal kecil

### 4.3 Spacing

Spacing di repo ini tidak punya token JS khusus. Polanya memakai Tailwind spacing default:
- `px-3`, `px-4`, `px-6`
- `py-2`, `py-2.5`, `py-3`
- `gap-1`, `gap-2`, `gap-3`, `gap-4`
- `p-4`, `p-5`, `p-6`

Prinsip spacing yang terasa konsisten:
- mobile rapat tapi tidak sesak
- desktop lebih lapang
- container utama biasanya `px-3 md:px-6`
- header mobile lebih compact daripada desktop

## 5. Tailwind Configuration

Sumber:
- `tailwind.config.js`

Repo ini sudah memakai Tailwind sebagai tulang punggung utility styling. Konfigurasi utamanya:

```js
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        primary: '#2DCC70',
        navy: '#2C3E50',
        danger: '#E74C3C',
        warning: '#F39C12',
        promo: '#E91E63',
        'sidebar-text': '#7F8C8D',
        'sidebar-bg': '#F8F9FA',
        'sub-menu-active': '#2DCC70',
        'dark-bg': '#1e1e2e',
        'dark-sidebar': '#252836',
        'dark-text': '#e0e0e0',
      },
      boxShadow: {
        'custom-1': '0 0.125rem 0.25rem rgba(161, 171, 185, 0.075)',
      },
      fontFamily: {
        sans: ['Public Sans', ...defaultTheme.fontFamily.sans],
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}
```

### 5.1 Kenapa konfigurasi ini penting

- `darkMode: 'class'` berarti dark mode dikontrol manual lewat class `dark` di root.
- `fontFamily.sans` dipaksa ke `Public Sans` agar nuansa dashboard lebih modern.
- warna brand dibuat menjadi utility Tailwind, jadi bisa dipakai langsung seperti `bg-primary`, `text-navy`, `border-danger`.

### 5.2 Safelist

Repo ini juga punya `safelist` cukup besar untuk class dinamis, terutama button variants. Ini penting kalau repo lain juga membangun utility class secara dinamis di runtime.

Kalau tidak menyalin `safelist`, beberapa style bisa hilang saat build production karena Tailwind tidak melihat class tersebut secara statis.

### 5.3 Minimal Tailwind clone untuk repo lain

Kalau ingin meniru Kospintar di repo baru, pakai minimal ini:

```js
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        primary: '#2DCC70',
        navy: '#2C3E50',
        danger: '#E74C3C',
        warning: '#F39C12',
        promo: '#E91E63',
        'sidebar-text': '#7F8C8D',
        'sidebar-bg': '#F8F9FA',
        'dark-bg': '#1e1e2e',
        'dark-sidebar': '#252836',
        'dark-text': '#e0e0e0',
      },
      fontFamily: {
        sans: ['Public Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
```

## 6. Global CSS Layer

Sumber:
- `src/index.css`

`src/index.css` memegang peran besar. Fungsinya bukan cuma bootstrap Tailwind, tapi juga memberi identitas visual dasar.

### 6.1 CSS variables

Di `:root` tersedia variable berikut:

```css
:root {
  --color-dark-bg: #1e1e2e;
  --color-dark-sidebar: #252836;
  --color-dark-text: #e0e0e0;
  --ui-primary: #2DCC70;
  --ui-navy: #2C3E50;
  --ui-danger: #E74C3C;
  --ui-warning: #F39C12;
  --ui-promo: #E91E63;
  --ui-bg: #F8F9FA;
  --ui-border: #E0E0E0;
  --ui-text-secondary: #7F8C8D;
}
```

### 6.2 Base styling

Global rule yang penting:
- heading default memakai `navy`
- body background memakai `ui-bg`
- text body cenderung `navy`
- link default memakai `primary`
- class `.card` sudah diberi style default

Ini berarti repo ini tidak sepenuhnya utility-only. Ada campuran:
- utility Tailwind
- inline style berbasis token
- global semantic class seperti `.card`

### 6.3 Dark mode strategy

Dark mode aktif saat `document.documentElement.classList.add('dark')`, lalu:
- background utama berubah ke `dark-bg`
- sidebar ke `dark-sidebar`
- text ke `dark-text`
- card terang diganti ke gray/dark surface

Di `MainTemplate`, toggle dark mode mengubah class root, bukan memakai CSS media query otomatis.

### 6.4 Library-specific fixes

`src/index.css` juga berisi:
- fix untuk Leaflet tile image
- animasi snackbar
- styling `react-day-picker`
- mode tabel native untuk mobile/tablet

Artinya, dokumentasi UI Kospintar harus dianggap sebagai gabungan:
- design system
- cross-library fixes
- responsive behavior

## 7. Design Tokens di JavaScript

Sumber:
- `src/styles/designSystem.js`

File ini adalah sumber token paling praktis untuk komponen React. Banyak atom dan organism mengimpor token dari sini.

Isinya:
- `colors`
- `uiRadius`
- `uiShadow`

Kenapa ini penting:
- lebih mudah dipakai di inline `style`
- mengurangi hardcode berulang
- memudahkan komponen reusable tanpa harus mengandalkan utility class yang terlalu dinamis

Pola yang dipakai di codebase:

```jsx
style={{
  borderRadius: uiRadius.lg,
  borderColor: colors.border,
  boxShadow: uiShadow.card,
}}
```

Kalau repo lain ingin meniru gaya Kospintar, `designSystem.js` ini sebaiknya dibawa apa adanya.

## 8. Atomic Design Structure

Sumber:
- `src/components`

Repo ini cukup konsisten memakai struktur atomic design:

```text
src/
  components/
    atoms/
    molecules/
    organisms/
    templates/
```

### 8.1 Atoms

Atoms adalah komponen dasar yang:
- relatif kecil
- reusable
- tidak tahu konteks halaman
- biasanya hanya menangani style + interaksi sederhana

Contoh atom di repo ini:
- `Button.jsx`
- `Input.jsx`
- `Card.jsx`
- `Avatar.jsx`
- `Badge.jsx`
- `Checkbox.jsx`
- `IconButton.jsx`
- `Spinner.jsx`
- `Modal.jsx`
- `Tooltip.jsx`
- `Alert.jsx`
- `DropdownMenu.jsx`
- `Table.jsx`

Karakter atom Kospintar:
- menerima `className`
- sering menerima token style lewat inline style
- tidak memegang business logic berat
- jadi bahan baku untuk molekul dan organism

### 8.2 Molecules

Molecules adalah gabungan beberapa atom untuk menyelesaikan satu unit interaksi yang lebih nyata.

Contoh:
- `SearchInput.jsx`
- `TenantForm.jsx`
- `DatePicker.jsx`
- `DateRangePicker.jsx`
- `Pagination.jsx`
- `ConfirmationModal.jsx`
- `MapPicker.jsx`
- `RecordPaymentModal.jsx`
- `MenuItem.jsx`
- `NotificationButton.jsx`

Karakter molecules:
- mulai punya use case yang spesifik
- masih cukup reusable lintas halaman
- biasanya memadukan 2-5 atom

### 8.3 Organisms

Organisms adalah komponen area besar yang bisa berdiri sebagai satu blok layar.

Contoh:
- `Header.jsx`
- `Sidebar.jsx`
- `BottomNav.jsx`
- `Snackbar.jsx`
- `AccountForm.jsx`
- `ProfileUpload.jsx`
- `RoomGridView.jsx`
- `RoomTableView.jsx`
- `OnboardingModal.jsx`
- `MainCalendar.jsx`
- `ActivityLog.jsx`

Karakter organisms:
- sudah tahu context fitur
- menggabungkan banyak molecules/atoms
- sering terhubung ke router, Redux, atau state besar

### 8.4 Templates

Templates adalah kerangka halaman.

Contoh:
- `MainTemplate.jsx`
- `DashboardLayout.jsx`

Peran template:
- menempatkan header, sidebar, content, bottom nav
- menentukan ruang, padding, overflow, dan shell utama aplikasi
- biasanya tidak memuat detail bisnis, tapi memuat struktur global

## 9. Struktur Folder yang Disarankan untuk Meniru Repo Ini

Jika repo lain ingin meniru pola ini, struktur minimal yang disarankan:

```text
src/
  assets/
  components/
    atoms/
      Button.jsx
      Input.jsx
      Card.jsx
      Spinner.jsx
      Avatar.jsx
    molecules/
      SearchInput.jsx
      MenuItem.jsx
      ConfirmationModal.jsx
    organisms/
      Header.jsx
      Sidebar.jsx
      BottomNav.jsx
      Snackbar.jsx
    templates/
      MainTemplate.jsx
  hooks/
  pages/
  router/
  services/
  store/
  styles/
    designSystem.js
  utils/
  index.css
  main.jsx
```

Kalau ingin sangat mirip dengan Kospintar, pertahankan juga:
- `router/`
- `store/`
- `services/`
- `hooks/`
- `utils/`

Karena UI repo ini cukup erat dengan:
- Redux state
- service layer API
- route-based layouts

## 10. Komponen Inti dan Aturan Replikasinya

### 10.1 Button

Sumber:
- `src/components/atoms/Button.jsx`

Ciri utama:
- punya `variant`: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `dark`, `ghost`
- punya `styleType`: `basic`, `label`, `outline`
- bisa `loading`
- otomatis disable saat `loading`
- radius memakai `uiRadius.md` atau `rounded-full`

Aturan penggunaan:
- `primary + basic` untuk CTA utama
- `outline` untuk aksi sekunder
- `label` untuk button yang terasa seperti tag/soft CTA
- `danger` hanya untuk aksi yang merusak

### 10.2 Input

Sumber:
- `src/components/atoms/Input.jsx`

Ciri utama:
- border tipis
- background putih
- rounded `md`
- `error` mengubah border ke `danger`
- text size kecil-menengah untuk dashboard

Aturan penggunaan:
- pakai label terpisah di parent
- helper/error text ditangani parent form
- hindari styling ad hoc yang berbeda-beda antar halaman

### 10.3 Card

Sumber:
- `src/components/atoms/Card.jsx`

Ciri utama:
- `bg-white`
- border halus
- shadow ringan
- radius `uiRadius.lg`
- variant memengaruhi warna border, bukan mengubah layout secara drastis

Aturan penggunaan:
- semua ringkasan dashboard, panel list, dan form section sebaiknya memakai card ini atau turunannya
- jangan membuat card baru dengan radius dan shadow berbeda tanpa alasan kuat

### 10.4 SearchInput

Sumber:
- `src/components/molecules/SearchInput.jsx`

Pola komponen:
- wrapper surface sendiri
- icon search di kiri
- `Input` di dalam tanpa border lagi
- background mengikuti token `background`

Ini pola penting Kospintar:
- shell luar memegang border/radius
- input dalam dibuat transparan

### 10.5 Header

Sumber:
- `src/components/organisms/Header.jsx`

Header Kospintar punya dua mode:
- mobile: avatar kiri, title di tengah
- desktop: search kiri, action kanan

Elemen yang konsisten:
- dark mode toggle
- notification
- avatar dropdown
- tombol onboarding

### 10.6 Sidebar

Sumber:
- `src/components/organisms/Sidebar.jsx`

Karakter sidebar:
- desktop: collapsed by default, expand on hover
- mobile: bottom sheet style
- brand surface terang `#F8F9FA`
- menu dipisah menjadi `Main Menu` dan `Sub Menu`
- active state mengikuti warna brand

Ini salah satu signature layout Kospintar yang paling kuat.

### 10.7 MainTemplate

Sumber:
- `src/components/templates/MainTemplate.jsx`

Fungsi:
- shell global aplikasi
- mengaktifkan dark mode root class
- memuat sidebar, header, bottom nav
- membungkus content dalam `ErrorBoundary` dan `Suspense`
- memegang onboarding global

Untuk repo lain, `MainTemplate` adalah blueprint paling penting.

## 11. Responsive Strategy

Repo ini tidak sekadar mengecilkan layout desktop. Ada pola mobile yang berbeda:

### 11.1 Mobile

- sidebar menjadi bottom sheet
- ada `BottomNav`
- header lebih ringkas
- title halaman di tengah
- content padding lebih kecil
- tabel tertentu berubah ke mode native mobile

### 11.2 Desktop

- sidebar collapsed/expand
- search selalu tampil di header
- action user ada di kanan atas
- layout lebih bernapas

### 11.3 Implikasi untuk repo lain

Jika ingin meniru UI Kospintar, jangan hanya salin warna. Salin juga logika layout mobile vs desktop:
- mobile-first interaction
- desktop dashboard shell
- sticky header
- navigasi bawah untuk mobile

## 12. Dark Mode Pattern

Dark mode di Kospintar tidak full custom per component. Strateginya campuran:
- root class `.dark`
- utility Tailwind `dark:*`
- beberapa style inline tetap pakai token terang jika perlu

Aturan adaptasi:
- surface besar harus punya fallback dark
- text penting harus aman di dark mode
- icon sekunder sering memakai abu yang lebih lembut

Kalau repo lain ingin meniru, pertahankan pola:
- state dark mode di store/global state
- root class toggle
- per-component `dark:` utility

## 13. Aturan Naming dan Composition

Pola naming yang terlihat di repo:
- atom bernama literal: `Button`, `Input`, `Card`
- molecule bernama use case: `SearchInput`, `ConfirmationModal`, `NotificationButton`
- organism bernama area UI: `Header`, `Sidebar`, `AccountForm`, `RoomGridView`
- template bernama layout shell: `MainTemplate`, `DashboardLayout`

Aturan yang layak dipertahankan:
- jangan campur atomic level dalam satu folder
- pisahkan komponen generic dan komponen feature-heavy
- kalau komponen sudah terlalu sadar domain, naikkan level ke organism

## 14. Kapan Membuat Atom Baru vs Molecule Baru

### Buat atom baru jika:
- komponen sangat kecil
- reusable lintas banyak fitur
- tidak tahu konteks bisnis
- fokus pada style dasar atau interaction primitive

Contoh:
- badge status baru
- skeleton dasar
- tag/chip reusable

### Buat molecule baru jika:
- terdiri dari beberapa atom
- sudah membentuk satu unit interaksi
- reusable di beberapa halaman

Contoh:
- field pencarian dengan icon
- input tanggal + dropdown
- menu item dengan badge dan icon

### Buat organism baru jika:
- komponen mewakili satu blok besar halaman
- sudah mulai punya logic fitur
- melibatkan state lokal yang lebih berat

Contoh:
- panel onboarding
- blok profil akun
- room table/grid dengan filter

## 15. Checklist Meniru Style Kospintar di Repo Lain

### Wajib dibawa

- `tailwind.config.js` brand colors + dark mode + font
- `src/styles/designSystem.js`
- CSS variables dan base rules dari `src/index.css`
- pola atomic design folder
- komponen inti: `Button`, `Input`, `Card`, `SearchInput`, `Header`, `Sidebar`, `MainTemplate`

### Sangat disarankan

- `Public Sans` sebagai default sans font
- radius besar
- shadow halus
- mobile bottom nav untuk layar kecil
- desktop hover-expand sidebar

### Jangan diubah sembarangan kalau mau tetap mirip

- warna `primary` dan `navy`
- radius card
- shadow card/floating
- latar `#F8F9FA`
- struktur `atoms > molecules > organisms > templates`

## 16. Starter Pack untuk Repo Baru

Urutan copy yang paling aman:

1. salin `tailwind.config.js`
2. salin `src/index.css`
3. salin `src/styles/designSystem.js`
4. salin `Button`, `Input`, `Card`, `Spinner`, `Avatar`
5. salin `SearchInput`, `MenuItem`
6. salin `Header`, `Sidebar`, `BottomNav`
7. salin `MainTemplate`
8. sesuaikan router, store, dan data layer

Kalau ingin hasil yang cepat mirip, cukup bawa:
- token
- header
- sidebar
- card/button/input

## 17. Gap dan Catatan Teknis

Ada beberapa ciri sistem UI saat ini yang perlu diketahui jika ingin menirunya:

- token warna tersebar di Tailwind, JS object, dan CSS variables
- sebagian komponen masih memakai inline style untuk token
- belum ada dokumentasi prop-level untuk semua komponen
- belum ada visual regression system atau Storybook

Kalau repo lain ingin versi yang lebih matang, pengembangan berikutnya bisa diarahkan ke:
- konsolidasi token ke satu sumber utama
- dokumentasi prop komponen per level atom/molecule
- Storybook atau Ladle
- snapshot visual per komponen

## 18. Kesimpulan

Kekuatan UI Kospintar ada pada kombinasi:
- warna brand yang jelas
- card dashboard yang lembut
- atomic design yang cukup rapi
- responsive shell yang terasa native di mobile
- token praktis yang mudah dipakai ulang

Kalau repo lain ingin meniru gaya ini, jangan hanya menyalin palet warna. Yang perlu disalin sebagai satu paket adalah:
- token visual
- struktur folder atomic
- pola komposisi komponen
- layout shell desktop/mobile
- dark mode strategy

Dengan begitu, hasil akhirnya tidak hanya “mirip warna”, tapi benar-benar terasa seperti turunan dari UI system Kospintar.
