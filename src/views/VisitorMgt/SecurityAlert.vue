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
                <span class="font-semibold">{{ tab.label }} </span>
                <span class="text-xs text-gray-500">({{ tab.count }})</span>
            </button>
        </div>

        <div class="grid lg:grid-cols-3 gap-4 grid-cols-1">
            <div v-for="(alert, index) in filteredAlerts" :key="index" class="px-4 py-2 rounded border border-gray-200">
                <div class="flex justify-between">
                    <p class="font-bold text-[12px]">{{ alert.title }}</p>
                    <p class="text-gray-400 text-[10px]">{{ alert.time }}</p>
                </div>
                <div class="bg-red-100 rounded-md w-16">
                    <p class="text-red-500 font-semibold text-[10px] text-center">{{ alert.priority }}</p>
                </div>
                <p class="text-gray-600 mt-2 text-[14px]">{{ alert.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const alerts = [
        { title: 'Multiple Fingerprint Usage', priority: 'Low', description: 'This fingerprint 47****9 has been used to exit 2 times', time: '29 minutes ago' },
        { title: 'Multiple Code Usage', priority: 'Low', description: 'This code 26***3 has been used to exit 2 times', time: '33 minutes ago' },
        { title: 'Multiple Fingerprint Usage', priority: 'Low', description: 'This fingerprint 48****4 has been used to exit 2 times', time: '35 minutes ago' },
        { title: 'Unauthorized Access', priority: 'High', description: 'This device was accessed by an unrecognized user', time: '1 hour ago' },
        { title: 'Critical Security Breach', priority: 'Critical', description: 'A critical breach was detected in the system', time: '2 hours ago' },
        { title: 'User Login Failed', priority: 'High', description: 'The user attempted to login with an incorrect password', time: '3 hours ago' },
    ];

    const tabs = [
        { label: 'All', status: 'All', count: alerts.length },
        { label: 'Low', status: 'Low', count: alerts.filter((alert) => alert.priority === 'Low').length },
        { label: 'High', status: 'High', count: alerts.filter((alert) => alert.priority === 'High').length },
        { label: 'Critical', status: 'Critical', count: alerts.filter((alert) => alert.priority === 'Critical').length },
    ];

    const activeTab = ref('All');
    const filteredAlerts = ref(alerts);

    const setActiveTab = (status) => {
        activeTab.value = status;
        if (status === 'All') {
            filteredAlerts.value = alerts;
        } else {
            filteredAlerts.value = alerts.filter((alert) => alert.priority === status);
        }
    };
</script>
