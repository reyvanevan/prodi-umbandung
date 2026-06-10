-- 1. Create news table
create table if not exists public.news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  title_en text,
  category text not null,
  category_en text,
  snippet text not null,
  snippet_en text,
  date text not null,
  img_src text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create events table
create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  date_day text not null,
  date_month text not null,
  title text not null,
  title_en text,
  location text not null,
  location_en text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create testimonials table
create table if not exists public.testimonials (
  id uuid default gen_random_uuid() primary key,
  testimonial text not null,
  testimonial_en text,
  by text not null,
  by_en text,
  img_src text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create partners table
create table if not exists public.partners (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Create landing_stats table
create table if not exists public.landing_stats (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  label text not null,
  label_en text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Create landing_portfolio_items table
create table if not exists public.landing_portfolio_items (
  id uuid primary key default gen_random_uuid(),
  image text not null,
  title text not null,
  medium text not null,
  technique text not null,
  year text not null,
  "gridClass" text not null,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Create site_content table
create table if not exists public.site_content (
  key text primary key,
  value text not null,
  value_en text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Create landing_partners table
create table if not exists public.landing_partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. Create dosen table
create table if not exists public.dosen (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  img_src text,
  scopus text,
  sinta text,
  scholar text,
  facebook text,
  twitter text,
  tiktok text,
  instagram text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. Create kurikulum_courses table
create table if not exists public.kurikulum_courses (
  id uuid default gen_random_uuid() primary key,
  semester text not null,
  name text not null,
  name_en text,
  credits int not null,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 11. Create kurikulum_plos table
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

-- 12. Create kurikulum_profiles table
create table if not exists public.kurikulum_profiles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  title_en text,
  "desc" text not null,
  desc_en text,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 13. Create tugas_akhir_steps table
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

-- Enable Row Level Security (RLS) for all tables
alter table public.news enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;
alter table public.partners enable row level security;
alter table public.landing_stats enable row level security;
alter table public.landing_portfolio_items enable row level security;
alter table public.site_content enable row level security;
alter table public.landing_partners enable row level security;
alter table public.dosen enable row level security;
alter table public.kurikulum_courses enable row level security;
alter table public.kurikulum_plos enable row level security;
alter table public.kurikulum_profiles enable row level security;
alter table public.tugas_akhir_steps enable row level security;

-- Drop policies if they already exist
drop policy if exists "Allow public read-only access for news" on public.news;
drop policy if exists "Allow public read-only access for events" on public.events;
drop policy if exists "Allow public read-only access for testimonials" on public.testimonials;
drop policy if exists "Allow public read-only access for partners" on public.partners;
drop policy if exists "Allow public read-only access for landing_stats" on public.landing_stats;
drop policy if exists "Allow public read-only access for landing_portfolio_items" on public.landing_portfolio_items;
drop policy if exists "Allow public read-only access for site_content" on public.site_content;
drop policy if exists "Allow public read-only access for landing_partners" on public.landing_partners;
drop policy if exists "Allow public read-only access for dosen" on public.dosen;
drop policy if exists "Allow public read-only access for kurikulum_courses" on public.kurikulum_courses;
drop policy if exists "Allow public read-only access for kurikulum_plos" on public.kurikulum_plos;
drop policy if exists "Allow public read-only access for kurikulum_profiles" on public.kurikulum_profiles;
drop policy if exists "Allow public read-only access for tugas_akhir_steps" on public.tugas_akhir_steps;

drop policy if exists "Allow admin write access for news" on public.news;
drop policy if exists "Allow admin write access for events" on public.events;
drop policy if exists "Allow admin write access for testimonials" on public.testimonials;
drop policy if exists "Allow admin write access for partners" on public.partners;
drop policy if exists "Allow admin write access for landing_stats" on public.landing_stats;
drop policy if exists "Allow admin write access for landing_portfolio_items" on public.landing_portfolio_items;
drop policy if exists "Allow admin write access for site_content" on public.site_content;
drop policy if exists "Allow admin write access for landing_partners" on public.landing_partners;
drop policy if exists "Allow admin write access for dosen" on public.dosen;
drop policy if exists "Allow admin write access for kurikulum_courses" on public.kurikulum_courses;
drop policy if exists "Allow admin write access for kurikulum_plos" on public.kurikulum_plos;
drop policy if exists "Allow admin write access for kurikulum_profiles" on public.kurikulum_profiles;
drop policy if exists "Allow admin write access for tugas_akhir_steps" on public.tugas_akhir_steps;

-- Create Read policies (Public Select)
create policy "Allow public read-only access for news" on public.news for select using (true);
create policy "Allow public read-only access for events" on public.events for select using (true);
create policy "Allow public read-only access for testimonials" on public.testimonials for select using (true);
create policy "Allow public read-only access for partners" on public.partners for select using (true);
create policy "Allow public read-only access for landing_stats" on public.landing_stats for select using (true);
create policy "Allow public read-only access for landing_portfolio_items" on public.landing_portfolio_items for select using (true);
create policy "Allow public read-only access for site_content" on public.site_content for select using (true);
create policy "Allow public read-only access for landing_partners" on public.landing_partners for select using (true);
create policy "Allow public read-only access for dosen" on public.dosen for select using (true);
create policy "Allow public read-only access for kurikulum_courses" on public.kurikulum_courses for select using (true);
create policy "Allow public read-only access for kurikulum_plos" on public.kurikulum_plos for select using (true);
create policy "Allow public read-only access for kurikulum_profiles" on public.kurikulum_profiles for select using (true);
create policy "Allow public read-only access for tugas_akhir_steps" on public.tugas_akhir_steps for select using (true);

-- Create Write policies (Authenticated Admin only)
create policy "Allow admin write access for news" on public.news for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for events" on public.events for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for partners" on public.partners for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for landing_stats" on public.landing_stats for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for landing_portfolio_items" on public.landing_portfolio_items for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for site_content" on public.site_content for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for landing_partners" on public.landing_partners for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for dosen" on public.dosen for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for kurikulum_courses" on public.kurikulum_courses for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for kurikulum_plos" on public.kurikulum_plos for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for kurikulum_profiles" on public.kurikulum_profiles for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for tugas_akhir_steps" on public.tugas_akhir_steps for all using (auth.role() = 'authenticated');

-- Clean existing data before seeding
truncate table public.news restart identity cascade;
truncate table public.events restart identity cascade;
truncate table public.testimonials restart identity cascade;
truncate table public.partners restart identity cascade;
truncate table public.landing_stats restart identity cascade;
truncate table public.landing_portfolio_items restart identity cascade;
truncate table public.site_content restart identity cascade;
truncate table public.landing_partners restart identity cascade;
truncate table public.dosen restart identity cascade;
truncate table public.kurikulum_courses restart identity cascade;
truncate table public.kurikulum_plos restart identity cascade;
truncate table public.kurikulum_profiles restart identity cascade;
truncate table public.tugas_akhir_steps restart identity cascade;

-- Seed Partners
insert into public.partners (name) values
  ('PT Garudafood Putra Putri Jaya Tbk'),
  ('PT Indofood Sukses Makmur Tbk'),
  ('PT Nestlé Indonesia'),
  ('Badan Pengawas Obat dan Makanan (BPOM)'),
  ('Ikatan Ahli Teknologi Pangan Indonesia (IATPI)'),
  ('Balai Penelitian Tanaman Serealia (Balitsereal)');

-- Seed Events
insert into public.events (date_day, date_month, title, title_en, location, location_en) values
  ('20', 'JUN', 'PANGAN FEST 2026: Expo Inovasi Produk Pangan Halal Mahasiswa', 'PANGAN FEST 2026: Student Halal Food Innovation Product Expo', 'Aula Utama KH. Ahmad Dahlan, UMB Bandung', 'KH. Ahmad Dahlan Main Hall, UMB Bandung'),
  ('28', 'JUN', 'Workshop Uji Organoleptik & Analisis Sensori Produk Pangan', 'Workshop: Organoleptic Testing & Food Product Sensory Analysis', 'Lab Teknologi Pangan Gedung UMB', 'UMB Building Food Technology Laboratory'),
  ('10', 'JUL', 'Kuliah Umum: Pangan Halal & Sertifikasi BPOM di Era Industri 4.0', 'Public Lecture: Halal Food & BPOM Certification in Industry 4.0', 'Auditorium Utama UMB Bandung', 'UMB Bandung Main Auditorium');

-- Seed Testimonials
insert into public.testimonials (testimonial, testimonial_en, by, by_en, img_src) values
  ('Kurikulum Teknologi Pangan UMB yang mengintegrasikan konsep halalan thayyiban sangat relevan dan membuat saya siap kerja di industri pangan nasional.', 'The UMB Food Technology curriculum integrating the halalan thayyiban concept is highly relevant and prepared me for work in the national food industry.', 'Nurul Fadilah, S.TP. (Quality Assurance di PT Garudafood)', 'Nurul Fadilah, S.TP. (Quality Assurance at PT Garudafood)', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'),
  ('Program magang industri pangan memberi saya pengalaman nyata proses produksi, sanitasi, dan pengendalian mutu yang langsung dipraktikkan di lapangan.', 'The food industry internship program gave me real-world experience in production processes, sanitation, and quality control directly applied in the field.', 'Rizky Pratama, S.TP. (R&D Specialist di PT Indofood)', 'Rizky Pratama, S.TP. (R&D Specialist at PT Indofood)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'),
  ('Riset berbasis pangan lokal Nusantara yang diajarkan dosen UMB membuka mata saya bahwa kekayaan bahan pangan Indonesia sangat luar biasa untuk dikembangkan.', 'Research based on local Nusantara food taught by UMB lecturers opened my eyes to how remarkable Indonesia''s wealth of food ingredients is to be developed.', 'Siti Aisyah, S.TP. (Food Scientist di Balai Besar Industri Agro)', 'Siti Aisyah, S.TP. (Food Scientist at Center for Agro-Based Industry)', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'),
  ('Pendekatan technopreneurship yang kuat membuat saya berani membuka usaha pengolahan pangan lokal khas Bandung sendiri setelah lulus.', 'The strong technopreneurship approach gave me the courage to start my own local Bandung food processing business after graduation.', 'Ahmad Fauzi, S.TP. (Wirausahawan Pangan & Pendiri Brand Produk Lokal)', 'Ahmad Fauzi, S.TP. (Food Entrepreneur & Local Brand Founder)', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'),
  ('Bimbingan dosen yang intensif dalam penelitian hanjeli dan pangan fungsional benar-benar mengasah kemampuan riset saya sejak semester awal.', 'Intensive lecturer mentoring in hanjeli and functional food research truly honed my research skills from the very first semester.', 'Dian Pertiwi, S.TP. (Peneliti di Badan Riset dan Inovasi Nasional)', 'Dian Pertiwi, S.TP. (Researcher at National Research and Innovation Agency)', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'),
  ('Sertifikasi halal yang menjadi DNA program studi ini sangat membantu karir saya di divisi regulatory affairs perusahaan multinasional.', 'The halal certification expertise that is the DNA of this study program greatly helped my career in the regulatory affairs division of a multinational company.', 'Farhan Maulana, S.TP. (Regulatory Affairs Specialist di PT Nestlé Indonesia)', 'Farhan Maulana, S.TP. (Regulatory Affairs Specialist at PT Nestlé Indonesia)', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop');

-- Seed News
insert into public.news (title, title_en, category, category_en, snippet, snippet_en, date, img_src) values
  ('Inovasi Produk Tepung Hanjeli UMB Raih Penghargaan di Pameran Pangan Nasional', 'UMB Hanjeli Flour Innovation Wins Award at National Food Exhibition', 'PRESTASI MAHASISWA', 'STUDENT ACHIEVEMENT', 'Produk olahan tepung hanjeli hasil riset kolaboratif dosen dan mahasiswa Teknologi Pangan UMB berhasil meraih medali emas di ajang pameran inovasi pangan nasional.', 'Hanjeli flour products from collaborative research by UMB Food Technology lecturers and students won a gold medal at the national food innovation exhibition.', '03 JUN 2026', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop'),
  ('Kuliah Umum Bersama Pakar QA Garudafood: Standar Mutu & Keamanan Pangan Modern', 'General Lecture with Garudafood QA Expert: Modern Food Safety & Quality Standards', 'KOLABORASI INDUSTRI', 'INDUSTRY COLLABORATION', 'Program studi menghadirkan pakar Quality Assurance dari PT Garudafood untuk berbagi wawasan tentang implementasi HACCP dan standar keamanan pangan industri skala besar.', 'The study program hosted a Quality Assurance expert from PT Garudafood to share insights on HACCP implementation and large-scale industrial food safety standards.', '27 MAY 2026', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop'),
  ('Prodi Teknologi Pangan UMB Tanda Tangani MoU dengan BPOM RI untuk Riset Kehalalan', 'UMB Food Technology Signs MoU with BPOM for Halal Research', 'KERJASAMA STRATEGIS', 'STRATEGIC PARTNERSHIP', 'Kerjasama resmi dengan Badan Pengawas Obat dan Makanan RI membuka peluang riset bersama terkait sertifikasi halal, analisis kontaminan, dan pengujian bahan tambahan pangan.', 'The official partnership with BPOM Indonesia opens opportunities for joint research on halal certification, contaminant analysis, and food additive testing.', '15 MAY 2026', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop');

-- Seed landing_stats
-- Ensure label_en column exists (for databases migrated from older schema)
alter table public.landing_stats add column if not exists label_en text;

insert into public.landing_stats (number, label, label_en, sort_order) values
  ('95%', 'Keterserapan Lulusan di Industri Pangan', 'Graduate Employment Rate in Food Industry', 1),
  ('15+', 'Mitra Industri Pangan & Lembaga Riset', 'Food Industry Partners & Research Institutions', 2),
  ('80+', 'Produk Inovasi Pangan Mahasiswa Terpublikasi', 'Published Student Food Innovation Products', 3),
  ('4', 'Laboratorium Analisis & Pengolahan Pangan', 'Food Analysis & Processing Laboratories', 4);

-- Seed landing_partners
insert into public.landing_partners (name, sort_order) values
  ('PT Garudafood Putra Putri Jaya Tbk', 1),
  ('PT Indofood Sukses Makmur Tbk', 2),
  ('Badan Pengawas Obat dan Makanan (BPOM)', 3),
  ('PT Nestlé Indonesia', 4),
  ('Ikatan Ahli Teknologi Pangan Indonesia (IATPI)', 5),
  ('Balai Penelitian Tanaman Serealia (Balitsereal)', 6);

-- Seed landing_portfolio_items
insert into public.landing_portfolio_items (image, title, medium, technique, year, "gridClass", sort_order) values
  ('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop', 'Formulasi Biskuit Fungsional Tepung Hanjeli & Kacang Merah', 'Rekayasa Pangan Fungsional', 'Peneliti: Nurul Fadilah', 'Medali Emas // Pameran Pangan Nasional', 'col-span-2 row-span-2', 1),
  ('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop', 'Sistem Monitoring Suhu HACCP Berbasis IoT untuk UMKM Pangan', 'IoT & Teknologi Pangan', 'Peneliti: Ahmad Fauzi', 'Finalis // Kompetisi Inovasi Pangan BPOM', 'col-span-1 row-span-1', 2),
  ('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop', 'Ekstraksi Bioaktif Kulit Manggis sebagai Pengawet Alami Halal', 'Bioteknologi Pangan', 'Peneliti: Siti Aisyah', 'Proyek Riset // Hibah DIKTI', 'col-span-1 row-span-2', 3),
  ('https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop', 'Diversifikasi Produk Mocaf (Modified Cassava Flour) Pangan Lokal', 'Teknologi Fermentasi', 'Peneliti: Dian Pertiwi', 'Karya Terbaik // World Food Day UAI-UAD', 'col-span-1 row-span-1', 4),
  ('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop', 'Pengembangan Kemasan Edible Film Berbasis Pati Tapioka Lokal', 'Teknologi Pengemasan Pangan', 'Peneliti: Rizky Pratama', 'Juara II // Kompetisi Kemasan Pangan Nasional', 'col-span-2 row-span-1', 5);

-- Seed site_content
insert into public.site_content (key, value, value_en) values
  ('hero_title', 'Teknologi Pangan', 'Food Technology UMB Bandung'),
  ('hero_subtitle', 'Mencetak Ahli Pangan Halalan Thayyiban Berbasis Inovasi Sains & Technopreneurship Pangan Nusantara.', 'Producing Halalan Thayyiban Food Technology Experts Based on Science Innovation & Nusantara Food Technopreneurship.'),
  ('kaprodi_welcome', 'Selamat datang di portal resmi Program Studi S1 Teknologi Pangan Universitas Muhammadiyah Bandung. Kami berkomitmen untuk menghasilkan lulusan ahli pangan yang profesional, inovatif, dan berkarakter Islami, yang mampu bersaing secara global dalam mengembangkan potensi pangan lokal Nusantara menjadi produk bertaraf internasional.', 'Welcome to the official portal of the S1 Food Technology Program at Universitas Muhammadiyah Bandung. We are committed to producing professional, innovative, and Islamic-character food technology graduates who can compete globally in developing the potential of local Nusantara food into international-standard products.'),
  ('kaprodi_welcome_p2', 'Fokus pengembangan kami terletak pada integrasi sains pangan modern dengan prinsip kehalalan, sistem biorefinery berkelanjutan, dan jiwa kewirausahaan — menciptakan ahli pangan yang berdampak nyata bagi ketahanan dan kedaulatan pangan bangsa.', 'Our development focus lies in integrating modern food science with halal principles, sustainable biorefinery systems, and an entrepreneurial spirit — creating food technology experts who make a real impact on national food security and sovereignty.'),
  ('kaprodi_photo_url', '/assets/kaprodi.png', '/assets/kaprodi.png'),
  ('logo_prodi_url', 'https://zcdgydrmbxcpycxxmkhj.supabase.co/storage/v1/object/public/prodi-assets/uploads/1781076834806-WhatsApp_Image_2026_06_09_at_18.36.57_removebg_preview.png', 'https://zcdgydrmbxcpycxxmkhj.supabase.co/storage/v1/object/public/prodi-assets/uploads/1781076834806-WhatsApp_Image_2026_06_09_at_18.36.57_removebg_preview.png'),
  ('hero_bg_url', 'https://zcdgydrmbxcpycxxmkhj.supabase.co/storage/v1/object/public/prodi-assets/uploads/1781076732515-192281_892475127_medium.mp4', 'https://zcdgydrmbxcpycxxmkhj.supabase.co/storage/v1/object/public/prodi-assets/uploads/1781076732515-192281_892475127_medium.mp4'),
  ('kaprodi_name', 'Dr. Khairiah, S.P., M.T.', 'Dr. Khairiah, S.P., M.T.'),
  ('kaprodi_title', 'Ketua Program Studi Teknologi Pangan', 'Head of Food Technology Department'),
  ('sambutan_title', 'Sambutan Kepala Program Studi', 'Head of Department''s Welcome'),
  ('philosophy_title', 'Filosofi Pengembangan Pangan Kami', 'Our Food Development Philosophy'),
  ('philosophy_body', 'Kami percaya bahwa teknologi pangan bukan sekadar tentang mengolah bahan makanan, melainkan tentang membangun sistem pangan yang aman, bergizi, halal, dan berkelanjutan — yang memberikan dampak nyata bagi ketahanan pangan masyarakat dan kemaslahatan umat.', 'We believe food technology is not just about processing food ingredients, but about building food systems that are safe, nutritious, halal, and sustainable — delivering real impact on community food security and societal well-being.'),
  ('visi_misi_vision', 'Menjadi program studi unggul dan inovatif dalam mengembangkan keilmuan sains dan teknologi pangan halal berbasis keanekaragaman pangan Nusantara melalui sistem biorefinery sirkular berkelanjutan guna menghasilkan lulusan profesional dan teknopreneur berkarakter Islami yang berdaya saing global dan berdampak luas bagi masyarakat.', 'To become a leading and innovative study program in developing halal food science and technology knowledge based on the diversity of Nusantara food through a sustainable circular biorefinery system, producing professional graduates and Islamically-characterized technopreneurs who are globally competitive and have a broad impact on society.'),
  ('visi_misi_missions', 'Menyelenggarakan pendidikan dan pengajaran berkualitas di bidang sains dan teknologi pangan lokal, kehalalan pangan, sistem biorefinery sirkular berkelanjutan, dan technopreneurship dalam menghasilkan lulusan yang berkarakter Islami.
Menyelenggarakan penelitian di bidang sains dan teknologi pangan yang inovatif, berfokus pada eksplorasi berbasis keanekaragaman pangan Nusantara untuk menghasilkan produk pangan yang aman, bermutu, dan halal.
Melaksanakan pengabdian kepada masyarakat berbasis ilmu pangan untuk pemberdayaan UMKM pangan lokal dan peningkatan ketahanan pangan masyarakat.
Mengintegrasikan nilai-nilai Keislaman, etika profesi pangan, dan prinsip kehalalan dalam seluruh aspek pembelajaran akademik dan pembinaan karakter mahasiswa.', 'Deliver quality education and teaching in the fields of local food science and technology, food halalness, sustainable circular biorefinery systems, and technopreneurship to produce Islamically-characterized graduates.
Conduct innovative food science and technology research, focused on exploration based on Nusantara food diversity to produce safe, quality, and halal food products.
Implement community service based on food science to empower local food MSMEs and improve community food security.
Integrate Islamic values, food professional ethics, and halal principles in all aspects of academic learning and student character development.'),
  ('visi_misi_goals', 'Kompetensi Profesional Pangan Global
Inovasi Riset Pangan Berbasis Lokal
Technopreneurship & Wirausaha Pangan
Karakter Islami & Pangan Halalan Thayyiban', 'Global Food Professional Competency
Local-Based Food Research Innovation
Technopreneurship & Food Entrepreneurship
Islamic Character & Halalan Thayyiban Food'),
  ('gov_sec_name', 'Dr. Saepul Adnan, S.Si., M.Si.', 'Dr. Saepul Adnan, S.Si., M.Si.'),
  ('gov_sec_role', 'Sekretaris Program Studi Teknologi Pangan', 'Secretary of Food Technology Department'),
  ('gov_sec_email', 'saepul.adnan@umbandung.ac.id', 'saepul.adnan@umbandung.ac.id'),
  ('gov_sec_photo', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop'),
  ('gov_lab_name', 'Hanif Alamudin Manshur, S.Gz., M.Si.', 'Hanif Alamudin Manshur, S.Gz., M.Si.'),
  ('gov_lab_role', 'Kepala Laboratorium Analisis Pangan', 'Head of Food Analysis Laboratory'),
  ('gov_lab_email', 'hanif.am@umbandung.ac.id', 'hanif.am@umbandung.ac.id'),
  ('gov_lab_photo', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop'),
  ('kurikulum_description', 'Pelajari kurikulum adaptif kami yang mengintegrasikan tiga pilar utama: Keislaman (pangan halalan thayyiban), Technopreneurship (kewirausahaan pangan), dan Ilmu Teknologi Pangan (rekayasa, gizi, dan pengolahan bahan lokal Nusantara).', 'Explore our adaptive curriculum integrating three main pillars: Islamic Values (halalan thayyiban food), Technopreneurship (food entrepreneurship), and Food Technology Science (engineering, nutrition, and local Nusantara ingredient processing).'),
  ('kurikulum_internship_desc', 'Mahasiswa kami difasilitasi untuk mengkonversikan pengalaman magang di industri pangan, BPOM, lembaga riset pangan, atau usaha pangan binaan hingga 20 SKS di bawah skema MBKM Kemendikbud, bermitra dengan industri pangan nasional terkemuka.', 'Our students can convert internship experiences at food industries, BPOM, food research institutions, or food business incubators into up to 20 academic credits under the Kemendikbud MBKM scheme, in partnership with leading national food industries.'),
  ('tugas_akhir_description', 'Akses panduan akademik, persyaratan kelayakan, alur pengajuan proposal penelitian pangan, serta berkas unduhan template untuk menyelesaikan Tugas Akhir (Skripsi) Anda di bidang Teknologi Pangan.', 'Access academic guidelines, eligibility requirements, food research proposal submission procedures, and template download files to complete your Final Project (Thesis) in Food Technology.'),
  ('tugas_akhir_prereq_desc', 'Telah menempuh dan lulus minimal 110 SKS mata kuliah akademik, tidak memiliki nilai D/E untuk mata kuliah inti Teknologi Pangan, IPK Kumulatif minimal 2.00, serta menyertakan Seminar Proposal Tugas Akhir di KRS berjalan.', 'Successfully completed a minimum of 110 academic credits (SKS), no D or E grades for core Food Technology courses, minimum cumulative GPA of 2.00, and enrolled in the Final Project Proposal Seminar in the current academic plan.'),
  ('kerjasama_description', 'Membuka peluang kolaborasi dengan industri pangan, lembaga pemerintah, dan institusi riset untuk mendukung Tri Dharma Perguruan Tinggi, magang industri pangan mahasiswa, riset produk halal, serta penyerapan lulusan ahli pangan.', 'Opening collaboration opportunities with food industries, government agencies, and research institutions to support the Tri Dharma of Higher Education, student food industry internships, halal product research, and absorption of food technology graduates.');

-- Seed Dosen
insert into public.dosen (name, img_src, scopus, sinta, scholar, facebook, twitter, tiktok, instagram, sort_order) values
  ('Dr. Khairiah, S.P., M.T.', 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=300&auto=format&fit=crop', '-', '-', '#', '#', '#', '#', '#', 1),
  ('Dr. Saepul Adnan, S.Si., M.Si.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop', '-', '-', '#', '#', '#', '#', '#', 2),
  ('Hanif Alamudin Manshur, S.Gz., M.Si.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop', '-', '-', '#', '#', '#', '#', '#', 3);

-- Seed Kurikulum Courses
insert into public.kurikulum_courses (semester, name, name_en, credits, sort_order) values
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
  ('VIII', 'Tugas Akhir / Skripsi', 'Final Project / Undergraduate Thesis', 6, 22);

-- Seed Kurikulum PLOs
insert into public.kurikulum_plos (code, type, type_en, text, text_en, sort_order) values
  ('CPL-01', 'Sikap & Nilai Keislaman', 'Islamic Attitude & Values', 'Mampu menginternalisasikan nilai-nilai Islam, etika profesi pangan, dan prinsip kehalalan dalam kehidupan bermasyarakat dan dunia industri.', 'Able to internalize Islamic values, food professional ethics, and halal principles in community life and the industrial world.', 1),
  ('CPL-02', 'Penguasaan Pengetahuan Sains Pangan', 'Food Science Knowledge Mastery', 'Menguasai konsep sains pangan, kimia pangan, mikrobiologi pangan, analisis pangan, gizi, dan rekayasa proses pengolahan pangan secara mendalam.', 'Mastering food science concepts, food chemistry, food microbiology, food analysis, nutrition, and food processing engineering deeply.', 2),
  ('CPL-03', 'Keterampilan Kerja Khusus', 'Specific Work Skills', 'Mampu mengaplikasikan ilmu teknologi pangan dalam merancang produk pangan halal, aman, bermutu, dan mengelola sistem penjaminan mutu (HACCP & Sertifikasi Halal).', 'Able to apply food technology science to design halal, safe, and quality food products, and manage quality assurance systems (HACCP & Halal Certification).', 3),
  ('CPL-04', 'Technopreneurship & Inovasi', 'Technopreneurship & Innovation', 'Mampu mengidentifikasi peluang bisnis pangan berbasis pangan lokal Nusantara dengan pendekatan technopreneurship sirkular berkelanjutan.', 'Able to identify food business opportunities based on local Nusantara food with a sustainable circular technopreneurship approach.', 4);

-- Seed Kurikulum Graduate Profiles
insert into public.kurikulum_profiles (title, title_en, desc, desc_en, sort_order) values
  ('QA/QC & Food Safety Specialist', 'QA/QC & Food Safety Specialist', 'Profesional yang mampu menjamin mutu, keamanan, dan kehalalan produk pangan dari bahan baku hingga produk jadi di industri makanan dan minuman.', 'Professionals capable of ensuring the quality, safety, and halal integrity of food products from raw materials to finished products in the food and beverage industry.', 1),
  ('R&D & Product Development Specialist', 'R&D & Product Development Specialist', 'Inovator yang mampu merancang formulasi baru, diversifikasi pangan lokal Nusantara, serta rekayasa kemasan pangan bernilai gizi tinggi.', 'Innovators capable of designing new formulations, diversifying local Nusantara food, and engineering high-nutrition food packaging.', 2),
  ('Halal Food Auditor / Consultant', 'Halal Food Auditor / Consultant', 'Ahli bersertifikasi yang mendampingi industri pangan dan UMKM dalam mengaudit, menyusun dokumen Sistem Jaminan Produk Halal (SJPH).', 'Certified experts assisting the food industry and MSMEs in auditing and compiling Halal Product Assurance System documents.', 3),
  ('Food Technopreneur', 'Food Technopreneur', 'Wirausahawan mandiri yang mengembangkan bisnis pengolahan pangan lokal yang inovatif dengan mengedepankan aspek halal dan keberlanjutan.', 'Independent entrepreneurs developing innovative local food processing businesses prioritizing halal and sustainability aspects.', 4);

-- Seed Tugas Akhir Steps
insert into public.tugas_akhir_steps (num, title, title_en, desc, desc_en, sort_order) values
  ('01', 'Pengajuan Judul & Proposal', 'Title & Proposal Submission', 'Mahasiswa mengajukan draf rencana penelitian beserta calon dosen pembimbing ke prodi untuk dievaluasi kesesuaian topiknya.', 'Students submit research plan drafts along with prospective advisors to the department for topic suitability evaluation.', 1),
  ('02', 'Seminar Proposal', 'Proposal Seminar', 'Pemaparan rencana penelitian di hadapan dosen penguji untuk mendapat masukan metodologi ilmiah dan kelayakan riset.', 'Presentation of research plans before examiners to receive scientific methodology feedback and research feasibility validation.', 2),
  ('03', 'Penelitian Laboratorium & Analisis', 'Lab Research & Analysis', 'Pelaksanaan eksperimen, analisis laboratorium (fisik, kimia, mikrobiologi, atau organoleptik) sesuai metodologi proposal.', 'Conducting experiments and laboratory analyses (physical, chemical, microbiological, or organoleptic) per proposal methodology.', 3),
  ('04', 'Sidang Tugas Akhir', 'Undergraduate Thesis Defense', 'Ujian lisan komprehensif untuk mempertahankan hasil penelitian, analisis data, dan kesimpulan di hadapan dewan penguji.', 'Comprehensive oral exam to defend research results, data analysis, and conclusions before the board of examiners.', 4),
  ('05', 'Revisi & Pengumpulan Berkas', 'Revision & Submission', 'Penyempurnaan draf naskah skripsi berdasarkan masukan penguji serta pengunggahan manuskrip ke repositori institusi.', 'Perfecting the thesis draft per examiners'' feedback and uploading the final manuscript to the institutional repository.', 5);

-- MIGRATION SCRIPTS (For existing databases)
-- label_en is now handled inline above with ADD COLUMN IF NOT EXISTS
-- Run this manually only if you need to add other missing columns:
-- ALTER TABLE public.landing_stats ADD COLUMN IF NOT EXISTS label_en text;
