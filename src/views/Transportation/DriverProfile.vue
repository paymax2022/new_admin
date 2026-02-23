<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-5">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#0f172a]">Drivers & Riders Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Manage driver registrations, approvals, and accounts</p>
        </div>
      </div>

      <!-- Back + Actions -->
      <div class="flex items-center justify-between">
        <button class="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#0f172a]" @click="router.push({ name: 'transportationDriversAndRides' })">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div class="flex items-center gap-2">
          <button class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]">Send mail</button>
          <span v-if="isSuspended" class="rounded-md bg-[#fee2e2] px-4 py-2 text-sm font-medium text-[#dc2626]">Suspended</span>
          <button v-if="isSuspended" class="rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]" @click="openActivateModal">Activate Account</button>
          <button v-else class="rounded-md bg-[#dc2626] px-4 py-2 text-sm font-medium text-white hover:bg-[#b91c1c]" @click="showSuspendModal = true">Suspend</button>
        </div>
      </div>

      <!-- Driver profile summary -->
      <div class="rounded-xl border border-[#e5e7eb] bg-white p-5">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-center gap-4">
            <img src="https://i.pravatar.cc/96?img=33" alt="Driver" class="h-20 w-20 rounded-full object-cover" />
            <div>
              <h2 class="text-xl font-semibold text-[#0f172a]">{{ driver.name }}</h2>
              <div class="mt-1 flex flex-wrap items-center gap-2">
                <span v-if="!isSuspended" class="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-xs font-medium text-[#16a34a]">Active</span>
                <span v-if="isSuspended" class="rounded-full bg-[#fee2e2] px-2.5 py-0.5 text-xs font-medium text-[#dc2626]">Suspended</span>
                <span class="rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-xs font-medium text-[#64748b]">Standard</span>
              </div>
              <p class="mt-2 text-sm text-[#64748b]">{{ driver.email }}</p>
              <p class="text-sm text-[#64748b]">{{ driver.phone }}</p>
              <p class="mt-1 text-xs text-[#94a3b8]">Joined {{ driver.dateJoined }}</p>
            </div>
          </div>
          <div class="space-y-2 text-right">
            <p class="inline-flex items-center gap-1 text-sm text-[#0f172a]">
              <IconStar class="h-4 w-4 text-[#eab308]" />
              {{ driver.rating }} ({{ driver.ratingsCount }} ratings)
            </p>
            <p class="text-xs text-[#94a3b8]">{{ driver.lastActive }}</p>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <p class="text-xs text-[#64748b]">Total trips</p>
            <p class="mt-1 text-xl font-semibold text-[#0f172a]">{{ driver.totalTrips.toLocaleString() }}</p>
          </div>
          <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <p class="text-xs text-[#64748b]">Acceptance Rate</p>
            <p class="mt-1 text-xl font-semibold text-[#0f172a]">{{ driver.acceptanceRate }}%</p>
          </div>
          <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <p class="text-xs text-[#64748b]">Completion Rate</p>
            <p class="mt-1 text-xl font-semibold text-[#0f172a]">{{ driver.completionRate }}%</p>
          </div>
          <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <p class="text-xs text-[#64748b]">Total Earnings</p>
            <p class="mt-1 text-xl font-semibold text-[#0f172a]">{{ driver.totalEarnings }}</p>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="rounded-xl border border-[#e5e7eb] bg-white">
        <div class="border-b border-[#e5e7eb] px-4">
          <div class="flex gap-1 overflow-x-auto">
            <button
              v-for="tab in profileTabs"
              :key="tab"
              @click="activeProfileTab = tab"
              class="border-b-2 px-4 py-3 text-sm font-medium transition whitespace-nowrap"
              :class="activeProfileTab === tab ? 'border-[#0f172a] text-[#0f172a]' : 'border-transparent text-[#64748b] hover:text-[#0f172a]'"
            >
              {{ tab }}
            </button>
          </div>
        </div>

        <div v-if="activeProfileTab === 'Overview'" class="p-5 space-y-6">
          <!-- Charts row -->
          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <h4 class="text-sm font-semibold text-[#0f172a]">Performance Trend</h4>
              <p class="text-xs text-[#64748b]">Last 4 weeks</p>
              <div class="mt-3 h-32">
                <svg viewBox="0 0 280 128" class="h-full w-full">
                  <path d="M0,100 Q70,80 140,60 T280,40 L280,128 L0,128 Z" fill="rgba(37,99,235,0.15)"/>
                  <path d="M0,100 Q70,80 140,60 T280,40" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <h4 class="text-sm font-semibold text-[#0f172a]">Weekly Trips</h4>
              <p class="text-xs text-[#64748b]">This week</p>
              <div class="mt-3 flex h-32 items-end gap-1">
                <div v-for="(v, i) in weeklyTrips" :key="i" class="flex-1 rounded-t bg-[#3b82f6]" :style="{ height: v + '%' }"></div>
              </div>
              <div class="mt-2 flex justify-between text-[10px] text-[#64748b]">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <h4 class="text-sm font-semibold text-[#0f172a]">Monthly Earnings</h4>
              <p class="text-xs text-[#64748b]">Last 7 months</p>
              <div class="mt-3 h-32">
                <svg viewBox="0 0 280 128" class="h-full w-full">
                  <path d="M0,100 L40,90 L80,95 L120,70 L160,75 L200,50 L240,55 L280,30 L280,128 L0,128 Z" fill="rgba(34,197,94,0.2)"/>
                  <path d="M0,100 L40,90 L80,95 L120,70 L160,75 L200,50 L240,55 L280,30" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Two columns: Personal + Bank | Vehicle + Performance -->
          <div class="grid gap-6 lg:grid-cols-2">
            <div class="space-y-5">
              <div>
                <h4 class="text-sm font-semibold text-[#0f172a]">Personal Information</h4>
                <div class="mt-2 space-y-2 text-sm">
                  <p><span class="text-[#64748b]">Full Name:</span> {{ driver.name }}</p>
                  <p><span class="text-[#64748b]">Email Address:</span> {{ driver.email }}</p>
                  <p><span class="text-[#64748b]">Phone Number:</span> {{ driver.phone }}</p>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="text-sm font-semibold text-[#0f172a]">Bank Details</h4>
                  <span class="rounded bg-[#dcfce7] px-2 py-0.5 text-xs font-medium text-[#16a34a]">Verified</span>
                </div>
                <div class="mt-2 space-y-2 text-sm">
                  <p><span class="text-[#64748b]">Account Name:</span> {{ driver.name }}</p>
                  <p><span class="text-[#64748b]">Bank Name:</span> Chase Bank</p>
                  <p><span class="text-[#64748b]">Account Number:</span> ****-1234</p>
                </div>
              </div>
            </div>

            <div class="space-y-5">
              <div>
                <h4 class="text-sm font-semibold text-[#0f172a]">Vehicle Information</h4>
                <div class="mt-2 space-y-2 text-sm">
                  <p><span class="text-[#64748b]">Vehicle:</span> 2022 Toyota Camry</p>
                  <p><span class="text-[#64748b]">Details:</span> Silver • 4 seats</p>
                  <p><span class="text-[#64748b]">License Plate:</span> ABC-1234</p>
                  <p><span class="text-[#64748b]">Address:</span> 1234 Main Street, Apt 8B, San Francisco, CA 94102, United States</p>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-[#0f172a]">Performance Metrics</h4>
                <div class="mt-3 space-y-3">
                  <div>
                    <div class="flex justify-between text-xs"><span>Acceptance Rate</span><span>98%</span></div>
                    <div class="mt-1 h-1.5 rounded-full bg-[#e5e7eb]"><div class="h-full w-[98%] rounded-full bg-[#16a34a]"></div></div>
                  </div>
                  <div>
                    <div class="flex justify-between text-xs"><span>Completion Rate</span><span>98%</span></div>
                    <div class="mt-1 h-1.5 rounded-full bg-[#e5e7eb]"><div class="h-full w-[98%] rounded-full bg-[#16a34a]"></div></div>
                  </div>
                  <div>
                    <div class="flex justify-between text-xs"><span>On-Time Percentage</span><span>94%</span></div>
                    <div class="mt-1 h-1.5 rounded-full bg-[#e5e7eb]"><div class="h-full w-[94%] rounded-full bg-[#16a34a]"></div></div>
                  </div>
                  <div class="grid grid-cols-2 gap-2 pt-2 text-sm">
                    <p><span class="text-[#64748b]">Avg Response Time:</span> 12s</p>
                    <p><span class="text-[#64748b]">Total Hours:</span> 1247h</p>
                    <p><span class="text-[#64748b]">Avg Trip Distance:</span> 8.5 mi</p>
                    <p><span class="text-[#64748b]">Avg Trip Duration:</span> 16 min</p>
                    <p><span class="text-[#64748b]">Peak Hours %:</span> 65%</p>
                    <p><span class="text-[#64748b]">Tips Earned:</span> ₦25,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeProfileTab === 'Trips'" class="p-5">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="text-sm font-semibold text-[#0f172a]">Recent Trips</h4>
            <button class="inline-flex items-center gap-2 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[900px] border-collapse">
              <thead>
                <tr class="border-y border-[#e5e7eb] bg-[#fcfcfd] text-left text-xs font-semibold text-[#64748b]">
                  <th class="px-3 py-3">Trip ID</th>
                  <th class="px-3 py-3">Date & Time</th>
                  <th class="px-3 py-3">Route</th>
                  <th class="px-3 py-3">Distance</th>
                  <th class="px-3 py-3">Duration</th>
                  <th class="px-3 py-3">Fare</th>
                  <th class="px-3 py-3">Rating</th>
                  <th class="px-3 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="trip in recentTrips" :key="trip.id" class="border-b border-[#f1f5f9] text-sm text-[#0f172a]">
                  <td class="px-3 py-3 font-medium">{{ trip.id }}</td>
                  <td class="px-3 py-3 text-[#334155]">{{ trip.dateTime }}</td>
                  <td class="px-3 py-3 text-[#334155]">{{ trip.route }}</td>
                  <td class="px-3 py-3 text-[#334155]">{{ trip.distance }}</td>
                  <td class="px-3 py-3 text-[#334155]">{{ trip.duration }}</td>
                  <td class="px-3 py-3 text-[#334155]">{{ trip.fare }}</td>
                  <td class="px-3 py-3">
                    <span class="inline-flex items-center gap-1">
                      <IconStar class="h-3.5 w-3.5 text-[#eab308]" />
                      {{ trip.rating }}
                    </span>
                  </td>
                  <td class="px-3 py-3 text-[#16a34a]">{{ trip.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="activeProfileTab === 'Earnings'" class="p-5 space-y-6">
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-xs text-[#64748b]">Total Earnings</p>
              <p class="mt-1 text-xl font-semibold text-[#0f172a]">₦125,000</p>
              <p class="mt-0.5 text-xs text-[#94a3b8]">All time</p>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-xs text-[#64748b]">This Month</p>
              <p class="mt-1 text-xl font-semibold text-[#0f172a]">₦125,000</p>
              <p class="mt-0.5 text-xs text-[#16a34a]">+12.5%</p>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-xs text-[#64748b]">Avg Per Trip</p>
              <p class="mt-1 text-xl font-semibold text-[#0f172a]">₦125,000</p>
              <p class="mt-0.5 text-xs text-[#94a3b8]">Last 30 days</p>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-xs text-[#64748b]">Avg Per Hour</p>
              <p class="mt-1 text-xl font-semibold text-[#0f172a]">₦125,000</p>
              <p class="mt-0.5 text-xs text-[#94a3b8]">Last 30 days</p>
            </div>
          </div>

          <div class="rounded-lg border border-[#e5e7eb] bg-white p-4">
            <div class="mb-4 flex items-center justify-between">
              <h4 class="text-sm font-semibold text-[#0f172a]">Earnings History</h4>
              <button class="rounded-md border border-[#e5e7eb] px-3 py-2 text-xs text-[#475569] hover:bg-[#f8fafc]">Download Statement</button>
            </div>
            <div class="h-56 rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <svg viewBox="0 0 400 200" class="h-full w-full">
                <path d="M0,160 L50,140 L100,150 L150,90 L200,100 L250,60 L300,70 L350,40 L400,55 L400,200 L0,200 Z" fill="rgba(148,163,184,0.3)"/>
                <path d="M0,160 L50,140 L100,150 L150,90 L200,100 L250,60 L300,70 L350,40 L400,55" fill="none" stroke="#94a3b8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>

          <div>
            <h4 class="mb-4 text-sm font-semibold text-[#0f172a]">Earnings Breakdown</h4>
            <div class="space-y-3">
              <div class="flex items-start justify-between rounded-lg border border-[#e5e7eb] bg-white p-4">
                <div>
                  <p class="text-sm font-medium text-[#0f172a]">Trip Fares</p>
                  <p class="mt-0.5 text-xs text-[#64748b]">Base earnings from completed trips</p>
                </div>
                <p class="text-sm font-semibold text-[#0f172a]">₦125,000</p>
              </div>
              <div class="flex items-start justify-between rounded-lg border border-[#e5e7eb] bg-white p-4">
                <div>
                  <p class="text-sm font-medium text-[#0f172a]">Tips</p>
                  <p class="mt-0.5 text-xs text-[#64748b]">Passenger tips</p>
                </div>
                <p class="text-sm font-semibold text-[#0f172a]">₦125,000</p>
              </div>
              <div class="flex items-start justify-between rounded-lg border border-[#e5e7eb] bg-white p-4">
                <div>
                  <p class="text-sm font-medium text-[#0f172a]">Platform Fees</p>
                  <p class="mt-0.5 text-xs text-[#64748b]">Commission and service charges</p>
                </div>
                <p class="text-sm font-semibold text-[#dc2626]">-₦125,000</p>
              </div>
              <div class="flex items-start justify-between rounded-lg border border-[#e5e7eb] bg-white p-4">
                <div>
                  <p class="text-sm font-medium text-[#0f172a]">Adjustments</p>
                  <p class="mt-0.5 text-xs text-[#64748b]">Bonuses, refunds, and corrections</p>
                </div>
                <p class="text-sm font-semibold text-[#16a34a]">+₦125,000</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeProfileTab === 'Documents'" class="p-5">
          <h4 class="mb-4 text-sm font-semibold text-[#0f172a]">Required Documents</h4>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[500px] border-collapse">
              <thead>
                <tr class="border-y border-[#e5e7eb] bg-[#fcfcfd] text-left text-xs font-semibold text-[#64748b]">
                  <th class="px-3 py-3">Document Type</th>
                  <th class="px-3 py-3">Status</th>
                  <th class="px-3 py-3">Upload Date</th>
                  <th class="px-3 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="doc in requiredDocuments" :key="doc.type" class="border-b border-[#f1f5f9] text-sm text-[#0f172a]">
                  <td class="px-3 py-3 font-medium">{{ doc.type }}</td>
                  <td class="px-3 py-3">
                    <span class="inline-flex items-center gap-1.5 text-[#16a34a]">
                      <IconCircleCheck class="h-4 w-4" />
                      {{ doc.status }}
                    </span>
                  </td>
                  <td class="px-3 py-3 text-[#334155]">{{ doc.uploadDate }}</td>
                  <td class="px-3 py-3 text-right">
                    <div class="inline-flex items-center gap-2">
                      <button class="rounded p-1.5 text-[#64748b] hover:bg-[#f8fafc]" title="View">
                        <IconEye class="h-4 w-4" />
                      </button>
                      <button class="rounded p-1.5 text-[#64748b] hover:bg-[#f8fafc]" title="Download">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="activeProfileTab === 'Reviews'" class="p-5 space-y-6">
          <div class="grid gap-4 md:grid-cols-4">
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4 text-center">
              <p class="inline-flex items-center gap-1 text-2xl font-semibold text-[#0f172a]">
                <IconStar class="h-6 w-6 text-[#eab308]" />
                {{ driver.rating }}
              </p>
              <p class="mt-1 text-xs text-[#64748b]">1847 total ratings</p>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-white p-4">
              <p class="text-xs text-[#64748b]">5-Star Ratings</p>
              <p class="mt-1 text-lg font-semibold text-[#0f172a]">1,654</p>
              <p class="mt-0.5 text-xs text-[#94a3b8]">89.5% of total</p>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-white p-4">
              <p class="text-xs text-[#64748b]">4-Star Ratings</p>
              <p class="mt-1 text-lg font-semibold text-[#0f172a]">156</p>
              <p class="mt-0.5 text-xs text-[#94a3b8]">8.4% of total</p>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-white p-4">
              <p class="text-xs text-[#64748b]">Below 4 Stars</p>
              <p class="mt-1 text-lg font-semibold text-[#0f172a]">37</p>
              <p class="mt-0.5 text-xs text-[#94a3b8]">2.0% of total</p>
            </div>
          </div>

          <div>
            <h4 class="mb-4 text-sm font-semibold text-[#0f172a]">Recent Reviews</h4>
            <div class="space-y-4">
              <div v-for="review in recentReviews" :key="review.tripId" class="rounded-lg border border-[#e5e7eb] bg-white p-4">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-sm font-medium text-[#0f172a]">{{ review.name }}</p>
                    <p class="mt-1 text-sm text-[#eab308]">{{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}</p>
                    <p class="mt-1 text-xs text-[#64748b]">{{ review.dateTime }} · {{ review.tripId }}</p>
                    <p class="mt-2 text-sm text-[#334155]">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeProfileTab === 'Activity'" class="p-5">
          <h4 class="mb-4 text-sm font-semibold text-[#0f172a]">Activity Log</h4>
          <div class="space-y-3">
            <div
              v-for="(item, i) in activityLog"
              :key="i"
              class="flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4"
            >
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b]">
                <svg v-if="item.iconType === 'car'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h8m-8 4h8m-5-7l-2 6H5l2-6zm14 0l-2 6h-3l2-6zM5 17h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z" />
                </svg>
                <svg v-else-if="item.iconType === 'bolt'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <svg v-else-if="item.iconType === 'dollar'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg v-else-if="item.iconType === 'person'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <IconStar v-else-if="item.iconType === 'star'" class="h-4 w-4 text-[#eab308]" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-[#0f172a]">{{ item.title }}</p>
                <p class="mt-0.5 text-sm text-[#64748b]">{{ item.description }}</p>
                <p class="mt-2 text-xs text-[#94a3b8]">{{ item.timestamp }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="min-h-[200px] p-8 text-center text-sm text-[#94a3b8]">
          Content for {{ activeProfileTab }} tab.
        </div>
      </div>
    </div>

    <!-- Suspend Driver modal -->
    <div
      v-if="showSuspendModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
      @click="showSuspendModal = false"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold text-[#0f172a]">Suspend Driver?</h3>
          <button class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]" @click="showSuspendModal = false">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="mt-3 text-sm text-[#64748b]">
          Are you sure you want to suspend {{ driver.name }}? They will not be able to accept any rides until reactivated.
        </p>
        <div class="mt-4">
          <label class="block text-sm font-medium text-[#334155]">Reason for Suspension</label>
          <textarea
            v-model="suspendReason"
            rows="3"
            placeholder="Please provide a reason for suspension...."
            class="mt-1.5 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
          ></textarea>
        </div>
        <div class="mt-4 flex items-start gap-3 rounded-lg bg-[#fef2f2] p-3">
          <svg class="h-5 w-5 shrink-0 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="text-sm text-[#991b1b]">
            Suspending this driver will immediately block access and freeze all wallet transactions.
          </p>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]" @click="showSuspendModal = false">
            Cancel
          </button>
          <button class="rounded-md bg-[#dc2626] px-4 py-2 text-sm font-medium text-white hover:bg-[#b91c1c]" @click="confirmSuspend">
            Suspend Driver
          </button>
        </div>
      </div>
    </div>

    <!-- Activate Driver modal -->
    <div
      v-if="showActivateModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4"
      @click="showActivateModal = false"
    >
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold text-[#0f172a]">Activate Driver?</h3>
          <button class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]" @click="showActivateModal = false">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="mt-3 text-sm text-[#64748b]">
          Are you sure you want to activate {{ driver.name }}? They will be able to start accepting rides again.
        </p>
        <div class="mt-6 flex justify-end gap-3">
          <button class="rounded-md border border-[#e5e7eb] px-4 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]" @click="showActivateModal = false">
            Cancel
          </button>
          <button class="rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]" @click="confirmActivate">
            Activate Driver
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconStar from '@/components/icon/icon-star.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconEye from '@/components/icon/icon-eye.vue';

const route = useRoute();
const router = useRouter();
const driverId = computed(() => route.params.id as string);
const isSuspended = computed(() => route.query.suspended === 'true');

const driver = ref({
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+1 (555) 123-4567',
  dateJoined: '2023-03-15',
  rating: '4.92',
  ratingsCount: 1947,
  lastActive: '1 day active, 2 hours ago',
  totalTrips: 2847,
  acceptanceRate: 96,
  completionRate: 96,
  totalEarnings: '₦125,000',
});

const profileTabs = ['Overview', 'Trips', 'Earnings', 'Documents', 'Reviews', 'Activity'];
const activeProfileTab = ref('Overview');
const showSuspendModal = ref(false);
const suspendReason = ref('');
const showActivateModal = ref(false);
const weeklyTrips = [60, 75, 85, 70, 90, 55, 80];

const confirmSuspend = () => {
  showSuspendModal.value = false;
  suspendReason.value = '';
  router.push({ name: 'transportationDriversAndRides' });
};

const openActivateModal = () => {
  showActivateModal.value = true;
};

const confirmActivate = () => {
  showActivateModal.value = false;
  router.push({ name: 'transportationDriversAndRides' });
};

const recentReviews = ref([
  { name: 'Michael Johnson', rating: 5, dateTime: '2025-10-18 at 14:50', tripId: 'TRP-2847', comment: 'Great driver! Very friendly and professional.' },
  { name: 'Emily Davis', rating: 5, dateTime: '2025-10-19 at 13:40', tripId: 'TRP-2846', comment: 'Clean car, smooth ride. Highly recommend!' },
  { name: 'Robert Wilson', rating: 4, dateTime: '2025-10-19 at 12:06', tripId: 'TRP-2848', comment: 'Good service overall.' },
  { name: 'Lisa Anderson', rating: 5, dateTime: '2025-10-18 at 10:45', tripId: 'TRP-2844', comment: 'Excellent driver, knows all the shortcuts!' },
  { name: 'David Martinez', rating: 4, dateTime: '2025-10-18 at 19:25', tripId: 'TRP-2845', comment: 'Nice and punctual.' },
]);

const requiredDocuments = ref([
  { type: 'Driver License', status: 'Verified', uploadDate: '2023-03-15' },
  { type: 'Vehicle Registration', status: 'Verified', uploadDate: '2023-03-15' },
]);

const activityLog = ref([
  { iconType: 'car', title: 'Trip Completed', description: 'Completed trip TRP-2847 - $15.50 earned', timestamp: '2023-10-10 14:32' },
  { iconType: 'car', title: 'Trip Completed', description: 'Completed trip TRP-2846 - $28.75 earned', timestamp: '2023-10-10 13:45' },
  { iconType: 'bolt', title: 'Online', description: 'Driver went online in Downtown zone', timestamp: '2023-10-10 10:00' },
  { iconType: 'dollar', title: 'Payout Received', description: 'Weekly payout of $1,234.50 processed', timestamp: '2023-10-09 09:00' },
  { iconType: 'person', title: 'Profile Updated', description: 'Phone number updated', timestamp: '2023-10-09 11:29' },
  { iconType: 'star', title: 'Rating Received', description: 'Received 5-star rating from passenger', timestamp: '2023-10-09 10:45' },
  { iconType: 'bolt', title: 'Offline', description: 'Driver went offline', timestamp: '2023-10-09 07:30' },
]);

const recentTrips = ref([
  { id: 'TRP-2847', dateTime: '2025-10-19 14:32', route: '123 Market St / 456 Mission St', distance: '4.2 mi', duration: '15 min', fare: '₦125,000', rating: 5, status: 'completed' },
  { id: 'TRP-2846', dateTime: '2025-10-19 11:15', route: '789 Oak Ave / 321 Pine St', distance: '6.1 mi', duration: '22 min', fare: '₦125,000', rating: 4, status: 'completed' },
  { id: 'TRP-2845', dateTime: '2025-10-18 18:45', route: '555 Broadway / 100 Main St', distance: '3.8 mi', duration: '12 min', fare: '₦125,000', rating: 5, status: 'completed' },
  { id: 'TRP-2844', dateTime: '2025-10-18 09:20', route: '222 Union Sq / 444 Castro St', distance: '5.5 mi', duration: '18 min', fare: '₦125,000', rating: 4, status: 'completed' },
]);
</script>
