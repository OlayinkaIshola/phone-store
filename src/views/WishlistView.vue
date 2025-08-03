<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-secondary mb-4">My Wishlist</h1>
      <nav class="text-sm text-gray-600">
        <router-link to="/" class="hover:text-accent-blue">Home</router-link>
        <ChevronRight class="w-4 h-4 inline mx-2" />
        <span class="text-gray-900">Wishlist</span>
      </nav>
    </div>

    <div v-if="wishlistStore.items.length > 0">
      <!-- Wishlist Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <p class="text-gray-600">
            {{ wishlistStore.items.length }} {{ wishlistStore.items.length === 1 ? 'item' : 'items' }} in your wishlist
          </p>
        </div>
        <div class="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
            @click="addAllToCart"
            :disabled="!hasInStockItems"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add All to Cart
          </button>
          <button
            @click="clearWishlist"
            class="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear Wishlist
          </button>
        </div>
      </div>

      <!-- Wishlist Items Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in wishlistStore.items"
          :key="item.id"
          class="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
        >
          <!-- Product Image -->
          <div class="relative p-4">
            <router-link :to="`/product/${item.id}`">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-full h-48 object-contain bg-gray-50 rounded-lg hover:scale-105 transition-transform duration-300"
              >
            </router-link>

            <!-- Remove from Wishlist -->
            <button
              @click="removeFromWishlist(item)"
              class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors group"
            >
              <Heart class="w-5 h-5 text-red-500 fill-current group-hover:text-red-600" />
            </button>

            <!-- Stock Status -->
            <div class="absolute top-2 left-2">
              <span
                v-if="!item.inStock"
                class="badge bg-gray-500 text-white"
              >
                Out of Stock
              </span>
            </div>
          </div>

          <!-- Product Details -->
          <div class="p-4 pt-0">
            <div class="mb-3">
              <p class="text-sm text-gray-500 mb-1">{{ item.brand }}</p>
              <h3 class="font-semibold text-lg mb-2 line-clamp-2">
                <router-link
                  :to="`/product/${item.id}`"
                  class="hover:text-accent-blue transition-colors"
                >
                  {{ item.name }}
                </router-link>
              </h3>
            </div>

            <!-- Price -->
            <div class="mb-4">
              <span class="text-xl font-bold text-accent-blue">
                ₦{{ item.price.toLocaleString() }}
              </span>
            </div>

            <!-- Actions -->
            <div class="space-y-2">
              <button
                @click="addToCart(item)"
                :disabled="!item.inStock"
                class="w-full py-2 px-4 rounded-lg font-medium transition-colors"
                :class="item.inStock
                  ? 'bg-accent-blue text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'"
              >
                {{ item.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </button>

              <div class="flex space-x-2">
                <router-link
                  :to="`/product/${item.id}`"
                  class="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-center text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                >
                  View Details
                </router-link>
                <button
                  @click="shareProduct(item)"
                  class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Share2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-secondary mb-8">You might also like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in recommendedProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>

    <!-- Empty Wishlist -->
    <div v-else class="text-center py-16">
      <div class="text-gray-400 mb-6">
        <Heart class="w-24 h-24 mx-auto" />
      </div>
      <h2 class="text-2xl font-bold text-gray-600 mb-4">Your wishlist is empty</h2>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        Save items you love by clicking the heart icon. We'll keep them safe here for you!
      </p>
      <router-link to="/shop" class="btn-primary">
        Start Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight, Heart, Share2 } from 'lucide-vue-next'
import ProductCard from '@/components/ui/ProductCard.vue'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import { useProductsStore } from '@/stores/products'
import type { WishlistItem } from '@/stores/wishlist'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const productsStore = useProductsStore()

// Computed properties
const hasInStockItems = computed(() => {
  return wishlistStore.items.some(item => item.inStock)
})

const recommendedProducts = computed(() => {
  // Get products from brands in wishlist
  const wishlistBrands = [...new Set(wishlistStore.items.map(item => item.brand))]
  const recommended = productsStore.products.filter(product =>
    wishlistBrands.includes(product.brand) &&
    !wishlistStore.items.some(item => item.id === product.id)
  )
  return recommended.slice(0, 4)
})

// Methods
const addToCart = (item: WishlistItem) => {
  if (item.inStock) {
    cartStore.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    })

    // Show success message
    alert(`${item.name} added to cart!`)
  }
}

const addAllToCart = () => {
  const inStockItems = wishlistStore.items.filter(item => item.inStock)

  if (inStockItems.length === 0) return

  if (confirm(`Add ${inStockItems.length} items to cart?`)) {
    inStockItems.forEach(item => {
      cartStore.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      })
    })

    alert(`${inStockItems.length} items added to cart!`)
  }
}

const removeFromWishlist = (item: WishlistItem) => {
  wishlistStore.removeItem(item.id)
}

const clearWishlist = () => {
  if (confirm('Are you sure you want to clear your entire wishlist?')) {
    wishlistStore.clearWishlist()
  }
}

const shareProduct = (item: WishlistItem) => {
  if (navigator.share) {
    navigator.share({
      title: item.name,
      text: `Check out this ${item.name} on our store!`,
      url: `${window.location.origin}/product/${item.id}`
    })
  } else {
    // Fallback: copy to clipboard
    const url = `${window.location.origin}/product/${item.id}`
    navigator.clipboard.writeText(url).then(() => {
      alert('Product link copied to clipboard!')
    })
  }
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
