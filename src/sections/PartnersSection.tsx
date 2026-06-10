import React, { useState, useEffect } from 'react';
import { getPartners, getLandingPartners } from '@/lib/supabase/db';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { PARTNERS } from '@/lib/site-data';

interface PartnersSectionProps {
  lang: 'id' | 'en';
  partnersList?: string[];
}

export function PartnersSection({ lang, partnersList }: PartnersSectionProps) {
  const [dbPartners, setDbPartners] = useState<string[] | undefined>(partnersList);
  const [loading, setLoading] = useState(!partnersList && isSupabaseConfigured);

  useEffect(() => {
    if (partnersList) {
      setDbPartners(partnersList);
      setLoading(false);
      return;
    }
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      // Try landing_partners table first
      const fetchedLanding = await getLandingPartners();
      if (fetchedLanding && fetchedLanding.length > 0) {
        setDbPartners(fetchedLanding.map((item) => item.name));
        setLoading(false);
        return;
      }

      // Fallback to legacy partners table
      const fetchedPartners = await getPartners();
      if (fetchedPartners) {
        setDbPartners(fetchedPartners.map((item) => item.name));
      }
      setLoading(false);
    };
    loadData();
  }, [partnersList]);

  const finalPartners = dbPartners && dbPartners.length > 0 ? dbPartners : PARTNERS;
  // Triple the array to create a seamless infinite loop on all screen widths
  const repeatedPartners = [...finalPartners, ...finalPartners, ...finalPartners];

  if (loading) {
    return (
      <section id="mitra-kerjasama" className="w-full bg-white py-20 lg:py-28 border-b border-mono-black/10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 animate-pulse">
          <div className="h-3 bg-neutral-200 w-48 mx-auto rounded mb-3" />
          <div className="h-8 bg-neutral-200 w-80 mx-auto rounded mb-8" />
          <div className="mx-auto my-6 h-px max-w-lg bg-mono-black/15" />
          <div className="flex justify-center gap-12 py-4">
            <div className="h-6 bg-neutral-100 w-24 rounded" />
            <div className="h-6 bg-neutral-100 w-28 rounded" />
            <div className="h-6 bg-neutral-100 w-20 rounded" />
            <div className="h-6 bg-neutral-100 w-32 rounded" />
          </div>
          <div className="mx-auto my-6 h-px max-w-lg bg-mono-black/15" />
        </div>
      </section>
    );
  }

  return (
    <section id="mitra-kerjasama" className="w-full bg-white py-20 lg:py-28 border-b border-mono-black/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Title */}
        <h2 className="text-center font-medium tracking-tight mb-8">
          <span className="text-mono-black/40 tech-tag tracking-ultra-wide block mb-2">COLLABORATORS // INDUSTRY PARTNERS</span>
          <span className="font-serif text-3xl md:text-4xl text-mono-black">
            {lang === 'en' ? 'Partners & Collaborations' : 'Jejaring Mitra & Kolaborasi'}
          </span>
        </h2>

        {/* Divider Line */}
        <div className="mx-auto my-6 h-px max-w-lg bg-mono-black/15 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

        {/* CSS Marquee Logo Cloud */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-4">
          <div className="flex gap-16 w-max animate-marquee whitespace-nowrap">
            {repeatedPartners.map((partner, index) => (
              <span
                key={index}
                className="font-serif italic font-medium text-lg md:text-xl text-mono-black/40 hover:text-mono-black hover:scale-105 transition-all select-none cursor-default tracking-wide"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Divider Line */}
        <div className="mx-auto my-6 h-px max-w-lg bg-mono-black/15 [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
      </div>
    </section>
  );
}
