import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * 文章读取层。只跑在构建期（Node 环境），产物是纯静态 HTML，
 * 所以 output: 'export' 完全兼容——没有任何运行时的文件系统访问。
 */

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
};

export type Post = PostMeta & { html: string };

marked.setOptions({ gfm: true, breaks: false });

/** frontmatter 里的日期可能被 YAML 解析成 Date，统一成 YYYY-MM-DD。 */
function normalizeDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === 'string' && value.trim()) {
    return value.trim().replace(/[/.]/g, '-');
  }
  return '';
}

function listFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter(name => /\.md$/i.test(name));
}

function parseFile(fileName: string): Post {
  const slug = fileName.replace(/\.md$/i, '');
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), 'utf8');
  const { data, content } = matter(raw);

  return {
    slug,
    title: typeof data.title === 'string' && data.title.trim() ? data.title.trim() : slug,
    date: normalizeDate(data.date),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: typeof data.summary === 'string' ? data.summary.trim() : '',
    html: marked.parse(content) as string,
  };
}

/** 全部文章，按日期倒序（同日按文件名倒序，保证顺序稳定）。 */
export function getAllPosts(): Post[] {
  return listFiles()
    .map(parseFile)
    .sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : a.date < b.date ? 1 : -1));
}

/** 列表页只需要元信息，不必渲染正文。 */
export function getAllPostMetas(): PostMeta[] {
  return getAllPosts().map(({ html: _html, ...meta }) => meta);
}

export function getPost(slug: string): Post | null {
  // 挡掉路径穿越：slug 只能是文件名允许的字符
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(slug) || slug.includes('..')) return null;

  const fileName = `${slug}.md`;
  const target = path.join(POSTS_DIR, fileName);
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) return null;

  return parseFile(fileName);
}

/** 2026-09-21 → 2026 年 9 月 21 日 */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return iso;
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`;
}
