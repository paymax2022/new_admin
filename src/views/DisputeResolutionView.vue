<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dispute Resolution</h1>
        <p class="text-gray-600 dark:text-gray-400">Manage payment disputes, refunds, and escalations</p>
      </div>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <DashboardCard
        title="Open Disputes"
        value="18"
        icon="warning"
        color="purple"
      />
      <DashboardCard
        title="In Progress"
        value="12"
        icon="shield"
        color="yellow"
      />
      <DashboardCard
        title="Escalated"
        value="18"
        icon="x-circle"
        color="red"
      />
      <DashboardCard
        title="Resolved"
        value="92%"
        icon="check-circle"
        color="green"
      />
    </div>

    <!-- Dispute Cases Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Dispute Cases</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">View and manage all payment disputes across the platform</p>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search dispute by ID, School or Category"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
      </div>

      <!-- Dispute Status Tabs -->
      <div class="px-6 border-b border-gray-200 dark:border-gray-700">
        <nav class="-mb-px flex space-x-8">
          <button 
            @click="activeTab = 'all'"
            :class="activeTab === 'all' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            All Dispute
          </button>
          <button 
            @click="activeTab = 'open'"
            :class="activeTab === 'open' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Open
          </button>
          <button 
            @click="activeTab = 'inProgress'"
            :class="activeTab === 'inProgress' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            In progress
          </button>
          <button 
            @click="activeTab = 'escalated'"
            :class="activeTab === 'escalated' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Escalated
          </button>
        </nav>
      </div>

      <!-- Dispute Cases Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Case ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                School
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Parent
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Amount (N)
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date Opened
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="dispute in filteredDisputes" :key="dispute.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ dispute.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ dispute.school }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ dispute.parent }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                (N){{ dispute.amount }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ dispute.type }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ dispute.dateOpened }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(dispute.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ dispute.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-2">
                  <button @click="viewDispute(dispute)" class="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700 dark:text-gray-300">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredDisputes.length }} entries (filtered from {{ disputesData.length }} total entries)
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="goToPage(1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &lt;&lt;
            </button>
            <button
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &lt;
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="page !== '...' ? goToPage(page as number) : null"
              :disabled="page === '...'"
              :class="page === currentPage ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-50'"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md"
            >
              {{ page }}
            </button>
            <button
              @click="goToPage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &gt;
            </button>
            <button
              @click="goToPage(totalPages)"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              &gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Dispute Details Modal -->
    <div v-if="showDisputeModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 shadow-lg bg-white ml-auto">
        <div class="h-full flex flex-col">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-3 py-1 text-sm font-semibold bg-gray-900 text-white rounded-full">
                Dispute #{{ selectedDispute?.id }}
              </span>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ selectedDispute?.school }} • {{ selectedDispute?.parent }}</h3>
                <p class="text-sm text-gray-600">Dispute details and communication</p>
              </div>
            </div>
            <button @click="closeDisputeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Dispute Information -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <span :class="getStatusClass(selectedDispute?.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ selectedDispute?.status }}
                </span>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Type</h4>
                <p class="text-sm font-semibold text-gray-900">{{ selectedDispute?.type }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Amount</h4>
                <p class="text-sm font-semibold text-gray-900">₦{{ selectedDispute?.amount }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Date Opened</h4>
                <p class="text-sm font-semibold text-gray-900">{{ selectedDispute?.dateOpened }}</p>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-500 mb-2">Description</h4>
              <p class="text-sm text-gray-900">Parent claims double payment for school fees.</p>
            </div>

            <!-- Tabs -->
            <div class="border-b border-gray-200 mb-6">
              <nav class="-mb-px flex space-x-8">
                <button 
                  @click="activeDisputeTab = 'communication'"
                  :class="activeDisputeTab === 'communication' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                  class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Communication
                </button>
                <button 
                  @click="activeDisputeTab = 'history'"
                  :class="activeDisputeTab === 'history' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                  class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Dispute History
                </button>
              </nav>
            </div>

            <!-- Communication Tab Content -->
            <div v-if="activeDisputeTab === 'communication'">
              <!-- Communication History -->
              <div class="space-y-4 mb-6">
                <div class="bg-blue-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-sm font-semibold text-blue-900">CJ John Doe</span>
                      <span class="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Parent</span>
                    </div>
                    <span class="text-xs text-blue-600">5/15/2023, 10:30:00 AM</span>
                  </div>
                  <p class="text-sm text-blue-800">I believe I was charged twice for the same fee. I've attached my bank statement showing both transactions.</p>
                </div>
                
                <div class="bg-purple-50 rounded-lg p-4">
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-sm font-semibold text-purple-900">CJ Sarah Wilson</span>
                      <span class="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">School admin</span>
                    </div>
                    <span class="text-xs text-purple-600">5/16/2023, 9:15:00 AM</span>
                  </div>
                  <p class="text-sm text-purple-800">I believe I was charged twice for the same fee. I've attached my bank statement showing both transactions.</p>
                </div>
              </div>

              <!-- Message Input -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">Type a message...</label>
                <textarea
                  v-model="disputeMessage"
                  rows="4"
                  placeholder="Type your message here..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
            </div>

            <!-- Dispute History Tab Content -->
            <div v-if="activeDisputeTab === 'history'">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        By
                      </th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        5/14/2023
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        Dispute Opened
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        John Doe
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600">
                        Parent submitted dispute claiming double payment.
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        5/15/2023
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        Assigned
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        Admin
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600">
                        Dispute assigned to finance team for review.
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        5/16/2023
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        Evidence Requested
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        Finance Team
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600">
                        Requested payment receipts from parent.
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        5/17/2023
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        Evidence Provided
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        John Doe
                      </td>
                      <td class="px-4 py-3 text-sm text-gray-600">
                        Parent uploaded payment receipts showing duplicate transactions.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Bottom Action Bar -->
          <div class="p-6 border-t border-gray-200 bg-gray-50">
            <div class="flex flex-wrap gap-3">
              <button @click="escalateDispute" class="px-4 py-2 border border-red-500 text-red-600 rounded-md hover:bg-red-50 text-sm">
                Escalate
              </button>
              <button @click="markDisputeResolved" class="px-4 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50 text-sm">
                Mark as resolved
              </button>
              <button @click="closeDisputeModal" class="px-4 py-2 border border-gray-500 text-gray-600 rounded-md hover:bg-gray-50 text-sm">
                Close
              </button>
              <button @click="processRefund" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">
                Process refund
              </button>
              <button @click="sendDisputeMessage" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 text-sm flex items-center space-x-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import DashboardCard from '@/components/DashboardCard.vue'

// Reactive data
const activeTab = ref('open')

// Dispute data
const disputesData = ref([
  {
    id: 'DSP001',
    school: 'Heritage Grammar School',
    parent: 'John Doe',
    amount: '25,000',
    type: 'Refund Request',
    dateOpened: '5/14/2023',
    status: 'inprogress'
  },
  {
    id: 'DSP002',
    school: 'Greenfield Academy',
    parent: 'John Doe',
    amount: '25,000',
    type: 'Refund Request',
    dateOpened: '5/14/2023',
    status: 'open'
  },
  {
    id: 'DSP003',
    school: 'St. Michael\'s College',
    parent: 'John Doe',
    amount: '25,000',
    type: 'Refund Request',
    dateOpened: '5/14/2023',
    status: 'resolved'
  },
  {
    id: 'DSP004',
    school: 'Westpoint International',
    parent: 'John Doe',
    amount: '25,000',
    type: 'Refund Request',
    dateOpened: '5/14/2023',
    status: 'escalated'
  },
  {
    id: 'DSP005',
    school: 'Horizon Educational Center',
    parent: 'John Doe',
    amount: '25,000',
    type: 'Refund Request',
    dateOpened: '5/14/2023',
    status: 'inprogress'
  }
])

// Modal state
const showDisputeModal = ref(false)
const selectedDispute = ref<any>(null)
const resolutionNotes = ref('')
const selectedDisputeStatus = ref('')
const activeDisputeTab = ref('communication')
const disputeMessage = ref('')

// Search and filter
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed properties for disputes
const filteredDisputes = computed(() => {
  let filtered = disputesData.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(dispute => 
      dispute.school.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      dispute.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      dispute.type.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by active tab
  if (activeTab.value !== 'all') {
    if (activeTab.value === 'open') {
      filtered = filtered.filter(dispute => dispute.status.toLowerCase() === 'open')
    } else if (activeTab.value === 'inProgress') {
      filtered = filtered.filter(dispute => dispute.status.toLowerCase() === 'inprogress')
    } else if (activeTab.value === 'escalated') {
      filtered = filtered.filter(dispute => dispute.status.toLowerCase() === 'escalated')
    }
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredDisputes.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredDisputes.value.length))

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const total = totalPages.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage.value <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (currentPage.value >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage.value - 1; i <= currentPage.value + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Watch effect to update selectedDispute status
watch(() => selectedDisputeStatus.value, (newStatus) => {
  if (selectedDispute.value) {
    selectedDispute.value.status = newStatus
  }
}, { immediate: true })

// Functions
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved':
      return 'bg-green-100 text-green-800'
    case 'inprogress':
      return 'bg-orange-100 text-orange-800'
    case 'open':
      return 'bg-blue-100 text-blue-800'
    case 'escalated':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Functions for dispute modal
const viewDispute = (dispute: any) => {
  selectedDispute.value = dispute
  selectedDisputeStatus.value = dispute.status
  showDisputeModal.value = true
}

const closeDisputeModal = () => {
  showDisputeModal.value = false
  selectedDispute.value = null
  resolutionNotes.value = ''
  selectedDisputeStatus.value = ''
  activeDisputeTab.value = 'communication'
  disputeMessage.value = ''
}

const updateDisputeStatus = () => {
  if (selectedDispute.value) {
    selectedDispute.value.status = selectedDisputeStatus.value
    console.log('Dispute status updated:', {
      disputeId: selectedDispute.value.id,
      newStatus: selectedDispute.value.status,
      notes: resolutionNotes.value
    })
    
    // Here you would typically update the dispute status in the backend
    // For now, we'll just close the modal
    closeDisputeModal()
  }
}

// New dispute action functions
const escalateDispute = () => {
  if (selectedDispute.value) {
    selectedDispute.value.status = 'escalated'
    selectedDisputeStatus.value = 'escalated'
    console.log('Dispute escalated:', selectedDispute.value.id)
  }
}

const markDisputeResolved = () => {
  if (selectedDispute.value) {
    selectedDispute.value.status = 'resolved'
    selectedDisputeStatus.value = 'resolved'
    console.log('Dispute marked as resolved:', selectedDispute.value.id)
  }
}

const processRefund = () => {
  if (selectedDispute.value) {
    console.log('Processing refund for dispute:', selectedDispute.value.id)
    // Here you would typically process the refund through the payment system
    alert('Refund processing initiated for dispute ' + selectedDispute.value.id)
  }
}

const sendDisputeMessage = () => {
  if (!disputeMessage.value.trim()) {
    alert('Please enter a message to send.')
    return
  }

  console.log('Message sent for dispute:', {
    disputeId: selectedDispute.value?.id,
    message: disputeMessage.value,
    timestamp: new Date().toISOString()
  })

  // Here you would typically send the message to the backend
  // For now, we'll just clear the message
  disputeMessage.value = ''
  alert('Message sent successfully!')
}

// Lifecycle
onMounted(() => {
  console.log('Dispute Resolution page mounted')
})
</script>
