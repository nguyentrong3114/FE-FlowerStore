'use client';
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';

import en from '@/locales/en';
import vi from '@/locales/vi';

export type Language = 'en' | 'vi';
const translations = { en, vi };

type TranslationKey = keyof typeof en;

type LanguageContextType = {
  locale: Language;
  setLocale: (locale: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => en[key],
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Language>('en');

  const t = useMemo(() => {
    return (key: TranslationKey) => translations[locale][key];
  }, [locale]);

  const contextValue = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
