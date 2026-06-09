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
      subtitle: lang === 'en' ? 'Preparing ready-to-compete engineering professionals.' : 'Mempersiapkan profesional rekayasa yang siap bersaing.',
      items: lang === 'en' ? [
        {
          title: 'Program Educational Objectives (PEO)',
          desc: `To produce graduates of ${PRODI_CONFIG.acronym} ${PRODI_CONFIG.degree} program who possess high integrity, global technological competence, innovative digital entrepreneurship spirit based on local values.`,
        },
        {
          title: 'Program Learning Outcomes (PLO)',
          desc: `Graduates are capable of conducting research-based software engineering, designing secure and scaleable system architectures, and directing technological initiatives with ethical awareness.`,
        }
      ] : [
        {
          title: 'Program Educational Objectives (PEO)',
          desc: `Menghasilkan sarjana ${PRODI_CONFIG.name.id} ${PRODI_CONFIG.degree} yang berintegritas tinggi, kompeten secara teknologi di tingkat global, serta memiliki jiwa kewirausahaan digital inovatif berbasis kearifan budaya lokal.`,
        },
        {
          title: 'Program Learning Outcomes (PLO)',
          desc: `Lulusan mampu melakukan rekayasa perangkat lunak berbasis riset, merancang arsitektur sistem yang aman dan terukur, serta mengarahkan inisiatif teknologi dengan kesadaran etis.`,
        }
      ]
    },
    fasilitas: {
      title: lang === 'en' ? 'Computing Laboratories & Studios' : 'Laboratorium & Studio Komputasi',
      subtitle: lang === 'en' ? 'Hands-on practice facilities with industry standards.' : 'Fasilitas praktik langsung dengan standar industri.',
      items: lang === 'en' ? [
        { name: 'Software Engineering Studio', desc: 'Space for developing web, mobile, and enterprise-grade software products with collaboration tools.' },
        { name: 'AI & Data Science Laboratory', desc: 'Equipped with high-performance computing resources and GPU nodes for training deep learning models.' },
        { name: 'Network & Cybersecurity Lab', desc: 'Equipped with routers, switches, and firewalls for simulating secure networks and penetration testing.' },
        { name: 'Digital Innovation & IoT Lab', desc: 'Microcontrollers, sensors, and hardware fabrication tools for engineering smart physical devices.' }
      ] : [
        { name: 'Studio Rekayasa Perangkat Lunak', desc: 'Ruang kolaboratif untuk merancang produk perangkat lunak web, mobile, dan enterprise dengan standar industri.' },
        { name: 'Laboratorium AI & Sains Data', desc: 'Dilengkapi workstation berspesifikasi tinggi dan GPU untuk melatih model machine learning dan deep learning.' },
        { name: 'Lab Jaringan & Keamanan Siber', desc: 'Menyediakan perangkat router, switch, dan sistem simulasi keamanan siber untuk uji penetrasi.' },
        { name: 'Lab Inovasi Digital & IoT', desc: 'Menyediakan mikrokontroler, sensor, dan peralatan pendukung untuk perakitan sistem cerdas terintegrasi.' }
      ]
    },
    kurikulum: {
      title: lang === 'en' ? 'Academic Curriculum Structure' : 'Struktur Kurikulum Akademik',
      subtitle: lang === 'en' ? 'Step-by-step progress from fundamentals to graduation portfolio.' : 'Tahapan perkuliahan terstruktur dari dasar hingga karya kelulusan.',
      semesters: lang === 'en' ? [
        { title: 'Semesters 1-2: Foundations', desc: 'Introduction to Programming, Discrete Mathematics, Algorithms & Data Structures, Linear Algebra, Database Systems.' },
        { title: 'Semesters 3-4: Core Specialization', desc: 'Object-Oriented Programming, Computer Networks, Operating Systems, Software Engineering, Web Development.' },
        { title: 'Semesters 5-6: Advanced IT & Industry', desc: 'Artificial Intelligence, Machine Learning, Cloud Computing, Professional Internship (MBKM), Mobile Application Development.' },
        { title: 'Semesters 7-8: Capstone Showcase', desc: 'Research Methodology, Pre-Thesis Studio, Capstone Project & Exhibition, Thesis Defense.' }
      ] : [
        { title: 'Semester 1-2: Fondasi Dasar', desc: 'Pengantar Pemrograman, Matematika Diskrit, Algoritma & Struktur Data, Aljabar Linear, Sistem Basis Data.' },
        { title: 'Semester 3-4: Inti Spesialisasi', desc: 'Pemrograman Berorientasi Objek, Jaringan Komputer, Sistem Operasi, Rekayasa Perangkat Lunak, Pengembangan Web.' },
        { title: 'Semester 5-6: IT Lanjut & Industri', desc: 'Kecerdasan Buatan, Pembelajaran Mesin, Komputasi Awan, Magang Industri / MBKM, Pengembangan Aplikasi Mobile.' },
        { title: 'Semester 7-8: Capstone & Karya Akhir', desc: 'Metodologi Penelitian, Pra-Tugas Akhir, Capstone Project Showcase, Sidang Tugas Akhir.' }
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
