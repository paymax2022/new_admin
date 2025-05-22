<template>
  <div>
    <label class="sr-only">{{ label }}</label>
    <select
      class="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  options: Array
})
defineEmits(['update:modelValue'])
</script>
