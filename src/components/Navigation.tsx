import { useEffect, useState } from 'react';
import { PRODI_CONFIG } from '../config/prodi.config';

interface NavigationProps {
  lang: 'id' | 'en';
  onOpenMenu: () => void;
}

export function Navigation({ lang, onOpenMenu }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textClass = scrolled ? 'text-mono-black' : 'text-white';
  const subtextClass = scrolled ? 'text-mono-black/60' : 'text-white/60';

  const menuItems = lang === 'en' ? [
    { label: 'HOME', href: '/en' },
    {
      label: 'ABOUT US',
      href: '#',
      submenu: [
        { label: 'Vision & Mission', href: '#profil' },
        { label: 'History', href: '#sejarah' },
        { label: 'Accreditation', href: '#akreditasi' },
        { label: 'Faculty Activities', href: '#aktivitas-dosen' },
        { label: 'Faculty & Staff', href: '#dosen-staff' },
        { label: 'Organizational Structure', href: '#struktur-organisasi' },
        { label: 'News & Announcements', href: '#berita-agenda' },
      ],
    },
    {
      label: 'ACADEMIC PLAN',
      href: '#',
      submenu: [
        { label: 'Program Educational Objectives (PEO)', href: '#peo' },
        { label: 'Program Learning Outcomes (PLO)', href: '#plo' },
        { label: 'Curriculum Structure', href: '#program' },
      ],
    },
    { label: 'ADMISSION', href: 'https://pmb.umbandung.ac.id/', isExternal: true },
    { label: 'STATISTICS', href: '#statistik' },
    {
      label: 'STUDENTS & ALUMNI',
      href: '#',
      submenu: [
        { label: 'Student Activities & Achievements', href: '#aktivitas-prestasi' },
        { label: 'Final Project Archive', href: '#tugas-akhir' },
      ],
    },
    { label: 'ARCHIVE GALLERY', href: '#archive' },
  ] : [
    { label: 'HOME', href: '/' },
    {
      label: 'TENTANG KAMI',
      href: '#',
      submenu: [
        { label: 'Visi & Misi', href: '#profil' },
        { label: 'Sejarah Prodi', href: '#sejarah' },
        { label: 'Akreditasi', href: '#akreditasi' },
        { label: 'Aktivitas Dosen', href: '#aktivitas-dosen' },
        { label: 'Dosen & Staff', href: '#dosen-staff' },
        { label: 'Struktur Organisasi', href: '#struktur-organisasi' },
        { label: 'Berita', href: '#berita-agenda' },
      ],
    },
    {
      label: 'RENCANA AKADEMIK',
      href: '#',
      submenu: [
        { label: 'Tujuan Pendidikan Program (PEO)', href: '#peo' },
        { label: 'Tujuan Pembelajaran Program (PLO)', href: '#plo' },
        { label: 'Struktur Kurikulum', href: '#program' },
      ],
    },
    { label: 'ADMISSION', href: 'https://pmb.umbandung.ac.id/', isExternal: true },
    { label: 'STATISTIK', href: '#statistik' },
    {
      label: 'MAHASISWA & ALUMNI',
      href: '#',
      submenu: [
        { label: 'Aktivitas & Prestasi Mahasiswa', href: '#aktivitas-prestasi' },
        { label: 'Tugas Akhir', href: '#tugas-akhir' },
      ],
    },
    { label: 'GALERI ARSIP', href: '#archive' },
  ];

  const portals = lang === 'en' ? PRODI_CONFIG.portals.en : PRODI_CONFIG.portals.id;

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-30 border-b transition-all duration-500 ${
        scrolled ? 'nav-blur bg-white/90 shadow-sm border-mono-black/10' : 'bg-transparent border-transparent'
      }`}
    >
      {/* Top Utility Bar (Quick Portal) */}
      <div
        className={`hidden lg:block border-b border-white/10 text-[9px] font-sans font-bold tracking-widest transition-all duration-300 overflow-hidden ${
          scrolled ? 'max-h-0 py-0 border-none bg-mono-black' : 'bg-transparent max-h-10 py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-12 flex justify-end gap-6">
          {portals.map((portal, idx) => (
            <a
              key={idx}
              href={portal.href}
              className={`transition-colors no-underline ${
                scrolled ? 'text-white/70 hover:text-mono-yellow' : 'text-white/70 hover:text-mono-yellow'
              }`}
            >
              {portal.label}
            </a>
          ))}
        </div>
      </div>

      <div
        className={`w-full px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        {/* Logo */}
        <a href={lang === 'en' ? '/en' : '/'} className="flex flex-col no-underline shrink-0">
          <span className={`font-serif text-xl tracking-wide transition-colors ${textClass}`}>
            {PRODI_CONFIG.degree} {PRODI_CONFIG.acronym} {PRODI_CONFIG.universityShort}
          </span>
          <span className={`tech-tag transition-colors mt-0.5 ${subtextClass}`}>
            {lang === 'en' ? PRODI_CONFIG.name.en.toUpperCase() : PRODI_CONFIG.name.id.toUpperCase()}
          </span>
        </a>

        {/* Desktop Menu (Centered/Right-aligned inline links) */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group py-2">
              {item.submenu ? (
                <>
                  <button className={`flex items-center gap-1.5 font-sans text-[11px] font-bold tracking-widest bg-transparent border-0 p-0 cursor-pointer transition-colors hover:text-mono-yellow ${textClass}`}>
                    {item.label}
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60 transition-transform group-hover:rotate-180">
                      <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full mt-2 w-64 bg-mono-black border border-white/20 py-3 shadow-[4px_4px_0px_0px_var(--primary-color)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                    {item.submenu.map((sub, idx) => (
                      <a
                        key={idx}
                        href={sub.href}
                        className="block px-5 py-2.5 text-xs text-white/80 hover:text-mono-yellow hover:bg-neutral-900 transition-all no-underline font-sans tracking-wide border-l-2 border-transparent hover:border-mono-yellow"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className={`font-sans text-[11px] font-bold tracking-widest no-underline transition-colors hover:text-mono-yellow ${textClass}`}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          {/* Language Selector Dropdown with flag icons */}
          <div className="relative group py-2">
            <button className={`flex items-center gap-1.5 font-sans text-[11px] font-bold tracking-widest bg-transparent border-0 p-0 cursor-pointer transition-colors hover:text-mono-yellow ${textClass}`}>
              {lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60 transition-transform group-hover:rotate-180">
                <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="absolute right-0 top-full mt-2 w-28 bg-mono-black border border-white/20 py-2 shadow-[4px_4px_0px_0px_var(--primary-color)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
              <a
                href="/"
                className={`block w-full text-left px-4 py-2 text-xs font-sans font-semibold text-white/80 hover:text-mono-yellow hover:bg-neutral-900 transition-colors no-underline ${lang === 'id' ? 'text-mono-yellow' : ''}`}
              >
                🇮🇩 ID
              </a>
              <a
                href="/en"
                className={`block w-full text-left px-4 py-2 text-xs font-sans font-semibold text-white/80 hover:text-mono-yellow hover:bg-neutral-900 transition-colors no-underline ${lang === 'en' ? 'text-mono-yellow' : ''}`}
              >
                🇬🇧 EN
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Hamburger Menu Trigger */}
        <div className="lg:hidden">
          <button
            onClick={onOpenMenu}
            className={`flex items-center gap-3 px-4 py-2 border transition-all duration-300 ${
              scrolled
                ? 'border-mono-black text-mono-black hover:bg-mono-black hover:text-white'
                : 'border-white/30 text-white hover:border-white hover:bg-white/10'
            }`}
            aria-label="Open menu"
          >
            <span className="tech-tag text-[10px] font-bold tracking-wider">MENU</span>
            <div className="flex flex-col gap-1 w-4 items-end">
              <span className={`h-px w-full transition-colors ${scrolled ? 'bg-mono-black' : 'bg-white'}`} />
              <span className={`h-px w-3/4 transition-colors ${scrolled ? 'bg-mono-black' : 'bg-white'}`} />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
