<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
    <div class="container mx-auto px-4 max-w-4xl">
      <div v-if="order" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 transition-colors">
        <!-- Success Header -->
        <div class="text-center mb-8">
          <div class="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
            <CheckCircle class="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
          <p class="text-gray-600 dark:text-gray-300">Thank you for your purchase. Your order has been received and is being processed.</p>
        </div>

        <!-- Order Details -->
        <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Information</h2>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Order Number:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ order.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Order Date:</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.createdAt) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Status:</span>
                  <span class="font-medium" :class="getStatusColor(order.status)">{{ getStatusText(order.status) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Payment Method:</span>
                  <span class="font-medium text-gray-900">{{ getPaymentMethodText(order.paymentMethod) }}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div class="text-sm text-gray-600">
                <p class="font-medium text-gray-900">{{ order.shipping.firstName }} {{ order.shipping.lastName }}</p>
                <p>{{ order.shipping.address }}</p>
                <p>{{ order.shipping.city }}, {{ order.shipping.state }}</p>
                <p v-if="order.shipping.postalCode">{{ order.shipping.postalCode }}</p>
                <p class="mt-2">{{ order.customer.phone }}</p>
                <p>{{ order.customer.email }}</p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div class="border-t border-gray-200 pt-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div class="space-y-4">
              <div
                v-for="item in order.items"
                :key="`${item.id}-${item.color}-${item.storage}`"
                class="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-md"
                >
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
                  <div class="text-sm text-gray-500 space-y-1">
                    <p v-if="item.color">Color: {{ item.color }}</p>
                    <p v-if="item.storage">Storage: {{ item.storage }}</p>
                    <p>Quantity: {{ item.quantity }}</p>
                  </div>
                </div>
                <div class="text-lg font-medium text-gray-900">
                  ₦{{ (item.price * item.quantity).toLocaleString() }}
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t border-gray-200 pt-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div class="bg-gray-50 rounded-lg p-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal:</span>
                <span class="text-gray-900">₦{{ order.subtotal.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Shipping:</span>
                <span class="text-gray-900">₦{{ order.shippingCost.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">VAT (7.5%):</span>
                <span class="text-gray-900">₦{{ order.vatAmount.toLocaleString() }}</span>
              </div>
              <div class="border-t border-gray-300 pt-2">
                <div class="flex justify-between text-lg font-semibold">
                  <span class="text-gray-900">Total:</span>
                  <span class="text-gray-900">₦{{ order.total.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Next Steps -->
          <div class="border-t border-gray-200 pt-8">
            <h2 class="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
            <div class="bg-blue-50 rounded-lg p-4">
              <div v-if="order.status === 'awaiting-payment'" class="text-sm text-blue-800">
                <p class="font-medium mb-2">Payment Required</p>
                <p>Please complete your bank transfer using the details provided. Your order will be processed once payment is confirmed.</p>
              </div>
              <div v-else-if="order.status === 'confirmed'" class="text-sm text-blue-800">
                <p class="font-medium mb-2">Order Confirmed</p>
                <p>We're preparing your order for shipment. You'll receive a tracking number once your order ships.</p>
              </div>
              <div v-else class="text-sm text-blue-800">
                <p class="font-medium mb-2">Order Processing</p>
                <p>Your order is being processed. We'll send you updates via email and SMS.</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="border-t border-gray-200 pt-8 flex flex-col sm:flex-row gap-4">
            <router-link
              to="/shop"
              class="flex-1 bg-accent-blue text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </router-link>
            <router-link
              to="/account"
              class="flex-1 bg-gray-100 text-gray-900 text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View Order History
            </router-link>
          </div>
        </div>
      </div>

      <!-- Order Not Found -->
      <div v-else class="bg-white rounded-lg shadow-sm p-8 text-center">
        <div class="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <XCircle class="w-8 h-8 text-red-600" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
        <p class="text-gray-600 mb-6">We couldn't find the order you're looking for.</p>
        <router-link
          to="/shop"
          class="inline-block bg-accent-blue text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { CheckCircle, XCircle } from 'lucide-vue-next'

const route = useRoute()
const order = ref<any>(null)

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusColor = (status: string) => {
  const colors = {
    'pending': 'text-yellow-600',
    'confirmed': 'text-green-600',
    'awaiting-payment': 'text-orange-600',
    'processing': 'text-blue-600',
    'shipped': 'text-purple-600',
    'delivered': 'text-green-600',
    'cancelled': 'text-red-600'
  }
  return colors[status as keyof typeof colors] || 'text-gray-600'
}

const getStatusText = (status: string) => {
  const texts = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'awaiting-payment': 'Awaiting Payment',
    'processing': 'Processing',
    'shipped': 'Shipped',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  }
  return texts[status as keyof typeof texts] || status
}

const getPaymentMethodText = (method: string) => {
  const methods = {
    'paystack': 'Paystack',
    'flutterwave': 'Flutterwave',
    'bank-transfer': 'Bank Transfer',
    'pay-on-delivery': 'Pay on Delivery'
  }
  return methods[method as keyof typeof methods] || method
}

onMounted(() => {
  const orderId = route.params.id as string
  
  // Get order from localStorage (in a real app, this would be fetched from a server)
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  order.value = orders.find((o: any) => o.id === orderId)
})
</script>
