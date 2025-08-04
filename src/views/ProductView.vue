<template>
  <div v-if="product" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <div class="container mx-auto px-4 py-8">
      <!-- Breadcrumb -->
      <nav class="mb-8">
        <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <li><router-link to="/" class="hover:text-blue-600 dark:hover:text-blue-400">Home</router-link></li>
          <li><ChevronRight class="w-4 h-4" /></li>
          <li><router-link to="/shop" class="hover:text-blue-600 dark:hover:text-blue-400">Shop</router-link></li>
          <li><ChevronRight class="w-4 h-4" /></li>
          <li class="text-gray-900 dark:text-white">{{ product.name }}</li>
        </ol>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <!-- Product Images -->
        <div>
          <!-- Main Image -->
          <div class="mb-4">
            <img
              :src="selectedImage"
              :alt="product.name"
              class="w-full h-96 object-contain bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors"
            >
          </div>

        <!-- Thumbnail Images -->
        <div class="flex space-x-2 overflow-x-auto">
          <button
            v-for="(image, index) in product.images"
            :key="index"
            @click="selectedImage = image"
            :class="selectedImage === image ? 'ring-2 ring-accent-blue' : 'ring-1 ring-gray-300'"
            class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden"
          >
            <img
              :src="image"
              :alt="`${product.name} ${index + 1}`"
              class="w-full h-full object-contain bg-gray-50"
            >
          </button>
        </div>
      </div>

      <!-- Product Details -->
      <div>
        <!-- Product Header -->
        <div class="mb-6">
          <p class="text-sm text-gray-500 mb-2">{{ product.brand }}</p>
          <h1 class="text-3xl font-bold text-secondary mb-4">{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center mb-4">
            <div class="flex items-center">
              <Star
                v-for="i in 5"
                :key="i"
                class="w-5 h-5"
                :class="i <= product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'"
              />
            </div>
            <span class="text-sm text-gray-600 ml-2">
              {{ product.rating }}/5 ({{ product.reviewCount }} reviews)
            </span>
          </div>
        </div>

        <!-- Price -->
        <div class="mb-6">
          <div class="flex items-center space-x-4 mb-2">
            <span class="text-3xl font-bold text-accent-blue">
              ₦{{ discountedPrice.toLocaleString() }}
            </span>
            <span v-if="product.discount" class="text-xl text-gray-500 line-through">
              ₦{{ product.price.toLocaleString() }}
            </span>
          </div>
          <div v-if="product.discount" class="flex items-center space-x-2">
            <span class="badge bg-red-500 text-white">{{ product.discount }}% OFF</span>
            <span class="text-green-600 font-medium">
              You save ₦{{ (product.price - discountedPrice).toLocaleString() }}
            </span>
          </div>
        </div>

        <!-- Stock Status -->
        <div class="mb-6">
          <div class="flex items-center space-x-2">
            <div
              :class="product.inStock ? 'bg-green-500' : 'bg-red-500'"
              class="w-3 h-3 rounded-full"
            ></div>
            <span :class="product.inStock ? 'text-green-600' : 'text-red-600'" class="font-medium">
              {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>

        <!-- Product Options -->
        <div class="space-y-6 mb-8">
          <!-- Colors -->
          <div v-if="product.colors && product.colors.length > 0">
            <h3 class="text-lg font-semibold mb-3">Color</h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="color in product.colors"
                :key="color"
                @click="selectedColor = color"
                :class="selectedColor === color
                  ? 'ring-2 ring-blue-600 ring-offset-2'
                  : 'ring-1 ring-gray-300'"
                class="flex items-center space-x-2 px-4 py-2 rounded-lg border hover:border-blue-600 transition-colors"
              >
                <div
                  class="w-4 h-4 rounded-full"
                  :style="{ backgroundColor: getColorValue(color) }"
                ></div>
                <span class="text-sm">{{ color }}</span>
              </button>
            </div>
          </div>

          <!-- Storage Options -->
          <div v-if="storageOptions.length > 0">
            <h3 class="text-lg font-semibold mb-3">Storage</h3>
            <div class="flex flex-wrap gap-3">
              <button
                v-for="storage in storageOptions"
                :key="storage"
                @click="selectedStorage = storage"
                :class="selectedStorage === storage
                  ? 'bg-accent-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                class="px-4 py-2 rounded-lg transition-colors"
              >
                {{ storage }}
              </button>
            </div>
          </div>

          <!-- Quantity -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Quantity</h3>
            <div class="flex items-center space-x-3">
              <button
                @click="quantity = Math.max(1, quantity - 1)"
                class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus class="w-4 h-4" />
              </button>
              <span class="w-16 text-center font-medium">{{ quantity }}</span>
              <button
                @click="quantity = Math.min(10, quantity + 1)"
                class="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4 mb-8">
          <button
            @click="addToCart"
            :disabled="!product.inStock"
            class="w-full py-3 px-6 rounded-lg font-medium text-lg transition-colors"
            :class="product.inStock
              ? 'bg-accent-blue text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
          >
            {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
          </button>

          <div class="flex space-x-4">
            <button
              @click="toggleWishlist"
              :class="isInWishlist ? 'bg-red-50 text-red-600 border-red-200' : 'bg-gray-50 text-gray-600 border-gray-200'"
              class="flex-1 py-2 px-4 rounded-lg border transition-colors flex items-center justify-center space-x-2"
            >
              <Heart class="w-5 h-5" :fill="isInWishlist ? 'currentColor' : 'none'" />
              <span>{{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}</span>
            </button>

            <button class="flex-1 py-2 px-4 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
              <Share2 class="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        <!-- Product Features -->
        <div v-if="product.features && product.features.length > 0" class="mb-8">
          <h3 class="text-lg font-semibold mb-3">Key Features</h3>
          <ul class="space-y-2">
            <li v-for="feature in product.features" :key="feature" class="flex items-center space-x-2">
              <Check class="w-5 h-5 text-green-500" />
              <span class="text-gray-700">{{ feature }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Product Details Tabs -->
    <div class="mb-16">
      <div class="border-b border-gray-200 mb-8">
        <nav class="flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="activeTab === tab.id
              ? 'border-accent-blue text-accent-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700'"
            class="py-2 px-1 border-b-2 font-medium text-sm transition-colors"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>

      <!-- Description Tab -->
      <div v-if="activeTab === 'description'" class="prose max-w-none">
        <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
      </div>

      <!-- Specifications Tab -->
      <div v-if="activeTab === 'specifications'">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(value, key) in product.specifications"
            :key="key"
            class="flex justify-between py-3 border-b border-gray-100"
          >
            <span class="font-medium text-gray-900">{{ key }}</span>
            <span class="text-gray-600">{{ value }}</span>
          </div>
        </div>
      </div>

      <!-- Reviews Tab -->
      <div v-if="activeTab === 'reviews'">
        <div class="text-center py-12">
          <MessageCircle class="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No reviews yet</h3>
          <p class="text-gray-500">Be the first to review this product</p>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div>
      <h2 class="text-2xl font-bold text-secondary mb-8">Related Products</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          :product="relatedProduct"
        />
      </div>
    </div>
    </div>
  </div>

  <!-- Product Not Found -->
  <div v-else class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <div class="container mx-auto px-4 py-16 text-center">
      <div class="text-gray-400 mb-4">
        <Package class="w-16 h-16 mx-auto" />
      </div>
      <h2 class="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-4">Product Not Found</h2>
      <p class="text-gray-500 dark:text-gray-500 mb-8">The product you're looking for doesn't exist or has been removed.</p>
      <router-link to="/shop" class="btn-primary">
        Continue Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ChevronRight, Star, Minus, Plus, Heart, Share2, Check,
  MessageCircle, Package
} from 'lucide-vue-next'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Reactive state
const selectedImage = ref('')
const selectedColor = ref('')
const selectedStorage = ref('')
const quantity = ref(1)
const activeTab = ref('description')

// Tabs configuration
const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'reviews', label: 'Reviews' }
]

// Computed properties
const product = computed(() => {
  const id = route.params.id as string
  return productsStore.getProductById(id)
})

const discountedPrice = computed(() => {
  if (!product.value) return 0
  if (product.value.discount) {
    return product.value.price * (1 - product.value.discount / 100)
  }
  return product.value.price
})

const isInWishlist = computed(() => {
  if (!product.value) return false
  return wishlistStore.isInWishlist(product.value.id)
})

const storageOptions = computed(() => {
  // In a real app, this would come from product variants
  return ['128GB', '256GB', '512GB', '1TB'].filter(storage =>
    product.value?.storage ? storage >= product.value.storage : true
  )
})

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsStore.getProductsByBrand(product.value.brand)
    .filter(p => p.id !== product.value?.id)
    .slice(0, 4)
})

// Methods
const addToCart = () => {
  if (product.value && product.value.inStock) {
    // Add items one by one to respect the quantity
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addItem({
        id: product.value.id,
        name: product.value.name,
        price: discountedPrice.value,
        image: product.value.image,
        color: selectedColor.value,
        storage: selectedStorage.value
      })
    }

    // Show success message (in a real app, you'd use a toast notification)
    alert(`Added ${quantity.value} ${product.value.name} to cart!`)
  }
}

const toggleWishlist = () => {
  if (product.value) {
    wishlistStore.toggleItem({
      id: product.value.id,
      name: product.value.name,
      price: product.value.price,
      image: product.value.image,
      brand: product.value.brand,
      inStock: product.value.inStock
    })
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

// Initialize component
onMounted(() => {
  if (product.value) {
    selectedImage.value = product.value.image
    if (product.value.colors && product.value.colors.length > 0) {
      selectedColor.value = product.value.colors[0]
    }
    if (product.value.storage) {
      selectedStorage.value = product.value.storage
    }
  }
})
</script>
