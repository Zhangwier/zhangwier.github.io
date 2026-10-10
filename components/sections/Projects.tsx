import { projects } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

const groups = ['公路工程', '跨海通道工程', '市政工程'] as const;

export default function Projects() {
  return (
    <section id="projects" className={sectionClass} aria-label="参与的工程项目">
      <SectionHeading>工程项目</SectionHeading>

      <div className="space-y-10">
        {groups.map(group => {
          const items = projects.filter(project => project.group === group);
          if (!items.length) return null;

          return (
            <div key={group}>
              <div className="flex items-center gap-4 border-b border-slate-700/75 pb-3">
                <h3 className="text-sm font-semibold tracking-wide text-slate-300">{group}</h3>
                <span className="ml-auto font-mono text-xs tabular-nums text-slate-500">
                  {String(items.length).padStart(2, '0')}
                </span>
              </div>

              <ul className="divide-y divide-slate-800/80">
                {items.map(project => (
                  <li key={project.title} className="py-5 sm:py-6">
                    <h4 className="text-[16px] font-medium leading-7 text-slate-100">
                      {project.title}
                    </h4>
                    <p className="mt-1.5 max-w-2xl text-sm leading-7 text-slate-400">
                      {project.role || project.summary}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
