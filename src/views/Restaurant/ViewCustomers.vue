<template>
  <div class="max-w-5xl mx-auto p-6 space-y-6">
    <!-- Profile Card -->
    <div class="bg-white rounded-2xl shadow p-6 flex items-center space-x-6">
      <img
        src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
        alt="Avatar"
        class="w-24 h-24 rounded-full object-cover"
      />
      <div>
        <h2 class="text-2xl font-bold text-gray-800">{{ fullName }}</h2>
        <p class="text-gray-500">{{ user.email }}</p>
        <p class="text-gray-500">{{ user.phone }}</p>
      </div>
    </div>

    <!-- Basic Info Section -->
    <div class="bg-white rounded-2xl shadow p-6">
      <h3 class="text-lg font-semibold text-gray-700 mb-4">Basic Information</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
        <div>
          <p class="text-sm font-semibold text-gray-600">First Name</p>
          <p class="text-gray-700">{{ user.firstName }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-600">Last Name</p>
          <p class="text-gray-700">{{ user.lastName }}</p>
        </div>

        <div>
          <p class="text-sm font-semibold text-gray-600">Email</p>
          <p class="text-gray-700">{{ user.email }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-600">Phone</p>
          <p class="text-gray-700">{{ user.phone }}</p>
        </div>

        <div>
          <p class="text-sm font-semibold text-gray-600">Address</p>
          <p class="text-gray-700">{{ user.address }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-600">Credit</p>
          <p class="text-gray-700">{{ user.credit }}</p>
        </div>

        <div>
          <p class="text-sm font-semibold text-gray-600">Username</p>
          <p class="text-gray-700">{{ user.username }}</p>
        </div>
        <div>
          <p class="text-sm font-semibold text-gray-600">Status</p>
          <span
            class="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
          >
            {{ user.status }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const user = {
  firstName: 'Jack J.',
  lastName: 'Smith',
  email: 'customer@example.com',
  phone: '115675675657',
  address: 'Dhaka, Bangladesh',
  username: 'customer',
  credit: '$0.00',
  status: 'Active',
}

const fullName = computed(() => `${user.firstName} ${user.lastName}`)
</script>
