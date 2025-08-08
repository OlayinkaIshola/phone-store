<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
    <AppHeader ref="headerRef" />

    <main class="flex-1 pb-16 md:pb-0">
      <slot />
    </main>

    <AppFooter />

    <!-- Mobile Bottom Navigation -->
    <MobileBottomNav @toggle-search="handleToggleSearch" />

    <!-- Back to Top Button -->
    <button
      v-if="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-20 right-6 md:bottom-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40"
      aria-label="Back to top"
    >
      <ChevronUp class="w-5 h-5" />
    </button>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronUp } from 'lucide-vue-next'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import MobileBottomNav from './MobileBottomNav.vue'

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const headerRef = ref()

const handleToggleSearch = () => {
  // Toggle the mobile search in the header
  if (headerRef.value) {
    headerRef.value.showMobileSearch = !headerRef.value.showMobileSearch
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
