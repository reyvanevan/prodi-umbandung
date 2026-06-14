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
  const [logoHeight, setLogoHeight] = useState<string | null>(null);
  const [logoPadding, setLogoPadding] = useState<string | null>(null);
  const [logoRadius, setLogoRadius] = useState<string | null>(null);
  const [logoObjectFit, setLogoObjectFit] = useState<string | null>(null);

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
          const heightItem = dbContent.find((item) => item.key === 'logo_prodi_height');
          if (heightItem?.value) {
            setLogoHeight(heightItem.value);
          }
          const paddingItem = dbContent.find((item) => item.key === 'logo_prodi_padding');
          if (paddingItem?.value) {
            setLogoPadding(paddingItem.value);
          }
          const radiusItem = dbContent.find((item) => item.key === 'logo_prodi_radius');
          if (radiusItem?.value) {
            setLogoRadius(radiusItem.value);
          }
          const fitItem = dbContent.find((item) => item.key === 'logo_prodi_object_fit');
          if (fitItem?.value) {
            setLogoObjectFit(fitItem.value);
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
      <Navigation 
        lang={lang} 
        onOpenMenu={openMenu} 
        logoUrl={logoUrl} 
        logoHeight={logoHeight}
        logoPadding={logoPadding}
        logoRadius={logoRadius}
        logoObjectFit={logoObjectFit}
      />
      <NavDrawer 
        lang={lang} 
        isOpen={isMenuOpen} 
        onClose={closeMenu} 
        logoUrl={logoUrl} 
        logoHeight={logoHeight}
        logoPadding={logoPadding}
        logoRadius={logoRadius}
        logoObjectFit={logoObjectFit}
      />
    </>
  );
};
