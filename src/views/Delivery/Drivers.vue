<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Driver Management</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Onboard, approve, and manage drivers</p>
            </div>
            <button class="px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-700">
                Export List
            </button>
        </div>

        <!-- Navigation Tabs -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <nav class="flex space-x-8 px-6" aria-label="Driver Navigation">
                <button
                    v-for="tab in navigationTabs"
                    :key="tab.name"
                    @click="activeTab = tab.name"
                    :class="[
                        'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                        activeTab === tab.name
                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    ]"
                >
                    {{ tab.label }}<span v-if="tab.count !== undefined" class="ml-1">({{ tab.count }})</span>
                </button>
            </nav>
        </div>

        <!-- Search Bar -->
        <div class="mb-6">
            <div class="relative">
                <input
                    v-model="searchQuery"
                    type="text"
                    :placeholder="getSearchPlaceholder()"
                    class="w-full px-4 py-2 pl-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        <!-- Active Drivers Table View -->
        <div v-if="activeTab === 'active' || activeTab === 'inactive' || activeTab === 'suspended'" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="overflow-x-auto">
                <Vue3Datatable
                    v-if="filteredDrivers.length > 0"
                    :rows="filteredDrivers"
                    :columns="tableColumns"
                    :totalRows="filteredDrivers.length"
                    :sortable="true"
                    :searchable="false"
                    :pageSize="rowsPerPage"
                    :pageSizeOptions="[10, 25, 50, 100]"
                    skin="bh-table-compact"
                    :loading="loading"
                    :classes="{
                        table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
                        thead: 'bg-gray-50 dark:bg-gray-800',
                        tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
                        tr: 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                        th: 'px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300',
                        td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
                    }"
                >
                    <template #status="data">
                        <span v-if="data && data.value" :class="getStatusBadgeClass(data.value.status || 'active')" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium">
                            {{ (data.value.status || 'active').charAt(0).toUpperCase() + (data.value.status || 'active').slice(1) }}
                        </span>
                        <span v-else class="text-gray-400">-</span>
                    </template>

                    <template #rating="data">
                        <div v-if="data && data.value && data.value.rating" class="flex items-center gap-1">
                            <StarIcon class="h-4 w-4 text-yellow-400" />
                            <span class="text-sm text-gray-900 dark:text-white">{{ data.value.rating }}</span>
                        </div>
                        <span v-else class="text-gray-400">-</span>
                    </template>

                    <template #actions="data">
                        <div v-if="data && data.value" class="flex items-center">
                            <button
                                @click.stop="viewDriverProfile(data.value)"
                                class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                View Profile
                            </button>
                        </div>
                        <span v-else class="text-gray-400">-</span>
                    </template>
                </Vue3Datatable>
                <div v-else class="p-12 text-center text-gray-500 dark:text-gray-400">
                    No drivers found
                </div>
            </div>
        </div>

        <!-- Pending Applications Card View -->
        <div v-else class="space-y-4">
            <div
                v-for="driver in filteredDrivers"
                :key="driver.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex items-center gap-6"
            >
                <!-- User Icon -->
                <div class="flex-shrink-0">
                    <div class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon class="h-8 w-8 text-gray-400" />
                    </div>
                </div>

                <!-- Driver Information -->
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ driver.name }}</h3>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ driver.driverId }} {{ driver.phone }}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-500 mb-3">Applied: {{ driver.appliedDate }}</p>

                            <!-- Progress Bar -->
                            <div class="mb-2">
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-xs text-gray-600 dark:text-gray-400">{{ driver.progress }}% Complete</span>
                                </div>
                                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        :style="{ width: driver.progress + '%' }"
                                    ></div>
                                </div>
                            </div>

                            <!-- Face Match -->
                            <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Face Match: {{ driver.faceMatch }}%</p>

                            <!-- Document Status -->
                            <div class="flex items-center gap-2">
                                <span
                                    :class="[
                                        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium',
                                        driver.docsStatus === 'complete' 
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                    ]"
                                >
                                    <component
                                        :is="driver.docsStatus === 'complete' ? CheckCircleIcon : ExclamationTriangleIcon"
                                        class="h-3 w-3 mr-1"
                                    />
                                    {{ driver.docsStatus === 'complete' ? 'Docs Complete' : 'Missing Docs' }}
                                </span>
                            </div>
                        </div>

                        <!-- Review Application Button -->
                        <div class="flex-shrink-0 ml-4">
                            <button
                                @click="reviewApplication(driver)"
                                class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                            >
                                Review Application
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredDrivers.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <p class="text-gray-500 dark:text-gray-400">No drivers found</p>
            </div>
        </div>

        <!-- Application Review Modal -->
        <div
            v-if="showReviewModal && selectedDriver"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            @click.self="closeReviewModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <!-- Modal Header -->
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Application Review - {{ selectedDriver.name }}</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Review driver application documents and approve or reject.</p>
                    </div>
                    <button
                        @click="closeReviewModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Tabs -->
                <div class="px-6 border-b border-gray-200 dark:border-gray-700">
                    <nav class="flex space-x-8" aria-label="Review Navigation">
                        <button
                            v-for="tab in reviewTabs"
                            :key="tab.name"
                            @click="activeReviewTab = tab.name"
                            :class="[
                                'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                                activeReviewTab === tab.name
                                    ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-700'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                            ]"
                        >
                            {{ tab.label }}
                        </button>
                    </nav>
                </div>

                <!-- Modal Content -->
                <div class="flex-1 overflow-y-auto p-6">
                    <!-- Profile Tab -->
                    <div v-if="activeReviewTab === 'profile'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Personal Information -->
                        <div>
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                            <div class="space-y-3">
                                <div>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Full Name:</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                        {{ selectedDriver.original?.first_name || '' }} {{ selectedDriver.original?.last_name || '' }}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Phone:</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                        {{ selectedDriver.original?.phone_number || selectedDriver.phone || 'N/A' }}
                                    </span>
                                </div>
                                <div>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Email:</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                        {{ selectedDriver.original?.email || selectedDriver.email || 'N/A' }}
                                    </span>
                                </div>
                                <div v-if="selectedDriver.original?.address">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Address:</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                        {{ selectedDriver.original.address }}
                                    </span>
                                </div>
                                <div v-if="selectedDriver.original?.area_of_operation">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Area of Operation:</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                        {{ selectedDriver.original.area_of_operation }}
                                    </span>
                                </div>
                                <div v-if="selectedDriver.original?.about_me">
                                    <span class="text-sm text-gray-500 dark:text-gray-400">About:</span>
                                    <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                        {{ selectedDriver.original.about_me }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Profile Photo -->
                        <div>
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Profile Photo</h3>
                            <div class="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                                <img 
                                    v-if="selectedDriver.original?.driver_photo" 
                                    :src="selectedDriver.original.driver_photo" 
                                    :alt="selectedDriver.name"
                                    class="w-full h-full object-cover"
                                />
                                <UserIcon v-else class="h-24 w-24 text-gray-400 dark:text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <!-- Documents Tab -->
                    <div v-if="activeReviewTab === 'documents'" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Driver License Front -->
                            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Driver License - Front</h4>
                                <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-3 min-h-[200px] flex items-center justify-center">
                                    <img 
                                        v-if="selectedDriver.original?.driving_license_photo_front" 
                                        :src="selectedDriver.original.driving_license_photo_front" 
                                        alt="Driver License Front"
                                        class="w-full h-full object-contain cursor-pointer"
                                        @click="window.open(selectedDriver.original.driving_license_photo_front, '_blank')"
                                    />
                                    <DocumentTextIcon v-else class="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                </div>
                                <div v-if="selectedDriver.original?.drivers_license_number" class="text-xs text-gray-600 dark:text-gray-400">
                                    License: {{ selectedDriver.original.drivers_license_number }}
                                </div>
                                <div v-if="selectedDriver.original?.drivers_license_expiry" class="text-xs text-gray-600 dark:text-gray-400">
                                    Expires: {{ new Date(selectedDriver.original.drivers_license_expiry).toLocaleDateString() }}
                                </div>
                            </div>

                            <!-- Driver License Back -->
                            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Driver License - Back</h4>
                                <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-3 min-h-[200px] flex items-center justify-center">
                                    <img 
                                        v-if="selectedDriver.original?.driving_license_photo_back" 
                                        :src="selectedDriver.original.driving_license_photo_back" 
                                        alt="Driver License Back"
                                        class="w-full h-full object-contain cursor-pointer"
                                        @click="window.open(selectedDriver.original.driving_license_photo_back, '_blank')"
                                    />
                                    <DocumentTextIcon v-else class="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                </div>
                            </div>

                            <!-- Vehicle Image -->
                            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Vehicle Image</h4>
                                <div class="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-3 min-h-[200px] flex items-center justify-center">
                                    <img 
                                        v-if="selectedDriver.original?.vehicle_image" 
                                        :src="selectedDriver.original.vehicle_image" 
                                        alt="Vehicle"
                                        class="w-full h-full object-contain cursor-pointer"
                                        @click="window.open(selectedDriver.original.vehicle_image, '_blank')"
                                    />
                                    <DocumentTextIcon v-else class="h-12 w-12 text-gray-400 dark:text-gray-500" />
                                </div>
                                <div v-if="selectedDriver.original?.vehicle_number" class="text-xs text-gray-600 dark:text-gray-400">
                                    Plate: {{ selectedDriver.original.vehicle_number }}
                                </div>
                            </div>

                            <!-- Vehicle Registration -->
                            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Vehicle Details</h4>
                                <div class="space-y-2 text-sm">
                                    <div v-if="selectedDriver.original?.registration_number">
                                        <span class="text-gray-600 dark:text-gray-400">Registration:</span>
                                        <span class="text-gray-900 dark:text-white ml-2 font-medium">
                                            {{ selectedDriver.original.registration_number }}
                                        </span>
                                    </div>
                                    <div v-if="selectedDriver.original?.vehicle_ownership">
                                        <span class="text-gray-600 dark:text-gray-400">Ownership:</span>
                                        <span class="text-gray-900 dark:text-white ml-2 font-medium capitalize">
                                            {{ selectedDriver.original.vehicle_ownership }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Vehicle Tab -->
                    <div v-if="activeReviewTab === 'vehicle'" class="space-y-4">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Vehicle Information</h3>
                        <div v-if="selectedDriver.original?.vehicle_image" class="mb-6">
                            <img 
                                :src="selectedDriver.original.vehicle_image" 
                                alt="Vehicle"
                                class="w-full max-w-md mx-auto rounded-lg shadow-lg"
                            />
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                    {{ selectedDriver.original?.vehicle_type || selectedDriver.original?.transport_mode || 'N/A' }}
                                </span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Make:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                    {{ selectedDriver.original?.vehicle_make || 'N/A' }}
                                </span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Model:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                    {{ selectedDriver.original?.vehicle_model || 'N/A' }}
                                </span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Year:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                    {{ selectedDriver.original?.vehicle_year || 'N/A' }}
                                </span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">License Plate:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                    {{ selectedDriver.original?.vehicle_number || selectedDriver.original?.registration_number || 'N/A' }}
                                </span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Color:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">
                                    {{ selectedDriver.original?.vehicle_color || 'N/A' }}
                                </span>
                            </div>
                            <div>
                                <span class="text-sm text-gray-500 dark:text-gray-400">Ownership:</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white ml-2 capitalize">
                                    {{ selectedDriver.original?.vehicle_ownership || 'N/A' }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Auto-Checklist Tab -->
                    <div v-if="activeReviewTab === 'auto-checklist'" class="space-y-3">
                        <!-- Face match verification -->
                        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Face match verification</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-700 dark:text-gray-300">{{ selectedDriver.faceMatch || 98 }}%</span>
                                <CheckCircleIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>

                        <!-- Document completeness -->
                        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Document completeness</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-700 dark:text-gray-300">{{ selectedDriver.progress || 95 }}%</span>
                                <CheckCircleIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>

                        <!-- Background check clear -->
                        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Background check clear</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-700 dark:text-gray-300">Passed</span>
                                <CheckCircleIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>

                        <!-- Insurance valid -->
                        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Insurance valid</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-700 dark:text-gray-300">Passed</span>
                                <CheckCircleIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>

                        <!-- Vehicle inspection -->
                        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Vehicle inspection</span>
                            <div class="flex items-center gap-2">
                                <span class="text-sm text-gray-700 dark:text-gray-300">Passed</span>
                                <CheckCircleIcon class="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-end gap-3">
                    <button
                        @click="rejectApplication"
                        class="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                        Reject
                    </button>
                    <button
                        @click="approveApplication"
                        class="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>

        <!-- Driver Profile Modal -->
        <div
            v-if="showProfileModal && selectedProfileDriver"
            class="fixed inset-0 z-50 bg-gray-50 dark:bg-gray-900 flex flex-col"
        >
            <div class="flex-1 overflow-y-auto">
                <!-- Header -->
                <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                    <div class="flex items-center gap-4">
                        <button
                            @click="closeProfileModal"
                            class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                            <ArrowLeftIcon class="h-6 w-6" />
                        </button>
                        <div>
                            <h1 class="text-xl font-bold text-gray-900 dark:text-white">Driver Profile</h1>
                            <p class="text-sm text-gray-500 dark:text-gray-400">{{ selectedProfileDriver.driverId }}</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
                            <EnvelopeIcon class="h-4 w-4" />
                            Send email
                        </button>
                        <button 
                            @click="openSuspendModal"
                            class="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 flex items-center gap-2"
                        >
                            <NoSymbolIcon class="h-4 w-4" />
                            Suspend
                        </button>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-6 space-y-6">
                    <!-- Driver Summary -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div class="flex items-start gap-6">
                            <!-- Profile Picture -->
                            <div class="flex-shrink-0">
                                <div class="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <UserIcon class="h-12 w-12 text-gray-400" />
                                </div>
                            </div>

                            <!-- Driver Info -->
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedProfileDriver.name }}</h2>
                                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                        Active
                                    </span>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">Member</span>
                                </div>
                                <div class="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                    <div class="flex items-center gap-1">
                                        <EnvelopeIcon class="h-4 w-4" />
                                        {{ selectedProfileDriver.email || 'john.smith@email.com' }}
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <PhoneIcon class="h-4 w-4" />
                                        {{ selectedProfileDriver.phone || '+1 (555) 123-4567' }}
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <CalendarDaysIcon class="h-4 w-4" />
                                        Joined 2023-03-15
                                    </div>
                                </div>
                                <div class="flex items-center gap-6">
                                    <div class="flex items-center gap-2">
                                        <StarIcon class="h-5 w-5 text-yellow-400" />
                                        <span class="text-lg font-semibold text-gray-900 dark:text-white">{{ selectedProfileDriver.rating || 4.92 }}</span>
                                        <span class="text-sm text-gray-500 dark:text-gray-400">1947 reviews</span>
                                    </div>
                                    <div class="text-sm text-gray-500 dark:text-gray-400">
                                        Last active: 2 hours ago
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- KPIs -->
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Trips</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedProfileDriver.totalTrips || 2847 }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Acceptance Rate</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">96%</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Completion Rate</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">96%</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Earnings</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedProfileDriver.earnings || '$87,654.32' }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation Tabs -->
                    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <nav class="flex space-x-8 px-6 border-b border-gray-200 dark:border-gray-700">
                            <button
                                v-for="tab in profileTabs"
                                :key="tab.name"
                                @click="activeProfileTab = tab.name"
                                :class="[
                                    'py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200',
                                    activeProfileTab === tab.name
                                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                ]"
                            >
                                {{ tab.label }}
                            </button>
                        </nav>
                    </div>

                    <!-- Overview Tab Content -->
                    <div v-if="activeProfileTab === 'overview'" class="space-y-6">
                        <!-- Charts -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <!-- Performance Trend -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Performance Trend</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Last 4 weeks</p>
                                <div class="h-48">
                                    <LineChart :data="performanceTrendData" :options="lineChartOptions" />
                                </div>
                            </div>

                            <!-- Weekly Trips -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Weekly Trips</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Last week</p>
                                <div class="h-48">
                                    <BarChart :data="weeklyTripsData" :options="barChartOptions" />
                                </div>
                            </div>

                            <!-- Monthly Earnings -->
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Monthly Earnings</h3>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-4">Last 3 months</p>
                                <div class="h-48">
                                    <LineChart :data="monthlyEarningsData" :options="areaChartOptions" />
                                </div>
                            </div>
                        </div>

                        <!-- Detailed Information -->
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Left Column -->
                            <div class="space-y-6">
                                <!-- Personal Information -->
                                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                                    <div class="space-y-3">
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Full Name:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">{{ selectedProfileDriver.name }}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Email address:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">{{ selectedProfileDriver.email || 'john.smith@email.com' }}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Phone number:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">{{ selectedProfileDriver.phone || '+1 (555) 123-4567' }}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Address:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">1234 Main Street, Apt 5A, San Francisco, CA 94102, United States</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Emergency Contact:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">Sarah Smith (Spouse), +1 (555) 987-6543</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Bank Details -->
                                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <div class="flex items-center justify-between mb-4">
                                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Bank Details</h3>
                                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            Verified
                                        </span>
                                    </div>
                                    <div class="space-y-3">
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Account Holder:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">{{ selectedProfileDriver.name }}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Bank Name:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">Chase Bank</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Account Number:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">**** 1234</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Routing Number:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">**** 9638</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Account Type:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">Checking</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div class="space-y-6">
                                <!-- Vehicle Information -->
                                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Vehicle Information</h3>
                                    <div class="space-y-3">
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Vehicle:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">{{ selectedProfileDriver.vehicle?.makeModel || '2022 Toyota Camry, Silver - Standard 4 seats' }}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">License Plate:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">{{ selectedProfileDriver.vehicle?.licensePlate || 'ABC 1234' }}</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">VIN:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">THGSH234XLDMN100186</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Insurance Expiry:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">2025-12-31</span>
                                        </div>
                                        <div>
                                            <span class="text-sm text-gray-500 dark:text-gray-400">Registration Expiry:</span>
                                            <span class="text-sm font-medium text-gray-900 dark:text-white ml-2">2025-11-18</span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Performance Metrics -->
                                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                    <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
                                    <div class="space-y-4">
                                        <div>
                                            <div class="flex items-center justify-between mb-1">
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Acceptance Rate</span>
                                                <span class="text-sm font-medium text-gray-900 dark:text-white">90%</span>
                                            </div>
                                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div class="bg-blue-600 h-2 rounded-full" style="width: 90%"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between mb-1">
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Completion Rate</span>
                                                <span class="text-sm font-medium text-gray-900 dark:text-white">80%</span>
                                            </div>
                                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div class="bg-blue-600 h-2 rounded-full" style="width: 80%"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="flex items-center justify-between mb-1">
                                                <span class="text-sm text-gray-500 dark:text-gray-400">On-Time Percentage</span>
                                                <span class="text-sm font-medium text-gray-900 dark:text-white">94%</span>
                                            </div>
                                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                <div class="bg-blue-600 h-2 rounded-full" style="width: 94%"></div>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2 gap-4 pt-2">
                                            <div>
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Avg Response Time</span>
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">12s</p>
                                            </div>
                                            <div>
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Total Hours</span>
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">124h</p>
                                            </div>
                                            <div>
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Avg Trip Distance</span>
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">6.5 mi</p>
                                            </div>
                                            <div>
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Avg Trip Duration</span>
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">18 min</p>
                                            </div>
                                            <div>
                                                <span class="text-sm text-gray-500 dark:text-gray-400">Pass Rate %</span>
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">95%</p>
                                            </div>
                                            <div>
                                                <span class="text-sm text-gray-500 dark:text-gray-400">This Month</span>
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">$6,234.5</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Trips Tab Content -->
                    <div v-else-if="activeProfileTab === 'trips'" class="space-y-6">
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Recent Trips</h3>
                                <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
                                    <ArrowDownTrayIcon class="h-4 w-4" />
                                    Export
                                </button>
                            </div>
                            <div class="overflow-x-auto">
                                <Vue3Datatable
                                    v-if="tripsData.length > 0"
                                    :rows="tripsData"
                                    :columns="tripsTableColumns"
                                    :totalRows="tripsData.length"
                                    :sortable="true"
                                    :searchable="false"
                                    :pageSize="10"
                                    :pageSizeOptions="[10, 25, 50, 100]"
                                    skin="bh-table-compact"
                                    :loading="false"
                                    :classes="{
                                        table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
                                        thead: 'bg-gray-50 dark:bg-gray-800',
                                        tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
                                        tr: 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                                        th: 'px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300',
                                        td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
                                    }"
                                >
                                    <template #route="data">
                                        <div v-if="data && data.value" class="flex flex-col">
                                            <span class="text-gray-900 dark:text-white">{{ data.value.pickup }}</span>
                                            <span class="text-gray-500 dark:text-gray-400 text-xs">/ {{ data.value.dropoff }}</span>
                                        </div>
                                        <span v-else class="text-gray-400">-</span>
                                    </template>

                                    <template #rating="data">
                                        <div v-if="data && data.value && data.value.rating" class="flex items-center gap-1">
                                            <StarIcon class="h-4 w-4 text-yellow-400" />
                                            <span class="text-sm text-gray-900 dark:text-white">{{ data.value.rating }}</span>
                                        </div>
                                        <span v-else class="text-gray-400">-</span>
                                    </template>

                                    <template #status="data">
                                        <span v-if="data && data.value && data.value.status" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                            {{ data.value.status }}
                                        </span>
                                        <span v-else class="text-gray-400">-</span>
                                    </template>
                                </Vue3Datatable>
                                <div v-else class="p-12 text-center text-gray-500 dark:text-gray-400">
                                    No trips found
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Earnings Tab Content -->
                    <div v-else-if="activeProfileTab === 'earnings'" class="space-y-6">
                        <!-- Earnings Statistics Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Earnings</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">$87,654.32</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">All time</p>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">This Month</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">$6,234.5</p>
                                <p class="text-xs font-semibold text-green-600 dark:text-green-400">+12.5%</p>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg Per Trip</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">$30.80</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Last 30 days</p>
                            </div>
                            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Avg Per Hour</p>
                                <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">$42.15</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">Last 30 days</p>
                            </div>
                        </div>

                        <!-- Earnings History Chart -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div class="flex items-center justify-between mb-4">
                                <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Earnings History</h3>
                                <button class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2">
                                    <ArrowDownTrayIcon class="h-4 w-4" />
                                    Download Statement
                                </button>
                            </div>
                            <div class="h-64">
                                <LineChart
                                    v-if="earningsHistoryData"
                                    :data="earningsHistoryData"
                                    :options="earningsHistoryOptions"
                                />
                            </div>
                        </div>

                        <!-- Earnings Breakdown -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Earnings Breakdown</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Left Column -->
                                <div class="space-y-4">
                                    <div>
                                        <div class="flex items-center justify-between mb-1">
                                            <span class="text-sm font-medium text-gray-900 dark:text-white">Trip Fares</span>
                                            <span class="text-sm font-semibold text-gray-900 dark:text-white">$72,345.20</span>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">Base earnings from completed trips</p>
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-between mb-1">
                                            <span class="text-sm font-medium text-gray-900 dark:text-white">Bonuses</span>
                                            <span class="text-sm font-semibold text-gray-900 dark:text-white">$4,567.32</span>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">Performance & referral bonuses</p>
                                    </div>
                                </div>

                                <!-- Right Column -->
                                <div class="space-y-4">
                                    <div>
                                        <div class="flex items-center justify-between mb-1">
                                            <span class="text-sm font-medium text-gray-900 dark:text-white">Tips</span>
                                            <span class="text-sm font-semibold text-gray-900 dark:text-white">$8,234.50</span>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">Passenger tips</p>
                                    </div>
                                    <div>
                                        <div class="flex items-center justify-between mb-1">
                                            <span class="text-sm font-medium text-gray-900 dark:text-white">Surge/Peak Earnings</span>
                                            <span class="text-sm font-semibold text-gray-900 dark:text-white">$2,507.30</span>
                                        </div>
                                        <p class="text-xs text-gray-500 dark:text-gray-400">High-demand multipliers</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Additional Items -->
                            <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-sm font-medium text-gray-900 dark:text-white">Platform Fees</span>
                                        <span class="text-sm font-semibold text-red-600 dark:text-red-400">-$14,532.10</span>
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Service charges and commissions</p>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between mb-1">
                                        <span class="text-sm font-medium text-gray-900 dark:text-white">Adjustments</span>
                                        <span class="text-sm font-semibold text-green-600 dark:text-green-400">+$532.10</span>
                                    </div>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Refunds and corrections</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Documents Tab Content -->
                    <div v-else-if="activeProfileTab === 'documents'" class="space-y-6">
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Required Documents</h3>
                            <div class="overflow-x-auto">
                                <Vue3Datatable
                                    v-if="documentsData.length > 0"
                                    :rows="documentsData"
                                    :columns="documentsTableColumns"
                                    :totalRows="documentsData.length"
                                    :sortable="true"
                                    :searchable="false"
                                    :pageSize="10"
                                    :pageSizeOptions="[10, 25, 50, 100]"
                                    skin="bh-table-compact"
                                    :loading="false"
                                    :classes="{
                                        table: 'min-w-full divide-y divide-gray-200 dark:divide-gray-700',
                                        thead: 'bg-gray-50 dark:bg-gray-800',
                                        tbody: 'bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700',
                                        tr: 'hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                                        th: 'px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300',
                                        td: 'px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100',
                                    }"
                                >
                                    <template #status="data">
                                        <div v-if="data && data.value && data.value.status" class="flex items-center gap-2">
                                            <CheckCircleIcon v-if="data.value.status === 'Verified'" class="h-5 w-5 text-green-600 dark:text-green-400" />
                                            <ExclamationTriangleIcon v-else class="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                            <span :class="data.value.status === 'Verified' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'" class="font-medium">
                                                {{ data.value.status }}
                                            </span>
                                        </div>
                                        <span v-else class="text-gray-400">-</span>
                                    </template>

                                    <template #actions="data">
                                        <div v-if="data && data.value" class="flex items-center gap-3">
                                            <button
                                                @click.stop="viewDocument(data.value)"
                                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                title="View document"
                                            >
                                                <EyeIcon class="h-5 w-5" />
                                            </button>
                                            <button
                                                @click.stop="downloadDocument(data.value)"
                                                class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                title="Download document"
                                            >
                                                <ArrowDownTrayIcon class="h-5 w-5" />
                                            </button>
                                        </div>
                                        <span v-else class="text-gray-400">-</span>
                                    </template>
                                </Vue3Datatable>
                                <div v-else class="p-12 text-center text-gray-500 dark:text-gray-400">
                                    No documents found
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Reviews Tab Content -->
                    <div v-else-if="activeProfileTab === 'reviews'" class="space-y-6">
                        <!-- Ratings Summary -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <!-- Average Rating -->
                                <div>
                                    <div class="flex items-center gap-2 mb-2">
                                        <StarIconSolid class="h-8 w-8 text-gray-900 dark:text-white" />
                                        <span class="text-2xl font-bold text-gray-900 dark:text-white">4.92</span>
                                    </div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">1847 total ratings</p>
                                </div>

                                <!-- 5-Star Ratings -->
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">5-Star Ratings</p>
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">1,654</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">89.0% of total</p>
                                </div>

                                <!-- 4-Star Ratings -->
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">4-Star Ratings</p>
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">156</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">8.4% of total</p>
                                </div>

                                <!-- Below 4 Stars -->
                                <div>
                                    <p class="text-sm font-medium text-gray-900 dark:text-white mb-2">Below 4 Stars</p>
                                    <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">37</p>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">2.0% of total</p>
                                </div>
                            </div>
                        </div>

                        <!-- Recent Reviews -->
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent Reviews</h3>
                            <div class="space-y-4">
                                <div v-for="review in reviewsData" :key="review.id" class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                                    <div class="flex items-start justify-between">
                                        <div class="flex-1">
                                            <div class="flex items-center gap-3 mb-2">
                                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ review.reviewerName }}</p>
                                                <div class="flex items-center gap-1">
                                                    <StarIconSolid
                                                        v-for="i in review.rating"
                                                        :key="i"
                                                        class="h-4 w-4 text-gray-900 dark:text-white"
                                                    />
                                                    <StarIcon
                                                        v-for="i in (5 - review.rating)"
                                                        :key="'empty-' + i"
                                                        class="h-4 w-4 text-gray-300 dark:text-gray-600"
                                                    />
                                                </div>
                                            </div>
                                            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">{{ review.dateTime }}</p>
                                            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">{{ review.comment }}</p>
                                        </div>
                                        <div class="ml-4">
                                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ review.tripId }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Activity Tab Content -->
                    <div v-else-if="activeProfileTab === 'activity'" class="space-y-6">
                        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Activity Log</h3>
                            <div class="space-y-4">
                                <div v-for="activity in activityData" :key="activity.id" class="flex items-start gap-4">
                                    <!-- Icon -->
                                    <div :class="[
                                        'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
                                        activity.iconBg
                                    ]">
                                        <component :is="activity.icon" class="h-5 w-5 text-white" />
                                    </div>
                                    
                                    <!-- Content -->
                                    <div class="flex-1 min-w-0">
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">{{ activity.title }}</p>
                                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">{{ activity.description }}</p>
                                        <p class="text-xs text-gray-500 dark:text-gray-500">{{ activity.timestamp }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Other Tabs Content -->
                    <div v-else class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ activeProfileTab }} content will be displayed here.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Suspend Driver Modal -->
        <div
            v-if="showSuspendModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            @click.self="closeSuspendModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">Suspend Driver</h2>
                    <button
                        @click="closeSuspendModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="p-6 space-y-6">
                    <!-- Warning Message -->
                    <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
                        <div class="flex-shrink-0">
                            <div class="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
                                <ExclamationTriangleIcon class="h-5 w-5 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                        <div class="flex-1">
                            <p class="text-sm text-red-800 dark:text-red-300">
                                This driver will not be able to accept new trips while suspended. They will receive a notification about the suspension.
                            </p>
                        </div>
                    </div>

                    <!-- Reason for Suspension -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Reason for Suspension
                        </label>
                        <textarea
                            v-model="suspendReason"
                            rows="4"
                            placeholder="Explain why this driver is being suspended..."
                            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        ></textarea>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        @click="closeSuspendModal"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="confirmSuspend"
                        class="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                    >
                        Suspend Driver
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { UserIcon, CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon, DocumentTextIcon, StarIcon, ArrowLeftIcon, EnvelopeIcon, NoSymbolIcon, PhoneIcon, CalendarDaysIcon, ArrowDownTrayIcon, EyeIcon, TruckIcon, CurrencyDollarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/vue/24/solid'
import Vue3Datatable from '@bhplugin/vue3-datatable'
import '@bhplugin/vue3-datatable/dist/style.css'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
import deliveryService from '@/services/deliveryService'

// Navigation tabs
const activeTab = ref('pending')
const navigationTabs = ref([
    { name: 'pending', label: 'Pending Applications', count: 0 },
    { name: 'active', label: 'Active Drivers', count: 0 },
    { name: 'inactive', label: 'Inactive', count: 0 },
    { name: 'suspended', label: 'Suspended', count: 0 }
])

const toast = useToast()

// Search query
const searchQuery = ref('')

// Table state
const rowsPerPage = ref(10)
const loading = ref(false)

// Table columns for active/inactive/suspended drivers
const tableColumns = ref([
    {
        key: 'driverId',
        title: 'Driver ID',
        field: 'driverId',
        sortable: true,
        visible: true,
    },
    {
        key: 'name',
        title: 'Name',
        field: 'name',
        sortable: true,
        visible: true,
    },
    {
        key: 'status',
        title: 'Status',
        field: 'status',
        sortable: true,
        visible: true,
    },
    {
        key: 'rating',
        title: 'Rating',
        field: 'rating',
        sortable: true,
        visible: true,
    },
    {
        key: 'totalTrips',
        title: 'Total Trips',
        field: 'totalTrips',
        sortable: true,
        visible: true,
    },
    {
        key: 'earnings',
        title: 'Earnings',
        field: 'earnings',
        sortable: true,
        visible: true,
    },
    {
        key: 'actions',
        title: 'Actions',
        field: 'actions',
        sortable: false,
        visible: true,
    },
])

// Review modal state
const showReviewModal = ref(false)
const selectedDriver = ref<any>(null)
const activeReviewTab = ref('profile')

// Profile modal state
const showProfileModal = ref(false)
const selectedProfileDriver = ref<any>(null)
const activeProfileTab = ref('overview')

const profileTabs = ref([
    { name: 'overview', label: 'Overview' },
    { name: 'trips', label: 'Trips' },
    { name: 'earnings', label: 'Earnings' },
    { name: 'documents', label: 'Documents' },
    { name: 'reviews', label: 'Reviews' },
    { name: 'activity', label: 'Activity' }
])

// Chart data
const performanceTrendData = ref({
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
        label: 'Performance',
        data: [85, 78, 82, 88],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
    }]
})

const weeklyTripsData = ref({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
        label: 'Trips',
        data: [45, 52, 48, 61, 55, 67, 58],
        backgroundColor: '#3B82F6'
    }]
})

const monthlyEarningsData = ref({
    labels: ['Month 1', 'Month 2', 'Month 3'],
    datasets: [{
        label: 'Earnings',
        data: [25000, 28000, 32000],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true
    }]
})

const lineChartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
})

const barChartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
})

const areaChartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
})

// Earnings history chart data
const earningsHistoryData = ref({
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [{
        label: 'Earnings',
        data: [5000, 5500, 6000, 5500, 6500, 7500, 7000],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true
    }]
})

const earningsHistoryOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 2500,
                callback: function(value: any) {
                    return value.toLocaleString()
                }
            }
        }
    }
})

// Trips table columns
const tripsTableColumns = ref([
    {
        key: 'tripId',
        title: 'Trip ID',
        field: 'tripId',
        sortable: true,
        visible: true,
    },
    {
        key: 'dateTime',
        title: 'Date & Time',
        field: 'dateTime',
        sortable: true,
        visible: true,
    },
    {
        key: 'route',
        title: 'Route',
        field: 'route',
        sortable: false,
        visible: true,
    },
    {
        key: 'distance',
        title: 'Distance',
        field: 'distance',
        sortable: true,
        visible: true,
    },
    {
        key: 'duration',
        title: 'Duration',
        field: 'duration',
        sortable: true,
        visible: true,
    },
    {
        key: 'fare',
        title: 'Fare',
        field: 'fare',
        sortable: true,
        visible: true,
    },
    {
        key: 'rating',
        title: 'Rating',
        field: 'rating',
        sortable: true,
        visible: true,
    },
    {
        key: 'status',
        title: 'Status',
        field: 'status',
        sortable: true,
        visible: true,
    },
])

// Sample trips data
const tripsData = ref([
    {
        id: 1,
        tripId: 'TRP-2847',
        dateTime: '2025-10-19, 14:32',
        route: {
            pickup: '123 Market St',
            dropoff: '456 Mission St'
        },
        distance: '4.2 mi',
        duration: '15 min',
        fare: '$18.50',
        rating: 5,
        status: 'completed'
    },
    {
        id: 2,
        tripId: 'TRP-2846',
        dateTime: '2025-10-19, 18:15',
        route: {
            pickup: '789 Oak Ave',
            dropoff: '321 Pine St'
        },
        distance: '7.8 mi',
        duration: '22 min',
        fare: '$28.75',
        rating: 5,
        status: 'completed'
    },
    {
        id: 3,
        tripId: 'TRP-2845',
        dateTime: '2025-10-19, 11:45',
        route: {
            pickup: '555 Broadway',
            dropoff: '888 Valencia St'
        },
        distance: '3.5 mi',
        duration: '12 min',
        fare: '$14.25',
        rating: 4,
        status: 'completed'
    },
    {
        id: 4,
        tripId: 'TRP-2844',
        dateTime: '2025-10-19, 10:20',
        route: {
            pickup: '222 Castro St',
            dropoff: '909 Haight St'
        },
        distance: '5.1 mi',
        duration: '18 min',
        fare: '$21.00',
        rating: 5,
        status: 'completed'
    },
    {
        id: 5,
        tripId: 'TRP-2843',
        dateTime: '2025-10-18, 19:05',
        route: {
            pickup: '111 Embarcadero',
            dropoff: '444 Geary St'
        },
        distance: '2.8 mi',
        duration: '14 min',
        fare: '$16.50',
        rating: 4,
        status: 'completed'
    },
    {
        id: 6,
        tripId: 'TRP-2842',
        dateTime: '2025-10-18, 16:30',
        route: {
            pickup: '333 Lombard St',
            dropoff: '777 Union St'
        },
        distance: '6.3 mi',
        duration: '20 min',
        fare: '$24.00',
        rating: 5,
        status: 'completed'
    },
    {
        id: 7,
        tripId: 'TRP-2841',
        dateTime: '2025-10-18, 13:15',
        route: {
            pickup: '999 Fillmore St',
            dropoff: '222 Divisadero St'
        },
        distance: '4.7 mi',
        duration: '16 min',
        fare: '$19.75',
        rating: 5,
        status: 'completed'
    },
    {
        id: 8,
        tripId: 'TRP-2840',
        dateTime: '2025-10-18, 09:45',
        route: {
            pickup: '555 California St',
            dropoff: '888 Sutter St'
        },
        distance: '3.2 mi',
        duration: '13 min',
        fare: '$17.00',
        rating: 4,
        status: 'completed'
    }
])

// Documents table columns
const documentsTableColumns = ref([
    {
        key: 'documentType',
        title: 'Document Type',
        field: 'documentType',
        sortable: true,
        visible: true,
    },
    {
        key: 'status',
        title: 'Status',
        field: 'status',
        sortable: true,
        visible: true,
    },
    {
        key: 'uploadDate',
        title: 'Upload Date',
        field: 'uploadDate',
        sortable: true,
        visible: true,
    },
    {
        key: 'expiryDate',
        title: 'Expiry Date',
        field: 'expiryDate',
        sortable: true,
        visible: true,
    },
    {
        key: 'actions',
        title: 'Actions',
        field: 'actions',
        sortable: false,
        visible: true,
    },
])

// Sample documents data
const documentsData = ref([
    {
        id: 1,
        documentType: 'Driver License',
        status: 'Verified',
        uploadDate: '2023-03-15',
        expiryDate: '2027-08-22'
    },
    {
        id: 2,
        documentType: 'Vehicle Registration',
        status: 'Verified',
        uploadDate: '2023-03-15',
        expiryDate: '2025-11-15'
    },
    {
        id: 3,
        documentType: 'Insurance Certificate',
        status: 'Verified',
        uploadDate: '2024-01-10',
        expiryDate: '2025-12-31'
    },
    {
        id: 4,
        documentType: 'Background Check',
        status: 'Verified',
        uploadDate: '2023-03-15',
        expiryDate: '2025-03-15'
    },
    {
        id: 5,
        documentType: 'Vehicle Inspection',
        status: 'Pending',
        uploadDate: '2024-09-15',
        expiryDate: '2025-10-01'
    }
])

// Sample reviews data
const reviewsData = ref([
    {
        id: 1,
        reviewerName: 'Michael Johnson',
        rating: 5,
        dateTime: '2025-10-19 at 14:50',
        comment: 'Great driver! Very friendly and professional.',
        tripId: 'TRP-2847'
    },
    {
        id: 2,
        reviewerName: 'Emily Davis',
        rating: 5,
        dateTime: '2025-10-19 at 13:40',
        comment: 'Clean car, smooth ride. Highly recommend!',
        tripId: 'TRP-2848'
    },
    {
        id: 3,
        reviewerName: 'Robert Wilson',
        rating: 4,
        dateTime: '2025-10-19 at 12:06',
        comment: 'Good service overall.',
        tripId: 'TRP-2945'
    },
    {
        id: 4,
        reviewerName: 'Lisa Anderson',
        rating: 5,
        dateTime: '2025-10-19 at 10:45',
        comment: 'Excellent driver, knows all the shortcuts!',
        tripId: 'TRP-2844'
    },
    {
        id: 5,
        reviewerName: 'David Martinez',
        rating: 4,
        dateTime: '2025-10-18 at 19:25',
        comment: 'Nice and punctual.',
        tripId: 'TRP-2843'
    }
])

// Sample activity data
const activityData = ref([
    {
        id: 1,
        title: 'Trip Completed',
        description: 'Completed trip TRP-2847 - $18.50 earned',
        timestamp: '2025-10-19 14:50',
        icon: TruckIcon,
        iconBg: 'bg-blue-600'
    },
    {
        id: 2,
        title: 'Trip Completed',
        description: 'Completed trip TRP-2846 - $28.75 earned',
        timestamp: '2025-10-19 13:40',
        icon: TruckIcon,
        iconBg: 'bg-blue-600'
    },
    {
        id: 3,
        title: 'Online',
        description: 'Driver went online in Downtown zone',
        timestamp: '2025-10-19 10:00',
        icon: ArrowUpIcon,
        iconBg: 'bg-gray-600'
    },
    {
        id: 4,
        title: 'Payout Received',
        description: 'Weekly payout of $1,234.50 processed',
        timestamp: '2025-10-18 09:00',
        icon: CurrencyDollarIcon,
        iconBg: 'bg-green-600'
    },
    {
        id: 5,
        title: 'Document Updated',
        description: 'Vehicle inspection report uploaded',
        timestamp: '2025-10-15 18:20',
        icon: DocumentTextIcon,
        iconBg: 'bg-purple-600'
    },
    {
        id: 6,
        title: 'Profile Updated',
        description: 'Phone number updated',
        timestamp: '2025-10-10 11:20',
        icon: UserIcon,
        iconBg: 'bg-orange-600'
    },
    {
        id: 7,
        title: 'Rating Received',
        description: 'Received 5-star rating from passenger',
        timestamp: '2025-10-09 18:46',
        icon: StarIcon,
        iconBg: 'bg-yellow-600'
    },
    {
        id: 8,
        title: 'Offline',
        description: 'Driver went offline',
        timestamp: '2025-10-09 17:30',
        icon: ArrowDownIcon,
        iconBg: 'bg-gray-600'
    }
])

const reviewTabs = ref([
    { name: 'profile', label: 'Profile' },
    { name: 'documents', label: 'Documents' },
    { name: 'vehicle', label: 'Vehicle' },
    { name: 'auto-checklist', label: 'Auto-Checklist' }
])

// Real driver data from API
const drivers = ref<any[]>([])
const currentPage = ref(1)
const totalPages = ref(1)

// Transform API rider data to driver format
const transformRiderToDriver = (rider: any) => {
    // Map status: "online" from API should be treated as "active" for filtering
    let status = (rider.status || 'pending').toLowerCase()
    if (status === 'online') {
        status = 'active' // Map online to active for UI consistency
    }
    
    // Build vehicle make/model string
    const vehicleMakeModel = rider.vehicle_make && rider.vehicle_model 
        ? `${rider.vehicle_make} ${rider.vehicle_model}`
        : rider.vehicle_type || rider.vehicle?.makeModel || 'N/A'
    
    return {
        id: rider._id || rider.id || rider.rider_id || '',
        driverId: rider._id || rider.rider_id || rider.id || 'N/A',
        name: `${rider.first_name || ''} ${rider.last_name || ''}`.trim() || rider.name || 'N/A',
        phone: rider.phone_number || rider.phone || 'N/A',
        email: rider.email || 'N/A',
        dob: rider.date_of_birth || rider.dob || 'N/A',
        appliedDate: rider.created_at ? new Date(rider.created_at).toLocaleDateString() : 'N/A',
        progress: 100, // Could calculate based on documents
        faceMatch: 0,
        docsStatus: 'complete',
        status: status,
        rating: rider.rating || 0,
        totalTrips: rider.total_trips || rider.total_deliveries || 0,
        earnings: rider.total_earnings ? `₦${parseFloat(rider.total_earnings.toString()).toLocaleString()}` : '₦0',
        vehicle: {
            makeModel: vehicleMakeModel,
            licensePlate: rider.vehicle_number || rider.registration_number || rider.vehicle?.licensePlate || 'N/A',
            color: rider.vehicle_color || rider.vehicle?.color || 'N/A',
            seats: rider.vehicle?.seats || 'N/A',
            year: rider.vehicle_year || 'N/A',
            type: rider.vehicle_type || rider.transport_mode || 'N/A'
        },
        original: rider // Keep original data
    }
}

// Fetch drivers/riders from API
const fetchDrivers = async () => {
    loading.value = true
    try {
        const response = await deliveryService.getAllRiders({
            page: currentPage.value,
            limit: 1000
        })
        
        // API response structure: { data: { riders: [...], ... }, message: "...", ok: true }
        // axios wraps it, so response.data is the API response
        const apiResponse = response.data?.data || {}
        
        // Handle different response structures
        let riders: any[] = []
        if (Array.isArray(apiResponse.riders)) {
            // Riders array directly in data.riders
            riders = apiResponse.riders
        } else if (Array.isArray(apiResponse.data)) {
            // Nested data.data array
            riders = apiResponse.data
        } else if (Array.isArray(apiResponse)) {
            // Response is directly an array
            riders = apiResponse
        }
        
        drivers.value = riders.map(transformRiderToDriver)
        
        // Update tab counts
        navigationTabs.value[0].count = drivers.value.filter(d => d.status === 'pending').length
        navigationTabs.value[1].count = drivers.value.filter(d => d.status === 'active' || d.status === 'online').length
        navigationTabs.value[2].count = drivers.value.filter(d => d.status === 'inactive').length
        navigationTabs.value[3].count = drivers.value.filter(d => d.status === 'suspended').length
        
    } catch (error: any) {
        console.error('Error fetching drivers:', error)
        toast.error(error?.response?.data?.message || 'Failed to load drivers')
        drivers.value = []
    } finally {
        loading.value = false
    }
}

// Watch for tab changes and refresh data if needed
watch(activeTab, () => {
    // Could refresh or filter data here if needed
})

// Filtered drivers based on active tab and search
const filteredDrivers = computed(() => {
    let filtered = drivers.value.filter(driver => {
        const status = (driver.status || '').toLowerCase()
        if (activeTab.value === 'pending') return status === 'pending'
        if (activeTab.value === 'active') return status === 'active'
        if (activeTab.value === 'inactive') return status === 'inactive'
        if (activeTab.value === 'suspended') return status === 'suspended'
        return true
    })

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(driver =>
            driver.name.toLowerCase().includes(query) ||
            driver.driverId.toLowerCase().includes(query) ||
            driver.phone.includes(query)
        )
    }

    return filtered
})

// Get search placeholder based on active tab
const getSearchPlaceholder = () => {
    if (activeTab.value === 'pending') return 'Search pending applications...'
    if (activeTab.value === 'active') return 'Search drivers...'
    if (activeTab.value === 'inactive') return 'Search drivers...'
    if (activeTab.value === 'suspended') return 'Search drivers...'
    return 'Search drivers...'
}

// Status badge classes for table
const getStatusBadgeClass = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower === 'active') {
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    } else if (statusLower === 'inactive') {
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    } else if (statusLower === 'suspended') {
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
    }
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
}

// View driver profile
const viewDriverProfile = async (driver: any) => {
    try {
        // Fetch full driver details from API
        const riderId = driver.original?.rider_id || driver.original?.id || driver.driverId
        if (riderId) {
            const response = await deliveryService.getRider({ rider_id: riderId })
            if (response.data?.data) {
                selectedProfileDriver.value = transformRiderToDriver(response.data.data)
            } else {
                selectedProfileDriver.value = driver
            }
        } else {
            selectedProfileDriver.value = driver
        }
        showProfileModal.value = true
        activeProfileTab.value = 'overview'
    } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to load driver details')
        selectedProfileDriver.value = driver
        showProfileModal.value = true
        activeProfileTab.value = 'overview'
    }
}

// Fetch driver details for profile view
const fetchDriverDetails = async (riderId: string) => {
    try {
        const response = await deliveryService.getRider({ rider_id: riderId })
        if (response.data?.data) {
            return transformRiderToDriver(response.data.data)
        }
    } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to load driver details')
    }
    return null
}

onMounted(async () => {
    await fetchDrivers()
})

const closeProfileModal = () => {
    showProfileModal.value = false
    selectedProfileDriver.value = null
}

// Suspend modal state
const showSuspendModal = ref(false)
const suspendReason = ref('')

const openSuspendModal = () => {
    showSuspendModal.value = true
    suspendReason.value = ''
}

const closeSuspendModal = () => {
    showSuspendModal.value = false
    suspendReason.value = ''
}

const confirmSuspend = () => {
    if (!suspendReason.value.trim()) {
        // You could add validation/error message here
        return
    }
    // Handle suspend logic here
    console.log('Suspending driver:', selectedProfileDriver.value?.name, 'Reason:', suspendReason.value)
    // Close modal after suspension
    closeSuspendModal()
    // Optionally close profile modal or refresh data
    // closeProfileModal()
}

// Review application
const reviewApplication = (driver: any) => {
    selectedDriver.value = driver
    showReviewModal.value = true
    activeReviewTab.value = 'profile'
}

const closeReviewModal = () => {
    showReviewModal.value = false
    selectedDriver.value = null
}

const approveApplication = () => {
    if (selectedDriver.value) {
        console.log('Approving application for:', selectedDriver.value.name)
        // Add approval logic here
        // Update driver status to 'active'
        const driverIndex = drivers.value.findIndex(d => d.id === selectedDriver.value.id)
        if (driverIndex !== -1) {
            drivers.value[driverIndex].status = 'active'
        }
        closeReviewModal()
    }
}

const rejectApplication = () => {
    if (selectedDriver.value) {
        console.log('Rejecting application for:', selectedDriver.value.name)
        // Add rejection logic here
        // Update driver status to 'suspended' or remove
        const driverIndex = drivers.value.findIndex(d => d.id === selectedDriver.value.id)
        if (driverIndex !== -1) {
            drivers.value[driverIndex].status = 'suspended'
        }
        closeReviewModal()
    }
}

// Document actions
const viewDocument = (document: any) => {
    console.log('Viewing document:', document.documentType)
    // Add view document logic here
    // Could open a modal or navigate to document viewer
}

const downloadDocument = (document: any) => {
    console.log('Downloading document:', document.documentType)
    // Add download document logic here
    // Could trigger file download
}
</script>

<style scoped>
/* Additional styles if needed */
</style>

