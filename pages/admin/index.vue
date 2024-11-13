<template>
  <AdminLayout>
    <div class="relative overflow-x-auto sm:rounded-lg">
      <div class="flex items-center justify-between mt-[150px] flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 ">
        <div>
          <h1 class="text-[30px] pl-2 font-semibold text-white">Usuários do Aplicativo</h1>
        
          <!-- Dropdown menu -->
          <div id="dropdownAction" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
            <ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdownActionButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Reward</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Promote</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100">Activate account</a>
              </li>
            </ul>
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete User</a>
            </div>
          </div>
        </div>
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search-users" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Procure por usuários">
        </div>
      </div>
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            
            <th scope="col" class="px-6 py-3 border-tl rounded-tl-lg">
              Usuário
            </th>
            <th scope="col" class="px-6 py-3">
              Faltas
            </th>
            <th scope="col" class="px-6 py-3">
              RA
            </th>
            <th scope="col" class="px-6 py-3">
              Curso
            </th>
            <th scope="col" class="px-6 py-3">
              Período
            </th>
           
            <th scope="col" class="px-6 py-3">
              ACESSO
            </th>
            <th scope="col" class="px-6 py-3">
              Cargo
            </th>
            
           
            <th scope="col" class="px-6 py-3 border-tr rounded-tr-lg">
              Documento
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in adminStore.allUsers" :key="user.id" class="bg-white border-b hover:bg-gray-50">
          
            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
              <img class="w-10 h-10 rounded-full" :src="user.image" :alt="user.name + ' image'">
              <div class="ps-3">
                <div class="text-base font-semibold">{{ user.name }}</div>
                <div class="font-normal text-gray-500">{{ user.email }}</div>
              </div>
            </th>
            <td class="px-6 py-4">
            
              {{ user.faltas }}
         
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                {{  user.ra }}
              </div>
            </td>

            <td class="px-6 py-4">
              <span v-if="user.curso">{{  user.curso }}</span>
              <span v-else>Nenhum curso.</span>
            </td>
            <td class="px-6 py-4">
              <span v-if="user.periodo">{{  user.periodo }}</span>
              <span v-else>Nenhum período.</span>
            </td>
        
            <MakeBlockedorUnblocked :user="user" v-if="!user.is_admin" />
            <td class="px-6 py-4" v-else></td>
        <MakeAdminOrUser :user="user" />
            
            <td class="px-6 py-4">
          <div v-if="user.documento" class="underline text-blue-500 cursor-pointer" @click="openAttachmentModal(user.documento)">
            Visualizar Documento
          </div>
          <div v-else>
           Nenhum documento
          </div>
        </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pb-3">
    <button
      @click="openCropper = true"
      class="flex items-center justify-center w-[300px] m-auto py-3  rounded-full text-white font-semibold bg-blue-500 hover:bg-blue-600"
      :class="userStore.isMobile ? 'mt-8 text-xl' : 'mt-20 md:mt-8'"
    >
      <Icon 
        v-if="!userStore.isMobile"
        name="mdi:plus"
        class="mr-0.5"
        size="25"
      />
      <span v-if="!userStore.isMobile">Adicionar Usuário</span>
      <span v-if="userStore.isMobile">Adicionar Novo Usuário</span>
    </button>
  </div>
    <UsuarioModal
      v-if="openCropper"
      @close="openCropper = false"
    />
    <AttachmentPreviewModal
      v-if="attachmentModalOpen"
      @close="attachmentModalOpen = false"
      :documento="documentoPreview"
    />
  </AdminLayout>
</template>

<script setup>

import AdminLayout from './../../layouts/AdminLayout.vue';
import { useUserStore } from '~~/stores/user';
import { useAdminStore } from '~/stores/admin';


definePageMeta({
  middleware: ['is-logged-in', 'is-user-not-admin']
});
const adminStore = useAdminStore();
const userStore = useUserStore();
let openCropper = ref(false);
const attachmentModalOpen = ref(false);
const documentoPreview = ref('');

onMounted(async () => {
await adminStore.getAllUsers()
})

useHead({
  title: "Página de Admin"
})



const openAttachmentModal = (documento) => {
  documentoPreview.value = documento;
  attachmentModalOpen.value = true;
};

</script>
