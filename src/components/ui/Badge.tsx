import type { Level } from '@/types/content';
import { LEVELS } from '@/types/content';

interface BadgeProps {
  level: Level;
  className?: string;
}

const colorMap: Record<string, string> = {
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  purple: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
};

export default function Badge({ level, className = '' }: BadgeProps) {
  const meta = LEVELS[level];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        colorMap[meta.color] || colorMap.green
      } ${className}`}
    >
      {meta.label}
    </span>
  );
}
