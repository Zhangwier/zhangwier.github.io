import type { Metadata } from 'next';
import { profile } from '@/data/profile';
import { getAllPostMetas } from '@/lib/posts';
import BlogExplorer from '@/components/blog/BlogExplorer';

export const metadata: Metadata = {
  title: `Research & Writing · ${profile.name}`,
  description: 'Notes, practice and learning on cost engineering, artificial intelligence and technical applications.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: `Research & Writing · ${profile.name}`,
    description: 'Cost engineering practice, AI research and personal essays.',
    type: 'website',
    url: '/blog/',
    locale: 'en_US',
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
          Research &amp; Writing<span className="text-teal-300">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
          Notes on engineering, artificial intelligence and independent research — understanding
          problems through checkable evidence, and recording the process along the way.
          Articles are written in Chinese.
        </p>
      </header>

      <div className="pt-11 sm:pt-14"><BlogExplorer posts={posts} /></div>
    </div>
  );
}
