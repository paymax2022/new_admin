<template>
    <div class="">
        <div class="flex flex-col space-y-0 w-full">
            <span class="font-bold text-gray-300">Current Round: <span
                    class="badge bg-warning-dark-light text-warning">Ended</span></span>
            <span class="text-sm">Round 3</span>
        </div>

        <div class="mt-6 table-responsive">
            <table class="table-hover">
                <thead>
                    <tr>
                        <th>Round Name</th>
                        <th>Minimum Votes</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="data in rounds" :key="data.id">
                        <tr>
                            <td class="whitespace-nowrap">{{ data.name }}</td>
                            <td>{{ data.min_votes }}</td>
                            <td>
                                <div class="text-sm space-x-2">
                                    <span>{{ data.start_date }}</span>
                                    <span>-</span>
                                    <span>{{ data.end_date }}</span>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
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
const rounds = ref<any[]>([]);
const isLoading = ref(false);

const fetchRounds = async () => {
    if (!contestId) {
        console.error('Contest ID is undefined');
        return;
    }
    isLoading.value = true;
    try {
        const response = await votingService.getContestRounds(contestId);
        if (response.ok && response.data) {
            rounds.value = Array.isArray(response.data) ? response.data : [];
        } else {
            toast.error(response.message || 'Error fetching rounds');
        }
    } catch (error: any) {
        console.error('Error fetching rounds:', error);
        toast.error(error.response?.data?.message || error.message || 'Error fetching rounds');
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchRounds();
});
</script>
