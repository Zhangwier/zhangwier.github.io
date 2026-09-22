import type { Metadata } from 'next';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { formatDate, getAllPostMetas } from '@/lib/posts';
import Spotlight from '@/components/Spotlight';

export const metadata: Metadata = {
  title: `分享 · ${profile.name}`,
  description: '技术笔记、方法梳理与踩坑记录。',
};

export default function BlogIndexPage() {
  const posts = getAllPostMetas();

  return (
    <div className="group/spotlight relative">
      <Spotlight />

      <div className="mx-auto min-h-screen max-w-3xl px-6 py-16 md:px-8 lg:py-24">
        <Link
          href="/"
          className="text-sm font-medium text-slate-400 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
        >
          ← 返回首页
        </Link>

        <header className="mt-10">
          <h1 className="text-2xl font-medium tracking-tight text-slate-200 sm:text-3xl">分享</h1>
          <p className="mt-3 max-w-xl text-sm leading-normal">
            技术笔记、方法梳理与踩坑记录。按时间倒序排列。
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-16 text-sm">还没有文章。</p>
        ) : (
          <ul className="mt-14 space-y-14">
            {posts.map(post => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <time
                    dateTime={post.date}
                    className="text-xs font-semibold uppercase tracking-widest text-slate-500"
                  >
                    {formatDate(post.date)}
                  </time>

                  <h2 className="mt-2 text-lg font-medium leading-snug text-slate-200 transition-colors group-hover:text-teal-300">
                    {post.title}
                  </h2>

                  {post.summary && (
                    <p className="mt-3 text-sm leading-normal">{post.summary}</p>
                  )}

                  {post.tags.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
