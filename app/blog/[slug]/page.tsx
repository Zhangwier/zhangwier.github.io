import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { profile } from '@/data/profile';
import { formatDate, getAllPostMetas, getPost } from '@/lib/posts';

type Params = { slug: string };

// 静态导出需要预先列出所有文章路径
export function generateStaticParams(): Params[] {
  return getAllPostMetas().map(post => ({ slug: post.slug }));
}

// 关掉按需生成：export 模式下不允许运行时动态路由
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} · ${profile.name}`,
    description: post.summary || post.title,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary || post.title,
      url: `/blog/${post.slug}/`,
      siteName: profile.name,
      locale: 'zh_CN',
      images: [{ url: '/og-cover.png', width: 1200, height: 630 }],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPostMetas();
  const currentIndex = allPosts.findIndex(item => item.slug === post.slug);
  const nextPost = allPosts[currentIndex + 1] ?? allPosts.find(item => item.slug !== post.slug);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-8 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
      <div className="max-w-[740px]">
        <Link href="/blog/#articles"
          className="text-sm font-medium text-slate-400 transition-colors hover:text-teal-300 focus-visible:text-teal-300">
          ← 所有文章
        </Link>

        <header className="mt-9 border-b border-slate-800 pb-8 sm:mt-12 sm:pb-10">
          <p className="text-xs font-medium tracking-wide text-teal-300">{post.category}</p>
          <h1 className="mt-4 text-3xl font-semibold leading-snug tracking-tight text-slate-100 sm:text-[38px]">
            {post.title}
          </h1>
          {post.summary && (
            <p className="mt-5 text-base leading-8 text-slate-300">{post.summary}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            <time dateTime={post.date} className="font-mono text-xs text-slate-400">{formatDate(post.date)}</time>
            {post.tags.length > 0 && (
              <p className="text-xs text-slate-500">{post.tags.slice(0, 3).join(' / ')}</p>
            )}
          </div>
        </header>
      </div>

      <div className="mt-8 xl:grid xl:grid-cols-[minmax(0,740px)_minmax(0,240px)] xl:items-start xl:gap-12">
        <div className="min-w-0 max-w-[740px]">
          {post.toc.length > 2 && (
            <details className="mb-10 rounded-lg border border-slate-700/70 bg-slate-900/50 p-4 xl:hidden">
              <summary className="cursor-pointer select-none text-sm font-medium text-slate-200">
                本文目录 · 点击展开
              </summary>
              <nav aria-label="本文目录" className="mt-4 border-t border-slate-800 pt-3">
                <ol className="space-y-3">
                  {post.toc.map(({ id, title }, index) => (
                    <li key={id}>
                      <a href={`#${id}`}
                        className="flex gap-2 text-sm leading-6 text-slate-300 underline-offset-4 hover:text-teal-300 focus-visible:underline">
                        <span className="shrink-0 font-mono text-xs text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                        <span>{title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          )}

          <article className="post-body post-editorial" dangerouslySetInnerHTML={{ __html: post.html }} />

          <footer className="mt-20 border-t border-slate-800 pt-8">
            <p className="mb-5 text-xs font-semibold tracking-[0.16em] text-teal-300">继续阅读</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/blog/#articles"
                className="group flex min-h-24 flex-col justify-center rounded-lg border border-slate-800 p-5 transition-colors hover:border-slate-600 hover:bg-slate-900/60">
                <span className="text-xs text-slate-400">文章归档</span>
                <span className="mt-2 font-medium text-slate-100 group-hover:text-teal-200">返回所有文章 →</span>
              </Link>
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}/`}
                  className="group flex min-h-24 flex-col justify-center rounded-lg border border-slate-800 p-5 transition-colors hover:border-slate-600 hover:bg-slate-900/60">
                  <span className="text-xs text-slate-400">下一篇文章</span>
                  <span className="mt-2 line-clamp-2 font-medium leading-relaxed text-slate-100 group-hover:text-teal-200">{nextPost.title}</span>
                </Link>
              )}
            </div>
          </footer>
        </div>

        {post.toc.length > 2 && (
          <aside className="hidden min-w-0 xl:block">
            <nav aria-label="文章章节导航" className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto border-l border-slate-800 py-2 pl-5">
              <p className="mb-5 text-xs font-medium tracking-[0.12em] text-slate-300">本文目录</p>
              <ol className="space-y-4">
                {post.toc.map(({ id, title }, index) => (
                  <li key={id}>
                    <a href={`#${id}`}
                      className="flex gap-2 text-xs leading-5 text-slate-400 transition-colors hover:text-teal-200 focus-visible:text-teal-200">
                      <span className="shrink-0 font-mono text-slate-500">{String(index + 1).padStart(2, '0')}</span>
                      <span>{title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>
    </div>
  );
}
