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

export async function getSiteContent(): Promise<DbSiteContent[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('site_content')
    .select('*');
  if (error) {
    console.error('Error fetching site content:', error);
    return null;
  }
  return data;
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

export async function getLandingStats(): Promise<DbLandingStat[] | null> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('landing_stats')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('Error fetching landing stats:', error);
    return null;
  }
  return data;
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
