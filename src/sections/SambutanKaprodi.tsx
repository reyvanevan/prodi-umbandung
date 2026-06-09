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
  const [dbKaprodiName, setDbKaprodiName] = useState<string | undefined>(undefined);
  const [dbKaprodiTitle, setDbKaprodiTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const loadData = async () => {
      const dbContent = await getSiteContent();
      if (dbContent) {
        const contentMap: Record<string, string> = {};
        dbContent.forEach((item) => {
          contentMap[item.key] = lang === 'en' ? (item.value_en || item.value) : item.value;
        });
        
        if (!title && contentMap.sambutan_title) setDbTitle(contentMap.sambutan_title);
        if (!p1 && contentMap.kaprodi_welcome) setDbP1(contentMap.kaprodi_welcome);
        if (!p2 && contentMap.kaprodi_welcome_p2) setDbP2(contentMap.kaprodi_welcome_p2);
        if (contentMap.kaprodi_name) setDbKaprodiName(contentMap.kaprodi_name);
        if (contentMap.kaprodi_title) setDbKaprodiTitle(contentMap.kaprodi_title);
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
  const finalName = dbKaprodiName || PRODI_CONFIG.headOfDepartment.name;
  const finalRole = dbKaprodiTitle || PRODI_CONFIG.headOfDepartment.degree;

  return (
    <section id="profil" className="w-full bg-mono-cream py-24 lg:py-32 border-b border-mono-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Image (5 columns) */}
          <div className="lg:col-span-5 relative overflow-hidden bg-neutral-200 aspect-[3/4] fade-in-element group border border-mono-black/10">
            <img 
              src="/assets/kaprodi.png" 
              alt={finalName}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            {/* Overlay name badge */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-mono-black/90 via-mono-black/60 to-transparent p-6 text-white pt-16">
              <span className="tech-tag text-white/50 text-[9px] tracking-widest block mb-1">
                {lang === 'en' ? 'HEAD OF DEPARTMENT' : 'KAPRODI'}
              </span>
              <h3 className="font-serif text-2xl mb-1">{finalName}</h3>
              <p className="tech-tag text-white/40 text-[9px] tracking-wide">{finalRole}</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
