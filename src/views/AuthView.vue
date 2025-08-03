<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo and Header -->
      <div class="text-center">
        <router-link to="/" class="inline-block">
          <div class="text-2xl font-bold text-secondary">📱 PhoneHub</div>
        </router-link>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">
          {{ isLogin ? 'Sign in to your account' : 'Create your account' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isLogin ? 'Or' : 'Already have an account?' }}
          <button
            @click="toggleMode"
            class="font-medium text-accent-blue hover:text-blue-500"
          >
            {{ isLogin ? 'create a new account' : 'sign in here' }}
          </button>
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- Login Form -->
        <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1 relative">
              <input
                id="email"
                v-model="loginForm.email"
                type="email"
                autocomplete="email"
                required
                :class="errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-accent-blue focus:ring-accent-blue'"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                placeholder="Enter your email"
              >
              <Mail class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                :class="errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-accent-blue focus:ring-accent-blue'"
                class="appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                placeholder="Enter your password"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="!showPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Remember Me and Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="loginForm.rememberMe"
                type="checkbox"
                class="h-4 w-4 text-accent-blue focus:ring-accent-blue border-gray-300 rounded"
              >
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div class="text-sm">
              <button
                type="button"
                @click="showForgotPassword = true"
                class="font-medium text-accent-blue hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <Loader2 class="h-5 w-5 animate-spin" />
              </span>
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-6">
          <!-- First Name and Last Name -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                id="firstName"
                v-model="registerForm.firstName"
                type="text"
                autocomplete="given-name"
                required
                :class="errors.firstName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-accent-blue focus:ring-accent-blue'"
                class="mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                placeholder="First name"
              >
              <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">{{ errors.firstName }}</p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                id="lastName"
                v-model="registerForm.lastName"
                type="text"
                autocomplete="family-name"
                required
                :class="errors.lastName ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-accent-blue focus:ring-accent-blue'"
                class="mt-1 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                placeholder="Last name"
              >
              <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">{{ errors.lastName }}</p>
            </div>
          </div>

          <!-- Email Field -->
          <div>
            <label for="register-email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1 relative">
              <input
                id="register-email"
                v-model="registerForm.email"
                type="email"
                autocomplete="email"
                required
                :class="errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-accent-blue focus:ring-accent-blue'"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                placeholder="Enter your email"
              >
              <Mail class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700">
              Phone number
            </label>
            <div class="mt-1 relative">
              <input
                id="phone"
                v-model="registerForm.phone"
                type="tel"
                autocomplete="tel"
                required
                :class="errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-accent-blue focus:ring-accent-blue'"
                class="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                placeholder="+234 xxx xxx xxxx"
              >
              <Phone class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Password Field -->
          <div>
            <label for="register-password" class="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div class="mt-1 relative">
              <input
                id="register-password"
                v-model="registerForm.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                :class="errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-accent-blue focus:ring-accent-blue'"
                class="appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                placeholder="Create a password"
              >
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="!showPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>

            <!-- Password Strength Indicator -->
            <div class="mt-2">
              <div class="flex items-center space-x-2">
                <div class="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    :class="passwordStrengthColor"
                    class="h-2 rounded-full transition-all duration-300"
                    :style="{ width: passwordStrengthWidth }"
                  ></div>
                </div>
                <span class="text-xs text-gray-500">{{ passwordStrengthText }}</span>
              </div>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <div class="mt-1 relative">
              <input
                id="confirmPassword"
                v-model="registerForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                :class="errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-accent-blue focus:ring-accent-blue'"
                class="appearance-none block w-full px-3 py-2 pr-10 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 sm:text-sm"
                placeholder="Confirm your password"
              >
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
              >
                <Eye v-if="!showConfirmPassword" class="h-5 w-5" />
                <EyeOff v-else class="h-5 w-5" />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Terms and Conditions -->
          <div class="flex items-center">
            <input
              id="terms"
              v-model="registerForm.acceptTerms"
              type="checkbox"
              required
              class="h-4 w-4 text-accent-blue focus:ring-accent-blue border-gray-300 rounded"
            >
            <label for="terms" class="ml-2 block text-sm text-gray-900">
              I agree to the
              <a href="#" class="text-accent-blue hover:text-blue-500">Terms and Conditions</a>
              and
              <a href="#" class="text-accent-blue hover:text-blue-500">Privacy Policy</a>
            </label>
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="isLoading || !registerForm.acceptTerms"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <Loader2 class="h-5 w-5 animate-spin" />
              </span>
              {{ isLoading ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
        </form>

        <!-- Error Message -->
        <div v-if="authError" class="mt-6 rounded-md bg-red-50 p-4">
          <div class="flex">
            <AlertCircle class="h-5 w-5 text-red-400" />
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">
                {{ isLogin ? 'Login Failed' : 'Registration Failed' }}
              </h3>
              <p class="mt-1 text-sm text-red-700">{{ authError }}</p>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="mt-6 rounded-md bg-green-50 p-4">
          <div class="flex">
            <CheckCircle class="h-5 w-5 text-green-400" />
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">Success!</h3>
              <p class="mt-1 text-sm text-green-700">{{ successMessage }}</p>
            </div>
          </div>
        </div>

        <!-- Social Login -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              @click="loginWithGoogle"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="ml-2">Google</span>
            </button>

            <button
              @click="loginWithFacebook"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <svg class="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="ml-2">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Reset Password</h3>
            <button @click="showForgotPassword = false" class="text-gray-400 hover:text-gray-600">
              <X class="h-6 w-6" />
            </button>
          </div>

          <form @submit.prevent="handleForgotPassword" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email address</label>
              <input
                v-model="forgotPasswordEmail"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-accent-blue focus:border-accent-blue"
                placeholder="Enter your email"
              >
            </div>

            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="showForgotPassword = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isResettingPassword"
                class="px-4 py-2 text-sm font-medium text-white bg-accent-blue hover:bg-blue-700 rounded-md disabled:opacity-50"
              >
                {{ isResettingPassword ? 'Sending...' : 'Send Reset Link' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  Mail, Phone, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, X
} from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { useNotificationsStore } from '@/stores/notifications'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

// Reactive state
const isLogin = ref(true)
const isLoading = ref(false)
const isResettingPassword = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const showForgotPassword = ref(false)
const authError = ref('')
const successMessage = ref('')
const forgotPasswordEmail = ref('')

// Form data
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

const registerForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

// Form errors
const errors = ref<Record<string, string>>({})

// Password strength computation
const passwordStrength = computed(() => {
  const password = registerForm.value.password
  if (!password) return 0

  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[a-z]/.test(password)) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25

  return Math.min(strength, 100)
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength === 0) return ''
  if (strength < 50) return 'Weak'
  if (strength < 75) return 'Good'
  return 'Strong'
})

const passwordStrengthColor = computed(() => {
  const strength = passwordStrength.value
  if (strength < 50) return 'bg-red-500'
  if (strength < 75) return 'bg-yellow-500'
  return 'bg-green-500'
})

const passwordStrengthWidth = computed(() => {
  return `${passwordStrength.value}%`
})

// Methods
const toggleMode = () => {
  isLogin.value = !isLogin.value
  clearErrors()
  clearMessages()
}

const clearErrors = () => {
  errors.value = {}
  authError.value = ''
}

const clearMessages = () => {
  successMessage.value = ''
  authError.value = ''
}

const validateLoginForm = () => {
  const newErrors: Record<string, string> = {}

  if (!loginForm.value.email) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(loginForm.value.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!loginForm.value.password) {
    newErrors.password = 'Password is required'
  } else if (loginForm.value.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const validateRegisterForm = () => {
  const newErrors: Record<string, string> = {}

  if (!registerForm.value.firstName) {
    newErrors.firstName = 'First name is required'
  }

  if (!registerForm.value.lastName) {
    newErrors.lastName = 'Last name is required'
  }

  if (!registerForm.value.email) {
    newErrors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(registerForm.value.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!registerForm.value.phone) {
    newErrors.phone = 'Phone number is required'
  } else if (!/^\+?[1-9]\d{1,14}$/.test(registerForm.value.phone.replace(/\s/g, ''))) {
    newErrors.phone = 'Please enter a valid phone number'
  }

  if (!registerForm.value.password) {
    newErrors.password = 'Password is required'
  } else if (registerForm.value.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  if (!registerForm.value.confirmPassword) {
    newErrors.confirmPassword = 'Please confirm your password'
  } else if (registerForm.value.password !== registerForm.value.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleLogin = async () => {
  clearMessages()

  if (!validateLoginForm()) return

  isLoading.value = true

  try {
    await authStore.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
      rememberMe: loginForm.value.rememberMe
    })

    successMessage.value = 'Login successful! Redirecting...'

    // Redirect after successful login
    setTimeout(() => {
      const redirect = route.query.redirect as string || '/'
      router.push(redirect)
    }, 1500)

  } catch (error: any) {
    authError.value = error.message || 'Login failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleRegister = async () => {
  clearMessages()

  if (!validateRegisterForm()) return

  isLoading.value = true

  try {
    const result = await authStore.register({
      firstName: registerForm.value.firstName,
      lastName: registerForm.value.lastName,
      email: registerForm.value.email,
      phone: registerForm.value.phone,
      password: registerForm.value.password
    })

    // Send welcome email
    try {
      const customerName = `${registerForm.value.firstName} ${registerForm.value.lastName}`
      await notificationsStore.sendWelcomeEmail(
        registerForm.value.email,
        customerName,
        result.user.id
      )
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Don't block registration if email fails
    }

    successMessage.value = 'Account created successfully! Please check your email to verify your account.'

    // Switch to login mode after successful registration
    setTimeout(() => {
      isLogin.value = true
      loginForm.value.email = registerForm.value.email
    }, 2000)

  } catch (error: any) {
    authError.value = error.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const handleForgotPassword = async () => {
  if (!forgotPasswordEmail.value) return

  isResettingPassword.value = true

  try {
    await authStore.resetPassword(forgotPasswordEmail.value)
    successMessage.value = 'Password reset link sent to your email!'
    showForgotPassword.value = false
    forgotPasswordEmail.value = ''
  } catch (error: any) {
    authError.value = error.message || 'Failed to send reset link. Please try again.'
  } finally {
    isResettingPassword.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    await authStore.loginWithGoogle()
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  } catch (error: any) {
    authError.value = error.message || 'Google login failed. Please try again.'
  }
}

const loginWithFacebook = async () => {
  try {
    await authStore.loginWithFacebook()
    const redirect = route.query.redirect as string || '/'
    router.push(redirect)
  } catch (error: any) {
    authError.value = error.message || 'Facebook login failed. Please try again.'
  }
}

// Watch for route changes to determine initial mode
watch(() => route.query.mode, (mode) => {
  if (mode === 'register') {
    isLogin.value = false
  } else {
    isLogin.value = true
  }
}, { immediate: true })

// Clear errors when switching between forms
watch(isLogin, () => {
  clearErrors()
  clearMessages()
})
</script>
