import { useState } from 'react';
import { PRODI_CONFIG } from '@/config/prodi.config';

interface SubSubmenuItem {
  label: string;
  href: string;
}

interface SubmenuItem {
  label: string;
  href: string;
  isExternal?: boolean;
  items?: SubSubmenuItem[];
}

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  isExternal?: boolean;
  submenu?: SubmenuItem[];
}

interface NavDrawerProps {
  lang: 'id' | 'en';
  isOpen: boolean;
  onClose: () => void;
  logoUrl?: string | null;
}

export function NavDrawer({ lang, isOpen, onClose, logoUrl }: NavDrawerProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [openSubSubmenu, setOpenSubSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenu(openSubmenu === id ? null : id);
    setOpenSubSubmenu(null);
  };

  const menuItems: MenuItem[] = lang === 'en' ? [
    {
      id: 'about',
      label: 'ABOUT US',
      submenu: [
        { label: 'Program Achievements', href: '/en/#' },
        { label: 'Vision & Mission', href: '/en/#profil' },
        {
          label: 'Faculty & Staff Profile',
          href: '#',
          items: [
            { label: 'Organizational Structure', href: '/en/#struktur-organisasi' },
            { label: 'Faculty, Lab Tech & Staff', href: '/en/#dosen-staff' },
          ],
        },
        { label: 'Cooperation', href: '/en/#mitra-kerjasama' },
      ],
    },
    {
      id: 'academics',
      label: 'ACADEMICS',
      submenu: [
        { label: 'Study Program Curriculum', href: '/en/#tujuan-pendidikan' },
        { label: 'Prospectus', href: '/en/#info-singkat' },
        { label: 'Graduate Profile', href: '/en/#tujuan-pendidikan' },
        { label: 'Graduate Learning Outcomes (PLO)', href: '/en/#tujuan-pendidikan' },
        { label: 'Research & Publications', href: '/en/tulisan-dosen' },
        { label: 'Internship', href: '/en/#tujuan-pendidikan' },
        { label: 'Final Project / Thesis', href: '/en/#tugas-akhir' },
        { label: 'Lecture Schedule', href: '/en/statistik' },
        { label: 'Learning Management System (LMS)', href: 'https://lms.umbandung.ac.id', isExternal: true },
      ],
    },
    {
      id: 'statistics',
      label: 'STATISTICS',
      submenu: [
        { label: 'New Students Average', href: '/en/statistik#rata-maba' },
        { label: 'Lecturer Ratio', href: '/en/statistik#rasio-dosen' },
        { label: 'Study Duration Ratio', href: '/en/statistik#rasio-studi' },
      ],
    },
    {
      id: 'students',
      label: 'STUDENTS & ALUMNI',
      submenu: [
        { label: 'Student Achievements', href: '/en/#aktivitas-prestasi' },
        { label: 'Final Project', href: '/en/#tugas-akhir' },
        { label: 'Alumni', href: '/en/alumni' },
      ],
    },
    {
      id: 'gallery',
      label: 'ACTIVITY GALLERY',
      submenu: [
        { label: 'Faculty Activities', href: '/en/kegiatan-dosen' },
        { label: 'Student Activities', href: '/en/kegiatan-mahasiswa' },
      ],
    },
  ] : [
    {
      id: 'about',
      label: 'TENTANG KAMI',
      submenu: [
        { label: 'Prestasi Program Studi', href: '/#' },
        { label: 'Visi & Misi', href: '/#profil' },
        {
          label: 'Profil SDM',
          href: '#',
          items: [
            { label: 'Struktur Organisasi', href: '/#struktur-organisasi' },
            { label: 'Dosen, Laboran dan Karyawan', href: '/#dosen-staff' },
          ],
        },
        { label: 'Kerjasama', href: '/#mitra-kerjasama' },
      ],
    },
    {
      id: 'academics',
      label: 'AKADEMIK',
      submenu: [
        { label: 'Kurikulum Program Studi', href: '/#tujuan-pendidikan' },
        { label: 'Prospectus', href: '/#info-singkat' },
        { label: 'Profil Lulusan', href: '/#tujuan-pendidikan' },
        { label: 'Capaian Pembelajaran Lulusan (CPL)', href: '/#tujuan-pendidikan' },
        { label: 'Riset & Publikasi', href: '/tulisan-dosen' },
        { label: 'Magang', href: '/#tujuan-pendidikan' },
        { label: 'Tugas Akhir / Skripsi', href: '/#tugas-akhir' },
        { label: 'Jadwal Kuliah', href: '/statistik' },
        { label: 'Learning Management System (LMS)', href: 'https://lms.umbandung.ac.id', isExternal: true },
      ],
    },
    {
      id: 'statistics',
      label: 'STATISTIK',
      submenu: [
        { label: 'Rata Mahasiswa Baru', href: '/statistik#rata-maba' },
        { label: 'Rasio Dosen', href: '/statistik#rasio-dosen' },
        { label: 'Rasio Masa studi', href: '/statistik#rasio-studi' },
      ],
    },
    {
      id: 'students',
      label: 'MAHASISWA DAN ALUMNI',
      submenu: [
        { label: 'Prestasi Mahasiswa', href: '/#aktivitas-prestasi' },
        { label: 'Tugas Akhir', href: '/#tugas-akhir' },
        { label: 'Alumni', href: '/alumni' },
      ],
    },
    {
      id: 'gallery',
      label: 'GALERI KEGIATAN',
      submenu: [
        { label: 'Kegiatan Dosen', href: '/kegiatan-dosen' },
        { label: 'Kegiatan Mahasiswa', href: '/kegiatan-mahasiswa' },
      ],
    },
  ];

  const portals = PRODI_CONFIG.portals[lang] || [];

  return (
    <>
      {/* Drawer Overlay */}
      <div
        className={`cart-overlay fixed inset-0 bg-black/60 z-40 ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Navigation Drawer */}
      <div
        className={`cart-drawer fixed top-0 right-0 w-[85vw] sm:w-full sm:max-w-md h-full bg-mono-black text-white z-50 flex flex-col justify-between p-8 md:p-10 overflow-y-auto ${
          isOpen ? 'open' : ''
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 shrink-0">
          <div>
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Logo Prodi" 
                className="h-10 w-auto object-contain max-w-[200px]"
              />
            ) : (
              <span className="font-serif text-xl tracking-wide">
                {PRODI_CONFIG.degree} {PRODI_CONFIG.acronym} {PRODI_CONFIG.universityShort}
              </span>
            )}
            <span className="tech-tag block text-white/40 mt-1">
              {lang === 'en' ? 'NAVIGATION MENU' : 'MENU NAVIGASI'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-white/20 hover:border-white hover:text-mono-yellow transition-colors"
            aria-label="Close menu"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M2 2L14 14M14 2L2 14" />
            </svg>
          </button>
        </div>

        {/* Main Links */}
        <div className="flex-1 my-8 flex flex-col justify-start gap-4 shrink-0 overflow-y-auto pr-2">
          {menuItems.map((item, index) => {
            const numStr = String(index + 1).padStart(2, '0');
            const hasSubmenu = !!item.submenu;

            return (
              <div key={index} className="flex flex-col">
                {hasSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className="group flex items-center justify-between py-2 text-left bg-transparent border-0 p-0 w-full cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="tech-tag text-mono-yellow text-xs">{numStr}</span>
                        <span className="font-serif text-xl tracking-wide text-white group-hover:text-mono-yellow transition-colors">
                          {item.label}
                        </span>
                      </div>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 8 8"
                        fill="none"
                        className={`text-white/40 transition-transform ${
                          openSubmenu === item.id ? 'rotate-180' : ''
                        }`}
                      >
                        <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </button>
                    {/* Collapsible Submenu Container */}
                    <div
                      className={`overflow-hidden transition-all duration-300 pl-8 flex flex-col gap-2 ${
                        openSubmenu === item.id
                          ? 'max-h-[600px] mt-2 mb-4 opacity-100'
                          : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      {item.submenu.map((sub, idx) => {
                        const hasSubSub = !!sub.items;
                        if (hasSubSub) {
                          const isSubSubOpen = openSubSubmenu === sub.label;
                          return (
                            <div key={idx} className="flex flex-col">
                              <button
                                onClick={() => setOpenSubSubmenu(isSubSubOpen ? null : sub.label)}
                                className="group flex items-center justify-between py-1.5 text-left bg-transparent border-0 p-0 w-full cursor-pointer"
                              >
                                <span className="font-sans text-sm text-white/77 group-hover:text-mono-yellow transition-colors">
                                  {sub.label}
                                </span>
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                  className={`text-white/40 transition-transform ${
                                    isSubSubOpen ? 'rotate-180' : ''
                                  }`}
                                >
                                  <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.5" />
                                </svg>
                              </button>
                              <div
                                className={`overflow-hidden transition-all duration-300 pl-4 flex flex-col gap-1.5 ${
                                  isSubSubOpen
                                    ? 'max-h-[150px] mt-1.5 mb-2 opacity-100'
                                    : 'max-h-0 opacity-0 pointer-events-none'
                                }`}
                              >
                                {sub.items.map((subSub, subIdx) => (
                                  <a
                                    key={subIdx}
                                    href={subSub.href}
                                    onClick={onClose}
                                    className="font-sans text-xs text-white/60 hover:text-mono-yellow no-underline py-1 transition-colors"
                                  >
                                    {subSub.label}
                                  </a>
                                ))}
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <a
                              key={idx}
                              href={sub.href}
                              target={sub.isExternal ? '_blank' : undefined}
                              rel={sub.isExternal ? 'noopener noreferrer' : undefined}
                              onClick={onClose}
                              className="font-sans text-sm text-white/77 hover:text-mono-yellow no-underline py-1 transition-colors"
                            >
                              {sub.label}
                            </a>
                          );
                        }
                      })}
                    </div>
                  </>
                ) : (
                  <a
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={onClose}
                    className="group flex items-baseline gap-4 no-underline py-2"
                  >
                    <span className="tech-tag text-mono-yellow text-xs">{numStr}</span>
                    <span className="font-serif text-xl tracking-wide text-white group-hover:text-mono-yellow transition-colors">
                      {item.label}
                    </span>
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer / Portals */}
        <div className="pt-6 border-t border-white/10 shrink-0">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/5">
            <span className="tech-tag text-white/30">BAHASA // LANG</span>
            <div className="flex gap-4">
              <a
                href="/"
                className={`tech-tag text-xs no-underline transition-colors ${
                  lang === 'id' ? 'text-mono-yellow font-bold' : 'text-white/60'
                }`}
              >
                🇮🇩 ID
              </a>
              <a
                href="/en"
                className={`tech-tag text-xs no-underline transition-colors ${
                  lang === 'en' ? 'text-mono-yellow font-bold' : 'text-white/60'
                }`}
              >
                🇬🇧 EN
              </a>
            </div>
          </div>

          {portals.length > 0 && (
            <>
              <p className="tech-tag text-white/30 mb-3">
                {lang === 'en' ? 'QUICK PORTALS // ACADEMIC' : 'PORTAL CEPAT // AKADEMIK'}
              </p>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {portals.map((portal, idx) => (
                  <a
                    key={idx}
                    href={portal.href}
                    className="tech-tag text-white/60 hover:text-white transition-colors no-underline text-[9px]"
                  >
                    {portal.label}
                  </a>
                ))}
              </div>
            </>
          )}

          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <span className="tech-tag text-white/30">
              {lang === 'en' ? 'ACCREDITATION: B' : 'AKREDITASI: B'}
            </span>
            <span className="tech-tag text-mono-yellow font-bold">
              {PRODI_CONFIG.universityShort.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
