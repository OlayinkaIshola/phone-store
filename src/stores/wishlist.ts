import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  brand: string
  inStock: boolean
}

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref<WishlistItem[]>([])

  // Load from localStorage on initialization
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('wishlist')
      if (saved) {
        items.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error)
    }
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(items.value))
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error)
    }
  }

  // Initialize wishlist from localStorage
  loadFromLocalStorage()

  const itemCount = computed(() => items.value.length)

  const isInWishlist = (id: string) => {
    return items.value.some(item => item.id === id)
  }

  const addItem = (product: WishlistItem) => {
    if (!isInWishlist(product.id)) {
      items.value.push(product)
      saveToLocalStorage()
    }
  }

  const removeItem = (id: string) => {
    const index = items.value.findIndex(item => item.id === id)
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const toggleItem = (product: WishlistItem) => {
    if (isInWishlist(product.id)) {
      removeItem(product.id)
    } else {
      addItem(product)
    }
  }

  const clearWishlist = () => {
    items.value = []
    saveToLocalStorage()
  }

  return {
    items,
    itemCount,
    isInWishlist,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist
  }
})
