<template>
    <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <!-- Header Section -->
        <div class="mb-6">
            <div class="flex items-center justify-between mb-4">
                <div>
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Reports & Analytics</h1>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Business intelligence and reporting</p>
                </div>
                <div class="flex items-center gap-3">
                    <!-- Date Picker -->
                    <div class="relative" ref="dateDropdownRef">
                        <button 
                            @click.stop="toggleDateDropdown"
                            class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                        >
                            <CalendarDaysIcon class="h-4 w-4" />
                            {{ selectedDateRange }}
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        <!-- Dropdown Menu -->
                        <div 
                            v-if="showDateDropdown"
                            @click.stop
                            class="absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50"
                        >
                            <div class="py-1">
                                <button
                                    v-for="option in dateRangeOptions"
                                    :key="option.value"
                                    @click="selectDateRange(option.value)"
                                    :class="[
                                        'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700',
                                        selectedDateRange === option.label ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 font-medium' : 'text-gray-700 dark:text-gray-300'
                                    ]"
                                >
                                    {{ option.label }}
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Schedule Report Button -->
                    <button 
                        @click="openScheduleReportModal"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <PlusIcon class="h-4 w-4" />
                        Schedule Report
                    </button>
                </div>
            </div>

            <!-- Navigation Tabs -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
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
        </div>

        <!-- Standard Reports Content -->
        <div v-if="activeTab === 'standard'">
            <!-- KPI Cards Section -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <!-- Trips Analytics Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <TruckIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">+12.5%</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">Trips Analytics</p>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Trips by region, rides, and average trips</p>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Total Trips:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">17,880</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Avg Fare:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">$24.32</span>
                    </div>
                </div>
            </div>

            <!-- Driver Performance Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <UserIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                            <p class="text-xs font-semibold text-yellow-600 dark:text-yellow-400">Warning</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">Driver Performance</p>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Acceptance, completion rates</p>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Acceptance:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">90%</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Completion:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">88%</span>
                    </div>
                </div>
            </div>

            <!-- Revenue & P&L Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <CurrencyDollarIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">+4.2%</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">Revenue & P&L</p>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Revenue and profit/loss analysis</p>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Revenue:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">$188,788</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Net Profit:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">$87,601</span>
                    </div>
                </div>
            </div>

            <!-- Promotions Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <CalendarDaysIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">+400 new</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">Promotions</p>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Promo code effectiveness</p>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Active:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">12</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Avg ROI:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">2.5x</span>
                    </div>
                </div>
            </div>

            <!-- Fraud Analytics Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <ShieldCheckIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                            <p class="text-xs font-semibold text-yellow-600 dark:text-yellow-400">25 active</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">Fraud Analytics</p>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Fraud detection and discrepancies</p>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Cases:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">80</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Resolved:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">15</span>
                    </div>
                </div>
            </div>

            <!-- Retention Card -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-2">
                        <ArrowPathIcon class="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <div>
                            <p class="text-xs font-semibold text-green-600 dark:text-green-400">Improving</p>
                            <p class="text-sm font-semibold text-gray-900 dark:text-white">Retention</p>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mb-3">Cohort analysis and metrics</p>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Week 4:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">59%</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600 dark:text-gray-400">Week 12:</span>
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">38%</span>
                    </div>
                </div>
            </div>
            </div>

            <!-- Charts Section -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <!-- Trips by Region Bar Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Trips by Region</h3>
                <div class="h-64">
                    <BarChart :data="tripsByRegionChartData" :options="barChartOptions" />
                </div>
            </div>

            <!-- Revenue & Costs Line Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue & Costs</h3>
                <div class="h-64">
                    <LineChart :data="revenueCostsChartData" :options="lineChartOptions" />
                </div>
            </div>
            </div>

            <!-- Driver Performance Table -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Driver Performance</h3>
                <button class="px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-xs font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2">
                    View All
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Driver</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Trips</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acceptance</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completion</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        <tr 
                            v-for="driver in driverPerformance" 
                            :key="driver.id"
                            class="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                        >
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-medium text-gray-900 dark:text-white">{{ driver.name }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ driver.trips }}</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ driver.acceptance }}%</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm text-gray-600 dark:text-gray-400">{{ driver.completion }}%</span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center gap-1">
                                    <StarIcon class="h-4 w-4 text-yellow-500" />
                                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ driver.rating }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="text-sm font-medium text-gray-900 dark:text-white">${{ driver.revenue.toLocaleString() }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>

        <!-- Advanced Analysis Content -->
        <div v-if="activeTab === 'advanced'" class="space-y-6">
            <!-- Demand Forecast Chart -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Demand Forecast</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">7-day AI-powered prediction</p>
                    </div>
                    <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-sm font-medium">
                        94.5% accuracy
                    </span>
                </div>
                <div class="h-80">
                    <LineChart :data="demandForecastChartData" :options="demandForecastChartOptions" />
                </div>
            </div>

            <!-- Bottom Section: Driver Churn Risk and Cohort LTV:CAC -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Driver Churn Risk -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Driver Churn Risk</h3>
                        <span class="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-sm font-medium">
                            4 high risk
                        </span>
                    </div>
                    <div class="space-y-4">
                        <div 
                            v-for="driver in churnRiskDrivers" 
                            :key="driver.id"
                            class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ driver.name }}</span>
                                <span class="text-sm font-semibold text-red-600 dark:text-red-400">{{ driver.risk }}%</span>
                            </div>
                            <p class="text-xs text-gray-600 dark:text-gray-400">{{ driver.reason }}</p>
                        </div>
                    </div>
                </div>

                <!-- Cohort LTV:CAC -->
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Cohort LTV:CAC</h3>
                        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-sm font-medium">
                            12.05x avg
                        </span>
                    </div>
                    <div class="space-y-4">
                        <div 
                            v-for="cohort in cohortLTV" 
                            :key="cohort.id"
                            class="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                        >
                            <div class="flex items-center justify-between mb-2">
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ cohort.month }}</span>
                                <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ cohort.ratio }}x</span>
                            </div>
                            <p class="text-xs text-gray-600 dark:text-gray-400">{{ cohort.ltv }} LTV</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Scheduled Reports Content -->
        <div v-if="activeTab === 'scheduled'" class="space-y-4">
            <div 
                v-for="report in scheduledReports" 
                :key="report.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-4">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ report.name }}</h3>
                            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                                {{ report.frequency }}
                            </span>
                            <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                                {{ report.format }}
                            </span>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Report Type</p>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ report.type }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Run</p>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ report.lastRun }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Run</p>
                                <p class="text-sm font-medium text-gray-900 dark:text-white">{{ report.nextRun }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex items-center gap-2 ml-6">
                        <button 
                            @click="sendReport(report.id)"
                            class="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            title="Send Report"
                        >
                            <PaperAirplaneIcon class="h-5 w-5" />
                        </button>
                        <button 
                            @click="deleteReport(report.id)"
                            class="p-2 text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                            title="Delete Report"
                        >
                            <TrashIcon class="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Schedule Report Modal -->
        <div
            v-if="showScheduleReportModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto py-8"
            @click.self="closeScheduleReportModal"
        >
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 my-auto flex flex-col max-h-[90vh]">
                <!-- Modal Header -->
                <div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div>
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">Schedule Report</h2>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Set up automated report delivery via email.</p>
                    </div>
                    <button
                        @click="closeScheduleReportModal"
                        class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <XMarkIcon class="h-6 w-6" />
                    </button>
                </div>

                <!-- Modal Content - Scrollable -->
                <div class="p-6 space-y-6 overflow-y-auto flex-1">
                    <!-- Report Name -->
                    <div>
                        <label for="reportName" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Report Name
                        </label>
                        <input
                            id="reportName"
                            type="text"
                            v-model="scheduleForm.reportName"
                            placeholder="e.g., Weekly Revenue Summary."
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <!-- Report Type and Frequency -->
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label for="reportType" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Report Type
                            </label>
                            <div class="relative">
                                <select
                                    id="reportType"
                                    v-model="scheduleForm.reportType"
                                    class="w-full px-4 py-2 pl-3 pr-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                >
                                    <option value="">Select report.</option>
                                    <option value="Revenue & P&L">Revenue & P&L</option>
                                    <option value="Driver Performance">Driver Performance</option>
                                    <option value="Trips Analytics">Trips Analytics</option>
                                    <option value="Fraud Analytics">Fraud Analytics</option>
                                </select>
                                <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <label for="frequency" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                                Frequency
                            </label>
                            <div class="relative">
                                <select
                                    id="frequency"
                                    v-model="scheduleForm.frequency"
                                    class="w-full px-4 py-2 pl-3 pr-10 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                                >
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                                <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Format -->
                    <div>
                        <label class="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                            Format
                        </label>
                        <div class="flex gap-3">
                            <button
                                @click="scheduleForm.format = 'CSV'"
                                :class="[
                                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    scheduleForm.format === 'CSV'
                                        ? 'bg-gray-900 dark:bg-gray-700 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                ]"
                            >
                                <DocumentIcon class="h-4 w-4" />
                                CSV
                            </button>
                            <button
                                @click="scheduleForm.format = 'XLSX'"
                                :class="[
                                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    scheduleForm.format === 'XLSX'
                                        ? 'bg-gray-900 dark:bg-gray-700 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                ]"
                            >
                                <DocumentIcon class="h-4 w-4" />
                                XLSX
                            </button>
                            <button
                                @click="scheduleForm.format = 'PDF'"
                                :class="[
                                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                    scheduleForm.format === 'PDF'
                                        ? 'bg-gray-900 dark:bg-gray-700 text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                ]"
                            >
                                <DocumentIcon class="h-4 w-4" />
                                PDF
                            </button>
                        </div>
                    </div>

                    <!-- Email Recipients -->
                    <div>
                        <label for="emailRecipients" class="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                            Email Recipients
                        </label>
                        <input
                            id="emailRecipients"
                            type="text"
                            v-model="scheduleForm.emailRecipients"
                            placeholder="email1@example.com, email2@example.com."
                            class="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Separate multiple emails with commas.</p>
                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <button
                        @click="closeScheduleReportModal"
                        class="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                    <button
                        @click="createSchedule"
                        class="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 flex items-center gap-2"
                    >
                        <ClockIcon class="h-4 w-4" />
                        Create Schedule
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { 
    CalendarDaysIcon,
    PlusIcon,
    TruckIcon,
    UserIcon,
    CurrencyDollarIcon,
    ShieldCheckIcon,
    ArrowPathIcon,
    StarIcon,
    PaperAirplaneIcon,
    TrashIcon,
    XMarkIcon,
    ClockIcon,
    DocumentIcon
} from '@heroicons/vue/24/outline'
import LineChart from '@/components/charts/LineChart.vue'
import BarChart from '@/components/charts/BarChart.vue'

// Tabs
const tabs = [
    { id: 'standard', label: 'Standard Reports' },
    { id: 'advanced', label: 'Advanced Analysis' },
    { id: 'scheduled', label: 'Scheduled Reports' }
]
const activeTab = ref('standard')

// Date Range
const selectedDateRange = ref('Last 30 days')
const showDateDropdown = ref(false)
const dateDropdownRef = ref<HTMLElement | null>(null)

const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'custom', label: 'Custom Range' }
]

const toggleDateDropdown = () => {
    showDateDropdown.value = !showDateDropdown.value
}

const selectDateRange = (value: string) => {
    const option = dateRangeOptions.find(opt => opt.value === value)
    if (option) {
        selectedDateRange.value = option.label
    }
    showDateDropdown.value = false
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
    if (dateDropdownRef.value && !dateDropdownRef.value.contains(event.target as Node)) {
        showDateDropdown.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

// Chart Data
const tripsByRegionChartData = ref({
    labels: ['Northland', 'Midwest', 'Southwest', 'Southeast', 'Northeast'],
    datasets: [{
        label: 'Trips',
        data: [12000, 8500, 11000, 9500, 13000],
        backgroundColor: '#374151',
        borderColor: '#374151',
        borderWidth: 1
    }]
})

const revenueCostsChartData = ref({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Revenue',
            data: [120000, 135000, 145000, 150000, 160000, 165000],
            borderColor: '#374151',
            backgroundColor: 'rgba(55, 65, 81, 0.1)',
            tension: 0.4,
            fill: false
        },
        {
            label: 'Costs',
            data: [80000, 85000, 90000, 95000, 100000, 105000],
            borderColor: '#6B7280',
            backgroundColor: 'rgba(107, 114, 128, 0.1)',
            borderDash: [5, 5],
            tension: 0.4,
            fill: false
        }
    ]
})

const barChartOptions = {
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
                stepSize: 5000
            }
        }
    }
}

const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top' as const
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 50000
            }
        }
    }
}

// Driver Performance Data
const driverPerformance = ref([
    {
        id: '1',
        name: 'James Wilson',
        trips: 488,
        acceptance: 98,
        completion: 96,
        rating: 4.8,
        revenue: 11343
    },
    {
        id: '2',
        name: 'Maria Gomez',
        trips: 389,
        acceptance: 99,
        completion: 98,
        rating: 4.9,
        revenue: 10234
    },
    {
        id: '3',
        name: 'Robert Taylor',
        trips: 312,
        acceptance: 94,
        completion: 95,
        rating: 4.8,
        revenue: 9987
    },
    {
        id: '4',
        name: 'Lisa Anderson',
        trips: 250,
        acceptance: 92,
        completion: 94,
        rating: 4.78,
        revenue: 8554
    }
])

// Demand Forecast Chart Data
const demandForecastChartData = ref({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
        {
            label: 'Historical',
            data: [4500, 4800, 5200, 5500, 5800, null, null],
            borderColor: '#374151',
            backgroundColor: 'rgba(55, 65, 81, 0.2)',
            tension: 0.4,
            fill: true,
            spanGaps: false
        },
        {
            label: 'Forecast',
            data: [null, null, null, null, 5800, 5500, 5000],
            borderColor: '#6B7280',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.4,
            fill: false,
            spanGaps: false
        }
    ]
})

const demandForecastChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'top' as const
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                stepSize: 2000
            }
        }
    },
    elements: {
        point: {
            radius: 0
        }
    }
}

// Driver Churn Risk Data
const churnRiskDrivers = ref([
    {
        id: '1',
        name: 'Alex Johnson',
        reason: 'Low earnings',
        risk: 85
    },
    {
        id: '2',
        name: 'Sarah Brown',
        reason: 'Decreased activity',
        risk: 72
    },
    {
        id: '3',
        name: 'Mike Davis',
        reason: 'Low ratings',
        risk: 68
    },
    {
        id: '4',
        name: 'Emma Wilson',
        reason: 'Competition',
        risk: 55
    }
])

// Cohort LTV:CAC Data
const cohortLTV = ref([
    {
        id: '1',
        month: 'Jan 2025',
        ltv: '$456.78 LTV',
        ratio: '10.08x'
    },
    {
        id: '2',
        month: 'Feb 2025',
        ltv: '$478.90 LTV',
        ratio: '11.35x'
    },
    {
        id: '3',
        month: 'Mar 2025',
        ltv: '$512.34 LTV',
        ratio: '12.85x'
    },
    {
        id: '4',
        month: 'Apr 2025',
        ltv: '$534.58 LTV',
        ratio: '13.90x'
    }
])

// Scheduled Reports Data
const scheduledReports = ref([
    {
        id: '1',
        name: 'Weekly Revenue Report',
        frequency: 'weekly',
        format: 'XLSX',
        type: 'Revenue & P&L',
        lastRun: '2025-10-12',
        nextRun: '2025-10-19'
    },
    {
        id: '2',
        name: 'Daily Driver Performance',
        frequency: 'daily',
        format: 'CSV',
        type: 'Driver Performance',
        lastRun: '2025-10-18',
        nextRun: '2025-10-19'
    }
])

// Schedule Report Modal
const showScheduleReportModal = ref(false)
const scheduleForm = ref({
    reportName: '',
    reportType: '',
    frequency: 'weekly',
    format: 'CSV',
    emailRecipients: ''
})

const openScheduleReportModal = () => {
    scheduleForm.value = {
        reportName: '',
        reportType: '',
        frequency: 'weekly',
        format: 'CSV',
        emailRecipients: ''
    }
    showScheduleReportModal.value = true
}

const closeScheduleReportModal = () => {
    showScheduleReportModal.value = false
}

const createSchedule = () => {
    if (!scheduleForm.value.reportName || !scheduleForm.value.reportType || !scheduleForm.value.emailRecipients) {
        alert('Please fill in all required fields.')
        return
    }
    
    // Add new scheduled report
    const newReport = {
        id: Date.now().toString(),
        name: scheduleForm.value.reportName,
        frequency: scheduleForm.value.frequency,
        format: scheduleForm.value.format,
        type: scheduleForm.value.reportType,
        lastRun: '-',
        nextRun: new Date().toISOString().split('T')[0]
    }
    
    scheduledReports.value.push(newReport)
    closeScheduleReportModal()
    console.log('Schedule created:', scheduleForm.value)
}

const sendReport = (reportId: string) => {
    console.log('Sending report:', reportId)
    // Handle send report logic here
}

const deleteReport = (reportId: string) => {
    console.log('Deleting report:', reportId)
    // Handle delete report logic here
    const index = scheduledReports.value.findIndex(r => r.id === reportId)
    if (index !== -1) {
        scheduledReports.value.splice(index, 1)
    }
}
</script>

