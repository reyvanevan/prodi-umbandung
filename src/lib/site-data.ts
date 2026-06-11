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
    name: 'Organic Ecoprint Evening Gown',
    material: 'DEVELOPER: NAILA PUTRI',
    fabric: 'JUARA I // FASHION SHOW NASIONAL',
    gridClass: 'lg:col-span-2 lg:row-span-2',
    aspectRatio: 'aspect-[4/3] lg:aspect-auto lg:h-full',
    imgSrc: '/assets/portfolio-organic-gown.jpg',
  },
  {
    sku: 'PROJ-02',
    name: 'Songket-Inspired Contemporary Jacket',
    material: 'DEVELOPER: DANIEL WIJAYA',
    fabric: 'KARYA TERBAIK // EXHIBITION ITB',
    aspectRatio: 'aspect-[3/4]',
    imgSrc: '/assets/portfolio-songket.jpg',
  },
  {
    sku: 'PROJ-03',
    name: 'Ikat-Weave Modern Trench Coat',
    material: 'DEVELOPER: ARYA DINATA',
    fabric: 'PROYEK RISET // KEMENTERIAN DIKTI',
    aspectRatio: 'aspect-[3/4]',
    imgSrc: '/assets/portfolio-ikat-jacket.jpg',
  },
  {
    sku: 'PROJ-04',
    name: 'Batik Lasem Eco-Friendly Kimono',
    material: 'DEVELOPER: RYU HANSEN',
    fabric: 'KARYA INOVATIF // GLOBAL HEALTH',
    aspectRatio: 'aspect-square',
    imgSrc: '/assets/portfolio-batik.jpg',
  },
  {
    sku: 'PROJ-05',
    name: 'Ready-to-Wear Streetwear Collection',
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
    title: 'Workshop Pewarnaan Alami dan Ecoprint untuk Pengrajin Lokal',
    date: '02 JUN 2026',
    category: 'PENGABDIAN MASYARAKAT',
    snippet: 'Dosen dan mahasiswa Kriya Tekstil dan Fashion UMB menyelenggarakan workshop pemanfaatan zat warna alam lokal untuk meningkatkan nilai jual produk UMKM.',
    imgSrc: '/assets/portfolio-ecoprint.jpg',
  },
  {
    id: 'news-2',
    title: 'Tim Mahasiswa KTF UMB Raih Juara I Fashion Design Competition Nasional',
    date: '28 MAY 2026',
    category: 'PRESTASI MAHASISWA',
    snippet: 'Mengusung tema Zero Waste Fashion dengan teknik tenun struktur modern, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.',
    imgSrc: '/assets/portfolio-woven-bag.jpg',
  },
  {
    id: 'news-3',
    title: 'Kolaborasi Riset Serat Alami Bersama Asosiasi Pertekstilan Indonesia',
    date: '15 MAY 2026',
    category: 'KOLABORASI RISET',
    snippet: 'Program studi resmi menandatangani kerjasama riset pengembangan serat pelepah pisang untuk aplikasi tekstil fashion berkelanjutan.',
    imgSrc: '/assets/philosophy-lab-editorial.jpg',
  },
];

// Academic Events
export const ACADEMIC_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    dateDay: '18',
    dateMonth: 'JUN',
    title: 'TUMPAL 2026: Capstone Exhibition & Fashion Show UMB',
    location: 'AULA UTAMA KH. AHMAD DAHLAN, UMBANDUNG',
  },
  {
    id: 'event-2',
    dateDay: '25',
    dateMonth: 'JUN',
    title: 'Workshop Batik & Shibori: Teknik Manipulasi Kain Kontemporer',
    location: 'STUDIO KRIYA & DESAIN GEDUNG UMB',
  },
  {
    id: 'event-3',
    dateDay: '05',
    dateMonth: 'JUL',
    title: 'Kuliah Umum: Tren Sustainable Fashion & Green Lifestyle di Era Global',
    location: 'AUDITORIUM UTAMA UMBANDUNG',
  },
];

// Program Unggulan Highlights
export const PROGRAM_HIGHLIGHTS: ProgramHighlight[] = [
  {
    id: 'prog-1',
    title: 'MBKM Internal & Eksternal',
    tag: 'PROGRAM: MERDEKA_BELAJAR',
    description: 'Konversi SKS magang industri kreatif, riset kriya lokal, KKN tematik digitalisasi desa kreatif, pertukaran mahasiswa, hingga wirausaha brand mode mandiri.',
    details: ['Magang Industri Fashion & Studio Desainer', 'Riset Kerjasama Eksplorasi Serat Alam', 'Pertukaran Mahasiswa Seni Rupa Nasional', 'Wirausaha Kreatif Merdeka UMB'],
  },
  {
    id: 'prog-2',
    title: 'Sertifikasi Kompetensi Kriya & Mode',
    tag: 'CREDENTIAL: LSP_KOMPETENSI',
    description: 'Setiap lulusan dibekali sertifikasi kompetensi keahlian tekstil dan busana yang diakui secara nasional.',
    details: ['Uji Kompetensi Fashion Designer', 'Sertifikasi Pembuatan Batik & Pewarnaan Alam', 'Pengakuan BNSP Nasional', 'Support Penilaian Portofolio Karya'],
  },
  {
    id: 'prog-3',
    title: 'Akselerasi Studi / Portofolio Terfokus',
    tag: 'TIMELINE: ACCELERATED_STUDY',
    description: 'Rancangan kurikulum terpadu yang membantu mahasiswa menyelesaikan perkuliahan sarjana secara efektif dengan portofolio siap kerja.',
    details: ['Kurikulum Terintegrasi Proyek Karya', 'Bimbingan Tugas Akhir Terfokus', 'Pembimbing dari Praktisi & Desainer Industri', 'Pameran Kelulusan Karya Mandiri (Fashion Show)'],
  },
  {
    id: 'prog-4',
    title: 'Outcome-Based Education',
    tag: 'METHODOLOGY: OBE_CURRICULUM',
    description: 'Metode pembelajaran berbasis luaran riil berupa produk busana, karya seni serat, dan proyek kolaboratif berkala.',
    details: ['Penilaian Berbasis Hasil Karya & Desain', 'Evaluasi Portofolio Berkala', 'Penyelarasan dengan Tren Industri Kreatif', 'Keseimbangan Teori Seni dan Eksperimen Studio'],
  },
];

// Alumni Testimonials
export const ALUMNI_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    tempId: 0,
    testimonial: 'Materi kurikulum yang berfokus pada surface & structure design serta entrepreneurship sangat relevan dengan industri fashion saat ini.',
    by: 'Andini Kusuma, S.Sn. (Fashion Designer at Cottonink)',
    imgSrc: '/assets/alumni_1.png',
  },
  {
    id: 'test-2',
    tempId: 1,
    testimonial: 'Magang di studio desainer terkemuka memberikan saya kesempatan berjejaring langsung dengan praktisi mode nasional sejak kuliah.',
    by: 'Rian Hidayat, S.Sn. (Creative Director at Batik Komar)',
    imgSrc: '/assets/alumni_2.png',
  },
  {
    id: 'test-3',
    tempId: 2,
    testimonial: 'Kriya Tekstil UMB benar-benar mengasah kemampuan berpikir kreatif dan kepekaan estetika terhadap serat-serat alami Nusantara.',
    by: 'Melati Indah, S.Sn. (Textile Artist & Founder of KainSerat)',
    imgSrc: '/assets/alumni_1.png',
  },
];

// Partners
export const PARTNERS: string[] = [
  'ASOSIASI PERTEKSTILAN INDONESIA (API)',
  'PT KAHATEX',
  'RUMAH BATIK KOMAR',
  'IKATAN PERANCANG MODE INDONESIA (IPMI)',
  'ASEPHI (HANDICRAFT ASSOCIATION)',
  'IKATAN ALUMNI KRIYA TEKSTIL DAN FASHION (IKA-KTF)',
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
}

export const ACADEMIC_DOSEN: DosenItem[] = [
  {
    id: 'dosen-1',
    name: 'Dra. Saftiyaningsih Ken Atik, M.Ds.',
    imgSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop',
    scopus: '-',
    sinta: '6704890',
    scholar: '#',
    facebook: '#',
    twitter: '#',
    tiktok: '#',
    instagram: '#',
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
  },
];
