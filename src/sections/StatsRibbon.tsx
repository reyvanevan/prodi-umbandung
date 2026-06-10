import React, { useState, useEffect } from 'react';
import { getLandingStats } from '@/lib/supabase/db';
import { isSupabaseConfigured } from '@/lib/supabase/client';

interface StatsRibbonProps {
  lang: 'id' | 'en';
  statsProp?: any[];
}

export function StatsRibbon({ lang, statsProp }: StatsRibbonProps) {
  const [dbStats, setDbStats] = useState<any[] | undefined>(statsProp);
  const [loading, setLoading] = useState(!statsProp && isSupabaseConfigured);

  useEffect(() => {
    if (statsProp) return;
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      const fetchedStats = await getLandingStats();
      if (fetchedStats && fetchedStats.length > 0) {
        setDbStats(fetchedStats);
      }
      setLoading(false);
    };
    loadData();
  }, [statsProp]);

  const defaultStats = lang === 'en' ? [
    { number: '180+', label: 'ACTIVE INFORMATICS STUDENTS' },
    { number: '240+', label: 'GRADUATED ALUMNI' },
    { number: '16+', label: 'EXPERT FACULTY LECTURERS' },
    { number: '50+', label: 'CORE SPECIALIZED COURSES' }
  ] : [
    { number: '180+', label: 'MAHASISWA INFORMATIKA AKTIF' },
    { number: '240+', label: 'ALUMNI TERSEBAR' },
    { number: '16+', label: 'DOSEN PENGAMPU AHLI' },
    { number: '50+', label: 'MATA KULIAH UNGGULAN' }
  ];

  const stats = dbStats && dbStats.length > 0 ? dbStats : defaultStats;

  if (loading) {
    return (
      <section id="statistik" className="w-full bg-mono-black text-white py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-x-0 lg:divide-x divide-white/10 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:first:pl-0 space-y-3">
                <div className="h-14 bg-white/10 w-24 rounded" />
                <div className="h-3 bg-white/20 w-36 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="statistik" className="w-full bg-mono-black text-white py-16 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-x-0 lg:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left px-4 lg:first:pl-0">
              <span className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-3">
                {stat.number}
              </span>
              <span className="tech-tag text-white/60 text-[10px] tracking-widest max-w-[200px] leading-relaxed">
                {lang === 'en' ? (stat.label_en || stat.label) : stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
