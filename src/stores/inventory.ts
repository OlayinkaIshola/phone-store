import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface InventoryItem {
  id: string
  productId: string
  productName: string
  productImage: string
  sku: string
  currentStock: number
  minStockLevel: number
  maxStockLevel: number
  reorderPoint: number
  reorderQuantity: number
  unitCost: number
  totalValue: number
  location: string
  supplier: string
  lastRestocked: string
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued'
  category: string
  brand: string
}

export interface StockMovement {
  id: string
  productId: string
  productName: string
  type: 'in' | 'out' | 'adjustment' | 'return'
  quantity: number
  reason: string
  reference: string
  date: string
  user: string
  notes?: string
}

export interface StockAlert {
  id: string
  productId: string
  productName: string
  type: 'low_stock' | 'out_of_stock' | 'overstock' | 'reorder'
  message: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  createdAt: string
  acknowledged: boolean
}

export const useInventoryStore = defineStore('inventory', () => {
  // State
  const inventory = ref<InventoryItem[]>([])
  const stockMovements = ref<StockMovement[]>([])
  const stockAlerts = ref<StockAlert[]>([])
  const isLoading = ref(false)

  // Initialize with mock data
  const initializeInventory = () => {
    inventory.value = [
      {
        id: '1',
        productId: '1',
        productName: 'iPhone 15 Pro Max',
        productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        sku: 'IPH15PM-256-TB',
        currentStock: 25,
        minStockLevel: 10,
        maxStockLevel: 100,
        reorderPoint: 15,
        reorderQuantity: 50,
        unitCost: 850000,
        totalValue: 21250000,
        location: 'Warehouse A-1',
        supplier: 'Apple Nigeria',
        lastRestocked: '2024-01-15',
        status: 'in_stock',
        category: 'Smartphones',
        brand: 'Apple'
      },
      {
        id: '2',
        productId: '2',
        productName: 'Samsung Galaxy S24 Ultra',
        productImage: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400',
        sku: 'SGS24U-512-BK',
        currentStock: 8,
        minStockLevel: 10,
        maxStockLevel: 80,
        reorderPoint: 12,
        reorderQuantity: 40,
        unitCost: 780000,
        totalValue: 6240000,
        location: 'Warehouse A-2',
        supplier: 'Samsung Nigeria',
        lastRestocked: '2024-01-10',
        status: 'low_stock',
        category: 'Smartphones',
        brand: 'Samsung'
      },
      {
        id: '3',
        productId: '3',
        productName: 'Google Pixel 8 Pro',
        productImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
        sku: 'GPX8P-256-WH',
        currentStock: 0,
        minStockLevel: 5,
        maxStockLevel: 50,
        reorderPoint: 8,
        reorderQuantity: 25,
        unitCost: 650000,
        totalValue: 0,
        location: 'Warehouse B-1',
        supplier: 'Google Store',
        lastRestocked: '2023-12-20',
        status: 'out_of_stock',
        category: 'Smartphones',
        brand: 'Google'
      },
      {
        id: '4',
        productId: '4',
        productName: 'OnePlus 12',
        productImage: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400',
        sku: 'OP12-256-GR',
        currentStock: 35,
        minStockLevel: 8,
        maxStockLevel: 60,
        reorderPoint: 12,
        reorderQuantity: 30,
        unitCost: 520000,
        totalValue: 18200000,
        location: 'Warehouse B-2',
        supplier: 'OnePlus Nigeria',
        lastRestocked: '2024-01-18',
        status: 'in_stock',
        category: 'Smartphones',
        brand: 'OnePlus'
      },
      {
        id: '5',
        productId: '5',
        productName: 'iPhone 14',
        productImage: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        sku: 'IPH14-128-BL',
        currentStock: 12,
        minStockLevel: 15,
        maxStockLevel: 75,
        reorderPoint: 18,
        reorderQuantity: 35,
        unitCost: 650000,
        totalValue: 7800000,
        location: 'Warehouse A-3',
        supplier: 'Apple Nigeria',
        lastRestocked: '2024-01-12',
        status: 'low_stock',
        category: 'Smartphones',
        brand: 'Apple'
      }
    ]

    // Initialize stock movements
    stockMovements.value = [
      {
        id: '1',
        productId: '1',
        productName: 'iPhone 15 Pro Max',
        type: 'in',
        quantity: 50,
        reason: 'Purchase Order',
        reference: 'PO-2024-001',
        date: '2024-01-15',
        user: 'Admin',
        notes: 'New stock arrival from Apple Nigeria'
      },
      {
        id: '2',
        productId: '1',
        productName: 'iPhone 15 Pro Max',
        type: 'out',
        quantity: 25,
        reason: 'Sale',
        reference: 'ORD-2024-156',
        date: '2024-01-20',
        user: 'System'
      },
      {
        id: '3',
        productId: '2',
        productName: 'Samsung Galaxy S24 Ultra',
        type: 'out',
        quantity: 12,
        reason: 'Sale',
        reference: 'ORD-2024-178',
        date: '2024-01-22',
        user: 'System'
      },
      {
        id: '4',
        productId: '3',
        productName: 'Google Pixel 8 Pro',
        type: 'out',
        quantity: 5,
        reason: 'Sale',
        reference: 'ORD-2024-189',
        date: '2024-01-25',
        user: 'System'
      }
    ]

    // Generate stock alerts
    generateStockAlerts()
  }

  // Generate stock alerts based on current inventory
  const generateStockAlerts = () => {
    stockAlerts.value = []
    
    inventory.value.forEach(item => {
      if (item.currentStock === 0) {
        stockAlerts.value.push({
          id: `alert-${item.id}-out`,
          productId: item.id,
          productName: item.productName,
          type: 'out_of_stock',
          message: `${item.productName} is out of stock`,
          severity: 'critical',
          createdAt: new Date().toISOString(),
          acknowledged: false
        })
      } else if (item.currentStock <= item.reorderPoint) {
        stockAlerts.value.push({
          id: `alert-${item.id}-reorder`,
          productId: item.id,
          productName: item.productName,
          type: 'reorder',
          message: `${item.productName} has reached reorder point (${item.currentStock} units remaining)`,
          severity: 'high',
          createdAt: new Date().toISOString(),
          acknowledged: false
        })
      } else if (item.currentStock <= item.minStockLevel) {
        stockAlerts.value.push({
          id: `alert-${item.id}-low`,
          productId: item.id,
          productName: item.productName,
          type: 'low_stock',
          message: `${item.productName} is running low (${item.currentStock} units remaining)`,
          severity: 'medium',
          createdAt: new Date().toISOString(),
          acknowledged: false
        })
      }
    })
  }

  // Computed properties
  const totalInventoryValue = computed(() => {
    return inventory.value.reduce((total, item) => total + item.totalValue, 0)
  })

  const lowStockItems = computed(() => {
    return inventory.value.filter(item => item.status === 'low_stock' || item.currentStock <= item.minStockLevel)
  })

  const outOfStockItems = computed(() => {
    return inventory.value.filter(item => item.status === 'out_of_stock' || item.currentStock === 0)
  })

  const criticalAlerts = computed(() => {
    return stockAlerts.value.filter(alert => alert.severity === 'critical' && !alert.acknowledged)
  })

  const pendingAlerts = computed(() => {
    return stockAlerts.value.filter(alert => !alert.acknowledged)
  })

  const inventoryTurnover = computed(() => {
    // Mock calculation - in real app, this would be based on sales data
    return 4.2
  })

  // Actions
  const updateStock = async (productId: string, quantity: number, type: 'in' | 'out' | 'adjustment', reason: string, reference: string, notes?: string) => {
    isLoading.value = true
    
    try {
      const item = inventory.value.find(i => i.productId === productId)
      if (!item) throw new Error('Product not found in inventory')

      // Calculate new stock level
      let newStock = item.currentStock
      if (type === 'in') {
        newStock += quantity
      } else if (type === 'out') {
        newStock -= quantity
      } else if (type === 'adjustment') {
        newStock = quantity
      }

      // Ensure stock doesn't go negative
      if (newStock < 0) {
        throw new Error('Insufficient stock for this operation')
      }

      // Update inventory
      item.currentStock = newStock
      item.totalValue = newStock * item.unitCost
      
      // Update status based on new stock level
      if (newStock === 0) {
        item.status = 'out_of_stock'
      } else if (newStock <= item.minStockLevel) {
        item.status = 'low_stock'
      } else {
        item.status = 'in_stock'
      }

      // Add stock movement record
      const movement: StockMovement = {
        id: Date.now().toString(),
        productId,
        productName: item.productName,
        type,
        quantity,
        reason,
        reference,
        date: new Date().toISOString(),
        user: 'Admin',
        notes
      }
      stockMovements.value.unshift(movement)

      // Regenerate alerts
      generateStockAlerts()

      return { success: true, newStock }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update stock')
    } finally {
      isLoading.value = false
    }
  }

  const acknowledgeAlert = (alertId: string) => {
    const alert = stockAlerts.value.find(a => a.id === alertId)
    if (alert) {
      alert.acknowledged = true
    }
  }

  const acknowledgeAllAlerts = () => {
    stockAlerts.value.forEach(alert => {
      alert.acknowledged = true
    })
  }

  const getInventoryItem = (productId: string) => {
    return inventory.value.find(item => item.productId === productId)
  }

  const getStockMovements = (productId?: string) => {
    if (productId) {
      return stockMovements.value.filter(movement => movement.productId === productId)
    }
    return stockMovements.value
  }

  // Initialize data
  initializeInventory()

  return {
    // State
    inventory,
    stockMovements,
    stockAlerts,
    isLoading,
    
    // Computed
    totalInventoryValue,
    lowStockItems,
    outOfStockItems,
    criticalAlerts,
    pendingAlerts,
    inventoryTurnover,
    
    // Actions
    updateStock,
    acknowledgeAlert,
    acknowledgeAllAlerts,
    getInventoryItem,
    getStockMovements,
    generateStockAlerts
  }
})
