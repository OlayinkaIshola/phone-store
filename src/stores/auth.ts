import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
  emailVerified: boolean
  createdAt: string
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  isAdmin: boolean
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.isAdmin || false)

  const login = async (credentials: LoginCredentials) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock validation
      if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        // Mock user data
        user.value = {
          id: '1',
          name: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
          email: credentials.email,
          phone: '+234 800 123 4567',
          avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=007AFF&color=fff',
          emailVerified: true,
          createdAt: new Date().toISOString(),
          address: {
            street: '123 Main Street',
            city: 'Lagos',
            state: 'Lagos State',
            zipCode: '100001'
          },
          isAdmin: ['admin@phonestore.ng', 'test@example.com'].includes(credentials.email)
        }

        // Store in localStorage
        const storageKey = credentials.rememberMe ? 'user' : 'sessionUser'
        localStorage.setItem(storageKey, JSON.stringify(user.value))

        return { success: true }
      } else {
        throw new Error('Invalid email or password')
      }
    } catch (error: any) {
      throw new Error(error.message || 'Login failed')
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData: RegisterData) => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock validation - check if email already exists
      if (userData.email === 'existing@example.com') {
        throw new Error('An account with this email already exists')
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=007AFF&color=fff`,
        emailVerified: false,
        createdAt: new Date().toISOString(),
        isAdmin: false
      }

      // Don't auto-login after registration, just return success
      return { success: true, user: newUser }
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed')
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('sessionUser')
  }

  const updateProfile = async (userData: Partial<User>) => {
    if (user.value) {
      user.value = { ...user.value, ...userData }
      localStorage.setItem('user', JSON.stringify(user.value))
    }
  }

  const initializeAuth = () => {
    // Check both persistent and session storage
    const storedUser = localStorage.getItem('user') || localStorage.getItem('sessionUser')
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        localStorage.removeItem('user')
        localStorage.removeItem('sessionUser')
      }
    }
  }

  const resetPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock validation
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Please enter a valid email address')
      }

      // In a real app, this would send a reset email
      return { success: true }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to send reset link')
    }
  }

  const loginWithGoogle = async () => {
    try {
      // Simulate Google OAuth
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock Google user data
      user.value = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        firstName: 'Google',
        lastName: 'User',
        email: 'google.user@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff',
        emailVerified: true,
        createdAt: new Date().toISOString(),
        isAdmin: false
      }

      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (error: any) {
      throw new Error('Google login failed')
    }
  }

  const loginWithFacebook = async () => {
    try {
      // Simulate Facebook OAuth
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock Facebook user data
      user.value = {
        id: 'facebook_' + Date.now(),
        name: 'Facebook User',
        firstName: 'Facebook',
        lastName: 'User',
        email: 'facebook.user@facebook.com',
        avatar: 'https://ui-avatars.com/api/?name=Facebook+User&background=1877F2&color=fff',
        emailVerified: true,
        createdAt: new Date().toISOString(),
        isAdmin: false
      }

      localStorage.setItem('user', JSON.stringify(user.value))
      return { success: true }
    } catch (error: any) {
      throw new Error('Facebook login failed')
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
    initializeAuth,
    resetPassword,
    loginWithGoogle,
    loginWithFacebook
  }
})
