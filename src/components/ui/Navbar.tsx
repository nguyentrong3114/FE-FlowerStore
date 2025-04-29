'use client';
import { Moon,Sun  } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    console.log('Current theme:', theme);
  };

  return (
    <header className="shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="#">AM PERFUME</a>
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <li>
            <a href="#home" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
              About
            </a>
          </li>
          <DropdownMenu
            links={[
              { text: "Profile", href: "#profile" },
              { text: "Settings", href: "#settings" },
              { text: "Logout", href: "#logout" },
            ]}>
              Products
          </DropdownMenu>
          <li>
            <a href="#services" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-yellow-400 transition-colors">
              Contact
            </a>
          </li>
          {/* <li>
            <DropdownMenu
              links={[
                { text: "Profile", href: "#profile" },
                { text: "Settings", href: "#settings" },
                { text: "Logout", href: "#logout" },
              ]}
            />
          </li> */}
        </ul>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm">
            Login
          </button>

          <button
            onClick={toggleTheme}
            className=""
          >
            {theme === 'dark' ? <Moon color='yellow'/> : <Sun color='gray'/>}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
