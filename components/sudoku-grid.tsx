'use client';

import { SudokuGrid, SudokuCell } from '@/lib/sudoku';

interface SudokuGridProps {
  grid: SudokuGrid;
  selectedCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
}

export function SudokuGridComponent({ grid, selectedCell, onCellClick }: SudokuGridProps) {
  const getCellClassName = (cell: SudokuCell, row: number, col: number) => {
    const baseClass = 'w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-semibold border border-gray-300 cursor-pointer transition-colors';

    let className = baseClass;

    if (cell.isFixed) {
      className += ' bg-gray-100 font-bold text-gray-900';
    } else {
      className += ' bg-white hover:bg-blue-50';
    }

    if (cell.isError) {
      className += ' text-red-600 bg-red-50';
    } else if (!cell.isFixed && cell.value !== 0) {
      className += ' text-blue-600';
    }

    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      className += ' ring-2 ring-blue-500 bg-blue-100';
    }

    if (col % 3 === 2 && col !== 8) {
      className += ' border-r-2 border-r-gray-800';
    }
    if (row % 3 === 2 && row !== 8) {
      className += ' border-b-2 border-b-gray-800';
    }

    return className;
  };

  return (
    <div className="inline-block bg-gray-800 p-1 rounded-lg shadow-2xl">
      <div className="grid grid-cols-9 gap-0">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={getCellClassName(cell, rowIndex, colIndex)}
              onClick={() => onCellClick(rowIndex, colIndex)}
              disabled={cell.isFixed}
            >
              {cell.value !== 0 ? cell.value : ''}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
