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
    <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
      <header className="max-w-[880px] border-b border-slate-800/80 pb-11 pt-14 sm:pb-14 sm:pt-20 lg:pt-24">
        <p className="text-xs font-medium uppercase tracking-[0.19em] text-teal-300/85">ZHANGWEX / FIELD NOTES</p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-slate-100 sm:text-5xl">
          研究与写作<span className="text-teal-300">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
          记录工程技术、人工智能与个人研究中的认识和思考。
          用可核查的依据理解问题，也用图文记录探索的过程。
        </p>
      </header>

      <div className="pt-11 sm:pt-14"><BlogExplorer posts={posts} /></div>
    </div>
  );
}
