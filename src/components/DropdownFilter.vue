<template>
  <div>
    <label class="sr-only">{{ label }}</label>
    <div class="relative">
      <select
        class="appearance-none w-full border rounded px-3 py-2 dark:bg-gray-800 dark:text-white"
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
      >
        <option
          v-for="option in options"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <div class="absolute inset-y-0 left-2 flex items-center pointer-events-none">
        <CheckIcon class="w-4 h-4 text-green-600" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from 'lucide-vue-next'

defineProps({
  modelValue: String,
  label: String,
  options: Array
})
defineEmits(['update:modelValue'])
</script>

<style scoped>
select {
  min-width: 160px;
  padding-left: 2rem;
}
</style>
