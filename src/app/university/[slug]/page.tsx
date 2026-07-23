import { notFound } from 'next/navigation';
import { getChapterSlugs, getChapterBySlug, getAllChapters } from '@/lib/content';
import { getQuizData } from '@/lib/quiz';
import ChapterPage from '@/components/content/ChapterPage';

export function generateStaticParams() {
  const slugs = getChapterSlugs('university');
  return slugs.map((slug) => ({ slug }));
}

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ChapterPageWrapper level="university" paramsPromise={params} />;
}

async function ChapterPageWrapper({ level, paramsPromise }: { level: 'university'; paramsPromise: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise;
  const chapter = getChapterBySlug(level, slug);
  if (!chapter) notFound();

  const quizData = getQuizData(level, slug);
  const chapters = getAllChapters(level);

  return (
    <ChapterPage
      level={level}
      chapter={chapter}
      chapters={chapters}
      quizData={quizData}
    />
  );
}
