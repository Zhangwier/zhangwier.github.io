'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { PostMeta, PostCategory } from '@/lib/posts';

const categories = ['全部', '人工智能', '工程造价', '技术实践', '观点与思考'] as const;
type SelectedCategory = (typeof categories)[number];

const categoryEnglish: Record<PostCategory, string> = {
  人工智能: 'ARTIFICIAL INTELLIGENCE',
  工程造价: 'COST ENGINEERING',
  技术实践: 'TECHNICAL PRACTICE',
  观点与思考: 'IDEAS & PERSPECTIVES',
};

function displayDate(date: string) {
  return date.replace(/-/g, '.');
}

function ArticleCover({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <div className={featured
      ? 'relative flex min-h-[230px] items-center justify-center overflow-hidden border-t border-slate-700/50 bg-slate-950/80 p-5 lg:min-h-[350px] lg:border-l lg:border-t-0'
      : 'relative flex h-44 items-center justify-center overflow-hidden border-b border-slate-700/50 bg-slate-950/80 p-3'
    }>
      {post.cover ? (
        // Static, author-maintained illustrations served from the same GitHub Pages site.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.cover}
          alt={`《${post.title}》的主题示意图`}
          loading={featured ? 'eager' : 'lazy'}
          className="h-full max-h-[320px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
        />
      ) : (
        <span aria-hidden="true" className="font-mono text-6xl font-semibold tracking-[-0.1em] text-teal-300/30">
          ZW
        </span>
      )}
    </div>
  );
}

export default function BlogExplorer({ posts }: { posts: PostMeta[] }) {
  const [selected, setSelected] = useState<SelectedCategory>('全部');
  const [query, setQuery] = useState('');
  const featured = posts.find(post => post.featured) ?? posts[0];
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const isDefault = selected === '全部' && normalizedQuery.length === 0;

  const visiblePosts = useMemo(() => posts.filter(post => {
    const matchesCategory = selected === '全部' || post.category === selected;
    const haystack = [post.title, post.summary, post.category, ...post.tags].join(' ').toLocaleLowerCase();
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  }), [posts, selected, normalizedQuery]);

  const archivePosts = isDefault && featured
    ? visiblePosts.filter(post => post.slug !== featured.slug)
    : visiblePosts;

  return (
    <>
      {isDefault && featured && (
        <section aria-labelledby="featured-heading" className="mb-20 sm:mb-24">
          <div className="mb-5 flex items-center gap-4">
            <h2 id="featured-heading" className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">精选阅读</h2>
            <div aria-hidden="true" className="h-px flex-1 bg-slate-800" />
            <span className="font-mono text-xs text-slate-400">FEATURED</span>
          </div>
          <Link
            href={`/blog/${featured.slug}/`}
            className="group grid overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-br from-slate-800/90 via-slate-900 to-slate-900 transition-all duration-300 hover:border-teal-300/50 hover:shadow-[0_18px_60px_-24px_rgba(45,212,191,0.15)] focus-visible:border-teal-300 motion-reduce:transition-none lg:grid-cols-[1.08fr_0.92fr]"
          >
            <div className="flex flex-col justify-between gap-10 p-6 sm:p-9 lg:p-11">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-teal-300/90">
                  {categoryEnglish[featured.category]} <span className="mx-1 text-slate-500">/</span> {featured.category}
                </p>
                <h3 className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-slate-100 transition-colors group-hover:text-teal-100 sm:text-3xl lg:text-[34px]">
                  {featured.title}
                </h3>
                {featured.summary && (
                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">{featured.summary}</p>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-slate-700/60 pt-5">
                <time dateTime={featured.date} className="font-mono text-xs text-slate-400">
                  {displayDate(featured.date)}
                </time>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-300">
                  阅读文章
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                </span>
              </div>
            </div>
            <ArticleCover post={featured} featured />
          </Link>
        </section>
      )}

      <section id="articles" aria-labelledby="archive-heading" className="scroll-mt-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-300">ARCHIVE</p>
            <h2 id="archive-heading" className="mt-3 text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
              {isDefault ? '更多文章' : '文章归档'}
            </h2>
          </div>
          <p className="pb-1 text-sm text-slate-400" aria-live="polite">
            {isDefault ? `共 ${posts.length} 篇，下面展示其余 ${archivePosts.length} 篇` : `找到 ${archivePosts.length} 篇文章`}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-y border-slate-800/80 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="按主题筛选" className="flex flex-wrap gap-2">
            {categories.map(category => {
              const active = selected === category;
              const count = category === '全部' ? posts.length : posts.filter(post => post.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelected(category)}
                  className={`inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-teal-300 motion-reduce:transition-none ${active
                    ? 'border-teal-300/50 bg-teal-300/10 text-teal-200'
                    : 'border-slate-700 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:text-slate-100'
                  }`}
                >
                  {category}
                  <span className={active ? 'font-mono text-teal-300/80' : 'font-mono text-slate-400'}>{count}</span>
                </button>
              );
            })}
          </div>

          <label className="relative block w-full shrink-0 lg:w-64">
            <span className="sr-only">搜索文章标题、摘要和标签</span>
            <svg className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="搜索文章…"
              className="min-h-10 w-full rounded-lg border border-slate-700 bg-slate-900/80 py-2 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-300 focus:outline-none"
            />
          </label>
        </div>

        {archivePosts.length > 0 ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2">
            {archivePosts.map(post => (
              <li key={post.slug} className="min-w-0">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-900 focus-visible:border-teal-300 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  <ArticleCover post={post} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-medium text-teal-300">{post.category}</span>
                      <time className="font-mono text-xs text-slate-400" dateTime={post.date}>{displayDate(post.date)}</time>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-relaxed text-slate-100 transition-colors group-hover:text-teal-200">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-400">{post.summary}</p>
                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-800 pt-4">
                      <span className="truncate text-xs text-slate-400">{post.tags.slice(0, 2).join(' / ')}</span>
                      <span aria-hidden="true" className="shrink-0 text-sm text-teal-300 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-12 text-center">
            <p className="text-base font-medium text-slate-200">没有找到匹配的文章</p>
            <p className="mt-2 text-sm text-slate-400">可以更换关键词，或返回全部文章。</p>
            <button
              type="button"
              onClick={() => { setSelected('全部'); setQuery(''); }}
              className="mt-5 rounded-lg border border-teal-300/50 px-4 py-2 text-sm font-medium text-teal-200 hover:bg-teal-300/10"
            >
              查看全部文章
            </button>
          </div>
        )}
      </section>
    </>
  );
}
