import { profile } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function Method() {
  if (profile.method.length === 0) return null;

  return (
    <section id="method" className={sectionClass} aria-label="专业判断">
      <SectionHeading>专业判断</SectionHeading>
      <div className="divide-y divide-slate-800/80 border-y border-slate-700/70">
        {profile.method.map(item => (
          <div key={item.step} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
            <h3 className="text-sm font-medium leading-7 text-teal-200">{item.title}</h3>
            <p className="text-sm leading-7 text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
