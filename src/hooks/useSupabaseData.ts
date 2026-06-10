import { useState, useEffect } from 'react';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import {
  getSiteContent,
  getLandingStats,
  getNews,
  getEvents,
  getLandingPortfolioItems,
  getLandingPartners,
  getPartners,
  getTestimonials
} from '@/lib/supabase/db';

/**
 * Reusable hook to fetch general site content and map them by key/value.
 */
export function useSiteContent(lang: 'id' | 'en') {
  const [contentMap, setContentMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const dbContent = await getSiteContent();
        if (dbContent) {
          const mapped: Record<string, string> = {};
          dbContent.forEach((item) => {
            mapped[item.key] = lang === 'en' ? (item.value_en || item.value) : item.value;
          });
          setContentMap(mapped);
        }
      } catch (err) {
        console.error('Error in useSiteContent hook:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lang]);

  return { contentMap, loading, error };
}

/**
 * Reusable hook to fetch landing page statistics.
 */
export function useLandingStats() {
  const [stats, setStats] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const fetched = await getLandingStats();
        setStats(fetched);
      } catch (err) {
        console.error('Error in useLandingStats hook:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { stats, loading, error };
}

/**
 * Reusable hook to fetch and map news and events.
 */
export function useNewsAndEvents(lang: 'id' | 'en') {
  const [news, setNews] = useState<any[] | null>(null);
  const [events, setEvents] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const [fetchedNews, fetchedEvents] = await Promise.all([
          getNews(),
          getEvents()
        ]);

        if (fetchedNews) {
          setNews(
            fetchedNews.map((item) => ({
              id: item.id,
              title: lang === 'en' ? (item.title_en || item.title) : item.title,
              category: lang === 'en' ? (item.category_en || item.category) : item.category,
              snippet: lang === 'en' ? (item.snippet_en || item.snippet) : item.snippet,
              date: item.date,
              imgSrc: item.img_src,
            }))
          );
        }

        if (fetchedEvents) {
          setEvents(
            fetchedEvents.map((item) => ({
              id: item.id,
              dateDay: item.date_day,
              dateMonth: item.date_month,
              title: lang === 'en' ? (item.title_en || item.title) : item.title,
              location: lang === 'en' ? (item.location_en || item.location) : item.location,
            }))
          );
        }
      } catch (err) {
        console.error('Error in useNewsAndEvents hook:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lang]);

  return { news, events, loading, error };
}

/**
 * Reusable hook to fetch landing portfolio/achievements.
 */
export function useLandingPortfolioItems() {
  const [portfolioItems, setPortfolioItems] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const fetched = await getLandingPortfolioItems();
        if (fetched) {
          const mapped = fetched.map((item) => {
            let aspect = 'aspect-[3/4]';
            if (item.gridClass && item.gridClass.includes('row-span-2')) {
              aspect = 'aspect-[4/3] lg:aspect-auto lg:h-full';
            } else if (item.gridClass && item.gridClass.includes('col-span-2')) {
              aspect = 'aspect-[16/9] lg:aspect-[21/9]';
            }
            return {
              sku: item.year || 'AWARD',
              name: item.title,
              material: item.medium,
              fabric: item.technique,
              gridClass: item.gridClass || '',
              aspectRatio: aspect,
              imgSrc: item.image,
            };
          });
          setPortfolioItems(mapped);
        }
      } catch (err) {
        console.error('Error in useLandingPortfolioItems hook:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { portfolioItems, loading, error };
}

/**
 * Reusable hook to fetch landing partners.
 */
export function useLandingPartners() {
  const [partners, setPartners] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const fetchedLanding = await getLandingPartners();
        if (fetchedLanding && fetchedLanding.length > 0) {
          setPartners(fetchedLanding.map((item) => item.name));
          return;
        }

        const fetchedPartners = await getPartners();
        if (fetchedPartners) {
          setPartners(fetchedPartners.map((item) => item.name));
        }
      } catch (err) {
        console.error('Error in useLandingPartners hook:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { partners, loading, error };
}

/**
 * Reusable hook to fetch testimonials.
 */
export function useTestimonials(lang: 'id' | 'en') {
  const [testimonials, setTestimonials] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const dbData = await getTestimonials();
        if (dbData && dbData.length > 0) {
          const mapped = dbData.map((t) => ({
            id: t.id,
            testimonial: lang === 'en' ? (t.testimonial_en || t.testimonial) : t.testimonial,
            by: lang === 'en' ? (t.by_en || t.by) : t.by,
            imgSrc: t.img_src,
          }));
          setTestimonials(mapped);
        }
      } catch (err) {
        console.error('Error in useTestimonials hook:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lang]);

  return { testimonials, loading, error };
}
