<template>
    <div class="max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Usuários do Evento: 
            <span v-for="(user, index) in agendamento.users" :key="user.id">
              {{ user.name }}
              <span v-if="index < agendamento.users.length - 1">,</span>
            </span>
          </div>
          <p class="block mt-1 text-lg leading-tight font-medium text-black">
            {{ agendamento.datetime }} - {{ agendamento.time }} 
          </p>
          <p class="mt-2 text-gray-500">Academia: {{ agendamento.academia.phone }}</p>
          <div class="mt-5 relative flex">
            <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white" :src="user.image" alt="Avatar" v-for="user in agendamento.users" :key="user.id">
          </div>
          <p class="text-green-500 font-lg" >Vagas disponíveis para esse horário: {{ agendamento.vagas }}</p>
          <button @click="openDetails" class="mt-5 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            Lista de Presença
          </button>
         
        
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps(['agendamento'])
  const { agendamento } = toRefs(props)
  const emit = defineEmits(['open'])

  const openDetails = () => {
  
   
    emit('open', agendamento)
  }
  </script>
  