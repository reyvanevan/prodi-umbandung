import React from 'react';
import { PRODI_CONFIG } from '@/config/prodi.config';

interface ProfilVideoSectionProps {
  lang: 'id' | 'en';
}

export function ProfilVideoSection({ lang }: ProfilVideoSectionProps) {
  // Helper to extract YouTube video ID from URL
  const getYoutubeId = (url?: string) => {
    if (!url) return '12ER7lJyZOc';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '12ER7lJyZOc';
  };

  const videoId = getYoutubeId(PRODI_CONFIG.videoProfileUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <section id="profil" className="w-full py-24 bg-mono-black text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content Area */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="tech-tag text-mono-yellow mb-3">PROFILE VIDEO // AUDIO-VISUAL</p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-wide mb-6 text-white leading-tight">
              {lang === 'en' ? 'Engineering the Future in Motion' : 'Mengembangkan Teknologi Masa Depan'}
            </h2>
            <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
              {lang === 'en' ? (
                <>
                  Experience the vibrant academic life of our {PRODI_CONFIG.degree} {PRODI_CONFIG.name.en} program at {PRODI_CONFIG.universityShort}. 
                  Watch our program profile video to see our laboratories, computing workshops, faculty mentors, and students engineering innovative software solutions for global impact.
                </>
              ) : (
                <>
                  Saksikan langsung kehidupan akademik program studi {PRODI_CONFIG.degree} {PRODI_CONFIG.name.id} {PRODI_CONFIG.university}. 
                  Video profil kami memperlihatkan aktivitas laboratorium, studio komputasi, pendampingan dosen ahli, dan dedikasi mahasiswa dalam membangun solusi perangkat lunak inovatif untuk masa depan global.
                </>
              )}
            </p>
            <div className="flex items-center gap-4 py-4 border-t border-white/10">
              <div className="h-2 w-2 rounded-full bg-mono-yellow animate-pulse" />
              <span className="tech-tag text-white/50 text-[10px] tracking-widest">
                {lang === 'en' ? 'YOUTUBE PREVIEW // 1080P' : 'TAYANGAN YOUTUBE // 1080P'}
              </span>
            </div>
          </div>

          {/* Video Player Area */}
          <div className="lg:col-span-7">
            <div className="relative border border-white/20 bg-neutral-900 p-2 shadow-[8px_8px_0px_0px_var(--primary-color)]">
              {/* Aspect-Ratio Box (16:9) */}
              <div className="relative w-full aspect-video overflow-hidden">
                <iframe
                  className="absolute inset-0 w-full h-full border-0"
                  src={embedUrl}
                  title={`Video Profil ${PRODI_CONFIG.acronym} ${PRODI_CONFIG.universityShort}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              
              {/* Decorative Technical Info overlay */}
              <div className="flex justify-between items-center mt-3 px-1">
                <span className="tech-tag text-[9px] text-white/40">ID: {videoId}</span>
                <span className="tech-tag text-[9px] text-white/40">RATIO: 16:9</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
