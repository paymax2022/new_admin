<template>
    <div class="p-4 min-h-screen">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">Campaigns Review</h2>
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
                    <tr>
                        <th class="px-4 py-3 text-left font-semibold">Campaign</th>
                        <th class="px-4 py-3 text-left font-semibold">Reviewer | Email</th>
                        <th class="px-4 py-3 text-left font-semibold">Review</th>
                        <th class="px-4 py-3 text-left font-semibold">Rating</th>
                        <th class="px-4 py-3 text-left font-semibold">Status</th>
                        <th class="px-4 py-3 text-left font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="campaign in paginatedCampaigns" :key="campaign.id" class="hover:bg-gray-100 transition">
                        <td class="px-4 py-3 flex items-center gap-3">
                            <div class="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                                <img :src="campaign.image" alt="Campaign" class="w-full h-full object-cover" />
                            </div>
                            <div class="truncate max-w-[200px]">
                                <div class="font-medium text-gray-800 truncate">{{ campaign.title }}</div>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <div class="font-semibold text-indigo-600">{{ campaign.reviewer.name }}</div>
                            <div class="text-sm text-blue-500">{{ campaign.reviewer.email }}</div>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-700 max-w-xs">
                            {{ campaign.review || 'No review provided' }}
                        </td>
                        <td class="px-4 py-3">
                            <div class="flex items-center">
                                <span v-for="i in 5" :key="i" class="text-xl text-yellow-500">
                                    <span v-if="i <= campaign.rating">★</span>
                                    <span v-else class="text-gray-300">★</span>
                                </span>
                                <span class="ml-2 text-sm text-gray-600">({{ campaign.rating }}/5)</span>
                            </div>
                        </td>
                        <td class="px-4 py-3">
                            <span :class="statusClass(campaign.status)">
                                {{ campaign.status }}
                            </span>
                        </td>
                        <td class="px-4 flex py-3">
                            <button
                                @click="openReviewModal(campaign)"
                                class="flex items-center gap-1 text-indigo-600 border border-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-50"
                            >
                                Details
                            </button>
                            <button
                                @click="openDeleteModal(campaign.id)"
                                class="flex items-center gap-1 text-green-600 border border-green-500 px-3 py-1 rounded-md hover:bg-red-50 ml-2"
                            >
                                Publish
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Mobile Cards -->
        <div class="md:hidden flex flex-col gap-4">
            <div v-for="campaign in paginatedCampaigns" :key="campaign.id" class="bg-white p-4 rounded-lg shadow space-y-2">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 shrink-0 rounded-full overflow-hidden">
                        <img :src="campaign.image" alt="Campaign" class="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 class="font-semibold text-gray-800">{{ campaign.title }}</h3>
                        <p class="text-sm text-gray-500">Category: {{ campaign.category }}</p>
                    </div>
                </div>

                <div class="text-sm text-gray-600">
                    <span class="font-medium">Reviewer:</span>
                    <span class="text-indigo-600 font-medium">{{ campaign.reviewer.name }}</span>
                    <div class="text-blue-500 text-sm">{{ campaign.reviewer.email }}</div>
                </div>

                <div class="text-sm text-gray-600"><span class="font-medium">Review:</span> {{ campaign.review || 'None' }}</div>

                <div class="text-sm">
                    <span class="font-medium">Rating:</span>
                    <span class="flex items-center">
                        <span v-for="i in 5" :key="i" class="text-lg text-yellow-500">
                            <span v-if="i <= campaign.rating">★</span>
                            <span v-else class="text-gray-300">★</span>
                        </span>
                        <span class="ml-1 text-gray-600">({{ campaign.rating }}/5)</span>
                    </span>
                </div>

                <div class="flex items-center justify-between">
                    <span :class="statusClass(campaign.status)">
                        {{ campaign.status }}
                    </span>
                    <div>
                        <button
                            @click="openReviewModal(campaign)"
                            class="text-indigo-600 border border-indigo-500 px-3 py-1 rounded-md hover:bg-indigo-50 text-sm mr-2"
                        >
                            Details
                        </button>
                        <button @click="openDeleteModal(campaign.id)" class="text-green-600 border border-green-500 px-3 py-1 rounded-md hover:bg-red-50 text-sm">
                            Publish
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Review Modal -->
        <div v-if="reviewModalVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div class="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800">Campaign Review</h3>
                </div>
                <div class="px-6 py-4">
                    <p class="text-sm text-gray-700 whitespace-pre-line">
                        {{ selectedCampaign?.review || 'No review provided.' }}
                    </p>
                </div>
                <div class="border-t border-gray-200 px-6 py-4 flex justify-end">
                    <button @click="closeReviewModal" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">Close</button>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24 bg-black bg-opacity-50">
            <div class="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800">Confirmation Alert</h3>
                </div>
                <div class="px-6 py-4 border-b border-gray-200">
                    <p class="text-gray-700 text-sm">Are you sure you want to publish this review?</p>
                </div>
                <div class="px-6 py-4 flex justify-end space-x-4">
                    <button @click="confirmDelete" class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Yes</button>
                    <button @click="showModal = false" class="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100">No</button>
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
    const showModal = ref(false);
    const deleteCampaignId = ref(null);

    const goToDetails = (campaignId) => {
        router.push({ name: 'completedView', params: { id: campaignId } });
    };

    const openDeleteModal = (id) => {
        deleteCampaignId.value = id;
        showModal.value = true;
    };

    const confirmDelete = () => {
        campaigns.value = campaigns.value.filter((c) => c.id !== deleteCampaignId.value);
        showModal.value = false;
    };

    const campaigns = ref([
        {
            id: 1,
            image: Dp,
            title: 'Help a patient',
            category: 'Health',
            status: 'Rejected',
            reviewer: { name: 'John Doe', email: 'john@example.com' },
            review: 'The campaign lacks proper medical documentation.',
            rating: 2,
        },
        {
            id: 2,
            image: Dp,
            title: 'Community garden project',
            category: 'Environment',
            status: 'Rejected',
            reviewer: { name: 'Jane Smith', email: 'jane@example.com' },
            review: 'The budget allocation is unclear and unrealistic.',
            rating: 1,
        },
        {
            id: 3,
            image: Dp,
            title: 'School supplies for children',
            category: 'Education',
            status: 'Rejected',
            reviewer: { name: 'Robert Johnson', email: 'robert@example.com' },
            review: 'Good initiative but needs more detailed implementation plan.',
            rating: 3,
        },
        {
            id: 4,
            image: Dp,
            title: 'Animal shelter renovation',
            category: 'Animals',
            status: 'Rejected',
            reviewer: { name: 'Emily Davis', email: 'emily@example.com' },
            review: 'The project timeline is too short for the proposed work.',
            rating: 2,
        },
    ]);

    const filteredCampaigns = computed(() => {
        if (!searchQuery.value) return campaigns.value;
        const query = searchQuery.value.toLowerCase();
        return campaigns.value.filter(
            (c) => c.title.toLowerCase().includes(query) || c.reviewer.name.toLowerCase().includes(query) || c.review.toLowerCase().includes(query),
        );
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
            ? 'text-green-600 border border-green-500 px-2 py-1 rounded-full text-sm'
            : 'text-red-500 border border-red-500 px-2 py-1 rounded-full text-sm';
    };

    const selectedCampaign = ref(null);
    const reviewModalVisible = ref(false);

    const openReviewModal = (campaign) => {
        selectedCampaign.value = campaign;
        reviewModalVisible.value = true;
    };

    const closeReviewModal = () => {
        selectedCampaign.value = null;
        reviewModalVisible.value = false;
    };
</script>
