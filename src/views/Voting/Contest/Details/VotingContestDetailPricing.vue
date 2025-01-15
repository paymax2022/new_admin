<template>
    <div>
        <div class="flex justify-between">
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Free Vote: </span>
                <span><span class="badge bg-warning-dark-light text-warning">Enabled</span></span>
            </div>
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Free Vote Delay:</span>
                <span class="text-sm">30 mins</span>
            </div>
            <div class="flex flex-col space-y-0 w-full">
                <span class="font-bold text-gray-300">Total Vote Pricing:</span>
                <span class="text-sm">3</span>
            </div>
        </div>

        <div class="mt-6">
            <div class="mb-2 w-full">
                <span class="font-bold text-gray-300">Vote Pricing:</span>
            </div>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div class="p-3 max-w-56 rounded-md border hover:border-primary">
                    <div class="text-lg font-bold">Free</div>
                    <div class="text-sm">1 Vote</div>
                    <div class="mt-8 text-lg font-bold">NGN: 0</div>
                </div>
                <div v-for="data in votePrices" :key="data.id"
                    class="p-3 max-w-56 rounded-md border hover:border-primary">
                    <div class="text-lg font-bold">{{ data.name }}</div>
                    <div class="text-sm">{{ data.votes }} Vote</div>
                    <div class="mt-8 text-lg font-bold">NGN: {{ data.price }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const votePrices = ref([
    {
        id: 1,
        name: 'Silver',
        votes: 10,
        price: 1000
    },
    {
        id: 2,
        name: 'Gold',
        votes: 50,
        price: 5000
    },
    {
        id: 3,
        name: 'Platinum',
        votes: 100,
        price: 10000
    }
])
</script>
