<template>
  <div class="p-6 space-y-6">
    <!-- Navigation Tabs -->
    <GroupNavigationTabs />

    <!-- Header -->
    <div>
      <h1 class="text-2xl font-semibold mb-1">Dashboard Overview</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Monitor your organization's key metrics and performance</p>
    </div>

    <!-- Overview Content -->
    <div>
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
      
      <!-- Summary Cards -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <SummaryCard 
          title="Total Members" 
          :value="totalMembers.toLocaleString()" 
          icon="UserGroupIcon" 
          iconBg="bg-blue-100" 
          iconColor="text-blue-500" 
        />
        <SummaryCard 
          title="Active Members" 
          :value="activeMembers.toLocaleString()" 
          icon="UserIcon" 
          iconBg="bg-green-100" 
          iconColor="text-green-500" 
        />
        <SummaryCard 
          title="Monthly Revenue" 
          :value="`₦${monthlyRevenue.toLocaleString()}`" 
          icon="BanknotesIcon" 
          iconBg="bg-yellow-100" 
          iconColor="text-yellow-500" 
        />
        <SummaryCard 
          title="Overdue Payments" 
          :value="overduePayments.toString()" 
          icon="ExclamationTriangleIcon" 
          iconBg="bg-red-100" 
          iconColor="text-red-500" 
        />
        <SummaryCard 
          title="Upcoming Events" 
          :value="upcomingEvents.toString()" 
          icon="CalendarDaysIcon" 
          iconBg="bg-purple-100" 
          iconColor="text-purple-500" 
        />
        <SummaryCard 
          title="Engagement Score" 
          :value="`${engagementScore}%`" 
          icon="ChartBarIcon" 
          iconBg="bg-indigo-100" 
          iconColor="text-indigo-500" 
        />
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QuickAction 
          title="Create Group" 
          description="Start a new group" 
          icon="UserGroupIcon" 
          color="bg-blue-500" 
          @click="() => {}"
        />
        <QuickAction 
          title="Add Member" 
          description="Invite new members" 
          icon="UserPlusIcon" 
          color="bg-green-500" 
          @click="() => {}"
        />
        <QuickAction 
          title="Send Message" 
          description="Communicate with members" 
          icon="ChatBubbleLeftRightIcon" 
          color="bg-purple-500" 
          @click="() => {}"
        />
        <QuickAction 
          title="View Reports" 
          description="Analytics & insights" 
          icon="ChartBarIcon" 
          color="bg-orange-500" 
          @click="() => {}"
        />
      </div>

      <!-- Highlights -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Highlights</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ groups.length }}</div>
            <div class="text-sm text-gray-500">Total Groups</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ groups.filter(g => g.status === 'active').length }}</div>
            <div class="text-sm text-gray-500">Active Groups</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-yellow-600">₦{{ monthlyRevenue.toLocaleString() }}</div>
            <div class="text-sm text-gray-500">Monthly Revenue</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">{{ engagementScore }}%</div>
            <div class="text-sm text-gray-500">Engagement Rate</div>
          </div>
        </div>
      </div>

      <!-- Group Status Overview -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Group Status Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div class="text-2xl font-bold text-blue-600">{{ groups.filter(g => g.join_type === 'public').length }}</div>
            <div class="text-sm text-gray-500">Public Groups</div>
          </div>
          <div class="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div class="text-2xl font-bold text-green-600">{{ groups.filter(g => g.join_type === 'private').length }}</div>
            <div class="text-sm text-gray-500">Private Groups</div>
          </div>
          <div class="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div class="text-2xl font-bold text-purple-600">{{ groups.filter(g => g.join_type === 'direct_join').length }}</div>
            <div class="text-sm text-gray-500">Direct Join Groups</div>
          </div>
        </div>
      </div>

      <!-- Groups Overview Table -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Groups Overview</h2>
          <button 
            @click="loadGroupsData" 
            class="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Refresh
          </button>
        </div>
        
        <div v-if="groups.length === 0" class="text-center py-8 text-gray-500">
          <div class="text-lg mb-2">No groups found</div>
          <div class="text-sm">Groups will appear here once they are created</div>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Group Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Fee</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="group in groups" :key="group.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium">{{ group.name }}</div>
                  <div class="text-sm text-gray-500">{{ group.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  <span v-if="group.total_members > 0">{{ group.total_members }}</span>
                  <span v-else class="text-gray-400 italic">No members yet</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                  ₦{{ group.membership_fee.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {{ group.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ new Date(group.created_at).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import SummaryCard from '@/components/SummaryCard.vue';
import QuickAction from '@/components/QuickAction.vue';
import GroupNavigationTabs from '@/components/GroupNavigationTabs.vue';
import {
  ChartBarIcon,
  UserGroupIcon,
  UserIcon,
  BanknotesIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon
} from '@heroicons/vue/24/outline'
import { groupService, type Group } from '@/services/groupService'

const activeTab = ref('overview')
const loading = ref(false)
const groups = ref<Group[]>([])
const dataLoaded = ref(false) // Prevent multiple API calls
const componentId = Math.random().toString(36).substr(2, 9) // Unique component instance ID

console.log('OverviewView component instance created:', componentId)

// Computed properties for dynamic stats
const totalMembers = computed(() => {
  return groups.value.reduce((sum, group) => sum + group.total_members, 0)
})

const activeMembers = computed(() => {
  return groups.value.reduce((sum, group) => sum + group.active_members, 0)
})

const monthlyRevenue = computed(() => {
  return groups.value.reduce((sum, group) => {
    if (group.payment_interval === 'monthly') {
      return sum + group.membership_fee
    }
    return sum
  }, 0)
})

const overduePayments = computed(() => {
  // Mock calculation - in real app this would come from payment API
  return Math.max(0, Math.floor(groups.value.length * 0.1))
})

const upcomingEvents = computed(() => {
  // Mock calculation - in real app this would come from events API
  return groups.value.length * 2 // Average 2 events per group
})

const engagementScore = computed(() => {
  const total = totalMembers.value
  const active = groups.value.reduce((sum, group) => sum + group.active_members, 0)
  
  if (total > 0) {
    return Math.round((active / total) * 100)
  } else {
    return Math.min(75, groups.value.length * 15)
  }
})

// Load groups data from API
const loadGroupsData = async () => {
  if (loading.value || dataLoaded.value) {
    console.log(`[${componentId}] Data already loading or loaded, skipping...`)
    return
  }
  
  try {
    loading.value = true
    dataLoaded.value = true
    console.log(`[${componentId}] Loading groups data...`)
    
    const token = localStorage.getItem('token')
    console.log(`[${componentId}] Token available:`, !!token)
    
    const response = await groupService.discoverGroups({
      page: 1,
      limit: 100
    })
    
    console.log(`[${componentId}] Groups API response:`, response)
    console.log(`[${componentId}] Response structure:`, {
      ok: response.ok,
      hasData: !!response.data,
      dataStructure: response.data ? Object.keys(response.data) : 'no data',
      groupsArray: response.data?.data ? response.data.data.length : 'no groups array'
    })
    
    if (response && response.data) {
      console.log(`[${componentId}] Full response structure:`, JSON.stringify(response, null, 2))
      
      let groupsData = null
      if (response.data.data && Array.isArray(response.data.data)) {
        groupsData = response.data.data
        console.log(`[${componentId}] Found groups in response.data.data:`, groupsData.length)
      } else if (Array.isArray(response.data)) {
        groupsData = response.data
        console.log(`[${componentId}] Found groups in response.data:`, groupsData.length)
      } else if (response.data.groups && Array.isArray(response.data.groups)) {
        groupsData = response.data.groups
        console.log(`[${componentId}] Found groups in response.data.groups:`, groupsData.length)
      }
      
      if (groupsData && groupsData.length > 0) {
        groups.value = groupsData
        console.log(`[${componentId}] Groups loaded successfully:`, groups.value.length, 'groups')
        console.log(`[${componentId}] First group sample:`, groups.value[0])
        
        console.log(`[${componentId}] Stats after loading:`, {
          totalMembers: totalMembers.value,
          activeMembers: activeMembers.value,
          monthlyRevenue: monthlyRevenue.value,
          overduePayments: overduePayments.value,
          upcomingEvents: upcomingEvents.value,
          engagementScore: engagementScore.value
        })
      } else {
        console.warn(`[${componentId}] No groups found in response data:`, response.data)
        groups.value = []
      }
    } else {
      console.warn(`[${componentId}] Invalid response structure:`, response)
      groups.value = []
    }
  } catch (error) {
    console.error(`[${componentId}] Error loading groups data:`, error)
    console.error(`[${componentId}] Error details:`, {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    })
    groups.value = []
    dataLoaded.value = false // Reset on error to allow retry
  } finally {
    loading.value = false
  }
}

// Load data on component mount
onMounted(() => {
  loadGroupsData()
})
</script>