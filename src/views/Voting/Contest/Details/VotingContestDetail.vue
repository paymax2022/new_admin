<template>
    <div>
        <div class="flex justify-between">
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Current Round: <span
                        class="badge bg-warning-dark-light text-warning">Ended</span></span>
                <span class="text-sm">Last Round</span>
            </div>
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Total Contestants:</span>
                <span class="text-sm">20</span>
            </div>
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Total Votes:</span>
                <span class="text-sm">10530</span>
            </div>
        </div>

        <div class="mt-6">
            <div class="mb-2 w-full">
                <span class="font-bold text-gray-300">Contestants:</span>
            </div>
            <div class="space-y-2">
                <RouterLink
                    :to="{ name: 'votingContestDetailContestant', params: { contestId: $route.params.contestId, contestantId: i } }"
                    v-for="i in 20" :key="i"
                    class="p-2 flex justify-between items-center shadow-md rounded-md hover:bg-gray-50">
                    <div class="space-x-4 flex items-center">
                        <span class="font-bold text-gray-400">{{ i }}</span>
                        <div class="w-10 h-10 rounded overflow-hidden">
                            <img class="w-full h-full object-cover" src="/assets/images/user-profile.jpeg"
                                alt="Adam Ife" />
                        </div>
                        <span class="font-bold">Adam Ife</span>
                    </div>
                    <div class="">{{ 640 - (i * 10) }} votes</div>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
