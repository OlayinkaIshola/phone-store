<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors">
    <!-- Main content without header/footer -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Dark Mode Toggle - Floating button for auth pages -->
    <button
      @click="toggleDarkMode"
      class="fixed top-6 right-6 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
    >
      <Sun v-if="isDarkMode" class="w-5 h-5 text-yellow-500" />
      <Moon v-else class="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </button>

    <!-- Back to Home Button -->
    <router-link
      to="/"
      class="fixed top-6 left-6 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
      title="Back to Home"
    >
      <ArrowLeft class="w-5 h-5" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon, ArrowLeft } from 'lucide-vue-next'

const isDarkMode = ref(false)

// Dark mode functionality
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
}

// Initialize dark mode from localStorage
const initializeDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode === 'true') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  } else if (savedMode === 'false') {
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
  } else {
    // Check system preference if no saved preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDarkMode.value = prefersDark
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    }
  }
}

// Initialize on component mount
onMounted(() => {
  initializeDarkMode()
})
</script>

<style scoped>
/* Smooth transitions for floating buttons */
.fixed {
  transition: all 0.3s ease;
}

.fixed:hover {
  transform: translateY(-2px);
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .fixed {
    top: 1rem;
  }
  
  .fixed:first-of-type {
    left: 1rem;
  }
  
  .fixed:last-of-type {
    right: 1rem;
  }
}
</style>
