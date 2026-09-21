import { writing } from '@/data/profile';
import SectionHeading, { ExternalIcon, HoverCard, TagList, sectionClass } from '@/components/SectionKit';

export default function Writing() {
  if (writing.length === 0) return null;

  return (
    <section id="writing" className={sectionClass} aria-label="分享">
      <SectionHeading>分享</SectionHeading>

      <ul className="group/list">
        {writing.map(item => (
          <li key={item.title} className="mb-12">
            <HoverCard>
              {/* 文字跨满整行：分享内容以长文为主，不放缩略图 */}
              <div className="z-10 sm:col-span-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {item.year}
                  {item.subtitle ? ` · ${item.subtitle}` : ''}
                </p>

                <h3 className="mt-2 font-medium leading-snug text-slate-200">
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
                    >
                      <span>
                        {item.title}
                        <ExternalIcon />
                      </span>
                    </a>
                  ) : (
                    <span className="inline-flex items-baseline text-base font-medium leading-tight text-slate-200">
                      {item.title}
                    </span>
                  )}
                </h3>

                {item.summary?.map((paragraph, index) => (
                  <p key={index} className="mt-3 text-sm leading-normal">
                    {paragraph}
                  </p>
                ))}

                {item.tags && <TagList tags={item.tags} />}
              </div>
            </HoverCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
