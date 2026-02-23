<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-5">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[30px] font-semibold leading-tight text-[#111827]">Riders Management</h1>
          <p class="mt-1 text-sm text-[#64748b]">Manage rider registrations, approvals, and accounts.</p>
        </div>
      </div>

      <!-- Back + Rider Profile + Actions -->
      <div class="flex items-center justify-between">
        <div class="inline-flex items-center gap-2">
          <button class="inline-flex items-center gap-2 text-sm text-[#475569] hover:text-[#0f172a]" @click="goBack">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <span class="text-[#94a3b8]">|</span>
          <span class="text-sm font-medium text-[#111827]">Rider Profile</span>
          <span class="text-sm text-[#64748b]">({{ riderId || 'DRIVER_ID' }})</span>
        </div>
        <div class="flex items-center gap-2">
          <button class="inline-flex items-center gap-2 rounded-md border border-[#e5e7eb] px-4 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]">
            <IconSend class="h-4 w-4" />
            Send mail
          </button>
          <span v-if="isSuspended" class="rounded-md bg-[#fee2e2] px-4 py-2 text-sm font-medium text-[#dc2626]">Suspended</span>
          <button v-if="isSuspended" class="rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]" @click="showActivateModal = true">Activate Account</button>
          <button v-else class="inline-flex items-center gap-2 rounded-md bg-[#dc2626] px-4 py-2 text-sm font-medium text-white hover:bg-[#b91c1c]" @click="suspendReason = ''; showSuspendModal = true">
            <IconBan class="h-4 w-4" />
            Suspend
          </button>
        </div>
      </div>

      <!-- Rider profile summary -->
      <div class="rounded-xl border border-[#e5e7eb] bg-white p-5">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-center gap-4">
            <img :src="rider.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face'" alt="Rider" class="h-20 w-20 rounded-full object-cover" />
            <div>
              <h2 class="text-xl font-semibold text-[#0f172a]">{{ rider.name }}</h2>
              <div class="mt-1 flex flex-wrap items-center gap-2">
                <span v-if="!isSuspended" class="rounded-full bg-[#dcfce7] px-2.5 py-0.5 text-xs font-medium text-[#15803d]">Active</span>
                <span v-if="isSuspended" class="rounded-full bg-[#fee2e2] px-2.5 py-0.5 text-xs font-medium text-[#dc2626]">Suspended</span>
                <span class="rounded-full bg-[#f1f5f9] px-2.5 py-0.5 text-xs font-medium text-[#64748b]">Standard</span>
              </div>
              <p class="mt-2 text-sm text-[#64748b]">{{ rider.email }}</p>
              <p class="text-sm text-[#64748b]">{{ rider.phone }}</p>
              <p class="mt-1 text-xs text-[#94a3b8]">Joined {{ rider.dateJoined }}</p>
            </div>
          </div>
          <div class="space-y-2 text-right">
            <p class="inline-flex items-center gap-1 text-sm text-[#0f172a]">
              <IconStar class="h-4 w-4 text-[#eab308]" />
              {{ rider.rating }} ({{ rider.ratingsCount }} ratings)
            </p>
            <p class="text-xs text-[#94a3b8]">Last active: {{ rider.lastActive }}</p>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <p class="text-xs text-[#64748b]">Total Trips</p>
            <p class="mt-1 text-xl font-semibold text-[#0f172a]">{{ rider.totalTrips.toLocaleString() }}</p>
          </div>
          <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <p class="text-xs text-[#64748b]">Acceptance Rate</p>
            <p class="mt-1 text-xl font-semibold text-[#0f172a]">{{ rider.acceptanceRate }}%</p>
          </div>
          <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <p class="text-xs text-[#64748b]">Completion Rate</p>
            <p class="mt-1 text-xl font-semibold text-[#0f172a]">{{ rider.completionRate }}%</p>
          </div>
          <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
            <p class="text-xs text-[#64748b]">Total Earnings</p>
            <p class="mt-1 text-xl font-semibold text-[#0f172a]">{{ rider.totalEarnings }}</p>
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

        <div v-if="activeProfileTab === 'Overview'" class="space-y-6 p-5">
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
              <p class="text-xs text-[#64748b]">Last 12 months</p>
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
                  <p><span class="text-[#64748b]">Full Name:</span> {{ rider.name }}</p>
                  <p><span class="text-[#64748b]">Email Address:</span> {{ rider.email }}</p>
                  <p><span class="text-[#64748b]">Phone Number:</span> {{ rider.phone }}</p>
                </div>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="text-sm font-semibold text-[#0f172a]">Bank Details</h4>
                  <span class="rounded bg-[#dcfce7] px-2 py-0.5 text-xs font-medium text-[#16a34a]">Verified</span>
                </div>
                <div class="mt-2 space-y-2 text-sm">
                  <p><span class="text-[#64748b]">Account Holder:</span> {{ rider.name }}</p>
                  <p><span class="text-[#64748b]">Bank Name:</span> Chaso Bank</p>
                  <p><span class="text-[#64748b]">Account Number:</span> ****1234</p>
                </div>
              </div>
            </div>

            <div class="space-y-5">
              <div>
                <h4 class="text-sm font-semibold text-[#0f172a]">Vehicle Information</h4>
                <div class="mt-2 space-y-2 text-sm">
                  <p><span class="text-[#64748b]">Vehicle:</span> 2022 Toyota Camry</p>
                  <p><span class="text-[#64748b]">Details:</span> Silver • Sedan • 4 seats</p>
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
                    <p><span class="text-[#64748b]">Avg Trip Duration:</span> 18 min</p>
                    <p><span class="text-[#64748b]">Peak Hours %:</span> 65%</p>
                    <p><span class="text-[#64748b]">Tips Month:</span> ₩25,000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activeProfileTab === 'Trips'" class="p-5">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="text-sm font-semibold text-[#0f172a]">Recent Delivery Trips</h4>
            <button class="inline-flex items-center gap-2 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#475569] hover:bg-[#f8fafc]">
              <IconDownload class="h-4 w-4" />
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

        <div v-else-if="activeProfileTab === 'Earnings'" class="space-y-6 p-5">
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-xs text-[#64748b]">Total Earnings</p>
              <p class="mt-1 text-xl font-semibold text-[#0f172a]">₦125,000</p>
              <p class="mt-0.5 text-xs text-[#94a3b8]">60 trips</p>
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
                        <IconDownload class="h-4 w-4" />
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
                {{ rider.rating }}
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
            <div class="grid gap-4 md:grid-cols-2">
              <div v-for="review in recentReviews" :key="review.tripId" class="rounded-lg border border-[#e5e7eb] bg-white p-4">
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

        <div v-else-if="activeProfileTab === 'Activity'" class="p-5">
          <h4 class="mb-4 text-sm font-semibold text-[#0f172a]">Activity Log</h4>
          <div class="space-y-3">
            <div
              v-for="(item, i) in activityLog"
              :key="i"
              class="flex items-start gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4"
            >
              <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f1f5f9] text-[#64748b] [&_svg]:h-4 [&_svg]:w-4">
                <IconCar v-if="item.iconType === 'car'" />
                <IconBolt v-else-if="item.iconType === 'bolt'" />
                <IconDollarSign v-else-if="item.iconType === 'dollar'" class="text-[#16a34a]" />
                <IconUser v-else-if="item.iconType === 'person'" />
                <IconStar v-else-if="item.iconType === 'star'" class="text-[#eab308]" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-[#0f172a]">{{ item.title }}</p>
                <p class="mt-0.5 text-sm text-[#64748b]">{{ item.description }}</p>
                <p class="mt-2 text-xs text-[#94a3b8]">{{ item.timestamp }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activate Driver modal -->
    <div v-if="showActivateModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4" @click="showActivateModal = false">
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold text-[#0f172a]">Activate Driver?</h3>
          <button type="button" class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]" @click="showActivateModal = false">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <p class="mt-3 text-sm text-[#64748b]">Are you sure you want to activate {{ rider.name }}? They will be able to start accepting rides again.</p>
        <div class="mt-6 flex justify-end gap-3">
          <button type="button" class="rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]" @click="showActivateModal = false">Cancel</button>
          <button type="button" class="rounded-md bg-[#0f172a] px-4 py-2 text-sm font-medium text-white hover:bg-[#1e293b]" @click="confirmActivate">Activate Driver</button>
        </div>
      </div>
    </div>

    <!-- Suspend Driver modal -->
    <div v-if="showSuspendModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4" @click="showSuspendModal = false">
      <div class="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="flex items-start justify-between">
          <h3 class="text-lg font-semibold text-[#0f172a]">Suspend Driver?</h3>
          <button type="button" class="rounded-md p-1 text-[#64748b] hover:bg-[#f8fafc]" @click="showSuspendModal = false">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="mt-3 text-sm text-[#64748b]">Are you sure you want to suspend {{ rider.name }}? They will not be able to accept any rides until reactivated.</p>
        <div class="mt-4">
          <label class="block text-sm font-medium text-[#334155]">Reason for Suspension</label>
          <textarea
            v-model="suspendReason"
            rows="3"
            placeholder="Please provide a reason for suspension..."
            class="mt-1.5 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm text-[#0f172a] placeholder:text-[#94a3b8] outline-none focus:border-[#cbd5e1]"
          />
        </div>
        <div class="mt-4 flex items-start gap-3 rounded-lg bg-[#fef2f2] p-3">
          <svg class="h-5 w-5 shrink-0 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p class="text-sm text-[#991b1b]">Suspending this driver will immediately block access and freeze all wallet transactions.</p>
        </div>
        <div class="mt-6 flex justify-end gap-3">
          <button type="button" class="rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-medium text-[#475569] hover:bg-[#f8fafc]" @click="showSuspendModal = false">Cancel</button>
          <button type="button" class="rounded-md bg-[#dc2626] px-4 py-2 text-sm font-medium text-white hover:bg-[#b91c1c]" @click="confirmSuspend">Suspend Driver</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconStar from '@/components/icon/icon-star.vue';
import IconSend from '@/components/icon/icon-send.vue';
import IconBan from '@/components/icon/icon-ban.vue';
import IconDownload from '@/components/icon/icon-download.vue';
import IconCircleCheck from '@/components/icon/icon-circle-check.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconBolt from '@/components/icon/icon-bolt.vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconUser from '@/components/icon/icon-user.vue';

const route = useRoute();
const router = useRouter();
const riderId = computed(() => route.params.id as string);

const riderFromState = typeof window !== 'undefined' ? (history.state as { rider?: { name: string; riderId: string; status?: string; earnings?: string; lastActive?: string; deliveries?: string; rating?: string } })?.rider : undefined;
const isSuspended = riderFromState?.status === 'Suspended';

const rider = ref({
  name: riderFromState?.name ?? 'John Smith',
  email: 'john.smith@email.com',
  phone: '+1 (555) 123-4897',
  dateJoined: '2023-03-15',
  rating: riderFromState?.rating ?? '4.82',
  ratingsCount: 1947,
  lastActive: riderFromState?.lastActive ?? '2 hours ago',
  totalTrips: Number(riderFromState?.deliveries ?? 2847) || 2847,
  acceptanceRate: 96,
  completionRate: 96,
  totalEarnings: riderFromState?.earnings ?? '₩125,000',
  avatarUrl: '',
});

const profileTabs = ['Overview', 'Trips', 'Earnings', 'Documents', 'Reviews', 'Activity'];
const activeProfileTab = ref('Overview');
const showSuspendModal = ref(false);
const showActivateModal = ref(false);
const suspendReason = ref('');
const weeklyTrips = [60, 75, 85, 70, 90, 55, 80];

const recentTrips = ref([
  { id: 'TRP-2847', dateTime: '2025-10-19 14:32', route: '123 Market St / 456 Mission St', distance: '4.2 mi', duration: '15 min', fare: '₦125,000', rating: 5, status: 'completed' },
  { id: 'TRP-2846', dateTime: '2025-10-19 13:15', route: '789 Oak Ave / 321 Pine St', distance: '7.8 mi', duration: '22 min', fare: '₦125,000', rating: 5, status: 'completed' },
  { id: 'TRP-2845', dateTime: '2025-10-19 11:45', route: '555 Broadway / 100 Main St', distance: '3.5 mi', duration: '12 min', fare: '₦125,000', rating: 4, status: 'completed' },
  { id: 'TRP-2844', dateTime: '2025-10-19 10:20', route: '222 Union Sq / 444 Castro St', distance: '5.1 mi', duration: '18 min', fare: '₦125,000', rating: 5, status: 'completed' },
  { id: 'TRP-2843', dateTime: '2025-10-18 18:05', route: '100 First St / 200 Second St', distance: '2.8 mi', duration: '14 min', fare: '₦125,000', rating: 4, status: 'completed' },
]);

const requiredDocuments = ref([
  { type: 'Driver License', status: 'Verified', uploadDate: '2023-03-15' },
  { type: 'Vehicle Registration', status: 'Verified', uploadDate: '2023-03-15' },
]);

const recentReviews = ref([
  { name: 'Michael Johnson', rating: 5, dateTime: '2025-10-19 at 14:50', tripId: 'TRP-2517', comment: 'Great driver! Very friendly and professional.' },
  { name: 'Emily Davis', rating: 5, dateTime: '2025-10-19 at 13:40', tripId: 'TRP-2546', comment: 'Clean car, smooth ride. Highly recommend!' },
  { name: 'Robert Wilson', rating: 4, dateTime: '2025-10-19 at 12:05', tripId: 'TRP-2540', comment: 'Good service overall.' },
  { name: 'Lisa Anderson', rating: 5, dateTime: '2025-10-19 at 10:45', tripId: 'TRP-2544', comment: 'Excellent driver, knows all the shortcuts!' },
  { name: 'David Martinez', rating: 4, dateTime: '2025-10-18 at 19:25', tripId: 'TRP-2543', comment: 'Nice and punctual.' },
]);

const activityLog = ref([
  { iconType: 'car', title: 'Trip Completed', description: 'Completed trip TRP-2847 - $18.50 earned', timestamp: '2023-10-10 15:58' },
  { iconType: 'car', title: 'Trip Completed', description: 'Completed trip TRP-2846 - $28.75 earned', timestamp: '2023-10-10 12:00' },
  { iconType: 'bolt', title: 'Online', description: 'Driver went online in Downtown zone', timestamp: '2023-10-10 10:00' },
  { iconType: 'dollar', title: 'Payout Received', description: 'Weekly payout of $1,234.50 processed', timestamp: '2023-10-10 09:00' },
  { iconType: 'person', title: 'Profile Updated', description: 'Phone number updated', timestamp: '2023-10-10 11:25' },
  { iconType: 'star', title: 'Rating Received', description: 'Received 5-star rating from passenger', timestamp: '2023-10-09 16:40' },
  { iconType: 'bolt', title: 'Offline', description: 'Driver went offline', timestamp: '2023-10-09 17:30' },
]);

function goBack() {
  router.push({ name: 'transportationRidersManagement' });
}

function confirmSuspend() {
  showSuspendModal.value = false;
  suspendReason.value = '';
  router.push({ name: 'transportationRidersManagement' });
}

function confirmActivate() {
  showActivateModal.value = false;
  router.push({ name: 'transportationRidersManagement' });
}
</script>
