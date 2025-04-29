"use client"
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  link?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className,link }) => {
  return (
    <a
      href={link}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none ${className}`}>
      {children}
    </a>
  );
};

export default Button;
