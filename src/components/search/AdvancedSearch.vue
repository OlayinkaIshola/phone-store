<template>
  <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-900">Advanced Search & Filters</h3>
      <button
        @click="clearAllFilters"
        class="text-sm text-gray-500 hover:text-gray-700"
      >
        Clear All
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <!-- Search Input -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
        <div class="relative">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search products..."
            class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <!-- Brand Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Brand</label>
        <select
          v-model="filters.brand"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Brands</option>
          <option v-for="brand in availableBrands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>
      </div>

      <!-- Category Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <select
          v-model="filters.category"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Categories</option>
          <option v-for="category in availableCategories" :key="category" :value="category">
            {{ category.charAt(0).toUpperCase() + category.slice(1) }}
          </option>
        </select>
      </div>

      <!-- Sort By -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
        <select
          v-model="filters.sortBy"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="name">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="price">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </div>

    <!-- Price Range -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Min Price (₦)</label>
        <input
          v-model.number="filters.minPrice"
          type="number"
          min="0"
          step="10000"
          placeholder="0"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Max Price (₦)</label>
        <input
          v-model.number="filters.maxPrice"
          type="number"
          min="0"
          step="10000"
          placeholder="No limit"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
        <select
          v-model="filters.minRating"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Any Rating</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Stars</option>
        </select>
      </div>
    </div>

    <!-- Additional Filters -->
    <div class="flex flex-wrap gap-4 mb-4">
      <label class="flex items-center">
        <input
          v-model="filters.inStock"
          type="checkbox"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="ml-2 text-sm text-gray-700">In Stock Only</span>
      </label>
      <label class="flex items-center">
        <input
          v-model="filters.isNew"
          type="checkbox"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="ml-2 text-sm text-gray-700">New Products</span>
      </label>
      <label class="flex items-center">
        <input
          v-model="filters.hasDiscount"
          type="checkbox"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span class="ml-2 text-sm text-gray-700">On Sale</span>
      </label>
    </div>

    <!-- Active Filters Display -->
    <div v-if="activeFiltersCount > 0" class="flex flex-wrap gap-2">
      <span class="text-sm text-gray-600">Active filters:</span>
      <span
        v-for="filter in activeFilters"
        :key="filter.key"
        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      >
        {{ filter.label }}
        <button
          @click="removeFilter(filter.key)"
          class="ml-1 text-blue-600 hover:text-blue-800"
        >
          ×
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { Search } from 'lucide-vue-next'
import { useProductsStore } from '@/stores/products'

interface SearchFilters {
  search: string
  brand: string
  category: string
  sortBy: string
  minPrice: number | null
  maxPrice: number | null
  minRating: string
  inStock: boolean
  isNew: boolean
  hasDiscount: boolean
}

const emit = defineEmits<{
  filtersChanged: [filters: SearchFilters]
}>()

const productsStore = useProductsStore()

const filters = reactive<SearchFilters>({
  search: '',
  brand: '',
  category: '',
  sortBy: 'name',
  minPrice: null,
  maxPrice: null,
  minRating: '',
  inStock: false,
  isNew: false,
  hasDiscount: false
})

const availableBrands = computed(() => productsStore.brands)
const availableCategories = computed(() => productsStore.categories)

const activeFiltersCount = computed(() => {
  let count = 0
  if (filters.search) count++
  if (filters.brand) count++
  if (filters.category) count++
  if (filters.minPrice !== null) count++
  if (filters.maxPrice !== null) count++
  if (filters.minRating) count++
  if (filters.inStock) count++
  if (filters.isNew) count++
  if (filters.hasDiscount) count++
  return count
})

const activeFilters = computed(() => {
  const active = []
  if (filters.search) active.push({ key: 'search', label: `Search: "${filters.search}"` })
  if (filters.brand) active.push({ key: 'brand', label: `Brand: ${filters.brand}` })
  if (filters.category) active.push({ key: 'category', label: `Category: ${filters.category}` })
  if (filters.minPrice !== null) active.push({ key: 'minPrice', label: `Min: ₦${filters.minPrice.toLocaleString()}` })
  if (filters.maxPrice !== null) active.push({ key: 'maxPrice', label: `Max: ₦${filters.maxPrice.toLocaleString()}` })
  if (filters.minRating) active.push({ key: 'minRating', label: `${filters.minRating}+ Stars` })
  if (filters.inStock) active.push({ key: 'inStock', label: 'In Stock' })
  if (filters.isNew) active.push({ key: 'isNew', label: 'New Products' })
  if (filters.hasDiscount) active.push({ key: 'hasDiscount', label: 'On Sale' })
  return active
})

const clearAllFilters = () => {
  Object.assign(filters, {
    search: '',
    brand: '',
    category: '',
    sortBy: 'name',
    minPrice: null,
    maxPrice: null,
    minRating: '',
    inStock: false,
    isNew: false,
    hasDiscount: false
  })
}

const removeFilter = (key: string) => {
  switch (key) {
    case 'search':
      filters.search = ''
      break
    case 'brand':
      filters.brand = ''
      break
    case 'category':
      filters.category = ''
      break
    case 'minPrice':
      filters.minPrice = null
      break
    case 'maxPrice':
      filters.maxPrice = null
      break
    case 'minRating':
      filters.minRating = ''
      break
    case 'inStock':
      filters.inStock = false
      break
    case 'isNew':
      filters.isNew = false
      break
    case 'hasDiscount':
      filters.hasDiscount = false
      break
  }
}

// Watch for filter changes and emit to parent
watch(filters, () => {
  emit('filtersChanged', { ...filters })
}, { deep: true })
</script>
