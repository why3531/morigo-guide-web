import type { NavCategory } from '../types'

export const mockNavigation: NavCategory[] = [
  {
    name: '常用工具',
    icon: 'mdi:tools',
    items: [
      {
        title: 'ChatGPT',
        description: 'OpenAI 智能对话助手',
        url: 'https://chat.openai.com',
        icon: 'simple-icons:openai',
      },
      {
        title: 'Google',
        description: '全球最大搜索引擎',
        url: 'https://www.google.com',
        icon: 'mdi:google',
      },
      {
        title: 'GitHub',
        description: '全球最大代码托管平台',
        url: 'https://github.com',
        icon: 'mdi:github',
      },
      {
        title: 'Stack Overflow',
        description: '开发者问答社区',
        url: 'https://stackoverflow.com',
        icon: 'mdi:stack-overflow',
      },
    ],
  },
  {
    name: '前端开发',
    icon: 'mdi:language-html5',
    items: [
      {
        title: 'Vue.js',
        description: '渐进式 JavaScript 框架',
        url: 'https://vuejs.org',
        icon: 'mdi:vuejs',
      },
      {
        title: 'React',
        description: '用于构建用户界面的 JS 库',
        url: 'https://react.dev',
        icon: 'mdi:react',
      },
      {
        title: 'TailwindCSS',
        description: '实用优先的 CSS 框架',
        url: 'https://tailwindcss.com',
        icon: 'mdi:tailwind',
      },
      {
        title: 'TypeScript',
        description: 'JavaScript 的超集语言',
        url: 'https://www.typescriptlang.org',
        icon: 'mdi:language-typescript',
      },
      {
        title: 'Vite',
        description: '下一代前端构建工具',
        url: 'https://vitejs.dev',
        icon: 'simple-icons:vite',
      },
      {
        title: 'MDN Web Docs',
        description: 'Web 技术权威文档',
        url: 'https://developer.mozilla.org',
        icon: 'simple-icons:mdnwebdocs',
      },
    ],
  },
  {
    name: '设计资源',
    icon: 'mdi:palette',
    items: [
      {
        title: 'Figma',
        description: '在线协作设计工具',
        url: 'https://www.figma.com',
        icon: 'mdi:figma',
      },
      {
        title: 'Dribbble',
        description: '设计师作品展示平台',
        url: 'https://dribbble.com',
        icon: 'mdi:dribbble',
      },
      {
        title: 'Unsplash',
        description: '免费高质量图片素材',
        url: 'https://unsplash.com',
        icon: 'simple-icons:unsplash',
      },
      {
        title: 'Iconify',
        description: '统一的图标框架',
        url: 'https://iconify.design',
        icon: 'simple-icons:iconify',
      },
    ],
  },
  {
    name: '后端 & DevOps',
    icon: 'mdi:server',
    items: [
      {
        title: 'Docker Hub',
        description: '容器镜像仓库',
        url: 'https://hub.docker.com',
        icon: 'mdi:docker',
      },
      {
        title: 'Nginx',
        description: '高性能 Web 服务器',
        url: 'https://nginx.org',
        icon: 'simple-icons:nginx',
      },
      {
        title: 'Node.js',
        description: 'JavaScript 运行时',
        url: 'https://nodejs.org',
        icon: 'mdi:nodejs',
      },
      {
        title: 'Vercel',
        description: '前端部署托管平台',
        url: 'https://vercel.com',
        icon: 'simple-icons:vercel',
      },
    ],
  },
  {
    name: '学习资源',
    icon: 'mdi:book-open-variant',
    items: [
      {
        title: '掘金',
        description: '中文技术社区',
        url: 'https://juejin.cn',
        icon: 'simple-icons:juejin',
      },
      {
        title: 'B站',
        description: '视频学习平台',
        url: 'https://www.bilibili.com',
        icon: 'simple-icons:bilibili',
      },
      {
        title: 'LeetCode',
        description: '算法刷题平台',
        url: 'https://leetcode.cn',
        icon: 'simple-icons:leetcode',
      },
      {
        title: 'Dev.to',
        description: '开发者博客社区',
        url: 'https://dev.to',
        icon: 'simple-icons:devdotto',
      },
    ],
  },
]
