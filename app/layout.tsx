import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import { profile } from '@/data/profile';

const siteUrl = 'https://zhangwier.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: profile.name,
  description: profile.tagline,
  applicationName: profile.name,
  alternates: { canonical: '/' },
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }] },
  openGraph: {
    title: profile.name,
    description: profile.tagline,
    type: 'website',
    url: '/',
    siteName: profile.name,
    locale: 'zh_CN',
    images: [{
      url: '/og-cover.png',
      width: 1200,
      height: 630,
      alt: 'ZhangWex 个人主页：工程造价咨询',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.name,
    description: profile.tagline,
    images: ['/og-cover.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900">
        {children}
      </body>
    </html>
  );
}
