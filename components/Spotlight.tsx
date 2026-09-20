'use client';

import { useEffect, useRef } from 'react';

/**
 * Mouse-following glow.
 *
 * A single oversized radial gradient that tracks the pointer. No canvas, no WebGL —
 * just one composited layer whose background is rewritten at most once per frame.
 * Disabled for coarse pointers (touch) and when the user asks for reduced motion.
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
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
      style={{
        background:
          'radial-gradient(600px circle at 0px 0px, rgba(29, 78, 216, 0.15), transparent 80%)',
      }}
    />
  );
}
