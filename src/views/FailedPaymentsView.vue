<template>
  <div class="p-6 space-y-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Failed Payments</h1>
      <div class="flex gap-2">
        <button class="border rounded px-4 py-2 font-medium" @click="showRemindersModal = true">Send Reminders</button>
        <button class="bg-red-600 text-white rounded px-4 py-2 font-medium" @click="showRetrySettingsModal = true">Retry / Settings</button>
      </div>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
      <div class="rounded-lg bg-white border p-4 text-center">
        <div class="text-xs text-green-700 mb-1">Total Failed</div>
        <div class="text-2xl font-bold text-green-600">23</div>
      </div>
      <div class="rounded-lg bg-white border p-4 text-center">
        <div class="text-xs text-yellow-700 mb-1">Total Revenue</div>
        <div class="text-2xl font-bold text-yellow-600">$1,847</div>
      </div>
      <div class="rounded-lg bg-white border p-4 text-center">
        <div class="text-xs text-blue-700 mb-1">Retry Attempts</div>
        <div class="text-2xl font-bold text-blue-700">15</div>
      </div>
    </div>
    <div>
      <div class="font-semibold mb-2">Failed Payment Details</div>
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="text-left text-gray-500 border-b">
              <th class="py-2 px-4">Member</th>
              <th class="py-2 px-4">Amount</th>
              <th class="py-2 px-4">Payment Method</th>
              <th class="py-2 px-4">Failure Reason</th>
              <th class="py-2 px-4">Date</th>
              <th class="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-4 font-bold">Bob Johnson</td>
              <td class="py-2 px-4">$89.00</td>
              <td class="py-2 px-4">Visa ****9012</td>
              <td class="py-2 px-4 text-red-500">Insufficient funds</td>
              <td class="py-2 px-4">2024-03-01</td>
              <td class="py-2 px-4 flex gap-2"><button class="border rounded px-3 py-1">Retry</button><button class="border rounded px-3 py-1">Contact</button></td>
            </tr>
            <tr>
              <td class="py-2 px-4 font-bold">Alice Brown</td>
              <td class="py-2 px-4">$39.00</td>
              <td class="py-2 px-4">Master ****3436</td>
              <td class="py-2 px-4 text-red-500">Expired card</td>
              <td class="py-2 px-4">2024-02-28</td>
              <td class="py-2 px-4 flex gap-2"><button class="border rounded px-3 py-1">Retry</button><button class="border rounded px-3 py-1">Contact</button></td>
            </tr>
            <tr>
              <td class="py-2 px-4 font-bold">Mike Wilson</td>
              <td class="py-2 px-4">$189.00</td>
              <td class="py-2 px-4">Visa ****7890</td>
              <td class="py-2 px-4 text-red-500">Card declined</td>
              <td class="py-2 px-4">2024-02-25</td>
              <td class="py-2 px-4 flex gap-2"><button class="border rounded px-3 py-1">Retry</button><button class="border rounded px-3 py-1">Contact</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-if="showRemindersModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showRemindersModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Send Payment Reminders</h2>
        <form @submit.prevent="handleSendReminders">
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Plan Name</label>
            <select v-model="reminder.plan" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select Reminder</option>
              <option>Basic</option>
              <option>Premium</option>
              <option>Enterprise</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Recipients</label>
            <select v-model="reminder.recipients" class="w-full border rounded px-3 py-2" required>
              <option value="" disabled>Select recipient</option>
              <option>All with failed payments</option>
              <option>Bob Johnson</option>
              <option>Alice Brown</option>
              <option>Mike Wilson</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Custom Message (Optional)</label>
            <textarea v-model="reminder.message" class="w-full border rounded px-3 py-2" placeholder="Add a personal message to the reminder..." rows="2"></textarea>
          </div>
          <div class="mb-4 flex flex-col gap-2">
            <label class="inline-flex items-center gap-2">
              <input type="checkbox" v-model="reminder.includeLinks" class="accent-orange-500" />
              <span>Include payment links</span>
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="checkbox" v-model="reminder.sendImmediately" class="accent-orange-500" />
              <span>Send immediately</span>
            </label>
          </div>
          <div class="mb-4">
            <div class="bg-orange-50 rounded p-3 text-orange-700 text-xs">
              This will send reminders to 0-23 members with failed payments.
            </div>
          </div>
          <div class="flex gap-2 mt-6">
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Send reminders</button>
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showRemindersModal = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div v-if="showRetrySettingsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showRetrySettingsModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Retry Settings</h2>
        <form @submit.prevent="handleSaveRetrySettings">
          <div class="mb-4 flex items-center gap-2">
            <input type="checkbox" v-model="retrySettings.enableRetry" class="accent-black" id="enableRetry" />
            <label for="enableRetry" class="text-sm font-medium">Enable automatic payment retry</label>
          </div>
          <template v-if="retrySettings.enableRetry">
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Number of retry attempts</label>
              <div class="flex items-center gap-2">
                <span>1</span>
                <input type="range" min="1" max="5" v-model.number="retrySettings.attempts" class="flex-1" />
                <span>5</span>
                <span class="ml-2">{{ retrySettings.attempts }} attempts</span>
              </div>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium mb-1">Retry interval (hours)</label>
              <select v-model="retrySettings.interval" class="w-full border rounded px-3 py-2">
                <option value="" disabled>Select interval</option>
                <option>1</option>
                <option>6</option>
                <option>12</option>
                <option>24</option>
                <option>48</option>
              </select>
            </div>
            <div class="mb-4 flex items-center gap-2">
              <input type="checkbox" v-model="retrySettings.enableEscalation" class="accent-black" id="enableEscalation" />
              <label for="enableEscalation" class="text-sm font-medium">Enable escalation after failed retries</label>
            </div>
          </template>
          <div class="mb-4 flex flex-col gap-2">
            <label class="inline-flex items-center gap-2">
              <input type="checkbox" v-model="retrySettings.notifyAdmin" class="accent-black" />
              <span>Notify admin of failed payments</span>
            </label>
            <label class="inline-flex items-center gap-2">
              <input type="checkbox" v-model="retrySettings.suspendAccount" class="accent-black" />
              <span>Suspend account after failed retries</span>
            </label>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Grace period before suspension (days)</label>
            <input v-model="retrySettings.gracePeriod" type="number" min="0" class="w-24 border rounded px-3 py-2" />
          </div>
          <div class="flex gap-2 mt-6">
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Save Settings</button>
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showRetrySettingsModal = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showRemindersModal = ref(false);
const reminder = ref({ plan: '', recipients: '', message: '', includeLinks: false, sendImmediately: false });
function handleSendReminders() {
  // Logic to send reminders
  showRemindersModal.value = false;
  reminder.value = { plan: '', recipients: '', message: '', includeLinks: false, sendImmediately: false };
}
const showRetrySettingsModal = ref(false);
const retrySettings = ref({
  enableRetry: true,
  attempts: 3,
  interval: '',
  enableEscalation: true,
  notifyAdmin: true,
  suspendAccount: false,
  gracePeriod: 3
});
function handleSaveRetrySettings() {
  // Logic to save retry settings
  showRetrySettingsModal.value = false;
}
</script> 