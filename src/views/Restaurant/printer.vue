<template>
    <div>
        
    </div>
</template>
<script lang="ts" setup>
    import { ref } from 'vue';
    import Vue3Datatable from '@bhplugin/vue3-datatable';
    import { useMeta } from '@/composables/use-meta';

    import IconTrashLines from '@/components/icon/icon-trash-lines.vue';
    import IconPlus from '@/components/icon/icon-plus.vue';
    import IconEdit from '@/components/icon/icon-edit.vue';
    import IconEye from '@/components/icon/icon-eye.vue';

    useMeta({ title: 'Invoice List' });

    const datatable: any = ref(null);
    const search = ref('');
    const cols = ref([
        
        { field: 'customer', title: 'Customer' },
        { field: 'balance', title: 'Balance' },
        { field: 'actions', title: 'Actions', sort: false, headerClass: 'justify-center' },
    ]);
    
  

  
</script>
