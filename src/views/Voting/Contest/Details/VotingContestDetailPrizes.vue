<template>
    <div>
        <div>
            <h5 class="font-semibold text-lg dark:text-white-light mb-3">Prize Awards</h5>

            <div class="mt-6 table-responsive">
                <table class="table-hover">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Prize</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="data in prizes" :key="data.id">
                            <tr>
                                <td class="whitespace-nowrap">{{ data.position }}</td>
                                <td>{{ data.prize }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-3">Other Benefits</h5>

            <div class="mt-6 table-responsive">
                <table class="table-hover">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Type</th>
                            <th>Benefit Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="data in otherBenefits" :key="data.id">
                            <tr>
                                <td class="whitespace-nowrap">{{ data.position }}</td>
                                <td>{{ data.type }}</td>
                                <td>{{ data.benefit_name }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
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
const prizes = ref<any[]>([]);
const otherBenefits = ref<any[]>([]);
const isLoading = ref(false);

const fetchPrizes = async () => {
    if (!contestId) {
        console.error('Contest ID is undefined');
        return;
    }
    isLoading.value = true;
    try {
        const response = await votingService.getPrizes(contestId);
        if (response.ok && response.data) {
            prizes.value = Array.isArray(response.data) ? response.data : [];
        } else {
            toast.error(response.message || 'Error fetching prizes');
        }
    } catch (error: any) {
        console.error('Error fetching prizes:', error);
        toast.error(error.response?.data?.message || error.message || 'Error fetching prizes');
    } finally {
        isLoading.value = false;
    }
};

const fetchBenefits = async () => {
    if (!contestId) {
        return;
    }
    try {
        const response = await votingService.getBenefits(contestId);
        if (response.ok && response.data) {
            otherBenefits.value = Array.isArray(response.data) ? response.data : [];
        }
    } catch (error: any) {
        console.error('Error fetching benefits:', error);
    }
};

onMounted(() => {
    fetchPrizes();
    fetchBenefits();
});
</script>
