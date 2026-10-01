import React from 'react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../utils/translations';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'dark' | 'light';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  className = '', 
  variant = 'light' 
}) => {
  const { language, setLanguage } = useApp();

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' }
  ];

  return (
    <div className={`inline-flex items-center gap-1.5 p-1 rounded-xl text-xs font-semibold ${
      variant === 'dark' 
        ? 'bg-stone-900 border border-stone-800 text-stone-300' 
        : 'bg-stone-100 border border-stone-200 text-stone-700'
    } ${className}`}>
      <Globe className={`w-3.5 h-3.5 ml-1 ${variant === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`} />
      
      <div className="flex items-center gap-0.5">
        {languages.map((lang) => {
          const isActive = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`px-2 py-1 rounded-lg transition-all text-xs font-bold ${
                isActive
                  ? variant === 'dark'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-emerald-800 shadow-xs'
                  : variant === 'dark'
                    ? 'hover:text-white hover:bg-stone-800 text-stone-400'
                    : 'hover:text-stone-900 hover:bg-stone-200/60 text-stone-500'
              }`}
              title={`${lang.label} (${lang.native})`}
            >
              {lang.native}
            </button>
          );
        })}
      </div>
    </div>
  );
};
