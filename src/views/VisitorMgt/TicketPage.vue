<template>
    <div>
        <div class="mb-6 border p-4 sm:grid sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 sm:space-y-0 sm:mb-1 lg:flex lg:space-x-4 lg:mb-6 w-full">
            <button
                v-for="(tab, index) in tabs"
                :key="index"
                @click="setActiveTab(tab.status)"
                :class="[
                    'px-4 py-2 border rounded-lg w-full h-full',
                    activeTab === tab.status ? 'bg-purple-100 text-purple-600 border-purple-500' : 'bg-white border-gray-300 hover:bg-gray-100',
                ]"
                :aria-selected="activeTab === tab.status ? 'true' : 'false'"
                role="tab"
            >
                <span class="font-semibold">{{ tab.label }}</span>
                <span class="text-xs text-gray-500">({{ tab.count }})</span>
            </button>
        </div>
        <div v-for="card in filteredCards" :key="card.id" class="border mt-4 border-gray-300 px-3 py-2">
            <div class="flex justify-between">
                <div>
                    <div>
                        <p class="text-gray-800 font-bold text-lg">{{ card.title }}</p>
                        <p class="text-gray-600 font-semibold text-[12px]">{{ card.id }}</p>
                    </div>
                    <div class="flex gap-2">
                        <div class="flex items-center space-x-2 text-[12px]">
                            <div>
                                <IconDoublearrow class="h-4 text-purple-600" />
                            </div>
                            <p class="text-purple-600">{{ card.details.requestLabel }}</p>
                        </div>
                        <div class="flex gap-2 text-gray-600 text-[12px]">
                            <p>{{ card.details.status }}</p>
                            <p>-</p>
                            <p>{{ card.details.timeAgo }}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex gap-2">
                        <IconComment />
                        <p>{{ card.details.comments }}</p>
                    </div>
                </div>
            </div>
            <div class="bg-gray-200 flex justify-center py-1 rounded-md w-[35%]">
                <p>
                    Closed by <span>{{ card.details.closedBy }}</span>
                </p>
            </div>
            <div>
                <p>{{ card.details.question }}</p>
            </div>
            <div class="flex justify-between items-center mt-4">
                <div class="flex space-x-8">
                    <button type="button" class="btn btn-primary w-28">Pick Up</button>
                    <button type="button" class="btn btn-primary w-28">Assign</button>
                </div>
                <div class="border border-gray-300 p-2 rounded flex items-center justify-center">
                    <IconVisible />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import IconComment from '@/components/icon/icon-comment.vue';
    import IconDoublearrow from '@/components/icon/icon-doublearrow.vue';
    import IconVisible from '@/components/icon/icon-visible.vue';
    import { ref, computed } from 'vue';
    const tabs = [
        { label: 'Open', status: 'Open', count: 1 },
        { label: 'Closed', status: 'Closed', count: 1 },
    ];

    const activeTab = ref('Open');
    const tickets = ref([
        {
            id: 'LG2RA-1216158',
            title: 'Others-Others',
            details: {
                status: 'Closed',
                timeAgo: '6 months ago',
                requestIcon: IconDoublearrow,
                requestLabel: 'Request',
                comments: 2,
                closedBy: 'Veekthor TEAM',
                question: 'Is Etag now available?',
            },
        },
        {
            id: 'LG2RA-1216159',
            title: 'Billing Issue',
            details: {
                status: 'Open',
                timeAgo: '2 days ago',
                requestIcon: IconDoublearrow,
                requestLabel: 'Inquiry',
                comments: 1,
                closedBy: 'Support TEAM',
                question: 'When will my refund be processed?',
            },
        },
        {
            id: 'LG2RA-1216159',
            title: 'Billing Issue',
            details: {
                status: 'Open',
                timeAgo: '2 days ago',
                requestIcon: IconDoublearrow,
                requestLabel: 'Inquiry',
                comments: 1,
                closedBy: 'Support TEAM',
                question: 'When will my refund be processed?',
            },
        },
    ]);
    const filteredCards = computed(() => {
        return activeTab.value === 'All' ? tickets.value : tickets.value.filter((ticket) => ticket.details.status === activeTab.value);
    });
    function setActiveTab(status) {
        activeTab.value = status;
    }
</script>
