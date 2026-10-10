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

const tileClass = 'flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/75 bg-slate-800/35 text-slate-300 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-teal-300/55 group-hover:bg-teal-300/10 group-hover:text-teal-200 group-focus-visible:border-teal-300 group-focus-visible:text-teal-200 motion-reduce:transform-none motion-reduce:transition-none';
const itemClass = 'group flex min-h-[77px] w-full flex-col items-center justify-start gap-2 rounded-xl text-center focus-visible:outline-none';
const labelClass = 'text-xs leading-5 text-slate-400 transition-colors group-hover:text-teal-200';

function ContactIcon({ icon }: { icon: SocialLink['icon'] }) {
  if (icon === 'qq') {
    return <span aria-hidden="true" className="font-mono text-[13px] font-extrabold tracking-[-0.08em]">QQ</span>;
  }
  const data = iconPaths[icon];
  return (
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={data.viewBox}
      className="h-[21px] w-[21px]"
      fill={icon === 'github' ? 'currentColor' : 'none'}
      stroke={icon === 'github' ? 'none' : 'currentColor'}
      strokeWidth={icon === 'github' ? undefined : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={data.path} />
    </svg>
  );
}

export default function Social() {
  const [qqNotice, setQqNotice] = useState('');
  const qq = profile.social.find(item => item.icon === 'qq');
  const qqNumber = qq?.icon === 'qq' ? qq.copyText : '';

  async function copyQQ(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setQqNotice('QQ 号码已复制');
    } catch {
      setQqNotice('无法自动复制，请手动选择下方号码');
    }
  }

  return (
    <div className="mt-9 max-w-[320px]" aria-label="联系与博客入口">
      <ul className="grid grid-cols-4 gap-2">
        {profile.social.map(item => (
          <li key={item.label} className="min-w-0">
            {item.icon === 'qq' ? (
              <button
                type="button"
                onClick={() => void copyQQ(item.copyText)}
                title={`复制 QQ 号码：${item.copyText}`}
                aria-label={`复制 QQ 号码 ${item.copyText}`}
                className={itemClass}
              >
                <span className={tileClass}><ContactIcon icon="qq" /></span>
                <span className={labelClass}>QQ</span>
              </button>
            ) : item.icon === 'blog' ? (
              <Link href={item.href} title="阅读博客" className={itemClass}>
                <span className={tileClass}><ContactIcon icon="blog" /></span>
                <span className={labelClass}>博客</span>
              </Link>
            ) : (
              <a
                href={item.href}
                title={item.label}
                className={itemClass}
                {...(item.icon === 'github' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className={tileClass}><ContactIcon icon={item.icon} /></span>
                <span className={labelClass}>{item.label}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
      {qqNumber && (
        <p className="mt-2 text-center text-xs leading-6 text-slate-400">
          QQ：<span className="select-all font-mono tabular-nums text-slate-300">{qqNumber}</span>
          <span className="ml-2 text-slate-500">点击图标复制</span>
        </p>
      )}
      <p role="status" aria-live="polite" className="min-h-5 text-center text-xs text-teal-300">
        {qqNotice}
      </p>
    </div>
  );
}
