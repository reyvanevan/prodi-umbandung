import React from 'react';
import { useDosen } from '@/hooks/useSupabaseData';
import { ACADEMIC_DOSEN } from '@/lib/site-data';

interface DosenListSectionProps {
  lang: 'id' | 'en';
}

export function DosenListSection({ lang }: DosenListSectionProps) {
  const { dosen, loading } = useDosen(lang);

  // Fallback to static mock data if Supabase has no data or is not configured
  const rawList = dosen && dosen.length > 0 ? dosen : ACADEMIC_DOSEN;

  // Group by category (defaulting to 'dosen' if not provided)
  const dosenList = rawList.filter(item => !item.category || item.category === 'dosen');
  const staffList = rawList.filter(item => item.category === 'karyawan_laboran');

  // Helper to get localized role
  const getRoleText = (item: any) => {
    if (lang === 'en') {
      return item.role_en || item.role || (item.category === 'karyawan_laboran' ? 'Staff' : 'Faculty Member');
    }
    return item.role || (item.category === 'karyawan_laboran' ? 'Staff / Karyawan' : 'Dosen Pengajar');
  };

  // Render Skeleton Loader
  if (loading) {
    return (
      <div className="space-y-16">
        {/* Section 1 Skeleton */}
        <div>
          <div className="h-8 bg-neutral-200/80 rounded w-64 mb-8 animate-pulse border border-mono-black/10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col justify-between border border-mono-black bg-white p-8 animate-pulse shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-neutral-200 border border-mono-black/10 shadow-sm mb-6 rounded-xl" />
                  <div className="h-6 bg-neutral-200 w-3/4 rounded mb-4" />
                  <div className="h-4 bg-neutral-200 w-1/2 rounded mb-6" />
                  <div className="space-y-2 w-full py-4 border-t border-b border-neutral-100">
                    <div className="h-3 bg-neutral-200 w-full rounded" />
                    <div className="h-3 bg-neutral-200 w-5/6 rounded" />
                  </div>
                  <div className="flex gap-3 mt-6">
                    <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                    <div className="w-8 h-8 bg-neutral-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderCard = (item: any) => {
    const isDosen = !item.category || item.category === 'dosen';
    const name = item.name;
    const imgSrc = item.img_src || item.imgSrc || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop';
    const scopus = item.scopus || '-';
    const sinta = item.sinta || '-';
    const scholar = item.scholar || '-';
    const facebook = item.facebook || '#';
    const twitter = item.twitter || '#';
    const tiktok = item.tiktok || '#';
    const instagram = item.instagram || '#';

    return (
      <div key={item.id} className="flex flex-col justify-between border border-mono-black bg-white p-8 hover:shadow-[6px_6px_0px_0px_var(--primary-color)] transition-all duration-300">
        <div className="flex flex-col items-center">
          {/* Photo Container */}
          <div className="w-48 h-48 overflow-hidden bg-neutral-100 border border-mono-black/10 shadow-sm mb-6 rounded-xl">
            <img 
              src={imgSrc} 
              alt={name} 
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Name */}
          <h3 className="font-serif text-xl font-bold text-mono-black text-center mb-1 flex items-center justify-center min-h-[2.5rem]">
            {name}
          </h3>

          {/* Role Badge */}
          <p className="text-xs font-medium text-[#E54B64] tracking-wide mb-4 font-mono uppercase bg-[#E54B64]/5 px-2.5 py-1 rounded-full border border-[#E54B64]/10">
            {getRoleText(item)}
          </p>

          {/* Identifiers (Only for Dosen) */}
          {isDosen ? (
            <div className="space-y-1 text-center font-sans text-xs text-neutral-600 border-t border-b border-neutral-100 py-3 w-full">
              <p>Scopus : {scopus && scopus !== '-' ? (
                <a href={`https://www.scopus.com/authid/detail.uri?authorId=${scopus}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-[#E54B64]">{scopus}</a>
              ) : (
                <span>-</span>
              )}</p>
              <p>Sinta : {sinta && sinta !== '-' ? (
                <a href={`https://sinta.kemdikbud.go.id/authors/profile/${sinta}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-[#E54B64]">{sinta}</a>
              ) : (
                <span>-</span>
              )}</p>
              <p>Scholar : {scholar && scholar !== '-' && scholar !== '#' ? (
                <a href={`https://scholar.google.com/citations?user=${scholar}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold text-[#E54B64]">{scholar}</a>
              ) : (
                <span>-</span>
              )}</p>
            </div>
          ) : (
            <div className="w-full border-t border-neutral-100 my-1" />
          )}

          {/* Social Media Links */}
          <div className="flex justify-center gap-3 mt-6">
            {facebook && facebook !== '#' && (
              <a 
                href={facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 bg-[#8B96A5] text-white hover:bg-mono-black transition-colors flex items-center justify-center rounded-full"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.615L17 8h-4V6.157C13 5.395 13.4 5 14.333 5H17V1L13.5 1C10.05 1 9 2.5 9 5.333V8z"/>
                </svg>
              </a>
            )}
            {twitter && twitter !== '#' && (
              <a 
                href={twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 bg-[#8B96A5] text-white hover:bg-mono-black transition-colors flex items-center justify-center rounded-full"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            )}
            {tiktok && tiktok !== '#' && (
              <a 
                href={tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 bg-[#8B96A5] text-white hover:bg-mono-black transition-colors flex items-center justify-center rounded-full"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.43-.43-.63-.67-.07 2.62-.04 5.24-.05 7.86-.01 1.74-.53 3.51-1.63 4.86-1.5 1.9-3.95 2.87-6.31 2.63-2.36-.26-4.57-1.84-5.46-4.12-.99-2.43-.54-5.41 1.15-7.39 1.54-1.89 4.11-2.73 6.47-2.2v4.06c-1.44-.39-3.08.13-3.92 1.36-.88 1.25-.79 3.07.2 4.15.93 1.05 2.53 1.34 3.73.69 1.05-.53 1.63-1.69 1.64-2.87.03-3.69.02-7.38.03-11.07z"/>
                </svg>
              </a>
            )}
            {instagram && instagram !== '#' && (
              <a 
                href={instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 bg-[#8B96A5] text-white hover:bg-mono-black transition-colors flex items-center justify-center rounded-full"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-24">
      {/* 1. Dosen / Faculty Section */}
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-mono-black mb-8 border-b border-mono-black/10 pb-3 flex items-center gap-3">
          <span className="w-2.5 h-6 bg-[#E54B64]" />
          {lang === 'en' ? 'Faculty & Lecturers' : 'Dosen Pengajar'}
        </h2>
        {dosenList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dosenList.map(renderCard)}
          </div>
        ) : (
          <p className="text-neutral-500 font-sans text-sm italic py-4">
            {lang === 'en' ? 'No lecturers listed.' : 'Belum ada data dosen pengajar.'}
          </p>
        )}
      </div>

      {/* 2. Karyawan & Laboran Section */}
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-mono-black mb-8 border-b border-mono-black/10 pb-3 flex items-center gap-3">
          <span className="w-2.5 h-6 bg-amber-500" />
          {lang === 'en' ? 'Staff & Lab Technicians' : 'Karyawan & Laboran'}
        </h2>
        {staffList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffList.map(renderCard)}
          </div>
        ) : (
          <p className="text-neutral-500 font-sans text-sm italic py-4">
            {lang === 'en' ? 'No staff members listed.' : 'Belum ada data karyawan & laboran.'}
          </p>
        )}
      </div>
    </div>
  );
}
