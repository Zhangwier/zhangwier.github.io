import Link from 'next/link';
import { profile } from '@/data/profile';

export default function BlogFooter() {
  return (
    <footer className="relative z-10 mt-20 border-t border-slate-800/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 text-xs leading-6 text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© 2026 {profile.name} · Research, practice and essays</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          <Link href="/" className="transition-colors hover:text-teal-200">Profile</Link>
          <Link href="/blog/" className="transition-colors hover:text-teal-200">Writing index</Link>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-teal-200">Email</a>
        </nav>
      </div>
    </footer>
  );
}
