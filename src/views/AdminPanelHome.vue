<template>
    <div class="p-6 space-y-8 bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div>
        <h1 class="text-2xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
        <p class="text-gray-500 dark:text-gray-300 mt-1">Overview of your system's performance and key metrics.</p>
      </div>


    <div class="grid grid-cols-1 dark:bg-gray-900 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center space-x-4">
        <UserIcon class="w-6 h-6 text-blue-600" />
        <div>
          <p class="text-gray-500">Total Users</p>
          <p class="text-xl font-semibold">4,521</p>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center space-x-4">
        <WalletIcon class="w-6 h-6 text-green-600" />
        <div>
          <p class="text-gray-500">Active Wallet</p>
          <p class="text-xl font-semibold">3,827</p>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center space-x-4">
        <ArrowDownUpIcon class="w-6 h-6 text-yellow-600" />
        <div>
          <p class="text-gray-500">Transactions</p>
          <p class="text-xl font-semibold">$245,891</p>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded shadow p-4 flex items-center space-x-4">
        <BadgeDollarSignIcon class="w-6 h-6 text-purple-600" />
        <div>
          <p class="text-gray-500">Commission Paid</p>
          <p class="text-xl font-semibold">$12,345</p>
        </div>
      </div>
    </div>

    <div class="grid dark:bg-gray-800 grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded dark:bg-gray-800 shadow p-4">
        <h2 class="text-lg font-semibold mb-4">User Growth</h2>
        <LineChart />
      </div>
      <div class="bg-white rounded dark:bg-gray-800 shadow p-4">
        <h2 class="text-lg font-semibold mb-4">Wallet Distribution</h2>
        <PieChart />
      </div>
    </div>

    <div class="bg-white rounded shadow p-4 dark:bg-gray-800">
      <h2 class="text-lg font-semibold mb-4">Financial Activity</h2>
      <BarChart />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 dark:bg-gray-800">
      <div class="bg-white rounded shadow p-4 dark:bg-gray-800">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Recent Transactions</h2>
          <a href="#" class="text-sm text-blue-600 hover:underline">View All</a>
        </div>
        <p class="text-sm text-gray-500 mb-4">Latest financial activities in the system</p>
        <ul class="space-y-3 text-sm">
          <li class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="text-green-500">⬆</span>
              <div>
                <p class="font-medium">John Doe</p>
                <p class="text-gray-500">Deposit · TX123456</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-green-600 font-medium">+$1,250.00</p>
              <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Completed</span>
            </div>
          </li>
          <li class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="text-red-500">⬇</span>
              <div>
                <p class="font-medium">Wade Warren</p>
                <p class="text-gray-500">Withdrawal · TX123457</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-red-500 font-medium">-$890.50</p>
              <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Pending</span>
            </div>
          </li>
          <li class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="text-green-500">⬆</span>
              <div>
                <p class="font-medium">Theresa Webb</p>
                <p class="text-gray-500">Commission · TX123458</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-green-600 font-medium">+$45.20</p>
              <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Completed</span>
            </div>
          </li>
          <li class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="text-red-500">⬇</span>
              <div>
                <p class="font-medium">Jacob Jones</p>
                <p class="text-gray-500">Payout · TX123459</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-red-600 font-medium">-$1,500.00</p>
              <span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">Failed</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-white rounded shadow p-4 dark:bg-gray-800">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold">Recently Registered Users</h2>
          <a href="#" class="text-sm text-blue-600 hover:underline">View All</a>
        </div>
        <p class="text-sm text-gray-500 mb-4">New users who recently joined the system</p>
        <ul class="space-y-3 text-sm">
          <li class="flex justify-between items-center">
            <div>
              <p class="font-medium">Sarah Johnson</p>
              <p class="text-gray-500 text-xs">sarah.j@example.com</p>
            </div>
            <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Active</span>
          </li>
          <li class="flex justify-between items-center">
            <div>
              <p class="font-medium">David Miller</p>
              <p class="text-gray-500 text-xs">david.m@example.com</p>
            </div>
            <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Active</span>
          </li>
          <li class="flex justify-between items-center">
            <div>
              <p class="font-medium">Jessica Brown</p>
              <p class="text-gray-500 text-xs">jessica.b@example.com</p>
            </div>
            <span class="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">Inactive</span>
          </li>
          <li class="flex justify-between items-center">
            <div>
              <p class="font-medium">Thomas Clark</p>
              <p class="text-gray-500 text-xs">thomas.c@example.com</p>
            </div>
            <span class="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">Pending</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="bg-white rounded shadow p-4 dark:bg-gray-800 ">
      <h2 class="text-lg font-semibold mb-4">System Alerts</h2>
      <div class="space-y-4 text-sm dark:bg-gray-800">
        <div class="flex items-start gap-3 bg-yellow-50 p-3 rounded border border-yellow-200 dark:bg-gray-800">
          <span class="text-yellow-500 mt-1">⚠️</span>
          <div>
            <p class="font-semibold text-yellow-700">System update scheduled</p>
            <p class="text-gray-600 dark:text-white">A system update is scheduled for April 15, 2023 at 02:00 UTC. Expected downtime is 15 minutes.</p>
          </div>
        </div>
        <div class="flex items-start gap-3 bg-red-50 p-3 rounded border border-red-200 dark:bg-gray-800">
          <span class="text-red-500 mt-1">🔒</span>
          <div>
            <p class="font-semibold text-red-700">High transaction volume detected</p>
            <p class="text-gray-600 dark:text-white">Unusual transaction patterns detected from 5 accounts. Review needed in Security Dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserIcon, WalletIcon, ArrowDownUpIcon, BadgeDollarSignIcon } from 'lucide-vue-next'
import LineChart from '@/components/charts/LineChart.vue'
import PieChart from '@/components/charts/PieChart.vue'
import BarChart from '@/components/charts/BarChart.vue'
</script>

<style scoped>
/* Scoped styles for dashboard layout */
</style>
