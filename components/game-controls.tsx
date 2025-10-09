'use client';

import { Difficulty } from '@/lib/sudoku';
import { useEffect, useState } from 'react';
import { getTranslation } from '@/lib/translations';

interface GameControlsProps {
  difficulty: Difficulty;
  time: number;
  errors: number;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
  onHint: () => void;
}

export function GameControls({
  difficulty,
  time,
  errors,
  onDifficultyChange,
  onNewGame,
  onHint
}: GameControlsProps) {
  // 初始使用英文，然后在客户端水合后更新
  const [t, setT] = useState(getTranslation('en'));
  
  useEffect(() => {
    // 在客户端水合后获取当前语言设置
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('language') || 'en';
      setT(getTranslation(lang));
    }
  }, []);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <div className="bg-white rounded-lg shadow-md p-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-sm text-gray-600">{t.play.time}</div>
          <div className="text-2xl font-bold text-gray-900">{formatTime(time)}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">{t.play.errors}</div>
          <div className="text-2xl font-bold text-red-600">{errors}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.play.difficulty}
        </label>
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="easy">{t.home.easy}</option>
          <option value="medium">{t.home.medium}</option>
          <option value="hard">{t.home.hard}</option>
        </select>
      </div>

      <button
        onClick={onNewGame}
        className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
      >
        {t.play.newGame}
      </button>

      <button
        onClick={onHint}
        className="w-full py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors shadow-md"
      >
        {t.play.getHint}
      </button>
    </div>
  );
}
