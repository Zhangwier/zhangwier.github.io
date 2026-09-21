import { profile } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function Focus() {
  if (profile.focus.length === 0) return null;

  return (
    <section id="focus" className={sectionClass} aria-label="专业方向">
      <SectionHeading>方向</SectionHeading>

      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
        {profile.focus.map(item => (
          <li key={item.subtitle}>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {item.subtitle}
            </p>
            <h3 className="mt-2 font-medium leading-snug text-slate-200">{item.title}</h3>
            <p className="mt-2 text-sm leading-normal">{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
