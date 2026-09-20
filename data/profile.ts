/**
 * 站点全部文案与链接都在这个文件里改，不需要碰组件。
 * 标注「待填」的地方是占位，替换成真实信息即可；留空字符串则对应元素自动隐藏。
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'x' | 'mail';
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
  name: 'zhangwei',
  title: '造价工程师',
  tagline: '公路与桥梁工程造价。做过施工现场，也做过造价咨询，习惯用可核对的依据把工程的价值讲清楚。',
  email: 'zhangwex@outlook.com',

  about: [
    '我是 zhangwei，公路与桥梁工程造价工程师。目前在造价咨询单位工作，主要围绕高速公路与特大桥项目开展造价文件的编制、修编与复核。',
    '此前我在施工单位，参与过中山东环高速公路、狮子洋大桥 UHPC 桥面板预制等项目。那几段现场经历让我熟悉施工工艺与计量口径——知道一道工序在现场是怎么发生的、成本是由哪些环节堆出来的，回头做造价时，判断一个数字合不合理就有了着力点。',
    '现在的工作更多落在清单计价与投资控制上：结合标段划分把概算分解到单位工程，复核工程量清单，校验材料价格与组价逻辑，梳理变更对造价的影响。我把它看成同一件事——用经得起追问的依据，把工程该有的价值说清楚。',
  ],

  // 留一两条你最愿意被问到的方向即可，不必求全。
  skills: ['公路工程概预算', '桥梁工程量计算', '工程量清单计价', '变更与索赔', '造价文件复核', '钢结构与 UHPC 造价'],

  social: [
    { label: 'GitHub', href: 'https://github.com/zhangwier', icon: 'github' },
    { label: '邮箱', href: 'mailto:zhangwex@outlook.com', icon: 'mail' },
  ] satisfies SocialLink[],

  // 有简历 PDF 就放到 public/resume.pdf，然后改成 '/resume.pdf'；留空则不显示这个入口。
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

// 导航项与上面的区块一一对应，隐藏区块时记得同步删掉这里的条目。
export const navLinks = [
  { id: 'about', label: '关于' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '项目' },
];
