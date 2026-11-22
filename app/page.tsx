import FluidHero from '@/components/FluidHero';
import Sidebar from '@/components/Sidebar';
import About from '@/components/sections/About';
import Research from '@/components/sections/Research';
import Footer from '@/components/Footer';

/** Cinematic introduction followed by the existing professional portfolio. */
export default function Page() {
  return (
    <>
      <a
        href="#portfolio"
        className="absolute left-2 top-2 z-50 -translate-y-20 rounded bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950 focus-visible:translate-y-0"
      >
        跳到个人介绍
      </a>

      <FluidHero />

      <div id="portfolio" className="relative scroll-mt-6 border-t border-slate-800/70 bg-slate-900">
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-16 lg:py-0">
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
    </>
  );
}
