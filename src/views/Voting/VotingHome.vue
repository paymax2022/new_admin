<template>
    <div>
        <Breadcrumb :items="[{ label: 'Voting' }]" />

        <div class="mt-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 mb-6 text-white">
                <div class="panel bg-gradient-to-r from-violet-500 to-violet-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">All Contests</div>
                        <div class="dropdown">
                            <Popper placement="bottom-end" offsetDistance="0" class="align-middle">
                                <button type="button">
                                    <IconHorizontalDots class="hover:opacity-80 opacity-70" />
                                </button>
                                <template #content="{ close }">
                                    <ul @click="close()" class="text-black dark:text-white-dark">
                                        <li>
                                            <a href="javascript:;">View Report</a>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">137</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">
                        <IconEye class="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Last Week 84
                    </div>
                </div>

                <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
                    <div class="flex justify-between">
                        <div class="ltr:mr-1 rtl:ml-1 text-md font-semibold">Total Voting Transactions</div>
                        <div class="dropdown">
                            <Popper placement="bottom-end" offsetDistance="0" class="align-middle">
                                <button type="button">
                                    <IconHorizontalDots class="hover:opacity-80 opacity-70" />
                                </button>
                                <template #content="{ close }">
                                    <ul @click="close()" class="text-black dark:text-white-dark">
                                        <li>
                                            <a href="javascript:;">View Report</a>
                                        </li>
                                    </ul>
                                </template>
                            </Popper>
                        </div>
                    </div>
                    <div class="flex items-center mt-5">
                        <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">$170.46</div>
                    </div>
                    <div class="flex items-center font-semibold mt-5">
                        <IconEye class="ltr:mr-2 rtl:ml-2 shrink-0" />
                        Last Week 44,700
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div class="grid gap-6 xl:grid-flow-row">
                    <div class="panel overflow-hidden">
                        <div class="mb-5 text-lg font-bold">Recent Contests</div>
                        <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th class="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                        <th>DATE</th>
                                        <th>NAME</th>
                                        <th>AMOUNT</th>
                                        <th class="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="font-semibold">#01</td>
                                        <td class="whitespace-nowrap">Oct 08, 2021</td>
                                        <td class="whitespace-nowrap">Eric Page</td>
                                        <td>$1,358.75</td>
                                        <td class="text-center">
                                            <span
                                                class="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">#02</td>
                                        <td class="whitespace-nowrap">Dec 18, 2021</td>
                                        <td class="whitespace-nowrap">Nita Parr</td>
                                        <td>-$1,042.82</td>
                                        <td class="text-center">
                                            <span class="badge bg-info/20 text-info rounded-full hover:top-0">In
                                                Process</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">#03</td>
                                        <td class="whitespace-nowrap">Dec 25, 2021</td>
                                        <td class="whitespace-nowrap">Carl Bell</td>
                                        <td>$1,828.16</td>
                                        <td class="text-center">
                                            <span
                                                class="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">#04</td>
                                        <td class="whitespace-nowrap">Nov 29, 2021</td>
                                        <td class="whitespace-nowrap">Dan Hart</td>
                                        <td>$1,647.55</td>
                                        <td class="text-center">
                                            <span
                                                class="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">#05</td>
                                        <td class="whitespace-nowrap">Nov 24, 2021</td>
                                        <td class="whitespace-nowrap">Jake Ross</td>
                                        <td>$927.43</td>
                                        <td class="text-center">
                                            <span
                                                class="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="font-semibold">#06</td>
                                        <td class="whitespace-nowrap">Jan 26, 2022</td>
                                        <td class="whitespace-nowrap">Anna Bell</td>
                                        <td>$250.00</td>
                                        <td class="text-center">
                                            <span class="badge bg-info/20 text-info rounded-full hover:top-0">In
                                                Process</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="panel">
                    <div class="mb-5 text-lg font-bold">Recent Voting Transactions</div>
                    <div class="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th class="ltr:rounded-l-md rtl:rounded-r-md">ID</th>
                                    <th>DATE</th>
                                    <th>NAME</th>
                                    <th>AMOUNT</th>
                                    <th class="text-center ltr:rounded-r-md rtl:rounded-l-md">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="font-semibold">#01</td>
                                    <td class="whitespace-nowrap">Oct 08, 2021</td>
                                    <td class="whitespace-nowrap">Eric Page</td>
                                    <td>$1,358.75</td>
                                    <td class="text-center">
                                        <span
                                            class="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">#02</td>
                                    <td class="whitespace-nowrap">Dec 18, 2021</td>
                                    <td class="whitespace-nowrap">Nita Parr</td>
                                    <td>-$1,042.82</td>
                                    <td class="text-center">
                                        <span class="badge bg-info/20 text-info rounded-full hover:top-0">In
                                            Process</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">#03</td>
                                    <td class="whitespace-nowrap">Dec 25, 2021</td>
                                    <td class="whitespace-nowrap">Carl Bell</td>
                                    <td>$1,828.16</td>
                                    <td class="text-center">
                                        <span
                                            class="badge bg-danger/20 text-danger rounded-full hover:top-0">Pending</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">#04</td>
                                    <td class="whitespace-nowrap">Nov 29, 2021</td>
                                    <td class="whitespace-nowrap">Dan Hart</td>
                                    <td>$1,647.55</td>
                                    <td class="text-center">
                                        <span
                                            class="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">#05</td>
                                    <td class="whitespace-nowrap">Nov 24, 2021</td>
                                    <td class="whitespace-nowrap">Jake Ross</td>
                                    <td>$927.43</td>
                                    <td class="text-center">
                                        <span
                                            class="badge bg-success/20 text-success rounded-full hover:top-0">Completed</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="font-semibold">#06</td>
                                    <td class="whitespace-nowrap">Jan 26, 2022</td>
                                    <td class="whitespace-nowrap">Anna Bell</td>
                                    <td>$250.00</td>
                                    <td class="text-center">
                                        <span class="badge bg-info/20 text-info rounded-full hover:top-0">In
                                            Process</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots.vue';
import IconEye from '@/components/icon/icon-eye.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';

</script>
