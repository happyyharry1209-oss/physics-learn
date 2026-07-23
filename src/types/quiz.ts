export type QuizType = 'single' | 'multiple' | 'fill';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  options?: string[];
  answer: string | string[];
  explanation: string;
  hint?: string;
}

export interface QuizData {
  chapterId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  questionId: string;
  userAnswer: string | string[];
  correct: boolean;
}
