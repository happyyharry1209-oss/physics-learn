import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import type { Level } from '@/types/content';

export interface SearchItem {
  slug: string;
  title: string;
  description: string;
  level: Level;
  content: string;
}

let fuseInstance: Fuse<SearchItem> | null = null;

const FUSE_OPTIONS: IFuseOptions<SearchItem> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'content', weight: 0.2 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 1,
};

export function initSearchIndex(items: SearchItem[]): void {
  fuseInstance = new Fuse(items, FUSE_OPTIONS);
}

export function search(query: string, limit = 20): SearchItem[] {
  if (!fuseInstance) return [];
  if (!query.trim()) return [];
  return fuseInstance.search(query, { limit }).map((r) => r.item);
}
