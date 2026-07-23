'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Fuse from 'fuse.js';
import searchIndex from '@/data/search-index.json';
import Badge from '@/components/ui/Badge';
import SearchBar from '@/components/search/SearchBar';
import type { Level } from '@/types/content';

interface SearchIndexItem {
  slug: string;
  title: string;
  description: string;
  level: string;
  content: string;
}

interface SearchResultsInnerProps {
  query: string;
}

export default function SearchResultsInner({ query }: SearchResultsInnerProps) {
  const [results, setResults] = useState<SearchIndexItem[]>([]);
  const [fuse, setFuse] = useState<Fuse<SearchIndexItem> | null>(null);

  useEffect(() => {
    const fuseInstance = new Fuse(searchIndex as SearchIndexItem[], {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'content', weight: 0.2 },
      ],
      threshold: 0.4,
      includeScore: true,
      minMatchCharLength: 1,
    });
    setFuse(fuseInstance);
  }, []);

  useEffect(() => {
    if (!fuse || !query.trim()) {
      setResults([]);
      return;
    }
    const res = fuse.search(query, { limit: 20 });
    setResults(res.map((r) => r.item));
  }, [fuse, query]);

  if (!query.trim()) {
    return (
      <div className="py-16 text-center text-zinc-500">
        <p className="text-4xl mb-3">🔍</p>
        <p>輸入關鍵字開始搜尋</p>
        <p className="mt-1 text-sm">例如：牛頓、量子力學、E=mc²</p>
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
