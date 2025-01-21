<template>
    <DropdownNav dropdownName="billsPayment" title="Bills Payment" :iconComponent="IconMenuComponents" :links="links" />
</template>

<script lang="ts" setup>
import IconMenuComponents from '@/components/icon/menu/icon-menu-components.vue';
import DropdownNav from '@/components/Shared/Nav/DropdownNav.vue';

const links = [
    // { route: { name: 'billsPaymentHome' }, displayName: 'Bills Payment Home' },
    { route: { name: 'billsPaymentAirtime' }, displayName: 'Airtime & Data' },
    { route: { name: 'billsPaymentCabletv' }, displayName: 'Cable TV Screen' },
    { route: { name: 'billsPaymentPrepaidElectricity' }, displayName: 'Prepaid Electricity' },
    { route: { name: 'billsPaymentPostpaidElectricity' }, displayName: 'Postpaid Electricity' },
];
</script>
