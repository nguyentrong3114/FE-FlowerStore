'use client';

import { Moon, Sun, User, ShoppingCart, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const { user, loading, logout } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [showNavbar]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'
        } bg-transparent backdrop-blur-lg`}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Theme Toggle */}
        <div className="text-2xl font-bold flex items-center space-x-2">
          <Link href="/">AM PERFUME</Link>
          <button onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Moon color="yellow" /> : <Sun color="gray" />}
          </button>
        </div>

        {/* Main Nav Links */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <li><Link href="/">{t('home')}</Link></li>
          <li><Link href="/aboutus">{t('about')}</Link></li>
          <DropdownMenu
            links={[
              { text: 'All', href: '/products', },
              { text: t('perfumeformale'), href: '/products/forhim' },
              { text: t('perfumeforfemale'), href: '/products/forher' },
            ]}
          >
            {t('products')}
          </DropdownMenu>
          <li><Link href="/services">{t('services')}</Link></li>
          <li><Link href="/contact">{t('contact')}</Link></li>
        </ul>

        {/* Actions */}
        <div className="flex items-center space-x-3" ref={searchRef}>
          {loading ? null : user ? (
            <>
              <Link href="/me" className="rounded-md text-sm">
                {theme === 'dark' ? <User color="yellow" /> : <User color="gray" />}
              </Link>
              <button className='-md text-sm' onClick={logout} aria-label="Logout">
                {theme === 'dark' ? <LogOut color="yellow" /> : <LogOut color="gray" />}
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium px-4 py-2 border rounded-md hover:bg-blue-500 transition"
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="rounded-full transition-colors"
            aria-label="Search"
          >
            {theme === 'dark' ? <Search color="yellow" /> : <Search color="gray" />}
          </button>
          <div className="relative">
            {showSearch && (
              <div className="absolute right-4 mt-8 w-64 rounded-lg shadow-lg transition-all">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                  autoFocus
                />
              </div>
            )}
          </div>
          <Link href="/cart" aria-label="Go to cart">
            {theme === 'dark' ? <ShoppingCart color="yellow" /> : <ShoppingCart color="gray" />}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
