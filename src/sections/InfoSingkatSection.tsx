import React from 'react';
import { Award, GraduationCap, Calendar } from 'lucide-react';
import { PRODI_CONFIG } from '@/config/prodi.config';
import { useSiteContent } from '@/hooks/useSupabaseData';

interface InfoSingkatSectionProps {
  lang: 'id' | 'en';
}

export function InfoSingkatSection({ lang }: InfoSingkatSectionProps) {
  const { contentMap, loading } = useSiteContent(lang);

  const degreeTitle = contentMap.info_singkat_degree_title || PRODI_CONFIG.degreeTitle;
  const degreeName = contentMap.info_singkat_degree_name || (
    lang === 'en'
      ? `${PRODI_CONFIG.degreeTitleFull.id} (${PRODI_CONFIG.degreeTitleFull.en})`
      : `${PRODI_CONFIG.degreeTitleFull.id} (${PRODI_CONFIG.degree})`
  );

  const sksTitle = contentMap.info_singkat_sks_title || '144 SKS';
  const sksDesc = contentMap.info_singkat_sks_desc || (
    lang === 'en' ? 'Core & Elective SKS Requirements' : 'SKS Teori & Eksperimen Studio'
  );

  const durationTitle = contentMap.info_singkat_duration_title || (
    lang === 'en' ? '4 Years' : '4 Tahun'
  );
  const durationDesc = contentMap.info_singkat_duration_desc || (
    lang === 'en' ? '8 Academic Semesters (Fast track available)' : '8 Semester Perkuliahan Akademik'
  );

  if (loading) {
    return (
      <section id="info-singkat" className="w-full py-16 bg-mono-cream border-b border-mono-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((idx) => (
              <div key={idx} className="flex items-start gap-5 p-8 border border-mono-black bg-white animate-pulse">
                <div className="shrink-0 p-6 bg-neutral-300 w-14 h-14" />
                <div className="flex flex-col flex-1 space-y-2">
                  <div className="h-2 bg-neutral-300 w-1/3 rounded" />
                  <div className="h-6 bg-neutral-300 w-2/3 rounded" />
                  <div className="h-3 bg-neutral-300 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const cards = [
    {
      icon: <GraduationCap className="h-8 w-8 text-white" />,
      label: lang === 'en' ? 'GRADUATION DEGREE' : 'GELAR LULUSAN',
      value: degreeTitle,
      sub: degreeName
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
      label: lang === 'en' ? 'TOTAL CREDIT HOURS' : 'TOTAL SKS',
      value: sksTitle,
      sub: sksDesc
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      label: lang === 'en' ? 'STUDY DURATION' : 'MASA STUDI',
      value: durationTitle,
      sub: durationDesc
    }
  ];

  return (
    <section id="info-singkat" className="w-full py-16 bg-mono-cream border-b border-mono-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, idx) => (
            <div 
              key={idx}
              className="flex items-start gap-5 p-8 border border-mono-black bg-white hover:shadow-[6px_6px_0px_0px_var(--primary-color)] transition-all duration-300"
            >
              <div className="shrink-0 p-3 bg-mono-black text-white shadow-[2px_2px_0px_0px_var(--primary-color)]">
                {card.icon}
              </div>
              <div className="flex flex-col">
                <span className="tech-tag text-mono-black/40 text-[9px] tracking-widest mb-1">
                  {card.label}
                </span>
                <span className="font-serif text-3xl font-bold text-mono-black mb-1">
                  {card.value}
                </span>
                <span className="font-sans text-xs text-neutral-500">
                  {card.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
