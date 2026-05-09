import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import go from 'highlight.js/lib/languages/go'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import php from 'highlight.js/lib/languages/php'
import python from 'highlight.js/lib/languages/python'
import rust from 'highlight.js/lib/languages/rust'
import shell from 'highlight.js/lib/languages/shell'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import type { Article, ArticleMeta } from '../types'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('sh', shell)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('css', css)
hljs.registerLanguage('dockerfile', dockerfile)
hljs.registerLanguage('go', go)
hljs.registerLanguage('golang', go)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('java', java)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('md', markdown)
hljs.registerLanguage('php', php)
hljs.registerLanguage('py', python)
hljs.registerLanguage('python', python)
hljs.registerLanguage('rs', rust)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('yml', yaml)

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }

    return hljs.highlightAuto(code).value
  },
})

md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx]
  const info = token.info.trim().split(/\s+/)[0]
  const code = token.content
  const highlighted = info && hljs.getLanguage(info)
    ? hljs.highlight(code, { language: info }).value
    : hljs.highlightAuto(code).value

  return `<div class="code-block"><button type="button" class="code-copy-btn" data-copy-code>复制</button><pre><code class="hljs${info ? ` language-${info}` : ''}">${highlighted}</code></pre></div>`
}

const articleFiles = import.meta.glob('../articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function parseValue(value: string) {
  const trimmed = value.trim()

  if (trimmed === 'true') return true
  if (trimmed === 'false') return false

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean)
  }

  return trimmed.replace(/^['"]|['"]$/g, '')
}

function parseFrontmatter(raw: string): { meta: ArticleMeta; content: string } {
  if (!raw.startsWith('---')) {
    return {
      meta: { title: '未命名文章' },
      content: raw,
    }
  }

  const end = raw.indexOf('\n---', 3)
  if (end === -1) {
    return {
      meta: { title: '未命名文章' },
      content: raw,
    }
  }

  const frontmatter = raw.slice(3, end).trim()
  const content = raw.slice(end + 4).trim()
  const meta = frontmatter.split('\n').reduce<Record<string, unknown>>((acc, line) => {
    const separatorIndex = line.indexOf(':')
    if (separatorIndex === -1) return acc

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1)
    acc[key] = parseValue(value)
    return acc
  }, {})

  return {
    meta: {
      title: typeof meta.title === 'string' ? meta.title : '未命名文章',
      date: typeof meta.date === 'string' ? meta.date : undefined,
      description: typeof meta.description === 'string' ? meta.description : undefined,
      category: typeof meta.category === 'string' ? meta.category : undefined,
      tags: Array.isArray(meta.tags) ? meta.tags.filter((tag): tag is string => typeof tag === 'string') : undefined,
      cover: typeof meta.cover === 'string' ? meta.cover : undefined,
      draft: typeof meta.draft === 'boolean' ? meta.draft : undefined,
    },
    content,
  }
}

function getSlug(path: string) {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

export const articles: Article[] = Object.entries(articleFiles)
  .map(([path, raw]) => {
    const { meta, content } = parseFrontmatter(raw)

    return {
      slug: getSlug(path),
      meta,
      content,
      html: md.render(content),
    }
  })
  .filter((article) => !article.meta.draft)
  .sort((a, b) => (b.meta.date ?? '').localeCompare(a.meta.date ?? ''))

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export function getArticlesByCategory(category: string) {
  return articles.filter((article) => article.meta.category === category)
}

export function getArticlesByTag(tag: string) {
  return articles.filter((article) => article.meta.tags?.includes(tag))
}
