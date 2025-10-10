'use client';

import { useState, useEffect, useCallback } from 'react';
import { SudokuGridComponent } from '@/components/sudoku-grid';
import { NumberPad } from '@/components/number-pad';
import { Calendar, Trophy, Clock } from 'lucide-react';
import { useLanguage } from '@/components/language-provider';
import {
  generateDailyPuzzle,
  validateMove,
  checkComplete,
  getSolution,
  SudokuGrid,
  Difficulty
} from '@/lib/sudoku';

export default function DailyChallengePage() {
  const { t } = useLanguage();
  const [grid, setGrid] = useState<SudokuGrid | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [difficulty] = useState<Difficulty>('medium');
  const [time, setTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionGrid, setSolutionGrid] = useState<SudokuGrid | null>(null);

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today);
    setGrid(generateDailyPuzzle(today, difficulty));
  }, [difficulty]);

  useEffect(() => {
    if (!isComplete && grid) {
      const timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete, grid]);

  const handleCellClick = (row: number, col: number) => {
    if (grid && !grid[row][col].isFixed && !isComplete) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberSelect = (num: number) => {
    if (!selectedCell || isComplete || !grid) return;

    const { row, col } = selectedCell;
    if (grid[row][col].isFixed) return;

    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => {
        if (i === row && j === col) {
          return { ...cell, value: num, isError: false };
        }
        return cell;
      })
    );

    const isValid = validateMove(newGrid, row, col);

    if (!isValid) {
      newGrid[row][col].isError = true;
      setErrors((prev) => prev + 1);
    }

    setGrid(newGrid);

    if (checkComplete(newGrid)) {
      setIsComplete(true);
      saveCompletionToLocalStorage();
    }
  };

  const handleClear = () => {
    if (!selectedCell || isComplete || !grid) return;

    const { row, col } = selectedCell;
    if (grid[row][col].isFixed) return;

    const newGrid = grid.map((r, i) =>
      r.map((cell, j) => {
        if (i === row && j === col) {
          return { ...cell, value: 0, isError: false };
        }
        return cell;
      })
    );

    setGrid(newGrid);
  };

  const saveCompletionToLocalStorage = () => {
    if (!currentDate) return;

    const dateKey = currentDate.toISOString().split('T')[0];
    const completionData = {
      date: dateKey,
      time,
      errors,
      difficulty
    };

    localStorage.setItem(`sudoku-daily-${dateKey}`, JSON.stringify(completionData));
  };

  const toggleSolution = () => {
    if (!showSolution && !solutionGrid && grid) {
      setSolutionGrid(getSolution(grid));
    }
    setShowSolution(!showSolution);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!grid || !currentDate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-700">Loading daily challenge...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">{t.dailyChallenge.title}</h1>
          </div>
          <p className="text-xl text-gray-600" suppressHydrationWarning>
            {currentDate.toLocaleDateString(
              localStorage.getItem('language') || 'en', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-gray-500 mt-2">
            {t.dailyChallenge.subtitle}
          </p>
        </div>

        {isComplete && (
          <div className="bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-500 rounded-lg p-6 mb-8 text-center max-w-md mx-auto">
            <Trophy className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              {t.dailyChallenge.complete}
            </h2>
            <p className="text-green-700">
              {t.dailyChallenge.completedTime}: {formatTime(time)} | {t.dailyChallenge.completedErrors}: {errors}
            </p>
            <p className="text-sm text-green-600 mt-2">
              {t.dailyChallenge.comeBackTomorrow}
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col items-center gap-6">
                <SudokuGridComponent
                grid={showSolution && solutionGrid ? solutionGrid : grid}
                selectedCell={selectedCell}
                onCellClick={handleCellClick}
              />
              <div className="lg:hidden">
                <NumberPad onNumberSelect={handleNumberSelect} onClear={handleClear} />
              </div>
            </div>

          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-900">{t.dailyChallenge.stats}</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">{t.play.time}</div>
                  <div className="text-3xl font-bold text-gray-900" suppressHydrationWarning>{formatTime(time)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">{t.play.errors}</div>
                  <div className="text-3xl font-bold text-red-600" suppressHydrationWarning>{errors}</div>
                </div>
                <button
                  onClick={toggleSolution}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${showSolution ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                >
                  {showSolution ? t.play.hideAnswer : t.play.showAnswer}
                </button>
                <div>
                  <div className="text-sm text-gray-600">{t.play.difficulty}</div>
                  <div className="text-lg font-semibold text-gray-900 capitalize">
                    {difficulty === 'easy' ? t.home.easy : 
                     difficulty === 'medium' ? t.home.medium : t.home.hard}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <NumberPad onNumberSelect={handleNumberSelect} onClear={handleClear} />
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t.dailyChallenge.aboutTitle}</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>{t.dailyChallenge.about1}</li>
                <li>{t.dailyChallenge.about2}</li>
                <li>{t.dailyChallenge.about3}</li>
                <li>{t.dailyChallenge.about4}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">{t.dailyChallenge.tipsTitle}</h3>
          <ul className="space-y-2 text-gray-700">
            <li>{t.dailyChallenge.tip1}</li>
            <li>{t.dailyChallenge.tip2}</li>
            <li>{t.dailyChallenge.tip3}</li>
            <li>{t.dailyChallenge.tip4}</li>
            <li>{t.dailyChallenge.tip5}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
