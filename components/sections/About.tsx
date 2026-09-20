import { profile } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function About() {
  return (
    <section id="about" className={sectionClass} aria-label="关于我">
      <SectionHeading>关于</SectionHeading>

      <div className="space-y-4">
        {profile.about.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      <ul className="mt-8 flex flex-wrap gap-2" aria-label="技能">
        {profile.skills.map(skill => (
          <li
            key={skill}
            className="rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}
