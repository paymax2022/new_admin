<template>
    <div class="flex flex-col space-y-6 p-6">
        <div class="flex justify-end items-center space-x-4">
            <a href="#" class="text-sm text-gray-600 hover:text-gray-900 underline">Download Template</a>
            <button class="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-100">
                <span>New ID</span>
                <i class="fas fa-plus"></i>
            </button>
        </div>
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
                {{ tab.label }} ({{ tab.count }})
            </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="(card, index) in filteredCards" :key="index" class="border border-gray-200 bg-pink-50 rounded-lg px-4 py-2">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-3">
                        <div class="border border-gray-300 rounded-full h-10 w-10 p-1">
                            <img :src="card.image" alt="User Profile" class="rounded-full w-full h-full object-cover" />
                        </div>
                        <span class="text-[12px] font-semibold">{{ card.number }}</span>
                    </div>
                    <div class="h-6 w-6 flex items-center justify-center">
                        <IconCar class="fill-red-200" />
                    </div>
                </div>
                <div class="mt-4">
                    <p class="text-sm text-gray-500 mt-2">Issued to {{ card.issuedTo }} - {{ card.issuedDate }}</p>
                    <span class="text-sm text-purple-500 mt-4">{{ card.status }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import IconCar from '@/components/icon/icon-vcard.vue';
    import UserProfile from '../../../public/assets/images/user-profile.jpeg';
    import ProfileTwo from '../../../public/assets/images/profile-34.jpeg';
    import ProfileThree from '../../../public/assets/images/profile-16.jpeg';

    const cards = [
        { image: UserProfile, number: '15****02', issuedTo: 'Odubgesan Shehu', issuedDate: '9 months ago', status: 'Active' },
        { image: ProfileTwo, number: '57****8', issuedTo: 'John Doe', issuedDate: '9 months ago', status: 'Active' },
        { image: ProfileThree, number: '12****3', issuedTo: 'Jane Smith', issuedDate: '6 months ago', status: 'Pending' },
        { image: ProfileTwo, number: '45****7', issuedTo: 'Jim Doe', issuedDate: '2 months ago', status: 'Disapproved' },
        { image: UserProfile, number: '89****4', issuedTo: 'Sarah Lee', issuedDate: '1 year ago', status: 'Disabled' },
    ];

    const tabs = [
        { label: 'All', status: 'All', count: cards.length },
        { label: 'Pending', status: 'Pending', count: cards.filter((card) => card.status === 'Pending').length },
        { label: 'Active', status: 'Active', count: cards.filter((card) => card.status === 'Active').length },
        { label: 'Disapproved', status: 'Disapproved', count: cards.filter((card) => card.status === 'Disapproved').length },
        { label: 'Disabled', status: 'Disabled', count: cards.filter((card) => card.status === 'Disabled').length },
    ];

    const activeTab = ref('Active');
    const filteredCards = ref(cards.filter((card) => card.status === activeTab.value || activeTab.value === 'All'));

    const setActiveTab = (status) => {
        activeTab.value = status;
        filteredCards.value = cards.filter((card) => card.status === status || status === 'All');
    };
</script>
