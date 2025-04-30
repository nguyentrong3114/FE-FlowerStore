'use client';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as 'en' | 'vi';
    setLocale(lang);
  };

  return (
    <div className="p-4">
      <select
        value={locale}
        onChange={handleChange}
        className="border border-gray-700 rounded px-3 py-2"
      >
        <option value="en" className="">
          English
        </option>
        <option value="vi" className="">
          Tiếng Việt
        </option>
      </select>
    </div>
  );
}
