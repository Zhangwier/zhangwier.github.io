'use client';

import { useEffect, useState } from 'react';
import { navLinks } from '@/data/profile';

/**
 * In-page navigation for the left column. The current section is highlighted on
 * scroll, and the rule beside the active item grows from 2rem to 4rem.
 */
export default function Nav() {
  const [activeId, setActiveId] = useState<string>(navLinks[0]?.id ?? '');

  useEffect(() => {
    const sections = navLinks
      .map(link => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      // Keep the highlight tuned to the upper-middle band of the viewport.
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav mt-16 hidden lg:block" aria-label="On this page">
      <ul className="w-max">
        {navLinks.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className="group flex items-center py-3 text-xs font-bold uppercase tracking-widest"
              >
                <span
                  className={`mr-4 h-px transition-all motion-reduce:transition-none ${
                    isActive
                      ? 'w-16 bg-slate-200'
                      : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200'
                  }`}
                />
                <span
                  className={`transition-colors motion-reduce:transition-none ${
                    isActive ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
