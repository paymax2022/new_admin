<template>
    <div class="flex min-h-screen bg-white dark:bg-[#0e1726]">
        <div class="flex flex-col items-center justify-center w-full px-4">
            <div class="w-full max-w-[440px] mx-auto">
                <!-- Title Section -->
                <div class="mb-10">
                    <h1 class="text-3xl font-bold mb-3 text-gray-800 dark:text-white">Password Reset?</h1>
                    <p class="text-base text-gray-500 dark:text-gray-400">Request a password reset via email.</p>
                </div>

                <!-- Success Message -->
                <div v-if="showSuccess" class="mb-6 p-4 bg-green-50 dark:bg-green-500/20 border border-green-200 dark:border-green-500/30 rounded-md flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 dark:text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-sm text-green-600 dark:text-green-400">Please check your email for a password reset link.</p>
                </div>

                <!-- Form Section -->
                <form @submit.prevent="handleSubmit" class="space-y-5" v-if="!showSuccess">
                    <div>
                        <label for="email" class="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">Email</label>
                        <div class="relative text-gray-500 dark:text-gray-400">
                            <input
                                id="email"
                                v-model="email"
                                type="email"
                                class="form-input w-full ps-10 placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-[#1b2e4b] dark:text-gray-300 dark:border-gray-700"
                                placeholder="Enter your email address"
                                required
                            />
                            <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                <icon-mail :fill="true" class="w-5 h-5" />
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Request Password Reset
                    </button>
                </form>

                <!-- Back to Login Link -->
                <div class="mt-6 text-center">
                    <router-link
                        to="/login"
                        class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition duration-300"
                    >
                        Back to Login
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import IconMail from '@/components/icon/icon-mail.vue';
import { useAppStore } from '@/stores/index';

const router = useRouter();
const store = useAppStore();
const email = ref('');
const showSuccess = ref(false);

const handleSubmit = async () => {
    try {
        // Here you would typically make an API call to request password reset
        console.log('Password reset requested for:', email.value);
        // Show success message
        showSuccess.value = true;
        // Optional: Redirect after a delay
        setTimeout(() => {
            router.push('/login');
        }, 3000);
    } catch (error) {
        console.error('Password reset request failed:', error);
    }
};
</script> 