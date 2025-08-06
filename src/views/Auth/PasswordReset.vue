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
                <form @submit.prevent="handleEmailSubmit" class="space-y-5" v-if="currentStep === 'email'">
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
                        :disabled="loading"
                    >
                        {{ loading ? 'Sending...' : 'Request Password Reset' }}
                    </button>
                </form>

                <!-- OTP Form -->
                <form @submit.prevent="handleResetSubmit" class="space-y-5" v-if="currentStep === 'otp'">
                    <div>
                        <label for="otp" class="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">OTP</label>
                        <div class="relative text-gray-500 dark:text-gray-400">
                        <input
                            id="otp"
                            v-model="otp"
                            type="text"
                                class="form-input w-full ps-10 placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-[#1b2e4b] dark:text-gray-300 dark:border-gray-700"
                            placeholder="Enter your OTP"
                            required
                        />
                            <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                <icon-mail :fill="true" class="w-5 h-5" />
                            </span>
                        </div>
                    </div>

                    <div>
                        <label for="newPassword" class="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">New Password</label>
                        <div class="relative text-gray-500 dark:text-gray-400">
                        <input
                            id="newPassword"
                            v-model="newPassword"
                            type="password"
                                class="form-input w-full ps-10 placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-[#1b2e4b] dark:text-gray-300 dark:border-gray-700"
                            placeholder="Enter your new password"
                            required
                        />
                            <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                <icon-lock :fill="true" class="w-5 h-5" />
                            </span>
                        </div>
                    </div>

                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-300">Confirm New Password</label>
                        <div class="relative text-gray-500 dark:text-gray-400">
                        <input
                            id="confirmPassword"
                            v-model="confirmPassword"
                            type="password"
                                class="form-input w-full ps-10 placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:bg-[#1b2e4b] dark:text-gray-300 dark:border-gray-700"
                            placeholder="Confirm your new password"
                            required
                        />
                            <span class="absolute start-4 top-1/2 -translate-y-1/2">
                                <icon-lock :fill="true" class="w-5 h-5" />
                            </span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-primary w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
                        :disabled="loading"
                    >
                        {{ loading ? 'Resetting...' : 'Reset Password' }}
                    </button>

                    <div class="text-center">
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Didn't receive OTP? <span class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 cursor-pointer" @click="resendOtp">Resend OTP</span>
                        </p>
                    </div>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import IconMail from '@/components/icon/icon-mail.vue';
import { useAppStore } from '@/stores/index';
import { useToast } from 'vue-toastification';
import authService from '@/services/authService';

const router = useRouter();
const route = useRoute();
const store = useAppStore();
const toast = useToast();

// Form data
const email = ref('');
const otp = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const showSuccess = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const currentStep = ref<'email' | 'otp'>('email');
const resendCooldown = ref(0);

// Check if we have email in route params (from forgot password flow)
onMounted(() => {
    const emailParam = route.query.email as string;
    if (emailParam) {
        email.value = emailParam;
        currentStep.value = 'otp';
    }
});

// Password validation
const isPasswordValid = computed(() => {
    return newPassword.value.length >= 6 && newPassword.value === confirmPassword.value;
});

// Handle email submission (forgot password)
const handleEmailSubmit = async () => {
    if (!email.value) {
        toast.error('Please enter your email address');
        return;
    }
    loading.value = true;
    try {
        await authService.forgotPassword({ email: email.value });
        toast.success('Password reset link sent to your email');
        currentStep.value = 'otp';
        startResendCooldown();
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'Failed to send password reset email';
        toast.error(errorMessage);
    } finally {
        loading.value = false;
    }
};

// Handle password reset submission
const handleResetSubmit = async () => {
    if (!otp.value || !newPassword.value || !confirmPassword.value) {
        toast.error('Please fill in all fields');
        return;
    }

    if (newPassword.value !== confirmPassword.value) {
        toast.error('Passwords do not match');
        return;
    }

    if (newPassword.value.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return;
    }

    loading.value = true;
    try {
        // First verify OTP
        await authService.checkOtp({ 
            email: email.value, 
            otp: otp.value,
            purpose: 'password_reset'
        });
        
        // Then reset password
        await authService.resetPassword({
            email: email.value,
            otp: otp.value,
            newPassword: newPassword.value
        });
        
        showSuccess.value = true;
        toast.success('Password reset successful');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
            router.push('/login');
        }, 3000);
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'Failed to reset password';
        toast.error(errorMessage);
    } finally {
        loading.value = false;
    }
};

// Resend OTP
const resendOtp = async () => {
    if (resendCooldown.value > 0) return;
    
    loading.value = true;
    try {
        await authService.sendOtp({ 
            email: email.value,
            purpose: 'password_reset'
        });
        toast.success('OTP resent successfully');
        startResendCooldown();
    } catch (error: any) {
        const errorMessage = error?.response?.data?.message || 'Failed to resend OTP';
        toast.error(errorMessage);
    } finally {
        loading.value = false;
    }
};

// Start resend cooldown
const startResendCooldown = () => {
    resendCooldown.value = 60;
    const interval = setInterval(() => {
        resendCooldown.value--;
        if (resendCooldown.value <= 0) {
            clearInterval(interval);
        }
    }, 1000);
};
</script> 