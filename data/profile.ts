/**
 * 站点全部文案与链接都在这个文件里改，不需要碰组件。
 * 标注「待填」的地方是占位；数组留空则对应区块与导航项自动隐藏。
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'x' | 'mail';
};

export type FocusItem = {
  title: string;
  subtitle: string;
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
  href: string;
  image?: string;
  imageAlt?: string;
};

export const profile = {
  name: 'ZhangWex',
  title: '造价工程师',
  tagline: '成本咨询、合约管控，以及面向工程现场的智能化造价方法。',
  email: 'zhangwex@outlook.com',

  about: [
    '工程造价工程师，从事工程建设领域的造价咨询与成本管理工作，覆盖投资估算、概预算、工程量清单及招标控制价、过程计量与变更签证、竣工结算审核等环节。',
    '此前我在施工单位工作，参与过中山东环高速公路、狮子洋大桥 UHPC 桥面板预制等项目。现场那几年让我熟悉施工工艺与计量口径——知道一道工序在现场怎么发生、成本从哪些环节堆出来，回头判断一个数字合不合理，心里就有底。',
    '工作之余，我持续把智能化造价系统与自动化工具引入日常专业流程：让重复对量、表格搬运这类机械环节交给工具，把关键的判断留给人。',
  ],

  // 「方向」区块：四条并列的专业定位。
  focus: [
    {
      title: '全过程造价咨询',
      subtitle: 'Cost Consulting',
      description: '投资估算、招标控制价、过程计量与竣工结算审核的全链条参与。',
    },
    {
      title: '合约与变更管控',
      subtitle: 'Commercial Control',
      description: '合约与变更的经济性判断，进度款与签证口径的统一。',
    },
    {
      title: '工程语境判断',
      subtitle: 'Infrastructure Context',
      description: '在真实工程语境中读图、读量、读价，而不是只看表格。',
    },
    {
      title: '智能化造价',
      subtitle: 'Intelligent Costing',
      description: '规则沉淀、辅助算量与效率工具链的建设。',
    },
  ] satisfies FocusItem[],

  // 「方式」区块：把造价工作收成一条可解释、可复核的主线。
  method: [
    {
      step: '01',
      title: '界定',
      description: '明确投资边界、阶段目标与可比口径，形成后续工作的参照系。',
    },
    {
      step: '02',
      title: '结构化',
      description: '把设计意图转写成清单与控制价语言，保证计量规则可执行。',
    },
    {
      step: '03',
      title: '动态校准',
      description: '以计量、变更与合约执行为反馈环，持续校正成本轨迹。',
    },
    {
      step: '04',
      title: '闭环沉淀',
      description: '结算审核与依据归档并行，输出可交接、可追溯的结论。',
    },
  ] satisfies MethodItem[],

  skills: [
    '投资估算',
    '概预算编制',
    '工程量清单计价',
    '招标控制价',
    '变更与签证',
    '结算审核',
    '智能化造价',
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
    range: '20XX — 至今', // 待填：起始年份
    title: '造价工程师',
    company: '造价咨询单位', // 待填：单位全称
    summary:
      '承担平武高速、狮子洋钢构修编等项目的造价编制与修编工作，包括工程量复核、清单组价、材料价格取定与变更梳理，配合完成投资控制各阶段的成果文件。',
    tags: ['清单计价', '概预算编制', '造价修编'],
  },
  {
    range: '20XX — 20XX', // 待填：起止年份
    title: '造价与计量', // 待填：当时的岗位名称
    company: '施工单位', // 待填：单位全称
    summary:
      '在施工现场参与中山东环高速公路、狮子洋大桥 UHPC 桥面板预制等项目的造价与计量工作，熟悉施工工艺、工序成本构成与现场计量口径。',
    tags: ['现场计量', '工序成本', '工程量计算'],
  },
];

export const projects: ProjectItem[] = [
  {
    title: '中山东环高速公路',
    summary:
      '参与路基与桥梁工程的工程量计算及造价文件编制，处理施工阶段的计量与变更资料，体会现场工艺选择对成本的实际影响。',
    tags: ['高速公路', '工程量计算', '计量支付'],
  },
  {
    title: '狮子洋大桥 UHPC 桥面板预制',
    summary:
      '超高性能混凝土（UHPC）预制构件的造价工作：构件工程量计算、材料与配合比价格测算、预制场区的工序成本归集。',
    tags: ['UHPC', '预制构件', '成本测算'],
  },
  {
    title: '平武高速',
    summary:
      '在造价咨询单位参与平武高速项目的造价编制，围绕清单计价展开工程量复核、组价逻辑校验与阶段性成果整理。',
    tags: ['清单计价', '概预算', '造价咨询'],
  },
  {
    title: '狮子洋钢构修编',
    summary:
      '承担狮子洋项目钢结构部分的造价文件修编，核对钢结构工程量与计价依据，梳理设计变更对造价的传导关系。',
    tags: ['钢结构', '造价修编', '变更梳理'],
  },
];

// 没有文章就留空数组，首页会自动隐藏「文章」区块与对应导航。
export const writing: WritingItem[] = [];

// 导航项与页面区块一一对应；隐藏区块时记得同步删掉这里的条目。
export const navLinks = [
  { id: 'about', label: '关于' },
  { id: 'focus', label: '方向' },
  { id: 'method', label: '方式' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '项目' },
];
