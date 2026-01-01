<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Disputes & Incident Management</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Handle customer disputes and incidents</p>
            </div>
            <button 
                @click="openCreateIncidentModal"
                class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
            >
                Create Incident Report
            </button>
        </div>

        <!-- Filter Tabs -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="[
                        'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
                        activeTab === tab.id
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    ]"
                >
                    {{ tab.label }} ({{ tab.count }})
                </button>
            </div>
        </div>

        <!-- Disputes Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ticket ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rider / Driver</th>
                            <!-- New Tab Columns -->
                            <template v-if="activeTab === 'new'">
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned Agent</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">SLA</th>
                            </template>
                            <!-- In Review Tab Columns -->
                            <template v-if="activeTab === 'in-review'">
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                            </template>
                            <!-- Resolved Tab Columns -->
                            <template v-if="activeTab === 'resolved'">
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Resolution</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Resolved By</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                            </template>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr 
                            v-for="dispute in filteredDisputes" 
                            :key="dispute.id"
                            class="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ dispute.ticketId }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ dispute.rider }}</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">vs {{ dispute.driver }}</p>
                                </div>
                            </td>
                            <!-- New Tab Content -->
                            <template v-if="activeTab === 'new'">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ dispute.type }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ dispute.assignedAgent || 'Agent 01' }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                                        <ClockIcon class="h-4 w-4" />
                                        <span class="text-sm font-medium">{{ dispute.sla || '19h left' }}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button
                                        @click="openReviewModal(dispute)"
                                        class="px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-xs font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                                    >
                                        Continue
                                    </button>
                                </td>
                            </template>
                            <!-- In Review Tab Content -->
                            <template v-if="activeTab === 'in-review'">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ dispute.type }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span 
                                        :class="[
                                            'px-2 py-1 text-xs font-medium rounded',
                                            dispute.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                                            dispute.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                            'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                        ]"
                                    >
                                        {{ dispute.priority }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ dispute.created }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button
                                        @click="openReviewModal(dispute)"
                                        class="px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-xs font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                                    >
                                        Review
                                    </button>
                                </td>
                            </template>
                            <!-- Resolved Tab Content -->
                            <template v-if="activeTab === 'resolved'">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                                        {{ dispute.resolution || 'Refund Issued' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ dispute.resolvedBy || 'Agent 02' }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ dispute.resolvedDate || dispute.created }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button
                                        @click="openReviewModal(dispute)"
                                        class="px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-xs font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                                    >
                                        View
                                    </button>
                                </td>
                            </template>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Dispute Detail Modal -->
        <div
            v-if="showReviewModal && selectedDispute"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showReviewModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Dispute Detail - {{ selectedDispute.ticketId }}</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Review dispute information and take action</p>
                    </div>
                    <button
                        @click="showReviewModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Dispute Information Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Dispute Information</h3>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Type:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDispute.type }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Priority:</span>
                                <span 
                                    :class="[
                                        'px-2 py-1 text-xs font-medium rounded',
                                        selectedDispute.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                                        selectedDispute.priority === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                                        'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ selectedDispute.priority }}
                                </span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Rider:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDispute.rider }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Driver:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDispute.driver }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Created:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedDispute.created }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Attachments Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Attachments</h3>
                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <PaperClipIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">File</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">3.5MB</p>
                                </div>
                            </div>
                            <button class="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">
                                Preview
                            </button>
                        </div>
                    </div>

                    <!-- Timeline Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
                        <div class="space-y-4">
                            <div class="flex items-start gap-3">
                                <div class="flex-shrink-0 mt-0.5">
                                    <div class="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">Dispute filed</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ selectedDispute.created }}</p>
                                </div>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="flex-shrink-0 mt-0.5">
                                    <div class="w-3 h-3 rounded-full bg-blue-200 dark:bg-blue-900/50"></div>
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white">Awaiting review</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showReviewModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                    <button
                        @click="declineRefund"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                        Decline Refund
                    </button>
                    <button
                        @click="approveRefund"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                    >
                        Approve Refund
                    </button>
                </div>
            </div>
        </div>

        <!-- Decline Reason Modal -->
        <div
            v-if="showDeclineModal && selectedDispute"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showDeclineModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Dispute Detail - {{ selectedDispute.ticketId }}</h2>
                    <button
                        @click="showDeclineModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Main Prompt -->
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 dark:text-white uppercase mb-2">INPUT YOUR REASON FOR DECLINE</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            This message will be sent to the user owner. Make it specific and helpful so they can fix the issues and re-apply.
                        </p>
                    </div>

                    <!-- Rejection Message Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <PencilIcon class="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            Write rejection message <span class="text-red-500">(required)</span>
                        </label>
                        <textarea
                            v-model="declineReason"
                            rows="6"
                            placeholder="Reason for rejecting the application"
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        ></textarea>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showDeclineModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="sendDeclineReason"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
    XMarkIcon,
    PaperClipIcon,
    PencilIcon,
    ClockIcon
} from '@heroicons/vue/24/outline'

// Tabs
const tabs = [
    { id: 'new', label: 'New', count: 1 },
    { id: 'in-review', label: 'In Review', count: 1 },
    { id: 'resolved', label: 'Resolved', count: 1 }
]
const activeTab = ref('new')

// Disputes Data
const disputes = ref([
    {
        id: '1',
        ticketId: 'TICKET-4567',
        rider: 'John Doe',
        driver: 'Mike Johnson',
        type: 'Fare Issue',
        priority: 'high',
        created: '2 hours ago',
        status: 'in-review',
        assignedAgent: 'Agent 01',
        sla: '19h left'
    },
    {
        id: '2',
        ticketId: 'TICKET-4568',
        rider: 'Jane Smith',
        driver: 'Sarah Lee',
        type: 'Service Complaint',
        priority: 'medium',
        created: '5 hours ago',
        status: 'new',
        assignedAgent: 'Agent 01',
        sla: '19h left'
    },
    {
        id: '3',
        ticketId: 'TICKET-4569',
        rider: 'Bob Wilson',
        driver: 'Tom Brown',
        type: 'Service Quality',
        priority: 'low',
        created: '1 day ago',
        status: 'resolved',
        resolution: 'Refund Issued',
        resolvedBy: 'Agent 02',
        resolvedDate: '1 day ago'
    }
])

// Filtered Disputes
const filteredDisputes = computed(() => {
    return disputes.value.filter(dispute => dispute.status === activeTab.value)
})

// Review Modal
const showReviewModal = ref(false)
const selectedDispute = ref<any>(null)

// Decline Modal
const showDeclineModal = ref(false)
const declineReason = ref('')

const openCreateIncidentModal = () => {
    // Handle create incident modal logic here
    console.log('Opening create incident modal')
}

const openReviewModal = (dispute: any) => {
    selectedDispute.value = dispute
    showReviewModal.value = true
}

const declineRefund = () => {
    // Show decline reason modal
    declineReason.value = ''
    showReviewModal.value = false
    showDeclineModal.value = true
}

const sendDeclineReason = () => {
    if (!declineReason.value.trim()) {
        alert('Please provide a reason for declining')
        return
    }
    
    // Handle decline refund logic here
    console.log('Declining refund for:', selectedDispute.value?.ticketId)
    console.log('Reason:', declineReason.value)
    
    // You could add logic to send the decline reason, update dispute status, etc.
    showDeclineModal.value = false
    declineReason.value = ''
    selectedDispute.value = null
}

const approveRefund = () => {
    // Handle approve refund logic here
    console.log('Approving refund for:', selectedDispute.value?.ticketId)
    showReviewModal.value = false
    selectedDispute.value = null
}
</script>

