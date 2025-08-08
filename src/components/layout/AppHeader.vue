<template>
  <header class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
    <!-- Top Bar - Hidden on mobile -->
    <div class="bg-secondary dark:bg-gray-800 text-white py-2 transition-colors hidden md:block">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center text-sm">
          <div class="flex items-center space-x-4">
            <span>📞 +234 800 123 4567</span>
            <span>📧 info@phonestore.ng</span>
          </div>
          <div class="flex items-center space-x-4">
            <span>Free shipping on orders over ₦50,000</span>
            <div class="flex items-center space-x-2">
              <button @click="toggleAuth" class="hover:text-blue-600 transition-colors">
                {{ user ? 'Account' : 'Login' }}
              </button>
              <span v-if="!user">|</span>
              <button v-if="!user" @click="toggleAuth" class="hover:text-blue-600 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="container mx-auto px-4 py-3 md:py-4">
      <div class="flex items-center justify-between">
        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu class="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 md:space-x-3">
          <img src="/images/Logo.jpg" alt="Phone Store" class="h-8 w-8 md:h-12 md:w-12 rounded-lg">
          <div class="hidden sm:block">
            <h1 class="text-lg md:text-2xl font-bold text-secondary dark:text-white">PhoneStore</h1>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400">Nigeria's #1 Phone Shop</p>
          </div>
        </router-link>

        <!-- Search Bar - Hidden on mobile, shown on tablet+ -->
        <div class="hidden md:flex flex-1 max-w-2xl mx-8">
          <div class="relative w-full">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for phones, brands, models..."
              class="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              @keyup.enter="performSearch"
            >
            <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              @click="performSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center space-x-2 md:space-x-4">
          <!-- Mobile Search Button -->
          <button
            @click="showMobileSearch = !showMobileSearch"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle search"
          >
            <Search class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>

          <!-- Wishlist -->
          <router-link
            to="/wishlist"
            class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Wishlist"
          >
            <Heart class="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300" />
            <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-[10px] md:text-xs">
              {{ wishlistCount > 9 ? '9+' : wishlistCount }}
            </span>
          </router-link>

          <!-- Cart -->
          <MiniCart />

          <!-- User Account / Auth -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-1 md:space-x-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <img
                :src="authStore.user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(authStore.user?.name || 'User') + '&background=007AFF&color=fff'"
                :alt="authStore.user?.name"
                class="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
              >
              <ChevronDown class="h-3 w-3 md:h-4 md:w-4 text-gray-700 dark:text-gray-300 hidden sm:block" />
            </button>

            <!-- User Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
            >
              <div class="px-4 py-2 border-b border-gray-100 dark:border-gray-600">
                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ authStore.user?.name }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
              </div>

              <router-link
                to="/account"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <User class="h-4 w-4" />
                <span>My Account</span>
              </router-link>

              <router-link
                to="/wishlist"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <Heart class="h-4 w-4" />
                <span>Wishlist</span>
              </router-link>

              <router-link
                v-if="authStore.user?.isAdmin"
                to="/admin"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <Settings class="h-4 w-4" />
                <span>Admin Dashboard</span>
              </router-link>

              <!-- Mobile-only Dark Mode Toggle -->
              <button
                @click="toggleDarkMode"
                class="md:hidden flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Sun v-if="isDarkMode" class="w-4 h-4 mr-2 text-yellow-500" />
                <Moon v-else class="w-4 h-4 mr-2" />
                <span>{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
              </button>

              <hr class="my-2 border-gray-200 dark:border-gray-600">
              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
              >
                <LogOut class="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <!-- Login/Register for guests -->
          <div v-else class="flex items-center space-x-2">
            <router-link
              to="/auth"
              class="px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
            >
              Login
            </router-link>
            <router-link
              to="/auth?mode=register"
              class="hidden sm:block px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Dark Mode Toggle - Hidden on mobile when user is authenticated -->
          <button
            @click="toggleDarkMode"
            class="hidden md:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            :class="{ 'sm:hidden': authStore.isAuthenticated }"
            :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <Sun v-if="isDarkMode" class="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <Moon v-else class="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Search Bar -->
    <div v-if="showMobileSearch" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-3 transition-colors">
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for phones, brands, models..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          @keyup.enter="performSearch"
        >
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <button
          @click="performSearch"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          Search
        </button>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between">
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8 py-4">
            <router-link to="/" class="nav-link">Home</router-link>
            <div class="relative group">
              <button class="nav-link flex items-center">
                Shop <ChevronDown class="ml-1 w-4 h-4" />
              </button>
              <!-- Dropdown Menu -->
              <div class="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200 dark:border-gray-700">
                <div class="p-4">
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Shop by Brand</h3>
                  <div class="space-y-2">
                    <router-link to="/shop?brand=Apple" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">iPhone</router-link>
                    <router-link to="/shop?brand=Samsung" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Samsung</router-link>
                    <router-link to="/shop?brand=Tecno" class="block text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors">Tecno</router-link>
                  </div>
                </div>
              </div>
            </div>
            <router-link to="/deals" class="nav-link">Deals</router-link>
            <router-link to="/about" class="nav-link">About</router-link>
            <router-link to="/contact" class="nav-link">Contact</router-link>
          </div>

          <!-- Categories Quick Access -->
          <div class="hidden md:flex items-center space-x-4 py-4">
            <span class="text-sm text-gray-600 dark:text-gray-400">Quick Access:</span>
            <router-link to="/shop?category=latest" class="text-sm bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
              Latest
            </router-link>
            <router-link to="/shop?category=trending" class="text-sm bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors">
              Trending
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 slide-in transition-colors">
      <div class="container mx-auto px-4 py-4">
        <div class="space-y-4">
          <router-link to="/" class="block py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium" @click="closeMobileMenu">
            🏠 Home
          </router-link>
          <div>
            <button @click="toggleShopMenu" class="flex items-center justify-between w-full py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium">
              🛍️ Shop <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': showShopMenu }" />
            </button>
            <div v-if="showShopMenu" class="ml-6 mt-2 space-y-2 pb-2">
              <router-link to="/shop?brand=Apple" class="block py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors" @click="closeMobileMenu">📱 iPhone</router-link>
              <router-link to="/shop?brand=Samsung" class="block py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors" @click="closeMobileMenu">📱 Samsung</router-link>
              <router-link to="/shop?brand=Tecno" class="block py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors" @click="closeMobileMenu">📱 Tecno</router-link>
              <router-link to="/shop" class="block py-2 text-blue-600 hover:text-blue-700 transition-colors font-medium" @click="closeMobileMenu">View All Products →</router-link>
            </div>
          </div>
          <router-link to="/deals" class="block py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium" @click="closeMobileMenu">
            🔥 Deals
          </router-link>
          <router-link to="/about" class="block py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium" @click="closeMobileMenu">
            ℹ️ About
          </router-link>
          <router-link to="/contact" class="block py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium" @click="closeMobileMenu">
            📞 Contact
          </router-link>

          <!-- Mobile-only Auth Links -->
          <div v-if="!authStore.isAuthenticated" class="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <router-link to="/auth" class="block py-3 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium" @click="closeMobileMenu">
              Login / Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Heart, ShoppingCart, Menu, ChevronDown, User, LogOut, Settings, Sun, Moon } from 'lucide-vue-next'
import MiniCart from '@/components/ui/MiniCart.vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const authStore = useAuthStore()

const searchQuery = ref('')
const showMobileMenu = ref(false)
const showMobileSearch = ref(false)
const showShopMenu = ref(false)
const isDarkMode = ref(false)

// Dark mode functionality
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('darkMode', 'false')
  }
}

// Initialize dark mode from localStorage
const initializeDarkMode = () => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode === 'true') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
}

// Initialize on component mount
initializeDarkMode()
const showUserMenu = ref(false)

const cartCount = computed(() => cartStore.itemCount)
const wishlistCount = computed(() => wishlistStore.itemCount)
const user = computed(() => authStore.user)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/shop?search=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
    showMobileSearch.value = false
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  showShopMenu.value = false
  showMobileSearch.value = false
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  showShopMenu.value = false
  showMobileSearch.value = false
}

const toggleShopMenu = () => {
  showShopMenu.value = !showShopMenu.value
}

const toggleAuth = () => {
  if (user.value) {
    router.push('/account')
  } else {
    router.push('/auth')
  }
}

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    authStore.logout()
    showUserMenu.value = false
    router.push('/')
  }
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-accent-blue font-medium transition-colors duration-200;
}

.rotate-180 {
  transform: rotate(180deg);
}

.slide-in {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile-specific styles */
@media (max-width: 768px) {
  .container {
    @apply px-3;
  }
}
</style>
