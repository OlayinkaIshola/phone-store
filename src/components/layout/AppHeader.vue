<template>
  <header class="bg-white shadow-md sticky top-0 z-50">
    <!-- Top Bar -->
    <div class="bg-secondary text-white py-2">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center text-sm">
          <div class="flex items-center space-x-4">
            <span>📞 +234 800 123 4567</span>
            <span>📧 info@phonestore.ng</span>
          </div>
          <div class="flex items-center space-x-4">
            <span>Free shipping on orders over ₦50,000</span>
            <div class="flex items-center space-x-2">
              <button @click="toggleAuth" class="hover:text-accent-blue transition-colors">
                {{ user ? 'Account' : 'Login' }}
              </button>
              <span v-if="!user">|</span>
              <button v-if="!user" @click="toggleAuth" class="hover:text-accent-blue transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-3">
          <img src="/images/Logo.jpg" alt="Phone Store" class="h-12 w-12 rounded-lg">
          <div>
            <h1 class="text-2xl font-bold text-secondary">PhoneStore</h1>
            <p class="text-sm text-gray-600">Nigeria's #1 Phone Shop</p>
          </div>
        </router-link>

        <!-- Search Bar -->
        <div class="flex-1 max-w-2xl mx-8">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search for phones, brands, models..."
              class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-blue focus:border-transparent outline-none"
              @keyup.enter="performSearch"
            >
            <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <button
              @click="performSearch"
              class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-blue text-white px-4 py-1.5 rounded-md hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center space-x-6">
          <!-- Wishlist -->
          <button @click="$router.push('/wishlist')" class="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Heart class="w-6 h-6 text-gray-700" />
            <span v-if="wishlistCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ wishlistCount }}
            </span>
          </button>

          <!-- Cart -->
          <MiniCart />

          <!-- User Account / Auth -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <img
                :src="authStore.user?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(authStore.user?.name || 'User') + '&background=007AFF&color=fff'"
                :alt="authStore.user?.name"
                class="w-8 h-8 rounded-full object-cover"
              >
              <ChevronDown class="h-4 w-4 text-gray-700" />
            </button>

            <!-- User Dropdown Menu -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
            >
              <div class="px-4 py-2 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user?.name }}</p>
                <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
              </div>

              <router-link
                to="/account"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <User class="h-4 w-4" />
                <span>My Account</span>
              </router-link>

              <router-link
                to="/wishlist"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Heart class="h-4 w-4" />
                <span>Wishlist</span>
              </router-link>

              <router-link
                v-if="authStore.user?.isAdmin"
                to="/admin"
                @click="showUserMenu = false"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Settings class="h-4 w-4" />
                <span>Admin Dashboard</span>
              </router-link>

              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <LogOut class="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          <!-- Login/Register for guests -->
          <div v-else class="hidden md:flex items-center space-x-2">
            <router-link
              to="/auth"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-accent-blue transition-colors"
            >
              Login
            </router-link>
            <router-link
              to="/auth?mode=register"
              class="px-4 py-2 text-sm font-medium bg-accent-blue text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </router-link>
          </div>

          <!-- Mobile Menu Toggle -->
          <button @click="toggleMobileMenu" class="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu class="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="bg-gray-50 border-t border-gray-200">
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
              <div class="absolute top-full left-0 mt-1 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="p-4">
                  <h3 class="font-semibold text-gray-900 mb-3">Shop by Brand</h3>
                  <div class="space-y-2">
                    <router-link to="/shop?brand=iphone" class="block text-gray-700 hover:text-accent-blue transition-colors">iPhone</router-link>
                    <router-link to="/shop?brand=samsung" class="block text-gray-700 hover:text-accent-blue transition-colors">Samsung</router-link>
                    <router-link to="/shop?brand=tecno" class="block text-gray-700 hover:text-accent-blue transition-colors">Tecno</router-link>
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
            <span class="text-sm text-gray-600">Quick Access:</span>
            <router-link to="/shop?category=latest" class="text-sm bg-accent-blue text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors">
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
    <div v-if="showMobileMenu" class="md:hidden bg-white border-t border-gray-200 slide-in">
      <div class="container mx-auto px-4 py-4">
        <div class="space-y-4">
          <router-link to="/" class="block py-2 text-gray-700 hover:text-accent-blue transition-colors" @click="closeMobileMenu">Home</router-link>
          <div>
            <button @click="toggleShopMenu" class="flex items-center justify-between w-full py-2 text-gray-700 hover:text-accent-blue transition-colors">
              Shop <ChevronDown class="w-4 h-4" :class="{ 'rotate-180': showShopMenu }" />
            </button>
            <div v-if="showShopMenu" class="ml-4 mt-2 space-y-2">
              <router-link to="/shop?brand=iphone" class="block py-1 text-gray-600 hover:text-accent-blue transition-colors" @click="closeMobileMenu">iPhone</router-link>
              <router-link to="/shop?brand=samsung" class="block py-1 text-gray-600 hover:text-accent-blue transition-colors" @click="closeMobileMenu">Samsung</router-link>
              <router-link to="/shop?brand=tecno" class="block py-1 text-gray-600 hover:text-accent-blue transition-colors" @click="closeMobileMenu">Tecno</router-link>
            </div>
          </div>
          <router-link to="/deals" class="block py-2 text-gray-700 hover:text-accent-blue transition-colors" @click="closeMobileMenu">Deals</router-link>
          <router-link to="/about" class="block py-2 text-gray-700 hover:text-accent-blue transition-colors" @click="closeMobileMenu">About</router-link>
          <router-link to="/contact" class="block py-2 text-gray-700 hover:text-accent-blue transition-colors" @click="closeMobileMenu">Contact</router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Heart, ShoppingCart, Menu, ChevronDown, User, LogOut, Settings } from 'lucide-vue-next'
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
const showShopMenu = ref(false)
const showUserMenu = ref(false)

const cartCount = computed(() => cartStore.itemCount)
const wishlistCount = computed(() => wishlistStore.itemCount)
const user = computed(() => authStore.user)

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push(`/shop?search=${encodeURIComponent(searchQuery.value.trim())}`)
    searchQuery.value = ''
  }
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  showShopMenu.value = false
}

const closeMobileMenu = () => {
  showMobileMenu.value = false
  showShopMenu.value = false
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
  @apply text-gray-700 hover:text-accent-blue font-medium transition-colors duration-200;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
