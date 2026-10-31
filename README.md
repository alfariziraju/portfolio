# 🚀 Portofolio Web Fullstack (Next.js + Tailwind CSS + Admin Portal)

Portofolio web modern, responsif, dan performan tinggi yang menyatukan:
1. **Frontend (Halaman Publik)**: Showcase proyek, filter kategori, profil, riwayat karier, tech stack, dan formulir kontak interaktif.
2. **Backend (REST API Routes)**: Endpoint publik (`/api/portfolio`, `/api/contact`) dan endpoint admin terproteksi.
3. **Admin Portal (`/admin`)**: Dashboard visual berbasis web untuk mengelola seluruh data portofolio tanpa menyentuh kode, lengkap dengan autentikasi aman dan fitur **Git-Based Auto-Deploy**.

---

## 📁 Struktur Proyek

```
portfolio/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── page.js              # [Admin] Dashboard CRUD Portofolio
│   │   │   └── login/page.js        # [Admin] Halaman Login
│   │   ├── api/
│   │   │   ├── admin/
│   │   │   │   ├── auth/            # [Backend] Login, Logout, Session check
│   │   │   │   └── data/route.js    # [Backend] GET & PUT data portofolio
│   │   │   ├── contact/route.js     # [Backend] POST Form Kontak
│   │   │   └── portfolio/route.js   # [Backend] GET Data Portofolio
│   │   ├── globals.css              # Styling Tailwind & Dark theme
│   │   ├── layout.js                # Root layout & SEO Metadata
│   │   └── page.js                  # Halaman utama portofolio publik
│   ├── components/
│   │   ├── Navbar.jsx               # Header & drawer menu mobile
│   │   ├── Hero.jsx                 # Headline, CTA, Social links
│   │   ├── About.jsx                # Profil naratif & statistik
│   │   ├── Projects.jsx             # Showcase proyek + filter kategori
│   │   ├── Skills.jsx               # Tech stack per kategori
│   │   ├── Experience.jsx           # Timeline riwayat kerja
│   │   ├── Contact.jsx              # Form kontak interaktif
│   │   ├── Footer.jsx               # Footer & back to top
│   │   └── Icons.jsx                # Ikon SVG GitHub & LinkedIn
│   ├── lib/
│   │   ├── auth.js                  # Manajemen session cookie admin
│   │   └── storage.js               # Penyimpanan lokal & Git Auto-Commit
│   └── data/
│       ├── portfolio.json           # Data profil, skill, proyek, dan karier
│       └── inbox.json               # Penyimpanan pesan formulir kontak
├── .env.example                     # Panduan variabel lingkungan
├── package.json
└── README.md
```

---

## 🛠️ Cara Menjalankan Secara Lokal

### 1. Masuk ke direktori
```bash
cd portfolio
```

### 2. Jalankan server development
```bash
npm run dev
```

- **Halaman Utama Portofolio**: [http://localhost:3000](http://localhost:3000)
- **Halaman Admin Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🔐 Kredensial Login Admin

Secara default, kredensial login adalah:
- **Username**: `admin`
- **Password**: `admin123`

*(Anda dapat mengubah kredensial ini kapan saja di file `.env.local`)*.

---

## ⚡ Fitur Admin Portal (`/admin`)

- **Tab Profil & Bio**: Ubah nama, role, tagline, deskripsi bio, email, sosial media, dan toggle status badge *"Open for work"*.
- **Tab Proyek Portofolio**: Tambah proyek baru, edit proyek yang sudah ada, tandai proyek sebagai *Featured*, serta hapus proyek.
- **Tab Tech Stack & Skills**: Tambah keahlian baru ke kategori yang sesuai dan sesuaikan tingkat kemampuan (*Beginner*, *Intermediate*, *Advanced*).
- **Tab Pesan Masuk (Inbox)**: Lihat semua pesan kontak yang dikirim oleh pengunjung web secara terorganisir.
- **Backup JSON**: Unduh salinan data `portfolio.json` sewaktu-waktu dengan 1 klik.

---

## 🔄 Cara Kerja Git-Based Auto-Deploy (Vercel)

1. Saat Anda mengedit data di **`/admin`** dan menekan tombol **"Simpan & Publish"**:
   - Jika dijalankan di **lokal**: Langsung menyimpan ke file `src/data/portfolio.json`.
   - Jika dikonfigurasi dengan `GITHUB_TOKEN`: Sistem otomatis membuat commit ke repository GitHub Anda via GitHub API.
2. Commit tersebut langsung memicu **Vercel Auto-Deploy**, sehingga web publik terupdate secara otomatis dalam hitungan detik tanpa perlu sewa server database terpisah!
