---
title: AI GO 文章示例
date: 2026-05-09
description: 这是一篇用于演示文章页、元数据和 Markdown 渲染的示例文章。
category: 教程
tags: [公告, 示例]
cover:
draft: true
---

# AI GO 文章示例

这里可以像 Hexo 那样直接写 Markdown。文件顶部的 `---` 区域是元数据，正文部分就是正常的 Markdown 内容。

> 好的文章模板不需要很复杂，但最好能覆盖常见排版。这样你以后新建文章时，可以直接复制这一篇再改。

## 二级标题

这是普通段落。你可以写中文、英文、链接，比如 [返回首页](/)，也可以使用 **加粗文字**、*斜体文字* 和 `行内代码`。

### 三级标题

适合用来拆分更细的小节。文章页会自动给标题、段落、列表、代码块和引用设置基础样式。

## 列表示例

无序列表：

- 收集常用工具
- 整理文章笔记
- 给重要内容打标签

有序列表：

1. 新建一个 `.md` 文件
2. 写好文章元数据
3. 访问 `/articles/文件名`

任务列表：

- [x] 支持 Markdown 文章
- [x] 支持文章元数据
- [ ] 支持更多文章组件

## 表格示例

| 字段 | 说明 | 示例 |
|---|---|---|
| `title` | 文章标题 | `AI GO 文章示例` |
| `date` | 发布日期 | `2026-05-09` |
| `tags` | 文章标签 | `[公告, 示例]` |
| `draft` | 是否草稿 | `false` |

## 代码块示例

```ts
type Article = {
  title: string
  date: string
  tags: string[]
}

const article: Article = {
  title: 'AI GO 文章示例',
  date: '2026-05-09',
  tags: ['公告', '示例'],
}

console.log(article.title)
```

## 图片示例

Markdown 可以直接插入图片：

![AI GO favicon](/favicon.svg)

多张图片写在同一行时，会自动变成一组横向图片：

![图片 1](/favicon.svg) ![图片 2](/favicon.svg) ![图片 3](/favicon.svg)

## 提示块

普通 Markdown 里可以用引用块来做提示：

> 如果文章还没写完，可以把 `draft` 设置成 `true`，它就不会出现在文章列表里。

## 分割线

---

最后一段通常可以放总结、下一步计划，或者相关链接。
