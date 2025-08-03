<template>
  <div v-if="comparisonProducts.length > 0" class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">
          Compare Products ({{ comparisonProducts.length }}/3)
        </h3>
        <div class="flex items-center space-x-4">
          <button
            v-if="comparisonProducts.length >= 2"
            @click="openComparisonModal"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Compare Now
          </button>
          <button
            @click="clearComparison"
            class="text-gray-500 hover:text-gray-700"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Product Cards -->
      <div class="flex space-x-4 overflow-x-auto">
        <div
          v-for="product in comparisonProducts"
          :key="product.id"
          class="flex-shrink-0 w-48 bg-gray-50 rounded-lg p-3"
        >
          <div class="relative">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-32 object-cover rounded-md mb-2"
            />
            <button
              @click="removeFromComparison(product.id)"
              class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
            >
              ×
            </button>
          </div>
          <h4 class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</h4>
          <p class="text-sm text-gray-600">{{ product.brand }}</p>
          <p class="text-sm font-semibold text-gray-900">₦{{ product.price.toLocaleString() }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Comparison Modal -->
  <div v-if="showComparisonModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Product Comparison</h2>
        <button @click="closeComparisonModal" class="text-gray-400 hover:text-gray-600">
          <X class="h-6 w-6" />
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr>
              <th class="text-left py-3 px-4 font-medium text-gray-900 w-48">Feature</th>
              <th
                v-for="product in comparisonProducts"
                :key="product.id"
                class="text-center py-3 px-4 font-medium text-gray-900 min-w-64"
              >
                <div class="space-y-2">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-20 h-20 object-cover rounded-md mx-auto"
                  />
                  <div>
                    <h3 class="font-semibold text-sm">{{ product.name }}</h3>
                    <p class="text-xs text-gray-600">{{ product.brand }}</p>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <!-- Price -->
            <tr>
              <td class="py-3 px-4 font-medium text-gray-900">Price</td>
              <td
                v-for="product in comparisonProducts"
                :key="`price-${product.id}`"
                class="py-3 px-4 text-center"
              >
                <span class="text-lg font-semibold text-green-600">
                  ₦{{ product.price.toLocaleString() }}
                </span>
                <div v-if="product.discount" class="text-xs text-red-600">
                  {{ product.discount }}% OFF
                </div>
              </td>
            </tr>

            <!-- Rating -->
            <tr>
              <td class="py-3 px-4 font-medium text-gray-900">Rating</td>
              <td
                v-for="product in comparisonProducts"
                :key="`rating-${product.id}`"
                class="py-3 px-4 text-center"
              >
                <div class="flex items-center justify-center space-x-1">
                  <span class="text-yellow-400">★</span>
                  <span>{{ product.rating }}</span>
                  <span class="text-xs text-gray-500">({{ product.reviewCount }})</span>
                </div>
              </td>
            </tr>

            <!-- Storage -->
            <tr v-if="comparisonProducts.some(p => p.storage)">
              <td class="py-3 px-4 font-medium text-gray-900">Storage</td>
              <td
                v-for="product in comparisonProducts"
                :key="`storage-${product.id}`"
                class="py-3 px-4 text-center"
              >
                {{ product.storage || 'N/A' }}
              </td>
            </tr>

            <!-- RAM -->
            <tr v-if="comparisonProducts.some(p => p.ram)">
              <td class="py-3 px-4 font-medium text-gray-900">RAM</td>
              <td
                v-for="product in comparisonProducts"
                :key="`ram-${product.id}`"
                class="py-3 px-4 text-center"
              >
                {{ product.ram || 'N/A' }}
              </td>
            </tr>

            <!-- Colors -->
            <tr v-if="comparisonProducts.some(p => p.colors && p.colors.length > 0)">
              <td class="py-3 px-4 font-medium text-gray-900">Available Colors</td>
              <td
                v-for="product in comparisonProducts"
                :key="`colors-${product.id}`"
                class="py-3 px-4 text-center"
              >
                <div v-if="product.colors && product.colors.length > 0" class="text-xs">
                  {{ product.colors.join(', ') }}
                </div>
                <div v-else class="text-gray-500">N/A</div>
              </td>
            </tr>

            <!-- Stock Status -->
            <tr>
              <td class="py-3 px-4 font-medium text-gray-900">Availability</td>
              <td
                v-for="product in comparisonProducts"
                :key="`stock-${product.id}`"
                class="py-3 px-4 text-center"
              >
                <span
                  :class="product.inStock ? 'text-green-600' : 'text-red-600'"
                  class="font-medium"
                >
                  {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                </span>
              </td>
            </tr>

            <!-- Specifications -->
            <tr v-for="(spec, key) in allSpecifications" :key="key">
              <td class="py-3 px-4 font-medium text-gray-900">{{ key }}</td>
              <td
                v-for="product in comparisonProducts"
                :key="`${key}-${product.id}`"
                class="py-3 px-4 text-center text-sm"
              >
                {{ product.specifications?.[key] || 'N/A' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-center space-x-4 mt-6 pt-6 border-t">
        <button
          v-for="product in comparisonProducts"
          :key="`action-${product.id}`"
          @click="addToCart(product)"
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add {{ product.name }} to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { X } from 'lucide-vue-next'
import { useComparisonStore } from '@/stores/comparison'
import { useCartStore } from '@/stores/cart'
import type { Product } from '@/stores/products'

const comparisonStore = useComparisonStore()
const cartStore = useCartStore()

const showComparisonModal = ref(false)

const comparisonProducts = computed(() => comparisonStore.products)

const allSpecifications = computed(() => {
  const specs: Record<string, boolean> = {}
  comparisonProducts.value.forEach(product => {
    if (product.specifications) {
      Object.keys(product.specifications).forEach(key => {
        specs[key] = true
      })
    }
  })
  return specs
})

const openComparisonModal = () => {
  showComparisonModal.value = true
}

const closeComparisonModal = () => {
  showComparisonModal.value = false
}

const removeFromComparison = (productId: string) => {
  comparisonStore.removeProduct(productId)
}

const clearComparison = () => {
  comparisonStore.clearComparison()
}

const addToCart = (product: Product) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image
  })
}
</script>
