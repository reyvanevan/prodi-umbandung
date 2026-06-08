-- 1. Create news table
create table public.news (
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
create table public.events (
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
create table public.testimonials (
  id uuid default gen_random_uuid() primary key,
  testimonial text not null,
  testimonial_en text,
  by text not null,
  by_en text,
  img_src text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Create partners table
create table public.partners (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Enable Row Level Security (RLS) for all tables
alter table public.news enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;
alter table public.partners enable row level security;

-- 6. Create Read policies (Public Select)
create policy "Allow public read-only access for news" on public.news for select using (true);
create policy "Allow public read-only access for events" on public.events for select using (true);
create policy "Allow public read-only access for testimonials" on public.testimonials for select using (true);
create policy "Allow public read-only access for partners" on public.partners for select using (true);

-- 7. Create Write policies (Authenticated Admin only)
create policy "Allow admin write access for news" on public.news for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for events" on public.events for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for testimonials" on public.testimonials for all using (auth.role() = 'authenticated');
create policy "Allow admin write access for partners" on public.partners for all using (auth.role() = 'authenticated');

-- 8. Seed Partners
insert into public.partners (name) values
  ('ASOSIASI KRIYA TEKSTIL INDONESIA'),
  ('ASOSIASI DESAINER MODE BANDUNG'),
  ('PT SRITEX TBK'),
  ('TEKSTIL SEJAHTERA UTAMA'),
  ('KEMENTERIAN PARIWISATA & EKONOMI KREATIF'),
  ('HIMPUNAN MAHASISWA KRIYA (HIMAKRIYA)');

-- 9. Seed Events
insert into public.events (date_day, date_month, title, title_en, location, location_en) values
  ('18', 'JUN', 'KRIYAFEST 2026: Graduation Fashion Show & Craft Exhibition', 'KRIYAFEST 2026: Graduation Fashion Show & Craft Exhibition', 'AULA UTAMA KH. AHMAD DAHLAN, UMBANDUNG', 'KH. AHMAD DAHLAN MAIN HALL, UMBANDUNG'),
  ('25', 'JUN', 'Workshop Kriya Tekstil: Eksperimen Tekstil & Reka Latar', 'Textile Craft Workshop: Fabric Experiments & Surface Design', 'STUDIO KRIYA UTAMA, GEDUNG UMB', 'MAIN CRAFT STUDIO, UMB BUILDING'),
  ('05', 'JUL', 'Kuliah Umum: Masa Depan Kriya & Industri Kreatif Nusantara', 'Public Lecture: The Future of Craft & Nusantara Creative Industries', 'AUDITORIUM UTAMA UMBANDUNG', 'MAIN AUDITORIUM, UMBANDUNG');

-- 10. Seed Testimonials
insert into public.testimonials (testimonial, testimonial_en, by, by_en, img_src) values
  ('Materi kurikulum yang berfokus pada teknik kriya tradisional dengan sentuhan desain modern sangat relevan dengan kebutuhan industri kriya tekstil saat ini.', 'The curriculum focusing on traditional craft techniques with a touch of modern design is highly relevant to today''s textile craft industry.', 'Andini Kusuma, S.Ds (Creative Designer at Oltre Textile Studio)', 'Andini Kusuma, S.Ds (Creative Designer at Oltre Textile Studio)', '/assets/alumni_1.png'),
  ('Program magang studio memberikan saya kesempatan berjejaring langsung dengan industri kreatif nasional sejak awal perkuliahan.', 'The studio internship program gave me the opportunity to network directly with the national creative industry from the very beginning.', 'Rian Hidayat, S.Ds (Textile Designer at PT Sritex Tbk)', 'Rian Hidayat, S.Ds (Textile Designer at PT Sritex Tbk)', '/assets/alumni_2.png'),
  ('KTF UMB benar-benar mengasah kemampuan berpikir kreatif saya dalam memadukan material lokal dengan teknologi modern.', 'KTF UMB truly honed my creative thinking in combining local materials with modern technology.', 'Melati Indah, S.Ds (Founder of Bumi Eco-Wear)', 'Melati Indah, S.Ds (Founder of Bumi Eco-Wear)', '/assets/alumni_1.png'),
  ('Suasana studio yang kolaboratif membuat saya terbiasa melakukan eksperimen desain tanpa takut gagal.', 'The collaborative studio atmosphere got me used to experimenting with designs without being afraid to fail.', 'Fauzan Adhi, S.Ds (Fashion Stylist at Harper''s Bazaar)', 'Fauzan Adhi, S.Ds (Fashion Stylist at Harper''s Bazaar)', '/assets/alumni_2.png'),
  ('Pembekalan portofolio berkala selama perkuliahan sangat mempermudah saya ketika melamar kerja di retail mode internasional.', 'Regular portfolio guidance during my studies made it very easy for me to apply for jobs at international fashion retail brands.', 'Sarah Amalia, S.Ds (Visual Merchandiser at H&M)', 'Sarah Amalia, S.Ds (Visual Merchandiser at H&M)', '/assets/alumni_1.png'),
  ('Berkat bimbingan intensif dosen-dosen praktisi, saya bisa merilis koleksi kelulusan saya di ajang pameran nasional.', 'Thanks to intensive mentoring from industry-practitioner lecturers, I was able to release my graduation collection at a national exhibition.', 'Yusuf Maulana, S.Ds (Independent Fiber Artist)', 'Yusuf Maulana, S.Ds (Independent Fiber Artist)', '/assets/alumni_2.png');

-- 11. Seed News
insert into public.news (title, title_en, category, category_en, snippet, snippet_en, date, img_src) values
  ('Pelatihan Teknik Pewarna Alami untuk Pengrajin Lokal', 'Natural Dyeing Techniques Training for Local Artisans', 'PENGABDIAN MASYARAKAT', 'COMMUNITY SERVICE', 'Dosen dan mahasiswa Kriya Tekstil & Fashion UMB menyelenggarakan workshop pemanfaatan tanaman lokal Bandung sebagai pewarna alami berkelanjutan.', 'UMB Textile Craft & Fashion faculty and students held a workshop on utilizing Bandung''s local plants as sustainable natural dyes.', '02 JUN 2026', '/assets/portfolio-ecoprint.jpg'),
  ('Mahasiswa KTF UMB Raih Penghargaan Karya Terbaik di Pameran Nasional', 'KTF UMB Student Wins Best Work Award at National Exhibition', 'PRESTASI MAHASISWA', 'STUDENT ACHIEVEMENT', 'Mengangkat tema warisan budaya sunda dengan teknik anyaman modern, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.', 'Featuring Sundanese cultural heritage using modern weaving techniques, the work of the 2024 cohort student wowed the jury panels.', '28 MAY 2026', '/assets/portfolio-woven-bag.jpg'),
  ('Kolaborasi Riset Serat Alam Bersama Asosiasi Serat Tekstil', 'Collaborative Natural Fiber Research with Textile Fiber Association', 'KOLABORASI RISET', 'RESEARCH COLLABORATION', 'Program studi resmi menandatangani kerjasama pengembangan standardisasi kompetensi kriya tekstil berbasis serat lokal ramah lingkungan.', 'The study program officially signed a partnership to develop eco-friendly local fiber-based textile craft competency standards.', '15 MAY 2026', '/assets/philosophy-lab-editorial.jpg');

-- 12. Create landing_stats table
create table if not exists public.landing_stats (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  label text not null,
  sort_order int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.landing_stats enable row level security;
create policy "Allow public read-only access for landing_stats" on public.landing_stats for select using (true);
create policy "Allow admin write access for landing_stats" on public.landing_stats for all using (auth.role() = 'authenticated');

-- 13. Create landing_portfolio_items table
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
alter table public.landing_portfolio_items enable row level security;
create policy "Allow public read-only access for landing_portfolio_items" on public.landing_portfolio_items for select using (true);
create policy "Allow admin write access for landing_portfolio_items" on public.landing_portfolio_items for all using (auth.role() = 'authenticated');

-- 14. Seed landing_stats
insert into public.landing_stats (number, label, sort_order) values
  ('180+', 'MAHASISWA AKTIF KREATIF', 1),
  ('240+', 'ALUMNI TERSEBAR', 2),
  ('16+', 'DOSEN PENGAMPU AHLI', 3),
  ('50+', 'MATA KULIAH UNGGULAN', 4);

-- 15. Seed landing_portfolio_items
insert into public.landing_portfolio_items (image, title, medium, technique, year, "gridClass", sort_order) values
  ('/assets/portfolio-organic-gown.jpg', 'Golden Heritage Eco-Gown', 'DESIGNER: NAILA PUTRI', 'JUARA I // FASHION DESIGN COMPETITION', 'AWARD-01', 'lg:col-span-2 lg:row-span-2', 1),
  ('/assets/portfolio-songket.jpg', 'Contemporary Woven Songket', 'DESIGNER: DANIEL WIJAYA', 'KARYA TERBAIK // EXHIBITION ITB', 'AWARD-02', 'col-span-1', 2),
  ('/assets/portfolio-ikat-jacket.jpg', 'Structured Ikat Utility Jacket', 'DESIGNER: ARYA DINATA', 'PAMERAN UTAMA // JOGJA FASHION WEEK', 'AWARD-03', 'col-span-1', 3),
  ('/assets/portfolio-batik.jpg', 'Batik Sogan Pewarna Alami', 'DESIGNER: RYU HANSEN', 'KARYA INOVATIF // WARISAN BUDAYA', 'AWARD-04', 'col-span-1', 4),
  ('/assets/portfolio-ready-to-wear.jpg', 'Urban Shibori Ready-To-Wear', 'DESIGNER: FARAH AMALIA', 'FINALIS // NATIONAL YOUNG DESIGNER AWARD', 'AWARD-05', 'lg:col-span-2', 5);
