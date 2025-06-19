<template>
  <div class="p-6 bg-white dark:bg-gray-900 min-h-screen font-sans">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">Role & Permission Management</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Manage roles, permissions, and access control for users</p>
      </div>
      <button v-if="activeTab === 'roles'" @click="showCreateRoleModal = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Create Role</button>
      <button v-else @click="showAssignRoleModal = true" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Assign Role</button>
    </div>

    <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button 
          @click="activeTab = 'roles'"
          :class="[
            activeTab === 'roles' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent',
            'whitespace-nowrap py-4 px-1 font-medium text-sm'
          ]"
        >
          Roles
        </button>
        <button 
          @click="activeTab = 'users'"
          :class="[
            activeTab === 'users' 
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 border-b-2 border-transparent',
            'whitespace-nowrap py-4 px-1 font-medium text-sm'
          ]"
        >
          Users with Roles
        </button>
      </nav>
    </div>

    <!-- Roles Grid -->
    <div v-if="activeTab === 'roles'">
    <div class="mb-6">
      <input type="text" placeholder="Search roles" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RoleCard role="Admin" users="5" :system="true" description="Full system access with all permissions" />
      <RoleCard role="Manager" :system="true" users="12" description="Access to manage users and view reports" />
      <RoleCard role="Agent" users="28" description="Ability to manage referrals and handle disputes" />
      <RoleCard role="Finance" users="5" description="Access to financial transactions and wallet management" />
      <RoleCard role="Support" users="12" description="Customer support and dispute resolution access" />
      <RoleCard role="Read-Only" users="28" description="View-only access to all system areas" />
      </div>
    </div>

    <!-- Users with Roles Table -->
    <div v-else>
      <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Active</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="user in users" :key="user.id">
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ user.id }}</td>
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ user.name }}</td>
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ user.email }}</td>
              <td class="px-4 py-3">
                <div class="flex gap-2">
                  <span v-for="role in user.roles" :key="role" 
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {{ role }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ user.lastActive }}</td>
              <td class="px-4 py-3 text-sm">
                <button @click="editUserRoles(user)" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  Edit Roles
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div>
          Showing 1 to 10 of {{ users.length }} entries
        </div>
        <div class="flex gap-2">
          <button class="px-3 py-1 border rounded dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">&larr;</button>
          <button class="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button class="px-3 py-1 border rounded dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">2</button>
          <button class="px-3 py-1 border rounded dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">3</button>
          <button class="px-3 py-1 border rounded dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">&rarr;</button>
        </div>
      </div>
    </div>

    <!-- Create Role Modal -->
    <TransitionRoot appear :show="showCreateRoleModal" as="template">
      <Dialog as="div" @close="showCreateRoleModal = false" class="relative z-[60]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
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
              <DialogPanel class="w-[500px] transform overflow-hidden bg-white dark:bg-gray-900 p-6 shadow-xl transition-all">
                <div class="mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <ShieldCheckIcon class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <DialogTitle class="text-lg font-medium text-gray-900 dark:text-gray-100">Admin Permissions</DialogTitle>
                    </div>
                    <button @click="showCreateRoleModal = false" class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <XMarkIcon class="h-5 w-5" />
                    </button>
                  </div>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Configure access permissions for this role</p>
                </div>

                <div class="space-y-4">
                  <!-- User Management Section -->
                  <div class="border rounded-lg border-gray-200 dark:border-gray-700">
                    <button 
                      @click="toggleSection('userManagement')"
                      class="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span class="font-medium text-gray-900 dark:text-gray-100">User Management</span>
                      <ChevronUpIcon 
                        :class="[
                          'h-5 w-5 transform transition-transform text-gray-500 dark:text-gray-400',
                          openSections.userManagement ? '' : 'rotate-180'
                        ]"
                      />
                    </button>
                    <div v-show="openSections.userManagement" class="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div v-for="permission in permissions.userManagement" :key="permission.name"
                        class="flex items-center justify-between"
                      >
                        <div>
                          <div class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ permission.name }}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">{{ permission.description }}</div>
                        </div>
                        <Switch
                          v-model="permission.enabled"
                          :class="[
                            permission.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                          ]"
                        >
                          <span
                            :class="[
                              permission.enabled ? 'translate-x-6' : 'translate-x-1',
                              'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out mt-1'
                            ]"
                          />
                        </Switch>
                      </div>
                    </div>
                  </div>

                  <!-- Other sections -->
                  <div v-for="section in sections" :key="section.id" class="border rounded-lg border-gray-200 dark:border-gray-700">
                    <button 
                      @click="toggleSection(section.id)"
                      class="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span class="font-medium text-gray-900 dark:text-gray-100">{{ section.name }}</span>
                      <ChevronUpIcon 
                        :class="[
                          'h-5 w-5 transform transition-transform text-gray-500 dark:text-gray-400',
                          openSections[section.id] ? '' : 'rotate-180'
                        ]"
                      />
                    </button>
                    <div v-show="openSections[section.id]" class="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div v-for="permission in permissions[section.id]" :key="permission.name"
                        class="flex items-center justify-between"
                      >
                        <div>
                          <div class="font-medium text-sm text-gray-900 dark:text-gray-100">{{ permission.name }}</div>
                          <div class="text-sm text-gray-500 dark:text-gray-400">{{ permission.description }}</div>
                        </div>
                        <Switch
                          v-model="permission.enabled"
                          :class="[
                            permission.enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out'
                          ]"
                        >
                          <span
                            :class="[
                              permission.enabled ? 'translate-x-6' : 'translate-x-1',
                              'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out mt-1'
                            ]"
                          />
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Warning Message -->
                <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
                  <div class="flex">
                    <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400" />
                    <div class="ml-3">
                      <div class="text-sm text-yellow-700 dark:text-yellow-500">
                        <span class="font-medium">Note: </span>
                        This is a system role and has fixed permissions.
                        <br />
                        System roles have predefined permissions that cannot be modified to ensure system stability. If you need to customize permissions, please create a new role.
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    @click="showCreateRoleModal = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  >
                    Close
                  </button>
                  <button
                    @click="savePermissions"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md inline-flex items-center"
                  >
                    <span>Save Permission</span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Edit Roles Modal -->
    <TransitionRoot appear :show="showAssignRoleModal" as="template">
      <Dialog as="div" @close="showAssignRoleModal = false" class="relative z-[60]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
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
              <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-900 p-6 shadow-xl transition-all">
                <div class="mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <UserIcon class="h-5 w-5 text-gray-400" />
                      <DialogTitle class="text-lg font-medium text-gray-900 dark:text-gray-100">Edit Roles for {{ editingUser?.name || 'User' }}</DialogTitle>
                    </div>
                    <button @click="showAssignRoleModal = false" class="text-gray-400 hover:text-gray-500">
                      <XMarkIcon class="h-5 w-5" />
                    </button>
                  </div>
                  <p class="mt-2 text-sm text-gray-500">Modify role assignments for this user</p>
                </div>

                <!-- Assign Role Section -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Assign Role</label>
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-900 dark:text-gray-100">Admin</span>
                        <span class="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">System</span>
                      </div>
                      <Switch
                        v-model="roles.admin"
                        class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        :class="[roles.admin ? 'bg-blue-600' : 'bg-gray-200']"
                      >
                        <span
                          class="pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          :class="[roles.admin ? 'translate-x-4' : 'translate-x-0']"
                        />
                      </Switch>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-900 dark:text-gray-100">Manager</span>
                        <span class="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">System</span>
                      </div>
                      <Switch
                        v-model="roles.manager"
                        class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        :class="[roles.manager ? 'bg-blue-600' : 'bg-gray-200']"
                      >
                        <span
                          class="pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          :class="[roles.manager ? 'translate-x-4' : 'translate-x-0']"
                        />
                      </Switch>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-900 dark:text-gray-100">Agent</span>
                        <span class="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">System</span>
                      </div>
                      <Switch
                        v-model="roles.agent"
                        class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        :class="[roles.agent ? 'bg-blue-600' : 'bg-gray-200']"
                      >
                        <span
                          class="pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          :class="[roles.agent ? 'translate-x-4' : 'translate-x-0']"
                        />
                      </Switch>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-900 dark:text-gray-100">Finance</span>
                      </div>
                      <Switch
                        v-model="roles.finance"
                        class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        :class="[roles.finance ? 'bg-blue-600' : 'bg-gray-200']"
                      >
                        <span
                          class="pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          :class="[roles.finance ? 'translate-x-4' : 'translate-x-0']"
                        />
                      </Switch>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-sm text-gray-900 dark:text-gray-100">Support</span>
                      </div>
                      <Switch
                        v-model="roles.support"
                        class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        :class="[roles.support ? 'bg-blue-600' : 'bg-gray-200']"
                      >
                        <span
                          class="pointer-events-none relative inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                          :class="[roles.support ? 'translate-x-4' : 'translate-x-0']"
                        />
                      </Switch>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    @click="showAssignRoleModal = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    @click="saveAssignedRoles"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  >
                    Save Assignments
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

<script>
import {
  EllipsisVerticalIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Switch } from '@headlessui/vue'
import { ref, computed } from 'vue'

export default {
  components: {
    RoleCard: {
      props: ['role', 'users', 'description', 'system'],
      components: {
        EllipsisVerticalIcon,
        ShieldCheckIcon,
        UserGroupIcon,
        Menu,
        MenuButton,
        MenuItems,
        MenuItem
      },
      template: `
        <div class="relative border border-gray-200 rounded-lg p-4 shadow-sm">
          <Menu as="div" class="absolute top-2 right-2">
            <MenuButton class="text-gray-400 hover:text-gray-600">
              <EllipsisVerticalIcon class="w-5 h-5" />
            </MenuButton>
            <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <MenuItems class="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      ]"
                      @click="$emit('view-details')"
                    >
                      View Details
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      ]"
                      @click="$emit('edit-permissions')"
                    >
                      Edit Permissions
                    </button>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-blue-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      ]"
                      @click="$emit('rename-role')"
                    >
                      Rename Role
                    </button>
                  </MenuItem>
                </div>
                <div class="px-1 py-1" v-if="!system">
                  <MenuItem v-slot="{ active }">
                    <button
                      :class="[
                        active ? 'bg-red-500 text-white' : 'text-red-600',
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      ]"
                      @click="$emit('delete-role')"
                    >
                      Delete Role
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
          <div class="flex items-center mb-3">
            <ShieldCheckIcon class="h-6 w-6 text-blue-500 mr-2" />
            <h2 class="text-lg font-semibold text-gray-900">{{ role }}</h2>
            <span v-if="system" class="ml-2 text-xs text-white bg-red-600 rounded px-1.5 py-0.5">system</span>
          </div>
          <p class="text-sm text-gray-600 mb-4">{{ description }}</p>
          <div class="flex justify-between items-center p-4">
            <div class="flex items-center text-gray-500 text-sm">
              <UserGroupIcon class="h-4 w-4 mr-1" />
              {{ users }} users
            </div>
            <button class="text-blue-600 hover:underline text-sm">Permissions</button>
          </div>
        </div>
      `
    },
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    Switch,
    XMarkIcon,
    ChevronUpIcon,
    ExclamationTriangleIcon,
    UserIcon
  },
  setup() {
    const activeTab = ref('roles')
    const showCreateRoleModal = ref(false)
    const showAssignRoleModal = ref(false)
    const openSections = ref({
      userManagement: true,
      roleManagement: false,
      walletManagement: false,
      transactionManagement: false,
      referralManagement: false,
      reportAnalytics: false
    })

    const permissions = ref({
      userManagement: [
        { name: 'View Users', description: 'View user lists and profiles', enabled: true },
        { name: 'Create Users', description: 'Add new users to the system', enabled: true },
        { name: 'Edit Users', description: 'Modify user details and settings', enabled: true },
        { name: 'Delete Users', description: 'Remove users from the system', enabled: true },
        { name: 'Suspend Users', description: 'Temporarily restrict user access', enabled: true }
      ],
      roleManagement: [
        { name: 'View Roles', description: 'View role lists and details', enabled: true },
        { name: 'Create Roles', description: 'Add new roles to the system', enabled: true },
        { name: 'Edit Roles', description: 'Modify role details and permissions', enabled: true },
        { name: 'Delete Roles', description: 'Remove roles from the system', enabled: false },
        { name: 'Assign Roles', description: 'Assign roles to users', enabled: true }
      ],
      walletManagement: [
        { name: 'View Wallets', description: 'View wallet lists and details', enabled: true },
        { name: 'Create Wallets', description: 'Create new wallets for users', enabled: true },
        { name: 'Credit Wallets', description: 'Add funds to user wallets', enabled: true },
        { name: 'Debit Wallets', description: 'Withdraw funds from user wallets', enabled: true },
        { name: 'Freeze Wallets', description: 'Freeze/unfreeze user wallets', enabled: true }
      ],
      transactionManagement: [
        { name: 'View Transactions', description: 'View transaction history and details', enabled: true },
        { name: 'Approve Transactions', description: 'Approve pending transactions', enabled: true },
        { name: 'Cancel Transactions', description: 'Cancel pending transactions', enabled: true },
        { name: 'Issue Refunds', description: 'Process refunds for transactions', enabled: false }
      ],
      referralManagement: [
        { name: 'View Referrals', description: 'View referral records and details', enabled: true },
        { name: 'Configure Referrals', description: 'Set up and modify referral programs', enabled: true },
        { name: 'Issue Bonuses', description: 'Send manual referral bonuses to users', enabled: true },
        { name: 'Block Referrals', description: 'Prevent users from referring others', enabled: false }
      ],
      reportAnalytics: [
        { name: 'View Reports', description: 'Access standard system reports', enabled: true },
        { name: 'Export Reports', description: 'Export reports to CSV/PDF', enabled: true },
        { name: 'Schedule Reports', description: 'Set up automated report delivery', enabled: true },
        { name: 'View Analytics', description: 'Access advanced analytics dashboard', enabled: true }
      ]
    })

    const sections = [
      { id: 'roleManagement', name: 'Role Management' },
      { id: 'walletManagement', name: 'Wallet Management' },
      { id: 'transactionManagement', name: 'Transaction Management' },
      { id: 'referralManagement', name: 'Referral Management' },
      { id: 'reportAnalytics', name: 'Report and Analytics' }
    ]

    const toggleSection = (sectionId) => {
      openSections.value[sectionId] = !openSections.value[sectionId]
    }

    const savePermissions = () => {
      console.log('Saving permissions:', permissions.value)
      showCreateRoleModal.value = false
    }

    const users = ref([
      { 
        id: 'U100',
        name: 'John Doe',
        email: 'john.doe@example.com',
        roles: ['Admin', 'Finance'],
        lastActive: '4/8/2023, 9:30:00 AM'
      },
      { 
        id: 'U101',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        roles: ['Agent'],
        lastActive: '4/8/2023, 9:15:00 AM'
      },
      { 
        id: 'U102',
        name: 'Mike Johnson',
        email: 'mike.j@example.com',
        roles: ['Support', 'Agent'],
        lastActive: '4/8/2023, 9:00:00 AM'
      },
      { 
        id: 'U103',
        name: 'Sarah Wilson',
        email: 'sarah.w@example.com',
        roles: ['Finance'],
        lastActive: '4/8/2023, 8:45:00 AM'
      },
      { 
        id: 'U104',
        name: 'Robert Brown',
        email: 'robert.b@example.com',
        roles: ['Support'],
        lastActive: '4/8/2023, 8:30:00 AM'
      },
      { 
        id: 'U105',
        name: 'Emily Davis',
        email: 'emily.d@example.com',
        roles: ['Agent', 'Support'],
        lastActive: '4/8/2023, 8:15:00 AM'
      },
      { 
        id: 'U106',
        name: 'Michael Lee',
        email: 'michael.l@example.com',
        roles: ['Finance'],
        lastActive: '4/8/2023, 8:00:00 AM'
      },
      { 
        id: 'U107',
        name: 'Lisa Anderson',
        email: 'lisa.a@example.com',
        roles: ['Support'],
        lastActive: '4/8/2023, 7:45:00 AM'
      },
      { 
        id: 'U108',
        name: 'David Miller',
        email: 'david.m@example.com',
        roles: ['Agent'],
        lastActive: '4/8/2023, 7:30:00 AM'
      },
      { 
        id: 'U109',
        name: 'Emma Wilson',
        email: 'emma.w@example.com',
        roles: ['Support', 'Finance'],
        lastActive: '4/8/2023, 7:15:00 AM'
      }
    ])

    const editingUser = ref(null)

    const editUserRoles = (user) => {
      editingUser.value = user
      roles.value = {
        admin: user.roles.includes('Admin'),
        manager: user.roles.includes('Manager'),
        agent: user.roles.includes('Agent'),
        finance: user.roles.includes('Finance'),
        support: user.roles.includes('Support')
      }
      showAssignRoleModal.value = true
    }

    const saveAssignedRoles = () => {
      // Handle saving assigned roles
      showAssignRoleModal.value = false
    }

    const roles = ref({
      admin: false,
      manager: false,
      agent: false,
      finance: false,
      support: false
    })

    return {
      activeTab,
      showCreateRoleModal,
      showAssignRoleModal,
      openSections,
      permissions,
      sections,
      toggleSection,
      savePermissions,
      users,
      editUserRoles,
      saveAssignedRoles,
      roles,
      editingUser
    }
  }
}
</script>

<style scoped>
</style>
