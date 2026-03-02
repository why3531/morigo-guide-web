<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-show="visible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full
             bg-accent-600 dark:bg-accent-500 text-white shadow-lg shadow-accent-500/20
             hover:bg-accent-700 dark:hover:bg-accent-400 hover:shadow-xl hover:shadow-accent-500/30
             active:scale-95 transition-all duration-200
             flex items-center justify-center"
      title="回到顶部"
    >
      <Icon icon="mdi:arrow-up" class="text-lg" />
    </button>
  </Transition>
</template>
