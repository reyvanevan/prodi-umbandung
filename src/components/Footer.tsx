import { Mail, Instagram, Youtube, MessageSquare, Linkedin, Globe, ArrowUp } from 'lucide-react';
import { PRODI_CONFIG } from '../config/prodi.config';

interface FooterProps {
  lang?: 'id' | 'en';
}

export function Footer({ lang = 'id' }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navigation = {
    categories: [
      {
        sections: lang === 'en' ? [
          {
            id: 'about',
            name: 'ABOUT US',
            items: [
              { name: 'Vision & Mission', href: '#profil' },
              { name: 'Program History', href: '#sejarah' },
              { name: 'Accreditation', href: '#akreditasi' },
              { name: 'Faculty Activities', href: '#aktivitas-dosen' },
              { name: 'Faculty & Staff', href: '#dosen-staff' },
              { name: 'Organizational Structure', href: '#struktur-organisasi' },
              { name: 'News & Announcements', href: '#berita-agenda' },
            ],
          },
          {
            id: 'academics',
            name: 'ACADEMIC PLAN',
            items: [
              { name: 'Educational Objectives (PEO)', href: '#peo' },
              { name: 'Learning Outcomes (PLO)', href: '#plo' },
              { name: 'Curriculum Structure', href: '#program' },
              { name: 'Admission (PMB)', href: 'https://pmb.umbandung.ac.id/', isExternal: true },
            ],
          },
          {
            id: 'students',
            name: 'STUDENTS & ALUMNI',
            items: [
              { name: 'Activities & Achievements', href: '#aktivitas-prestasi' },
              { name: 'Final Project Gallery', href: '#tugas-akhir' },
              { name: 'Achievement Gallery', href: '#archive' },
              { name: 'Student Association (SERAT)', href: '#serat' },
            ],
          },
          {
            id: 'portals',
            name: 'CAMPUS PORTAL',
            items: [
              { name: 'Main UMB Website', href: 'https://umbandung.ac.id/', isExternal: true },
              { name: 'IGRACIAS Portal', href: '#igracias' },
              { name: `E-Journal ${PRODI_CONFIG.acronym}`, href: '#journal' },
              { name: 'Digital Library', href: '#library' },
            ],
          },
        ] : [
          {
            id: 'about',
            name: 'TENTANG KAMI',
            items: [
              { name: 'Visi & Misi', href: '#profil' },
              { name: 'Sejarah Prodi', href: '#sejarah' },
              { name: 'Akreditasi Prodi', href: '#akreditasi' },
              { name: 'Aktivitas Dosen', href: '#aktivitas-dosen' },
              { name: 'Dosen & Staff', href: '#dosen-staff' },
              { name: 'Struktur Organisasi', href: '#struktur-organisasi' },
              { name: 'Berita & Agenda', href: '#berita-agenda' },
            ],
          },
          {
            id: 'academics',
            name: 'RENCANA AKADEMIK',
            items: [
              { name: 'Tujuan Pendidikan (PEO)', href: '#peo' },
              { name: 'Tujuan Pembelajaran (PLO)', href: '#plo' },
              { name: 'Struktur Kurikulum', href: '#program' },
              { name: 'Pendaftaran (PMB)', href: 'https://pmb.umbandung.ac.id/', isExternal: true },
            ],
          },
          {
            id: 'students',
            name: 'MAHASISWA & ALUMNI',
            items: [
              { name: 'Aktivitas & Prestasi', href: '#aktivitas-prestasi' },
              { name: 'Galeri Tugas Akhir', href: '#tugas-akhir' },
              { name: 'Galeri Prestasi Karya', href: '#archive' },
              { name: 'Himpunan Mahasiswa (SERAT)', href: '#serat' },
            ],
          },
          {
            id: 'portals',
            name: 'PORTAL KAMPUS',
            items: [
              { name: 'Website Utama UMB', href: 'https://umbandung.ac.id/', isExternal: true },
              { name: 'Portal IGRACIAS', href: '#igracias' },
              { name: `E-Journal ${PRODI_CONFIG.acronym}`, href: '#journal' },
              { name: 'Perpustakaan Digital', href: '#library' },
            ],
          },
        ],
      },
    ],
  };

  const socialItemClass = `hover:-translate-y-1 border border-dotted border-mono-black/40 rounded-xl p-2.5 transition-transform text-mono-black/60 hover:text-mono-black hover:border-mono-black`;

  return (
    <footer className="w-full bg-white border-t border-mono-black/10 py-16 px-6 lg:px-12">
      {/* Top Description Area */}
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-6 pb-6 md:flex">
        <div className="flex flex-col shrink-0 md:text-left text-center">
          <span className="font-serif text-2xl tracking-wide text-mono-black">{PRODI_CONFIG.degree} {PRODI_CONFIG.acronym} {PRODI_CONFIG.universityShort}</span>
          <span className="tech-tag text-mono-yellow font-bold mt-1">
            {lang === 'en' ? PRODI_CONFIG.name.en.toUpperCase() : PRODI_CONFIG.name.id.toUpperCase()}
          </span>
        </div>
        <p className="bg-transparent text-center text-xs leading-5 text-mono-black/60 md:text-left max-w-4xl md:ml-8 border-l-0 md:border-l md:border-mono-black/15 md:pl-8">
          {lang === 'en' ? (
            <>
              Academic Portal of the Bachelor Program in {PRODI_CONFIG.name.en}, {PRODI_CONFIG.university}. 
              Dedicated to educating future innovators who combine the rich local heritage of Nusantara with modern design technology and research.
            </>
          ) : (
            <>
              Portal Akademik Program Studi {PRODI_CONFIG.degree} {PRODI_CONFIG.name.id}, {PRODI_CONFIG.university}. 
              Didedikasikan untuk mendidik inovator masa depan yang memadukan kekayaan budaya lokal Nusantara dengan teknologi desain modern dan riset material.
            </>
          )}
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="border-b border-dotted border-mono-black/20 my-8"></div>

        {/* Links Grid */}
        <div className="py-8">
          {navigation.categories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 leading-6"
            >
              {category.sections.map((section) => (
                <div key={section.id}>
                  <p className="tech-tag text-mono-black/40 mb-4 tracking-wider">{section.name}</p>
                  <ul role="list" className="flex flex-col space-y-2.5 p-0 m-0 list-none">
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <a
                          href={item.href}
                          target={item.isExternal ? '_blank' : undefined}
                          rel={item.isExternal ? 'noopener noreferrer' : undefined}
                          className="font-sans text-xs text-mono-black/65 hover:text-mono-yellow transition-colors no-underline tracking-wide"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="border-b border-dotted border-mono-black/20 my-8"></div>
      </div>

      {/* Social / Action Area */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-7xl mx-auto py-4">
        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            aria-label="Email Prodi"
            href={`mailto:${PRODI_CONFIG.contact.email}`}
            className={socialItemClass}
          >
            <Mail className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            aria-label="Instagram"
            href={`https://instagram.com/${PRODI_CONFIG.contact.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className={socialItemClass}
          >
            <Instagram className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            aria-label="YouTube Channel"
            href={PRODI_CONFIG.contact.youtube ? `https://youtube.com/${PRODI_CONFIG.contact.youtube}` : 'https://youtube.com/'}
            target="_blank"
            rel="noopener noreferrer"
            className={socialItemClass}
          >
            <Youtube className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            aria-label="WhatsApp Hotline"
            href={`https://wa.me/${PRODI_CONFIG.contact.phone.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={socialItemClass}
          >
            <MessageSquare className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            aria-label="LinkedIn"
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={socialItemClass}
          >
            <Linkedin className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            aria-label="Website Universitas"
            href="https://umbandung.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className={socialItemClass}
          >
            <Globe className="h-5 w-5" strokeWidth={1.5} />
          </a>
        </div>

        {/* Back to Top Widget */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleScrollTop}
            className="flex items-center gap-2 border border-dotted border-mono-black/40 rounded-full px-5 py-2.5 hover:border-mono-black hover:text-mono-yellow transition-all bg-transparent text-mono-black text-xs font-sans font-bold tracking-widest cursor-pointer"
          >
            <span>{lang === 'en' ? 'BACK TO TOP' : 'KEMBALI KE ATAS'}</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mx-auto mt-8 text-center text-xs text-mono-black/45 max-w-7xl pt-4 border-t border-mono-black/5">
        <p>
          {lang === 'en' ? (
            <>
              © {new Date().getFullYear()} {PRODI_CONFIG.degree} {PRODI_CONFIG.name.en} — {PRODI_CONFIG.university}. All Rights Reserved.
            </>
          ) : (
            <>
              © {new Date().getFullYear()} Program Studi {PRODI_CONFIG.degree} {PRODI_CONFIG.name.id} — {PRODI_CONFIG.university}. All Rights Reserved.
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
