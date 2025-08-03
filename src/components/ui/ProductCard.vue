<template>
  <div class="card group cursor-pointer" @click="$router.push(`/product/${product.id}`)">
    <div class="relative overflow-hidden rounded-t-lg">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-64 object-contain bg-gray-50 group-hover:scale-105 transition-transform duration-300"
      >
      
      <!-- Badges -->
      <div class="absolute top-3 left-3 space-y-2">
        <span v-if="product.isNew" class="badge bg-green-500 text-white">New</span>
        <span v-if="product.discount" class="badge bg-red-500 text-white">
          -{{ product.discount }}%
        </span>
        <span v-if="!product.inStock" class="badge bg-gray-500 text-white">Out of Stock</span>
      </div>
      
      <!-- Action Buttons -->
      <div class="absolute top-3 right-3 flex flex-col space-y-2">
        <!-- Wishlist Button -->
        <button
          @click.stop="toggleWishlist"
          class="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          :class="{ 'text-red-500': isInWishlist, 'text-gray-400': !isInWishlist }"
          title="Add to Wishlist"
        >
          <Heart class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" />
        </button>

        <!-- Comparison Button -->
        <button
          @click.stop="toggleComparison"
          class="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          :class="{ 'text-blue-500': isInComparison, 'text-gray-400': !isInComparison }"
          title="Add to Comparison"
        >
          <BarChart3 class="w-5 h-5" :fill="isInComparison ? 'currentColor' : 'none'" />
        </button>
      </div>
      
      <!-- Quick View Button -->
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
        <button 
          @click.stop="quickView"
          class="bg-white text-gray-900 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
        >
          Quick View
        </button>
      </div>
    </div>
    
    <div class="p-4">
      <!-- Brand -->
      <p class="text-sm text-gray-500 mb-1">{{ product.brand }}</p>
      
      <!-- Product Name -->
      <h3 class="font-semibold text-lg mb-2 line-clamp-2">{{ product.name }}</h3>
      
      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <Star 
            v-for="i in 5" 
            :key="i"
            class="w-4 h-4"
            :class="i <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
          />
        </div>
        <span class="text-sm text-gray-500 ml-2">({{ product.reviewCount }})</span>
      </div>
      
      <!-- Price -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-2">
          <span class="text-xl font-bold text-accent-blue">
            ₦{{ discountedPrice.toLocaleString() }}
          </span>
          <span v-if="product.discount" class="text-sm text-gray-500 line-through">
            ₦{{ product.price.toLocaleString() }}
          </span>
        </div>
      </div>
      
      <!-- Specifications -->
      <div class="text-sm text-gray-600 mb-4 space-y-1">
        <div v-if="product.storage" class="flex justify-between">
          <span>Storage:</span>
          <span>{{ product.storage }}</span>
        </div>
        <div v-if="product.ram" class="flex justify-between">
          <span>RAM:</span>
          <span>{{ product.ram }}</span>
        </div>
      </div>
      
      <!-- Colors -->
      <div v-if="product.colors && product.colors.length > 0" class="mb-4">
        <p class="text-sm text-gray-600 mb-2">Colors:</p>
        <div class="flex space-x-2">
          <div 
            v-for="color in product.colors.slice(0, 4)" 
            :key="color"
            class="w-6 h-6 rounded-full border-2 border-gray-300"
            :style="{ backgroundColor: getColorValue(color) }"
            :title="color"
          ></div>
          <span v-if="product.colors.length > 4" class="text-xs text-gray-500 self-center">
            +{{ product.colors.length - 4 }} more
          </span>
        </div>
      </div>
      
      <!-- Add to Cart Button -->
      <button 
        @click.stop="addToCart"
        :disabled="!product.inStock"
        class="w-full py-2 px-4 rounded-lg font-medium transition-colors"
        :class="product.inStock 
          ? 'bg-accent-blue text-white hover:bg-blue-600' 
          : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
      >
        {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Heart, Star, BarChart3 } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useComparisonStore } from '@/stores/comparison'

interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  discount?: number
  storage?: string
  ram?: string
  colors?: string[]
  category: string
  description: string
  specifications: Record<string, string>
  features: string[]
  createdAt?: string
}

interface Props {
  product: Product
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const comparisonStore = useComparisonStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))
const isInComparison = computed(() => comparisonStore.isInComparison(props.product.id))

const discountedPrice = computed(() => {
  if (props.product.discount) {
    return props.product.price * (1 - props.product.discount / 100)
  }
  return props.product.price
})

const toggleWishlist = () => {
  wishlistStore.toggleItem({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
    brand: props.product.brand,
    inStock: props.product.inStock
  })
}

const addToCart = () => {
  if (props.product.inStock) {
    cartStore.addItem({
      id: props.product.id,
      name: props.product.name,
      price: discountedPrice.value,
      image: props.product.image
    })
  }
}

const quickView = () => {
  // Implement quick view modal
  console.log('Quick view:', props.product.id)
}

const toggleComparison = () => {
  const success = comparisonStore.toggleProduct(props.product)
  if (!success && !comparisonStore.isInComparison(props.product.id)) {
    alert('You can only compare up to 3 products at a time.')
  }
}

const getColorValue = (color: string): string => {
  const colorMap: Record<string, string> = {
    'Black': '#000000',
    'White': '#FFFFFF',
    'Silver': '#C0C0C0',
    'Gold': '#FFD700',
    'Rose Gold': '#E8B4B8',
    'Blue': '#0066CC',
    'Red': '#FF0000',
    'Green': '#00AA00',
    'Purple': '#800080',
    'Pink': '#FFC0CB',
    'Gray': '#808080',
    'Space Gray': '#4A4A4A'
  }
  return colorMap[color] || '#CCCCCC'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
