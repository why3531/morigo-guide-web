import type { SiteConfig } from '../types'
import { mockNavigation } from './navigation'

const siteConfig: SiteConfig = {
  // ==================== 品牌 ====================
  siteName: 'AI GO',
  tagline: '去发现，去抵达',
  logoIcon: 'mdi:arrow-top-right-bold-box',

  // ==================== 链接 ====================
  domain: 'go.morijiu.cn',
  domainUrl: 'https://go.morijiu.cn',
  githubUrl: 'https://github.com/MoRijiu/morigo-guide-web',

  // ==================== 顶部菜单 ====================
  // 内部链接示例：/articles 或 /articles/hello-ai-go
  // 外部链接示例：https://github.com，建议 external: true
  menus: [
    { label: '教程', url: '/articles/categories/教程' },
    { label: 'BLOG', url: '/articles' },
    { label: 'GitHub', url: 'https://github.com/MoRijiu/morigo-guide-web', icon: 'mdi:github', external: true },
  ],

  // ==================== 搜索 ====================
  search: {
    enabled: true,
    engines: [
      { key: 'site', label: '站内', icon: 'mdi:compass-outline', url: '' },
      { key: 'baidu', label: '百度', icon: 'simple-icons:baidu', url: 'https://www.baidu.com/s?wd=' },
      { key: 'bing', label: '必应', icon: 'simple-icons:microsoftbing', url: 'https://www.bing.com/search?q=' },
      { key: 'google', label: 'Google', icon: 'mdi:google', url: 'https://www.google.com/search?q=' },
    ],
  },

  // ==================== 数据 ====================
  // mock: true  → 使用下方 mockNavigation 内置数据
  // mock: false → 后续可对接 API，目前仍回退到内置数据
  mock: true,

  // ==================== 导航数据 ====================
  navigation: mockNavigation,
}

export default siteConfig
