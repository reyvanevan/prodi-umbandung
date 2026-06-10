-- ==========================================================
-- MIGRATION 02: Add Content Tables (Prestasi, Publikasi,
--               Kegiatan Dosen, Kegiatan Mahasiswa, Alumni,
--               Statistik Maba)
-- Safe to run on existing databases - uses IF NOT EXISTS
-- ==========================================================

-- 1. prestasi
create table if not exists public.prestasi (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('prodi', 'mahasiswa')),
  title text not null,
  title_en text,
  year text not null,
  "desc" text not null,
  desc_en text,
  host text,
  host_en text,
  competitor text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. publikasi_dosen
create table if not exists public.publikasi_dosen (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  title_en text,
  author text not null,
  journal text not null,
  journal_en text,
  year text not null,
  category text not null,
  category_en text,
  link text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. kegiatan_dosen
create table if not exists public.kegiatan_dosen (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  title_en text,
  date_text text not null,
  date_text_en text,
  location text not null,
  "desc" text not null,
  desc_en text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. kegiatan_mahasiswa
create table if not exists public.kegiatan_mahasiswa (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  title_en text,
  date_text text not null,
  date_text_en text,
  location text not null,
  "desc" text not null,
  desc_en text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. alumni
create table if not exists public.alumni (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  class_of text not null,
  class_of_en text,
  role text not null,
  company text not null,
  quote text not null,
  quote_en text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. alumni_sectors
create table if not exists public.alumni_sectors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  name_en text,
  percentage text not null,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. statistik_maba
create table if not exists public.statistik_maba (
  id uuid default gen_random_uuid() primary key,
  year text not null,
  count int not null,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.prestasi enable row level security;
alter table public.publikasi_dosen enable row level security;
alter table public.kegiatan_dosen enable row level security;
alter table public.kegiatan_mahasiswa enable row level security;
alter table public.alumni enable row level security;
alter table public.alumni_sectors enable row level security;
alter table public.statistik_maba enable row level security;

-- Drop old policies if exist
drop policy if exists "Allow public read-only access for prestasi" on public.prestasi;
drop policy if exists "Allow public read-only access for publikasi_dosen" on public.publikasi_dosen;
drop policy if exists "Allow public read-only access for kegiatan_dosen" on public.kegiatan_dosen;
drop policy if exists "Allow public read-only access for kegiatan_mahasiswa" on public.kegiatan_mahasiswa;
drop policy if exists "Allow public read-only access for alumni" on public.alumni;
drop policy if exists "Allow public read-only access for alumni_sectors" on public.alumni_sectors;
drop policy if exists "Allow public read-only access for statistik_maba" on public.statistik_maba;

drop policy if exists "Allow admin write access for prestasi" on public.prestasi;
drop policy if exists "Allow admin write access for publikasi_dosen" on public.publikasi_dosen;
drop policy if exists "Allow admin write access for kegiatan_dosen" on public.kegiatan_dosen;
drop policy if exists "Allow admin write access for kegiatan_mahasiswa" on public.kegiatan_mahasiswa;
drop policy if exists "Allow admin write access for alumni" on public.alumni;
drop policy if exists "Allow admin write access for alumni_sectors" on public.alumni_sectors;
drop policy if exists "Allow admin write access for statistik_maba" on public.statistik_maba;

-- Public read policies
create policy "Allow public read-only access for prestasi" on public.prestasi for select using (true);
create policy "Allow public read-only access for publikasi_dosen" on public.publikasi_dosen for select using (true);
create policy "Allow public read-only access for kegiatan_dosen" on public.kegiatan_dosen for select using (true);
create policy "Allow public read-only access for kegiatan_mahasiswa" on public.kegiatan_mahasiswa for select using (true);
create policy "Allow public read-only access for alumni" on public.alumni for select using (true);
create policy "Allow public read-only access for alumni_sectors" on public.alumni_sectors for select using (true);
create policy "Allow public read-only access for statistik_maba" on public.statistik_maba for select using (true);

-- Admin write policies
create policy "Allow admin write access for prestasi" on public.prestasi for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for publikasi_dosen" on public.publikasi_dosen for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for kegiatan_dosen" on public.kegiatan_dosen for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for kegiatan_mahasiswa" on public.kegiatan_mahasiswa for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for alumni" on public.alumni for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for alumni_sectors" on public.alumni_sectors for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for statistik_maba" on public.statistik_maba for all using (auth.role() = 'authenticated');

-- Seed data (only if tables are empty)

-- Seed prestasi
insert into public.prestasi (type, title, title_en, year, "desc", desc_en, host, host_en, competitor, image_url, sort_order)
select * from (values
  ('prodi', 'Akreditasi Nasional BAN-PT ''Baik Sekali''', 'National BAN-PT ''Baik Sekali'' Accreditation', '2024',
   'Berhasil memperoleh predikat akreditasi ''Baik Sekali'' atas standar sarana laboratorium dan kesesuaian kurikulum Teknologi Pangan Halal.',
   'Achieved the superior ''Baik Sekali'' standard for laboratory facilities and curriculum alignment in Halal Food Technology.',
   null, null, null, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop', 1),
  ('prodi', 'Sertifikasi ISO 17025 Laboratorium Pangan Halal', 'Halal Food Lab ISO 17025 Certification', '2023',
   'Laboratorium resmi terakreditasi untuk pengujian keamanan pangan, nutrisi, dan komposisi kimia bahan pertanian lokal.',
   'Officially certified laboratory for testing food safety, nutrition, and chemical composition of local agricultural materials.',
   null, null, null, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop', 2),
  ('prodi', 'Penerima Hibah Riset Kemendikbudristek Biorefinery Sirkular', 'Kemendikbud Research Grant on Circular Biorefinery', '2024',
   'Memperoleh pendanaan riset nasional untuk pemanfaatan limbah pertanian lokal menjadi kemasan pangan fungsional.',
   'Received national funding for utilizing local agricultural waste into functional food packaging.',
   null, null, null, 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop', 3),
  ('mahasiswa', 'Juara I Medali Emas // Kompetisi Inovasi Pangan Nasional', '1st Place Gold Medal // National Food Innovation Competition', '2024',
   'Mengembangkan produk biskuit fungsional padat gizi berbasis tepung hanjeli dan kacang merah lokal.',
   'Developed a nutrient-dense functional biscuit from local Hanjeli seeds and red kidney beans.',
   'Kementerian Pertanian (Kementan)', 'Ministry of Agriculture (Kementan)', 'Aditya Pratama & Tim',
   'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop', 4),
  ('mahasiswa', 'Produk Fungsional Terbaik // Pameran Hari Pangan Sedunia', 'Best Functional Product // World Food Day Exhibition', '2023',
   'Membuat kemasan aktif edible film ramah lingkungan berbahan pati tapioka dan ekstrak kulit manggis.',
   'Created edible active packaging films using cassava starch and mangosteen peel extract.',
   'Perhimpunan Ahli Teknologi Pangan Indonesia (PATPI)', 'PATPI', 'Siti Rahma & Tim',
   'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop', 5),
  ('mahasiswa', 'Pemenang Penghargaan Wirausaha Halal Muda', 'Winner of Young Halal Technopreneur Award', '2024',
   'Penghargaan atas perancangan model bisnis dan sistem produksi skala industri bumbu organik lokal.',
   'Recognized for developing a startup model focused on scale-up production of local organic condiments.',
   'Halal Science Center & MUI', 'Halal Science Center & MUI', 'Rifqi Fauzan',
   'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop', 6)
) as v(type, title, title_en, year, "desc", desc_en, host, host_en, competitor, image_url, sort_order)
where not exists (select 1 from public.prestasi limit 1);

-- Seed publikasi_dosen
insert into public.publikasi_dosen (title, title_en, author, journal, journal_en, year, category, category_en, link, sort_order)
select * from (values
  ('Optimasi Pengeringan Terfluidisasi Tepung Mocaf Nusantara Berbasis Energi Surya',
   'Optimizing Solar-Assisted Fluidized Bed Drying of Nusantara Mocaf Flour',
   'Dr. Khairiah, S.P., M.T.',
   'Jurnal Teknologi & Industri Pangan Nusantara, Vol. 12 No. 2',
   'Journal of Food Technology & Industry Nusantara, Vol. 12 No. 2',
   '2025', 'JURNAL NASIONAL', 'NATIONAL JOURNAL', 'https://sinta.kemdiktisaintek.go.id/', 1),
  ('Deteksi Cepat Kontaminasi Bakteri Escherichia coli pada Bahan Pangan Basah Menggunakan Sensor Elektrokimia',
   'Rapid Detection of Escherichia coli in Fresh Produce Using Electrochemical Sensors',
   'Dr. Saepul Adnan, S.Si., M.Si.',
   'Seminar Nasional Inovasi Pangan Halal (SNIPH)',
   'National Seminar on Halal Food Innovation (SNIPH)',
   '2024', 'PROSIDING SEMINAR', 'SEMINAR PROCEEDINGS', 'https://sinta.kemdiktisaintek.go.id/', 2),
  ('Nutritional Value, Fiber Content, and Sensory Evaluation of Functional Cookies Based on Hanjeli and Red Kidney Bean Flour',
   null,
   'Hanif Alamudin Manshur, S.Gz., M.Si.',
   'International Journal of Food Science and Nutrition Technology',
   null,
   '2024', 'JURNAL INTERNASIONAL', 'INTERNATIONAL JOURNAL', 'https://sinta.kemdiktisaintek.go.id/', 3)
) as v(title, title_en, author, journal, journal_en, year, category, category_en, link, sort_order)
where not exists (select 1 from public.publikasi_dosen limit 1);

-- Seed kegiatan_dosen
insert into public.kegiatan_dosen (title, title_en, date_text, date_text_en, location, "desc", desc_en, image_url, sort_order)
select * from (values
  ('Konferensi Internasional Pangan Halal & Biorefinery 2025', 'International Conference on Halal Food & Biorefinery 2025',
   '12 Maret 2025', 'March 12, 2025', 'Kuala Lumpur, Malaysia',
   'Dosen Teknologi Pangan mempresentasikan riset tentang edible coating berbasis kitosan lokal untuk memperpanjang umur simpan buah tropis.',
   'Faculty presented research on chitosan-based edible coatings to extend tropical fruits shelf life at a global food science symposium.',
   '/assets/kegiatan-d1.png', 1),
  ('Workshop Penerapan HACCP & Sertifikasi Halal Asosiasi UMKM Pangan', 'HACCP & Halal Certification Training for Food MSMEs',
   '18 Oktober 2024', 'October 18, 2024', 'Soreang, Bandung',
   'PKM berupa pelatihan teknis standardisasi higienitas sanitasi dan analisis titik kritis haram untuk membantu UMKM pangan lokal.',
   'A Public Service initiative providing technical guidance on hygiene standardization and critical point analysis to help food MSMEs.',
   '/assets/kegiatan-d2.png', 2),
  ('Riset Kolaborasi Pemanfaatan Limbah Kulit Kakao Bersama BRIN', 'Joint Research on Cocoa Shell Bioactive Extraction with BRIN',
   '04 Juni 2024', 'June 04, 2024', 'BRIN Food Processing Lab, Serpong',
   'Kolaborasi riset dosen dalam menguji rekayasa ekstraksi senyawa aktif antioksidan dari limbah pertanian kulit kakao untuk aplikasi pangan fungsional.',
   'A strategic research collaboration testing extraction of antioxidant compounds from cocoa shell waste for functional food applications.',
   '/assets/kegiatan-d3.png', 3)
) as v(title, title_en, date_text, date_text_en, location, "desc", desc_en, image_url, sort_order)
where not exists (select 1 from public.kegiatan_dosen limit 1);

-- Seed kegiatan_mahasiswa
insert into public.kegiatan_mahasiswa (title, title_en, date_text, date_text_en, location, "desc", desc_en, image_url, sort_order)
select * from (values
  ('FOODTECH 2026: Capstone Product & Halal Food Expo', 'FOODTECH 2026: Capstone Product & Halal Food Expo',
   '24-28 Februari 2026', 'February 24-28, 2026', 'Gedung Rektorat UMB, Bandung',
   'Pameran karya kelulusan proyek akhir mahasiswa angkatan pertama, menampilkan formulasi produk pangan baru dan desain pabrik pangan sirkular.',
   'The premier graduation project exhibition showcasing the masterpiece innovations of students, highlighting new food formulations and circular biorefinery designs.',
   '/assets/kegiatan-m1.png', 1),
  ('National Food Innovation Competition (NFIC): Inovasi Produk Pangan Lokal', 'National Food Innovation Competition (NFIC): Local Resource Formulation',
   '05 Maret 2026', 'March 05, 2026', 'Bandung Tech Hall, Bandung',
   'Kompetisi inovasi produk pangan fungsional tingkat nasional untuk melatih kemampuan rekayasa formula bahan lokal dalam 24 jam.',
   'An intensive national product development competition to formulate functional food from local agricultural resources in 24 hours.',
   '/assets/kegiatan-m2.png', 2),
  ('HIMATEPA Food Safety Camp: Edukasi Sanitasi & Higiene UMKM Pangan', 'HIMATEPA Food Safety Camp: Hygiene & Sanitation Training for MSMEs',
   '14 November 2025', 'November 14, 2025', 'Kampus UMB, Bandung',
   'Program reguler Himpunan Mahasiswa memberikan penyuluhan sanitasi higiene pengolahan pangan dan alur sertifikasi produk halal bagi UMKM pangan lokal.',
   'A public community service campaign by HIMATEPA, introducing food safety and halal audit workflows to local culinary MSMEs.',
   '/assets/kegiatan-m3.png', 3)
) as v(title, title_en, date_text, date_text_en, location, "desc", desc_en, image_url, sort_order)
where not exists (select 1 from public.kegiatan_mahasiswa limit 1);

-- Seed alumni
insert into public.alumni (name, class_of, class_of_en, role, company, quote, quote_en, image_url, sort_order)
select * from (values
  ('Amelia Rahma, S.TP.', 'Angkatan 2019', 'Class of 2019', 'Lead R&D Specialist', 'PT Garudafood Putra Putri Jaya Tbk',
   'Di sini, saya diajarkan kimia pangan, evaluasi sensoris, dan desain pabrik pangan secara mendalam. Ini sangat membantu saya memimpin formulasi produk baru bersertifikasi halal.',
   'Here, I was taught food chemistry, sensory evaluation, and factory design in depth. This greatly helped me lead new halal-certified food product formulations.',
   '/assets/alumni-1.png', 1),
  ('Bagus Pratama, S.TP.', 'Angkatan 2020', 'Class of 2020', 'Founder & CEO', 'Bumi Halal Nusantara (Food Startup)',
   'Kurikulum technopreneurship pangan dan riset inovasi bahan lokal melatih mental bisnis saya untuk mendirikan usaha pengolahan pangan berkelanjutan.',
   'The food technopreneurship curriculum and research on local crops shaped my business mindset to build a sustainable circular food business.',
   '/assets/alumni-2.png', 2),
  ('Risa Fitria, S.TP.', 'Angkatan 2019', 'Class of 2019', 'QA/QC & Halal Auditor', 'PT Indofood Sukses Makmur Tbk',
   'Integrasi sertifikasi HACCP dan sistem jaminan halal secara langsung di mata kuliah memberikan saya keunggulan kompetitif yang kuat di industri pangan multinasional.',
   'Integrating HACCP and Halal assurance directly into the curriculum gave me a strong edge to excel in international food processing companies.',
   '/assets/alumni-3.png', 3)
) as v(name, class_of, class_of_en, role, company, quote, quote_en, image_url, sort_order)
where not exists (select 1 from public.alumni limit 1);

-- Seed alumni_sectors
insert into public.alumni_sectors (name, name_en, percentage, sort_order)
select * from (values
  ('Industri Pengolahan & Manufaktur Pangan', 'Food Processing & Manufacturing Industry', '45%', 1),
  ('Riset, QA/QC, & Pengembangan Produk (R&D)', 'Research, QA/QC, & Product Development (R&D)', '30%', 2),
  ('Wirausaha Pangan & Technopreneurship', 'Food Startups & Technopreneurship', '15%', 3),
  ('Lembaga Sertifikasi Halal & Auditor Regulasi Pangan', 'Halal Certification & Food Regulatory Auditing', '10%', 4)
) as v(name, name_en, percentage, sort_order)
where not exists (select 1 from public.alumni_sectors limit 1);

-- Seed statistik_maba
insert into public.statistik_maba (year, count, sort_order)
select * from (values
  ('2021', 42, 1),
  ('2022', 45, 2),
  ('2023', 50, 3),
  ('2024', 55, 4),
  ('2025', 58, 5)
) as v(year, count, sort_order)
where not exists (select 1 from public.statistik_maba limit 1);

-- ==========================================================
-- DONE! Verify:
-- select count(*) from public.prestasi;
-- select count(*) from public.publikasi_dosen;
-- select count(*) from public.kegiatan_dosen;
-- select count(*) from public.kegiatan_mahasiswa;
-- select count(*) from public.alumni;
-- select count(*) from public.alumni_sectors;
-- select count(*) from public.statistik_maba;
-- ==========================================================
