<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Voting Results</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">View and manage voting results and announcements</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <p class="text-gray-600 dark:text-gray-400">Voting results content will be implemented here.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import votingService from '@/services/votingService';
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute();
const loading = ref(false);
const winners = ref<any[]>([]);
const contestId = ref<string>('');

// Fetch all winners
const fetchWinners = async () => {
  loading.value = true;
  try {
    const response = await votingService.getWinners();
    if (response.ok && response.data) {
      winners.value = Array.isArray(response.data) ? response.data : [];
    } else {
      toast.error(response.message || 'Error fetching winners');
    }
  } catch (error: any) {
    console.error('Error fetching winners:', error);
    toast.error(error.response?.data?.message || error.message || 'Error fetching winners');
  } finally {
    loading.value = false;
  }
};

// Fetch winner for specific contest
const fetchWinner = async (id: string) => {
  if (!id) return;
  try {
    const response = await votingService.getWinner(id);
    if (response.ok && response.data) {
      return response.data;
    } else {
      toast.error(response.message || 'Error fetching winner');
    }
  } catch (error: any) {
    console.error('Error fetching winner:', error);
    toast.error(error.response?.data?.message || error.message || 'Error fetching winner');
  }
};

onMounted(() => {
  fetchWinners();
  if (route.params.contestId) {
    contestId.value = route.params.contestId as string;
    fetchWinner(contestId.value);
  }
});
</script>

