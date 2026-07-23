'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { SearchItem } from '@/lib/search';
import { initSearchIndex, search } from '@/lib/search';
import Badge from '@/components/ui/Badge';
import type { Level } from '@/types/content';

interface SearchResultsProps {
  query: string;
  initialData: SearchItem[];
}

export default function SearchResults({ query, initialData }: SearchResultsProps) {
  const [results, setResults] = useState<SearchItem[]>([]);

  useEffect(() => {
    if (initialData.length > 0) {
      initSearchIndex(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const res = search(query);
    setResults(res);
  }, [query]);

  if (!query.trim()) {
    return (
      <div className="py-16 text-center text-zinc-500">
        <p className="text-4xl mb-3">🔍</p>
        <p>輸入關鍵字開始搜尋</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="py-16 text-center text-zinc-500">
        <p className="text-4xl mb-3">😕</p>
        <p>沒有找到「{query}」的相關結果</p>
        <p className="mt-1 text-sm">試試其他關鍵字</p>
      </div>
    );
  }

  function getExcerpt(content: string, query: string, maxLen = 150): string {
    const clean = content.replace(/[#*`\[\]]/g, '').replace(/\n+/g, ' ');
    const idx = clean.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return clean.slice(0, maxLen) + '...';
    const start = Math.max(0, idx - 60);
    const end = Math.min(clean.length, idx + query.length + 60);
    return (start > 0 ? '...' : '') + clean.slice(start, end) + (end < clean.length ? '...' : '');
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-500">
        找到 {results.length} 個關於「{query}」的結果
      </p>
      {results.map((item) => (
        <Link
          key={`${item.level}-${item.slug}`}
          href={`/${item.level}/${item.slug}`}
          className="block rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        >
          <div className="mb-1.5 flex items-center gap-2">
            <Badge level={item.level as Level} />
            <span className="text-sm font-medium text-zinc-900 dark:text-white">
              {item.title}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {getExcerpt(item.content, query)}
          </p>
        </Link>
      ))}
    </div>
  );
}
