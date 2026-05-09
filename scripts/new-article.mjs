#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const title = process.argv.slice(2).join(' ').trim()

if (!title) {
  console.error('Usage: npm run article -- "文章标题"')
  process.exit(1)
}

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)))
const articlesDir = join(rootDir, 'src', 'articles')
const today = new Date().toISOString().slice(0, 10)

function toSlug(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const baseSlug = toSlug(title) || `article-${today}`
let slug = baseSlug
let index = 2

while (existsSync(join(articlesDir, `${slug}.md`))) {
  slug = `${baseSlug}-${index}`
  index += 1
}

const filePath = join(articlesDir, `${slug}.md`)
const content = `---
title: ${title}
date: ${today}
description:
category: 随笔
tags: []
cover:
draft: true
---

# ${title}

这里写文章导语。

## 背景

说明这篇文章为什么值得写。

## 正文

开始写主要内容。

## 总结

收束观点，放下一步计划或相关链接。
`

mkdirSync(articlesDir, { recursive: true })
writeFileSync(filePath, content, 'utf8')

console.log(`Created: ${filePath}`)
