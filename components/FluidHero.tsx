'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function FluidHero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (!motionEnabled) return;
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    if (!hero || !canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSupported(false);
      return;
    }

    let cancelled = false;
    let dispose: (() => void) | null = null;
    import('@/lib/fluid').then(({ mountFluid }) => {
      if (cancelled) return;
      dispose = mountFluid(canvas, hero);
      if (!dispose) setSupported(false);
    }).catch(() => {
      if (!cancelled) setSupported(false);
    });

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, [motionEnabled]);

  return (
    <section ref={heroRef} id="top" className="fluid-hero relative isolate overflow-hidden" aria-label="ZhangWex 个人主页首屏">
      <div className="fluid-hero-fallback" aria-hidden="true" />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fluid-hero-canvas"
        style={{ opacity: motionEnabled && supported ? 1 : 0 }}
      />
      <div className="fluid-hero-shade" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-screen-xl flex-col px-6 pb-8 pt-7 sm:min-h-[90svh] sm:px-12 sm:pt-10 lg:min-h-screen">
        <header className="flex flex-wrap items-center justify-between gap-5">
          <Link href="/" className="text-sm font-semibold tracking-[0.16em] text-slate-100">
            ZHANGWEX<span className="text-teal-300">.</span>
          </Link>
          <nav className="flex items-center gap-5 text-xs font-medium text-slate-300 sm:gap-8 sm:text-sm" aria-label="主页快捷导航">
            <a href="#portfolio" className="transition hover:text-white focus-visible:text-white">关于</a>
            <Link href="/blog/" className="transition hover:text-white focus-visible:text-white">研究与写作</Link>
            <a href="https://github.com/Zhangwier" target="_blank" rel="noreferrer noopener" className="transition hover:text-white focus-visible:text-white">GitHub</a>
          </nav>
        </header>

        <div className="flex flex-1 flex-col justify-center pb-12 pt-20 sm:pb-16">
          <p className="fluid-hero-eyebrow mb-7 text-xs font-medium tracking-[0.25em] text-teal-200/85 sm:text-sm">
            ENGINEERING / TECHNOLOGY / EXPLORATION
          </p>
          <h1 className="fluid-hero-title max-w-5xl font-semibold tracking-tight text-white">
            <span className="block">在精确与想象</span>
            <span className="block">之间<span className="text-teal-300">.</span></span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-8 text-slate-200/90 sm:mt-9 sm:max-w-lg sm:text-lg sm:leading-9">
            从交通工程到造价咨询，从 AI 工具到技术实验。
            以严谨理解现实，也为好奇心保留空间。
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#portfolio"
              className="inline-flex min-h-11 items-center gap-3 border-b border-teal-300 pb-1 text-sm font-medium text-white transition hover:gap-5 focus-visible:text-teal-200"
            >
              探索我的世界 <span aria-hidden="true">↗</span>
            </a>
            <Link href="/blog/" className="inline-flex min-h-11 items-center text-sm text-slate-300 transition hover:text-white">
              阅读思考与记录 <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <footer className="flex flex-wrap items-end justify-between gap-5 border-t border-white/15 pt-5 text-xs tracking-wide text-slate-300">
          <span className="fluid-hero-interact">
            <span className="hidden sm:inline">移动指针，扰动色彩</span>
            <span className="sm:hidden">轻触色彩，探索流动</span>
          </span>
          {supported ? (
            <button
              type="button"
              onClick={() => setMotionEnabled(value => !value)}
              aria-pressed={motionEnabled}
              className="rounded-md px-2 py-2 text-slate-200 transition hover:bg-white/10 hover:text-white focus-visible:text-white"
            >
              {motionEnabled ? '关闭动态效果' : '开启动态效果'}
            </button>
          ) : (
            <span className="text-slate-400">静态视觉模式</span>
          )}
        </footer>
      </div>
    </section>
  );
}
