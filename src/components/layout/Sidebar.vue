<template>
    <div :class="{ 'dark text-white-dark': store.semidark }">
        <nav
            class="sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300">
            <div class="bg-white dark:bg-[#0e1726] h-full">
                <div class="flex justify-between items-center px-4 py-3">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="" />
                        <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">PAYMAX</span>
                    </router-link>
                    <a href="javascript:;"
                        class="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180 hover:text-primary"
                        @click="store.toggleSidebar()">
                        <icon-carets-down class="m-auto rotate-90" />
                    </a>
                </div>

                <perfect-scrollbar :options="{
                    swipeEasing: true,
                    wheelPropagation: false,
                }" class="h-[calc(100vh-80px)] relative">
                    <ul class="relative font-semibold space-y-0.5 p-4 py-0">
                        <li class="menu nav-item">
                            <router-link :to="{ name: 'dashboard' }" class="nav-link group" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <icon-menu-dashboard class="group-hover:!text-primary shrink-0" />

                                    <span
                                        class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('dashboard') }}</span>
                                </div>
                            </router-link>
                        </li>
                        <li class="menu nav-item">
                            <router-link :to="{ name: 'profile' }" class="nav-link group" @click="toggleMobileMenu">
                                <div class="flex items-center">
                                    <icon-menu-users class="group-hover:!text-primary shrink-0" />

                                    <span
                                        class="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{{
                                            $t('profile') }}</span>
                                </div>
                            </router-link>
                        </li>

                        <h2
                            class="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                            <icon-minus class="w-4 h-5 flex-none hidden" />
                            <span>{{ $t('services') }}</span>
                        </h2>

                        <!-- Modules/Services Navigations -->
                        <UserManagementNavigation />
                        <RoleManagementNavigation />
                        <FinancialManagementNavigation />
                        <ReferralNavigation />
                        <DisputeNavigation />
                        <BillsPaymentNavigation />
                        <CrowdfundingNavigation />
                        <DeliveryNavigation />
                        <EventsNavigation />
                        <GroupMembershipNavigation />
                        <InsuranceNavigation />
                        <RestaurantNavigation />
                        <TransactionsNavigation />
                        <UsersMgtNavigation />
                        <VisitorMgtNavigation />
                        <VotingNavigation />
                    </ul>
                </perfect-scrollbar>
            </div>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';

import { useAppStore } from '@/stores/index';

import IconCaretsDown from '@/components/icon/icon-carets-down.vue';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard.vue';
import IconMenuUsers from '@/components/icon/menu/icon-menu-users.vue';
import IconMinus from '@/components/icon/icon-minus.vue';

import UserManagementNavigation from '../modules/UserManagementNavigation.vue';
import RoleManagementNavigation from '../modules/RoleManagementNavigation.vue';
import FinancialManagementNavigation from '../modules/FinancialManagementNavigation.vue';
import ReferralNavigation from '../modules/ReferralNavigation.vue';
import DisputeNavigation from '../modules/DisputeNavigation.vue';
import BillsPaymentNavigation from '../modules/BillsPayment/BillsPaymentNavigation.vue';
import CrowdfundingNavigation from '../modules/Crowdfunding/CrowdfundingNavigation.vue';
import DeliveryNavigation from '../modules/Delivery/DeliveryNavigation.vue';
import EventsNavigation from '../modules/Events/EventsNavigation.vue';
import GroupMembershipNavigation from '../modules/GroupMembership/GroupMembershipNavigation.vue';
import InsuranceNavigation from '../modules/Insurance/InsuranceNavigation.vue';
import RestaurantNavigation from '../modules/Restaurant/RestaurantNavigation.vue';
import TransactionsNavigation from '../modules/Transactions/TransactionsNavigation.vue';
import UsersMgtNavigation from '../modules/UsersMgt/UsersMgtNavigation.vue';
import VisitorMgtNavigation from '../modules/VisitorMgt/VisitorMgtNavigation.vue';
import VotingNavigation from '../modules/Voting/VotingNavigation.vue';

const store = useAppStore();

onMounted(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
        selector.classList.add('active');
        const ul: any = selector.closest('ul.sub-menu');
        if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
            if (ele.length) {
                ele = ele[0];
                setTimeout(() => {
                    ele.click();
                });
            }
        }
    }
});

const toggleMobileMenu = () => {
    if (window.innerWidth < 1024) {
        store.toggleSidebar();
    }
};
</script>