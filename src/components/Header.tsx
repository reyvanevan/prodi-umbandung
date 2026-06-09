import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { NavDrawer } from './NavDrawer';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { getSiteContent } from '@/lib/supabase/db';

interface HeaderProps {
  lang: 'id' | 'en';
}

export const Header: React.FC<HeaderProps> = ({ lang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

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

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <Navigation lang={lang} onOpenMenu={openMenu} logoUrl={logoUrl} />
      <NavDrawer lang={lang} isOpen={isMenuOpen} onClose={closeMenu} logoUrl={logoUrl} />
    </>
  );
};
