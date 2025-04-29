
import { useLanguage } from '@/contexts/LanguageContext';

export default function useTranslation() {
  const { t } = useLanguage();
  return t;
}
