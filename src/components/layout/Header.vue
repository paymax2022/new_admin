<template>
    <header class="z-40" :class="{ dark: store.semidark && store.menu === 'horizontal' }">
        <div class="shadow-sm">
            <div class="relative bg-white flex w-full items-center px-5 py-2.5 dark:bg-[#0e1726]">
                <div class="horizontal-logo flex lg:hidden justify-between items-center ltr:mr-2 rtl:ml-2">
                    <router-link to="/" class="main-logo flex items-center shrink-0">
                        <img class="w-8 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.svg" alt="" />
                        <span
                            class="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle hidden md:inline dark:text-white-light transition-all duration-300">PAYMAX</span>
                    </router-link>

                    <a href="javascript:;"
                        class="collapse-icon flex-none dark:text-[#d0d2d6] hover:text-primary dark:hover:text-primary flex lg:hidden ltr:ml-2 rtl:mr-2 p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                        @click="store.toggleSidebar()">
                        <icon-menu class="w-5 h-5" />
                    </a>
                </div>
                <div
                    class="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse dark:text-[#d0d2d6]">
                    <div class="sm:ltr:mr-auto sm:rtl:ml-auto">
                        <form
                            class="sm:relative absolute inset-x-0 sm:top-0 top-1/2 sm:translate-y-0 -translate-y-1/2 sm:mx-0 mx-4 z-10 sm:block hidden"
                            :class="{ '!block': search }" @submit.prevent="search = false">
                            <div class="relative">
                                <input type="text"
                                    class="form-input ltr:pl-9 rtl:pr-9 ltr:sm:pr-4 rtl:sm:pl-4 ltr:pr-9 rtl:pl-9 peer sm:bg-transparent bg-gray-100 placeholder:tracking-widest"
                                    placeholder="Search..." />
                                <button type="button"
                                    class="absolute w-9 h-9 inset-0 ltr:right-auto rtl:left-auto appearance-none peer-focus:text-primary">
                                    <icon-search class="mx-auto" />
                                </button>
                                <button type="button"
                                    class="hover:opacity-80 sm:hidden block absolute top-1/2 -translate-y-1/2 ltr:right-2 rtl:left-2"
                                    @click="search = false">
                                    <icon-x-circle />
                                </button>
                            </div>
                        </form>

                        <button type="button"
                            class="search_btn sm:hidden p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="search = !search">
                            <icon-search class="w-4.5 h-4.5 mx-auto dark:text-[#d0d2d6]" />
                        </button>
                    </div>
                    <div>
                        <a href="javascript:;" v-show="store.theme === 'light'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('dark')">
                            <icon-sun />
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'dark'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('system')">
                            <icon-moon />
                        </a>
                        <a href="javascript:;" v-show="store.theme === 'system'"
                            class="flex items-center p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                            @click="store.toggleTheme('light')">
                            <icon-laptop />
                        </a>
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8"
                            class="align-middle">
                            <button type="button"
                                class="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                <img :src="currentFlag" alt="flag" class="w-5 h-5 object-cover rounded-full" />
                            </button>
                            <template #content="{ close }">
                                <ul
                                    class="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                    <template v-for="item in store.languageList" :key="item.code">
                                        <li>
                                            <button type="button" class="w-full hover:text-primary"
                                                :class="{ 'bg-primary/10 text-primary': i18n.locale === item.code }"
                                                @click="changeLanguage(item), close()">
                                                <img class="w-5 h-5 object-cover rounded-full"
                                                    :src="`/assets/images/flags/${item.code.toUpperCase()}.svg`"
                                                    alt="" />
                                                <span class="ltr:ml-3 rtl:mr-3">{{ item.name }}</span>
                                            </button>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8"
                            class="align-middle">
                            <button type="button"
                                class="relative block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60">
                                <icon-bell-bing />

                                <span class="flex absolute w-3 h-3 ltr:right-0 rtl:left-0 top-0">
                                    <span
                                        class="animate-ping absolute ltr:-left-[3px] rtl:-right-[3px] -top-[3px] inline-flex h-full w-full rounded-full bg-success/50 opacity-75"></span>
                                    <span class="relative inline-flex rounded-full w-[6px] h-[6px] bg-success"></span>
                                </span>
                            </button>
                            <template #content="{ close }">
                                <ul
                                    class="!py-0 text-dark dark:text-white-dark w-[300px] sm:w-[350px] divide-y dark:divide-white/10">
                                    <li>
                                        <div class="flex items-center px-4 py-2 justify-between font-semibold">
                                            <h4 class="text-lg">Notification</h4>
                                            <template v-if="notifications.length">
                                                <span class="badge bg-primary/80"
                                                    v-text="notifications.length + 'New'"></span>
                                            </template>
                                        </div>
                                    </li>
                                    <template v-for="notification in notifications" :key="notification.id">
                                        <li class="dark:text-white-light/90">
                                            <div class="group flex items-center px-4 py-2">
                                                <div class="grid place-content-center rounded">
                                                    <div class="w-12 h-12 relative">
                                                        <img class="w-12 h-12 rounded-full object-cover"
                                                            :src="`/assets/images/${notification.profile}`" alt="" />
                                                        <span
                                                            class="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                                                    </div>
                                                </div>
                                                <div class="ltr:pl-3 rtl:pr-3 flex flex-auto">
                                                    <div class="ltr:pr-3 rtl:pl-3">
                                                        <h6 v-html="notification.message"></h6>
                                                        <span class="text-xs block font-normal dark:text-gray-500"
                                                            v-text="notification.time"></span>
                                                    </div>
                                                    <button type="button"
                                                        class="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                                        @click="removeNotification(notification.id)">
                                                        <icon-x-circle />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="notifications.length">
                                        <li>
                                            <div class="p-4">
                                                <button class="btn btn-primary block w-full btn-small"
                                                    @click="close()">Read All Notifications</button>
                                            </div>
                                        </li>
                                    </template>
                                    <template v-if="!notifications.length">
                                        <li>
                                            <div
                                                class="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]">
                                                <div
                                                    class="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                                                    <icon-info-circle :fill="true" class="w-10 h-10" />
                                                </div>
                                                No data available.
                                            </div>
                                        </li>
                                    </template>
                                </ul>
                            </template>
                        </Popper>
                    </div>

                    <div class="dropdown shrink-0">
                        <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-end' : 'bottom-start'" offsetDistance="8"
                            class="!block align-middle">
                            <button type="button" class="relative group block">
                                <img class="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                                    src="/assets/images/user-profile.jpeg" alt="" />
                            </button>
                            <template #content="{ close }">
                                <ul
                                    class="text-dark dark:text-white-dark !py-0 w-[230px] font-semibold dark:text-white-light/90">
                                    <li>
                                        <div class="flex items-center px-4 py-4">
                                            <div class="flex-none">
                                                <img class="rounded-md w-10 h-10 object-cover"
                                                    src="/assets/images/user-profile.jpeg" alt="" />
                                            </div>
                                            <div class="ltr:pl-4 rtl:pr-4 truncate">
                                                <h4 class="text-base">
                                                    John Doe<span
                                                        class="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">Pro</span>
                                                </h4>
                                                <a class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                                                    href="javascript:;">johndoe@gmail.com</a>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <button type="button" class="w-full flex items-center px-4 py-2 dark:hover:text-white" @click="showProfileModal = true; close()">
                                            <icon-user class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" class="w-full flex items-center px-4 py-2 dark:hover:text-white" @click="showSettingsModal = true; close()">
                                            <icon-settings class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                                            Settings
                                        </button>
                                    </li>
                                    <li>
                                        <router-link to="/auth/boxed-lockscreen" class="dark:hover:text-white"
                                            @click="close()">
                                            <icon-lock-dots class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />

                                            Lock Screen
                                        </router-link>
                                    </li>
                                    <li class="border-t border-white-light dark:border-white-light/10">
                                        <button type="button" class="w-full flex items-center px-4 py-3 text-danger hover:bg-gray-100 dark:hover:bg-gray-900" @click="handleSignOutClick(close)">
                                            <icon-logout class="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 rotate-90 shrink-0" />
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </template>
                        </Popper>
                    </div>
                </div>
            </div>
        </div>

        <!-- Logout Modal -->
        <TransitionRoot appear :show="showLogoutModal" as="template">
            <Dialog as="div" @close="showLogoutModal = false" class="relative z-[60]">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black/40"></div>
                </TransitionChild>

                <div class="fixed inset-0 overflow-y-auto">
                    <div class="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as="template"
                            enter="duration-300 ease-out"
                            enter-from="opacity-0 scale-95"
                            enter-to="opacity-100 scale-100"
                            leave="duration-200 ease-in"
                            leave-from="opacity-100 scale-100"
                            leave-to="opacity-0 scale-95"
                        >
                            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                                <div class="flex items-center justify-between mb-4">
                                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                                        Ready to log out?
                                    </DialogTitle>
                                    <button @click="showLogoutModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                        <XMarkIcon class="h-5 w-5" />
                                    </button>
                                </div>
                                <div class="mt-2">
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        You're about to end your current session. Make sure you've saved any changes.
                                    </p>
                                </div>

                                <div class="mt-6 flex justify-end space-x-3">
                                    <button
                                        @click="showLogoutModal = false"
                                        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        @click="handleLogout"
                                        class="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Profile Modal -->
        <TransitionRoot appear :show="showProfileModal" as="template">
            <Dialog as="div" @close="showProfileModal = false" class="relative z-[60]">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black/40"></div>
                </TransitionChild>

                <div class="fixed inset-y-0 right-0 overflow-y-auto">
                    <div class="flex min-h-full justify-end">
                        <TransitionChild
                            as="template"
                            enter="transform transition ease-in-out duration-300"
                            enter-from="translate-x-full"
                            enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-300"
                            leave-from="translate-x-0"
                            leave-to="translate-x-full"
                        >
                            <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                                <div class="flex items-center justify-between mb-5">
                                    <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                        Profile
                                    </DialogTitle>
                                    <button @click="showProfileModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                        <XMarkIcon class="h-5 w-5" />
                                    </button>
                                </div>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">
                                    View and update your profile information
                                </p>

                                <div class="space-y-6">
                                    <!-- Profile Image -->
                                    <div class="flex flex-col items-center">
                                        <div class="relative">
                                            <img class="w-24 h-24 rounded-full object-cover" src="/assets/images/user-profile.jpeg" alt="Profile" />
                                            <button class="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600">
                                                <icon-camera class="w-4 h-4" />
                                            </button>
                                        </div>
                                        <button class="mt-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                                            Upload Image
                                        </button>
                                    </div>

                                    <!-- Form Fields -->
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                                            <input type="text" v-model="profileData.fullName" class="form-input w-full" placeholder="Cameron Williamson" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                            <input type="email" v-model="profileData.email" class="form-input w-full" placeholder="anna.lawson@example.com" />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                            <input type="text" v-model="profileData.role" class="form-input w-full" placeholder="Administrator" disabled />
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Login</label>
                                            <input type="text" v-model="profileData.lastLogin" class="form-input w-full" disabled />
                                        </div>
                                    </div>

                                    <!-- Action Buttons -->
                                    <div class="flex justify-end space-x-3 mt-6">
                                        <button
                                            @click="showProfileModal = false"
                                            class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            @click="saveProfile"
                                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Settings Modal -->
        <TransitionRoot appear :show="showSettingsModal" as="template">
            <Dialog as="div" @close="showSettingsModal = false" class="relative z-[60]">
                <TransitionChild
                    as="template"
                    enter="duration-300 ease-out"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="duration-200 ease-in"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <div class="fixed inset-0 bg-black/40"></div>
                </TransitionChild>

                <div class="fixed inset-y-0 right-0 overflow-y-auto">
                    <div class="flex min-h-full justify-end">
                        <TransitionChild
                            as="template"
                            enter="transform transition ease-in-out duration-300"
                            enter-from="translate-x-full"
                            enter-to="translate-x-0"
                            leave="transform transition ease-in-out duration-300"
                            leave-from="translate-x-0"
                            leave-to="translate-x-full"
                        >
                            <DialogPanel class="w-[400px] transform overflow-hidden bg-white dark:bg-gray-800 p-6 shadow-xl transition-all">
                                <div class="flex items-center justify-between mb-5">
                                    <div>
                                        <DialogTitle class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            Settings
                                        </DialogTitle>
                                        <p class="text-sm text-gray-500 dark:text-gray-400">
                                            Manage your account settings and preferences
                                        </p>
                                    </div>
                                    <button @click="showSettingsModal = false" class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                        <XMarkIcon class="h-5 w-5" />
                                    </button>
                                </div>

                                <div class="space-y-6">
                                    <!-- Account Settings -->
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Account Settings</h3>
                                        <div class="space-y-4">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Two-Factor Authentication</h4>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                                                </div>
                                                <button class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">Enable</button>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Password Reset</h4>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Change your password</p>
                                                </div>
                                                <button class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">Reset</button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Preferences -->
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">Preferences</h3>
                                        <div class="space-y-4">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Email Notifications</h4>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
                                                </div>
                                                <button class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">Configure</button>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Language</h4>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Choose your preferred language</p>
                                                </div>
                                                <select class="form-select text-sm py-1">
                                                    <option>English</option>
                                                    <option>Spanish</option>
                                                    <option>French</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- System -->
                                    <div>
                                        <h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 mb-4">System</h3>
                                        <div class="space-y-4">
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</h4>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Light or dark mode</p>
                                                </div>
                                                <Switch
                                                    v-model="isDarkMode"
                                                    class="relative inline-flex h-6 w-11 items-center rounded-full"
                                                    :class="isDarkMode ? 'bg-blue-600' : 'bg-gray-200'"
                                                >
                                                    <span class="sr-only">Toggle theme</span>
                                                    <span
                                                        class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                                                        :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
                                                    />
                                                </Switch>
                                            </div>
                                            <div class="flex items-center justify-between">
                                                <div>
                                                    <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Session Timeout</h4>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">Automatically log out after inactivity</p>
                                                </div>
                                                <select class="form-select text-sm py-1">
                                                    <option>30 minutes</option>
                                                    <option>1 hour</option>
                                                    <option>2 hours</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Save Button -->
                                    <div class="pt-4">
                                        <button
                                            @click="saveSettings"
                                            class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                                        >
                                            Save Settings
                                        </button>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </header>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

import appSetting from '@/app-setting';

import { useRoute } from 'vue-router';
import { useAppStore } from '@/stores/index';

import IconMenu from '@/components/icon/icon-menu.vue';
import IconSearch from '@/components/icon/icon-search.vue';
import IconXCircle from '@/components/icon/icon-x-circle.vue';
import IconSun from '@/components/icon/icon-sun.vue';
import IconMoon from '@/components/icon/icon-moon.vue';
import IconLaptop from '@/components/icon/icon-laptop.vue';
import IconInfoCircle from '@/components/icon/icon-info-circle.vue';
import IconBellBing from '@/components/icon/icon-bell-bing.vue';
import IconUser from '@/components/icon/icon-user.vue';
import IconLockDots from '@/components/icon/icon-lock-dots.vue';
import IconLogout from '@/components/icon/icon-logout.vue';
import IconCamera from '@/components/icon/icon-camera.vue';
import IconSettings from '@/components/icon/icon-settings.vue';

const store = useAppStore();
const route = useRoute();
const search = ref(false);
const router = useRouter();
const showLogoutModal = ref(false);
const showProfileModal = ref(false);
const showSettingsModal = ref(false);
const isDarkMode = ref(store.theme === 'dark');
const profileData = ref({
    fullName: 'Cameron Williamson',
    email: 'anna.lawson@example.com',
    role: 'Administrator',
    lastLogin: '4/10/2023, 8:30:00 AM'
});

// multi language
const i18n = reactive(useI18n());
const changeLanguage = (item: any) => {
    i18n.locale = item.code;
    appSetting.toggleLanguage(item);
};
const currentFlag = computed(() => {
    return `/assets/images/flags/${i18n.locale.toUpperCase()}.svg`;
});

const notifications = ref([
    {
        id: 1,
        profile: 'user-profile.jpeg',
        message: '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
        time: '45 min ago',
    },
    {
        id: 2,
        profile: 'profile-34.jpeg',
        message: '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
        time: '9h Ago',
    },
    {
        id: 3,
        profile: 'profile-16.jpeg',
        message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
        time: '9h Ago',
    },
]);

const messages = ref([
    {
        id: 1,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
        title: 'Congratulations!',
        message: 'Your OS has been updated.',
        time: '1hr',
    },
    {
        id: 2,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
        title: 'Did you know?',
        message: 'You can switch between artboards.',
        time: '2hr',
    },
    {
        id: 3,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
        title: 'Something went wrong!',
        message: 'Send Reposrt',
        time: '2days',
    },
    {
        id: 4,
        image: '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
        title: 'Warning',
        message: 'Your password strength is low.',
        time: '5days',
    },
]);

onMounted(() => {
    setActiveDropdown();
});

watch(route, (to, from) => {
    setActiveDropdown();
});

const setActiveDropdown = () => {
    const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
    if (selector) {
        selector.classList.add('active');
        const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
        for (let i = 0; i < all.length; i++) {
            all[0]?.classList.remove('active');
        }
        const ul: any = selector.closest('ul.sub-menu');
        if (ul) {
            let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
            if (ele) {
                ele = ele[0];
                setTimeout(() => {
                    ele?.classList.add('active');
                });
            }
        }
    }
};

const removeNotification = (value: number) => {
    notifications.value = notifications.value.filter((d) => d.id !== value);
};

const removeMessage = (value: number) => {
    messages.value = messages.value.filter((d) => d.id !== value);
};

const handleSignOutClick = (close: () => void) => {
    showLogoutModal.value = true;
    close();
};

const handleLogout = () => {
    showLogoutModal.value = false;
    // Add any logout logic here (clear tokens, etc.)
    router.push('/auth/boxed-signin');
};

const saveProfile = () => {
    // Add profile save logic here
    showProfileModal.value = false;
};

const saveSettings = () => {
    // Add settings save logic here
    showSettingsModal.value = false;
};
</script>
