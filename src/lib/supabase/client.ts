import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null | undefined;
let serverClient: SupabaseClient | null | undefined;

function isPlaceholderSupabaseUrl(url: string | undefined): boolean {
  if (!url) {
    return true;
  }

  return url.includes('your-project-ref.supabase.co');
}

export const isSupabaseConfigured = Boolean(
  import.meta.env.PUBLIC_SUPABASE_URL &&
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY &&
    !isPlaceholderSupabaseUrl(import.meta.env.PUBLIC_SUPABASE_URL) &&
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key',
);

export function getBrowserSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (browserClient === undefined) {
    browserClient = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    );
  }

  return browserClient;
}

export function getServerSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }

  if (serverClient === undefined) {
    serverClient = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: false,
        },
      }
    );
  }

  return serverClient;
}

export function getSupabaseClient(): SupabaseClient | null {
  if (typeof window === 'undefined') {
    return getServerSupabaseClient();
  }
  return getBrowserSupabaseClient();
}
