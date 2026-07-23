'use client';

import { useState, useMemo } from 'react';
import type { QuizQuestion, QuizResult } from '@/types/quiz';
import { checkAnswer, shuffleArray, calculateScore } from '@/lib/quiz-utils';

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
}

export default function Quiz({ questions, title = '📝 隨堂測驗' }: QuizProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<Record<string, string[]>>({});

  const results: QuizResult[] = useMemo(() => {
    return questions.map((q) => ({
      questionId: q.id,
      userAnswer: answers[q.id] || '',
      correct: checkAnswer(q, answers[q.id] || ''),
    }));
  }, [questions, answers]);

  const score = useMemo(() => calculateScore(results), [results]);

  const question = questions[current];

  const handleOptionClick = (option: string) => {
    if (submitted[question.id]) return;

    if (question.type === 'single') {
      setAnswers((prev) => ({ ...prev, [question.id]: option }));
    } else if (question.type === 'multiple') {
      const currentAnswers = (answers[question.id] as string[]) || [];
      const updated = currentAnswers.includes(option)
        ? currentAnswers.filter((a) => a !== option)
        : [...currentAnswers, option];
      setAnswers((prev) => ({ ...prev, [question.id]: updated }));
    }
  };

  const handleFillChange = (value: string) => {
    if (submitted[question.id]) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const handleSubmit = () => {
    if (!answers[question.id] || (Array.isArray(answers[question.id]) && (answers[question.id] as string[]).length === 0)) return;
    setSubmitted((prev) => ({ ...prev, [question.id]: true }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResults(true);
    }
  };

  // Initialize shuffled options
  useMemo(() => {
    const opts: Record<string, string[]> = {};
    questions.forEach((q) => {
      if (q.options) opts[q.id] = shuffleArray(q.options);
    });
    setShuffledOptions(opts);
  }, [questions]);

  if (showResults) {
    const correctCount = results.filter((r) => r.correct).length;
    return (
      <div className="my-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h4 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">📊 測驗結果</h4>
        <div className="mb-6 text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
            {score.percentage}%
          </div>
          <div className="text-sm text-zinc-500">
            答對 {correctCount} / {questions.length} 題
          </div>
        </div>
        <div className="space-y-4">
          {questions.map((q, i) => {
            const res = results.find((r) => r.questionId === q.id);
            return (
              <div
                key={q.id}
                className={`rounded-lg border p-4 ${
                  res?.correct
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20'
                    : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'
                }`}
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {i + 1}. {q.question}
                  </p>
                  <span className={`shrink-0 text-sm font-bold ${res?.correct ? 'text-green-600' : 'text-red-500'}`}>
                    {res?.correct ? '✓' : '✗'}
                  </span>
                </div>
                <div className="mb-2 text-xs text-zinc-500">
                  你的答案：{Array.isArray(answers[q.id]) ? (answers[q.id] as string[]).join('、') : answers[q.id] || '未作答'}
                </div>
                {!res?.correct && (
                  <div className="text-xs text-green-600 dark:text-green-400">
                    正確答案：{Array.isArray(q.answer) ? q.answer.join('、') : q.answer}
                  </div>
                )}
                <p className="mt-2 text-xs text-zinc-500">{q.explanation}</p>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            setCurrent(0);
            setAnswers({});
            setSubmitted({});
            setShowResults(false);
          }}
          className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          重新測驗
        </button>
      </div>
    );
  }

  if (!question) return null;

  const isAnswered = !!answers[question.id] && (Array.isArray(answers[question.id]) ? (answers[question.id] as string[]).length > 0 : true);
  const isSubmitted = submitted[question.id];
  const options = shuffledOptions[question.id] || question.options || [];

  return (
    <div className="my-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <h4 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-white">{title}</h4>
      <div className="mb-4 text-xs text-zinc-500">
        第 {current + 1} / {questions.length} 題
      </div>

      <p className="mb-4 text-sm font-medium text-zinc-900 dark:text-white">
        {question.question}
      </p>

      {question.type === 'fill' ? (
        <input
          type="text"
          value={(answers[question.id] as string) || ''}
          onChange={(e) => handleFillChange(e.target.value)}
          disabled={isSubmitted}
          placeholder="輸入你的答案..."
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-zinc-500"
        />
      ) : (
        <div className="space-y-2">
          {options.map((option, i) => {
            const isSelected = question.type === 'single'
              ? answers[question.id] === option
              : (answers[question.id] as string[])?.includes(option);

            const isCorrectOption = isSubmitted && (
              Array.isArray(question.answer) ? question.answer.includes(option) : question.answer === option
            );

            let borderColor = 'border-zinc-200 dark:border-zinc-700';
            if (isSubmitted && isCorrectOption) borderColor = 'border-green-400 dark:border-green-500';
            else if (isSubmitted && isSelected && !isCorrectOption) borderColor = 'border-red-400 dark:border-red-500';

            return (
              <button
                key={i}
                onClick={() => handleOptionClick(option)}
                disabled={isSubmitted}
                className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all ${
                  isSelected
                    ? `${borderColor} bg-blue-50 dark:bg-blue-950/30`
                    : `${borderColor} hover:bg-zinc-50 dark:hover:bg-zinc-800`
                } disabled:opacity-80`}
              >
                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-${
                  question.type === 'multiple' ? 'md' : 'full'
                } border text-xs ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-zinc-300 dark:border-zinc-600'
                }`}>
                  {question.type === 'multiple' ? (
                    isSelected ? '✓' : String.fromCharCode(65 + i)
                  ) : (
                    isSelected ? '●' : String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="text-zinc-700 dark:text-zinc-300">{option}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {current > 0 && (
            <button
              onClick={() => setCurrent(current - 1)}
              className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
            >
              上一題
            </button>
          )}
        </div>
        <div className="flex gap-2">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!isAnswered}
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              提交答案
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="rounded-lg bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {current < questions.length - 1 ? '下一題 →' : '查看結果'}
            </button>
          )}
        </div>
      </div>

      {isSubmitted && (
        <div className={`mt-4 rounded-lg p-3 text-sm ${
          results.find((r) => r.questionId === question.id)?.correct
            ? 'bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400'
            : 'bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
        }`}>
          <p className="mb-1 font-medium">
            {results.find((r) => r.questionId === question.id)?.correct ? '✓ 正確！' : '✗ 錯誤'}
          </p>
          <p className="text-xs opacity-80">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
