# ZhangWex · 个人主页与独立博客

同一 GitHub Pages 网站内的两个阅读区域，共用一个 Next.js 仓库和一套部署：

- `/`：专业个人主页。关于、专业方向、工作理念、工作经历、工程项目与技术实践。只保留通往博客的入口，不再嵌入文章列表。
- `/blog/`：独立博客首页。精选文章、主题筛选、关键词搜索与文章归档。
- `/blog/<slug>/`：文章阅读页。保留目录、配图、正文内容和稳定的历史 URL。

技术栈：Next.js App Router、Tailwind CSS、TypeScript；使用 GitHub Actions 静态构建与 GitHub Pages 部署。

## 发布文章

在 `content/posts/` 新建 Markdown 文件，文件名即 URL 中的 slug。

```yaml
---
title: 文章标题
date: 2026-10-10
tags: [人工智能, 技术学习]
summary: 文章内容的简洁摘要。
category: 人工智能
cover: /images/your-article-cover.svg
featured: false
---
```

`category` 可用值：`人工智能`、`工程造价`、`技术实践`、`观点与思考`。建议每篇显式指定；旧文章若没有该字段会按标签推测归类。

`cover` 为可选项，使用 `public/images/` 中的本地 SVG/PNG/WebP 图片，并写成 `/images/xxx.svg` 路径。文章配图也应放在 `public/images/`。

`featured: true` 表示博客首页的精选文章。如果有多个，按发布日期排序后的第一篇优先；没有指定时自动选择最新文章。栏目和搜索不依赖后端，适配 GitHub Pages 静态导出。

首页不再列举最近文章。文章新增后仍会自动出现在博客首页、分类筛选结果和 sitemap 中。

## 维护网站内容

- `data/profile.ts`：个人资料、方向、理念、经历、项目及首页章节导航。
- `app/page.tsx`：专业个人主页。
- `app/blog/layout.tsx`：博客的独立页头、布局与页脚。
- `components/blog/BlogExplorer.tsx`：精选文章、筛选与搜索。
- `app/blog/[slug]/page.tsx`：正文阅读版式与目录。
- `lib/posts.ts`：构建期读取 Markdown、解析元数据与标题锚点。
- `app/globals.css`：全站样式与 Markdown 正文排版。

修改网站文字或添加文章，不需要另开仓库或域名。

## 本地开发与构建

```bash
npm ci
npm run dev
npm run build
```

静态产物在 `out/`。不要同时运行 `npm run dev` 与 `npm run build`，它们会共用 `.next`。

## GitHub Pages

提交并推送到 `main` 后由 `.github/workflows/deploy.yml` 自动构建部署。
Pages Source 必须设置为 GitHub Actions，避免被默认 Jekyll 流程覆盖。

当前用户站点位于 `https://zhangwier.github.io/`，不需要额外的 `basePath`。站点地图会包含个人主页、博客首页和全部文章链接。

## 动效与可访问性

保留原有的鼠标光斑和工程项目卡片悬停视觉反馈。博客卡片也有轻量的交互反馈；触摸设备不依赖悬停提示。动画尊重系统减少动态效果设置。
