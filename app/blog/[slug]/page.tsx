import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { profile } from '@/data/profile';
import { formatDate, getAllPostMetas, getPost } from '@/lib/posts';
import Spotlight from '@/components/Spotlight';

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

  return (
    <div className="group/spotlight relative">
      <Spotlight />

      <div className="mx-auto min-h-screen max-w-3xl px-5 py-10 sm:px-6 sm:py-14 md:px-8 lg:py-24">
        <Link
          href="/blog"
          className="text-sm font-medium text-slate-400 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
        >
          ← 返回分享
        </Link>

        <header className="mt-8 border-b border-slate-800 pb-8 sm:mt-10">
          <time
            dateTime={post.date}
            className="text-xs font-semibold uppercase tracking-widest text-slate-400"
          >
            {formatDate(post.date)}
          </time>

          <h1 className="mt-3 text-2xl font-medium leading-snug tracking-tight text-slate-200 sm:text-3xl">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <li
                  key={tag}
                  className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.toc.length > 2 && (
          <div className="mt-8 sm:mt-10">
            <nav aria-label="本文目录" className="hidden rounded-lg border border-slate-800 bg-slate-800/25 p-5 sm:block">
              <p className="text-sm font-medium text-slate-200">本文目录</p>
              <ol className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {post.toc.map(({ id, title }, index) => (
                  <li key={id} className="min-w-0 text-sm leading-6">
                    <a href={`#${id}`} className="group inline-flex gap-2 text-slate-400 transition-colors hover:text-teal-300 focus-visible:text-teal-300">
                      <span className="shrink-0 font-mono text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                      <span>{title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <details className="rounded-lg border border-slate-700/70 bg-slate-800/30 p-4 sm:hidden">
              <summary className="cursor-pointer select-none text-sm font-medium text-slate-200">
                本文目录（点击展开）
              </summary>
              <nav aria-label="本文目录（移动端）" className="pt-3">
                <ol className="space-y-3 border-t border-slate-700/60 pt-3">
                  {post.toc.map(({ id, title }, index) => (
                    <li key={id}>
                      <a href={`#${id}`} className="flex gap-2 text-sm leading-6 text-slate-300 underline-offset-4 hover:text-teal-300 focus-visible:underline">
                        <span className="shrink-0 font-mono text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                        <span>{title}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </details>
          </div>
        )}

        <article className="post-body mt-8 sm:mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

        <footer className="mt-16 border-t border-slate-800 pt-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-400 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
          >
            ← 返回分享
          </Link>
        </footer>
      </div>
    </div>
  );
}
