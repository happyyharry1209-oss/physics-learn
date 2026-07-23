'use client';

import 'katex/dist/katex.min.css';
import katex from 'katex';

interface MathFormulaProps {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

export default function MathFormula({ formula, displayMode = false, className = '' }: MathFormulaProps) {
  try {
    const html = katex.renderToString(formula, {
      displayMode,
      throwOnError: false,
      output: 'html',
    });

    return (
      <span
        className={`${displayMode ? 'block my-4 text-center' : 'inline'} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return <span className="text-red-500 text-sm">公式錯誤: {formula}</span>;
  }
}
