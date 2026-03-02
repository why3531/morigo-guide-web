<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import DynamicIcon from './DynamicIcon.vue'
import type { NavItem } from '../types'

const props = defineProps<{
  item: NavItem
}>()

function toSlug(str: string) {
  return str.replace(/[\s&\/]+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '').toLowerCase()
}

const itemId = computed(() => `nav-${toSlug(props.item.title)}`)
</script>

<template>
  <a :id="itemId" :href="item.url" target="_blank" rel="noopener noreferrer" class="nav-card group scroll-mt-20">
    <div class="w-9 h-9 rounded-md bg-surface-100 dark:bg-surface-700/60 flex items-center justify-center shrink-0 group-hover:bg-accent-50 dark:group-hover:bg-accent-900/20 transition-colors duration-200">
      <DynamicIcon :icon="item.icon" class="text-lg text-surface-400 dark:text-surface-400 group-hover:text-accent-500 dark:group-hover:text-accent-400 transition-colors duration-200" />
    </div>
    <div class="min-w-0 flex-1">
      <h3 class="text-[13px] font-medium text-surface-700 dark:text-surface-200 truncate group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-200">
        {{ item.title }}
      </h3>
      <p class="text-[11px] text-surface-400 dark:text-surface-500 truncate mt-0.5 leading-tight">
        {{ item.description }}
      </p>
    </div>
    <Icon icon="mdi:open-in-new" class="text-sm text-surface-200 dark:text-surface-700 group-hover:text-accent-400 dark:group-hover:text-accent-500 transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
  </a>
</template>
