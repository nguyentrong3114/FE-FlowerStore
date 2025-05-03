'use client';

import { Moon, Sun, User, ShoppingCart } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import DropdownMenu from './DropdownMenu';

import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY.current) {
        if (showNavbar) setShowNavbar(false);
      } else {
        if (currentY === 0) {
          if (timeoutId.current) {
            clearTimeout(timeoutId.current);
            timeoutId.current = null;
          }
          if (!showNavbar) setShowNavbar(true);
        } else {
          if (timeoutId.current) clearTimeout(timeoutId.current);
          timeoutId.current = setTimeout(() => {
            setShowNavbar(true);
            timeoutId.current = null;
          }, 1000);
        }
      }

      lastScrollY.current = currentY;

      if (currentY < 800) {
        setIsTransparent(true);
      } else {
        setIsTransparent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [showNavbar]);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const goToCart = () => {
    router.push('/cart');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow ${showNavbar ? 'translate-y-0' : '-translate-y-full'
        } ${isTransparent ? 'bg-transparent' : 'bg-white dark:bg-neutral-900'}`}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between text-black dark:text-white">

        {/* Logo & Theme Toggle */}
        <div className="text-2xl font-bold flex items-center space-x-2">
          <a href="#">AM PERFUME</a>
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Moon color="yellow" /> : <Sun color="gray" />}
          </button>
        </div>

        {/* Main Nav Links */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <li><a href="#home">{t('home')}</a></li>
          <li><a href="#about">{t('about')}</a></li>
          <DropdownMenu
            links={[
              { text: t('perfumeformale'), href: '#male' },
              { text: t('perfumeforfemale'), href: '#female' },
              { text: 'Logout', href: '#logout' },
            ]}
          >
            {t('products')}
          </DropdownMenu>
          <li><a href="#services">{t('services')}</a></li>
          <li><a href="#contact">{t('contact')}</a></li>
        </ul>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 rounded-md text-sm">
            {theme === 'dark' ? <User color="yellow" /> : <User color="gray" />}
          </button>
          <button onClick={goToCart} aria-label="Go to cart">
            {theme === 'dark' ? <ShoppingCart color="yellow" /> : <ShoppingCart color="gray" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
