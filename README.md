# ZhangWex · 造价工程师个人主页

单页个人站。左栏固定(sticky)放名字、职称、简介与页内导航，右侧滚动展示关于、方向、方式、经历、项目。
跟随鼠标的蓝色光斑由一层 `radial-gradient` 实现，没有 canvas 也没有 WebGL。

技术栈:**Next.js(App Router，静态导出)+ Tailwind CSS + TypeScript**。

## 改内容只看一个文件

**`data/profile.ts`** 集中了全部文案与链接——名字、职称、简介段落、专业方向、工作方式、技能、社交链接、经历、项目、文章。
改完保存即可，不需要动 `components/` 里的任何组件。

区块与数据字段的对应关系:

| 区块 | 数据字段 | 留空时 |
| --- | --- | --- |
| 关于 | `profile.about[]`、`profile.skills[]` | 段落照常渲染，标签隐藏 |
| 方向 | `profile.focus[]` | 区块与导航项自动隐藏 |
| 方式 | `profile.method[]` | 区块与导航项自动隐藏 |
| 经历 | `experience[]` | 恒显示 |
| 项目 | `projects[]` | 恒显示 |
| 文章 | `writing[]` | 空数组时区块与导航项自动隐藏 |

隐藏某个区块时，记得同步删掉文件底部 `navLinks` 里的对应条目。

## 本地开发

```bash
npm install
npm run dev          # http://localhost:3000
```

## 构建

```bash
npm run build        # 产物在 out/，纯静态文件
```

本地预览构建结果:

```bash
npx serve out
```

## 部署

仓库里已放好 `.github/workflows/deploy.yml`，推送到 `main` 就会自动构建并发布。

**Settings → Pages → Build and deployment → Source** 已设为 **GitHub Actions**（对应 API 里的 `build_type: workflow`）。

> 别把它改回「Deploy from a branch」。改回去之后，Pages 会用 Jekyll 去渲染 `README.md`，
> 构建出一个主题页面盖在站点上——现象是打开网址看到的是这份 README 的网页版，而不是个人主页。
> 改回「GitHub Actions」并重新推送一次即可恢复。

工作流会自动判断仓库类型:

- 仓库名是 `<用户名>.github.io`(即本站，`zhangwier.github.io`) → 部署到域名根路径
- 其他仓库名 → 自动加上 `/<仓库名>` 前缀

用自己的域名时，在 `public/` 放一个 `CNAME` 文件写上域名即可。

## 目录结构

```
app/
  layout.tsx          全局外壳:字体、<body> 背景与文字色
  page.tsx            首页:左栏 + 右侧各区块
  globals.css         Tailwind 入口与少量全局样式
components/
  Spotlight.tsx       鼠标跟随光斑(rAF 节流，触摸设备与 prefers-reduced-motion 下自动关闭)
  Sidebar.tsx         左栏:名字、职称、简介、导航、社交
  Nav.tsx             页内跳转导航，滚动时自动高亮当前区块
  Social.tsx          社交图标
  SectionKit.tsx      区块外壳、标题、标签、列表悬停效果
  sections/           About / Focus / Method / Experience / Projects / Writing
  Footer.tsx          页脚
data/
  profile.ts          全站内容(改这里)
```

## 想调外观

- **光斑颜色/半径**:`components/Spotlight.tsx` 里的 `radial-gradient`。
- **主色调**:`<body>` 上的 `bg-slate-900` / `text-slate-400`，高亮用 `teal-300`。
- **左右栏宽度**:左栏 `lg:w-[48%]`、右栏 `lg:w-[52%]`，分别在 `Sidebar.tsx` 和 `page.tsx`。

## 动效与可访问性

- 悬停时同一列表内其他条目变暗、当前条目浮出半透明卡片:靠父级 `group/list` 与子级 `group-hover/list` 命名分组实现。
- 所有动画都带 `motion-reduce:` 变体，遵循系统的「减少动态效果」设置。
- 触摸设备上不渲染光斑，避免无意义的合成开销。

## 备注

`npm run build` 与 `npm run dev` 会共用 `.next` 目录，不要同时跑，否则 dev server 会挂。
