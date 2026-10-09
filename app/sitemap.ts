import type { MetadataRoute } from 'next';
import { getAllPostMetas } from '@/lib/posts';

const siteUrl = 'https://zhangwier.github.io';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    { url: `${siteUrl}/blog/` },
    ...getAllPostMetas().map(post => ({ url: `${siteUrl}/blog/${post.slug}/` })),
  ];
}
