import Link from 'next/link';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function Research() {
  return (
    <section id="research" className={sectionClass} aria-label="个人技术实践">
      <SectionHeading>技术实践</SectionHeading>
      <h3 className="text-lg font-medium leading-8 text-slate-100">CostRAG</h3>
      <p className="mt-1 text-sm text-slate-400">工程造价 AI 工作系统探索</p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
        围绕工程计价依据检索、定额数据结构化和成果核查开展个人技术实践。
        目前主要进行知识整理与检索验证，尚不属于成熟的工程咨询应用。
      </p>
      <Link href="/blog/costrag/"
        className="group mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200">
        查看实践记录
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
      </Link>
    </section>
  );
}
