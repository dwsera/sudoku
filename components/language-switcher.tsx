'use client';

import { useState, useEffect } from 'react';
import { Languages } from 'lucide-react';

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  // 初始始终使用英文，避免hydration错误
  const [currentLanguage, setCurrentLanguage] = useState('en');
  // 使用useEffect在客户端水合后再读取localStorage并更新
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') || 'en';
      setCurrentLanguage(savedLang);
    }
  }, []);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('language', langCode);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change language"
      >
        <Languages size={20} className="text-gray-600" />
        <span className="hidden sm:inline text-gray-700 font-medium">
          {currentLang.nativeName}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                  currentLanguage === lang.code ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{lang.nativeName}</span>
                  {currentLanguage === lang.code && (
                    <span className="text-blue-600">✓</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{lang.name}</div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
