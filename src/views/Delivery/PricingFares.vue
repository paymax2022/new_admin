<template>
    <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">Pricing & Fare Rules</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">Manage pricing for different vehicle types and zones</p>
            </div>
            <div class="flex items-center gap-3">
                <!-- Fare Simulator Button -->
                <button 
                    @click="showFareSimulatorModal = true"
                    class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                    <DocumentTextIcon class="h-4 w-4" />
                    Fare Simulator
                </button>
                
                <!-- Configure Surge Button -->
                <button 
                    @click="showSurgePricingModal = true"
                    class="px-4 py-2 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-700 rounded-lg text-sm font-medium text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                    <div class="w-4 h-4 rounded-full border-2 border-red-600 dark:border-red-400 flex items-center justify-center">
                        <span class="text-xs font-bold text-red-600 dark:text-red-400">-</span>
                    </div>
                    Configure Surge
                </button>
                
                <!-- Add Vehicle Type Button -->
                <button 
                    @click="showAddVehicleModal = true"
                    class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                >
                    <PlusIcon class="h-4 w-4" />
                    Add Vehicle Type
                </button>
            </div>
        </div>

        <!-- Pricing Parameters Cards -->
        <div v-if="loading" class="space-y-4">
            <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
                <div class="flex items-center justify-center py-8">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                </div>
            </div>
        </div>
        <div v-else-if="pricingParams.length === 0" class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-12 text-center">
            <p class="text-gray-500 dark:text-gray-400">No pricing parameters found</p>
        </div>
        <div v-else class="space-y-4">
            <template v-for="(param, index) in filteredPricingParams" :key="index">
            <div 
                class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6"
            >
                <!-- Card Header -->
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-3">
                        <TruckIcon class="h-6 w-6 text-gray-400 dark:text-gray-500" />
                        <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ param.method || `Method ${index + 1}` }}</h2>
                        <span class="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">active</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <button 
                            @click="openDetailsModal(param)"
                            class="px-3 py-1.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2"
                        >
                            <InformationCircleIcon class="h-4 w-4" />
                            Details
                        </button>
                        <button 
                            @click="openEditModal(param)"
                            class="px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                        >
                            <PencilIcon class="h-4 w-4" />
                            Edit
                        </button>
                    </div>
                </div>

                <!-- Pricing Details -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div v-if="param.base_fee !== undefined">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Base Fee</p>
                        <p class="text-base font-bold text-gray-900 dark:text-white">₦{{ param.base_fee.toLocaleString() }}</p>
                    </div>
                    <div v-if="param.distance_rate !== undefined">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance Rate</p>
                        <p class="text-base font-bold text-gray-900 dark:text-white">₦{{ param.distance_rate.toLocaleString() }}</p>
                    </div>
                    <div v-if="param.weight_rate !== undefined">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Weight Rate</p>
                        <p class="text-base font-bold text-gray-900 dark:text-white">₦{{ param.weight_rate.toLocaleString() }}</p>
                    </div>
                    <div v-if="param.fragile_fee !== undefined">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Fragile Fee</p>
                        <p class="text-base font-bold text-gray-900 dark:text-white">₦{{ param.fragile_fee.toLocaleString() }}</p>
                    </div>
                    <div v-if="param.volatile_fee !== undefined">
                        <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Volatile Fee</p>
                        <p class="text-base font-bold text-gray-900 dark:text-white">₦{{ param.volatile_fee.toLocaleString() }}</p>
                    </div>
                </div>
            </div>
            </template>
        </div>

        <!-- Fare Simulator Modal -->
        <div
            v-if="showFareSimulatorModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            @click.self="showFareSimulatorModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Fare Simulator</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Calculate estimated fare based on distance, time, and vehicle type</p>
                    </div>
                    <button
                        @click="showFareSimulatorModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="p-6 space-y-4">
                    <!-- Distance Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Distance (km)
                        </label>
                        <input
                            type="number"
                            v-model.number="fareSimulator.distance"
                            step="0.1"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Time Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Time (minutes)
                        </label>
                        <input
                            type="number"
                            v-model.number="fareSimulator.time"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Vehicle Type Select -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Vehicle Type
                        </label>
                        <select
                            v-model="fareSimulator.vehicleType"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Select vehicle type</option>
                            <option value="standard">Standard</option>
                            <option value="premium">Premium</option>
                            <option value="xl">XL</option>
                        </select>
                    </div>

                    <!-- Surge Multiplier Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Surge Multiplier
                        </label>
                        <input
                            type="number"
                            v-model.number="fareSimulator.surgeMultiplier"
                            step="0.1"
                            min="1"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        @click="showFareSimulatorModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="saveFareSimulator"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>

        <!-- Surge Pricing Setup Modal -->
        <div
            v-if="showSurgePricingModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showSurgePricingModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Surge Pricing Setup</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Configure surge pricing zone, multiplier, and schedule</p>
                    </div>
                    <button
                        @click="showSurgePricingModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-4 overflow-y-auto flex-1">
                    <!-- Zone Name Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Zone Name
                        </label>
                        <input
                            type="text"
                            v-model="surgePricing.zoneName"
                            placeholder="Downtown Area"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Surge Multiplier Input -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Surge Multiplier
                        </label>
                        <input
                            type="number"
                            v-model.number="surgePricing.surgeMultiplier"
                            step="0.1"
                            min="1"
                            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Start Time and End Time -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Start Time
                            </label>
                            <input
                                type="time"
                                v-model="surgePricing.startTime"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                End Time
                            </label>
                            <input
                                type="time"
                                v-model="surgePricing.endTime"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <!-- Zone Area Section -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Zone Area
                        </label>
                        <div 
                            class="w-full h-64 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            @click="drawZone"
                        >
                            <MapPinIcon class="h-12 w-12 text-gray-400 dark:text-gray-500 mb-2" />
                            <p class="text-sm text-gray-500 dark:text-gray-400">Click to draw zone polygon on map</p>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showSurgePricingModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="saveSurgePricing"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Save Surge Zone
                    </button>
                </div>
            </div>
        </div>

        <!-- Add New Vehicle Type Modal -->
        <div
            v-if="showAddVehicleModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showAddVehicleModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <TruckIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Add New Pricing Parameter</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Create a new pricing parameter with custom rates and fees.</p>
                        </div>
                    </div>
                    <button
                        @click="showAddVehicleModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Information Box -->
                    <div class="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <div class="flex-shrink-0">
                            <div class="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <div class="w-2 h-2 rounded-full bg-gray-600 dark:bg-gray-400"></div>
                            </div>
                        </div>
                        <p class="text-sm text-gray-700 dark:text-gray-300">
                            Define the vehicle type details and initial pricing structure. You can refine pricing later.
                        </p>
                    </div>

                    <!-- Vehicle Information Section -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Vehicle Information</h3>
                        
                        <!-- Vehicle Type Name -->
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Vehicle Type Name <span class="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                v-model="newVehicleType.name"
                                placeholder="e.g., Economy, Luxury, SUV"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                    </div>

                    <!-- Initial Pricing Structure Section -->
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Pricing Structure</h3>
                        
                        <div class="grid grid-cols-2 gap-4">
                            <!-- Base Fee -->
                            <div>
                                <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Base Fee (₦)
                                </label>
                                <input
                                    type="number"
                                    v-model.number="newVehicleType.baseFare"
                                    step="0.01"
                                    min="0"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <!-- Distance Rate -->
                            <div>
                                <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Distance Rate (₦)
                                </label>
                                <input
                                    type="number"
                                    v-model.number="newVehicleType.ratePerKm"
                                    step="0.01"
                                    min="0"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <!-- Weight Rate -->
                            <div>
                                <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Weight Rate (₦)
                                </label>
                                <input
                                    type="number"
                                    v-model.number="newVehicleType.weightRate"
                                    step="0.01"
                                    min="0"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <!-- Fragile Fee -->
                            <div>
                                <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Fragile Fee (₦)
                                </label>
                                <input
                                    type="number"
                                    v-model.number="newVehicleType.fragileFee"
                                    step="0.01"
                                    min="0"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <!-- Volatile Fee -->
                            <div>
                                <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                    Volatile Fee (₦)
                                </label>
                                <input
                                    type="number"
                                    v-model.number="newVehicleType.volatileFee"
                                    step="0.01"
                                    min="0"
                                    class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Set as Active Section -->
                    <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <div class="flex-1">
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                Set as Active
                            </label>
                            <p class="text-xs text-gray-600 dark:text-gray-400">Make this vehicle type available for bookings immediately</p>
                        </div>
                        <button
                            @click="newVehicleType.isActive = !newVehicleType.isActive"
                            :class="[
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                newVehicleType.isActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                            ]"
                        >
                            <span
                                :class="[
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                    newVehicleType.isActive ? 'translate-x-5' : 'translate-x-0'
                                ]"
                            ></span>
                        </button>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showAddVehicleModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="addVehicleType"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Add Pricing Parameter
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Pricing Modal -->
        <div
            v-if="showEditPricingModal && selectedPricingParam"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showEditPricingModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <CurrencyDollarIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Edit Pricing - {{ selectedPricingParam?.method || 'Dynamic' }}</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Configure all pricing parameters for this method. Changes will be saved to the system.</p>
                        </div>
                    </div>
                    <button
                        @click="showEditPricingModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Navigation Tabs -->
                <div class="border-b border-gray-200 dark:border-gray-700 px-6 flex gap-6 flex-shrink-0">
                    <button
                        @click="activeEditTab = 'base'"
                        :class="[
                            'px-1 py-4 text-sm font-medium border-b-2 transition-colors',
                            activeEditTab === 'base'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        ]"
                    >
                        Base Pricing
                    </button>
                    <button
                        @click="activeEditTab = 'time'"
                        :class="[
                            'px-1 py-4 text-sm font-medium border-b-2 transition-colors',
                            activeEditTab === 'time'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        ]"
                    >
                        Time-based
                    </button>
                    <button
                        @click="activeEditTab = 'fees'"
                        :class="[
                            'px-1 py-4 text-sm font-medium border-b-2 transition-colors',
                            activeEditTab === 'fees'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        ]"
                    >
                        Fees & Charges
                    </button>
                    <button
                        @click="activeEditTab = 'preview'"
                        :class="[
                            'px-1 py-4 text-sm font-medium border-b-2 transition-colors',
                            activeEditTab === 'preview'
                                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                        ]"
                    >
                        Preview
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Base Pricing Tab -->
                    <div v-if="activeEditTab === 'base'" class="space-y-6">
                        <div class="flex items-start gap-3">
                            <input
                                type="radio"
                                checked
                                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <p class="text-sm text-gray-700 dark:text-gray-300">Configure pricing parameters for this method.</p>
                        </div>

                        <div class="grid grid-cols-2 gap-6">
                            <!-- Left Column -->
                            <div class="space-y-4">
                                <!-- Base Fee -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Base Fee (₦)
                                    </label>
                                    <input
                                        type="number"
                                        v-model.number="editPricing.baseFare"
                                        step="0.01"
                                        min="0"
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Base fee for the delivery</p>
                                </div>

                                <!-- Distance Rate -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Distance Rate (₦)
                                    </label>
                                    <input
                                        type="number"
                                        v-model.number="editPricing.ratePerKm"
                                        step="0.01"
                                        min="0"
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Rate per unit distance</p>
                                </div>

                                <!-- Weight Rate -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Weight Rate (₦)
                                    </label>
                                    <input
                                        type="number"
                                        v-model.number="editPricing.weightRate"
                                        step="0.01"
                                        min="0"
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Rate based on weight</p>
                                </div>
                            </div>

                            <!-- Right Column -->
                            <div class="space-y-4">
                                <!-- Fragile Fee -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Fragile Fee (₦)
                                    </label>
                                    <input
                                        type="number"
                                        v-model.number="editPricing.fragileFee"
                                        step="0.01"
                                        min="0"
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Additional fee for fragile items</p>
                                </div>

                                <!-- Volatile Fee -->
                                <div>
                                    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                        Volatile Fee (₦)
                                    </label>
                                    <input
                                        type="number"
                                        v-model.number="editPricing.volatileFee"
                                        step="0.01"
                                        min="0"
                                        class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Additional fee for volatile items</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Time-based Tab -->
                    <div v-else-if="activeEditTab === 'time'" class="space-y-6">
                        <!-- Section Introduction -->
                        <div class="flex items-center gap-3">
                            <ClockIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                            <p class="text-sm text-gray-700 dark:text-gray-300">Configure multipliers for peak hours and night-time rides</p>
                        </div>

                        <!-- Peak Hour Multiplier -->
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                        Peak Hour Multiplier
                                    </label>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Applied during rush hours (7-9 AM, 5-7 PM)</p>
                                </div>
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ (editPricing.peakHourMultiplier / 10).toFixed(2) }}x</span>
                            </div>
                            <div class="space-y-2">
                                <div class="relative">
                                    <input
                                        type="range"
                                        v-model.number="editPricing.peakHourMultiplier"
                                        min="10"
                                        max="20"
                                        step="1"
                                        class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-range"
                                    />
                                    <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>1.0x (Normal)</span>
                                        <span>2.0x (Double)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Night Charge Multiplier -->
                        <div class="space-y-3">
                            <div class="flex items-center justify-between">
                                <div>
                                    <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                        Night Charge Multiplier
                                    </label>
                                    <p class="text-xs text-gray-500 dark:text-gray-400">Applied from 10 PM to 8 AM</p>
                                </div>
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ (editPricing.nightChargeMultiplier / 10).toFixed(2) }}x</span>
                            </div>
                            <div class="space-y-2">
                                <div class="relative">
                                    <input
                                        type="range"
                                        v-model.number="editPricing.nightChargeMultiplier"
                                        min="10"
                                        max="20"
                                        step="1"
                                        class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-range"
                                    />
                                    <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span>1.0x (Normal)</span>
                                        <span>2.0x (Double)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Multiplier Stacking Information Box -->
                        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                            <div class="flex-shrink-0">
                                <div class="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                                    <span class="text-white text-xs font-bold">*</span>
                                </div>
                            </div>
                            <div class="flex-1">
                                <h4 class="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">Multiplier Stacking</h4>
                                <p class="text-xs text-blue-800 dark:text-blue-300">
                                    Time-based multipliers are applied on top of base pricing and do not stack with surge pricing. The highest applicable multiplier will be used.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Fees & Charges Tab -->
                    <div v-else-if="activeEditTab === 'fees'" class="space-y-6">
                        <!-- Additional Fees Section -->
                        <div class="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <InformationCircleIcon class="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                            <p class="text-sm text-gray-700 dark:text-gray-300">Additional fees and charges for special situations</p>
                        </div>

                        <!-- Cancellation Fee -->
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Cancellation Fee ($)
                            </label>
                            <input
                                type="number"
                                v-model.number="editPricing.cancellationFee"
                                step="0.01"
                                min="0"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Charged when passenger cancels after driver accepts.</p>
                        </div>

                        <!-- Include Tolls & Fees -->
                        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div class="flex-1">
                                <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    Include Tolls & Fees
                                </label>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Automatically add road tolls and parking fees to trip fare.</p>
                            </div>
                            <button
                                @click="editPricing.includeTolls = !editPricing.includeTolls"
                                :class="[
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                    editPricing.includeTolls ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                ]"
                            >
                                <span
                                    :class="[
                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                        editPricing.includeTolls ? 'translate-x-5' : 'translate-x-0'
                                    ]"
                                ></span>
                            </button>
                        </div>

                        <!-- Vehicle Type Status -->
                        <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                            <div class="flex-1">
                                <label class="block text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    Vehicle Type Status
                                </label>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Enable or disable this vehicle type for new bookings.</p>
                            </div>
                            <button
                                @click="editPricing.isActive = !editPricing.isActive"
                                :class="[
                                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                    editPricing.isActive ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                ]"
                            >
                                <span
                                    :class="[
                                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                                        editPricing.isActive ? 'translate-x-5' : 'translate-x-0'
                                    ]"
                                ></span>
                            </button>
                        </div>
                    </div>

                    <!-- Preview Tab -->
                    <div v-else-if="activeEditTab === 'preview'" class="space-y-6">
                        <!-- Section Introduction -->
                        <div class="flex items-center gap-3">
                            <svg class="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            <p class="text-sm text-gray-700 dark:text-gray-300">Preview fare calculations with the new pricing structure</p>
                        </div>

                        <!-- Sample Trips Grid -->
                        <div class="grid grid-cols-2 gap-4">
                            <!-- Short Distance Trip -->
                            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Sample Trip: Short Distance</h4>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Distance:</span>
                                        <span class="text-gray-900 dark:text-white font-medium">5 km</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Duration:</span>
                                        <span class="text-gray-900 dark:text-white font-medium">12 minutes</span>
                                    </div>
                                    <div class="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 space-y-1">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Base Fare:</span>
                                            <span class="text-gray-900 dark:text-white">${{ editPricing.baseFare.toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Distance (5 * ${{ editPricing.ratePerKm.toFixed(2) }}):</span>
                                            <span class="text-gray-900 dark:text-white">${{ (5 * editPricing.ratePerKm).toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Time (12 * ${{ editPricing.ratePerMin.toFixed(2) }}):</span>
                                            <span class="text-gray-900 dark:text-white">${{ (12 * editPricing.ratePerMin).toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-semibold">
                                            <span class="text-gray-900 dark:text-white">Estimated Total:</span>
                                            <span class="text-gray-900 dark:text-white">${{ (editPricing.baseFare + (5 * editPricing.ratePerKm) + (12 * editPricing.ratePerMin)).toFixed(2) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Long Distance Trip -->
                            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Sample Trip: Long Distance</h4>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Distance:</span>
                                        <span class="text-gray-900 dark:text-white font-medium">25 km</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Duration:</span>
                                        <span class="text-gray-900 dark:text-white font-medium">35 minutes</span>
                                    </div>
                                    <div class="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 space-y-1">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Base Fare:</span>
                                            <span class="text-gray-900 dark:text-white">${{ editPricing.baseFare.toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Distance (25 * ${{ editPricing.ratePerKm.toFixed(2) }}):</span>
                                            <span class="text-gray-900 dark:text-white">${{ (25 * editPricing.ratePerKm).toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 dark:text-gray-400">Time (35 * ${{ editPricing.ratePerMin.toFixed(2) }}):</span>
                                            <span class="text-gray-900 dark:text-white">${{ (35 * editPricing.ratePerMin).toFixed(2) }}</span>
                                        </div>
                                        <div class="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700 font-semibold">
                                            <span class="text-gray-900 dark:text-white">Estimated Total:</span>
                                            <span class="text-gray-900 dark:text-white">${{ (editPricing.baseFare + (25 * editPricing.ratePerKm) + (35 * editPricing.ratePerMin)).toFixed(2) }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Multiplier Examples Grid -->
                        <div class="grid grid-cols-2 gap-4">
                            <!-- Peak Hour Example -->
                            <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 p-4">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Peak Hour (10 km, 20 min)</h4>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Base Calculation:</span>
                                        <span class="text-gray-900 dark:text-white">${{ (editPricing.baseFare + (10 * editPricing.ratePerKm) + (20 * editPricing.ratePerMin)).toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Peak Multiplier ({{ (editPricing.peakHourMultiplier / 10).toFixed(2) }}x):</span>
                                        <span class="text-gray-900 dark:text-white">x{{ (editPricing.peakHourMultiplier / 10).toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between pt-2 border-t border-orange-200 dark:border-orange-700 font-semibold">
                                        <span class="text-gray-900 dark:text-white">Peak Hour Total:</span>
                                        <span class="text-gray-900 dark:text-white">${{ ((editPricing.baseFare + (10 * editPricing.ratePerKm) + (20 * editPricing.ratePerMin)) * (editPricing.peakHourMultiplier / 10)).toFixed(2) }}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Night Ride Example -->
                            <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 p-4">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Night Ride (10 km, 20 min)</h4>
                                <div class="space-y-2 text-sm">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Base Calculation:</span>
                                        <span class="text-gray-900 dark:text-white">${{ (editPricing.baseFare + (10 * editPricing.ratePerKm) + (20 * editPricing.ratePerMin)).toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600 dark:text-gray-400">Night Multiplier ({{ (editPricing.nightChargeMultiplier / 10).toFixed(2) }}x):</span>
                                        <span class="text-gray-900 dark:text-white">x{{ (editPricing.nightChargeMultiplier / 10).toFixed(2) }}</span>
                                    </div>
                                    <div class="flex justify-between pt-2 border-t border-blue-200 dark:border-blue-700 font-semibold">
                                        <span class="text-gray-900 dark:text-white">Night Ride Total:</span>
                                        <span class="text-gray-900 dark:text-white">${{ ((editPricing.baseFare + (10 * editPricing.ratePerKm) + (20 * editPricing.ratePerMin)) * (editPricing.nightChargeMultiplier / 10)).toFixed(2) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Other Tabs (Placeholder) -->
                    <div v-else class="text-center py-12 text-gray-500 dark:text-gray-400">
                        <p>{{ activeEditTab }} content will be displayed here.</p>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showEditPricingModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <XMarkIcon class="h-4 w-4" />
                        Cancel
                    </button>
                    <button
                        @click="saveEditPricing"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save Changes
                    </button>
                </div>
            </div>
        </div>

        <!-- Pricing Parameter Details Modal -->
        <div
            v-if="showDetailsModal && selectedDetailsParam"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showDetailsModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ selectedDetailsParam.method || 'Pricing Parameter' }} - Details</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Complete overview of pricing parameter configuration</p>
                    </div>
                    <button
                        @click="showDetailsModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Method Section -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Method</label>
                        <div class="flex items-center justify-between">
                            <p class="text-sm text-gray-700 dark:text-gray-300 font-medium">{{ selectedDetailsParam.method || 'N/A' }}</p>
                            <span class="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">active</span>
                        </div>
                    </div>

                    <!-- Pricing Details Section -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Pricing Details</h3>
                        <div class="grid grid-cols-2 gap-4">
                            <div v-if="selectedDetailsParam.base_fee !== undefined" class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Base Fee</div>
                                <div class="text-lg font-semibold text-gray-900 dark:text-white">₦{{ selectedDetailsParam.base_fee.toLocaleString() }}</div>
                            </div>
                            <div v-if="selectedDetailsParam.distance_rate !== undefined" class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Distance Rate</div>
                                <div class="text-lg font-semibold text-gray-900 dark:text-white">₦{{ selectedDetailsParam.distance_rate.toLocaleString() }}</div>
                            </div>
                            <div v-if="selectedDetailsParam.weight_rate !== undefined" class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Weight Rate</div>
                                <div class="text-lg font-semibold text-gray-900 dark:text-white">₦{{ selectedDetailsParam.weight_rate.toLocaleString() }}</div>
                            </div>
                            <div v-if="selectedDetailsParam.fragile_fee !== undefined" class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Fragile Fee</div>
                                <div class="text-lg font-semibold text-gray-900 dark:text-white">₦{{ selectedDetailsParam.fragile_fee.toLocaleString() }}</div>
                            </div>
                            <div v-if="selectedDetailsParam.volatile_fee !== undefined" class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Volatile Fee</div>
                                <div class="text-lg font-semibold text-gray-900 dark:text-white">₦{{ selectedDetailsParam.volatile_fee.toLocaleString() }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="showDetailsModal = false"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Close
                    </button>
                    <button
                        @click="openEditFromDetails"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600"
                    >
                        Edit Pricing
                    </button>
                </div>
            </div>
        </div>

        <!-- Pricing History Modal -->
        <div
            v-if="showHistoryModal && selectedHistoryVehicle"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="showHistoryModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div class="flex items-center gap-3">
                        <ClockIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
                        <div>
                            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Pricing History - {{ selectedHistoryVehicle }}</h2>
                            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">View all pricing changes for this vehicle type</p>
                        </div>
                    </div>
                    <button
                        @click="showHistoryModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-4 overflow-y-auto flex-1">
                    <div 
                        v-for="(entry, index) in getHistoryData(selectedHistoryVehicle)" 
                        :key="index"
                        class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4 flex items-start gap-4"
                    >
                        <!-- Icon -->
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <ArrowTrendingUpIcon class="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        
                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">{{ entry.title }}</h4>
                            <div class="flex items-center gap-2 mb-2">
                                <span class="text-sm text-gray-600 dark:text-gray-400">${{ entry.oldValue }}</span>
                                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                                <span class="text-sm font-semibold text-green-600 dark:text-green-400">${{ entry.newValue }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-xs text-gray-500 dark:text-gray-400">{{ entry.updater }}</span>
                                <span class="text-xs text-gray-500 dark:text-gray-400">{{ entry.date }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'
import { 
    DocumentTextIcon, 
    PlusIcon, 
    TruckIcon, 
    InformationCircleIcon, 
    ClockIcon, 
    PencilIcon, 
    TrashIcon,
    XMarkIcon,
    MapPinIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon
} from '@heroicons/vue/24/outline'
import deliveryService from '@/services/deliveryService'

const toast = useToast()
const pricingParams = ref<any[]>([])
const loading = ref(false)

// Filter pricing params to only show those with actual pricing data
const filteredPricingParams = computed(() => {
    return pricingParams.value.filter(param => 
        param.method && (
            param.base_fee !== undefined || 
            param.distance_rate !== undefined || 
            param.weight_rate !== undefined || 
            param.fragile_fee !== undefined || 
            param.volatile_fee !== undefined
        )
    )
})

// Fetch pricing parameters
const fetchPricingParams = async () => {
    loading.value = true
    try {
        const response = await deliveryService.getAllPricingParams()
        // API response structure: { data: [...], message: "...", ok: true }
        // axios wraps it, so response.data is the API response
        const apiResponse = response.data
        
        // Handle different response structures
        let paramsArray: any[] = []
        if (Array.isArray(apiResponse.data)) {
            paramsArray = apiResponse.data
        } else if (Array.isArray(apiResponse)) {
            paramsArray = apiResponse
        }
        
        pricingParams.value = paramsArray
    } catch (error: any) {
        console.error('Error fetching pricing params:', error)
        toast.error(error?.response?.data?.message || 'Failed to load pricing parameters')
        pricingParams.value = []
    } finally {
        loading.value = false
    }
}

// Save/Update pricing
const savePricing = async (data: any) => {
    try {
        if (data._id || data.id) {
            await deliveryService.updatePricingParams(data)
            toast.success('Pricing updated successfully')
        } else {
            await deliveryService.createPricingParams(data)
            toast.success('Pricing created successfully')
        }
        await fetchPricingParams()
    } catch (error: any) {
        console.error('Error in savePricing:', error)
        toast.error(error?.response?.data?.message || 'Failed to save pricing')
        throw error // Re-throw to allow caller to handle
    }
}

onMounted(async () => {
    await fetchPricingParams()
})

// Fare Simulator Modal
const showFareSimulatorModal = ref(false)
const fareSimulator = ref({
    distance: 5.2,
    time: 18,
    vehicleType: '',
    surgeMultiplier: 1
})

const saveFareSimulator = () => {
    // Handle save logic here
    console.log('Saving fare simulator:', fareSimulator.value)
    showFareSimulatorModal.value = false
}

// Surge Pricing Modal
const showSurgePricingModal = ref(false)
const surgePricing = ref({
    zoneName: '',
    surgeMultiplier: 1.5,
    startTime: '',
    endTime: ''
})

const drawZone = () => {
    // Handle zone drawing logic here
    console.log('Drawing zone polygon on map')
}

const saveSurgePricing = () => {
    // Handle save logic here
    console.log('Saving surge pricing:', surgePricing.value)
    showSurgePricingModal.value = false
}

// Add Vehicle Type Modal
const showAddVehicleModal = ref(false)
const newVehicleType = ref({
    name: '',
    capacity: 4,
    description: '',
    baseFare: 0,
    ratePerKm: 0,
    ratePerMin: 0,
    minimumFare: 0,
    weightRate: 0,
    fragileFee: 0,
    volatileFee: 0,
    isActive: false
})

const addVehicleType = () => {
    // Handle add vehicle type logic here
    console.log('Adding vehicle type:', newVehicleType.value)
    // Reset form
    newVehicleType.value = {
        name: '',
        capacity: 4,
        description: '',
        baseFare: 5,
        ratePerKm: 1.5,
        ratePerMin: 0.35,
        minimumFare: 8,
        isActive: false
    }
    showAddVehicleModal.value = false
}

// Edit Pricing Modal
const showEditPricingModal = ref(false)
const selectedPricingParam = ref<any | null>(null)
const selectedVehicleType = ref<string | null>(null)
const activeEditTab = ref('base')

// Vehicle type pricing data
const vehiclePricingData: Record<string, any> = {
    'Standard': {
        baseFare: 5,
        ratePerKm: 1.5,
        ratePerMin: 0.35,
        minimumFare: 8,
        waitTimeRate: 0.25,
        maximumFare: 150,
        peakHourMultiplier: 12,
        nightChargeMultiplier: 11.5,
        cancellationFee: 3,
        includeTolls: true,
        isActive: true
    },
    'Premium': {
        baseFare: 8,
        ratePerKm: 2.2,
        ratePerMin: 0.5,
        minimumFare: 12,
        waitTimeRate: 0.35,
        maximumFare: 200,
        peakHourMultiplier: 12,
        nightChargeMultiplier: 11.5,
        cancellationFee: 3,
        includeTolls: true,
        isActive: true
    },
    'XL': {
        baseFare: 10,
        ratePerKm: 2.8,
        ratePerMin: 0.6,
        minimumFare: 15,
        waitTimeRate: 0.4,
        maximumFare: 250,
        peakHourMultiplier: 12,
        nightChargeMultiplier: 11.5,
        cancellationFee: 3,
        includeTolls: true,
        isActive: true
    }
}

const editPricing = ref({
    baseFare: 5,
    ratePerKm: 1.5,
    ratePerMin: 0.35,
    minimumFare: 8,
    waitTimeRate: 0.25,
    maximumFare: 150,
    peakHourMultiplier: 12, // 1.2x (stored as 12 for slider range 10-20)
    nightChargeMultiplier: 11.5, // 1.15x (stored as 11.5 for slider range 10-20)
    cancellationFee: 3,
    includeTolls: true,
    isActive: true
})

const openEditModal = (param: any) => {
    selectedPricingParam.value = param
    selectedVehicleType.value = param.method || 'dynamic'
    
    // Map API fields to edit form format
    editPricing.value = {
        baseFare: param.base_fee || 0,
        ratePerKm: param.distance_rate || 0,
        ratePerMin: 0, // Not in API response
        minimumFare: 0, // Not in API response
        waitTimeRate: 0, // Not in API response
        maximumFare: 0, // Not in API response
        peakHourMultiplier: 12,
        nightChargeMultiplier: 11.5,
        cancellationFee: 0, // Not in API response
        includeTolls: true,
        isActive: true,
        weightRate: param.weight_rate || 0,
        fragileFee: param.fragile_fee || 0,
        volatileFee: param.volatile_fee || 0,
        method: param.method || 'dynamic'
    }
    activeEditTab.value = 'base'
    showEditPricingModal.value = true
}

const saveEditPricing = async () => {
    try {
        if (!selectedPricingParam.value) {
            toast.error('No pricing parameter selected')
            return
        }

        // Map form fields to API structure
        const apiData: any = {
            method: editPricing.value.method || selectedPricingParam.value.method || 'dynamic'
        }

        // Only include fields that have values
        if (editPricing.value.baseFare !== undefined && editPricing.value.baseFare !== null) {
            apiData.base_fee = editPricing.value.baseFare
        }
        if (editPricing.value.ratePerKm !== undefined && editPricing.value.ratePerKm !== null) {
            apiData.distance_rate = editPricing.value.ratePerKm
        }
        if (editPricing.value.weightRate !== undefined && editPricing.value.weightRate !== null) {
            apiData.weight_rate = editPricing.value.weightRate
        }
        if (editPricing.value.fragileFee !== undefined && editPricing.value.fragileFee !== null) {
            apiData.fragile_fee = editPricing.value.fragileFee
        }
        if (editPricing.value.volatileFee !== undefined && editPricing.value.volatileFee !== null) {
            apiData.volatile_fee = editPricing.value.volatileFee
        }

        // Include ID if it exists (for update)
        if (selectedPricingParam.value._id) {
            apiData._id = selectedPricingParam.value._id
        } else if (selectedPricingParam.value.id) {
            apiData.id = selectedPricingParam.value.id
        }

        // Call savePricing function which handles create/update
        await savePricing(apiData)
        showEditPricingModal.value = false
    } catch (error: any) {
        console.error('Error saving pricing:', error)
        toast.error(error?.response?.data?.message || 'Failed to save pricing')
    }
}

// Vehicle Details Modal
const showDetailsModal = ref(false)
const selectedDetailsParam = ref<any | null>(null)
const selectedDetailsVehicle = ref<string | null>(null)

const vehicleDescriptions: Record<string, string> = {
    'Standard': 'Affordable rides for everyday travel',
    'Premium': 'Luxury vehicles with premium comfort',
    'XL': 'Extra space for groups up to 6 passengers'
}

const vehicleCapacities: Record<string, number> = {
    'Standard': 4,
    'Premium': 4,
    'XL': 5
}

const getVehicleDescription = (vehicleType: string | null): string => {
    return vehicleType ? vehicleDescriptions[vehicleType] || '' : ''
}

const getVehicleCapacity = (vehicleType: string | null): number => {
    return vehicleType ? vehicleCapacities[vehicleType] || 0 : 0
}

const getVehiclePricing = (vehicleType: string | null) => {
    if (!vehicleType) return vehiclePricingData['Standard']
    return vehiclePricingData[vehicleType] || vehiclePricingData['Standard']
}

const openDetailsModal = (param: any) => {
    selectedDetailsParam.value = param
    selectedDetailsVehicle.value = param.method || 'dynamic'
    showDetailsModal.value = true
}

const openEditFromDetails = () => {
    if (selectedDetailsParam.value) {
        showDetailsModal.value = false
        openEditModal(selectedDetailsParam.value)
    }
}

// Pricing History Modal
const showHistoryModal = ref(false)
const selectedHistoryVehicle = ref<string | null>(null)

const pricingHistoryData: Record<string, any[]> = {
    'Standard': [
        {
            title: 'Base Fare Updated',
            oldValue: '4.50',
            newValue: '5.00',
            updater: 'admin@paymax.com',
            date: '2025-10-15'
        },
        {
            title: 'Rate per km Updated',
            oldValue: '1.30',
            newValue: '1.50',
            updater: 'manager@paymax.com',
            date: '2025-10-10'
        },
        {
            title: 'Minimum Fare Updated',
            oldValue: '7.00',
            newValue: '8.00',
            updater: 'admin@paymax.com',
            date: '2025-10-05'
        }
    ],
    'Premium': [
        {
            title: 'Base Fare Updated',
            oldValue: '7.50',
            newValue: '8.00',
            updater: 'admin@paymax.com',
            date: '2025-10-15'
        },
        {
            title: 'Rate per km Updated',
            oldValue: '2.00',
            newValue: '2.20',
            updater: 'manager@paymax.com',
            date: '2025-10-10'
        },
        {
            title: 'Minimum Fare Updated',
            oldValue: '10.00',
            newValue: '12.00',
            updater: 'admin@paymax.com',
            date: '2025-10-05'
        }
    ],
    'XL': [
        {
            title: 'Base Fare Updated',
            oldValue: '9.00',
            newValue: '10.00',
            updater: 'admin@paymax.com',
            date: '2025-10-15'
        },
        {
            title: 'Rate per km Updated',
            oldValue: '2.50',
            newValue: '2.80',
            updater: 'manager@paymax.com',
            date: '2025-10-10'
        },
        {
            title: 'Minimum Fare Updated',
            oldValue: '12.00',
            newValue: '15.00',
            updater: 'admin@paymax.com',
            date: '2025-10-05'
        }
    ]
}

const getHistoryData = (vehicleType: string | null) => {
    if (!vehicleType) return []
    return pricingHistoryData[vehicleType] || []
}

const openHistoryModal = (vehicleType: string) => {
    selectedHistoryVehicle.value = vehicleType
    showHistoryModal.value = true
}
</script>

<style scoped>
/* Custom slider styling for time-based multipliers */
input[type="range"].slider-range {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
}

input[type="range"].slider-range::-webkit-slider-track {
    background: #e5e7eb;
    height: 8px;
    border-radius: 4px;
}

.dark input[type="range"].slider-range::-webkit-slider-track {
    background: #374151;
}

input[type="range"].slider-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: #2563eb;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    margin-top: -6px;
    cursor: pointer;
}

input[type="range"].slider-range::-moz-range-track {
    background: #e5e7eb;
    height: 8px;
    border-radius: 4px;
}

.dark input[type="range"].slider-range::-moz-range-track {
    background: #374151;
}

input[type="range"].slider-range::-moz-range-thumb {
    background: #2563eb;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
}
</style>

