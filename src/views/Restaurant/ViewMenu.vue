<template>
  <div class="max-w-4xl mx-auto mt-10 bg-white shadow rounded-md">
    <!-- Loading State -->
    <div v-if="loading" class="p-6 text-center">
      <p class="text-gray-500">Loading menu details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="p-6">
      <p class="text-red-500">{{ error }}</p>
      <button @click="fetchMenu" class="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Retry
      </button>
    </div>

    <!-- Menu Details -->
    <div v-else-if="menu">
      <!-- Tabs -->
      <div class="flex border-b border-red-300">
        <button
          :class="[
            'flex-1 px-4 py-3 text-center text-sm font-medium',
            activeTab === 'info'
              ? 'text-red-500 border-b-2 border-red-500 bg-red-50'
              : 'text-gray-500 hover:text-red-500'
          ]"
          @click="activeTab = 'info'"
        >
          <span class="inline-flex items-center gap-1">
          Information
          </span>
        </button>
        <button
          :class="[
            'flex-1 px-4 py-3 text-center text-sm font-medium',
            activeTab === 'image'
              ? 'text-red-500 border-b-2 border-red-500 bg-red-50'
              : 'text-gray-500 hover:text-red-500'
          ]"
          @click="activeTab = 'image'"
        >
          <span class="inline-flex items-center gap-1">
             Image
          </span>
        </button>
      </div>

      <!-- Tab Panels -->
      <div class="p-6 text-sm md:text-base">
        <!-- Info Tab -->
        <div v-if="activeTab === 'info'" class="grid grid-cols-1 md:grid-cols-2 gap-y-4">
          <div>
            <p class="text-gray-900 font-semibold">Name</p>
            <p class="text-gray-500">{{ menu.name || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-gray-900 font-semibold">Status</p>
            <span :class="[
              'inline-block text-xs font-medium px-2 py-1 rounded-md',
              getStatusClass(menu)
            ]">
              {{ getStatus(menu) }}
            </span>
          </div>
          <div>
            <p class="text-gray-900 font-semibold">Category</p>
            <p class="text-gray-500">{{ menu.category || 'N/A' }}</p>
          </div>
          <div>
            <p class="text-gray-900 font-semibold">Price</p>
            <p class="text-gray-500">{{ formatPrice(menu.price) }}</p>
          </div>
          <div>
            <p class="text-gray-900 font-semibold">Created Date</p>
            <p class="text-gray-500">{{ formatDate(menu.created_at) }}</p>
          </div>
          <div>
            <p class="text-gray-900 font-semibold">Updated Date</p>
            <p class="text-gray-500">{{ formatDate(menu.updated_at) }}</p>
          </div>
          <div class="md:col-span-2">
            <p class="text-gray-900 font-semibold">Description</p>
            <p class="text-gray-500">
              {{ menu.description || 'No description available' }}
            </p>
          </div>
        </div>

        <!-- Image Tab -->
        <div v-else class="flex justify-center items-center">
          <img
            v-if="menu.item_image"
            :src="menu.item_image"
            :alt="menu.name"
            class="rounded-md w-full max-w-xs"
          />
          <p v-else class="text-gray-500">No image available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { restaurantService } from '@/services/restaurantService'

const route = useRoute()
const toast = useToast()
const activeTab = ref('info')
const loading = ref(false)
const error = ref('')
const menu = ref(null)

const fetchMenu = async () => {
  const menuId = route.params.id as string
  if (!menuId) {
    error.value = 'Menu ID is required'
    return
  }

  try {
    loading.value = true
    error.value = ''
    const response = await restaurantService.getMenuById(menuId)
    
    // Handle different response structures
    if (response?.data) {
      menu.value = response.data
    } else if (response?._id) {
      menu.value = response
    } else {
      error.value = 'Invalid menu data received'
    }
  } catch (err: any) {
    console.error('Error fetching menu:', err)
    error.value = err.response?.data?.message || 'Failed to load menu details'
    toast.error('Failed to load menu details')
  } finally {
    loading.value = false
  }
}

const formatPrice = (price) => {
  if (!price && price !== 0) return '0.00'
  const numPrice = typeof price === 'string' ? parseFloat(price) : price
  return new Intl.NumberFormat('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numPrice)
}

const formatDate = (dateString) => {
  if (!dateString || dateString === '0001-01-01T00:00:00Z') return 'N/A'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}

const getStatus = (item) => {
  if (item.deleted_at && item.deleted_at !== "0001-01-01T00:00:00Z") {
    return 'Deleted'
  }
  return 'Active'
}

const getStatusClass = (item) => {
  if (item.deleted_at && item.deleted_at !== "0001-01-01T00:00:00Z") {
    return 'bg-red-100 text-red-700'
  }
  return 'bg-green-100 text-green-700'
}

onMounted(() => {
  fetchMenu()
})
</script>
