<template>
    <DropdownNav dropdownName="Health" title="Health" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
    import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
    import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

    const links = [
        { route: { name: 'healthHome' }, displayName: 'Health Home' },
        { route: { name: 'doctorsList' }, displayName: 'Doctors List' },
        { route: { name: 'patientList' }, displayName: 'Patients List' },
        { route: { name: 'Specialities' }, displayName: 'Specialities' },
        { route: { name: 'reviewList' }, displayName: 'Review' },
        { route: { name: 'complainList' }, displayName: 'Complain' },
        { route: { name: 'contactList' }, displayName: 'Contact' },
        { route: { name: 'medicineList' }, displayName: 'Medicine' },
        { route: { name: 'addressList' }, displayName: 'Address' },
        { route: { name: 'pharmacyList' }, displayName: 'Pharmacy' },
        { route: { name: 'pharmacyOrder' }, displayName: 'Pharmacy Order' },
        { route: { name: 'doctorSubscription' }, displayName: 'Doctor Subscription' },
        { route: { name: 'appointmentList' }, displayName: 'Appointment' },
        { route: { name: 'pendingPayment' }, displayName: 'Pending Payment' },
        { route: { name: 'subscriptionPage' }, displayName: 'Subscription' },
        { route: { name: 'subscriberListPage' }, displayName: 'Subscriber' },
        { route: { name: 'completePayment' }, displayName: 'Complete Payment' },
    ];
</script>
