'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import SearchBar from '@/components/search/SearchBar';
import SearchResultsInner from './SearchResultsInner';

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  return (
    <>
      <div className="mb-8">
        <SearchBar initialQuery={q} />
      </div>
      <SearchResultsInner query={q} />
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">🔍 搜尋物理知識</h1>
      <Suspense fallback={<div className="py-16 text-center text-zinc-500">載入中...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
