<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <div class="container mx-auto px-4 py-8">
      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shop</h1>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <!-- Search Bar -->
        <div class="relative flex-1 max-w-md">
          <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent"
          >
        </div>

        <!-- Results Count and Advanced Search Toggle -->
        <div class="flex items-center space-x-4">
          <p class="text-gray-600">
            Showing {{ filteredProducts.length }} of {{ productsStore.products.length }} products
          </p>
          <button
            @click="toggleAdvancedSearch"
            class="flex items-center space-x-2 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            :class="{ 'bg-blue-50 border-blue-300 text-blue-700': showAdvancedSearch }"
          >
            <BarChart3 class="w-4 h-4" />
            <span>{{ showAdvancedSearch ? 'Hide' : 'Show' }} Advanced Search</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Advanced Search Component -->
    <AdvancedSearch
      v-if="showAdvancedSearch"
      @filters-changed="handleAdvancedFiltersChanged"
    />

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Filters Sidebar -->
      <div class="lg:w-1/4">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-4 transition-colors">
          <h3 class="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Filters</h3>

          <!-- Brand Filter -->
          <div class="mb-6">
            <h4 class="font-medium mb-3 text-gray-900 dark:text-white">Brand</h4>
            <div class="space-y-2">
              <label v-for="brand in availableBrands" :key="brand" class="flex items-center">
                <input
                  v-model="selectedBrands"
                  :value="brand"
                  type="checkbox"
                  class="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-600 dark:bg-gray-700"
                >
                <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ brand }}</span>
                <span class="ml-auto text-xs text-gray-500 dark:text-gray-400">
                  ({{ getProductCountByBrand(brand) }})
                </span>
              </label>
            </div>
          </div>

          <!-- Price Range Filter -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Price Range</h4>
            <div class="space-y-2">
              <label v-for="range in priceRanges" :key="range.label" class="flex items-center">
                <input
                  v-model="selectedPriceRange"
                  :value="range"
                  type="radio"
                  name="priceRange"
                  class="border-gray-300 text-accent-blue focus:ring-accent-blue"
                >
                <span class="ml-2 text-sm">{{ range.label }}</span>
              </label>
            </div>
          </div>

          <!-- Storage Filter -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Storage</h4>
            <div class="space-y-2">
              <label v-for="storage in availableStorage" :key="storage" class="flex items-center">
                <input
                  v-model="selectedStorage"
                  :value="storage"
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                >
                <span class="ml-2 text-sm">{{ storage }}</span>
              </label>
            </div>
          </div>

          <!-- Availability Filter -->
          <div class="mb-6">
            <h4 class="font-medium mb-3">Availability</h4>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  v-model="showInStockOnly"
                  type="checkbox"
                  class="rounded border-gray-300 text-accent-blue focus:ring-accent-blue"
                >
                <span class="ml-2 text-sm">In Stock Only</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="showNewOnly"
                  type="checkbox"
                  class="rounded border-gray-300 text-accent-blue focus:ring-accent-blue"
                >
                <span class="ml-2 text-sm">New Products</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="showDiscountOnly"
                  type="checkbox"
                  class="rounded border-gray-300 text-accent-blue focus:ring-accent-blue"
                >
                <span class="ml-2 text-sm">On Sale</span>
              </label>
            </div>
          </div>

          <!-- Clear Filters -->
          <button
            @click="clearFilters"
            class="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="lg:w-3/4">
        <!-- Sort Options -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div class="flex items-center space-x-4 mb-4 sm:mb-0">
            <span class="text-sm text-gray-600">Sort by:</span>
            <select
              v-model="sortBy"
              class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent"
            >
              <option value="name">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="price">Price (Low to High)</option>
              <option value="price-desc">Price (High to Low)</option>
              <option value="rating">Rating (High to Low)</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <!-- View Toggle -->
          <div class="flex items-center space-x-2">
            <button
              @click="viewMode = 'grid'"
              :class="viewMode === 'grid' ? 'bg-accent-blue text-white' : 'bg-gray-100 text-gray-600'"
              class="p-2 rounded-lg transition-colors"
            >
              <Grid3X3 class="w-5 h-5" />
            </button>
            <button
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-accent-blue text-white' : 'bg-gray-100 text-gray-600'"
              class="p-2 rounded-lg transition-colors"
            >
              <List class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Products Display -->
        <div v-if="filteredProducts.length > 0">
          <!-- Grid View -->
          <div
            v-if="viewMode === 'grid'"
            class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <ProductCard
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- List View -->
          <div v-else class="space-y-4">
            <ProductListItem
              v-for="product in paginatedProducts"
              :key="product.id"
              :product="product"
            />
          </div>
        </div>

        <!-- No Results -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <Search class="w-16 h-16 mx-auto" />
          </div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p class="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
          <button
            @click="clearFilters"
            class="btn-primary"
          >
            Clear Filters
          </button>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center mt-12">
          <nav class="flex items-center space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft class="w-5 h-5" />
            </button>

            <button
              v-for="page in visiblePages"
              :key="page"
              @click="typeof page === 'number' ? currentPage = page : null"
              :disabled="typeof page !== 'number'"
              :class="page === currentPage
                ? 'bg-accent-blue text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'"
              class="px-4 py-2 rounded-lg border border-gray-300 transition-colors disabled:cursor-not-allowed"
            >
              {{ page }}
            </button>

            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Product Comparison Component -->
    <ProductComparison />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Grid3X3, List, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-vue-next'
import ProductCard from '@/components/ui/ProductCard.vue'
import ProductListItem from '@/components/ui/ProductListItem.vue'
import AdvancedSearch from '@/components/search/AdvancedSearch.vue'
import ProductComparison from '@/components/search/ProductComparison.vue'
import { useProductsStore } from '@/stores/products'
import { useComparisonStore } from '@/stores/comparison'

const route = useRoute()
const productsStore = useProductsStore()
const comparisonStore = useComparisonStore()

// Reactive state
const searchQuery = ref('')
const selectedBrands = ref<string[]>([])
const selectedPriceRange = ref<any>(null)
const selectedStorage = ref<string[]>([])
const showInStockOnly = ref(false)
const showNewOnly = ref(false)
const showDiscountOnly = ref(false)
const sortBy = ref('name')
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(1)
const itemsPerPage = 12

// Advanced search state
const showAdvancedSearch = ref(false)
const advancedFilters = ref<any>({
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

// Price ranges
const priceRanges = [
  { label: 'Under ₦100,000', min: 0, max: 100000 },
  { label: '₦100,000 - ₦300,000', min: 100000, max: 300000 },
  { label: '₦300,000 - ₦600,000', min: 300000, max: 600000 },
  { label: '₦600,000 - ₦1,000,000', min: 600000, max: 1000000 },
  { label: 'Above ₦1,000,000', min: 1000000, max: Infinity }
]

// Computed properties
const availableBrands = computed(() => {
  const brands = [...new Set(productsStore.products.map(p => p.brand))]
  return brands.sort()
})

const availableStorage = computed(() => {
  const storage = [...new Set(productsStore.products.map(p => p.storage).filter(Boolean))]
  return storage.sort()
})

const getProductCountByBrand = (brand: string) => {
  return productsStore.products.filter(p => p.brand === brand).length
}

const filteredProducts = computed(() => {
  let products = [...productsStore.products]

  // Use advanced filters if advanced search is enabled
  const filters = showAdvancedSearch.value ? advancedFilters.value : {
    search: searchQuery.value,
    brand: selectedBrands.value.length > 0 ? selectedBrands.value[0] : '',
    category: '',
    sortBy: sortBy.value,
    minPrice: selectedPriceRange.value?.min || null,
    maxPrice: selectedPriceRange.value?.max || null,
    minRating: '',
    storage: selectedStorage.value,
    inStock: showInStockOnly.value,
    isNew: showNewOnly.value,
    hasDiscount: showDiscountOnly.value
  }

  // Search filter
  if (filters.search) {
    const query = filters.search.toLowerCase()
    products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }

  // Brand filter
  if (filters.brand) {
    products = products.filter(p => p.brand === filters.brand)
  }

  // Category filter
  if (filters.category) {
    products = products.filter(p => p.category === filters.category)
  }

  // Price range filter
  if (filters.minPrice !== null) {
    products = products.filter(p => p.price >= filters.minPrice)
  }
  if (filters.maxPrice !== null) {
    products = products.filter(p => p.price <= filters.maxPrice)
  }

  // Rating filter
  if (filters.minRating) {
    products = products.filter(p => p.rating >= parseFloat(filters.minRating))
  }

  // Storage filter
  if (filters.storage && filters.storage.length > 0) {
    products = products.filter(p => p.storage && filters.storage.includes(p.storage))
  }

  // Stock filter
  if (filters.inStock) {
    products = products.filter(p => p.inStock)
  }

  // New products filter
  if (filters.isNew) {
    products = products.filter(p => p.isNew)
  }

  // Discount filter
  if (filters.hasDiscount) {
    products = products.filter(p => p.discount && p.discount > 0)
  }

  // Sorting
  const sortKey = showAdvancedSearch.value ? filters.sortBy : sortBy.value
  switch (sortKey) {
    case 'name':
      products.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      products.sort((a, b) => b.name.localeCompare(a.name))
      break
    case 'price':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      products.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      products.sort((a, b) => b.rating - a.rating)
      break
    case 'newest':
      products.sort((a, b) => {
        const aDate = new Date(a.createdAt || 0)
        const bDate = new Date(b.createdAt || 0)
        return bDate.getTime() - aDate.getTime()
      })
      break
    case 'popular':
      products.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0))
      break
    case 'featured':
      products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      break
  }

  return products
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1, '...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...', total)
    }
  }

  return pages.filter(p => p !== '...' || pages.indexOf(p) === pages.lastIndexOf(p))
})

const clearFilters = () => {
  searchQuery.value = ''
  selectedBrands.value = []
  selectedPriceRange.value = null
  selectedStorage.value = []
  showInStockOnly.value = false
  showNewOnly.value = false
  showDiscountOnly.value = false
  currentPage.value = 1
}

// Advanced search functions
const toggleAdvancedSearch = () => {
  showAdvancedSearch.value = !showAdvancedSearch.value
  if (!showAdvancedSearch.value) {
    // Reset advanced filters when closing
    advancedFilters.value = {
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
    }
  }
}

const handleAdvancedFiltersChanged = (filters: any) => {
  advancedFilters.value = { ...filters }
  currentPage.value = 1
}

// Product comparison functions
const toggleComparison = (product: any) => {
  const success = comparisonStore.toggleProduct(product)
  if (!success && !comparisonStore.isInComparison(product.id)) {
    alert('You can only compare up to 3 products at a time.')
  }
}

const isInComparison = (productId: string) => {
  return comparisonStore.isInComparison(productId)
}

// Initialize filters from URL params
onMounted(() => {
  if (route.query.brand) {
    selectedBrands.value = [route.query.brand as string]
  }
  if (route.query.search) {
    searchQuery.value = route.query.search as string
  }
})
</script>
