import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Target, Home, BookOpen } from 'lucide-react';
import { PRODI_CONFIG } from '@/config/prodi.config';
import { useSiteContent } from '@/hooks/useSupabaseData';

interface TujuanPendidikanSectionProps {
  lang: 'id' | 'en';
}

type TabType = 'tujuan' | 'fasilitas' | 'kurikulum';

export function TujuanPendidikanSection({ lang }: TujuanPendidikanSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tujuan');
  const { contentMap, loading } = useSiteContent(lang);

  if (loading) {
    return (
      <section id="tujuan-pendidikan" className="w-full py-24 lg:py-32 bg-mono-cream border-b border-mono-black/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 animate-pulse">
          {/* Section Header Skeleton */}
          <div className="mb-16">
            <div className="h-3 bg-neutral-300 w-32 mb-3 rounded" />
            <div className="h-10 bg-neutral-300 w-64 rounded" />
          </div>

          {/* Tab Buttons Skeleton */}
          <div className="grid grid-cols-3 gap-3 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-neutral-300 border border-mono-black/10 rounded" />
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="bg-white border border-mono-black p-8 lg:p-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.05)] min-h-[400px] space-y-6">
            <div className="pb-4 border-b border-mono-black/10">
              <div className="h-8 bg-neutral-300 w-48 mb-2 rounded" />
              <div className="h-3 bg-neutral-300 w-64 rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-5 bg-neutral-300 w-1/2 rounded" />
                  <div className="h-4 bg-neutral-300 w-full rounded" />
                  <div className="h-4 bg-neutral-300 w-5/6 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const content = {
    tujuan: {
      title: lang === 'en' ? 'Educational Objectives (PEO & PLO)' : 'Tujuan Pendidikan (PEO & PLO)',
      subtitle: lang === 'en' ? 'Preparing ready-to-compete food technology professionals.' : 'Mempersiapkan profesional teknologi pangan yang siap bersaing.',
      items: [
        {
          title: contentMap.kurikulum_peo_title || 'Program Educational Objectives (PEO)',
          desc: contentMap.kurikulum_peo_desc || (lang === 'en'
            ? `To produce graduates of ${PRODI_CONFIG.name.en} ${PRODI_CONFIG.degree} program who possess high competency in food processing, quality control, and food product development based on local resources with entrepreneurial spirit.`
            : `Menghasilkan sarjana Teknologi Pangan ${PRODI_CONFIG.degree} yang memiliki kompetensi unggul dalam pengolahan, pengawasan mutu, dan pengembangan produk pangan berbasis sumber daya lokal dengan semangat kewirausahaan.`),
        },
        {
          title: contentMap.kurikulum_plo_title || 'Program Learning Outcomes (PLO)',
          desc: contentMap.kurikulum_plo_desc || (lang === 'en'
            ? `Graduates are capable of applying food science and technology principles to solve problems in food systems sustainably and managing safe and halal food production processes.`
            : `Lulusan mampu menerapkan prinsip sains dan teknologi pangan untuk memecahkan masalah dalam sistem pangan secara berkelanjutan serta mengelola proses produksi pangan yang aman dan halal.`),
        }
      ]
    },
    fasilitas: {
      title: lang === 'en' ? 'Food Laboratories & Pilot Plant' : 'Laboratorium & Pilot Plant Pangan',
      subtitle: lang === 'en' ? 'Hands-on practice facilities with food industry standards.' : 'Fasilitas praktik langsung dengan standar industri pangan.',
      items: [
        { 
          name: contentMap.kurikulum_facility_1_name || (lang === 'en' ? 'Food Chemistry & Biochemistry Lab' : 'Lab Kimia & Biokimia Pangan'), 
          desc: contentMap.kurikulum_facility_1_desc || (lang === 'en' 
            ? 'Facilities for chemical content testing, nutritional analysis, and biochemical characterization of food ingredients.' 
            : 'Fasilitas pengujian kandungan kimia, analisis gizi, dan karakteristik biokimia bahan pangan.') 
        },
        { 
          name: contentMap.kurikulum_facility_2_name || (lang === 'en' ? 'Food Microbiology & Safety Lab' : 'Lab Mikrobiologi & Keamanan Pangan'), 
          desc: contentMap.kurikulum_facility_2_desc || (lang === 'en' 
            ? 'Laboratory for microbial contamination analysis, food fermentation, and food safety testing.' 
            : 'Laboratorium untuk analisis cemaran mikroba, fermentasi makanan, serta pengujian keamanan pangan.') 
        },
        { 
          name: contentMap.kurikulum_facility_3_name || (lang === 'en' ? 'Sensory & Product Development Lab' : 'Lab Sensoris & Pengembangan Produk'), 
          desc: contentMap.kurikulum_facility_3_desc || (lang === 'en' 
            ? 'Organoleptic test room with standardized sensory booths for testing taste, aroma, color, and texture.' 
            : 'Ruang uji organoleptik dengan bilik sensoris terstandar untuk pengujian rasa, aroma, warna, dan tekstur.') 
        },
        { 
          name: contentMap.kurikulum_facility_4_name || (lang === 'en' ? 'Food Processing Pilot Plant' : 'Pilot Plant Pengolahan Pangan'), 
          desc: contentMap.kurikulum_facility_4_desc || (lang === 'en' 
            ? 'Semi-industrial food processing facility equipped with pasteurization, drying, and packaging tools.' 
            : 'Fasilitas pengolahan pangan semi-industri dilengkapi dengan alat pasteurisasi, pengeringan, dan pengemasan.') 
        }
      ]
    },
    kurikulum: {
      title: lang === 'en' ? 'Academic Curriculum Structure' : 'Struktur Kurikulum Akademik',
      subtitle: lang === 'en' ? 'Step-by-step progress from basic food science to graduation capstone.' : 'Tahapan perkuliahan terstruktur dari sains dasar hingga karya kelulusan.',
      semesters: [
        { 
          title: contentMap.kurikulum_semester_1_2_title || (lang === 'en' ? 'Semesters 1-2: Basic Food Science' : 'Semester 1-2: Sains Dasar Pangan'), 
          desc: contentMap.kurikulum_semester_1_2_desc || (lang === 'en' 
            ? 'Introduction to Food Technology, General Chemistry, Cell Biology, General Physics, and Basic Microbiology.' 
            : 'Pengantar Teknologi Pangan, Kimia Dasar, Biologi Sel, Fisika Dasar, Matematika, dan Mikrobiologi Dasar.') 
        },
        { 
          title: contentMap.kurikulum_semester_3_4_title || (lang === 'en' ? 'Semesters 3-4: Chemistry & Analysis' : 'Semester 3-4: Kimia & Analisis Pangan'), 
          desc: contentMap.kurikulum_semester_3_4_desc || (lang === 'en' 
            ? 'Food Chemistry, Food Microbiology, Food Analysis, Unit Operations, and Food Biochemistry.' 
            : 'Kimia Pangan, Mikrobiologi Pangan, Analisis Pangan, Satuan Operasi Industri Pangan, dan Biokimia Pangan.') 
        },
        { 
          title: contentMap.kurikulum_semester_5_6_title || (lang === 'en' ? 'Semesters 5-6: Processing & Packaging' : 'Semester 5-6: Pengolahan & Pengemasan'), 
          desc: contentMap.kurikulum_semester_5_6_desc || (lang === 'en' 
            ? 'Food Processing Technology, Food Safety & Sanitation, Sensory Evaluation, and Industrial Internship Programs.' 
            : 'Teknologi Pengolahan Pangan, Keamanan & Sanitasi Pangan, Evaluasi Sensoris, Pengemasan Pangan, dan Magang Industri.') 
        },
        { 
          title: contentMap.kurikulum_semester_7_8_title || (lang === 'en' ? 'Semesters 7-8: Quality & Capstone' : 'Semester 7-8: Penjaminan Mutu & Capstone'), 
          desc: contentMap.kurikulum_semester_7_8_desc || (lang === 'en' 
            ? 'Food Quality Assurance, Food Plant Design, Food Entrepreneurship, Seminar, and Thesis Defense.' 
            : 'Jaminan Mutu Pangan, Perancangan Pabrik Pangan, Kewirausahaan Pangan, Seminar, dan Sidang Tugas Akhir.') 
        }
      ]
    }
  };

  return (
    <section id="tujuan-pendidikan" className="w-full py-24 lg:py-32 bg-mono-cream border-b border-mono-black/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16">
          <p className="tech-tag text-mono-black mb-3">CURRICULUM // PROFILE</p>
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
                  <div key={idx} className="border-l-4 border-mono-black pl-6">
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
                  <div key={idx} className="p-6 border border-neutral-100 hover:border-mono-black transition-colors bg-neutral-50/50">
                    <span className="tech-tag text-mono-black text-[9px] block mb-2">STUDIO AREA 0{idx+1}</span>
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
