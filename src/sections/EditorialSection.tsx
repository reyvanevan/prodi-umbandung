import React, { useState, useEffect } from 'react';
import { getSiteContent } from '@/lib/supabase/db';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { PRODI_CONFIG } from '../config/prodi.config';

interface EditorialSectionProps {
  lang: 'id' | 'en';
  quote?: string;
}

export function EditorialSection({ lang, quote }: EditorialSectionProps) {
  const [dbQuote, setDbQuote] = useState<string | undefined>(quote);

  useEffect(() => {
    if (quote) return;
    if (!isSupabaseConfigured) return;

    const loadData = async () => {
      const dbContent = await getSiteContent();
      if (dbContent) {
        const item = dbContent.find((x) => x.key === 'quote_text');
        if (item) {
          setDbQuote(lang === 'en' ? (item.value_en || item.value) : item.value);
        }
      }
    };
    loadData();
  }, [lang, quote]);

  const finalQuote = dbQuote || quote;
  return (
    <section id="editorial" className="w-full min-h-screen bg-mono-black">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Image Side */}
        <div className="relative h-[60vh] lg:h-auto overflow-hidden fade-in-element">
          <img
            src="/assets/editorial-mono-stigma.png"
            alt="MONO-STIGMA Editorial portrait"
            className="w-full h-full object-cover"
          />
          {/* Technical overlay */}
          <div className="absolute bottom-8 left-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-mono-yellow status-pulse" />
              <span className="tech-tag text-white/60">SHOT ON LOCATION // BANDUNG</span>
            </div>
          </div>
        </div>

        {/* Quote Side */}
        <div className="flex items-center justify-center p-8 lg:p-16 fade-in-element delay-200">
          <div className="max-w-lg">
            <div className="mb-8">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-mono-yellow"
              >
                <path d="M12 24C12 17.3726 17.3726 12 24 12M24 12C30.6274 12 36 17.3726 36 24M24 12V36M12 24C12 30.6274 17.3726 36 24 36M24 36C30.6274 36 36 30.6274 36 24" />
              </svg>
            </div>

            <blockquote className="editorial-quote text-white text-2xl md:text-3xl lg:text-4xl mb-8 leading-snug">
              {finalQuote ? (
                <span>&ldquo;{finalQuote}&rdquo;</span>
              ) : lang === 'en' ? (
                <>
                  &ldquo;{PRODI_CONFIG.name.en} is not just study or objects, but the way we{' '}
                  <span className="text-mono-yellow">breathe life into culture</span> and respond to the future.&rdquo;
                </>
              ) : (
                <>
                  &ldquo;{PRODI_CONFIG.name.id} bukan sekadar kuliah atau benda, melainkan cara kita{' '}
                  <span className="text-mono-yellow">menghidupkan budaya</span> dan merespons masa depan.&rdquo;
                </>
              )}
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-white/30" />
              <div>
                <p className="font-serif text-white text-lg font-medium">
                  {PRODI_CONFIG.degree} {PRODI_CONFIG.acronym} {PRODI_CONFIG.universityShort}
                </p>
                <p className="tech-tag text-white/50">PHILOSOPHY // SS 2026</p>
              </div>
            </div>

            {/* Technical Data */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="tech-tag text-white/40 mb-1">ISSUE</p>
                  <p className="font-serif text-white text-xl">001</p>
                </div>
                <div>
                  <p className="tech-tag text-white/40 mb-1">SEASON</p>
                  <p className="font-serif text-white text-xl">SS 26</p>
                </div>
                <div>
                  <p className="tech-tag text-white/40 mb-1">STUDIO</p>
                  <p className="font-serif text-white text-xl">BDG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
