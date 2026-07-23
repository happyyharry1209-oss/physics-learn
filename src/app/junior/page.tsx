import Link from 'next/link';
import { LEVELS } from '@/types/content';
import { getAllChapters } from '@/lib/content';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';

export default function JuniorPage() {
  const chapters = getAllChapters('junior');
  const level = LEVELS.junior;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <Badge level="junior" />
          <span className="text-xs text-zinc-400">{level.labelEn}</span>
        </div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{level.label}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{level.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {chapters.map((chapter) => (
          <Card
            key={chapter.slug}
            title={`${chapter.frontmatter.order}. ${chapter.frontmatter.title}`}
            description={chapter.frontmatter.description}
            href={`/junior/${chapter.slug}`}
            metadata={`${chapter.frontmatter.topics?.length || 0} 個概念`}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          ← 回首頁
        </Link>
      </div>
    </div>
  );
}
