import type { ReactNode } from 'react';
import Spotlight from '@/components/Spotlight';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogFooter from '@/components/blog/BlogFooter';

/** Independent reading space, visually distinct from the portfolio sidebar. */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="group/spotlight relative min-h-screen bg-slate-950 text-slate-300">
      <Spotlight />
      <a
        href="#blog-content"
        className="sr-only rounded bg-teal-300 px-4 py-3 font-medium text-slate-950 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        跳到正文
      </a>
      <BlogHeader />
      <main id="blog-content" className="relative">
        {children}
      </main>
      <BlogFooter />
    </div>
  );
}
