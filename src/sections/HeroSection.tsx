import { PRODI_CONFIG } from '../config/prodi.config';

interface HeroSectionProps {
  lang: 'id' | 'en';
}

export function HeroSection({ lang }: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-mono-stigma.png"
          alt="UMB Department Background"
          className="w-full h-full object-cover"
        />
        {/* Cinematic gradient overlay */}
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Main Title */}
        <div className="text-center fade-in-element flex flex-col items-center">
          <p className="tech-tag text-white/70 mb-6 tracking-ultra-wide">
            {PRODI_CONFIG.university.toUpperCase()}
          </p>
          <h1 className="font-serif text-white text-6xl md:text-8xl tracking-wide leading-none">
            {PRODI_CONFIG.degree} {PRODI_CONFIG.acronym}
          </h1>
          <h2 className="font-serif text-white text-3xl md:text-5xl tracking-wide mt-4 italic max-w-4xl">
            {lang === 'en' ? PRODI_CONFIG.name.en : PRODI_CONFIG.name.id}
          </h2>
        </div>

        {/* Ghost Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 fade-in-element delay-300">
          <a
            href="#profil"
            className="ghost-btn ghost-btn-dark px-10 py-4 border border-white text-white text-xs tracking-ultra-wide block text-center"
          >
            {lang === 'en' ? 'PROGRAM PROFILE' : 'PROFIL PRODI'}
          </a>
          <a
            href="#archive"
            className="ghost-btn ghost-btn-dark px-10 py-4 border border-white text-white text-xs tracking-ultra-wide block text-center"
          >
            {lang === 'en' ? 'ARCHIVE GALLERY' : 'KARYA ARSIP'}
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
