<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1220px] space-y-5">
      <!-- Header -->
      <div>
        <h1 class="text-2xl font-bold leading-tight text-[#333]">Payments & Wallet</h1>
        <p class="mt-1 text-sm text-[#6b7280]">Manage transactions, refunds, and payouts</p>
      </div>

      <!-- Tabs -->
      <div class="border-b border-[#e5e7eb]">
        <div class="flex gap-0">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            type="button"
            class="rounded-t-lg border-b-2 px-4 py-3 text-sm font-medium transition-colors"
            :class="activeTab === tab.value ? 'border-[#333] bg-[#f1f5f9] text-[#333]' : 'border-transparent bg-transparent text-[#6b7280] hover:bg-[#f8fafc]'"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Overview tab -->
      <template v-if="activeTab === 'overview'">
        <!-- KPI cards -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
                <p class="mt-1 text-xs font-medium text-[#22c55e]">+0.3%</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
                <IconDollarSign class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Today's Revenue</p>
          </div>
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
                <p class="mt-1 text-xs font-medium text-[#22c55e]">+15.6%</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
                <IconTrendingUp class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Weekly Revenue</p>
          </div>
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
                <p class="mt-1 text-xs font-medium text-[#22c55e]">+0.3%</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
                <IconDollarSign class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Monthly Revenue</p>
          </div>
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
                <p class="mt-1 text-xs font-medium text-[#ea580c]">+0.0%</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
                <IconDollarSign class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Pending Payouts</p>
          </div>
        </div>

        <!-- Revenue by Service -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
          <h2 class="text-base font-bold text-[#333]">Revenue by Service</h2>
          <p class="mt-0.5 text-sm text-[#6b7280]">Weekly breakdown by service type</p>
          <div class="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-4 text-sm">
              <span class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-[#14b8a6]"></span>
                Rides
              </span>
              <span class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-[#f97316]"></span>
                Parcels
              </span>
              <span class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-[#3b82f6]"></span>
                Vehicles
              </span>
              <span class="flex items-center gap-2">
                <span class="h-3 w-3 rounded-full bg-[#7c3aed]"></span>
                Bus
              </span>
            </div>
          </div>
          <div class="mt-4 h-[280px] w-full">
            <BarChart :data="revenueChartData" :options="revenueChartOptions" />
          </div>
        </div>

        <!-- All Transactions -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
          <div class="border-b border-[#e5e7eb] px-4">
            <div class="flex gap-0">
              <button
                v-for="t in transactionSubTabs"
                :key="t.value"
                type="button"
                class="border-b-2 px-4 py-3 text-sm font-medium transition-colors"
                :class="transactionSubTab === t.value ? 'border-[#333] bg-[#f1f5f9] text-[#333]' : 'border-transparent bg-transparent text-[#6b7280] hover:bg-[#f8fafc]'"
                @click="transactionSubTab = t.value"
              >
                {{ t.label }}
              </button>
            </div>
          </div>
          <div class="p-4">
            <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="relative flex-1 max-w-md">
                <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  v-model="transactionSearch"
                  type="text"
                  placeholder="Search transactions..."
                  class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
              >
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>
                </svg>
                Filter
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[700px] border-collapse">
                <thead>
                  <tr class="text-left text-sm font-semibold text-[#6b7280]">
                    <th class="pb-3 pr-4">Transaction ID</th>
                    <th class="pb-3 pr-4">User</th>
                    <th class="pb-3 pr-4">Type</th>
                    <th class="pb-3 pr-4">Method</th>
                    <th class="pb-3 pr-4">Amount</th>
                    <th class="pb-3 pr-4">Status</th>
                    <th class="pb-3 pl-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in transactionRows"
                    :key="row.id"
                    class="border-b border-[#e5e7eb] bg-[#f8fafc] text-sm last:border-b-0 hover:bg-[#f1f5f9]"
                  >
                    <td class="py-3 pr-4 font-medium text-[#333]">{{ row.transactionId }}</td>
                    <td class="py-3 pr-4 text-[#6b7280]">{{ row.user }}</td>
                    <td class="py-3 pr-4">
                      <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white" :class="row.typeClass">{{ row.type }}</span>
                    </td>
                    <td class="py-3 pr-4 text-[#6b7280]">{{ row.method }}</td>
                    <td class="py-3 pr-4 font-medium text-[#333]">{{ row.amount }}</td>
                    <td class="py-3 pr-4">
                      <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white" :class="row.statusClass">{{ row.status }}</span>
                    </td>
                    <td class="py-3 pl-4 text-right text-[#6b7280]">{{ row.date }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>

      <!-- Refunds tab -->
      <template v-else-if="activeTab === 'refunds'">
        <!-- Refund summary cards -->
        <div class="grid gap-4 sm:grid-cols-3">
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">3</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef9c3] text-[#ca8a04]">
                <IconClock class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Pending Refunds</p>
          </div>
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">1</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#dcfce7] text-[#16a34a]">
                <IconSquareCheck class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Processed This Month</p>
          </div>
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e9d5ff] text-[#7c3aed]">
                <IconRefresh class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Total Refunded</p>
          </div>
        </div>

        <!-- Search and filters -->
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="relative flex-1 max-w-md">
            <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
            <input
              v-model="refundSearch"
              type="text"
              placeholder="Search refunds..."
              class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
            />
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4.6v14.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V4.6a.6.6 0 0 0-.6-.6H3.6a.6.6 0 0 0-.6.6z"/><path d="M3 8h18"/><path d="M3 12h18"/><path d="M3 16h18"/></svg>
              Status
            </button>
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
            >
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Service
            </button>
          </div>
        </div>

        <!-- Refund requests table -->
        <div class="overflow-x-auto rounded-lg border border-[#e5e7eb] bg-white">
          <table class="w-full min-w-[800px] border-collapse">
            <thead>
              <tr class="border-b border-[#e5e7eb] bg-[#f9fafb] text-left text-sm font-semibold text-[#6b7280]">
                <th class="px-4 py-3">Request ID</th>
                <th class="px-4 py-3">User</th>
                <th class="px-4 py-3">Service</th>
                <th class="px-4 py-3">Booking ID</th>
                <th class="px-4 py-3">Amount</th>
                <th class="px-4 py-3">Reason</th>
                <th class="px-4 py-3">Status</th>
                <th class="px-4 py-3">Date</th>
                <th class="w-12 px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in refundRows"
                :key="row.id"
                class="border-b border-[#e5e7eb] bg-white text-sm last:border-b-0 hover:bg-[#f8fafc]"
              >
                <td class="px-4 py-3 font-medium text-[#333]">{{ row.requestId }}</td>
                <td class="px-4 py-3 text-[#6b7280]">{{ row.user }}</td>
                <td class="px-4 py-3">
                  <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white" :class="row.serviceClass">{{ row.service }}</span>
                </td>
                <td class="px-4 py-3 text-[#333]">{{ row.bookingId }}</td>
                <td class="px-4 py-3 font-medium text-[#333]">{{ row.amount }}</td>
                <td class="px-4 py-3 text-[#6b7280]">{{ row.reason }}</td>
                <td class="px-4 py-3">
                  <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white" :class="row.statusClass">{{ row.status }}</span>
                </td>
                <td class="px-4 py-3 text-[#6b7280]">{{ row.date }}</td>
                <td class="relative px-4 py-3 text-right">
                  <button
                    type="button"
                    class="rounded p-1.5 text-[#6b7280] hover:bg-[#e5e7eb] hover:text-[#333]"
                    :aria-expanded="openRefundActionId === row.id"
                    @click="openRefundActionId = openRefundActionId === row.id ? null : row.id"
                  >
                    <IconHorizontalDots class="h-4 w-4" />
                  </button>
                  <div
                    v-if="openRefundActionId === row.id"
                    class="absolute right-4 top-full z-10 mt-1 min-w-[180px] rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-lg"
                  >
                    <button type="button" class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#374151] hover:bg-[#f8fafc]" @click="openRefundDetailsModal(row); openRefundActionId = null">
                      <IconEye class="h-4 w-4 text-[#6b7280]" />
                      View Details
                    </button>
                    <button type="button" class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#374151] hover:bg-[#f8fafc]" @click="openProcessRefundModal(row); openRefundActionId = null">
                      <IconRefresh class="h-4 w-4 text-[#6b7280]" />
                      Process Refund
                    </button>
                    <button type="button" class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#dc2626] hover:bg-[#fef2f2]" @click="openRejectRefundModal(row); openRefundActionId = null">
                      <span class="flex h-4 w-4 items-center justify-center rounded-full bg-[#dc2626] text-white">
                        <svg class="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                      </span>
                      Reject request
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>

      <!-- Payouts tab -->
      <template v-else-if="activeTab === 'payouts'">
        <!-- Payout summary cards -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
                <p class="mt-1 text-sm text-[#6b7280]">This Week</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
                <IconWallet class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Total Payouts</p>
          </div>
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
                <p class="mt-1 text-sm text-[#6b7280]">4 Drivers</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
                <IconUsers class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Driver Payouts</p>
          </div>
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
                <p class="mt-1 text-sm text-[#6b7280]">2 Riders</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
                <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="5" cy="17" r="3"/><circle cx="19" cy="17" r="3"/><path d="M8 17h8"/><path d="M12 5v4"/><path d="M14 9l3-2"/><path d="M10 9L7 7"/></svg>
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Rider Payouts</p>
          </div>
          <div class="rounded-xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-2xl font-bold text-[#333]">₦30,500</p>
                <p class="mt-1 text-sm text-[#6b7280]">2 Owners</p>
              </div>
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]">
                <IconCar class="h-5 w-5" />
              </span>
            </div>
            <p class="mt-2 text-sm font-medium text-[#6b7280]">Vehicle Owner Payouts</p>
          </div>
        </div>

        <!-- Payouts table -->
        <div class="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
          <div class="border-b border-[#e5e7eb] px-4">
            <div class="flex gap-0">
              <button
                v-for="t in payoutSubTabs"
                :key="t.value"
                type="button"
                class="border-b-2 px-4 py-3 text-sm font-medium transition-colors"
                :class="payoutSubTab === t.value ? 'border-[#333] bg-[#f1f5f9] text-[#333]' : 'border-transparent bg-transparent text-[#6b7280] hover:bg-[#f8fafc]'"
                @click="payoutSubTab = t.value"
              >
                {{ t.label }}
              </button>
            </div>
          </div>
          <div class="p-4">
            <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div class="relative flex-1 max-w-md">
                <IconSearch class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  v-model="payoutSearch"
                  type="text"
                  placeholder="Search payouts..."
                  class="h-10 w-full rounded-lg border border-[#e5e7eb] bg-white py-2 pl-9 pr-3 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
                />
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4.6v14.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V4.6a.6.6 0 0 0-.6-.6H3.6a.6.6 0 0 0-.6.6z"/><path d="M3 8h18"/><path d="M3 12h18"/><path d="M3 16h18"/></svg>
                  Status
                </button>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Export
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr class="border-b border-[#e5e7eb] bg-[#f9fafb] text-left text-sm font-semibold text-[#6b7280]">
                    <th class="px-4 py-3">Payout ID</th>
                    <th class="px-4 py-3">Recipient</th>
                    <th class="px-4 py-3">Type</th>
                    <th class="px-4 py-3">Amount</th>
                    <th class="px-4 py-3">Trips/Rentals</th>
                    <th class="px-4 py-3">Method</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Date</th>
                    <th class="w-12 px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in payoutRows"
                    :key="row.id"
                    class="border-b border-[#e5e7eb] bg-white text-sm last:border-b-0 hover:bg-[#f8fafc]"
                  >
                    <td class="px-4 py-3 font-medium text-[#333]">{{ row.payoutId }}</td>
                    <td class="px-4 py-3">
                      <span class="flex items-center gap-2">
                        <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#e5e7eb] text-[#6b7280]">
                          <IconUser class="h-4 w-4" />
                        </span>
                        {{ row.recipient }}
                      </span>
                    </td>
                    <td class="px-4 py-3">
                      <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium text-white" :class="row.typeClass">{{ row.type }}</span>
                    </td>
                    <td class="px-4 py-3 font-medium text-[#333]">{{ row.amount }}</td>
                    <td class="px-4 py-3 text-[#6b7280]">{{ row.tripsOrRentals }}</td>
                    <td class="px-4 py-3 text-[#6b7280]">{{ row.method }}</td>
                    <td class="px-4 py-3">
                      <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium" :class="row.statusClass">{{ row.status }}</span>
                    </td>
                    <td class="px-4 py-3 text-[#6b7280]">{{ row.date }}</td>
                    <td class="relative px-4 py-3 text-right">
                      <button
                        type="button"
                        class="rounded p-1.5 text-[#6b7280] hover:bg-[#e5e7eb] hover:text-[#333]"
                        :aria-expanded="openPayoutActionId === row.id"
                        @click="openPayoutActionId = openPayoutActionId === row.id ? null : row.id"
                      >
                        <IconHorizontalDots class="h-4 w-4" />
                      </button>
                      <div
                        v-if="openPayoutActionId === row.id"
                        class="absolute right-4 top-full z-10 mt-1 min-w-[160px] rounded-lg border border-[#e5e7eb] bg-white py-1 shadow-lg"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-[#374151] hover:bg-[#f8fafc]"
                          @click="openPayoutDetailsModal(row); openPayoutActionId = null"
                        >
                          <IconEye class="h-4 w-4 text-[#6b7280]" />
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Payout Details Modal -->
    <Teleport to="body">
      <div
        v-if="showPayoutDetailsModal && payoutDetails"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        @click.self="closePayoutDetailsModal"
      >
        <div
          class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div>
              <h2 class="text-lg font-bold text-[#333]">Payout Details</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Complete payout information</p>
            </div>
            <button
              type="button"
              class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]"
              aria-label="Close"
              @click="closePayoutDetailsModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-5 px-6 py-5">
            <div class="grid gap-5 sm:grid-cols-2">
              <!-- Recipient -->
              <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <p class="text-sm font-semibold text-[#374151]">Recipient Information</p>
                <div class="mt-3 flex items-center gap-3">
                  <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e7eb] text-[#6b7280]">
                    <IconUser class="h-5 w-5" />
                  </span>
                  <div>
                    <p class="font-medium text-[#333]">{{ payoutDetails.recipient }}</p>
                    <span class="mt-0.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white" :class="payoutDetails.typeClass">{{ payoutDetails.type }}</span>
                    <p class="mt-2 flex items-center gap-2 text-sm text-[#6b7280]">
                      <IconPhone class="h-3.5 w-3.5" />
                      {{ payoutDetails.recipientPhone }}
                    </p>
                    <p class="mt-0.5 flex items-center gap-2 text-sm text-[#6b7280]">
                      <IconMail class="h-3.5 w-3.5" />
                      {{ payoutDetails.recipientEmail }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- Payment method (card) -->
              <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
                <p class="flex items-center gap-2 text-sm font-semibold text-[#374151]">
                  <IconCreditCard class="h-4 w-4 text-[#6b7280]" />
                  Payment Method
                </p>
                <p class="mt-2 font-medium text-[#333]">{{ payoutDetails.paymentMethodLabel }}</p>
                <p class="text-sm text-[#6b7280]">{{ payoutDetails.paymentCardMask }}</p>
                <span class="mt-2 inline-block rounded-full bg-[#e5e7eb] px-2.5 py-0.5 text-xs font-medium text-[#374151]">{{ payoutDetails.paymentGateway }}</span>
              </div>
            </div>

            <!-- Payout summary -->
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-sm font-semibold text-[#374151]">Payout Summary</p>
              <dl class="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div>
                  <dt class="text-[#6b7280]">Payout ID</dt>
                  <dd class="font-medium text-[#333]">{{ payoutDetails.payoutId }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Total Amount</dt>
                  <dd class="font-medium text-[#333]">{{ payoutDetails.totalAmount }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Period</dt>
                  <dd class="font-medium text-[#333]">{{ payoutDetails.period }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Trips/Rentals</dt>
                  <dd class="font-medium text-[#333]">{{ payoutDetails.tripsOrRentals }}</dd>
                </div>
              </dl>
            </div>

            <!-- Payout payment method (bank) -->
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-sm font-semibold text-[#374151]">Payout Method</p>
              <dl class="mt-3 space-y-2 text-sm">
                <div>
                  <dt class="text-[#6b7280]">Account</dt>
                  <dd class="font-medium text-[#333]">{{ payoutDetails.bankAccountMask }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Type</dt>
                  <dd class="font-medium text-[#333]">{{ payoutDetails.payoutMethodType }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Bank</dt>
                  <dd class="font-medium text-[#333]">{{ payoutDetails.bankName }}</dd>
                </div>
                <div class="flex items-center justify-between pt-2">
                  <dt class="text-[#6b7280]">Status</dt>
                  <dd>
                    <span class="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium" :class="payoutDetails.statusClass">{{ payoutDetails.status }}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <!-- Failed message (when status is Failed) -->
            <div
              v-if="payoutDetails.status === 'Failed'"
              class="rounded-lg border border-[#fecaca] bg-[#fef2f2] p-4"
            >
              <p class="font-semibold text-[#dc2626]">Payout Failed</p>
              <p class="mt-1 text-sm text-[#b91c1c]">{{ payoutDetails.failureMessage }}</p>
            </div>

            <div class="flex flex-wrap items-center justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button
                type="button"
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                @click="closePayoutDetailsModal"
              >
                Cancel
              </button>
              <button
                v-if="payoutDetails.status === 'Failed'"
                type="button"
                class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
                @click="retryPayout"
              >
                Retry Payout
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Refund Request Details Modal -->
    <Teleport to="body">
      <div
        v-if="showRefundDetailsModal && selectedRefundDetails"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeRefundDetailsModal"
      >
        <div
          class="w-full max-w-md rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div>
              <h2 class="text-lg font-bold text-[#333]">Refund Request Details</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Review the refund request and take action</p>
            </div>
            <button
              type="button"
              class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]"
              aria-label="Close"
              @click="closeRefundDetailsModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-5 px-6 py-5">
            <div class="flex gap-6 text-sm">
              <div>
                <p class="text-[#6b7280]">Request ID</p>
                <p class="font-medium text-[#333]">{{ selectedRefundDetails.requestId }}</p>
              </div>
              <div>
                <p class="text-[#6b7280]">Booking ID</p>
                <p class="font-medium text-[#333]">{{ selectedRefundDetails.bookingId }}</p>
              </div>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-sm font-semibold text-[#374151]">User Information</p>
              <dl class="mt-3 space-y-2 text-sm">
                <div>
                  <dt class="text-[#6b7280]">Name</dt>
                  <dd class="font-medium text-[#333]">{{ selectedRefundDetails.userName }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Email</dt>
                  <dd class="font-medium text-[#333]">{{ selectedRefundDetails.userEmail }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Phone</dt>
                  <dd class="font-medium text-[#333]">{{ selectedRefundDetails.userPhone }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Payment Method</dt>
                  <dd class="font-medium text-[#333]">{{ selectedRefundDetails.paymentMethod }}</dd>
                </div>
              </dl>
            </div>
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f8fafc] p-4">
              <p class="text-sm font-semibold text-[#374151]">Refund Details</p>
              <dl class="mt-3 space-y-2 text-sm">
                <div>
                  <dt class="text-[#6b7280]">Service</dt>
                  <dd class="font-medium text-[#333]">{{ selectedRefundDetails.service }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Amount</dt>
                  <dd class="font-medium text-[#333]">{{ selectedRefundDetails.amount }}</dd>
                </div>
                <div>
                  <dt class="text-[#6b7280]">Reason</dt>
                  <dd class="font-medium text-[#333]">{{ selectedRefundDetails.reason }}</dd>
                </div>
              </dl>
            </div>
            <div class="flex flex-wrap items-center justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button
                type="button"
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                @click="closeRefundDetailsModal"
              >
                Reject
              </button>
              <button
                type="button"
                class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
                @click="openProcessRefundModalFromDetails"
              >
                Process Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Process Refund Modal -->
    <Teleport to="body">
      <div
        v-if="showProcessRefundModal && processRefundContext"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        @click.self="closeProcessRefundModal"
      >
        <div
          class="w-full max-w-md rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <div>
              <h2 class="text-lg font-bold text-[#333]">Process Refund</h2>
              <p class="mt-0.5 text-sm text-[#6b7280]">Confirm refund details for {{ processRefundContext.userName }}</p>
            </div>
            <button
              type="button"
              class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]"
              aria-label="Close"
              @click="closeProcessRefundModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-5 px-6 py-5">
            <!-- Refund Method -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Refund Method</p>
              <div class="space-y-2">
                <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input v-model="processRefundMethod" type="radio" value="full" class="mt-1 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <div>
                    <p class="text-sm font-medium text-[#333]">Full Refund</p>
                    <p class="text-xs text-[#6b7280]">Refund the entire amount of {{ processRefundContext.amount }}</p>
                  </div>
                </label>
                <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input v-model="processRefundMethod" type="radio" value="partial" class="mt-1 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <div class="min-w-0 flex-1">
                    <p class="text-sm font-medium text-[#333]">Partial Refund</p>
                    <p class="text-xs text-[#6b7280]">Refund a percentage of the original amount</p>
                    <div v-if="processRefundMethod === 'partial'" class="mt-2">
                      <input
                        v-model.number="processRefundPercentage"
                        type="number"
                        min="1"
                        max="100"
                        placeholder="Enter specific percentage"
                        class="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333] outline-none focus:border-[#333]"
                      />
                      <p class="mt-1 text-xs text-[#6b7280]">Refund amount: {{ processRefundAmountDisplay }} of {{ processRefundContext.amount }}</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <!-- Refund Destination -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Refund Destination</p>
              <div class="space-y-2">
                <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input v-model="processRefundDestination" type="radio" value="original" class="mt-1 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <div>
                    <p class="text-sm font-medium text-[#333]">Original Payment Method</p>
                    <p class="text-xs text-[#6b7280]">{{ processRefundContext.paymentMethod }}</p>
                  </div>
                </label>
                <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input v-model="processRefundDestination" type="radio" value="wallet" class="mt-1 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <div>
                    <p class="text-sm font-medium text-[#333]">Platform Wallet</p>
                    <p class="text-xs text-[#6b7280]">Credit to user's wallet balance</p>
                  </div>
                </label>
                <label class="flex cursor-pointer items-start gap-3 rounded-lg border border-[#e5e7eb] p-3 hover:bg-[#f8fafc]">
                  <input v-model="processRefundDestination" type="radio" value="bank" class="mt-1 h-4 w-4 border-[#d1d5db] text-[#333] focus:ring-[#333]" />
                  <div>
                    <p class="text-sm font-medium text-[#333]">Bank Transfer</p>
                    <p class="text-xs text-[#6b7280]">Direct transfer to user's bank account</p>
                  </div>
                </label>
              </div>
            </div>
            <!-- Admin Notes -->
            <div>
              <p class="mb-2 text-sm font-semibold text-[#374151]">Admin Notes (Optional)</p>
              <textarea
                v-model="processRefundAdminNotes"
                rows="3"
                placeholder="Add any notes about this refund..."
                class="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <!-- Refund Summary -->
            <div class="rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-3">
              <p class="text-sm font-semibold text-[#374151]">Refund Summary</p>
              <p class="mt-1 text-sm text-[#6b7280]">{{ processRefundSummaryText }}</p>
            </div>
            <div class="flex flex-wrap items-center justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button
                type="button"
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                @click="closeProcessRefundModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
                @click="submitProcessRefundModal"
              >
                Process {{ processRefundContext.amount }} Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Reject Refund Request Modal -->
    <Teleport to="body">
      <div
        v-if="showRejectRefundModal && rejectRefundContext"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
        @click.self="closeRejectRefundModal"
      >
        <div
          class="w-full max-w-md rounded-xl bg-white shadow-xl"
          @click.stop
        >
          <div class="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-4">
            <h2 class="text-lg font-bold text-[#333]">Reject Refund Request</h2>
            <button
              type="button"
              class="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111]"
              aria-label="Close"
              @click="closeRejectRefundModal"
            >
              <IconX class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-5 px-6 py-5">
            <p class="text-sm text-[#6b7280]">
              Are you sure you want to reject this refund request for {{ rejectRefundContext.amount }}?
            </p>
            <div>
              <label class="block text-sm font-semibold text-[#374151]">Rejection Reason</label>
              <input
                v-model="rejectRefundReason"
                type="text"
                placeholder="Provide a reason for rejection..."
                class="mt-2 w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-[#333] placeholder:text-[#9ca3af] outline-none focus:border-[#333]"
              />
            </div>
            <div class="flex flex-wrap items-center justify-end gap-3 border-t border-[#e5e7eb] pt-4">
              <button
                type="button"
                class="rounded-lg border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc]"
                @click="closeRejectRefundModal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="rounded-lg bg-[#333] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#111]"
                @click="submitRejectRefund"
              >
                Reject Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import IconDollarSign from '@/components/icon/icon-dollar-sign.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconClock from '@/components/icon/icon-clock.vue';
import IconSquareCheck from '@/components/icon/icon-square-check.vue';
import IconRefresh from '@/components/icon/icon-refresh.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconX from '@/components/icon/icon-x.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import IconUsers from '@/components/icon/icon-users.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconUser from '@/components/icon/icon-user.vue';
import IconPhone from '@/components/icon/icon-phone.vue';
import IconMail from '@/components/icon/icon-mail.vue';
import IconCreditCard from '@/components/icon/icon-credit-card.vue';
import BarChart from '@/components/charts/BarChart.vue';

const tabs = [
  { value: 'overview', label: 'Overview' },
  { value: 'refunds', label: 'Refunds' },
  { value: 'payouts', label: 'Payouts' },
];

const activeTab = ref('overview');
const transactionSubTabs = [
  { value: 'all', label: 'All Transactions' },
  { value: 'user', label: 'User' },
  { value: 'driver', label: 'Driver' },
  { value: 'owner', label: 'Owner' },
];

const transactionSubTab = ref('all');
const transactionSearch = ref('');

// Payouts tab
const payoutSubTabs = [
  { value: 'all', label: 'All Payouts' },
  { value: 'drivers', label: 'Drivers' },
  { value: 'riders', label: 'Riders' },
  { value: 'owners', label: 'Vehicle Owners' },
];
const payoutSubTab = ref('all');
const payoutSearch = ref('');
const openPayoutActionId = ref<string | null>(null);
type PayoutRow = {
  id: string;
  payoutId: string;
  recipient: string;
  type: string;
  typeClass: string;
  amount: string;
  tripsOrRentals: string;
  method: string;
  status: string;
  statusClass: string;
  date: string;
  recipientPhone: string;
  recipientEmail: string;
  paymentMethodLabel: string;
  paymentCardMask: string;
  paymentGateway: string;
  totalAmount: string;
  period: string;
  bankAccountMask: string;
  payoutMethodType: string;
  bankName: string;
  failureMessage?: string;
};
const payoutRows = ref<PayoutRow[]>([
  { id: 'p1', payoutId: 'P001', recipient: 'John Smith', type: 'Driver', typeClass: 'bg-[#93c5fd] text-[#1e40af]', amount: '₦1,500', tripsOrRentals: '45', method: 'User Wallet', status: 'Completed', statusClass: 'bg-[#dcfce7] text-[#16a34a]', date: 'Apr 10, 2024', recipientPhone: '+1 234-567-8901', recipientEmail: 'mark.t@email.com', paymentMethodLabel: 'Visa Debit Card', paymentCardMask: '**** 4242', paymentGateway: 'Paystack', totalAmount: '₦125,000', period: 'Apr 1-7, 2024', bankAccountMask: '****4521', payoutMethodType: 'Bank Transfer', bankName: 'Chase Bank' },
  { id: 'p2', payoutId: 'P002', recipient: 'John Smith', type: 'Rider', typeClass: 'bg-[#bbf7d0] text-[#166534]', amount: '₦1,500', tripsOrRentals: '45', method: 'User Wallet', status: 'Pending', statusClass: 'bg-[#ffedd5] text-[#ea580c]', date: 'Apr 10, 2024', recipientPhone: '+1 234-567-8901', recipientEmail: 'mark.t@email.com', paymentMethodLabel: 'Visa Debit Card', paymentCardMask: '**** 4242', paymentGateway: 'Paystack', totalAmount: '₦125,000', period: 'Apr 1-7, 2024', bankAccountMask: '****4521', payoutMethodType: 'Bank Transfer', bankName: 'Chase Bank' },
  { id: 'p3', payoutId: 'P003', recipient: 'John Smith', type: 'Vehicle Owner', typeClass: 'bg-[#e9d5ff] text-[#7c3aed]', amount: '₦1,500', tripsOrRentals: '45', method: 'User Wallet', status: 'Failed', statusClass: 'bg-[#fee2e2] text-[#dc2626]', date: 'Apr 10, 2024', recipientPhone: '+1 234-567-8901', recipientEmail: 'mark.t@email.com', paymentMethodLabel: 'Visa Debit Card', paymentCardMask: '**** 4242', paymentGateway: 'Paystack', totalAmount: '₦125,000', period: 'Apr 1-7, 2024', bankAccountMask: '****4521', payoutMethodType: 'Bank Transfer', bankName: 'Chase Bank', failureMessage: 'This payout failed due to invalid bank details. Please contact the recipient to update their payment information.' },
]);

const showPayoutDetailsModal = ref(false);
const selectedPayoutId = ref<string | null>(null);
const payoutDetails = computed(() => {
  if (!selectedPayoutId.value) return null;
  const row = payoutRows.value.find((r) => r.id === selectedPayoutId.value);
  if (!row) return null;
  return {
    payoutId: row.payoutId,
    recipient: row.recipient,
    type: row.type,
    typeClass: row.typeClass,
    recipientPhone: row.recipientPhone,
    recipientEmail: row.recipientEmail,
    paymentMethodLabel: row.paymentMethodLabel,
    paymentCardMask: row.paymentCardMask,
    paymentGateway: row.paymentGateway,
    totalAmount: row.totalAmount,
    period: row.period,
    tripsOrRentals: row.tripsOrRentals,
    bankAccountMask: row.bankAccountMask,
    payoutMethodType: row.payoutMethodType,
    bankName: row.bankName,
    status: row.status,
    statusClass: row.statusClass,
    failureMessage: row.failureMessage,
  };
});

function openPayoutDetailsModal(row: PayoutRow) {
  selectedPayoutId.value = row.id;
  showPayoutDetailsModal.value = true;
}

function closePayoutDetailsModal() {
  showPayoutDetailsModal.value = false;
  selectedPayoutId.value = null;
}

function retryPayout() {
  closePayoutDetailsModal();
}

// Refunds tab
const refundSearch = ref('');
const openRefundActionId = ref<string | null>(null);
type RefundRow = {
  id: string;
  requestId: string;
  user: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  paymentMethod: string;
  service: string;
  serviceClass: string;
  bookingId: string;
  amount: string;
  reason: string;
  status: string;
  statusClass: string;
  date: string;
};
const refundRows = ref<RefundRow[]>([
  { id: 'r1', requestId: '8001', user: 'Sarah Johnson Johnson', userName: 'Sarah Johnson', userEmail: 'sarahj@gmail.com', userPhone: '+234-567-8901', paymentMethod: 'Credit Card', service: 'Ride', serviceClass: 'bg-[#3b82f6]', bookingId: '8001', amount: '₦1,500', reason: 'Driver cancelled', status: 'Pending', statusClass: 'bg-[#ea580c]', date: 'Apr 10, 2024' },
  { id: 'r2', requestId: 'RF002', user: 'Sarah Johnson Johnson', userName: 'Sarah Johnson', userEmail: 'sarahj@gmail.com', userPhone: '+234-567-8901', paymentMethod: 'Credit Card', service: 'Parcel', serviceClass: 'bg-[#bbf7d0] text-[#166534]', bookingId: '8001', amount: '₦1,500', reason: 'Package not delivered', status: 'Approved', statusClass: 'bg-[#22c55e]', date: 'Apr 10, 2024' },
  { id: 'r3', requestId: 'RF003', user: 'Sarah Johnson Johnson', userName: 'Sarah Johnson', userEmail: 'sarahj@gmail.com', userPhone: '+234-567-8901', paymentMethod: 'Credit Card', service: 'Vehicle Hire', serviceClass: 'bg-[#7c3aed]', bookingId: '8001', amount: '₦1,500', reason: 'Trip cancelled by operator', status: 'Rejected', statusClass: 'bg-[#dc2626]', date: 'Apr 10, 2024' },
  { id: 'r4', requestId: 'RF004', user: 'Sarah Johnson Johnson', userName: 'Sarah Johnson', userEmail: 'sarahj@gmail.com', userPhone: '+234-567-8901', paymentMethod: 'Credit Card', service: 'Bus Booking', serviceClass: 'bg-[#374151]', bookingId: '8001', amount: '₦1,500', reason: 'Trip cancelled by operator', status: 'Processed', statusClass: 'bg-[#60a5fa] text-white', date: 'Apr 10, 2024' },
]);

const showRefundDetailsModal = ref(false);
const selectedRefundId = ref<string | null>(null);
const selectedRefundDetails = computed(() => {
  if (!selectedRefundId.value) return null;
  const row = refundRows.value.find((r) => r.id === selectedRefundId.value);
  if (!row) return null;
  return {
    requestId: row.requestId,
    bookingId: row.bookingId,
    userName: row.userName,
    userEmail: row.userEmail,
    userPhone: row.userPhone,
    paymentMethod: row.paymentMethod,
    service: row.service,
    amount: row.amount,
    reason: row.reason,
  };
});

function openRefundDetailsModal(row: RefundRow) {
  selectedRefundId.value = row.id;
  showRefundDetailsModal.value = true;
}

function closeRefundDetailsModal() {
  showRefundDetailsModal.value = false;
  selectedRefundId.value = null;
}

function openProcessRefundModalFromDetails() {
  const id = selectedRefundId.value;
  if (!id) return;
  const row = refundRows.value.find((r) => r.id === id);
  if (row) {
    closeRefundDetailsModal();
    openProcessRefundModal(row);
  }
}

// Process Refund modal
type ProcessRefundContext = {
  userName: string;
  amount: string;
  paymentMethod: string;
};

const showProcessRefundModal = ref(false);
const processRefundContext = ref<ProcessRefundContext | null>(null);
const processRefundMethod = ref<'full' | 'partial'>('full');
const processRefundPercentage = ref<number>(100);
const processRefundDestination = ref<'original' | 'wallet' | 'bank'>('original');
const processRefundAdminNotes = ref('');

const processRefundAmountDisplay = computed(() => {
  const ctx = processRefundContext.value;
  if (!ctx) return '';
  if (processRefundMethod.value === 'full') return ctx.amount;
  const pct = Math.min(100, Math.max(0, processRefundPercentage.value || 0));
  const num = Number(ctx.amount.replace(/[₦N,\s]/g, '')) || 0;
  const part = Math.round((num * pct) / 100);
  return `₦${part.toLocaleString()}`;
});

const processRefundSummaryText = computed(() => {
  const ctx = processRefundContext.value;
  if (!ctx) return '';
  const amount = processRefundMethod.value === 'full' ? ctx.amount : processRefundAmountDisplay.value;
  const pct = processRefundMethod.value === 'full' ? 100 : (processRefundPercentage.value || 100);
  const via =
    processRefundDestination.value === 'original'
      ? ctx.paymentMethod
      : processRefundDestination.value === 'wallet'
        ? 'Platform Wallet'
        : 'Bank Transfer';
  return `${amount} (${pct}%) will be refunded to ${ctx.userName} via ${via}`;
});

function openProcessRefundModal(row: RefundRow) {
  processRefundContext.value = {
    userName: row.userName,
    amount: row.amount,
    paymentMethod: row.paymentMethod,
  };
  processRefundMethod.value = 'full';
  processRefundPercentage.value = 100;
  processRefundDestination.value = 'original';
  processRefundAdminNotes.value = '';
  showProcessRefundModal.value = true;
}

function closeProcessRefundModal() {
  showProcessRefundModal.value = false;
  processRefundContext.value = null;
}

function submitProcessRefundModal() {
  closeProcessRefundModal();
}

// Reject Refund Request modal
const showRejectRefundModal = ref(false);
const rejectRefundContext = ref<{ amount: string } | null>(null);
const rejectRefundReason = ref('');

function openRejectRefundModal(row: RefundRow) {
  rejectRefundContext.value = { amount: row.amount };
  rejectRefundReason.value = '';
  showRejectRefundModal.value = true;
}

function closeRejectRefundModal() {
  showRejectRefundModal.value = false;
  rejectRefundContext.value = null;
  rejectRefundReason.value = '';
}

function submitRejectRefund() {
  closeRejectRefundModal();
}

type TransactionRow = {
  id: string;
  transactionId: string;
  user: string;
  type: string;
  typeClass: string;
  method: string;
  amount: string;
  status: string;
  statusClass: string;
  date: string;
};

const transactionRows = ref<TransactionRow[]>([
  { id: '1', transactionId: 'T001', user: 'Sarah John...', type: 'User', typeClass: 'bg-[#3b82f6]', method: 'Credit Card', amount: '₦1,500', status: 'Completed', statusClass: 'bg-[#22c55e]', date: 'Apr 10, 2024 10:30 AM' },
  { id: '2', transactionId: 'T001', user: 'Sarah John...', type: 'Driver', typeClass: 'bg-[#22c55e]', method: 'Wallet', amount: '₦1,500', status: 'Completed', statusClass: 'bg-[#22c55e]', date: 'Apr 10, 2024 10:30 AM' },
  { id: '3', transactionId: 'T001', user: 'Sarah John...', type: 'User', typeClass: 'bg-[#3b82f6]', method: 'PayPal', amount: '₦1,500', status: 'Pending', statusClass: 'bg-[#ea580c]', date: 'Apr 10, 2024 10:30 AM' },
  { id: '4', transactionId: 'T001', user: 'Sarah John...', type: 'Owner', typeClass: 'bg-[#ea580c]', method: 'Bank Transfer', amount: '₦1,500', status: 'Failed', statusClass: 'bg-[#dc2626]', date: 'Apr 10, 2024 10:30 AM' },
]);

// Revenue by Service chart - grouped bar (Rides=teal, Parcels=orange, Vehicles=blue, Bus=purple)
const revenueChartData = computed(() => ({
  labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
  datasets: [
    { label: 'Rides', data: [570, 420, 380, 500, 480, 520, 450], backgroundColor: '#14b8a6' },
    { label: 'Parcels', data: [380, 350, 400, 320, 410, 390, 360], backgroundColor: '#f97316' },
    { label: 'Vehicles', data: [230, 280, 250, 290, 270, 310, 260], backgroundColor: '#3b82f6' },
    { label: 'Bus', data: [130, 150, 140, 160, 145, 170, 155], backgroundColor: '#7c3aed' },
  ],
}));

const revenueChartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: '#6b7280', font: { size: 11 } },
    },
    y: {
      beginAtZero: true,
      max: 700,
      grid: { color: '#e5e7eb' },
      ticks: { color: '#6b7280', font: { size: 11 } },
    },
  },
}));
</script>
