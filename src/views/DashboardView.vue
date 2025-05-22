<template>
    <div class="flex">
        <div class="flex-1 p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
            <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
            <p class="text-gray-600 mb-6 dark:text-white">
                Overview of your system’s performance and key metrics
            </p>

            <!-- Stats Cards Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <DashboardCard title="Total Users" :count="0" :icon="User" />
                <DashboardCard title="Active Wallet" :count="0" :icon="Wallet" />
                <DashboardCard title="Transactions" :count="0" :icon="CreditCard" />
                <DashboardCard title="Commission Paid" :count="0" :icon="BadgeDollarSign" />
            </div>

            <!-- Empty State Message -->
            <div class="text-center mt-12">
                <div class="flex justify-center mb-4">
                    <svg width="120" height="100" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <!-- Back sheet -->
                        <rect x="20" y="20" width="60" height="70" rx="4" fill="#E5E7EB" stroke="#1F2937"
                            stroke-width="1.5" />

                        <!-- Front sheet -->
                        <rect x="30" y="10" width="60" height="70" rx="4" fill="white" stroke="#111827"
                            stroke-width="2" />

                        <!-- Tabs on top of sheets -->
                        <rect x="30" y="8" width="14" height="4" rx="1" fill="#1E40AF" />
                        <rect x="48" y="8" width="10" height="4" rx="1" fill="#1E3A8A" />

                        <!-- Dashes to mimic content lines -->
                        <line x1="40" y1="30" x2="80" y2="30" stroke="#9CA3AF" stroke-width="1" />
                        <line x1="40" y1="40" x2="80" y2="40" stroke="#9CA3AF" stroke-width="1" />
                        <line x1="40" y1="50" x2="80" y2="50" stroke="#9CA3AF" stroke-width="1" />

                        <!-- Shadow under illustration -->
                        <ellipse cx="60" cy="92" rx="30" ry="5" fill="#E5E7EB" />
                    </svg>

                </div>
                <p class="text-gray-500">No activity detected</p>
                <p class="text-sm text-gray-400 dark:text-white">
                    Your dashboard will update automatically as soon as new data is available.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import DashboardCard from '@/components/DashboardCard.vue'
import { User, Wallet, CreditCard, BadgeDollarSign } from 'lucide-vue-next'
</script>