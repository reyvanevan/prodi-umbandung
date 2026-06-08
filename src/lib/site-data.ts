export interface ProductItem {
  sku: string;
  name: string;
  material: string;
  fabric: string;
  gridClass?: string;
  aspectRatio: string;
  imgSrc: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  snippet: string;
  imgSrc: string;
}

export interface EventItem {
  id: string;
  dateDay: string;
  dateMonth: string;
  title: string;
  location: string;
}

export interface ProgramHighlight {
  id: string;
  title: string;
  tag: string;
  description: string;
  details: string[];
}

export interface TestimonialItem {
  id: string;
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
}

// Student Achievements Gallery
export const MONO_PRODUCTS: ProductItem[] = [
  {
    sku: 'AWARD-01',
    name: 'Golden Heritage Eco-Gown',
    material: 'DESIGNER: NAILA PUTRI',
    fabric: 'JUARA I // FASHION DESIGN COMPETITION',
    gridClass: 'lg:col-span-2 lg:row-span-2',
    aspectRatio: 'aspect-[4/3] lg:aspect-auto lg:h-full',
    imgSrc: '/assets/portfolio-organic-gown.jpg',
  },
  {
    sku: 'AWARD-02',
    name: 'Contemporary Woven Songket',
    material: 'DESIGNER: DANIEL WIJAYA',
    fabric: 'KARYA TERBAIK // EXHIBITION ITB',
    aspectRatio: 'aspect-[3/4]',
    imgSrc: '/assets/portfolio-songket.jpg',
  },
  {
    sku: 'AWARD-03',
    name: 'Structured Ikat Utility Jacket',
    material: 'DESIGNER: ARYA DINATA',
    fabric: 'PAMERAN UTAMA // JOGJA FASHION WEEK',
    aspectRatio: 'aspect-[3/4]',
    imgSrc: '/assets/portfolio-ikat-jacket.jpg',
  },
  {
    sku: 'AWARD-04',
    name: 'Batik Sogan Pewarna Alami',
    material: 'DESIGNER: RYU HANSEN',
    fabric: 'KARYA INOVATIF // WARISAN BUDAYA',
    aspectRatio: 'aspect-square',
    imgSrc: '/assets/portfolio-batik.jpg',
  },
  {
    sku: 'AWARD-05',
    name: 'Urban Shibori Ready-To-Wear',
    material: 'DESIGNER: FARAH AMALIA',
    fabric: 'FINALIS // NATIONAL YOUNG DESIGNER AWARD',
    gridClass: 'lg:col-span-2',
    aspectRatio: 'aspect-[16/9] lg:aspect-[21/9]',
    imgSrc: '/assets/portfolio-ready-to-wear.jpg',
  },
];

// Academic News
export const ACADEMIC_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Pelatihan Teknik Pewarna Alami untuk Pengrajin Lokal',
    date: '02 JUN 2026',
    category: 'PENGABDIAN MASYARAKAT',
    snippet: 'Dosen dan mahasiswa Kriya Tekstil & Fashion UMB menyelenggarakan workshop pemanfaatan tanaman lokal Bandung sebagai pewarna alami berkelanjutan.',
    imgSrc: '/assets/portfolio-ecoprint.jpg',
  },
  {
    id: 'news-2',
    title: 'Mahasiswa KTF UMB Raih Penghargaan Karya Terbaik di Pameran Nasional',
    date: '28 MAY 2026',
    category: 'PRESTASI MAHASISWA',
    snippet: 'Mengangkat tema warisan budaya sunda dengan teknik anyaman modern, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.',
    imgSrc: '/assets/portfolio-woven-bag.jpg',
  },
  {
    id: 'news-3',
    title: 'Kolaborasi Riset Serat Alam Bersama Asosiasi Serat Tekstil',
    date: '15 MAY 2026',
    category: 'KOLABORASI RISET',
    snippet: 'Program studi resmi menandatangani kerjasama pengembangan standardisasi kompetensi kriya tekstil berbasis serat lokal ramah lingkungan.',
    imgSrc: '/assets/philosophy-lab-editorial.jpg',
  },
];

// Academic Events
export const ACADEMIC_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    dateDay: '18',
    dateMonth: 'JUN',
    title: 'KRIYAFEST 2026: Graduation Fashion Show & Craft Exhibition',
    location: 'AULA UTAMA KH. AHMAD DAHLAN, UMBANDUNG',
  },
  {
    id: 'event-2',
    dateDay: '25',
    dateMonth: 'JUN',
    title: 'Workshop Kriya Tekstil: Eksperimen Tekstil & Reka Latar',
    location: 'STUDIO KRIYA UTAMA, GEDUNG UMB',
  },
  {
    id: 'event-3',
    dateDay: '05',
    dateMonth: 'JUL',
    title: 'Kuliah Umum: Masa Depan Kriya & Industri Kreatif Nusantara',
    location: 'AUDITORIUM UTAMA UMBANDUNG',
  },
];

// Program Unggulan Highlights
export const PROGRAM_HIGHLIGHTS: ProgramHighlight[] = [
  {
    id: 'prog-1',
    title: 'MBKM Internal & Eksternal',
    tag: 'PROGRAM: MERDEKA_BELAJAR',
    description: 'Konversi SKS magang industri kreatif, riset kriya lokal, KKN tematik budaya, pertukaran mahasiswa, hingga wirausaha mandiri.',
    details: ['Magang Industri Kriya & Mode', 'Riset Kerjasama Tekstil Berkelanjutan', 'Pertukaran Mahasiswa Nasional', 'Wirausaha Merdeka UMB'],
  },
  {
    id: 'prog-2',
    title: 'Sertifikasi Profesi Kriya Mode',
    tag: 'CREDENTIAL: LSP_KOMPETENSI',
    description: 'Setiap lulusan dibekali sertifikasi kompetensi keahlian kriya tekstil yang diakui secara nasional untuk memperkuat portofolio industri.',
    details: ['Uji Kompetensi Perancang Busana/Tekstil', 'Sertifikasi Standardisasi Kompetensi', 'Pengakuan BNSP Nasional', 'Support Penilaian Portofolio Karya'],
  },
  {
    id: 'prog-3',
    title: 'Akselerasi Studi / Fast Track',
    tag: 'TIMELINE: ACCELERATED_STUDY',
    description: 'Rancangan kurikulum terpadu yang membantu mahasiswa menyelesaikan perkuliahan sarjana secara efektif dengan luaran siap kerja.',
    details: ['Kurikulum Terintegrasi Proyek', 'Bimbingan Tugas Akhir Terfokus', 'Pembimbing dari Praktisi Industri', 'Pameran Kelulusan Karya Mandiri'],
  },
  {
    id: 'prog-4',
    title: 'Outcome-Based Education',
    tag: 'METHODOLOGY: OBE_CURRICULUM',
    description: 'Metode pembelajaran berbasis luaran riil berupa produk kriya, fashion apparel, dan proyek kolaboratif berkala.',
    details: ['Penilaian Berbasis Hasil Proyek', 'Evaluasi Portofolio Berkala', 'Penyelarasan dengan Kebutuhan Industri', 'Keseimbangan Teori dan Eksperimen Studio'],
  },
];

// Alumni Testimonials (Updated with local assets)
export const ALUMNI_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    tempId: 0,
    testimonial: 'Materi kurikulum yang berfokus pada teknik kriya tradisional dengan sentuhan desain modern sangat relevan dengan kebutuhan industri kriya tekstil saat ini.',
    by: 'Andini Kusuma, S.Ds (Creative Designer at Oltre Textile Studio)',
    imgSrc: '/assets/alumni_1.png',
  },
  {
    id: 'test-2',
    tempId: 1,
    testimonial: 'Program magang studio memberikan saya kesempatan berjejaring langsung dengan industri kreatif nasional sejak awal perkuliahan.',
    by: 'Rian Hidayat, S.Ds (Textile Designer at PT Sritex Tbk)',
    imgSrc: '/assets/alumni_2.png',
  },
  {
    id: 'test-3',
    tempId: 2,
    testimonial: 'KTF UMB benar-benar mengasah kemampuan berpikir kreatif saya dalam memadukan material lokal dengan teknologi modern.',
    by: 'Melati Indah, S.Ds (Founder of Bumi Eco-Wear)',
    imgSrc: '/assets/alumni_1.png',
  },
  {
    id: 'test-4',
    tempId: 3,
    testimonial: 'Suasana studio yang kolaboratif membuat saya terbiasa melakukan eksperimen desain tanpa takut gagal.',
    by: "Fauzan Adhi, S.Ds (Fashion Stylist at Harper's Bazaar)",
    imgSrc: '/assets/alumni_2.png',
  },
  {
    id: 'test-5',
    tempId: 4,
    testimonial: 'Pembekalan portofolio berkala selama perkuliahan sangat mempermudah saya ketika melamar kerja di retail mode internasional.',
    by: 'Sarah Amalia, S.Ds (Visual Merchandiser at H&M)',
    imgSrc: '/assets/alumni_1.png',
  },
  {
    id: 'test-6',
    tempId: 5,
    testimonial: 'Berkat bimbingan intensif dosen-dosen praktisi, saya bisa merilis koleksi kelulusan saya di ajang pameran nasional.',
    by: 'Yusuf Maulana, S.Ds (Independent Fiber Artist)',
    imgSrc: '/assets/alumni_2.png',
  },
];

// Partners
export const PARTNERS: string[] = [
  'ASOSIASI KRIYA TEKSTIL INDONESIA',
  'ASOSIASI DESAINER MODE BANDUNG',
  'PT SRITEX TBK',
  'TEKSTIL SEJAHTERA UTAMA',
  'KEMENTERIAN PARIWISATA & EKONOMI KREATIF',
  'HIMPUNAN MAHASISWA KRIYA (HIMAKRIYA)',
];
