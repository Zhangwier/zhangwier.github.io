import Spotlight from '@/components/Spotlight';
import Sidebar from '@/components/Sidebar';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Writing from '@/components/sections/Writing';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    // relative wrapper so the spotlight can switch from fixed (mobile) to absolute (desktop)
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
