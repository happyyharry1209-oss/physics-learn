'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored ? stored === 'dark' : prefersDark;
    setDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', dark);
    }
  }, [dark, mounted]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  if (!mounted) {
    return <div className="h-6 w-11 rounded-full bg-gray-300" />;
  }

  return (
    <button
      onClick={toggle}
      className="relative h-6 w-11 flex-shrink-0 rounded-full transition-colors duration-300 ease-in-out focus:outline-none"
      style={{ backgroundColor: dark ? '#374151' : '#d1d5db' }}
      aria-label={dark ? '切換為日間模式' : '切換為夜間模式'}
    >
      <span
        className="pointer-events-none absolute left-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs shadow-sm transition-all duration-300 ease-in-out"
        style={{ transform: dark ? 'translateX(20px)' : 'translateX(0)' }}
      >
        {dark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
