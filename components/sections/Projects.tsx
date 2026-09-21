import { projects } from '@/data/profile';
import SectionHeading, { ExternalIcon, HoverCard, TagList, sectionClass } from '@/components/SectionKit';

export default function Projects() {
  return (
    <section id="projects" className={sectionClass} aria-label="项目">
      <SectionHeading>项目</SectionHeading>

      <ul className="group/list">
        {projects.map(project => (
          <li key={project.title} className="mb-12">
            <HoverCard>
              {/* 有截图就显示截图，没有就留一个占位块 */}
              <div className="z-10 sm:order-2 sm:col-span-2">
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.imageAlt ?? project.title}
                    loading="lazy"
                    className="rounded border-2 border-slate-200/10 transition motion-reduce:transition-none group-hover:border-slate-200/30 sm:order-1"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="aspect-video rounded border-2 border-slate-200/10 bg-gradient-to-br from-slate-800 to-slate-800/40 transition motion-reduce:transition-none group-hover:border-slate-200/30"
                  />
                )}
              </div>

              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                      <span>
                        {project.title}
                        <ExternalIcon />
                      </span>
                    </a>
                  ) : (
                    <span className="inline-flex items-baseline text-base font-medium leading-tight text-slate-200">
                      {project.title}
                    </span>
                  )}
                </h3>

                {project.badge && (
                  <p className="mt-1 text-xs font-medium text-slate-400">{project.badge}</p>
                )}

                <p className="mt-2 text-sm leading-normal">{project.summary}</p>

                <TagList tags={project.tags} />
              </div>
            </HoverCard>
          </li>
        ))}
      </ul>
    </section>
  );
}
