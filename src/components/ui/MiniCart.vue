<template>
  <div class="relative">
    <!-- Cart Button -->
    <button
      @click="toggleCart"
      class="relative p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
    >
      <ShoppingCart class="w-6 h-6" />
      <span
        v-if="cartStore.totalItems > 0"
        class="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
      >
        {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
      </span>
    </button>

    <!-- Mini Cart Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 transition-colors"
    >
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Shopping Cart</h3>
          <button
            @click="closeCart"
            class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Cart Items -->
        <div v-if="cartStore.items.length > 0" class="space-y-4 max-h-64 overflow-y-auto">
          <div
            v-for="item in cartStore.items.slice(0, 3)"
            :key="`${item.id}-${item.color}-${item.storage}`"
            class="flex items-center space-x-3"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="w-12 h-12 object-contain bg-gray-50 rounded"
            >
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</p>
              <p class="text-xs text-gray-500">
                {{ item.quantity }} × ₦{{ item.price.toLocaleString() }}
              </p>
            </div>
            <button
              @click="removeItem(item)"
              class="text-gray-400 hover:text-red-500"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>

          <!-- Show more items indicator -->
          <div v-if="cartStore.items.length > 3" class="text-center">
            <p class="text-sm text-gray-500">
              +{{ cartStore.items.length - 3 }} more items
            </p>
          </div>
        </div>

        <!-- Empty Cart -->
        <div v-else class="text-center py-8">
          <ShoppingCart class="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p class="text-gray-500 text-sm">Your cart is empty</p>
        </div>

        <!-- Cart Footer -->
        <div v-if="cartStore.items.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between mb-4">
            <span class="font-medium">Total:</span>
            <span class="text-lg font-bold text-blue-600">
              ₦{{ cartStore.subtotal.toLocaleString() }}
            </span>
          </div>
          
          <div class="space-y-2">
            <router-link
              to="/cart"
              @click="closeCart"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-center block hover:bg-blue-700 transition-colors"
            >
              View Cart
            </router-link>
            <router-link
              to="/checkout"
              @click="closeCart"
              class="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg text-center block hover:bg-blue-50 transition-colors"
            >
              Checkout
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div
      v-if="isOpen"
      @click="closeCart"
      class="fixed inset-0 z-40"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ShoppingCart, X, Trash2 } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/stores/cart'

const cartStore = useCartStore()
const isOpen = ref(false)

const toggleCart = () => {
  isOpen.value = !isOpen.value
}

const closeCart = () => {
  isOpen.value = false
}

const removeItem = (item: CartItem) => {
  cartStore.removeItem(item.id, item.color, item.storage, item.ram)
}
</script>
