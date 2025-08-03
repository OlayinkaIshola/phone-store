<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-secondary to-gray-800 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center">
          <div class="lg:w-1/2 mb-10 lg:mb-0">
            <h1 class="text-4xl lg:text-6xl font-bold mb-6">
              Nigeria's #1 
              <span class="text-accent-blue">Phone Store</span>
            </h1>
            <p class="text-xl mb-8 text-gray-300">
              Discover the latest smartphones, tablets, and accessories with unbeatable prices and genuine warranty.
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <router-link to="/shop" class="btn-primary text-center">
                Shop Now
              </router-link>
              <router-link to="/deals" class="btn-outline text-center">
                View Deals
              </router-link>
            </div>
          </div>
          <div class="lg:w-1/2">
            <div class="relative">
              <img 
                src="/images/iphone-15-pro.webp" 
                alt="Latest iPhone" 
                class="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              >
              <div class="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                New!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="bg-accent-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Free Shipping</h3>
            <p class="text-gray-600">Free delivery on orders above ₦50,000 within Lagos</p>
          </div>
          <div class="text-center">
            <div class="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold mb-2">Genuine Products</h3>
            <p class="text-gray-600">100% authentic products with official warranty</p>
          </div>
          <div class="text-center">
            <div class="bg-purple-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
            <p class="text-gray-600">Round-the-clock customer support via WhatsApp</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <ProductCarousel
          title="Featured Products"
          :products="productsStore.featuredProducts"
        />
      </div>
    </section>

    <!-- Best Sellers -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <ProductCarousel
          title="Best Sellers"
          :products="productsStore.bestSellers"
        />
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-secondary mb-4">Shop by Brand</h2>
          <p class="text-gray-600">Choose from our wide selection of premium brands</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <router-link to="/shop?brand=apple" class="group">
            <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <img src="/images/apple-iphone-16-pro.jpg" alt="iPhone" class="w-32 h-32 object-contain mx-auto mb-4">
              <h3 class="text-xl font-semibold mb-2 group-hover:text-accent-blue transition-colors">iPhone</h3>
              <p class="text-gray-600">Premium Apple smartphones</p>
            </div>
          </router-link>

          <router-link to="/shop?brand=samsung" class="group">
            <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <img src="/images/samsung-galaxy-s25-ultra-sm-s938.jpg" alt="Samsung" class="w-32 h-32 object-contain mx-auto mb-4">
              <h3 class="text-xl font-semibold mb-2 group-hover:text-accent-blue transition-colors">Samsung</h3>
              <p class="text-gray-600">Galaxy series smartphones</p>
            </div>
          </router-link>

          <router-link to="/shop?brand=tecno" class="group">
            <div class="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-shadow">
              <img src="/images/tecno-phantom-v-fold2-.jpg" alt="Tecno" class="w-32 h-32 object-contain mx-auto mb-4">
              <h3 class="text-xl font-semibold mb-2 group-hover:text-accent-blue transition-colors">Tecno</h3>
              <p class="text-gray-600">Affordable quality phones</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-16 bg-accent-blue text-white">
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
            class="bg-secondary text-white px-6 py-3 rounded-r-lg hover:bg-gray-700 transition-colors"
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
import { Truck, Shield, Headphones } from 'lucide-vue-next'
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
