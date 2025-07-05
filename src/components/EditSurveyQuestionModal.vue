<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Edit Question</h2>
        </div>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="onUpdate">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Question Text</label>
          <input v-model="form.text" type="text" class="w-full border rounded px-3 py-2" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Question Type</label>
          <select v-model="form.type" class="w-full border rounded px-3 py-2" required>
            <option value="" disabled>Select question type</option>
            <option>Multiple Choice</option>
            <option>Rating Scale</option>
            <option>Short Answer</option>
          </select>
        </div>
        <div class="mb-4" v-if="form.type === 'Multiple Choice'">
          <label class="block text-sm font-medium mb-1">Options</label>
          <div v-for="(option, idx) in form.options" :key="idx" class="mb-2 flex gap-2">
            <input v-model="form.options[idx]" type="text" class="w-full border rounded px-3 py-2" :placeholder="`Option ${idx+1}`" required />
            <button v-if="form.options.length > 2" type="button" class="text-red-500" @click="removeOption(idx)" tabindex="-1">&times;</button>
          </div>
          <button type="button" class="text-sm text-gray-600 flex items-center gap-1 mt-1" @click="addOption"><span class="text-lg">+</span> Add option</button>
        </div>
        <div class="mb-6 flex items-center gap-2">
          <input id="required" type="checkbox" v-model="form.required" class="rounded border-gray-300" />
          <label for="required" class="text-sm">Required question</label>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white">Save Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ question: any }>();
const emit = defineEmits(['close', 'update']);
const form = ref({ ...props.question });
watch(() => props.question, (val) => { form.value = { ...val }; });
function addOption() {
  form.value.options = form.value.options || ['',''];
  form.value.options.push('');
}
function removeOption(idx: number) {
  form.value.options.splice(idx, 1);
}
function onUpdate() {
  emit('update', { ...form.value });
}
</script> 