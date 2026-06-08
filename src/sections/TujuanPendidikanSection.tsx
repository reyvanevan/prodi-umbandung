import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Target, Home, BookOpen } from 'lucide-react';
import { PRODI_CONFIG } from '@/config/prodi.config';

interface TujuanPendidikanSectionProps {
  lang: 'id' | 'en';
}

type TabType = 'tujuan' | 'fasilitas' | 'kurikulum';

export function TujuanPendidikanSection({ lang }: TujuanPendidikanSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tujuan');

  const content = {
    tujuan: {
      title: lang === 'en' ? 'Educational Objectives (PEO & PLO)' : 'Tujuan Pendidikan (PEO & PLO)',
      subtitle: lang === 'en' ? 'Preparing ready-to-compete design professionals.' : 'Mempersiapkan profesional desainer yang siap bersaing.',
      items: lang === 'en' ? [
        {
          title: 'Program Educational Objectives (PEO)',
          desc: `To produce graduates of ${PRODI_CONFIG.acronym} ${PRODI_CONFIG.degree} program who possess high integrity, global creative competence, innovative entrepreneurship spirit based on local values.`,
        },
        {
          title: 'Program Learning Outcomes (PLO)',
          desc: `Graduates are capable of conducting research-based design and material engineering, compiling ready-to-wear blueprints, and directing business strategies with sustainability awareness.`,
        }
      ] : [
        {
          title: 'Program Educational Objectives (PEO)',
          desc: `Menghasilkan sarjana ${PRODI_CONFIG.name.id} ${PRODI_CONFIG.degree} yang berintegritas tinggi, kompeten secara kreatif di tingkat global, serta memiliki jiwa kewirausahaan inovatif berbasis kearifan budaya lokal.`,
        },
        {
          title: 'Program Learning Outcomes (PLO)',
          desc: `Lulusan mampu melakukan perancangan reka latar dan reka struktur berbasis riset, menyusun rancangan koleksi produk siap pakai, serta mengarahkan strategi bisnis dengan kesadaran keberlanjutan.`,
        }
      ]
    },
    fasilitas: {
      title: lang === 'en' ? 'Creative Studio & Laboratories' : 'Studio Kreatif & Laboratorium',
      subtitle: lang === 'en' ? 'Hands-on practice facilities with industry standards.' : 'Fasilitas praktik langsung dengan standar industri.',
      items: lang === 'en' ? [
        { name: 'Surface Design Studio', desc: 'Space for batik, natural dye experiments, screen printing, and chemical textile treatments.' },
        { name: 'Weaving & Structural Studio', desc: 'Equipped with Handlooms (ATBM) and manual knitting machines for material engineering.' },
        { name: 'Garment & Sewing Studio', desc: 'Equipped with high-speed industrial sewing machines, heavy-duty overlocks, and drapery dummies.' },
        { name: 'Digital & Concept Lab', desc: 'High-performance workstations for computer-aided fashion design, pattern drafting, and portfolio compilation.' }
      ] : [
        { name: 'Studio Reka Latar (Surface)', desc: 'Ruang khusus batik, eksperimen zat warna alam, sablon manual, dan perlakuan kimia tekstil.' },
        { name: 'Studio Tenun & Reka Struktur', desc: 'Dilengkapi Alat Tenun Bukan Mesin (ATBM) dan mesin rajut manual untuk rekayasa material.' },
        { name: 'Studio Menjahit & Pola (Garment)', desc: 'Menyediakan mesin jahit industrial high-speed, mesin obras berat, dan dummy drapery standar industri.' },
        { name: 'Lab Komputasi & Desain Digital', desc: 'Workstation berspesifikasi tinggi untuk computer-aided fashion design, drafting pola digital, dan portofolio.' }
      ]
    },
    kurikulum: {
      title: lang === 'en' ? 'Academic Curriculum Structure' : 'Struktur Kurikulum Akademik',
      subtitle: lang === 'en' ? 'Step-by-step progress from fundamentals to graduation portfolio.' : 'Tahapan perkuliahan terstruktur dari dasar hingga karya kelulusan.',
      semesters: lang === 'en' ? [
        { title: 'Semesters 1-2: Foundations', desc: 'Textile Fiber Science, Basic Surface Design, Fashion Figure Drawing, History of Nusantara Art & Culture.' },
        { title: 'Semesters 3-4: Studio Specialization', desc: 'Fiber Art Studio, Ready-to-Wear (RTW) Apparels, Material Experimentation, CAD for Fashion.' },
        { title: 'Semesters 5-6: Industry & Research', desc: 'Professional Internship (MBKM), Research Methodology, Conceptual Fashion Studio, Fashion Branding & Identity.' },
        { title: 'Semesters 7-8: Graduation Portfolio', desc: 'Pre-Thesis Studio, Final Project Exhibition (Kriyasa), Solo Graduation Fashion Show.' }
      ] : [
        { title: 'Semester 1-2: Fondasi Dasar', desc: 'Pengetahuan Serat Tekstil, Reka Latar Dasar, Gambar Mode & Figur, Sejarah Seni & Budaya Nusantara.' },
        { title: 'Semester 3-4: Studio Spesialisasi', desc: 'Studio Kriya Serat, Desain Busana Siap Pakai (RTW), Eksperimentasi Material & Serat, CAD Fesyen.' },
        { title: 'Semester 5-6: Riset & Industri', desc: 'Magang Industri / MBKM, Metodologi Penelitian Kriya, Studio Fesyen Konseptual, Branding & Identitas Fesyen.' },
        { title: 'Semester 7-8: Portofolio Akhir', desc: 'Pra-Tugas Akhir, Karya Pameran Kelulusan (Kriyasa), Solo Graduation Fashion Show.' }
      ]
    }
  };

  return (
    <section id="tujuan-pendidikan" className="w-full py-24 lg:py-32 bg-mono-cream border-b border-mono-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="tech-tag text-mono-yellow mb-3">CURRICULUM // PROFILE</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-wide text-mono-black">
            {lang === 'en' ? 'Educational Framework' : 'Rencana & Tujuan Akademik'}
          </h2>
        </div>

        {/* Neo-brutalist Tab Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-12">
          <button
            onClick={() => setActiveTab('tujuan')}
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-3 py-5 px-4 border border-mono-black font-sans text-[11px] font-bold tracking-widest transition-all cursor-pointer",
              activeTab === 'tujuan' 
                ? "bg-mono-black text-white shadow-[4px_4px_0px_0px_var(--primary-color)]" 
                : "bg-white text-mono-black hover:bg-neutral-100"
            )}
          >
            <Target className="h-4 w-4" />
            <span>{lang === 'en' ? 'PEO & PLO' : 'TUJUAN PENDIDIKAN'}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('fasilitas')}
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-3 py-5 px-4 border border-mono-black font-sans text-[11px] font-bold tracking-widest transition-all cursor-pointer",
              activeTab === 'fasilitas' 
                ? "bg-mono-black text-white shadow-[4px_4px_0px_0px_var(--primary-color)]" 
                : "bg-white text-mono-black hover:bg-neutral-100"
            )}
          >
            <Home className="h-4 w-4" />
            <span>{lang === 'en' ? 'FACILITIES' : 'FASILITAS STUDIO'}</span>
          </button>

          <button
            onClick={() => setActiveTab('kurikulum')}
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-3 py-5 px-4 border border-mono-black font-sans text-[11px] font-bold tracking-widest transition-all cursor-pointer",
              activeTab === 'kurikulum' 
                ? "bg-mono-black text-white shadow-[4px_4px_0px_0px_var(--primary-color)]" 
                : "bg-white text-mono-black hover:bg-neutral-100"
            )}
          >
            <BookOpen className="h-4 w-4" />
            <span>{lang === 'en' ? 'CURRICULUM' : 'KURIKULUM'}</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white border border-mono-black p-8 lg:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] min-h-[400px]">
          
          {activeTab === 'tujuan' && (
            <div className="animate-fadeIn">
              <div className="mb-8 pb-4 border-b border-mono-black/10">
                <h3 className="font-serif text-3xl text-mono-black mb-2">{content.tujuan.title}</h3>
                <p className="font-sans text-xs text-neutral-500 tracking-wide uppercase">{content.tujuan.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.tujuan.items.map((item, idx) => (
                  <div key={idx} className="border-l-4 border-mono-yellow pl-6">
                    <h4 className="font-serif text-lg font-bold mb-3 text-mono-black">{item.title}</h4>
                    <p className="font-sans text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'fasilitas' && (
            <div className="animate-fadeIn">
              <div className="mb-8 pb-4 border-b border-mono-black/10">
                <h3 className="font-serif text-3xl text-mono-black mb-2">{content.fasilitas.title}</h3>
                <p className="font-sans text-xs text-neutral-500 tracking-wide uppercase">{content.fasilitas.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {content.fasilitas.items.map((item, idx) => (
                  <div key={idx} className="p-6 border border-neutral-100 hover:border-mono-yellow transition-colors bg-neutral-50/50">
                    <span className="tech-tag text-mono-yellow text-[9px] block mb-2">STUDIO AREA 0{idx+1}</span>
                    <h4 className="font-serif text-xl font-bold mb-2 text-mono-black">{item.name}</h4>
                    <p className="font-sans text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'kurikulum' && (
            <div className="animate-fadeIn">
              <div className="mb-8 pb-4 border-b border-mono-black/10">
                <h3 className="font-serif text-3xl text-mono-black mb-2">{content.kurikulum.title}</h3>
                <p className="font-sans text-xs text-neutral-500 tracking-wide uppercase">{content.kurikulum.subtitle}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.kurikulum.semesters.map((sem, idx) => (
                  <div key={idx} className="flex gap-4 p-5 border border-dashed border-neutral-200">
                    <div className="h-10 w-10 shrink-0 bg-mono-black text-white flex items-center justify-center font-serif text-lg font-bold shadow-[2px_2px_0px_0px_var(--primary-color)]">
                      0{idx+1}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-serif text-base font-bold text-mono-black mb-1.5">{sem.title}</h4>
                      <p className="font-sans text-xs text-neutral-600 leading-relaxed">{sem.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
