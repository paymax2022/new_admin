<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Total Referrers</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">35 Users</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">With at least one referral</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Total Referrals</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">128 Users</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">Joined via referral links.</div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div class="text-xs text-gray-500 dark:text-gray-400 mb-2">Top Performer</div>
        <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">John Doe</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">8 referrals, $420.50 earned</div>
      </div>
    </div>

    <!-- Referral Network Section -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">Referral Network</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">View and manage the hierarchical referral structure</p>
      </div>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center">
        <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
        Export
      </button>
    </div>
    <div class="flex items-center gap-3 mb-4">
      <div class="relative flex-1 max-w-xs">
        <MagnifyingGlassIcon class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          v-model="search"
          type="text"
          placeholder="Search Wallet"
          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
        >
      </div>
      <select v-model="statusFilter" class="border border-gray-300 rounded-md text-sm px-3 py-2 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center">
        <ArrowDownTrayIcon class="h-4 w-4 mr-2" />
        Export Tree
      </button>
      <button @click="openAddManualReferralModal" class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 font-medium flex items-center">
        <PlusIcon class="h-4 w-4 mr-2" />
        Add Manual Referral
      </button>
    </div>

    <!-- Referral Hierarchy List -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <div class="divide-y divide-gray-200 dark:divide-gray-700">
        <div v-for="(ref, idx) in filteredReferrals" :key="idx" class="flex items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
          <div class="flex items-center w-48">
            <UserCircleIcon class="h-8 w-8 text-gray-400 mr-3" />
            <div>
              <div class="font-medium text-gray-900 dark:text-gray-100">{{ ref.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">{{ ref.email }}</div>
            </div>
          </div>
          <div class="w-20">
            <span :class="[
              'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
              ref.status === 'Active' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'
            ]">
              {{ ref.status }}
            </span>
          </div>
          <div class="w-20 text-xs text-gray-500 dark:text-gray-400">Level {{ ref.level }}</div>
          <div class="w-32 text-xs text-gray-900 dark:text-gray-100">{{ ref.referrals }} Referrals</div>
          <div class="w-32 text-xs text-gray-900 dark:text-gray-100">${{ ref.earnings.toFixed(2) }} Earnings</div>
          <div class="w-28 text-xs text-gray-500 dark:text-gray-400">{{ ref.joined }}</div>
          <div class="flex-1"></div>
          <div class="relative">
            <Menu as="div" class="relative inline-block text-left">
                <MenuButton class="text-gray-400 hover:text-gray-600">
                    <EllipsisVerticalIcon class="h-5 w-5" />
                </MenuButton>

                <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95">
                    <MenuItems
                        class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div class="py-1">
                            <MenuItem v-slot="{ active }">
                                <a href="#" @click="openUserProfileModal(ref)" :class="[active ? 'bg-gray-100 dark:bg-gray-600' : '', 'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200']">
                                    <UserCircleIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                    View Profile
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="#" @click="openReferralsListModal(ref)" :class="[active ? 'bg-gray-100 dark:bg-gray-600' : '', 'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200']">
                                    <EyeIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                    View Referral
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="#" @click="openCommissionHistoryModal(ref)" :class="[active ? 'bg-gray-100 dark:bg-gray-600' : '', 'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200']">
                                    <ClockIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                    Commission History
                                </a>
                            </MenuItem>
                             <MenuItem v-slot="{ active }">
                                <a href="#" @click="openAddManualReferralModal" :class="[active ? 'bg-gray-100 dark:bg-gray-600' : '', 'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200']">
                                    <UserPlusIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                    Add Manual Referral
                                </a>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <a href="#" @click="openSendMessageModal(ref)" :class="[active ? 'bg-gray-100 dark:bg-gray-600' : '', 'group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200']">
                                    <ChatBubbleLeftEllipsisIcon class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                    Send Message
                                </a>
                            </MenuItem>
                             <MenuItem v-slot="{ active }">
                                <a href="#" :class="[active ? 'bg-gray-100 dark:bg-gray-600' : '', 'group flex items-center px-4 py-2 text-sm text-red-700 dark:text-red-500']">
                                    <NoSymbolIcon class="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
                                    Block Referral
                                </a>
                            </MenuItem>
                        </div>
                    </MenuItems>
                </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>

    <!-- User Profile Modal -->
    <TransitionRoot appear :show="showUserProfileModal" as="template">
        <Dialog as="div" @close="showUserProfileModal = false" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
            </TransitionChild>

            <div class="fixed inset-y-0 right-0 overflow-y-auto">
                <div class="flex min-h-full justify-end">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-300"
                        enter-from="translate-x-full" enter-to="translate-x-0"
                        leave="transform transition ease-in-out duration-300" leave-from="translate-x-0"
                        leave-to="translate-x-full">
                        <DialogPanel class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl p-6">
                            <div class="flex justify-between items-start mb-6">
                                <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">User Profile</DialogTitle>
                                <button @click="showUserProfileModal = false"
                                    class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                            </div>

                            <div v-if="selectedUser" class="space-y-4">
                                <div>
                                    <p class="text-lg font-medium dark:text-white">{{ selectedUser.name }}</p>
                                    <span :class="[
                                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                        selectedUser.status === 'Active' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white'
                                    ]">
                                    {{ selectedUser.status }}
                                    </span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Email:</p>
                                    <p class="dark:text-gray-200">{{ selectedUser.email }}</p>
                                </div>
                                 <div>
                                    <p class="text-sm text-gray-500">Level:</p>
                                    <p class="dark:text-gray-200">{{ selectedUser.level }}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Total Referrals:</p>
                                    <p class="dark:text-gray-200">{{ selectedUser.referrals }}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Total Earnings:</p>
                                    <p class="dark:text-gray-200">${{ selectedUser.earnings.toFixed(2) }}</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Join Date:</p>
                                    <p class="dark:text-gray-200">{{ selectedUser.joined }}</p>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Referrals List Modal -->
    <TransitionRoot appear :show="showReferralsListModal" as="template">
        <Dialog as="div" @close="showReferralsListModal = false" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
            </TransitionChild>
            <div class="fixed inset-y-0 right-0 overflow-y-auto">
                <div class="flex min-h-full justify-end">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-300" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300" leave-from="translate-x-0" leave-to="translate-x-full">
                        <DialogPanel class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl p-6">
                            <div class="flex justify-between items-start mb-6">
                                <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">Referrals List</DialogTitle>
                                <button @click="showReferralsListModal = false" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                            </div>
                            
                            <div class="overflow-x-auto">
                              <table class="min-w-full">
                                  <thead>
                                      <tr class="border-b border-gray-200 dark:border-gray-700">
                                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Name</th>
                                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Email</th>
                                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Status</th>
                                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Join Date</th>
                                      </tr>
                                  </thead>
                                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                      <tr v-for="(referral, index) in referralsList" :key="index">
                                          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ referral.name }}</td>
                                          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{{ referral.email }}</td>
                                          <td class="px-4 py-3 whitespace-nowrap">
                                              <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', referral.status === 'Active' ? 'bg-blue-600 text-white' : 'bg-red-500 text-white']">
                                                  {{ referral.status }}
                                              </span>
                                          </td>
                                          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{{ referral.joinDate }}</td>
                                      </tr>
                                  </tbody>
                              </table>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Commission History Modal -->
    <TransitionRoot appear :show="showCommissionHistoryModal" as="template">
        <Dialog as="div" @close="showCommissionHistoryModal = false" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
            </TransitionChild>
            <div class="fixed inset-y-0 right-0 overflow-y-auto">
                <div class="flex min-h-full justify-end">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-300" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300" leave-from="translate-x-0" leave-to="translate-x-full">
                        <DialogPanel class="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-xl p-6">
                             <div class="flex justify-between items-start mb-6">
                                <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">Commission History</DialogTitle>
                                <button @click="showCommissionHistoryModal = false" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                            </div>
                            
                            <div class="overflow-x-auto">
                              <table class="min-w-full">
                                  <thead>
                                      <tr class="border-b border-gray-200 dark:border-gray-700">
                                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Date</th>
                                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Amount</th>
                                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Type</th>
                                          <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300">Status</th>
                                      </tr>
                                  </thead>
                                  <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                      <tr v-for="(commission, index) in commissionHistory" :key="index">
                                          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ commission.date }}</td>
                                          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{{ commission.amount }}</td>
                                          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{{ commission.type }}</td>
                                          <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-700 dark:text-gray-200">{{ commission.status }}</td>
                                      </tr>
                                  </tbody>
                              </table>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Add Manual Referral Modal -->
    <TransitionRoot appear :show="showAddManualReferralModal" as="template">
        <Dialog as="div" @close="showAddManualReferralModal = false" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
            </TransitionChild>
            <div class="fixed inset-y-0 right-0 overflow-y-auto">
                <div class="flex min-h-full justify-end">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-300" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300" leave-from="translate-x-0" leave-to="translate-x-full">
                        <DialogPanel class="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6">
                            <div class="flex justify-between items-start mb-4">
                                <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">Add Manual Referral</DialogTitle>
                                <button @click="showAddManualReferralModal = false" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                            </div>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Add a new user to the referral network</p>

                            <form @submit.prevent="handleAddReferral">
                                <div class="mb-4">
                                    <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                    <input type="text" id="name" v-model="newReferral.name" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter Name">
                                </div>
                                <div class="mb-6">
                                    <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                    <input type="email" id="email" v-model="newReferral.email" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Enter email address">
                                </div>
                                <div class="flex justify-end gap-3">
                                    <button type="button" @click="showAddManualReferralModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                                        Cancel
                                    </button>
                                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                                        Add Referral
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>

    <!-- Send Message Modal -->
    <TransitionRoot appear :show="showSendMessageModal" as="template">
        <Dialog as="div" @close="showSendMessageModal = false" class="relative z-50">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/30 dark:bg-black/50" />
            </TransitionChild>
            <div class="fixed inset-y-0 right-0 overflow-y-auto">
                <div class="flex min-h-full justify-end">
                    <TransitionChild as="template" enter="transform transition ease-in-out duration-300" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-300" leave-from="translate-x-0" leave-to="translate-x-full">
                        <DialogPanel class="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6">
                            <div class="flex justify-between items-start mb-4">
                                <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-white">Send Message to {{ selectedUser?.name }}</DialogTitle>
                                <button @click="showSendMessageModal = false" class="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                            </div>
                            
                            <form @submit.prevent="handleSendMessage">
                                <div class="mb-4">
                                    <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                                    <input type="text" id="subject" v-model="newMessage.subject" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Message Subject">
                                </div>
                                <div class="mb-6">
                                    <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                    <textarea id="message" v-model="newMessage.body" rows="6" class="w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Type your message here"></textarea>
                                </div>
                                <div class="flex justify-end gap-3">
                                    <button type="button" @click="showSendMessageModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                                        Cancel
                                    </button>
                                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                                        Send Message
                                    </button>
                                </div>
                            </form>
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
import { Menu, MenuButton, MenuItem, MenuItems, Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArrowDownTrayIcon, PlusIcon, MagnifyingGlassIcon, UserCircleIcon, EllipsisVerticalIcon, EyeIcon, ClockIcon, UserPlusIcon, ChatBubbleLeftEllipsisIcon, NoSymbolIcon } from '@heroicons/vue/24/outline'
const search = ref('')
const statusFilter = ref('')
const referrals = ref([
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Active', level: 1, referrals: 3, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Active', level: 2, referrals: 8, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Inactive', level: 1, referrals: 0, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Active', level: 3, referrals: 8, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Inactive', level: 1, referrals: 0, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Inactive', level: 1, referrals: 0, earnings: 420.5, joined: '1/14/2023' },
  { name: 'John Doe', email: 'john.doe@example.com', status: 'Active', level: 1, referrals: 12, earnings: 420.5, joined: '1/14/2023' }
])
const filteredReferrals = computed(() => {
  let data = referrals.value
  if (search.value) {
    data = data.filter(r => r.name.toLowerCase().includes(search.value.toLowerCase()) || r.email.toLowerCase().includes(search.value.toLowerCase()))
  }
  if (statusFilter.value) {
    data = data.filter(r => r.status === statusFilter.value)
  }
  return data
})
const showUserProfileModal = ref(false)
const selectedUser = ref(null)
const showReferralsListModal = ref(false)
const showCommissionHistoryModal = ref(false)
const showAddManualReferralModal = ref(false)
const newReferral = ref({ name: '', email: '' })
const showSendMessageModal = ref(false)
const newMessage = ref({ subject: '', body: '' })

const referralsList = ref([
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Active', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Active', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Active', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Inactive', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Active', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Active', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Inactive', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Inactive', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Active', joinDate: '2/19/2023' },
  { name: 'Robert Wilson', email: 'Robert Wilson', status: 'Inactive', joinDate: '2/19/2023' },
])

const commissionHistory = ref([
    { date: '3/31/2024', amount: '3/31/2024', type: 'Direct Referral', status: 'Paid' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Direct Referral', status: 'Paid' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Direct Referral', status: 'Paid' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Indirect Referral', status: 'Processing' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Direct Referral', status: 'Paid' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Indirect Referral', status: 'Processing' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Direct Referral', status: 'Paid' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Indirect Referral', status: 'Processing' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Indirect Referral', status: 'Processing' },
    { date: '3/31/2024', amount: '3/31/2024', type: 'Direct Referral', status: 'Paid' },
])

function openUserProfileModal(user) {
    selectedUser.value = user
    showUserProfileModal.value = true
}

function openReferralsListModal(user) {
    selectedUser.value = user
    showReferralsListModal.value = true
}

function openCommissionHistoryModal(user) {
    selectedUser.value = user
    showCommissionHistoryModal.value = true
}

function openAddManualReferralModal() {
    newReferral.value = { name: '', email: '' }
    showAddManualReferralModal.value = true
}

function handleAddReferral() {
    // Logic to add referral
    referrals.value.unshift({
        name: newReferral.value.name,
        email: newReferral.value.email,
        status: 'Active',
        level: 1,
        referrals: 0,
        earnings: 0,
        joined: new Date().toLocaleDateString()
    })
    showAddManualReferralModal.value = false
}

function openSendMessageModal(user) {
    selectedUser.value = user
    newMessage.value = { subject: '', body: '' }
    showSendMessageModal.value = true
}

function handleSendMessage() {
    // Logic to send message
    showSendMessageModal.value = false
}
</script> 