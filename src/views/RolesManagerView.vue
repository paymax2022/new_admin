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

    <div v-if="loadingRoles" class="text-center py-8 text-gray-500">Loading roles...</div>
    <div v-else-if="rolesError" class="text-center py-8 text-red-500">{{ rolesError }}</div>
    <div v-else>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <RoleCard
          v-for="role in rolesList"
          :key="role._id"
          :role="role.name"
          :users="role.users_count || 0"
          :system="role.scope === 'system'"
          :description="role.description || ''"
          @edit-permissions="openPermissionsModal(role.name)"
          @rename-role="openRenameRoleModal(role.name, role.description || '')"
          @clone-role="openCloneRoleModal(role.name, role.description || '')"
          @delete-role="openDeleteRoleModal(role.name)"
          @view-details="openViewDetailsModal(role.name)"
          @view-permissions="openPermissionsDetailsModal(role.permissions?.[0] || '687d034a609b3cb35daf16be')"
        />
      </div>
      </div>
    </div>

    <!-- Users with Roles Table -->
    <div v-else>
      <div class="mb-6">
        <input 
          v-model="userSearchQuery" 
          type="text" 
          placeholder="Search users by name or email" 
          class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-blue-500 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
      </div>

      <div v-if="loadingUsers" class="text-center py-8 text-gray-500">Loading users...</div>
      <div v-else-if="usersError" class="text-center py-8 text-red-500">{{ usersError }}</div>
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
              <tr v-for="user in paginatedUsers" :key="user._id">
                <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ user._id }}</td>
                <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ user.first_name }} {{ user.lastname }}</td>
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
                <td class="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{{ formatDate(user.lastActive || user.createdAt) }}</td>
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
            Showing {{ (currentUserPage - 1) * userPageSize + 1 }} to {{ Math.min(currentUserPage * userPageSize, filteredUsers.length) }} of {{ filteredUsers.length }} entries
          </div>
          <div class="flex gap-2">
            <button 
              @click="currentUserPage = Math.max(1, currentUserPage - 1)"
              :disabled="currentUserPage === 1"
              class="px-3 py-1 border rounded dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &larr;
            </button>
            <button 
              v-for="page in userPageNumbers" 
              :key="page"
              @click="currentUserPage = page"
              :class="[
                'px-3 py-1 rounded',
                currentUserPage === page 
                  ? 'bg-blue-600 text-white' 
                  : 'border dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
              ]"
            >
              {{ page }}
            </button>
            <button 
              @click="currentUserPage = Math.min(userTotalPages, currentUserPage + 1)"
              :disabled="currentUserPage === userTotalPages"
              class="px-3 py-1 border rounded dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              &rarr;
            </button>
          </div>
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
              <DialogPanel class="w-full max-w-md bg-white dark:bg-gray-900 p-8 shadow-xl">
                <div class="mb-6">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-gray-100">Create New Role</DialogTitle>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Add a new role with specific permissions</p>
                </div>
                <form @submit.prevent="handleCreateRole">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Name</label>
                    <input v-model="newRoleName" type="text" class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" placeholder="Enter role name" required />
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <input v-model="newRoleDescription" type="text" class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" placeholder="Enter role description" />
                  </div>
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Permissions</label>
                    <div class="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md p-3 dark:bg-gray-800">
                      <div v-for="(permissions, resource) in groupedPermissions" :key="resource" class="mb-4">
                        <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{{ resource.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</h4>
                        <div class="space-y-2">
                          <label v-for="permission in permissions" :key="permission.id" class="flex items-center">
                            <input 
                              type="checkbox" 
                              :value="permission.id" 
                              v-model="selectedPermissionsForNewRole"
                              class="mr-2 rounded border-gray-300 dark:border-gray-600 text-blue-600"
                            />
                            <span class="text-sm text-gray-700 dark:text-gray-300">{{ permission.name }}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Select the permissions you want to assign to this role</p>
                  </div>
                  <div class="flex justify-end gap-3 mt-6">
                    <button type="button" @click="showCreateRoleModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Cancel</button>
                    <button type="submit" :disabled="!newRoleName || selectedPermissionsForNewRole.length === 0" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md">Create Role</button>
                  </div>
                </form>
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

    <!-- Permissions Modal (Edit Permissions) -->
    <TransitionRoot appear :show="showPermissionsModal" as="template">
      <Dialog as="div" @close="showPermissionsModal = false" class="relative z-[60]">
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
                      <DialogTitle class="text-lg font-medium text-gray-900 dark:text-gray-100">Assign Permissions to Role</DialogTitle>
                    </div>
                    <button @click="showPermissionsModal = false" class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <XMarkIcon class="h-5 w-5" />
                    </button>
                  </div>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Select a role and assign permissions to it</p>
                </div>

                <!-- Role Selection -->
                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Role</label>
                  <select v-model="selectedRoleForPermissions" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100">
                    <option value="" disabled>Choose a role</option>
                    <option v-for="role in rolesList" :key="role._id" :value="role._id">
                      {{ role.name }} {{ role.scope === 'system' ? '(System)' : '' }}
                    </option>
                  </select>
                </div>

                <div v-if="loadingPermissions" class="text-center py-8 text-gray-500">Loading permissions...</div>
                <div v-else-if="permissionsError" class="text-center py-8 text-red-500">{{ permissionsError }}</div>
                <div v-else-if="selectedRoleForPermissions" class="space-y-4">
                  <div v-for="(permissions, resource) in groupedPermissions" :key="resource" class="border rounded-lg border-gray-200 dark:border-gray-700">
                    <button 
                      @click="toggleSection(resource)"
                      class="w-full flex items-center justify-between p-4 text-left"
                    >
                      <span class="font-medium text-gray-900 dark:text-gray-100">{{ resource.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</span>
                      <ChevronUpIcon 
                        :class="[
                          'h-5 w-5 transform transition-transform text-gray-500 dark:text-gray-400',
                          openSections[resource] ? '' : 'rotate-180'
                        ]"
                      />
                    </button>
                    <div v-show="openSections[resource]" class="p-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                      <div v-for="permission in permissions" :key="permission.id"
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

                <!-- Action Buttons -->
                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    @click="showPermissionsModal = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    @click="savePermissions"
                    :disabled="!selectedRoleForPermissions"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-md inline-flex items-center"
                  >
                    <span>Assign Permissions</span>
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Rename Role Modal -->
    <TransitionRoot appear :show="showRenameRoleModal" as="template">
      <Dialog as="div" @close="showRenameRoleModal = false" class="relative z-[60]">
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
              <DialogPanel class="w-full max-w-md bg-white dark:bg-gray-900 p-8 shadow-xl">
                <div class="mb-6">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3z" /></svg>
                    Edit Role
                  </DialogTitle>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Update the role name and description</p>
                </div>
                <form @submit.prevent="handleSaveRenameRole">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Name</label>
                    <input v-model="renameRoleName" type="text" class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" />
                  </div>
                  <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <input v-model="renameRoleDescription" type="text" class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" />
                  </div>
                  <div class="flex justify-end gap-3 mt-6">
                    <button type="button" @click="showRenameRoleModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Cancel</button>
                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                      Save Change
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Clone Role Modal -->
    <TransitionRoot appear :show="showCloneRoleModal" as="template">
      <Dialog as="div" @close="showCloneRoleModal = false" class="relative z-[60]">
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
              <DialogPanel class="w-full max-w-md bg-white dark:bg-gray-900 p-8 shadow-xl">
                <div class="mb-6">
                  <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 17l4 4 4-4m0-5V3a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1h6" /></svg>
                    Clone Role
                  </DialogTitle>
                  <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Create a new role based on</p>
                </div>
                <form @submit.prevent="handleCreateCloneRole">
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role Name</label>
                    <input v-model="cloneRoleName" type="text" class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" />
                  </div>
                  <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                    <input v-model="cloneRoleDescription" type="text" class="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-gray-100" />
                  </div>
                  <div class="mb-6">
                    <div class="flex items-center bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded px-3 py-2">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" /></svg>
                      All permissions from the original role will be copied to this new role.
                    </div>
                  </div>
                  <div class="flex justify-end gap-3 mt-6">
                    <button type="button" @click="showCloneRoleModal = false" class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md">Cancel</button>
                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Create Clone</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Delete Role Modal -->
    <TransitionRoot appear :show="showDeleteRoleModal" as="template">
      <Dialog as="div" @close="showDeleteRoleModal = false" class="relative z-[60]">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-40" />
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
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Delete Role
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete the role <strong>"{{ deletingRoleName }}"</strong>?
                  </p>
                  <div class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <div class="flex items-center">
                      <ExclamationTriangleIcon class="h-5 w-5 text-red-400 mr-2" />
                      <div class="text-sm text-red-700 dark:text-red-300">
                        <strong>Warning:</strong> This action cannot be undone. This will permanently delete the role and remove it from any users who have it assigned.
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    @click="showDeleteRoleModal = false"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    :disabled="deletingRoleLoading"
                    class="inline-flex justify-center items-center gap-2 rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    @click="handleDeleteRole"
                  >
                    <div v-if="deletingRoleLoading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    {{ deletingRoleLoading ? 'Deleting...' : 'Delete Role' }}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Permissions Details Modal -->
    <TransitionRoot appear :show="showPermissionsDetailsModal" as="template">
      <Dialog as="div" @close="showPermissionsDetailsModal = false" class="relative z-[60]">
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
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <div class="mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <ShieldCheckIcon class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <DialogTitle class="text-lg font-medium text-gray-900 dark:text-gray-100">Permission Details</DialogTitle>
                    </div>
                    <button @click="showPermissionsDetailsModal = false" class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <XMarkIcon class="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div v-if="loadingPermissionDetails" class="text-center py-8 text-gray-500">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  Loading permission details...
                </div>
                
                <div v-else-if="selectedPermission" class="space-y-4">
                  <div class="border rounded-lg border-gray-200 dark:border-gray-700 p-4">
                    <div class="grid grid-cols-1 gap-3">
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Permission ID</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100 font-mono">{{ selectedPermission.id }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Action</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ selectedPermission.action?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Resource</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ selectedPermission.resource?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Scope</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ selectedPermission.scope?.replace(/\b\w/g, l => l.toUpperCase()) }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ selectedPermission.description }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ new Date(selectedPermission.createdAt).toLocaleString() }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ new Date(selectedPermission.updatedAt).toLocaleString() }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex justify-end">
                  <button
                    @click="showPermissionsDetailsModal = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- View Role Details Modal -->
    <TransitionRoot appear :show="showViewDetailsModal" as="template">
      <Dialog as="div" @close="showViewDetailsModal = false" class="relative z-[60]">
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
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <div class="mb-6">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <ShieldCheckIcon class="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      <DialogTitle class="text-lg font-medium text-gray-900 dark:text-gray-100">Role Details</DialogTitle>
                    </div>
                    <button @click="showViewDetailsModal = false" class="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                      <XMarkIcon class="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div v-if="selectedRoleForDetails" class="space-y-4">
                  <div class="border rounded-lg border-gray-200 dark:border-gray-700 p-4">
                    <div class="grid grid-cols-1 gap-3">
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Role ID</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100 font-mono">{{ selectedRoleForDetails._id }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Role Name</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100 font-semibold">{{ selectedRoleForDetails.name }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Description</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ selectedRoleForDetails.description || 'No description provided' }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Scope</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">
                          <span :class="[
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                            selectedRoleForDetails.scope === 'system' 
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                          ]">
                            {{ selectedRoleForDetails.scope?.replace(/\b\w/g, l => l.toUpperCase()) || 'Custom' }}
                          </span>
                        </p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Users Count</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ selectedRoleForDetails.users_count || 0 }} users</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Permissions Count</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ selectedRoleForDetails.permissions?.length || 0 }} permissions</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ new Date(selectedRoleForDetails.created_at).toLocaleString() }}</p>
                      </div>
                      <div>
                        <label class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                        <p class="text-sm text-gray-900 dark:text-gray-100">{{ new Date(selectedRoleForDetails.updated_at).toLocaleString() }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Permissions List -->
                  <div v-if="selectedRoleForDetails.permissions_info && selectedRoleForDetails.permissions_info.length > 0" class="border rounded-lg border-gray-200 dark:border-gray-700 p-4">
                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Assigned Permissions</h4>
                    <div class="space-y-2">
                      <div v-for="permission in selectedRoleForDetails.permissions_info" :key="permission._id" 
                           class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900/30 rounded">
                        <div>
                          <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {{ permission.action?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">{{ permission.description }}</p>
                        </div>
                        <span class="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded">
                          {{ permission.resource?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-6 flex justify-end">
                  <button
                    @click="showViewDetailsModal = false"
                    class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
                  >
                    Close
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
import rolePermissionService from '@/services/rolePermissionService'

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
                      @click="() => { console.log('View details clicked for role:', role); $emit('view-details') }"
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
                      @click="() => { console.log('Edit permissions clicked for role:', role); $emit('edit-permissions', role) }"
                    >
                      Edit Permissions
                    </button>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      :disabled="role === 'Admin'"
                      :class="[
                        role === 'Admin' ? 'opacity-50 cursor-not-allowed' : (active ? 'bg-blue-500 text-white' : 'text-gray-900'),
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      ]"
                      @click="$emit('rename-role')"
                    >
                      Rename Role
                    </button>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :disabled="system"
                      :class="[
                        system ? 'opacity-50 cursor-not-allowed' : (active ? 'bg-blue-500 text-white' : 'text-gray-900'),
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      ]"
                      @click="$emit('clone-role')"
                    >
                      Clone Role
                    </button>
                  </MenuItem>
                </div>
                <div class="px-1 py-1">
                  <MenuItem v-slot="{ active }">
                    <button
                      :disabled="role === 'Admin'"
                      :class="[
                        role === 'Admin' ? 'opacity-50 cursor-not-allowed' : (active ? 'bg-red-500 text-white' : 'text-red-600'),
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                      ]"
                      @click="() => { console.log('Delete role clicked:', role, 'isAdmin:', role === 'Admin'); $emit('delete-role') }"
                    >
                      Delete Role {{ role === 'Admin' ? '(Cannot Delete Admin)' : '' }}
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
            <button 
              @click="$emit('view-permissions')"
              class="text-blue-600 hover:underline text-sm"
            >
              Permissions
            </button>
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
    const showPermissionsModal = ref(false)
    const editingRoleName = ref('')
    const showAssignRoleModal = ref(false)
    const showRenameRoleModal = ref(false)
    const showCloneRoleModal = ref(false)
    const showDeleteRoleModal = ref(false)
    const deletingRoleName = ref('')
    const deletingRoleLoading = ref(false)
    const showPermissionsDetailsModal = ref(false)
    const showViewDetailsModal = ref(false)
    const selectedPermission = ref(null)
    const selectedRoleForDetails = ref(null)
    const loadingPermissionDetails = ref(false)
    const loadingRoleDetails = ref(false)
    const openSections = ref({
      userManagement: true,
      roleManagement: false,
      walletManagement: false,
      transactionManagement: false,
      referralManagement: false,
      reportAnalytics: false
    })

    // --- API roles integration ---
    const rolesList = ref([])
    const loadingRoles = ref(false)
    const rolesError = ref(null)

    // --- API permissions integration ---
    const permissionsList = ref([])
    const loadingPermissions = ref(false)
    const permissionsError = ref(null)
    const groupedPermissions = ref({})

    // --- API users integration ---
    const usersList = ref([])
    const loadingUsers = ref(false)
    const usersError = ref(null)
    const userSearchQuery = ref('')
    const currentUserPage = ref(1)
    const userPageSize = ref(10)
    const userTotalPages = ref(1)

    // Computed properties for users pagination
    const filteredUsers = computed(() => {
      if (!userSearchQuery.value) return usersList.value
      const query = userSearchQuery.value.toLowerCase()
      return usersList.value.filter(user => 
        user.first_name?.toLowerCase().includes(query) ||
        user.lastname?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
      )
    })

    const paginatedUsers = computed(() => {
      const start = (currentUserPage.value - 1) * userPageSize.value
      const end = start + userPageSize.value
      return filteredUsers.value.slice(start, end)
    })

    const userPageNumbers = computed(() => {
      const total = Math.ceil(filteredUsers.value.length / userPageSize.value)
      userTotalPages.value = total
      const pages = []
      const maxPages = 5
      let start = Math.max(1, currentUserPage.value - Math.floor(maxPages / 2))
      let end = Math.min(total, start + maxPages - 1)
      
      if (end - start + 1 < maxPages) {
        start = Math.max(1, end - maxPages + 1)
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      return pages
    })

    const fetchRoles = async () => {
      loadingRoles.value = true
      try {
        const res = await rolePermissionService.getRoles({ page: 1, limit: 20 })
        rolesList.value = res.data.data || []
        console.log('Fetched roles:', rolesList.value)
        console.log('Roles with system status:', rolesList.value.map(role => ({
          name: role.name,
          scope: role.scope,
          isSystem: role.scope === 'system'
        })))
      } catch (e) {
        rolesError.value = e.message || 'Failed to fetch roles'
      } finally {
        loadingRoles.value = false
      }
    }

    const fetchUsers = async () => {
      loadingUsers.value = true
      try {
        const res = await rolePermissionService.getUsers({ page: 1, limit: 100 })
        usersList.value = res.data.data || []
        console.log('Fetched users:', usersList.value)
      } catch (e) {
        usersError.value = e.message || 'Failed to fetch users'
      } finally {
        loadingUsers.value = false
      }
    }

    const fetchPermissions = async () => {
      loadingPermissions.value = true
      try {
        const res = await rolePermissionService.getPermissions({ page: 1, limit: 50 })
        permissionsList.value = res.data.data || []
        
        // Group permissions by resource
        groupedPermissions.value = permissionsList.value.reduce((acc, permission) => {
          const resource = permission.resource
          if (!acc[resource]) {
            acc[resource] = []
          }
          acc[resource].push({
            id: permission.id,
            name: permission.action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: permission.description,
            action: permission.action,
            resource: permission.resource,
            scope: permission.scope,
            enabled: false // Default to false, will be set based on role permissions
          })
          return acc
        }, {})
      } catch (e) {
        permissionsError.value = e.message || 'Failed to fetch permissions'
      } finally {
        loadingPermissions.value = false
      }
    }

    const addPermissionToRole = async (roleId, permissionIds) => {
      try {
        await rolePermissionService.addPermissionToRole({ roleId, permissionIds })
        // Refresh roles after adding permissions
        await fetchRoles()
      } catch (e) {
        console.error('Failed to add permissions to role:', e)
      }
    }

    // Initialize data
    fetchRoles()
    fetchUsers()
    fetchPermissions()

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      try {
        return new Date(dateString).toLocaleString()
      } catch (e) {
        return 'Invalid Date'
      }
    }

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

    const savePermissions = async () => {
      try {
        // Get the current role being edited
        const currentRole = rolesList.value.find(role => role._id === selectedRoleForPermissions.value)
        if (!currentRole) {
          console.error('Role not found:', selectedRoleForPermissions.value)
          return
        }

        // Collect all enabled permissions
        const enabledPermissionIds = []
        Object.values(groupedPermissions.value).forEach(permissions => {
          permissions.forEach(permission => {
            if (permission.enabled) {
              enabledPermissionIds.push(permission.id)
            }
          })
        })

        // Add permissions to role
        await addPermissionToRole(currentRole._id, enabledPermissionIds)
        
        console.log('Permissions saved successfully for role:', currentRole.name)
      showPermissionsModal.value = false
      } catch (error) {
        console.error('Failed to save permissions:', error)
      }
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

    const newRoleName = ref('')
    const newRoleDescription = ref('')
    const newRolePermissionType = ref('')
    const selectedPermissionsForNewRole = ref([])

    async function handleCreateRole() {
      if (!newRoleName.value || selectedPermissionsForNewRole.value.length === 0) {
        alert('Role name and at least one permission must be selected.')
        return
      }

      try {
        const res = await rolePermissionService.createRole({
          name: newRoleName.value,
          description: newRoleDescription.value,
          permissionIds: selectedPermissionsForNewRole.value
        })
        console.log('Role created successfully:', res.data.data)
        showCreateRoleModal.value = false
        fetchRoles() // Refresh roles list
        alert('Role created successfully!')
      } catch (error) {
        console.error('Failed to create role:', error)
        alert('Failed to create role. Please try again.')
      }
    }

    function openPermissionsModal(roleName) {
      console.log('openPermissionsModal called with roleName:', roleName)
      // Reset the selected role
      selectedRoleForPermissions.value = ''
      // Find the role by name and set it as selected
      const role = rolesList.value.find(r => r.name === roleName)
      if (role) {
        selectedRoleForPermissions.value = role._id
        // Pre-select permissions that the role already has
        Object.values(groupedPermissions.value).forEach(permissions => {
          permissions.forEach(permission => {
            permission.enabled = role.permissions && role.permissions.includes(permission.id)
          })
        })
      }
      showPermissionsModal.value = true
    }

    const renameRoleName = ref('')
    const renameRoleDescription = ref('')
    function openRenameRoleModal(name, description) {
      renameRoleName.value = name
      renameRoleDescription.value = description
      showRenameRoleModal.value = true
    }
    function handleSaveRenameRole() {
      // Logic to save changes
      showRenameRoleModal.value = false
    }

    const cloneRoleName = ref('')
    const cloneRoleDescription = ref('')
    function openCloneRoleModal(name, description) {
      cloneRoleName.value = name + ' (Clone)'
      cloneRoleDescription.value = description
      showCloneRoleModal.value = true
    }
    function handleCreateCloneRole() {
      // Logic to create clone
      showCloneRoleModal.value = false
    }

    function openDeleteRoleModal(roleName) {
      console.log('openDeleteRoleModal called with:', roleName)
      deletingRoleName.value = roleName
      showDeleteRoleModal.value = true
    }

    async function openPermissionsDetailsModal(permissionId) {
      console.log('openPermissionsDetailsModal called with permissionId:', permissionId)
      loadingPermissionDetails.value = true
      try {
        const res = await rolePermissionService.getPermissionById(permissionId)
        console.log('Permission API response:', res)
        if (res.data?.ok && res.data?.data) {
          selectedPermission.value = res.data.data
          showPermissionsDetailsModal.value = true
          console.log('Permission modal opened, data:', selectedPermission.value)
        }
      } catch (error) {
        console.error('Error fetching permission details:', error)
      } finally {
        loadingPermissionDetails.value = false
      }
    }

    function openViewDetailsModal(roleName) {
      console.log('openViewDetailsModal called with roleName:', roleName)
      const role = rolesList.value.find(r => r.name === roleName)
      if (role) {
        selectedRoleForDetails.value = role
        showViewDetailsModal.value = true
        console.log('View details modal opened, role:', selectedRoleForDetails.value)
      } else {
        console.error('Role not found:', roleName)
      }
    }
    
    async function handleDeleteRole() {
      deletingRoleLoading.value = true
      try {
        // Find the role to get its ID
        const roleToDelete = rolesList.value.find(role => role.name === deletingRoleName.value)
        if (!roleToDelete) {
          console.error('Role not found:', deletingRoleName.value)
          return
        }

        // Call the delete role API
        await rolePermissionService.deleteRole({
          id: roleToDelete._id,
          name: roleToDelete.name,
          description: roleToDelete.description || ''
        })

        // Remove the role from the local list
        const roleIndex = rolesList.value.findIndex(role => role._id === roleToDelete._id)
        if (roleIndex !== -1) {
          rolesList.value.splice(roleIndex, 1)
        }

        // Close the modal
      showDeleteRoleModal.value = false
        deletingRoleName.value = ''
        
        // Show success message (you can add toast notification here if available)
        console.log('Role deleted successfully:', deletingRoleName.value)
      } catch (error) {
        console.error('Failed to delete role:', error)
        // You can add error handling here (e.g., show error toast)
      } finally {
        deletingRoleLoading.value = false
      }
    }

    const selectedRoleForPermissions = ref('')

    return {
      activeTab,
      showCreateRoleModal,
      showPermissionsModal,
      editingRoleName,
      showAssignRoleModal,
      showRenameRoleModal,
      showCloneRoleModal,
      showDeleteRoleModal,
      openSections,
      permissions,
      sections,
      toggleSection,
      savePermissions,
      users,
      editUserRoles,
      saveAssignedRoles,
      roles,
      editingUser,
      newRoleName,
      newRoleDescription,
      newRolePermissionType,
      handleCreateRole,
      openPermissionsModal,
      renameRoleName,
      renameRoleDescription,
      openRenameRoleModal,
      handleSaveRenameRole,
      cloneRoleName,
      cloneRoleDescription,
      openCloneRoleModal,
      handleCreateCloneRole,
      openDeleteRoleModal,
      deletingRoleName,
      handleDeleteRole,
      rolesList,
      loadingRoles,
      rolesError,
      permissionsList,
      loadingPermissions,
      permissionsError,
      groupedPermissions,
      addPermissionToRole,
      deletingRoleLoading,
      showPermissionsDetailsModal,
      showViewDetailsModal,
      selectedPermission,
      selectedRoleForDetails,
      loadingPermissionDetails,
      loadingRoleDetails,
      openPermissionsDetailsModal,
      openViewDetailsModal,
      selectedRoleForPermissions,
      selectedPermissionsForNewRole,
      // User-related variables
      usersList,
      loadingUsers,
      usersError,
      userSearchQuery,
      currentUserPage,
      userPageSize,
      userTotalPages,
      filteredUsers,
      paginatedUsers,
      userPageNumbers,
      formatDate
    }
  }
}
</script>

<style scoped>
</style>
