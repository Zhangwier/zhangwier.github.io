import { profile } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function Focus() {
  if (profile.focus.length === 0) return null;

  return (
    <section id="focus" className={sectionClass} aria-label="主要业务内容">
      <SectionHeading>业务内容</SectionHeading>
      <ol className="border-y border-slate-700/70">
        {profile.focus.map((item, index) => (
          <li key={item.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-slate-800/80 py-6 last:border-b-0 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5">
            <span className="pt-1 font-mono text-xs tabular-nums text-teal-300/80">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="text-[16px] font-medium leading-7 text-slate-100">{item.title}</h3>
              <p className="mt-1 text-sm leading-7 text-slate-400">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
