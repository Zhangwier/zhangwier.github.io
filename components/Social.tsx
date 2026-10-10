'use client';

import Link from 'next/link';
import { useState } from 'react';
import { profile, type SocialLink } from '@/data/profile';

const iconPaths = {
  github: {
    viewBox: '0 0 16 16',
    path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z',
  },
  mail: {
    viewBox: '0 0 24 24',
    path: 'M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm-2 2 10 7 10-7',
  },
  blog: {
    viewBox: '0 0 24 24',
    path: 'M12 7.5c-2-1.1-4.2-1.5-8-1.5a2 2 0 0 0-2 2v11c3.6-.2 6.8.1 10 2 3.2-1.9 6.4-2.2 10-2V8a2 2 0 0 0-2-2c-3.8 0-6 .4-8 1.5Zm0 0V21',
  },
} as const;


const iconClass = 'inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/75 bg-slate-800/35 text-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300/55 hover:bg-teal-300/10 hover:text-teal-200 focus-visible:border-teal-300 focus-visible:text-teal-200 motion-reduce:transform-none motion-reduce:transition-none';

function ContactIcon({ icon }: { icon: SocialLink['icon'] }) {
  if (icon === 'qq') {
    return (
      <svg viewBox="0 0 24 24" className="h-[23px] w-[23px]" aria-hidden="true">
        <ellipse cx="12" cy="11.3" rx="5" ry="7.8" fill="currentColor" />
        <ellipse cx="12" cy="12.5" rx="3" ry="4.6" fill="#0f172a" />
        <circle cx="10.4" cy="8.2" r=".6" fill="#0f172a" />
        <circle cx="13.6" cy="8.2" r=".6" fill="#0f172a" />
        <path d="M10.8 9.5h2.4L12 10.7z" fill="#fbbf24" />
        <path d="M7.5 14.7 4.4 18M16.5 14.7l3.1 3.3" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" fill="none" />
        <path d="M8.7 18.1 7 21h4l1-2M15.3 18.1 17 21h-4l-1-2" fill="currentColor" />
        <path d="M7.6 13.9c2.7 1.7 6.1 2 8.8.5" stroke="#fbbf24" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  const data = iconPaths[icon];
  return (
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox={data.viewBox}
      className="h-[23px] w-[23px]" fill={icon === 'github' ? 'currentColor' : 'none'}
      stroke={icon === 'github' ? 'none' : 'currentColor'}
      strokeWidth={icon === 'github' ? undefined : 1.8}
      strokeLinecap="round" strokeLinejoin="round">
      <path d={data.path} />
    </svg>
  );
}

export default function Social() {
  const [message, setMessage] = useState('');
  async function copyQQ(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage('QQ 号码已复制');
    } catch {
      setMessage('复制失败，可从 QQ 图标的提示文字获取号码');
    }
  }

  return (
    <nav className="mt-8" aria-label="联系与博客">
      <ul className="flex flex-wrap items-center gap-3">
        {profile.social.map(item => (
          <li key={item.label}>
            {item.icon === 'qq' ? (
              <button type="button" className={iconClass}
                title={`QQ：${item.copyText}（点击复制）`}
                aria-label={`复制 QQ 号码 ${item.copyText}`}
                onClick={() => void copyQQ(item.copyText)}>
                <ContactIcon icon="qq" />
              </button>
            ) : item.icon === 'blog' ? (
              <Link className={iconClass} href={item.href} title="博客" aria-label="博客">
                <ContactIcon icon="blog" />
              </Link>
            ) : (
              <a className={iconClass} href={item.href} title={item.label} aria-label={item.label}
                {...(item.icon === 'github' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <ContactIcon icon={item.icon} />
              </a>
            )}
          </li>
        ))}
      </ul>
      <span role="status" aria-live="polite" className="sr-only">{message}</span>
    </nav>
  );
}
