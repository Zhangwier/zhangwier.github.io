import Link from 'next/link';
import { profile } from '@/data/profile';

export default function BlogFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-slate-800/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© 2026 {profile.name} · 研究、实践与思考</p>
        <nav aria-label="页脚导航" className="flex flex-wrap gap-5">
          <Link href="/" className="transition-colors hover:text-teal-200">个人主页</Link>
          <Link href="/blog/" className="transition-colors hover:text-teal-200">博客首页</Link>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-teal-200">联系邮箱</a>
        </nav>
      </div>
    </footer>
  );
}
