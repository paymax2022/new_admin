<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-semibold mb-4">Subscription Settings</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white border rounded-lg p-6 flex flex-col gap-4">
        <div class="font-semibold mb-2">Payment Gateway Configuration</div>
        <div class="flex items-center justify-between">
          <span>Stripe Integration</span>
          <span class="text-green-600 flex items-center gap-1"><CheckCircleIcon class="w-4 h-4" /> Connected</span>
        </div>
        <div class="flex items-center justify-between">
          <span>PayPal Integration</span>
          <span class="text-green-600 flex items-center gap-1"><CheckCircleIcon class="w-4 h-4" /> Connected</span>
        </div>
        <button class="border rounded px-4 py-2 font-medium mt-2 flex items-center gap-2" @click="showPaymentModal = true"><Cog6ToothIcon class="w-5 h-5" /> Configure Payment Methods</button>
      </div>
      <div class="bg-white border rounded-lg p-6 flex flex-col gap-4">
        <div class="font-semibold mb-2">Compliance Rules</div>
        <div class="flex items-center justify-between">
          <span>Grace Period</span>
          <span>7 days</span>
        </div>
        <div class="flex items-center justify-between">
          <span>Auto-Suspension</span>
          <span>Enabled</span>
        </div>
        <div class="flex items-center justify-between">
          <span>Reminder Frequency</span>
          <span>Every 3 days</span>
        </div>
        <button class="border rounded px-4 py-2 font-medium mt-2 flex items-center gap-2"><AdjustmentsHorizontalIcon class="w-5 h-5" /> Edit Rules</button>
      </div>
    </div>
    <div class="bg-white border rounded-lg p-6">
      <div class="font-semibold mb-4">Automated Actions:</div>
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-medium">Payment Reminder - Day 3</div>
            <div class="text-xs text-gray-500">Automatically send payment reminders</div>
          </div>
          <span class="text-green-600 flex items-center gap-1"><CheckCircleIcon class="w-4 h-4" /> Active</span>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <div class="font-medium">Grace Period Warning - Day 7</div>
            <div class="text-xs text-gray-500">Send grace period notifications</div>
          </div>
          <span class="text-green-600 flex items-center gap-1"><CheckCircleIcon class="w-4 h-4" /> Active</span>
        </div>
        <div class="flex items-center justify-between">
          <div>
            <div class="font-medium">Suspension Notice - Day 14</div>
            <div class="text-xs text-gray-500">Automatic suspension warnings</div>
          </div>
          <span class="text-green-600 flex items-center gap-1"><CheckCircleIcon class="w-4 h-4" /> Active</span>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showPaymentModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
    <div class="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-lg p-0 relative">
      <button class="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl" @click="showPaymentModal = false">&times;</button>
      <div class="px-8 pt-8 pb-4">
        <h2 class="font-semibold text-lg mb-4">Configure Payment Methods</h2>
        <div class="flex gap-2 mb-4 border-b">
          <button v-for="tab in paymentTabs" :key="tab" @click="activeTab = tab" :class="['px-4 py-2 font-medium', activeTab === tab ? 'border-b-2 border-black' : 'text-gray-400']">{{ tab }}</button>
        </div>
        <form v-if="activeTab === 'Stripe' || activeTab === 'PayPal' || activeTab === 'Square'" @submit.prevent="handleSavePaymentConfig">
          <div class="mb-2 flex items-center justify-between">
            <span class="font-medium">{{ activeTab }} Payment Gateway</span>
            <span class="text-green-600">Connected</span>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Publishable Key</label>
            <input v-model="paymentConfig[activeTab].publishableKey" type="text" class="w-full border rounded px-3 py-2" />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">Secret Key</label>
            <input v-model="paymentConfig[activeTab].secretKey" type="password" class="w-full border rounded px-3 py-2" />
          </div>
          <button type="button" class="border rounded px-4 py-2 font-medium mb-4">Test Connection</button>
          <div class="flex gap-2 mt-6">
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Save Configuration</button>
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showPaymentModal = false">Cancel</button>
          </div>
        </form>
        <form v-else-if="activeTab === 'Digital wallet'" @submit.prevent="handleSavePaymentConfig">
          <div class="flex gap-4 mb-6">
            <div class="flex-1 border rounded-lg p-4 flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="digitalWalletConfig.applePay" id="applePay" class="accent-black" />
                <label for="applePay" class="font-medium">Apple Pay</label>
              </div>
              <div class="text-xs text-gray-500">Enable Apple Pay for iOS/Safari users</div>
            </div>
            <div class="flex-1 border rounded-lg p-4 flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <input type="checkbox" v-model="digitalWalletConfig.googlePay" id="googlePay" class="accent-black" />
                <label for="googlePay" class="font-medium">Google Pay</label>
              </div>
              <div class="text-xs text-gray-500">Enable Google Pay for supported browsers</div>
            </div>
          </div>
          <div class="flex gap-2 mt-6">
            <button type="submit" class="flex-1 rounded px-4 py-2 font-medium bg-black text-white hover:bg-gray-800">Save Configuration</button>
            <button type="button" class="flex-1 border rounded px-4 py-2 font-medium" @click="showPaymentModal = false">Cancel</button>
          </div>
        </form>
        <div v-else class="text-gray-400 text-center py-8">{{ activeTab }} configuration coming soon...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircleIcon, Cog6ToothIcon, AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline';
import { ref } from 'vue';
const showPaymentModal = ref(false);
const paymentTabs = ['Stripe', 'PayPal', 'Square', 'Digital wallet'];
const activeTab = ref('Stripe');
const paymentConfig = ref({
  Stripe: { publishableKey: '', secretKey: '' },
  PayPal: { publishableKey: '', secretKey: '' },
  Square: { publishableKey: '', secretKey: '' },
});
const digitalWalletConfig = ref({ applePay: false, googlePay: false });
function handleSavePaymentConfig() {
  // Logic to save payment config
  showPaymentModal.value = false;
}
</script> 