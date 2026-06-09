import { useEffect, useState } from 'react';
import { PRODI_CONFIG } from '@/config/prodi.config';

interface NavigationProps {
  lang: 'id' | 'en';
  onOpenMenu: () => void;
  logoUrl?: string | null;
}

export function Navigation({ lang, onOpenMenu, logoUrl }: NavigationProps) {
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
        { label: 'Vision', href: '/en/#profil' },
        { label: 'Mission', href: '/en/#profil' },
        { label: 'Program History', href: '/en/#sejarah' },
        { label: 'Accreditation', href: '/en/#akreditasi' },
        { label: 'Faculty Activities', href: '/en/#aktivitas-dosen' },
        { label: 'Faculty & Staff', href: '/en/#dosen-staff' },
        { label: 'Organizational Structure', href: '/en/#struktur-organisasi' },
        { label: 'Faculty Publications', href: '/en/tulisan-dosen' },
      ],
    },
    { label: 'ADMISSIONS', href: 'https://pmb.umbandung.ac.id/', isExternal: true },
    {
      label: 'STATISTICS',
      href: '#',
      submenu: [
        { label: 'New Students Average', href: '/en/statistik#rata-maba' },
        { label: 'Lecturer Ratio', href: '/en/statistik#rasio-dosen' },
        { label: 'Study Duration Ratio', href: '/en/statistik#rasio-studi' },
      ],
    },
    {
      label: 'STUDENTS & ALUMNI',
      href: '#',
      submenu: [
        { label: 'Student Achievements', href: '/en/#aktivitas-prestasi' },
        { label: 'Final Project', href: '/en/#tugas-akhir' },
        { label: 'Alumni', href: '/en/alumni' },
      ],
    },
    {
      label: 'ACTIVITY GALLERY',
      href: '#',
      submenu: [
        { label: 'Faculty Activities', href: '/en/kegiatan-dosen' },
        { label: 'Student Activities', href: '/en/kegiatan-mahasiswa' },
      ],
    },
    ...(PRODI_CONFIG.sintaUrl ? [{ 
      label: 'SINTA PRODI', 
      href: PRODI_CONFIG.sintaUrl, 
      isExternal: true 
    }] : []),
  ] : [
    { label: 'HOME', href: '/' },
    {
      label: 'TENTANG KAMI',
      href: '#',
      submenu: [
        { label: 'Visi', href: '/#profil' },
        { label: 'Misi', href: '/#profil' },
        { label: 'Sejarah Prodi', href: '/#sejarah' },
        { label: 'Akreditasi', href: '/#akreditasi' },
        { label: 'Aktivitas Dosen', href: '/#aktivitas-dosen' },
        { label: 'Dosen dan Staff', href: '/#dosen-staff' },
        { label: 'Struktur Organisasi', href: '/#struktur-organisasi' },
        { label: 'Tulisan Dosen', href: '/tulisan-dosen' },
      ],
    },
    { label: 'ADMISSIONS', href: 'https://pmb.umbandung.ac.id/', isExternal: true },
    {
      label: 'STATISTIK',
      href: '#',
      submenu: [
        { label: 'Rata Mahasiswa Baru', href: '/statistik#rata-maba' },
        { label: 'Rasio Dosen', href: '/statistik#rasio-dosen' },
        { label: 'Rasio Masa studi', href: '/statistik#rasio-studi' },
      ],
    },
    {
      label: 'MAHASISWA DAN ALUMNI',
      href: '#',
      submenu: [
        { label: 'Prestasi Mahasiswa', href: '/#aktivitas-prestasi' },
        { label: 'Tugas Akhir', href: '/#tugas-akhir' },
        { label: 'Alumni', href: '/alumni' },
      ],
    },
    {
      label: 'GALERI KEGIATAN',
      href: '#',
      submenu: [
        { label: 'Kegiatan Dosen', href: '/kegiatan-dosen' },
        { label: 'Kegiatan Mahasiswa', href: '/kegiatan-mahasiswa' },
      ],
    },
    ...(PRODI_CONFIG.sintaUrl ? [{ 
      label: 'SINTA PRODI', 
      href: PRODI_CONFIG.sintaUrl, 
      isExternal: true 
    }] : []),
  ];

  const portals = PRODI_CONFIG.portals[lang] || [];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-30 border-b transition-all duration-500 ${
        scrolled ? 'nav-blur bg-white/90 shadow-sm border-mono-black/10' : 'bg-transparent border-transparent'
      }`}
    >
      {/* Top Utility Bar (Quick Portal) */}
      {portals.length > 0 && (
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
                className="transition-colors no-underline text-white/70 hover:text-mono-yellow"
              >
                {portal.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div
        className={`w-full px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'py-4' : 'py-6'
        }`}
      >
        {/* Logo */}
        <a href={lang === 'en' ? '/en' : '/'} className="flex items-center gap-3 no-underline shrink-0">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt="Logo Prodi" 
              className="h-10 md:h-12 w-auto object-contain"
            />
          ) : (
            <div className="flex flex-col">
              <span className={`font-serif text-xl tracking-wide transition-colors ${textClass}`}>
                {PRODI_CONFIG.degree} {PRODI_CONFIG.acronym} {PRODI_CONFIG.universityShort}
              </span>
              <span className={`tech-tag transition-colors mt-0.5 ${subtextClass}`}>
                {lang === 'en' ? PRODI_CONFIG.name.en.toUpperCase() : PRODI_CONFIG.name.id.toUpperCase()}
              </span>
            </div>
          )}
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group py-2">
              {item.submenu ? (
                <>
                  <button className={`flex items-center gap-1.5 font-sans text-[11px] font-bold tracking-widest bg-transparent border-0 p-0 cursor-pointer transition-all hover:opacity-75 ${textClass}`}>
                    {item.label}
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60 transition-transform group-hover:rotate-180">
                      <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                  {/* Dropdown Menu */}
                  <div className={`absolute left-0 top-full mt-2 w-64 bg-white border border-mono-black/10 py-3 shadow-[4px_4px_0px_0px_var(--primary-color)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50`}>
                    {item.submenu.map((sub, idx) => (
                      <a
                        key={idx}
                        href={sub.href}
                        className="block px-5 py-2.5 text-xs text-mono-black/80 hover:text-mono-black hover:bg-mono-black/5 transition-all no-underline font-sans tracking-wide border-l-2 border-transparent hover:border-mono-black"
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
                  className={`font-sans text-[11px] font-bold tracking-widest no-underline transition-all hover:opacity-75 ${textClass}`}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          {/* Language Selector Dropdown */}
          <div className="relative group py-2">
            <button className={`flex items-center gap-1.5 font-sans text-[11px] font-bold tracking-widest bg-transparent border-0 p-0 cursor-pointer transition-all hover:opacity-75 ${textClass}`}>
              {lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="opacity-60 transition-transform group-hover:rotate-180">
                <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <div className={`absolute right-0 top-full mt-2 w-28 bg-white border border-mono-black/10 py-2 shadow-[4px_4px_0px_0px_var(--primary-color)] opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50`}>
              <a
                href="/"
                className={`block w-full text-left px-4 py-2 text-xs font-sans font-semibold text-mono-black/80 hover:text-mono-black hover:bg-mono-black/5 transition-colors no-underline ${lang === 'id' ? 'text-mono-black bg-mono-black/5' : ''}`}
              >
                🇮🇩 ID
              </a>
              <a
                href="/en"
                className={`block w-full text-left px-4 py-2 text-xs font-sans font-semibold text-mono-black/80 hover:text-mono-black hover:bg-mono-black/5 transition-colors no-underline ${lang === 'en' ? 'text-mono-black bg-mono-black/5' : ''}`}
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
