/**
 * 站点全部文案与链接都在这个文件里改，不需要碰组件。
 * 数组留空则对应区块与导航项自动隐藏。
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'x' | 'mail';
};

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
  featured?: boolean;
  role?: string;
  approach?: string;
};

export const profile = {
  name: 'ZhangWex',
  title: '交通工程背景 · 工程造价与数字化实践',
  tagline: '立足交通基础设施工程，关注算量识图、计量计价及数字化技术的专业应用。',
  email: 'zhangwex@outlook.com',

  // 正文支持 **加粗** 语法，会渲染成更亮的强调色。
  about: [
    '具有**交通工程专业背景**及公路、桥梁工程现场技术管理经历，现从事基础设施工程造价咨询相关工作。',
    '工作内容涉及**算量识图、概预算修编、工程量清单编制及计量计价**，参与过公路改扩建、跨海通道钢结构与专项工程、市政道路及征地费用审核等项目。',
    '重视设计图纸、工程构造、施工条件与计量计价依据之间的对应关系，注重计算逻辑、数据来源和造价成果的准确性与可追溯性。',
    '同时开展**人工智能在工程造价领域的应用探索**，关注专业知识检索、结构化数据处理及 AI 辅助业务流程的实践与验证。',
  ],
  // 「方向」区块：四条并列的专业定位。
  focus: [
    {
      title: '算量识图与工程计量',
      subtitle: 'Drawing Interpretation & Quantity Takeoff',
      description: '设计图纸识读、工程构造分析、工程数量计算及计量规则应用。',
    },
    {
      title: '概预算与清单计价',
      subtitle: 'Cost Estimation & BOQ',
      description: '概预算编制与修编、工程量清单编制、定额套用及计价依据分析。',
    },
    {
      title: '造价审核与费用核查',
      subtitle: 'Cost Review & Verification',
      description: '工程数量与计价成果核查、专项工程造价分析及征地费用审核。',
    },
    {
      title: '工程造价数字化实践',
      subtitle: 'Digital Cost Engineering',
      description: '专业知识检索、数据结构化与 AI 辅助业务工作流的探索。',
    },
  ] satisfies FocusItem[],

  // 「理念」区块：三条简洁的专业认识。
  method: [
    {
      step: '01',
      title: '工程导向',
      description: '立足工程实际，结合设计图纸、结构构造与施工工艺，理解工程数量及造价形成逻辑。',
    },
    {
      step: '02',
      title: '严谨求实',
      description: '坚持以规范标准和计价依据为基础，注重计算准确性、成果合理性与过程可追溯性。',
    },
    {
      step: '03',
      title: '技术创新',
      description: '关注数字化与人工智能技术在工程造价领域的应用，探索专业工作方法的持续改进。',
    },
  ] satisfies MethodItem[],

  skills: ['算量识图', '工程造价', '造价数字化'],
  social: [
    { label: 'GitHub', href: 'https://github.com/Zhangwier', icon: 'github' },
    { label: '邮箱', href: 'mailto:zhangwex@outlook.com', icon: 'mail' },
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
    title: '某高速公路概预算修编项目',
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
    title: '某跨海通道钢结构造价修编项目',
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
    title: '某跨海通道防火专项造价项目',
    category: '专项工程 · 防火',
    summary:
      '参与跨海通道防火专项造价编制与审核，核对工程范围、清单项目及相关计价依据。',
    tags: ['专项工程', '清单计价', '造价审核'],
  },
  {
    title: '某高速公路改扩建造价项目',
    category: '公路工程 · 改扩建',
    summary:
      '参与高速公路改扩建工程造价编制与修编，涉及算量识图、清单项目划分、计价分析及造价文件调整。',
    tags: ['改扩建', '工程计量', '清单编制', '造价修编'],
  },
  {
    title: '某市政道路工程造价项目',
    category: '市政道路 · 计量计价',
    summary:
      '参与市政道路人行道工程造价工作，依据设计图纸开展工程数量核查、清单计价及造价文件调整。',
    tags: ['市政道路', '工程计量', '清单计价', '造价修编'],
  },
  {
    title: '某高速公路征地审计项目',
    category: '征地审计 · 费用核查',
    summary:
      '参与高速公路征地费用审核，核对补偿资料、费用数据及相关政策依据，协助形成审核意见。',
    tags: ['征地审计', '费用核查', '资料审核', '审计支撑'],
  },
];

// 「分享」区块的内容不再写在这里：文章是 content/posts/ 下的 Markdown 文件，
// 由 lib/posts.ts 在构建期读取，首页自动显示最新几篇。

// 导航项与页面区块一一对应；隐藏区块时记得同步删掉这里的条目。
export const navLinks = [
  { id: 'about', label: '关于' },
  { id: 'focus', label: '方向' },
  { id: 'method', label: '理念' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '项目' },
  { id: 'writing', label: '分享' },
];
