<template>
  <div class="p-6 space-y-6">
    <div>
      <h1 class="text-2xl font-semibold mb-1">Member Management</h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">Monitor your organization's key metrics and performance</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
      <div class="rounded-lg bg-blue-50 p-4 text-center">
        <div class="text-xs text-blue-700 mb-1">Total Activities</div>
        <div class="text-2xl font-bold text-blue-700">1,247</div>
      </div>
      <div class="rounded-lg bg-green-50 p-4 text-center">
        <div class="text-xs text-green-700 mb-1">Successful</div>
        <div class="text-2xl font-bold text-green-700">1,198</div>
      </div>
      <div class="rounded-lg bg-red-50 p-4 text-center">
        <div class="text-xs text-red-700 mb-1">Failed</div>
        <div class="text-2xl font-bold text-red-700">49</div>
      </div>
      <div class="rounded-lg bg-purple-50 p-4 text-center">
        <div class="text-xs text-purple-700 mb-1">Today</div>
        <div class="text-2xl font-bold text-purple-700">89</div>
      </div>
    </div>
    <div class="flex flex-col md:flex-row gap-4 items-center mb-2">
      <input type="text" class="flex-1 border rounded px-3 py-2" placeholder="Search by member, action or details" />
      <div class="flex items-center gap-2">
        <input type="text" class="border rounded px-3 py-2 w-36" placeholder="Last 7 days" />
        <button class="border rounded px-3 py-2">&#128197;</button>
      </div>
    </div>
    <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-0 overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-gray-500 border-b">
            <th class="py-2 px-4">Timestamp</th>
            <th class="py-2 px-4">Member</th>
            <th class="py-2 px-4">Action</th>
            <th class="py-2 px-4">Details</th>
            <th class="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="py-2 px-4">2024-01-15 14:30:22</td>
            <td class="py-2 px-4">John Doe</td>
            <td class="py-2 px-4"><a href="#" class="text-blue-600">Registration</a></td>
            <td class="py-2 px-4">Completed account registration with Premium membership</td>
            <td class="py-2 px-4"><span class="text-green-600">Success</span></td>
          </tr>
          <tr>
            <td class="py-2 px-4">2024-01-15 14:25:18</td>
            <td class="py-2 px-4">Jane Smith</td>
            <td class="py-2 px-4"><a href="#" class="text-green-600">Payment</a></td>
            <td class="py-2 px-4">Monthly subscription payment processed</td>
            <td class="py-2 px-4"><span class="text-green-600">Success</span></td>
          </tr>
          <tr>
            <td class="py-2 px-4">2024-01-15 14:20:35</td>
            <td class="py-2 px-4">Bob Johnson</td>
            <td class="py-2 px-4"><a href="#" class="text-purple-600">Login</a></td>
            <td class="py-2 px-4">Failed login attempt - incorrect password</td>
            <td class="py-2 px-4"><span class="text-red-600">Failed</span></td>
          </tr>
          <tr>
            <td class="py-2 px-4">2024-01-15 14:15:33</td>
            <td class="py-2 px-4">Sarah Wilson</td>
            <td class="py-2 px-4"><a href="#" class="text-orange-600">Profile Update</a></td>
            <td class="py-2 px-4">Updated contact information and preferences</td>
            <td class="py-2 px-4"><span class="text-green-600">Success</span></td>
          </tr>
          <tr>
            <td class="py-2 px-4">2024-01-15 14:10:12</td>
            <td class="py-2 px-4">Mike Davis</td>
            <td class="py-2 px-4"><a href="#" class="text-blue-600">Subscription</a></td>
            <td class="py-2 px-4">Upgraded from Basic to Premium membership</td>
            <td class="py-2 px-4"><span class="text-green-600">Success</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic for static demo
</script> 