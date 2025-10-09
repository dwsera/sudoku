'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getTranslation } from '@/lib/translations';

export function Footer() {
  // 初始始终使用英文，避免hydration错误
  const [t, setT] = useState(getTranslation('en'));

  useEffect(() => {
    // 在客户端水合后再获取语言设置
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('language') || 'en';
      setT(getTranslation(lang));
    }
  }, []);

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Sudoku Master</h3>
            <p className="text-gray-400">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/play" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.playNow}
                </Link>
              </li>
              <li>
                <Link href="/daily-challenge" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.dailyChallenge}
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.tutorials}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
                  {t.footer.cookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sudoku Master. {t.footer.rights}</p>
          <p className="mt-2 text-sm">
            {t.footer.cookieNotice}
          </p>
        </div>
      </div>
    </footer>
  );
}
