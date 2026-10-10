import Link from 'next/link';

export default function BlogHeader() {
  return (
    <header className="relative z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-[76px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <Link href="/blog/" aria-label="返回博客首页" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-teal-300/30 bg-teal-300/10 font-mono text-sm font-bold tracking-tight text-teal-200 transition-colors group-hover:border-teal-300/70">
            ZW
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold tracking-wide text-slate-100">研究与写作</span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400">ZhangWex / Notes</span>
          </span>
        </Link>
        <nav aria-label="网站区域导航" className="flex shrink-0 items-center gap-1 text-sm sm:gap-3">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center rounded-lg px-3 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100 focus-visible:text-teal-200"
          >
            个人主页
          </Link>
          <Link
            href="/blog/"
            aria-current="page"
            className="inline-flex min-h-10 items-center rounded-lg bg-slate-800/80 px-3 font-medium text-teal-200"
          >
            博客
          </Link>
        </nav>
      </div>
    </header>
  );
}
