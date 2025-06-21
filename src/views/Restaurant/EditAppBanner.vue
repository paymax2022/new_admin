
<template>
  <div class="bg-white p-6 rounded shadow">
    <h3 class="text-lg font-semibold mb-4">Banners</h3>
    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-3 gap-4">

      <!-- Restaurant -->
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">RESTAURANT <span class="text-red-500">*</span></label>
        <select v-model="form.restaurant" class="border rounded px-3 py-2">
          <option disabled value="">Select restaurant</option>
          <option v-for="r in restaurants" :key="r">{{ r }}</option>
        </select>
      </div>

      <!-- Title -->
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">TITLE</label>
        <input v-model="form.title" type="text" class="border rounded px-3 py-2" />
      </div>

      <!-- URL -->
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">URL</label>
        <input v-model="form.url" type="text" class="border rounded px-3 py-2" />
      </div>

      <!-- Status -->
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">STATUS <span class="text-red-500">*</span></label>
        <select v-model="form.status" class="border rounded px-3 py-2">
          <option disabled value="">Select status</option>
          <option v-for="s in statuses" :key="s">{{ s }}</option>
        </select>
      </div>

      <!-- Description -->
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">DESCRIPTION</label>
        <input v-model="form.description" type="text" class="border rounded px-3 py-2" />
      </div>

      <!-- Image -->
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1">IMAGE <span class="text-red-500">*</span></label>
        <input @change="handleImageUpload" type="file" class="border rounded px-3 py-2" />
      </div>

      <!-- Submit button -->
      <div class="col-span-full mt-4">
        <button type="submit" class="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type BannerForm = {
  restaurant: string
  title: string
  url: string
  status: string
  description: string
  image: File | null
}

const form = ref<BannerForm>({
  restaurant: '',
  title: '',
  url: '',
  status: '',
  description: '',
  image: null,
})

const restaurants = ['Sultan’s Dine', 'Pizza Town', 'Grill House']
const statuses = ['Active', 'Inactive']

function handleImageUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  form.value.image = file ?? null
}

function submitForm() {
  console.log('Submitted form:', form.value)
  // Submit logic here
}
</script>

