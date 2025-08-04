<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">About Phone Store Nigeria</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto">
          Your trusted partner for premium smartphones and exceptional service across Nigeria
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-16">
      <!-- Our Story -->
      <section class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Founded in 2020, Phone Store Nigeria began with a simple mission: to make premium smartphones
              accessible to everyone across Nigeria. What started as a small electronics shop in Lagos has
              grown into one of Nigeria's most trusted online phone retailers.
            </p>
            <p class="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              We understand the importance of staying connected in today's digital world. That's why we've
              dedicated ourselves to providing authentic, high-quality smartphones from top brands like
              Apple, Samsung, and Tecno at competitive prices.
            </p>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Today, we serve customers across all 36 states in Nigeria, delivering not just phones,
              but peace of mind through our comprehensive warranty and exceptional customer service.
            </p>
          </div>
          <div class="relative">
            <img
              src="/images/Free-iPhone-16-Pro-Max.jpg"
              alt="Phone Store Nigeria"
              class="rounded-lg shadow-xl w-full"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="mb-16">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-xl">
            <Target class="w-12 h-12 text-blue-600 mb-4" />
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              To democratize access to cutting-edge smartphone technology across Nigeria by providing
              authentic products, competitive pricing, and unmatched customer service that exceeds expectations.
            </p>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-8 rounded-xl">
            <Eye class="w-12 h-12 text-green-600 mb-4" />
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              To become Nigeria's leading smartphone retailer, known for innovation, reliability, and
              customer satisfaction, while contributing to the digital transformation of our communities.
            </p>
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Our Core Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Authenticity</h3>
            <p class="text-gray-600 dark:text-gray-400">100% genuine products with official warranties</p>
          </div>
          <div class="text-center">
            <div class="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Customer First</h3>
            <p class="text-gray-600 dark:text-gray-400">Your satisfaction is our top priority</p>
          </div>
          <div class="text-center">
            <div class="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
            <p class="text-gray-600 dark:text-gray-400">Latest technology at your fingertips</p>
          </div>
          <div class="text-center">
            <div class="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users class="w-8 h-8 text-orange-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
            <p class="text-gray-600 dark:text-gray-400">Building connections across Nigeria</p>
          </div>
        </div>
      </section>

      <!-- Statistics -->
      <section class="mb-16">
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 md:p-12">
          <h2 class="text-3xl font-bold mb-8 text-center">Our Impact in Numbers</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div class="text-4xl font-bold mb-2">50K+</div>
              <div class="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">36</div>
              <div class="text-blue-100">States Covered</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">99.8%</div>
              <div class="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div class="text-4xl font-bold mb-2">24/7</div>
              <div class="text-blue-100">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Team -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Meet Our Team</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User class="w-16 h-16 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Adebayo Johnson</h3>
            <p class="text-blue-600 mb-2">CEO & Founder</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Tech entrepreneur with 10+ years in mobile technology
            </p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User class="w-16 h-16 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Fatima Abdullahi</h3>
            <p class="text-green-600 mb-2">Head of Operations</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Operations expert ensuring smooth delivery nationwide
            </p>
          </div>
          <div class="text-center">
            <div class="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User class="w-16 h-16 text-white" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Chinedu Okafor</h3>
            <p class="text-purple-600 mb-2">Customer Experience Lead</p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Dedicated to ensuring every customer has an amazing experience
            </p>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="text-center">
        <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 md:p-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Join Our Family?</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience the difference of shopping with Nigeria's most trusted phone retailer.
            Browse our collection and discover your perfect smartphone today.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/shop"
              class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Shop Now
            </router-link>
            <router-link
              to="/contact"
              class="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors font-semibold"
            >
              Contact Us
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Target, Eye, Shield, Heart, Zap, Users, User } from 'lucide-vue-next'
</script>
