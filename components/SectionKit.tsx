import { profile } from '@/data/profile';

/**
 * 移动端滚到某个区块时，顶部会浮出一条带毛玻璃的区块标题。
 * 大屏隐藏（lg:sr-only），因为左栏导航已经标示了位置。
 */
export default function SectionHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
      <h2 id={id} className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
        {children}
      </h2>
    </div>
  );
}

export function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-2 flex flex-wrap" aria-label="使用到的技术">
      {tags.map(tag => (
        <li key={tag} className="mr-1.5 mt-2">
          <span className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
            {tag}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * 列表条目的共享外壳：鼠标悬停时同组其它条目变暗，当前条浮出半透明卡片。
 * 这是靠父级 group/list 与子级 group-hover/list 的命名分组配合完成的。
 */
export function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative grid gap-4 pb-1 transition-all motion-reduce:transition-none sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
      <div
        aria-hidden="true"
        className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"
      />
      {children}
    </div>
  );
}

export const sectionClass = 'mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24';

export function ResumeLink() {
  // 没配简历文件就不显示入口，免得点出 404。
  if (!profile.resumeHref) return null;

  return (
    <a
      href={profile.resumeHref}
      className="mt-6 inline-flex items-center text-sm font-medium text-slate-200 hover:text-teal-300"
      target="_blank"
      rel="noreferrer noopener"
    >
      查看完整简历
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
      >
        <path
          fillRule="evenodd"
          d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10z"
          clipRule="evenodd"
        />
      </svg>
    </a>
  );
}
