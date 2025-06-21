<template>
  <div class="max-w-6xl mx-auto bg-white rounded-xl shadow p-8 mt-6">
    <h2 class="text-2xl font-bold text-gray-700 mb-6">Create Customers</h2>

    <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- First Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >First Name <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.firstName"
          type="text"
          class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <!-- Last Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Last Name <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.lastName"
          type="text"
          class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Email <span class="text-red-500">*</span></label
        >
        <input
          v-model="form.email"
          type="email"
          class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          v-model="form.phone"
          type="text"
          class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <!-- Username -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
        <input
          v-model="form.username"
          type="text"
          class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <!-- Image Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <input type="file" @change="handleImageUpload" class="block w-full text-sm" />
      </div>

      <!-- Address -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <input
          v-model="form.address"
          type="text"
          class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1"
          >Status <span class="text-red-500">*</span></label
        >
        <select
          v-model="form.status"
          class="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <!-- Avatar Preview -->
      <div class="md:col-span-1">
        <img
          :src="imagePreview || defaultAvatar"
          class="w-24 h-24 rounded-full object-cover mt-2"
          alt="Avatar"
        />
      </div>

      <!-- Submit Button -->
      <div class="md:col-span-3 flex items-start mt-4">
        <button
          type="submit"
          class="bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-md flex items-center gap-2"
        >
          <span>✔️</span> Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  firstName: 'Jack J.',
  lastName: 'Smith',
  email: 'customer@example.com',
  phone: '115675675657',
  username: 'customer',
  password: '',
  address: 'Dhaka, Bangladesh',
  status: 'Active',
  image: null,
})

const defaultAvatar =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png'
const imagePreview = ref(null)

function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

function submitForm() {
  console.log('Form submitted:', form.value)
  // You can replace this with actual API call logic
}
</script>
