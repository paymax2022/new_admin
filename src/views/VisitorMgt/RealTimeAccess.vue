<template>
    <div class="grid grid-cols-4">
        <div class="border-r border-gray-300 pr-3">
            <h2 class="font-bold text-lg mb-2">Pedestrian In</h2>
            <div v-for="(item, index) in pedestrianIn" :key="index" class="mb-4 border border-gray-300 px-3 py-2 rounded">
                <p>{{ item.name }}</p>
                <div class="flex justify-between mt-3">
                    <p class="text-gray-500">{{ item.time }}</p>
                    <p class="font-bold">{{ item.id }}</p>
                </div>
            </div>
        </div>
        <div class="border-r border-gray-300 px-2">
            <h2 class="font-bold text-lg mb-2">Pedestrian Out</h2>
            <div v-for="(item, index) in pedestrianOut" :key="index" class="mb-4 px-3 border border-gray-300 py-2 rounded">
                <p>{{ item.name }}</p>
                <div class="flex justify-between mt-3">
                    <p class="text-gray-500">{{ item.time }}</p>
                    <p class="font-bold">{{ item.id }}</p>
                </div>
            </div>
        </div>
        <div class="border-r border-gray-300 px-2">
            <h2 class="font-bold text-lg mb-2">Vehicle In</h2>
            <div v-for="(item, index) in vehicleIn" :key="index" class="mb-4 px-3 py-2 border border-gray-300 rounded">
                <p>{{ item.name }}</p>
                <div class="flex justify-between mt-3">
                    <p class="text-gray-500">{{ item.time }}</p>
                    <p class="font-bold">{{ item.tag }}</p>
                </div>
            </div>
        </div>
        <div class="px-2">
            <h2 class="font-bold text-lg mb-2">Vehicle Out</h2>
            <div v-for="(item, index) in vehicleOut" :key="index" class="mb-4 px-3 py-2 border border-gray-300 rounded">
                <p>{{ item.name }}</p>
                <div class="flex justify-between mt-3">
                    <p class="text-gray-500">{{ item.time }}</p>
                    <p class="font-bold">{{ item.tag }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    const pedestrianIn = [
        { name: "Christopher Esin's guest just checked in", time: '8 minutes ago', id: '568691' },
        { name: "Babajide Balogun's guest just checked in", time: '14 minutes ago', id: '222477' },
    ];
    const pedestrianOut = [
        { name: "Babajide Balogun's guest just checked out", time: '2 minutes ago', id: '205215' },
        { name: "Mudashiru Shafe's guest just checked out", time: '4 minutes ago', id: '534833' },
    ];

    const vehicleIn = [
        { name: 'OLONISAKIN MORENIKE just cruised in 🚗', time: '4 weeks ago', tag: '12****43' },
        { name: 'CHUKWUEMEKA OBIMBA just cruised in 🚗', time: '4 weeks ago', tag: '27****86' },
    ];
    const vehicleOut = [
        { name: 'Lewis Okafor just drove out 🚗', time: '4 weeks ago', tag: '13****63' },
        { name: 'Michael Adahgwa just drove out 🚗', time: '4 weeks ago', tag: '27****86' },
    ];
</script>
