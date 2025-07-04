<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" @click.self="emit('close')">
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Participation Analytics</h2>
        <button @click="emit('close')" class="text-gray-400 hover:text-gray-600 text-xl">&times;</button>
      </div>
      <div class="mb-4 flex gap-2">
        <div class="flex-1">
          <label class="block text-xs font-medium mb-1">Select Poll</label>
          <select class="w-full border rounded px-3 py-2 text-sm">
            <option>Select Poll</option>
            <option>Preferred Event Time</option>
            <option>Member Satisfaction Survey</option>
          </select>
        </div>
      </div>
      <div class="mb-4 flex gap-2">
        <button :class="['px-3 py-1 rounded font-medium', tab === 'Overview' ? 'border-b-2 border-black' : 'text-gray-400']" @click="tab = 'Overview'">Overview</button>
        <button :class="['px-3 py-1 rounded font-medium', tab === 'Trends' ? 'border-b-2 border-black' : 'text-gray-400']" @click="tab = 'Trends'">Trends</button>
        <button :class="['px-3 py-1 rounded font-medium', tab === 'Demographics' ? 'border-b-2 border-black' : 'text-gray-400']" @click="tab = 'Demographics'">Demographics</button>
        <button :class="['px-3 py-1 rounded font-medium', tab === 'Behavior' ? 'border-b-2 border-black' : 'text-gray-400']" @click="tab = 'Behavior'">Behavior</button>
      </div>
      <div v-if="tab === 'Overview'">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <div class="text-2xl font-bold text-blue-600">234</div>
            <div class="text-gray-500 text-xs">Total Responses</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <div class="text-2xl font-bold text-green-600">47%</div>
            <div class="text-gray-500 text-xs">Participation Rate</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <div class="text-2xl font-bold text-yellow-600">24h</div>
            <div class="text-gray-500 text-xs">Peak Participation</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
            <div class="text-2xl font-bold text-purple-600">89%</div>
            <div class="text-gray-500 text-xs">Completion Rate</div>
          </div>
        </div>
        <div class="mb-4">
          <div class="font-medium mb-2">Participation Progress Over Time</div>
          <div v-for="(bar, idx) in progressBars" :key="idx" class="flex items-center gap-2 mb-1">
            <div class="w-24 text-xs text-gray-500">Hour {{ idx + 1 }}</div>
            <div class="flex-1 h-2 bg-gray-200 rounded">
              <div class="h-2 bg-black rounded" :style="{ width: bar.width + '%' }"></div>
            </div>
            <div class="w-20 text-xs text-gray-500 text-right">{{ bar.value }} participants</div>
          </div>
        </div>
        <div class="mb-2 font-medium">Key insights</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <ul class="text-green-700">
            <li class="font-semibold mb-1">What's Working Well</li>
            <li>Strong initial response in first 24 hours</li>
            <li>High completion rate (89%)</li>
            <li>Good engagement from premium members</li>
            <li>Peak participation during work hours</li>
          </ul>
          <ul class="text-yellow-700">
            <li class="font-semibold mb-1">Areas for Improvement</li>
            <li>Low student member participation</li>
            <li>Viewer engagement drops significantly</li>
            <li>Reminders could be better optimized</li>
            <li>Consider smaller campaigns</li>
          </ul>
        </div>
      </div>
      <div v-else-if="tab === 'Trends'">
        <div class="mb-4 font-medium">Participation Trends</div>
        <div class="bg-gray-50 rounded flex items-center justify-center h-32 mb-6 text-gray-400">
          Participation trend chart<br />Time-based participation visualization
        </div>
        <div class="mb-2 font-medium">Time of Day Analysis</div>
        <div v-for="(bar, idx) in timeOfDayBars" :key="idx" class="flex items-center gap-2 mb-1">
          <div class="w-24 text-xs text-gray-500">{{ bar.label }}</div>
          <div class="flex-1 h-2 bg-gray-200 rounded">
            <div class="h-2 bg-black rounded" :style="{ width: bar.width + '%' }"></div>
          </div>
          <div class="w-32 text-xs text-gray-500 text-right">{{ bar.value }} participants ({{ bar.percent }}%)</div>
        </div>
      </div>
      <div v-else-if="tab === 'Demographics'">
        <div class="mb-4 font-medium">Participation by Membership Type</div>
        <div v-for="(bar, idx) in membershipBars" :key="idx" class="flex items-center gap-2 mb-1">
          <div class="w-40 text-xs text-gray-500">{{ bar.label }}</div>
          <div class="flex-1 h-2 bg-gray-200 rounded">
            <div class="h-2 bg-black rounded" :style="{ width: bar.width + '%' }"></div>
          </div>
          <div class="w-32 text-xs text-gray-500 text-right">{{ bar.value }} ({{ bar.percent }}%)</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div class="bg-gray-50 rounded flex flex-col items-center justify-center h-32 text-gray-400">
            <div class="font-medium mb-2">Age Group Distribution</div>
            <div>Age group chart</div>
          </div>
          <div class="bg-gray-50 rounded flex flex-col items-center justify-center h-32 text-gray-400">
            <div class="font-medium mb-2">Geographic Distribution</div>
            <div>Geographic map</div>
          </div>
        </div>
      </div>
      <div v-else-if="tab === 'Behavior'">
        <div class="mb-6">
          <div class="font-medium mb-2">Device Usage</div>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <div class="w-24 text-xs text-gray-500">Mobile</div>
              <div class="flex-1 h-2 bg-gray-200 rounded">
                <div class="h-2 bg-black rounded" :style="{ width: '70%' }"></div>
              </div>
              <div class="w-32 text-xs text-gray-500 text-right">145 users (70%)</div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-24 text-xs text-gray-500">Desktop</div>
              <div class="flex-1 h-2 bg-gray-200 rounded">
                <div class="h-2 bg-black rounded" :style="{ width: '29%' }"></div>
              </div>
              <div class="w-32 text-xs text-gray-500 text-right">60 users (29%)</div>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-24 text-xs text-gray-500">Tablet</div>
              <div class="flex-1 h-2 bg-gray-200 rounded">
                <div class="h-2 bg-black rounded" :style="{ width: '1%' }"></div>
              </div>
              <div class="w-32 text-xs text-gray-500 text-right">2 users (1%)</div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <div class="font-medium mb-2">Engagement Patterns</div>
            <div class="text-xs text-gray-700 space-y-1">
              <div class="flex justify-between"><span>Average time to complete:</span> <span>2m 34s</span></div>
              <div class="flex justify-between"><span>Deep-skit rate:</span> <span>11%</span></div>
              <div class="flex justify-between"><span>Return participants:</span> <span>78%</span></div>
              <div class="flex justify-between"><span>Social shares:</span> <span>29</span></div>
            </div>
          </div>
          <div>
            <div class="font-medium mb-2">Response Quality</div>
            <div class="text-xs text-gray-700 space-y-1">
              <div class="flex justify-between"><span>Complete responses:</span> <span>88%</span></div>
              <div class="flex justify-between"><span>Partial responses:</span> <span>6%</span></div>
              <div class="flex justify-between"><span>Repeat questions:</span> <span>3%</span></div>
              <div class="flex justify-between"><span>Average engagement:</span> <span>High</span></div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-gray-400 text-center py-12">Coming soon...</div>
      </div>
      <div class="flex justify-end gap-2 mt-6">
        <button type="button" @click="emit('close')" class="px-4 py-2 rounded border">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['close']);
const tab = ref('Overview');
const progressBars = [
  { width: 20, value: 45 },
  { width: 35, value: 78 },
  { width: 60, value: 113 },
  { width: 100, value: 185 },
];
const timeOfDayBars = [
  { label: '8AM - 12PM', width: 20, value: 78, percent: 23 },
  { label: '12PM - 6PM', width: 64, value: 217, percent: 64 },
  { label: '6PM - 12AM', width: 13, value: 45, percent: 13 },
  { label: '12AM - 8AM', width: 5, value: 17, percent: 5 },
];
const membershipBars = [
  { label: 'Premium Members', width: 95, value: '217/228', percent: 95 },
  { label: 'Basic Members', width: 65, value: '152/235', percent: 65 },
  { label: 'Staff Members', width: 60, value: '26/43', percent: 60 },
];
</script> 