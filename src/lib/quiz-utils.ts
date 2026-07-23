import type { QuizQuestion, QuizResult } from '@/types/quiz';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function checkAnswer(question: QuizQuestion, answer: string | string[]): boolean {
  if (question.type === 'multiple' && Array.isArray(question.answer) && Array.isArray(answer)) {
    const correct = [...question.answer].sort();
    const user = [...answer].sort();
    return correct.length === user.length && correct.every((v, i) => v === user[i]);
  }
  if (question.type === 'fill') {
    return answer.toString().trim().toLowerCase() === question.answer.toString().trim().toLowerCase();
  }
  return answer === question.answer;
}

export function calculateScore(results: QuizResult[]): { score: number; total: number; percentage: number } {
  const total = results.length;
  const score = results.filter((r) => r.correct).length;
  return {
    score,
    total,
    percentage: total > 0 ? Math.round((score / total) * 100) : 0,
  };
}

export function getWrongAnswers(results: QuizResult[]): QuizResult[] {
  return results.filter((r) => !r.correct);
}
