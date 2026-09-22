import Link from 'next/link';
import { formatDate, getAllPostMetas } from '@/lib/posts';
import SectionHeading, { ExternalIcon, HoverCard, TagList, sectionClass } from '@/components/SectionKit';

/** 首页只放最近几篇，其余走 /blog 列表。 */
const HOME_POST_COUNT = 3;

export default function Writing() {
  const all = getAllPostMetas();
  if (all.length === 0) return null;

  const posts = all.slice(0, HOME_POST_COUNT);

  return (
    <section id="writing" className={sectionClass} aria-label="分享">
      <SectionHeading>分享</SectionHeading>

      <ul className="group/list">
        {posts.map(post => (
          <li key={post.slug} className="mb-12">
            <HoverCard>
              {/* 文字跨满整行：分享内容以长文为主，不放缩略图 */}
              <div className="z-10 sm:col-span-8">
                <time
                  dateTime={post.date}
                  className="text-xs font-semibold uppercase tracking-widest text-slate-500"
                >
                  {formatDate(post.date)}
                </time>

                <h3 className="mt-2 font-medium leading-snug text-slate-200">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/link inline-flex items-baseline text-base font-medium leading-tight text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
                  >
                    {/* 让整条卡片都可点，而不是只有文字 */}
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                    <span>
                      {post.title}
                      <ExternalIcon />
                    </span>
                  </Link>
                </h3>

                {post.summary && <p className="mt-3 text-sm leading-normal">{post.summary}</p>}

                {post.tags.length > 0 && <TagList tags={post.tags} />}
              </div>
            </HoverCard>
          </li>
        ))}
      </ul>

      {all.length > HOME_POST_COUNT && (
        <Link
          href="/blog"
          className="mt-2 inline-flex items-center text-sm font-medium text-slate-200 transition-colors hover:text-teal-300 focus-visible:text-teal-300"
        >
          查看全部 {all.length} 篇
          <ExternalIcon />
        </Link>
      )}
    </section>
  );
}
