import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Play Free Sudoku Online | Sudoku Master',
  description: 'Enjoy free Sudoku puzzles with daily challenges. Play easy, medium, and hard Sudoku games online. Improve your logic and problem-solving skills.',
  keywords: 'sudoku, free sudoku, sudoku online, sudoku puzzles, daily sudoku, sudoku game',
  openGraph: {
    title: 'Play Free Sudoku Online | Sudoku Master',
    description: 'Enjoy free Sudoku puzzles with daily challenges.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Navigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
