'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation, getCurrentLanguage } from '@/lib/translations';

interface LanguageContextType {
  t: any;
  currentLanguage: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [t, setT] = useState(getTranslation('en'));
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const updateLanguage = () => {
      const lang = getCurrentLanguage();
      setCurrentLanguage(lang);
      setT(getTranslation(lang));
    };

    // 初始加载时更新语言
    updateLanguage();

    // 监听自定义的languageChanged事件
    window.addEventListener('languageChanged', updateLanguage);

    // 清理事件监听
    return () => {
      window.removeEventListener('languageChanged', updateLanguage);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ t, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 自定义钩子，用于在组件中访问语言上下文
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}