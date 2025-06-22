<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Backup & Restore</h1>
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Configure the system settings and preferences.</p>
    <div class="mb-6">
      <nav class="flex gap-2" aria-label="Tabs">
        <button v-for="tab in tabs" :key="tab" @click="selectedTab = tab" :class="[selectedTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200', 'px-4 py-2 rounded font-medium text-sm focus:outline-none']">
          {{ tab }}
        </button>
      </nav>
    </div>
    <div v-if="selectedTab === 'Backup'">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Create Backup</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Create a backup of your system data</p>
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Type</label>
          <select v-model="form.type" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option>Full Backup</option>
            <option>Users Only</option>
            <option>Transactions only</option>
            <option>Settings Only</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Compression Level</label>
          <select v-model="form.compression" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
            <option>None</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </form>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Name (Optional)</label>
        <input v-model="form.name" type="text" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" placeholder="e.g. Pre-update backup" />
      </div>
      <div class="flex items-center mb-4">
        <input id="media" type="checkbox" v-model="form.includeMedia" class="toggle mr-2" />
        <label for="media" class="text-sm text-gray-700 dark:text-gray-200">Include Media Files</label>
        <span class="ml-2 text-xs text-gray-400">Include uploaded images and documents.</span>
      </div>
      <div class="flex items-center mb-6">
        <input id="encrypt" type="checkbox" v-model="form.encrypt" class="toggle mr-2" />
        <label for="encrypt" class="text-sm text-gray-700 dark:text-gray-200">Encrypt Backup</label>
        <span class="ml-2 text-xs text-gray-400">Secure backup with password protection</span>
      </div>
      <div class="flex gap-2 justify-between">
        <button type="button" class="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
          <span class="mr-2">⬇️</span> Download Last Backup
        </button>
        <button type="submit" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium flex items-center">
          <span class="mr-2">🔄</span> Start Backup
        </button>
      </div>
    </div>
    <div v-else-if="selectedTab === 'Restore'">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Restore System</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Restore your system from a previous backup</p>
      <div class="mb-6">
        <div class="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div class="text-4xl mb-2 text-blue-500">🗂️</div>
          <div class="font-medium text-gray-700 dark:text-gray-200 mb-1">Upload Backup File</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mb-3">Drag and drop your backup file here, or click to browse</div>
          <button class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">Select Backup File</button>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Or Restore from Recent Backup</label>
        <select v-model="selectedBackup" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100 mb-2">
          <option value="">Select a backup</option>
          <option v-for="b in recentBackups" :key="b.date" :value="b.date">{{ b.date }} - {{ b.size }} MB</option>
        </select>
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded divide-y divide-gray-100 dark:divide-gray-800">
          <div v-for="b in recentBackups" :key="b.date" class="flex justify-between items-center px-4 py-2 text-sm">
            <span>{{ b.date }}</span>
            <span class="text-xs text-gray-500">{{ b.size }} MB</span>
          </div>
        </div>
      </div>
      <div class="flex items-center mb-4">
        <input id="overwrite" type="checkbox" v-model="overwrite" class="toggle mr-2" />
        <label for="overwrite" class="text-sm text-gray-700 dark:text-gray-200">Overwrite Existing Data</label>
        <span class="ml-2 text-xs text-gray-400">Replace all existing data with backup data</span>
      </div>
      <div class="mb-4">
        <div class="flex items-center bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <span class="text-yellow-600 mr-2">⚠️</span>
          <span class="text-sm text-yellow-700">Restoring a backup will replace your current data. This action cannot be undone. Make sure you have a recent backup before proceeding.</span>
        </div>
      </div>
      <div class="flex justify-center">
        <button class="w-full max-w-xs py-3 rounded bg-red-600 text-white font-semibold flex items-center justify-center gap-2 text-base hover:bg-red-700">
          <span class="text-xl">⟳</span> Restore System
        </button>
      </div>
    </div>
    <div v-else-if="selectedTab === 'Settings'">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Backup Settings</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Configure automatic backup settings</p>
      <div class="flex items-center mb-6">
        <input id="auto-backup" type="checkbox" v-model="settings.automatic" class="toggle mr-2" />
        <label for="auto-backup" class="text-sm text-gray-700 dark:text-gray-200">Automatic Backups</label>
        <span class="ml-2 text-xs text-gray-400">Enable scheduled automatic backups</span>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Frequency</label>
        <select v-model="settings.frequency" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
          <option value="">Select a backup</option>
          <option value="hourly">Hourly</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Time</label>
        <input v-model="settings.time" type="time" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Retention Policy</label>
        <select v-model="settings.retention" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
          <option value="all">Keep All Backups</option>
          <option value="7">Keep last 7 days Backups</option>
          <option value="30">Keep last 30 days Backups</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Backup Storage Location</label>
        <select v-model="settings.storage" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100">
          <option value="local">Local Storage</option>
          <option value="gcs">Google Cloud Storage</option>
          <option value="s3">Amazon S3</option>
        </select>
      </div>
      <div class="flex items-center mb-6">
        <input id="email-notify" type="checkbox" v-model="settings.emailNotify" class="toggle mr-2" />
        <label for="email-notify" class="text-sm text-gray-700 dark:text-gray-200">Email Notifications</label>
        <span class="ml-2 text-xs text-gray-400">Send email notifications for backup status</span>
      </div>
      <div class="flex justify-center">
        <button class="w-full max-w-xs py-3 rounded bg-blue-600 text-white font-semibold flex items-center justify-center gap-2 text-base hover:bg-blue-700">
          <span class="text-xl">💾</span> Save Settings
        </button>
      </div>
    </div>
    <div v-else-if="selectedTab === 'History'">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Backup & Restore</h2>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">History of all backups</p>
      <div class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Backup ID</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Date</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Time</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Size</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Type</th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, idx) in paginatedHistory" :key="row.id" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.id }}</td>
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.date }}</td>
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.time }}</td>
              <td class="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{{ row.size }} MB</td>
              <td class="px-4 py-2 text-sm">
                <span :class="row.type === 'Automatic' ? 'bg-gray-100 text-gray-800' : 'bg-blue-600 text-white'" class="inline-block px-3 py-1 rounded-full text-xs font-semibold">
                  {{ row.type }}
                </span>
              </td>
              <td class="px-4 py-2 text-sm flex gap-2">
                <button class="text-gray-500 hover:text-blue-600" title="Download"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" /></svg></button>
                <button class="text-gray-500 hover:text-green-600" title="Restore"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582M20 20v-5h-.581M5.635 19.364A9 9 0 104.582 9.582" /></svg></button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex items-center justify-between px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <span>Showing 0 to 0 of entries (filtered from 0 total entries)</span>
          <div class="flex gap-1">
            <button v-for="n in totalPages" :key="n" @click="historyPage = n" :class="[historyPage === n ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200', 'px-2 py-1 rounded border border-gray-300 dark:border-gray-600']">{{ n }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const tabs = ['Backup', 'Restore', 'Settings', 'History']
const selectedTab = ref('Backup')
const form = ref({
  type: 'Full Backup',
  compression: 'None',
  name: '',
  includeMedia: true,
  encrypt: false
})
const recentBackups = ref([
  { date: '2023-04-08 (02:30:00)', size: 42.5 },
  { date: '2023-04-08 (02:30:00)', size: 42.5 },
  { date: '2023-04-08 (02:30:00)', size: 42.5 },
])
const selectedBackup = ref('')
const overwrite = ref(true)
const settings = ref({
  automatic: true,
  frequency: '',
  time: '02:30',
  retention: 'all',
  storage: 'local',
  emailNotify: true
})
const historyData = ref([
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Automatic' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Manual' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Automatic' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Automatic' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Manual' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Automatic' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Automatic' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Manual' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Automatic' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Automatic' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Manual' },
  { id: 'BK-20230408-001', date: '2023-04-08', time: '02:30:00', size: 42.5, type: 'Automatic' },
])
const historyPage = ref(1)
const perPage = 10
const totalPages = computed(() => Math.ceil(historyData.value.length / perPage))
const paginatedHistory = computed(() => historyData.value.slice((historyPage.value-1)*perPage, historyPage.value*perPage))
</script>

<style scoped>
.toggle {
  width: 2rem;
  height: 1.1rem;
  background: #e5e7eb;
  border-radius: 9999px;
  position: relative;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: background 0.2s;
}
.toggle:checked {
  background: #2563eb;
}
.toggle:before {
  content: '';
  position: absolute;
  left: 0.2rem;
  top: 0.15rem;
  width: 0.8rem;
  height: 0.8rem;
  background: #fff;
  border-radius: 9999px;
  transition: transform 0.2s;
}
.toggle:checked:before {
  transform: translateX(0.9rem);
}
</style>
