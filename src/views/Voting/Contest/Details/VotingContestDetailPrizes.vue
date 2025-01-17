<template>
    <div>
        <div>
            <h5 class="font-semibold text-lg dark:text-white-light mb-3">Prize Awards</h5>

            <div class="mt-6 table-responsive">
                <table class="table-hover">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Prize</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="data in prizes" :key="data.id">
                            <tr>
                                <td class="whitespace-nowrap">{{ data.position }}</td>
                                <td>{{ data.prize }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="mt-6">
            <h5 class="font-semibold text-lg dark:text-white-light mb-3">Other Benefits</h5>

            <div class="mt-6 table-responsive">
                <table class="table-hover">
                    <thead>
                        <tr>
                            <th>Position</th>
                            <th>Type</th>
                            <th>Benefit Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="data in otherBenefits" :key="data.id">
                            <tr>
                                <td class="whitespace-nowrap">{{ data.position }}</td>
                                <td>{{ data.type }}</td>
                                <td>{{ data.benefit_name }}</td>
                            </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const prizes = ref([
    {
        position: '1',
        prize: '1,000,000'
    },
    {
        position: '2',
        prize: '500,000'
    },
    {
        position: '3',
        prize: '300,000'
    }
])

const otherBenefits = ref([
    {
        position: '1',
        type: 'Car',
        benefit_name: 'Brand New 2024 Lexus LC'
    }
])
</script>
