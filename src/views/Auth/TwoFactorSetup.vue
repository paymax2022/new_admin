<template>
    <div class="flex min-h-screen bg-white dark:bg-[#0e1726]">
        <div class="flex flex-col items-center justify-center w-full px-4">
            <div class="w-full max-w-[440px] mx-auto">
                <!-- Step 1: Choose 2FA Method -->
                <div v-if="currentStep === 1">
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Secure your account with 2FA</h1>
                        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md flex items-start space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="text-sm text-gray-600 dark:text-gray-300">Add an extra step to keep your admin account safe. Choose how you'd like to receive your code</p>
                        </div>
                    </div>

                    <div class="mb-4">
                        <p class="text-xs text-gray-500 dark:text-gray-400">Step 1 of 2</p>
                        <div class="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                            <div class="h-1 bg-blue-600 rounded-full w-1/2"></div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <label class="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-500">
                            <input type="radio" v-model="method" value="email" class="form-radio text-blue-600" />
                            <div>
                                <p class="font-medium text-gray-800 dark:text-white">Use Email</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">We'll send a verification code to your email address.</p>
                            </div>
                        </label>

                        <label class="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-500">
                            <input type="radio" v-model="method" value="sms" class="form-radio text-blue-600" />
                            <div>
                                <p class="font-medium text-gray-800 dark:text-white">Use SMS</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Receive a 6-digit code on your phone.</p>
                            </div>
                        </label>
                    </div>

                    <button 
                        @click="handleContinue"
                        class="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                    >
                        Continue
                    </button>

                    <button 
                        @click="handleSkip"
                        class="w-full mt-3 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                        Skip for now
                    </button>
                </div>

                <!-- Step 2: Enter Verification Code -->
                <div v-if="currentStep === 2">
                    <div class="mb-6">
                        <h1 class="text-2xl font-bold mb-3 text-gray-800 dark:text-white">Enter Your 6-Digit Code</h1>
                        <div class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md flex items-start space-x-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p class="text-sm text-gray-600 dark:text-gray-300">
                                We've sent a code to {{ maskedDestination }}. Enter it below to continue
                            </p>
                        </div>
                    </div>

                    <div class="mb-6">
                        <p class="text-xs text-gray-500 dark:text-gray-400">Step 2 of 2</p>
                        <div class="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                            <div class="h-1 bg-blue-600 rounded-full w-full"></div>
                        </div>
                    </div>

                    <div class="grid grid-cols-6 gap-2 mb-6">
                        <input
                            v-for="i in 6"
                            :key="i"
                            type="text"
                            maxlength="1"
                            v-model="code[i-1]"
                            @input="handleCodeInput($event, i)"
                            @keydown.delete="handleBackspace($event, i)"
                            class="w-full h-12 text-center text-lg border rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            :ref="el => codeInputs[i-1] = el"
                        />
                    </div>

                    <button 
                        @click="handleResendCode"
                        class="w-full text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 mb-6"
                    >
                        Resend code
                    </button>

                    <button 
                        @click="handleVerify"
                        class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                    >
                        Verify
                    </button>

                    <button 
                        @click="handleChangeMethod"
                        class="w-full mt-3 py-3 px-4 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300"
                    >
                        Change method
                    </button>
                </div>

                <!-- Step 3: Success Modal -->
                <TransitionRoot appear :show="showSuccessModal" as="template">
                    <Dialog as="div" @close="closeSuccessModal" class="relative z-50">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
                        </TransitionChild>

                        <div class="fixed inset-0 overflow-y-auto">
                            <div class="flex min-h-full items-center justify-center p-4">
                                <TransitionChild
                                    as="template"
                                    enter="duration-300 ease-out"
                                    enter-from="opacity-0 scale-95"
                                    enter-to="opacity-100 scale-100"
                                    leave="duration-200 ease-in"
                                    leave-from="opacity-100 scale-100"
                                    leave-to="opacity-0 scale-95"
                                >
                                    <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-center align-middle shadow-xl transition-all">
                                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                            <svg class="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        
                                        <div class="mt-3">
                                            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                                                Two-Factor Authentication Enabled
                                            </h3>
                                            <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                                Your account is now protected with 2FA. Make sure to keep your backup codes safe.
                                            </p>
                                        </div>

                                        <div class="mt-4">
                                            <button
                                                @click="returnToDashboard"
                                                class="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300"
                                            >
                                                Return to Dashboard
                                            </button>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </TransitionRoot>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, type ComponentPublicInstance } from 'vue';
import { useRouter } from 'vue-router';
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';

const router = useRouter();
const currentStep = ref(1);
const method = ref('email');
const code = ref(['', '', '', '', '', '']);

// ✅ Explicitly type the array contents:
const codeInputs = ref<(Element | ComponentPublicInstance | null)[]>([]);

const showSuccessModal = ref(false);

const maskedDestination = computed(() => {
    if (method.value === 'email') {
        return 'j****@****.com';
    }
    return '+1 *** *** 1234';
});

const handleContinue = () => {
    if (method.value) {
        currentStep.value = 2;
    }
};

const handleSkip = () => {
    router.push('/dashboard');
};

const handleCodeInput = (event: Event, index: number) => {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Ensure only numbers
    if (!/^\d*$/.test(value)) {
        input.value = '';
        return;
    }

    // Move to next input
    if (value && index < 6) {
        const codeInputs = ref<(ComponentPublicInstance | null)[]>([]);
    }
};

// const codeInputs = ref<(HTMLInputElement | null)[]>([]);

const handleBackspace = (event: KeyboardEvent, index: number) => {
  if (event.key === 'Backspace' && !code.value[index - 1] && index > 1) {
    const prevInput = codeInputs.value[index - 2];
    if (prevInput instanceof HTMLInputElement) {
      prevInput.focus();
    }
  }
};


const handleResendCode = () => {
    // Implement resend code logic
    console.log('Resending code...');
};

const handleVerify = () => {
    const fullCode = code.value.join('');
    if (fullCode.length === 6) {
        showSuccessModal.value = true;
    }
};

const handleChangeMethod = () => {
    currentStep.value = 1;
    code.value = ['', '', '', '', '', ''];
};

const closeSuccessModal = () => {
    showSuccessModal.value = false;
};

const returnToDashboard = () => {
    router.push('/dashboard');
};
</script> 