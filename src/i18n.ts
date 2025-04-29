import en from './locales/en';
import vi from './locales/vi';

export const languages = {
  en,
  vi,
};

export type Language = keyof typeof languages;

export function getTranslation(locale: Language) {
  return languages[locale];
}
