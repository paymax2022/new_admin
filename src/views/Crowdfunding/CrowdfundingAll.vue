<template>
    <div class="p-4 min-h-screen">
        <h2 class="text-2xl font-bold mb-4 text-gray-800">All Campaigns</h2>
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
                        <td class="px-4 py-3">
                            <div class="relative" @click.stop data-action-menu>
                                <button
                                    :ref="(el) => setButtonRef(campaign.id, el)"
                                    type="button"
                                    class="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
                                    @click="toggleActionMenu(campaign.id)"
                                >
                                    <IconHorizontalDots class="h-5 w-5" />
                                </button>
                                <Teleport to="body">
                                    <div
                                        v-if="openActionMenu === campaign.id"
                                        class="fixed z-[9999] w-40 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg"
                                        :style="getDropdownPosition(campaign.id)"
                                        data-dropdown="true"
                                    >
                                        <button
                                            type="button"
                                            class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                                            @click="handleView(campaign.id)"
                                        >
                                            View
                                        </button>
                                        <button
                                            type="button"
                                            class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-green-600 transition hover:bg-gray-50"
                                            @click="handleApprove(campaign.id)"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            type="button"
                                            class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-gray-50"
                                            @click="handleDecline(campaign.id)"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </Teleport>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
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
                    <div class="relative" @click.stop data-action-menu>
                        <button
                            :ref="(el) => setButtonRef(campaign.id, el)"
                            type="button"
                            class="rounded-full p-2 text-gray-500 transition hover:bg-gray-100"
                            @click="toggleActionMenu(campaign.id)"
                        >
                            <IconHorizontalDots class="h-5 w-5" />
                        </button>
                        <Teleport to="body">
                            <div
                                v-if="openActionMenu === campaign.id"
                                class="fixed z-[9999] w-40 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg"
                                :style="getDropdownPosition(campaign.id)"
                                data-dropdown="true"
                            >
                                <button
                                    type="button"
                                    class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                                    @click="handleView(campaign.id)"
                                >
                                    View
                                </button>
                                <button
                                    type="button"
                                    class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-green-600 transition hover:bg-gray-50"
                                    @click="handleApprove(campaign.id)"
                                >
                                    Approve
                                </button>
                                <button
                                    type="button"
                                    class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-gray-50"
                                    @click="handleDecline(campaign.id)"
                                >
                                    Decline
                                </button>
                            </div>
                        </Teleport>
                    </div>
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

<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import type { ComponentPublicInstance } from 'vue';
    import { useRouter } from 'vue-router';
    import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
    import Dp from '@/assets/image/dp.jpeg';

    const router = useRouter();
    const searchQuery = ref('');
    const currentPage = ref(1);
    const itemsPerPage = 10;
    const goToDetails = (campaignId) => {
        router.push({ name: 'detailsPage', params: { id: campaignId } });
    };
    const openActionMenu = ref<number | null>(null);
    const buttonRefs = ref<Record<number, HTMLElement | null>>({});

    const setButtonRef = (campaignId: number, el: HTMLElement | Element | ComponentPublicInstance | null) => {
        if (el && el instanceof HTMLElement) {
            buttonRefs.value[campaignId] = el;
        } else if (el && '$el' in el && el.$el instanceof HTMLElement) {
            buttonRefs.value[campaignId] = el.$el;
        }
    };

    const getDropdownPosition = (campaignId: number) => {
        const button = buttonRefs.value[campaignId];
        if (!button) {
            return { display: 'none' };
        }
        
        const rect = button.getBoundingClientRect();
        return {
            top: `${rect.bottom + 8}px`,
            right: `${window.innerWidth - rect.right}px`,
        };
    };

    const toggleActionMenu = (campaignId: number) => {
        openActionMenu.value = openActionMenu.value === campaignId ? null : campaignId;
    };
    const closeActionMenu = () => {
        openActionMenu.value = null;
    };
    const handleView = (campaignId: number) => {
        goToDetails(campaignId);
        closeActionMenu();
    };
    const handleApprove = (campaignId: number) => {
        console.log('Approving campaign', campaignId);
        closeActionMenu();
    };
    const handleDecline = (campaignId: number) => {
        console.log('Declining campaign', campaignId);
        closeActionMenu();
    };
    const handleClickOutside = (event: MouseEvent) => {
        if (openActionMenu.value) {
            const target = event.target as HTMLElement;
            const isButton = Object.values(buttonRefs.value).some((ref) => ref?.contains(target));
            const isDropdown = target.closest('[data-dropdown="true"]');
            if (!isButton && !isDropdown) {
                closeActionMenu();
            }
        }
    };
    onMounted(() => {
        document.addEventListener('click', handleClickOutside);
    });
    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
    });

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
            status: 'Approved',
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
            status: 'Pending',
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
            status: 'Pending',
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
            status: 'Approved',
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
            : 'text-orange-500 border border-orange-400 px-2 py-1 rounded-full text-sm';
    };
</script>
