<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    @click.self="close"
  >
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Create New Group</h2>
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
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1">Visibility</label>
          <div class="flex flex-col gap-1">
            <label class="flex items-center gap-2">
              <input type="radio" value="Public" v-model="form.visibility" />
              <span>Public - Anyone can see this group</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="Private" v-model="form.visibility" />
              <span>Private - Only members can see this group</span>
            </label>
          </div>
        </div>
        <div class="mb-6">
          <label class="block text-sm font-medium mb-1">How can members join?</label>
          <div class="flex flex-col gap-1">
            <label class="flex items-center gap-2">
              <input type="radio" value="Open" v-model="form.joinType" />
              <span>Open - Anyone can join</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="Approval" v-model="form.joinType" />
              <span>Approval - Members must be approved</span>
            </label>
            <label class="flex items-center gap-2">
              <input type="radio" value="Invite Only" v-model="form.joinType" />
              <span>Invite Only - Members must be invited</span>
            </label>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="close" class="px-4 py-2 rounded border">Cancel</button>
          <button type="submit" class="px-4 py-2 rounded bg-black text-white">Create Group</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['close', 'created']);

const form = ref({
  name: '',
  description: '',
  visibility: 'Public',
  joinType: 'Open',
});

function close() {
  emit('close');
}

function submit() {
  emit('created', { ...form.value });
  close();
}
</script>