import { useState, useEffect } from 'react';
import { Mail, Instagram, Youtube, MessageSquare, Linkedin, Globe, ArrowUp, Phone, MapPin, Clock } from 'lucide-react';
import { PRODI_CONFIG } from '@/config/prodi.config';
import { getSiteContent } from '@/lib/supabase/db';
import { isSupabaseConfigured } from '@/lib/supabase/client';

interface FooterProps {
  lang?: 'id' | 'en';
}

export function Footer({ lang = 'id' }: FooterProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isSupabaseConfigured) {
      getSiteContent().then((dbContent) => {
        if (dbContent) {
          const logoItem = dbContent.find((item) => item.key === 'logo_prodi_url');
          if (logoItem?.value) {
            setLogoUrl(logoItem.value);
          }
        }
      });
    }
  }, []);

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
              { name: 'Program Achievements', href: '/en/prestasi' },
              { name: 'Vision & Mission', href: '/en/visi-misi' },
              { name: 'Organizational Structure', href: '/en/struktur-organisasi' },
              { name: 'Faculty, Lab Tech & Staff', href: '/en/dosen' },
              { name: 'Cooperation', href: '/en/kerjasama' },
            ],
          },
          {
            id: 'statistics',
            name: 'STATISTICS',
            items: [
              { name: 'New Students Average', href: '/en/statistik#rata-maba' },
              { name: 'Lecturer Ratio', href: '/en/statistik#rasio-dosen' },
              { name: 'Study Duration Ratio', href: '/en/statistik#rasio-studi' },
            ],
          },
          {
            id: 'students',
            name: 'STUDENTS & ALUMNI',
            items: [
              { name: 'Student Achievements', href: '/en/prestasi' },
              { name: 'Final Project', href: '/en/tugas-akhir' },
              { name: 'Alumni', href: '/en/alumni' },
            ],
          },
          {
            id: 'gallery',
            name: 'ACTIVITY GALLERY',
            items: [
              { name: 'Faculty Activities', href: '/en/kegiatan-dosen' },
              { name: 'Student Activities', href: '/en/kegiatan-mahasiswa' },
            ],
          },
        ] : [
          {
            id: 'about',
            name: 'TENTANG KAMI',
            items: [
              { name: 'Prestasi Program Studi', href: '/prestasi' },
              { name: 'Visi & Misi', href: '/visi-misi' },
              { name: 'Struktur Organisasi', href: '/struktur-organisasi' },
              { name: 'Dosen, Laboran dan Karyawan', href: '/dosen' },
              { name: 'Kerjasama', href: '/kerjasama' },
            ],
          },
          {
            id: 'statistics',
            name: 'STATISTIK',
            items: [
              { name: 'Rata Mahasiswa Baru', href: '/statistik#rata-maba' },
              { name: 'Rasio Dosen', href: '/statistik#rasio-dosen' },
              { name: 'Rasio Masa studi', href: '/statistik#rasio-studi' },
            ],
          },
          {
            id: 'students',
            name: 'MAHASISWA & ALUMNI',
            items: [
              { name: 'Prestasi Mahasiswa', href: '/prestasi' },
              { name: 'Tugas Akhir', href: '/tugas-akhir' },
              { name: 'Alumni', href: '/alumni' },
            ],
          },
          {
            id: 'gallery',
            name: 'GALERI KEGIATAN',
            items: [
              { name: 'Kegiatan Dosen', href: '/kegiatan-dosen' },
              { name: 'Kegiatan Mahasiswa', href: '/kegiatan-mahasiswa' },
            ],
          },
        ],
      },
    ],
  };

  const socialItemClass = `hover:-translate-y-1 border border-dotted border-mono-black/40 rounded-xl p-2.5 transition-transform text-mono-black/60 hover:text-mono-black hover:border-mono-black`;

  return (
    <footer className="w-full bg-white border-t border-mono-black/10 py-16 px-6 lg:px-12">
      {/* Top Description Area with Logo */}
      <div className="relative mx-auto max-w-7xl pb-10 border-b border-dotted border-mono-black/20">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src="/assets/logo-umb.png" 
              alt={`Logo ${PRODI_CONFIG.universityShort}`} 
              className="h-16 w-auto object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt="Logo Prodi" 
                className="h-16 w-auto object-contain"
              />
            ) : (
              <div className="flex flex-col">
                <span className="font-serif text-2xl tracking-wide text-mono-black">
                  {PRODI_CONFIG.degree} {PRODI_CONFIG.acronym} {PRODI_CONFIG.universityShort}
                </span>
                <span className="tech-tag text-mono-yellow font-bold mt-1 text-[10px] tracking-wider">
                  {lang === 'en' ? PRODI_CONFIG.name.en.toUpperCase() : PRODI_CONFIG.name.id.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <p className="bg-transparent text-xs leading-5 text-mono-black/60 max-w-3xl md:ml-8 border-l-0 md:border-l md:border-mono-black/15 md:pl-8 py-1 m-0">
            {lang === 'en' ? (
              <>
                Academic Portal of the Bachelor Program in {PRODI_CONFIG.name.en}, {PRODI_CONFIG.university}. 
                We produce professional software engineers, system architects, and technology innovators ready to compete globally.
              </>
            ) : (
              <>
                Portal Akademik Program Studi {PRODI_CONFIG.degree} {PRODI_CONFIG.name.id}, {PRODI_CONFIG.university}. 
                Kami mencetak rekayasawan perangkat lunak, arsitek sistem, dan inovator teknologi profesional yang siap bersaing di tingkat global.
              </>
            )}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl pt-10">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <p className="tech-tag text-mono-black/40 tracking-wider">CONTACT & INFO</p>
            
            <div className="flex flex-col gap-4 font-sans text-xs text-mono-black/70">
              <div className="flex items-start gap-3.5">
                <Mail className="h-4 w-4 text-mono-yellow shrink-0 mt-0.5" strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="font-bold text-mono-black mb-0.5">Email</span>
                  <a href={`mailto:${PRODI_CONFIG.contact.email}`} className="hover:text-mono-yellow transition-colors no-underline">
                    {PRODI_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="h-4 w-4 text-mono-yellow shrink-0 mt-0.5" strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="font-bold text-mono-black mb-0.5">{lang === 'en' ? 'Phone' : 'Telepon'}</span>
                  <span>{PRODI_CONFIG.contact.phone} ({PRODI_CONFIG.acronym} Helpdesk)</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="h-4 w-4 text-mono-yellow shrink-0 mt-0.5" strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="font-bold text-mono-black mb-0.5">{lang === 'en' ? 'Address' : 'Lokasi'}</span>
                  <span className="leading-relaxed">
                    {PRODI_CONFIG.contact.address}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="h-4 w-4 text-mono-yellow shrink-0 mt-0.5" strokeWidth={2} />
                <div className="flex flex-col">
                  <span className="font-bold text-mono-black mb-0.5">{lang === 'en' ? 'Working Hours' : 'Jam Operasional'}</span>
                  <span>Senin - Jumat | 08:00 - 16:00 WIB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid (Right Columns) */}
          <div className="lg:col-span-8">
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
                            className="font-sans text-xs text-mono-black/65 hover:text-mono-yellow transition-colors no-underline tracking-wide"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                {/* Extra Portal Column */}
                <div>
                  <p className="tech-tag text-mono-black/40 mb-4 tracking-wider">PORTALS</p>
                  <ul role="list" className="flex flex-col space-y-2.5 p-0 m-0 list-none">
                    <li className="flow-root">
                      <a href="https://umbandung.ac.id" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-mono-black/65 hover:text-mono-yellow transition-colors no-underline tracking-wide">
                        Main UMB Website
                      </a>
                    </li>
                    <li className="flow-root">
                      <a href="https://sinta.kemdiktisaintek.go.id/departments/authors/4508/B1E2C1BA-7DA9-4D94-AD8D-03A55689849E/00F7C6DB-046D-499C-B6A9-4EBE970BB955" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-mono-black/65 hover:text-mono-yellow transition-colors no-underline tracking-wide">
                        SINTA KTF UMB
                      </a>
                    </li>
                    <li className="flow-root">
                      <a href="https://pmb.umbandung.ac.id" target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-mono-black/65 hover:text-mono-yellow transition-colors no-underline tracking-wide">
                        PMB Portal
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
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
            href={PRODI_CONFIG.videoProfileUrl || "https://youtube.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className={socialItemClass}
          >
            <Youtube className="h-5 w-5" strokeWidth={1.5} />
          </a>
          <a
            aria-label="WhatsApp Group"
            href="https://wa.me/"
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
              © {new Date().getFullYear()} Bachelor Program in {PRODI_CONFIG.name.en} — {PRODI_CONFIG.university}. All Rights Reserved.
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
