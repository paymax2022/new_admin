<template>
  <div class="min-h-screen bg-white p-5 md:p-6">
    <div class="mx-auto max-w-[1200px] space-y-5">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-[22px] font-semibold text-[#0f172a]">Dashboard Overview</h1>
          <p class="mt-1 text-xs text-[#64748b]">Welcome back! Here's what's happening with your services.</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div v-for="item in topStats" :key="item.label" class="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <div class="flex items-center justify-between">
            <p class="text-[11px] font-medium text-[#94a3b8]">{{ item.label }}</p>
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-md" :style="{ backgroundColor: item.bg }">
              <component :is="item.icon" class="h-3.5 w-3.5" :class="item.iconClass" />
            </span>
          </div>
          <p class="mt-2 text-xl font-semibold text-[#0f172a]">{{ item.value }}</p>
          <p class="mt-1 text-[11px]" :class="item.changeClass">{{ item.change }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div v-for="item in secondStats" :key="item.label" class="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <div class="flex items-center justify-between">
            <p class="text-[11px] font-medium text-[#94a3b8]">{{ item.label }}</p>
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-md" :style="{ backgroundColor: item.bg }">
              <component :is="item.icon" class="h-3.5 w-3.5" :class="item.iconClass" />
            </span>
          </div>
          <p class="mt-2 text-xl font-semibold text-[#0f172a]">{{ item.value }}</p>
          <p class="mt-1 text-[11px]" :class="item.changeClass">{{ item.change }}</p>
        </div>
      </div>

      <section class="space-y-3">
        <h2 class="text-sm font-semibold text-[#0f172a]">Quick Actions</h2>
        <div class="grid gap-3 md:grid-cols-3">
          <button v-for="action in quickActions" :key="action.title" class="rounded-xl border border-[#e2e8f0] bg-white p-4 text-left transition hover:bg-[#f8fafc]">
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-md" :style="{ backgroundColor: action.bg }">
              <component :is="action.icon" class="h-3.5 w-3.5" :class="action.iconClass" />
            </span>
            <p class="text-sm font-semibold text-[#0f172a]">{{ action.title }}</p>
            <p class="mt-1 text-xs text-[#94a3b8]">{{ action.subtitle }}</p>
          </button>
        </div>
      </section>

      <div class="grid gap-4 lg:grid-cols-[1.45fr_1fr]">
        <div class="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <div class="mb-3 flex items-center justify-between">
            <h3 class="text-sm font-semibold text-[#0f172a]">Revenue Overview</h3>
            <div class="flex items-center gap-3 text-[11px] text-[#94a3b8]">
              <span class="inline-flex items-center gap-1.5"><i class="h-2.5 w-2.5 rounded-full bg-[#2563eb]"></i> Ride</span>
              <span class="inline-flex items-center gap-1.5"><i class="h-2.5 w-2.5 rounded-full bg-[#8b5cf6]"></i> Hike</span>
              <span class="inline-flex items-center gap-1.5"><i class="h-2.5 w-2.5 rounded-full bg-[#f59e0b]"></i> VAN/Bus Ride</span>
            </div>
          </div>
          <div class="chart-grid relative h-56 overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#f8fafc]">
            <svg viewBox="0 0 700 240" class="absolute inset-0 h-full w-full">
              <path d="M0,175 C70,140 130,150 190,120 C240,95 290,95 340,120 C390,145 440,120 500,88 C555,60 610,75 700,40 L700,240 L0,240 Z" fill="rgba(37,99,235,0.22)"/>
              <path d="M0,190 C60,176 125,188 180,166 C240,144 290,150 345,166 C410,188 460,168 520,146 C585,120 638,132 700,104 L700,240 L0,240 Z" fill="rgba(139,92,246,0.2)"/>
              <path d="M0,200 C80,194 130,200 190,188 C250,175 305,181 365,194 C430,205 500,198 570,188 C620,180 660,176 700,170 L700,240 L0,240 Z" fill="rgba(245,158,11,0.24)"/>
            </svg>
          </div>
        </div>

        <div class="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <h3 class="text-sm font-semibold text-[#0f172a]">Service Breakdown</h3>
          <p class="mt-0.5 text-xs text-[#94a3b8]">Booking service history</p>
          <div class="mt-4 flex items-center justify-center">
            <div class="donut-chart"></div>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
            <div v-for="segment in breakdownLegend" :key="segment.label" class="flex items-center gap-2 text-[#64748b]">
              <i class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: segment.color }"></i>
              <span>{{ segment.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div v-for="item in thirdStats" :key="item.label" class="rounded-xl border border-[#e2e8f0] bg-white p-4">
          <div class="flex items-center justify-between">
            <p class="text-[11px] font-medium text-[#94a3b8]">{{ item.label }}</p>
            <span class="inline-flex h-6 w-6 items-center justify-center rounded-md" :style="{ backgroundColor: item.bg }">
              <component :is="item.icon" class="h-3.5 w-3.5" :class="item.iconClass" />
            </span>
          </div>
          <p class="mt-2 text-xl font-semibold text-[#0f172a]">{{ item.value }}</p>
          <p class="mt-1 text-[11px]" :class="item.changeClass">{{ item.change }}</p>
        </div>
      </div>

      <section class="rounded-xl border border-[#e2e8f0] bg-white p-4">
        <div class="mb-3 flex items-center justify-between">
          <h3 class="text-sm font-semibold text-[#0f172a]">Recent Bookings</h3>
          <button class="text-xs font-medium text-[#2563eb] hover:text-[#1d4ed8]">View all</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full min-w-[740px] border-collapse">
            <tbody>
              <tr v-for="booking in recentBookings" :key="booking.id" class="border-t border-[#f1f5f9] first:border-t-0">
                <td class="px-1 py-3">
                  <p class="text-sm font-medium text-[#0f172a]">{{ booking.rider }}</p>
                  <p class="text-xs text-[#94a3b8]">{{ booking.meta }}</p>
                </td>
                <td class="px-1 py-3 text-right text-sm font-semibold text-[#0f172a]">{{ booking.amount }}</td>
                <td class="px-1 py-3 text-right">
                  <span class="inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium" :class="booking.badgeClass">
                    {{ booking.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconUsersGroup from '@/components/icon/icon-users-group.vue';
import IconCar from '@/components/icon/icon-car.vue';
import IconCalendar from '@/components/icon/icon-calendar.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';
import IconBox from '@/components/icon/icon-box.vue';
import IconUserPlus from '@/components/icon/icon-user-plus.vue';

const topStats = [
  { label: 'Total Users', value: '24,563', change: '+8.5% vs last period', changeClass: 'text-[#10b981]', bg: '#dbeafe', icon: IconUsersGroup, iconClass: 'text-[#2563eb]' },
  { label: 'Active Drivers', value: '1,847', change: '+3.2% vs last period', changeClass: 'text-[#10b981]', bg: '#dcfce7', icon: IconCar, iconClass: 'text-[#22c55e]' },
  { label: "Today's Bookings", value: '1,284', change: '+6.2% vs last period', changeClass: 'text-[#10b981]', bg: '#f3e8ff', icon: IconCalendar, iconClass: 'text-[#a855f7]' },
  { label: 'Revenue Today', value: '₦30,500', change: '+5.6% vs last period', changeClass: 'text-[#10b981]', bg: '#ffedd5', icon: IconWallet, iconClass: 'text-[#f59e0b]' },
];

const secondStats = [
  { label: 'Ride Bookings', value: '587', change: "Today's ride", changeClass: 'text-[#64748b]', bg: '#dbeafe', icon: IconCar, iconClass: 'text-[#2563eb]' },
  { label: 'Parcel Deliveries', value: '324', change: "Today's deliveries", changeClass: 'text-[#64748b]', bg: '#f3e8ff', icon: IconBox, iconClass: 'text-[#a855f7]' },
  { label: 'Vehicle Hire', value: '89', change: "Today's rental", changeClass: 'text-[#64748b]', bg: '#dcfce7', icon: IconCar, iconClass: 'text-[#22c55e]' },
  { label: 'Bus Bookings', value: '156', change: "Today's ticket", changeClass: 'text-[#64748b]', bg: '#ffedd5', icon: IconCar, iconClass: 'text-[#f59e0b]' },
];

const thirdStats = [
  { label: 'Active Riders', value: '342', change: '+2.7% from last week', changeClass: 'text-[#10b981]', bg: '#dbeafe', icon: IconUsersGroup, iconClass: 'text-[#2563eb]' },
  { label: 'Pending Deliveries', value: '64', change: '+1.3% from last week', changeClass: 'text-[#10b981]', bg: '#ffedd5', icon: IconBox, iconClass: 'text-[#f59e0b]' },
  { label: 'Successful Rides', value: '8,893', change: '+4.2% from last week', changeClass: 'text-[#10b981]', bg: '#dcfce7', icon: IconCar, iconClass: 'text-[#16a34a]' },
  { label: 'Failed Cancels', value: '32', change: '-1.1% from last week', changeClass: 'text-[#ef4444]', bg: '#fee2e2', icon: IconCalendar, iconClass: 'text-[#ef4444]' },
];

const quickActions = [
  { title: 'Manage Users', subtitle: 'View and manage all registered users', icon: IconUsersGroup, iconClass: 'text-[#2563eb]', bg: '#dbeafe' },
  { title: 'Manage Drivers', subtitle: 'Approve, verify, and manage drivers', icon: IconUserPlus, iconClass: 'text-[#22c55e]', bg: '#dcfce7' },
  { title: 'View Bookings', subtitle: 'Track and manage all bookings', icon: IconCalendar, iconClass: 'text-[#a855f7]', bg: '#f3e8ff' },
];

const breakdownLegend = [
  { label: 'Rides', color: '#3b82f6' },
  { label: 'Hike', color: '#a855f7' },
  { label: 'VAN/Bus Ride', color: '#22c55e' },
  { label: 'Parcel', color: '#f59e0b' },
];

const recentBookings = [
  { id: '1', rider: 'Sarah Johnson - #001', meta: 'Downtown Mall → Airport District', amount: '₦2,500', status: 'Completed', badgeClass: 'bg-[#dcfce7] text-[#16a34a]' },
  { id: '2', rider: 'Michael Chen - #007', meta: 'Tech Hub → Sunset Avenue', amount: '₦4,200', status: 'In Progress', badgeClass: 'bg-[#dbeafe] text-[#2563eb]' },
  { id: '3', rider: 'Emma Williams - #024', meta: 'Central Station → River Park', amount: '₦1,850', status: 'Pending', badgeClass: 'bg-[#fef3c7] text-[#d97706]' },
  { id: '4', rider: 'David Brown - #018', meta: 'South Avenue → Hospital Wing', amount: '₦3,100', status: 'Completed', badgeClass: 'bg-[#dcfce7] text-[#16a34a]' },
  { id: '5', rider: 'Sarah Johnson - #037', meta: 'University Gate → Business Plaza', amount: '₦2,025', status: 'Cancelled', badgeClass: 'bg-[#fee2e2] text-[#dc2626]' },
];
</script>

<style scoped>
.chart-grid {
  background-image:
    linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
  background-size: 56px 40px, 56px 40px;
}

.donut-chart {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: conic-gradient(
    #3b82f6 0 32%,
    #a855f7 32% 57%,
    #22c55e 57% 82%,
    #f59e0b 82% 100%
  );
  position: relative;
}

.donut-chart::after {
  content: '';
  position: absolute;
  inset: 28px;
  border-radius: 50%;
  background: #ffffff;
}
</style>

