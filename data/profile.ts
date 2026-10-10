/**
 * 站点全部文案与链接都在这个文件里改，不需要碰组件。
 * 数组留空则对应区块与导航项自动隐藏。
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
  group?: '公路工程' | '跨海通道工程' | '市政工程';
  featured?: boolean;
  role?: string;
  approach?: string;
};

export const profile = {
  name: 'ZhangWex',
  title: '造价',
  tagline: '公路、桥梁及市政基础设施工程。',
  email: 'zhangwex@outlook.com',

  // 正文支持 **加粗** 语法，会渲染成更亮的强调色。
  about: [
    '现从事**基础设施工程造价咨询**，参与施工图工程数量核对、工程量清单编制、概预算修编及造价成果审核。此前曾参与公路、桥梁工程的施工现场技术管理。',
    '项目经历涵盖高速公路改扩建、跨海通道钢结构及专项工程、市政道路和征地费用审核。另开展工程造价资料结构化与 AI 辅助检索的个人技术研究，相关系统仍处于探索与验证阶段。',
  ],
  // 业务内容按实际参与的造价工作环节划分；数字化研究不作为同级业务。
  focus: [
    { title: '工程计量与数量核对', description: '施工图识读、工程范围核对、工程数量计算及复核。' },
    { title: '清单与概预算编制', description: '工程量清单编制、概预算编制与修编、定额及价格依据核对。' },
    { title: '造价核查与成果审核', description: '工程量与计价成果核查、专项费用核对、审核差异及意见整理。' },
  ] satisfies FocusItem[],

  // 专业判断：计量口径、计价适用性与审核依据。
  method: [
    {
      step: '01',
      title: '计量口径',
      description: '工程量取值应与适用图纸、计量规则及合同约定相一致；汇总数量不能代替来源核对。',
    },
    {
      step: '02',
      title: '计价适用性',
      description: '清单项目与定额子目用途不同，需核对工程内容、施工条件、计量单位及价格资料时点。',
    },
    {
      step: '03',
      title: '审核依据',
      description: '数量、计价及费用差异的核查意见，应能够回溯至文件版本、具体依据与计算底稿。',
    },
  ] satisfies MethodItem[],

  skills: ['算量识图', '工程造价', '造价数字化'],
  social: [
    { label: 'GitHub', href: 'https://github.com/Zhangwier', icon: 'github' },
    { label: '邮箱', href: 'mailto:zhangwex@outlook.com', icon: 'mail' },
    { label: '博客', href: '/blog/', icon: 'blog' },
    { label: 'QQ', icon: 'qq', copyText: '257454554' },
  ] satisfies SocialLink[],

  // 有简历 PDF 就放到 public/resume.pdf，然后改成 '/resume.pdf'；留空则不显示入口。
  resumeHref: '',
};

export const experience: ExperienceItem[] = [
  {
    range: '2026 — 至今',
    title: '造价员',
    company: '江苏交咨（谷德数智）',
    summary:
      '从事基础设施工程造价咨询，参与施工图识读、工程数量计算、清单计价、概预算修编及造价成果核查等工作。',
    tags: ['工程计量', '计量计价', '造价成果'],
  },
  {
    range: '2023 — 2025',
    title: '工程技术员',
    company: '保利长大第四分公司',
    summary:
      '参与公路、桥梁工程施工技术管理，涉及项目策划、场站临建、技术科研及桥面板预制相关工作。',
    tags: ['技术管理', '场站临建', '桥面板预制'],
  },
  {
    range: '2019 — 2023',
    title: '交通工程专业',
    company: '哈尔滨工业大学',
    summary:
      '学习交通工程及道路、桥梁相关专业课程，接受工程识图、交通基础设施与工程技术方面的系统训练。',
    tags: ['交通工程', '道路与桥梁'],
  },
];

export const projects: ProjectItem[] = [
  {
    title: '高速公路概预算修编',
    group: '公路工程',
    summary:
      '高速公路工程概预算修编，涉及设计工程数量、定额依据及材料价格等计价要素。',
    tags: ['概预算', '工程量', '定额计价', '造价审核'],
    category: '公路工程 · 概预算',
    featured: true,
    role: '工程数量核查、定额套用与材料价格分析，并参与造价成果审核。',
    approach: '依据设计文件、计价规定及价格资料核对工程内容与计价条件。',
    image: '/images/project-highway-study.svg',
    imageAlt: '抽象道路曲线与路线研究线稿，非真实工程图纸',
  },
  {
    title: '跨海通道钢结构造价修编',
    group: '跨海通道工程',
    summary:
      '跨海通道钢结构造价修编，重点关注结构构造与清单计量、计价规则的对应关系。',
    tags: ['钢结构', '工程计量', '清单计价', '造价分析'],
    category: '钢结构 · 造价修编',
    featured: true,
    role: '算量识图、清单计价及材料价格、定额依据核查。',
    approach: '结合施工图、构造要求和适用定额分析工程内容及计价条件。',
    image: '/images/project-steel-study.svg',
    imageAlt: '抽象钢结构几何线稿，非真实工程图纸',
  },
  {
    title: '跨海通道防火专项工程造价',
    group: '跨海通道工程',
    category: '专项工程 · 防火',
    summary:
      '参与跨海通道防火专项造价编制与审核，核对工程范围、清单项目及相关计价依据。',
    tags: ['专项工程', '清单计价', '造价审核'],
  },
  {
    title: '高速公路改扩建工程造价',
    group: '公路工程',
    category: '公路工程 · 改扩建',
    summary:
      '参与高速公路改扩建工程造价编制与修编，涉及算量识图、清单项目划分、计价分析及造价文件调整。',
    tags: ['改扩建', '工程计量', '清单编制', '造价修编'],
  },
  {
    title: '市政道路工程造价',
    group: '市政工程',
    category: '市政道路 · 计量计价',
    summary:
      '参与市政道路人行道工程造价工作，依据设计图纸开展工程数量核查、清单计价及造价文件调整。',
    tags: ['市政道路', '工程计量', '清单计价', '造价修编'],
  },
  {
    title: '高速公路征地费用审核',
    group: '公路工程',
    category: '征地审计 · 费用核查',
    summary:
      '参与高速公路征地费用审核，核对补偿资料、费用数据及相关政策依据，协助形成审核意见。',
    tags: ['征地审计', '费用核查', '资料审核', '审计支撑'],
  },
];

// 文章已经迁至独立的 /blog/ 阅读区域，首页不再展示文章列表。

// 导航项与页面区块一一对应；隐藏区块时记得同步删掉这里的条目。
export const navLinks = [
  { id: 'about', label: '关于' },
  { id: 'projects', label: '工程项目' },
  { id: 'experience', label: '经历' },
  { id: 'research', label: '技术实践' },
];
