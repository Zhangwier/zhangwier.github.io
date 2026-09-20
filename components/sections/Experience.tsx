import { experience } from '@/data/profile';
import SectionHeading, { HoverCard, ResumeLink, TagList, sectionClass } from '@/components/SectionKit';

export default function Experience() {
  return (
    <section id="experience" className={sectionClass} aria-label="工作经历">
      <SectionHeading>经历</SectionHeading>

      <div>
        <ol className="group/list">
          {experience.map(item => (
            <li key={`${item.company}-${item.title}`} className="mb-12">
              <HoverCard>
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                  {item.range}
                </header>

                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
                      >
                        {/* 让整条卡片都可点，而不是只有文字 */}
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                        <span>
                          {item.title} · {item.company}
                        </span>
                      </a>
                    ) : (
                      <span className="inline-flex items-baseline text-base font-medium leading-tight text-slate-200">
                        {item.title} · {item.company}
                      </span>
                    )}
                  </h3>

                  <p className="mt-2 text-sm leading-normal">{item.summary}</p>

                  <TagList tags={item.tags} />
                </div>
              </HoverCard>
            </li>
          ))}
        </ol>

        <ResumeLink />
      </div>
    </section>
  );
}
