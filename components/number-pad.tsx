'use client';

import { useState, useEffect } from 'react';
import { getTranslation } from '@/lib/translations';

interface NumberPadProps {
  onNumberSelect: (num: number) => void;
  onClear: () => void;
}

export function NumberPad({ onNumberSelect, onClear }: NumberPadProps) {
  // 初始使用英文，然后在客户端水合后更新
  const [t, setT] = useState(getTranslation('en'));
  
  useEffect(() => {
    // 在客户端水合后获取当前语言设置
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('language') || 'en';
      setT(getTranslation(lang));
    }
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberSelect(num)}
            className="w-14 h-14 sm:w-16 sm:h-16 bg-white border-2 border-gray-300 rounded-lg text-xl font-bold hover:bg-blue-50 hover:border-blue-500 transition-colors shadow-sm"
          >
            {num}
          </button>
        ))}
      </div>
      <button
        onClick={onClear}
        className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors shadow-md"
      >
        {t.play.clear}
      </button>
    </div>
  );
}
