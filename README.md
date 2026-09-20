# 个人作品集 / Portfolio

一个单页个人作品集站。左侧栏固定(sticky)放名字、职称、简介与页内导航，右侧滚动展示关于、经历、项目、文章。
全站跟随鼠标的探照灯光斑由一层 `radial-gradient` 实现，没有 canvas 也没有 WebGL。

技术栈:**Next.js(App Router, 静态导出)+ Tailwind CSS + TypeScript**。

## 改内容只看一个文件

**`data/profile.ts`** 集中了所有文案与链接——名字、职称、简介段落、技能、社交链接、经历、项目、文章。
改完保存即可,不需要动 `components/` 里的任何组件。

## 本地开发

```bash
npm install
npm run dev          # http://localhost:3000
```

## 构建

```bash
npm run build        # 产物在 out/,纯静态文件
```

想本地预览构建结果:

```bash
npx serve out
```

## 部署到 GitHub Pages

仓库里已经放好了 `.github/workflows/deploy.yml`,推送到 `main` 分支就会自动构建并发布。

需要你在 GitHub 上手动做两件事(各一次):

1. 建好仓库后,进 **Settings → Pages → Build and deployment → Source**,选择 **GitHub Actions**。
2. 推送代码。workflow 会自动判断仓库类型:
   - 仓库名是 `<你的用户名>.github.io` → 部署到域名根路径
   - 其他仓库名 → 自动加上 `/<仓库名>` 前缀(`BASE_PATH`)

如果你用自己的域名,在 `public/` 放一个 `CNAME` 文件写上域名即可。

## 目录结构

```
app/
  layout.tsx          全局外壳:字体、<body> 背景与文字色
  page.tsx            首页:左侧栏 + 右侧各区块
  globals.css         Tailwind 入口与少量全局样式
components/
  Spotlight.tsx       鼠标跟随光斑(rAF 节流,触摸设备与 prefers-reduced-motion 下自动关闭)
  Sidebar.tsx         左栏:名字、职称、简介、导航、社交
  Nav.tsx             页内跳转导航,滚动时自动高亮当前区块
  Social.tsx          社交图标
  SectionKit.tsx      区块外壳、标题、标签、列表悬停效果
  sections/           About / Experience / Projects / Writing 四个区块
  Footer.tsx          页脚
data/
  profile.ts          全站内容(改这里)
```

## 想调外观

- **光斑颜色/半径**:`components/Spotlight.tsx` 里的 `radial-gradient`。颜色也定义在 `tailwind.config.ts` 的 `glow` 令牌中。
- **主色调**:`<body>` 上的 `bg-slate-900` / `text-slate-400`,以及高亮用的 `teal-300`,都在 `app/layout.tsx` 与各组件里。
- **左右栏宽度**:左栏 `lg:w-[48%]`、右栏 `lg:w-[52%]`,在 `Sidebar.tsx` 和 `page.tsx`。

## 动效与可访问性

- 悬停时同一列表内其他条目变暗、当前条目浮出半透明卡片:靠父级 `group/list` 与子级 `group-hover/list` 命名分组实现。
- 所有动画都带了 `motion-reduce:` 变体,遵循系统的"减少动态效果"设置。
- 触摸设备上不渲染光斑,避免无意义的合成开销。
