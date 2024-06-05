<template>
    <AdminLayout>
        <div class="grid grid-cols-1 sm:grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-2 pt-[100px] pb-5 max-sm:pb-36 " >
       <AgendamentoItem 
       v-for="agendamento in adminStore.allEventos"
   
       :key="agendamento.id"
         
       :agendamento="agendamento"
      
       @open="showModal"
       />
    </div>
    <AgendamentoModal
      v-if="isModalOpen" 
      :agendamento="selectedAgendamento" 
      @close="isModalOpen = false"
    />
    </AdminLayout>

</template>

<script setup>
import AdminLayout from './../../layouts/AdminLayout.vue';
import { useAdminStore } from '~/stores/admin';
const adminStore = useAdminStore()
let isModalOpen = ref(false)
let selectedAgendamento = ref(null)
definePageMeta({
  middleware: ['is-logged-in', 'is-user-not-admin']
});
const showModal = (agendamento) => {
  selectedAgendamento.value = agendamento
  isModalOpen.value = true
}

onMounted(async () => {
await adminStore.getAllAgendamentos()
})

useHead({
  title: "Admin - Agendamentos"
})
</script>

