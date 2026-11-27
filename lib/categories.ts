/**
 * Category vocabulary shared by build-time post parsing and the client-side
 * blog explorer. Kept free of any Node import so the client bundle can use it.
 *
 * Storage keys stay Chinese because the Markdown frontmatter is written in
 * Chinese; only the labels shown in the interface are English.
 */

export type PostCategory = '人工智能' | '工程造价' | '技术实践' | '观点与思考';

export const POST_CATEGORIES: PostCategory[] = ['人工智能', '工程造价', '技术实践', '观点与思考'];

export const CATEGORY_LABELS: Record<PostCategory, string> = {
  人工智能: 'AI',
  工程造价: 'Cost engineering',
  技术实践: 'Technical practice',
  观点与思考: 'Essays',
};

export function categoryLabel(category: PostCategory): string {
  return CATEGORY_LABELS[category];
}
