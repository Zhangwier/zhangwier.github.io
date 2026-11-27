import Spotlight from '@/components/Spotlight';
import Sidebar from '@/components/Sidebar';
import About from '@/components/sections/About';
import Research from '@/components/sections/Research';
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

        <div className="lg:flex lg:justify-between lg:gap-6">
          <Sidebar />

          <main id="content" className="pt-12 sm:pt-16 lg:w-[59%] lg:py-24">
            <About />
            <Research />

            <Footer />
          </main>
        </div>
      </div>
    </div>
  );
}
