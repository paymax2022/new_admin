<template>
  <div class="p-6 space-y-8">
    <!-- Navigation Tabs -->
    <GroupNavigationTabs />

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold mb-1">Dashboard Widgets</h1>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Customize your dashboard layout and widgets.</p>
      </div>
      <div class="flex gap-2">
        <button class="border rounded px-4 py-2 text-sm font-medium flex items-center gap-2" @click="showLayoutModal = true"><span class="material-icons text-base">tune</span>Layout Settings</button>
        <button class="bg-black text-white rounded px-4 py-2 text-sm font-medium flex items-center gap-2" @click="showCreateWidgetModal = true"><span class="material-icons text-base">add</span>Add Widget</button>
      </div>
    </div>
    <!-- Widgets Grid -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <WidgetCard 
        title="Member Statistics" 
        :value="totalMembers.toLocaleString()" 
        subtitle="Total members across all groups" 
        :subvalue="`${groups.length} groups`" 
        icon="UserGroupIcon" 
        iconColor="text-blue-500" 
      />
      <WidgetCard 
        title="Revenue Overview" 
        :value="`₦${monthlyRevenue.toLocaleString()}`" 
        subtitle="Monthly revenue potential" 
        :subvalue="`${groups.filter(g => g.payment_interval === 'monthly').length} monthly groups`" 
        icon="BanknotesIcon" 
        iconColor="text-green-500" 
      />
      <WidgetCard 
        title="Upcoming Events" 
        :value="upcomingEvents.toString()" 
        subtitle="Estimated events this month" 
        :subvalue="`${groups.length} groups`" 
        icon="CalendarDaysIcon" 
        iconColor="text-purple-500" 
      />
      <WidgetCard 
        title="Engagement Metrics" 
        :value="`${engagementScore}%`" 
        subtitle="Overall engagement score" 
        :subvalue="`Active: ${groups.reduce((sum, g) => sum + g.active_members, 0)}`" 
        icon="ChartBarIcon" 
        iconColor="text-cyan-500" 
        trend="up" 
      />
    </div>
    <!-- Add New Widget -->
    <div>
      <h2 class="font-semibold mb-3">Add New Widget</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <WidgetAddOption icon="ChartBarSquareIcon" label="Performance Chart" @click="showPerformanceChartModal = true" />
        <WidgetAddOption icon="ClipboardDocumentListIcon" label="Task List" @click="showTaskListModal = true" />
        <WidgetAddOption icon="BellAlertIcon" label="Alert Panel" @click="showAlertPanelModal = true" />
        <WidgetAddOption icon="RocketLaunchIcon" label="Quick Start" @click="showQuickStatsModal = true" />
      </div>
    </div>
    <LayoutSettingsModal v-if="showLayoutModal" @close="showLayoutModal = false" />
    <CreateWidgetModal v-if="showCreateWidgetModal" @close="showCreateWidgetModal = false" />
    <CreatePerformanceChartModal v-if="showPerformanceChartModal" @close="showPerformanceChartModal = false" />
    <CreateTaskListModal v-if="showTaskListModal" @close="showTaskListModal = false" />
    <CreateAlertPanelModal v-if="showAlertPanelModal" @close="showAlertPanelModal = false" />
    <CreateQuickStatsModal v-if="showQuickStatsModal" @close="showQuickStatsModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetAddOption from '@/components/WidgetAddOption.vue';
import LayoutSettingsModal from '@/components/LayoutSettingsModal.vue';
import CreateWidgetModal from '@/components/CreateWidgetModal.vue';
import CreatePerformanceChartModal from '@/components/CreatePerformanceChartModal.vue';
import CreateTaskListModal from '@/components/CreateTaskListModal.vue';
import CreateAlertPanelModal from '@/components/CreateAlertPanelModal.vue';
import CreateQuickStatsModal from '@/components/CreateQuickStatsModal.vue';
import GroupNavigationTabs from '@/components/GroupNavigationTabs.vue';
import { groupService, type Group } from '@/services/groupService';

const showLayoutModal = ref(false);
const showCreateWidgetModal = ref(false);
const showPerformanceChartModal = ref(false);
const showTaskListModal = ref(false);
const showAlertPanelModal = ref(false);
const showQuickStatsModal = ref(false);
const loading = ref(false);
const groups = ref<Group[]>([]);

// Computed properties for dynamic widget data
const totalMembers = computed(() => {
  return groups.value.reduce((sum, group) => sum + group.total_members, 0);
});

const monthlyRevenue = computed(() => {
  return groups.value.reduce((sum, group) => {
    if (group.payment_interval === 'monthly') {
      return sum + (group.membership_fee * group.total_members);
    }
    return sum;
  }, 0);
});

const upcomingEvents = computed(() => {
  // Mock calculation - in real app this would come from events API
  return groups.value.length * 2; // Average 2 events per group
});

const engagementScore = computed(() => {
  const total = totalMembers.value;
  const active = groups.value.reduce((sum, group) => sum + group.active_members, 0);
  
  if (total > 0) {
    return Math.round((active / total) * 100);
  } else {
    return Math.min(75, groups.value.length * 15);
  }
});

// Load groups data from API
const loadGroupsData = async () => {
  try {
    loading.value = true;
    console.log('Loading groups data for widgets...');
    
    const response = await groupService.discoverGroups({
      page: 1,
      limit: 100
    });
    
    if (response && response.data) {
      let groupsData: Group[] | null = null;
      const responseData = response.data as unknown as { data?: { data?: Group[] } | Group[] } | Group[];
      
      // Check for nested data structure: response.data.data.data
      if (responseData && typeof responseData === 'object' && 'data' in responseData) {
        const nested = responseData.data;
        if (nested && typeof nested === 'object' && 'data' in nested && Array.isArray(nested.data)) {
          groupsData = nested.data;
        } else if (Array.isArray(nested)) {
          groupsData = nested;
        }
      } else if (Array.isArray(responseData)) {
        groupsData = responseData;
      }
      
      if (groupsData && groupsData.length > 0) {
        groups.value = groupsData;
        console.log('Groups loaded for widgets:', groups.value.length, 'groups');
      } else {
        console.warn('No groups data for widgets');
        groups.value = [];
      }
    } else {
      console.warn('No groups data for widgets');
      groups.value = [];
    }
  } catch (error) {
    console.error('Error loading groups data for widgets:', error);
    groups.value = [];
  } finally {
    loading.value = false;
  }
};

// Load data on component mount
onMounted(() => {
  loadGroupsData();
});
</script> 