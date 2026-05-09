<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import DynamicIcon from './DynamicIcon.vue'
import siteConfig from '../config/site'
import { getBrandParts } from '../utils/brand'

const isDark = ref(false)
const brandParts = getBrandParts()

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
})

function toggleDark() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-surface-950/70 border-b border-surface-100 dark:border-surface-800/60">
    <div class="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
      <a href="/" class="flex items-center gap-2.5 select-none group/logo">
        <span class="w-7 h-7 rounded-md bg-accent-600 dark:bg-accent-500 flex items-center justify-center">
          <DynamicIcon :icon="siteConfig.logoIcon" class="text-white text-base" />
        </span>
        <span class="font-display font-bold text-base tracking-tight text-surface-800 dark:text-surface-100">
          {{ brandParts.main }}<span v-if="brandParts.highlight" class="text-accent-600 dark:text-accent-400"> {{ brandParts.highlight }}</span>
        </span>
        <Icon icon="mdi:chevron-right" class="text-xs text-surface-300 dark:text-surface-600 -ml-1.5 group-hover/logo:translate-x-0.5 transition-transform" />
      </a>

      <div class="flex items-center gap-1">
        <a
          v-for="menu in siteConfig.menus"
          :key="menu.url"
          :href="menu.url"
          :target="menu.external ? '_blank' : undefined"
          :rel="menu.external ? 'noopener noreferrer' : undefined"
          class="h-8 rounded-md px-2.5 flex items-center justify-center gap-1.5 text-xs font-medium text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          :title="menu.label"
        >
          <DynamicIcon v-if="menu.icon" :icon="menu.icon" class="text-base" />
          <span>{{ menu.label }}</span>
        </a>
        <button
          @click="toggleDark"
          class="w-8 h-8 rounded-md flex items-center justify-center text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
          :title="isDark ? '浅色模式' : '深色模式'"
        >
          <Icon :icon="isDark ? 'mdi:white-balance-sunny' : 'mdi:moon-waning-crescent'" class="text-lg" />
        </button>
      </div>
    </div>
  </header>
</template>
