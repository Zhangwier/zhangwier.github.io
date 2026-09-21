import { profile } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

/** 把 **文字** 渲染成更亮的强调色，其余部分保持正文灰度。 */
function renderEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-medium text-slate-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function About() {
  return (
    <section id="about" className={sectionClass} aria-label="关于我">
      <SectionHeading>关于</SectionHeading>

      <div className="space-y-4">
        {profile.about.map((paragraph, index) => (
          <p key={index}>{renderEmphasis(paragraph)}</p>
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
