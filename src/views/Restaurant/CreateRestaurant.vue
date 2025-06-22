<template>
  <div>
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Restaurant Info Form -->
      <div class="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold mb-6">Restaurant Information & Status</h1>

        <form @submit.prevent="submitForm" class="space-y-4">
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700">NAME <span class="text-red-500">*</span></label>
            <input type="text" v-model="formData.name" required class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
          </div>

          <!-- Time -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">OPENING TIME</label>
              <input type="time" v-model="formData.openingTime" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">CLOSING TIME</label>
              <input type="time" v-model="formData.closingTime" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
            </div>
          </div>

          <div class="border-t border-gray-200 my-4"></div>

          <!-- Cuisines -->
          <div>
            <label class="block text-sm font-medium text-gray-700">CUISINES</label>
            <input type="text" v-model="formData.cuisines" placeholder="Separate cuisines with commas" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm" />
          </div>

          <!-- Address -->
          <div>
            <label class="block text-sm font-medium text-gray-700">RESTAURANT ADDRESS <span class="text-red-500">*</span></label>
            <textarea v-model="formData.address" rows="3" required class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"></textarea>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700">DESCRIPTION</label>
            <textarea v-model="formData.description" rows="4" class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"></textarea>
          </div>

          <!-- Logo Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700">LOGO</label>
            <div class="mt-1 flex items-center">
              <input type="file" ref="logoInput" @change="handleLogoUpload" accept="image/*" class="hidden" />
              <button type="button" @click="logoInput?.click()" class="px-3 py-2 border rounded-md shadow-sm text-sm bg-white hover:bg-gray-50">Choose file</button>
              <span class="ml-2 text-sm text-gray-500">{{ formData.logo?.name || 'No file chosen' }}</span>
            </div>
          </div>

          <!-- Restaurant Image Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700">RESTAURANT IMAGE</label>
            <div class="mt-1 flex items-center">
              <input type="file" ref="imageInput" @change="handleImageUpload" accept="image/*" class="hidden" />
              <button type="button" @click="imageInput?.click()" class="px-3 py-2 border rounded-md shadow-sm text-sm bg-white hover:bg-gray-50">Choose file</button>
              <span class="ml-2 text-sm text-gray-500">{{ formData.restaurantImage?.name || 'No file chosen' }}</span>
            </div>
          </div>

          <!-- Select Options -->
          <div v-for="(field, key) in selectFields" :key="key">
            <label class="block text-sm font-medium text-gray-700">{{ field.label }} <span v-if="field.required" class="text-red-500">*</span></label>
            <select v-model="formData[key]" :required="field.required" class="mt-1 block w-full border rounded-md shadow-sm">
              <option disabled value="">Select an option</option>
              <option v-for="option in field.options" :key="option.value" :value="option.value">{{ option.label }}</option>
            </select>
          </div>

          <!-- Submit -->
          <div class="pt-4">
            <button type="submit" class="w-full py-2 px-4 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">Submit</button>
          </div>
        </form>
      </div>

      <!-- Owner Info Form -->
      <div class="w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Restaurant Owner Information</h2>
        <form @submit.prevent="submitOwnerInfo" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="(field, key) in ownerFields" :key="key" :class="{ 'md:col-span-2': field.colSpan === 2, 'mt-4': key === 'submit' }">
            <label class="block text-sm font-medium text-gray-700">
              {{ field.label }} <span v-if="field.required" class="text-red-500">*</span>
            </label>
            <component
              :is="field.type === 'select' ? 'select' : 'input'"
              v-model="owner[key]"
              :type="field.inputType || 'text'"
              :required="field.required"
              :disabled="field.disabled"
              class="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm"
            >
              <option v-if="field.type === 'select'" disabled value="">---</option>
              <option v-for="option in field.options || []" :key="option.value" :value="option.value">{{ option.label }}</option>
            </component>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface FormData {
  name: string
  openingTime: string
  closingTime: string
  cuisines: string
  address: string
  description: string
  logo: File | null
  restaurantImage: File | null
  delivery: string
  table: string
  pickup: string
  currentStatus: string
  waterStatus: string
}

interface OwnerInfo {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  phone: string
  address: string
  deposit: number | null
  status: string
  longitude: string
  latitude: string
}

const formData = ref<FormData>({
  name: '',
  openingTime: '',
  closingTime: '',
  cuisines: '',
  address: '',
  description: '',
  logo: null,
  restaurantImage: null,
  delivery: '',
  table: '',
  pickup: '',
  currentStatus: '',
  waterStatus: '',
})

const owner = ref<OwnerInfo>({
  firstName: '',
  lastName: '',
  email: '',
  username: 'auto-generated-username',
  password: '',
  phone: '',
  address: '',
  deposit: null,
  status: '',
  longitude: '',
  latitude: '',
})

const logoInput = ref<HTMLInputElement | null>(null)
const imageInput = ref<HTMLInputElement | null>(null)

function handleLogoUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    formData.value.logo = file
  }
}

function handleImageUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    formData.value.restaurantImage = file
  }
}

function submitForm() {
  console.log('Submitting restaurant form:', formData.value)
}

function submitOwnerInfo() {
  console.log('Submitting owner info:', owner.value)
}

// Reusable select options
const selectFields = {
  delivery: {
    label: 'DELIVERY',
    required: true,
    options: [
      { label: 'Available', value: 'yes' },
      { label: 'Unavailable', value: 'no' },
    ],
  },
  table: {
    label: 'TABLE',
    required: true,
    options: [
      { label: 'Available', value: 'available' },
      { label: 'Limited Availability', value: 'limited' },
      { label: 'Unavailable', value: 'unavailable' },
    ],
  },
  pickup: {
    label: 'PICKUP',
    required: true,
    options: [
      { label: 'Available', value: 'yes' },
      { label: 'Unavailable', value: 'no' },
    ],
  },
  currentStatus: {
    label: 'CURRENT STATUS',
    required: true,
    options: [
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
      { label: 'Temporarily Closed', value: 'temporarily_closed' },
    ],
  },
  waterStatus: {
    label: 'WATER STATUS',
    required: true,
    options: [
      { label: 'Normal Operation', value: 'normal' },
      { label: 'Limited Service', value: 'limited' },
      { label: 'No Water Service', value: 'no_service' },
    ],
  },
}

// Reusable owner fields config
const ownerFields: Record<string, any> = {
  firstName: { label: 'First Name', required: true },
  lastName: { label: 'Last Name', required: true },
  email: { label: 'Email', required: true, inputType: 'email' },
  username: { label: 'Username', disabled: true },
  password: { label: 'Password', required: true, inputType: 'password' },
  phone: { label: 'Phone', required: true, inputType: 'tel' },
  address: { label: 'Address', required: true, colSpan: 2 },
  deposit: { label: 'Deposit Amount', inputType: 'number' },
  status: {
    label: 'Status',
    required: true,
    type: 'select',
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
  longitude: { label: 'Longitude' },
  latitude: { label: 'Latitude' },
  submit: { label: '', colSpan: 2 },
}
</script>
