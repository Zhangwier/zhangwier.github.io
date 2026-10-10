import Link from 'next/link';
import Spotlight from '@/components/Spotlight';
import Sidebar from '@/components/Sidebar';
import About from '@/components/sections/About';
import Focus from '@/components/sections/Focus';
import Method from '@/components/sections/Method';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Footer from '@/components/Footer';

/** Portfolio only: articles live in the independent /blog/ reading space. */
export default function Page() {
  return (
    <div className="group/spotlight relative">
      <Spotlight />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
        <a
          href="#content"
          className="absolute left-0 top-0 block -translate-x-full rounded bg-yellow-500 px-4 py-3 text-sm font-bold uppercase tracking-widest text-slate-900 focus-visible:translate-x-0"
        >
          跳到内容
        </a>

        <div className="lg:flex lg:justify-between lg:gap-4">
          <Sidebar />

          <main id="content" className="pt-12 sm:pt-16 lg:w-[52%] lg:py-24">
            <About />
            <Focus />
            <Method />
            <Experience />
            <Projects />

            <section aria-labelledby="blog-invitation" className="mb-20 rounded-xl border border-slate-700/70 bg-gradient-to-br from-slate-800/65 to-slate-900 p-6 sm:p-8 lg:mb-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300/85">WRITINGS & NOTES</p>
              <h2 id="blog-invitation" className="mt-3 text-xl font-semibold text-slate-100">研究与写作</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                工程造价实践、人工智能研究与个人思考，独立整理在博客中。
              </p>
              <Link
                href="/blog/"
                className="group mt-5 inline-flex min-h-10 items-center gap-2 border-b border-teal-300/50 text-sm font-medium text-teal-200 transition-colors hover:border-teal-200 hover:text-teal-100"
              >
                进入博客
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
              </Link>
            </section>

            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
