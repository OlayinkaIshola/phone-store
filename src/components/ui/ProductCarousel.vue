<template>
  <div class="relative">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-secondary">{{ title }}</h2>
      <div class="flex space-x-2">
        <button 
          @click="scrollLeft"
          class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          :disabled="scrollPosition <= 0"
        >
          <ChevronLeft class="w-5 h-5" />
        </button>
        <button 
          @click="scrollRight"
          class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          :disabled="scrollPosition >= maxScroll"
        >
          <ChevronRight class="w-5 h-5" />
        </button>
      </div>
    </div>
    
    <div 
      ref="scrollContainer"
      class="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth"
      @scroll="updateScrollPosition"
    >
      <div 
        v-for="product in products" 
        :key="product.id"
        class="flex-shrink-0 w-72"
      >
        <ProductCard :product="product" />
      </div>
    </div>
    
    <!-- Scroll Indicators -->
    <div class="flex justify-center mt-6 space-x-2">
      <div 
        v-for="(_, index) in Math.ceil(products.length / itemsPerView)" 
        :key="index"
        class="w-2 h-2 rounded-full transition-colors"
        :class="currentPage === index ? 'bg-accent-blue' : 'bg-gray-300'"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  discount?: number
  storage?: string
  ram?: string
  colors?: string[]
}

interface Props {
  title: string
  products: Product[]
}

const props = defineProps<Props>()

const scrollContainer = ref<HTMLElement>()
const scrollPosition = ref(0)
const itemsPerView = ref(4)

const maxScroll = computed(() => {
  if (!scrollContainer.value) return 0
  return scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth
})

const currentPage = computed(() => {
  const itemWidth = 288 + 24 // 72 * 4 (w-72) + 24 (space-x-6)
  return Math.round(scrollPosition.value / (itemWidth * itemsPerView.value))
})

const scrollLeft = () => {
  if (scrollContainer.value) {
    const itemWidth = 288 + 24
    scrollContainer.value.scrollBy({
      left: -itemWidth * itemsPerView.value,
      behavior: 'smooth'
    })
  }
}

const scrollRight = () => {
  if (scrollContainer.value) {
    const itemWidth = 288 + 24
    scrollContainer.value.scrollBy({
      left: itemWidth * itemsPerView.value,
      behavior: 'smooth'
    })
  }
}

const updateScrollPosition = () => {
  if (scrollContainer.value) {
    scrollPosition.value = scrollContainer.value.scrollLeft
  }
}

const updateItemsPerView = () => {
  if (window.innerWidth >= 1280) {
    itemsPerView.value = 4
  } else if (window.innerWidth >= 1024) {
    itemsPerView.value = 3
  } else if (window.innerWidth >= 768) {
    itemsPerView.value = 2
  } else {
    itemsPerView.value = 1
  }
}

onMounted(() => {
  updateItemsPerView()
  window.addEventListener('resize', updateItemsPerView)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView)
})
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
