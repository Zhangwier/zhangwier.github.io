'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { PostMeta } from '@/lib/posts';

const categories = ['全部', '人工智能', '工程造价', '技术实践', '观点与思考'] as const;
type CategoryFilter = (typeof categories)[number];
const shortDate = (date: string) => date.replace(/-/g, '.');

export default function BlogExplorer({ posts }: { posts: PostMeta[] }) {
  const [category, setCategory] = useState<CategoryFilter>('全部');
  const [keyword, setKeyword] = useState('');
  const query = keyword.trim().toLocaleLowerCase();
  const defaultView = category === '全部' && !query;
  const featured = posts.find(post => post.featured) ?? posts[0];

  const matches = useMemo(() => posts.filter(post => {
    if (category !== '全部' && post.category !== category) return false;
    const terms = [post.title, post.summary, post.category, ...post.tags].join(' ').toLocaleLowerCase();
    return !query || terms.includes(query);
  }), [posts, category, query]);

  const archive = defaultView && featured
    ? matches.filter(post => post.slug !== featured.slug)
    : matches;

  return (
    <div className="max-w-[880px]">
      {defaultView && featured && (
        <section aria-labelledby="featured-heading" className="pb-16 sm:pb-20">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 id="featured-heading" className="text-sm font-medium text-slate-200">精选阅读</h2>
            <span className="font-mono text-[11px] tracking-[0.15em] text-slate-500">FEATURED</span>
          </div>
          <Link href={`/blog/${featured.slug}/`}
            className="group flex items-center gap-4 border-y border-slate-700/80 py-7 transition-colors hover:border-teal-300/50 focus-visible:border-teal-300 sm:gap-9 sm:py-9">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-teal-300">
                {featured.category}
                <span className="mx-2 text-slate-600">/</span>
                <time dateTime={featured.date} className="font-mono text-slate-400">{shortDate(featured.date)}</time>
              </p>
              <h3 className="mt-4 text-xl font-semibold leading-snug text-slate-100 transition-colors group-hover:text-teal-200 sm:text-[26px]">
                {featured.title}
              </h3>
              {featured.summary && <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-400 sm:line-clamp-2">{featured.summary}</p>}
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal-300">
                阅读文章 <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
              </span>
            </div>
            {featured.cover && (
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-700/65 bg-slate-900/80 p-2 sm:h-44 sm:w-44 sm:p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.cover} alt="" loading="eager"
                  className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none" />
              </div>
            )}
          </Link>
        </section>
      )}

      <section id="articles" aria-labelledby="archive-heading" className="scroll-mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300/80">ARCHIVE</p>
            <h2 id="archive-heading" className="mt-2 text-xl font-semibold text-slate-100 sm:text-2xl">
              {defaultView ? '最新文章' : '文章归档'}
            </h2>
          </div>
          <p role="status" className="text-xs text-slate-400">
            {defaultView ? `共 ${posts.length} 篇` : `找到 ${archive.length} 篇`}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-b border-slate-800/90 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div role="group" aria-label="主题筛选" className="flex max-w-full gap-5 overflow-x-auto whitespace-nowrap">
            {categories.map(item => (
              <button key={item} type="button" aria-pressed={category === item}
                onClick={() => setCategory(item)}
                className={`-mb-px inline-flex min-h-10 shrink-0 items-center border-b-2 pb-2 text-sm transition-colors focus-visible:text-teal-200 ${category === item
                  ? 'border-teal-300 font-medium text-teal-200'
                  : 'border-transparent text-slate-400 hover:border-slate-600 hover:text-slate-200'}`}>
                {item}
              </button>
            ))}
          </div>
          <label className="relative block w-full sm:w-48 sm:shrink-0">
            <span className="sr-only">搜索文章</span>
            <svg aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5 5" />
            </svg>
            <input type="search" value={keyword} onChange={event => setKeyword(event.target.value)}
              placeholder="搜索文章"
              className="h-10 w-full rounded-md border border-slate-700/70 bg-slate-900/60 pl-9 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-teal-300 focus:outline-none" />
          </label>
        </div>

        {archive.length ? (
          <ol className="divide-y divide-slate-800/90">
            {archive.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}/`}
                  className="group -mx-3 grid gap-4 rounded-lg px-3 py-7 transition-colors hover:bg-slate-900/75 focus-visible:bg-slate-900/75 sm:grid-cols-[7rem_minmax(0,1fr)_1.25rem] sm:gap-6 sm:py-9">
                  <time dateTime={post.date} className="hidden pt-1.5 font-mono text-xs tabular-nums text-slate-500 sm:block">
                    {shortDate(post.date)}
                  </time>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-teal-300/90">
                      {post.category}
                      <span className="mx-2 text-slate-600 sm:hidden">·</span>
                      <time dateTime={post.date} className="font-mono text-slate-400 sm:hidden">{shortDate(post.date)}</time>
                    </p>
                    <h3 className="mt-2 text-lg font-semibold leading-relaxed text-slate-100 transition-colors group-hover:text-teal-200 sm:text-xl">
                      {post.title}
                    </h3>
                    {post.summary && <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-400">{post.summary}</p>}
                    <p className="mt-3 truncate text-xs text-slate-500">{post.tags.slice(0, 3).join(' / ')}</p>
                  </div>
                  <span aria-hidden="true" className="hidden pt-1 text-lg text-teal-300 transition-transform group-hover:translate-x-1 motion-reduce:transform-none sm:block">↗</span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="py-14 text-center">
            <p className="font-medium text-slate-200">没有找到匹配的文章</p>
            <p className="mt-2 text-sm text-slate-400">换个关键词试试，或者返回全部文章。</p>
            <button type="button" onClick={() => { setCategory('全部'); setKeyword(''); }}
              className="mt-5 rounded-lg border border-slate-700 px-4 py-2 text-sm text-teal-200 hover:border-teal-300">
              查看全部文章
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
