'use client';

import { useState, useRef, useEffect, useCallback } from "react";

// Định nghĩa kiểu dữ liệu cho props
interface DropdownMenuProps {
  children: React.ReactNode;
  links: { text: string, href: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false); 
      }, 300); 
    } else {
      setIsOpen(true);
      setIsClosing(false); 
    }
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {

      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 300); 
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative" ref={dropdownRef}>

      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="font-medium"
      >
        {children}
      </button>

      {isOpen && (
        <div 
          className={`absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10 transition-opacity duration-300 ease-in-out ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          role="menu"
        >
          {links.map((link) => (
            <a
              key={link.href} 
              href={link.href}
              role="menuitem"
              className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              {link.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
