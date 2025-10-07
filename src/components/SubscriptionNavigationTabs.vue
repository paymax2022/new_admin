<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
    <nav class="flex space-x-8 px-6" aria-label="Subscription Navigation">
      <button
        v-for="tab in navigationTabs"
        :key="tab.name"
        @click="handleTabClick(tab.name)"
        :class="[
          'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
          isActiveTab(tab.name)
            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
        ]"
      >
        <div class="flex items-center space-x-2">
          <component :is="tab.icon" class="h-5 w-5" />
          <span>{{ tab.label }}</span>
        </div>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import {
  ChartBarIcon,
  RectangleStackIcon,
  DocumentTextIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CogIcon
} from '@heroicons/vue/24/outline'

// Navigation tabs configuration
const navigationTabs = [
  {
    name: 'subscription-dashboard',
    label: 'Subscription Dashboard',
    icon: ChartBarIcon,
    route: 'subscription-dashboard'
  },
  {
    name: 'plans-tiers',
    label: 'Plans & Tiers',
    icon: RectangleStackIcon,
    route: 'plans-tiers'
  },
  {
    name: 'invoice-center',
    label: 'Invoice Center',
    icon: DocumentTextIcon,
    route: 'invoice-center'
  },
  {
    name: 'payment-history',
    label: 'Payment History',
    icon: ClockIcon,
    route: 'payment-history'
  },
  {
    name: 'failed-payments',
    label: 'Failed Payments',
    icon: ExclamationTriangleIcon,
    route: 'failed-payments'
  },
  {
    name: 'subscription-settings',
    label: 'Subscription Settings',
    icon: CogIcon,
    route: 'subscription-settings'
  }
]

const router = useRouter()
const route = useRoute()

// Check if current tab is active based on route name
const isActiveTab = (tabName: string) => {
  return route.name === navigationTabs.find(tab => tab.name === tabName)?.route
}

// Handle tab click navigation
const handleTabClick = (tabName: string) => {
  const tab = navigationTabs.find(t => t.name === tabName)
  if (tab && tab.route !== route.name) {
    router.push({ name: tab.route })
  }
}
</script>
