<template >
    <MainLayout>
   <div
   
   id="AdminPage"
   class="flex h-[100vh] pb-4 "
   
   >
   <div class=" w-full md:pt-20 pt-14">
     <div class="max-w-[750px] mx-auto">
       
       <button
        v-if="userStore.isMobile || !showAddLink"
        @click="showAddLinkFunc()"
        class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600"
        :class="userStore.isMobile ? 'mt-8 text-xl' : 'mt-20 md:mt-8'"
       >
         <Icon 
         v-if="!userStore.isMobile"
         name="mdi:plus"
         class="mr-0.5"
         size="25"
         
         />
         <span v-if="!userStore.isMobile">Adicionar Agendamento</span>
         <span v-if="userStore.isMobile">Adicionar Novo Agendamento</span>
       </button>
       <AddAgendamento
       v-if="!userStore.isMobile"
       @close="showAddLink = false"
       :class="[
           { 'mt-20 md:mt-8 mb-12 max-h-[1000px] transition-all duration-300 ease-in': showAddLink},
           {'max-h-0 transition-all duration-300 ease-out': !showAddLink}
       ]"
       
       />
     
   
     </div>
     <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
  <div v-for="link in userStore.allAgendamentos" >   
   <AgendamentoBox 
     v-if="link"
     :link="link"
     :key="link.id"
    
     class="mt-6"
   />
   </div>
  </div>
   </div>
 
   </div>
   
    </MainLayout>
   </template>
   <script setup>
    import MainLayout from '~~/layouts/MainLayout.vue';
    import { useUserStore } from '~~/stores/user'
  
    const userStore = useUserStore();

    definePageMeta({ middleware: [ 'is-logged-out', 'is-blocked-in' ] })

    let showAddLink = ref(false)


   
  
onMounted(async () => {
  await userStore.getAllAgendamentos();
})

   
    const showAddLinkFunc = () => {
       if(userStore.isMobile) {
           userStore.addLinkOverlay = true
       } else {
           showAddLink.value = true
       }
    }
   
    useHead({
  title: "Página Principal"
})
   
   </script>