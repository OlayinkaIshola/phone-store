<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Account Header -->
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <img
              :src="user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'User') + '&background=007AFF&color=fff'"
              :alt="user?.name"
              class="w-16 h-16 rounded-full object-cover"
            >
            <button
              @click="showAvatarUpload = true"
              class="absolute bottom-0 right-0 bg-accent-blue text-white rounded-full p-1 hover:bg-blue-700"
            >
              <Camera class="h-4 w-4" />
            </button>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-secondary">{{ user?.name }}</h1>
            <p class="text-gray-600">{{ user?.email }}</p>
            <div class="flex items-center mt-1">
              <span
                :class="user?.emailVerified ? 'text-green-600' : 'text-orange-600'"
                class="text-sm flex items-center"
              >
                <CheckCircle v-if="user?.emailVerified" class="h-4 w-4 mr-1" />
                <AlertCircle v-else class="h-4 w-4 mr-1" />
                {{ user?.emailVerified ? 'Email verified' : 'Email not verified' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="lg:col-span-1">
          <nav class="bg-white rounded-lg shadow p-6">
            <ul class="space-y-2">
              <li>
                <button
                  @click="activeTab = 'profile'"
                  :class="activeTab === 'profile' ? 'bg-accent-blue text-white' : 'text-gray-700 hover:bg-gray-100'"
                  class="w-full text-left px-4 py-2 rounded-md flex items-center space-x-3"
                >
                  <User class="h-5 w-5" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  @click="activeTab = 'orders'"
                  :class="activeTab === 'orders' ? 'bg-accent-blue text-white' : 'text-gray-700 hover:bg-gray-100'"
                  class="w-full text-left px-4 py-2 rounded-md flex items-center space-x-3"
                >
                  <Package class="h-5 w-5" />
                  <span>Orders</span>
                </button>
              </li>
              <li>
                <button
                  @click="activeTab = 'addresses'"
                  :class="activeTab === 'addresses' ? 'bg-accent-blue text-white' : 'text-gray-700 hover:bg-gray-100'"
                  class="w-full text-left px-4 py-2 rounded-md flex items-center space-x-3"
                >
                  <MapPin class="h-5 w-5" />
                  <span>Addresses</span>
                </button>
              </li>
              <li>
                <button
                  @click="activeTab = 'security'"
                  :class="activeTab === 'security' ? 'bg-accent-blue text-white' : 'text-gray-700 hover:bg-gray-100'"
                  class="w-full text-left px-4 py-2 rounded-md flex items-center space-x-3"
                >
                  <Shield class="h-5 w-5" />
                  <span>Security</span>
                </button>
              </li>
              <li>
                <router-link
                  to="/wishlist"
                  class="w-full text-left px-4 py-2 rounded-md flex items-center space-x-3 text-gray-700 hover:bg-gray-100"
                >
                  <Heart class="h-5 w-5" />
                  <span>Wishlist</span>
                </router-link>
              </li>
              <li>
                <button
                  @click="handleLogout"
                  class="w-full text-left px-4 py-2 rounded-md flex items-center space-x-3 text-red-600 hover:bg-red-50"
                >
                  <LogOut class="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Profile Tab -->
          <div v-if="activeTab === 'profile'" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-secondary mb-6">Profile Information</h2>

            <form @submit.prevent="updateProfile" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    v-model="profileForm.firstName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    v-model="profileForm.lastName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div class="relative">
                  <input
                    v-model="profileForm.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                  >
                  <Mail class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div class="relative">
                  <input
                    v-model="profileForm.phone"
                    type="tel"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                    placeholder="+234 xxx xxx xxxx"
                  >
                  <Phone class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="isUpdating"
                  class="px-6 py-2 bg-accent-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                >
                  <Loader2 v-if="isUpdating" class="h-4 w-4 animate-spin" />
                  <span>{{ isUpdating ? 'Updating...' : 'Update Profile' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Orders Tab -->
          <div v-else-if="activeTab === 'orders'" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-secondary mb-6">Order History</h2>

            <div v-if="orders.length === 0" class="text-center py-12">
              <Package class="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p class="text-gray-600 mb-4">Start shopping to see your orders here</p>
              <router-link
                to="/shop"
                class="inline-flex items-center px-4 py-2 bg-accent-blue text-white rounded-md hover:bg-blue-700"
              >
                <ShoppingBag class="h-4 w-4 mr-2" />
                Start Shopping
              </router-link>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="order in orders"
                :key="order.id"
                class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div class="flex items-center justify-between mb-3">
                  <div>
                    <h3 class="font-medium text-gray-900">Order #{{ order.id }}</h3>
                    <p class="text-sm text-gray-600">{{ formatDate(order.date) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-medium text-gray-900">₦{{ order.total.toLocaleString() }}</p>
                    <span
                      :class="getOrderStatusColor(order.status)"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                </div>

                <div class="flex items-center space-x-4">
                  <img
                    :src="order.items[0].image"
                    :alt="order.items[0].name"
                    class="w-12 h-12 object-cover rounded"
                  >
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900">{{ order.items[0].name }}</p>
                    <p v-if="order.items.length > 1" class="text-sm text-gray-600">
                      +{{ order.items.length - 1 }} more item{{ order.items.length > 2 ? 's' : '' }}
                    </p>
                  </div>
                  <button class="text-accent-blue hover:text-blue-700 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Addresses Tab -->
          <div v-else-if="activeTab === 'addresses'" class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold text-secondary">Saved Addresses</h2>
              <button
                @click="showAddressForm = true"
                class="px-4 py-2 bg-accent-blue text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus class="h-4 w-4" />
                <span>Add Address</span>
              </button>
            </div>

            <div v-if="addresses.length === 0" class="text-center py-12">
              <MapPin class="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 class="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
              <p class="text-gray-600">Add an address for faster checkout</p>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="address in addresses"
                :key="address.id"
                class="border border-gray-200 rounded-lg p-4 relative"
              >
                <div class="flex items-start justify-between mb-2">
                  <h3 class="font-medium text-gray-900">{{ address.label }}</h3>
                  <div class="flex items-center space-x-2">
                    <button class="text-gray-400 hover:text-gray-600">
                      <Edit2 class="h-4 w-4" />
                    </button>
                    <button class="text-red-400 hover:text-red-600">
                      <Trash2 class="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p class="text-sm text-gray-600">{{ address.name }}</p>
                <p class="text-sm text-gray-600">{{ address.street }}</p>
                <p class="text-sm text-gray-600">{{ address.city }}, {{ address.state }} {{ address.zipCode }}</p>
                <p class="text-sm text-gray-600">{{ address.phone }}</p>

                <div v-if="address.isDefault" class="mt-2">
                  <span class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Default
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Security Tab -->
          <div v-else-if="activeTab === 'security'" class="bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-semibold text-secondary mb-6">Security Settings</h2>

            <div class="space-y-8">
              <!-- Change Password -->
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                <form @submit.prevent="changePassword" class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      v-model="passwordForm.currentPassword"
                      type="password"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      v-model="passwordForm.newPassword"
                      type="password"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      v-model="passwordForm.confirmPassword"
                      type="password"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                    >
                  </div>

                  <button
                    type="submit"
                    :disabled="isChangingPassword"
                    class="px-6 py-2 bg-accent-blue text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
                  >
                    <Loader2 v-if="isChangingPassword" class="h-4 w-4 animate-spin" />
                    <span>{{ isChangingPassword ? 'Updating...' : 'Change Password' }}</span>
                  </button>
                </form>
              </div>

              <!-- Two-Factor Authentication -->
              <div class="border-t pt-8">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                    <p class="text-sm text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    @click="toggle2FA"
                    :class="twoFactorEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-300 hover:bg-gray-400'"
                    class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                  >
                    <span
                      :class="twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'"
                      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  User, Package, MapPin, Shield, Heart, LogOut, Camera, CheckCircle, AlertCircle,
  Mail, Phone, Loader2, ShoppingBag, Plus, Edit2, Trash2
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Reactive state
const activeTab = ref('profile')
const isUpdating = ref(false)
const isChangingPassword = ref(false)
const showAvatarUpload = ref(false)
const showAddressForm = ref(false)
const twoFactorEnabled = ref(false)

// User data
const user = computed(() => authStore.user)

// Profile form
const profileForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

// Password form
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Mock data for orders
const orders = ref([
  {
    id: '12345',
    date: '2024-01-15',
    status: 'Delivered',
    total: 450000,
    items: [
      {
        name: 'iPhone 15 Pro',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
      }
    ]
  },
  {
    id: '12344',
    date: '2024-01-10',
    status: 'Processing',
    total: 280000,
    items: [
      {
        name: 'Samsung Galaxy S24',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400'
      },
      {
        name: 'Phone Case',
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400'
      }
    ]
  }
])

// Mock data for addresses
const addresses = ref([
  {
    id: '1',
    label: 'Home',
    name: 'John Doe',
    street: '123 Main Street',
    city: 'Lagos',
    state: 'Lagos State',
    zipCode: '100001',
    phone: '+234 800 123 4567',
    isDefault: true
  },
  {
    id: '2',
    label: 'Office',
    name: 'John Doe',
    street: '456 Business Ave',
    city: 'Abuja',
    state: 'FCT',
    zipCode: '900001',
    phone: '+234 800 123 4567',
    isDefault: false
  }
])

// Methods
const initializeProfileForm = () => {
  if (user.value) {
    profileForm.value = {
      firstName: user.value.firstName || '',
      lastName: user.value.lastName || '',
      email: user.value.email || '',
      phone: user.value.phone || ''
    }
  }
}

const updateProfile = async () => {
  isUpdating.value = true

  try {
    await authStore.updateProfile({
      firstName: profileForm.value.firstName,
      lastName: profileForm.value.lastName,
      name: `${profileForm.value.firstName} ${profileForm.value.lastName}`,
      email: profileForm.value.email,
      phone: profileForm.value.phone
    })

    // Show success message
    alert('Profile updated successfully!')
  } catch (error) {
    alert('Failed to update profile. Please try again.')
  } finally {
    isUpdating.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('New passwords do not match')
    return
  }

  if (passwordForm.value.newPassword.length < 8) {
    alert('Password must be at least 8 characters long')
    return
  }

  isChangingPassword.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Reset form
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }

    alert('Password changed successfully!')
  } catch (error) {
    alert('Failed to change password. Please try again.')
  } finally {
    isChangingPassword.value = false
  }
}

const toggle2FA = () => {
  twoFactorEnabled.value = !twoFactorEnabled.value
  // In a real app, this would make an API call
  alert(`Two-factor authentication ${twoFactorEnabled.value ? 'enabled' : 'disabled'}`)
}

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    authStore.logout()
    router.push('/')
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getOrderStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800'
    case 'processing':
      return 'bg-blue-100 text-blue-800'
    case 'shipped':
      return 'bg-purple-100 text-purple-800'
    case 'cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Initialize profile form when component mounts
onMounted(() => {
  initializeProfileForm()
})
</script>
