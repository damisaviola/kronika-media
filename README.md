# KRONIKA INDONESIA (Web Portal Media Berita Editorial)

> **Autonomous Full-Stack Next.js News Media Portal** dibangun dengan standar jurnalisme investigatif kelas dunia (*Swiss Grid Architecture, High-Contrast Typography & Anti-AI Slop Aesthetic*).

---

## 🏛️ Desain Sistem & Estetika Editorial (Swiss Architectural Press)

Portal berita ini dirancang dengan prinsip **Anti-AI Slop**:
1. **Exposed Hairline Grid**: Garis pembatas struktural tipis (`divide-stone-300`, `border-stone-900`) memisahkan kolom berita menyerupai koran cetak modern.
2. **Sudut Tajam (`rounded-none`)**: Menghindari kartu mengambang `rounded-2xl` atau `shadow-lg`.
3. **Kombinasi 3 Font Harmonis**:
   * **Headline (`font-serif`)**: *Newsreader* (Google Fonts) dengan `tracking-tight` dan kontras tinggi.
   * **Body & UI (`font-sans`)**: *Plus Jakarta Sans* untuk kenyamanan membaca artikel panjang.
   * **Metadata (`font-mono`)**: *JetBrains Mono* untuk jam tayang (`WIB`), durasi baca, nomor urut indeks (`01`–`05`), dan kategori.
4. **Palet Warna Tinta & Kertas**:
   * Latar Utama: Warm Paper (`#FAF8F5`)
   * Teks Utama: Deep Charcoal Ink (`#111111`)
   * Aksen Terukur: Vermilion Red (`#D92D20`) untuk indikator *Breaking / Live* dan overline aktif.
5. **Micro-Interactions Jurnalistik**:
   * *Drop Cap* pada paragraf pembuka artikel berita.
   * *Reading Progress Bar* merah tipis di bagian atas layar artikel.
   * Hover underline dengan offset 4px.

---

## 🛠️ Tech Stack & Lingkungan Sistem

* **Runtime**: Node.js `v24.22.x` (dikonfigurasi pada `.nvmrc` dan `engines` di `package.json`).
* **Framework**: Next.js 15 (App Router, React Server Components, Server Actions, Route Handlers).
* **Styling**: Tailwind CSS + `@tailwindcss/typography` + `clsx` + `tailwind-merge` + `lucide-react`.
* **Database & ORM**: PostgreSQL + Prisma ORM (Singleton Pattern di `src/lib/prisma.ts`).
* **Validasi**: Zod Schema (`ArticleSchema`).
* **SEO & Standar Berita**:
  * Skema terstruktur `<script type="application/ld+json">` (`NewsArticle`).
  * Dynamic OpenGraph & Twitter Card Metadata.
  * Dynamic `sitemap.xml` & `robots.txt`.
  * Optimasi LCP & CLS dengan `next/image` (`priority` pada cover utama).

---

## 📂 Struktur Direktori Proyek

```text
kronika-media/
├── .nvmrc                                  # Node.js 24.22.0
├── package.json                            # Scripts, dependencies & engine constraints
├── tsconfig.json                           # Strict TypeScript configuration (@/* paths)
├── tailwind.config.ts                      # Konfigurasi font & palet editorial
├── postcss.config.mjs
├── next.config.ts                          # Domain image Unsplash
├── prisma/
│   ├── schema.prisma                       # Model User, Category, Article (PostgreSQL)
│   └── seed.ts                             # Seeder 5 kategori & 10 artikel jurnalisme investigasi
├── src/
│   ├── actions/
│   │   └── article.actions.ts              # Server Actions: saveArticleAction, deleteArticleAction, togglePublishAction
│   ├── app/
│   │   ├── (public)/                       # Portal Pembaca Publik
│   │   │   ├── layout.tsx                  # Masthead Header, Date/Market Bar, Breaking Ticker, Footer
│   │   │   ├── page.tsx                    # Homepage: 12-Col Asymmetric Swiss Grid
│   │   │   ├── berita/[slug]/
│   │   │   │   ├── page.tsx                # Halaman Baca Artikel + Reading Progress + Drop Cap + JSON-LD
│   │   │   │   └── loading.tsx             # Architectural Wireframe Skeleton Loader
│   │   │   ├── kategori/[slug]/page.tsx    # Halaman Arsip Rubrik
│   │   │   └── cari/page.tsx               # Pencarian Berita (?q=keyword)
│   │   ├── (redaksi)/                      # CMS Meja Redaksi
│   │   │   ├── layout.tsx                  # Clean Monospace CMS Sidebar
│   │   │   └── dashboard/
│   │   │       ├── page.tsx                # Tabel Manajemen Berita, Metrik Views, Toggle Status
│   │   │       └── tulis/page.tsx          # Form Berita dengan Live Editorial Preview
│   │   ├── api/
│   │   │   └── views/[slug]/route.ts       # Endpoint POST increment viewsCount
│   │   ├── globals.css                     # Directive Tailwind, Drop Cap & Hairlines
│   │   ├── layout.tsx                      # Root Layout Google Fonts
│   │   ├── robots.ts                       # Konfigurasi Robots.txt
│   │   └── sitemap.ts                      # Dynamic XML Sitemap
│   ├── components/
│   │   ├── cms/
│   │   │   ├── ArticleForm.tsx             # Form Berita & Live Typography Preview (Split Screen)
│   │   │   └── DashboardArticleActions.tsx # Client buttons untuk hapus & toggle publikasi
│   │   ├── layout/
│   │   │   ├── BreakingTicker.tsx          # Ticker berita sekilas
│   │   │   ├── EditorialFooter.tsx         # Newspaper footer 4-kolom
│   │   │   └── MastheadNavbar.tsx          # Masthead, info pasar & navigasi kategori
│   │   └── news/
│   │       ├── AsymmetricHeroGrid.tsx      # 12-Kolom Hero (Kilas, Cover 16:10, Terpopuler, Opini)
│   │       ├── EditorialCard.tsx           # Kartu berita modular (Vertical/Horizontal/Compact)
│   │       ├── ReadingProgressBar.tsx      # Reading progress indicator
│   │       ├── ShareButtons.tsx            # Tombol bagikan ke X, WA, Salin Tautan
│   │       ├── TrendingIndex.tsx           # Indeks terpopuler 01-05 & kolom opini
│   │       └── ViewCounter.tsx             # Counter pembaca artikel
│   └── lib/
│       ├── data/
│       │   └── seed-data.ts                # Dataset jurnalisme investigatif realistis
│       ├── prisma.ts                       # Singleton Prisma Client
│       ├── queries/
│       │   └── articles.ts                 # Query ter-cache (unstable_cache tag 'articles') + fallback
│       ├── utils.ts                        # formatTanggalIndo, formatJamWIB, calculateReadingTime, generateSlug
│       └── validations/
│           └── article.schema.ts           # Skema Zod ArticleSchema
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Masuk ke Direktori Proyek
```bash
cd /Users/pauline/Downloads/kronika-media
```

### 2. Verifikasi Skema & Tipe
```bash
npx prisma validate
npm run typecheck
```

### 3. Menjalankan Server Pengembangan (Dev)
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000):
* **Halaman Depan Publik**: `http://localhost:3000`
* **Halaman Baca Artikel**: `http://localhost:3000/berita/anatomi-krisis-mineral-kritis-hilirisasi-nikel-dan-karbon-global`
* **Arsip Rubrik**: `http://localhost:3000/kategori/nasional`
* **Pencarian Berita**: `http://localhost:3000/cari?q=nikel`
* **Dasbor Meja Redaksi (CMS)**: `http://localhost:3000/dashboard`
* **Tulis Berita Baru**: `http://localhost:3000/dashboard/tulis`

### 4. Build Produksi
```bash
npm run build
npm run start
```

---

## 🗄️ Koneksi Database PostgreSQL (Opsional)
Aplikasi dilengkapi dengan mekanisme **Graceful Fallback**:
* Jika PostgreSQL aktif di `localhost:5432`, Anda dapat menjalankan:
  ```bash
  npx prisma db push
  npm run seed
  ```
* Jika PostgreSQL belum dijalankan secara lokal, aplikasi secara otomatis menyajikan dataset investigatif bawaan sehingga seluruh halaman publik, sitemap, pencarian, dan dasbor redaksi tetap dapat di-build dan diakses secara lancar tanpa hambatan teknis.

