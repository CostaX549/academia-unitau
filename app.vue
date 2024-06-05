<template>
 
<NuxtLayout>
 
  <NuxtPage  />
  <AddAgendamentoOverlay v-if="isMobile && addLinkOverlay"/>
</NuxtLayout>
 </template>
 

 <script setup>

import { useUserStore } from '~~/stores/user';
import { useAdminStore } from '~~/stores/admin';
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { isMobile,  addLinkOverlay } = storeToRefs(userStore)



 onMounted(async () => {


  isMobile.value = false
  if ('ontouchstart' in window) {
    isMobile.value = true
  }
  try {
  
  if(userStore.id){
       await userStore.hasSessionExpired();
      
         await userStore.getUser();


                
       
  }
    

   
  } catch(error) {
    console.log(error)
  }




  
 })

 





</script>