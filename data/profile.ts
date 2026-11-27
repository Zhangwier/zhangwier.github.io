/**
 * Every piece of site copy and every link lives in this file; components stay untouched.
 * An empty array hides the matching section and its nav entry.
 */

export type SocialLink =
  | { label: string; href: string; icon: 'github' | 'mail' | 'blog' }
  | { label: string; icon: 'qq'; copyText: string };

export type FocusItem = {
  title: string;
  subtitle?: string;
  description: string;
};

export type MethodItem = {
  step: string;
  title: string;
  description: string;
};

export type ExperienceItem = {
  range: string;
  title: string;
  company: string;
  href?: string;
  summary: string;
  tags: string[];
};

export type ProjectItem = {
  title: string;
  href?: string;
  summary: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  badge?: string;
  category?: string;
  group?: 'Highway' | 'Sea Crossing' | 'Municipal';
  featured?: boolean;
  role?: string;
  approach?: string;
};

export const profile = {
  name: 'ZhangWex',
  title: 'Cost Engineering Consultant',
  tagline:
    'A transportation engineering background, now practising cost consulting — notes on the work and on independent technical practice.',
  email: 'zhangwex@outlook.com',

  // **Bold** markup renders as a brighter emphasis colour.
  about: [
    'Trained in transportation engineering, I worked in highway and bridge construction technical management at Poly Changda’s Fourth Branch, and now practise **cost engineering consulting** at Jiangsu Jiaozhi (Gude Shuzhi). I have taken part in estimate and budget revisions, specialist cost engineering, and cost reviews for expressway, sea-crossing and municipal road projects.',
  ],
  // Business lines follow the cost-engineering stages I actually work in; digital
  // research is not presented as a peer business line.
  focus: [
    {
      title: 'Quantity take-off and verification',
      description:
        'Reading construction drawings, confirming scope, computing and re-checking quantities.',
    },
    {
      title: 'Bills of quantities and estimates',
      description:
        'Preparing bills of quantities, compiling and revising estimates and budgets, checking quota and price references.',
    },
    {
      title: 'Cost review and deliverable audit',
      description:
        'Reviewing quantities and pricing outputs, checking specialist charges, and documenting review variances and findings.',
    },
  ] satisfies FocusItem[],

  // Professional judgement: measurement basis, pricing applicability, review evidence.
  method: [
    {
      step: '01',
      title: 'Measurement basis',
      description:
        'Quantities must agree with the applicable drawings, measurement rules and contract terms; an aggregate figure cannot replace checking its sources.',
    },
    {
      step: '02',
      title: 'Pricing applicability',
      description:
        'Bill items and quota sub-items serve different purposes; work content, site conditions, units of measurement and the price date all need checking.',
    },
    {
      step: '03',
      title: 'Review evidence',
      description:
        'Any finding on a quantity, price or charge difference should trace back to a document version, a specific reference and the calculation worksheet.',
    },
  ] satisfies MethodItem[],

  skills: ['Drawing take-off', 'Cost engineering', 'Digital cost workflows'],
  social: [
    { label: 'GitHub', href: 'https://github.com/Zhangwier', icon: 'github' },
    { label: 'Email', href: 'mailto:zhangwex@outlook.com', icon: 'mail' },
    { label: 'Writing', href: '/blog/', icon: 'blog' },
    { label: 'QQ', icon: 'qq', copyText: '257454554' },
  ] satisfies SocialLink[],

  // Drop a CV at public/resume.pdf and set this to '/resume.pdf'; leave empty to hide the link.
  resumeHref: '',
};

export const experience: ExperienceItem[] = [
  {
    range: '2026 — Present',
    title: 'Cost Engineer',
    company: 'Jiangsu Jiaozhi (Gude Shuzhi)',
    summary:
      'Cost engineering consulting: estimate and budget revisions, cost compilation and review.',
    tags: ['Measurement', 'Pricing', 'Cost deliverables'],
  },
  {
    range: '2023 — 2025',
    title: 'Engineering Technician',
    company: 'Poly Changda, Fourth Branch',
    summary:
      'Technical management on highway and bridge construction, covering project planning, site plant and temporary works, technical research and precast deck panels.',
    tags: ['Technical management', 'Site works', 'Precast panels'],
  },
  {
    range: '2019 — 2023',
    title: 'Transportation Engineering',
    company: 'Harbin Institute of Technology',
    summary:
      'Coursework in transportation engineering, roads and bridges, engineering drawing interpretation and related engineering subjects.',
    tags: ['Transportation', 'Roads and bridges'],
  },
];

export const projects: ProjectItem[] = [
  {
    title: 'Expressway estimate and budget revision',
    group: 'Highway',
    summary:
      'Estimate and budget revision for an expressway, covering designed quantities, quota references and material prices.',
    tags: ['Estimate', 'Quantities', 'Quota pricing', 'Cost review'],
    category: 'Highway · Estimate',
    featured: true,
    role: 'Verified quantities, applied quota items and analysed material prices; took part in the cost review.',
    approach: 'Checked work content and pricing conditions against design documents, pricing rules and price references.',
    image: '/images/project-highway-study.svg',
    imageAlt: 'Abstract study of road curves and route lines, not an actual engineering drawing',
  },
  {
    title: 'Sea-crossing steel structure cost revision',
    group: 'Sea Crossing',
    summary:
      'Cost revision for the steel structures of a sea crossing, focused on how structural detailing maps to bill measurement and pricing rules.',
    tags: ['Steel structures', 'Measurement', 'Bill pricing', 'Cost analysis'],
    category: 'Steel structures · Cost revision',
    featured: true,
    role: 'Drawing take-off, bill pricing, and checks on material prices and quota references.',
    approach: 'Analysed work content and pricing conditions against construction drawings, detailing requirements and applicable quotas.',
    image: '/images/project-steel-study.svg',
    imageAlt: 'Abstract geometric study of a steel structure, not an actual engineering drawing',
  },
  {
    title: 'Sea-crossing fire protection specialist cost',
    group: 'Sea Crossing',
    category: 'Specialist works · Fire protection',
    summary:
      'Compilation and review of specialist fire protection costs for a sea crossing, checking scope, bill items and the relevant pricing references.',
    tags: ['Specialist works', 'Bill pricing', 'Cost review'],
  },
  {
    title: 'Expressway widening and reconstruction cost',
    group: 'Highway',
    category: 'Highway · Widening',
    summary:
      'Cost compilation and revision for an expressway widening scheme, involving drawing take-off, bill item breakdown, pricing analysis and cost document updates.',
    tags: ['Widening', 'Measurement', 'Bill preparation', 'Cost revision'],
  },
  {
    title: 'Municipal road cost',
    group: 'Municipal',
    category: 'Municipal road · Measurement and pricing',
    summary:
      'Cost work on municipal road footways, verifying quantities from design drawings and updating bill pricing and cost documents.',
    tags: ['Municipal roads', 'Measurement', 'Bill pricing', 'Cost revision'],
  },
  {
    title: 'Expressway land acquisition cost review',
    group: 'Highway',
    category: 'Land acquisition · Cost verification',
    summary:
      'Review of expressway land acquisition costs, checking compensation records, cost data and the relevant policy references to support the review findings.',
    tags: ['Land acquisition', 'Cost verification', 'Document review', 'Audit support'],
  },
];

// Articles now live in the independent /blog/ reading space; the home page no longer lists them.

// Nav entries map one-to-one to page sections; remove an entry when hiding its section.
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Practice' },
];
