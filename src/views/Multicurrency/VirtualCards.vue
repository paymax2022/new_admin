<template>
  <div class="min-h-screen bg-[#f7f9fc] p-6 space-y-8">
    <header class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <h1 class="text-2xl font-semibold text-[#111827]">Virtual Cards</h1>
        <p class="text-sm text-[#6b7280]">Manage all virtual USD cards</p>
      </div>
    </header>

    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="card in statCards"
        :key="card.label"
        class="flex flex-col justify-between rounded-3xl border border-transparent bg-white p-5 shadow-[0_20px_40px_rgba(15,23,42,0.05)]"
      >
        <div class="flex items-center justify-between">
          <div class="space-y-2">
            <p class="text-sm font-semibold uppercase tracking-wide text-[#6b7280]">{{ card.label }}</p>
            <p class="text-2xl font-semibold text-[#111827]">{{ card.value }}</p>
          </div>
          <div
            class="flex h-12 w-12 items-center justify-center rounded-2xl"
            :style="{ backgroundColor: card.iconBg, color: card.iconColor }"
          >
            <component :is="card.icon" class="h-6 w-6" />
          </div>
        </div>
        <p class="mt-4 text-sm font-medium" :class="card.deltaColor">{{ card.delta }}</p>
      </article>
    </section>

    <section class="rounded-3xl bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] space-y-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-[#111827]">All Virtual Cards</h2>
          <p class="text-sm text-[#6b7280]">View and manage virtual card details</p>
        </div>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div class="relative flex items-center">
            <IconSearch class="absolute left-4 h-4 w-4 text-[#94a3b8]" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or card number"
              class="w-full rounded-full border border-[#e2e8f0] bg-[#f8fafc] py-2 pl-11 pr-4 text-sm text-[#1f2937] focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#cbd5f5]"
              @input="handleSearch"
            />
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-4 py-2 text-sm font-semibold text-[#475569] transition hover:border-[#cbd5f5] hover:text-[#1e293b]"
          >
            <IconSettings class="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      <div class="rounded-3xl border border-[#e2e8f0] bg-white">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-[#e2e8f0] text-sm text-[#475569]">
            <thead class="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wide text-[#94a3b8]">
              <tr>
                <th class="px-5 py-4 text-left font-semibold text-[#111827]">Card ID</th>
                <th class="px-5 py-4 text-left">User</th>
                <th class="px-5 py-4 text-left">Card Number</th>
                <th class="px-5 py-4 text-left">Balance</th>
                <th class="px-5 py-4 text-left">Status</th>
                <th class="px-5 py-4 text-left">Created</th>
                <th class="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e2e8f0] bg-white">
              <tr v-if="loading">
                <td colspan="7" class="px-5 py-8 text-center text-sm text-[#6b7280]">Loading virtual cards...</td>
              </tr>
              <tr v-else-if="error">
                <td colspan="7" class="px-5 py-8 text-center text-sm text-red-500">{{ error }}</td>
              </tr>
              <tr v-else-if="filteredCards.length === 0">
                <td colspan="7" class="px-5 py-8 text-center text-sm text-[#6b7280]">No virtual cards found</td>
              </tr>
              <tr v-else v-for="(card, index) in filteredCards" :key="card.id" class="relative hover:bg-[#f8fafc] transition">
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ card.id || card.card_id || 'N/A' }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ card.user }}</td>
                <td class="px-5 py-5 text-[#475569]">{{ card.masked }}</td>
                <td class="px-5 py-5 font-semibold text-[#111827]">{{ card.balance }}</td>
                <td class="px-5 py-5">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize"
                    :class="statusClasses[card.status]"
                  >
                    {{ card.status }}
                  </span>
                </td>
                <td class="px-5 py-5 text-[#475569]">{{ card.created }}</td>
                <td class="px-5 py-5 text-right">
                  <div class="relative inline-flex">
                    <button
                      type="button"
                      class="flex h-9 w-9 items-center justify-center rounded-full border border-[#e2e8f0] text-[#475569] transition hover:border-[#cbd5f5]"
                      @click.stop="toggleRowMenu(index)"
                    >
                      <IconHorizontalDots class="h-5 w-5" />
                    </button>
                    <transition name="fade">
                      <div
                        v-if="openMenuIndex === index"
                        class="absolute right-0 top-12 z-[9999] w-40 rounded-2xl border border-[#e2e8f0] bg-white py-2 text-left shadow-[0_20px_40px_rgba(15,23,42,0.12)]"
                      >
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#475569] transition hover:bg-[#f8fafc]"
                          @click="openDetails(card)"
                        >
                          View Details
                          <IconEye class="h-4 w-4 text-[#2563eb]" />
                        </button>
                        <button
                          type="button"
                          class="flex w-full items-center justify-between px-4 py-2 text-sm font-semibold text-[#ef4444] transition hover:bg-[#fef2f2]"
                          @click="openSuspend(card)"
                        >
                          Suspend Card
                          <IconBan class="h-4 w-4" />
                        </button>
                      </div>
                    </transition>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div v-if="!loading && filteredCards.length > 0" class="flex items-center justify-between border-t border-[#e2e8f0] px-5 py-4">
          <div class="text-sm text-[#6b7280]">
            Showing <span class="font-medium text-[#111827]">{{ pagination.startIndex + 1 }}</span> to 
            <span class="font-medium text-[#111827]">{{ pagination.endIndex }}</span> of 
            <span class="font-medium text-[#111827]">{{ totalCount }}</span> entries
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-[#475569]">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="rounded-full border border-[#e2e8f0] px-4 py-2 text-sm text-[#475569] transition hover:bg-[#f8fafc] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>

    <VirtualCardDetailsModal 
      v-if="detailsModal.open && detailsModal.card" 
      :card="{
        ...detailsModal.card,
        status: detailsModal.card.status as 'active' | 'suspended' | 'frozen'
      }" 
      @close="closeDetails" 
    />
    <VirtualCardSuspendModal v-if="suspendModal.open && suspendModal.card" :card="suspendModal.card" @close="closeSuspend" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import userService from '@/services/userService';
import currencyService from '@/services/currencyService';

import IconBan from '@/components/icon/icon-ban.vue';
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconCreditCard from '@/components/icon/icon-credit-card.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconMessageDots from '@/components/icon/icon-message-dots.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconSettings from '@/components/icon/icon-settings.vue';
import IconTrendingUp from '@/components/icon/icon-trending-up.vue';
import IconUserCircle from '@/components/icon/icon-user-circle.vue';
import IconWallet from '@/components/icon/icon-wallet.vue';

import VirtualCardDetailsModal from './components/VirtualCardDetailsModal.vue';
import VirtualCardSuspendModal from './components/VirtualCardSuspendModal.vue';

const toast = useToast();
const loading = ref(false);
const error = ref('');
const searchQuery = ref('');
const currentPage = ref(1);
const limit = ref(10);
const totalCount = ref(0);

type Card = {
  id: string;
  card_id?: string;
  user: string;
  masked: string;
  balance: string;
  status: 'active' | 'suspended' | 'frozen';
  created: string;
  fees?: string;
  user_id?: string;
  cardNumber?: string;
  cardHolderName?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cardType?: string;
  currency?: string;
  status_raw?: string;
};

const cards = ref<Card[]>([]);
const userMap = ref<Record<string, string>>({});

// Fetch user name by ID
const fetchUserName = async (userId: string): Promise<string> => {
  if (userMap.value[userId]) {
    return userMap.value[userId];
  }
  
  try {
    const response = await userService.getUserById(userId);
    const userData = response?.data?.data || response?.data;
    if (userData) {
      const userName = `${userData.first_name || ''} ${userData.lastname || ''}`.trim() || userData.email || 'Unknown User';
      userMap.value[userId] = userName;
      return userName;
    }
  } catch (err) {
    console.error(`Error fetching user ${userId}:`, err);
  }
  
  return 'Unknown User';
};

// Fetch virtual cards from API
const fetchVirtualCards = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const response = await currencyService.getVirtualCards({
      page: currentPage.value,
      limit: limit.value,
    });
    
    // Handle response structure
    let cardsData: any[] = [];
    if (response?.data?.data && Array.isArray(response.data.data)) {
      cardsData = response.data.data;
      totalCount.value = response.data.total_count || response.data.data.length;
    } else if (Array.isArray(response?.data)) {
      cardsData = response.data;
      totalCount.value = cardsData.length;
    }
    
    // Fetch user names for all unique user IDs
    const userIds = [...new Set(cardsData.map((card: any) => card.user_id).filter(Boolean))];
    await Promise.all(userIds.map(userId => fetchUserName(userId)));
    
    // Transform API data to component structure
    cards.value = await Promise.all(cardsData.map(async (card: any) => {
      const userName = card.user_id ? await fetchUserName(card.user_id) : 'Unknown User';
      
      // Map status
      let status: 'active' | 'suspended' | 'frozen' = 'active';
      const statusRaw = (card.status || '').toUpperCase();
      if (statusRaw === 'ACTIVE') {
        status = 'active';
      } else if (statusRaw === 'SUSPENDED' || statusRaw === 'BLOCKED') {
        status = 'suspended';
      } else if (statusRaw === 'FROZEN' || statusRaw === 'INACTIVE') {
        status = 'frozen';
      } else if (!statusRaw) {
        status = 'frozen'; // Default for empty status
      }
      
      // Format card number (already masked in API response)
      const masked = card.cardNumber || '**** **** **** ****';
      
      // Format balance (assuming 0 if not provided, or fetch from another endpoint)
      const balance = card.balance !== undefined 
        ? new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: card.currency || 'USD',
            minimumFractionDigits: 2,
          }).format(card.balance)
        : '$0.00';
      
      // Format date
      const created = card.createdAt 
        ? new Date(card.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'N/A';
      
      return {
        id: card.id || card.card_id || '',
        card_id: card.card_id || '',
        user: userName,
        masked,
        balance,
        status,
        created,
        user_id: card.user_id,
        cardNumber: card.cardNumber,
        cardHolderName: card.cardHolderName,
        expiryMonth: card.expiryMonth,
        expiryYear: card.expiryYear,
        cardType: card.cardType,
        currency: card.currency,
        status_raw: card.status,
      };
    }));
  } catch (err: any) {
    console.error('Error fetching virtual cards:', err);
    error.value = err?.response?.data?.message || 'Failed to load virtual cards';
    toast.error('Failed to load virtual cards');
    cards.value = [];
  } finally {
    loading.value = false;
  }
};

// Filtered cards based on search
const filteredCards = computed(() => {
  if (!searchQuery.value) return cards.value;
  
  const query = searchQuery.value.toLowerCase();
  return cards.value.filter(
    (card) =>
      card.id.toLowerCase().includes(query) ||
      card.user.toLowerCase().includes(query) ||
      card.masked.toLowerCase().includes(query) ||
      (card.cardHolderName && card.cardHolderName.toLowerCase().includes(query))
  );
});

// Pagination
const totalPages = computed(() => Math.ceil(totalCount.value / limit.value));

const pagination = computed(() => {
  const startIndex = (currentPage.value - 1) * limit.value;
  const endIndex = Math.min(startIndex + filteredCards.value.length, totalCount.value);
  return { startIndex, endIndex };
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchVirtualCards();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchVirtualCards();
  }
};

const handleSearch = () => {
  // Search is client-side, no need to refetch
};

// Stat cards with real data
const statCards = computed(() => [
  {
    label: 'Total Cards',
    value: totalCount.value.toLocaleString(),
    delta: '+12% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconCreditCard,
    iconBg: '#eef2ff',
    iconColor: '#4f46e5',
  },
  {
    label: 'Active Cards',
    value: cards.value.filter(c => c.status === 'active').length.toLocaleString(),
    delta: '+10.5% from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconTrendingUp,
    iconBg: '#ecfdf5',
    iconColor: '#22c55e',
  },
  {
    label: 'Total Fees Collected',
    value: '$0', // Fees not in API response, keeping placeholder
    delta: '+$2 from last month',
    deltaColor: 'text-[#22c55e]',
    icon: IconWallet,
    iconBg: '#fdf4ff',
    iconColor: '#a855f7',
  },
]);

const statusClasses: Record<'active' | 'suspended' | 'frozen', string> = {
  active: 'bg-[#ecfdf5] text-[#16a34a]',
  suspended: 'bg-[#fef2f2] text-[#ef4444]',
  frozen: 'bg-[#f8fafc] text-[#64748b]',
};

const openMenuIndex = ref<number | null>(null);
const detailsModal = ref<{ open: boolean; card: Card | null }>({ open: false, card: null });
const suspendModal = ref<{ open: boolean; card: Card | null }>({ open: false, card: null });

const handleClickOutside = () => {
  openMenuIndex.value = null;
};

const toggleRowMenu = (index: number) => {
  openMenuIndex.value = openMenuIndex.value === index ? null : index;
};

const openDetails = (card: Card) => {
  detailsModal.value = { open: true, card };
  openMenuIndex.value = null;
};

const closeDetails = () => {
  detailsModal.value = { open: false, card: null };
};

const openSuspend = (card: Card) => {
  suspendModal.value = { open: true, card };
  openMenuIndex.value = null;
};

const closeSuspend = () => {
  suspendModal.value = { open: false, card: null };
};

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
  fetchVirtualCards();
});

onBeforeUnmount(() => window.removeEventListener('click', handleClickOutside));

watch([currentPage], () => {
  fetchVirtualCards();
});
</script>

