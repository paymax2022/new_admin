<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    @click.self="close"
  >
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-sm p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Are you sure?</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div class="mb-6 text-sm text-gray-600">
        This action cannot be undone. This will permanently delete the group <b>"{{ group?.name }}"</b> and remove all associated data.
      </div>
      <div class="flex justify-end gap-2">
        <button type="button" @click="close" class="px-4 py-2 rounded border">Cancel</button>
        <button type="button" @click="confirmDelete" class="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
      </div>
    </div>
  </div>
  <DeleteGroupConfirmModal
    v-if="showDeleteModal"
    :group="groupToDelete"
    @close="showDeleteModal = false"
    @confirm="onGroupDeleteConfirmed"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DeleteGroupConfirmModal from '@/components/DeleteGroupConfirmModal.vue';

const props = defineProps<{ group: { name: string } | null }>();
const emit = defineEmits(['close', 'confirm']);

const showDeleteModal = ref(false);
const groupToDelete = ref(null);

function close() {
  emit('close');
}
function confirmDelete() {
  emit('confirm', props.group);
  close();
}

function openDeleteModal(group) {
  groupToDelete.value = { ...group };
  showDeleteModal.value = true;
}

function onGroupDeleteConfirmed(group) {
  // Remove the group from your groups array as needed
  // Example:
  // const idx = groups.findIndex(g => g.name === group.name);
  // if (idx !== -1) groups.splice(idx, 1);
}
</script>