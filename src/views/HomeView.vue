<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-secondary dark:to-gray-800 text-white py-12 md:py-20 overflow-hidden transition-colors">
      <!-- Animated Background Elements - Hidden on mobile for performance -->
      <div class="hidden md:block absolute top-10 left-10 w-20 h-20 bg-accent-blue rounded-full opacity-20 animate-float"></div>
      <div class="hidden md:block absolute top-32 right-20 w-16 h-16 bg-white rounded-full opacity-10 animate-pulse"></div>
      <div class="hidden md:block absolute bottom-20 left-1/4 w-12 h-12 bg-accent-blue rounded-full opacity-15 animate-bounce"></div>
      <div class="hidden md:block absolute bottom-32 right-1/3 w-8 h-8 bg-gray-300 rounded-full opacity-20 animate-float"></div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row items-center">
          <div class="lg:w-1/2 mb-8 lg:mb-0 hero-text text-center lg:text-left">
            <h1 class="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 animate-slide-in-left leading-tight">
              Nigeria's #1
              <span class="text-accent-blue animate-glow block sm:inline">Phone Store</span>
            </h1>
            <p class="text-lg md:text-xl mb-6 md:mb-8 text-gray-300 animate-fade-in px-2 lg:px-0">
              Discover the latest smartphones, tablets, and accessories with unbeatable prices and genuine warranty. 🇳🇬
            </p>
            <div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 stagger-animation px-4 sm:px-0">
              <router-link to="/shop" class="btn-primary text-center hover-lift hover-glow transition-all duration-300 py-3 px-6 text-base font-semibold">
                <ShoppingBag class="w-5 h-5 mr-2 inline" />
                Shop Now
              </router-link>
              <router-link to="/deals" class="btn-outline text-center hover-lift transition-all duration-300 py-3 px-6 text-base font-semibold">
                <Zap class="w-5 h-5 mr-2 inline" />
                View Deals
              </router-link>
            </div>
          </div>
          <div class="lg:w-1/2 hero-image mt-8 lg:mt-0">
            <div class="relative max-w-sm md:max-w-md mx-auto">
              <img
                src="/images/Free-iPhone-16-Pro-Max.jpg"
                alt="Latest iPhone - Premium Quality Smartphones"
                class="w-full rounded-lg shadow-2xl hover-scale transition-all duration-500 product-card"
                loading="lazy"
              >
              <div class="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-bold animate-bounce text-sm md:text-base">
                New!
              </div>
              <div class="hidden md:block absolute top-4 left-4 w-32 h-32 bg-accent-blue rounded-full opacity-20 animate-pulse"></div>
              <div class="hidden md:block absolute bottom-4 right-4 w-24 h-24 bg-white rounded-full opacity-10 animate-float"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 md:py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div class="container mx-auto px-4">
        <div class="text-center mb-8 md:mb-12 animate-fade-in">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">Why Choose Us?</h2>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">Experience the best phone shopping in Nigeria</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 stagger-animation">
          <div class="text-center feature-card bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover-lift transition-colors">
            <div class="bg-blue-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
              <Truck class="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">Free Shipping</h3>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 px-2">Free delivery on orders above ₦50,000 within Lagos and Abuja</p>
            <div class="mt-3 md:mt-4 text-xs md:text-sm text-blue-600 dark:text-blue-400 font-medium">🚚 Fast & Reliable</div>
          </div>
          <div class="text-center feature-card bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover-lift transition-colors">
            <div class="bg-green-500 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
              <Shield class="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">Genuine Products</h3>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 px-2">100% authentic products with official warranty and quality guarantee</p>
            <div class="mt-3 md:mt-4 text-xs md:text-sm text-green-600 dark:text-green-400 font-medium">🛡️ Verified Authentic</div>
          </div>
          <div class="text-center feature-card bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg hover-lift transition-colors">
            <div class="bg-purple-500 text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover-scale">
              <Headphones class="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 class="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">24/7 Support</h3>
            <p class="text-sm md:text-base text-gray-600 dark:text-gray-300 px-2">Round-the-clock customer support via WhatsApp and phone</p>
            <div class="mt-4 text-sm text-purple-600 dark:text-purple-400 font-medium">📞 Always Available</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 bg-white dark:bg-gray-800 transition-colors">
      <div class="container mx-auto px-4">
        <ProductCarousel
          title="Featured Products"
          :products="productsStore.featuredProducts"
        />
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="py-16 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div class="container mx-auto px-4">
        <ProductCarousel
          title="Best Sellers"
          :products="productsStore.bestSellers"
        />
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16 bg-white dark:bg-gray-800 transition-colors">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Shop by Brand</h2>
          <p class="text-gray-600 dark:text-gray-300">Choose from our wide selection of premium brands</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <router-link to="/shop?brand=Apple" class="group">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center hover:shadow-lg transition-all">
              <img src="/images/apple-iphone-16-pro.jpg" alt="iPhone" class="w-32 h-32 object-contain mx-auto mb-4">
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">iPhone</h3>
              <p class="text-gray-600 dark:text-gray-300">Premium Apple smartphones</p>
            </div>
          </router-link>

          <router-link to="/shop?brand=Samsung" class="group">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center hover:shadow-lg transition-all">
              <img src="/images/samsung-galaxy-s25-ultra-sm-s938.jpg" alt="Samsung" class="w-32 h-32 object-contain mx-auto mb-4">
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Samsung</h3>
              <p class="text-gray-600 dark:text-gray-300">Galaxy series smartphones</p>
            </div>
          </router-link>

          <router-link to="/shop?brand=Tecno" class="group">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center hover:shadow-lg transition-all">
              <img src="/images/tecno-phantom-v-fold2-.jpg" alt="Tecno" class="w-32 h-32 object-contain mx-auto mb-4">
              <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Tecno</h3>
              <p class="text-gray-600 dark:text-gray-300">Affordable quality phones</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-blue-600 dark:bg-gray-900 text-white transition-colors">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
        <p class="text-xl mb-8 opacity-90">Get the latest deals and product launches delivered to your inbox</p>
        <div class="max-w-md mx-auto flex">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
          >
          <button
            @click="subscribeNewsletter"
            class="bg-gray-800 dark:bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-gray-700 dark:hover:bg-blue-700 transition-colors"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Truck, Shield, Headphones, ShoppingBag, Zap } from 'lucide-vue-next'
import ProductCarousel from '@/components/ui/ProductCarousel.vue'
import { useProductsStore } from '@/stores/products'

const email = ref('')
const productsStore = useProductsStore()

const subscribeNewsletter = () => {
  if (email.value && email.value.includes('@')) {
    alert('Thank you for subscribing!')
    email.value = ''
  } else {
    alert('Please enter a valid email address')
  }
}
</script>
