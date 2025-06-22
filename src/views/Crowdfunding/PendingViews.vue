<template>
    <div class="md:p-6 p-4">
        <!-- Page Header -->
        <div class="lg:flex lg:justify-between lg:py-2">
            <div class="text-lg font-bold text-gray-800 mb-6">Campaign Details</div>
            <div class="flex gap-5">
                <button @click="openModal('approve')" class="bg-green-600 text-white px-4 py-1 rounded-md h-10 w-30">Approve</button>
                <button @click="openModal('reject')" class="bg-red-600 text-white px-4 py-1 rounded-md h-10 w-30">Reject</button>
            </div>
        </div>

        <!-- Dynamic Modal -->
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-24 bg-black bg-opacity-50">
            <div class="bg-white w-full max-w-md rounded-lg shadow-lg overflow-hidden">
                <!-- Modal Header -->
                <div class="px-6 py-4 border-b border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-800">Confirmation Alert</h3>
                </div>

                <!-- Modal Body -->
                <div class="px-6 py-4 border-b border-gray-200">
                    <p class="text-gray-700 text-sm">
                        {{ modalType === 'approve'
                            ? 'Are you sure you want to approve this campaign?'
                            : 'Are you sure you want to reject this campaign?' }}
                    </p>
                </div>

                <!-- Modal Footer -->
                <div class="px-6 py-4 flex justify-end space-x-4">
                    <button
                        @click="modalType === 'approve' ? confirmApprove() : confirmReject()"
                        class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                        Yes
                    </button>
                    <button
                        @click="showModal = false"
                        class="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
                    >
                        No
                    </button>
                </div>
            </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="border-b border-gray-200 mb-6 mt-4">
            <nav class="flex space-x-6 overflow-x-auto">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                        'whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm',
                        activeTab === tab.id
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    ]"
                >
                    {{ tab.name }}
                </button>
            </nav>
        </div>

        <!-- Tab Content -->
        <div class="space-y-8">
            <!-- Overview Tab -->
            <div v-if="activeTab === 'overview'" class="space-y-6">
                <section class="min-h-[80vh]">
                    <div class="flex justify-center">
                        <img :src="CampaignImage" alt="Campaign" class="w-full max-w-xs sm:max-w-md md:w-70 md:h-60 rounded-lg object-cover" />
                    </div>

                    <div class="mt-8 space-y-6">
                        <div
                            class="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-gray-300 pt-4"
                            v-for="(item, idx) in overviewItems"
                            :key="idx"
                        >
                            <span class="text-gray-800 font-bold text-lg mb-1 sm:mb-0">{{ item.label }}</span>
                            <span class="text-gray-600 font-semibold text-lg">{{ item.value }}</span>
                        </div>

                        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-gray-300 pt-4">
                            <div class="text-gray-800 font-bold text-lg mb-1 sm:mb-0">Deadline</div>
                            <div class="flex flex-col items-end">
                                <span class="px-3 py-1 border-red-600 border rounded-lg text-red-600 text-sm">30 days left</span>
                                <span class="text-gray-600 font-semibold text-lg">20-10-2025</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8">
                        <div class="text-lg font-bold mb-2">Description</div>
                        <div class="border-t border-gray-300 mb-4"></div>
                        <p class="text-lg font-semibold">Please Help a patient who received 2 years of Cancer treatment - start a new life</p>
                    </div>
                </section>
            </div>

            <!-- Donation Tab -->
            <div v-if="activeTab === 'donation'">
                <div class="space-y-6">
                    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-4">
                        <div class="text-gray-800 font-bold text-lg mb-1 sm:mb-0">Goal Amount</div>
                        <div class="flex flex-col items-end">
                            <span class="text-gray-600 font-semibold text-lg">$1,000.00</span>
                        </div>
                    </div>

                    <div
                        class="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t border-gray-300 pt-4"
                        v-for="(item, idx) in donationItems"
                        :key="idx"
                    >
                        <span class="text-gray-800 font-bold text-lg mb-1 sm:mb-0">{{ item.label }}</span>
                        <span class="text-gray-600 font-semibold text-lg">{{ item.value }}</span>
                    </div>
                </div>

                <div class="mt-16">
                    <div class="text-lg font-bold mb-4">Latest Donations</div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full border border-gray-300 divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Donated At</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="(row, index) in latestDonations" :key="index" class="hover:bg-gray-100">
                                    <td class="px-4 py-2 text-sm text-gray-900">{{ row[0] }}</td>
                                    <td class="px-4 py-2 text-sm text-gray-900">{{ row[1] }}</td>
                                    <td class="px-4 py-2 text-sm text-gray-900">{{ row[2] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Gallery Tab -->
            <div v-if="activeTab === 'gallery'" class="">
                <div class="flex justify-start">
                    <img :src="CampaignImage" alt="Campaign" class="w-full max-w-xs sm:max-w-md md:w-70 md:h-60 rounded-lg object-cover" />
                </div>
            </div>

            <!-- Documents Tab -->
            <div v-if="activeTab === 'documents'" class="">
                <div class="text-center text-gray-500">No documents found</div>
            </div>

            <!-- FAQs Tab -->
            <div v-if="activeTab === 'faqs'" class="">
                <div class="space-y-6">
                    <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 pb-6 last:border-0">
                        <button
                            @click="toggleFAQ(index)"
                            class="flex items-center justify-between w-full text-left focus:outline-none"
                            aria-controls="faq-content"
                        >
                            <h3 class="text-lg font-medium text-gray-800">{{ faq.question }}</h3>
                            <svg
                                :class="{ 'rotate-180': openFaqs[index] }"
                                class="w-5 h-5 text-gray-500 transition-transform duration-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        <transition
                            enter-active-class="transition duration-100 ease-out"
                            enter-from-class="transform scale-95 opacity-0"
                            enter-to-class="transform scale-100 opacity-100"
                            leave-active-class="transition duration-75 ease-in"
                            leave-from-class="transform scale-100 opacity-100"
                            leave-to-class="transform scale-95 opacity-0"
                        >
                            <div v-show="openFaqs[index]" id="faq-content" class="mt-2 text-gray-600">
                                <p>{{ faq.answer }}</p>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>

            <!-- Reviews Tab -->
            <div v-if="activeTab === 'reviews'" class="">
                <div class="text-center text-gray-500">No reviews found</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CampaignImage from '@/assets/image/campaignImage.png';

// Modal Logic
const modalType = ref('');
const showModal = ref(false);

const openModal = (type) => {
    modalType.value = type;
    showModal.value = true;
};

const confirmApprove = () => {
    console.log('Campaign approved!');
    // Add your approval logic here
    showModal.value = false;
};

const confirmReject = () => {
    console.log('Campaign rejected!');
    // Add your rejection logic here
    showModal.value = false;
};

// Tab System
const tabs = [
    { id: 'overview', name: 'Campaign Overview' },
    { id: 'donation', name: 'Donation Config' },
    { id: 'gallery', name: 'Gallery' },
    { id: 'documents', name: 'Documents' },
    { id: 'faqs', name: 'FAQs' },
    { id: 'reviews', name: 'Reviews' },
];

const activeTab = ref('overview');

// Data
const overviewItems = [
    { label: 'Donation Reason', value: 'Personal' },
    { label: 'Campaign Owner', value: 'Em geetech (emgeetech)' },
    { label: 'Title', value: 'Help a patient who received 2 years of Cancer treatment - start a new life.' },
    { label: 'Category', value: 'Health' },
    { label: 'Status', value: 'Pending' },
    { label: 'Is Featured', value: 'No' },
];

const donationItems = [
    { label: 'Raised Amount', value: '$0.00' },
    { label: 'Total Donors', value: '0' },
    { label: 'Donation Completed Stage', value: '0%' },
    { label: 'Donation Progress', value: 'null' },
];

const latestDonations = [
    ['Alfonso Bribiesca', '$9,999.00', '22-10-2025'],
    ['Saida Redondo', '$9,999.00', '22-10-2022'],
];

const faqs = ref([
    {
        question: 'Is there pain still?',
        answer: 'This would be the answer explaining about current pain management and status.',
    },
    {
        question: 'How can I donate?',
        answer: 'You can donate by clicking the donation button on the campaign page and following the payment instructions.',
    },
    {
        question: 'Where does my donation go?',
        answer: "100% of donations go directly to supporting the patient's treatment and recovery needs.",
    },
    {
        question: 'Is my donation tax-deductible?',
        answer: "Yes, all donations are tax-deductible. You'll receive a receipt for your records.",
    },
]);

// FAQ Toggle System
const openFaqs = ref(faqs.value.map(() => false));

const toggleFAQ = (index) => {
    openFaqs.value[index] = !openFaqs.value[index];
};
</script>
