import type { MetadataRoute } from 'next';

// Required for GitHub Pages static export (Next.js 15 metadata routes).
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://zhangwier.github.io/sitemap.xml',
  };
}
