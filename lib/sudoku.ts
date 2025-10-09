export type Difficulty = 'easy' | 'medium' | 'hard';

export interface SudokuCell {
  value: number;
  isFixed: boolean;
  isError: boolean;
}

export type SudokuGrid = SudokuCell[][];

const GRID_SIZE = 9;
const BOX_SIZE = 3;

function isValid(grid: number[][], row: number, col: number, num: number): boolean {
  for (let x = 0; x < GRID_SIZE; x++) {
    if (grid[row][x] === num || grid[x][col] === num) {
      return false;
    }
  }

  const startRow = row - (row % BOX_SIZE);
  const startCol = col - (col % BOX_SIZE);

  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      if (grid[i + startRow][j + startCol] === num) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku(grid: number[][]): boolean {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) {
        for (let num = 1; num <= GRID_SIZE; num++) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;

            if (solveSudoku(grid)) {
              return true;
            }

            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateFullGrid(): number[][] {
  const grid: number[][] = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(0));

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < GRID_SIZE; i += BOX_SIZE) {
    const shuffled = [...numbers].sort(() => Math.random() - 0.5);
    let idx = 0;
    for (let row = i; row < i + BOX_SIZE; row++) {
      for (let col = i; col < i + BOX_SIZE; col++) {
        grid[row][col] = shuffled[idx++];
      }
    }
  }

  solveSudoku(grid);
  return grid;
}

function removeNumbers(grid: number[][], difficulty: Difficulty): number[][] {
  const puzzle = grid.map(row => [...row]);

  const cellsToRemove = {
    easy: 35,
    medium: 45,
    hard: 55
  }[difficulty];

  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * GRID_SIZE);
    const col = Math.floor(Math.random() * GRID_SIZE);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return puzzle;
}

export function generateSudoku(difficulty: Difficulty): SudokuGrid {
  const fullGrid = generateFullGrid();
  const puzzleGrid = removeNumbers(fullGrid, difficulty);

  return puzzleGrid.map(row =>
    row.map(value => ({
      value,
      isFixed: value !== 0,
      isError: false
    }))
  );
}

export function validateMove(grid: SudokuGrid, row: number, col: number): boolean {
  const value = grid[row][col].value;
  if (value === 0) return true;

  for (let x = 0; x < GRID_SIZE; x++) {
    if (x !== col && grid[row][x].value === value) {
      return false;
    }
    if (x !== row && grid[x][col].value === value) {
      return false;
    }
  }

  const startRow = row - (row % BOX_SIZE);
  const startCol = col - (col % BOX_SIZE);

  for (let i = 0; i < BOX_SIZE; i++) {
    for (let j = 0; j < BOX_SIZE; j++) {
      const r = i + startRow;
      const c = j + startCol;
      if ((r !== row || c !== col) && grid[r][c].value === value) {
        return false;
      }
    }
  }

  return true;
}

export function checkComplete(grid: SudokuGrid): boolean {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col].value === 0 || grid[row][col].isError) {
        return false;
      }
    }
  }
  return true;
}

export function generateDailyPuzzle(date: Date, difficulty: Difficulty): SudokuGrid {
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();

  const seededRandom = (function() {
    let state = seed;
    return function() {
      state = (state * 1664525 + 1013904223) % 4294967296;
      return state / 4294967296;
    };
  })();

  const originalRandom = Math.random;
  Math.random = seededRandom;
  const puzzle = generateSudoku(difficulty);
  Math.random = originalRandom;

  return puzzle;
}
