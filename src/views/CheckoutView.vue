<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <router-link to="/cart" class="hover:text-accent-blue">Cart</router-link>
          <ChevronRight class="w-4 h-4" />
          <span class="text-accent-blue font-medium">Checkout</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Checkout Form -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Contact Information -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-gray-900">Contact Information</h2>
              <div v-if="!authStore.isAuthenticated" class="text-sm">
                <span class="text-gray-600">Already have an account?</span>
                <router-link to="/auth" class="text-accent-blue hover:underline ml-1">Sign in</router-link>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  v-model="checkoutForm.email"
                  type="email"
                  required
                  :disabled="authStore.isAuthenticated"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent disabled:bg-gray-100"
                  placeholder="your@email.com"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  v-model="checkoutForm.phone"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="+234 800 000 0000"
                >
              </div>
            </div>

            <div class="mt-4">
              <label class="flex items-center">
                <input
                  v-model="checkoutForm.subscribeNewsletter"
                  type="checkbox"
                  class="rounded border-gray-300 text-accent-blue focus:ring-accent-blue"
                >
                <span class="ml-2 text-sm text-gray-600">Subscribe to our newsletter for updates and deals</span>
              </label>
            </div>
          </div>

          <!-- Shipping Address -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  v-model="checkoutForm.shipping.firstName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="John"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  v-model="checkoutForm.shipping.lastName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="Doe"
                >
              </div>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <input
                v-model="checkoutForm.shipping.address"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                placeholder="123 Main Street"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">City *</label>
                <input
                  v-model="checkoutForm.shipping.city"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="Lagos"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">State *</label>
                <select
                  v-model="checkoutForm.shipping.state"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                >
                  <option value="">Select State</option>
                  <option v-for="state in nigerianStates" :key="state" :value="state">{{ state }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input
                  v-model="checkoutForm.shipping.postalCode"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent"
                  placeholder="100001"
                >
              </div>
            </div>

            <div class="mt-4">
              <label class="flex items-center">
                <input
                  v-model="checkoutForm.sameAsBilling"
                  type="checkbox"
                  class="rounded border-gray-300 text-accent-blue focus:ring-accent-blue"
                >
                <span class="ml-2 text-sm text-gray-600">Billing address is the same as shipping address</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

            <!-- Cart Items -->
            <div class="space-y-4 mb-6">
              <div
                v-for="item in cartStore.items"
                :key="`${item.id}-${item.color}-${item.storage}`"
                class="flex items-center space-x-3"
              >
                <div class="relative">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="w-16 h-16 object-cover rounded-md"
                  >
                  <span class="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {{ item.quantity }}
                  </span>
                </div>
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium text-gray-900 truncate">{{ item.name }}</h3>
                  <div class="text-xs text-gray-500 space-y-1">
                    <p v-if="item.color">Color: {{ item.color }}</p>
                    <p v-if="item.storage">Storage: {{ item.storage }}</p>
                  </div>
                </div>
                <div class="text-sm font-medium text-gray-900">
                  ₦{{ (item.price * item.quantity).toLocaleString() }}
                </div>
              </div>
            </div>

            <!-- Shipping Options -->
            <div class="border-t border-gray-200 pt-6 mb-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Shipping Method</h3>
              <div class="space-y-3">
                <label class="flex items-center">
                  <input
                    v-model="selectedShipping"
                    type="radio"
                    value="standard"
                    class="text-accent-blue focus:ring-accent-blue"
                  >
                  <div class="ml-3 flex-1">
                    <div class="flex justify-between">
                      <span class="text-sm font-medium text-gray-900">Standard Delivery</span>
                      <span class="text-sm text-gray-900">₦2,500</span>
                    </div>
                    <p class="text-xs text-gray-500">5-7 business days</p>
                  </div>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="selectedShipping"
                    type="radio"
                    value="express"
                    class="text-accent-blue focus:ring-accent-blue"
                  >
                  <div class="ml-3 flex-1">
                    <div class="flex justify-between">
                      <span class="text-sm font-medium text-gray-900">Express Delivery</span>
                      <span class="text-sm text-gray-900">₦5,000</span>
                    </div>
                    <p class="text-xs text-gray-500">2-3 business days</p>
                  </div>
                </label>
                <label class="flex items-center">
                  <input
                    v-model="selectedShipping"
                    type="radio"
                    value="same-day"
                    class="text-accent-blue focus:ring-accent-blue"
                  >
                  <div class="ml-3 flex-1">
                    <div class="flex justify-between">
                      <span class="text-sm font-medium text-gray-900">Same Day Delivery</span>
                      <span class="text-sm text-gray-900">₦8,000</span>
                    </div>
                    <p class="text-xs text-gray-500">Within Lagos only</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Order Totals -->
            <div class="border-t border-gray-200 pt-6 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="text-gray-900">₦{{ cartStore.subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping</span>
                <span class="text-gray-900">₦{{ shippingCost.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">VAT (7.5%)</span>
                <span class="text-gray-900">₦{{ vatAmount.toLocaleString() }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-lg font-semibold">
                  <span class="text-gray-900">Total</span>
                  <span class="text-gray-900">₦{{ totalAmount.toLocaleString() }}</span>
                </div>
              </div>
            </div>

            <!-- Payment Methods -->
            <div class="border-t border-gray-200 pt-6 mt-6">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
              <div class="space-y-3">
                <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    value="paystack"
                    class="text-accent-blue focus:ring-accent-blue"
                  >
                  <div class="ml-3 flex-1">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium text-gray-900">Paystack</span>
                      <div class="text-xs text-gray-500">
                        Visa • Mastercard
                      </div>
                    </div>
                    <p class="text-xs text-gray-500">Pay securely with your card</p>
                  </div>
                </label>
                <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    value="flutterwave"
                    class="text-accent-blue focus:ring-accent-blue"
                  >
                  <div class="ml-3 flex-1">
                    <div class="flex items-center justify-between">
                      <span class="text-sm font-medium text-gray-900">Flutterwave</span>
                      <div class="text-xs text-gray-500">
                        Visa • Mastercard
                      </div>
                    </div>
                    <p class="text-xs text-gray-500">Pay with card, bank transfer, or mobile money</p>
                  </div>
                </label>
                <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    value="bank-transfer"
                    class="text-accent-blue focus:ring-accent-blue"
                  >
                  <div class="ml-3 flex-1">
                    <span class="text-sm font-medium text-gray-900">Bank Transfer</span>
                    <p class="text-xs text-gray-500">Pay directly to our bank account</p>
                  </div>
                </label>
                <label class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    v-model="selectedPayment"
                    type="radio"
                    value="pay-on-delivery"
                    class="text-accent-blue focus:ring-accent-blue"
                  >
                  <div class="ml-3 flex-1">
                    <span class="text-sm font-medium text-gray-900">Pay on Delivery</span>
                    <p class="text-xs text-gray-500">Pay when your order arrives</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Place Order Button -->
            <button
              @click="placeOrder"
              :disabled="!canPlaceOrder || isProcessing"
              class="w-full mt-6 bg-accent-blue text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isProcessing">Processing...</span>
              <span v-else>Place Order - ₦{{ totalAmount.toLocaleString() }}</span>
            </button>

            <p class="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our
              <router-link to="/terms" class="text-accent-blue hover:underline">Terms & Conditions</router-link>
              and
              <router-link to="/privacy" class="text-accent-blue hover:underline">Privacy Policy</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// Nigerian states for the dropdown
const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
  'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
  'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
  'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
]

// Checkout form data
const checkoutForm = ref({
  email: '',
  phone: '',
  subscribeNewsletter: false,
  sameAsBilling: true,
  shipping: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: ''
  },
  billing: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: ''
  }
})

// Shipping and payment options
const selectedShipping = ref('standard')
const selectedPayment = ref('paystack')
const isProcessing = ref(false)

// Computed values
const shippingCost = computed(() => {
  const costs = {
    standard: 2500,
    express: 5000,
    'same-day': 8000
  }
  return costs[selectedShipping.value as keyof typeof costs] || 0
})

const vatAmount = computed(() => {
  return Math.round((cartStore.subtotal + shippingCost.value) * 0.075)
})

const totalAmount = computed(() => {
  return cartStore.subtotal + shippingCost.value + vatAmount.value
})

const canPlaceOrder = computed(() => {
  const form = checkoutForm.value
  const hasRequiredFields = form.email && form.phone &&
    form.shipping.firstName && form.shipping.lastName &&
    form.shipping.address && form.shipping.city && form.shipping.state

  const hasBillingIfNeeded = form.sameAsBilling || (
    form.billing.firstName && form.billing.lastName &&
    form.billing.address && form.billing.city && form.billing.state
  )

  return hasRequiredFields && hasBillingIfNeeded && selectedPayment.value && cartStore.items.length > 0
})

// Methods
const placeOrder = async () => {
  if (!canPlaceOrder.value) return

  isProcessing.value = true

  try {
    // Prepare order data
    const orderData = {
      id: `ORD-${Date.now()}`,
      items: cartStore.items,
      customer: {
        email: checkoutForm.value.email,
        phone: checkoutForm.value.phone,
        subscribeNewsletter: checkoutForm.value.subscribeNewsletter
      },
      shipping: checkoutForm.value.shipping,
      billing: checkoutForm.value.sameAsBilling ? checkoutForm.value.shipping : checkoutForm.value.billing,
      shippingMethod: selectedShipping.value,
      paymentMethod: selectedPayment.value,
      subtotal: cartStore.subtotal,
      shippingCost: shippingCost.value,
      vatAmount: vatAmount.value,
      total: totalAmount.value,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // Process payment based on selected method
    if (selectedPayment.value === 'paystack') {
      await processPaystackPayment(orderData)
    } else if (selectedPayment.value === 'flutterwave') {
      await processFlutterwavePayment(orderData)
    } else if (selectedPayment.value === 'bank-transfer') {
      await processBankTransfer(orderData)
    } else if (selectedPayment.value === 'pay-on-delivery') {
      await processPayOnDelivery(orderData)
    }

  } catch (error) {
    console.error('Order processing failed:', error)
    alert('Order processing failed. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

const processPaystackPayment = async (orderData: any) => {
  // Mock Paystack integration
  const confirmed = confirm(`Process payment of ₦${orderData.total.toLocaleString()} via Paystack?`)
  if (confirmed) {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    completeOrder(orderData)
  }
}

const processFlutterwavePayment = async (orderData: any) => {
  // Mock Flutterwave integration
  const confirmed = confirm(`Process payment of ₦${orderData.total.toLocaleString()} via Flutterwave?`)
  if (confirmed) {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    completeOrder(orderData)
  }
}

const processBankTransfer = async (orderData: any) => {
  // Show bank details
  alert(`Please transfer ₦${orderData.total.toLocaleString()} to:\n\nBank: GTBank\nAccount: 0123456789\nAccount Name: PhoneStore Nigeria\n\nYour order will be processed once payment is confirmed.`)
  orderData.status = 'awaiting-payment'
  completeOrder(orderData)
}

const processPayOnDelivery = async (orderData: any) => {
  // Confirm pay on delivery
  const confirmed = confirm(`Confirm order for ₦${orderData.total.toLocaleString()} to be paid on delivery?`)
  if (confirmed) {
    orderData.status = 'confirmed'
    completeOrder(orderData)
  }
}

const completeOrder = (orderData: any) => {
  // Save order to localStorage (in a real app, this would be sent to a server)
  const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]')
  existingOrders.push(orderData)
  localStorage.setItem('orders', JSON.stringify(existingOrders))

  // Clear cart
  cartStore.clearCart()

  // Redirect to order confirmation
  router.push(`/order-confirmation/${orderData.id}`)
}

// Initialize form with user data if authenticated
onMounted(() => {
  // Redirect if cart is empty
  if (cartStore.items.length === 0) {
    router.push('/cart')
    return
  }

  if (authStore.isAuthenticated && authStore.user) {
    checkoutForm.value.email = authStore.user.email
    checkoutForm.value.phone = authStore.user.phone || ''

    // Split name if available
    if (authStore.user.name) {
      const nameParts = authStore.user.name.split(' ')
      checkoutForm.value.shipping.firstName = nameParts[0] || ''
      checkoutForm.value.shipping.lastName = nameParts.slice(1).join(' ') || ''
    }
  }
})
</script>
