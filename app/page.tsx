import Spotlight from '@/components/Spotlight';
import Sidebar from '@/components/Sidebar';
import About from '@/components/sections/About';
import Focus from '@/components/sections/Focus';
import Method from '@/components/sections/Method';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Writing from '@/components/sections/Writing';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    // group/spotlight 留给以后与光斑联动的悬停效果；光斑层本身是 fixed 定位。
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

          <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
            <About />
            <Focus />
            <Method />
            <Experience />
            <Projects />
            <Writing />
            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
