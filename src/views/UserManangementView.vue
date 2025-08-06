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
        <span v-if="isLoading">Loading users...</span>
        <span v-else-if="totalUsers === 0">No users found</span>
        <span v-else>Showing {{ totalUsers > 0 ? startIndex + 1 : 0 }} - {{ endIndex }} of {{ totalUsers }}</span>
        <div class="flex gap-2">
          <button 
            class="btn" 
            :disabled="!hasPreviousPage || isLoading" 
            @click="currentPage = Math.max(1, currentPage - 1); fetchUsers()"
          >
            Previous
          </button>
          <span class="flex items-center px-2">{{ currentPage }} / {{ Math.max(1, totalPages) }}</span>
          <button 
            class="btn" 
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
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
import userService from '@/services/userService'
import { useToast } from 'vue-toastification'
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
const roles = ['All Roles', 'Admin', 'Agent', 'Customer']

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
})

const currentPage = ref(1)
const perPage = 10

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

const showUserDetails = async (user) => {
  try {
    // First set basic user info from the list
    selectedUser.value = user
    showUserDetailsModal.value = true
    
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
        notificationPreferences: userData.notificationPreferences
      }
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
