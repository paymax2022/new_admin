<template>
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4" 
    @click.self="close"
  >
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold">Send Message to Group</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Send an announcement to all group members</p>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Sending message...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400">
        <p class="font-semibold">Error sending message</p>
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
          <p class="text-xs text-gray-500 mt-1">Select which group to send the message to</p>
        </div>

        <!-- Message Type Selection -->
        <div>
          <label class="block text-sm font-medium mb-2">Message Type</label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                :value="false" 
                v-model="form.is_urgent" 
                class="text-blue-600"
              />
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Regular Announcement
              </span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                :value="true" 
                v-model="form.is_urgent" 
                class="text-red-600"
              />
              <span class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Urgent Message
              </span>
            </label>
          </div>
        </div>

        <!-- Title -->
        <div>
          <label class="block text-sm font-medium mb-1">
            Subject/Title <span class="text-red-500">*</span>
          </label>
          <input 
            v-model="form.title" 
            type="text" 
            class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" 
            placeholder="e.g., Monthly Meeting Reminder, Important Update, etc." 
            required 
          />
          <p class="text-xs text-gray-500 mt-1">Keep it clear and concise</p>
        </div>

        <!-- Content -->
        <div>
          <label class="block text-sm font-medium mb-1">
            Message Content <span class="text-red-500">*</span>
          </label>
          <textarea 
            v-model="form.content" 
            class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800" 
            rows="8"
            placeholder="Write your message here...

Example:
Dear members,

This is to remind you about our monthly meeting scheduled for Friday, October 13th at 3:00 PM. Please make sure to attend as we'll be discussing important matters.

See you there!
Best regards"
            required
          ></textarea>
          <div class="flex justify-between mt-1">
            <p class="text-xs text-gray-500">Markdown supported</p>
            <p class="text-xs text-gray-500">{{ form.content.length }} characters</p>
          </div>
        </div>

        <!-- Notification Options -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
          <h4 class="font-medium text-sm">Notification Options</h4>
          
          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="form.send_notifications" 
              class="mt-1 rounded"
            />
            <div>
              <span class="font-medium text-sm">Send Push Notifications</span>
              <p class="text-xs text-gray-500 mt-1">
                Members will receive an instant notification on their devices
              </p>
            </div>
          </label>

          <label class="flex items-start gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              v-model="form.send_email" 
              class="mt-1 rounded"
            />
            <div>
              <span class="font-medium text-sm">Send Email Copy</span>
              <p class="text-xs text-gray-500 mt-1">
                Members will receive a copy via email
              </p>
            </div>
          </label>
        </div>

        <!-- Preview -->
        <div v-if="form.groupId && form.title && form.content" class="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-blue-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h4 class="font-semibold text-sm text-blue-900 dark:text-blue-300">Preview</h4>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded border dark:border-gray-700 p-4">
            <!-- Message Badge -->
            <div class="flex items-center gap-2 mb-2">
              <span v-if="form.is_urgent" class="px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded">
                🚨 URGENT
              </span>
              <span class="text-xs text-gray-500">
                To: {{ selectedGroupName }} ({{ selectedGroupMemberCount }} members)
              </span>
            </div>
            
            <!-- Title -->
            <h3 class="text-lg font-bold mb-2">{{ form.title }}</h3>
            
            <!-- Content -->
            <div class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{{ form.content }}</div>
            
            <!-- Notification Badges -->
            <div class="flex gap-2 mt-3 pt-3 border-t dark:border-gray-700">
              <span v-if="form.send_notifications" class="text-xs px-2 py-1 bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded">
                📱 Push Notification
              </span>
              <span v-if="form.send_email" class="text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400 rounded">
                📧 Email
              </span>
            </div>
          </div>
        </div>

        <!-- Warning for Urgent Messages -->
        <div v-if="form.is_urgent" class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
          <div class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <div class="text-sm">
              <p class="font-semibold text-yellow-800 dark:text-yellow-400">Urgent Message Warning</p>
              <p class="text-yellow-700 dark:text-yellow-300 mt-1">
                This message will be marked as urgent and will appear prominently for all members. Use this only for time-sensitive or critical information.
              </p>
            </div>
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
            :class="[
              'px-6 py-2 rounded text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed',
              form.is_urgent ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            {{ form.is_urgent ? 'Send Urgent Message' : 'Send Message' }}
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
const emit = defineEmits(['close', 'sent']);
const toast = useToast();

const loading = ref(false);
const error = ref('');

const form = ref({
  groupId: '',
  title: '',
  content: '',
  is_urgent: false,
  send_notifications: true,
  send_email: false
});

const selectedGroupName = computed(() => {
  const group = props.groups.find(g => g.id === form.value.groupId);
  return group ? group.name : '';
});

const selectedGroupMemberCount = computed(() => {
  const group = props.groups.find(g => g.id === form.value.groupId);
  return group ? group.total_members : 0;
});

function close() {
  emit('close');
}

async function submit() {
  if (!form.value.groupId) {
    error.value = 'Please select a group';
    return;
  }

  if (!form.value.title.trim() || !form.value.content.trim()) {
    error.value = 'Please fill in all required fields';
    return;
  }

  try {
    loading.value = true;
    error.value = '';

    console.log('Sending announcement to group:', form.value.groupId, form.value);

    const response = await groupService.sendAnnouncement(form.value.groupId, {
      title: form.value.title,
      content: form.value.content,
      is_urgent: form.value.is_urgent,
      send_notifications: form.value.send_notifications
    });

    console.log('Announcement sent successfully:', response);

    const messageType = form.value.is_urgent ? 'urgent message' : 'message';
    toast.success(`${messageType.charAt(0).toUpperCase() + messageType.slice(1)} sent to ${selectedGroupName.value}!`);
    
    emit('sent', {
      groupId: form.value.groupId,
      groupName: selectedGroupName.value,
      announcementData: response.data,
      memberCount: selectedGroupMemberCount.value
    });
    
    close();
  } catch (err: any) {
    console.error('Error sending announcement:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to send message. Please try again.';
    toast.error('Failed to send message');
  } finally {
    loading.value = false;
  }
}
</script>
