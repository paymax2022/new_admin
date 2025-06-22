<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-white relative">
    <div class="w-full max-w-md mx-auto">
      <template v-if="step === 1">
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-900">Secure your account with 2FA</h1>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3 mb-6">
          <svg class="h-6 w-6 text-blue-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          <div class="text-sm text-gray-700">Add an extra step to keep your admin account safe. Choose how you'd like to receive your code</div>
        </div>
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-1/2 h-1 bg-blue-600 rounded"></div>
            <div class="w-1/2 h-1 bg-gray-200 rounded"></div>
          </div>
          <div class="text-xs text-gray-500">Step 1 of 2</div>
        </div>
        <form @submit.prevent="onContinue" class="space-y-6">
          <div class="space-y-4">
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" v-model="useEmail" class="form-checkbox h-5 w-5 text-blue-600" />
              <div>
                <span class="font-medium text-gray-900">Use Email</span>
                <div class="text-sm text-gray-500">We'll send a verification code to your email address.</div>
              </div>
            </label>
            <label class="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" v-model="useSMS" class="form-checkbox h-5 w-5 text-blue-600" />
              <div>
                <span class="font-medium text-gray-900">Use SMS</span>
                <div class="text-sm text-gray-500">Receive a 6-digit code on your phone.</div>
              </div>
            </label>
          </div>
          <button type="submit" class="w-full py-2 mt-4 bg-blue-700 text-white rounded-lg font-medium text-lg hover:bg-blue-800 transition">Continue</button>
        </form>
        <div class="mt-4 text-center">
          <a href="#" class="text-blue-700 text-sm hover:underline">Skip for now</a>
        </div>
      </template>
      <template v-else>
        <h1 class="text-2xl font-bold mb-6 text-center text-gray-900">Enter Your 6-Digit Code</h1>
        <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start gap-3 mb-6">
          <svg class="h-6 w-6 text-blue-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
          <div class="text-sm text-gray-700">We've sent a code to Janedoe *** ***.com. Enter it below to continue</div>
        </div>
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <div class="w-1/2 h-1 bg-blue-600 rounded"></div>
            <div class="w-1/2 h-1 bg-blue-600 rounded"></div>
          </div>
          <div class="text-xs text-gray-500">Step 2 of 2</div>
        </div>
        <form @submit.prevent="onVerify" class="space-y-6">
          <div class="flex justify-between gap-2 mb-2">
            <input v-for="(digit, idx) in code" :key="idx" ref="codeInputs" maxlength="1" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code"
              class="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" v-model="code[idx]"
              @input="onInput(idx, $event)" @keydown.backspace="onBackspace(idx, $event)" />
          </div>
          <div class="text-center mb-2">
            <a href="#" class="text-blue-700 text-sm hover:underline">Resend code</a>
          </div>
          <button type="submit" class="w-full py-2 bg-blue-700 text-white rounded-lg font-medium text-lg hover:bg-blue-800 transition">Verify</button>
          <button type="button" @click="step = 1" class="w-full py-2 mt-2 border border-blue-700 text-blue-700 rounded-lg font-medium text-lg hover:bg-blue-50 transition">Change method</button>
        </form>
      </template>
    </div>
    <!-- Success Modal -->
    <transition name="fade">
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-xl shadow-xl p-8 w-full max-w-sm relative flex flex-col items-center">
          <button @click="showSuccessModal = false" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
          <div class="mb-4">
            <svg class="h-12 w-12 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" fill="#22c55e" opacity="0.15"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4" /></svg>
          </div>
          <h2 class="text-xl font-semibold text-center mb-2">Two-Factor Authentication Enabled</h2>
          <p class="text-gray-600 text-center mb-6">Your account is now protected with 2FA. Make sure to keep your backup codes safe.</p>
          <button class="w-full py-2 bg-blue-700 text-white rounded-lg font-medium text-lg hover:bg-blue-800 transition">Return to Dashboard</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
const step = ref(1)
const useEmail = ref(true)
const useSMS = ref(false)
const code = ref(['', '', '', '', '', ''])
const codeInputs = ref([])
const showSuccessModal = ref(false)

function onContinue() {
  step.value = 2
  nextTick(() => {
    if (codeInputs.value[0]) codeInputs.value[0].focus()
  })
}
function onInput(idx, e) {
  const val = e.target.value
  if (/\d/.test(val)) {
    code.value[idx] = val
    if (val && idx < 5 && codeInputs.value[idx + 1]) {
      codeInputs.value[idx + 1].focus()
    }
  } else {
    code.value[idx] = ''
  }
}
function onBackspace(idx, e) {
  if (!code.value[idx] && idx > 0 && codeInputs.value[idx - 1]) {
    codeInputs.value[idx - 1].focus()
  }
}
function onVerify() {
  // Placeholder for verify logic
  showSuccessModal.value = true
}
</script>

<style scoped>
.form-checkbox {
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
