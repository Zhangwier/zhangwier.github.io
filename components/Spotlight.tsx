'use client';

import { useEffect, useRef } from 'react';

/**
 * Mouse-following glow.
 *
 * A single oversized radial gradient that tracks the pointer. No canvas, no WebGL —
 * just one composited layer whose background is rewritten at most once per frame.
 * Disabled for coarse pointers (touch) and when the user asks for reduced motion.
 *
 * This layer stays `fixed` at every breakpoint on purpose. The circle is positioned
 * with clientX/clientY, which are viewport coordinates, so the containing block has
 * to be the viewport as well. An earlier `lg:absolute` (putting the layer into the
 * document so the glow scrolled with the content) mixed the two coordinate systems:
 * the circle's drawn position lagged the real pointer by window.scrollY, so it stalled
 * once the page scrolled past the first screenful. Keeping it fixed also shrinks the
 * layer from document height to viewport height, which is far cheaper to composite.
 */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(29, 78, 216, 0.15), transparent 80%)`;
    };

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      // Coalesce bursts of pointer events into one paint per frame.
      if (!frame) frame = requestAnimationFrame(paint);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 motion-reduce:transition-none"
      style={{
        background:
          'radial-gradient(600px circle at 0px 0px, rgba(29, 78, 216, 0.15), transparent 80%)',
      }}
    />
  );
}
