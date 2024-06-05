<template>
   <AdminLayout>
         <div class="pt-[150px]">
          <EditAcademia :academia="adminStore.academia" />
          <AcademiaSpecificDates :academia="adminStore.academia" />
         </div>
   </AdminLayout>
</template>

<script setup>
import AdminLayout from './../../layouts/AdminLayout.vue';
import { useAdminStore } from '~/stores/admin';
const adminStore = useAdminStore()
definePageMeta({
  middleware: ['is-logged-in', 'is-user-not-admin']
});
onMounted( async () => {
  try {
    await adminStore.getAcademia()
  } catch(error) {
    
  }
})

useHead({
  title: "Admin - Academia"
})

</script>

