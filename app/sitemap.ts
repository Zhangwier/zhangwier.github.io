import type { MetadataRoute } from 'next';
import { getAllPostMetas } from '@/lib/posts';

const siteUrl = 'https://zhangwier.github.io';

// Required for GitHub Pages static export (Next.js 15 metadata routes).
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/blog/` },
    ...getAllPostMetas().map(post => ({ url: `${siteUrl}/blog/${post.slug}/` })),
  ];
}
