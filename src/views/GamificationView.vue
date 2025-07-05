<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-semibold">Gamification Management</h1>
      <div class="flex gap-2">
        <button class="flex items-center gap-2 border px-4 py-2 rounded font-medium text-sm" @click="showRulesModal = true"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.9 7.82 20 9 12.91l-5-3.64 5.91-.01z"/></svg>Configure Rules</button>
        <button class="flex items-center gap-2 bg-black text-white px-4 py-2 rounded font-medium text-sm"><svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>Create Badge</button>
      </div>
    </div>
    <div class="flex gap-6 mb-6 border-b">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab" class="pb-2 px-4 font-medium" :class="activeTab === tab ? 'border-b-2 border-black' : 'text-gray-400'">{{ tab }}</button>
    </div>
    <div v-if="activeTab === 'Overview'">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
          <div class="text-2xl font-bold mb-1">4</div>
          <div class="text-xs text-gray-500">Active Badges</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m6 0v-4a2 2 0 012-2h2a2 2 0 012 2v4M13 21h-2"/></svg></span>
          <div class="text-2xl font-bold mb-1">3</div>
          <div class="text-xs text-gray-500">Leaderboards</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 17.75L18.2 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
          <div class="text-2xl font-bold mb-1">546</div>
          <div class="text-xs text-gray-500">Total Badges Earned</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <span class="mb-2"><svg class="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></span>
          <div class="text-2xl font-bold mb-1">87%</div>
          <div class="text-xs text-gray-500">Member Participation</div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-4">Top Performing Badges</div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center gap-3">
              <span class="text-red-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 110 16 8 8 0 010-16zm0 2a6 6 0 100 12A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z"/></svg></span>
              <div>
                <div class="font-medium text-sm">Active Contributor</div>
                <div class="text-xs text-gray-400">89 earned</div>
              </div>
              <div class="ml-auto text-xs text-gray-500">18%<span class="ml-1">completion</span></div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-pink-500"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="4"/></svg></span>
              <div>
                <div class="font-medium text-sm">Meeting Master</div>
                <div class="text-xs text-gray-400">156 earned</div>
              </div>
              <div class="ml-auto text-xs text-gray-500">31%<span class="ml-1">completion</span></div>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-yellow-400"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"/></svg></span>
              <div>
                <div class="font-medium text-sm">Survey Star</div>
                <div class="text-xs text-gray-400">234 earned</div>
              </div>
              <div class="ml-auto text-xs text-gray-500">47%<span class="ml-1">completion</span></div>
            </div>
          </div>
        </div>
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-4">Leaderboard Activity</div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2 text-sm">
              <span class="text-blue-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m6 0v-4a2 2 0 012-2h2a2 2 0 012 2v4M13 21h-2"/></svg></span>
              <span>Top Action Completers</span>
              <span class="ml-auto text-xs text-gray-400">346 participants</span>
              <span class="text-xs text-gray-400 ml-2">Weekly refresh</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-emerald-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2A4.5 4.5 0 0110 14.5h4A4.5 4.5 0 0118.5 19v2"/></svg></span>
              <span>Most Active Members</span>
              <span class="ml-auto text-xs text-gray-400">428 participants</span>
              <span class="text-xs text-gray-400 ml-2">Monthly refresh</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <span class="text-yellow-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 17.75L18.2 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>
              <span>Survey Participation</span>
              <span class="ml-auto text-xs text-gray-400">289 participants</span>
              <span class="text-xs text-gray-400 ml-2">Monthly refresh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'Badges'">
      <div class="font-semibold mb-4">Badge Configuration</div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="badge in demoBadges" :key="badge.name" class="bg-white border rounded-xl p-5 flex flex-col gap-2 shadow-sm">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl" :style="{ color: badge.color }">{{ badge.icon }}</span>
            <div>
              <div class="font-semibold">{{ badge.name }}</div>
              <div class="text-xs text-gray-500">{{ badge.description }}</div>
            </div>
            <span class="ml-auto text-xs font-medium px-2 py-1 rounded-full" :class="badge.earned ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'">{{ badge.earned ? badge.earnedLabel : badge.notEarnedLabel }}</span>
          </div>
          <div class="mb-1">
            <div class="text-xs text-gray-400 mb-1">Completed: <span class="font-medium text-gray-600">{{ badge.completed }}</span></div>
            <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-2 rounded-full" :style="{ width: badge.progress + '%', background: badge.color }"></div>
            </div>
            <div class="text-xs text-right text-gray-500 mt-1">{{ badge.progress }}%</div>
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <span>{{ badge.criteria }}</span>
          </div>
          <div class="flex gap-2 mt-auto">
            <button class="border px-3 py-1 rounded text-xs font-medium" @click="editBadge(badge)">Edit Badge</button>
            <button class="border px-3 py-1 rounded text-xs font-medium" @click="viewRecipients(badge)">View Recipients</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'Leader boards'">
      <div class="flex justify-between items-center mb-4">
        <div class="font-semibold">Leaderboard Management</div>
        <button class="bg-black text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>Create Leaderboard</button>
      </div>
      <div class="space-y-6">
        <div class="bg-white border rounded-xl p-6">
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold">Top Action Completers</div>
            <span class="border px-3 py-1 rounded text-xs">Weekly</span>
            <button class="ml-2 text-gray-400 hover:text-black" @click="openConfigureLeaderboardModal(leaderboardAction[0])">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.06a1 1 0 0 0 .26-1.09l-1-1.73a1 1 0 0 0-.87-.5h-2a1 1 0 0 0-.87.5l-1 1.73a1 1 0 0 0 .26 1.09l1.5 1.5a1 1 0 0 0 1.41 0l1.5-1.5z" />
              </svg>
            </button>
          </div>
          <div class="text-xs text-gray-500 mb-2">Metric: Actions Completed • 146 participants</div>
          <div class="font-medium text-xs mb-2">Top Performers</div>
          <div class="space-y-2">
            <div v-for="(user, i) in leaderboardAction" :key="user.name" class="flex items-center gap-2">
              <span class="text-lg">{{ user.icon }}</span>
              <span class="font-medium">{{ user.name }}</span>
              <span class="text-xs text-gray-400">{{ user.type }}</span>
              <span class="ml-auto text-xs">{{ user.value }}</span>
              <span class="text-xs text-gray-400">actions completed</span>
            </div>
          </div>
        </div>
        <div class="bg-white border rounded-xl p-6">
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold">Most Active Members</div>
            <span class="border px-3 py-1 rounded text-xs">Weekly</span>
            <button class="ml-2 text-gray-400 hover:text-black" @click="openConfigureLeaderboardModal(leaderboardActive[0])">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.06a1 1 0 0 0 .26-1.09l-1-1.73a1 1 0 0 0-.87-.5h-2a1 1 0 0 0-.87.5l-1 1.73a1 1 0 0 0 .26 1.09l1.5 1.5a1 1 0 0 0 1.41 0l1.5-1.5z" />
              </svg>
            </button>
          </div>
          <div class="text-xs text-gray-500 mb-2">Metric: Login Frequency • 120 participants</div>
          <div class="font-medium text-xs mb-2">Top Performers</div>
          <div class="space-y-2">
            <div v-for="(user, i) in leaderboardActive" :key="user.name" class="flex items-center gap-2">
              <span class="text-lg">{{ user.icon }}</span>
              <span class="font-medium">{{ user.name }}</span>
              <span class="text-xs text-gray-400">{{ user.type }}</span>
              <span class="ml-auto text-xs">{{ user.value }}</span>
              <span class="text-xs text-gray-400">login frequency</span>
            </div>
          </div>
        </div>
        <div class="bg-white border rounded-xl p-6">
          <div class="flex justify-between items-center mb-2">
            <div class="font-semibold">Survey Participation</div>
            <span class="border px-3 py-1 rounded text-xs">Weekly</span>
            <button class="ml-2 text-gray-400 hover:text-black" @click="openConfigureLeaderboardModal(leaderboardSurvey[0])">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.06a1 1 0 0 0 .26-1.09l-1-1.73a1 1 0 0 0-.87-.5h-2a1 1 0 0 0-.87.5l-1 1.73a1 1 0 0 0 .26 1.09l1.5 1.5a1 1 0 0 0 1.41 0l1.5-1.5z" />
              </svg>
            </button>
          </div>
          <div class="text-xs text-gray-500 mb-2">Metric: Surveys Completed • 209 participants</div>
          <div class="font-medium text-xs mb-2">Top Performers</div>
          <div class="space-y-2">
            <div v-for="(user, i) in leaderboardSurvey" :key="user.name" class="flex items-center gap-2">
              <span class="text-lg">{{ user.icon }}</span>
              <span class="font-medium">{{ user.name }}</span>
              <span class="text-xs text-gray-400">{{ user.type }}</span>
              <span class="ml-auto text-xs">{{ user.value }}</span>
              <span class="text-xs text-gray-400">surveys completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="activeTab === 'Member Progress'">
      <div class="flex justify-between items-center mb-4">
        <div class="font-semibold">Leaderboard Management</div>
        <button class="bg-black text-white px-4 py-2 rounded text-sm font-medium flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>Create Leaderboard</button>
      </div>
      <div class="font-semibold mb-2">Member Progress Tracking</div>
      <table class="w-full text-sm">
        <thead>
          <tr class="text-left text-xs text-gray-500 border-b">
            <th class="py-2">Member</th>
            <th>Badges Earned</th>
            <th>Next Badge</th>
            <th>Progress</th>
            <th>Rank</th>
            <th>Total Points</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in memberProgressRows" :key="row.member" class="border-b last:border-0">
            <td class="py-2">{{ row.member }}</td>
            <td>{{ row.badges }}</td>
            <td>{{ row.nextBadge }}</td>
            <td>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="h-2 rounded-full bg-green-500" :style="{ width: row.progress + '%' }"></div>
                </div>
                <span class="text-xs text-gray-500">{{ row.progress }}%</span>
              </div>
            </td>
            <td>
              <span class="inline-flex items-center gap-1">
                <span v-if="row.rank === 1">🥇</span>
                <span v-else-if="row.rank === 2">🥈</span>
                <span v-else-if="row.rank === 3">🥉</span>
                <span v-else>🏅</span>
                <span class="text-xs">#{{ row.rank }}</span>
              </span>
            </td>
            <td>{{ row.points }}</td>
            <td><button class="text-blue-600 underline text-xs" @click="openMemberProfileModal(row)">View</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="activeTab === 'Member Progress (Analytics)'"><!-- Analytics Tab Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-green-600 mb-1">+42%</div>
          <div class="text-xs text-gray-500">Member Engagement</div>
          <div class="text-xs text-gray-400 mt-1">Since gamification launch</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-blue-600 mb-1">+28%</div>
          <div class="text-xs text-gray-500">Action Completion</div>
          <div class="text-xs text-gray-400 mt-1">Compared to before</div>
        </div>
        <div class="bg-white border rounded-xl p-4 flex flex-col items-center">
          <div class="text-2xl font-bold text-purple-600 mb-1">+35%</div>
          <div class="text-xs text-gray-500">Survey Participation</div>
          <div class="text-xs text-gray-400 mt-1">Monthly average increase</div>
        </div>
      </div>
      <div class="bg-gray-50 border rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 mb-6">
        <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h4v4"/></svg>
        <div class="font-medium">Badge earning trends over time</div>
        <div class="text-xs">Chart visualization would appear here</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-4">Member Engagement Analysis</div>
          <div class="mb-2 text-xs text-gray-500">Most Motivating Badges</div>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between text-sm">
              <span>Active Contributor</span>
              <span class="text-green-500">+15% activity</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Meeting Master</span>
              <span class="text-green-500">+20% activity</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Survey Star</span>
              <span class="text-green-500">+25% activity</span>
            </div>
          </div>
        </div>
        <div class="bg-white border rounded-xl p-6">
          <div class="font-semibold mb-4">Leaderboard Engagement</div>
          <div class="flex flex-col gap-2">
            <div class="flex justify-between text-sm">
              <span>Top Action Completers</span>
              <a href="#" class="text-blue-600 underline">345 active</a>
            </div>
            <div class="flex justify-between text-sm">
              <span>Most Active Members</span>
              <a href="#" class="text-blue-600 underline">428 active</a>
            </div>
            <div class="flex justify-between text-sm">
              <span>Survey Participation</span>
              <a href="#" class="text-blue-600 underline">289 active</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Configure Gamification Rules Modal -->
  <div v-if="showRulesModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeRulesModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Configure Gamification Rules</h2>
      <div class="flex gap-4 border-b mb-6">
        <button v-for="tab in rulesTabs" :key="tab" @click="activeRulesTab = tab" class="pb-2 px-4 font-medium" :class="activeRulesTab === tab ? 'border-b-2 border-black' : 'text-gray-400'">{{ tab }}</button>
      </div>
      <div v-if="activeRulesTab === 'Point System'">
        <div class="font-medium mb-2">Point Allocation Rules</div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-xs font-medium mb-1">Points per Action</label>
            <input v-model="rulesForm.pointsPerAction" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">Points per Meeting Attendance</label>
            <input v-model="rulesForm.pointsPerMeetingAttendance" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">Points per Missed Attendance</label>
            <input v-model="rulesForm.pointsPerMissedAttendance" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <div class="flex items-center justify-between mb-2">
          <div>
            <div class="font-medium text-sm">Auto-Reward System</div>
            <div class="text-xs text-gray-500">Automatically award points for completed activities</div>
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="rulesForm.autoReward" class="sr-only peer" />
            <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
        </div>
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="font-medium text-sm">Penalty System</div>
            <div class="text-xs text-gray-500">Deduct points for missed commitments</div>
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="rulesForm.penaltySystem" class="sr-only peer" />
            <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeRulesModal">Save Rules</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeRulesModal">Cancel</button>
        </div>
      </div>
      <div v-else-if="activeRulesTab === 'Badge Rules'">
        <div class="font-medium mb-2">Leaderboard Configuration</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-xs font-medium mb-1">Refresh Frequency</label>
            <input v-model="badgeRulesForm.refreshFrequency" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">Maximum Participants</label>
            <input v-model="badgeRulesForm.maxParticipants" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">Survey Star (Surveys)</label>
            <input v-model="badgeRulesForm.surveyStar" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">Community Champion (Days)</label>
            <input v-model="badgeRulesForm.communityChampion" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeRulesModal">Save Rules</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeRulesModal">Cancel</button>
        </div>
      </div>
      <div v-else-if="activeRulesTab === 'Leaderboards'">
        <div class="font-medium mb-2">Badge Earning Thresholds</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-xs font-medium mb-1">Active Contributor (Actions)</label>
            <input v-model="leaderboardRulesForm.activeContributor" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label class="block text-xs font-medium mb-1">Meeting Master (Meetings)</label>
            <input v-model="leaderboardRulesForm.meetingMaster" type="number" class="w-full border rounded px-3 py-2 text-sm" />
          </div>
        </div>
        <div class="flex items-center mb-6">
          <label class="inline-flex items-center cursor-pointer mr-3">
            <input type="checkbox" v-model="leaderboardRulesForm.showAvatars" class="sr-only peer" />
            <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-sm">Show Member Avatars</span>
          <span class="ml-2 text-xs text-gray-500">Display profile pictures in leaderboards</span>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeRulesModal">Save Rules</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeRulesModal">Cancel</button>
        </div>
      </div>
      <div v-else-if="activeRulesTab === 'Notifications'">
        <div class="font-medium mb-4">Notification Settings</div>
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="font-medium text-sm">Badge Earned Notifications</div>
            <div class="text-xs text-gray-500">Notify members when they earn new badges</div>
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notificationRulesForm.badgeEarned" class="sr-only peer" />
            <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
        </div>
        <div class="flex items-center justify-between mb-6">
          <div>
            <div class="font-medium text-sm">Leaderboard Position Changes</div>
            <div class="text-xs text-gray-500">Notify when members move up in rankings</div>
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notificationRulesForm.leaderboardPosition" class="sr-only peer" />
            <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
        </div>
        <div class="flex items-center justify-between mb-8">
          <div>
            <div class="font-medium text-sm">Points Earned Notifications</div>
            <div class="text-xs text-gray-500">Notify members for each point earned</div>
          </div>
          <label class="inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="notificationRulesForm.pointsEarned" class="sr-only peer" />
            <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
        </div>
        <div class="flex gap-2">
          <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeRulesModal">Save Rules</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeRulesModal">Cancel</button>
        </div>
      </div>
      <div v-else class="text-gray-400 text-center py-8">(Tab content not implemented)</div>
    </div>
  </div>
  <!-- Create New Badge Modal -->
  <div v-if="showCreateBadgeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeCreateBadgeModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Create New Badge</h2>
      <div class="mb-6">
        <div class="font-medium mb-2">Badge Preview</div>
        <div class="flex items-center gap-3 border rounded-lg p-3 bg-gray-50 mb-2">
          <span class="text-2xl" :style="{ color: badgeForm.color }">{{ badgeForm.icon }}</span>
          <div>
            <div class="font-semibold">{{ badgeForm.name || 'Badge Name' }}</div>
            <div class="text-xs text-gray-500">{{ badgeForm.description || 'Badge description' }}</div>
            <div class="text-xs text-blue-600 mt-1 cursor-pointer">Criteria not set</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium mb-1">Badge Name *</label>
          <input v-model="badgeForm.name" type="text" class="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Super Contributor" />
        </div>
        <div>
          <label class="block text-xs font-medium mb-1">Category</label>
          <input v-model="badgeForm.category" type="text" class="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. Participation, Leadership" />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Description *</label>
        <textarea v-model="badgeForm.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Describe what this badge represents and how to earn it" />
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Badge Icon</label>
        <div class="grid grid-cols-8 gap-2">
          <button v-for="icon in badgeIcons" :key="icon" @click="badgeForm.icon = icon" :class="['text-xl p-1 rounded border', badgeForm.icon === icon ? 'border-black bg-gray-100' : 'border-transparent']">{{ icon }}</button>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Badge Color</label>
        <div class="grid grid-cols-6 gap-2">
          <button v-for="color in badgeColors" :key="color.value" @click="badgeForm.color = color.value" :class="['px-3 py-2 rounded', badgeForm.color === color.value ? 'ring-2 ring-black' : '']" :style="{ background: color.value, color: color.text }">{{ color.label }}</button>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Earning Criteria</label>
        <div class="grid grid-cols-2 gap-2">
          <select v-model="badgeForm.criteriaType" class="border rounded px-3 py-2 text-sm">
            <option value="">Criteria Type *</option>
            <option value="action">Action count</option>
            <option value="meeting">Meeting attendance</option>
            <option value="survey">Survey participation</option>
          </select>
          <input v-model="badgeForm.criteriaValue" type="text" class="border rounded px-3 py-2 text-sm" placeholder="e.g. 10, 100, 25" />
        </div>
      </div>
      <div class="flex gap-2 mt-6">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeCreateBadgeModal">Create Badge</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeCreateBadgeModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Edit Badge Modal -->
  <div v-if="showEditBadgeModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeEditBadgeModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Edit Badge</h2>
      <div class="mb-6">
        <div class="font-medium mb-2">Badge Preview</div>
        <div class="flex items-center gap-3 border rounded-lg p-3 bg-gray-50 mb-2">
          <span class="text-2xl" :style="{ color: editBadgeForm.color }">{{ editBadgeForm.icon }}</span>
          <div>
            <div class="font-semibold">{{ editBadgeForm.name || 'Badge Name' }}</div>
            <div class="text-xs text-gray-500">{{ editBadgeForm.description || 'Badge description' }}</div>
            <div class="text-xs text-blue-600 mt-1 cursor-pointer">{{ editBadgeForm.earnedLabel || 'Not earned' }}</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium mb-1">Badge Name *</label>
          <input v-model="editBadgeForm.name" type="text" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium mb-1">Category</label>
          <input v-model="editBadgeForm.category" type="text" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium mb-1">Currently Earned</label>
          <input v-model="editBadgeForm.earnedLabel" type="text" class="w-full border rounded px-3 py-2 text-sm bg-blue-50" readonly />
        </div>
        <div>
          <label class="block text-xs font-medium mb-1">Completion Rate</label>
          <input v-model="editBadgeForm.completionRate" type="text" class="w-full border rounded px-3 py-2 text-sm bg-blue-50" readonly />
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Description *</label>
        <textarea v-model="editBadgeForm.description" class="w-full border rounded px-3 py-2 text-sm" />
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Badge Icon</label>
        <div class="grid grid-cols-8 gap-2">
          <button v-for="icon in badgeIcons" :key="icon" @click="editBadgeForm.icon = icon" :class="['text-xl p-1 rounded border', editBadgeForm.icon === icon ? 'border-black bg-gray-100' : 'border-transparent']">{{ icon }}</button>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Badge Color</label>
        <div class="grid grid-cols-6 gap-2">
          <button v-for="color in badgeColors" :key="color.value" @click="editBadgeForm.color = color.value" :class="['px-3 py-2 rounded', editBadgeForm.color === color.value ? 'ring-2 ring-black' : '']" :style="{ background: color.value, color: color.text }">{{ color.label }}</button>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Earning Criteria</label>
        <div class="grid grid-cols-2 gap-2">
          <select v-model="editBadgeForm.criteriaType" class="border rounded px-3 py-2 text-sm">
            <option value="">Criteria Type *</option>
            <option value="action">Action count</option>
            <option value="meeting">Meeting attendance</option>
            <option value="survey">Survey participation</option>
          </select>
          <input v-model="editBadgeForm.criteriaValue" type="text" class="border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <div class="flex items-center mb-6">
        <span class="text-sm font-medium mr-4">Badge Active</span>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="editBadgeForm.active" class="sr-only peer" />
          <div class="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
        </label>
        <span class="ml-2 text-xs text-gray-500">Badge will appear in your list if toggled</span>
      </div>
      <div class="flex gap-2 mt-6">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeEditBadgeModal">Save Changes</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeEditBadgeModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Badge Recipients Modal -->
  <div v-if="showRecipientsModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeRecipientsModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Badge Recipients</h2>
      <div class="flex items-center gap-3 mb-4">
        <span class="text-2xl" :style="{ color: selectedBadge?.color }">{{ selectedBadge?.icon }}</span>
        <div>
          <div class="font-medium">Badge Recipients</div>
          <div class="text-xs text-gray-500">{{ selectedBadge?.criteria }}</div>
        </div>
        <span class="ml-auto text-emerald-600 font-semibold text-lg">{{ recipientsStats.total }}</span>
        <span class="text-xs text-gray-400 ml-1">total recipients</span>
      </div>
      <div class="flex gap-2 mb-4">
        <input type="text" class="border rounded px-3 py-2 text-sm w-full" placeholder="Search recipient" v-model="recipientsSearch" />
        <select class="border rounded px-2 py-2 text-sm" v-model="recipientsSort">
          <option>Most recent</option>
          <option>Oldest</option>
        </select>
        <select class="border rounded px-2 py-2 text-sm" v-model="recipientsFilter">
          <option>All Members</option>
          <option>Premium</option>
          <option>Standard</option>
          <option>Basic</option>
        </select>
        <button class="border px-3 py-2 rounded text-sm">Export</button>
      </div>
      <div class="grid grid-cols-4 gap-2 mb-4">
        <div class="bg-gray-50 rounded p-2 text-center">
          <div class="text-lg font-bold">3</div>
          <div class="text-xs text-gray-500">Premium members</div>
        </div>
        <div class="bg-gray-50 rounded p-2 text-center">
          <div class="text-lg font-bold">1</div>
          <div class="text-xs text-gray-500">Standard members</div>
        </div>
        <div class="bg-gray-50 rounded p-2 text-center">
          <div class="text-lg font-bold">9</div>
          <div class="text-xs text-gray-500">Total badges</div>
        </div>
        <div class="bg-gray-50 rounded p-2 text-center">
          <div class="text-lg font-bold">18%</div>
          <div class="text-xs text-gray-500">Completion rate</div>
        </div>
      </div>
      <table class="w-full text-sm mb-2">
        <thead>
          <tr class="text-left text-xs text-gray-500 border-b">
            <th class="py-2">Member</th>
            <th>Membership Type</th>
            <th>Date Earned</th>
            <th>Total Badges</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipient in recipients" :key="recipient.email" class="border-b last:border-0">
            <td class="py-2">
              <div class="font-medium">{{ recipient.name }}</div>
              <div class="text-xs text-gray-400">{{ recipient.email }}</div>
            </td>
            <td>
              <span :class="['px-2 py-1 rounded text-xs font-medium', recipient.type === 'Premium' ? 'bg-purple-100 text-purple-700' : recipient.type === 'Standard' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700']">{{ recipient.type }}</span>
            </td>
            <td>{{ recipient.date }}</td>
            <td>{{ recipient.totalBadges }}</td>
            <td><button class="border px-2 py-1 rounded text-xs" @click="openSendMessageModal(recipient)">Send Message</button></td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
        <span>Showing {{ recipients.length }} of {{ recipientsStats.total }} recipients</span>
        <div class="flex gap-2">
          <button class="border px-2 py-1 rounded" :disabled="recipientsPage === 1">Previous</button>
          <button class="border px-2 py-1 rounded" :disabled="recipientsPage === recipientsStats.pages">Next</button>
        </div>
      </div>
      <div class="flex justify-end">
        <button class="border px-4 py-2 rounded" @click="closeRecipientsModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Send Message Modal -->
  <div v-if="showSendMessageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeSendMessageModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Send Message</h2>
      <div class="mb-4">
        <div class="text-sm font-medium mb-2">Send a message to {{ messageRecipient?.name }}</div>
        <label class="block text-xs font-medium mb-1">Subject</label>
        <input v-model="messageForm.subject" type="text" class="w-full border rounded px-3 py-2 text-sm mb-4" placeholder="Enter Message Subject..." />
        <label class="block text-xs font-medium mb-1">Message</label>
        <textarea v-model="messageForm.body" class="w-full border rounded px-3 py-2 text-sm" rows="4" placeholder="Enter your Message" />
      </div>
      <div class="flex gap-2 mt-4">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeSendMessageModal">Send Message</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeSendMessageModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Create New Leaderboard Modal -->
  <div v-if="showCreateLeaderboardModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeCreateLeaderboardModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Create New Leaderboard</h2>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Leaderboard Name</label>
        <input v-model="leaderboardForm.name" type="text" class="w-full border rounded px-3 py-2 text-sm mb-2" placeholder="Leaderboard Name" />
        <span class="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Leaderboard Icon</label>
        <input v-model="leaderboardForm.icon" type="text" class="w-full border rounded px-3 py-2 text-sm" placeholder="e.g. 🏆, 🎯, etc." />
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Description</label>
        <textarea v-model="leaderboardForm.description" class="w-full border rounded px-3 py-2 text-sm" placeholder="Describe what this leaderboard is for and how users earn points" />
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium mb-1">Category</label>
          <input v-model="leaderboardForm.category" type="text" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
        <div>
          <label class="block text-xs font-medium mb-1">Max Participants</label>
          <input v-model="leaderboardForm.maxParticipants" type="number" class="w-full border rounded px-3 py-2 text-sm" />
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium mb-1">Metric to Track</label>
          <select v-model="leaderboardForm.metric" class="w-full border rounded px-3 py-2 text-sm">
            <option>Actions Completed</option>
            <option>Login Frequency</option>
            <option>Surveys Completed</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium mb-1">Reset Schedule</label>
          <select v-model="leaderboardForm.resetSchedule" class="w-full border rounded px-3 py-2 text-sm">
            <option>Never</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-xs font-medium mb-1">Refresh Frequency</label>
          <select v-model="leaderboardForm.frequency" class="w-full border rounded px-3 py-2 text-sm">
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-medium text-xs mb-2">Display Settings</div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="leaderboardForm.showAvatars" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Show Profile pictures in leaderboard</span>
        </div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="leaderboardForm.showRanks" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Show Ranks</span>
        </div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="leaderboardForm.showPoints" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Show Points</span>
        </div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="leaderboardForm.showBadges" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Leaderboard Award Icon (show badge)</span>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-xs font-medium mb-1">Leaderboard Award Rules</label>
        <textarea v-model="leaderboardForm.rules" class="w-full border rounded px-3 py-2 text-sm" rows="3" placeholder="e.g. Complete 10 actions to earn this badge..." />
      </div>
      <div class="flex gap-2 mt-6">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeCreateLeaderboardModal">Create Leaderboard</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeCreateLeaderboardModal">Cancel</button>
      </div>
    </div>
  </div>
  <!-- Configure Leaderboard Modal -->
  <div v-if="showConfigureLeaderboardModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-xl relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeConfigureLeaderboardModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <h2 class="text-lg font-semibold mb-4">Configure Leaderboard</h2>
      <div class="mb-4">
        <div class="font-medium mb-2">Basic Information</div>
        <label class="block text-xs font-medium mb-1">Leaderboard Name</label>
        <input v-model="configureLeaderboardForm.name" type="text" class="w-full border rounded px-3 py-2 text-sm mb-2" />
        <label class="block text-xs font-medium mb-1">Description</label>
        <textarea v-model="configureLeaderboardForm.description" class="w-full border rounded px-3 py-2 text-sm mb-2" />
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="configureLeaderboardForm.active" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Active Leaderboard</span>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-medium text-xs mb-2">Metrics & Tracking</div>
        <label class="block text-xs font-medium mb-1">Tracking Metric</label>
        <select v-model="configureLeaderboardForm.metric" class="w-full border rounded px-3 py-2 text-sm mb-2">
          <option>Actions Completed</option>
          <option>Login Frequency</option>
          <option>Surveys Completed</option>
        </select>
        <label class="block text-xs font-medium mb-1">Refresh Frequency</label>
        <select v-model="configureLeaderboardForm.frequency" class="w-full border rounded px-3 py-2 text-sm mb-2">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
        <label class="block text-xs font-medium mb-1">Maximum Participants (optional)</label>
        <input v-model="configureLeaderboardForm.maxParticipants" type="number" class="w-full border rounded px-3 py-2 text-sm mb-2" placeholder="Leave empty for unlimited" />
      </div>
      <div class="mb-4">
        <div class="font-medium text-xs mb-2">Display Settings</div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="configureLeaderboardForm.showDashboard" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Show on Member Dashboard</span>
        </div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="configureLeaderboardForm.allowViewPosition" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Allow Members to View Their Position</span>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-medium text-xs mb-2">Display Settings</div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="configureLeaderboardForm.showDashboard2" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Show on Member Dashboard</span>
        </div>
        <div class="flex items-center mb-2">
          <label class="inline-flex items-center cursor-pointer mr-2">
            <input type="checkbox" v-model="configureLeaderboardForm.allowViewPosition2" class="sr-only peer" />
            <div class="w-8 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition"></div>
          </label>
          <span class="text-xs">Allow Members to View Their Position</span>
        </div>
      </div>
      <div class="flex items-center gap-2 mb-4">
        <span class="text-2xl font-bold text-blue-600">345</span>
        <span class="border px-3 py-1 rounded text-xs">Weekly</span>
      </div>
      <div class="flex gap-2 mt-6">
        <button class="bg-black text-white px-4 py-2 rounded w-full" @click="closeConfigureLeaderboardModal">Save Configuration</button>
        <button class="border px-4 py-2 rounded w-full" @click="closeConfigureLeaderboardModal">Cancel</button>
      </div>
    </div>
  </div>
  <div v-if="showMemberProfileModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
      <button class="absolute top-3 right-3 text-gray-400 hover:text-gray-700" @click="closeMemberProfileModal">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <div class="font-semibold text-lg mb-1">{{ memberProfile?.member }}</div>
      <div class="text-xs text-gray-500 mb-4">Member Profile</div>
      <div class="grid grid-cols-4 gap-2 mb-4">
        <div class="bg-gray-50 rounded p-2 text-center">
          <div class="text-lg font-bold">91</div>
          <div class="text-xs text-gray-500">all users</div>
        </div>
        <div class="bg-gray-50 rounded p-2 text-center">
          <div class="text-lg font-bold">3</div>
          <div class="text-xs text-gray-500">badges</div>
        </div>
        <div class="bg-gray-50 rounded p-2 text-center">
          <div class="text-lg font-bold">245</div>
          <div class="text-xs text-gray-500">points</div>
        </div>
        <div class="bg-gray-50 rounded p-2 text-center">
          <div class="text-lg font-bold">79%</div>
          <div class="text-xs text-gray-500">completion</div>
        </div>
      </div>
      <div class="flex gap-4 border-b mb-4">
        <button class="pb-2 px-4 font-medium" :class="memberProfileTab === 'Badges' ? 'border-b-2 border-black' : 'text-gray-400'" @click="memberProfileTab = 'Badges'">Badges</button>
        <button class="pb-2 px-4 font-medium" :class="memberProfileTab === 'Progress' ? 'border-b-2 border-black' : 'text-gray-400'" @click="memberProfileTab = 'Progress'">Progress</button>
        <button class="pb-2 px-4 font-medium" :class="memberProfileTab === 'Activity History' ? 'border-b-2 border-black' : 'text-gray-400'" @click="memberProfileTab = 'Activity History'">Activity History</button>
      </div>
      <div v-if="memberProfileTab === 'Progress'">
        <div class="font-medium mb-2">Progress Toward Next Badge</div>
        <div class="mb-2">Community Champion</div>
        <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div class="h-2 rounded-full bg-green-500" style="width: 75%"></div>
        </div>
        <div class="text-xs text-gray-500 mb-2">75% complete</div>
        <div class="font-medium mb-1">Requirements:</div>
        <div class="flex items-center justify-between text-xs mb-1">
          <span>Complete 10 action points</span>
          <span>10/10</span>
        </div>
        <div class="flex items-center justify-between text-xs mb-4">
          <span>Attend 3 more meetings</span>
          <span>0/3</span>
        </div>
        <div class="flex gap-2 mt-4">
          <button class="bg-black text-white px-4 py-2 rounded w-full">Send Message</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeMemberProfileModal">Cancel</button>
        </div>
      </div>
      <div v-else-if="memberProfileTab === 'Badges'">
        <div class="font-medium mb-2">Earned Badges:</div>
        <div class="flex flex-col gap-2 mb-4">
          <div v-for="badge in memberProfileBadges" :key="badge.name" class="flex items-center gap-3 border rounded-lg p-3 bg-gray-50">
            <span class="text-xl" :style="{ color: badge.color }">{{ badge.icon }}</span>
            <div class="flex-1">
              <div class="font-semibold text-sm">{{ badge.name }}</div>
              <div class="text-xs text-gray-500">{{ badge.description }}</div>
            </div>
            <span class="text-xs font-medium px-2 py-1 rounded-full" :class="badge.earned ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'">{{ badge.earned ? 'Earned' : 'Not earned' }}</span>
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button class="bg-black text-white px-4 py-2 rounded w-full">Send Message</button>
          <button class="border px-4 py-2 rounded w-full" @click="closeMemberProfileModal">Cancel</button>
        </div>
      </div>
      <div v-else class="text-gray-400 text-center py-8">(Tab content not implemented)</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const tabs = ['Overview', 'Badges', 'Leader boards', 'Member Progress', 'Member Progress (Analytics)'];
const activeTab = ref('Overview');
const showRulesModal = ref(false);
const rulesTabs = ['Point System', 'Badge Rules', 'Leaderboards', 'Notifications'];
const activeRulesTab = ref('Point System');
const rulesForm = ref({
  pointsPerAction: 0,
  pointsPerMeetingAttendance: 0,
  pointsPerMissedAttendance: 0,
  autoReward: false,
  penaltySystem: false,
});
const badgeRulesForm = ref({
  refreshFrequency: 0,
  maxParticipants: 0,
  surveyStar: 0,
  communityChampion: 0,
});
const leaderboardRulesForm = ref({
  activeContributor: 0,
  meetingMaster: 0,
  showAvatars: false,
});
const notificationRulesForm = ref({
  badgeEarned: false,
  leaderboardPosition: false,
  pointsEarned: false,
});
const showCreateBadgeModal = ref(false);
const showEditBadgeModal = ref(false);
const showRecipientsModal = ref(false);
const showSendMessageModal = ref(false);
const selectedBadge = ref<any>(null);
const recipientsSearch = ref('');
const recipientsSort = ref('Most recent');
const recipientsFilter = ref('All Members');
const recipientsPage = ref(1);
const recipientsStats = {
  total: 89,
  pages: 1,
};
const recipients = [
  { name: 'John Doe', email: 'john@ex.com', type: 'Premium', date: '2024-08-20', totalBadges: '8 badges' },
  { name: 'John Doe', email: 'john@ex.com', type: 'Standard', date: '2024-08-20', totalBadges: '6 badges' },
  { name: 'John Doe', email: 'john@ex.com', type: 'Basic', date: '2024-08-20', totalBadges: '4 badges' },
  { name: 'John Doe', email: 'john@ex.com', type: 'Premium', date: '2024-08-20', totalBadges: '8 badges' },
  { name: 'John Doe', email: 'john@ex.com', type: 'Basic', date: '2024-08-20', totalBadges: '4 badges' },
];
const badgeIcons = [
  '🏆', '⭐', '🎖️', '🏅', '🥇', '🥈', '🥉', '🎯',
  '🔥', '💡', '🧠', '💎', '🌟', '🦸', '🦄', '🚀',
];
const badgeColors = [
  { label: 'Blue', value: '#dbeafe', text: '#1e40af' },
  { label: 'Green', value: '#dcfce7', text: '#166534' },
  { label: 'Yellow', value: '#fef9c3', text: '#a16207' },
  { label: 'Purple', value: '#ede9fe', text: '#6d28d9' },
  { label: 'Red', value: '#fee2e2', text: '#b91c1c' },
  { label: 'Orange', value: '#ffedd5', text: '#c2410c' },
];
const badgeForm = ref({
  name: '',
  category: '',
  description: '',
  icon: badgeIcons[0],
  color: badgeColors[0].value,
  criteriaType: '',
  criteriaValue: '',
});
const editBadgeForm = ref({
  name: '',
  category: '',
  description: '',
  icon: badgeIcons[0],
  color: badgeColors[0].value,
  criteriaType: '',
  criteriaValue: '',
  earnedLabel: '',
  completionRate: '',
  active: true,
});
const messageRecipient = ref<any>(null);
const messageForm = ref({ subject: '', body: '' });
const leaderboardAction = [
  { icon: '🥇', name: 'John Doe', type: 'Premium', value: 45 },
  { icon: '🥈', name: 'Jane Smith', type: 'Premium', value: 38 },
  { icon: '🥉', name: 'Bob Johnson', type: 'Premium', value: 32 },
];
const leaderboardActive = [
  { icon: '🥇', name: 'Sarah Wilson', type: 'Premium', value: 45 },
  { icon: '🥈', name: 'Mike Davis', type: 'Premium', value: 38 },
  { icon: '🥉', name: 'Lisa Anderson', type: 'Premium', value: 32 },
];
const leaderboardSurvey = [
  { icon: '🥇', name: 'David Brown', type: 'Premium', value: 16 },
  { icon: '🥈', name: 'Emma Jones', type: 'Premium', value: 11 },
  { icon: '🥉', name: 'Alex Lee', type: 'Premium', value: 10 },
];
const showCreateLeaderboardModal = ref(false);
const leaderboardForm = ref({
  name: '',
  icon: '',
  description: '',
  category: '',
  maxParticipants: 0,
  metric: 'Actions Completed',
  frequency: 'Weekly',
  resetSchedule: 'Never',
  showAvatars: false,
  showRanks: false,
  showPoints: false,
  showBadges: false,
  rules: '',
});
const showConfigureLeaderboardModal = ref(false);
const configureLeaderboardForm = ref({
  name: '',
  description: '',
  active: true,
  metric: 'Actions Completed',
  frequency: 'Weekly',
  maxParticipants: '',
  showDashboard: false,
  allowViewPosition: false,
  showDashboard2: false,
  allowViewPosition2: false,
});
const memberProgressRows = [
  { member: 'John Doe', badges: '3 badges', nextBadge: 'Community Champion', progress: 75, rank: 1, points: 245 },
  { member: 'Jane Smith', badges: '2 badges', nextBadge: 'Active Contributor', progress: 60, rank: 2, points: 198 },
  { member: 'Bob Johnson', badges: '4 badges', nextBadge: 'Meeting Master', progress: 80, rank: 3, points: 187 },
  { member: 'Bob Johnson', badges: '4 badges', nextBadge: 'Meeting Master', progress: 60, rank: 4, points: 187 },
];
const showMemberProfileModal = ref(false);
const memberProfile = ref<any>(null);
const memberProfileTab = ref('Progress');
const memberProfileBadges = [
  {
    name: 'Active Contributor',
    description: 'Completed 10 action points',
    icon: '🍎',
    color: '#ef4444',
    earned: true,
  },
  {
    name: 'Meeting Master',
    description: 'Attended 5 meetings',
    icon: '🎯',
    color: '#22d3ee',
    earned: true,
  },
  {
    name: 'Survey Star',
    description: 'Participated in 3 surveys',
    icon: '⭐',
    color: '#facc15',
    earned: false,
  },
];
function closeRulesModal() {
  showRulesModal.value = false;
}
function closeCreateBadgeModal() {
  showCreateBadgeModal.value = false;
}
function closeEditBadgeModal() {
  showEditBadgeModal.value = false;
}
function closeRecipientsModal() {
  showRecipientsModal.value = false;
}
function openSendMessageModal(recipient) {
  messageRecipient.value = recipient;
  messageForm.value = { subject: '', body: '' };
  showSendMessageModal.value = true;
}
function closeSendMessageModal() {
  showSendMessageModal.value = false;
}
function openCreateLeaderboardModal() {
  showCreateLeaderboardModal.value = true;
}
function closeCreateLeaderboardModal() {
  showCreateLeaderboardModal.value = false;
}
function openConfigureLeaderboardModal(leaderboard) {
  configureLeaderboardForm.value = {
    name: leaderboard?.name || '',
    description: leaderboard?.description || '',
    active: true,
    metric: leaderboard?.metric || 'Actions Completed',
    frequency: leaderboard?.frequency || 'Weekly',
    maxParticipants: leaderboard?.maxParticipants || '',
    showDashboard: false,
    allowViewPosition: false,
    showDashboard2: false,
    allowViewPosition2: false,
  };
  showConfigureLeaderboardModal.value = true;
}
function closeConfigureLeaderboardModal() {
  showConfigureLeaderboardModal.value = false;
}
const demoBadges = [
  {
    name: 'Active Contributor',
    description: 'Complete 10 action points',
    icon: '🍎',
    color: '#ef4444',
    earned: true,
    earnedLabel: '87 earned',
    notEarnedLabel: 'Not earned',
    completed: '10 action points',
    progress: 18,
    criteria: 'Complete 10 action points',
  },
  {
    name: 'Meeting Master',
    description: 'Attend 5 meetings',
    icon: '🎯',
    color: '#22d3ee',
    earned: true,
    earnedLabel: '156 earned',
    notEarnedLabel: 'Not earned',
    completed: '5 meetings',
    progress: 18,
    criteria: 'Attend 5 meetings',
  },
  {
    name: 'Survey Star',
    description: 'Participate in 3 surveys',
    icon: '⭐',
    color: '#facc15',
    earned: false,
    earnedLabel: '234 earned',
    notEarnedLabel: '234 earned',
    completed: '3 surveys',
    progress: 18,
    criteria: 'Participate in 3 surveys',
  },
  {
    name: 'Community Champion',
    description: 'Be a member for 1 year',
    icon: '🏆',
    color: '#a78bfa',
    earned: true,
    earnedLabel: '67 earned',
    notEarnedLabel: 'Not earned',
    completed: '1 year',
    progress: 18,
    criteria: 'Be a member for 1 year',
  },
];
function editBadge(badge) {
  editBadgeForm.value = {
    name: badge.name,
    category: badge.category || '',
    description: badge.description,
    icon: badge.icon,
    color: badge.color,
    criteriaType: badge.criteriaType || '',
    criteriaValue: badge.criteriaValue || '',
    earnedLabel: badge.earnedLabel,
    completionRate: badge.progress + '%',
    active: badge.active !== undefined ? badge.active : true,
  };
  showEditBadgeModal.value = true;
}
function viewRecipients(badge) {
  selectedBadge.value = badge;
  showRecipientsModal.value = true;
}
function openMemberProfileModal(row) {
  memberProfile.value = row;
  memberProfileTab.value = 'Progress';
  showMemberProfileModal.value = true;
}
function closeMemberProfileModal() {
  showMemberProfileModal.value = false;
}
</script> 