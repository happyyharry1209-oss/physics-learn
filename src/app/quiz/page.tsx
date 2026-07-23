'use client';

import { useState, useMemo } from 'react';
import type { Level } from '@/types/content';
import type { QuizData, QuizQuestion } from '@/types/quiz';
import Quiz from '@/components/content/Quiz';

interface ChapterInfo {
  slug: string;
  title: string;
}

const LEVEL_LABELS: Record<Level, string> = {
  junior: '📘 初中物理',
  senior: '📙 高中物理',
  university: '📕 大學物理',
};

const CHAPTERS: Record<Level, ChapterInfo[]> = {
  junior: [
    { slug: '01-mechanics', title: '力學基礎' },
    { slug: '02-sound', title: '聲學' },
    { slug: '03-optics', title: '光學' },
    { slug: '04-thermal', title: '熱學' },
    { slug: '05-electricity', title: '電學' },
    { slug: '06-magnetism', title: '磁學' },
  ],
  senior: [
    { slug: '01-kinematics', title: '運動學' },
    { slug: '02-dynamics', title: '動力學' },
    { slug: '03-energy', title: '能量與功' },
    { slug: '04-momentum', title: '動量' },
    { slug: '05-circular-gravity', title: '圓周運動與重力' },
    { slug: '06-electrostatics', title: '靜電學' },
    { slug: '07-circuits', title: '電路' },
    { slug: '08-magnetism-induction', title: '磁感應' },
    { slug: '09-waves-optics', title: '波動光學' },
    { slug: '10-modern-physics', title: '近代物理' },
  ],
  university: [
    { slug: '01-classical-mechanics', title: '古典力學' },
    { slug: '02-electromagnetism', title: '電磁學' },
    { slug: '03-thermodynamics', title: '熱力學' },
    { slug: '04-quantum-mechanics', title: '量子力學' },
    { slug: '05-relativity', title: '相對論' },
    { slug: '06-atomic-nuclear', title: '原子核物理' },
    { slug: '07-solid-state', title: '固態物理' },
    { slug: '08-particle-physics', title: '粒子物理' },
  ],
};

const TABS: Level[] = ['junior', 'senior', 'university'];

export default function QuizCenterPage() {
  const [level, setLevel] = useState<Level>('junior');
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [loading, setLoading] = useState(false);
  const [externalQuiz, setExternalQuiz] = useState<QuizQuestion[] | null>(null);
  const [importName, setImportName] = useState('');

  const chapters = CHAPTERS[level];

  const loadQuiz = async (slug: string) => {
    setSelectedChapter(slug);
    setExternalQuiz(null);
    setLoading(true);
    try {
      const chapter = chapters.find((c) => c.slug === slug);
      const res = await fetch(`/quiz-data/${level}/${slug}.json`);
      if (res.ok) {
        const data: QuizData = await res.json();
        setQuizData(data);
      } else {
        setQuizData(null);
      }
    } catch {
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.questions) {
          setExternalQuiz(data.questions);
          setImportName(data.title || file.name.replace(/\.json$/, ''));
        } else if (Array.isArray(data)) {
          setExternalQuiz(data);
          setImportName(file.name.replace(/\.json$/, ''));
        }
        setSelectedChapter(null);
        setQuizData(null);
      } catch {
        alert('題庫格式錯誤！請上傳包含 questions 陣列的 JSON 檔案。');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const quizTitle = useMemo(() => {
    if (externalQuiz) return `📦 ${importName}`;
    if (quizData) return quizData.title;
    return '';
  }, [externalQuiz, importName, quizData]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">📝 測驗中心</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          選擇章節進行測驗，或匯入外部題庫練習。
        </p>
      </div>

      {/* Level tabs */}
      <div className="mb-6 flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => { setLevel(tab); setSelectedChapter(null); setQuizData(null); }}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
              level === tab
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
            }`}
          >
            {LEVEL_LABELS[tab]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Chapter list */}
        <div className="lg:w-72 shrink-0">
          <div className="sticky top-20 space-y-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">章節列表</p>
            {chapters.map((ch) => (
              <button
                key={ch.slug}
                onClick={() => loadQuiz(ch.slug)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                  selectedChapter === ch.slug
                    ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-950/30 dark:text-blue-400'
                    : 'text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-800'
                }`}
              >
                {ch.title}
              </button>
            ))}
            {/* Import */}
            <div className="border-t border-zinc-200 pt-4 mt-4 dark:border-zinc-700">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">匯入題庫</p>
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-zinc-300 px-3 py-2.5 text-sm text-zinc-500 transition-colors hover:border-blue-400 hover:text-blue-500 dark:border-zinc-600 dark:hover:border-blue-500">
                📂 選擇 JSON 檔案
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>
              <p className="mt-1 text-[10px] text-zinc-400">
                格式：{'{'} title, questions: [{'{'} id, type, question, options?, answer, explanation {'}'}] {'}'}
              </p>
            </div>
          </div>
        </div>

        {/* Quiz area */}
        <div className="flex-1 min-w-0">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="text-sm text-zinc-500 animate-pulse">載入中⋯</div>
            </div>
          )}

          {!loading && quizData && <Quiz questions={quizData.questions} title={quizTitle} />}
          {!loading && externalQuiz && <Quiz questions={externalQuiz} title={quizTitle} />}

          {!loading && !quizData && !externalQuiz && selectedChapter && (
            <div className="rounded-xl border border-zinc-200 p-8 text-center dark:border-zinc-700">
              <p className="text-zinc-500">此章節暫無題庫</p>
            </div>
          )}

          {!loading && !quizData && !externalQuiz && !selectedChapter && (
            <div className="rounded-xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-600">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-zinc-500 dark:text-zinc-400">
                請從左側選擇一個章節，或匯入外部題庫開始測驗
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
