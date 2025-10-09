'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { LanguageSwitcher } from './language-switcher';
import { getTranslation } from '@/lib/translations';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  // 初始始终使用英文，避免hydration错误
  const [t, setT] = useState(getTranslation('en'));

  useEffect(() => {
    // 在客户端水合后再获取语言设置
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('language') || 'en';
      setT(getTranslation(lang));
    }
  }, []);

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/play', label: t.nav.play },
    { href: '/daily-challenge', label: t.nav.dailyChallenge },
    { href: '/tutorials', label: t.nav.tutorials }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Sudoku Master
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
