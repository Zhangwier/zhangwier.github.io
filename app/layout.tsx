import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import './globals.css';
import { profile } from '@/data/profile';

export const metadata: Metadata = {
  title: profile.name,
  description: profile.tagline,
  openGraph: {
    title: profile.name,
    description: profile.tagline,
    type: 'website',
  },
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
