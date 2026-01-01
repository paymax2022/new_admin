<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Roles, Permissions & Audit</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Manage admin access and track system activities</p>
            </div>
            <button 
                @click="exportLogs"
                class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
            >
                <ArrowDownTrayIcon class="h-4 w-4" />
                Export Logs
            </button>
        </div>

        <!-- Sub-navigation Tabs -->
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
                    {{ tab.label }}
                </button>
            </div>
        </div>

        <!-- Roles & Permissions Tab Content -->
        <div v-if="activeTab === 'roles'" class="space-y-6">
            <!-- Search and Action Bar -->
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div class="flex-1 max-w-md">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search roles..."
                            class="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <button 
                    @click="openCreateRoleModal"
                    class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                >
                    <PlusIcon class="h-4 w-4" />
                    Create Role
                </button>
            </div>

            <!-- Role Cards Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div 
                    v-for="role in filteredRoles" 
                    :key="role.id"
                    class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ role.name }}</h3>
                                <p v-if="role.subLabel" class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{{ role.subLabel }}</p>
                            </div>
                        </div>
                        <div v-if="role.name !== 'Super Admin'" class="flex items-center gap-2">
                            <button
                                @click="editRole(role)"
                                class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                title="Edit"
                            >
                                <PencilIcon class="h-4 w-4" />
                            </button>
                            <button
                                @click="deleteRole(role)"
                                class="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                title="Delete"
                            >
                                <TrashIcon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">{{ role.description }}</p>
                    
                    <div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Users</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ role.users }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Permissions</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ role.permissions }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Updated</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ role.lastUpdated }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Admin Users Tab Content -->
        <div v-if="activeTab === 'admin-users'" class="space-y-6">
            <!-- Search and Action Bar -->
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div class="flex-1 max-w-md">
                    <div class="relative">
                        <input
                            v-model="adminSearchQuery"
                            type="text"
                            placeholder="Search admin users..."
                            class="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <button 
                    @click="openAddAdminUserModal"
                    class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                >
                    <UserPlusIcon class="h-4 w-4" />
                    Add Admin User
                </button>
            </div>

            <!-- Admin Users Table -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Login</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr 
                                v-for="user in filteredAdminUsers" 
                                :key="user.id"
                                class="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <UserIcon class="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ user.userId }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ user.email }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ user.role }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span 
                                        :class="[
                                            'text-sm font-medium',
                                            user.status === 'Active' 
                                                ? 'text-green-600 dark:text-green-400' 
                                                : 'text-gray-500 dark:text-gray-400'
                                        ]"
                                    >
                                        {{ user.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ user.lastLogin }}</span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-3">
                                        <button
                                            @click="editAdminUser(user)"
                                            class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                                            title="Edit"
                                        >
                                            <PencilIcon class="h-4 w-4" />
                                        </button>
                                        <label class="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                :checked="user.status === 'Active'"
                                                @change="toggleUserStatus(user)"
                                                class="sr-only peer"
                                            />
                                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-gray-700"></div>
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Audit Logs Tab Content -->
        <div v-if="activeTab === 'audit-logs'" class="space-y-6">
            <!-- Search and Filter Bar -->
            <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div class="flex-1 max-w-md">
                    <div class="relative">
                        <input
                            v-model="auditSearchQuery"
                            type="text"
                            placeholder="Search audit logs..."
                            class="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
                <div class="flex gap-3">
                    <!-- Module Filter -->
                    <div class="relative" ref="moduleDropdownRef">
                        <button
                            @click.stop="toggleModuleDropdown"
                            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 min-w-[140px]"
                        >
                            {{ selectedModule }}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            v-if="showModuleDropdown"
                            @click.stop
                            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div class="py-1">
                                <button
                                    v-for="module in moduleOptions"
                                    :key="module"
                                    @click="selectModule(module)"
                                    :class="[
                                        'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                        selectedModule === module ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ module }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Status Filter -->
                    <div class="relative" ref="auditStatusDropdownRef">
                        <button
                            @click.stop="toggleAuditStatusDropdown"
                            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 min-w-[120px]"
                        >
                            {{ selectedAuditStatus }}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            v-if="showAuditStatusDropdown"
                            @click.stop
                            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div class="py-1">
                                <button
                                    v-for="status in auditStatusOptions"
                                    :key="status"
                                    @click="selectAuditStatus(status)"
                                    :class="[
                                        'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                        selectedAuditStatus === status ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ status }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Audit Logs List -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div v-if="filteredAuditLogs.length === 0" class="p-12 text-center">
                    <p class="text-gray-500 dark:text-gray-400">No audit logs found</p>
                </div>
                <div v-else class="divide-y divide-gray-200 dark:divide-gray-700">
                    <div 
                        v-for="log in filteredAuditLogs" 
                        :key="log.id"
                        @click="openAuditLogDetails(log)"
                        class="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                    >
                        <div class="flex items-start gap-4">
                            <!-- Status Icon -->
                            <div class="flex-shrink-0 mt-0.5">
                                <div 
                                    v-if="log.status === 'success'"
                                    class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
                                >
                                    <CheckCircleIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div 
                                    v-else
                                    class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
                                >
                                    <XCircleIcon class="h-5 w-5 text-red-600 dark:text-red-400" />
                                </div>
                            </div>

                            <!-- Log Content -->
                            <div class="flex-1 min-w-0">
                                <div class="flex items-start justify-between gap-4 mb-2">
                                    <div class="flex-1">
                                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ log.title }}</h3>
                                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ log.description }}</p>
                                    </div>
                                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded flex-shrink-0">
                                        {{ log.module }}
                                    </span>
                                </div>
                                
                                <div class="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                                    <span class="flex items-center gap-1">
                                        <UserIcon class="h-4 w-4" />
                                        {{ log.actor }}
                                    </span>
                                    <span>{{ log.timestamp }}</span>
                                    <span>{{ log.ipAddress }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Audit Log Details Modal -->
        <div
            v-if="showAuditLogDetailsModal && selectedAuditLog"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="closeAuditLogDetailsModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Audit Log Details</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Complete audit trail information</p>
                    </div>
                    <button
                        @click="closeAuditLogDetailsModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Key Information Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Key Information</h3>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                                <span 
                                    :class="[
                                        'text-sm font-medium',
                                        selectedAuditLog.status === 'success' 
                                            ? 'text-green-600 dark:text-green-400' 
                                            : 'text-red-600 dark:text-red-400'
                                    ]"
                                >
                                    {{ selectedAuditLog.status === 'success' ? 'Success' : 'Failed' }}
                                </span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Action:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedAuditLog.title }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Module:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedAuditLog.module }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">User:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedAuditLog.actor }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Timestamp:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedAuditLog.timestamp }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">IP Address:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedAuditLog.ipAddress }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Details Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Details</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedAuditLog.description }}</p>
                    </div>

                    <!-- Changes Section (if changes exist) -->
                    <div v-if="selectedAuditLog.changes">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Changes</h3>
                        <div class="space-y-3">
                            <div 
                                v-for="(change, index) in selectedAuditLog.changes" 
                                :key="index"
                                class="flex items-center gap-3"
                            >
                                <div class="flex-1">
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ change.field }}</p>
                                    <div class="flex items-center gap-2">
                                        <div class="px-3 py-1.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-sm font-medium text-red-700 dark:text-red-400">
                                            {{ change.oldValue }}
                                        </div>
                                        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                        <div class="px-3 py-1.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded text-sm font-medium text-green-700 dark:text-green-400">
                                            {{ change.newValue }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeAuditLogDetailsModal"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>

        <!-- Create New Role Modal -->
        <div
            v-if="showCreateRoleModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="closeCreateRoleModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Create New Role</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Define a new admin role with specific permissions</p>
                    </div>
                    <button
                        @click="closeCreateRoleModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Role Details Section -->
                    <div class="space-y-4">
                        <div>
                            <label for="roleName" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Role Name
                            </label>
                            <input
                                id="roleName"
                                type="text"
                                v-model="newRoleForm.roleName"
                                placeholder="Operations Manager"
                                class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label for="roleDescription" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Description
                            </label>
                            <input
                                id="roleDescription"
                                type="text"
                                v-model="newRoleForm.description"
                                placeholder="Describe the role's responsibilities..."
                                class="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <!-- Permissions Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Permissions</h3>
                        <div class="space-y-6">
                            <!-- Dashboard Category -->
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <input
                                        type="checkbox"
                                        :checked="areAllDashboardPermissionsChecked"
                                        @change="toggleAllDashboardPermissions"
                                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-not-allowed opacity-50"
                                        disabled
                                    />
                                    <label class="text-sm font-medium text-gray-900 dark:text-white">Dashboard</label>
                                </div>
                                <div class="ml-6 space-y-3">
                                    <div class="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            v-model="newRoleForm.permissions.dashboard.view"
                                            class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div>
                                            <label class="text-sm font-medium text-gray-900 dark:text-white">View Dashboard</label>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">Access main dashboard and KPIs</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            v-model="newRoleForm.permissions.dashboard.export"
                                            class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div>
                                            <label class="text-sm font-medium text-gray-900 dark:text-white">Export Data</label>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">Export dashboard data</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Trips Management Category -->
                            <div>
                                <div class="flex items-center gap-2 mb-3">
                                    <input
                                        type="checkbox"
                                        :checked="areAllTripsPermissionsChecked"
                                        @change="toggleAllTripsPermissions"
                                        class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-not-allowed opacity-50"
                                        disabled
                                    />
                                    <label class="text-sm font-medium text-gray-900 dark:text-white">Trips Management</label>
                                </div>
                                <div class="ml-6 space-y-3">
                                    <div class="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            v-model="newRoleForm.permissions.trips.view"
                                            class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div>
                                            <label class="text-sm font-medium text-gray-900 dark:text-white">View Trips</label>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">View all trip records</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            v-model="newRoleForm.permissions.trips.edit"
                                            class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div>
                                            <label class="text-sm font-medium text-gray-900 dark:text-white">Edit Trips</label>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">Modify trip details</p>
                                        </div>
                                    </div>
                                    <div class="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            v-model="newRoleForm.permissions.trips.cancel"
                                            class="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <div>
                                            <label class="text-sm font-medium text-gray-900 dark:text-white">Cancel Trips</label>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">Cancel running or scheduled trips</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeCreateRoleModal"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="createRole"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                    >
                        <UserIcon class="h-4 w-4" />
                        Create Role
                    </button>
                </div>
            </div>
        </div>

        <!-- Delete Role Confirmation Modal -->
        <div
            v-if="showDeleteRoleModal && roleToDelete"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="closeDeleteRoleModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 my-auto flex flex-col">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Delete Role</h2>
                    <button
                        @click="closeDeleteRoleModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="p-6 space-y-4">
                    <p class="text-sm text-gray-900 dark:text-white">Are you sure you want to delete this role?</p>
                    
                    <!-- Warning Box -->
                    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                                <ExclamationTriangleIcon class="h-4 w-4 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-gray-900 dark:text-white">
                                Deleting "<span class="font-semibold">{{ roleToDelete.name }}</span>" will affect <span class="font-semibold">{{ roleToDelete.users }}</span> admin user(s). They will need to be reassigned to a different role.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeDeleteRoleModal"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="confirmDeleteRole"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 flex items-center gap-2"
                    >
                        <TrashIcon class="h-4 w-4" />
                        Delete Role
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Admin User Modal -->
        <div
            v-if="showEditAdminUserModal && editingAdminUser"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="closeEditAdminUserModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4 my-auto flex flex-col">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Edit Admin User</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Update admin user details</p>
                    </div>
                    <button
                        @click="closeEditAdminUserModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="p-6 space-y-4">
                    <!-- Full Name -->
                    <div>
                        <label for="editFullName" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Full Name
                        </label>
                        <input
                            id="editFullName"
                            type="text"
                            v-model="editAdminUserForm.fullName"
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Email Address -->
                    <div>
                        <label for="editEmailAddress" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Email Address
                        </label>
                        <input
                            id="editEmailAddress"
                            type="email"
                            v-model="editAdminUserForm.email"
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Role -->
                    <div>
                        <label for="editRole" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Role
                        </label>
                        <div class="relative">
                            <select
                                id="editRole"
                                v-model="editAdminUserForm.role"
                                class="w-full px-4 py-2 pl-3 pr-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                            >
                                <option value="Super Admin">Super Admin</option>
                                <option value="Operations Manager">Operations Manager</option>
                                <option value="Finance Manager">Finance Manager</option>
                                <option value="Customer Support">Customer Support</option>
                                <option value="Analytics Viewer">Analytics Viewer</option>
                            </select>
                            <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeEditAdminUserModal"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="updateAdminUser"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <CheckIcon class="h-4 w-4" />
                        Update User
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import {
    ArrowDownTrayIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    XMarkIcon,
    UserIcon,
    ExclamationTriangleIcon,
    UserPlusIcon,
    CheckIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/vue/24/outline'

// Tabs
const tabs = [
    { id: 'roles', label: 'Roles & Permissions' },
    { id: 'admin-users', label: 'Admin Users' },
    { id: 'audit-logs', label: 'Audit Logs' }
]
const activeTab = ref('roles')

// Search
const searchQuery = ref('')
const adminSearchQuery = ref('')
const auditSearchQuery = ref('')

// Audit Logs Filters
const selectedModule = ref('All Modules')
const selectedAuditStatus = ref('All Status')
const showModuleDropdown = ref(false)
const showAuditStatusDropdown = ref(false)
const moduleDropdownRef = ref<HTMLElement | null>(null)
const auditStatusDropdownRef = ref<HTMLElement | null>(null)

// Audit Log Details Modal
const showAuditLogDetailsModal = ref(false)
const selectedAuditLog = ref<any>(null)

const moduleOptions = ['All Modules', 'Driver Management', 'Dispatch', 'Earnings & Payouts', 'Disputes', 'Pricing', 'Reports & Analytics']
const auditStatusOptions = ['All Status', 'Success', 'Failed']

// Roles Data
const roles = ref([
    {
        id: '1',
        name: 'Super Admin',
        subLabel: 'System Role',
        description: 'Full system access with all permissions',
        users: 3,
        permissions: 'All',
        lastUpdated: '2024-01-15'
    },
    {
        id: '2',
        name: 'Finance Manager',
        subLabel: null,
        description: 'Handle earnings, payouts, and financial reports',
        users: 5,
        permissions: 4,
        lastUpdated: '2025-09-15'
    },
    {
        id: '3',
        name: 'Analytics Viewer',
        subLabel: null,
        description: 'View reports and analytics only',
        users: 6,
        permissions: 3,
        lastUpdated: '2025-07-12'
    },
    {
        id: '4',
        name: 'Operations Manager',
        subLabel: null,
        description: 'Manage daily operations, drivers, and trips',
        users: 8,
        permissions: 5,
        lastUpdated: '2025-10-10'
    },
    {
        id: '5',
        name: 'Customer Support',
        subLabel: null,
        description: 'Handle disputes and customer inquiries',
        users: 12,
        permissions: 4,
        lastUpdated: '2025-08-20'
    }
])

// Filtered Roles
const filteredRoles = computed(() => {
    if (!searchQuery.value) {
        return roles.value
    }
    const query = searchQuery.value.toLowerCase()
    return roles.value.filter(role =>
        role.name.toLowerCase().includes(query) ||
        role.description.toLowerCase().includes(query)
    )
})

// Actions
const exportLogs = () => {
    console.log('Exporting logs')
    // Handle export logic
}

// Create Role Modal
const showCreateRoleModal = ref(false)
const newRoleForm = ref({
    roleName: '',
    description: '',
    permissions: {
        dashboard: {
            view: false,
            export: false
        },
        trips: {
            view: true,
            edit: true,
            cancel: false
        }
    }
})

const areAllDashboardPermissionsChecked = computed(() => {
    return newRoleForm.value.permissions.dashboard.view && 
           newRoleForm.value.permissions.dashboard.export
})

const areAllTripsPermissionsChecked = computed(() => {
    return newRoleForm.value.permissions.trips.view && 
           newRoleForm.value.permissions.trips.edit && 
           newRoleForm.value.permissions.trips.cancel
})

const toggleAllDashboardPermissions = () => {
    const allChecked = areAllDashboardPermissionsChecked.value
    newRoleForm.value.permissions.dashboard.view = !allChecked
    newRoleForm.value.permissions.dashboard.export = !allChecked
}

const toggleAllTripsPermissions = () => {
    const allChecked = areAllTripsPermissionsChecked.value
    newRoleForm.value.permissions.trips.view = !allChecked
    newRoleForm.value.permissions.trips.edit = !allChecked
    newRoleForm.value.permissions.trips.cancel = !allChecked
}

const openCreateRoleModal = () => {
    newRoleForm.value = {
        roleName: '',
        description: '',
        permissions: {
            dashboard: {
                view: false,
                export: false
            },
            trips: {
                view: true,
                edit: true,
                cancel: false
            }
        }
    }
    showCreateRoleModal.value = true
}

const closeCreateRoleModal = () => {
    showCreateRoleModal.value = false
    newRoleForm.value = {
        roleName: '',
        description: '',
        permissions: {
            dashboard: {
                view: false,
                export: false
            },
            trips: {
                view: true,
                edit: true,
                cancel: false
            }
        }
    }
}

const createRole = () => {
    if (!newRoleForm.value.roleName || !newRoleForm.value.description) {
        alert('Please fill in role name and description.')
        return
    }
    
    // Count permissions
    let permissionCount = 0
    if (newRoleForm.value.permissions.dashboard.view) permissionCount++
    if (newRoleForm.value.permissions.dashboard.export) permissionCount++
    if (newRoleForm.value.permissions.trips.view) permissionCount++
    if (newRoleForm.value.permissions.trips.edit) permissionCount++
    if (newRoleForm.value.permissions.trips.cancel) permissionCount++
    
    // Add new role
    const newRole = {
        id: Date.now().toString(),
        name: newRoleForm.value.roleName,
        subLabel: null,
        description: newRoleForm.value.description,
        users: 0,
        permissions: permissionCount,
        lastUpdated: new Date().toISOString().split('T')[0]
    }
    
    roles.value.push(newRole)
    console.log('Creating role:', newRoleForm.value)
    closeCreateRoleModal()
}

const editRole = (role: any) => {
    console.log('Editing role:', role.name)
    // Handle edit logic
}

// Delete Role Modal
const showDeleteRoleModal = ref(false)
const roleToDelete = ref<any>(null)

const deleteRole = (role: any) => {
    roleToDelete.value = role
    showDeleteRoleModal.value = true
}

const closeDeleteRoleModal = () => {
    showDeleteRoleModal.value = false
    roleToDelete.value = null
}

const confirmDeleteRole = () => {
    if (roleToDelete.value) {
        console.log('Deleting role:', roleToDelete.value.name)
        const index = roles.value.findIndex(r => r.id === roleToDelete.value.id)
        if (index !== -1) {
            roles.value.splice(index, 1)
        }
        closeDeleteRoleModal()
    }
}

// Admin Users Data
const adminUsers = ref([
    {
        id: '1',
        name: 'Sarah Johnson',
        userId: 'admin-1',
        email: 'sarah.johnson@paymax.co',
        role: 'Super Admin',
        status: 'Inactive',
        lastLogin: '2025-10-19 14:32'
    },
    {
        id: '2',
        name: 'Michael Chen',
        userId: 'admin-2',
        email: 'michael.chen@paymax.cor',
        role: 'Operations Manager',
        status: 'Active',
        lastLogin: '2025-10-19 13:45'
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        userId: 'admin-3',
        email: 'emily.rodriguez@paymax.c',
        role: 'Finance Manager',
        status: 'Active',
        lastLogin: '2025-10-19 11:20'
    },
    {
        id: '4',
        name: 'David Park',
        userId: 'admin-4',
        email: 'david.park@paymax.com',
        role: 'Customer Support',
        status: 'Active',
        lastLogin: '2025-10-19 15:10'
    },
    {
        id: '5',
        name: 'Lisa Wang',
        userId: 'admin-5',
        email: 'lisa.wang@paymax.com',
        role: 'Analytics Viewer',
        status: 'Active',
        lastLogin: '2025-10-18 16:45'
    }
])

// Filtered Admin Users
const filteredAdminUsers = computed(() => {
    if (!adminSearchQuery.value) {
        return adminUsers.value
    }
    const query = adminSearchQuery.value.toLowerCase()
    return adminUsers.value.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query) ||
        user.userId.toLowerCase().includes(query)
    )
})

// Admin User Actions
const openAddAdminUserModal = () => {
    console.log('Opening add admin user modal')
    // Handle add admin user modal logic
}

// Edit Admin User Modal
const showEditAdminUserModal = ref(false)
const editingAdminUser = ref<any>(null)
const editAdminUserForm = ref({
    fullName: '',
    email: '',
    role: ''
})

const editAdminUser = (user: any) => {
    editingAdminUser.value = user
    editAdminUserForm.value = {
        fullName: user.name,
        email: user.email,
        role: user.role
    }
    showEditAdminUserModal.value = true
}

const closeEditAdminUserModal = () => {
    showEditAdminUserModal.value = false
    editingAdminUser.value = null
    editAdminUserForm.value = {
        fullName: '',
        email: '',
        role: ''
    }
}

const updateAdminUser = () => {
    if (!editAdminUserForm.value.fullName || !editAdminUserForm.value.email || !editAdminUserForm.value.role) {
        alert('Please fill in all fields.')
        return
    }
    
    if (editingAdminUser.value) {
        const index = adminUsers.value.findIndex(u => u.id === editingAdminUser.value.id)
        if (index !== -1) {
            adminUsers.value[index].name = editAdminUserForm.value.fullName
            adminUsers.value[index].email = editAdminUserForm.value.email
            adminUsers.value[index].role = editAdminUserForm.value.role
        }
    }
    
    console.log('Updating admin user:', editAdminUserForm.value)
    closeEditAdminUserModal()
}

const toggleUserStatus = (user: any) => {
    user.status = user.status === 'Active' ? 'Inactive' : 'Active'
    console.log('Toggling user status:', user.name, user.status)
}

// Audit Logs Filters
const toggleModuleDropdown = () => {
    showModuleDropdown.value = !showModuleDropdown.value
    if (showModuleDropdown.value) {
        showAuditStatusDropdown.value = false
    }
}

const toggleAuditStatusDropdown = () => {
    showAuditStatusDropdown.value = !showAuditStatusDropdown.value
    if (showAuditStatusDropdown.value) {
        showModuleDropdown.value = false
    }
}

const selectModule = (module: string) => {
    selectedModule.value = module
    showModuleDropdown.value = false
}

const selectAuditStatus = (status: string) => {
    selectedAuditStatus.value = status
    showAuditStatusDropdown.value = false
}

// Audit Log Details Modal Functions
const openAuditLogDetails = (log: any) => {
    selectedAuditLog.value = log
    showAuditLogDetailsModal.value = true
}

const closeAuditLogDetailsModal = () => {
    showAuditLogDetailsModal.value = false
    selectedAuditLog.value = null
}

// Handle click outside for audit filters
const handleAuditClickOutside = (event: MouseEvent) => {
    if (moduleDropdownRef.value && !moduleDropdownRef.value.contains(event.target as Node)) {
        showModuleDropdown.value = false
    }
    if (auditStatusDropdownRef.value && !auditStatusDropdownRef.value.contains(event.target as Node)) {
        showAuditStatusDropdown.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleAuditClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleAuditClickOutside)
})

// Audit Logs Data
const auditLogs = ref([
    {
        id: '1',
        title: 'Driver Suspended',
        description: 'Suspended driver DRV-234 due to low rating',
        actor: 'Sarah Johnson',
        timestamp: '2025-10-19 14:32:15',
        ipAddress: '192.168.1.100',
        module: 'Driver Management',
        status: 'success',
        changes: [
            {
                field: 'status',
                oldValue: 'active',
                newValue: 'suspended'
            }
        ]
    },
    {
        id: '2',
        title: 'Trip Assigned',
        description: 'Manually assigned trip TRP-5678 to driver DRV-123',
        actor: 'Michael Chen',
        timestamp: '2025-10-19 13:45:22',
        ipAddress: '192.168.1.101',
        module: 'Dispatch',
        status: 'success'
    },
    {
        id: '3',
        title: 'Payout Processed',
        description: 'Processed weekly payout batch for 45 drivers - $67,234.50',
        actor: 'Emily Rodriguez',
        timestamp: '2025-10-19 12:15:10',
        ipAddress: '192.168.1.102',
        module: 'Earnings & Payouts',
        status: 'success'
    },
    {
        id: '4',
        title: 'Dispute Resolved',
        description: 'Resolved dispute DSP-345 in favor of driver - Refund $25.00',
        actor: 'A. David Park',
        timestamp: '2025-10-18 11:30:45',
        ipAddress: '192.168.1.100',
        module: 'Disputes',
        status: 'success'
    },
    {
        id: '5',
        title: 'Pricing Rule Updated',
        description: 'Updated surge pricing multiplier for Downtown zone from 1.5x to 1.8x',
        actor: 'A. Sarah Johnson',
        timestamp: '2025-10-18 10:40:30',
        ipAddress: '192.168.1.100',
        module: 'Pricing',
        status: 'success'
    },
    {
        id: '6',
        title: 'Driver Approved',
        description: 'Approved driver application for James Wilson (DRV-567)',
        actor: 'A. Michael Owen',
        timestamp: '2025-10-18 09:20:13',
        ipAddress: '192.168.1.101',
        module: 'Driver Management',
        status: 'success'
    },
    {
        id: '7',
        title: 'Report Downloaded',
        description: 'Downloaded weekly revenue report (Oct 12-18, 2025)',
        actor: 'A. Lisa Wong',
        timestamp: '2025-10-18 08:22:05',
        ipAddress: '192.168.1.104',
        module: 'Reports & Analytics',
        status: 'success'
    },
    {
        id: '8',
        title: 'Payment Failed',
        description: 'Payout to driver DRV-789 failed - Invalid bank account',
        actor: 'A. Emily Rodriguez',
        timestamp: '2025-10-18 15:45:36',
        ipAddress: '192.168.1.102',
        module: 'Earnings & Payouts',
        status: 'failed'
    }
])

// Filtered Audit Logs
const filteredAuditLogs = computed(() => {
    let filtered = auditLogs.value

    // Search filter
    if (auditSearchQuery.value) {
        const query = auditSearchQuery.value.toLowerCase()
        filtered = filtered.filter(log =>
            log.title.toLowerCase().includes(query) ||
            log.description.toLowerCase().includes(query) ||
            log.actor.toLowerCase().includes(query) ||
            log.module.toLowerCase().includes(query)
        )
    }

    // Module filter
    if (selectedModule.value !== 'All Modules') {
        filtered = filtered.filter(log => log.module === selectedModule.value)
    }

    // Status filter
    if (selectedAuditStatus.value === 'Success') {
        filtered = filtered.filter(log => log.status === 'success')
    } else if (selectedAuditStatus.value === 'Failed') {
        filtered = filtered.filter(log => log.status === 'failed')
    }

    return filtered
})
</script>

