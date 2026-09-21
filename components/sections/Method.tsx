import { profile } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function Method() {
  if (profile.method.length === 0) return null;

  return (
    <section id="method" className={sectionClass} aria-label="工作方式">
      <SectionHeading>方式</SectionHeading>

      <p className="mb-10 max-w-lg">把造价工作收成一条可解释、可复核的主线。</p>

      <ol className="group/list">
        {profile.method.map(item => (
          <li
            key={item.step}
            className="group relative grid grid-cols-[3rem_1fr] items-baseline gap-x-4 pb-8 last:pb-0"
          >
            <span className="font-mono text-xs font-semibold tracking-widest text-teal-300/70">
              {item.step}
            </span>
            <div>
              <h3 className="font-medium leading-snug text-slate-200">{item.title}</h3>
              <p className="mt-1 text-sm leading-normal">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
