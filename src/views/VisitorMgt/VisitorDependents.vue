<template>
    <div class="mb-6 border p-4 sm:grid sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 sm:mb-1 lg:flex lg:space-x-4 lg:mb-6 w-full">
        <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="setActiveTab(tab.status)"
            :class="[
                'flex items-center justify-center px-4 py-2 border rounded-lg w-full h-full',
                activeTab === tab.status ? 'bg-purple-100 text-purple-600 border-purple-500' : 'bg-white border-gray-300 hover:bg-gray-100',
            ]"
        >
            {{ tab.label }} ({{ tab.count }})
        </button>
    </div>

    <div v-if="filteredUsers.length" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div v-for="(user, index) in filteredUsers" :key="index" class="border border-gray-300 px-3 py-2">
            <div class="flex space-x-5 items-center">
                <div class="border border-gray-300 rounded-full h-10 w-10 p-1">
                    <img :src="user.image" alt="User Profile" class="rounded-full w-full h-full object-cover" />
                </div>
                <p class="text-[16px] font-bold">{{ user.number }}</p>
            </div>
            <div>
                <p class="mt-2">
                    Issued to {{ user.name }} <span>{{ user.issuedDate }}</span>
                </p>
                <p class="mt-4" :class="statusClass(user.status)">{{ user.status }}</p>
            </div>
        </div>
    </div>

    <div v-else class="text-center text-gray-500">No users found for {{ activeTab }} status.</div>
</template>

<script setup>
    import { ref } from 'vue';
    import UserProfile from '../../../public/assets/images/user-profile.jpeg';
    import ProfileTwo from '../../../public/assets/images/profile-34.jpeg';
    import ProfileThree from '../../../public/assets/images/profile-16.jpeg';

    const users = [
        { image: UserProfile, number: '1234', name: 'Veekthor Parloff', issuedDate: '9 months ago', status: 'Active' },
        { image: ProfileTwo, number: '5678', name: 'Par Vee', issuedDate: '5 months ago', status: 'Pending' },
        { image: ProfileThree, number: '9101', name: 'Parloff Vee', issuedDate: '3 days ago', status: 'Disabled' },
        { image: ProfileThree, number: '1213', name: 'Collins Anagor', issuedDate: '1 year ago', status: 'Disapproved' },
    ];

    const tabs = [
        { label: 'All', status: 'All', count: users.length },
        { label: 'Pending', status: 'Pending', count: users.filter((user) => user.status === 'Pending').length },
        { label: 'Active', status: 'Active', count: users.filter((user) => user.status === 'Active').length },
        { label: 'Disapproved', status: 'Disapproved', count: users.filter((user) => user.status === 'Disapproved').length },
        { label: 'Disabled', status: 'Disabled', count: users.filter((user) => user.status === 'Disabled').length },
    ];

    const activeTab = ref('All');
    const filteredUsers = ref(users);

    const setActiveTab = (status) => {
        activeTab.value = status;
        filteredUsers.value = status === 'All' ? users : users.filter((user) => user.status === status);
    };

    const statusClass = (status) => {
        switch (status) {
            case 'Active':
                return 'text-green-500';
            case 'Disabled':
                return 'text-red-500';
            case 'Disapproved':
                return 'text-yellow-500';
            case 'Pending':
                return 'text-blue-500';
            default:
                return 'text-gray-500';
        }
    };
</script>
