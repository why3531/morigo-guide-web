<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import DynamicIcon from './DynamicIcon.vue'
import type { NavItem, RibbonColor } from '../types'

const props = defineProps<{
  item: NavItem
}>()

function toSlug(str: string) {
  return str.replace(/[\s&\/]+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '').toLowerCase()
}

const itemId = computed(() => `nav-${toSlug(props.item.title)}`)

const ribbonText = computed(() => {
  if (!props.item.ribbon) return ''
  return typeof props.item.ribbon === 'string' ? props.item.ribbon : props.item.ribbon.text
})

const ribbonColor = computed<RibbonColor>(() => {
  if (!props.item.ribbon || typeof props.item.ribbon === 'string') return 'accent'
  return props.item.ribbon.color ?? 'accent'
})

const ribbonClassMap: Record<Exclude<RibbonColor, `#${string}`>, string> = {
  accent: 'bg-accent-600 dark:bg-accent-500',
  red: 'bg-red-600 dark:bg-red-500',
  orange: 'bg-orange-500 dark:bg-orange-400',
  green: 'bg-emerald-600 dark:bg-emerald-500',
  blue: 'bg-sky-600 dark:bg-sky-500',
  gray: 'bg-surface-500 dark:bg-surface-600',
}

const isCustomRibbonColor = computed(() => /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(ribbonColor.value))

function getReadableTextColor(hex: string) {
  const normalized = hex.length === 4
    ? hex.slice(1).split('').map((char) => char + char).join('')
    : hex.slice(1)
  const red = parseInt(normalized.slice(0, 2), 16)
  const green = parseInt(normalized.slice(2, 4), 16)
  const blue = parseInt(normalized.slice(4, 6), 16)
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000
  return brightness > 150 ? '#111827' : '#ffffff'
}

const ribbonClass = computed(() => (
  isCustomRibbonColor.value ? '' : ribbonClassMap[ribbonColor.value as keyof typeof ribbonClassMap]
))

const ribbonStyle = computed(() => {
  if (!isCustomRibbonColor.value) return undefined

  return {
    backgroundColor: ribbonColor.value,
    color: getReadableTextColor(ribbonColor.value),
  }
})
</script>

<template>
  <a :id="itemId" :href="item.url" target="_blank" rel="noopener noreferrer" class="nav-card group scroll-mt-20 overflow-hidden">
    <span
      v-if="item.ribbon"
      class="absolute -right-8 top-3 z-10 w-24 rotate-45 py-0.5 text-center text-[10px] font-medium leading-4 text-white shadow-sm"
      :class="ribbonClass"
      :style="ribbonStyle"
    >
      {{ ribbonText }}
    </span>
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
      <div v-if="item.tags?.length" class="mt-2 flex flex-wrap gap-1">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="rounded px-1.5 py-0.5 text-[10px] leading-none text-accent-600 dark:text-accent-300 bg-accent-50 dark:bg-accent-900/30"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    <Icon icon="mdi:open-in-new" class="text-sm text-surface-200 dark:text-surface-700 group-hover:text-accent-400 dark:group-hover:text-accent-500 transition-colors shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
  </a>
</template>
