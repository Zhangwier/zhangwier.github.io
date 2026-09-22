# ZhangWex · 造价工程师个人主页

个人主页 + Markdown 博客。左栏固定(sticky)放名字、职称、简介与页内导航,右侧滚动展示关于、方向、方式、经历、项目、分享。
跟随鼠标的蓝色光斑由一层 `radial-gradient` 实现,没有 canvas 也没有 WebGL。

技术栈:**Next.js(App Router,静态导出)+ Tailwind CSS + TypeScript**。

## 写一篇文章

在 `content/posts/` 下新建一个 `.md` 文件,**文件名就是网址路径**:`costrag.md` → `/blog/costrag/`。

```markdown
---
title: 文章标题
date: 2026-09-21
tags: [造价智能化, RAG]
summary: 一句话摘要,显示在列表页和首页。
---

正文用 Markdown 写,支持**加粗**、表格、列表、引用、代码块。
```

frontmatter 四个字段都可省:缺 `title` 就用文件名,缺 `summary`/`tags` 就不显示。

排序按 `date` 倒序。首页「分享」区块自动显示最新 3 篇,全部文章在 `/blog`。

## 改个人信息

`data/profile.ts` 集中了首页文案与链接——名字、职称、简介段落、专业方向、工作方式、技能、社交链接、经历、项目。
改完保存即可,不需要动 `components/` 里的组件。

| 区块 | 数据字段 | 留空时 |
| --- | --- | --- |
| 关于 | `profile.about[]`、`profile.skills[]` | 段落照常渲染,标签隐藏 |
| 方向 | `profile.focus[]` | 区块与导航项自动隐藏 |
| 方式 | `profile.method[]` | 区块与导航项自动隐藏 |
| 经历 | `experience[]` | 恒显示 |
| 项目 | `projects[]` | 恒显示 |
| 分享 | `content/posts/` 下的 Markdown | 没有文章时区块与导航项自动隐藏 |

`profile.about[]` 里可以用 `**加粗**`,会渲染成更亮的强调色。

隐藏某个区块时,记得同步删掉文件底部 `navLinks` 里的对应条目。

## 本地开发

```bash
npm install
npm run dev          # http://localhost:3000
```

## 构建

```bash
npm run build        # 产物在 out/,纯静态文件
```

本地预览构建结果:

```bash
npx serve out
```

## 部署

把改动提交并推送到 `main`,GitHub Actions 会自动构建发布,约 1 分钟后生效。仓库根目录的 `update.cmd` 是一键脚本:

```
update.cmd "改了某某内容"
```

**Settings → Pages → Build and deployment → Source** 已设为 **GitHub Actions**(对应 API 里的 `build_type: workflow`)。

> 别把它改回「Deploy from a branch」。改回去之后,Pages 会用 Jekyll 去渲染 `README.md`,
> 构建出一个主题页面盖在站点上——现象是打开网址看到的是这份 README 的网页版,而不是个人主页。
> 改回「GitHub Actions」并重新推送一次即可恢复。

工作流会自动判断仓库类型:

- 仓库名是 `<用户名>.github.io`(即本站,`zhangwier.github.io`) → 部署到域名根路径
- 其他仓库名 → 自动加上 `/<仓库名>` 前缀

用自己的域名时,在 `public/` 放一个 `CNAME` 文件写上域名即可。

## 目录结构

```
app/
  layout.tsx          全局外壳:字体、<body> 背景与文字色
  page.tsx            首页:左栏 + 右侧各区块
  globals.css         Tailwind 入口、全局样式、Markdown 正文排版(.post-body)
  blog/
    page.tsx          文章列表页
    [slug]/page.tsx   文章页(居中窄栏)
components/
  Spotlight.tsx       鼠标跟随光斑(rAF 节流,触摸设备与 prefers-reduced-motion 下自动关闭)
  Sidebar.tsx         左栏:名字、职称、简介、导航、社交
  Nav.tsx             页内跳转导航,滚动时自动高亮当前区块
  Social.tsx          社交图标
  SectionKit.tsx      区块外壳、标题、标签、列表悬停效果
  sections/           About / Focus / Method / Experience / Projects / Writing
  Footer.tsx          页脚
content/
  posts/              文章(Markdown + frontmatter)
lib/
  posts.ts            文章读取层:扫描、解析 frontmatter、渲染、排序
data/
  profile.ts          首页内容(改这里)
```

## 想调外观

- **光斑颜色/半径**:`components/Spotlight.tsx` 里的 `radial-gradient`。注意这层必须保持 `fixed` 定位——它用视口坐标(`clientX/clientY`)定位,改成 `absolute` 会出现"滚动后光斑跟不上鼠标"的错位。
- **主色调**:`<body>` 上的 `bg-slate-900` / `text-slate-400`,高亮用 `teal-300`。
- **左右栏宽度**:左栏 `lg:w-[48%]`、右栏 `lg:w-[52%]`,分别在 `Sidebar.tsx` 和 `page.tsx`。
- **正文排版**:`app/globals.css` 里的 `.post-body` 一节。文章页宽度是 `max-w-3xl`。
- **文章列表页宽度**:`app/blog/page.tsx` 里的 `max-w-3xl`。

## 动效与可访问性

- 悬停时同一列表内其他条目变暗、当前条目浮出半透明卡片:靠父级 `group/list` 与子级 `group-hover/list` 命名分组实现。
- 所有动画都带 `motion-reduce:` 变体,遵循系统的「减少动态效果」设置。
- 触摸设备上不渲染光斑,避免无意义的合成开销。

## 备注

- `npm run build` 与 `npm run dev` 会共用 `.next` 目录,不要同时跑,否则 dev server 会挂。
- 文章在构建期被渲染成静态 HTML,所以新增文章必须重新构建(`update.cmd` 会做这件事)。
