import { writing } from '@/data/profile';
import SectionHeading, { HoverCard, sectionClass } from '@/components/SectionKit';

export default function Writing() {
  if (writing.length === 0) return null;

  return (
    <section id="writing" className={sectionClass} aria-label="文章">
      <SectionHeading>文章</SectionHeading>

      <ul className="group/list">
        {writing.map(item => (
          <li key={item.href} className="mb-8">
            <HoverCard>
              <div className="z-10 sm:order-2 sm:col-span-2">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={item.imageAlt ?? item.title}
                    loading="lazy"
                    className="rounded border-2 border-slate-200/10 transition motion-reduce:transition-none group-hover:border-slate-200/30"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="aspect-video rounded border-2 border-slate-200/10 bg-gradient-to-br from-slate-800 to-slate-800/40 transition motion-reduce:transition-none group-hover:border-slate-200/30"
                  />
                )}
              </div>

              <div className="z-10 sm:col-span-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.year}
                </p>
                <h3 className="mt-1 font-medium leading-snug text-slate-200">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                    <span>
                      {item.title}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </a>
                </h3>
              </div>
            </HoverCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
