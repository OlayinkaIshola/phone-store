<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">🔥 Hot Deals & Offers</h1>
        <p class="text-xl md:text-2xl mb-8">Save big on the latest smartphones in Nigeria!</p>
        <div class="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <span class="bg-white/20 px-4 py-2 rounded-full">Up to 50% Off</span>
          <span class="bg-white/20 px-4 py-2 rounded-full">Free Delivery</span>
          <span class="bg-white/20 px-4 py-2 rounded-full">1 Year Warranty</span>
        </div>
      </div>
    </div>

    <!-- Flash Sale Timer -->
    <div class="bg-red-600 text-white py-4">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex items-center space-x-4 mb-4 md:mb-0">
            <Zap class="w-6 h-6" />
            <span class="text-lg font-semibold">Flash Sale Ends In:</span>
          </div>
          <div class="flex space-x-4">
            <div class="text-center">
              <div class="bg-white text-red-600 px-3 py-2 rounded font-bold text-xl">{{ timeLeft.hours }}</div>
              <div class="text-sm">Hours</div>
            </div>
            <div class="text-center">
              <div class="bg-white text-red-600 px-3 py-2 rounded font-bold text-xl">{{ timeLeft.minutes }}</div>
              <div class="text-sm">Minutes</div>
            </div>
            <div class="text-center">
              <div class="bg-white text-red-600 px-3 py-2 rounded font-bold text-xl">{{ timeLeft.seconds }}</div>
              <div class="text-sm">Seconds</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Deal Categories -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <button
          v-for="category in dealCategories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="selectedCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'"
          class="p-4 rounded-lg text-center transition-colors hover:bg-blue-500 hover:text-white"
        >
          <component :is="category.icon" class="w-8 h-8 mx-auto mb-2" />
          <div class="font-medium">{{ category.name }}</div>
          <div class="text-sm opacity-75">{{ category.count }} deals</div>
        </button>
      </div>

      <!-- Featured Deals -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">🌟 Featured Deals</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="deal in featuredDeals" :key="deal.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="relative">
              <img :src="deal.image" :alt="deal.name" class="w-full h-48 object-contain bg-gray-50 dark:bg-gray-700">
              <div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{{ deal.discount }}%
              </div>
              <div class="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-xs">
                {{ deal.timeLeft }}
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{{ deal.name }}</h3>
              <div class="flex items-center justify-between mb-4">
                <div>
                  <span class="text-2xl font-bold text-blue-600">₦{{ deal.salePrice.toLocaleString() }}</span>
                  <span class="text-lg text-gray-500 line-through ml-2">₦{{ deal.originalPrice.toLocaleString() }}</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ deal.soldCount }} sold
                </div>
                <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Deal Types -->
      <section class="mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">💰 Deal Types</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-8 rounded-xl text-center">
            <Tag class="w-12 h-12 mx-auto mb-4" />
            <h3 class="text-2xl font-bold mb-2">Daily Deals</h3>
            <p class="mb-4">New deals every day with up to 40% off</p>
            <button class="bg-white text-orange-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Deals
            </button>
          </div>

          <div class="bg-gradient-to-br from-green-400 to-blue-500 text-white p-8 rounded-xl text-center">
            <Package class="w-12 h-12 mx-auto mb-4" />
            <h3 class="text-2xl font-bold mb-2">Bundle Offers</h3>
            <p class="mb-4">Phone + accessories at discounted prices</p>
            <button class="bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Shop Bundles
            </button>
          </div>

          <div class="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-8 rounded-xl text-center">
            <Percent class="w-12 h-12 mx-auto mb-4" />
            <h3 class="text-2xl font-bold mb-2">Clearance Sale</h3>
            <p class="mb-4">Last chance to grab these amazing deals</p>
            <button class="bg-white text-pink-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Shop Sale
            </button>
          </div>
        </div>
      </section>

      <!-- Newsletter Signup -->
      <section class="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">📧 Never Miss a Deal!</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">Subscribe to get notified about exclusive deals and flash sales</p>
        <div class="flex flex-col md:flex-row max-w-md mx-auto gap-4">
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          >
          <button
            @click="subscribeToDeals"
            class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Subscribe
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Zap, Tag, Package, Percent, Smartphone, Tablet, Headphones, Watch } from 'lucide-vue-next'

const selectedCategory = ref('all')
const email = ref('')

// Timer for flash sale
const timeLeft = ref({
  hours: 23,
  minutes: 45,
  seconds: 30
})

// Deal categories
const dealCategories = [
  { id: 'all', name: 'All Deals', icon: Tag, count: 156 },
  { id: 'phones', name: 'Phones', icon: Smartphone, count: 89 },
  { id: 'tablets', name: 'Tablets', icon: Tablet, count: 34 },
  { id: 'accessories', name: 'Accessories', icon: Headphones, count: 33 }
]

// Featured deals
const featuredDeals = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    image: '/images/iphone15-promax.webp',
    originalPrice: 1200000,
    salePrice: 950000,
    discount: 21,
    timeLeft: '2h 15m',
    soldCount: 45
  },
  {
    id: 2,
    name: 'Samsung Galaxy S25 Ultra',
    image: '/images/samsung-galaxy-s25-ultra-sm-s938.jpg',
    originalPrice: 950000,
    salePrice: 750000,
    discount: 21,
    timeLeft: '5h 30m',
    soldCount: 32
  },
  {
    id: 3,
    name: 'Tecno Phantom V Fold2',
    image: '/images/tecno-phantom-v-fold2-.jpg',
    originalPrice: 450000,
    salePrice: 320000,
    discount: 29,
    timeLeft: '1h 45m',
    soldCount: 18
  }
])

// Timer countdown
let timerInterval: number

const updateTimer = () => {
  if (timeLeft.value.seconds > 0) {
    timeLeft.value.seconds--
  } else if (timeLeft.value.minutes > 0) {
    timeLeft.value.minutes--
    timeLeft.value.seconds = 59
  } else if (timeLeft.value.hours > 0) {
    timeLeft.value.hours--
    timeLeft.value.minutes = 59
    timeLeft.value.seconds = 59
  }
}

const subscribeToDeals = () => {
  if (email.value && email.value.includes('@')) {
    alert('Thank you for subscribing to our deals newsletter!')
    email.value = ''
  } else {
    alert('Please enter a valid email address')
  }
}

onMounted(() => {
  timerInterval = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>
