import MathFormula from './MathFormula';

interface FormulaCardProps {
  title: string;
  formula: string;
  description?: string;
  variables?: { symbol: string; meaning: string }[];
}

export default function FormulaCard({ title, formula, description, variables }: FormulaCardProps) {
  return (
    <div className="my-6 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
      <h4 className="mb-3 text-sm font-semibold text-amber-800 dark:text-amber-300">
        📐 {title}
      </h4>
      <div className="mb-3 flex justify-center">
        <MathFormula formula={formula} displayMode />
      </div>
      {description && (
        <p className="mb-3 text-sm text-zinc-700 dark:text-zinc-300">{description}</p>
      )}
      {variables && variables.length > 0 && (
        <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
          {variables.map((v) => (
            <div key={v.symbol} className="flex gap-2">
              <span className="min-w-[3rem] font-mono text-amber-700 dark:text-amber-400">
                <MathFormula formula={v.symbol} />
              </span>
              <span>：{v.meaning}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
