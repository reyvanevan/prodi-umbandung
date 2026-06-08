import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { NavDrawer } from './NavDrawer';

interface HeaderProps {
  lang: 'id' | 'en';
}

export const Header: React.FC<HeaderProps> = ({ lang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Navigation lang={lang} onOpenMenu={openMenu} />
      <NavDrawer lang={lang} isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
};
