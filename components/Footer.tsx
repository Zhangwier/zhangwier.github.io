import { profile } from '@/data/profile';

export default function Footer() {
  return (
    <footer className="max-w-md border-t border-slate-800 pt-6 pb-12 text-xs leading-6 text-slate-400 sm:pb-0">
      <p>© 2026 {profile.name} · 交通工程 · 工程造价与数字化实践</p>
      <p className="mt-2">
        <a href="https://github.com/Zhangwier" target="_blank" rel="noreferrer noopener" className="text-slate-300 transition-colors hover:text-teal-300">GitHub</a>
        <span className="mx-3 text-slate-600">/</span>
        <a href={`mailto:${profile.email}`} className="text-slate-300 transition-colors hover:text-teal-300">联系邮箱</a>
      </p>
    </footer>
  );
}
