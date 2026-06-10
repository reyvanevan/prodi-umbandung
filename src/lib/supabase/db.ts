import { getBrowserSupabaseClient } from './client';

export interface DbNews {
  id: string;
  title: string;
  title_en: string | null;
  category: string;
  category_en: string | null;
  snippet: string;
  snippet_en: string | null;
  date: string;
  img_src: string;
}

export interface DbEvent {
  id: string;
  date_day: string;
  date_month: string;
  title: string;
  title_en: string | null;
  location: string;
  location_en: string | null;
}

export interface DbTestimonial {
  id: string;
  testimonial: string;
  testimonial_en: string | null;
  by: string;
  by_en: string | null;
  img_src: string;
}

export interface DbPartner {
  id: string;
  name: string;
}

export interface DbSiteContent {
  key: string;
  value: string;
  value_en: string | null;
  updated_at: string;
}

export async function getNews(): Promise<DbNews[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching news:', error);
    return null;
  }
  return data;
}

export async function getEvents(): Promise<DbEvent[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('Error fetching events:', error);
    return null;
  }
  return data;
}

export async function getTestimonials(): Promise<DbTestimonial[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('Error fetching testimonials:', error);
    return null;
  }
  return data;
}

export async function getPartners(): Promise<DbPartner[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('Error fetching partners:', error);
    return null;
  }
  return data;
}

let cachedSiteContent: DbSiteContent[] | null = null;
let cachedSiteContentPromise: Promise<DbSiteContent[] | null> | null = null;

export async function getSiteContent(): Promise<DbSiteContent[] | null> {
  if (cachedSiteContent) return cachedSiteContent;
  if (cachedSiteContentPromise) return cachedSiteContentPromise;

  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;

  cachedSiteContentPromise = (async () => {
    const { data, error } = await supabase
      .from('site_content')
      .select('*');
    if (error) {
      console.error('Error fetching site content:', error);
      cachedSiteContentPromise = null;
      return null;
    }
    cachedSiteContent = data;
    return data;
  })();

  return cachedSiteContentPromise;
}

export async function updateSiteContent(key: string, value: string, valueEn: string | null): Promise<boolean> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return false;
  const { error } = await supabase
    .from('site_content')
    .update({
      value,
      value_en: valueEn,
      updated_at: new Date().toISOString(),
    })
    .eq('key', key);
  if (error) {
    console.error(`Error updating site content for key ${key}:`, error);
    return false;
  }
  return true;
}

export interface DbLandingStat {
  id: string;
  number: string;
  label: string;
  label_en?: string | null;
  sort_order: number;
}

export interface DbLandingPartner {
  id: string;
  name: string;
  sort_order: number;
}

export interface DbLandingPortfolioItem {
  id: string;
  image: string;
  title: string;
  medium: string;
  technique: string;
  year: string;
  gridClass: string;
  sort_order: number;
}

let cachedLandingStats: DbLandingStat[] | null = null;
let cachedLandingStatsPromise: Promise<DbLandingStat[] | null> | null = null;

export async function getLandingStats(): Promise<DbLandingStat[] | null> {
  if (cachedLandingStats) return cachedLandingStats;
  if (cachedLandingStatsPromise) return cachedLandingStatsPromise;

  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;

  cachedLandingStatsPromise = (async () => {
    const { data, error } = await supabase
      .from('landing_stats')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) {
      console.error('Error fetching landing stats:', error);
      cachedLandingStatsPromise = null;
      return null;
    }
    cachedLandingStats = data;
    return data;
  })();

  return cachedLandingStatsPromise;
}

export async function getLandingPartners(): Promise<DbLandingPartner[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('landing_partners')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching landing partners:', error);
    return null;
  }
  return data;
}

export async function getLandingPortfolioItems(): Promise<DbLandingPortfolioItem[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('landing_portfolio_items')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching landing portfolio items:', error);
    return null;
  }
  return data;
}

export interface DbDosen {
  id: string;
  name: string;
  img_src: string | null;
  scopus: string | null;
  sinta: string | null;
  scholar: string | null;
  facebook: string | null;
  twitter: string | null;
  tiktok: string | null;
  instagram: string | null;
  sort_order: number;
}

export async function getDosen(): Promise<DbDosen[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('dosen')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching dosen:', error);
    return null;
  }
  return data;
}

export interface DbKurikulumCourse {
  id: string;
  semester: string;
  name: string;
  name_en: string | null;
  credits: number;
  sort_order: number;
}

export interface DbKurikulumPlo {
  id: string;
  code: string;
  type: string;
  type_en: string | null;
  text: string;
  text_en: string | null;
  sort_order: number;
}

export interface DbKurikulumProfile {
  id: string;
  title: string;
  title_en: string | null;
  desc: string;
  desc_en: string | null;
  sort_order: number;
}

export interface DbTaStep {
  id: string;
  num: string;
  title: string;
  title_en: string | null;
  desc: string;
  desc_en: string | null;
  sort_order: number;
}

export async function getKurikulumCourses(): Promise<DbKurikulumCourse[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('kurikulum_courses')
    .select('*')
    .order('semester', { ascending: true })
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching kurikulum courses:', error);
    return null;
  }
  return data;
}

export async function getKurikulumPlos(): Promise<DbKurikulumPlo[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('kurikulum_plos')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching kurikulum plos:', error);
    return null;
  }
  return data;
}

export async function getKurikulumProfiles(): Promise<DbKurikulumProfile[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('kurikulum_profiles')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching kurikulum profiles:', error);
    return null;
  }
  return data;
}

export async function getTaSteps(): Promise<DbTaStep[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('tugas_akhir_steps')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching tugas akhir steps:', error);
    return null;
  }
  return data;
}

// ─── Prestasi ────────────────────────────────────────────────────────────────

export interface DbPrestasi {
  id: string;
  type: 'prodi' | 'mahasiswa';
  title: string;
  title_en: string | null;
  year: string;
  desc: string;
  desc_en: string | null;
  host: string | null;
  host_en: string | null;
  competitor: string | null;
  image_url: string | null;
  sort_order: number;
}

export async function getPrestasi(): Promise<DbPrestasi[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('prestasi')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) { console.error('Error fetching prestasi:', error); return null; }
  return data;
}

// ─── Publikasi Dosen ─────────────────────────────────────────────────────────

export interface DbPublikasiDosen {
  id: string;
  title: string;
  title_en: string | null;
  author: string;
  journal: string;
  journal_en: string | null;
  year: string;
  category: string;
  category_en: string | null;
  link: string | null;
  sort_order: number;
}

export async function getPublikasiDosen(): Promise<DbPublikasiDosen[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('publikasi_dosen')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) { console.error('Error fetching publikasi dosen:', error); return null; }
  return data;
}

// ─── Kegiatan Dosen ───────────────────────────────────────────────────────────

export interface DbKegiatanDosen {
  id: string;
  title: string;
  title_en: string | null;
  date_text: string;
  date_text_en: string | null;
  location: string;
  desc: string;
  desc_en: string | null;
  image_url: string | null;
  sort_order: number;
}

export async function getKegiatanDosen(): Promise<DbKegiatanDosen[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('kegiatan_dosen')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) { console.error('Error fetching kegiatan dosen:', error); return null; }
  return data;
}

// ─── Kegiatan Mahasiswa ───────────────────────────────────────────────────────

export interface DbKegiatanMahasiswa {
  id: string;
  title: string;
  title_en: string | null;
  date_text: string;
  date_text_en: string | null;
  location: string;
  desc: string;
  desc_en: string | null;
  image_url: string | null;
  sort_order: number;
}

export async function getKegiatanMahasiswa(): Promise<DbKegiatanMahasiswa[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('kegiatan_mahasiswa')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) { console.error('Error fetching kegiatan mahasiswa:', error); return null; }
  return data;
}

// ─── Alumni ───────────────────────────────────────────────────────────────────

export interface DbAlumni {
  id: string;
  name: string;
  class_of: string;
  class_of_en: string | null;
  role: string;
  company: string;
  quote: string;
  quote_en: string | null;
  image_url: string | null;
  sort_order: number;
}

export interface DbAlumniSector {
  id: string;
  name: string;
  name_en: string | null;
  percentage: string;
  sort_order: number;
}

export async function getAlumni(): Promise<DbAlumni[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) { console.error('Error fetching alumni:', error); return null; }
  return data;
}

export async function getAlumniSectors(): Promise<DbAlumniSector[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('alumni_sectors')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) { console.error('Error fetching alumni sectors:', error); return null; }
  return data;
}

// ─── Statistik ────────────────────────────────────────────────────────────────

export interface DbStatistikMaba {
  id: string;
  year: string;
  count: number;
  sort_order: number;
}

export async function getStatistikMaba(): Promise<DbStatistikMaba[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('statistik_maba')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) { console.error('Error fetching statistik maba:', error); return null; }
  return data;
}

