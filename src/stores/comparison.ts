import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from './products'

export const useComparisonStore = defineStore('comparison', () => {
  const products = ref<Product[]>([])
  const maxProducts = 3

  const count = computed(() => products.value.length)
  const isFull = computed(() => products.value.length >= maxProducts)
  const isEmpty = computed(() => products.value.length === 0)

  const addProduct = (product: Product) => {
    // Check if product is already in comparison
    if (products.value.find(p => p.id === product.id)) {
      return false
    }

    // Check if comparison is full
    if (products.value.length >= maxProducts) {
      return false
    }

    products.value.push(product)
    saveToLocalStorage()
    return true
  }

  const removeProduct = (productId: string) => {
    const index = products.value.findIndex(p => p.id === productId)
    if (index > -1) {
      products.value.splice(index, 1)
      saveToLocalStorage()
      return true
    }
    return false
  }

  const clearComparison = () => {
    products.value = []
    saveToLocalStorage()
  }

  const isInComparison = (productId: string) => {
    return products.value.some(p => p.id === productId)
  }

  const toggleProduct = (product: Product) => {
    if (isInComparison(product.id)) {
      return removeProduct(product.id)
    } else {
      return addProduct(product)
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('comparison', JSON.stringify(products.value))
  }

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('comparison')
    if (stored) {
      try {
        const parsedProducts = JSON.parse(stored)
        if (Array.isArray(parsedProducts)) {
          products.value = parsedProducts
        }
      } catch (error) {
        console.error('Error loading comparison from localStorage:', error)
      }
    }
  }

  // Load comparison from localStorage on store initialization
  loadFromLocalStorage()

  return {
    products,
    count,
    isFull,
    isEmpty,
    maxProducts,
    addProduct,
    removeProduct,
    clearComparison,
    isInComparison,
    toggleProduct,
    saveToLocalStorage
  }
})
