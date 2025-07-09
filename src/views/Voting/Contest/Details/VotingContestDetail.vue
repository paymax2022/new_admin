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
                    v-for="contact in contacts"
                    :key="contact._id"
                    class="p-2 flex justify-between items-center shadow-md rounded-md hover:bg-gray-50"
                >
                    <div class="space-x-4 flex items-center">
                        <span class="font-bold text-gray-400">{{ i }}</span>
                        <div class="w-10 h-10 rounded overflow-hidden">
                            <img class="w-full h-full object-cover" src="/assets/images/user-profile.jpeg" alt="Adam Ife" />
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

    const route = useRoute();
    const contestId = route.params.contestId;
    const contacts = ref([]);

    const fetchContacts = async () => {
        try {
            // Ensure contestId is defined
            if (!contestId) {
                console.error('Contest ID is undefined');
                return;
            }

            const response = await fetch(`/api/contact/${contestId}`);
            const data = await response.json();
            console.log('Fetched contacts:', data); // Debugging

            if (response.ok) {
                // Ensure data is an array; handle cases where it might be nested
                if (Array.isArray(data)) {
                    contacts.value = data;
                } else if (data.contacts && Array.isArray(data.contacts)) {
                    contacts.value = data.contacts;
                } else {
                    console.error('Response data is not an array:', data);
                    contacts.value = [];
                }
            } else {
                console.error('Error fetching contacts:', data.message || 'Unknown error');
                contacts.value = [];
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            contacts.value = [];
        }
    };

    onMounted(() => {
        fetchContacts();
    });
</script>
