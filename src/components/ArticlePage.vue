<script setup lang="ts">
import { ref } from 'vue'
import type { Article } from '../types'

defineProps<{
  article?: Article
}>()

const previewImage = ref('')

async function onArticleClick(event: MouseEvent) {
  const target = event.target
  if (target instanceof HTMLButtonElement && target.matches('[data-copy-code]')) {
    const codeBlock = target.closest('.code-block')
    const code = codeBlock?.querySelector('code')?.textContent ?? ''
    if (!code) return

    await navigator.clipboard.writeText(code)
    target.textContent = '已复制'
    window.setTimeout(() => {
      target.textContent = '复制'
    }, 1400)
    return
  }

  if (!(target instanceof HTMLImageElement)) return

  previewImage.value = target.currentSrc || target.src
}

function closePreview() {
  previewImage.value = ''
}
</script>

<template>
  <main class="flex-1 max-w-3xl w-full mx-auto px-5 sm:px-8 py-10">
    <a href="/articles" class="text-xs font-medium text-surface-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors">返回文章列表</a>

    <article v-if="article" class="mt-7">
      <header class="mb-8 border-b border-surface-100 pb-8 dark:border-surface-800">
        <img
          v-if="article.meta.cover"
          :src="article.meta.cover"
          :alt="article.meta.title"
          class="mb-7 aspect-[16/7] w-full rounded-lg object-cover"
        />
        <div class="mb-3 flex flex-wrap items-center gap-2 text-[11px] text-surface-400 dark:text-surface-500">
          <time v-if="article.meta.date">{{ article.meta.date }}</time>
          <a
            v-if="article.meta.category"
            :href="`/articles/categories/${encodeURIComponent(article.meta.category)}`"
            class="rounded bg-surface-100 px-1.5 py-0.5 text-surface-500 transition-colors hover:text-accent-600 dark:bg-surface-700 dark:text-surface-300 dark:hover:text-accent-300"
          >
            {{ article.meta.category }}
          </a>
          <a
            v-for="tag in article.meta.tags"
            :key="tag"
            :href="`/articles/tags/${encodeURIComponent(tag)}`"
            class="rounded bg-accent-50 px-1.5 py-0.5 text-accent-600 transition-colors hover:text-accent-800 dark:bg-accent-900/30 dark:text-accent-300 dark:hover:text-accent-100"
          >
            {{ tag }}
          </a>
        </div>
        <h1 class="font-display text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50 sm:text-4xl">{{ article.meta.title }}</h1>
        <p v-if="article.meta.description" class="mt-3 text-sm leading-6 text-surface-500 dark:text-surface-400">
          {{ article.meta.description }}
        </p>
      </header>

      <div class="article-body" @click="onArticleClick" v-html="article.html" />
    </article>

    <div v-else class="mt-12 rounded-lg border border-dashed border-surface-200 py-16 text-center dark:border-surface-700">
      <h1 class="text-lg font-semibold text-surface-800 dark:text-surface-100">文章不存在</h1>
      <p class="mt-2 text-sm text-surface-400 dark:text-surface-500">检查一下地址，或者返回文章列表。</p>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <button
          v-if="previewImage"
          class="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          type="button"
          title="关闭图片预览"
          @click="closePreview"
          @keydown.esc="closePreview"
        >
          <img
            :src="previewImage"
            alt=""
            class="max-h-[90vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
          />
        </button>
      </Transition>
    </Teleport>
  </main>
</template>
