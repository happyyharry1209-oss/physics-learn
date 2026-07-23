import Link from 'next/link';
import { LEVELS } from '@/types/content';
import type { Level } from '@/types/content';

const levels: Level[] = ['junior', 'senior', 'university'];

const bgGradient: Record<string, string> = {
  green: 'from-green-500/10 to-emerald-500/5 dark:from-green-500/20 dark:to-emerald-500/10',
  blue: 'from-blue-500/10 to-indigo-500/5 dark:from-blue-500/20 dark:to-indigo-500/10',
  purple: 'from-purple-500/10 to-violet-500/5 dark:from-purple-500/20 dark:to-violet-500/10',
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="flex flex-col items-center px-4 py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
          ⚛ <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">學物理</span>
        </h1>
        <p className="mb-8 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
          從初中到大學，系統化學習物理知識。<br />
          含互動測驗、公式圖表、全文搜尋。
        </p>
        <Link
          href="/junior"
          className="rounded-xl bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          開始學習 →
        </Link>
      </section>

      {/* Level Cards */}
      <section className="mx-auto grid max-w-5xl gap-6 px-4 pb-20 sm:grid-cols-3">
        {levels.map((key) => {
          const level = LEVELS[key];
          return (
            <Link
              key={key}
              href={`/${key}`}
              className={`group flex flex-col rounded-2xl border border-zinc-200 bg-gradient-to-b p-6 transition-all hover:shadow-lg hover:-translate-y-1 dark:border-zinc-800 ${bgGradient[level.color]}`}
            >
              <div className="mb-3">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg ${
                  key === 'junior' ? 'bg-green-100 dark:bg-green-900/50' :
                  key === 'senior' ? 'bg-blue-100 dark:bg-blue-900/50' :
                  'bg-purple-100 dark:bg-purple-900/50'
                }`}>
                  {key === 'junior' ? '📘' : key === 'senior' ? '📙' : '📕'}
                </span>
              </div>
              <h2 className="mb-1 text-xl font-bold text-zinc-900 dark:text-white">
                {level.label}
              </h2>
              <p className="mb-1 text-xs font-medium text-zinc-500">
                {level.labelEn}
              </p>
              <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {level.description}
              </p>
              <div className="mt-auto flex items-center gap-2">
                <span className="text-sm font-medium text-blue-600 group-hover:text-blue-500 dark:text-blue-400">
                  開始學習
                </span>
                <span className="text-xs text-zinc-400">
                  {level.chapterCount} 章
                </span>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
