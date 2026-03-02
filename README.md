# MoriGo 导航站

> 去发现，去抵达

一个简洁、现代的个人导航站，基于 Vue 3 + TypeScript + Vite + TailwindCSS 构建。

🔗 **在线预览**：[go.morijiu.cn](https://go.morijiu.cn)

---

## ✨ 特性

- **集中配置** — 站点标题、Logo、域名、GitHub 链接、搜索引擎、导航数据等全部集中在 `src/config/` 下，一处修改，全站生效
- **多格式图标** — 支持 Iconify 字符串、远程 URL、Base64、内联 SVG、本地图片，自由混用
- **站内搜索 + 外部引擎** — 搜索栏支持站内导航过滤，也可一键切换到百度 / 必应 / Google
- **锚点定位** — 每个分组和导航项支持锚点链接，可直接分享定位到具体位置
- **暗色模式** — 自动检测系统偏好，支持手动切换，持久化到 localStorage
- **回到顶部** — 滚动后出现平滑回到顶部按钮
- **响应式布局** — 适配桌面端和移动端

## 🛠 技术栈

| 技术 | 说明 |
|---|---|
| [Vue 3](https://vuejs.org) | 渐进式前端框架 (Composition API + `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org) | 类型安全 |
| [Vite](https://vitejs.dev) | 极速开发与构建 |
| [TailwindCSS](https://tailwindcss.com) | 原子化 CSS |
| [Iconify](https://iconify.design) | 统一图标方案 |

## 📁 项目结构

```
src/
├── components/          # 组件
│   ├── NavHeader.vue       # 顶部导航栏
│   ├── SearchBar.vue       # 搜索栏（站内 + 外部引擎）
│   ├── CategorySection.vue # 分类区块
│   ├── NavCard.vue         # 导航卡片
│   ├── DynamicIcon.vue     # 多格式图标组件
│   └── BackToTop.vue       # 回到顶部按钮
├── config/              # 集中配置
│   ├── site.ts             # 站点配置（品牌、链接、搜索、功能开关）
│   └── navigation.ts       # 导航数据
├── types/               # TypeScript 类型
│   └── index.ts
├── App.vue              # 主布局
├── main.ts              # 入口
└── style.css            # 全局样式
```

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/MoRijiu/morigo-guide-web.git
cd morigo-guide-web

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## ⚙️ 配置说明

编辑 `src/config/site.ts` 即可自定义全站：

```ts
const siteConfig: SiteConfig = {
  title: 'Mori',                    // 品牌名前半
  titleHighlight: 'Go',             // 品牌名高亮部分
  tagline: '去发现，去抵达',          // 副标题
  logoIcon: 'mdi:arrow-top-right-bold-box',  // Logo 图标

  domain: 'go.morijiu.cn',          // 显示域名
  domainUrl: 'https://go.morijiu.cn',
  githubUrl: 'https://github.com/MoRijiu/morigo-guide-web',

  search: {
    enabled: true,                   // 是否展示搜索栏
    engines: [ ... ],                // 配置搜索引擎列表
  },

  mock: true,                        // true = 使用内置数据
  navigation: mockNavigation,        // 导航分组数据
}
```

### 图标格式

所有 `icon` 字段支持多种格式：

| 格式 | 示例 |
|---|---|
| Iconify | `"mdi:github"` |
| 远程 URL | `"https://example.com/icon.png"` |
| Base64 | `"data:image/png;base64,..."` |
| 内联 SVG | `"<svg>...</svg>"` |
| 本地图片 | `"/icons/logo.png"` |

## 📄 License

[MIT](./LICENSE)
