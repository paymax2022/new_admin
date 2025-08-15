<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Support Tickets</h1>
        <p class="text-gray-600 dark:text-gray-400">Manage and assign support tickets across the platform</p>
      </div>
      <button @click="showCreateModal = true" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center space-x-2">
        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>Create Ticket</span>
      </button>
    </div>

    <!-- Key Metrics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <DashboardCard
        title="Open Tickets"
        value="18"
        icon="info"
        color="purple"
      />
      <DashboardCard
        title="In Progress"
        value="12"
        icon="clock"
        color="yellow"
      />
      <DashboardCard
        title="Resolved"
        value="18"
        icon="check"
        color="red"
      />
      <DashboardCard
        title="Response Rate"
        value="92%"
        icon="chat"
        color="green"
      />
    </div>

    <!-- Support Ticket Management Section -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Support Ticket Management</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">Assign and monitor support tickets from schools and parents</p>
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
            placeholder="Search ticket by ID, School or Category"
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
        </div>
      </div>

      <!-- Ticket Status Tabs -->
      <div class="px-6 border-b border-gray-200 dark:border-gray-700">
        <nav class="-mb-px flex space-x-8">
          <button 
            @click="activeTab = 'all'"
            :class="activeTab === 'all' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            All Tickets
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
            In Progress
          </button>
          <button 
            @click="activeTab = 'resolved'"
            :class="activeTab === 'resolved' ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
            class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
          >
            Resolved
          </button>
        </nav>
      </div>

      <!-- Support Tickets Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Ticket ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                School
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Subject
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Date Opened
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Priority
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
            <tr v-for="ticket in filteredTickets" :key="ticket.id" class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {{ ticket.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ ticket.school }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ ticket.subject }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ ticket.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                {{ ticket.dateOpened }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getPriorityClass(ticket.priority)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ ticket.priority }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(ticket.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ ticket.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                <div class="flex items-center space-x-2">
                  <button @click="viewTicket(ticket)" class="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View</span>
                  </button>
                  <button @click="assignTicket(ticket)" class="text-green-600 hover:text-green-900 flex items-center space-x-1">
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span>Assign</span>
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
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredTickets.length }} entries (filtered from {{ ticketsData.length }} total entries)
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

    <!-- Ticket Details Modal -->
    <div v-if="showTicketModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 shadow-lg bg-white ml-auto">
        <div class="h-full flex flex-col">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-3 py-1 text-sm font-semibold bg-gray-900 text-white rounded-full">
                {{ selectedTicket?.id }}
              </span>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Support Ticket Details</h3>
                <p class="text-sm text-gray-600">Details and communications for the support ticket.</p>
              </div>
            </div>
            <button @click="closeTicketModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <!-- Ticket Information -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">School</h4>
                <p class="text-sm font-semibold text-gray-900">{{ selectedTicket?.school }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Date Opened</h4>
                <p class="text-sm font-semibold text-gray-900">{{ selectedTicket?.dateOpened }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Category</h4>
                <p class="text-sm font-semibold text-gray-900">{{ selectedTicket?.category }}</p>
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-1">Status</h4>
                <span :class="getStatusClass(selectedTicket?.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                  {{ selectedTicket?.status }}
                </span>
              </div>
            </div>

            <!-- Subject -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-500 mb-2">Subject</h4>
              <p class="text-lg font-semibold text-gray-900">{{ selectedTicket?.subject }}</p>
            </div>

            <!-- Description -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-500 mb-2">Description</h4>
              <p class="text-sm text-gray-900">
                {{ selectedTicket?.description || 'No description provided for this ticket.' }}
              </p>
            </div>

            <!-- Communication History -->
            <div class="mb-6">
              <h4 class="text-sm font-medium text-gray-500 mb-3">Communication History</h4>
              <div class="space-y-3">
                <div class="bg-blue-50 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-blue-900">CJ Support Agent</span>
                    <span class="text-xs text-blue-600">2 days ago</span>
                  </div>
                  <p class="text-sm text-blue-800">Hello, thank you for reporting this issue. I'll look into it right away. Could you please provide more information about when this started occurring?</p>
                </div>
                <div class="bg-purple-50 rounded-lg p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-semibold text-purple-900">FC School Contact</span>
                    <span class="text-xs text-purple-600">1 day ago</span>
                  </div>
                  <p class="text-sm text-purple-800">The issue started after the latest update. We've been unable to process payments since then. I've attached screenshots of the error messages we're seeing.</p>
                </div>
              </div>
            </div>

            <!-- Reply Input -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Type your reply</label>
              <textarea
                v-model="replyMessage"
                rows="4"
                placeholder="Type your reply..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
              <div class="flex justify-end mt-2">
                <button @click="sendReply" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center space-x-2">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Send Reply</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Action Bar -->
          <div class="p-6 border-t border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <select
                  v-model="selectedTicketStatus"
                  class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="open">Open</option>
                  <option value="in progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button @click="assignTicket(selectedTicket)" class="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-1">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Assign Ticket</span>
                </button>
              </div>
              <button @click="markAsResolved" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center space-x-2">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Mark as resolved</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Assign Ticket Modal -->
    <div v-if="showAssignModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-[60]">
      <div class="relative top-0 right-0 h-full w-full md:w-1/2 lg:w-2/5 shadow-lg bg-white ml-auto">
        <div class="h-full flex flex-col">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
              <span class="inline-flex px-3 py-1 text-sm font-semibold bg-gray-900 text-white rounded-full">
                {{ selectedTicket?.id }}
              </span>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Assign Ticket</h3>
                <p class="text-sm text-gray-600">{{ selectedTicket?.subject }}</p>
              </div>
            </div>
            <button @click="closeAssignModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div class="flex-1 overflow-y-auto p-6">
            <p class="text-sm text-gray-600 mb-6">Select a team member to assign this ticket to:</p>
            
            <!-- Team Member List -->
            <div class="space-y-3">
              <div 
                v-for="member in teamMembers" 
                :key="member.id"
                @click="selectTeamMember(member)"
                :class="selectedTeamMember?.id === member.id ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'"
                class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 cursor-pointer transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span class="text-sm font-semibold text-gray-700">{{ member.initials }}</span>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-gray-900">{{ member.name }}</p>
                  <p class="text-xs text-gray-500">{{ member.role }}</p>
                </div>
                <div v-if="selectedTeamMember?.id === member.id" class="flex-shrink-0">
                  <svg class="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="p-6 border-t border-gray-200 bg-gray-50">
            <div class="flex justify-end space-x-3">
              <button @click="closeAssignModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button 
                @click="confirmAssignment" 
                :disabled="!selectedTeamMember"
                class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create New Support Ticket Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <!-- Modal Header -->
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Create New Support Ticket</h3>
            <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Ticket Creation Form -->
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                School
              </label>
              <select
                v-model="newTicket.school"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select a school</option>
                <option value="Heritage Grammar School">Heritage Grammar School</option>
                <option value="Greenfield Academy">Greenfield Academy</option>
                <option value="St. Michael's College">St. Michael's College</option>
                <option value="Westpoint International">Westpoint International</option>
                <option value="Horizon Educational Center">Horizon Educational Center</option>
                <option value="Royal Academy">Royal Academy</option>
                <option value="Elite College">Elite College</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                v-model="newTicket.subject"
                type="text"
                placeholder="e.g., Payment gateway integration issue, Parent login issues"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                v-model="newTicket.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select a category</option>
                <option value="Technical">Technical</option>
                <option value="Account Access">Account Access</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Billing">Billing</option>
                <option value="Authentication">Authentication</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                v-model="newTicket.priority"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                v-model="newTicket.description"
                rows="4"
                placeholder="Describe the issue in detail..."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-end">
            <button @click="closeCreateModal" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button @click="createNewTicket" class="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
              Create Ticket
            </button>
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
const activeTab = ref('resolved')

// Ticket data
const ticketsData = ref([
  {
    id: 'TXN001',
    school: 'Heritage Grammar School',
    subject: 'Payment gateway integration issue',
    category: 'Technical',
    dateOpened: '5/14/2023',
    priority: 'High',
    status: 'resolved',
    description: 'The payment gateway is not processing transactions correctly. Users are getting error messages when trying to make payments.'
  },
  {
    id: 'TKT002',
    school: 'Greenfield Academy',
    subject: 'Cannot access payment reports',
    category: 'Account Access',
    dateOpened: '5/13/2023',
    priority: 'Medium',
    status: 'resolved',
    description: 'School administrators are unable to access payment reports and transaction history.'
  },
  {
    id: 'TKT003',
    school: 'St. Michael\'s College',
    subject: 'Fee structure update request',
    category: 'Feature Request',
    dateOpened: '5/11/2023',
    priority: 'Low',
    status: 'resolved',
    description: 'Request to update the fee structure to include new payment options and installment plans.'
  },
  {
    id: 'TKT004',
    school: 'Westpoint International',
    subject: 'Incorrect transaction fee calculation',
    category: 'Billing',
    dateOpened: '5/9/2023',
    priority: 'High',
    status: 'resolved',
    description: 'The system is calculating incorrect transaction fees, resulting in overcharges for schools.'
  },
  {
    id: 'TKT005',
    school: 'Horizon Educational Center',
    subject: 'Parent login issues',
    category: 'Authentication',
    dateOpened: '5/7/2023',
    priority: 'Medium',
    status: 'resolved',
    description: 'Parents are experiencing difficulties logging into their accounts and accessing student information.'
  },
  {
    id: 'TKT006',
    school: 'Royal Academy',
    subject: 'New feature request',
    category: 'Feature Request',
    dateOpened: '5/6/2023',
    priority: 'Low',
    status: 'open',
    description: 'Request for new dashboard features and reporting tools.'
  },
  {
    id: 'TKT007',
    school: 'Elite College',
    subject: 'System performance issue',
    category: 'Technical',
    dateOpened: '5/5/2023',
    priority: 'High',
    status: 'resolved',
    description: 'System was running slowly during peak hours. Issue has been resolved.'
  }
])

// Modal state
const showTicketModal = ref(false)
const showAssignModal = ref(false)
const showCreateModal = ref(false)
const selectedTicket = ref<any>(null)

// Assignment form
const selectedAgent = ref('')
const selectedPriority = ref('medium')
const assignmentNotes = ref('')

// Team member selection
const selectedTeamMember = ref<any>(null)
const teamMembers = ref([
  {
    id: 1,
    name: 'David Chen',
    initials: 'DC',
    role: 'Technical Support'
  },
  {
    id: 2,
    name: 'Annette Black',
    initials: 'AB',
    role: 'Customer Success'
  },
  {
    id: 3,
    name: 'Brooklyn Simmons',
    initials: 'BS',
    role: 'Account Manager'
  },
  {
    id: 4,
    name: 'Dianne Russell',
    initials: 'DR',
    role: 'Product Specialist'
  }
])

// Reply message
const replyMessage = ref('')

// New ticket form
const newTicket = ref({
  school: '',
  subject: '',
  category: '',
  priority: 'Medium',
  description: ''
})

// Search and filter
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Computed properties for tickets
const filteredTickets = computed(() => {
  let filtered = ticketsData.value

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(ticket => 
      ticket.school.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by active tab
  if (activeTab.value !== 'all') {
    if (activeTab.value === 'open') {
      filtered = filtered.filter(ticket => ticket.status.toLowerCase() === 'open')
    } else if (activeTab.value === 'inProgress') {
      filtered = filtered.filter(ticket => ticket.status.toLowerCase() === 'in progress')
    } else if (activeTab.value === 'resolved') {
      filtered = filtered.filter(ticket => ticket.status.toLowerCase() === 'resolved')
    }
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredTickets.value.length / itemsPerPage.value))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredTickets.value.length))

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

// Computed property for selected ticket status
const selectedTicketStatus = ref('')

// Watch effect to update selectedTicket status
watch(() => selectedTicketStatus.value, (newStatus) => {
  if (selectedTicket.value) {
    selectedTicket.value.status = newStatus
  }
}, { immediate: true }) // immediate: true to set the initial status when selectedTicket is set

// Functions
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const getPriorityClass = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'bg-red-100 text-red-800'
    case 'medium':
      return 'bg-yellow-100 text-yellow-800'
    case 'low':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'resolved':
      return 'bg-green-100 text-green-800'
    case 'in progress':
      return 'bg-orange-100 text-orange-800'
    case 'open':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Functions for ticket modal
const viewTicket = (ticket: any) => {
  selectedTicket.value = ticket
  selectedTicketStatus.value = ticket.status
  showTicketModal.value = true
}

const closeTicketModal = () => {
  showTicketModal.value = false
  selectedTicket.value = null
  replyMessage.value = ''
}

// Functions for assign modal
const assignTicket = (ticket: any) => {
  selectedTicket.value = ticket
  selectedPriority.value = ticket.priority.toLowerCase()
  showAssignModal.value = true
}

const closeAssignModal = () => {
  showAssignModal.value = false
  selectedTicket.value = null
  selectedAgent.value = ''
  selectedPriority.value = 'medium'
  assignmentNotes.value = ''
  selectedTeamMember.value = null
}

const confirmAssignment = () => {
  if (!selectedTeamMember.value) {
    alert('Please select a team member to assign the ticket to.')
    return
  }

  // Update ticket priority and status
  if (selectedTicket.value) {
    selectedTicket.value.priority = selectedPriority.value.charAt(0).toUpperCase() + selectedTicket.value.priority.slice(1)
    selectedTicket.value.status = 'In Progress'
  }

  console.log('Ticket assigned:', {
    ticketId: selectedTicket.value?.id,
    agent: selectedTeamMember.value.name,
    priority: selectedPriority.value,
    notes: assignmentNotes.value
  })

  closeAssignModal()
}

// Team member selection function
const selectTeamMember = (member: any) => {
  selectedTeamMember.value = member
}

// Functions for reply and status updates
const sendReply = () => {
  if (!replyMessage.value.trim()) {
    alert('Please enter a reply message.')
    return
  }

  console.log('Reply sent:', {
    ticketId: selectedTicket.value?.id,
    message: replyMessage.value,
    timestamp: new Date().toISOString()
  })

  // Here you would typically send the reply to the backend
  // For now, we'll just clear the message
  replyMessage.value = ''
}

const markAsResolved = () => {
  if (selectedTicket.value) {
    selectedTicket.value.status = 'resolved'
    selectedTicketStatus.value = 'resolved'
    console.log('Ticket marked as resolved:', selectedTicket.value.id)
  }
}

// Functions for create new ticket modal
const closeCreateModal = () => {
  showCreateModal.value = false
  newTicket.value = {
    school: '',
    subject: '',
    category: '',
    priority: 'Medium',
    description: ''
  }
}

const createNewTicket = () => {
  if (!newTicket.value.school || !newTicket.value.subject || !newTicket.value.category || !newTicket.value.priority || !newTicket.value.description) {
    alert('Please fill in all fields to create a new ticket.')
    return
  }

  const newId = `TKT${ticketsData.value.length + 1}`
  const newDate = new Date().toLocaleDateString()

  ticketsData.value.push({
    id: newId,
    school: newTicket.value.school,
    subject: newTicket.value.subject,
    category: newTicket.value.category,
    dateOpened: newDate,
    priority: newTicket.value.priority,
    status: 'Open',
    description: newTicket.value.description
  })

  console.log('New ticket created:', newTicket.value)
  closeCreateModal()
}

// Lifecycle
onMounted(() => {
  console.log('Support Tickets page mounted')
})
</script>
