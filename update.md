# Catatan Pembaruan Web KTF (Revisi Client)

Dokumen ini mencatat detail pembaruan dan restrukturisasi yang telah berhasil diimplementasikan pada website S1 Kriya Tekstil & Fashion UMB.

---

## 1. RESTREKTURISASI NAVIGASI & MENU
Perubahan pada menu navigasi desktop (`Navigation.tsx`) dan mobile drawer (`NavDrawer.tsx`):
*   **HOME**: Tetap dipertahankan di posisi awal.
*   **TENTANG KAMI**: Memiliki submenu:
    *   *Visi* & *Misi* (Tautan ke anchor `/#profil` / `/en/#profil`).
    *   *Sejarah Prodi*, *Akreditasi*, *Aktivitas Dosen*, *Dosen & Staff*, *Struktur Organisasi* (Tautan ke anchor section beranda).
    *   *Tulisan Dosen* (Mengarahkan ke halaman terpisah `/tulisan-dosen`).
*   **ADMISSIONS**: Tautan eksternal langsung menuju PMB UMB.
*   **STATISTIK**: Menu dropdown baru dengan link halaman terpisah `/statistik`:
    *   *Rata Mahasiswa Baru* (`/statistik#rata-maba`).
    *   *Rasio Dosen* (`/statistik#rasio-dosen`).
    *   *Rasio Masa Studi* (`/statistik#rasio-studi`).
*   **MAHASISWA & ALUMNI**: Menu dropdown baru dengan tautan:
    *   *Prestasi Mahasiswa* (`/#aktivitas-prestasi`).
    *   *Tugas Akhir* (`/#tugas-akhir`).
    *   *Alumni* (Mengarahkan ke halaman terpisah `/alumni`).
*   **GALERI KEGIATAN**: Menu dropdown baru:
    *   *Kegiatan Dosen* (`/kegiatan-dosen`).
    *   *Kegiatan Mahasiswa* (`/kegiatan-mahasiswa`).
*   **SINTA PRODI**: Tautan langsung ke profil Sinta KTF Kemdiktisaintek.

---

## 2. PENYEMPURNAAN FOOTER
Struktur footer (`Footer.tsx`) diperbarui secara menyeluruh menggunakan grid premium:
1.  **Logo UMB**: Ditampilkan secara dinamis dengan gambar `/assets/logo-umb.png`.
2.  **Email**: `kriya.fashion@umbandung.ac.id` (Link mailto aktif).
3.  **Telepon**: Nomor helpdesk KTF (`+62 22 730 9999`).
4.  **Lokasi**: Alamat lengkap Kampus UMB Bandung.
5.  **Jam Operasional**: Senin - Jumat | 08:00 - 16:00 WIB.
6.  **Media Sosial**: Instagram, YouTube, WhatsApp, LinkedIn, & Website UMB.

---

## 3. PEMBARUAN TATA URUTAN & SECTION BERANDA (LANDING PAGE)
Urutan section halaman beranda (`src/pages/index.astro` & `src/pages/en/index.astro`) disesuaikan menjadi:
1.  **HeroSection**: Menambahkan tombol CTA **Daftar Sekarang** (Link PMB) dan **Unduh Brosur** (Mendownload brosur KTF PDF).
2.  **Sambutan Kaprodi**: Sambutan resmi dan foto Kepala Program Studi.
3.  **InfoSingkatSection (BARU)**: Kartu neo-brutalist menampilkan informasi Gelar (S.Ds.), Beban Studi (144 SKS), dan Masa Studi (4 Tahun / 8 Semester).
4.  **TujuanPendidikanSection (MODIFIKASI)**: Menggantikan *ProgramsSection*. Menyediakan tab interaktif (PEO & PLO, Fasilitas Studio, & Struktur Kurikulum).
5.  **ProfilVideoSection (BARU)**: Menyematkan pemutar video profil YouTube KTF UMB (`9KGQkYJcwXM`) dengan bingkai premium dan deskripsi naratif.
6.  **StatsRibbon**: Update angka statistik menjadi Mahasiswa Aktif, Alumni, Dosen Pengampu, dan Mata Kuliah.
7.  **NewsEventsSection**: Update berita dan agenda terkini prodi.
8.  **ArchiveSection**: Menampilkan portofolio karya/prestasi mahasiswa.
9.  **PartnersSection**: Logo mitra kerja sama industri.
10. **EditorialSection**: Foto editorial dan kutipan inspiratif prodi.
11. **StaggerTestimonials**: Testimoni dari alumni terpilih.

---

## 4. HALAMAN BARU (SEPARATE PAGES)
Untuk mengoptimalkan performa halaman beranda, dibuat 5 halaman terpisah untuk versi Indonesia (`src/pages/*`) dan Inggris (`src/pages/en/*`):
1.  **`/tulisan-dosen`**: Menampilkan publikasi riset, buku, opini, dan jurnal ilmiah milik para dosen KTF.
2.  **`/statistik`**: Halaman rincian statistik penerimaan maba, rasio dosen-mahasiswa, dan grafik tren pendaftaran mahasiswa baru.
3.  **`/alumni`**: Profil dan testimoni alumni sukses yang bekerja di industri fashion maupun creativepreneur.
4.  **`/kegiatan-dosen`**: Galeri foto pameran kriya serat internasional dan pengabdian masyarakat (PKM).
5.  **`/kegiatan-mahasiswa`**: Dokumentasi kegiatan Himpunan Mahasiswa (SERAT), pameran kelulusan (Kriyasa), dan fashion show angkatan.

---

## 5. OPTIMASI & VERIFIKASI SERVER
*   **Perbaikan SSR/Prerendering**: Supabase client (`client.ts`) telah dimodifikasi agar tidak menginisiasi Realtime channel di sisi server (Node.js) selama build untuk menghindari crash WebSockets.
*   **Validasi Build**: Hasil kompilasi `npm run build` sukses 100% tanpa error, memproduksi 13 static pages di folder `/dist`.
