<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Admin Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <h1 class="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">Administrator</span>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">Welcome, {{ authStore.user?.name }}</span>
            <button
              @click="authStore.logout"
              class="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <nav class="space-y-2">
              <button
                v-for="tab in adminTabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors',
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                <component :is="tab.icon" class="w-5 h-5" />
                <span>{{ tab.name }}</span>
              </button>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Dashboard Overview -->
          <div v-if="activeTab === 'overview'" class="space-y-6">
            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex items-center">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-600">Total Orders</p>
                    <p class="text-2xl font-bold text-gray-900">{{ stats.totalOrders }}</p>
                  </div>
                  <div class="p-3 bg-blue-100 rounded-full">
                    <Package class="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex items-center">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p class="text-2xl font-bold text-gray-900">₦{{ stats.totalRevenue.toLocaleString() }}</p>
                  </div>
                  <div class="p-3 bg-green-100 rounded-full">
                    <DollarSign class="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex items-center">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-600">Total Products</p>
                    <p class="text-2xl font-bold text-gray-900">{{ stats.totalProducts }}</p>
                  </div>
                  <div class="p-3 bg-purple-100 rounded-full">
                    <Smartphone class="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="flex items-center">
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-600">Total Users</p>
                    <p class="text-2xl font-bold text-gray-900">{{ stats.totalUsers }}</p>
                  </div>
                  <div class="p-3 bg-orange-100 rounded-full">
                    <Users class="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Orders -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="order in recentOrders" :key="order.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ order.id }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.customer.email }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{{ order.total.toLocaleString() }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="getStatusBadgeClass(order.status)" class="px-2 py-1 text-xs font-medium rounded-full">
                          {{ getStatusText(order.status) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(order.createdAt) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Products Management -->
          <div v-if="activeTab === 'products'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Products Management</h2>
              <button
                @click="openAddProductForm"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus class="w-4 h-4 inline mr-2" />
                Add Product
              </button>
            </div>

            <!-- Products Table -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center space-x-4">
                  <div class="flex-1">
                    <input
                      v-model="productSearch"
                      type="text"
                      placeholder="Search products..."
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                  <select
                    v-model="productFilter"
                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    <option value="iPhone">iPhone</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Google">Google</option>
                    <option value="OnePlus">OnePlus</option>
                  </select>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="product in filteredProducts" :key="product.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <img :src="product.image" :alt="product.name" class="w-10 h-10 object-cover rounded-md mr-4">
                          <div>
                            <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                            <div class="text-sm text-gray-500">{{ product.brand }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ product.category }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{{ product.price.toLocaleString() }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ product.inStock ? 'Available' : 'Out of Stock' }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 text-xs font-medium rounded-full">
                          {{ product.inStock ? 'In Stock' : 'Out of Stock' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          @click="openEditProductForm(product)"
                          class="text-blue-600 hover:text-blue-700 mr-3"
                          title="Edit Product"
                        >
                          <Edit class="w-4 h-4" />
                        </button>
                        <button
                          @click="deleteProductHandler(product.id)"
                          class="text-red-600 hover:text-red-800"
                          title="Delete Product"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Orders Management -->
          <div v-if="activeTab === 'orders'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Orders Management</h2>
              <div class="flex items-center space-x-4">
                <select
                  v-model="orderStatusFilter"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="order in filteredOrders" :key="order.id">
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ order.id }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{ order.customer.email }}</div>
                        <div class="text-sm text-gray-500">{{ order.customer.phone }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.items.length }} items</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{{ order.total.toLocaleString() }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <select
                          :value="order.status"
                          @change="updateOrderStatus(order.id, ($event.target as HTMLSelectElement).value)"
                          class="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(order.createdAt) }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          @click="viewOrderDetails(order)"
                          class="text-blue-600 hover:text-blue-700 mr-3"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Users Management -->
          <div v-if="activeTab === 'users'" class="space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold text-gray-900">Users Management</h2>
              <div class="flex items-center space-x-4">
                <input
                  v-model="userSearch"
                  type="text"
                  placeholder="Search users..."
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </div>

            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in filteredUsers" :key="user.id">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500">Joined {{ formatDate(user.createdAt) }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.phone || 'N/A' }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.orderCount || 0 }}</td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{{ (user.totalSpent || 0).toLocaleString() }}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span :class="user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 text-xs font-medium rounded-full">
                          {{ user.isActive ? 'Active' : 'Inactive' }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          @click="toggleUserStatus(user.id)"
                          :class="user.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'"
                        >
                          {{ user.isActive ? 'Deactivate' : 'Activate' }}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Inventory Management -->
          <div v-if="activeTab === 'inventory'">
            <InventoryManagement />
          </div>

          <!-- Email Notifications -->
          <div v-if="activeTab === 'emails'">
            <EmailNotifications />
          </div>

          <!-- Analytics -->
          <div v-if="activeTab === 'analytics'">
            <AnalyticsCharts />
          </div>

          <!-- Settings -->
          <div v-if="activeTab === 'settings'" class="space-y-6">
            <h2 class="text-2xl font-bold text-gray-900">Settings</h2>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <!-- Store Settings -->
              <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Store Settings</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                    <input
                      v-model="settings.storeName"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Store Email</label>
                    <input
                      v-model="settings.storeEmail"
                      type="email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Store Phone</label>
                    <input
                      v-model="settings.storePhone"
                      type="tel"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                  </div>
                </div>
              </div>

              <!-- Payment Settings -->
              <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment Settings</h3>
                <div class="space-y-4">
                  <div>
                    <label class="flex items-center">
                      <input
                        v-model="settings.paystackEnabled"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">Enable Paystack</span>
                    </label>
                  </div>
                  <div>
                    <label class="flex items-center">
                      <input
                        v-model="settings.flutterwaveEnabled"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">Enable Flutterwave</span>
                    </label>
                  </div>
                  <div>
                    <label class="flex items-center">
                      <input
                        v-model="settings.bankTransferEnabled"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">Enable Bank Transfer</span>
                    </label>
                  </div>
                  <div>
                    <label class="flex items-center">
                      <input
                        v-model="settings.payOnDeliveryEnabled"
                        type="checkbox"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      >
                      <span class="ml-2 text-sm text-gray-700">Enable Pay on Delivery</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                @click="saveSettings"
                class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Form Modal -->
    <ProductForm
      v-if="showProductForm"
      :product="editingProduct"
      @close="closeProductForm"
      @saved="handleProductSaved"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Package, DollarSign, Smartphone, Users, Plus, Edit, Trash2,
  BarChart3, ShoppingCart, Settings, Home, Search, Filter, Mail, Warehouse
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useProductsStore } from '@/stores/products'
import ProductForm from '@/components/admin/ProductForm.vue'
import EmailNotifications from '@/components/admin/EmailNotifications.vue'
import AnalyticsCharts from '@/components/admin/AnalyticsCharts.vue'
import InventoryManagement from '@/components/admin/InventoryManagement.vue'

const router = useRouter()
const authStore = useAuthStore()
const productStore = useProductsStore()

// Check admin access
onMounted(() => {
  if (!authStore.isAuthenticated || !authStore.user?.isAdmin) {
    router.push('/')
  }
})

// Admin navigation tabs
const adminTabs = [
  { id: 'overview', name: 'Overview', icon: Home },
  { id: 'products', name: 'Products', icon: Smartphone },
  { id: 'orders', name: 'Orders', icon: ShoppingCart },
  { id: 'users', name: 'Users', icon: Users },
  { id: 'inventory', name: 'Inventory', icon: Warehouse },
  { id: 'emails', name: 'Email Notifications', icon: Mail },
  { id: 'analytics', name: 'Analytics', icon: BarChart3 },
  { id: 'settings', name: 'Settings', icon: Settings }
]

const activeTab = ref('overview')

// Dashboard stats
const stats = ref({
  totalOrders: 0,
  totalRevenue: 0,
  totalProducts: 0,
  totalUsers: 0
})

// Recent orders
const recentOrders = ref<any[]>([])

// Product management
const productSearch = ref('')
const productFilter = ref('')
const showProductForm = ref(false)
const editingProduct = ref(null)

const openAddProductForm = () => {
  editingProduct.value = null
  showProductForm.value = true
}

const openEditProductForm = (product: any) => {
  editingProduct.value = product
  showProductForm.value = true
}

const closeProductForm = () => {
  showProductForm.value = false
  editingProduct.value = null
}

const handleProductSaved = () => {
  // Product is automatically saved in the store
  // Just close the form
  closeProductForm()
}

const deleteProductHandler = (productId: string) => {
  if (confirm('Are you sure you want to delete this product?')) {
    productStore.deleteProduct(productId)
  }
}

// Order management
const orderStatusFilter = ref('')
const allOrders = ref<any[]>([])

// User management
const userSearch = ref('')
const allUsers = ref<any[]>([])

// Analytics data
const analytics = ref({
  monthlySales: 0,
  monthlyOrders: 0,
  averageOrderValue: 0,
  topProducts: [] as any[]
})

// Settings
const settings = ref({
  storeName: 'PhoneStore Nigeria',
  storeEmail: 'info@phonestore.ng',
  storePhone: '+234 800 000 0000',
  paystackEnabled: true,
  flutterwaveEnabled: true,
  bankTransferEnabled: true,
  payOnDeliveryEnabled: true
})

// Computed properties
const filteredProducts = computed(() => {
  let products = productStore.products
  
  if (productSearch.value) {
    products = products.filter(product =>
      product.name.toLowerCase().includes(productSearch.value.toLowerCase()) ||
      product.brand.toLowerCase().includes(productSearch.value.toLowerCase())
    )
  }
  
  if (productFilter.value) {
    products = products.filter(product =>
      product.brand === productFilter.value
    )
  }
  
  return products
})

const filteredOrders = computed(() => {
  let orders = allOrders.value

  if (orderStatusFilter.value) {
    orders = orders.filter(order => order.status === orderStatusFilter.value)
  }

  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
})

const filteredUsers = computed(() => {
  let users = allUsers.value

  if (userSearch.value) {
    users = users.filter(user =>
      user.name.toLowerCase().includes(userSearch.value.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.value.toLowerCase())
    )
  }

  return users
})

// Methods
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
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

const getStatusBadgeClass = (status: string) => {
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-green-100 text-green-800',
    'awaiting-payment': 'bg-orange-100 text-orange-800',
    'processing': 'bg-blue-100 text-blue-800',
    'shipped': 'bg-purple-100 text-purple-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const editProduct = (product: any) => {
  // TODO: Implement product editing
  console.log('Edit product:', product)
}

const deleteProduct = (productId: string) => {
  if (confirm('Are you sure you want to delete this product?')) {
    // TODO: Implement product deletion
    console.log('Delete product:', productId)
  }
}

const updateOrderStatus = (orderId: string, newStatus: string) => {
  const orderIndex = allOrders.value.findIndex(order => order.id === orderId)
  if (orderIndex > -1) {
    allOrders.value[orderIndex].status = newStatus

    // Update in localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    const localOrderIndex = orders.findIndex((order: any) => order.id === orderId)
    if (localOrderIndex > -1) {
      orders[localOrderIndex].status = newStatus
      localStorage.setItem('orders', JSON.stringify(orders))
    }

    // Refresh recent orders
    recentOrders.value = allOrders.value.slice(-5).reverse()
  }
}

const viewOrderDetails = (order: any) => {
  // TODO: Implement order details modal
  console.log('View order details:', order)
  alert(`Order Details:\n\nOrder ID: ${order.id}\nCustomer: ${order.customer.email}\nTotal: ₦${order.total.toLocaleString()}\nStatus: ${order.status}`)
}

const toggleUserStatus = (userId: string) => {
  const userIndex = allUsers.value.findIndex(user => user.id === userId)
  if (userIndex > -1) {
    allUsers.value[userIndex].isActive = !allUsers.value[userIndex].isActive

    // In a real app, this would update the backend
    console.log('Toggle user status:', userId, allUsers.value[userIndex].isActive)
  }
}

const saveSettings = () => {
  // Save settings to localStorage
  localStorage.setItem('adminSettings', JSON.stringify(settings.value))
  alert('Settings saved successfully!')
}

// Load dashboard data
const loadDashboardData = () => {
  // Load orders from localStorage
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')
  allOrders.value = orders
  recentOrders.value = orders.slice(-5).reverse()

  // Calculate stats
  stats.value = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum: number, order: any) => sum + order.total, 0),
    totalProducts: productStore.products.length,
    totalUsers: allUsers.value.length
  }

  // Calculate analytics
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  const monthlyOrders = orders.filter((order: any) => {
    const orderDate = new Date(order.createdAt)
    return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear
  })

  analytics.value = {
    monthlySales: monthlyOrders.reduce((sum: number, order: any) => sum + order.total, 0),
    monthlyOrders: monthlyOrders.length,
    averageOrderValue: monthlyOrders.length > 0 ?
      monthlyOrders.reduce((sum: number, order: any) => sum + order.total, 0) / monthlyOrders.length : 0,
    topProducts: getTopProducts(orders)
  }
}

const getTopProducts = (orders: any[]) => {
  const productSales: { [key: string]: { product: any, soldCount: number, revenue: number } } = {}

  orders.forEach(order => {
    order.items.forEach((item: any) => {
      if (!productSales[item.id]) {
        productSales[item.id] = {
          product: item,
          soldCount: 0,
          revenue: 0
        }
      }
      productSales[item.id].soldCount += item.quantity
      productSales[item.id].revenue += item.price * item.quantity
    })
  })

  return Object.values(productSales)
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 5)
    .map(item => ({
      id: item.product.id,
      name: item.product.name,
      brand: item.product.brand || 'Unknown',
      image: item.product.image,
      soldCount: item.soldCount,
      revenue: item.revenue
    }))
}

const loadMockUsers = () => {
  // Mock user data
  allUsers.value = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+234 800 123 4567',
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
      orderCount: 3,
      totalSpent: 450000
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+234 800 987 6543',
      isActive: true,
      createdAt: '2024-02-20T14:30:00Z',
      orderCount: 1,
      totalSpent: 180000
    },
    {
      id: '3',
      name: 'Admin User',
      email: 'admin@phonestore.ng',
      phone: '+234 800 000 0000',
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      orderCount: 0,
      totalSpent: 0
    }
  ]
}

const loadSettings = () => {
  const savedSettings = localStorage.getItem('adminSettings')
  if (savedSettings) {
    settings.value = { ...settings.value, ...JSON.parse(savedSettings) }
  }
}

onMounted(() => {
  loadMockUsers()
  loadSettings()
  loadDashboardData()
})
</script>
