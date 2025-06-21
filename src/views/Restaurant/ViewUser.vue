<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <!-- Header Section -->
    <div class="header mb-6">
      <h1 class="text-2xl font-bold text-gray-800">{{ user.name }}</h1>
      <p class="text-gray-600">{{ user.email }}</p>
      <p class="text-gray-600">{{ user.phone }}</p>
    </div>

    <div class="divider h-px bg-gray-200 my-4"></div>

    <!-- Basic Information Section -->
    <div class="basic-info">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="info-item">
          <span class="text-gray-500 font-medium">Name</span>
          <span class="text-gray-800">{{ user.name }}</span>
        </div>

        <div class="info-item">
          <span class="text-gray-500 font-medium">Email</span>
          <span class="text-gray-800">{{ user.email }}</span>
        </div>

        <div class="info-item">
          <span class="text-gray-500 font-medium">Phone</span>
          <span class="text-gray-800">{{ user.phone }}</span>
        </div>

        <div class="info-item">
          <span class="text-gray-500 font-medium">Address</span>
          <span class="text-gray-800">{{ user.address }}</span>
        </div>

        <div class="info-item">
          <span class="text-gray-500 font-medium">Username</span>
          <span class="text-gray-800">{{ user.username }}</span>
        </div>

        <div class="info-item">
          <span class="text-gray-500 font-medium">Role</span>
          <span class="text-gray-800">{{ user.role }}</span>
        </div>

        <div class="info-item">
          <span class="text-gray-500 font-medium">Status</span>
          <span class="text-gray-800">{{ user.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const user = {
  name: "John Doe",
  email: "admin@example.com",
  phone: "115005550006",
  address: "Dhaka, Bangladesh",
  username: "admin",
  role: "Admin",
  status: "Active"
};
</script>

<style scoped>
.info-item {
  @apply flex flex-col space-y-1 p-3 bg-gray-50 rounded-lg;
}

.divider {
  @apply w-full;
}
</style>
