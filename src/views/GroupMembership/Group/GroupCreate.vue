<template>
    <div>
        <Breadcrumb
            :items="[{ label: 'Group Membership', route: { name: 'groupMembershipHome' } }, { label: 'Groups', route: { name: 'groupMembershipGroupHome' } }, { label: 'Create' }]" />

        <div class="flex items-center justify-between mb-5">
            <h5 class="font-semibold text-lg dark:text-white-light">Create Group</h5>
        </div>

        <form class="mb-8 mt-6">
            <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
                <div class="panel">
                    <h5 class="font-semibold text-lg dark:text-white-light mb-5">Group Info</h5>

                    <div class="space-y-6">
                        <div class="custom-file-container" data-upload-id="myFirstImage">
                            <div class="label-container !mb-0">
                                <label class="block !text-sm !mb-0 text-gray-700">Upload image</label>
                                <a href="javascript:;" class="custom-file-container__image-clear"
                                    title="Clear Image">×</a>
                            </div>
                            <label class="custom-file-container__custom-file">
                                <!-- add model binding to the file input using group.group_logo -->
                                <input type="file" class="custom-file-container__custom-file__custom-file-input"
                                    accept="image/*" />
                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                <span
                                    class="custom-file-container__custom-file__custom-file-control ltr:pr-20 rtl:pl-20"></span>
                            </label>
                            <div class="custom-file-container__image-preview !p-0 !m-0"></div>
                        </div>
                        <TextInput v-model="group.name" label="Group Name" placeholder="Enter group name" required />
                        <TextareaInput v-model="group.description" rows="5" label="Group Description"
                            placeholder="Enter description" required />
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block mb-1 text-gray-700">Country</label>
                                <Multiselect v-model="group.selectedCountry" class="custom-multiselect"
                                    placeholder="Select country" :options="countries" :searchable="true"
                                    :preselect-first="false" :allow-empty="false" selected-label="" select-label=""
                                    deselect-label="" label="name" trackBy="code" @update:modelValue="updateCountry" />
                            </div>
                            <div>
                                <label class="block mb-1 text-gray-700">State</label>
                                <Multiselect v-model="group.selectedState" class="custom-multiselect"
                                    placeholder="Select state" :options="states" :searchable="true"
                                    :preselect-first="false" :allow-empty="false" selected-label="" select-label=""
                                    deselect-label="" label="name" track-by="name" @update:modelValue="updateState" />
                            </div>
                            <TextInput label="LGA" placeholder="Enter LGA" required />
                        </div>
                        <TextInput v-model="group.leader_name" label="Leader Name" placeholder="Enter leader name"
                            required />
                        <TextInput v-model="group.email" type="email" label="Email" placeholder="Enter email"
                            required />
                        <TextInput v-model="group.phone" type="number" label="Phone" placeholder="Enter mobile number"
                            required />
                        <div class="flex flex-col gap-2">
                            <label class="block mb-1 text-gray-700">Group Type</label>
                            <RadioInput v-model="group.group_type" label="Open" name="group_type" value="open" />
                            <RadioInput v-model="group.group_type" label="Closed" name="group_type" value="closed" />
                        </div>
                        <div class="">
                            <label class="block mb-1 text-gray-700">Group Permissions</label>
                            <CheckboxInput label="Allow state group leader to approve new member reg" />
                            <CheckboxInput label="Allow state group leader to ban members" />
                            <CheckboxInput label="Allow state group leader to send notification" />
                        </div>
                    </div>
                </div>

                <div>
                    <div class="panel mt-6 lg:mt-0">
                        <div class="flex justify-between">
                            <h5 class="font-semibold text-lg dark:text-white-light mb-5">Group Admins</h5>
                            <IconPlus @click="addAdmin" />
                        </div>

                        <div v-for="(admin, index) in groupAdmins" :key="index" class="flex"
                            :class="index !== 0 ? 'mt-10' : ''">
                            <div class="w-full">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="block mb-1 text-gray-700">Title</label>
                                        <Multiselect v-model="admin.title" class="custom-multiselect"
                                            placeholder="Select title" :options="titles" :searchable="true"
                                            :preselect-first="false" :allow-empty="false" selected-label=""
                                            select-label="" deselect-label="" @update:modelValue="admin.title" />
                                    </div>
                                    <TextInput v-model="admin.firstname" label="First Name"
                                        placeholder="Enter first name" required />
                                    <TextInput v-model="admin.lastname" label="Last Name" placeholder="Enter last name"
                                        required />
                                    <TextInput v-model="admin.role" label="Role" placeholder="Enter role" required />
                                    <div>
                                        <label class="block mb-1 text-gray-700">Country</label>
                                        <Multiselect v-model="admin.selectedCountry" class="custom-multiselect"
                                            placeholder="Select country" :options="countries" :searchable="true"
                                            :preselect-first="false" :allow-empty="false" selected-label=""
                                            select-label="" deselect-label="" label="name" trackBy="code"
                                            @update:modelValue="e => updateAdminCountry(e, index)" />
                                    </div>
                                    <div>
                                        <label class="block mb-1 text-gray-700">State</label>
                                        <Multiselect v-model="admin.selectedState" class="custom-multiselect"
                                            placeholder="Select state" :options="states" :searchable="true"
                                            :preselect-first="false" :allow-empty="false" selected-label=""
                                            select-label="" deselect-label="" label="name" track-by="name"
                                            @update:modelValue="e => updateAdminState(e, index)" />
                                    </div>
                                    <TextInput v-model="admin.lga" label="LGA" placeholder="Enter LGA" required />
                                    <TextInput v-model="admin.email" type="email" label="Email"
                                        placeholder="Enter email" required />
                                    <TextInput v-model="admin.phone" type="number" label="Phone"
                                        placeholder="Enter mobile number" required />
                                    <TextInput v-model="admin.image" type="file" label="Image"
                                        placeholder="Upload image" required />
                                </div>
                            </div>
                            <IconTrash v-if="index !== 0" class="ml-2 text-danger" @click="removeAdmin(index)" />
                        </div>
                    </div>

                    <div class="panel mt-6">
                        <h5 class="font-semibold text-lg dark:text-white-light mb-5">Group Subscription</h5>

                        <div class="space-y-4">
                            <TextInput label="Subscription / Due Name" placeholder="Enter subscription name" required />
                            <TextInput label="Subscription Objective" placeholder="Enter subscription objective"
                                required />
                            <TextInput type="number" label="Subscription Amount" placeholder="Enter subscription amount"
                                required />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 mx-4">
                <button type="submit" class="btn btn-primary w-full">Create Group</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import IconPlus from '@/components/icon/icon-plus.vue';
import IconTrash from '@/components/icon/icon-trash.vue';
import Breadcrumb from '@/components/Shared/Breadcrumb.vue';
import CheckboxInput from '@/components/Shared/Input/CheckboxInput.vue';
import RadioInput from '@/components/Shared/Input/RadioInput.vue';
import TextareaInput from '@/components/Shared/Input/TextareaInput.vue';
import TextInput from '@/components/Shared/Input/TextInput.vue';
import { getCountries, getStatesByCountryCode } from '@/utils/getCountryState';
import Multiselect from '@suadelabs/vue3-multiselect';
import '@suadelabs/vue3-multiselect/dist/vue3-multiselect.css';
import { ref, onMounted } from 'vue';
import FileUploadWithPreview from 'file-upload-with-preview';
import 'file-upload-with-preview/dist/file-upload-with-preview.min.css';
import '@/assets/css/file-upload-preview.css';
import ImagePreview from '@/assets/file-preview.svg';

const countries = getCountries() || [];
let states: any = [];

const group = ref({
    name: '',
    description: '',
    selectedCountry: '',
    country: '',
    selectedState: '',
    state: '',
    lga: '',
    leader_name: '',
    email: '',
    phone: '',
    group_logo: '',
    group_type: 'open'
})

const titles = ['Mr', 'Mrs', 'Miss', 'Dr', 'Prof'];
const groupAdmins = ref([
    {
        title: '',
        firstname: '',
        lastname: '',
        role: '',
        selectedCountry: '',
        country: '',
        selectedState: '',
        state: '',
        lga: '',
        email: '',
        phone: '',
        image: ''
    }
]);

const updateCountry = (selectedCountry) => {
    group.value.country = selectedCountry.code;
    states = getStatesByCountryCode(selectedCountry.code);
};
const updateState = (selectedState) => {
    group.value.state = selectedState.name
}

const addAdmin = () => {
    groupAdmins.value.push({
        title: '',
        firstname: '',
        lastname: '',
        role: '',
        selectedCountry: '',
        country: '',
        selectedState: '',
        state: '',
        lga: '',
        email: '',
        phone: '',
        image: ''
    });
}

const removeAdmin = (index) => {
    groupAdmins.value.splice(index, 1);
}

const updateAdminCountry = (selectedCountry, index) => {
    groupAdmins.value[index].country = selectedCountry.code;
    states = getStatesByCountryCode(selectedCountry.code);
}
const updateAdminState = (selectedState, index) => {
    groupAdmins.value[index].state = selectedState.name;
}

onMounted(() => {
    // single image upload
    const image = new FileUploadWithPreview('myFirstImage', {
        images: {
            baseImage: ImagePreview,
            backgroundImage: '',
        },
    });
    console.log(image)
});
</script>
