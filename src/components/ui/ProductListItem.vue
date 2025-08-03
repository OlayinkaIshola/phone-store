<template>
  <div class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Product Image -->
      <div class="md:w-48 flex-shrink-0">
        <div class="relative group cursor-pointer" @click="$router.push(`/product/${product.id}`)">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-48 object-contain bg-gray-50 rounded-lg group-hover:scale-105 transition-transform duration-300"
          >
          
          <!-- Badges -->
          <div class="absolute top-3 left-3 space-y-2">
            <span v-if="product.isNew" class="badge bg-green-500 text-white">New</span>
            <span v-if="product.discount" class="badge bg-red-500 text-white">
              -{{ product.discount }}%
            </span>
            <span v-if="!product.inStock" class="badge bg-gray-500 text-white">Out of Stock</span>
          </div>
          
          <!-- Wishlist Button -->
          <button 
            @click.stop="toggleWishlist"
            class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            :class="{ 'text-red-500': isInWishlist, 'text-gray-400': !isInWishlist }"
          >
            <Heart class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" />
          </button>
        </div>
      </div>
      
      <!-- Product Details -->
      <div class="flex-1">
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="mb-4">
            <p class="text-sm text-gray-500 mb-1">{{ product.brand }}</p>
            <h3 
              class="text-xl font-semibold mb-2 cursor-pointer hover:text-accent-blue transition-colors"
              @click="$router.push(`/product/${product.id}`)"
            >
              {{ product.name }}
            </h3>
            
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
              <span class="text-sm text-gray-500 ml-2">({{ product.reviewCount }} reviews)</span>
            </div>
          </div>
          
          <!-- Specifications -->
          <div class="mb-4 flex-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div v-if="product.storage" class="flex justify-between">
                <span class="text-gray-600">Storage:</span>
                <span class="font-medium">{{ product.storage }}</span>
              </div>
              <div v-if="product.ram" class="flex justify-between">
                <span class="text-gray-600">RAM:</span>
                <span class="font-medium">{{ product.ram }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Brand:</span>
                <span class="font-medium">{{ product.brand }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Rating:</span>
                <span class="font-medium">{{ product.rating }}/5</span>
              </div>
            </div>
            
            <!-- Colors -->
            <div v-if="product.colors && product.colors.length > 0" class="mt-4">
              <p class="text-sm text-gray-600 mb-2">Available Colors:</p>
              <div class="flex flex-wrap gap-2">
                <div 
                  v-for="color in product.colors.slice(0, 6)" 
                  :key="color"
                  class="flex items-center space-x-2"
                >
                  <div 
                    class="w-4 h-4 rounded-full border border-gray-300"
                    :style="{ backgroundColor: getColorValue(color) }"
                    :title="color"
                  ></div>
                  <span class="text-xs text-gray-600">{{ color }}</span>
                </div>
                <span v-if="product.colors.length > 6" class="text-xs text-gray-500">
                  +{{ product.colors.length - 6 }} more
                </span>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <!-- Price -->
            <div class="flex items-center space-x-3">
              <span class="text-2xl font-bold text-accent-blue">
                ₦{{ discountedPrice.toLocaleString() }}
              </span>
              <span v-if="product.discount" class="text-lg text-gray-500 line-through">
                ₦{{ product.price.toLocaleString() }}
              </span>
              <span v-if="product.discount" class="text-sm text-green-600 font-medium">
                Save ₦{{ (product.price - discountedPrice).toLocaleString() }}
              </span>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center space-x-3">
              <button
                @click="quickView"
                class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Quick View
              </button>
              <button 
                @click="addToCart"
                :disabled="!product.inStock"
                class="px-6 py-2 rounded-lg font-medium transition-colors"
                :class="product.inStock 
                  ? 'bg-accent-blue text-white hover:bg-blue-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
              >
                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Heart, Star } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

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
  product: Product
}

const props = defineProps<Props>()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

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
    'Space Gray': '#4A4A4A',
    'Natural Titanium': '#8C7853',
    'Blue Titanium': '#5F8A8B',
    'White Titanium': '#F2F2F7',
    'Black Titanium': '#1D1D1F',
    'Deep Purple': '#5E2CA5',
    'Midnight': '#1D1D1F',
    'Starlight': '#FAF0E6',
    'Phantom Black': '#1A1A1A',
    'Phantom Silver': '#C5C5C5',
    'Phantom Violet': '#7B68EE',
    'Karst Green': '#4A5D23',
    'Rippling Blue': '#4682B4',
    'Midnight Shadow': '#2F2F2F',
    'Lunar Frost': '#E6E6FA',
    'Magic Skin': '#FFE4E1',
    'Azure Blue': '#007FFF'
  }
  return colorMap[color] || '#CCCCCC'
}
</script>
