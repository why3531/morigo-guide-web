<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  icon: string
  class?: string
}>()

type IconType = 'iconify' | 'svg' | 'base64' | 'url' | 'local'

const iconType = computed<IconType>(() => {
  const v = props.icon.trim()
  if (v.startsWith('<svg')) return 'svg'
  if (v.startsWith('data:')) return 'base64'
  if (/^https?:\/\//.test(v)) return 'url'
  if (v.startsWith('/') || v.startsWith('./') || v.startsWith('../')) return 'local'
  return 'iconify'
})
</script>

<template>
  <!-- Iconify icon string, e.g. "mdi:github" -->
  <Icon v-if="iconType === 'iconify'" :icon="icon" :class="$props.class" />

  <!-- Raw SVG markup -->
  <span v-else-if="iconType === 'svg'" :class="$props.class" class="dynamic-icon-svg" v-html="icon" />

  <!-- base64 / remote URL / local path -->
  <img
    v-else
    :src="icon"
    :class="$props.class"
    class="dynamic-icon-img"
    alt=""
    draggable="false"
  />
</template>

<style scoped>
.dynamic-icon-svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.dynamic-icon-svg :deep(svg) {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
.dynamic-icon-img {
  width: 1em;
  height: 1em;
  object-fit: contain;
  flex-shrink: 0;
}
</style>
