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
    name: 'Smart Campus Mobile & Analytics App',
    material: 'DEVELOPER: NAILA PUTRI',
    fabric: 'JUARA I // HACKATHON NASIONAL',
    gridClass: 'lg:col-span-2 lg:row-span-2',
    aspectRatio: 'aspect-[4/3] lg:aspect-auto lg:h-full',
    imgSrc: '/assets/portfolio-organic-gown.jpg',
  },
  {
    sku: 'PROJ-02',
    name: 'IoT Automated Greenhouse Controller',
    material: 'DEVELOPER: DANIEL WIJAYA',
    fabric: 'KARYA TERBAIK // EXHIBITION ITB',
    aspectRatio: 'aspect-[3/4]',
    imgSrc: '/assets/portfolio-songket.jpg',
  },
  {
    sku: 'PROJ-03',
    name: 'Decentralized Academic Credential System',
    material: 'DEVELOPER: ARYA DINATA',
    fabric: 'PROYEK RISET // KEMENTERIAN DIKTI',
    aspectRatio: 'aspect-[3/4]',
    imgSrc: '/assets/portfolio-ikat-jacket.jpg',
  },
  {
    sku: 'PROJ-04',
    name: 'AI Lung Cancer Detection Model',
    material: 'DEVELOPER: RYU HANSEN',
    fabric: 'KARYA INOVATIF // GLOBAL HEALTH',
    aspectRatio: 'aspect-square',
    imgSrc: '/assets/portfolio-batik.jpg',
  },
  {
    sku: 'PROJ-05',
    name: 'AR Campus Navigation System',
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
    title: 'Workshop Cloud Computing & DevOps untuk Komunitas Lokal',
    date: '02 JUN 2026',
    category: 'PENGABDIAN MASYARAKAT',
    snippet: 'Dosen dan mahasiswa Teknik Informatika UMB menyelenggarakan workshop pemanfaatan layanan cloud open-source untuk digitalisasi UMKM lokal.',
    imgSrc: '/assets/portfolio-ecoprint.jpg',
  },
  {
    id: 'news-2',
    title: 'Tim Mahasiswa Informatika UMB Raih Juara I Hackathon Nasional',
    date: '28 MAY 2026',
    category: 'PRESTASI MAHASISWA',
    snippet: 'Mengusung arsitektur serverless modern dengan sistem antrian pintar, karya mahasiswa angkatan 2024 berhasil memukau dewan juri.',
    imgSrc: '/assets/portfolio-woven-bag.jpg',
  },
  {
    id: 'news-3',
    title: 'Kolaborasi Riset Cybersecurity Bersama Asosiasi IT Indonesia',
    date: '15 MAY 2026',
    category: 'KOLABORASI RISET',
    snippet: 'Program studi resmi menandatangani kerjasama pengembangan standardisasi keamanan informasi dan sertifikasi kompetensi jaringan.',
    imgSrc: '/assets/philosophy-lab-editorial.jpg',
  },
];

// Academic Events
export const ACADEMIC_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    dateDay: '18',
    dateMonth: 'JUN',
    title: 'INFOTEC 2026: Capstone Project Showcase & IT Career Expo',
    location: 'AULA UTAMA KH. AHMAD DAHLAN, UMBANDUNG',
  },
  {
    id: 'event-2',
    dateDay: '25',
    dateMonth: 'JUN',
    title: 'Coding Workshop: Building Web Apps with React & Supabase',
    location: 'LAB KOMPUTASI GEDUNG UMB',
  },
  {
    id: 'event-3',
    dateDay: '05',
    dateMonth: 'JUL',
    title: 'Kuliah Umum: Tren Kecerdasan Buatan di Era Komputasi Awan',
    location: 'AUDITORIUM UTAMA UMBANDUNG',
  },
];

// Program Unggulan Highlights
export const PROGRAM_HIGHLIGHTS: ProgramHighlight[] = [
  {
    id: 'prog-1',
    title: 'MBKM Internal & Eksternal',
    tag: 'PROGRAM: MERDEKA_BELAJAR',
    description: 'Konversi SKS magang industri teknologi, riset sistem cerdas lokal, KKN tematik digitalisasi desa, pertukaran mahasiswa, hingga wirausaha startup mandiri.',
    details: ['Magang Industri Software & Cloud', 'Riset Kerjasama Kecerdasan Buatan', 'Pertukaran Mahasiswa Nasional', 'Wirausaha Merdeka UMB'],
  },
  {
    id: 'prog-2',
    title: 'Sertifikasi Profesi IT Global',
    tag: 'CREDENTIAL: LSP_KOMPETENSI',
    description: 'Setiap lulusan dibekali sertifikasi kompetensi keahlian teknologi informasi yang diakui secara nasional dan internasional.',
    details: ['Uji Kompetensi Software Engineer', 'Sertifikasi Networking CCNA/Mikrotik', 'Pengakuan BNSP Nasional', 'Support Penilaian Portofolio Proyek'],
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
    description: 'Metode pembelajaran berbasis luaran riil berupa produk perangkat lunak, sistem IoT, dan proyek kolaboratif berkala.',
    details: ['Penilaian Berbasis Hasil Proyek', 'Evaluasi Portofolio Berkala', 'Penyelarasan dengan Kebutuhan Industri', 'Keseimbangan Teori dan Eksperimen Lab'],
  },
];

// Alumni Testimonials (Updated with local assets)
export const ALUMNI_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    tempId: 0,
    testimonial: 'Materi kurikulum yang berfokus pada software engineering dan arsitektur modern sangat relevan dengan kebutuhan industri teknologi saat ini.',
    by: 'Andini Kusuma, S.Kom (Software Engineer at Tokopedia)',
    imgSrc: '/assets/alumni_1.png',
  },
  {
    id: 'test-2',
    tempId: 1,
    testimonial: 'Program magang laboratorium memberikan saya kesempatan berjejaring langsung dengan praktisi cloud dan devops nasional sejak awal perkuliahan.',
    by: 'Rian Hidayat, S.Kom (DevOps Engineer at GoTo)',
    imgSrc: '/assets/alumni_2.png',
  },
  {
    id: 'test-3',
    tempId: 2,
    testimonial: 'Informatika UMB benar-benar mengasah kemampuan berpikir logis dan pemecahan masalah kompleks menggunakan teknologi kecerdasan buatan.',
    by: 'Melati Indah, S.Kom (AI Researcher at Bukalapak)',
    imgSrc: '/assets/alumni_1.png',
  },
  {
    id: 'test-4',
    tempId: 3,
    testimonial: 'Suasana lab yang kolaboratif membuat saya terbiasa melakukan eksperimen sistem dan coding tanpa takut gagal.',
    by: 'Fauzan Adhi, S.Kom (Cybersecurity Analyst at Cyber Security Agency)',
    imgSrc: '/assets/alumni_2.png',
  },
  {
    id: 'test-5',
    tempId: 4,
    testimonial: 'Pembekalan portofolio proyek berkala selama perkuliahan sangat mempermudah saya ketika melamar kerja di perusahaan multinasional.',
    by: 'Sarah Amalia, S.Kom (Technical Product Manager at Shopee)',
    imgSrc: '/assets/alumni_1.png',
  },
  {
    id: 'test-6',
    tempId: 5,
    testimonial: 'Berkat bimbingan intensif dosen-dosen praktisi industri, saya bisa merilis proyek akhir saya di ajang kompetisi IT nasional.',
    by: 'Yusuf Maulana, S.Kom (Data Scientist at Telkom Indonesia)',
    imgSrc: '/assets/alumni_2.png',
  },
];

// Partners
export const PARTNERS: string[] = [
  'ASOSIASI TELEKOMUNIKASI INDONESIA',
  'PT INDONESIA DIGITAL TEKNOLOGI',
  'GOOGLE DEVELOPER GROUPS BANDUNG',
  'KEMENTERIAN KOMUNIKASI & INFORMATIKA',
  'IKATAN ALUMNI TEKNIK INFORMATIKA (IKATI)',
  'PT GOTO GOJEK TOKOPEDIA TBK',
];
