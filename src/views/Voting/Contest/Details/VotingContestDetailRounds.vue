<template>
    <div class="">
        <div class="flex flex-col space-y-0 w-full">
            <span class="font-bold text-gray-300">Current Round: <span
                    class="badge bg-warning-dark-light text-warning">Ended</span></span>
            <span class="text-sm">Round 3</span>
        </div>

        <div class="mt-6 table-responsive">
            <table class="table-hover">
                <thead>
                    <tr>
                        <th>Round Name</th>
                        <th>Minimum Votes</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="data in rounds" :key="data.id">
                        <tr>
                            <td class="whitespace-nowrap">{{ data.name }}</td>
                            <td>{{ data.min_votes }}</td>
                            <td>
                                <div class="text-sm space-x-2">
                                    <span>{{ data.start_date }}</span>
                                    <span>-</span>
                                    <span>{{ data.end_date }}</span>
                                </div>
                            </td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rounds = ref([
    {
        id: 1,
        name: 'Round 1',
        min_votes: 100,
        start_date: '2023-01-01',
        end_date: '2023-01-31'
    },
    {
        id: 2,
        name: 'Round 2',
        min_votes: 200,
        start_date: '2023-02-01',
        end_date: '2023-02-28'
    },
    {
        id: 3,
        name: 'Round 3',
        min_votes: 300,
        start_date: '2023-03-01',
        end_date: '2023-03-31'
    }
])
</script>
