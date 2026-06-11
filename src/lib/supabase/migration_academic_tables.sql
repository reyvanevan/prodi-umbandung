-- ==========================================================
-- MIGRATION: Add Academic Data Tables
-- Safe to run on existing databases - does NOT truncate
-- existing data (news, events, dosen, site_content, dll.)
-- ==========================================================
-- Jalankan di Supabase SQL Editor
-- ==========================================================

-- 1. Buat tabel kurikulum_courses (jika belum ada)
create table if not exists public.kurikulum_courses (
  id uuid default gen_random_uuid() primary key,
  semester text not null,
  name text not null,
  name_en text,
  credits int not null,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Buat tabel kurikulum_plos (jika belum ada)
create table if not exists public.kurikulum_plos (
  id uuid default gen_random_uuid() primary key,
  code text not null,
  type text not null,
  type_en text,
  text text not null,
  text_en text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Buat tabel kurikulum_profiles (jika belum ada)
create table if not exists public.kurikulum_profiles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  title_en text,
  "desc" text not null,
  desc_en text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Buat tabel tugas_akhir_steps (jika belum ada)
create table if not exists public.tugas_akhir_steps (
  id uuid default gen_random_uuid() primary key,
  num text not null,
  title text not null,
  title_en text,
  "desc" text not null,
  desc_en text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable Row Level Security
alter table public.kurikulum_courses enable row level security;
alter table public.kurikulum_plos enable row level security;
alter table public.kurikulum_profiles enable row level security;
alter table public.tugas_akhir_steps enable row level security;

-- 6. Drop policies lama (antisipasi jika pernah dibuat sebelumnya)
drop policy if exists "Allow public read-only access for kurikulum_courses" on public.kurikulum_courses;
drop policy if exists "Allow public read-only access for kurikulum_plos" on public.kurikulum_plos;
drop policy if exists "Allow public read-only access for kurikulum_profiles" on public.kurikulum_profiles;
drop policy if exists "Allow public read-only access for tugas_akhir_steps" on public.tugas_akhir_steps;

drop policy if exists "Allow admin write access for kurikulum_courses" on public.kurikulum_courses;
drop policy if exists "Allow admin write access for kurikulum_plos" on public.kurikulum_plos;
drop policy if exists "Allow admin write access for kurikulum_profiles" on public.kurikulum_profiles;
drop policy if exists "Allow admin write access for tugas_akhir_steps" on public.tugas_akhir_steps;

-- 7. Buat RLS Policies baru
-- Public bisa baca (SELECT)
create policy "Allow public read-only access for kurikulum_courses" on public.kurikulum_courses for select using (true);
create policy "Allow public read-only access for kurikulum_plos" on public.kurikulum_plos for select using (true);
create policy "Allow public read-only access for kurikulum_profiles" on public.kurikulum_profiles for select using (true);
create policy "Allow public read-only access for tugas_akhir_steps" on public.tugas_akhir_steps for select using (true);

-- Admin yang login bisa insert/update/delete
create policy "Allow admin write access for kurikulum_courses" on public.kurikulum_courses for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for kurikulum_plos" on public.kurikulum_plos for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for kurikulum_profiles" on public.kurikulum_profiles for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for tugas_akhir_steps" on public.tugas_akhir_steps for all using (auth.role() = 'authenticated');

-- 8. Seed Data Awal - Mata Kuliah
-- (hanya diisi jika tabel masih kosong)
insert into public.kurikulum_courses (semester, name, name_en, credits, sort_order)
select * from (values
  ('I', 'Pengantar Seni Kriya & Desain', 'Introduction to Craft & Design', 3, 1),
  ('I', 'Nirmana 2D', '2D Design Principles (Nirmana)', 3, 2),
  ('I', 'Menggambar Rupa', 'Figure Drawing', 3, 3),
  ('II', 'Nirmana 3D', '3D Design Principles (Nirmana)', 3, 4),
  ('II', 'Sejarah Tekstil & Mode', 'History of Textiles & Fashion', 3, 5),
  ('II', 'Pengetahuan Serat & Tekstil', 'Fiber & Textile Science', 2, 6),
  ('III', 'Desain Permukaan (Batik & Shibori)', 'Surface Design (Batik & Shibori)', 3, 7),
  ('III', 'Desain Struktur (Tenun & Anyam)', 'Structure Design (Weaving & Basketry)', 3, 8),
  ('III', 'Ilustrasi Fashion', 'Fashion Illustration', 3, 9),
  ('IV', 'Pola & Konstruksi Busana', 'Pattern Drafting & Garment Construction', 3, 10),
  ('IV', 'Teknik Pewarnaan Alami', 'Natural Dyeing Techniques', 3, 11),
  ('IV', 'Tekstil Kontemporer', 'Contemporary Textiles', 2, 12),
  ('V', 'Desain Mode (Ready-to-Wear)', 'Fashion Design (Ready-to-Wear)', 4, 13),
  ('V', 'Trend Forecasting & Fashion Styling', 'Trend Forecasting & Fashion Styling', 3, 14),
  ('V', 'Fotografi Produk & Mode', 'Product & Fashion Photography', 2, 15),
  ('VI', 'Sustainable Fashion & Circular Craft', 'Sustainable Fashion & Circular Craft', 3, 16),
  ('VI', 'Creativepreneurship & Portofolio', 'Creativepreneurship & Portfolio', 3, 17),
  ('VI', 'Eksperimen Material Tekstil', 'Textile Material Experimentation', 3, 18),
  ('VII', 'Metodologi Penelitian Seni & Desain', 'Art & Design Research Methodology', 2, 19),
  ('VII', 'Seminar Proposal Tugas Akhir', 'Final Project Proposal Seminar', 1, 20),
  ('VII', 'Magang Industri Kreatif / Fashion Studio', 'Creative Industry / Fashion Studio Internship', 4, 21),
  ('VIII', 'Tugas Akhir / Karya Mandiri & Skripsi', 'Final Capstone Project / Thesis', 6, 22)
) as v(semester, name, name_en, credits, sort_order)
where not exists (select 1 from public.kurikulum_courses limit 1);

-- 9. Seed Data Awal - CPL / PLOs
insert into public.kurikulum_plos (code, type, type_en, text, text_en, sort_order)
select * from (values
  ('CPL-01', 'Sikap & Nilai Keislaman', 'Islamic Attitude & Values', 'Mampu menginternalisasikan nilai-nilai Islam, etika profesi desain, dan prinsip keberlanjutan dalam kehidupan bermasyarakat dan dunia industri kreatif.', 'Able to internalize Islamic values, design professional ethics, and sustainability principles in community life and the creative industry.', 1),
  ('CPL-02', 'Penguasaan Pengetahuan Kriya & Mode', 'Craft & Fashion Knowledge Mastery', 'Menguasai konsep sejarah kriya, teori warna, trend forecasting, material serat, serta teknik konstruksi tekstil secara mendalam.', 'Mastering craft history concepts, color theory, trend forecasting, fiber materials, and textile construction techniques deeply.', 2),
  ('CPL-03', 'Keterampilan Kerja Khusus Desain', 'Specific Design Work Skills', 'Mampu merancang karya kriya tekstil (surface dan structure) serta koleksi busana yang inovatif berbasis kearifan lokal dan ramah lingkungan.', 'Able to design textile craft works (surface and structure) and innovative fashion collections based on local wisdom and eco-friendly principles.', 3),
  ('CPL-04', 'Creativepreneurship & Inovasi', 'Creativepreneurship & Innovation', 'Mampu mengidentifikasi peluang pasar dan membangun bisnis kreatif mandiri (brand fashion/kriya) berbasis technopreneurship budaya.', 'Able to identify market opportunities and build independent creative businesses (fashion/craft brand) based on cultural technopreneurship.', 4)
) as v(code, type, type_en, text, text_en, sort_order)
where not exists (select 1 from public.kurikulum_plos limit 1);

-- 10. Seed Data Awal - Profil Lulusan
insert into public.kurikulum_profiles (title, title_en, "desc", desc_en, sort_order)
select * from (values
  ('Fashion / Textile Designer', 'Fashion / Textile Designer', 'Profesional yang merancang motif tekstil atau koleksi busana siap pakai untuk industri fashion nasional dan global.', 'Professionals who design textile motifs or ready-to-wear fashion collections for the national and global fashion industry.', 1),
  ('Contemporary Craft Artist / Maker', 'Contemporary Craft Artist / Maker', 'Seniman kriya independen yang menciptakan karya seni serat, instalasi tekstil, serta produk kerajinan tangan bernilai seni tinggi.', 'Independent craft artists who create fiber art, textile installations, and high-value handmade craft products.', 2),
  ('Fashion Stylist & Visual Merchandiser', 'Fashion Stylist & Visual Merchandiser', 'Ahli yang menyusun konsep visual untuk photoshoot, pameran produk di butik, dan pengarah gaya mode media.', 'Experts who curate visual concepts for photo shoots, boutique product exhibitions, and media fashion styling.', 3),
  ('Creativepreneur (Craft & Fashion)', 'Creativepreneur (Craft & Fashion)', 'Wirausahawan mandiri yang mendirikan brand fashion ramah lingkungan atau bisnis kriya berbasis pemberdayaan komunitas lokal.', 'Independent entrepreneurs who establish eco-friendly fashion brands or craft businesses based on local community empowerment.', 4)
) as v(title, title_en, "desc", desc_en, sort_order)
where not exists (select 1 from public.kurikulum_profiles limit 1);

-- 11. Seed Data Awal - Tahapan Tugas Akhir
insert into public.tugas_akhir_steps (num, title, title_en, "desc", desc_en, sort_order)
select * from (values
  ('01', 'Pengajuan Konsep Karya & Proposal', 'Concept & Proposal Submission', 'Mahasiswa mengajukan draf rencana karya kriya/busana beserta outline konsep visual untuk dievaluasi oleh prodi.', 'Students submit craft/fashion research drafts along with a visual concept outline to the department for evaluation.', 1),
  ('02', 'Seminar Proposal Desain', 'Design Proposal Seminar', 'Pemaparan rencana desain, moodboard, sketsa awal, dan pemilihan material di hadapan dosen penguji.', 'Presentation of design plans, moodboard, initial sketches, and material selection before examiners.', 2),
  ('03', 'Pengerjaan Studio & Eksperimen', 'Studio Work & Experimentation', 'Proses pembuatan karya (weaving, dyeing, sewing) and eksperimen material di studio kriya.', 'Fabrication process (weaving, dyeing, sewing) and material experimentation in the craft studio.', 3),
  ('04', 'Sidang Karya & Pameran', 'Undergraduate Thesis & Exhibition Defense', 'Pertanggungjawaban hasil karya, konsep teoritis, dan display pameran di hadapan dewan penguji.', 'Defending the completed work, theoretical concept, and exhibition display before the board of examiners.', 4),
  ('05', 'Revisi & Pengarsipan Portofolio', 'Revision & Portfolio Archiving', 'Penyempurnaan laporan tertulis dan dokumentasi karya foto resolusi tinggi untuk portofolio digital lulusan.', 'Perfecting the written report and high-resolution work documentation for the graduate''s digital portfolio.', 5)
) as v(num, title, title_en, "desc", desc_en, sort_order)
where not exists (select 1 from public.tugas_akhir_steps limit 1);

-- ==========================================================
-- SELESAI! Cek hasilnya:
-- select count(*) from public.kurikulum_courses;
-- select count(*) from public.kurikulum_plos;
-- select count(*) from public.kurikulum_profiles;
-- select count(*) from public.tugas_akhir_steps;
-- ==========================================================
