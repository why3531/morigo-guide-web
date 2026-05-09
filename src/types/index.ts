/**
 * 支持的 icon 格式：
 * - Iconify 字符串: "mdi:github"
 * - 远程图片 URL:  "https://example.com/icon.png"
 * - Base64:        "data:image/png;base64,..."
 * - 内联 SVG:      "<svg>...</svg>"
 * - 本地图片路径:   "/icons/foo.png"
 */
export type IconValue = string
export type RibbonColor = 'accent' | 'red' | 'orange' | 'green' | 'blue' | 'gray' | `#${string}`

export interface NavRibbon {
  text: string
  color?: RibbonColor
}

export interface NavItem {
  title: string
  description: string
  url: string
  icon: IconValue
  tags?: string[]
  ribbon?: string | NavRibbon
}

export interface NavCategory {
  name: string
  icon: IconValue
  items: NavItem[]
}

export interface SearchEngine {
  key: string
  label: string
  icon: IconValue
  url: string
}

export interface HeaderMenuItem {
  label: string
  url: string
  icon?: IconValue
  external?: boolean
}

export interface SiteConfig {
  siteName: string
  tagline: string
  logoIcon: IconValue
  domain: string
  domainUrl: string
  githubUrl: string
  menus: HeaderMenuItem[]

  search: {
    enabled: boolean
    engines: SearchEngine[]
  }

  mock: boolean

  navigation: NavCategory[]
}

export interface ArticleMeta {
  title: string
  date?: string
  description?: string
  category?: string
  tags?: string[]
  cover?: string
  draft?: boolean
}

export interface Article {
  slug: string
  meta: ArticleMeta
  content: string
  html: string
}
