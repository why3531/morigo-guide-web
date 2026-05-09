<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import DynamicIcon from './components/DynamicIcon.vue'
import NavHeader from './components/NavHeader.vue'
import SearchBar from './components/SearchBar.vue'
import CategorySection from './components/CategorySection.vue'
import BackToTop from './components/BackToTop.vue'
import ArticleList from './components/ArticleList.vue'
import ArticlePage from './components/ArticlePage.vue'
import siteConfig from './config/site'
import { articles, getArticleBySlug, getArticlesByCategory, getArticlesByTag } from './utils/articles'
import { getBrandParts } from './utils/brand'

const keyword = ref('')
const currentPath = ref(window.location.pathname)
const brandParts = getBrandParts()

const isArticlesIndex = computed(() => currentPath.value === '/articles' || currentPath.value === '/articles/')
const articleCategory = computed(() => {
  const match = currentPath.value.match(/^\/articles\/categories\/([^/]+)\/?$/)
  return match?.[1] ? decodeURIComponent(match[1]) : undefined
})
const articleTag = computed(() => {
  const match = currentPath.value.match(/^\/articles\/tags\/([^/]+)\/?$/)
  return match?.[1] ? decodeURIComponent(match[1]) : undefined
})
const articleSlug = computed(() => {
  if (articleCategory.value || articleTag.value) return undefined
  const match = currentPath.value.match(/^\/articles\/([^/]+)\/?$/)
  return match?.[1]
})
const currentArticle = computed(() => articleSlug.value ? getArticleBySlug(articleSlug.value) : undefined)
const categoryArticles = computed(() => articleCategory.value ? getArticlesByCategory(articleCategory.value) : [])
const tagArticles = computed(() => articleTag.value ? getArticlesByTag(articleTag.value) : [])
const isArticleRoute = computed(() => isArticlesIndex.value || Boolean(articleCategory.value) || Boolean(articleTag.value) || Boolean(articleSlug.value))

const filteredCategories = computed(() => {
  const data = siteConfig.navigation
  if (!keyword.value.trim()) return data

  const k = keyword.value.toLowerCase()
  return data
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.title.toLowerCase().includes(k) ||
          item.description.toLowerCase().includes(k) ||
          item.url.toLowerCase().includes(k) ||
          item.tags?.some((tag) => tag.toLowerCase().includes(k))
      ),
    }))
    .filter((cat) => cat.items.length > 0)
})

function onSearch(val: string) {
  keyword.value = val
}

function syncPath() {
  currentPath.value = window.location.pathname
}

onMounted(() => window.addEventListener('popstate', syncPath))
onUnmounted(() => window.removeEventListener('popstate', syncPath))
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-50 dark:bg-surface-950">
    <NavHeader />

    <ArticleList v-if="isArticlesIndex" :articles="articles" />
    <ArticleList v-else-if="articleCategory" :articles="categoryArticles" :category="articleCategory" />
    <ArticleList v-else-if="articleTag" :articles="tagArticles" :tag="articleTag" />
    <ArticlePage v-else-if="articleSlug" :article="currentArticle" />

    <template v-else>
      <div class="pt-12 pb-8 px-5 text-center">
      <h2 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-surface-800 dark:text-surface-100 mb-1.5 flex items-center justify-center gap-2">
        <DynamicIcon :icon="siteConfig.logoIcon" class="text-accent-500 dark:text-accent-400" />
        {{ brandParts.main }}<span v-if="brandParts.highlight" class="text-accent-600 dark:text-accent-400"> {{ brandParts.highlight }}</span>
      </h2>
      <p class="text-surface-400 dark:text-surface-500 text-xs mb-7">{{ siteConfig.tagline }}</p>
      <SearchBar v-if="siteConfig.search.enabled" @search="onSearch" />
      </div>

      <main class="flex-1 max-w-6xl w-full mx-auto px-5 sm:px-8 pb-14">
        <template v-if="filteredCategories.length">
          <CategorySection
            v-for="category in filteredCategories"
            :key="category.name"
            :category="category"
          />
        </template>
        <div v-else class="text-center py-24">
          <p class="text-sm text-surface-400 dark:text-surface-500">没有匹配的导航项</p>
        </div>
      </main>
    </template>

    <footer class="border-t border-surface-100 dark:border-surface-800/60 py-5">
      <div class="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between text-[11px] text-surface-300 dark:text-surface-600">
        <span class="flex items-center gap-1">
          <DynamicIcon :icon="siteConfig.logoIcon" class="text-xs text-accent-500/50" />
          &copy; {{ new Date().getFullYear() }} {{ siteConfig.siteName }}
        </span>
        <a :href="siteConfig.domainUrl" class="hover:text-surface-500 dark:hover:text-surface-400 transition-colors">{{ siteConfig.domain }}</a>
      </div>
    </footer>

    <BackToTop v-if="!isArticleRoute || currentArticle" />
  </div>
</template>
