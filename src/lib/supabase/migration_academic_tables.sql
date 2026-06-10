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
  ('I', 'Pengantar Teknologi Pangan', 'Introduction to Food Technology', 2, 1),
  ('I', 'Kimia Dasar', 'General Chemistry', 3, 2),
  ('I', 'Biologi Umum', 'General Biology', 3, 3),
  ('II', 'Kimia Organik', 'Organic Chemistry', 3, 4),
  ('II', 'Mikrobiologi Umum', 'General Microbiology', 3, 5),
  ('II', 'Matematika Pangan', 'Food Mathematics', 2, 6),
  ('III', 'Kimia Pangan', 'Food Chemistry', 3, 7),
  ('III', 'Mikrobiologi Pangan', 'Food Microbiology', 3, 8),
  ('III', 'Biokimia Pangan', 'Food Biochemistry', 3, 9),
  ('IV', 'Analisis Pangan', 'Food Analysis', 3, 10),
  ('IV', 'Satuan Operasi Industri Pangan', 'Unit Operations in Food Industry', 3, 11),
  ('IV', 'Bahan Tambahan Pangan', 'Food Additives', 2, 12),
  ('V', 'Teknologi Pengolahan Pangan', 'Food Processing Technology', 4, 13),
  ('V', 'Sensoris Pangan', 'Food Sensory Evaluation', 3, 14),
  ('V', 'Peraturan & Undang-Undang Pangan', 'Food Regulations & Laws', 2, 15),
  ('VI', 'Sistem Jaminan Produk Halal', 'Halal Product Assurance System', 3, 16),
  ('VI', 'Manajemen Mutu & Keamanan Pangan', 'Food Quality & Safety Management', 3, 17),
  ('VI', 'Desain & Inovasi Produk Pangan', 'Food Product Design & Innovation', 3, 18),
  ('VII', 'Metodologi Penelitian Pangan', 'Food Research Methodology', 2, 19),
  ('VII', 'Seminar Proposal Tugas Akhir', 'Final Project Proposal Seminar', 1, 20),
  ('VII', 'Magang Industri Pangan', 'Food Industry Internship', 4, 21),
  ('VIII', 'Tugas Akhir / Skripsi', 'Final Project / Undergraduate Thesis', 6, 22)
) as v(semester, name, name_en, credits, sort_order)
where not exists (select 1 from public.kurikulum_courses limit 1);

-- 9. Seed Data Awal - CPL / PLOs
insert into public.kurikulum_plos (code, type, type_en, text, text_en, sort_order)
select * from (values
  ('CPL-01', 'Sikap & Nilai Keislaman', 'Islamic Attitude & Values', 'Mampu menginternalisasikan nilai-nilai Islam, etika profesi pangan, dan prinsip kehalalan dalam kehidupan bermasyarakat dan dunia industri.', 'Able to internalize Islamic values, food professional ethics, and halal principles in community life and the industrial world.', 1),
  ('CPL-02', 'Penguasaan Pengetahuan Sains Pangan', 'Food Science Knowledge Mastery', 'Menguasai konsep sains pangan, kimia pangan, mikrobiologi pangan, analisis pangan, gizi, dan rekayasa proses pengolahan pangan secara mendalam.', 'Mastering food science concepts, food chemistry, food microbiology, food analysis, nutrition, and food processing engineering deeply.', 2),
  ('CPL-03', 'Keterampilan Kerja Khusus', 'Specific Work Skills', 'Mampu mengaplikasikan ilmu teknologi pangan dalam merancang produk pangan halal, aman, bermutu, dan mengelola sistem penjaminan mutu (HACCP & Sertifikasi Halal).', 'Able to apply food technology science to design halal, safe, and quality food products, and manage quality assurance systems (HACCP & Halal Certification).', 3),
  ('CPL-04', 'Technopreneurship & Inovasi', 'Technopreneurship & Innovation', 'Mampu mengidentifikasi peluang bisnis pangan berbasis pangan lokal Nusantara dengan pendekatan technopreneurship sirkular berkelanjutan.', 'Able to identify food business opportunities based on local Nusantara food with a sustainable circular technopreneurship approach.', 4)
) as v(code, type, type_en, text, text_en, sort_order)
where not exists (select 1 from public.kurikulum_plos limit 1);

-- 10. Seed Data Awal - Profil Lulusan
insert into public.kurikulum_profiles (title, title_en, "desc", desc_en, sort_order)
select * from (values
  ('QA/QC & Food Safety Specialist', 'QA/QC & Food Safety Specialist', 'Profesional yang mampu menjamin mutu, keamanan, dan kehalalan produk pangan dari bahan baku hingga produk jadi di industri makanan dan minuman.', 'Professionals capable of ensuring the quality, safety, and halal integrity of food products from raw materials to finished products in the food and beverage industry.', 1),
  ('R&D & Product Development Specialist', 'R&D & Product Development Specialist', 'Inovator yang mampu merancang formulasi baru, diversifikasi pangan lokal Nusantara, serta rekayasa kemasan pangan bernilai gizi tinggi.', 'Innovators capable of designing new formulations, diversifying local Nusantara food, and engineering high-nutrition food packaging.', 2),
  ('Halal Food Auditor / Consultant', 'Halal Food Auditor / Consultant', 'Ahli bersertifikasi yang mendampingi industri pangan dan UMKM dalam mengaudit, menyusun dokumen Sistem Jaminan Produk Halal (SJPH).', 'Certified experts assisting the food industry and MSMEs in auditing and compiling Halal Product Assurance System documents.', 3),
  ('Food Technopreneur', 'Food Technopreneur', 'Wirausahawan mandiri yang mengembangkan bisnis pengolahan pangan lokal yang inovatif dengan mengedepankan aspek halal dan keberlanjutan.', 'Independent entrepreneurs developing innovative local food processing businesses prioritizing halal and sustainability aspects.', 4)
) as v(title, title_en, "desc", desc_en, sort_order)
where not exists (select 1 from public.kurikulum_profiles limit 1);

-- 11. Seed Data Awal - Tahapan Tugas Akhir
insert into public.tugas_akhir_steps (num, title, title_en, "desc", desc_en, sort_order)
select * from (values
  ('01', 'Pengajuan Judul & Proposal', 'Title & Proposal Submission', 'Mahasiswa mengajukan draf rencana penelitian beserta calon dosen pembimbing ke prodi untuk dievaluasi kesesuaian topiknya.', 'Students submit research plan drafts along with prospective advisors to the department for topic suitability evaluation.', 1),
  ('02', 'Seminar Proposal', 'Proposal Seminar', 'Pemaparan rencana penelitian di hadapan dosen penguji untuk mendapat masukan metodologi ilmiah dan kelayakan riset.', 'Presentation of research plans before examiners to receive scientific methodology feedback and research feasibility validation.', 2),
  ('03', 'Penelitian Laboratorium & Analisis', 'Lab Research & Analysis', 'Pelaksanaan eksperimen, analisis laboratorium (fisik, kimia, mikrobiologi, atau organoleptik) sesuai metodologi proposal.', 'Conducting experiments and laboratory analyses (physical, chemical, microbiological, or organoleptic) per proposal methodology.', 3),
  ('04', 'Sidang Tugas Akhir', 'Undergraduate Thesis Defense', 'Ujian lisan komprehensif untuk mempertahankan hasil penelitian, analisis data, dan kesimpulan di hadapan dewan penguji.', 'Comprehensive oral exam to defend research results, data analysis, and conclusions before the board of examiners.', 4),
  ('05', 'Revisi & Pengumpulan Berkas', 'Revision & Submission', 'Penyempurnaan draf naskah skripsi berdasarkan masukan penguji serta pengunggahan manuskrip ke repositori institusi.', 'Perfecting the thesis draft per examiners'' feedback and uploading the final manuscript to the institutional repository.', 5)
) as v(num, title, title_en, "desc", desc_en, sort_order)
where not exists (select 1 from public.tugas_akhir_steps limit 1);

-- ==========================================================
-- SELESAI! Cek hasilnya:
-- select count(*) from public.kurikulum_courses;
-- select count(*) from public.kurikulum_plos;
-- select count(*) from public.kurikulum_profiles;
-- select count(*) from public.tugas_akhir_steps;
-- ==========================================================
