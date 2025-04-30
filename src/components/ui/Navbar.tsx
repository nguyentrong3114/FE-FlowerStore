'use client';

import { Moon, Sun, ShoppingCart } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DropdownMenu from './DropdownMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();
  const router = useRouter();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // Scroll down → hide
      } else {
        setShowNavbar(true); // Scroll up → show
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const goToCart = () => {
    router.push('/cart');
  };

  return (
    <header
      className={`shadow-md fixed top-0 left-0 right-0  transition-transform duration-300 z-50 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="#">AM PERFUME</a>
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <li>
            <a href="#home" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
              {t('home')}
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
              {t('about')}
            </a>
          </li>
          <DropdownMenu
            links={[
              { text: t('perfumeformale'), href: "#male" },
              { text: t('perfumeforfemale'), href: "#female" },
              { text: "Logout", href: "#logout" },
            ]}
          >
            {t('products')}
          </DropdownMenu>
          <li>
            <a href="#services" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
              {t('services')}
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
              {t('contact')}
            </a>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
            {t('login')}
          </button>

          <LanguageSwitcher />

          <button onClick={toggleTheme}>
            {theme === 'dark' ? <Moon color="yellow" /> : <Sun color="gray" />}
          </button>

          <button onClick={goToCart}>
            {theme === 'dark' ? <ShoppingCart color="yellow" /> : <ShoppingCart color="gray" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
