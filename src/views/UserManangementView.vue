<template>
  <div class="p-6">
    <!-- Search & Filters -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <input v-model="search" type="text" placeholder="Search name/email" class="input w-full md:w-64" />

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
        <button class="btn btn-primary">Export</button>
        <button class="btn btn-primary" @click="showAddUserModal = true">+ Add User</button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto rounded border bg-white dark:bg-gray-900">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-2">
              <input type="checkbox" @change="toggleSelectAll" :checked="allSelected" />
            </th>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Role</th>
            <th class="px-4 py-2">Status</th>
            <th class="px-4 py-2">Registration</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
            @click="showUserDetails(user)"
          >
            <td class="px-4 py-2" @click.stop>
              <input type="checkbox" v-model="selectedRows" :value="user.id" />
            </td>
            <td class="px-4 py-2">{{ user.id }}</td>
            <td class="px-4 py-2">{{ user.name }}</td>
            <td class="px-4 py-2">{{ user.email }}</td>
            <td class="px-4 py-2">{{ user.role }}</td>
            <td class="px-4 py-2">
              <span :class="statusBadgeClass(user.status)">
                {{ user.status }}
              </span>
            </td>
            <td class="px-4 py-2">{{ user.registration }}</td>
            <td class="px-4 py-2" @click.stop>
              <RowActionMenu 
                :user="user" 
                @view="showUserDetails(user)"
                @edit="handleEditUser(user)"
                @adjust-balance="handleAdjustBalance(user)"
                @change-role="handleChangeRole(user)"
                @delete="handleDeleteUser"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-between items-center px-4 py-3 border-t text-sm dark:text-white">
        <span>Showing {{ startIndex + 1 }} - {{ endIndex }} of {{ filteredUsers.length }}</span>
        <div class="flex gap-2">
          <button class="btn" :disabled="currentPage === 1" @click="currentPage--">Previous</button>
          <button class="btn" :disabled="endIndex >= filteredUsers.length" @click="currentPage++">Next</button>
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
                  <!-- Full Name -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      v-model="newUser.fullName"
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
                      v-model="newUser.email"
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
                        <div class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                          <icon-user class="w-12 h-12 text-gray-500 dark:text-gray-400" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedUser?.name }}</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{ selectedUser?.email }}</p>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                          Active
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
                            <span class="text-sm text-gray-500 dark:text-gray-400">Role:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedUser?.role }}</span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Registered:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedUser?.registration }}</span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">KYC Status:</span>
                            <span class="text-sm font-medium text-green-600 flex items-center">
                              <span class="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                              Verified
                            </span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Referrals:</span>
                            <span class="text-sm font-medium text-gray-900 dark:text-white">12</span>
                          </div>
                          <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-500 dark:text-gray-400">Wallet Balance:</span>
                            <span class="text-sm font-bold text-gray-900 dark:text-white">$1,250.45</span>
                          </div>
                        </div>
                      </div>

                      <!-- Quick Actions -->
                      <div class="mt-6">
                        <h4 class="text-sm font-medium text-gray-900 dark:text-white mb-4">Quick Actions</h4>
                        <div class="grid grid-cols-2 gap-3">
                          <button class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <icon-pencil class="w-4 h-4" />
                            Edit
                          </button>
                          <button class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <icon-wallet class="w-4 h-4" />
                            Wallet
                          </button>
                          <button class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <icon-user-circle class="w-4 h-4" />
                            Role
                          </button>
                          <button class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                            <icon-ban class="w-4 h-4" />
                            Suspend
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
                            @click="activeTab = tab"
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
                        
                        <div class="space-y-6">
                          <div v-for="(activity, index) in activities" :key="index" class="flex items-start gap-4">
                            <div class="flex-shrink-0">
                              <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <icon-info-circle class="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>
                            <div class="flex-1 min-w-0">
                              <div class="flex justify-between items-start">
                                <div>
                                  <p class="text-sm font-medium text-gray-900 dark:text-white">{{ activity.title }}</p>
                                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description }}</p>
                                  <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">IP: {{ activity.ip }}</p>
                                </div>
                                <span class="text-xs text-gray-400 dark:text-gray-500">{{ activity.time }}</span>
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
                        
                        <div class="space-y-4">
                          <div v-for="(transaction, index) in transactions" :key="index" 
                            class="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg">
                            <div class="flex items-start gap-3">
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
                              <div>
                                <div class="flex items-center gap-2">
                                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                                    {{ transaction.title }}
                                  </p>
                                  <span class="text-xs text-gray-500">- {{ transaction.id }}</span>
                                </div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Method: {{ transaction.method }}</p>
                              </div>
                            </div>
                            <div class="text-right">
                              <p :class="[
                                'text-sm font-medium',
                                transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                              ]">
                                {{ transaction.type === 'deposit' ? '+' : '-' }}${{ transaction.amount }}
                              </p>
                              <span :class="[
                                'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
                                transaction.status === 'Completed' ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                              ]">
                                {{ transaction.status }}
                              </span>
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

                        <!-- Stats Cards -->
                        <div class="grid grid-cols-2 gap-4 mb-6">
                          <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Referrals</p>
                            <p class="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
                          </div>
                          <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4">
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Earnings from Referrals</p>
                            <p class="text-2xl font-semibold text-green-500">$120.45</p>
                          </div>
                        </div>

                        <!-- Referral Link -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg p-4 mb-6">
                          <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">Referral Link</p>
                          <div class="flex items-center gap-2">
                            <input
                              type="text"
                              readonly
                              value="https://example.com/ref/U1001"
                              class="flex-1 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded px-3 py-2"
                            />
                            <button
                              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                              @click="copyReferralLink"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <!-- Referred Users Table -->
                        <div class="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden">
                          <p class="text-sm font-medium text-gray-900 dark:text-white p-4 border-b border-gray-100 dark:border-gray-700">
                            Referred Users
                          </p>
                          <div class="overflow-x-auto">
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
                                <tr v-for="(referral, index) in referredUsers" :key="index">
                                  <td class="px-4 py-3">
                                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ referral.name }}</span>
                                  </td>
                                  <td class="px-4 py-3">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">{{ referral.date }}</span>
                                  </td>
                                  <td class="px-4 py-3">
                                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-600 text-white">
                                      {{ referral.status }}
                                    </span>
                                  </td>
                                  <td class="px-4 py-3 text-right">
                                    <span class="text-sm font-medium text-green-500">${{ referral.commission }}</span>
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
                      ${{ adjustBalanceData.currentBalance.toFixed(2) }}
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
                      Amount ($)
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
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import DropdownFilter from '@/components/DropdownFilter.vue'
import DropdownAction from '@/components/DropdownAction.vue'
import RowActionMenu from '@/components/RowActionMenu.vue'
import IconUser from '@/components/icon/icon-user.vue'
import IconPencil from '@/components/icon/icon-pencil.vue'
import IconWallet from '@/components/icon/icon-wallet.vue'
import IconUserCircle from '@/components/icon/icon-user-circle.vue'
import IconBan from '@/components/icon/icon-ban.vue'
import IconInfoCircle from '@/components/icon/icon-info-circle.vue'

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
  fullName: '',
  email: '',
  role: '',
  status: ''
})

const statuses = ['All Status', 'Active', 'Inactive', 'Suspended']
const roles = ['All Roles', 'Admin', 'Agent', 'Customer']

const generateUsers = () => {
  const dummy = []
  for (let i = 1; i <= 100; i++) {
    dummy.push({
      id: `U${1000 + i}`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: roles[i % roles.length] || 'Customer',
      status: statuses[i % statuses.length] || 'Active',
      registration: `2023-01-${(i % 28 + 1).toString().padStart(2, '0')}`,
    })
  }
  return dummy
}

const users = ref(generateUsers())
const allSelected = computed(() => selectedRows.value.length === users.value.length)

const filteredUsers = computed(() => {
  return users.value.filter(u => {
    return (
      (selectedStatus.value === 'All Status' || u.status === selectedStatus.value) &&
      (selectedRole.value === 'All Roles' || u.role === selectedRole.value) &&
      (u.name.toLowerCase().includes(search.value.toLowerCase()) || u.email.toLowerCase().includes(search.value.toLowerCase()))
    )
  })
})

const currentPage = ref(1)
const perPage = 10
const startIndex = computed(() => (currentPage.value - 1) * perPage)
const endIndex = computed(() => Math.min(startIndex.value + perPage, filteredUsers.value.length))
const paginatedUsers = computed(() => filteredUsers.value.slice(startIndex.value, endIndex.value))

function toggleSelectAll() {
  selectedRows.value = allSelected.value ? [] : users.value.map(u => u.id)
}

function statusBadgeClass(status) {
  const base = 'px-2 py-1 rounded text-xs font-medium'
  switch (status) {
    case 'Active': return `${base} bg-green-100 text-green-800`
    case 'Suspended': return `${base} bg-yellow-100 text-yellow-800`
    case 'Inactive': return `${base} bg-red-100 text-red-800`
    default: return base
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

const roleOptions = ['Admin', 'Agent', 'Customer']
const statusOptions = ['Active', 'Inactive']

const handleAddUser = () => {
  // Add new user logic here
  const user = {
    id: `U${1000 + users.value.length + 1}`,
    name: newUser.value.fullName,
    email: newUser.value.email,
    role: newUser.value.role,
    status: newUser.value.status,
    registration: new Date().toISOString().split('T')[0]
  }
  
  users.value.unshift(user)
  showAddUserModal.value = false
  
  // Reset form
  newUser.value = {
    fullName: '',
    email: '',
    role: '',
    status: ''
  }
}

const activities = [
  {
    title: 'Login',
    description: 'Successful login from Chrome/Windows',
    ip: '192.168.1.1',
    time: '4/8/2023, 9:00:00 AM'
  },
  {
    title: 'Profile Update',
    description: 'Updated phone number',
    ip: '192.168.1.1',
    time: '4/7/2023, 2:50:00 PM'
  },
  {
    title: 'Login Failed',
    description: 'Failed login attempt from unknown device',
    ip: '192.168.0.2',
    time: '3/25/2023, 8:00:00 AM'
  },
  {
    title: 'Password Changed',
    description: 'Password successfully changed',
    ip: '192.168.1.1',
    time: '4/1/2023, 11:20:00 AM'
  }
]

const transactions = [
  {
    id: 'TRX001',
    title: 'Deposit',
    type: 'deposit',
    amount: '500.00',
    method: 'Credit Card',
    status: 'Completed',
    time: '4/5/2023, 10:30:00 AM'
  },
  {
    id: 'TRX002',
    title: 'Withdrawal',
    type: 'withdrawal',
    amount: '200.00',
    method: 'Bank Transfer',
    status: 'Completed',
    time: '4/2/2023, 3:45:00 PM'
  },
  {
    id: 'TRX003',
    title: 'Commission',
    type: 'deposit',
    amount: '15.25',
    method: 'Referral',
    status: 'Completed',
    time: '3/28/2023, 9:15:00 AM'
  },
  {
    id: 'TRX004',
    title: 'Withdrawal',
    type: 'withdrawal',
    amount: '150.00',
    method: 'PayPal',
    status: 'Failed',
    time: '3/20/2023, 2:30:00 PM'
  },
  {
    id: 'TRX001',
    title: 'Deposit',
    type: 'deposit',
    amount: '25.00',
    method: 'Promotion',
    status: 'Completed',
    time: '3/15/2023, 11:20:00 AM'
  }
]

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

const copyReferralLink = () => {
  navigator.clipboard.writeText('https://example.com/ref/U1001')
  // You might want to add a toast notification here
}

const showUserDetails = (user) => {
  selectedUser.value = user
  showUserDetailsModal.value = true
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

const confirmDelete = () => {
  if (userToDelete.value) {
    users.value = users.value.filter(u => u.id !== userToDelete.value.id)
    showDeleteModal.value = false
    userToDelete.value = null
  }
}

const handleUpdateUser = () => {
  const index = users.value.findIndex(u => u.id === editingUser.value.id)
  if (index !== -1) {
    users.value[index] = { ...editingUser.value }
  }
  showEditUserModal.value = false
}
</script>

<style scoped>
.input {
  padding: 0.75rem 0.75rem;
  border-width: 1px;
  border-radius: 0.375rem;
  background-color: #1f2937;
  color: #fff;
}
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
