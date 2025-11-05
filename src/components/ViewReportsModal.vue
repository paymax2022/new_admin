<template>
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4" 
    @click.self="close"
  >
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
      <div class="sticky top-0 bg-white dark:bg-gray-900 border-b dark:border-gray-700 px-6 py-4 flex justify-between items-center">
        <div>
          <h2 class="text-xl font-semibold">Group Reports & Analytics</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">Detailed statistics and insights</p>
        </div>
        <button @click="close" class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
      </div>

      <div class="p-6 space-y-6">
        <!-- Group Selection -->
        <div>
          <label class="block text-sm font-medium mb-1">
            Select Group <span class="text-red-500">*</span>
          </label>
          <select 
            v-model="selectedGroupId" 
            @change="loadGroupStats"
            class="w-full border dark:border-gray-600 rounded px-3 py-2 dark:bg-gray-800"
          >
            <option value="" disabled>Choose a group to view reports...</option>
            <option 
              v-for="group in groups" 
              :key="group.id" 
              :value="group.id"
            >
              {{ group.name }}
            </option>
          </select>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="py-12 text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading statistics...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 p-4">
          <p class="font-semibold">Error loading statistics</p>
          <p class="text-sm mt-1">{{ error }}</p>
          <button @click="loadGroupStats" class="mt-3 text-sm underline">Retry</button>
        </div>

        <!-- Statistics Display -->
        <div v-else-if="stats && selectedGroupId" class="space-y-6">
          <!-- Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Total Members -->
            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Total Members</p>
                  <p class="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {{ stats.total_members?.toLocaleString() || 0 }}
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-blue-500 opacity-50">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              </div>
            </div>

            <!-- Active Members -->
            <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Active Members</p>
                  <p class="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                    {{ stats.active_members?.toLocaleString() || 0 }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ activePercentage }}% of total
                  </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-green-500 opacity-50">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <!-- New Members This Month -->
            <div class="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">New This Month</p>
                  <p class="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                    {{ stats.new_members_this_month?.toLocaleString() || 0 }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">New members</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-purple-500 opacity-50">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Financial & Engagement Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Monthly Revenue -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-5 border dark:border-gray-700 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-900 dark:text-gray-100">Monthly Revenue</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                ₦{{ (stats.monthly_revenue || 0).toLocaleString() }}
              </p>
              <p class="text-sm text-gray-500 mt-2">Total monthly revenue from membership fees</p>
            </div>

            <!-- Engagement Rate -->
            <div class="bg-white dark:bg-gray-800 rounded-lg p-5 border dark:border-gray-700 shadow-sm">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-semibold text-gray-900 dark:text-gray-100">Engagement Rate</h3>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-indigo-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <p class="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {{ (stats.engagement_rate || 0).toFixed(1) }}%
              </p>
              <p class="text-sm text-gray-500 mt-2">Member activity and participation rate</p>
              
              <!-- Engagement Progress Bar -->
              <div class="mt-3">
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    class="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    :style="{ width: `${Math.min(stats.engagement_rate || 0, 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Issues -->
          <div class="bg-white dark:bg-gray-800 rounded-lg p-5 border dark:border-gray-700 shadow-sm">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">Payment Issues</h3>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <div class="flex items-center gap-4">
              <div>
                <p class="text-4xl font-bold text-red-600 dark:text-red-400">
                  {{ stats.overdue_payments || 0 }}
                </p>
                <p class="text-sm text-gray-500 mt-1">Overdue payments</p>
              </div>
              <div v-if="stats.overdue_payments > 0" class="flex-1 bg-red-50 dark:bg-red-900/20 rounded p-3 text-sm">
                <p class="text-red-700 dark:text-red-400">
                  ⚠️ <strong>{{ stats.overdue_payments }}</strong> member(s) have overdue payments. Consider sending a payment reminder.
                </p>
              </div>
              <div v-else class="flex-1 bg-green-50 dark:bg-green-900/20 rounded p-3 text-sm">
                <p class="text-green-700 dark:text-green-400">
                  ✅ All payments are up to date! Great job managing finances.
                </p>
              </div>
            </div>
          </div>

          <!-- Quick Insights -->
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-5 border border-blue-200 dark:border-blue-800">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              Quick Insights
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-lg">📈</span>
                <p class="text-gray-700 dark:text-gray-300">
                  <strong>Growth:</strong> {{ stats.new_members_this_month || 0 }} new members this month
                  {{ growthTrend }}
                </p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-lg">💰</span>
                <p class="text-gray-700 dark:text-gray-300">
                  <strong>Revenue/Member:</strong> ₦{{ revenuePerMember.toLocaleString() }} average
                </p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-lg">👥</span>
                <p class="text-gray-700 dark:text-gray-300">
                  <strong>Activity:</strong> {{ stats.active_members || 0 }} of {{ stats.total_members || 0 }} members are active
                </p>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-lg">{{ stats.overdue_payments > 0 ? '⚠️' : '✅' }}</span>
                <p class="text-gray-700 dark:text-gray-300">
                  <strong>Payments:</strong> {{ paymentStatus }}
                </p>
              </div>
            </div>
          </div>

          <!-- Export/Actions -->
          <div class="flex justify-between items-center pt-4 border-t dark:border-gray-700">
            <p class="text-xs text-gray-500">
              Last updated: {{ new Date().toLocaleString() }}
            </p>
            <button 
              @click="loadGroupStats"
              class="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Refresh Data
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!selectedGroupId" class="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto text-gray-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <p class="mt-4 text-gray-600 dark:text-gray-400">Select a group to view detailed reports and analytics</p>
        </div>
      </div>

      <!-- Close Button -->
      <div class="sticky bottom-0 bg-white dark:bg-gray-900 border-t dark:border-gray-700 px-6 py-4">
        <button 
          @click="close" 
          class="w-full px-6 py-2 rounded border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Close
        </button>
      </div>
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
const emit = defineEmits(['close']);
const toast = useToast();

const loading = ref(false);
const error = ref('');
const selectedGroupId = ref('');
const stats = ref<any>(null);

const activePercentage = computed(() => {
  if (!stats.value || !stats.value.total_members) return 0;
  return Math.round((stats.value.active_members / stats.value.total_members) * 100);
});

const revenuePerMember = computed(() => {
  if (!stats.value || !stats.value.total_members) return 0;
  return Math.round(stats.value.monthly_revenue / stats.value.total_members);
});

const growthTrend = computed(() => {
  const newMembers = stats.value?.new_members_this_month || 0;
  if (newMembers === 0) return '📊';
  if (newMembers > 5) return '🚀 (Strong growth!)';
  if (newMembers > 0) return '📈 (Growing)';
  return '';
});

const paymentStatus = computed(() => {
  const overdue = stats.value?.overdue_payments || 0;
  if (overdue === 0) return 'All payments up to date';
  if (overdue === 1) return '1 payment overdue';
  return `${overdue} payments overdue`;
});

async function loadGroupStats() {
  if (!selectedGroupId.value) return;

  try {
    loading.value = true;
    error.value = '';
    stats.value = null;

    console.log('Loading stats for group:', selectedGroupId.value);

    const response = await groupService.getGroupStats(selectedGroupId.value);

    console.log('Group stats loaded:', response);

    stats.value = response.data;
    toast.success('Statistics loaded successfully');
  } catch (err: any) {
    console.error('Error loading group stats:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to load statistics. Please try again.';
    toast.error('Failed to load statistics');
  } finally {
    loading.value = false;
  }
}

function close() {
  emit('close');
}
</script>









