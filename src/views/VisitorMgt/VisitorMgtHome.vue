<template>
    <div>
        <div class="flex flex-col lg:flex-row justify-between px-4">
            <div class="lg:w-1/2 mb-4 lg:mb-0">
                <apexchart height="300" :options="pieChart" :series="pieChartSeries" class="dark:bg-black rounded-lg overflow-hidden"></apexchart>
            </div>
            <div class="sm:mt-8 lg:w-1/2">
                <p class="text-lg font-semibold mb-4">Recent Activities</p>
                <div v-for="(activity, index) in activities" :key="index" class="mb-4 border-b pb-2">
                    <div class="flex justify-between">
                        <p class="font-bold">New Check Out</p>
                        <p class="text-sm text-gray-500">{{ activity.time }}</p>
                    </div>
                    <p>{{ activity.message }}</p>
                    <p class="text-sm text-gray-400">{{ activity.tag }}</p>
                </div>
            </div>
        </div>
        <div>
            <TabGroup as="div" class="mb-5">
                <TabList class="flex flex-wrap justify-start mt-3 space-x-2 rtl:space-x-reverse">
                    <Tab as="template" v-slot="{ selected }">
                        <a
                            href="javascript:;"
                            class="p-3.5 py-2 -mb-[1px] block hover:bg-info rounded hover:text-white !outline-none transition duration-300"
                            :class="{ 'bg-info text-white': selected }"
                            >Today</a
                        >
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a
                            href="javascript:;"
                            class="p-3.5 py-2 -mb-[1px] block hover:bg-info rounded hover:text-white !outline-none transition duration-300"
                            :class="{ 'bg-info text-white': selected }"
                            >Past Week</a
                        >
                    </Tab>
                    <Tab as="template" v-slot="{ selected }">
                        <a
                            href="javascript:;"
                            class="p-3.5 py-2 -mb-[1px] block hover:bg-info rounded hover:text-white !outline-none transition duration-300"
                            :class="{ 'bg-info text-white': selected }"
                            >Past Month</a
                        >
                    </Tab>
                </TabList>
                <!-- <TabPanels class="pt-5 flex-1 text-sm">
                <TabPanel>
                    <h4 class="font-semibold text-2xl mb-4">We move your world!</h4>
                    <p class="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </TabPanel>
                <TabPanel>
                    <div class="flex items-start">
                        <div class="w-20 h-20 ltr:mr-4 rtl:ml-4 flex-none">
                            <img
                                src="/assets/images/profile-34.jpeg"
                                alt=""
                                class="w-20 h-20 m-0 rounded-full ring-2 ring-[#ebedf2] dark:ring-white-dark object-cover"
                            />
                        </div>
                        <div class="flex-auto">
                            <h5 class="text-xl font-medium mb-4">Media heading</h5>
                            <p class="text-white-dark">
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in
                                vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                            </p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum.
                    </p>
                </TabPanel>
            </TabPanels> -->
            </TabGroup>
        </div>
        <div>
            <div class="border border-gray-300 h-64 px-3">
                <div class="flex justify-end gap-3 py-2">
                    <div class="bg-yellow-400 px-2 py-1 rounded-[5px]">
                        <p class="font-bold"><span>0</span> Codes</p>
                    </div>
                    <div class="bg-red-100 px-2 py-1 rounded-[5px]">
                        <p class="font-bold"><span>0</span>Check Ins</p>
                    </div>
                    <div class="bg-amber-700 px-2 py-1 rounded-[5px]">
                        <p class="font-bold"><span>0</span> Check Outs</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="justify-between flex gap-5 text-gray-900 font-semibold mt-5">
            <div class="border border-gray-300 px-3 py-2"><p>Broadcast Message</p></div>
            <div class="border border-gray-300 px-3 py-2"><p>Validate Code</p></div>
        </div>
        <div class="grid lg:grid-cols-3 gap-4 mt-5">
            <div class="flex items-center justify-center bg-gray-200 border border-gray-300 h-32 hover:bg-red-200 text-black font-bold">
                <p>888</p>
            </div>
            <div class="flex items-center justify-center bg-gray-200 border border-gray-300 h-32 hover:bg-red-200 text-black font-bold">
                <p>7</p>
            </div>
            <div class="flex items-center justify-center bg-gray-200 border border-gray-300 h-32 hover:bg-red-200 text-black font-bold">
                <p>55</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import apexchart from 'vue3-apexcharts';
    import { useAppStore } from '@/stores/index';
    import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';
    const store = useAppStore();

    const pieChart = computed(() => {
        return {
            chart: {
                height: 300,
                type: 'pie',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            labels: ['Pending', 'Approved', 'Disapproved', 'Disabled', 'Inactive'],
            colors: ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                    },
                },
            ],
            stroke: {
                show: false,
            },
            legend: {
                position: 'bottom',
            },
        };
    });

    const pieChartSeries = ref([44, 55, 13, 43, 22]);

    const activities = ref([
        {
            time: '1 minute ago',
            message: "VEEKTHOR's guest just checked out",
            tag: '534833',
        },
        {
            time: '4 minutes ago',
            message: 'VEEKTHOR PARLOFF just checked out with their vehicle tag',
            tag: '13****11',
        },
        {
            time: '40 minutes ago',
            message: 'PARLOFF just checked out with their vehicle tag',
            tag: '13****11',
        },
    ]);
</script>
