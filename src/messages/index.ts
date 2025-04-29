
import en from '@/locales/en';
import vi from '@/locales/vi';

export const messages = {
  en,
  vi,
};

export type Language = keyof typeof messages;
