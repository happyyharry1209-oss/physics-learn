'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ChapterFrontmatter, Level } from '@/types/content';
import { LEVELS } from '@/types/content';

interface SidebarProps {
  level: Level;
  chapters: { slug: string; frontmatter: ChapterFrontmatter }[];
}

export default function Sidebar({ level, chapters }: SidebarProps) {
  const pathname = usePathname();
  const levelMeta = LEVELS[level];

  return (
    <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-zinc-50/50 lg:block dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="sticky top-14 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 3.5rem)' }}>
        <div className="mb-4">
          <Link
            href={`/${level}`}
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            ← {levelMeta.label} 首頁
          </Link>
        </div>
        <nav className="space-y-1">
          {chapters.map((chapter) => {
            const isActive = pathname === `/${level}/${chapter.slug}`;
            return (
              <Link
                key={chapter.slug}
                href={`/${level}/${chapter.slug}`}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-zinc-200 font-medium text-zinc-900 dark:bg-zinc-700 dark:text-white'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white'
                }`}
              >
                <span className="mr-1.5 text-xs text-zinc-400">{chapter.frontmatter.order}.</span>
                {chapter.frontmatter.title}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
