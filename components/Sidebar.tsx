import Link from 'next/link';
import { navLinks, profile } from '@/data/profile';
import Nav from './Nav';
import Social from './Social';

export default function Sidebar() {
  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <nav aria-label="网站区域导航" className="mb-8 flex items-center gap-5 text-xs font-semibold tracking-wide">
          <span aria-current="page" className="border-b-2 border-teal-300 pb-2 text-slate-100">个人主页</span>
          <Link href="/blog/" className="border-b-2 border-transparent pb-2 text-slate-400 transition-colors hover:border-teal-300/60 hover:text-teal-200">
            博客 <span aria-hidden="true">↗</span>
          </Link>
        </nav>

        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          <Link href="/">{profile.name}</Link>
        </h1>

        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          {profile.title}
        </h2>

        <p className="mt-4 max-w-xs leading-normal">{profile.tagline}</p>

        <nav className="mt-7 lg:hidden" aria-label="个人介绍章节">
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="inline-flex min-h-8 items-center border-b border-slate-700 pb-1 text-sm font-medium text-slate-300 transition-colors hover:border-teal-300 hover:text-teal-300 focus-visible:text-teal-300"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <Nav />
      </div>

      <Social />
    </header>
  );
}
