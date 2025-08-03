<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Email Notifications</h2>
      <div class="flex items-center space-x-4">
        <button
          @click="refreshNotifications"
          :disabled="loading"
          class="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw class="w-4 h-4 inline mr-2" :class="{ 'animate-spin': loading }" />
          Refresh
        </button>
        <button
          @click="showSendEmailModal = true"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Mail class="w-4 h-4 inline mr-2" />
          Send Email
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <Mail class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Sent</p>
            <p class="text-2xl font-bold text-gray-900">{{ sentNotifications.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <Clock class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ pendingNotifications.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <AlertCircle class="w-6 h-6 text-red-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Failed</p>
            <p class="text-2xl font-bold text-gray-900">{{ failedNotifications.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <CheckCircle class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Success Rate</p>
            <p class="text-2xl font-bold text-gray-900">{{ successRate }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
          <select
            v-model="filterType"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="order_confirmation">Order Confirmation</option>
            <option value="order_status">Order Status</option>
            <option value="welcome">Welcome</option>
            <option value="password_reset">Password Reset</option>
            <option value="newsletter">Newsletter</option>
            <option value="promotion">Promotion</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
          <select
            v-model="filterStatus"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="sent">Sent</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by email or subject..."
              class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="w-full px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications Table -->
    <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipient</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="notification in filteredNotifications" :key="notification.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ notification.to }}</div>
                <div v-if="notification.orderId" class="text-sm text-gray-500">Order: {{ notification.orderId }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate">{{ notification.subject }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getTypeColor(notification.type)">
                  {{ formatType(notification.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusColor(notification.status)">
                  {{ notification.status.charAt(0).toUpperCase() + notification.status.slice(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ notification.sentAt ? formatDate(notification.sentAt) : '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="viewNotification(notification)"
                  class="text-blue-600 hover:text-blue-700"
                  title="View Email"
                >
                  <Eye class="w-4 h-4" />
                </button>
                <button
                  v-if="notification.status === 'failed'"
                  @click="resendNotification(notification)"
                  class="text-green-600 hover:text-green-700"
                  title="Resend Email"
                >
                  <RefreshCw class="w-4 h-4" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredNotifications.length === 0" class="text-center py-12">
        <Mail class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No notifications found</h3>
        <p class="mt-1 text-sm text-gray-500">
          {{ notifications.length === 0 ? 'No email notifications have been sent yet.' : 'Try adjusting your filters.' }}
        </p>
      </div>
    </div>

    <!-- Email Preview Modal -->
    <div v-if="showPreviewModal && selectedNotification" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Email Preview</h2>
          <button @click="closePreviewModal" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <div class="space-y-4 mb-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">To:</label>
              <p class="text-sm text-gray-900">{{ selectedNotification.to }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status:</label>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusColor(selectedNotification.status)">
                {{ selectedNotification.status.charAt(0).toUpperCase() + selectedNotification.status.slice(1) }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Subject:</label>
              <p class="text-sm text-gray-900">{{ selectedNotification.subject }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Sent:</label>
              <p class="text-sm text-gray-900">
                {{ selectedNotification.sentAt ? formatDate(selectedNotification.sentAt) : 'Not sent' }}
              </p>
            </div>
          </div>
        </div>

        <div class="border rounded-lg p-4 bg-gray-50">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Email Content</h3>
          <div class="bg-white border rounded p-4" v-html="selectedNotification.content"></div>
        </div>
      </div>
    </div>

    <!-- Send Email Modal -->
    <div v-if="showSendEmailModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-900">Send Email</h2>
          <button @click="closeSendEmailModal" class="text-gray-400 hover:text-gray-600">
            <X class="h-6 w-6" />
          </button>
        </div>

        <form @submit.prevent="sendCustomEmail" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Template</label>
            <select
              v-model="emailForm.template"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a template</option>
              <option value="welcome">Welcome Email</option>
              <option value="newsletter">Newsletter</option>
              <option value="promotion">Promotion</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
            <input
              v-model="emailForm.email"
              type="email"
              required
              placeholder="customer@example.com"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
            <input
              v-model="emailForm.customerName"
              type="text"
              required
              placeholder="John Doe"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div class="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              @click="closeSendEmailModal"
              class="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Mail class="w-4 h-4 inline mr-2" />
              {{ loading ? 'Sending...' : 'Send Email' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  Mail, RefreshCw, Clock, AlertCircle, CheckCircle, Search, Eye, X
} from 'lucide-vue-next'
import { useNotificationsStore } from '@/stores/notifications'
import type { EmailNotification } from '@/services/emailService'

const notificationsStore = useNotificationsStore()

// Reactive state
const filterType = ref('')
const filterStatus = ref('')
const searchQuery = ref('')
const showPreviewModal = ref(false)
const showSendEmailModal = ref(false)
const selectedNotification = ref<EmailNotification | null>(null)

const emailForm = ref({
  template: '',
  email: '',
  customerName: ''
})

// Computed properties
const { 
  notifications, 
  loading, 
  sentNotifications, 
  pendingNotifications, 
  failedNotifications 
} = notificationsStore

const successRate = computed(() => {
  const total = notifications.length
  if (total === 0) return 0
  const sent = sentNotifications.length
  return Math.round((sent / total) * 100)
})

const filteredNotifications = computed(() => {
  let filtered = [...notifications]

  if (filterType.value) {
    filtered = filtered.filter(n => n.type === filterType.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(n => n.status === filterStatus.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(n => 
      n.to.toLowerCase().includes(query) ||
      n.subject.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Methods
const refreshNotifications = () => {
  notificationsStore.loadNotifications()
}

const clearFilters = () => {
  filterType.value = ''
  filterStatus.value = ''
  searchQuery.value = ''
}

const viewNotification = (notification: EmailNotification) => {
  selectedNotification.value = notification
  showPreviewModal.value = true
}

const closePreviewModal = () => {
  showPreviewModal.value = false
  selectedNotification.value = null
}

const closeSendEmailModal = () => {
  showSendEmailModal.value = false
  emailForm.value = {
    template: '',
    email: '',
    customerName: ''
  }
}

const sendCustomEmail = async () => {
  try {
    if (emailForm.value.template === 'welcome') {
      await notificationsStore.sendWelcomeEmail(
        emailForm.value.email,
        emailForm.value.customerName,
        'admin-sent'
      )
    }
    // Add other template types as needed
    
    closeSendEmailModal()
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

const resendNotification = async (notification: EmailNotification) => {
  // Implement resend logic
  console.log('Resending notification:', notification.id)
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'sent':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'order_confirmation':
      return 'bg-blue-100 text-blue-800'
    case 'order_status':
      return 'bg-purple-100 text-purple-800'
    case 'welcome':
      return 'bg-green-100 text-green-800'
    case 'password_reset':
      return 'bg-orange-100 text-orange-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatType = (type: string) => {
  return type.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

onMounted(() => {
  refreshNotifications()
})
</script>
