<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import DynamicIcon from './DynamicIcon.vue'
import siteConfig from '../config/site'

const emit = defineEmits<{
  (e: 'search', keyword: string): void
}>()

const engines = siteConfig.search.engines

const activeEngine = ref('site')
const inputValue = ref('')

const currentEngine = computed(() => engines.find(e => e.key === activeEngine.value)!)

const placeholder = computed(() => {
  if (activeEngine.value === 'site') return '搜索站内导航...'
  return `在${currentEngine.value.label}中搜索...`
})

function switchEngine(key: string) {
  activeEngine.value = key
  if (key === 'site') {
    emit('search', inputValue.value)
  } else {
    emit('search', '')
  }
}

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  inputValue.value = val
  if (activeEngine.value === 'site') {
    emit('search', val)
  }
}

function onEnter() {
  if (activeEngine.value !== 'site' && inputValue.value.trim()) {
    window.open(currentEngine.value.url + encodeURIComponent(inputValue.value.trim()), '_blank')
  }
}
</script>

<template>
  <div class="max-w-xl mx-auto">
    <div class="flex items-center gap-1 mb-2.5 px-1">
      <button
        v-for="engine in engines"
        :key="engine.key"
        @click="switchEngine(engine.key)"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
        :class="activeEngine === engine.key
          ? 'bg-accent-600 text-white dark:bg-accent-500'
          : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800'"
      >
        <DynamicIcon :icon="engine.icon" class="text-sm" />
        {{ engine.label }}
      </button>
    </div>

    <div class="relative">
      <Icon icon="mdi:magnify" class="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-300 dark:text-surface-500 text-lg pointer-events-none" />
      <input
        type="text"
        class="search-box !pl-10 !pr-4"
        :placeholder="placeholder"
        :value="inputValue"
        @input="onInput"
        @keydown.enter="onEnter"
      />
      <div
        v-if="activeEngine !== 'site'"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-surface-300 dark:text-surface-600 pointer-events-none select-none"
      >
        Enter &crarr;
      </div>
    </div>
  </div>
</template>
