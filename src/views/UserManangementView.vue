<template>
  <div class="p-6">
    <!-- Search & Filters -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <input 
        v-model="search" 
        type="text" 
        placeholder="Search name/email" 
        class="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      <div class="flex gap-2 flex-wrap">
        <DropdownFilter
          v-model="selectedStatus"
          label="All Status"
          :options="statuses"
        />
        <DropdownFilter
          v-model="selectedRole"
          label="All Roles"
          :options="roles"
        />
        <DropdownAction
          :selected="selectedRows"
          @assign="assignRoles"
          @export="exportUsers"
          @delete="deleteSelected"
        />
        <div class="relative">
          <button 
            @click="showExportDropdown = !showExportDropdown"
            class="btn btn-primary flex items-center gap-2"
            data-export-button
          >
            Export
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <!-- Export Dropdown -->
          <div v-if="showExportDropdown" 
            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50"
            data-export-dropdown
          >
            <div class="py-1">
              <button
                @click="exportToExcel"
                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export to Excel
              </button>
              <button
                @click="exportToPDF"
                class="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Export to PDF
              </button>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" @click="showAddUserModal = true">+ Add User</button>
      </div>
    </div>

    <!-- Table -->
    <div v-if="isLoading" class="flex justify-center items-center py-10">
      <span class="text-blue-600 font-semibold">Loading users...</span>
    </div>
    <div v-else-if="filteredUsers.length === 0" class="rounded-lg border border-gray-200 dark:border-gray-700 p-10 text-center">
      <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100">No users found</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your filters or refresh the page.</p>
    </div>
    <div v-else class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      <!-- Enhanced Table Container -->
      <div class="overflow-x-auto">
        <Vue3Datatable
          v-if="filteredUsers.length > 0 && visibleColumns.length > 0"
          :rows="filteredUsers"
          :columns="visibleColumns"
          :totalRows="filteredUsers.length"
          :sortable="true"
          :searchable="false"
          :pageSize="Math.max(filteredUsers.length, 10)"
          :pageSizeOptions="[]"
          skin="bh-table-compact"
          :loading="isLoading"
          :classes="{
            table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
            thead: 'bg-gray-50 dark:bg-gray-800',
            tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
            tr: 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer',
            th: 'px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300',
            td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
          }"
          @row-clicked="onRowClick"
        >
          <!-- Custom checkbox column -->
          <template #checkbox="data">
            <div v-if="data && data.value" class="flex items-center" @click.stop>
              <input 
                type="checkbox" 
                :checked="selectedRows.includes(data.value.id)" 
                @change="toggleUserSelection(data.value.id)"
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          </template>

          <!-- Custom status column -->
          <template #status="data">
            <span v-if="data && data.value" :class="statusBadgeClass(data.value.status)" class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
              {{ data.value.status }}
            </span>
            <span v-else class="text-gray-400">-</span>
          </template>

          <!-- Custom actions column -->
          <template #actions="data">
            <div v-if="data && data.value" class="flex items-center justify-center gap-2" @click.stop>
              <RowActionMenu 
                :user="data.value" 
                @view="showUserDetails(data.value)"
                @edit="handleEditUser(data.value)"
                @adjust-balance="handleAdjustBalance(data.value)"
                @change-role="handleChangeRole(data.value)"
                @delete="handleDeleteUser"
              />
            </div>
            <span v-else class="text-gray-400">-</span>
          </template>
        </Vue3Datatable>
      </div>

      <!-- Custom Pagination -->
      <div class="flex justify-between items-center px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm">
        <span class="text-gray-700 dark:text-gray-300">
          Showing {{ totalUsers > 0 ? startIndex + 1 : 0 }} - {{ endIndex }} of {{ totalUsers }} users
        </span>
        <div class="flex gap-2 items-center">
          <button 
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" 
            :disabled="!hasPreviousPage || isLoading" 
            @click="currentPage = Math.max(1, currentPage - 1); fetchUsers()"
          >
            Previous
          </button>
          <span class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ currentPage }} / {{ Math.max(1, totalPages) }}
          </span>
          <button 
            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" 
            :disabled="!hasNextPage || isLoading" 
            @click="currentPage = Math.min(totalPages || Infinity, currentPage + 1); fetchUsers()"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Add New User Modal -->
    <TransitionRoot appear :show="showAddUserModal" as="template">
      <Dialog as="div" @close="showAddUserModal = false" class="relative z-50">
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

        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Add New User
                  </DialogTitle>
                  <button @click="showAddUserModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Enter the details to create a new user account.
                </p>

                <form @submit.prevent="handleAddUser" class="space-y-4">
                  <!-- First Name -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      v-model="newUser.firstname"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                  <!-- Last Name -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      v-model="newUser.lastname"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      v-model="newUser.email"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter Email address"
                      required
                    />
                  </div>
                  <!-- Phone Number -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      v-model="newUser.phonenumber"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>
                  <!-- Role -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select
                      v-model="newUser.role"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="" disabled>Select Role</option>
                      <option v-for="role in roleOptions" :key="role" :value="role">
                        {{ role }}
                      </option>
                    </select>
                  </div>

                  <!-- Status -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      v-model="newUser.status"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="" disabled>Select Status</option>
                      <option v-for="status in statusOptions" :key="status" :value="status">
                        {{ status }}
                      </option>
                    </select>
                  </div>

                  <!-- Buttons -->
                  <div class="flex gap-3 pt-4">
                    <button
                      type="button"
                      @click="showAddUserModal = false"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                      Create User
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- User Details Modal -->
    <TransitionRoot appear :show="showUserDetailsModal" as="template">
      <Dialog as="div" @close="showUserDetailsModal = false" class="relative z-50">
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

        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[800px] transform overflow-hidden bg-white dark:bg-gray-800 shadow-xl transition-all min-h-screen">
                <!-- Header with close button -->
                <div class="absolute right-4 top-4 z-10">
                  <button @click="showUserDetailsModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <div class="p-8">
                  <div class="grid grid-cols-12 gap-6">
                    <!-- Left Column -->
                    <div class="col-span-4">
                      <!-- User Profile Card -->
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border dark:border-gray-700">
                        <div v-if="selectedUser?.photo" class="w-20 h-20 mx-auto mb-4">
                          <img :src="selectedUser.photo" alt="User profile" class="w-full h-full object-cover rounded-full" />
                        </div>
                        <div v-else class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <icon-user class="w-12 h-12 text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                          {{ selectedUser?.first_name || '' }} {{ selectedUser?.lastname || '' }}
                        </h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ selectedUser?.email }}</p>
                        <span 
                          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                          :class="{
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': selectedUser?.status === 'ACTIVE',
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': selectedUser?.status === 'PENDING',
                            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': selectedUser?.status === 'BLOCKED' || selectedUser?.status === 'DEACTIVATED',
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400': selectedUser?.status === 'UNVERIFIED'
                          }
                        ">
                          {{ selectedUser?.status || 'Unknown' }}
                        </span>
                      </div>

                      <!-- User Information -->
                      <div class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-700">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-4">User Information</h4>
                        <div class="space-y-4">
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">User ID:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedUser?.id }}</span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">User Type:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedUser?.userType || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Role:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedUser?.role || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Phone:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedUser?.phone || 'N/A' }}</span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Registered:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">
                              {{ selectedUser?.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'N/A' }}
                            </span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Last Login:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">
                              {{ selectedUser?.lastlogin && selectedUser.lastlogin !== '0001-01-01T00:00:00Z' ? new Date(selectedUser.lastlogin).toLocaleString() : 'Never' }}
                            </span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">2FA Enabled:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">
                              {{ selectedUser?.use2fa ? 'Yes' : 'No' }}
                            </span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Referred By:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">
                              {{ selectedUser?.referred_by && selectedUser.referred_by !== '000000000000000000000000' ? selectedUser.referred_by : 'None' }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <!-- Addresses -->
                      <div class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-700">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-4">Addresses</h4>
                        
                        <!-- Shipping Address -->
                        <div v-if="selectedUser?.shippingAddress" class="mb-4">
                          <h5 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Shipping Address</h5>
                          <div class="text-sm text-gray-600 dark:text-gray-400">
                            <p v-if="selectedUser.shippingAddress.streetName || selectedUser.shippingAddress.houseNumber">
                              {{ selectedUser.shippingAddress.streetName }} {{ selectedUser.shippingAddress.houseNumber }}
                              {{ selectedUser.shippingAddress.apartmentNumber ? ', Apt ' + selectedUser.shippingAddress.apartmentNumber : '' }}
                            </p>
                            <p v-if="selectedUser.shippingAddress.city || selectedUser.shippingAddress.state || selectedUser.shippingAddress.postalCode">
                              {{ selectedUser.shippingAddress.city }}, {{ selectedUser.shippingAddress.state }} {{ selectedUser.shippingAddress.postalCode }}
                            </p>
                            <p v-if="selectedUser.shippingAddress.country">{{ selectedUser.shippingAddress.country }}</p>
                            <p v-if="!selectedUser.shippingAddress.streetName && !selectedUser.shippingAddress.city && !selectedUser.shippingAddress.country">
                              No shipping address provided
                            </p>
                          </div>
                        </div>
                        
                        <!-- Home Address -->
                        <div v-if="selectedUser?.homeAddress" class="mb-4">
                          <h5 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Home Address</h5>
                          <div class="text-sm text-gray-600 dark:text-gray-400">
                            <p v-if="selectedUser.homeAddress.streetName || selectedUser.homeAddress.houseNumber">
                              {{ selectedUser.homeAddress.streetName }} {{ selectedUser.homeAddress.houseNumber }}
                              {{ selectedUser.homeAddress.apartmentNumber ? ', Apt ' + selectedUser.homeAddress.apartmentNumber : '' }}
                            </p>
                            <p v-if="selectedUser.homeAddress.city || selectedUser.homeAddress.state || selectedUser.homeAddress.postalCode">
                              {{ selectedUser.homeAddress.city }}, {{ selectedUser.homeAddress.state }} {{ selectedUser.homeAddress.postalCode }}
                            </p>
                            <p v-if="selectedUser.homeAddress.country">{{ selectedUser.homeAddress.country }}</p>
                            <p v-if="!selectedUser.homeAddress.streetName && !selectedUser.homeAddress.city && !selectedUser.homeAddress.country">
                              No home address provided
                            </p>
                          </div>
                        </div>
                        
                        <!-- Work Address -->
                        <div v-if="selectedUser?.workAddress" class="mb-4">
                          <h5 class="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Work Address</h5>
                          <div class="text-sm text-gray-600 dark:text-gray-400">
                            <p v-if="selectedUser.workAddress.streetName || selectedUser.workAddress.houseNumber">
                              {{ selectedUser.workAddress.streetName }} {{ selectedUser.workAddress.houseNumber }}
                              {{ selectedUser.workAddress.apartmentNumber ? ', Apt ' + selectedUser.workAddress.apartmentNumber : '' }}
                            </p>
                            <p v-if="selectedUser.workAddress.city || selectedUser.workAddress.state || selectedUser.workAddress.postalCode">
                              {{ selectedUser.workAddress.city }}, {{ selectedUser.workAddress.state }} {{ selectedUser.workAddress.postalCode }}
                            </p>
                            <p v-if="selectedUser.workAddress.country">{{ selectedUser.workAddress.country }}</p>
                            <p v-if="!selectedUser.workAddress.streetName && !selectedUser.workAddress.city && !selectedUser.workAddress.country">
                              No work address provided
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Notification Preferences -->
                      <div class="mt-6 bg-white dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-700">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-4">Notification Preferences</h4>
                        <div class="grid grid-cols-3 gap-4">
                          <div class="flex items-center">
                            <div class="w-4 h-4 mr-2">
                              <div class="w-full h-full rounded-full" :class="{
                                'bg-green-500': selectedUser?.notificationPreferences?.email,
                                'bg-gray-300 dark:bg-gray-600': !selectedUser?.notificationPreferences?.email
                              }"></div>
                            </div>
                            <span class="text-sm text-gray-700 dark:text-gray-300">Email</span>
                          </div>
                          <div class="flex items-center">
                            <div class="w-4 h-4 mr-2">
                              <div class="w-full h-full rounded-full" :class="{
                                'bg-green-500': selectedUser?.notificationPreferences?.inApp,
                                'bg-gray-300 dark:bg-gray-600': !selectedUser?.notificationPreferences?.inApp
                              }"></div>
                            </div>
                            <span class="text-sm text-gray-700 dark:text-gray-300">In-App</span>
                          </div>
                          <div class="flex items-center">
                            <div class="w-4 h-4 mr-2">
                              <div class="w-full h-full rounded-full" :class="{
                                'bg-green-500': selectedUser?.notificationPreferences?.sms,
                                'bg-gray-300 dark:bg-gray-600': !selectedUser?.notificationPreferences?.sms
                              }"></div>
                            </div>
                            <span class="text-sm text-gray-700 dark:text-gray-300">SMS</span>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Quick Actions -->
                      <div class="mt-6">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                        <div class="grid grid-cols-2 gap-3">
                          <button @click="handleEditUser(selectedUser)" class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <icon-pencil class="w-4 h-4" />
                            Edit
                          </button>
                          <button class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <icon-wallet class="w-4 h-4" />
                            Wallet
                          </button>
                          <button @click="handleChangeRole(selectedUser)" class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <icon-user-circle class="w-4 h-4" />
                            Role
                          </button>
                          <button class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <icon-ban class="w-4 h-4" />
                            {{ selectedUser?.status === 'ACTIVE' ? 'Suspend' : 'Activate' }}
                          </button>
                        </div>
                      </div>
                    </div>

                    <!-- Right Column -->
                    <div class="col-span-8">
                      <!-- Tabs -->
                      <div class="border-b border-gray-200 dark:border-gray-700">
                        <nav class="-mb-px flex space-x-8">
                          <button
                            v-for="tab in ['Activities', 'Transactions', 'Referrals']"
                            :key="tab"
                            @click="handleTabChange(tab)"
                            :class="[
                              activeTab === tab
                                ? 'border-blue-500 text-blue-600 dark:text-blue-500'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300',
                              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                            ]"
                          >
                            {{ tab }}
                          </button>
                        </nav>
                      </div>

                      <!-- Activity Log -->
                      <div v-if="activeTab === 'Activities'" class="mt-6">
                        <div class="flex items-center justify-between mb-4">
                          <h4 class="text-base font-medium text-gray-900 dark:text-white">Activity Log</h4>
                          <p class="text-sm text-gray-500 dark:text-gray-400">Recent activities and login history</p>
                        </div>

                        <!-- Loading State -->
                        <div v-if="loadingActivities" class="text-center py-8 text-gray-500">
                          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                          Loading activities...
                        </div>

                        <!-- Error State -->
                        <div v-else-if="activitiesError" class="text-center py-8 text-red-500">
                          {{ activitiesError }}
                        </div>

                        <!-- Empty State -->
                        <div v-else-if="activities.length === 0" class="text-center py-8 text-gray-500">
                          <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p class="text-sm">No activities found</p>
                          <p class="text-xs text-gray-400">This user has no activity logs yet</p>
                        </div>
                        
                        <!-- Activities List -->
                        <div v-else class="space-y-6">
                          <div v-for="(activity, index) in activities" :key="activity.title + '-' + index" class="flex items-start gap-4">
                            <div class="flex-shrink-0">
                              <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <icon-info-circle class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>
                            <div class="flex-1 min-w-0">
                              <div class="flex justify-between items-start">
                                <div>
                                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
                                  <p v-if="activity.description" class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ activity.description }}</p>
                                  <p v-if="activity.ip && activity.ip !== 'N/A'" class="text-xs text-gray-400 dark:text-gray-500 mt-1">IP: {{ activity.ip }}</p>
                                </div>
                                <span class="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-4">{{ activity.time }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Transaction History -->
                      <div v-if="activeTab === 'Transactions'" class="mt-6">
                        <div class="flex items-center justify-between mb-4">
                          <h4 class="text-base font-medium text-gray-900 dark:text-white">Transaction History</h4>
                          <p class="text-sm text-gray-500 dark:text-gray-400">Financial activities and wallet transactions</p>
                        </div>

                        <!-- Loading State -->
                        <div v-if="loadingTransactions" class="text-center py-8 text-gray-500">
                          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                          Loading transactions...
                        </div>

                        <!-- Error State -->
                        <div v-else-if="transactionError" class="text-center py-8 text-red-500">
                          {{ transactionError }}
                        </div>

                        <!-- Empty State -->
                        <div v-else-if="transactions.length === 0" class="text-center py-8 text-gray-500">
                          <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p class="text-sm">No transactions found</p>
                          <p class="text-xs text-gray-400">This user has no transactions yet</p>
                        </div>
                        
                        <!-- Transactions List -->
                        <div v-else class="space-y-4">
                          <div v-for="(transaction, index) in transactions" :key="transaction.id || index" 
                            class="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
                            <div class="flex items-start gap-3 flex-1 min-w-0">
                              <div class="flex-shrink-0">
                                <div :class="[
                                  'w-8 h-8 rounded-full flex items-center justify-center',
                                  transaction.type === 'deposit' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'
                                ]">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    :stroke="transaction.type === 'deposit' ? 'rgb(22 163 74)' : 'rgb(220 38 38)'"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    <path d="M12 20V4" />
                                    <path :d="transaction.type === 'deposit' ? 'M5 13l7 7 7-7' : 'M5 11l7-7 7 7'" />
                                  </svg>
                                </div>
                              </div>
                              <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2">
                                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ transaction.title }}
                                  </p>
                                  <span class="text-xs text-gray-500">- {{ transaction.id.substring(0, 8) }}...</span>
                                </div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Method: {{ transaction.method }}</p>
                                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ transaction.time }}</p>
                              </div>
                            </div>
                            <div class="flex items-center gap-3 flex-shrink-0">
                              <div class="text-right">
                                <p :class="[
                                  'text-sm font-medium whitespace-nowrap',
                                  transaction.type === 'deposit' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                ]">
                                  {{ transaction.type === 'deposit' ? '+' : '-' }}₦{{ transaction.amount }}
                                </p>
                                <span :class="[
                                  'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 whitespace-nowrap',
                                  transaction.status === 'Completed' || transaction.status === 'SUCCESSFUL' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                    : transaction.status === 'Failed' || transaction.status === 'FAILED'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                ]">
                                  {{ transaction.status }}
                                </span>
                              </div>
                              <button
                                @click="viewTransactionDetails(transaction)"
                                class="p-2 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0"
                                title="View Details"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Referral Network -->
                      <div v-if="activeTab === 'Referrals'" class="mt-6">
                        <div class="flex items-center justify-between mb-4">
                          <h4 class="text-base font-medium text-gray-900 dark:text-white">Referral Network</h4>
                          <p class="text-sm text-gray-500 dark:text-gray-400">Users referred and referral earnings</p>
                        </div>

                        <!-- Loading State -->
                        <div v-if="loadingReferrals" class="text-center py-8 text-gray-500">
                          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                          Loading referral data...
                        </div>

                        <!-- Error State -->
                        <div v-else-if="referralError" class="text-center py-8 text-red-500">
                          {{ referralError }}
                        </div>

                        <!-- Referral Data -->
                        <div v-else-if="referralData">
                          <!-- Stats Cards -->
                          <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Referrals</p>
                              <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ referralData.total_referrals || 0 }}</p>
                            </div>
                            <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Earnings from Referrals</p>
                              <p class="text-2xl font-semibold text-green-500">₦{{ formatCurrency(referralData.total_commission || 0) }}</p>
                            </div>
                          </div>

                          <!-- Referral Link -->
                          <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 mb-6">
                            <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">Referral Code</p>
                            <div class="flex items-center gap-2">
                              <input
                                type="text"
                                readonly
                                :value="referralData.referral_code || 'No referral code available'"
                                class="flex-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-2"
                              />
                              <button
                                v-if="referralData.referral_code"
                                class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                                @click="copyReferralCode"
                              >
                                Copy
                              </button>
                            </div>
                          </div>

                          <!-- Referred Users Table -->
                          <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                            <p class="text-sm font-medium text-gray-900 dark:text-white p-4 border-b border-gray-100 dark:border-gray-700">
                              Referred Users ({{ referralData.referrals?.length || 0 }})
                            </p>
                            
                            <!-- Empty State -->
                            <div v-if="!referralData.referrals || referralData.referrals.length === 0" class="text-center py-8 text-gray-500">
                              <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <p class="text-sm">No referrals yet</p>
                              <p class="text-xs text-gray-400">This user hasn't referred anyone yet</p>
                            </div>

                            <!-- Referrals Table -->
                            <div v-else class="overflow-x-auto">
                              <table class="w-full">
                                <thead>
                                  <tr class="bg-gray-50 dark:bg-gray-900">
                                    <th class="text-left text-xs font-medium text-gray-500 dark:text-gray-400 px-4 py-3">User</th>
                                    <th class="text-left text-xs font-medium text-gray-500 dark:text-gray-400 px-4 py-3">Date</th>
                                    <th class="text-left text-xs font-medium text-gray-500 dark:text-gray-400 px-4 py-3">Status</th>
                                    <th class="text-right text-xs font-medium text-gray-500 dark:text-gray-400 px-4 py-3">Commission</th>
                                  </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                                  <tr v-for="(referral, index) in referralData.referrals" :key="index">
                                    <td class="px-4 py-3">
                                      <span class="text-sm font-medium text-gray-900 dark:text-white">
                                        {{ referral.name || referral.email || `User ${index + 1}` }}
                                      </span>
                                    </td>
                                    <td class="px-4 py-3">
                                      <span class="text-sm text-gray-500 dark:text-gray-400">
                                        {{ referral.createdAt ? new Date(referral.createdAt).toLocaleDateString() : 'N/A' }}
                                      </span>
                                    </td>
                                    <td class="px-4 py-3">
                                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                                        {{ referral.status || 'Active' }}
                                      </span>
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                      <span class="text-sm font-medium text-green-500">
                                        ₦{{ formatCurrency(referral.commission || 0) }}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <!-- Commissions Table -->
                          <div v-if="referralData.commissions && referralData.commissions.length > 0" class="mt-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                            <p class="text-sm font-medium text-gray-900 dark:text-white p-4 border-b border-gray-100 dark:border-gray-700">
                              Commission History ({{ referralData.commissions.length }})
                            </p>
                            <div class="overflow-x-auto">
                              <table class="w-full">
                                <thead>
                                  <tr class="bg-gray-50 dark:bg-gray-900">
                                    <th class="text-left text-xs font-medium text-gray-500 dark:text-gray-400 px-4 py-3">Date</th>
                                    <th class="text-left text-xs font-medium text-gray-500 dark:text-gray-400 px-4 py-3">Description</th>
                                    <th class="text-right text-xs font-medium text-gray-500 dark:text-gray-400 px-4 py-3">Amount</th>
                                  </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
                                  <tr v-for="(commission, index) in referralData.commissions" :key="index">
                                    <td class="px-4 py-3">
                                      <span class="text-sm text-gray-500 dark:text-gray-400">
                                        {{ commission.createdAt ? new Date(commission.createdAt).toLocaleDateString() : 'N/A' }}
                                      </span>
                                    </td>
                                    <td class="px-4 py-3">
                                      <span class="text-sm text-gray-900 dark:text-white">
                                        {{ commission.description || 'Referral commission' }}
                                      </span>
                                    </td>
                                    <td class="px-4 py-3 text-right">
                                      <span class="text-sm font-medium text-green-500">
                                        ₦{{ formatCurrency(commission.amount || 0) }}
                                      </span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Edit User Modal -->
    <TransitionRoot appear :show="showEditUserModal" as="template">
      <Dialog as="div" @close="showEditUserModal = false" class="relative z-50">
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

        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit User
                  </DialogTitle>
                  <button @click="showEditUserModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Update user information and settings.
                </p>

                <form @submit.prevent="handleUpdateUser" class="space-y-4">
                  <!-- Full Name -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      v-model="editingUser.name"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter Full Name"
                      required
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      v-model="editingUser.email"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter Email address"
                      required
                    />
                  </div>

                  <!-- Role -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Role
                    </label>
                    <select
                      v-model="editingUser.role"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="" disabled>Select Role</option>
                      <option v-for="role in roleOptions" :key="role" :value="role">
                        {{ role }}
                      </option>
                    </select>
                  </div>

                  <!-- Status -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      v-model="editingUser.status"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option value="" disabled>Select Status</option>
                      <option v-for="status in statusOptions" :key="status" :value="status">
                        {{ status }}
                      </option>
                    </select>
                  </div>

                  <!-- Buttons -->
                  <div class="flex gap-3 pt-4">
                    <button
                      type="button"
                      @click="showEditUserModal = false"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Adjust Balance Modal -->
    <TransitionRoot appear :show="showAdjustBalanceModal" as="template">
      <Dialog as="div" @close="showAdjustBalanceModal = false" class="relative z-50">
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

        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Adjust Balance
                  </DialogTitle>
                  <button @click="showAdjustBalanceModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Adjust balance for John Doe
                </p>

                <form @submit.prevent="handleBalanceAdjustment" class="space-y-4">
                  <!-- Current Balance -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Current Balance
                    </label>
                    <div class="text-2xl font-semibold text-gray-900 dark:text-white">
                      ₦{{ adjustBalanceData.currentBalance.toFixed(2) }}
                    </div>
                  </div>

                  <!-- Adjustment Type -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Adjustment Type
                    </label>
                    <select
                      v-model="adjustBalanceData.adjustmentType"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    >
                      <option>Add Fund</option>
                      <option>Subtract Fund</option>
                    </select>
                  </div>

                  <!-- Amount -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Amount (₦)
                    </label>
                    <input
                      type="number"
                      v-model="adjustBalanceData.amount"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <!-- Reason -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Reason (Optional)
                    </label>
                    <select
                      v-model="adjustBalanceData.reason"
                      class="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option>Manual Adjustment</option>
                      <option>Promotional Credit</option>
                      <option>Refund</option>
                      <option>Error Correction</option>
                    </select>
                  </div>

                  <!-- Buttons -->
                  <div class="flex gap-3 pt-4">
                    <button
                      type="button"
                      @click="showAdjustBalanceModal = false"
                      class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                    >
                      Confirm adjustment
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Assign Roles Modal -->
    <TransitionRoot appear :show="showAssignRolesModal" as="template">
      <Dialog as="div" @close="showAssignRolesModal = false" class="relative z-50">
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

        <div class="fixed inset-y-0 right-0 overflow-y-auto">
          <div class="flex min-h-full justify-end">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                <div class="flex items-center justify-between mb-5">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                    Assign Roles
                  </DialogTitle>
                  <button @click="showAssignRolesModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Assign roles to John Doe
                </p>

                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Available Roles
                    </label>
                    <div class="space-y-2">
                      <div v-for="role in assignRolesData.availableRoles" :key="role.name" 
                        class="relative flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                        :class="[role.selected ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700']"
                        @click="toggleRole(role)"
                      >
                        <div class="min-w-0 flex-1">
                          <div class="flex items-center gap-2">
                            <input
                              type="checkbox"
                              :checked="role.selected"
                              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              @click.stop
                            />
                            <label class="font-medium text-gray-900 dark:text-white">
                              {{ role.name }}
                            </label>
                          </div>
                          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {{ role.description }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Selected Roles
                    </label>
                    <div class="min-h-[40px] p-2 border rounded-lg dark:border-gray-700 flex flex-wrap gap-2">
                      <span v-for="role in assignRolesData.selectedRoles" :key="role"
                        class="inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      >
                        {{ role }}
                        <button @click="toggleRole(assignRolesData.availableRoles.find(r => r.name === role))" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                          ×
                        </button>
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Buttons -->
                <div class="flex gap-3 mt-6">
                  <button
                    type="button"
                    @click="showAssignRolesModal = false"
                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleAssignRoles"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Assign Role
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Confirmation Modal -->
    <TransitionRoot appear :show="showDeleteModal" as="template">
      <Dialog as="div" @close="showDeleteModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <div class="flex justify-between items-start">
                  <DialogTitle class="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete User
                  </DialogTitle>
                  <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <XMarkIcon class="h-5 w-5" />
                  </button>
                </div>

                <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete {{ userToDelete?.name }}? This action cannot be undone.
                </p>

                <div class="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    @click="showDeleteModal = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    @click="confirmDelete"
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                  >
                    <svg class="w-4 h-4 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete User
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Transaction Details Modal -->
    <TransitionRoot appear :show="showTransactionModal" as="template">
      <Dialog as="div" @close="closeTransactionModal" class="relative z-50">
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
              <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-5">
                    <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">
                      Transaction Details
                    </DialogTitle>
                    <button @click="closeTransactionModal" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                      <XMarkIcon class="h-5 w-5" />
                    </button>
                  </div>

                  <div v-if="selectedTransaction" class="space-y-6">
                    <!-- Transaction ID -->
                    <div>
                      <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Transaction ID</h4>
                      <p class="text-base font-semibold text-gray-900 dark:text-white font-mono">{{ selectedTransaction.id || 'N/A' }}</p>
                    </div>

                    <!-- Grid of Details -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Date & Time</h4>
                        <p class="text-base text-gray-900 dark:text-white">
                          {{ selectedTransaction.created_at ? new Date(selectedTransaction.created_at).toLocaleString() : 'N/A' }}
                        </p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Amount</h4>
                        <p class="text-base font-semibold text-gray-900 dark:text-white">
                          ₦{{ formatCurrency(selectedTransaction.amount || 0) }}
                        </p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Category</h4>
                        <p class="text-base text-gray-900 dark:text-white">
                          {{ selectedTransaction.category || selectedTransaction.service_type || 'N/A' }}
                        </p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Status</h4>
                        <span :class="[
                          'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
                          selectedTransaction.status === 'SUCCESSFUL' || selectedTransaction.status === 'Completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : selectedTransaction.status === 'FAILED' || selectedTransaction.status === 'Failed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        ]">
                          {{ selectedTransaction.status || 'Pending' }}
                        </span>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Method</h4>
                        <p class="text-base text-gray-900 dark:text-white">
                          {{ selectedTransaction.payment_method || selectedTransaction.method || 'N/A' }}
                        </p>
                      </div>
                      <div>
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Entry Type</h4>
                        <p class="text-base text-gray-900 dark:text-white">
                          {{ selectedTransaction.entry || 'N/A' }}
                        </p>
                      </div>
                      <div v-if="selectedTransaction.receiver">
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Receiver</h4>
                        <p class="text-base text-gray-900 dark:text-white">{{ selectedTransaction.receiver }}</p>
                      </div>
                      <div v-if="selectedTransaction.network">
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Network</h4>
                        <p class="text-base text-gray-900 dark:text-white">{{ selectedTransaction.network }}</p>
                      </div>
                      <div v-if="selectedTransaction.provider">
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Provider</h4>
                        <p class="text-base text-gray-900 dark:text-white">{{ selectedTransaction.provider }}</p>
                      </div>
                      <div v-if="selectedTransaction.paymentReference">
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Payment Reference</h4>
                        <p class="text-base text-gray-900 dark:text-white font-mono text-sm">{{ selectedTransaction.paymentReference }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import DropdownFilter from '@/components/DropdownFilter.vue'
import DropdownAction from '@/components/DropdownAction.vue'
import RowActionMenu from '@/components/RowActionMenu.vue'
import IconUser from '@/components/icon/icon-user.vue'
import IconPencil from '@/components/icon/icon-pencil.vue'
import IconWallet from '@/components/icon/icon-wallet.vue'
import IconUserCircle from '@/components/icon/icon-user-circle.vue'
import IconBan from '@/components/icon/icon-ban.vue'
import IconInfoCircle from '@/components/icon/icon-info-circle.vue'
import userService from '@/services/userService'
import transactionService from '@/services/transactionService'
import { useToast } from 'vue-toastification'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const toast = useToast()
const search = ref('')
const selectedStatus = ref('All Status')
const selectedRole = ref('All Roles')
const selectedRows = ref([])
const showAddUserModal = ref(false)
const showUserDetailsModal = ref(false)
const selectedUser = ref(null)
const activeTab = ref('Activities')
const showEditUserModal = ref(false)
const editingUser = ref(null)
const showAdjustBalanceModal = ref(false)
const showAssignRolesModal = ref(false)
const showDeleteModal = ref(false)
const userToDelete = ref(null)
const showExportDropdown = ref(false)
const assignRolesData = ref({
  selectedRoles: ['Admin', 'Finance'],
  availableRoles: [
    { name: 'Admin', description: 'Full system access with all permissions', selected: false },
    { name: 'Agent', description: 'Ability to manage referrals and handle disputes', selected: false },
    { name: 'Finance', description: 'Access to financial transactions and wallet management', selected: false },
    { name: 'Support', description: 'Customer support and dispute resolution access', selected: false },
    { name: 'Customer', description: 'Standard user role with limited access', selected: false }
  ]
})

const newUser = ref({
  firstname: '',
  lastname: '',
  email: '',
  phonenumber: '',
  role: ''
})

const statuses = ['All Status', 'Active', 'Inactive', 'Suspended']
const roles = ['All Roles', 'Admin', 'User' ]

// API data and loading states
const users = ref([])
const isLoading = ref(true)
const totalUsers = ref(0)
const totalPages = ref(0)
const apiError = ref(false)

// Mock data for fallback when API fails
const getMockUsers = () => {
  return Array.from({ length: 10 }, (_, i) => ({
    id: `mock-${i + 1}`,
    name: `Test User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? 'Admin' : i % 3 === 1 ? 'Agent' : 'Customer',
    status: i % 4 === 0 ? 'INACTIVE' : 'ACTIVE',
    registration: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    rawData: {
      id: `mock-${i + 1}`,
      first_name: `Test`,
      lastname: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: i % 3 === 0 ? 'ADMIN' : i % 3 === 1 ? 'AGENT' : 'CUSTOMER',
      status: i % 4 === 0 ? 'INACTIVE' : 'ACTIVE',
      createdAt: new Date(Date.now() - i * 86400000).toISOString()
    }
  }))
}

// Fetch users from API
const fetchUsers = async () => {
  try {
    isLoading.value = true
    apiError.value = false
    
    const response = await userService.getUsers({
      page: currentPage.value,
      limit: perPage,
      search: search.value || undefined,
      status: selectedStatus.value !== 'All Status' ? selectedStatus.value.toUpperCase() : undefined,
      role: selectedRole.value !== 'All Roles' ? selectedRole.value.toUpperCase() : undefined
    })
    
    console.log('API Response:', response.data) // Debug log
    
    if (response.data && Array.isArray(response.data.data)) {
      if (response.data.data.length === 0) {
         // Handle empty array response
         users.value = []
         totalUsers.value = 0
         totalPages.value = 1
       } else {
         users.value = response.data.data.map(user => ({
           id: user.id,
           name: `${user.first_name || ''} ${user.lastname || ''}`.trim() || 'Unnamed User',
           email: user.email,
           role: user.role || 'User',
           status: user.status || 'ACTIVE',
           registration: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
           rawData: user // Store the raw data for detailed view
         }))
       }
       
       // If pagination info is available in the response
      if (response.data.pagination) {
        totalUsers.value = response.data.pagination.total || users.value.length
        totalPages.value = response.data.pagination.pages || 1
      } else if (response.data.totalItems !== undefined && response.data.totalPages !== undefined) {
        // Alternative pagination format
        totalUsers.value = response.data.totalItems
        totalPages.value = response.data.totalPages
      } else if (response.data.total !== undefined) {
        // Another possible format
        totalUsers.value = response.data.total
        totalPages.value = Math.ceil(totalUsers.value / perPage) || 1
      } else {
        // Fallback if pagination info is not available
        // If we have a full page of results, assume there are more
        if (response.data.data.length >= perPage) {
          // Set a high number to ensure next button is enabled
          totalUsers.value = perPage * 100 // Arbitrary large number
          totalPages.value = 100 // Arbitrary large number
        } else {
          totalUsers.value = users.value.length
          totalPages.value = Math.ceil(totalUsers.value / perPage) || 1
        }
      }
      
      // Ensure we have at least one page
      if (totalPages.value === 0) totalPages.value = 1
      
      // If current page is greater than total pages, reset to page 1
      if (currentPage.value > totalPages.value && totalPages.value > 0) {
        currentPage.value = 1
      }
    } else {
      // Handle empty or invalid response
      console.warn('API returned unexpected data format:', response.data)
      
      if (users.value.length === 0) {
        // Use mock data as fallback only if we have no existing data
        users.value = getMockUsers()
        totalUsers.value = users.value.length
        totalPages.value = Math.ceil(totalUsers.value / perPage) || 1
        toast.warning('Using sample data for display')
      } else {
        // Keep existing data if we have it
        toast.error('Failed to refresh user data')
      }
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    apiError.value = true
    
    if (users.value.length === 0) {
      // Use mock data as fallback only if we have no existing data
      users.value = getMockUsers()
      totalUsers.value = users.value.length
      totalPages.value = Math.ceil(totalUsers.value / perPage) || 1
      toast.warning('Using sample data for display')
    } else {
      // Keep existing data if we have it
      toast.error('Failed to refresh user data')
    }
  } finally {
    isLoading.value = false
  }
}
const allSelected = computed(() => selectedRows.value.length === users.value.length)

// With API-based filtering, we don't need to filter locally
// The API handles filtering based on the parameters we send
const filteredUsers = computed(() => users.value)

// Initialize data when component mounts
onMounted(() => {
  fetchUsers()
  
  // Add click outside listener to close export dropdown
  document.addEventListener('click', (e) => {
    const exportButton = document.querySelector('[data-export-button]')
    const exportDropdown = document.querySelector('[data-export-dropdown]')
    
    if (exportButton && exportDropdown) {
      if (!exportButton.contains(e.target) && !exportDropdown.contains(e.target)) {
        showExportDropdown.value = false
      }
    }
  })
})

const currentPage = ref(1)
const perPage = 10

// Table columns configuration
const columns = ref([
  {
    key: 'checkbox',
    title: '',
    field: 'checkbox',
    sortable: false,
    filterable: false,
    visible: true,
    width: '50px',
    headerClass: 'text-center',
    cellClass: 'text-center',
  },
  {
    key: 'id',
    title: 'ID',
    field: 'id',
    sortable: true,
    filterable: true,
    visible: true,
    width: '150px',
    headerClass: 'font-semibold',
  },
  {
    key: 'name',
    title: 'Name',
    field: 'name',
    sortable: true,
    filterable: true,
    visible: true,
    width: '200px',
    headerClass: 'font-semibold',
  },
  {
    key: 'email',
    title: 'Email',
    field: 'email',
    sortable: true,
    filterable: true,
    visible: true,
    width: '250px',
    headerClass: 'font-semibold',
  },
  {
    key: 'role',
    title: 'Role',
    field: 'role',
    sortable: true,
    filterable: true,
    visible: true,
    width: '150px',
    headerClass: 'font-semibold',
  },
  {
    key: 'status',
    title: 'Status',
    field: 'status',
    sortable: true,
    filterable: true,
    visible: true,
    width: '130px',
    headerClass: 'font-semibold',
  },
  {
    key: 'registration',
    title: 'Registration',
    field: 'registration',
    sortable: true,
    filterable: true,
    visible: true,
    width: '150px',
    headerClass: 'font-semibold',
  },
  {
    key: 'actions',
    title: 'Actions',
    field: 'actions',
    sortable: false,
    filterable: false,
    visible: true,
    width: '100px',
    headerClass: 'font-semibold text-center',
    cellClass: 'text-center',
  },
])

// Computed property for visible columns
const visibleColumns = computed(() => {
  return columns.value.filter(col => col.visible !== false)
})

// With API pagination, we don't need to compute these locally
// Instead, we'll use the API's pagination
const paginatedUsers = computed(() => users.value)

// Calculate pagination display values with safety checks
const startIndex = computed(() => {
  if (totalUsers.value === 0) return 0
  return (currentPage.value - 1) * perPage
})

const endIndex = computed(() => {
  if (totalUsers.value === 0) return 0
  return Math.min(startIndex.value + paginatedUsers.value.length, totalUsers.value)
})

// Computed properties to control button states
const hasPreviousPage = computed(() => currentPage.value > 1)
const hasNextPage = computed(() => {
  // If we have a total count from the API, use it to determine if there are more pages
  if (totalUsers.value > 0) {
    return currentPage.value < totalPages.value
  }
  // If we don't have a total count but have a full page of results, assume there might be more
  return paginatedUsers.value.length >= perPage
})

// Debug computed property to help troubleshoot pagination
const paginationDebugInfo = computed(() => {
  return {
    currentPage: currentPage.value,
    totalPages: totalPages.value,
    totalUsers: totalUsers.value,
    usersOnCurrentPage: paginatedUsers.value.length,
    hasPreviousPage: hasPreviousPage.value,
    hasNextPage: hasNextPage.value,
    perPage
  }
})

// Log pagination debug info when it changes
watch(paginationDebugInfo, (info) => {
  console.log('Pagination Debug Info:', info)
}, { deep: true })

// Watch for changes that should trigger a new API call
const watchDependencies = () => {
  fetchUsers()
}

// Reset to page 1 when filters change
const resetPageAndFetch = () => {
  currentPage.value = 1
  fetchUsers()
}

// We don't need to watch currentPage anymore since we're calling fetchUsers directly in the pagination buttons

// Watch for changes in filters - reset to page 1
watch([selectedStatus, selectedRole, search], resetPageAndFetch, { debounce: 300 })

function toggleSelectAll() {
  selectedRows.value = allSelected.value ? [] : users.value.map(u => u.id)
}

function toggleUserSelection(userId) {
  const index = selectedRows.value.indexOf(userId)
  if (index === -1) {
    selectedRows.value.push(userId)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

const onRowClick = (row) => {
  showUserDetails(row)
}

function statusBadgeClass(status) {
  const base = 'px-3 py-1 rounded-full text-xs font-semibold'
  const statusUpper = String(status || '').toUpperCase()
  switch (statusUpper) {
    case 'ACTIVE': 
      return `${base} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800`
    case 'SUSPENDED': 
      return `${base} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800`
    case 'INACTIVE': 
      return `${base} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800`
    case 'BLOCKED':
      return `${base} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800`
    case 'DEACTIVATED':
      return `${base} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700`
    default: 
      return `${base} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400 border border-gray-200 dark:border-gray-700`
  }
}

function assignRoles() {
  alert(`Assigning roles to: ${selectedRows.value.join(', ')}`)
}

function exportUsers() {
  alert(`Exporting ${selectedRows.value.length} users`)
}

function deleteSelected() {
  users.value = users.value.filter(u => !selectedRows.value.includes(u.id))
  selectedRows.value = []
}

function deleteUser(id) {
  users.value = users.value.filter(u => u.id !== id)
}

const roleOptions = ['CUSTOMER', 'AGENT', 'PARTNER', 'DEVELOPER', 'MERCHANT']
const statusOptions = ['Active', 'Inactive']

const handleAddUser = async () => {
  try {
    const response = await userService.createUser({
      email: newUser.value.email,
      firstname: newUser.value.firstname,
      lastname: newUser.value.lastname,
      phonenumber: newUser.value.phonenumber,
      role: newUser.value.role.toUpperCase()
    });
    if (response.data && response.data.ok) {
      toast.success(response.data.message || 'Account created successfully');
      fetchUsers();
      showAddUserModal.value = false;
      newUser.value = {
        firstname: '',
        lastname: '',
        email: '',
        phonenumber: '',
        role: ''
      };
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

const activities = ref([])
const loadingActivities = ref(false)
const activitiesError = ref(null)

const transactions = ref([])
const loadingTransactions = ref(false)
const transactionError = ref(null)
const showTransactionModal = ref(false)
const selectedTransaction = ref(null)

const referredUsers = [
  {
    name: 'Alex Johnson',
    date: '2023-03-15',
    status: 'Active',
    commission: '25.00'
  },
  {
    name: 'Alex Johnson',
    date: '2023-03-15',
    status: 'Active',
    commission: '25.00'
  },
  {
    name: 'Alex Johnson',
    date: '2023-03-15',
    status: 'Active',
    commission: '25.00'
  }
]

const copyReferralCode = () => {
  if (referralData.value?.referral_code) {
    navigator.clipboard.writeText(referralData.value.referral_code)
    toast.success('Referral code copied to clipboard!')
  }
}

const copyReferralLink = () => {
  navigator.clipboard.writeText('https://example.com/ref/U1001')
  // You might want to add a toast notification here
}

// Format currency for Nigerian Naira
const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '0.00'
  return new Intl.NumberFormat('en-NG', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

const showUserDetails = async (user) => {
  try {
    // First set basic user info from the list
    selectedUser.value = user
    showUserDetailsModal.value = true
    activeTab.value = 'Activities' // Reset to Activities tab
    
    // Reset transactions and activities when opening modal
    transactions.value = []
    transactionError.value = null
    activities.value = []
    activitiesError.value = null
    
    // Then fetch detailed user information
    const response = await userService.getUserById(user.id)
    if (response.data && response.data.data) {
      const userData = response.data.data
      
      // Update the selected user with detailed information
      selectedUser.value = {
        ...user,
        fullDetails: userData,
        // Map specific fields for the UI
        photo: userData.photo,
        first_name: userData.first_name,
        lastname: userData.lastname,
        phone: userData.phone,
        status: userData.status,
        createdAt: userData.createdAt,
        lastlogin: userData.lastlogin,
        use2fa: userData.use2fa,
        userType: userData.userType,
        shippingAddress: userData.shippingAddress,
        homeAddress: userData.homeAddress,
        workAddress: userData.workAddress,
        notificationPreferences: userData.notificationPreferences,
        email: userData.email || user.email
      }
    }
    
    // Fetch activities since Activities tab is the default
    if (activeTab.value === 'Activities' && selectedUser.value?.id) {
      fetchUserActivities(selectedUser.value.id)
    }
  } catch (error) {
    console.error('Error fetching user details:', error)
  }
}

const handleEditUser = (user) => {
  editingUser.value = { ...user }
  showEditUserModal.value = true
}

const handleAdjustBalance = (user) => {
  adjustBalanceData.value = {
    currentBalance: 1250.45, // This would normally come from the user object
    adjustmentType: 'Add Fund',
    amount: '',
    reason: 'Manual Adjustment'
  }
  showAdjustBalanceModal.value = true
}

const handleBalanceAdjustment = () => {
  // Here you would implement the actual balance adjustment logic
  // For now, we'll just close the modal
  showAdjustBalanceModal.value = false
}

const handleChangeRole = (user) => {
  showAssignRolesModal.value = true
}

const handleAssignRoles = () => {
  // Here you would implement the actual role assignment logic
  showAssignRolesModal.value = false
}

const toggleRole = (role) => {
  const index = assignRolesData.value.selectedRoles.indexOf(role.name)
  if (index === -1) {
    assignRolesData.value.selectedRoles.push(role.name)
    role.selected = true
  } else {
    assignRolesData.value.selectedRoles.splice(index, 1)
    role.selected = false
  }
}

const handleDeleteUser = (userId) => {
  userToDelete.value = users.value.find(u => u.id === userId)
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (userToDelete.value) {
    try {
      // Call API to delete user
      const response = await userService.deleteUser(userToDelete.value.id);
      
      if (response.data && response.data.ok) {
        // Refresh the user list
        fetchUsers();
        showDeleteModal.value = false;
        userToDelete.value = null;
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
}

const handleUpdateUser = async () => {
  try {
    // Call API to update user
    const response = await userService.updateUser({
      userId: editingUser.value.id,
      firstname: editingUser.value.name.split(' ')[0] || '',
      lastname: editingUser.value.name.split(' ').slice(1).join(' ') || '',
      status: editingUser.value.status.toUpperCase(),
      role: editingUser.value.role.toUpperCase()
    });
    
    if (response.data && response.data.ok) {
      // Refresh the user list
      fetchUsers();
      showEditUserModal.value = false;
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
}

const exportToExcel = () => {
  // Determine which users to export
  const usersToExport = selectedRows.value.length > 0 
    ? users.value.filter(user => selectedRows.value.includes(user.id))
    : users.value

  if (usersToExport.length === 0) {
    toast.warning('No users to export')
    showExportDropdown.value = false
    return
  }

  // Format data for Excel
  const excelData = usersToExport.map(user => ({
    'User ID': user.id,
    'Full Name': user.name,
    'Email': user.email,
    'Role': user.role,
    'Status': user.status,
    'Registration Date': user.registration
  }))

  const worksheet = XLSX.utils.json_to_sheet(excelData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users")
  
  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 10)
  const filename = selectedRows.value.length > 0 
    ? `selected-users-${timestamp}.xlsx`
    : `all-users-${timestamp}.xlsx`
  
  XLSX.writeFile(workbook, filename)
  showExportDropdown.value = false
  toast.success(`Exported ${usersToExport.length} users to Excel successfully!`)
}

const exportToPDF = () => {
  // Determine which users to export
  const usersToExport = selectedRows.value.length > 0 
    ? users.value.filter(user => selectedRows.value.includes(user.id))
    : users.value

  if (usersToExport.length === 0) {
    toast.warning('No users to export')
    showExportDropdown.value = false
    return
  }

  const doc = new jsPDF()
  
  // Add title
  const title = selectedRows.value.length > 0 
    ? `Selected Users (${usersToExport.length})`
    : `All Users (${usersToExport.length})`
  
  doc.setFontSize(16)
  doc.text(title, 14, 22)
  
  // Add timestamp
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30)
  
  // Prepare table data
  const tableColumn = ["ID", "Name", "Email", "Role", "Status", "Registration"]
  const tableRows = usersToExport.map(user => [
    user.id,
    user.name,
    user.email,
    user.role,
    user.status,
    user.registration
  ])

  // Generate PDF with auto table using the plugin function
  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    styles: {
      fontSize: 8,
      cellPadding: 2
    },
    headStyles: {
      fillColor: [59, 130, 246], // Blue color
      textColor: 255
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252] // Light gray
    }
  })
  
  // Generate filename with timestamp
  const timestamp = new Date().toISOString().slice(0, 10)
  const filename = selectedRows.value.length > 0 
    ? `selected-users-${timestamp}.pdf`
    : `all-users-${timestamp}.pdf`
  
  doc.save(filename)
  showExportDropdown.value = false
  toast.success(`Exported ${usersToExport.length} users to PDF successfully!`)
}

// Referral data
const referralData = ref(null)
const loadingReferrals = ref(false)
const referralError = ref(null)

// Fetch referral data for a user
const fetchReferralData = async (userId) => {
  if (!userId) return
  
  loadingReferrals.value = true
  referralError.value = null
  
  try {
    const [referralsResponse, summaryResponse] = await Promise.all([
      userService.getUserReferrals(userId),
      userService.getUserReferralSummary(userId)
    ])
    
    if (referralsResponse.data?.ok && summaryResponse.data?.ok) {
      // Merge the data from both endpoints
      referralData.value = {
        ...summaryResponse.data.data,
        referrals: referralsResponse.data.data || []
      }
      console.log('Referral data loaded:', referralData.value)
    } else {
      throw new Error('Failed to fetch referral data')
    }
  } catch (error) {
    console.error('Error fetching referral data:', error)
    referralError.value = error.message || 'Failed to load referral data'
  } finally {
    loadingReferrals.value = false
  }
}

// Transform transaction data for display
const transformUserTransactionData = (rawTransactions) => {
  if (!Array.isArray(rawTransactions)) {
    console.warn('transformUserTransactionData: rawTransactions is not an array', rawTransactions)
    return []
  }

  return rawTransactions.map(t => {
    if (!t || typeof t !== 'object') {
      return null
    }

    try {
      const amount = typeof t.amount === 'number' ? t.amount : (parseFloat(t.amount) || 0)
      const entry = (t.entry || '').toUpperCase()
      const isDeposit = entry === 'CREDIT' || entry === 'DEPOSIT'
      
      return {
        id: t.id || t.transaction_id || `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: t.category || t.service_type || t.type || 'Transaction',
        type: isDeposit ? 'deposit' : 'withdrawal',
        amount: formatCurrency(amount),
        method: t.payment_method || t.provider || t.network || 'N/A',
        status: t.status === 'SUCCESSFUL' ? 'Completed' : (t.status || 'Pending'),
        time: t.created_at ? new Date(t.created_at).toLocaleString() : 'N/A',
        rawData: t
      }
    } catch (error) {
      console.error('Error transforming transaction:', error, t)
      return null
    }
  }).filter(t => t !== null)
}

// Fetch user transactions
const fetchUserTransactions = async (userId) => {
  if (!userId) return
  
  loadingTransactions.value = true
  transactionError.value = null
  
  try {
    // Fetch transactions and filter by user email or ID
    // Since the API might not have a direct user_id filter, we'll fetch and filter client-side
    // or use the search query parameter if it supports user filtering
    const response = await transactionService.getTransactions({
      limit: 100, // Fetch more to ensure we get user's transactions
      page: 1
    })
    
    const data = response.data
    let rawTransactions = data.data || data || []
    
    // Filter transactions by user ID (check both user_id and user.id)
    if (selectedUser.value?.id || selectedUser.value?.rawData?.id) {
      const userIdToMatch = selectedUser.value.id || selectedUser.value.rawData?.id
      rawTransactions = rawTransactions.filter(t => {
        return t.user_id === userIdToMatch || 
               t.user?.id === userIdToMatch ||
               (t.user?.email && selectedUser.value?.email && t.user.email === selectedUser.value.email)
      })
    }
    
    if (rawTransactions.length > 0) {
      transactions.value = transformUserTransactionData(rawTransactions)
      console.log('Loaded', transactions.value.length, 'transactions for user')
    } else {
      transactions.value = []
      console.log('No transactions found for this user')
    }
  } catch (error) {
    console.error('Error fetching user transactions:', error)
    transactionError.value = error.message || 'Failed to load transactions'
    transactions.value = []
  } finally {
    loadingTransactions.value = false
  }
}

// Transform activity data for display
const transformActivityData = (rawActivities) => {
  if (!Array.isArray(rawActivities)) {
    console.warn('transformActivityData: rawActivities is not an array', rawActivities)
    return []
  }

  return rawActivities.map(activity => {
    if (!activity || typeof activity !== 'object') {
      return null
    }

    try {
      return {
        title: activity.action || activity.type || activity.title || 'Activity',
        description: activity.description || activity.message || activity.details || '',
        ip: activity.ip || activity.ip_address || activity.ipAddress || 'N/A',
        time: activity.created_at ? new Date(activity.created_at).toLocaleString() : 
              activity.timestamp ? new Date(activity.timestamp).toLocaleString() :
              activity.date ? new Date(activity.date).toLocaleString() : 'N/A',
        rawData: activity
      }
    } catch (error) {
      console.error('Error transforming activity:', error, activity)
      return null
    }
  }).filter(a => a !== null)
}

// Fetch user activities
const fetchUserActivities = async (userId) => {
  if (!userId) return
  
  loadingActivities.value = true
  activitiesError.value = null
  
  try {
    // Fetch activities using the correct endpoint: /api/v1/admin/activities?user_id={userId}
    const response = await userService.getUserActivities(userId, { 
      limit: 50,
      sort: 'desc' // Most recent first
    })
    
    const data = response.data
    // Handle different response structures
    let rawActivities = []
    if (data.data && Array.isArray(data.data)) {
      rawActivities = data.data
    } else if (data.activities && Array.isArray(data.activities)) {
      rawActivities = data.activities
    } else if (Array.isArray(data)) {
      rawActivities = data
    }
    
    if (rawActivities.length > 0) {
      activities.value = transformActivityData(rawActivities)
      console.log('Loaded', activities.value.length, 'activities for user')
    } else {
      activities.value = []
      console.log('No activities found for this user')
    }
  } catch (error) {
    console.error('Error fetching user activities:', error)
    activitiesError.value = error?.response?.data?.message || error.message || 'Failed to load activities'
    activities.value = []
  } finally {
    loadingActivities.value = false
  }
}

// Handle tab change to fetch data when tabs are clicked
const handleTabChange = (tabName) => {
  activeTab.value = tabName
  if (tabName === 'Referrals' && selectedUser.value?.id) {
    fetchReferralData(selectedUser.value.id)
  } else if (tabName === 'Transactions' && selectedUser.value?.id) {
    fetchUserTransactions(selectedUser.value.id)
  } else if (tabName === 'Activities' && selectedUser.value?.id) {
    fetchUserActivities(selectedUser.value.id)
  }
}

// View transaction details
const viewTransactionDetails = (transaction) => {
  selectedTransaction.value = transaction.rawData || transaction
  showTransactionModal.value = true
}

// Close transaction modal
const closeTransactionModal = () => {
  showTransactionModal.value = false
  selectedTransaction.value = null
}

</script>

<style scoped>
.btn {
  padding: 0.75rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-width: 1px;
  border-radius: 0.375rem;
  opacity: 1;
}
.btn-primary {
  background-color: #2563eb;
  color: #fff;
}
</style>
