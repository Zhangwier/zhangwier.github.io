import Link from 'next/link';
import { projects } from '@/data/profile';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

const selected = projects.filter(project => project.featured);
const others = projects.filter(project => !project.featured);

/** A text-first engineering project index; no invented project photos or outcomes. */
export default function Projects() {
  return (
    <section id="projects" className={sectionClass} aria-label="工程项目与个人技术研究">
      <SectionHeading>工程项目</SectionHeading>
      <p className="mb-7 text-sm leading-7 text-slate-400">
        以下为参与过的工程造价工作，项目名称作匿名处理，描述限于本人实际参与范围。
      </p>

      <ol className="divide-y divide-slate-800/80 border-y border-slate-700/70">
        {selected.map((project, index) => (
          <li key={project.title} className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 py-8 sm:grid-cols-[3.5rem_minmax(0,1fr)] sm:gap-5">
            <span className="pt-1 font-mono text-xs tabular-nums text-teal-300/80">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-teal-300/80">{project.category}</p>
              <h3 className="mt-2 text-lg font-semibold leading-relaxed text-slate-100 sm:text-xl">{project.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{project.summary}</p>
              {project.role && (
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  <span className="mr-2 text-slate-500">参与内容</span>{project.role}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {others.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-5 text-sm font-medium text-slate-200">其他参与项目</h3>
          <ul className="grid gap-x-7 gap-y-0 sm:grid-cols-2">
            {others.map(project => (
              <li key={project.title} className="border-t border-slate-800/90 py-5">
                <p className="text-xs text-teal-300/80">{project.category}</p>
                <h4 className="mt-2 text-[15px] font-medium leading-6 text-slate-200">{project.title}</h4>
                <p className="mt-2 text-[13px] leading-6 text-slate-400">{project.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-14 border-t border-slate-700/70 pt-8">
        <p className="text-xs font-medium tracking-wide text-teal-300/80">独立技术研究 · 持续验证中</p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-100">
          CostRAG <span className="font-normal text-slate-300">/ 工程造价 AI 工作系统</span>
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          围绕计量计价依据检索、定额数据结构化和成果核查，探索可追溯的辅助工作流程。
          目前以知识整理与检索测试为主，尚未形成可独立投入工程审核的成熟系统。
        </p>
        <p className="mt-4 text-xs leading-6 text-slate-400">
          阶段性内部检索测试：24 个用例，中文侧车通过 18 个；不代表工程审核准确率。
        </p>
        <Link
          href="/blog/costrag/"
          className="group mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200"
        >
          阅读技术研究记录
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
        </Link>
      </div>
    </section>
  );
}
