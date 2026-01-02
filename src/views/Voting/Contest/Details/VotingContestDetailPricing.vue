<template>
    <div>
        <div class="flex justify-between">
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Free Vote: </span>
                <span><span class="badge bg-warning-dark-light text-warning">Enabled</span></span>
            </div>
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Free Vote Delay:</span>
                <span class="text-sm">30 mins</span>
            </div>
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Total Vote Pricing:</span>
                <span class="text-sm">3</span>
            </div>
        </div>

        <div class="mt-6">
            <div class="mb-2 w-full">
                <span class="font-bold text-gray-300">Vote Pricing:</span>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div class="p-3 max-w-56 rounded-md border hover:border-primary">
                    <div class="text-lg font-bold">Free</div>
                    <div class="text-sm">1 Vote</div>
                    <div class="mt-8 text-lg font-bold">NGN: 0</div>
                </div>
                <div v-for="data in votePrices" :key="data.id"
                    class="p-3 max-w-56 rounded-md border hover:border-primary">
                    <div class="text-lg font-bold">{{ data.name }}</div>
                    <div class="text-sm">{{ data.votes }} Vote</div>
                    <div class="mt-8 text-lg font-bold">NGN: {{ data.price }}</div>
                </div>
            </div>
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
const contestId = route.params.contestId as string;
const votePrices = ref<any[]>([]);
const voteRule = ref<any>(null);
const isLoading = ref(false);

const fetchVotePrices = async () => {
    if (!contestId) {
        console.error('Contest ID is undefined');
        return;
    }
    isLoading.value = true;
    try {
        const response = await votingService.getVotePrices(contestId);
        if (response.ok && response.data) {
            votePrices.value = Array.isArray(response.data) ? response.data : [];
        } else {
            toast.error(response.message || 'Error fetching vote prices');
        }
    } catch (error: any) {
        console.error('Error fetching vote prices:', error);
        toast.error(error.response?.data?.message || error.message || 'Error fetching vote prices');
    } finally {
        isLoading.value = false;
    }
};

const fetchVoteRule = async () => {
    if (!contestId) {
        return;
    }
    try {
        const response = await votingService.getVoteRule(contestId);
        if (response.ok && response.data) {
            voteRule.value = response.data;
        }
    } catch (error: any) {
        console.error('Error fetching vote rule:', error);
    }
};

onMounted(() => {
    fetchVotePrices();
    fetchVoteRule();
});
</script>
