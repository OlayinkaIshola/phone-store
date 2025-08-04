<template>
  <footer class="bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center space-x-3 mb-4">
            <img src="/images/Logo.jpg" alt="Phone Store" class="h-10 w-10 rounded-lg">
            <div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">PhoneStore</h3>
              <p class="text-sm text-gray-600 dark:text-gray-300">Nigeria's #1 Phone Shop</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Your trusted partner for the latest smartphones, accessories, and tech gadgets in Nigeria.
            Quality products, competitive prices, and excellent customer service.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">
              <Facebook class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">
              <Twitter class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">
              <Instagram class="w-5 h-5" />
            </a>
            <a href="#" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">
              <Youtube class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Home</router-link></li>
            <li><router-link to="/shop" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Shop</router-link></li>
            <li><router-link to="/deals" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Deals</router-link></li>
            <li><router-link to="/about" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">About Us</router-link></li>
            <li><router-link to="/contact" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Contact</router-link></li>
            <li><router-link to="/faq" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">FAQ</router-link></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categories</h4>
          <ul class="space-y-2">
            <li><router-link to="/shop?brand=Apple" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">iPhone</router-link></li>
            <li><router-link to="/shop?brand=Samsung" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Samsung</router-link></li>
            <li><router-link to="/shop?brand=Tecno" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Tecno</router-link></li>
            <li><router-link to="/shop?category=accessories" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Accessories</router-link></li>
            <li><router-link to="/shop?category=tablets" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Tablets</router-link></li>
            <li><router-link to="/shop?category=smartwatch" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Smart Watches</router-link></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contact Info</h4>
          <div class="space-y-3">
            <div class="flex items-start space-x-3">
              <MapPin class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p class="text-gray-600 dark:text-gray-300">123 Computer Village,</p>
                <p class="text-gray-600 dark:text-gray-300">Ikeja, Lagos State, Nigeria</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <Phone class="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p class="text-gray-600 dark:text-gray-300">+234 800 123 4567</p>
            </div>
            <div class="flex items-center space-x-3">
              <Mail class="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p class="text-gray-600 dark:text-gray-300">info@phonestore.ng</p>
            </div>
            <div class="flex items-center space-x-3">
              <Clock class="w-5 h-5 text-blue-600 flex-shrink-0" />
              <div>
                <p class="text-gray-600 dark:text-gray-300">Mon - Sat: 9AM - 8PM</p>
                <p class="text-gray-600 dark:text-gray-300">Sunday: 12PM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter -->
    <div class="border-t border-gray-300 dark:border-gray-700">
      <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="mb-4 md:mb-0">
            <h4 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Stay Updated</h4>
            <p class="text-gray-600 dark:text-gray-300">Subscribe to get special offers, free giveaways, and updates.</p>
          </div>
          <div class="flex w-full md:w-auto">
            <input
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="flex-1 md:w-80 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            >
            <button
              @click="subscribeNewsletter"
              class="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-300 dark:border-gray-700">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="text-gray-600 dark:text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 PhoneStore Nigeria. All rights reserved.
          </div>
          <div class="flex flex-wrap items-center space-x-6 text-sm">
            <router-link to="/privacy" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Privacy Policy</router-link>
            <router-link to="/terms" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Terms & Conditions</router-link>
            <router-link to="/return-policy" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Return Policy</router-link>
            <router-link to="/shipping" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors">Shipping Info</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Methods -->
    <div class="border-t border-gray-300 dark:border-gray-700">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="text-gray-600 dark:text-gray-300 text-sm mb-2 md:mb-0">
            Secure Payment Methods:
          </div>
          <div class="flex items-center space-x-4">
            <div class="bg-gray-100 dark:bg-white rounded px-2 py-1">
              <span class="text-xs font-semibold text-gray-800">PAYSTACK</span>
            </div>
            <div class="bg-gray-100 dark:bg-white rounded px-2 py-1">
              <span class="text-xs font-semibold text-gray-800">FLUTTERWAVE</span>
            </div>
            <div class="bg-gray-100 dark:bg-white rounded px-2 py-1">
              <span class="text-xs font-semibold text-gray-800">VISA</span>
            </div>
            <div class="bg-gray-100 dark:bg-white rounded px-2 py-1">
              <span class="text-xs font-semibold text-gray-800">MASTERCARD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-vue-next'

const email = ref('')

const subscribeNewsletter = () => {
  if (email.value && email.value.includes('@')) {
    // Handle newsletter subscription
    console.log('Subscribing email:', email.value)
    // You would typically send this to your backend
    alert('Thank you for subscribing to our newsletter!')
    email.value = ''
  } else {
    alert('Please enter a valid email address')
  }
}
</script>
