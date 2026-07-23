interface ProgressProps {
  value: number;
  max: number;
  label?: string;
  size?: 'sm' | 'md';
}

export default function Progress({ value, max, label, size = 'md' }: ProgressProps) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex justify-between text-xs text-zinc-500">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 ${
          size === 'sm' ? 'h-1.5' : 'h-2.5'
        }`}
      >
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
