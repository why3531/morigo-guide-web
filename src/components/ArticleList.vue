<script setup lang="ts">
import type { Article } from '../types'
import { getBrandParts } from '../utils/brand'

withDefaults(defineProps<{
  articles: Article[]
  category?: string
}>(), {
  category: '',
})

const brandParts = getBrandParts()
</script>

<template>
  <main class="flex-1 max-w-4xl w-full mx-auto px-5 sm:px-8 py-10">
    <div class="mb-8">
      <a href="/" class="text-xs font-medium text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">返回导航</a>
      <h1 class="mt-4 font-display text-3xl font-bold tracking-tight text-surface-800 dark:text-surface-100">
        <template v-if="category">分类：<span class="text-accent-600 dark:text-accent-400">{{ category }}</span></template>
        <template v-else>{{ brandParts.main }}<span v-if="brandParts.highlight" class="text-accent-600 dark:text-accent-400"> {{ brandParts.highlight }}</span> BLOG</template>
      </h1>
    </div>

    <div v-if="articles.length" class="space-y-3">
      <article
        v-for="article in articles"
        :key="article.slug"
        class="rounded-lg border border-surface-200/80 bg-white p-5 transition-colors hover:border-accent-300 dark:border-surface-700/50 dark:bg-surface-800/80 dark:hover:border-accent-500"
      >
        <div class="flex flex-wrap items-center gap-2 text-[11px] text-surface-400 dark:text-surface-500">
          <time v-if="article.meta.date">{{ article.meta.date }}</time>
          <a
            v-if="article.meta.category"
            :href="`/articles/categories/${encodeURIComponent(article.meta.category)}`"
            class="rounded bg-surface-100 px-1.5 py-0.5 text-surface-500 transition-colors hover:text-accent-600 dark:bg-surface-700 dark:text-surface-300 dark:hover:text-accent-300"
          >
            {{ article.meta.category }}
          </a>
          <span v-for="tag in article.meta.tags" :key="tag" class="rounded bg-accent-50 px-1.5 py-0.5 text-accent-600 dark:bg-accent-900/30 dark:text-accent-300">
            {{ tag }}
          </span>
        </div>
        <a :href="`/articles/${article.slug}`" class="group block">
          <h2 class="mt-2 text-lg font-semibold text-surface-800 transition-colors group-hover:text-accent-600 dark:text-surface-100 dark:group-hover:text-accent-300">{{ article.meta.title }}</h2>
        </a>
        <p v-if="article.meta.description" class="mt-1 text-sm leading-6 text-surface-500 dark:text-surface-400">
          {{ article.meta.description }}
        </p>
      </article>
    </div>

    <div v-else class="rounded-lg border border-dashed border-surface-200 py-16 text-center text-sm text-surface-400 dark:border-surface-700 dark:text-surface-500">
      还没有文章
    </div>
  </main>
</template>
