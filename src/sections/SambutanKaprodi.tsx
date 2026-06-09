import React, { useState, useEffect } from 'react';
import { getSiteContent } from '@/lib/supabase/db';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { PRODI_CONFIG } from '@/config/prodi.config';

interface SambutanKaprodiProps {
  lang: 'id' | 'en';
  title?: string;
  p1?: string;
  p2?: string;
}

export function SambutanKaprodi({ lang, title, p1, p2 }: SambutanKaprodiProps) {
  const [dbTitle, setDbTitle] = useState<string | undefined>(title);
  const [dbP1, setDbP1] = useState<string | undefined>(p1);
  const [dbP2, setDbP2] = useState<string | undefined>(p2);

  useEffect(() => {
    // If all props are provided, skip DB call
    if (title && p1 && p2) return;
    if (!isSupabaseConfigured) return;

    const loadData = async () => {
      const dbContent = await getSiteContent();
      if (dbContent) {
        const contentMap: Record<string, string> = {};
        dbContent.forEach((item) => {
          contentMap[item.key] = lang === 'en' ? (item.value_en || item.value) : item.value;
        });
        if (!title && contentMap.sambutan_title) setDbTitle(contentMap.sambutan_title);
        if (!p1 && contentMap.sambutan_p1) setDbP1(contentMap.sambutan_p1);
        if (!p2 && contentMap.sambutan_p2) setDbP2(contentMap.sambutan_p2);
      }
    };
    loadData();
  }, [lang, title, p1, p2]);

  const defaultTitle = lang === 'en' ? "Head of Department's Welcome" : 'Sambutan Kepala Program Studi';
  const defaultP1 = lang === 'en'
    ? `Welcome to the official portal of the ${PRODI_CONFIG.degree} Program in ${PRODI_CONFIG.name.en} at ${PRODI_CONFIG.university}. We are committed to shaping future technology leaders and software engineers who master modern computing, programming systems, and artificial intelligence.`
    : `Selamat datang di portal resmi Program Studi ${PRODI_CONFIG.degree} ${PRODI_CONFIG.name.id} ${PRODI_CONFIG.university}. Kami berkomitmen untuk mencetak pemimpin teknologi dan rekayasawan perangkat lunak masa depan yang menguasai komputasi modern, sistem pemrograman, dan kecerdasan buatan.`;
  const defaultP2 = lang === 'en'
    ? 'Our development focus lies in integrating computer science advancements with practical industry needs, creating digital solutions and systems that are globally competitive and socially impactful.'
    : 'Fokus pengembangan kami terletak pada integrasi kemajuan ilmu komputer dengan kebutuhan praktis industri, menciptakan solusi dan sistem digital yang berdaya saing global serta berdampak sosial.';

  const finalTitle = dbTitle || title || defaultTitle;
  const finalP1 = dbP1 || p1 || defaultP1;
  const finalP2 = dbP2 || p2 || defaultP2;

  return (
    <section id="profil" className="w-full bg-mono-cream py-24 lg:py-32 border-b border-mono-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Image (5 columns) */}
          <div className="lg:col-span-5 relative overflow-hidden bg-neutral-200 aspect-[3/4] fade-in-element">
            {/* Visual headshot placeholder with high fashion styling */}
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-mono-black text-white relative">
              <div className="absolute inset-0 opacity-20">
                {/* Visual texture overlay */}
                <div className="w-full h-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
              <div className="z-10 text-center">
                <p className="tech-tag text-mono-yellow mb-4">
                  {lang === 'en' ? 'PORTRAIT // DEPT HEAD' : 'PORTRAIT // KAPRODI'}
                </p>
                <h3 className="font-serif text-3xl mb-2">{PRODI_CONFIG.headOfDepartment.name}</h3>
                <p className="tech-tag text-white/50">{PRODI_CONFIG.headOfDepartment.degree}</p>
              </div>
              <div className="absolute bottom-6 left-6 right-6 flex justify-between border-t border-white/20 pt-4">
                <span className="tech-tag text-white/30">REC [●] 1080P</span>
                <span className="tech-tag text-white/30">{PRODI_CONFIG.universityShort.toUpperCase()} // BDG</span>
              </div>
            </div>
          </div>

          {/* Welcome Text (7 columns) */}
          <div className="lg:col-span-7 fade-in-element delay-200">
            <p className="tech-tag text-mono-yellow mb-3">
              {lang === 'en' ? 'WELCOME // HEAD OF DEPARTMENT' : 'WELCOME // HEAD OF DEPARTMENT'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide mb-8 leading-tight">
              {finalTitle}
            </h2>
            <div className="space-y-6 text-neutral-700 leading-relaxed font-sans text-sm md:text-base">
              <p>
                {finalP1}
              </p>
              <p>
                {finalP2}
              </p>
            </div>

            {/* Video Profil Trigger Block */}
            <div className="mt-12 p-6 border border-mono-black/10 bg-white flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="tech-tag text-mono-black/40 mb-1">CINEMATIC PROFILE VIDEO</p>
                <h4 className="font-serif text-lg text-mono-black">
                  {lang === 'en'
                    ? `Watch ${PRODI_CONFIG.acronym} ${PRODI_CONFIG.universityShort} Profile`
                    : `Tonton Profil ${PRODI_CONFIG.acronym} ${PRODI_CONFIG.universityShort}`}
                </h4>
              </div>
              <a
                href="#video-profil"
                className="px-6 py-3 border border-mono-black text-mono-black hover:bg-mono-yellow hover:border-mono-yellow hover:text-mono-black text-xs font-bold tracking-ultra-wide block text-center bg-transparent shrink-0 transition-colors no-underline"
              >
                PLAY VIDEO [▶]
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
