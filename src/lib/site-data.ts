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
    sku: 'PROJ-01',
    name: 'Analog Rice from Local Tubers',
    material: 'DEVELOPER: NAILA PUTRI',
    fabric: 'JUARA I // INOVASI PANGAN NASIONAL',
    gridClass: 'lg:col-span-2 lg:row-span-2',
    aspectRatio: 'aspect-[4/3] lg:aspect-auto lg:h-full',
    imgSrc: '/assets/portfolio-organic-gown.jpg',
  },
  {
    sku: 'PROJ-02',
    name: 'Probiotic Beverage from Local Fruits',
    material: 'DEVELOPER: DANIEL WIJAYA',
    fabric: 'KARYA TERBAIK // EXHIBITION ITB',
    aspectRatio: 'aspect-[3/4]',
    imgSrc: '/assets/portfolio-songket.jpg',
  },
  {
    sku: 'PROJ-03',
    name: 'Biodegradable Edible Film Packaging',
    material: 'DEVELOPER: ARYA DINATA',
    fabric: 'PROYEK RISET // KEMENTERIAN DIKTI',
    aspectRatio: 'aspect-[3/4]',
    imgSrc: '/assets/portfolio-ikat-jacket.jpg',
  },
  {
    sku: 'PROJ-04',
    name: 'High-Protein Tempeh Snack Bar',
    material: 'DEVELOPER: RYU HANSEN',
    fabric: 'KARYA INOVATIF // GLOBAL HEALTH',
    aspectRatio: 'aspect-square',
    imgSrc: '/assets/portfolio-batik.jpg',
  },
  {
    sku: 'PROJ-05',
    name: 'Instant Halal Bone Broth Powder',
    material: 'DEVELOPER: FARAH AMALIA',
    fabric: 'FINALIS // INDONESIAN YOUNG INVENTOR',
    gridClass: 'lg:col-span-2',
    aspectRatio: 'aspect-[16/9] lg:aspect-[21/9]',
    imgSrc: '/assets/portfolio-ready-to-wear.jpg',
  },
];

// Academic News
export const ACADEMIC_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Workshop Pengolahan Pangan Higienis untuk Pengrajin Tempe Lokal',
    date: '02 JUN 2026',
    category: 'PENGABDIAN MASYARAKAT',
    snippet: 'Dosen dan mahasiswa Teknologi Pangan UMB menyelenggarakan workshop pemanfaatan bioteknologi tempe lokal untuk meningkatkan nilai jual produk UMKM.',
    imgSrc: '/assets/portfolio-ecoprint.jpg',
  },
  {
    id: 'news-2',
    title: 'Tim Mahasiswa Teknologi Pangan UMB Raih Juara I Inovasi Pangan Nasional',
    date: '28 MAY 2026',
    category: 'PRESTASI MAHASISWA',
    snippet: 'Mengusung tema Zero Waste Food Processing dengan teknik fermentasi modern, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.',
    imgSrc: '/assets/portfolio-woven-bag.jpg',
  },
  {
    id: 'news-3',
    title: 'Kolaborasi Riset Pangan Halal Bersama Asosiasi Teknologi Pangan',
    date: '15 MAY 2026',
    category: 'KOLABORASI RISET',
    snippet: 'Program studi resmi menandatangani kerjasama riset pengembangan bahan pengemas biodegradable dari pati umbi lokal.',
    imgSrc: '/assets/philosophy-lab-editorial.jpg',
  },
];

// Academic Events
export const ACADEMIC_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    dateDay: '18',
    dateMonth: 'JUN',
    title: 'EXPO PANGAN 2026: Capstone Exhibition & Food Innovation Show UMB',
    location: 'AULA UTAMA KH. AHMAD DAHLAN, UMBANDUNG',
  },
  {
    id: 'event-2',
    dateDay: '25',
    dateMonth: 'JUN',
    title: 'Workshop Sertifikasi Halal: Sistem Jaminan Produk Halal',
    location: 'LABORATORIUM PANGAN GEDUNG UMB',
  },
  {
    id: 'event-3',
    dateDay: '05',
    dateMonth: 'JUL',
    title: 'Kuliah Umum: Tren Ketahanan Pangan & Biorefinery Sirkular Global',
    location: 'AUDITORIUM UTAMA UMBANDUNG',
  },
];

// Program Unggulan Highlights
export const PROGRAM_HIGHLIGHTS: ProgramHighlight[] = [
  {
    id: 'prog-1',
    title: 'MBKM Internal & Eksternal',
    tag: 'PROGRAM: MERDEKA_BELAJAR',
    description: 'Konversi SKS magang industri pangan, riset pangan lokal, KKN tematik digitalisasi pangan desa, pertukaran mahasiswa, hingga wirausaha pangan mandiri.',
    details: ['Magang Industri Pangan & Instansi', 'Riset Kerjasama Eksplorasi Pangan Lokal', 'Pertukaran Mahasiswa Sains Pangan Nasional', 'Wirausaha Pangan Merdeka UMB'],
  },
  {
    id: 'prog-2',
    title: 'Sertifikasi Kompetensi Mutu & Halal',
    tag: 'CREDENTIAL: LSP_KOMPETENSI',
    description: 'Setiap lulusan dibekali sertifikasi kompetensi penjaminan mutu dan halal yang diakui secara nasional.',
    details: ['Uji Kompetensi Quality Assurance', 'Sertifikasi Auditor Halal / Keamanan Pangan', 'Pengakuan BNSP Nasional', 'Support Penilaian Portofolio Produk'],
  },
  {
    id: 'prog-3',
    title: 'Akselerasi Studi / Portofolio Terfokus',
    tag: 'TIMELINE: ACCELERATED_STUDY',
    description: 'Rancangan kurikulum terpadu yang membantu mahasiswa menyelesaikan perkuliahan sarjana secara efektif dengan portofolio siap kerja.',
    details: ['Kurikulum Terintegrasi Proyek Produk', 'Bimbingan Tugas Akhir Terfokus', 'Pembimbing dari Praktisi & Industri Pangan', 'Pameran Kelulusan Inovasi Pangan'],
  },
  {
    id: 'prog-4',
    title: 'Outcome-Based Education',
    tag: 'METHODOLOGY: OBE_CURRICULUM',
    description: 'Metode pembelajaran berbasis luaran riil berupa produk pangan fungsional, analisis laboratorium, dan proyek kolaboratif berkala.',
    details: ['Penilaian Berbasis Hasil Karya & Riset', 'Evaluasi Portofolio Berkala', 'Penyelarasan dengan Tren Industri Pangan', 'Keseimbangan Teori Sains dan Praktikum Laboratorium'],
  },
];

// Alumni Testimonials
export const ALUMNI_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    tempId: 0,
    testimonial: 'Materi kurikulum yang berfokus pada processing & food safety serta entrepreneurship sangat relevan dengan industri pangan saat ini.',
    by: 'Andini Kusuma, S.T.P. (Quality Assurance at Indofood)',
    imgSrc: '/assets/alumni_1.png',
  },
  {
    id: 'test-2',
    tempId: 1,
    testimonial: 'Magang di pabrik pangan terkemuka memberikan saya kesempatan berjejaring langsung dengan praktisi industri nasional sejak kuliah.',
    by: 'Rian Hidayat, S.T.P. (Production Manager at Garudafood)',
    imgSrc: '/assets/alumni_2.png',
  },
  {
    id: 'test-3',
    tempId: 2,
    testimonial: 'Teknologi Pangan UMB benar-benar mengasah kemampuan berpikir kreatif dan kepekaan ilmiah terhadap produk-produk pangan Nusantara.',
    by: 'Melati Indah, S.T.P. (Food Innovator & Founder of HealthyFood)',
    imgSrc: '/assets/alumni_1.png',
  },
];

// Partners
export const PARTNERS: string[] = [
  'PERHIMPUNAN AHLI TEKNOLOGI PANGAN INDONESIA (PATPI)',
  'PT INDOFOOD CBP SUKSES MAKMUR',
  'PT GARUDAFOOD PUTRA PUTRI JAYA',
  'ASOSIASI INDUSTRI PANGAN HALAL (AIPH)',
  'MASYARAKAT STANDARDISASI PANGAN (MSP)',
  'IKATAN ALUMNI TEKNOLOGI PANGAN (IKA-TP)',
];

export interface DosenItem {
  id: string;
  name: string;
  imgSrc: string;
  scopus: string;
  sinta: string;
  scholar: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  instagram?: string;
  category?: 'dosen' | 'karyawan_laboran';
  role?: string;
  role_en?: string;
}

export const ACADEMIC_DOSEN: DosenItem[] = [
  {
    id: 'dosen-1',
    name: 'Dr. Dewi Werdayani, S.Pd., M.Pd.',
    imgSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '6704890',
    scholar: '#',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
    category: 'dosen',
    role: 'Dosen Utama',
    role_en: 'Senior Lecturer',
  },
  {
    id: 'dosen-2',
    name: 'Dr. Komarudin Kudiya, S.IP., M.Ds.',
    imgSrc: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '6640055',
    scholar: '#',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
    category: 'dosen',
    role: 'Dosen Utama',
    role_en: 'Senior Lecturer',
  },
  {
    id: 'dosen-3',
    name: 'Ghaida Nasya Putri, S.Ds., M.Ds.',
    imgSrc: 'https://images.unsplash.com/photo-1580894732444-8fecef2271ff?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '6042313',
    scholar: '#',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
    category: 'dosen',
    role: 'Dosen Lektor',
    role_en: 'Lecturer',
  },
  {
    id: 'staff-1',
    name: 'Asep Setiawan, A.Md.',
    imgSrc: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '-',
    scholar: '-',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
    category: 'karyawan_laboran',
    role: 'Laboran Teknologi Pangan',
    role_en: 'Food Technology Lab Assistant',
  }
];
