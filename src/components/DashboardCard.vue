<template>
  <div class="bg-white rounded-lg shadow dark:bg-gray-800 p-4 sm:p-6">
    <div class="flex items-start sm:items-center">
      <div class="flex-shrink-0">
        <div :class="getIconColor(color)" class="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-md">
          <component :is="getIconComponent(icon)" class="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
      </div>
      <div class="ml-3 sm:ml-5 w-0 flex-1 min-w-0">
        <dl>
          <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ title }}</dt>
          <dd class="flex items-baseline">
            <div class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">{{ value }}</div>
            <div v-if="change" :class="getChangeColor(change)" class="ml-2 flex items-baseline text-sm font-semibold">
              {{ change }}
            </div>
          </dd>
          <dd v-if="subtitle" class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ subtitle }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard.vue'
import IconMenuUsers from '@/components/icon/menu/icon-menu-users.vue'
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue'
import IconMenuAuthentication from '@/components/icon/menu/icon-menu-authentication.vue'
import IconMenuCharts from '@/components/icon/menu/icon-menu-charts.vue'
import IconHouse from '@/components/icon/icon-house.vue'
import IconWallet from '@/components/icon/icon-wallet.vue'

interface Props {
  title: string
  value: string | number
  change?: string
  subtitle?: string
  icon: string
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red'
}

const props = defineProps<Props>()

const getIconColor = (color: string) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500'
  }
  return colors[color as keyof typeof colors] || 'bg-gray-500'
}

const getChangeColor = (change: string) => {
  if (change.startsWith('+')) return 'text-green-600 dark:text-green-400'
  if (change.startsWith('-')) return 'text-red-600 dark:text-red-400'
  return 'text-gray-600 dark:text-gray-400'
}

const getIconComponent = (iconName: string) => {
  // Map icon names to actual icon components
  const iconMap: Record<string, any> = {
    school: IconHouse,
    users: IconMenuUsers,
    'user-tie': IconMenuAuthentication,
    'money-bill': IconMenuComponents,
    'chart-line': IconMenuCharts,
    'money-bag': IconWallet
  }
  return iconMap[iconName] || IconMenuDashboard
}
</script>
