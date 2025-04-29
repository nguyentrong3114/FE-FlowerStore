'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en';
import vi from '@/locales/vi';

export type Language = 'en' | 'vi';
const translations = { en, vi };

type TranslationKey = keyof typeof en; // assuming en and vi have the same structure

const LanguageContext = createContext<{
  locale: Language;
  setLocale: (locale: Language) => void;
  t: (key: TranslationKey) => string;
}>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => en[key],
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Language>('en');

  const t = (key: TranslationKey) => translations[locale][key];

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Language;
    if (stored) setLocale(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
