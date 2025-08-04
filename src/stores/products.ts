import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  image: string
  images: string[]
  rating: number
  reviewCount: number
  inStock: boolean
  isNew?: boolean
  discount?: number
  storage?: string
  ram?: string
  colors?: string[]
  category: string
  description: string
  specifications: Record<string, string>
  features: string[]
  createdAt?: string
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([
    // iPhone Products
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      brand: 'Apple',
      price: 1200000,
      image: '/images/iphone15-promax.webp',
      images: ['/images/iphone15-promax.webp', '/images/iphone-15-plus.jpg'],
      rating: 4.8,
      reviewCount: 245,
      inStock: true,
      isNew: true,
      storage: '256GB',
      ram: '8GB',
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
      category: 'smartphone',
      description: 'The most advanced iPhone ever with titanium design and A17 Pro chip.',
      specifications: {
        'Display': '6.7-inch Super Retina XDR',
        'Chip': 'A17 Pro',
        'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
        'Battery': 'Up to 29 hours video playback',
        'Storage': '256GB',
        'RAM': '8GB'
      },
      features: ['Face ID', 'Wireless Charging', '5G', 'Water Resistant']
    },
    {
      id: '2',
      name: 'iPhone 14 Pro',
      brand: 'Apple',
      price: 850000,
      image: '/images/iphone14-pro.webp',
      images: ['/images/iphone14-pro.webp', '/images/iphone14-promax.webp'],
      rating: 4.7,
      reviewCount: 189,
      inStock: true,
      discount: 10,
      storage: '128GB',
      ram: '6GB',
      colors: ['Deep Purple', 'Gold', 'Silver', 'Space Black'],
      category: 'smartphone',
      description: 'Pro camera system with 48MP Main camera and Dynamic Island.',
      specifications: {
        'Display': '6.1-inch Super Retina XDR',
        'Chip': 'A16 Bionic',
        'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
        'Battery': 'Up to 23 hours video playback',
        'Storage': '128GB',
        'RAM': '6GB'
      },
      features: ['Face ID', 'Wireless Charging', '5G', 'Water Resistant']
    },
    {
      id: '3',
      name: 'iPhone 13',
      brand: 'Apple',
      price: 650000,
      image: '/images/iPhone-13.jpeg',
      images: ['/images/iPhone-13.jpeg', '/images/apple-iphone-13-pro-max.jpg'],
      rating: 4.6,
      reviewCount: 324,
      inStock: true,
      storage: '128GB',
      ram: '4GB',
      colors: ['Pink', 'Blue', 'Midnight', 'Starlight', 'Red'],
      category: 'smartphone',
      description: 'Advanced dual-camera system with Cinematic mode.',
      specifications: {
        'Display': '6.1-inch Super Retina XDR',
        'Chip': 'A15 Bionic',
        'Camera': '12MP Main + 12MP Ultra Wide',
        'Battery': 'Up to 19 hours video playback',
        'Storage': '128GB',
        'RAM': '4GB'
      },
      features: ['Face ID', 'Wireless Charging', '5G', 'Water Resistant']
    },
    // Samsung Products
    {
      id: '4',
      name: 'Samsung Galaxy S25 Ultra',
      brand: 'Samsung',
      price: 950000,
      image: '/images/samsung-galaxy-s25-ultra-sm-s938.jpg',
      images: ['/images/samsung-galaxy-s25-ultra-sm-s938.jpg', '/images/samsung-galaxy-s25-sm-s931.jpg'],
      rating: 4.7,
      reviewCount: 156,
      inStock: true,
      isNew: true,
      storage: '256GB',
      ram: '12GB',
      colors: ['Phantom Black', 'Phantom Silver', 'Phantom Violet'],
      category: 'smartphone',
      description: 'Ultimate Galaxy experience with S Pen and 200MP camera.',
      specifications: {
        'Display': '6.8-inch Dynamic AMOLED 2X',
        'Processor': 'Snapdragon 8 Gen 3',
        'Camera': '200MP Main + 50MP Periscope + 10MP Telephoto + 12MP Ultra Wide',
        'Battery': '5000mAh',
        'Storage': '256GB',
        'RAM': '12GB'
      },
      features: ['S Pen', 'Wireless Charging', '5G', 'Water Resistant']
    },
    {
      id: '5',
      name: 'Samsung Galaxy S24 FE',
      brand: 'Samsung',
      price: 420000,
      image: '/images/samsung-galaxy-s24-fe-r1.jpg',
      images: ['/images/samsung-galaxy-s24-fe-r1.jpg'],
      rating: 4.5,
      reviewCount: 89,
      inStock: true,
      storage: '128GB',
      ram: '8GB',
      colors: ['Graphite', 'Blue', 'Mint', 'Yellow'],
      category: 'smartphone',
      description: 'Fan Edition with flagship features at an accessible price.',
      specifications: {
        'Display': '6.4-inch Dynamic AMOLED 2X',
        'Processor': 'Exynos 2400e',
        'Camera': '50MP Main + 8MP Telephoto + 12MP Ultra Wide',
        'Battery': '4700mAh',
        'Storage': '128GB',
        'RAM': '8GB'
      },
      features: ['Wireless Charging', '5G', 'Water Resistant']
    },
    // Tecno Products
    {
      id: '6',
      name: 'Tecno Phantom V Fold2',
      brand: 'Tecno',
      price: 450000,
      image: '/images/tecno-phantom-v-fold2-.jpg',
      images: ['/images/tecno-phantom-v-fold2-.jpg', '/images/tecno-phantom-v-flip2-5g-.jpg'],
      rating: 4.3,
      reviewCount: 67,
      inStock: true,
      isNew: true,
      storage: '256GB',
      ram: '12GB',
      colors: ['Karst Green', 'Rippling Blue'],
      category: 'smartphone',
      description: 'Innovative foldable design with premium features.',
      specifications: {
        'Display': '7.85-inch Foldable LTPO AMOLED',
        'Processor': 'Dimensity 9000+',
        'Camera': '50MP Main + 50MP Portrait + 13MP Ultra Wide',
        'Battery': '5000mAh',
        'Storage': '256GB',
        'RAM': '12GB'
      },
      features: ['Foldable Display', 'Fast Charging', '5G']
    },
    {
      id: '7',
      name: 'Tecno Pova 7 Pro',
      brand: 'Tecno',
      price: 180000,
      image: '/images/tecno-pova7-pro.jpg',
      images: ['/images/tecno-pova7-pro.jpg', '/images/tecno-pova7.jpg'],
      rating: 4.2,
      reviewCount: 134,
      inStock: true,
      storage: '256GB',
      ram: '8GB',
      colors: ['Midnight Shadow', 'Lunar Frost'],
      category: 'smartphone',
      description: 'Gaming-focused smartphone with massive battery.',
      specifications: {
        'Display': '6.78-inch AMOLED',
        'Processor': 'Dimensity 7050',
        'Camera': '108MP Main + 2MP Depth',
        'Battery': '6000mAh',
        'Storage': '256GB',
        'RAM': '8GB'
      },
      features: ['Gaming Mode', 'Fast Charging', '5G']
    },
    {
      id: '8',
      name: 'Tecno Spark 30 Pro',
      brand: 'Tecno',
      price: 95000,
      image: '/images/tecno-spark-30-pro.jpg',
      images: ['/images/tecno-spark-30-pro.jpg', '/images/tecno-spark-30.jpg'],
      rating: 4.0,
      reviewCount: 98,
      inStock: true,
      storage: '128GB',
      ram: '8GB',
      colors: ['Magic Skin', 'Midnight Shadow', 'Azure Blue'],
      category: 'smartphone',
      description: 'Affordable smartphone with premium design.',
      specifications: {
        'Display': '6.78-inch IPS LCD',
        'Processor': 'Helio G100',
        'Camera': '108MP Main + AI Lens',
        'Battery': '5000mAh',
        'Storage': '128GB',
        'RAM': '8GB'
      },
      features: ['AI Photography', 'Fast Charging']
    },
    // Additional iPhone Products
    {
      id: '9',
      name: 'iPhone 16 Pro',
      brand: 'Apple',
      price: 1100000,
      image: '/images/apple-iphone-16-pro.jpg',
      images: ['/images/apple-iphone-16-pro.jpg', '/images/iPhone-16.jpg'],
      rating: 4.9,
      reviewCount: 189,
      inStock: true,
      isNew: true,
      storage: '256GB',
      ram: '8GB',
      colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
      category: 'smartphone',
      description: 'The latest iPhone 16 Pro with advanced A18 Pro chip and enhanced camera system.',
      specifications: {
        'Display': '6.3-inch Super Retina XDR',
        'Chip': 'A18 Pro',
        'Camera': '48MP Fusion + 12MP Ultra Wide + 12MP Telephoto',
        'Battery': 'Up to 27 hours video playback',
        'Storage': '256GB',
        'RAM': '8GB'
      },
      features: ['Action Button', 'Camera Control', 'USB-C', 'Face ID']
    },
    {
      id: '10',
      name: 'iPhone 12 Pro Max',
      brand: 'Apple',
      price: 750000,
      image: '/images/iPhone-12-ProMax_Gold.jpg',
      images: ['/images/iPhone-12-ProMax_Gold.jpg', '/images/Apple-iPhone-12.jpg'],
      rating: 4.7,
      reviewCount: 312,
      inStock: true,
      discount: 15,
      storage: '128GB',
      ram: '6GB',
      colors: ['Gold', 'Silver', 'Graphite', 'Pacific Blue'],
      category: 'smartphone',
      description: 'iPhone 12 Pro Max with 5G capability and Pro camera system.',
      specifications: {
        'Display': '6.7-inch Super Retina XDR',
        'Chip': 'A14 Bionic',
        'Camera': '12MP Pro camera system',
        'Battery': 'Up to 20 hours video playback',
        'Storage': '128GB',
        'RAM': '6GB'
      },
      features: ['5G', 'MagSafe', 'Ceramic Shield', 'Face ID']
    },
    {
      id: '11',
      name: 'iPhone 11 Pro Max',
      brand: 'Apple',
      price: 580000,
      image: '/images/iPhone-11-promax.jpeg',
      images: ['/images/iPhone-11-promax.jpeg', '/images/iPhone-11.jpeg'],
      rating: 4.6,
      reviewCount: 445,
      inStock: true,
      discount: 25,
      storage: '64GB',
      ram: '4GB',
      colors: ['Midnight Green', 'Space Gray', 'Silver', 'Gold'],
      category: 'smartphone',
      description: 'iPhone 11 Pro Max with triple camera system and all-day battery life.',
      specifications: {
        'Display': '6.5-inch Super Retina XDR',
        'Chip': 'A13 Bionic',
        'Camera': '12MP Triple camera system',
        'Battery': 'Up to 20 hours video playback',
        'Storage': '64GB',
        'RAM': '4GB'
      },
      features: ['Triple Camera', 'Night Mode', 'Face ID', 'Wireless Charging']
    },
    // Additional Samsung Products
    {
      id: '12',
      name: 'Samsung Galaxy S25 Plus',
      brand: 'Samsung',
      price: 850000,
      image: '/images/samsung-galaxy-s25-plus-sm-s936.jpg',
      images: ['/images/samsung-galaxy-s25-plus-sm-s936.jpg'],
      rating: 4.8,
      reviewCount: 156,
      inStock: true,
      isNew: true,
      storage: '256GB',
      ram: '12GB',
      colors: ['Phantom Black', 'Phantom Silver', 'Phantom Violet'],
      category: 'smartphone',
      description: 'Samsung Galaxy S25 Plus with advanced AI features and stunning display.',
      specifications: {
        'Display': '6.7-inch Dynamic AMOLED 2X',
        'Processor': 'Snapdragon 8 Gen 4',
        'Camera': '50MP Triple camera system',
        'Battery': '4900mAh with 45W fast charging',
        'Storage': '256GB',
        'RAM': '12GB'
      },
      features: ['S Pen Support', 'AI Photography', '5G', 'Wireless Charging']
    },
    {
      id: '13',
      name: 'Samsung Galaxy Z Flip6',
      brand: 'Samsung',
      price: 920000,
      image: '/images/samsung-galaxy-z-flip6.jpg',
      images: ['/images/samsung-galaxy-z-flip6.jpg'],
      rating: 4.7,
      reviewCount: 89,
      inStock: true,
      isNew: true,
      storage: '256GB',
      ram: '12GB',
      colors: ['Mint', 'Silver Shadow', 'Graphite', 'Pink'],
      category: 'smartphone',
      description: 'Revolutionary foldable smartphone with compact design and flagship performance.',
      specifications: {
        'Display': '6.7-inch Foldable Dynamic AMOLED 2X',
        'Processor': 'Snapdragon 8 Gen 3',
        'Camera': '50MP Dual camera system',
        'Battery': '4000mAh with 25W fast charging',
        'Storage': '256GB',
        'RAM': '12GB'
      },
      features: ['Foldable Design', 'Flex Mode', 'Cover Screen', 'IPX8 Rating']
    },
    {
      id: '14',
      name: 'Samsung Galaxy Z Fold6',
      brand: 'Samsung',
      price: 1350000,
      image: '/images/samsung-galaxy-z-fold6.jpg',
      images: ['/images/samsung-galaxy-z-fold6.jpg'],
      rating: 4.8,
      reviewCount: 67,
      inStock: true,
      isNew: true,
      storage: '512GB',
      ram: '12GB',
      colors: ['Navy', 'Silver Shadow', 'Pink'],
      category: 'smartphone',
      description: 'Ultimate productivity device with large foldable display and S Pen support.',
      specifications: {
        'Display': '7.6-inch Foldable Dynamic AMOLED 2X',
        'Processor': 'Snapdragon 8 Gen 3',
        'Camera': '50MP Triple camera system',
        'Battery': '4400mAh with 25W fast charging',
        'Storage': '512GB',
        'RAM': '12GB'
      },
      features: ['Large Foldable Display', 'S Pen Support', 'Multi-tasking', 'DeX Mode']
    },
    // Additional Tecno Products
    {
      id: '15',
      name: 'Tecno Camon 30S',
      brand: 'Tecno',
      price: 145000,
      image: '/images/tecno-camon-30s.jpg',
      images: ['/images/tecno-camon-30s.jpg'],
      rating: 4.3,
      reviewCount: 234,
      inStock: true,
      storage: '256GB',
      ram: '8GB',
      colors: ['Midnight Shadow', 'Lunar Frost', 'Magic Skin'],
      category: 'smartphone',
      description: 'Tecno Camon 30S with advanced portrait photography and sleek design.',
      specifications: {
        'Display': '6.78-inch AMOLED',
        'Processor': 'Helio G99',
        'Camera': '50MP Triple camera system',
        'Battery': '5000mAh with 70W fast charging',
        'Storage': '256GB',
        'RAM': '8GB'
      },
      features: ['Portrait Photography', 'Fast Charging', 'In-display Fingerprint', 'HiOS']
    },
    {
      id: '16',
      name: 'Tecno Spark 40 Pro',
      brand: 'Tecno',
      price: 89000,
      image: '/images/techno-spark-40-pro.jpg',
      images: ['/images/techno-spark-40-pro.jpg', '/images/techno-spark-40-4g.jpg'],
      rating: 4.1,
      reviewCount: 189,
      inStock: true,
      discount: 12,
      storage: '128GB',
      ram: '8GB',
      colors: ['Karst Green', 'Rippling Blue', 'Midnight Shadow'],
      category: 'smartphone',
      description: 'Affordable smartphone with great performance and long-lasting battery.',
      specifications: {
        'Display': '6.7-inch HD+',
        'Processor': 'Unisoc Tiger T606',
        'Camera': '48MP Dual camera system',
        'Battery': '5000mAh with 18W fast charging',
        'Storage': '128GB',
        'RAM': '8GB'
      },
      features: ['Large Battery', 'Expandable Storage', 'Face Unlock', 'Fingerprint Scanner']
    },
    {
      id: '17',
      name: 'Tecno Pova 6 Neo 5G',
      brand: 'Tecno',
      price: 165000,
      image: '/images/tecno-pova-6-neo-5g.jpg',
      images: ['/images/tecno-pova-6-neo-5g.jpg'],
      rating: 4.4,
      reviewCount: 156,
      inStock: true,
      isNew: true,
      storage: '256GB',
      ram: '8GB',
      colors: ['Midnight Shadow', 'Lunar Frost'],
      category: 'smartphone',
      description: 'Gaming-focused smartphone with 5G connectivity and powerful performance.',
      specifications: {
        'Display': '6.78-inch FHD+',
        'Processor': 'Dimensity 6080',
        'Camera': '48MP Dual camera system',
        'Battery': '7000mAh with 70W fast charging',
        'Storage': '256GB',
        'RAM': '8GB'
      },
      features: ['5G Connectivity', 'Gaming Mode', 'Massive Battery', 'Fast Charging']
    },
    {
      id: '18',
      name: 'Tecno Pop 9 5G',
      brand: 'Tecno',
      price: 75000,
      image: '/images/tecno-pop9-5g.jpg',
      images: ['/images/tecno-pop9-5g.jpg', '/images/tecno-pop9-4g.jpg'],
      rating: 4.0,
      reviewCount: 298,
      inStock: true,
      discount: 8,
      storage: '128GB',
      ram: '4GB',
      colors: ['Midnight Shadow', 'Lunar Frost', 'Magic Skin'],
      category: 'smartphone',
      description: 'Entry-level 5G smartphone with essential features at an affordable price.',
      specifications: {
        'Display': '6.6-inch HD+',
        'Processor': 'Unisoc Tiger T760',
        'Camera': '13MP Dual camera system',
        'Battery': '5000mAh with 10W charging',
        'Storage': '128GB',
        'RAM': '4GB'
      },
      features: ['5G Ready', 'Affordable Price', 'Long Battery Life', 'Expandable Storage']
    }
  ])

  const featuredProducts = computed(() => 
    products.value.filter(p => p.isNew || p.discount).slice(0, 8)
  )

  const bestSellers = computed(() => 
    products.value.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8)
  )

  const getProductById = (id: string) => {
    return products.value.find(p => p.id === id)
  }

  const getProductsByBrand = (brand: string) => {
    return products.value.filter(p => p.brand.toLowerCase() === brand.toLowerCase())
  }

  const getProductsByCategory = (category: string) => {
    return products.value.filter(p => p.category.toLowerCase() === category.toLowerCase())
  }

  const searchProducts = (query: string) => {
    const searchTerm = query.toLowerCase()
    return products.value.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    )
  }

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString()
    }
    products.value.push(newProduct)
    saveToLocalStorage()
    return newProduct
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updates }
      saveToLocalStorage()
      return products.value[index]
    }
    return null
  }

  const deleteProduct = (id: string) => {
    const index = products.value.findIndex(p => p.id === id)
    if (index !== -1) {
      const deletedProduct = products.value.splice(index, 1)[0]
      saveToLocalStorage()
      return deletedProduct
    }
    return null
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(products.value))
  }

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('products')
    if (stored) {
      try {
        const parsedProducts = JSON.parse(stored)
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          products.value = parsedProducts
        }
      } catch (error) {
        console.error('Error loading products from localStorage:', error)
      }
    }
  }

  // Load products from localStorage on store initialization
  loadFromLocalStorage()

  const categories = computed(() => {
    const uniqueCategories = [...new Set(products.value.map(p => p.category))]
    return uniqueCategories
  })

  const brands = computed(() => {
    const uniqueBrands = [...new Set(products.value.map(p => p.brand))]
    return uniqueBrands
  })

  return {
    products,
    featuredProducts,
    bestSellers,
    categories,
    brands,
    getProductById,
    getProductsByBrand,
    getProductsByCategory,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    saveToLocalStorage
  }
})
