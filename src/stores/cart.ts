import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  color?: string
  storage?: string
  ram?: string
  brand?: string
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  // Load from localStorage on initialization
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('cart')
      if (saved) {
        items.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
  }

  // Save to localStorage
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('cart', JSON.stringify(items.value))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }

  // Initialize cart from localStorage
  loadFromLocalStorage()

  const itemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalItems = computed(() => itemCount.value)

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const totalPrice = computed(() => subtotal.value)

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    const existingItem = items.value.find(item => 
      item.id === product.id && 
      item.color === product.color && 
      item.storage === product.storage &&
      item.ram === product.ram
    )

    if (existingItem) {
      existingItem.quantity = Math.min(existingItem.quantity + 1, 10) // Max quantity of 10
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
    saveToLocalStorage()
  }

  const removeItem = (id: string, color?: string, storage?: string, ram?: string) => {
    const index = items.value.findIndex(item => 
      item.id === id && 
      item.color === color && 
      item.storage === storage &&
      item.ram === ram
    )
    if (index > -1) {
      items.value.splice(index, 1)
      saveToLocalStorage()
    }
  }

  const updateQuantity = (id: string, quantity: number, color?: string, storage?: string, ram?: string) => {
    const item = items.value.find(item => 
      item.id === id && 
      item.color === color && 
      item.storage === storage &&
      item.ram === ram
    )
    if (item) {
      if (quantity <= 0) {
        removeItem(id, color, storage, ram)
      } else {
        item.quantity = Math.min(quantity, 10) // Max quantity of 10
      }
      saveToLocalStorage()
    }
  }

  const clearCart = () => {
    items.value = []
    saveToLocalStorage()
  }

  return {
    items,
    itemCount,
    totalItems,
    subtotal,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }
})
