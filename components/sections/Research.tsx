import Link from 'next/link';
import SectionHeading, { sectionClass } from '@/components/SectionKit';

export default function Research() {
  return (
    <section id="research" className={sectionClass} aria-label="Technical practice">
      <SectionHeading>Practice</SectionHeading>
      <h3 className="text-lg font-medium leading-8 text-slate-100">CostRAG</h3>
      <p className="mt-1 text-sm text-slate-400">Exploring an AI work system for cost engineering</p>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
        Personal technical practice around retrieving pricing references, structuring quota data and
        checking outputs. It is currently knowledge organisation and retrieval testing, not a mature
        consulting application.
      </p>
      <Link href="/blog/costrag/"
        className="group mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-teal-300 transition-colors hover:text-teal-200">
        Read the practice notes
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
      </Link>
    </section>
  );
}
