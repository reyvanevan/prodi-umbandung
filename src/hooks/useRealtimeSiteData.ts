import { DEFAULT_SITE_DATA, type SiteData } from '@/lib/site-data';

export function useRealtimeSiteData() {
  return DEFAULT_SITE_DATA satisfies SiteData;
}
