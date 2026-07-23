import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

function headingId(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\$(.+?)\$/g, '')
    .replace(/[^a-z0-9一-鿿]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

const components: Components = {
  h2: ({ children, ...props }) => {
    const text = extractText(children);
    const id = headingId(text);
    return (
      <h2 id={id} className="mt-8 mb-4 scroll-mt-20 text-xl font-bold text-zinc-900 dark:text-white" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const text = extractText(children);
    const id = headingId(text);
    return (
      <h3 id={id} className="mt-6 mb-3 scroll-mt-20 text-lg font-semibold text-zinc-800 dark:text-zinc-200" {...props}>
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="mb-4 space-y-1.5 pl-5" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-4 space-y-1.5 pl-5" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-zinc-900 dark:text-white" {...props}>
      {children}
    </strong>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="my-4 border-l-4 border-blue-400 bg-blue-50 py-2 pl-4 text-sm text-zinc-700 dark:border-blue-600 dark:bg-blue-950/30 dark:text-zinc-300" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => {
    const isInline = !props.node?.properties?.className;
    if (isInline) {
      return (
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200" {...props}>
          {children}
        </code>
      );
    }
    return (
      <pre className="my-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100 dark:bg-zinc-800">
        <code {...props}>{children}</code>
      </pre>
    );
  },
  hr: (props) => <hr className="my-8 border-zinc-200 dark:border-zinc-800" {...props} />,
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-500 dark:text-blue-400 dark:decoration-blue-700"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  table: ({ children, ...props }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full divide-y divide-zinc-200 text-sm dark:divide-zinc-700" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th className="bg-zinc-50 px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400" {...props}>
      {children}
    </td>
  ),
};

function extractText(children: React.ReactNode): string {
  let text = '';
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string') text += child;
    else if (typeof child === 'number') text += String(child);
    else if (child && typeof child === 'object' && 'props' in child) {
      text += extractText((child as any).props.children);
    }
  });
  return text;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[[rehypeKatex, { strict: false, throwOnError: false }]]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
