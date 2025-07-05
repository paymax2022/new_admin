<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    @click.self="close"
  >
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <div>
          <h2 class="text-lg font-semibold">Edit Group</h2>
          <div class="text-sm text-gray-500">Make changes to the group details below.</div>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <form @submit.prevent="submit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Group Name</label>
          <input v-model="form.name" type="text" class="w-full border rounded px-3 py-2" placeholder="Enter group name" required />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Description</label>
          <textarea v-model="form.description" class="w-full border rounded px-3 py-2" rows="3" placeholder="Describe what this group is about"></textarea>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">Visibility</label>
          <div class="flex flex-col gap-1">
            <label class="flex items-center gap-2">
              <input type="radio" value="Public" v-model="form.visibility" />
              <span>Public</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="Private" v-model="form.visibility" />
              <span>Private</span>
            </label>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="close" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white">Save changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, toRefs } from 'vue';

const props = defineProps<{
  group: {
    name: string;
    description?: string;
    visibility: string;
  } | null;
}>();
const emit = defineEmits(['close', 'updated']);

const form = ref({
  name: props.group?.name || '',
  description: props.group?.description || '',
  visibility: props.group?.visibility || 'Public',
});

// Update form if group prop changes
watch(() => props.group, (newGroup) => {
  form.value = {
    name: newGroup?.name || '',
    description: newGroup?.description || '',
    visibility: newGroup?.visibility || 'Public',
  };
}, { deep: true });

function close() {
  emit('close');
}

function submit() {
  emit('updated', { ...form.value });
  close();
}
</script>