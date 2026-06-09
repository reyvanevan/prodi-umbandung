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

-- Enable Row Level Security (RLS) for all tables
alter table public.news enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;
alter table public.partners enable row level security;
alter table public.landing_stats enable row level security;
alter table public.landing_portfolio_items enable row level security;
alter table public.site_content enable row level security;
alter table public.landing_partners enable row level security;

-- Drop policies if they already exist
drop policy if exists "Allow public read-only access for news" on public.news;
drop policy if exists "Allow public read-only access for events" on public.events;
drop policy if exists "Allow public read-only access for testimonials" on public.testimonials;
drop policy if exists "Allow public read-only access for partners" on public.partners;
drop policy if exists "Allow public read-only access for landing_stats" on public.landing_stats;
drop policy if exists "Allow public read-only access for landing_portfolio_items" on public.landing_portfolio_items;
drop policy if exists "Allow public read-only access for site_content" on public.site_content;
drop policy if exists "Allow public read-only access for landing_partners" on public.landing_partners;

drop policy if exists "Allow admin write access for news" on public.news;
drop policy if exists "Allow admin write access for events" on public.events;
drop policy if exists "Allow admin write access for testimonials" on public.testimonials;
drop policy if exists "Allow admin write access for partners" on public.partners;
drop policy if exists "Allow admin write access for landing_stats" on public.landing_stats;
drop policy if exists "Allow admin write access for landing_portfolio_items" on public.landing_portfolio_items;
drop policy if exists "Allow admin write access for site_content" on public.site_content;
drop policy if exists "Allow admin write access for landing_partners" on public.landing_partners;

-- Create Read policies (Public Select)
create policy "Allow public read-only access for news" on public.news for select using (true);
create policy "Allow public read-only access for events" on public.events for select using (true);
create policy "Allow public read-only access for testimonials" on public.testimonials for select using (true);
create policy "Allow public read-only access for partners" on public.partners for select using (true);
create policy "Allow public read-only access for landing_stats" on public.landing_stats for select using (true);
create policy "Allow public read-only access for landing_portfolio_items" on public.landing_portfolio_items for select using (true);
create policy "Allow public read-only access for site_content" on public.site_content for select using (true);
create policy "Allow public read-only access for landing_partners" on public.landing_partners for select using (true);

-- Create Write policies (Authenticated Admin only)
create policy "Allow admin write access for news" on public.news for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for events" on public.events for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for partners" on public.partners for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for landing_stats" on public.landing_stats for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for landing_portfolio_items" on public.landing_portfolio_items for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for site_content" on public.site_content for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for landing_partners" on public.landing_partners for all using (auth.role() = 'authenticated');

-- Clean existing data before seeding
truncate table public.news restart identity cascade;
truncate table public.events restart identity cascade;
truncate table public.testimonials restart identity cascade;
truncate table public.partners restart identity cascade;
truncate table public.landing_stats restart identity cascade;
truncate table public.landing_portfolio_items restart identity cascade;
truncate table public.site_content restart identity cascade;
truncate table public.landing_partners restart identity cascade;

-- Seed Partners
insert into public.partners (name) values
  ('Asosiasi Telekomunikasi Indonesia'),
  ('PT Indonesia Digital Teknologi'),
  ('Google Developer Groups Bandung'),
  ('Kementerian Komunikasi & Informatika'),
  ('Ikatan Alumni Teknik Informatika (IKATI)'),
  ('PT GoTo Gojek Tokopedia Tbk');

-- Seed Events
insert into public.events (date_day, date_month, title, title_en, location, location_en) values
  ('18', 'JUN', 'INFOTEC 2026: Capstone Project Showcase & IT Career Expo', 'INFOTEC 2026: Capstone Project Showcase & IT Career Expo', 'Aula Utama KH. Ahmad Dahlan, UMB Bandung', 'KH. Ahmad Dahlan Main Hall, UMB Bandung'),
  ('25', 'JUN', 'Coding Workshop: Building Web Apps with React & Supabase', 'Coding Workshop: Building Web Apps with React & Supabase', 'Lab Komputasi Gedung UMB', 'UMB Building Computing Lab'),
  ('05', 'JUL', 'Kuliah Umum: Tren Kecerdasan Buatan di Era Komputasi Awan', 'Public Lecture: Artificial Intelligence Trends in the Cloud Computing Era', 'Auditorium Utama UMB Bandung', 'UMB Bandung Main Auditorium');

-- Seed Testimonials
insert into public.testimonials (testimonial, testimonial_en, by, by_en, img_src) values
  ('Materi kurikulum yang berfokus pada software engineering dan arsitektur modern sangat relevan dengan kebutuhan industri teknologi saat ini.', 'Curriculum material focusing on software engineering and modern architecture is highly relevant to current tech industry needs.', 'Andini Kusuma, S.Kom (Software Engineer at Tokopedia)', 'Andini Kusuma, S.Kom (Software Engineer at Tokopedia)', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'),
  ('Program magang laboratorium memberikan saya kesempatan berjejaring langsung dengan praktisi cloud dan devops nasional sejak awal perkuliahan.', 'The lab internship program gave me the opportunity to network directly with national cloud and devops practitioners since the beginning of college.', 'Rian Hidayat, S.Kom (DevOps Engineer at GoTo)', 'Rian Hidayat, S.Kom (DevOps Engineer at GoTo)', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop'),
  ('Informatika UMB benar-benar mengasah kemampuan berpikir logis dan pemecahan masalah kompleks menggunakan teknologi kecerdasan buatan.', 'Informatics UMB really sharpens logical thinking and complex problem solving skills using artificial intelligence technology.', 'Melati Indah, S.Kom (AI Researcher at Bukalapak)', 'Melati Indah, S.Kom (AI Researcher at Bukalapak)', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop'),
  ('Suasana lab yang kolaboratif membuat saya terbiasa melakukan eksperimen sistem dan coding tanpa takut gagal.', 'The collaborative lab atmosphere makes me accustomed to conducting system experiments and coding without fear of failure.', 'Fauzan Adhi, S.Kom (Cybersecurity Analyst at Cyber Security Agency)', 'Fauzan Adhi, S.Kom (Cybersecurity Analyst at Cyber Security Agency)', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'),
  ('Pembekalan portofolio proyek berkala selama perkuliahan sangat mempermudah saya ketika melamar kerja di perusahaan multinasional.', 'Regular project portfolio preparation during college made it very easy for me when applying for jobs at multinational companies.', 'Sarah Amalia, S.Kom (Technical Product Manager at Shopee)', 'Sarah Amalia, S.Kom (Technical Product Manager at Shopee)', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop'),
  ('Berkat bimbingan intensif dosen-dosen praktisi industri, saya bisa merilis proyek akhir saya di ajang kompetisi IT nasional.', 'Thanks to the intensive guidance of industry practitioner lecturers, I was able to release my final project in a national IT competition.', 'Yusuf Maulana, S.Kom (Data Scientist at Telkom Indonesia)', 'Yusuf Maulana, S.Kom (Data Scientist at Telkom Indonesia)', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop');

-- Seed News
insert into public.news (title, title_en, category, category_en, snippet, snippet_en, date, img_src) values
  ('Pelatihan Cloud Computing Bersama AWS Academy', 'Cloud Computing Training with AWS Academy', 'PENGABDIAN MASYARAKAT', 'COMMUNITY SERVICE', 'Dosen dan mahasiswa Teknik Informatika UMB menyelenggarakan workshop pemanfaatan arsitektur cloud server untuk UMKM di Bandung.', 'UMB Informatics faculty and students held a workshop on utilizing cloud server architecture for MSMEs in Bandung.', '02 JUN 2026', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop'),
  ('Mahasiswa Informatika UMB Raih Penghargaan Hackathon Nasional', 'UMB Informatics Student Wins National Hackathon Award', 'PRESTASI MAHASISWA', 'STUDENT ACHIEVEMENT', 'Mengangkat tema smart campus mobile app berbasis React Native, karya mahasiswa angkatan 2024 berhasil meraih Juara Utama.', 'Featuring a smart campus mobile app based on React Native, the work of the 2024 cohort student won the main championship.', '28 MAY 2026', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop'),
  ('Kolaborasi Riset Cybersecurity Bersama Asosiasi IT Indonesia', 'Cybersecurity Research Collaboration with Indonesian IT Association', 'KOLABORASI RISET', 'RESEARCH COLLABORATION', 'Program studi resmi menandatangani kerjasama pengembangan standardisasi keamanan informasi dan sertifikasi kompetensi jaringan.', 'The study program officially signed a partnership for information security standardization development and network competency certification.', '15 MAY 2026', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop');

-- Seed landing_stats
insert into public.landing_stats (number, label, sort_order) values
  ('98%', 'Keterserapan Lulusan di Industri', 1),
  ('20+', 'Mitra Industri & Tech Company', 2),
  ('150+', 'Project Apps Mahasiswa Terpublikasi', 3),
  ('8', 'Laboratorium Komputasi & Riset', 4);

-- Seed landing_partners
insert into public.landing_partners (name, sort_order) values
  ('PT GoTo Gojek Tokopedia Tbk', 1),
  ('Google Developer Groups Bandung', 2),
  ('Asosiasi Telekomunikasi Indonesia', 3),
  ('PT Indonesia Digital Teknologi', 4),
  ('Kementerian Komunikasi & Informatika', 5),
  ('Ikatan Alumni Teknik Informatika (IKATI)', 6);

-- Seed landing_portfolio_items
insert into public.landing_portfolio_items (image, title, medium, technique, year, "gridClass", sort_order) values
  ('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop', 'Smart Campus Mobile & Analytics App', 'React Native & Node.js', 'Developer: Naila Putri', 'Juara I // Hackathon Nasional', 'col-span-2 row-span-2', 1),
  ('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop', 'IoT Automated Greenhouse Controller', 'Raspberry Pi & Python', 'Developer: Daniel Wijaya', 'Karya Terbaik // Exhibition ITB', 'col-span-1 row-span-1', 2),
  ('https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop', 'Decentralized Academic Credentials', 'Solidity & Ethereum', 'Developer: Arya Dinata', 'Proyek Riset // Kementerian Dikti', 'col-span-1 row-span-2', 3),
  ('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop', 'AI Lung Cancer Detection Model', 'Python & PyTorch', 'Developer: Ryu Hansen', 'Karya Inovatif // Global Health', 'col-span-1 row-span-1', 4),
  ('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop', 'AR Campus Navigation System', 'Unity & C#', 'Developer: Farah Amalia', 'Finalis // Indonesian Young Inventor', 'col-span-2 row-span-1', 5);

-- Seed site_content
insert into public.site_content (key, value, value_en) values
  ('hero_title', 'Teknik Informatika UMB Bandung', 'Informatics Engineering UMB Bandung'),
  ('hero_subtitle', 'Membentuk Software Engineer dan Praktisi Cloud Modern Berbasis Nilai Islam & Inovasi Teknologi.', 'Forming Modern Software Engineers and Cloud Practitioners based on Islamic Values & Tech Innovation.'),
  ('kaprodi_welcome', 'Selamat datang di portal resmi Program Studi S1 Teknik Informatika Universitas Muhammadiyah Bandung. Kami berkomitmen untuk mencetak pemimpin teknologi dan rekayasawan perangkat lunak masa depan yang menguasai komputasi modern, sistem pemrograman, dan kecerdasan buatan.', 'Welcome to the official portal of the S1 Program in Informatics Engineering at Universitas Muhammadiyah Bandung. We are committed to shaping future technology leaders and software engineers who master modern computing, programming systems, and artificial intelligence.'),
  ('kaprodi_welcome_p2', 'Fokus pengembangan kami terletak pada integrasi kemajuan ilmu komputer dengan kebutuhan praktis industri, menciptakan solusi dan sistem digital yang berdaya saing global serta berdampak sosial.', 'Our development focus lies in integrating computer science advancements with practical industry needs, creating digital solutions and systems that are globally competitive and socially impactful.'),
  ('kaprodi_photo_url', '/assets/kaprodi.png', '/assets/kaprodi.png'),
  ('logo_prodi_url', '', ''),
  ('kaprodi_name', 'M. Yusuf Efendi, S.T., M.T.', 'M. Yusuf Efendi, S.T., M.T.'),
  ('kaprodi_title', 'Ketua Program Studi Teknik Informatika', 'Head of Informatics Engineering Department'),
  ('sambutan_title', 'Sambutan Kepala Program Studi', 'Head of Department\'s Welcome'),
  ('philosophy_title', 'Filosofi Pembelajaran Kami', 'Our Learning Philosophy'),
  ('philosophy_body', 'Kami percaya bahwa pemrograman bukan hanya tentang mengetik baris kode, melainkan tentang membangun solusi komputasi yang efisien, etis, dan memberikan dampak nyata bagi masyarakat.', 'We believe programming is not just about writing lines of code, but about building efficient, ethical computing solutions that deliver real impact to society.');
