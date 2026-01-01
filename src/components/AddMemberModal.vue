<template>
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4" 
    @click.self="close"
  >
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center">
        <h2 class="text-xl font-semibold">Add Member to Group</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Sending invitation...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400">
        <p class="font-semibold">Error inviting member</p>
        <p class="text-sm mt-1">{{ error }}</p>
        <button @click="error = ''" class="mt-3 text-sm underline">Try again</button>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="submit" class="p-6 space-y-6">
        <!-- Group Selection -->
        <div>
          <label class="block text-sm font-medium mb-1">
            Select Group <span class="text-red-500">*</span>
          </label>
          <select 
            v-model="form.groupId" 
            class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800"
            required
          >
            <option value="" disabled>Choose a group...</option>
            <option 
              v-for="group in groups" 
              :key="group.id" 
              :value="group.id"
            >
              {{ group.name }} ({{ group.total_members }} members)
            </option>
          </select>
          <p class="text-xs text-gray-500 mt-1">Select which group to add the member to</p>
        </div>

        <!-- Member Information -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 border-b pb-2">
            Member Information
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">
                First Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.first_name" 
                type="text" 
                class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" 
                placeholder="John" 
                required 
              />
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">
                Last Name <span class="text-red-500">*</span>
              </label>
              <input 
                v-model="form.last_name" 
                type="text" 
                class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" 
                placeholder="Doe" 
                required 
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input 
              v-model="form.email" 
              type="email" 
              class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" 
              placeholder="john.doe@example.com" 
              required 
            />
            <p class="text-xs text-gray-500 mt-1">An invitation will be sent to this email</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Role <span class="text-red-500">*</span>
            </label>
            <select 
              v-model="form.role" 
              class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800"
              required
            >
              <option value="" disabled>Select a role...</option>
              <option value="member">Member - Regular group member</option>
              <option value="moderator">Moderator - Can manage posts and members</option>
              <option value="admin">Admin - Full group management access</option>
              <option value="treasurer">Treasurer - Manages finances</option>
              <option value="secretary">Secretary - Handles communications</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">
              Custom Invitation Message (Optional)
            </label>
            <textarea 
              v-model="form.custom_message" 
              class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" 
              rows="4"
              placeholder="Write a personalized message to include in the invitation email..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              Example: "We're excited to have you join our community! Looking forward to your participation."
            </p>
          </div>
        </div>

        <!-- Preview -->
        <div v-if="form.groupId && form.email" class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            📧 Invitation Preview
          </h4>
          <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p><strong>To:</strong> {{ form.first_name }} {{ form.last_name }} ({{ form.email }})</p>
            <p><strong>Group:</strong> {{ selectedGroupName }}</p>
            <p><strong>Role:</strong> {{ form.role || 'Not selected' }}</p>
            <p v-if="form.custom_message" class="mt-2 pt-2 border-t border-blue-200 dark:border-blue-800">
              <strong>Message:</strong><br>
              <span class="italic">"{{ form.custom_message }}"</span>
            </p>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
          <button 
            type="button" 
            @click="close" 
            class="px-6 py-2 rounded border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="loading || !form.groupId"
            class="px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Send Invitation
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { groupService, type Group } from '@/services/groupService';
import { useToast } from 'vue-toastification';

interface Props {
  groups: Group[];
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'invited']);
const toast = useToast();

const loading = ref(false);
const error = ref('');

const form = ref({
  groupId: '',
  email: '',
  first_name: '',
  last_name: '',
  role: 'member',
  custom_message: ''
});

const selectedGroupName = computed(() => {
  const group = props.groups.find(g => g.id === form.value.groupId);
  return group ? group.name : '';
});

function close() {
  emit('close');
}

async function submit() {
  if (!form.value.groupId) {
    error.value = 'Please select a group';
    return;
  }

  try {
    loading.value = true;
    error.value = '';

    console.log('Inviting member to group:', form.value.groupId, form.value);

    const response = await groupService.inviteMember(form.value.groupId, {
      email: form.value.email,
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      role: form.value.role,
      custom_message: form.value.custom_message || undefined
    });

    console.log('Member invited successfully:', response);

    toast.success(`Invitation sent to ${form.value.first_name} ${form.value.last_name}!`);
    
    emit('invited', {
      groupId: form.value.groupId,
      groupName: selectedGroupName.value,
      memberData: response.data
    });
    
    close();
  } catch (err: any) {
    console.error('Error inviting member:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to send invitation. Please try again.';
    toast.error('Failed to send invitation');
  } finally {
    loading.value = false;
  }
}
</script>
