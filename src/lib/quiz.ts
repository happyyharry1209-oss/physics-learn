import fs from 'fs';
import path from 'path';
import type { Level } from '@/types/content';
import type { QuizData } from '@/types/quiz';

const QUIZ_DIR = path.join(process.cwd(), 'src', 'quiz-data');

export function getQuizData(level: Level, chapterId: string): QuizData | null {
  try {
    const filePath = path.join(QUIZ_DIR, level, `${chapterId}.json`);
    if (!fs.existsSync(filePath)) return null;
    const source = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(source) as QuizData;
  } catch {
    return null;
  }
}
