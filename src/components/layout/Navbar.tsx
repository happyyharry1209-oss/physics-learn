'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import type { Level } from '@/types/content';
import { LEVELS } from '@/types/content';
import ThemeToggle from './ThemeToggle';

const levels: Level[] = ['junior', 'senior', 'university'];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) => {
    const active = isActive(path);
    return [
      'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
      active
        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm'
        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white',
    ].join(' ');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200/70 bg-white/90 backdrop-blur-lg dark:border-zinc-800/70 dark:bg-black/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-sm text-white shadow-sm transition-transform group-hover:scale-105">
            ⚛
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
            學物理
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 md:flex">
          {levels.map((level) => (
            <Link key={level} href={`/${level}`} className={linkClass(`/${level}`)}>
              {LEVELS[level].label}
            </Link>
          ))}
          <Link href="/quiz" className={linkClass('/quiz')}>
            📝 測驗
          </Link>
          <div className="mx-1.5 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />
          <Link
            href="/search"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="搜尋"
          >
            🔍
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile right */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-base text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            aria-label="選單"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="animate-fadeIn border-t border-zinc-200 bg-white px-4 pb-4 pt-2 dark:border-zinc-800 dark:bg-black md:hidden">
          <div className="flex flex-col gap-1">
            {levels.map((level) => (
              <Link
                key={level}
                href={`/${level}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive(`/${level}`)
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                {LEVELS[level].label}
              </Link>
            ))}
            <Link
              href="/quiz"
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                isActive('/quiz')
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              📝 測驗中心
            </Link>
            <Link
              href="/search"
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                isActive('/search')
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
              }`}
            >
              🔍 搜尋
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
