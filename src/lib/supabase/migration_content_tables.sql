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
   'Berhasil memperoleh predikat akreditasi ''Baik Sekali'' atas standar sarana laboratorium dan kesesuaian kurikulum Kriya Tekstil dan Fashion.',
   'Achieved the superior ''Baik Sekali'' standard for laboratory facilities and curriculum alignment in Textile & Fashion Craft.',
   null, null, null, 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop', 1),
  ('prodi', 'Kerjasama Pameran Eksklusif dengan Rumah Batik Komar', 'Exhibition Partnership with Rumah Batik Komar', '2023',
   'Menjalin kerjasama pameran bersama dan program laboratorium studio untuk melestarikan warisan batik tradisional Jawa Barat.',
   'Established a joint showcase and studio laboratory program to preserve traditional West Java batik heritage.',
   null, null, null, 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop', 2),
  ('prodi', 'Penerima Hibah Riset Kemendikbudristek Pewarnaan Alami Berkelanjutan', 'Kemendikbud Research Grant on Sustainable Natural Dyes', '2024',
   'Memperoleh pendanaan riset nasional untuk penelitian ekstraksi zat warna alami lokal dan aplikasinya pada tenun serat alam.',
   'Received national funding for research on local organic dye extraction and its application on handwoven textiles.',
   null, null, null, 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop', 3),
  ('mahasiswa', 'Juara I Medali Emas // Kompetisi Desain Mode Nasional', '1st Place Gold Medal // National Fashion Design Competition', '2024',
   'Mengembangkan gaun malam berkelanjutan berkonsep zero-waste dengan teknik pewarnaan ecoprint organik lokal.',
   'Developed a sustainable zero-waste evening gown featuring local organic ecoprint techniques.',
   'Indonesian Fashion Chamber (IFC)', 'Indonesian Fashion Chamber (IFC)', 'Naila Putri & Tim',
   '/assets/portfolio-organic-gown.jpg', 4),
  ('mahasiswa', 'Karya Kontemporer Terbaik // Pameran Kriya & Tekstil Nasional', 'Best Contemporary Work // National Craft & Textile Exhibition', '2023',
   'Membuat karya tapestri struktur kontemporer yang memanfaatkan limbah benang katun dan anyaman bambu alami.',
   'Created a contemporary structural tapestry utilizing waste cotton threads and natural bamboo splits.',
   'Asosiasi Eksportir dan Produsen Handicraft Indonesia (ASEPHI)', 'ASEPHI', 'Daniel Wijaya',
   '/assets/portfolio-songket.jpg', 5),
  ('mahasiswa', 'Pemenang Penghargaan Wirausaha Muda Kreatif', 'Winner of Young Creativepreneur Award', '2024',
   'Penghargaan atas perancangan startup produk streetwear ramah lingkungan dengan pewarnaan ekstrak tumbuhan.',
   'Recognized for developing an eco-friendly local streetwear startup utilizing plant-based dye prints.',
   'Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf)', 'Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf)', 'Farah Amalia',
   '/assets/portfolio-ready-to-wear.jpg', 6)
) as v(type, title, title_en, year, "desc", desc_en, host, host_en, competitor, image_url, sort_order)
where not exists (select 1 from public.prestasi limit 1);

-- Seed publikasi_dosen
insert into public.publikasi_dosen (title, title_en, author, journal, journal_en, year, category, category_en, link, sort_order)
select * from (values
  ('Pengembangan Metode Ecoprint Organik Berkelanjutan pada Kain Sutra Menggunakan Flora Lokal',
   'Development of Sustainable Organic Ecoprint Methods on Silk Fabric Using Local Flora',
   'Dra. Saftiyaningsih Ken Atik, M.Ds.',
   'Jurnal Kriya & Tekstil Nusantara, Vol. 8 No. 2',
   'Journal of Nusantara Textile & Craft, Vol. 8 No. 2',
   '2025', 'JURNAL NASIONAL', 'NATIONAL JOURNAL', 'https://sinta.kemdiktisaintek.go.id/', 1),
  ('Analisis Struktur Tenun Songket Jawa Barat: Evolusi Motif dan Teknik Pembuatan',
   'Structure Analysis of Handwoven Songket in West Java: Evolution of Motif and Techniques',
   'Dr. Komarudin Kudiya, S.IP., M.Ds.',
   'Seminar Nasional Desain & Kriya Kontemporer (SENDIK)',
   'National Seminar on Contemporary Craft & Design',
   '2024', 'PROSIDING SEMINAR', 'SEMINAR PROCEEDINGS', 'https://sinta.kemdiktisaintek.go.id/', 2),
  ('Exploration of Natural Color Pigments from Banana Pseudo-Stem for Ready-to-Wear Textiles',
   null,
   'Ghaida Nasya Putri, S.Ds., M.Ds.',
   'International Journal of Sustainable Fashion and Design Studies',
   null,
   '2024', 'JURNAL INTERNASIONAL', 'INTERNATIONAL JOURNAL', 'https://sinta.kemdiktisaintek.go.id/', 3)
) as v(title, title_en, author, journal, journal_en, year, category, category_en, link, sort_order)
where not exists (select 1 from public.publikasi_dosen limit 1);

-- Seed kegiatan_dosen
insert into public.kegiatan_dosen (title, title_en, date_text, date_text_en, location, "desc", desc_en, image_url, sort_order)
select * from (values
  ('Pameran Seni Kriya Kontemporer Internasional 2025', 'International Contemporary Craft Exhibition 2025',
   '12 Maret 2025', 'March 12, 2025', 'Kuala Lumpur, Malaysia',
   'Dosen Kriya Tekstil dan Fashion mempresentasikan karya instalasi serat tenun inovatif berbahan bambu dan pewarna alami pada simposium kriya Asia Tenggara.',
   'Faculty presented innovative handwoven art installations combining traditional bamboo split and organic dyes at the Southeast Asian craft symposium.',
   '/assets/kegiatan-d1.png', 1),
  ('Pelatihan Ecoprint Organik bagi Pelaku UMKM Kriya & Fashion', 'Organic Ecoprint Workshop for Craft and Fashion MSMEs',
   '18 Oktober 2024', 'October 18, 2024', 'Soreang, Bandung',
   'PKM berupa workshop pembuatan cetak daun (ecoprint) pada media sutra untuk mendorong komersialisasi produk ramah lingkungan.',
   'A Public Service initiative providing training on eco-friendly leaf printing on silk fabrics to help local crafters create sustainable commercial products.',
   '/assets/kegiatan-d2.png', 2),
  ('Riset Kolaborasi Ekstraksi Serat Alam Hayati Bersama BRIN', 'Collaborative Research on Fiber Extraction with BRIN',
   '04 Juni 2024', 'June 04, 2024', 'BRIN Materials Lab, Serpong',
   'Kolaborasi riset dosen dalam mengekstrak serat daun nanas untuk pengembangan bahan baku benang tenun premium.',
   'A strategic research collaboration by lecturers studying extraction of pineapple leaf fibers for premium structural woven fabric applications.',
   '/assets/kegiatan-d3.png', 3)
) as v(title, title_en, date_text, date_text_en, location, "desc", desc_en, image_url, sort_order)
where not exists (select 1 from public.kegiatan_dosen limit 1);

-- Seed kegiatan_mahasiswa
insert into public.kegiatan_mahasiswa (title, title_en, date_text, date_text_en, location, "desc", desc_en, image_url, sort_order)
select * from (values
  ('KTF Fashion Show & Art Exhibition 2026', 'KTF Fashion Show & Art Exhibition 2026',
   '24-28 Februari 2026', 'February 24-28, 2026', 'Gedung Rektorat UMB, Bandung',
   'Pameran karya kelulusan tugas akhir mahasiswa angkatan pertama, menampilkan inovasi surface & structure design serta koleksi busana siap pakai bertema Nusantara.',
   'The premier graduation project exhibition showcasing the masterpiece innovations of students, highlighting surface & structure textile designs and Nusantara streetwear collections.',
   '/assets/kegiatan-m1.png', 1),
  ('National Textile Craft Hackathon: Eksperimen Material Serat Alam', 'National Textile Craft Hackathon: Natural Fiber Material Experimentation',
   '05 Maret 2026', 'March 05, 2026', 'Bandung Tech Hall, Bandung',
   'Kompetisi inovasi kriya tekstil tingkat nasional untuk menciptakan produk fungsional berbahan dasar limbah serat alam lokal dalam 24 jam.',
   'An intensive national craft design competition to create functional lifestyle products from local natural fiber waste in 24 hours.',
   '/assets/kegiatan-m2.png', 2),
  ('HIMAKRIYA Eco-Fashion Camp: Edukasi Pewarnaan Alam untuk Pengrajin Lokal', 'HIMAKRIYA Eco-Fashion Camp: Natural Dyeing Training for Local Crafters',
   '14 November 2025', 'November 14, 2025', 'Kampus UMB, Bandung',
   'Program reguler Himpunan Mahasiswa memberikan penyuluhan teknik pewarnaan alam ramah lingkungan dan teknik mordanting serat bagi pengrajin lokal.',
   'A public community service campaign by HIMAKRIYA, introducing sustainable natural dyeing and mordanting methods to local textile crafters.',
   '/assets/kegiatan-m3.png', 3)
) as v(title, title_en, date_text, date_text_en, location, "desc", desc_en, image_url, sort_order)
where not exists (select 1 from public.kegiatan_mahasiswa limit 1);

-- Seed alumni
insert into public.alumni (name, class_of, class_of_en, role, company, quote, quote_en, image_url, sort_order)
select * from (values
  ('Amelia Rahma, S.Ds.', 'Angkatan 2019', 'Class of 2019', 'Lead Fashion Designer', 'PT Dan Liris (Tekstil & Fashion)',
   'Di prodi KTF, saya diajarkan secara mendalam tentang surface & structure design serta konstruksi pola. Ini sangat membantu karir saya memimpin tim desain koleksi busana siap pakai.',
   'At KTF, I was taught surface & structure design and pattern drafting in depth. This greatly helped my career in leading ready-to-wear fashion collection design teams.',
   '/assets/alumni-1.png', 1),
  ('Bagus Pratama, S.Ds.', 'Angkatan 2020', 'Class of 2020', 'Founder & Creative Director', 'Bumi Serat Nusantara (Craft Studio)',
   'Kurikulum creativepreneurship mode dan eksplorasi material serat lokal mematangkan mental bisnis saya untuk mendirikan studio kriya tekstil mandiri berbasis eco-fashion.',
   'The fashion creativepreneurship curriculum and local fiber material exploration matured my business mindset to establish an independent eco-fashion textile craft studio.',
   '/assets/alumni-2.png', 2),
  ('Risa Fitria, S.Ds.', 'Angkatan 2019', 'Class of 2019', 'Visual Merchandiser Lead', 'PT Mitra Adiperkasa Tbk',
   'Studi tren fashion, moodboard, dan penataan display visual produk kriya-busana di perkuliahan memberi saya portofolio kuat untuk bersaing di industri retail fashion multinasional.',
   'Studying fashion trends, moodboards, and visual merchandising layouts in class gave me a strong portfolio to excel in multinational fashion retail industries.',
   '/assets/alumni-3.png', 3)
) as v(name, class_of, class_of_en, role, company, quote, quote_en, image_url, sort_order)
where not exists (select 1 from public.alumni limit 1);

-- Seed alumni_sectors
insert into public.alumni_sectors (name, name_en, percentage, sort_order)
select * from (values
  ('Industri Fashion & Konveksi Busana', 'Fashion & Garment Manufacturing Industry', '45%', 1),
  ('Desainer Tekstil, Surface & Structure (R&D)', 'Textile, Surface & Structure Designer (R&D)', '30%', 2),
  ('Wirausaha Kriya Mandiri & Brand Fashion', 'Craft Studios & Independent Fashion Brands', '15%', 3),
  ('Stylist, Merchandiser, & Pengarah Seni Visual', 'Fashion Styling, Visual Merchandising, & Art Direction', '10%', 4)
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
