<template>
    <div>
        <!-- Contest Info Section -->
        <div class="flex justify-between">
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Current Round: <span class="badge bg-warning-dark-light text-warning">Ended</span></span>
                <span class="text-sm">Last Round</span>
            </div>
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Total Contestants:</span>
                <span class="text-sm">{{ contacts.length }}</span>
            </div>
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Total Votes:</span>
                <span class="text-sm">10530</span>
            </div>
        </div>

        <!-- Contestants Section -->
        <div class="mt-6">
            <div class="mb-2 w-full">
                <span class="font-bold text-gray-300">Contestants:</span>
            </div>
            <div class="space-y-2">
                <RouterLink
                    :to="{ name: 'votingContestDetailContestant', params: { contestId: $route.params.contestId, contestantId: contact._id } }"
                    v-for="(contact, index) in contacts"
                    :key="contact._id"
                    class="p-2 flex justify-between items-center shadow-md rounded-md hover:bg-gray-50"
                >
                    <div class="space-x-4 flex items-center">
                        <span class="font-bold text-gray-400">{{ index + 1 }}</span>
                        <div class="w-10 h-10 rounded overflow-hidden">
                            <img class="w-full h-full object-cover" :src="contact.image" :alt="contact.name" />
                        </div>
                        <span class="font-bold">{{ contact.name }}</span>
                    </div>
                </RouterLink>
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
    const contacts = ref<Array<{ _id: string; name: string; image: string }>>([]);
    const contest = ref<any>(null);
    const isLoading = ref(false);

    const fetchContest = async () => {
        if (!contestId) {
            console.error('Contest ID is undefined');
            return;
        }
        isLoading.value = true;
        try {
            const response = await votingService.getContestById(contestId);
            if (response.ok && response.data) {
                contest.value = response.data;
            } else {
                toast.error(response.message || 'Error fetching contest');
            }
        } catch (error: any) {
            console.error('Error fetching contest:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching contest');
        } finally {
            isLoading.value = false;
        }
    };

    const fetchContacts = async () => {
        try {
            if (!contestId) {
                console.error('Contest ID is undefined');
                return;
            }

            const response = await votingService.getContestants(contestId);
            if (response.ok && response.data) {
                const contestants = Array.isArray(response.data) ? response.data : [];
                contacts.value = contestants.map((c: any) => ({
                    _id: c.id || c._id,
                    name: c.nick_name || c.name || 'Unknown',
                    image: c.image || ''
                }));
            }
        } catch (error: any) {
            console.error('Error fetching contacts:', error);
            toast.error(error.response?.data?.message || error.message || 'Error fetching contestants');
        }
    };

    onMounted(() => {
        fetchContest();
        fetchContacts();
    });
</script>
