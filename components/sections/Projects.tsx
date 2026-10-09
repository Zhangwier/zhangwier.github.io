import Link from 'next/link';
import { projects } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

const featuredProjects = projects.filter(project => project.featured);
const otherProjects = projects.filter(project => !project.featured);

export default function Projects() {
  return (
    <section id="projects" className={sectionClass} aria-label="项目与实践">
      <SectionHeading>项目</SectionHeading>

      <header className="mb-9 sm:mb-11">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-300/80">
          Selected work
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-200 sm:text-[28px]">
          项目与实践
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
          工程造价项目经历与个人数字化技术实践。
        </p>
      </header>

      {featuredProjects.length > 0 && (
        <div>
          <div className="mb-5 flex items-baseline gap-3">
            <span className="font-mono text-xs tracking-widest text-teal-300/75">01</span>
            <h3 className="text-sm font-medium tracking-wide text-slate-200">代表工程项目</h3>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500">
              Selected cases
            </span>
          </div>

          <ol className="space-y-6">
            {featuredProjects.map((project, index) => (
              <li key={project.title}>
                <article className="group overflow-hidden rounded-xl border border-slate-700/60 bg-slate-800/35 transition-colors hover:border-slate-600/80 hover:bg-slate-800/50 motion-reduce:transition-none">
                  {project.image && (
                    <div className="relative overflow-hidden border-b border-slate-700/50 bg-slate-950">
                      {/* Original decorative line drawing, not a real project drawing. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt={project.imageAlt ?? '抽象工程结构线稿'}
                        loading="lazy"
                        className="block aspect-[2.8/1] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                      />
                      <span className="absolute bottom-3 left-4 rounded border border-slate-500/40 bg-slate-950/75 px-2 py-1 font-mono text-[10px] tracking-widest text-slate-300 backdrop-blur-sm sm:left-6">
                        CASE / 0{index + 1}
                      </span>
                    </div>
                  )}

                  <div className="p-4 sm:p-6">
                    <p className="text-[11px] font-medium tracking-wide text-teal-300/80">
                      {project.category}
                    </p>
                    <h4 className="mt-2 text-base font-semibold leading-relaxed text-slate-100 sm:text-lg">
                      {project.title}
                    </h4>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {project.summary}
                    </p>
                    {(project.role || project.approach) && (
                      <dl className="mt-5 grid gap-4 border-t border-slate-700/60 pt-4 sm:grid-cols-2 sm:gap-5">
                        {project.role && (
                          <div>
                            <dt className="mb-1 text-[11px] font-medium tracking-wide text-slate-500">
                              个人参与
                            </dt>
                            <dd className="text-[13px] leading-6 text-slate-300">
                              {project.role}
                            </dd>
                          </div>
                        )}
                        {project.approach && (
                          <div>
                            <dt className="mb-1 text-[11px] font-medium tracking-wide text-slate-500">
                              工作方法
                            </dt>
                            <dd className="text-[13px] leading-6 text-slate-300">
                              {project.approach}
                            </dd>
                          </div>
                        )}
                      </dl>
                    )}
                    <p className="mt-4 text-xs leading-6 text-slate-500">
                      {project.tags.slice(0, 3).join(' / ')}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      )}

      {otherProjects.length > 0 && (
        <div className="mt-10 sm:mt-12">
          <div className="mb-4 flex items-baseline gap-3">
            <span className="font-mono text-xs tracking-widest text-teal-300/75">02</span>
            <h3 className="text-sm font-medium tracking-wide text-slate-200">更多工程经历</h3>
            <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500">
              More experience
            </span>
          </div>

          <ol className="divide-y divide-slate-800 border-y border-slate-800">
            {otherProjects.map((project, index) => (
              <li key={project.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 py-5 sm:gap-x-4 sm:py-6">
                <span className="pt-0.5 font-mono text-xs tabular-nums text-slate-600">
                  {String(index + 3).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="mb-1 text-[11px] tracking-wide text-teal-300/75">
                    {project.category}
                  </p>
                  <h4 className="text-[15px] font-medium leading-6 text-slate-200">
                    {project.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">
                    {project.summary}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-10 sm:mt-12">
        <div className="mb-4 flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-widest text-teal-300/75">03</span>
          <h3 className="text-sm font-medium tracking-wide text-slate-200">个人技术实践</h3>
          <span className="ml-auto text-[10px] uppercase tracking-wider text-slate-500">
            Independent study
          </span>
        </div>

        <article className="relative overflow-hidden rounded-xl border border-teal-300/20 bg-gradient-to-br from-slate-800/80 via-slate-800/40 to-teal-950/20 p-5 sm:p-7">
          <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-teal-300/5 blur-3xl" />

          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-300/80">
              Research in progress
            </p>
            <h4 className="mt-3 text-2xl font-semibold tracking-tight text-slate-100">
              CostRAG
            </h4>
            <p className="mt-1.5 text-sm font-medium text-slate-200">
              工程造价 AI 工作系统探索
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              持续探索规范检索、定额数据结构化、任务编排与成果核查的技术实现及适用边界。
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-slate-700/60 bg-slate-950/35 px-4 py-3">
                <dd className="font-mono text-xl font-medium tabular-nums text-slate-100 sm:text-2xl">24</dd>
                <dt className="mt-1 text-xs leading-5 text-slate-400">内部检索测试题</dt>
              </div>
              <div className="rounded-lg border border-slate-700/60 bg-slate-950/35 px-4 py-3">
                <dd className="font-mono text-xl font-medium tabular-nums text-teal-300 sm:text-2xl">18/24</dd>
                <dt className="mt-1 text-xs leading-5 text-slate-400">中文侧车通过</dt>
              </div>
            </dl>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              阶段性内部实验，非实际工程审核准确率；系统仍在持续验证。
            </p>

            <Link
              href="/blog/costrag/"
              className="group/link mt-5 inline-flex min-h-10 items-center gap-2 border-b border-teal-300/40 text-sm font-medium text-teal-300 transition-colors hover:border-teal-200 hover:text-teal-200"
            >
              阅读技术实践记录
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-4 w-4 transition-transform group-hover/link:translate-x-1 motion-reduce:transition-none"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
              </svg>
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
