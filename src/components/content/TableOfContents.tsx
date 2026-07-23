'use client';

import { useEffect, useState, useMemo } from 'react';

interface Section {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  const sections = useMemo<Section[]>(() => {
    const lines = content.split('\n');
    const result: Section[] = [];
    for (const line of lines) {
      const h2Match = line.match(/^##\s+(.+)/);
      const h3Match = line.match(/^###\s+(.+)/);
      if (h2Match) {
        const title = h2Match[1].replace(/\*\*(.+?)\*\*/g, '$1').replace(/\$(.+?)\$/g, '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9一-鿿]+/g, '-').replace(/^-|-$/g, '');
        result.push({ id, title, level: 2 });
      } else if (h3Match) {
        const title = h3Match[1].replace(/\*\*(.+?)\*\*/g, '$1').replace(/\$(.+?)\$/g, '').trim();
        const id = title.toLowerCase().replace(/[^a-z0-9一-鿿]+/g, '-').replace(/^-|-$/g, '');
        result.push({ id, title, level: 3 });
      }
    }
    return result;
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <div className="sticky top-16 w-56 shrink-0 self-start pt-8 hidden 2xl:block">
      <div className="border-l-2 border-zinc-100 pl-4 dark:border-zinc-800">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
          本節導覽
        </p>
        <nav className="space-y-1">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block text-xs leading-relaxed transition-all duration-200 ${
                section.level === 3 ? 'pl-3' : ''
              } ${
                activeId === section.id
                  ? 'border-l-2 border-blue-500 -ml-[3px] pl-[9px] font-medium text-blue-600 dark:text-blue-400'
                  : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
