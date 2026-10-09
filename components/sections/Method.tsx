import { profile } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function Method() {
  if (profile.method.length === 0) return null;

  return (
    <section id="method" className={sectionClass} aria-label="工作理念">
      <SectionHeading>理念</SectionHeading>

      <p className="mb-8 max-w-lg text-sm leading-7">立足工程实际，遵循专业依据，关注技术应用。</p>

      <ol className="group/list">
        {profile.method.map(item => (
          <li
            key={item.step}
            className="group relative grid grid-cols-[3rem_1fr] items-baseline gap-x-4 pb-7 last:pb-0"
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
