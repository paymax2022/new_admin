<template>
    <div class="p-4 min-h-screen">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Rejected Campaigns</h2>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-64 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <!-- Desktop Table -->
        <div class="hidden md:block overflow-x-auto bg-white rounded-lg shadow">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 text-black">
                    <tr class="">
                        <th class="px-4 py-3 text-left font-semibold">Campaign</th>
                        <th class="px-4 py-3 text-left font-semibold">Category | Deadline</th>
                        <th class="px-4 py-3 text-left font-semibold">User</th>
                        <th class="px-4 py-3 text-left font-semibold">Goal</th>
                        <th class="px-4 py-3 text-left font-semibold">Status</th>
                        <th class="px-4 py-3 text-left font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="campaign in paginatedCampaigns" :key="campaign.id" class="hover:bg-gray-100 transition">
                        <td class="px-4 py-3 flex items-center gap-3">
                            <img :src="campaign.image" class="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <div class="font-medium text-gray-800 truncate max-w-[200px]">
                                    {{ campaign.title }}
                                </div>
                                <div class="text-sm text-gray-500">Total Donors: ({{ campaign.donors }})</div>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <div class="text-gray-700 font-medium">{{ campaign.category }}</div>
                            <div class="text-xs text-orange-500 bg-orange-100 px-2 py-1 rounded-full inline-block mt-1">
                                {{ campaign.deadline }}
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <div class="font-semibold text-indigo-600">{{ campaign.user }}</div>
                            <div class="text-sm text-blue-500">@{{ campaign.username }}</div>
                        </td>
                        <td class="px-4 py-3">
                            <div class="text-indigo-700 font-bold">${{ campaign.goal.toLocaleString() }}</div>
                            <div class="text-sm text-gray-600">
                                Raised: <span class="text-orange-500">${{ campaign.raised.toFixed(2) }}</span>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <span :class="statusClass(campaign.status)">
                                {{ campaign.status }}
                            </span>
                        </td>
                        <td class="px-4 flex py-3">
                            <button
                                @click="goToDetails(campaign.id)"
                                class="flex items-center gap-1 text-indigo-600 border border-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-50"
                            >
                                Details
                            </button>
                            <button @click="showModal = true" class="flex items-center gap-1 text-red-600 border border-red-500 px-3 py-1 rounded-md hover:bg-red-50 ml-2">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Delete Button Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24 bg-black bg-opacity-50">
            <div class="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
                <!-- Modal Header -->
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800">Confirmation Alert</h3>
                </div>

                <!-- Modal Body -->
                <div class="px-6 py-4 border-b border-gray-200">
                    <p class="text-gray-700 text-sm">Are you sure you want to delete this campaign?</p>
                </div>

                <!-- Modal Footer -->
                <div class="px-6 py-4 flex justify-end space-x-4">
                    <button @click="confirmFeature" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Yes</button>
                    <button @click="showModal = false" class="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">No</button>
                </div>
            </div>
        </div>


        <!-- Mobile Cards -->
        <div class="md:hidden flex flex-col gap-4">
            <div v-for="campaign in paginatedCampaigns" :key="campaign.id" class="bg-white p-4 rounded-lg shadow space-y-2">
                <div class="flex items-center gap-3">
                    <img :src="campaign.image" class="w-10 h-10 rounded-full object-cover" />
                    <div>
                        <h3 class="font-semibold text-gray-800">{{ campaign.title }}</h3>
                        <p class="text-sm text-gray-500">Total Donors: ({{ campaign.donors }})</p>
                    </div>
                </div>

                <div class="text-sm text-gray-600"><span class="font-medium">Category:</span> {{ campaign.category }}</div>

                <div class="text-sm text-gray-600">
                    <span class="font-medium">Deadline:</span>
                    <span class="bg-orange-100 text-orange-500 px-2 py-1 rounded-full text-xs inline-block">
                        {{ campaign.deadline }}
                    </span>
                </div>

                <div class="text-sm text-gray-600">
                    <span class="font-medium">User:</span>
                    <span class="text-indigo-600 font-medium">{{ campaign.user }}</span>
                    <span class="text-blue-500 text-sm">@{{ campaign.username }}</span>
                </div>

                <div class="text-sm">
                    <span class="font-medium text-indigo-700">Goal:</span> ${{ campaign.goal.toLocaleString() }}
                    <br />
                    <span class="text-gray-600">Raised:</span>
                    <span class="text-orange-500">${{ campaign.raised.toFixed(2) }}</span>
                </div>

                <div class="flex items-center justify-between">
                    <span :class="statusClass(campaign.status)">
                        {{ campaign.status }}
                    </span>
                    <button @click="goToDetails(campaign.id)" class="text-indigo-600 border border-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-50 text-sm">
                        Details
                    </button>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="mt-6 text-center text-gray-700 text-sm mb-2">Showing {{ fromIndex }} to {{ toIndex }} of {{ filteredCampaigns.length }} results</div>

        <div class="flex justify-center gap-2">
            <button v-if="currentPage > 1" @click="currentPage--" class="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-100">
                «
            </button>
            <button
                v-for="page in totalPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                    'px-3 py-1 rounded-md border',
                    currentPage === page ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100',
                ]"
            >
                {{ page }}
            </button>
            <button
                v-if="currentPage < totalPages"
                @click="currentPage++"
                class="px-3 py-1 rounded-md border bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            >
                ›
            </button>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { useRouter } from 'vue-router';
    import Dp from '@/assets/image/dp.jpeg';

    const router = useRouter();
    const searchQuery = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const goToDetails = (campaignId) => {
        router.push({ name: 'completedView', params: { id: campaignId } });
    };

    const campaigns = ref([
        {
            id: 1,
            image: Dp,
            title: 'Help a patient who receiv...',
            donors: 0,
            category: 'Health',
            deadline: '4 weeks from now',
            user: 'Em geetech',
            username: 'emgeetech',
            goal: 1000,
            raised: 0,
            status: 'Expired',
        },
        {
            id: 2,
            image: Dp,
            title: 'QQQQQQQQ',
            donors: 0,
            category: 'Organization',
            deadline: '4 days ago',
            user: 'Uige Luanda',
            username: 'sesesoh132',
            goal: 234,
            raised: 0,
            status: 'Expired',
        },
        {
            id: 3,
            image: Dp,
            title: 'joao',
            donors: 0,
            category: 'Welfare',
            deadline: '1 month ago',
            user: 'joao vitor',
            username: 'joaovitoralonso',
            goal: 2000000,
            raised: 0,
            status: 'Expired',
        },
        {
            id: 4,
            image: Dp,
            title: 'Save a Dog Shelter',
            donors: 3,
            category: 'Animals',
            deadline: '2 weeks from now',
            user: 'Jane Doe',
            username: 'janedoe',
            goal: 500,
            raised: 75,
            status: 'Expired',
        },
    ]);

    const filteredCampaigns = computed(() => {
        if (!searchQuery.value) return campaigns.value;
        return campaigns.value.filter((c) => c.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });

    const totalPages = computed(() => Math.ceil(filteredCampaigns.value.length / itemsPerPage));

    const paginatedCampaigns = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        return filteredCampaigns.value.slice(start, start + itemsPerPage);
    });

    const fromIndex = computed(() => (filteredCampaigns.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage + 1));
    const toIndex = computed(() => Math.min(currentPage.value * itemsPerPage, filteredCampaigns.value.length));

    const statusClass = (status) => {
        return status === 'Approved'
            ? 'text-indigo-600 border border-indigo-500 px-2 py-1 rounded-full text-sm'
            : 'text-red-500 border border-red-500 px-2 py-1 rounded-full text-sm';
    };
    const showModal = ref(false);
const confirmFeature = () => {
    console.log('Delete confirmed');
    showModal.value = false;
};
</script>
