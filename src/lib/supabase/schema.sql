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
  rps_url text,
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

-- -- Seed Partners
insert into public.partners (name) values
  ('Asosiasi Pertekstilan Indonesia (API)'),
  ('PT Kahatex'),
  ('Rumah Batik Komar'),
  ('Ikatan Perancang Mode Indonesia (IPMI)'),
  ('ASEPHI (Handicraft Association)'),
  ('Ikatan Alumni Kriya Tekstil dan Fashion (IKA-KTF)');

-- Seed Events
insert into public.events (date_day, date_month, title, title_en, location, location_en) values
  ('18', 'JUN', 'TUMPAL 2026: Capstone Exhibition & Fashion Show UMB', 'TUMPAL 2026: Capstone Exhibition & Fashion Show UMB', 'Aula Utama KH. Ahmad Dahlan, UMB Bandung', 'KH. Ahmad Dahlan Main Hall, UMB Bandung'),
  ('25', 'JUN', 'Workshop Batik & Shibori: Teknik Manipulasi Kain Kontemporer', 'Batik & Shibori Workshop: Contemporary Fabric Manipulation Techniques', 'Studio Kriya & Desain Gedung UMB', 'UMB Building Craft & Design Studio'),
  ('05', 'JUL', 'Kuliah Umum: Tren Sustainable Fashion & Green Lifestyle di Era Global', 'Public Lecture: Sustainable Fashion & Green Lifestyle Trends in Global Era', 'Auditorium Utama UMB Bandung', 'UMB Bandung Main Auditorium');

-- Seed Testimonials
insert into public.testimonials (testimonial, testimonial_en, by, by_en, img_src) values
  ('Materi kurikulum yang berfokus pada surface & structure design serta entrepreneurship sangat relevan dengan industri fashion saat ini.', 'Curriculum material focusing on surface & structure design and entrepreneurship is highly relevant to current fashion industry needs.', 'Andini Kusuma, S.Sn. (Fashion Designer at Cottonink)', 'Andini Kusuma, S.Sn. (Fashion Designer at Cottonink)', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'),
  ('Magang di studio desainer terkemuka memberikan saya kesempatan berjejaring langsung dengan praktisi mode nasional sejak kuliah.', 'Interning at leading designer studios gave me the opportunity to network directly with national fashion practitioners since college.', 'Rian Hidayat, S.Sn. (Creative Director at Batik Komar)', 'Rian Hidayat, S.Sn. (Creative Director at Batik Komar)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'),
  ('Kriya Tekstil UMB benar-benar mengasah kemampuan berpikir kreatif dan kepekaan estetika terhadap serat-serat alami Nusantara.', 'Textile Craft UMB really sharpens creative thinking skills and aesthetic sensitivity towards Nusantara natural fibers.', 'Melati Indah, S.Sn. (Textile Artist & Founder of KainSerat)', 'Melati Indah, S.Sn. (Textile Artist & Founder of KainSerat)', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop');

-- Seed News
insert into public.news (title, title_en, category, category_en, snippet, snippet_en, date, img_src) values
  ('Workshop Pewarnaan Alami dan Ecoprint untuk Pengrajin Lokal', 'Natural Dye and Ecoprint Workshop for Local Artisans', 'Pengabdian Masyarakat', 'Community Service', 'Dosen dan mahasiswa Kriya Tekstil dan Fashion UMB menyelenggarakan workshop pemanfaatan zat warna alam lokal untuk meningkatkan nilai jual produk UMKM.', 'UMB Textile & Fashion lecturers and students host a workshop on natural dyes utilization to increase local MSME product value.', '02 JUN 2026', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'),
  ('Tim Mahasiswa KTF UMB Raih Juara I Fashion Design Competition Nasional', 'UMB KTF Student Team Wins 1st Place in National Fashion Design Competition', 'Prestasi Mahasiswa', 'Student Achievement', 'Mengusung tema Zero Waste Fashion dengan teknik tenun struktur modern, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.', 'With a Zero Waste Fashion theme using modern structural weaving, the project by class of 2024 students wowed the jury.', '28 MAY 2026', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=600&auto=format&fit=crop'),
  ('Kolaborasi Riset Serat Alami Bersama Asosiasi Pertekstilan Indonesia', 'Natural Fiber Research Collaboration with Indonesian Textile Association', 'Kolaborasi Riset', 'Research Collaboration', 'Program studi resmi menandatangani kerjasama riset pengembangan serat pelepah pisang untuk aplikasi tekstil fashion berkelanjutan.', 'The study program officially signed a research partnership for banana fiber development in sustainable fashion textiles.', '15 MAY 2026', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop');

-- Seed landing_stats
insert into public.landing_stats (number, label, label_en, sort_order) values
  ('95%', 'Keterserapan Lulusan di Industri Kreatif', 'Graduate Employment Rate in Creative Industry', 1),
  ('30%', 'Mitra Industri Tekstil & Fashion', 'Textile & Fashion Industry Partners', 2),
  ('200%', 'Karya Desain Mahasiswa Terpublikasi', 'Published Student Design Works', 3),
  ('6', 'Studio Kriya, Batik, & Desain Mode', 'Craft, Batik, & Fashion Design Studios', 4);

-- Seed landing_partners
insert into public.landing_partners (name, sort_order) values
  ('Rumah Batik Komar', 1),
  ('PT Kahatex', 2),
  ('Asosiasi Pertekstilan Indonesia (API)', 3),
  ('Ikatan Perancang Mode Indonesia (IPMI)', 4),
  ('ASEPHI (Handicraft Association)', 5),
  ('Ikatan Alumni Kriya Tekstil dan Fashion (IKA-KTF)', 6);

-- Seed landing_portfolio_items
insert into public.landing_portfolio_items (image, title, medium, technique, year, "gridClass", sort_order) values
  ('/assets/portfolio-organic-gown.jpg', 'Organic Ecoprint Evening Gown', 'Cotton & Silk Ecoprint', 'Developer: Naila Putri', 'Juara I // Fashion Show Nasional', 'col-span-2 row-span-2', 1),
  ('/assets/portfolio-songket.jpg', 'Songket-Inspired Contemporary Jacket', 'Handwoven Songket & Linen', 'Developer: Daniel Wijaya', 'Karya Terbaik // Exhibition ITB', 'col-span-1 row-span-1', 2),
  ('/assets/portfolio-ikat-jacket.jpg', 'Ikat-Weave Modern Trench Coat', 'Handwoven Ikat & Cotton', 'Developer: Arya Dinata', 'Proyek Riset // Kementerian Dikti', 'col-span-1 row-span-2', 3),
  ('/assets/portfolio-batik.jpg', 'Batik Lasem Eco-Friendly Kimono', 'Hand-drawn Batik & Tencel', 'Developer: Ryu Hansen', 'Karya Inovatif // Global Health', 'col-span-1 row-span-1', 4),
  ('/assets/portfolio-ready-to-wear.jpg', 'Ready-to-Wear Streetwear Collection', 'Digital Print & Organic Cotton', 'Developer: Farah Amalia', 'Finalis // Indonesian Young Inventor', 'col-span-2 row-span-1', 5);

-- Seed site_content
insert into public.site_content (key, value, value_en) values
  ('footer_email', 'kriya@umbandung.ac.id', 'kriya@umbandung.ac.id'),
  ('footer_phone', '+62 812-3456-7890', '+62 812-3456-7890'),
  ('footer_address', 'Gedung K.H. Ahmad Dahlan, Lantai 4, Jl. Soekarno-Hatta No. 752, Bandung 40286', 'K.H. Ahmad Dahlan Building, 4th Floor, Jl. Soekarno-Hatta No. 752, Bandung 40286'),
  ('footer_work_hours', 'Senin - Jumat | 08:00 - 16:00 WIB', 'Monday - Friday | 08:00 - 16:00 WIB'),
  ('footer_social_instagram', 'https://instagram.com/kriya.umbandung', 'https://instagram.com/kriya.umbandung'),
  ('footer_social_youtube', 'https://youtube.com/@kriya.umbandung', 'https://youtube.com/@kriya.umbandung'),
  ('footer_social_whatsapp', '', ''),
  ('footer_social_linkedin', '', ''),
  ('footer_social_univ', 'https://umbandung.ac.id', 'https://umbandung.ac.id'),
  ('hero_title', 'Kriya Tekstil dan Fashion UMB', 'Textile and Fashion Design UMB'),
  ('hero_subtitle', 'Mencetak Creativepreneur dan Desainer Kriya Kontemporer Berbasis Nilai Islam & Kearifan Lokal.', 'Creating Creativepreneurs and Contemporary Craft Designers based on Islamic Values & Local Indigenous.'),
  ('kaprodi_welcome', 'Selamat datang di portal resmi Program Studi S1 Kriya Tekstil dan Fashion Universitas Muhammadiyah Bandung. Kami berkomitmen untuk menghasilkan desainer, kriya, dan wirausahawan kreatif masa depan yang menguasai teknik tekstil, desain mode, dan seni kriya kontemporer.', 'Welcome to the official portal of the S1 Program in Textile and Fashion Design at Universitas Muhammadiyah Bandung. We are committed to shaping future designers, crafters, and creative entrepreneurs who master textile techniques, fashion design, and contemporary craft arts.'),
  ('kaprodi_welcome_p2', 'Fokus pengembangan kami terletak pada integrasi seni tekstil modern dengan nilai tradisi budaya Nusantara sebagai fondasi inovasi, menciptakan desainer yang peka secara estetis, sosial, dan lingkungan.', 'Our development focus lies in integrating modern textile arts with Nusantara cultural traditions as an innovation foundation, creating designers who are aesthetically, socially, and environmentally sensitive.'),
  ('kaprodi_photo_url', '/assets/kaprodi.png', '/assets/kaprodi.png'),
  ('logo_prodi_url', '', ''),
  ('hero_bg_url', '/assets/hero-mono-stigma.png', '/assets/hero-mono-stigma.png'),
  ('kaprodi_name', 'Dra. Saftiyaningsih Ken Atik, M.Ds.', 'Dra. Saftiyaningsih Ken Atik, M.Ds.'),
  ('kaprodi_title', 'Ketua Program Studi Kriya Tekstil dan Fashion', 'Head of Textile and Fashion Design Department'),
  ('sambutan_title', 'Sambutan Kepala Program Studi', 'Head of Department''s Welcome'),
  ('philosophy_title', 'Filosofi Pembelajaran Kami', 'Our Learning Philosophy'),
  ('philosophy_body', 'Kami percaya bahwa kriya tekstil dan fashion bukan hanya tentang estetika visual, melainkan tentang mengekspresikan nilai budaya, inovasi material yang ramah lingkungan, serta memberikan dampak nyata bagi industri kreatif.', 'We believe that textile craft and fashion are not just about visual aesthetics, but about expressing cultural values, sustainable material innovation, and delivering real impact to the creative industry.'),
  ('visi_misi_vision', 'Menjadi program studi kriya tekstil dan fashion yang unggul dan inovatif dalam pengembangan seni kriya dan desain mode berbasis kearifan lokal Nusantara serta berdaya saing global pada tahun 2030.', 'To become a leading and innovative textile craft and fashion study program in developing craft arts and fashion design based on Nusantara local wisdom with global competitiveness by 2030.'),
  ('visi_misi_missions', 'Menyelenggarakan pendidikan kriya tekstil dan fashion yang berkualitas tinggi dengan mengintegrasikan nilai-nilai Islam dan technopreneurship kreatif.
Melaksanakan penelitian dan pengabdian masyarakat di bidang kriya dan fashion yang berorientasi pada eksplorasi budaya lokal dan sustainable design.
Mengembangkan kemitraan strategis dengan industri kreatif, galeri seni, dan perancang busana untuk memfasilitasi magang dan karier mahasiswa.', 'Deliver high-quality textile craft and fashion education integrating Islamic values and creative technopreneurship.
Conduct research and community service in craft and fashion oriented towards local cultural exploration and sustainable design.
Develop strategic partnerships with creative industries, art galleries, and fashion designers to facilitate student internships and careers.'),
  ('visi_misi_goals', 'Desain Kriya & Mode Kreatif
Eksplorasi Budaya Nusantara
Sustainable & Eco-Fashion
Islamic Character & Creativepreneurship', 'Creative Craft & Fashion Design
Nusantara Cultural Exploration
Sustainable & Eco-Fashion
Islamic Character & Creativepreneurship'),
  ('gov_sec_name', 'Dewi Werdayani, S.Pd., M.Pd.', 'Dewi Werdayani, S.Pd., M.Pd.'),
  ('gov_sec_role', 'Sekretaris Program Studi', 'Secretary of Department'),
  ('gov_sec_email', 'dewi.w@umbandung.ac.id', 'dewi.w@umbandung.ac.id'),
  ('gov_sec_photo', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop'),
  ('gov_lab_name', 'Ghaida Nasya Putri, S.Ds., M.Ds.', 'Ghaida Nasya Putri, S.Ds., M.Ds.'),
  ('gov_lab_role', 'Kepala Laboratorium Kriya & Desain', 'Head of Craft & Design Laboratories'),
  ('gov_lab_email', 'ghaida.np@umbandung.ac.id', 'ghaida.np@umbandung.ac.id'),
  ('gov_lab_photo', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop'),
  ('kurikulum_description', 'Pelajari kurikulum adaptif kami yang dirancang untuk membekali mahasiswa dengan keahlian surface design (batik, ecoprint, shibori), structure design (tenun, anyam, rajut), serta manajemen bisnis fashion.', 'Explore our adaptive curriculum designed to equip students with expertise in surface design (batik, ecoprint, shibori), structure design (weaving, knitting), and fashion business management.'),
  ('kurikulum_internship_desc', 'Mahasiswa difasilitasi untuk magang industri atau di studio desainer terkemuka di bawah skema MBKM hingga 20 SKS.', 'Students are facilitated to intern in creative industries or leading designer studios under the MBKM scheme for up to 20 credits.'),
  ('tugas_akhir_description', 'Akses panduan akademik, persyaratan kelayakan, alur pengajuan proposal karya kriya dan busana, serta template Tugas Akhir (Skripsi/Karya Mandiri).', 'Access academic guidelines, prerequisites, project proposals, and templates required to complete your final project (Thesis/Creative Work).'),
  ('tugas_akhir_prereq_desc', 'Telah menempuh minimal 110 SKS, tidak memiliki nilai D/E untuk mata kuliah inti kriya, IPK Kumulatif minimal 2.00, serta mengajukan outline konsep karya.', 'Successfully completed a minimum of 110 academic credits (SKS), no D/E grades for core craft courses, minimum GPA of 2.00, and submitted a creative design outline.'),
  ('kerjasama_description', 'Membuka peluang kolaborasi industri kreatif guna mendukung magang mahasiswa, pameran bersama, serta penyerapan karir lulusan.', 'Exploring collaborations with creative industries to support student internships, joint exhibitions, and professional career transitions.');

-- Seed Dosen
insert into public.dosen (name, img_src, scopus, sinta, scholar, facebook, twitter, tiktok, instagram, sort_order) values
  ('Dra. Saftiyaningsih Ken Atik, M.Ds.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop', '-', '6704890', '#', '#', '#', '#', '#', 1),
  ('Dr. Komarudin Kudiya, S.IP., M.Ds.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop', '-', '6640055', '#', '#', '#', '#', '#', 2),
  ('Ghaida Nasya Putri, S.Ds., M.Ds.', 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=300&auto=format&fit=crop', '-', '6042313', '#', '#', '#', '#', '#', 3);

-- Seed Kurikulum Courses
insert into public.kurikulum_courses (semester, name, name_en, credits, sort_order) values
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
  ('VIII', 'Tugas Akhir / Karya Mandiri & Skripsi', 'Final Capstone Project / Thesis', 6, 22);

-- Seed Kurikulum PLOs
insert into public.kurikulum_plos (code, type, type_en, text, text_en, sort_order) values
  ('CPL-01', 'Sikap & Nilai Keislaman', 'Islamic Attitude & Values', 'Mampu menginternalisasikan nilai-nilai Islam, etika profesi desain, dan prinsip keberlanjutan dalam kehidupan bermasyarakat dan dunia industri kreatif.', 'Able to internalize Islamic values, design professional ethics, and sustainability principles in community life and the creative industry.', 1),
  ('CPL-02', 'Penguasaan Pengetahuan Kriya & Mode', 'Craft & Fashion Knowledge Mastery', 'Menguasai konsep sejarah kriya, teori warna, trend forecasting, material serat, serta teknik konstruksi tekstil secara mendalam.', 'Mastering craft history concepts, color theory, trend forecasting, fiber materials, and textile construction techniques deeply.', 2),
  ('CPL-03', 'Keterampilan Kerja Khusus Desain', 'Specific Design Work Skills', 'Mampu merancang karya kriya tekstil (surface dan structure) serta koleksi busana yang inovatif berbasis kearifan lokal dan ramah lingkungan.', 'Able to design textile craft works (surface and structure) and innovative fashion collections based on local wisdom and eco-friendly principles.', 3),
  ('CPL-04', 'Creativepreneurship & Inovasi', 'Creativepreneurship & Innovation', 'Mampu mengidentifikasi peluang pasar dan membangun bisnis kreatif mandiri (brand fashion/kriya) berbasis technopreneurship budaya.', 'Able to identify market opportunities and build independent creative businesses (fashion/craft brand) based on cultural technopreneurship.', 4);

-- Seed Kurikulum Graduate Profiles
insert into public.kurikulum_profiles (title, title_en, desc, desc_en, sort_order) values
  ('Fashion / Textile Designer', 'Fashion / Textile Designer', 'Profesional yang merancang motif tekstil atau koleksi busana siap pakai untuk industri fashion nasional dan global.', 'Professionals who design textile motifs or ready-to-wear fashion collections for the national and global fashion industry.', 1),
  ('Contemporary Craft Artist / Maker', 'Contemporary Craft Artist / Maker', 'Seniman kriya independen yang menciptakan karya seni serat, instalasi tekstil, serta produk kerajinan tangan bernilai seni tinggi.', 'Independent craft artists who create fiber art, textile installations, and high-value handmade craft products.', 2),
  ('Fashion Stylist & Visual Merchandiser', 'Fashion Stylist & Visual Merchandiser', 'Ahli yang menyusun konsep visual untuk photoshoot, pameran produk di butik, dan pengarah gaya mode media.', 'Experts who curate visual concepts for photo shoots, boutique product exhibitions, and media fashion styling.', 3),
  ('Creativepreneur (Craft & Fashion)', 'Creativepreneur (Craft & Fashion)', 'Wirausahawan mandiri yang mendirikan brand fashion ramah lingkungan atau bisnis kriya berbasis pemberdayaan komunitas lokal.', 'Independent entrepreneurs who establish eco-friendly fashion brands or craft businesses based on local community empowerment.', 4);

-- Seed Tugas Akhir Steps
insert into public.tugas_akhir_steps (num, title, title_en, desc, desc_en, sort_order) values
  ('01', 'Pengajuan Konsep Karya & Proposal', 'Concept & Proposal Submission', 'Mahasiswa mengajukan draf rencana karya kriya/busana beserta outline konsep visual untuk dievaluasi oleh prodi.', 'Students submit craft/fashion research drafts along with a visual concept outline to the department for evaluation.', 1),
  ('02', 'Seminar Proposal Desain', 'Design Proposal Seminar', 'Pemaparan rencana desain, moodboard, sketsa awal, dan pemilihan material di hadapan dosen penguji.', 'Presentation of design plans, moodboard, initial sketches, and material selection before examiners.', 2),
  ('03', 'Pengerjaan Studio & Eksperimen', 'Studio Work & Experimentation', 'Proses pembuatan karya (weaving, dyeing, sewing) and eksperimen material di studio kriya.', 'Fabrication process (weaving, dyeing, sewing) and material experimentation in the craft studio.', 3),
  ('04', 'Sidang Karya & Pameran', 'Undergraduate Thesis & Exhibition Defense', 'Pertanggungjawaban hasil karya, konsep teoritis, dan display pameran di hadapan dewan penguji.', 'Defending the completed work, theoretical concept, and exhibition display before the board of examiners.', 4),
  ('05', 'Revisi & Pengarsipan Portofolio', 'Revision & Portfolio Archiving', 'Penyempurnaan laporan tertulis dan dokumentasi karya foto resolusi tinggi untuk portofolio digital lulusan.', 'Perfecting the written report and high-resolution work documentation for the graduate''s digital portfolio.', 5);

-- MIGRATION SCRIPTS (For existing databases)
-- label_en is now handled inline above with ADD COLUMN IF NOT EXISTS
-- Run this manually only if you need to add other missing columns:
-- ALTER TABLE public.landing_stats ADD COLUMN IF NOT EXISTS label_en text;
