import React, { useState, useEffect } from 'react';
import { getSiteContent } from '@/lib/supabase/db';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { PRODI_CONFIG } from '@/config/prodi.config';

interface HeroSectionProps {
  lang: 'id' | 'en';
}

export function HeroSection({ lang }: HeroSectionProps) {
  const [dbTitle, setDbTitle] = useState<string | undefined>(undefined);
  const [dbSubtitle, setDbSubtitle] = useState<string | undefined>(undefined);
  const [heroBgUrl, setHeroBgUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const loadData = async () => {
      const dbContent = await getSiteContent();
      if (dbContent) {
        const contentMap: Record<string, string> = {};
        dbContent.forEach((item) => {
          contentMap[item.key] = lang === 'en' ? (item.value_en || item.value) : item.value;
        });
        if (contentMap.hero_title) setDbTitle(contentMap.hero_title);
        if (contentMap.hero_subtitle) setDbSubtitle(contentMap.hero_subtitle);
        if (contentMap.hero_bg_url) setHeroBgUrl(contentMap.hero_bg_url);
      }
    };
    loadData();
  }, [lang]);

  // Fallback title logic
  const defaultTitle = lang === 'en' ? PRODI_CONFIG.name.en : PRODI_CONFIG.name.id;
  const displayTitle = dbTitle || defaultTitle;
  
  // Split title if it contains specific words for beautiful styling
  const parts = displayTitle.split(/(?<=Informatika|Engineering|&)/i);
  const part1 = parts[0]?.trim() || displayTitle;
  const part2 = parts.slice(1).join(' ').trim();

  const defaultSubtitle = lang === 'en'
    ? 'Forming Modern Software Engineers and Cloud Practitioners based on Islamic Values & Tech Innovation.'
    : 'Membentuk Software Engineer dan Praktisi Cloud Modern Berbasis Nilai Islam & Inovasi Teknologi.';
  const finalSubtitle = dbSubtitle || defaultSubtitle;

  const finalBgUrl = heroBgUrl || '/assets/hero-mono-stigma.png';
  const isVideo = finalBgUrl.toLowerCase().endsWith('.mp4') || 
                  finalBgUrl.toLowerCase().endsWith('.webm') || 
                  finalBgUrl.toLowerCase().endsWith('.ogg') || 
                  finalBgUrl.startsWith('data:video/');

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image / Video */}
      <div className="absolute inset-0">
        {isVideo ? (
          <video
            src={finalBgUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={finalBgUrl}
            alt={`${PRODI_CONFIG.acronym} Editorial Background`}
            className="w-full h-full object-cover"
          />
        )}
        {/* Cinematic gradient overlay */}
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Main Title */}
        <div className="text-center fade-in-element">
          <p className="tech-tag text-white/70 mb-6 tracking-ultra-wide">
            {PRODI_CONFIG.university.toUpperCase()}
          </p>
          <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none">
            {part1}
          </h1>
          {part2 && (
            <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl tracking-wide mt-2 italic">
              {part2}
            </h2>
          )}
          <p className="mt-8 text-white/80 max-w-2xl mx-auto text-sm md:text-base tracking-wide leading-relaxed font-sans font-medium px-4">
            {finalSubtitle}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-12 fade-in-element delay-300">
          <a
            href="https://pmb.umbandung.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="ghost-btn ghost-btn-dark px-10 py-4 border border-white text-white text-xs tracking-ultra-wide block text-center font-bold bg-white/10 hover:bg-white hover:text-mono-black transition-colors"
          >
            {lang === 'en' ? 'REGISTRATION' : 'PENDAFTARAN'}
          </a>
          <a
            href={`/assets/brosur-${PRODI_CONFIG.acronym.toLowerCase()}.pdf`}
            target="_blank"
            download
            className="ghost-btn ghost-btn-dark px-10 py-4 border border-white text-white text-xs tracking-ultra-wide block text-center hover:bg-white hover:text-mono-black transition-colors"
          >
            {lang === 'en' ? 'BOOKLET' : 'BOOKLET'}
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 fade-in-element delay-500">
          <div className="flex flex-col items-center gap-3">
            <span className="tech-tag text-white/50">SCROLL</span>
            <div className="w-px h-12 bg-white/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-4 bg-white animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
