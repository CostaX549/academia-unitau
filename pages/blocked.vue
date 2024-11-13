<template>
    <div class="flex items-center justify-center min-h-screen bg-[#24305E]">
      <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md text-center">
        <h1 class="mb-4 text-2xl font-bold text-red-600">Acesso Bloqueado</h1>
        <p class="mb-4 text-gray-700">Você está bloqueado. Espere um administrador liberar seu acesso ao sistema.</p>
        <button  @click="logout()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Finalizar Sessão</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useUserStore } from '~~/stores/user';
  const userStore = useUserStore();
  const router = useRouter()

  definePageMeta({
  middleware: ['is-blocked-out','is-logged-out']
});
  const logout = async () => {
    let res = confirm('Are you sure you want to sign out?')
    try {
        if (res) {
            await userStore.logout()
            router.push('/')
            return
        }
        
    } catch (error) {
        console.log(error) 
    }
}
  </script>
  