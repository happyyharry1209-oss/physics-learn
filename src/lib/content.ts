import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { ChapterFrontmatter, ChapterData, Level } from '@/types/content';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

export function getChapterSlugs(level: Level): string[] {
  const dir = path.join(DATA_DIR, level);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  return files.map((f) => f.replace(/\.md$/, ''));
}

export function getChapterBySlug(level: Level, slug: string): ChapterData | null {
  try {
    const filePath = path.join(DATA_DIR, level, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    const source = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(source);
    return {
      slug,
      frontmatter: data as ChapterFrontmatter,
      content,
    };
  } catch {
    return null;
  }
}

export function getAllChapters(level: Level): ChapterData[] {
  const slugs = getChapterSlugs(level);
  return slugs
    .map((slug) => getChapterBySlug(level, slug))
    .filter((c): c is ChapterData => c !== null)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getAllContentForSearch(): { slug: string; title: string; content: string; level: Level; description: string }[] {
  const levels: Level[] = ['junior', 'senior', 'university'];
  const results: { slug: string; title: string; content: string; level: Level; description: string }[] = [];

  for (const level of levels) {
    const chapters = getAllChapters(level);
    for (const chapter of chapters) {
      results.push({
        slug: chapter.slug,
        title: chapter.frontmatter.title,
        content: chapter.content,
        level,
        description: chapter.frontmatter.description,
      });
    }
  }
  return results;
}
