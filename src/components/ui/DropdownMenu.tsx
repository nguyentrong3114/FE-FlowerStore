'use client';

import { useState, useRef, useEffect } from "react";

// Định nghĩa kiểu dữ liệu cho props
interface DropdownMenuProps {
  children: React.ReactNode;
  links: { text: string, href: string }[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="font-medium"
      >
        {children}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {/* Lặp qua mảng links và hiển thị các liên kết */}
          {links.map((link) => (
            <a
              key={link.href} 
              href={link.href}
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
