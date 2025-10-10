import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { LanguageProvider } from '@/components/language-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Play Free Sudoku Online | Sudoku Master',
  description: 'Enjoy free Sudoku puzzles with daily challenges. Play easy, medium, and hard Sudoku games online. Improve your logic and problem-solving skills.',
  keywords: 'sudoku, free sudoku, sudoku online, sudoku puzzles, daily sudoku, sudoku game, play sudoku, sudoku solver, sudoku tips, sudoku strategies',
  author: {
    name: 'Sudoku Master',
    url: 'https://www.playsudokunow.online',
  },
  openGraph: {
    title: 'Play Free Sudoku Online | Sudoku Master',
    description: 'Enjoy free Sudoku puzzles with daily challenges. Play easy, medium, and hard Sudoku games online. Improve your logic and problem-solving skills.',
    type: 'website',
    url: 'https://sudokumaster.com',
    siteName: 'Sudoku Master',
    images: [
      {
        url: 'https://sudokumaster.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sudoku Master - Play Free Sudoku Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Play Free Sudoku Online | Sudoku Master',
    description: 'Enjoy free Sudoku puzzles with daily challenges. Play easy, medium, and hard Sudoku games online. Improve your logic and problem-solving skills.',
    images: ['https://sudokumaster.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://sudokumaster.com',
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
        <LanguageProvider>
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
