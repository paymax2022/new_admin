<template>
  <div class="bg-white rounded-lg shadow p-4 text-center flex flex-col items-center">
    <div v-if="icon" class="text-3xl text-black-500 mb-2">
      <component :is="icon" />
    </div>
    <div class="text-gray-500 mb-1">{{ title }}</div>
    <div class="text-2xl font-bold text-gray-800">{{ count }}</div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  count: [String, Number],
  icon: Object
})
</script>
