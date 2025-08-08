<template>
  <!-- Mobile Bottom Navigation -->
  <div 
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 z-40 md:hidden transition-all duration-300"
    :class="{ 'translate-y-full': isHidden }"
  >
    <div class="flex items-center justify-around py-2">
      <!-- Home -->
      <router-link
        to="/"
        class="flex flex-col items-center py-2 px-3 rounded-lg transition-colors"
        :class="isActive('/') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'"
      >
        <Home class="w-5 h-5 mb-1" />
        <span class="text-xs font-medium">Home</span>
      </router-link>

      <!-- Shop -->
      <router-link
        to="/shop"
        class="flex flex-col items-center py-2 px-3 rounded-lg transition-colors"
        :class="isActive('/shop') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'"
      >
        <ShoppingBag class="w-5 h-5 mb-1" />
        <span class="text-xs font-medium">Shop</span>
      </router-link>

      <!-- Search -->
      <button
        @click="$emit('toggle-search')"
        class="flex flex-col items-center py-2 px-3 rounded-lg transition-colors text-gray-600 dark:text-gray-400 hover:text-blue-600"
      >
        <Search class="w-5 h-5 mb-1" />
        <span class="text-xs font-medium">Search</span>
      </button>

      <!-- Wishlist -->
      <router-link
        to="/wishlist"
        class="flex flex-col items-center py-2 px-3 rounded-lg transition-colors relative"
        :class="isActive('/wishlist') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'"
      >
        <Heart class="w-5 h-5 mb-1" />
        <span class="text-xs font-medium">Wishlist</span>
        <span
          v-if="wishlistCount > 0"
          class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center"
        >
          {{ wishlistCount > 9 ? '9+' : wishlistCount }}
        </span>
      </router-link>

      <!-- Cart -->
      <router-link
        to="/cart"
        class="flex flex-col items-center py-2 px-3 rounded-lg transition-colors relative"
        :class="isActive('/cart') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-600 dark:text-gray-400'"
      >
        <ShoppingCart class="w-5 h-5 mb-1" />
        <span class="text-xs font-medium">Cart</span>
        <span
          v-if="cartCount > 0"
          class="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center"
        >
          {{ cartCount > 9 ? '9+' : cartCount }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Home, ShoppingBag, Search, Heart, ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

// Define emits
defineEmits<{
  'toggle-search': []
}>()

const route = useRoute()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isHidden = ref(false)
let lastScrollY = 0

const cartCount = computed(() => cartStore.itemCount)
const wishlistCount = computed(() => wishlistStore.itemCount)

const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Hide on scroll down, show on scroll up
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    isHidden.value = true
  } else if (currentScrollY < lastScrollY) {
    isHidden.value = false
  }
  
  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Add safe area padding for devices with home indicators */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
  .fixed {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
