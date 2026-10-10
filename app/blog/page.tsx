import type { Metadata } from 'next';
import { profile } from '@/data/profile';
import { getAllPostMetas } from '@/lib/posts';
import BlogExplorer from '@/components/blog/BlogExplorer';

export const metadata: Metadata = {
  title: `研究与写作 · ${profile.name}`,
  description: '关于工程造价、人工智能与技术应用的观察、实践和学习记录。',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: `研究与写作 · ${profile.name}`,
    description: '工程造价实践、人工智能研究与个人思考。',
    type: 'website',
    url: '/blog/',
    images: [{ url: '/og-cover.png', width: 1200, height: 630 }],
  },
};

export default function BlogIndexPage() {
  const posts = getAllPostMetas();

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
      <header className="relative pb-12 pt-16 sm:pb-16 sm:pt-20 lg:pb-20 lg:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300/90">ZHANGWEX / FIELD NOTES</p>
        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-5xl lg:text-[60px]">
          研究与写作<span className="text-teal-300">.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          关于工程造价、人工智能与技术应用的观察、方法和学习记录。
          在这里整理专业实践，也记录值得继续思考的问题。
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
          <span className="font-mono text-teal-300">{String(posts.length).padStart(2, '0')} POSTS</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-600" />
          <span>独立阅读空间</span>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-slate-600" />
          <span>按主题与日期归档</span>
        </div>
      </header>

      <BlogExplorer posts={posts} />
    </div>
  );
}
