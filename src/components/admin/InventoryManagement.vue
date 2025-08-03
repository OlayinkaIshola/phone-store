<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold text-gray-900">Inventory Management</h2>
      <div class="flex items-center space-x-3">
        <button
          @click="showStockAdjustment = true"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus class="w-4 h-4" />
          <span>Adjust Stock</span>
        </button>
        <button
          @click="acknowledgeAllAlerts"
          v-if="pendingAlerts.length > 0"
          class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
        >
          <CheckCircle class="w-4 h-4" />
          <span>Clear All Alerts</span>
        </button>
      </div>
    </div>

    <!-- Inventory Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Total Value</h3>
          <DollarSign class="w-5 h-5 text-green-600" />
        </div>
        <div class="text-3xl font-bold text-gray-900 mb-2">₦{{ totalInventoryValue.toLocaleString() }}</div>
        <div class="text-sm text-gray-500">Across {{ inventory.length }} products</div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Low Stock Items</h3>
          <AlertTriangle class="w-5 h-5 text-yellow-600" />
        </div>
        <div class="text-3xl font-bold text-yellow-600 mb-2">{{ lowStockItems.length }}</div>
        <div class="text-sm text-gray-500">Need attention</div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Out of Stock</h3>
          <XCircle class="w-5 h-5 text-red-600" />
        </div>
        <div class="text-3xl font-bold text-red-600 mb-2">{{ outOfStockItems.length }}</div>
        <div class="text-sm text-gray-500">Immediate action required</div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Turnover Rate</h3>
          <TrendingUp class="w-5 h-5 text-blue-600" />
        </div>
        <div class="text-3xl font-bold text-blue-600 mb-2">{{ inventoryTurnover }}x</div>
        <div class="text-sm text-gray-500">Annual turnover</div>
      </div>
    </div>

    <!-- Stock Alerts -->
    <div v-if="pendingAlerts.length > 0" class="bg-white rounded-lg shadow-sm border">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Stock Alerts</h3>
          <span class="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">
            {{ pendingAlerts.length }} pending
          </span>
        </div>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div
            v-for="alert in pendingAlerts.slice(0, 5)"
            :key="alert.id"
            class="flex items-center justify-between p-4 rounded-lg border"
            :class="{
              'border-red-200 bg-red-50': alert.severity === 'critical',
              'border-yellow-200 bg-yellow-50': alert.severity === 'high',
              'border-orange-200 bg-orange-50': alert.severity === 'medium'
            }"
          >
            <div class="flex items-center space-x-3">
              <AlertTriangle 
                class="w-5 h-5"
                :class="{
                  'text-red-600': alert.severity === 'critical',
                  'text-yellow-600': alert.severity === 'high',
                  'text-orange-600': alert.severity === 'medium'
                }"
              />
              <div>
                <p class="font-medium text-gray-900">{{ alert.message }}</p>
                <p class="text-sm text-gray-500">{{ new Date(alert.createdAt).toLocaleDateString() }}</p>
              </div>
            </div>
            <button
              @click="acknowledgeAlert(alert.id)"
              class="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            v-model="statusFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
          <select
            v-model="categoryFilter"
            class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="Smartphones">Smartphones</option>
            <option value="Accessories">Accessories</option>
            <option value="Cases">Cases</option>
          </select>
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="viewMode = 'table'"
            :class="viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-2 rounded-lg transition-colors"
          >
            <List class="w-4 h-4" />
          </button>
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-3 py-2 rounded-lg transition-colors"
          >
            <Grid class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Inventory Table/Grid -->
    <div class="bg-white rounded-lg shadow-sm border">
      <div v-if="viewMode === 'table'" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in filteredInventory" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="item.productImage" :alt="item.productName" class="w-10 h-10 object-cover rounded-lg mr-3">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ item.productName }}</div>
                    <div class="text-sm text-gray-500">{{ item.brand }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.sku }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.currentStock }}</div>
                <div class="text-xs text-gray-500">Min: {{ item.minStockLevel }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': item.status === 'in_stock',
                    'bg-yellow-100 text-yellow-800': item.status === 'low_stock',
                    'bg-red-100 text-red-800': item.status === 'out_of_stock'
                  }"
                >
                  {{ item.status.replace('_', ' ').toUpperCase() }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{{ item.totalValue.toLocaleString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.location }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="openStockAdjustment(item)"
                    class="text-blue-600 hover:text-blue-900 transition-colors"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="viewStockHistory(item)"
                    class="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Clock class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Grid View -->
      <div v-else class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="item in filteredInventory"
            :key="item.id"
            class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-3">
              <img :src="item.productImage" :alt="item.productName" class="w-12 h-12 object-cover rounded-lg">
              <span
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="{
                  'bg-green-100 text-green-800': item.status === 'in_stock',
                  'bg-yellow-100 text-yellow-800': item.status === 'low_stock',
                  'bg-red-100 text-red-800': item.status === 'out_of_stock'
                }"
              >
                {{ item.status.replace('_', ' ').toUpperCase() }}
              </span>
            </div>
            <h3 class="font-medium text-gray-900 mb-1">{{ item.productName }}</h3>
            <p class="text-sm text-gray-500 mb-2">{{ item.sku }}</p>
            <div class="flex items-center justify-between mb-3">
              <div>
                <p class="text-lg font-semibold text-gray-900">{{ item.currentStock }}</p>
                <p class="text-xs text-gray-500">units in stock</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">₦{{ item.totalValue.toLocaleString() }}</p>
                <p class="text-xs text-gray-500">total value</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <button
                @click="openStockAdjustment(item)"
                class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Adjust
              </button>
              <button
                @click="viewStockHistory(item)"
                class="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                History
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stock Adjustment Modal -->
    <div v-if="showStockAdjustment" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Stock Adjustment</h3>
          <button @click="closeStockAdjustment" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>

        <form @submit.prevent="submitStockAdjustment" class="space-y-4">
          <div v-if="selectedItem">
            <div class="flex items-center space-x-3 mb-4">
              <img :src="selectedItem.productImage" :alt="selectedItem.productName" class="w-12 h-12 object-cover rounded-lg">
              <div>
                <p class="font-medium text-gray-900">{{ selectedItem.productName }}</p>
                <p class="text-sm text-gray-500">Current stock: {{ selectedItem.currentStock }}</p>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Adjustment Type</label>
            <select
              v-model="adjustmentForm.type"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="in">Stock In</option>
              <option value="out">Stock Out</option>
              <option value="adjustment">Manual Adjustment</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ adjustmentForm.type === 'adjustment' ? 'New Stock Level' : 'Quantity' }}
            </label>
            <input
              v-model.number="adjustmentForm.quantity"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Reason</label>
            <select
              v-model="adjustmentForm.reason"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select reason</option>
              <option value="Purchase Order">Purchase Order</option>
              <option value="Sale">Sale</option>
              <option value="Return">Return</option>
              <option value="Damage">Damage</option>
              <option value="Theft">Theft</option>
              <option value="Inventory Count">Inventory Count</option>
              <option value="Transfer">Transfer</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Reference</label>
            <input
              v-model="adjustmentForm.reference"
              type="text"
              placeholder="PO number, order ID, etc."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              v-model="adjustmentForm.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Additional notes..."
            ></textarea>
          </div>

          <div class="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeStockAdjustment"
              class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ isLoading ? 'Processing...' : 'Update Stock' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Stock History Modal -->
    <div v-if="showStockHistory" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Stock Movement History</h3>
          <button @click="showStockHistory = false" class="text-gray-400 hover:text-gray-600">
            <X class="w-5 h-5" />
          </button>
        </div>

        <div v-if="selectedItem" class="mb-6">
          <div class="flex items-center space-x-3">
            <img :src="selectedItem.productImage" :alt="selectedItem.productName" class="w-12 h-12 object-cover rounded-lg">
            <div>
              <p class="font-medium text-gray-900">{{ selectedItem.productName }}</p>
              <p class="text-sm text-gray-500">{{ selectedItem.sku }}</p>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="movement in selectedItemMovements" :key="movement.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ new Date(movement.date).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': movement.type === 'in',
                      'bg-red-100 text-red-800': movement.type === 'out',
                      'bg-blue-100 text-blue-800': movement.type === 'adjustment'
                    }"
                  >
                    {{ movement.type.toUpperCase() }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ movement.type === 'out' ? '-' : '+' }}{{ movement.quantity }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ movement.reason }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ movement.reference }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ movement.user }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useInventoryStore, type InventoryItem } from '@/stores/inventory'
import {
  Plus, DollarSign, AlertTriangle, XCircle, TrendingUp, CheckCircle,
  Search, List, Grid, Edit, Clock, X
} from 'lucide-vue-next'

const inventoryStore = useInventoryStore()

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')
const viewMode = ref<'table' | 'grid'>('table')
const showStockAdjustment = ref(false)
const showStockHistory = ref(false)
const selectedItem = ref<InventoryItem | null>(null)

// Form data
const adjustmentForm = ref({
  type: 'in' as 'in' | 'out' | 'adjustment',
  quantity: 0,
  reason: '',
  reference: '',
  notes: ''
})

// Computed properties
const { 
  inventory, 
  totalInventoryValue, 
  lowStockItems, 
  outOfStockItems, 
  inventoryTurnover,
  pendingAlerts,
  isLoading
} = inventoryStore

const filteredInventory = computed(() => {
  let filtered = inventory

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.productName.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(item => item.status === statusFilter.value)
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(item => item.category === categoryFilter.value)
  }

  return filtered
})

const selectedItemMovements = computed(() => {
  if (!selectedItem.value) return []
  return inventoryStore.getStockMovements(selectedItem.value.productId)
})

// Methods
const openStockAdjustment = (item?: InventoryItem) => {
  selectedItem.value = item || null
  adjustmentForm.value = {
    type: 'in',
    quantity: 0,
    reason: '',
    reference: '',
    notes: ''
  }
  showStockAdjustment.value = true
}

const closeStockAdjustment = () => {
  showStockAdjustment.value = false
  selectedItem.value = null
}

const submitStockAdjustment = async () => {
  if (!selectedItem.value) return

  try {
    await inventoryStore.updateStock(
      selectedItem.value.productId,
      adjustmentForm.value.quantity,
      adjustmentForm.value.type,
      adjustmentForm.value.reason,
      adjustmentForm.value.reference,
      adjustmentForm.value.notes
    )
    closeStockAdjustment()
  } catch (error: any) {
    alert(error.message)
  }
}

const viewStockHistory = (item: InventoryItem) => {
  selectedItem.value = item
  showStockHistory.value = true
}

const acknowledgeAlert = (alertId: string) => {
  inventoryStore.acknowledgeAlert(alertId)
}

const acknowledgeAllAlerts = () => {
  inventoryStore.acknowledgeAllAlerts()
}

onMounted(() => {
  // Component is ready
})
</script>
