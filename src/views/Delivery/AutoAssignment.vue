<template>
    <div class="p-6 bg-white dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Auto-Assignment Settings</h1>
                <p class="text-sm text-gray-600 dark:text-gray-400">Configure driver assignment algorithm and behavior</p>
            </div>
            <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3-3m3 3V4" />
                </svg>
                Save Settings
            </button>
        </div>

        <!-- Main Content: Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Left Column: Configuration Sections -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Assignment Mode Section -->
                <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Assignment Mode</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Unique trips are assigned to drivers</p>
                    
                    <div class="space-y-3">
                        <label class="flex items-start gap-3 cursor-pointer">
                            <input
                                type="radio"
                                v-model="assignmentMode"
                                value="auto"
                                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <div>
                                <div class="text-sm font-medium text-gray-900 dark:text-white">Auto-Assignment</div>
                                <div class="text-xs text-gray-600 dark:text-gray-400">Random automatically assigns to best matched driver</div>
                            </div>
                        </label>
                        
                        <label class="flex items-start gap-3 cursor-pointer">
                            <input
                                type="radio"
                                v-model="assignmentMode"
                                value="broadcast"
                                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <div>
                                <div class="text-sm font-medium text-gray-900 dark:text-white">Broadcast Mode</div>
                                <div class="text-xs text-gray-600 dark:text-gray-400">Sends to multiple drivers simultaneously. First to accept gets trip.</div>
                            </div>
                        </label>
                        
                        <label class="flex items-start gap-3 cursor-pointer">
                            <input
                                type="radio"
                                v-model="assignmentMode"
                                value="manual"
                                class="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <div>
                                <div class="text-sm font-medium text-gray-900 dark:text-white">Manual Only</div>
                                <div class="text-xs text-gray-600 dark:text-gray-400">Drivers must manually accept all trips.</div>
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Algorithm Weights Section -->
                <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Algorithm Weights</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Adjust scoring factors (Total: 100%)</p>
                    
                    <div class="space-y-5">
                        <!-- Proximity Slider -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <MapPinIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <label class="text-sm font-medium text-gray-900 dark:text-white">Proximity</label>
                                </div>
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ algorithmWeights.proximity }}%</span>
                            </div>
                            <div class="relative">
                                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div class="absolute left-0 top-0 h-full bg-black rounded-lg" :style="{ width: algorithmWeights.proximity + '%' }"></div>
                                </div>
                                <input
                                    type="range"
                                    v-model.number="algorithmWeights.proximity"
                                    min="0"
                                    max="100"
                                    class="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer slider-input"
                                />
                            </div>
                        </div>

                        <!-- Rating Slider -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <StarIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <label class="text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                                </div>
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ algorithmWeights.rating }}%</span>
                            </div>
                            <div class="relative">
                                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div class="absolute left-0 top-0 h-full bg-black rounded-lg" :style="{ width: algorithmWeights.rating + '%' }"></div>
                                </div>
                                <input
                                    type="range"
                                    v-model.number="algorithmWeights.rating"
                                    min="0"
                                    max="100"
                                    class="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer slider-input"
                                />
                            </div>
                        </div>

                        <!-- Acceptance Rate Slider -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <ArrowTrendingUpIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <label class="text-sm font-medium text-gray-900 dark:text-white">Acceptance Rate</label>
                                </div>
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ algorithmWeights.acceptanceRate }}%</span>
                            </div>
                            <div class="relative">
                                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div class="absolute left-0 top-0 h-full bg-black rounded-lg" :style="{ width: algorithmWeights.acceptanceRate + '%' }"></div>
                                </div>
                                <input
                                    type="range"
                                    v-model.number="algorithmWeights.acceptanceRate"
                                    min="0"
                                    max="100"
                                    class="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer slider-input"
                                />
                            </div>
                        </div>

                        <!-- Earnings Balance Slider -->
                        <div>
                            <div class="flex items-center justify-between mb-2">
                                <div class="flex items-center gap-2">
                                    <BanknotesIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <label class="text-sm font-medium text-gray-900 dark:text-white">Earnings Balance</label>
                                </div>
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ algorithmWeights.earningsBalance }}%</span>
                            </div>
                            <div class="relative">
                                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div class="absolute left-0 top-0 h-full bg-black rounded-lg" :style="{ width: algorithmWeights.earningsBalance + '%' }"></div>
                                </div>
                                <input
                                    type="range"
                                    v-model.number="algorithmWeights.earningsBalance"
                                    min="0"
                                    max="100"
                                    class="absolute top-0 left-0 w-full h-3 opacity-0 cursor-pointer slider-input"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Total Weight Display -->
                    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div class="flex items-center justify-between">
                            <span class="text-sm font-medium text-gray-900 dark:text-white">Total Weight</span>
                            <div class="flex items-center gap-3">
                                <span class="text-sm font-semibold text-yellow-600 dark:text-yellow-400">{{ totalWeight }}%</span>
                                <button @click="showBreakdownModal = true" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">View</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Search Parameters Section -->
                <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Search Parameters</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Configure assignment radius and timeout duration</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Search Radius (KM)</label>
                            <input
                                type="number"
                                v-model.number="searchParams.radius"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Offer Timeout (seconds)</label>
                            <input
                                type="number"
                                v-model.number="searchParams.timeout"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <!-- Dynamic Incentives Section -->
                <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Dynamic Incentives</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Auto-trigger incentives to get drivers to accept</p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Trigger After (minutes)</label>
                            <input
                                type="number"
                                v-model.number="dynamicIncentives.triggerAfter"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Boost Amount ($)</label>
                            <input
                                type="number"
                                v-model.number="dynamicIncentives.boostAmount"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Assignment Simulator -->
            <div class="lg:col-span-1">
                <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">Assignment Simulator</h2>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">Test algorithm with pickup location</p>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-900 dark:text-white mb-2">Pickup Location</label>
                            <input
                                type="text"
                                v-model="simulatorPickupLocation"
                                placeholder="Enter address or coordinates"
                                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <button
                            @click="simulateAssignment"
                            class="w-full px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center justify-center gap-2"
                        >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            Simulate Assignment
                        </button>
                        
                        <!-- Simulation Result Area -->
                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 min-h-[300px] flex flex-col items-center justify-center">
                            <svg class="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
                                Enter a pickup location and simulate to see results.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Algorithm Weights Breakdown Modal -->
        <div
            v-if="showBreakdownModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
            @click.self="showBreakdownModal = false"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl mx-4 my-8 max-h-[90vh] overflow-y-auto">
                <!-- Modal Header -->
                <div class="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Algorithm Weights Breakdown</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Explained applied at the time of scoring tasks</p>
                    </div>
                    <button
                        @click="showBreakdownModal = false"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content -->
                <div class="p-6 space-y-6">
                    <!-- Information Box -->
                    <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                        <InformationCircleIcon class="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <p class="text-sm text-blue-800 dark:text-blue-300">
                            The auto-assignment algorithm scores each available driver based on multiple factors. Drivers with the highest score get assigned first. You can adjust the importance of each factor using the weight sliders.
                        </p>
                    </div>

                    <!-- Current Configuration Warning -->
                    <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <ExclamationTriangleIcon class="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                            <p class="text-sm text-yellow-800 dark:text-yellow-300">
                                Total weight exceeds 100% for optimal algorithm performance. Current total: <span class="font-semibold">{{ totalWeight }}%</span>.
                            </p>
                        </div>
                    </div>

                    <!-- Individual Algorithm Weights -->
                    <div class="space-y-6">
                        <!-- Proximity -->
                        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center gap-3">
                                    <MapPinIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Proximity</h3>
                                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Distance from pickup location</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ algorithmWeights.proximity }}%</span>
                                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Medium</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div class="absolute left-0 top-0 h-full bg-black rounded-lg" :style="{ width: algorithmWeights.proximity + '%' }"></div>
                                </div>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <span class="font-medium">Impact on Assignment:</span> Higher weight prioritizes drivers who are closest to the pickup location, reducing pickup wait time.
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                <span class="font-medium">Example:</span> Driver with 5 KM distance might get 100 points for this score.
                            </p>
                        </div>

                        <!-- Rating -->
                        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center gap-3">
                                    <StarIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Rating</h3>
                                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Driver's average rating</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ algorithmWeights.rating }}%</span>
                                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Very High</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div class="absolute left-0 top-0 h-full bg-black rounded-lg" :style="{ width: algorithmWeights.rating + '%' }"></div>
                                </div>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <span class="font-medium">Impact on Assignment:</span> Higher weight ensures experienced drivers get more trips, improving passenger satisfaction and service quality.
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                <span class="font-medium">Example:</span> Driver with a 4.8-star rating might get 100 points.
                            </p>
                        </div>

                        <!-- Acceptance Rate -->
                        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center gap-3">
                                    <ArrowTrendingUpIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Acceptance Rate</h3>
                                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">How often driver accepts trips</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ algorithmWeights.acceptanceRate }}%</span>
                                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Low</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div class="absolute left-0 top-0 h-full bg-black rounded-lg" :style="{ width: algorithmWeights.acceptanceRate + '%' }"></div>
                                </div>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <span class="font-medium">Impact on Assignment:</span> Higher weight prioritizes reliable drivers who consistently accept trip requests, reducing driver-app idle time.
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                <span class="font-medium">Example:</span> Driver with 95% acceptance might get 100 points.
                            </p>
                        </div>

                        <!-- Earnings Balance -->
                        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-5">
                            <div class="flex items-start justify-between mb-3">
                                <div class="flex items-center gap-3">
                                    <BanknotesIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                    <div>
                                        <h3 class="text-sm font-semibold text-gray-900 dark:text-white">Earnings Balance</h3>
                                        <p class="text-xs text-gray-600 dark:text-gray-400 mt-0.5">Fair distribution of earning</p>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <span class="text-lg font-bold text-gray-900 dark:text-white">{{ algorithmWeights.earningsBalance }}%</span>
                                    <span class="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">Very High</span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden">
                                    <div class="absolute left-0 top-0 h-full bg-black rounded-lg" :style="{ width: algorithmWeights.earningsBalance + '%' }"></div>
                                </div>
                            </div>
                            <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">
                                <span class="font-medium">Impact on Assignment:</span> Higher weight helps distribute trips more evenly among drivers, giving those with lower daily earnings a better chance at getting new assignments.
                            </p>
                            <p class="text-sm text-gray-600 dark:text-gray-400">
                                <span class="font-medium">Example:</span> Driver who earned $200 today might get 100 points.
                            </p>
                        </div>
                    </div>

                    <!-- How Final Score is Calculated -->
                    <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">How Final Score is Calculated</h3>
                        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                            <p class="text-sm font-mono text-gray-900 dark:text-white">
                                Final Score = (Proximity Score * W1) + (Rating Score * W2) + (Acceptance Score * W3) + (Earnings Score * W4)
                            </p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Proximity Score</h4>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Based on distance to pickup</p>
                                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">(0-100, 0 closest = higher)</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Rating Score</h4>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Based on driver rating value</p>
                                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">(0-100, 5-star = higher)</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Acceptance Score</h4>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Percentage of accepted trips</p>
                                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">(0-100, 100% = higher)</p>
                            </div>
                            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">Earnings Score</h4>
                                <p class="text-xs text-gray-600 dark:text-gray-400">Inverse of daily earnings</p>
                                <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">(0-100, lower earnings = higher)</p>
                            </div>
                        </div>
                    </div>

                    <!-- Recommended Configurations -->
                    <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recommended Configurations</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Speed First -->
                            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors" @click="applyConfiguration('speed')">
                                <div class="flex items-center gap-2 mb-2">
                                    <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Speed First</h4>
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Prioritizes quick pickup</p>
                                <div class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                    <div>Proximity: <span class="font-semibold text-gray-900 dark:text-white">35%</span></div>
                                    <div>Rating: <span class="font-semibold text-gray-900 dark:text-white">25%</span></div>
                                    <div>Acceptance: <span class="font-semibold text-gray-900 dark:text-white">25%</span></div>
                                    <div>Earnings: <span class="font-semibold text-gray-900 dark:text-white">15%</span></div>
                                </div>
                            </div>

                            <!-- Quality First -->
                            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors" @click="applyConfiguration('quality')">
                                <div class="flex items-center gap-2 mb-2">
                                    <StarIcon class="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Quality First</h4>
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Prioritizes rated drivers</p>
                                <div class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                    <div>Proximity: <span class="font-semibold text-gray-900 dark:text-white">20%</span></div>
                                    <div>Rating: <span class="font-semibold text-gray-900 dark:text-white">50%</span></div>
                                    <div>Acceptance: <span class="font-semibold text-gray-900 dark:text-white">20%</span></div>
                                    <div>Earnings: <span class="font-semibold text-gray-900 dark:text-white">10%</span></div>
                                </div>
                            </div>

                            <!-- Balanced -->
                            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors" @click="applyConfiguration('balanced')">
                                <div class="flex items-center gap-2 mb-2">
                                    <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">Balanced</h4>
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400 mb-3">Equal emphasis on all factors</p>
                                <div class="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                    <div>Proximity: <span class="font-semibold text-gray-900 dark:text-white">25%</span></div>
                                    <div>Rating: <span class="font-semibold text-gray-900 dark:text-white">25%</span></div>
                                    <div>Acceptance: <span class="font-semibold text-gray-900 dark:text-white">25%</span></div>
                                    <div>Earnings: <span class="font-semibold text-gray-900 dark:text-white">25%</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MapPinIcon, StarIcon, ArrowTrendingUpIcon, BanknotesIcon, XMarkIcon, InformationCircleIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

// Assignment Mode
const assignmentMode = ref('auto')

// Algorithm Weights
const algorithmWeights = ref({
    proximity: 40,
    rating: 80,
    acceptanceRate: 20,
    earningsBalance: 93
})

const totalWeight = computed(() => {
    return algorithmWeights.value.proximity + 
           algorithmWeights.value.rating + 
           algorithmWeights.value.acceptanceRate + 
           algorithmWeights.value.earningsBalance
})

// Search Parameters
const searchParams = ref({
    radius: 5,
    timeout: 30
})

// Dynamic Incentives
const dynamicIncentives = ref({
    triggerAfter: 2,
    boostAmount: 5
})

// Simulator
const simulatorPickupLocation = ref('')

const simulateAssignment = () => {
    if (!simulatorPickupLocation.value.trim()) {
        return
    }
    // Handle simulation logic here
    console.log('Simulating assignment for:', simulatorPickupLocation.value)
}

// Breakdown Modal
const showBreakdownModal = ref(false)

// Apply Configuration
const applyConfiguration = (type: string) => {
    if (type === 'speed') {
        algorithmWeights.value = {
            proximity: 35,
            rating: 25,
            acceptanceRate: 25,
            earningsBalance: 15
        }
    } else if (type === 'quality') {
        algorithmWeights.value = {
            proximity: 20,
            rating: 50,
            acceptanceRate: 20,
            earningsBalance: 10
        }
    } else if (type === 'balanced') {
        algorithmWeights.value = {
            proximity: 25,
            rating: 25,
            acceptanceRate: 25,
            earningsBalance: 25
        }
    }
    showBreakdownModal.value = false
}
</script>

<style scoped>
/* Custom slider input styling - invisible overlay */
input[type="range"].slider-input {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;
    z-index: 10;
}

input[type="range"].slider-input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    height: 20px;
    width: 20px;
    cursor: pointer;
}

input[type="range"].slider-input::-moz-range-thumb {
    background: transparent;
    height: 20px;
    width: 20px;
    border: none;
    cursor: pointer;
}
</style>

