import Link from 'next/link';

interface CardProps {
  title: string;
  description: string;
  href: string;
  badge?: React.ReactNode;
  metadata?: string;
}

export default function Card({ title, description, href, badge, metadata }: CardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="mb-2 flex items-center gap-2">
        {badge}
        {metadata && (
          <span className="text-xs text-zinc-400">{metadata}</span>
        )}
      </div>
      <h3 className="mb-1.5 text-base font-semibold text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </Link>
  );
}
