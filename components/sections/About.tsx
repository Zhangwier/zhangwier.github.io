import { profile } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

function renderEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-medium text-slate-100">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function About() {
  return (
    <section id="about" className={sectionClass} aria-label="个人介绍">
      <SectionHeading>个人介绍</SectionHeading>
      <div className="max-w-3xl space-y-5 text-[15px] leading-8 text-slate-300 sm:text-base">
        {profile.about.map((paragraph, index) => (
          <p key={index}>{renderEmphasis(paragraph)}</p>
        ))}
      </div>
    </section>
  );
}
