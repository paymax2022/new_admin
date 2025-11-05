<template>
  <div class="min-h-screen bg-white p-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-1">Eviction Management</h1>
        <p class="text-xs text-gray-600">Manage contestant evictions and override settings</p>
      </div>
      <div class="flex items-center gap-3">
        <!-- View History Button -->
        <button class="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View History
        </button>
        <!-- Process Evictions Button -->
        <button @click="processEvictions" class="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Process Evictions
        </button>
      </div>
    </div>

    <!-- Eviction Round Active Banner -->
    <div class="bg-gradient-to-r from-purple-500 via-purple-400 to-orange-400 rounded-2xl shadow-lg p-6 mb-6">
      <div class="flex items-center justify-between">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-white mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h1 class="text-2xl font-bold text-white mb-1">Eviction Round Active</h1>
            <p class="text-sm text-white/90">3 contestants are currently at risk. Review and confirm evictions by Friday 11:59 PM</p>
          </div>
        </div>
        <button class="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg shadow-md transition-colors duration-200">
          Review Now
        </button>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-6 border-b border-gray-200 mb-6">
      <button @click="activeTab = 'current'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'current' ? 'text-gray-900' : 'text-gray-500'">Current Evictions</span>
        <div v-if="activeTab === 'current'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'settings'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'settings' ? 'text-gray-900' : 'text-gray-500'">Eviction Settings</span>
        <div v-if="activeTab === 'settings'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
      <button @click="activeTab = 'history'" class="pb-2 relative">
        <span class="text-sm font-medium" :class="activeTab === 'history' ? 'text-gray-900' : 'text-gray-500'">Eviction History</span>
        <div v-if="activeTab === 'history'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
      </button>
    </div>

    <!-- Contestants at Risk Section -->
    <div v-if="activeTab === 'current'">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Contestants at Risk</h2>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="divide-y divide-gray-200">
          <div v-for="(contestant, index) in contestantsAtRisk" :key="index" class="p-6 hover:bg-gray-50 transition-colors">
            <div class="grid grid-cols-12 gap-6 items-center">
              <!-- Contestant Information -->
              <div class="col-span-3">
                <h3 class="text-base font-semibold text-gray-900 mb-1">{{ contestant.name }}</h3>
                <p class="text-xs text-gray-500">{{ contestant.id }}</p>
              </div>

              <!-- Current Votes -->
              <div class="col-span-2">
                <p class="text-base font-semibold text-gray-900">{{ contestant.votes }}</p>
              </div>

              <!-- Position -->
              <div class="col-span-2">
                <p class="text-base font-semibold text-gray-900">{{ contestant.position }}</p>
              </div>

              <!-- Risk Level -->
              <div class="col-span-2">
                <p class="text-base font-semibold text-red-600">{{ contestant.riskLevel }}</p>
              </div>

              <!-- Status/Tag -->
              <div class="col-span-1">
                <span :class="getStatusBadgeClass(contestant.status)" class="inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full">
                  {{ contestant.status }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="col-span-2 flex items-center gap-2 justify-end">
                <button @click="handleSave(contestant)" class="px-4 py-1.5 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 whitespace-nowrap">
                  Save
                </button>
                <button @click="handleEvict(contestant)" class="px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 whitespace-nowrap">
                  Evict
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Eviction Settings Tab -->
    <div v-if="activeTab === 'settings'">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Eviction Settings</h2>
      <div class="grid grid-cols-2 gap-6">
        <!-- Left Section: Auto Eviction Rules -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-base font-semibold text-gray-900 mb-6">Auto Eviction Rules</h3>
          
          <!-- Enable Auto Eviction -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Enable Auto Eviction</p>
                <p class="text-xs text-gray-500">Automatically mark lowest-voted contestants.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.enableAutoEviction" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          <!-- Contestants to Mark (Weekly) -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">Contestants to Mark (Weekly)</label>
            <input v-model="settings.contestantsToMark" type="text" placeholder="Enter number of Contestants" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>

          <!-- Eviction Day -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">Eviction Day</label>
            <div class="relative">
              <select v-model="settings.evictionDay" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white">
                <option value="">Select eviction days</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Eviction Time -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Eviction Time</label>
            <input v-model="settings.evictionTime" type="text" placeholder="00:00" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
        </div>

        <!-- Right Section: Admin Override Settings -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h3 class="text-base font-semibold text-gray-900 mb-6">Admin Override Settings</h3>
          
          <!-- Enable Manual Override -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Enable Manual Override</p>
                <p class="text-xs text-gray-500">Allow admin to save contestants.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.enableManualOverride" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          <!-- Max Saves per Week -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-900 mb-2">Max Saves per Week</label>
            <input v-model="settings.maxSavesPerWeek" type="text" placeholder="Enter number" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>

          <!-- Auto-Invite Standby -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">Auto-Invite Standby</p>
                <p class="text-xs text-gray-500">Automatically invite standby contestants.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.autoInviteStandby" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          <!-- Save Settings Button -->
          <button @click="saveSettings" class="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors">
            Save Settings
          </button>
        </div>
      </div>
    </div>

    <!-- Eviction History Tab -->
    <div v-if="activeTab === 'history'">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Eviction History</h2>
      <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div class="divide-y divide-gray-200">
          <div v-for="(history, index) in evictionHistory" :key="index" class="p-6 hover:bg-gray-50 transition-colors">
            <div class="grid grid-cols-12 gap-6 items-center">
              <!-- Week and Date -->
              <div class="col-span-3">
                <h3 class="text-base font-semibold text-gray-900 mb-1">{{ history.week }}</h3>
                <p class="text-xs text-gray-500">{{ history.date }}</p>
              </div>

              <!-- Number of Contestants -->
              <div class="col-span-2">
                <p class="text-sm text-gray-900">{{ history.contestants }} Contestants</p>
              </div>

              <!-- Eviction Type -->
              <div class="col-span-5">
                <div class="flex flex-col gap-1">
                  <p class="text-sm text-gray-900">{{ history.evictionType }}</p>
                  <span v-if="history.adminOverride" class="inline-flex items-center px-2.5 py-0.5 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full w-fit">
                    Admin Override
                  </span>
                </div>
              </div>

              <!-- View Details Button -->
              <div class="col-span-2 flex justify-end">
                <button @click="viewDetails(history)" class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 whitespace-nowrap">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Eviction Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 class="text-2xl font-bold text-gray-900">Eviction Details - {{ selectedHistory?.week || '' }}</h2>
          <button @click="showDetailsModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6 space-y-6">
          <!-- Eviction Summary -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Eviction Summary</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Date</p>
                <p class="text-sm font-semibold text-gray-900">{{ selectedHistory?.date || '' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Week</p>
                <p class="text-sm font-semibold text-gray-900">{{ selectedHistory?.week || '' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Contestants Evicted</p>
                <p class="text-sm font-semibold text-gray-900">{{ selectedHistory?.contestants || '' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Reason</p>
                <p class="text-sm font-semibold text-gray-900">{{ selectedHistory?.evictionType || '' }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Admin Override</p>
                <p class="text-sm font-semibold text-gray-900">{{ selectedHistory?.adminOverride ? 'Yes' : 'No' }}</p>
              </div>
            </div>
          </div>

          <!-- Voting Statistics -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Voting Statistics</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-xs text-gray-500 mb-1">Total Votes Cast</p>
                <p class="text-sm font-semibold text-gray-900">1,234,567</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Lowest Vote Count</p>
                <p class="text-sm font-semibold text-gray-900">1,245</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Highest Vote Count</p>
                <p class="text-sm font-semibold text-gray-900">98,432</p>
              </div>
              <div>
                <p class="text-xs text-gray-500 mb-1">Vote Gap</p>
                <p class="text-sm font-semibold text-gray-900">97,187</p>
              </div>
            </div>
          </div>

          <!-- Evicted Contestants -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-4">Evicted Contestants</h3>
            <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Name</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">ID</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Final Votes</th>
                    <th class="px-4 py-3 text-left text-xs font-semibold text-gray-900 uppercase">Position</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="(contestant, index) in evictedContestants" :key="index" class="hover:bg-gray-50">
                    <td class="px-4 py-3 text-sm text-gray-900">{{ contestant.name }}</td>
                    <td class="px-4 py-3 text-sm text-gray-500">{{ contestant.id }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900">{{ contestant.finalVotes }}</td>
                    <td class="px-4 py-3 text-sm text-gray-900">{{ contestant.position }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notifications -->
    <div class="fixed bottom-4 right-4 z-50 space-y-3">
      <!-- Evicted Toast -->
      <transition name="toast">
        <div v-if="toasts.evicted.show" class="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-sm">
          <p class="text-sm font-bold text-gray-900 mb-1">Marked for Eviction</p>
          <p class="text-xs text-gray-700">Contestant {{ toasts.evicted.contestantId }} has been marked for eviction</p>
        </div>
      </transition>

      <!-- Saved Toast -->
      <transition name="toast">
        <div v-if="toasts.saved.show" class="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-lg max-w-sm">
          <p class="text-sm font-bold text-gray-900 mb-1">Contestant Saved</p>
          <p class="text-xs text-gray-700">Contestant {{ toasts.saved.contestantId }} has been saved from eviction</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('current');

const contestantsAtRisk = ref([
  {
    name: 'Jennifer Adams',
    id: 'CID-067',
    votes: '1,245',
    position: '#125',
    riskLevel: 'High',
    status: 'Auto-Marked',
  },
  {
    name: 'Jennifer Adams',
    id: 'CID-067',
    votes: '1,245',
    position: '#125',
    riskLevel: 'High',
    status: 'Auto-Marked',
  },
  {
    name: 'Jennifer Adams',
    id: 'CID-067',
    votes: '1,245',
    position: '#125',
    riskLevel: 'High',
    status: 'Medium',
  },
]);

const getStatusBadgeClass = (status: string) => {
  if (status === 'Auto-Marked') {
    return 'bg-yellow-200 text-gray-700';
  } else if (status === 'Medium') {
    return 'bg-gray-200 text-gray-700';
  }
  return 'bg-gray-200 text-gray-700';
};

// Toast Notifications
const toasts = ref({
  evicted: {
    show: false,
    contestantId: '',
  },
  saved: {
    show: false,
    contestantId: '',
  },
});

const showToast = (type: 'evicted' | 'saved', contestantId: string) => {
  // Hide any existing toast of the same type
  toasts.value[type].show = false;
  
  // Show new toast
  setTimeout(() => {
    toasts.value[type].show = true;
    toasts.value[type].contestantId = contestantId;
  }, 10);

  // Auto-hide after 3 seconds
  setTimeout(() => {
    toasts.value[type].show = false;
  }, 3000);
};

// Eviction Settings
const settings = ref({
  enableAutoEviction: false,
  contestantsToMark: '',
  evictionDay: '',
  evictionTime: '00:00',
  enableManualOverride: true,
  maxSavesPerWeek: '',
  autoInviteStandby: true,
});

const saveSettings = () => {
  // TODO: Implement save settings logic
  console.log('Saving settings:', settings.value);
};

// Eviction History
const evictionHistory = ref([
  {
    week: 'Week 3',
    date: '2024-01-15',
    contestants: '5',
    evictionType: 'Auto Eviction - Lowest Votes',
    adminOverride: false,
  },
  {
    week: 'Week 3',
    date: '2024-01-15',
    contestants: '5',
    evictionType: 'Auto Eviction - Lowest Votes',
    adminOverride: true,
  },
  {
    week: 'Week 3',
    date: '2024-01-16',
    contestants: '5',
    evictionType: 'Auto Eviction - Lowest Votes',
    adminOverride: false,
  },
]);

// Eviction Details Modal
const showDetailsModal = ref(false);
const selectedHistory = ref<{
  week: string;
  date: string;
  contestants: string;
  evictionType: string;
  adminOverride: boolean;
} | null>(null);

const evictedContestants = ref([
  {
    name: 'Jennifer Adams',
    id: 'CID-067',
    finalVotes: '1,245',
    position: '#125',
  },
  {
    name: 'Jennifer Adams',
    id: 'CID-067',
    finalVotes: '1,245',
    position: '#125',
  },
  {
    name: 'Jennifer Adams',
    id: 'CID-067',
    finalVotes: '1,245',
    position: '#125',
  },
]);

const processEvictions = () => {
  // Create current eviction data based on current state
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  
  selectedHistory.value = {
    week: 'Week 3',
    date: formattedDate,
    contestants: contestantsAtRisk.value.length.toString(),
    evictionType: 'Auto Eviction - Lowest Votes',
    adminOverride: false,
  };
  showDetailsModal.value = true;
};

const viewDetails = (history: { week: string; date: string; contestants: string; evictionType: string; adminOverride: boolean }) => {
  selectedHistory.value = history;
  showDetailsModal.value = true;
};

const handleSave = (contestant: { id: string }) => {
  // TODO: Implement save logic
  showToast('saved', contestant.id);
};

const handleEvict = (contestant: { id: string }) => {
  // TODO: Implement evict logic
  showToast('evicted', contestant.id);
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

