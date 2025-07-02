<template>
  <div class="p-6 space-y-8">
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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      <WidgetCard title="Member Statistics" value="2847" subtitle="14 of 16 goals complete" subvalue="92% to KPI" icon="UserGroupIcon" iconColor="text-blue-500" />
      <WidgetCard title="Revenue Overview" value="$142,350" subtitle="Monthly revenue" subvalue="+8% last month" icon="BanknotesIcon" iconColor="text-green-500" />
      <WidgetCard title="Upcoming Events" value="3" subtitle="This Week" subvalue="12 This Month" icon="CalendarDaysIcon" iconColor="text-purple-500" />
      <WidgetCard title="Engagement Metrics" value="87%" subtitle="Engagement Score" subvalue="Active: 564" icon="ChartBarIcon" iconColor="text-cyan-500" trend="up" />
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
import { ref } from 'vue';
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetAddOption from '@/components/WidgetAddOption.vue';
import LayoutSettingsModal from '@/components/LayoutSettingsModal.vue';
import CreateWidgetModal from '@/components/CreateWidgetModal.vue';
import CreatePerformanceChartModal from '@/components/CreatePerformanceChartModal.vue';
import CreateTaskListModal from '@/components/CreateTaskListModal.vue';
import CreateAlertPanelModal from '@/components/CreateAlertPanelModal.vue';
import CreateQuickStatsModal from '@/components/CreateQuickStatsModal.vue';
const showLayoutModal = ref(false);
const showCreateWidgetModal = ref(false);
const showPerformanceChartModal = ref(false);
const showTaskListModal = ref(false);
const showAlertPanelModal = ref(false);
const showQuickStatsModal = ref(false);
</script> 