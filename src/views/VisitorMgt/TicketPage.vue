<template>
    <div class="">
        <!-- <div class="flex justify-center gap-4 mb-4">
            <button class="px-4 py-2 rounded-lg text-white" :class="currentTab === 'all' ? 'bg-blue-500' : 'bg-gray-300'" @click="currentTab = 'all'">
                All
            </button>
            <button class="px-4 py-2 rounded-lg text-white" :class="currentTab === 'open' ? 'bg-blue-500' : 'bg-gray-300'" @click="currentTab = 'open'">
                Open
            </button>
            <button class="px-4 py-2 rounded-lg text-white" :class="currentTab === 'closed' ? 'bg-blue-500' : 'bg-gray-300'" @click="currentTab = 'closed'">
                Closed
            </button>
        </div> -->

        <!-- Cards -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(ticket, index) in filteredTickets" :key="index" class="border border-gray-300 rounded-lg p-4 shadow-sm">
                <p class="font-semibold text-lg">{{ ticket.title }}</p>
                <p class="text-sm text-gray-500 mb-2">{{ ticket.id }} - {{ ticket.time }}</p>
                <p
                    class="text-xs font-bold py-1 px-2 rounded"
                    :class="{
                        'bg-red-200 text-red-600': ticket.status === 'Open',
                        'bg-green-200 text-green-600': ticket.status === 'Closed',
                    }"
                >
                    {{ ticket.status }}
                </p>
                <p class="text-sm mt-2">{{ ticket.description }}</p>
                <div class="flex justify-between mt-4">
                    <button class="bg-blue-500 text-white px-4 py-1 rounded">Pick Up</button>
                    <button class="bg-gray-500 text-white px-4 py-1 rounded">Assign</button>
                </div>
            </div>
        </div> -->
    </div>
    <div>
        <div>
            <p>Others-Others</p>
            <p>LG2RA-121615</p>
        </div>
        <div>
            <div>
                <p>Request</p>
            </div>
            <div>
                <p>Closed</p>
                <p>-</p>
                <p>6 months ago</p>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script lang="ts" setup>
    import { ref, computed } from 'vue';

    // Array of tickets
    // const tickets = ref([
    //     {
    //         id: 'LG2RA-934886',
    //         title: 'Others - Others',
    //         time: '5 months ago',
    //         status: 'Closed',
    //         description: 'Is Etag now available?',
    //     },
    //     {
    //         id: 'LG2RA-803412',
    //         title: 'Billing Request',
    //         time: '6 months ago',
    //         status: 'Open',
    //         description: 'Please I need an assistant on my account, my receipt displays KGN on it instead of my name...',
    //     },
    //     {
    //         id: 'LG2RA-412475',
    //         title: 'Code Issue - Unable to generate code',
    //         time: '6 months ago',
    //         status: 'Open',
    //         description: 'I have paid my service charge but my account is still disabled. I cannot generate a code...',
    //     },
    //     {
    //         id: 'LG2RA-121615',
    //         title: 'Billing Issue - Payment made but not reflecting',
    //         time: '6 months ago',
    //         status: 'Closed',
    //         description: 'I am trying to reach all the contacts made available on the app and no one is picking their...',
    //     },
    // ]);

    // const currentTab = ref('all');

    // Computed tickets based on the selected tab
    // const filteredTickets = computed(() => {
    //     if (currentTab.value === 'all') return tickets.value;
    //     return tickets.value.filter((ticket) => ticket.status.toLowerCase() === currentTab.value);
    // });
</script>
