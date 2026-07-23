export type Level = 'junior' | 'senior' | 'university';

export interface ChapterFrontmatter {
  slug: string;
  title: string;
  description: string;
  order: number;
  topics: string[];
}

export interface ChapterData {
  slug: string;
  frontmatter: ChapterFrontmatter;
  content: string;
}

export interface LevelMeta {
  key: Level;
  label: string;
  labelEn: string;
  color: string;
  description: string;
  chapterCount: number;
}

export const LEVELS: Record<Level, LevelMeta> = {
  junior: {
    key: 'junior',
    label: '初中物理',
    labelEn: 'Junior High',
    color: 'green',
    description: '基礎物理概念建立，適合 13-15 歲學生',
    chapterCount: 6,
  },
  senior: {
    key: 'senior',
    label: '高中物理',
    labelEn: 'Senior High',
    color: 'blue',
    description: '系統性物理知識，適合 16-18 歲學生',
    chapterCount: 10,
  },
  university: {
    key: 'university',
    label: '大學物理',
    labelEn: 'University',
    color: 'purple',
    description: '進階物理理論，適合大學理工科系',
    chapterCount: 8,
  },
};
