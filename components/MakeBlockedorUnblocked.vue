<template>
   <td class="px-6 py-4">
              <button type="button"   class="focus:outline-none text-white bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" @click="makeUserUnblocked(user.id)" v-if="user.is_blocked" >  <div class="flex items-center gap-1">   
      <span>Liberar Acesso</span>
      <span v-if="loading"><Icon class="animate-spin ml-1" name="mingcute:loading-line" size="20" /></span>
    </div></button>
              <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" @click="makeUserBlocked(user.id)" v-else>
                <div class="flex items-center gap-1">   
      <span>Bloquear</span>
      <span v-if="loading"><Icon class="animate-spin ml-1" name="mingcute:loading-line" size="20" /></span>
    </div>
            </button>
            </td>
</template>

<script setup>
defineProps(['user'])
let loading = ref(false)
import { useAdminStore } from '~/stores/admin';
const adminStore = useAdminStore();

const makeUserBlocked = async (id) => {
    try {
    loading.value = true;
   await adminStore.block(id)
   loading.value = false;
  } catch(error) {
    console.log(error)
  }
}

const makeUserUnblocked = async (id) => {
    try {
    loading.value = true;
   await adminStore.unblock(id)
   loading.value = false;
  } catch(error) {
    console.log(error)
  }
}
</script>

