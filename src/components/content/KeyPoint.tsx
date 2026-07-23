interface KeyPointProps {
  points: string[];
  title?: string;
}

export default function KeyPoint({ points, title = '💡 重點整理' }: KeyPointProps) {
  return (
    <div className="my-6 rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-950/30">
      <h4 className="mb-3 text-sm font-semibold text-blue-800 dark:text-blue-300">{title}</h4>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            <span className="mt-0.5 shrink-0 text-blue-500">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
