<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-secondary mb-4">Shopping Cart</h1>
      <nav class="text-sm text-gray-600">
        <router-link to="/" class="hover:text-accent-blue">Home</router-link>
        <ChevronRight class="w-4 h-4 inline mx-2" />
        <span class="text-gray-900">Shopping Cart</span>
      </nav>
    </div>

    <div v-if="cartStore.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-sm border">
          <!-- Cart Header -->
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold">Cart Items ({{ cartStore.totalItems }})</h2>
              <button
                @click="clearCart"
                class="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <!-- Cart Items List -->
          <div class="divide-y divide-gray-200">
            <div
              v-for="item in cartStore.items"
              :key="`${item.id}-${item.color}-${item.storage}`"
              class="p-6"
            >
              <div class="flex flex-col sm:flex-row gap-4">
                <!-- Product Image -->
                <div class="flex-shrink-0">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-24 h-24 object-contain bg-gray-50 rounded-lg"
                  >
                </div>

                <!-- Product Details -->
                <div class="flex-1">
                  <div class="flex flex-col sm:flex-row sm:justify-between">
                    <div class="mb-4 sm:mb-0">
                      <h3 class="text-lg font-semibold text-gray-900 mb-1">
                        <router-link
                          :to="`/product/${item.id}`"
                          class="hover:text-accent-blue transition-colors"
                        >
                          {{ item.name }}
                        </router-link>
                      </h3>

                      <!-- Product Variants -->
                      <div class="text-sm text-gray-600 space-y-1">
                        <div v-if="item.color" class="flex items-center space-x-2">
                          <span>Color:</span>
                          <div class="flex items-center space-x-1">
                            <div
                              class="w-4 h-4 rounded-full border border-gray-300"
                              :style="{ backgroundColor: getColorValue(item.color) }"
                            ></div>
                            <span>{{ item.color }}</span>
                          </div>
                        </div>
                        <div v-if="item.storage">
                          <span>Storage: {{ item.storage }}</span>
                        </div>
                        <div v-if="item.ram">
                          <span>RAM: {{ item.ram }}</span>
                        </div>
                      </div>

                      <!-- Price -->
                      <div class="mt-2">
                        <span class="text-xl font-bold text-accent-blue">
                          ₦{{ item.price.toLocaleString() }}
                        </span>
                        <span class="text-sm text-gray-500 ml-2">each</span>
                      </div>
                    </div>

                    <!-- Quantity and Actions -->
                    <div class="flex flex-col items-end space-y-3">
                      <!-- Quantity Controls -->
                      <div class="flex items-center space-x-3">
                        <button
                          @click="updateQuantity(item, item.quantity - 1)"
                          :disabled="item.quantity <= 1"
                          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus class="w-4 h-4" />
                        </button>
                        <span class="w-12 text-center font-medium">{{ item.quantity }}</span>
                        <button
                          @click="updateQuantity(item, item.quantity + 1)"
                          :disabled="item.quantity >= 10"
                          class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus class="w-4 h-4" />
                        </button>
                      </div>

                      <!-- Item Total -->
                      <div class="text-lg font-bold text-gray-900">
                        ₦{{ (item.price * item.quantity).toLocaleString() }}
                      </div>

                      <!-- Actions -->
                      <div class="flex items-center space-x-3">
                        <button
                          @click="moveToWishlist(item)"
                          class="text-sm text-gray-600 hover:text-accent-blue transition-colors"
                        >
                          Move to Wishlist
                        </button>
                        <button
                          @click="removeItem(item)"
                          class="text-sm text-red-600 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Continue Shopping -->
        <div class="mt-6">
          <router-link
            to="/shop"
            class="inline-flex items-center space-x-2 text-accent-blue hover:text-blue-600 transition-colors"
          >
            <ArrowLeft class="w-4 h-4" />
            <span>Continue Shopping</span>
          </router-link>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
          <h3 class="text-xl font-semibold mb-6">Order Summary</h3>

          <!-- Summary Details -->
          <div class="space-y-4 mb-6">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal ({{ cartStore.totalItems }} items)</span>
              <span class="font-medium">₦{{ cartStore.subtotal.toLocaleString() }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">
                {{ shippingCost > 0 ? `₦${shippingCost.toLocaleString()}` : 'Free' }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-gray-600">Tax</span>
              <span class="font-medium">₦{{ tax.toLocaleString() }}</span>
            </div>

            <div class="border-t border-gray-200 pt-4">
              <div class="flex justify-between">
                <span class="text-lg font-semibold">Total</span>
                <span class="text-lg font-bold text-accent-blue">
                  ₦{{ total.toLocaleString() }}
                </span>
              </div>
            </div>
          </div>

          <!-- Shipping Info -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div class="flex items-center space-x-2">
              <Truck class="w-5 h-5 text-green-600" />
              <div>
                <p class="text-sm font-medium text-green-800">
                  {{ shippingCost === 0 ? 'Free Shipping!' : 'Fast Delivery' }}
                </p>
                <p class="text-xs text-green-600">
                  {{ shippingCost === 0
                    ? 'Your order qualifies for free shipping'
                    : 'Delivery within 2-3 business days'
                  }}
                </p>
              </div>
            </div>
          </div>

          <!-- Checkout Button -->
          <router-link
            to="/checkout"
            class="w-full bg-accent-blue text-white py-3 px-6 rounded-lg font-medium text-center block hover:bg-blue-600 transition-colors"
          >
            Proceed to Checkout
          </router-link>

          <!-- Payment Methods -->
          <div class="mt-6">
            <p class="text-sm text-gray-600 mb-3">We accept:</p>
            <div class="flex items-center space-x-3">
              <div class="bg-gray-100 px-3 py-2 rounded text-xs font-medium">Paystack</div>
              <div class="bg-gray-100 px-3 py-2 rounded text-xs font-medium">Flutterwave</div>
              <div class="bg-gray-100 px-3 py-2 rounded text-xs font-medium">Bank Transfer</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center py-16">
      <div class="text-gray-400 mb-6">
        <ShoppingCart class="w-24 h-24 mx-auto" />
      </div>
      <h2 class="text-2xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
      <p class="text-gray-500 mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
      </p>
      <router-link to="/shop" class="btn-primary">
        Start Shopping
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  ChevronRight, Minus, Plus, ArrowLeft, Truck, ShoppingCart
} from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import type { CartItem } from '@/stores/cart'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

// Computed properties
const shippingCost = computed(() => {
  // Free shipping for orders above ₦50,000
  return cartStore.subtotal >= 50000 ? 0 : 5000
})

const tax = computed(() => {
  // 7.5% VAT in Nigeria
  return Math.round(cartStore.subtotal * 0.075)
})

const total = computed(() => {
  return cartStore.subtotal + shippingCost.value + tax.value
})

// Methods
const updateQuantity = (item: CartItem, newQuantity: number) => {
  if (newQuantity <= 0) {
    removeItem(item)
  } else {
    cartStore.updateQuantity(item.id, newQuantity, item.color, item.storage)
  }
}

const removeItem = (item: CartItem) => {
  if (confirm('Are you sure you want to remove this item from your cart?')) {
    cartStore.removeItem(item.id, item.color, item.storage)
  }
}

const moveToWishlist = (item: CartItem) => {
  // Add to wishlist
  wishlistStore.addItem({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.image,
    brand: item.brand || '',
    inStock: true
  })

  // Remove from cart
  cartStore.removeItem(item.id, item.color, item.storage)

  // Show success message
  alert(`${item.name} moved to wishlist!`)
}

const clearCart = () => {
  if (confirm('Are you sure you want to clear your entire cart?')) {
    cartStore.clearCart()
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
</script>
