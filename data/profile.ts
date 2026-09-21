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
};

export type WritingItem = {
  year: string;
  title: string;
  subtitle?: string;
  href?: string;
  summary?: string[];
  tags?: string[];
  image?: string;
  imageAlt?: string;
};

export const profile = {
  name: 'ZhangWex',
  title: '全过程工程造价工程师 · 投资控制顾问',
  tagline: '以严谨的工程技术逻辑，贯穿项目全生命周期的投资控制与价值创造。',
  email: 'zhangwex@outlook.com',

  // 正文支持 **加粗** 语法，会渲染成更亮的强调色。
  about: [
    '专注于**基础设施与工程建设领域的造价咨询与成本管理**，具有交通工程专业背景及公路、桥梁工程一线技术管理经历，现主要从事工程造价、工程修编、工程量复核及审计相关工作。',
    '坚持从**工程事实出发理解造价**，关注施工工艺、节点构造、设计图纸与计价依据之间的对应关系，以图纸大样穿透工程量与计价细节，以数据核查提升造价成果的准确性与可复核性。',
    '目前主要参与高速公路、跨海通道及市政道路等项目，涉及概预算修编、钢结构及专项工程造价、改扩建工程、清单计价与征地审计等工作。',
    '**从工程技术理解造价，从造价数据反映工程。**',
  ],

  // 「方向」区块：四条并列的专业定位。
  focus: [
    {
      title: '全过程工程造价管理',
      subtitle: 'Full-Process Cost Management',
      description: '围绕项目各阶段的造价控制与专业衔接。',
    },
    {
      title: '工程量计算与图纸复核',
      subtitle: 'Quantity Take-Off & Drawing Review',
      description: '基于设计图纸、工程量表及计算依据开展数据核查。',
    },
    {
      title: '预算、清单与结算审核',
      subtitle: 'Budget · BOQ · Settlement Review',
      description: '关注计量计价依据、计算逻辑及造价成果的完整性。',
    },
    {
      title: '专业复核与风险识别',
      subtitle: 'Review & Risk Identification',
      description: '通过证据核对和数据分析，识别造价工作中的潜在问题。',
    },
  ] satisfies FocusItem[],

  // 「方式」区块：把造价工作收成一条可解释、可复核的主线。
  method: [
    {
      step: '01',
      title: '界定',
      description: '从工程边界、合同责任和计价口径出发，明确工作的起点与参照。',
    },
    {
      step: '02',
      title: '结构化',
      description: '将设计意图、工程构造与计量规则转化为清晰的造价计算关系。',
    },
    {
      step: '03',
      title: '动态校准',
      description: '以计量、变更和合同执行为反馈，持续检查与修正成本数据。',
    },
    {
      step: '04',
      title: '闭环沉淀',
      description: '将计算、审核与依据归档衔接起来，形成可追溯、可交接的专业结论。',
    },
  ] satisfies MethodItem[],

  skills: [
    '全过程造价管理',
    '工程量计算与复核',
    '清单编制',
    '概预算审核',
    '结算审核',
    '投资控制',
    '造价智能化',
  ],

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
      '进入工程造价与咨询领域，主要开展工程量、计量计价及造价成果相关工作，逐步将工程技术经验延伸至全过程造价管理与成本控制。',
    tags: ['工程计量', '计量计价', '造价成果'],
  },
  {
    range: '2023 — 2025',
    title: '工程技术员',
    company: '保利长大第四分公司',
    summary:
      '参与公路与桥梁工程项目技术管理，主要涉及项目策划、场站临建、科研及桥面板预制管理，逐步形成从施工技术与工程实体理解项目的工作基础。',
    tags: ['技术管理', '场站临建', '桥面板预制'],
  },
  {
    range: '2019 — 2023',
    title: '交通工程专业',
    company: '哈尔滨工业大学',
    summary:
      '系统学习交通工程、道路与桥梁相关专业知识，建立工程识图、结构认知与工程技术基础。',
    tags: ['交通工程', '道路与桥梁'],
  },
];

export const projects: ProjectItem[] = [
  {
    title: '某高速公路概预算修编项目',
    summary:
      '参与高速公路概预算修编，围绕工程量、定额套用、材料价格及造价数据开展复核与分析，并参与造价成果审核。',
    tags: ['概预算', '工程量', '定额计价', '造价审核'],
  },
  {
    title: '某跨海通道钢结构造价修编项目',
    summary:
      '参与跨海通道钢结构工程造价工作，结合施工图及工程构造开展工程量复核、清单计价、材料价格及定额依据分析。',
    tags: ['钢结构', '工程计量', '清单计价', '造价分析'],
  },
  {
    title: '某跨海通道防火专项造价项目',
    summary:
      '参与防火专项工程造价工作，围绕工程内容、清单项目及计价依据进行核查，参与专项造价成果的整理与审核。',
    tags: ['专项工程', '清单计价', '造价审核'],
  },
  {
    title: '某高速公路改扩建造价项目',
    summary:
      '参与高速公路改扩建项目造价工作，开展工程量复核、清单编制与项目划分，并结合工程内容进行计价分析及造价文件调整。',
    tags: ['改扩建', '工程计量', '清单编制', '造价修编'],
  },
  {
    title: '某市政道路工程造价项目',
    summary:
      '参与市政道路人行道工程造价工作，根据设计图纸及工程内容开展工程量核查、清单计价及造价成果调整。',
    tags: ['市政道路', '工程计量', '清单计价', '造价修编'],
  },
  {
    title: '某高速公路征地审计项目',
    summary:
      '参与高速公路征地审计工作，围绕征地费用、相关资料及政策依据开展数据核对与资料审核，为审计成果提供基础支撑。',
    tags: ['征地审计', '费用核查', '资料审核', '审计支撑'],
  },
];

// 「分享」区块：技术文章或经验总结。留空数组则区块与导航项自动隐藏。
export const writing: WritingItem[] = [
  {
    year: '2026',
    title: '造价知识中枢（CostRAG）',
    tags: ['RAG', '知识库', '造价智能化'],
    summary: [
      '工程造价任务的核心特征是确定性检索与精确执行，而非开放性推理，通用大模型在此类任务中普遍存在检索误差、计算失准、格式失控等问题。为此，提出一种框架无关的造价领域知识库构建方法，遵循「不训练模型、不构建底座，仅构建挂载点与约束」的设计原则。',
      '系统采用四层架构：知识真源层（规范、方法与案例，附带来源锚点）、精确值层（定额与清单等结构化数据，支持脚本化查表）、任务书层（定义任务步骤与执行约束）、输出契约层（模板与 Schema 分离数据与格式，通过脚本完成填充）。核心设计包括：结构化数据独立于检索增强生成流程、公式统一由脚本生成以避免模型篡改、采用数据驱动布局替代传统表格控件、知识按需拆分并结构化入库。',
      '本方法将专业知识结构化、执行流程文件化、输出格式契约化，不依赖模型能力迭代，而是通过约束固化专业经验，使重复性造价工作具备可复现性与可靠性。',
    ],
  },
];

// 导航项与页面区块一一对应；隐藏区块时记得同步删掉这里的条目。
export const navLinks = [
  { id: 'about', label: '关于' },
  { id: 'focus', label: '方向' },
  { id: 'method', label: '方式' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '项目' },
  { id: 'writing', label: '分享' },
];
