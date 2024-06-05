<template>

<td class="px-2 py-4">
    <button type="button" 
            class="focus:outline-none text-white bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
            v-if="user.is_admin === 0"
            @click="makeAdmin(user.id)">
            <div class="flex items-center gap-1">       
      <span>Usuário</span>
      <span v-if="loading"><Icon class="animate-spin ml-1" name="mingcute:loading-line" size="20" /></span>
    </div>  
    </button>
    <button type="button" 
            class="focus:outline-none text-white bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
            v-if="user.is_admin === 1"
            @click="makeUser(user.id)">
       <div class="flex items-center gap-1">   
      <span>Admin</span>
      <span v-if="loading"><Icon class="animate-spin ml-1" name="mingcute:loading-line" size="20" /></span>
    </div>  
    </button>
  </td>
</template>

<script setup>
defineProps(['user'])
let loading = ref(false)
import { useAdminStore } from '~/stores/admin';
const adminStore = useAdminStore()
const makeAdmin = async (id) => {
  try {
    loading.value = true;
   await adminStore.makeAdmin(id)
   loading.value = false;
  } catch(error) {
    console.log(error)
  }
}

const makeUser = async (id) => {
  try {
    loading.value = true;
   await adminStore.makeUser(id)
   loading.value = false;
  } catch(error) {
    console.log(error)
  }
}
</script>