'use client';

import { useState, useEffect, useCallback } from 'react';
import { SudokuGridComponent } from '@/components/sudoku-grid';
import { NumberPad } from '@/components/number-pad';
import { GameControls } from '@/components/game-controls';
import {
  generateSudoku,
  validateMove,
  checkComplete,
  getSolution,
  SudokuGrid,
  Difficulty
} from '@/lib/sudoku';
import { useLanguage } from '@/components/language-provider';
import { AdSenseBanner } from '@/components/adsense-banner';

export default function PlayPage() {
  const { t } = useLanguage();
  const [grid, setGrid] = useState<SudokuGrid>(() => generateSudoku('medium'));
  const [solution, setSolution] = useState<SudokuGrid | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [time, setTime] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  useEffect(() => {
    const newGrid = generateSudoku(difficulty);
    setGrid(newGrid);
    setSolution(null);
    setSelectedCell(null);
    setTime(0);
    setErrors(0);
    setIsComplete(false);
    setIsPaused(false);
    setShowSolution(false);
  }, [difficulty]);

  useEffect(() => {
    if (!isComplete && !isPaused) {
      const timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isComplete, isPaused]);

  const handleCellClick = (row: number, col: number) => {
    if (!grid[row][col].isFixed && !isComplete) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberSelect = (num: number) => {
    if (!selectedCell || isComplete) return;

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
    }
  };

  const handleClear = () => {
    if (!selectedCell || isComplete) return;

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

  const handleNewGame = useCallback(() => {
    const newGrid = generateSudoku(difficulty);
    setGrid(newGrid);
    setSolution(null);
    setSelectedCell(null);
    setTime(0);
    setErrors(0);
    setIsComplete(false);
    setIsPaused(false);
    setShowSolution(false);
  }, [difficulty]);
  
  const handleShowSolution = () => {
    if (!showSolution && !solution && grid) {
      setSolution(getSolution(grid));
    }
    setShowSolution(!showSolution);
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    // useEffect will handle grid update
  };

  const handleHint = () => {
    if (!selectedCell || isComplete) return;

    const { row, col } = selectedCell;
    if (grid[row][col].isFixed) return;

    for (let num = 1; num <= 9; num++) {
      const testGrid = grid.map((r, i) =>
        r.map((cell, j) => {
          if (i === row && j === col) {
            return { ...cell, value: num };
          }
          return cell;
        })
      );

      if (validateMove(testGrid, row, col)) {
        handleNumberSelect(num);
        break;
      }
    }
  };

  // toggleSolution function is replaced by handleShowSolution

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
          {t.play.title}
        </h1>
        
        {/* 顶部广告位 */}
        {process.env.NODE_ENV === 'production' && <AdSenseBanner position="top" />}

        {isComplete && (
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-8 text-center max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
            {t.play.congratulations}
          </h2>
          <p className="text-green-700" suppressHydrationWarning>
            {t.play.completedIn} {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}
          </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <div className="flex flex-col items-center gap-6">
            <SudokuGridComponent
              grid={showSolution && solution ? solution : grid}
              selectedCell={selectedCell}
              onCellClick={handleCellClick}
            />
            <div className="lg:hidden">
              <NumberPad onNumberSelect={handleNumberSelect} onClear={handleClear} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <GameControls
              difficulty={difficulty}
              time={time}
              errors={errors}
              onDifficultyChange={handleDifficultyChange}
              onNewGame={handleNewGame}
              onHint={handleHint}
              onShowSolution={handleShowSolution}
              showSolution={showSolution}
            />
            <div className="hidden lg:block">
              <NumberPad onNumberSelect={handleNumberSelect} onClear={handleClear} />
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900">{t.play.howToPlay}</h3>
          <ul className="space-y-2 text-gray-700">
            <li>{t.play.instruction1}</li>
            <li>{t.play.instruction2}</li>
            <li>{t.play.instruction3}</li>
            <li>{t.play.instruction4}</li>
            <li>{t.play.instruction5}</li>
          </ul>
        </div>
        
        {/* 底部广告位 */}
        {process.env.NODE_ENV === 'production' && <AdSenseBanner position="bottom" />}
      </div>
    </div>
  );
}
