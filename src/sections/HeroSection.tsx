import { PRODI_CONFIG } from '@/config/prodi.config';

interface HeroSectionProps {
  lang: 'id' | 'en';
}

export function HeroSection({ lang }: HeroSectionProps) {
  // Split name to display nicely in two lines
  const nameToDisplay = lang === 'en' ? PRODI_CONFIG.name.en : PRODI_CONFIG.name.id;
  const parts = nameToDisplay.split('&');
  const part1 = parts[0]?.trim();
  const part2 = parts[1] ? `& ${parts[1].trim()}` : '';

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/assets/hero-mono-stigma.png"
          alt={`${PRODI_CONFIG.acronym} Editorial Background`}
          className="w-full h-full object-cover"
        />
        {/* Cinematic gradient overlay */}
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        {/* Main Title */}
        <div className="text-center fade-in-element">
          <p className="tech-tag text-white/70 mb-6 tracking-ultra-wide">
            {PRODI_CONFIG.university.toUpperCase()}
          </p>
          <h1 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl tracking-wide leading-none">
            {lang === 'id' ? `${PRODI_CONFIG.degree} ${part1}` : part1}
          </h1>
          <h2 className="font-serif text-white text-4xl md:text-6xl lg:text-7xl tracking-wide mt-2 italic">
            {lang === 'en' ? `${part2} (${PRODI_CONFIG.degreeTitle})` : part2}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-12 fade-in-element delay-300">
          <a
            href="https://pmb.umbandung.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="ghost-btn ghost-btn-dark px-10 py-4 border border-white text-white text-xs tracking-ultra-wide block text-center font-bold bg-white/10 hover:bg-white hover:text-mono-black transition-colors"
          >
            {lang === 'en' ? 'REGISTRATION' : 'PENDAFTARAN'}
          </a>
          <a
            href={`/assets/brosur-${PRODI_CONFIG.acronym.toLowerCase()}.pdf`}
            target="_blank"
            download
            className="ghost-btn ghost-btn-dark px-10 py-4 border border-white text-white text-xs tracking-ultra-wide block text-center hover:bg-white hover:text-mono-black transition-colors"
          >
            {lang === 'en' ? 'BOOKLET' : 'BOOKLET'}
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
