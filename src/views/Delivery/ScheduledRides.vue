<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Scheduled Rides</h1>
                <p class="text-sm text-gray-500 dark:text-gray-400">Manage pre-booked and recurring rides</p>
            </div>
            <button 
                @click="exportRides"
                class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
            >
                <ArrowDownTrayIcon class="h-4 w-4" />
                Export
            </button>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Scheduled</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ loading ? '...' : stats.totalScheduled }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Today</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ loading ? '...' : stats.today }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Pending Assignment</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ loading ? '...' : stats.pendingAssignment }}</p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Recurring</p>
                <p class="text-2xl font-semibold text-gray-900 dark:text-white">{{ loading ? '...' : stats.recurring }}</p>
            </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
            <div class="flex flex-col md:flex-row gap-4">
                <!-- Search Bar -->
                <div class="flex-1">
                    <div class="relative">
                        <input
                            v-model="searchQuery"
                            type="text"
                            placeholder="Search by passenger, booking ref, or location..."
                            class="w-full px-4 py-2 pl-10 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg class="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <!-- Filter Dropdowns -->
                <div class="flex gap-3">
                    <!-- Status Filter -->
                    <div class="relative" ref="statusDropdownRef">
                        <button
                            @click.stop="toggleStatusDropdown"
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 min-w-[120px]"
                        >
                            {{ selectedStatus }}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            v-if="showStatusDropdown"
                            @click.stop
                            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div class="py-1">
                                <button
                                    v-for="status in statusOptions"
                                    :key="status"
                                    @click="selectStatus(status)"
                                    :class="[
                                        'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                        selectedStatus === status ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ status }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Vehicle Filter -->
                    <div class="relative" ref="vehicleDropdownRef">
                        <button
                            @click.stop="toggleVehicleDropdown"
                            class="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 min-w-[140px]"
                        >
                            {{ selectedVehicle }}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div
                            v-if="showVehicleDropdown"
                            @click.stop
                            class="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div class="py-1">
                                <button
                                    v-for="vehicle in vehicleOptions"
                                    :key="vehicle"
                                    @click="selectVehicle(vehicle)"
                                    :class="[
                                        'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                        selectedVehicle === vehicle ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ vehicle }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tabs -->
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
                    {{ tab.label }} ({{ loading ? '...' : tab.count }})
                </button>
            </div>
        </div>

        <!-- Ride List -->
        <div class="space-y-4">
            <div 
                v-for="ride in filteredRides" 
                :key="ride.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
                <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <CalendarDaysIcon class="h-5 w-5 text-gray-400" />
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ ride.bookingId }}</span>
                        <span :class="getStatusBadgeClass(ride.status)" class="px-2.5 py-0.5 rounded-full text-xs font-medium">
                            {{ ride.status }}
                        </span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button
                            @click="viewRide(ride)"
                            class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            title="View Details"
                        >
                            <EyeIcon class="h-5 w-5" />
                        </button>
                        <button
                            v-if="ride.status !== 'Cancelled' && ride.status !== 'Completed'"
                            @click="editRide(ride)"
                            class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Edit"
                        >
                            <PencilIcon class="h-5 w-5" />
                        </button>
                        <button
                            v-if="ride.status !== 'Cancelled' && ride.status !== 'Completed'"
                            @click="deleteRide(ride)"
                            class="p-2 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded transition-colors"
                            title="Delete"
                        >
                            <TrashIcon class="h-5 w-5" />
                        </button>
                        <button
                            v-if="ride.status === 'Confirmed'"
                            @click="assignDriver(ride)"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"
                        >
                            <TruckIcon class="h-4 w-4" />
                            Assign Driver
                        </button>
                        <div v-if="(ride.status === 'Assigned' || ride.status === 'Completed') && ride.rating" class="flex items-center gap-1 px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                            <StarIcon class="h-4 w-4 text-yellow-500" />
                            <span class="text-sm font-medium text-yellow-700 dark:text-yellow-400">{{ ride.rating }}</span>
                        </div>
                        <button
                            v-if="ride.status === 'Assigned' || ride.status === 'Completed'"
                            class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                            title="Receipt"
                        >
                            <DocumentIcon class="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <!-- Ride Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                    <!-- Date/Time, Service Type, Passengers -->
                    <div class="space-y-3">
                        <div class="flex items-center gap-2">
                            <ClockIcon class="h-5 w-5 text-gray-400" />
                            <span class="text-sm text-gray-900 dark:text-white">{{ ride.dateTime }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <TruckIcon class="h-5 w-5 text-gray-400" />
                            <span class="text-sm text-gray-900 dark:text-white">{{ ride.serviceType }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <UserIcon class="h-5 w-5 text-gray-400" />
                            <span class="text-sm text-gray-900 dark:text-white">{{ ride.passengers }}</span>
                        </div>
                    </div>

                    <!-- Passenger Information -->
                    <div class="space-y-3">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Passenger</p>
                        <div class="flex items-center gap-2">
                            <UserIcon class="h-5 w-5 text-gray-400" />
                            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ ride.passengerName }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <PhoneIcon class="h-5 w-5 text-gray-400" />
                            <span class="text-sm text-gray-600 dark:text-gray-400">{{ ride.passengerPhone }}</span>
                        </div>
                        <!-- Driver Information (if assigned) -->
                        <div v-if="ride.driver" class="space-y-2 mt-2">
                            <div class="flex items-center gap-2">
                                <UserIcon class="h-5 w-5 text-gray-400" />
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ ride.driver }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <TruckIcon class="h-5 w-5 text-gray-400" />
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ ride.vehicle }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Route Information -->
                    <div class="space-y-3">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Route</p>
                        <div class="flex items-start gap-2">
                            <MapPinIcon class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span class="text-sm text-gray-900 dark:text-white">{{ ride.pickup }}</span>
                        </div>
                        <div class="flex items-start gap-2">
                            <MapPinIcon class="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span class="text-sm text-gray-600 dark:text-gray-400">{{ ride.dropoff }}</span>
                        </div>
                    </div>
                </div>

                <!-- Summary Metrics -->
                <div class="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-2">
                        <MapPinIcon class="h-5 w-5 text-gray-400" />
                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ ride.distance }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <ClockIcon class="h-5 w-5 text-gray-400" />
                        <span class="text-sm text-gray-600 dark:text-gray-400">{{ ride.duration }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <CurrencyDollarIcon class="h-5 w-5 text-gray-400" />
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ ride.price }}</span>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredRides.length === 0" class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <p class="text-gray-500 dark:text-gray-400">No scheduled rides found</p>
            </div>
        </div>

        <!-- Edit Scheduled Ride Modal -->
        <div
            v-if="showEditModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="closeEditModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Edit Scheduled Ride</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Modify ride booking details.</p>
                    </div>
                    <button
                        @click="closeEditModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Passenger Information Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Passenger Information</h3>
                        <div class="space-y-4">
                            <div>
                                <label for="fullName" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Full Name <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="fullName"
                                    type="text"
                                    v-model="editForm.fullName"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label for="phoneNumber" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Phone Number <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="phoneNumber"
                                    type="tel"
                                    v-model="editForm.phoneNumber"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label for="emailAddress" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="emailAddress"
                                    type="email"
                                    v-model="editForm.emailAddress"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Trip Details Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Trip Details</h3>
                        <div class="space-y-4">
                            <div>
                                <label for="pickupLocation" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Pickup Location <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="pickupLocation"
                                    type="text"
                                    v-model="editForm.pickupLocation"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label for="dropoffLocation" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Dropoff Location <span class="text-red-500">*</span>
                                </label>
                                <input
                                    id="dropoffLocation"
                                    type="text"
                                    v-model="editForm.dropoffLocation"
                                    class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="date" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Date <span class="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="date"
                                        type="date"
                                        v-model="editForm.date"
                                        class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label for="time" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Time <span class="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="time"
                                        type="time"
                                        v-model="editForm.time"
                                        class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label for="vehicleType" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Vehicle Type <span class="text-red-500">*</span>
                                    </label>
                                    <div class="relative">
                                        <select
                                            id="vehicleType"
                                            v-model="editForm.vehicleType"
                                            class="w-full px-4 py-2 pl-3 pr-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                            required
                                        >
                                            <option value="Standard">Standard</option>
                                            <option value="Premium">Premium</option>
                                            <option value="XL">XL</option>
                                        </select>
                                        <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <label for="passengers" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Passengers <span class="text-red-500">*</span>
                                    </label>
                                    <div class="relative">
                                        <input
                                            id="passengers"
                                            type="number"
                                            v-model.number="editForm.passengers"
                                            min="1"
                                            max="8"
                                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Special Requests Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Special Requests</h3>
                        <div>
                            <label for="specialRequests" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Special Requests
                            </label>
                            <textarea
                                id="specialRequests"
                                v-model="editForm.specialRequests"
                                rows="3"
                                placeholder="Enter any special requests or notes..."
                                class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeEditModal"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="updateRide"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <CalendarDaysIcon class="h-4 w-4" />
                        Update Ride
                    </button>
                </div>
            </div>
        </div>

        <!-- Ride Details Modal -->
        <div
            v-if="showRideDetailsModal && selectedRide"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="closeRideDetailsModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Ride Details</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Complete booking information</p>
                    </div>
                    <button
                        @click="closeRideDetailsModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Booking Information -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Booking Information</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Standard</p>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ getPassengerCount(selectedRide.passengers) }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance</p>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRide.distance }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Duration</p>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRide.duration }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Estimated Fare</p>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRide.price }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Assigned Driver Section -->
                    <div v-if="selectedRide.driver">
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Assigned Driver</h3>
                        <div class="space-y-3">
                            <div class="flex items-center gap-2">
                                <UserIcon class="h-5 w-5 text-gray-400" />
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRide.driver }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <StarIcon class="h-5 w-5 text-yellow-500" />
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ selectedRide.rating }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <TruckIcon class="h-5 w-5 text-gray-400" />
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ getVehicleModel(selectedRide.vehicle) }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <TruckIcon class="h-5 w-5 text-gray-400" />
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ getLicensePlate(selectedRide.vehicle) }}</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <PhoneIcon class="h-5 w-5 text-gray-400" />
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ selectedRide.driverPhone || '+1 (555) 876-5432' }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Status/Timeline Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Status</h3>
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Booked At</span>
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ selectedRide.bookedAt || '2025-10-17 16:20' }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Passenger Notified</span>
                                <div class="flex items-center gap-2">
                                    <CheckIcon class="h-5 w-5 text-green-500" />
                                </div>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-600 dark:text-gray-400">Driver Notified</span>
                                <div class="flex items-center gap-2">
                                    <CheckIcon class="h-5 w-5 text-green-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeRideDetailsModal"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useToast } from 'vue-toastification'
import {
    ArrowDownTrayIcon,
    MapPinIcon,
    UserIcon,
    CalendarDaysIcon,
    TruckIcon,
    PhoneIcon,
    ClockIcon,
    CurrencyDollarIcon,
    EyeIcon,
    PencilIcon,
    TrashIcon,
    StarIcon,
    DocumentIcon,
    XMarkIcon,
    CheckIcon
} from '@heroicons/vue/24/outline'
import deliveryService from '@/services/deliveryService'

const toast = useToast()
const loading = ref(false)

// Stats
const stats = ref({
    totalScheduled: 0,
    today: 0,
    pendingAssignment: 0,
    recurring: 0
})

// Tabs - counts will be computed from data
const tabs = computed(() => [
    { id: 'upcoming', label: 'Upcoming', count: scheduledRides.value.filter(r => r.status === 'Confirmed' || r.status === 'Assigned').length },
    { id: 'completed', label: 'Completed', count: scheduledRides.value.filter(r => r.status === 'Completed').length },
    { id: 'cancelled', label: 'Cancelled', count: scheduledRides.value.filter(r => r.status === 'Cancelled').length },
    { id: 'all', label: 'All', count: scheduledRides.value.length }
])
const activeTab = ref('upcoming')

// Search and Filters
const searchQuery = ref('')
const selectedStatus = ref('All Status')
const selectedVehicle = ref('All Vehicles')
const showStatusDropdown = ref(false)
const showVehicleDropdown = ref(false)
const statusDropdownRef = ref<HTMLElement | null>(null)
const vehicleDropdownRef = ref<HTMLElement | null>(null)

const statusOptions = ['All Status', 'Confirmed', 'Assigned', 'Pending', 'Cancelled']
const vehicleOptions = ['All Vehicles', 'Standard', 'Premium', 'XL']

const toggleStatusDropdown = () => {
    showStatusDropdown.value = !showStatusDropdown.value
    if (showStatusDropdown.value) {
        showVehicleDropdown.value = false
    }
}

const toggleVehicleDropdown = () => {
    showVehicleDropdown.value = !showVehicleDropdown.value
    if (showVehicleDropdown.value) {
        showStatusDropdown.value = false
    }
}

const selectStatus = (status: string) => {
    selectedStatus.value = status
    showStatusDropdown.value = false
}

const selectVehicle = (vehicle: string) => {
    selectedVehicle.value = vehicle
    showVehicleDropdown.value = false
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
    if (statusDropdownRef.value && !statusDropdownRef.value.contains(event.target as Node)) {
        showStatusDropdown.value = false
    }
    if (vehicleDropdownRef.value && !vehicleDropdownRef.value.contains(event.target as Node)) {
        showVehicleDropdown.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

// Scheduled Rides - populated from API
const scheduledRides = ref<any[]>([])

// Transform order to scheduled ride format
const transformOrderToScheduledRide = (order: any, rider?: any) => {
    const pickupDate = order.pick_up_date ? new Date(order.pick_up_date) : null
    const now = new Date()
    const isFuture = pickupDate && pickupDate > now
    
    // Determine status based on order status and pickup date
    let status = 'Confirmed'
    if (order.status) {
        const orderStatus = (order.status || '').toLowerCase()
        if (orderStatus === 'completed') status = 'Completed'
        else if (orderStatus === 'cancelled') status = 'Cancelled'
        else if (order.rider_id && order.rider_id !== '000000000000000000000000') status = 'Assigned'
        else if (isFuture) status = 'Confirmed'
        else status = 'Pending'
    }
    
    // Format date and time
    let dateTime = 'N/A'
    if (pickupDate) {
        const dateStr = pickupDate.toISOString().split('T')[0]
        const timeStr = pickupDate.toTimeString().split(' ')[0].slice(0, 5)
        dateTime = `${dateStr} at ${timeStr}`
    }
    
    // Get driver info if assigned
    let driver = null
    let vehicle = null
    let driverPhone = null
    if (rider && order.rider_id && order.rider_id !== '000000000000000000000000') {
        driver = `${rider.first_name || ''} ${rider.last_name || ''}`.trim() || rider.name || 'N/A'
        driverPhone = rider.phone_number || rider.phone || null
        const vehicleMake = rider.vehicle_make || ''
        const vehicleModel = rider.vehicle_model || ''
        const vehicleNumber = rider.vehicle_number || rider.registration_number || ''
        if (vehicleMake || vehicleModel || vehicleNumber) {
            vehicle = `${vehicleMake} ${vehicleModel}`.trim() || 'Vehicle'
            if (vehicleNumber) vehicle += ` • ${vehicleNumber}`
        }
    }
    
    return {
        id: order._id || order.order_id || order.id || '',
        bookingId: order.delivery_code || order._id || order.order_id || order.id || 'N/A',
        status: status,
        dateTime: dateTime,
        serviceType: order.vehicle_type || 'Standard',
        passengers: '1 passenger', // Default, could be calculated if passenger count is available
        passengerName: order.receiver_full_name || order.customer_name || order.customer?.name || 'N/A',
        passengerPhone: order.receiver_mobile || order.customer?.phone || order.phone || 'N/A',
        emailAddress: order.customer?.email || order.email || '',
        driver: driver,
        driverPhone: driverPhone,
        vehicle: vehicle,
        pickup: order.pick_up_address || order.pickup_address || order.pickup?.address || 'N/A',
        dropoff: order.drop_off_address || order.delivery_address || order.delivery?.address || 'N/A',
        distance: order.distance ? `${order.distance} km` : 'N/A',
        duration: order.delivery_metrics?.duration ? `${Math.round(order.delivery_metrics.duration)} min` : 'N/A',
        price: order.suggested_price ? `₦${parseFloat(order.suggested_price.toString()).toLocaleString()}` : (order.total_amount ? `₦${parseFloat(order.total_amount.toString()).toLocaleString()}` : '₦0'),
        rating: order.rating || null,
        bookedAt: order.created_at ? new Date(order.created_at).toLocaleString() : null,
        specialRequests: order.special_caution || order.special_instructions || '',
        original: order
    }
}

// Fetch scheduled rides from API
const fetchScheduledRides = async () => {
    loading.value = true
    try {
        // Fetch all orders
        const ordersRes = await deliveryService.getAllOrders({
            page: 1,
            limit: 1000
        })
        
        // Parse orders response
        const ordersApiResponse = ordersRes?.data || {}
        let orders: any[] = []
        if (Array.isArray(ordersApiResponse.data)) {
            orders = ordersApiResponse.data
        } else if (ordersApiResponse.data?.data && Array.isArray(ordersApiResponse.data.data)) {
            orders = ordersApiResponse.data.data
        } else if (Array.isArray(ordersApiResponse)) {
            orders = ordersApiResponse
        }
        
        // Fetch riders to get driver info
        const ridersRes = await deliveryService.getAllRiders({
            page: 1,
            limit: 1000
        }).catch(() => null)
        
        const ridersApiResponse = ridersRes?.data || {}
        let allRiders: any[] = []
        if (ridersApiResponse.data?.data?.riders && Array.isArray(ridersApiResponse.data.data.riders)) {
            allRiders = ridersApiResponse.data.data.riders
        } else if (ridersApiResponse.data?.riders && Array.isArray(ridersApiResponse.data.riders)) {
            allRiders = ridersApiResponse.data.riders
        } else if (ridersApiResponse.data?.data && Array.isArray(ridersApiResponse.data.data)) {
            allRiders = ridersApiResponse.data.data
        } else if (Array.isArray(ridersApiResponse.data)) {
            allRiders = ridersApiResponse.data
        } else if (Array.isArray(ridersApiResponse)) {
            allRiders = ridersApiResponse
        }
        
        // Filter orders that have a pick_up_date (scheduled orders)
        // Include both future scheduled orders and past scheduled orders (completed/cancelled)
        const scheduled = orders.filter((o: any) => {
            return o.pick_up_date && o.pick_up_date !== '0001-01-01T00:00:00Z'
        })
        
        // Transform orders to scheduled rides format
        scheduledRides.value = scheduled.map((order: any) => {
            const rider = order.rider_id && order.rider_id !== '000000000000000000000000'
                ? allRiders.find((r: any) => (r._id || r.id || r.rider_id) === order.rider_id)
                : null
            return transformOrderToScheduledRide(order, rider)
        })
        
        // Calculate stats
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        
        stats.value.totalScheduled = scheduledRides.value.length
        stats.value.today = scheduledRides.value.filter(ride => {
            if (!ride.original?.pick_up_date) return false
            const pickupDate = new Date(ride.original.pick_up_date)
            return pickupDate >= today && pickupDate < tomorrow
        }).length
        stats.value.pendingAssignment = scheduledRides.value.filter(ride => {
            return (ride.status === 'Confirmed' || ride.status === 'Pending') && !ride.driver
        }).length
        stats.value.recurring = 0 // Recurring rides would need a separate field in the order
        
    } catch (error: any) {
        console.error('Error fetching scheduled rides:', error)
        toast.error(error?.response?.data?.message || 'Failed to load scheduled rides')
        scheduledRides.value = []
    } finally {
        loading.value = false
    }
}

// Filtered Data
const filteredRides = computed(() => {
    let filtered = scheduledRides.value

    // Tab filter
    if (activeTab.value === 'upcoming') {
        filtered = filtered.filter(ride => ride.status === 'Confirmed' || ride.status === 'Assigned')
    } else if (activeTab.value === 'completed') {
        filtered = filtered.filter(ride => ride.status === 'Completed')
    } else if (activeTab.value === 'cancelled') {
        filtered = filtered.filter(ride => ride.status === 'Cancelled')
    }

    // Search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(ride =>
            ride.bookingId.toLowerCase().includes(query) ||
            ride.passengerName.toLowerCase().includes(query) ||
            ride.pickup.toLowerCase().includes(query) ||
            ride.dropoff.toLowerCase().includes(query)
        )
    }

    // Status filter
    if (selectedStatus.value !== 'All Status') {
        filtered = filtered.filter(ride => ride.status === selectedStatus.value)
    }

    // Vehicle filter
    if (selectedVehicle.value !== 'All Vehicles') {
        filtered = filtered.filter(ride => ride.serviceType === selectedVehicle.value)
    }

    return filtered
})

// Status Badge Class Helper
const getStatusBadgeClass = (status: string) => {
    const statusClasses: Record<string, string> = {
        'Confirmed': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
        'Assigned': 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
        'Pending': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
        'Cancelled': 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
        'Completed': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    }
    return statusClasses[status] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
}

// Actions
const exportRides = () => {
    console.log('Exporting rides')
    // Handle export logic
}

// Ride Details Modal
const showRideDetailsModal = ref(false)
const selectedRide = ref<any>(null)

const viewRide = (ride: any) => {
    selectedRide.value = ride
    showRideDetailsModal.value = true
}

const closeRideDetailsModal = () => {
    showRideDetailsModal.value = false
    selectedRide.value = null
}

// Helper functions
const getPassengerCount = (passengers: string) => {
    const match = passengers.match(/(\d+)/)
    return match ? match[1] : '1'
}

const getVehicleModel = (vehicle: string | null) => {
    if (!vehicle) return ''
    const parts = vehicle.split(' • ')
    return parts[0] || vehicle
}

const getLicensePlate = (vehicle: string | null) => {
    if (!vehicle) return ''
    const parts = vehicle.split(' • ')
    return parts[1] || ''
}

// Edit Modal
const showEditModal = ref(false)
const editForm = ref({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    vehicleType: 'Standard',
    passengers: 1,
    specialRequests: ''
})
const editingRideId = ref<string | null>(null)

const editRide = (ride: any) => {
    editingRideId.value = ride.id
    // Parse date and time from the dateTime string (format: "2025-10-20 at 06:00")
    const dateTimeMatch = ride.dateTime.match(/(\d{4}-\d{2}-\d{2}) at (\d{2}:\d{2})/)
    const date = dateTimeMatch ? dateTimeMatch[1] : ''
    const time = dateTimeMatch ? dateTimeMatch[2] : ''
    
    // Parse passengers number from string (format: "1 passenger" or "2 passengers")
    const passengersMatch = ride.passengers.match(/(\d+)/)
    const passengers = passengersMatch ? parseInt(passengersMatch[1]) : 1
    
    editForm.value = {
        fullName: ride.passengerName,
        phoneNumber: ride.passengerPhone,
        emailAddress: ride.emailAddress || '',
        pickupLocation: ride.pickup,
        dropoffLocation: ride.dropoff,
        date: date,
        time: time,
        vehicleType: ride.serviceType,
        passengers: passengers,
        specialRequests: ride.specialRequests || ''
    }
    showEditModal.value = true
}

const closeEditModal = () => {
    showEditModal.value = false
    editingRideId.value = null
    editForm.value = {
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        pickupLocation: '',
        dropoffLocation: '',
        date: '',
        time: '',
        vehicleType: 'Standard',
        passengers: 1,
        specialRequests: ''
    }
}

const updateRide = async () => {
    // Validate required fields
    if (!editForm.value.fullName || !editForm.value.phoneNumber || 
        !editForm.value.pickupLocation || !editForm.value.dropoffLocation ||
        !editForm.value.date || !editForm.value.time) {
        toast.error('Please fill in all required fields.')
        return
    }
    
    try {
        const ride = scheduledRides.value.find(r => r.id === editingRideId.value)
        if (!ride || !ride.original) {
            toast.error('Ride not found')
            return
        }
        
        // Combine date and time for pick_up_date
        const dateTimeStr = `${editForm.value.date}T${editForm.value.time}:00Z`
        const pickUpDate = new Date(dateTimeStr).toISOString()
        
        // Update order via API
        await deliveryService.updateOrder(ride.id, {
            receiver_full_name: editForm.value.fullName,
            receiver_mobile: editForm.value.phoneNumber,
            pick_up_address: editForm.value.pickupLocation,
            drop_off_address: editForm.value.dropoffLocation,
            pick_up_date: pickUpDate,
            vehicle_type: editForm.value.vehicleType,
            special_caution: editForm.value.specialRequests || '',
            special_instructions: editForm.value.specialRequests || ''
        })
        
        toast.success('Ride updated successfully')
        closeEditModal()
        await fetchScheduledRides()
    } catch (error: any) {
        console.error('Error updating ride:', error)
        toast.error(error?.response?.data?.message || 'Failed to update ride')
    }
}

const deleteRide = (ride: any) => {
    if (confirm(`Are you sure you want to delete booking ${ride.bookingId}?`)) {
        console.log('Deleting ride:', ride.bookingId)
        const index = scheduledRides.value.findIndex(r => r.id === ride.id)
        if (index !== -1) {
            scheduledRides.value.splice(index, 1)
        }
    }
}

const assignDriver = async (ride: any) => {
    // This would open a driver selection modal
    // For now, we'll just show a message
    toast.info('Driver assignment feature - to be implemented')
    // TODO: Implement driver assignment modal similar to Dispatch.vue
}
</script>
