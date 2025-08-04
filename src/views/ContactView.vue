<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">Get in Touch</h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto">
          We're here to help! Reach out to us for any questions, support, or feedback
        </p>
      </div>
    </div>

    <div class="container mx-auto px-4 py-16">
      <!-- Contact Methods -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">How to Reach Us</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div class="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone class="w-8 h-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">Call us directly</p>
            <a href="tel:+2348123456789" class="text-blue-600 hover:text-blue-700 font-medium">
              +234 812 345 6789
            </a>
          </div>

          <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div class="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare class="w-8 h-8 text-green-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">WhatsApp</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">Chat with us</p>
            <a href="https://wa.me/2348123456789" class="text-green-600 hover:text-green-700 font-medium">
              +234 812 345 6789
            </a>
          </div>

          <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div class="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail class="w-8 h-8 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">Send us an email</p>
            <a href="mailto:info@phonestoreng.com" class="text-purple-600 hover:text-purple-700 font-medium">
              info@phonestoreng.com
            </a>
          </div>

          <div class="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <div class="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin class="w-8 h-8 text-orange-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-2">Our main store</p>
            <p class="text-orange-600 font-medium text-sm">
              123 Computer Village<br>
              Ikeja, Lagos
            </p>
          </div>
        </div>
      </section>

      <!-- Contact Form & Info -->
      <section class="mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Your first name"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Your last name"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="your.email@example.com"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="+234 800 000 0000"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="order">Order Status</option>
                  <option value="warranty">Warranty Claim</option>
                  <option value="partnership">Business Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Sending...</span>
                <span v-else>Send Message</span>
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Business Hours -->
            <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Clock class="w-6 h-6 text-blue-600 mr-2" />
                Business Hours
              </h3>
              <div class="space-y-2 text-gray-600 dark:text-gray-400">
                <div class="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span class="font-medium">9:00 AM - 7:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Saturday:</span>
                  <span class="font-medium">10:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Sunday:</span>
                  <span class="font-medium">12:00 PM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <!-- Support Information -->
            <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Headphones class="w-6 h-6 text-green-600 mr-2" />
                Customer Support
              </h3>
              <div class="space-y-3 text-gray-600 dark:text-gray-400">
                <p>Our dedicated support team is available to help you with:</p>
                <ul class="space-y-1 ml-4">
                  <li>• Product inquiries and recommendations</li>
                  <li>• Order tracking and delivery updates</li>
                  <li>• Technical support and troubleshooting</li>
                  <li>• Warranty claims and repairs</li>
                  <li>• Returns and exchanges</li>
                </ul>
              </div>
            </div>

            <!-- FAQ Link -->
            <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <HelpCircle class="w-6 h-6 text-purple-600 mr-2" />
                Quick Help
              </h3>
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Looking for quick answers? Check out our frequently asked questions.
              </p>
              <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Map Section -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Find Our Store</h2>
        <div class="bg-gray-200 dark:bg-gray-700 rounded-xl h-96 flex items-center justify-center">
          <div class="text-center">
            <MapPin class="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-600 dark:text-gray-400">Interactive map coming soon</p>
            <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
              123 Computer Village, Ikeja, Lagos, Nigeria
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Phone, MessageSquare, Mail, MapPin, Clock, Headphones, HelpCircle
} from 'lucide-vue-next'

const isSubmitting = ref(false)

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    alert('Thank you for your message! We will get back to you within 24 hours.')

    // Reset form
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    alert('Sorry, there was an error sending your message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
