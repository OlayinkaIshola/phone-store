<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          {{ isEditing ? 'Edit Product' : 'Add New Product' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <X class="h-6 w-6" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
            <select
              v-model="form.brand"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Brand</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Tecno">Tecno</option>
              <option value="Infinix">Infinix</option>
              <option value="Xiaomi">Xiaomi</option>
              <option value="Oppo">Oppo</option>
              <option value="Vivo">Vivo</option>
              <option value="Huawei">Huawei</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              v-model="form.category"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category</option>
              <option value="smartphone">Smartphone</option>
              <option value="tablet">Tablet</option>
              <option value="accessory">Accessory</option>
              <option value="smartwatch">Smartwatch</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price (₦) *</label>
            <input
              v-model.number="form.price"
              type="number"
              required
              min="0"
              step="1000"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter price in Naira"
            />
          </div>
        </div>

        <!-- Images -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Main Image URL *</label>
          <input
            v-model="form.image"
            type="url"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter main image URL"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Additional Images</label>
          <div class="space-y-2">
            <input
              v-for="(image, index) in form.images"
              :key="index"
              v-model="form.images[index]"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="`Additional image ${index + 1} URL`"
            />
            <button
              type="button"
              @click="addImageField"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Another Image
            </button>
          </div>
        </div>

        <!-- Specifications -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Storage</label>
            <input
              v-model="form.storage"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 128GB, 256GB"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">RAM</label>
            <input
              v-model="form.ram"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 4GB, 8GB, 12GB"
            />
          </div>
        </div>

        <!-- Colors -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Available Colors</label>
          <div class="space-y-2">
            <input
              v-for="(color, index) in form.colors"
              :key="index"
              v-model="form.colors[index]"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="`Color ${index + 1}`"
            />
            <button
              type="button"
              @click="addColorField"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Add Another Color
            </button>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            v-model="form.description"
            required
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter product description"
          ></textarea>
        </div>

        <!-- Status Options -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-center">
            <input
              v-model="form.inStock"
              type="checkbox"
              id="inStock"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="inStock" class="ml-2 text-sm text-gray-700">In Stock</label>
          </div>

          <div class="flex items-center">
            <input
              v-model="form.isNew"
              type="checkbox"
              id="isNew"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label for="isNew" class="ml-2 text-sm text-gray-700">New Product</label>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
            <input
              v-model.number="form.discount"
              type="number"
              min="0"
              max="100"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import { useProductsStore, type Product } from '@/stores/products'

interface Props {
  product?: Product | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  saved: [product: Product]
}>()

const productsStore = useProductsStore()
const isSubmitting = ref(false)
const isEditing = ref(false)

const form = reactive({
  name: '',
  brand: '',
  category: '',
  price: 0,
  image: '',
  images: [''],
  storage: '',
  ram: '',
  colors: [''],
  description: '',
  inStock: true,
  isNew: false,
  discount: 0,
  rating: 0,
  reviewCount: 0,
  specifications: {} as Record<string, string>,
  features: [] as string[]
})

const addImageField = () => {
  form.images.push('')
}

const addColorField = () => {
  form.colors.push('')
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Clean up empty arrays
    const cleanImages = form.images.filter(img => img.trim() !== '')
    const cleanColors = form.colors.filter(color => color.trim() !== '')
    
    // Build specifications from form data
    const specifications: Record<string, string> = {}
    if (form.storage) specifications['Storage'] = form.storage
    if (form.ram) specifications['RAM'] = form.ram
    
    const productData = {
      name: form.name,
      brand: form.brand,
      category: form.category,
      price: form.price,
      image: form.image,
      images: cleanImages,
      storage: form.storage,
      ram: form.ram,
      colors: cleanColors,
      description: form.description,
      inStock: form.inStock,
      isNew: form.isNew,
      discount: form.discount || undefined,
      rating: form.rating || 0,
      reviewCount: form.reviewCount || 0,
      specifications,
      features: form.features
    }

    let savedProduct: Product
    
    if (isEditing.value && props.product) {
      savedProduct = productsStore.updateProduct(props.product.id, productData)!
    } else {
      savedProduct = productsStore.addProduct(productData)
    }
    
    emit('saved', savedProduct)
    emit('close')
  } catch (error) {
    console.error('Error saving product:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  if (props.product) {
    isEditing.value = true
    Object.assign(form, {
      ...props.product,
      images: props.product.images.length > 0 ? props.product.images : [''],
      colors: props.product.colors && props.product.colors.length > 0 ? props.product.colors : ['']
    })
  }
})
</script>
