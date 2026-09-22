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
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="group/spotlight relative">
      <Spotlight />

      <div className="mx-auto min-h-screen max-w-3xl px-6 py-16 md:px-8 lg:py-24">
        <Link
          href="/blog"
          className="text-sm font-medium text-slate-400 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
        >
          ← 返回分享
        </Link>

        <header className="mt-10 border-b border-slate-800 pb-8">
          <time
            dateTime={post.date}
            className="text-xs font-semibold uppercase tracking-widest text-slate-500"
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

        <article className="post-body mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />

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
