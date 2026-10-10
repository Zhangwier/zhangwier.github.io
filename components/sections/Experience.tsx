import { experience } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function Experience() {
  return (
    <section id="experience" className={sectionClass} aria-label="工作与教育经历">
      <SectionHeading>工作与教育经历</SectionHeading>
      <ol className="divide-y divide-slate-800/80 border-y border-slate-700/70">
        {experience.map(item => (
          <li key={`${item.company}-${item.title}`} className="grid gap-2 py-6 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-5 sm:py-7">
            <p className="pt-1 font-mono text-xs tabular-nums tracking-wide text-slate-400">{item.range}</p>
            <div className="min-w-0">
              <h3 className="text-[15px] font-medium leading-7 text-slate-100 sm:text-base">
                {item.title}<span className="px-2 text-slate-600">/</span>{item.company}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-400">{item.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
