<template>
    <div class="fixed z-50 h-full">
        <div class="fixed inset-0 bg-black bg-opacity-60"></div>
        <div class="fixed inset-0 z-10 overflow-auto h-full">
            <div class="flex flex-col min-h-full justify-center items-center py-2">
                <div class="
                        transform
                        overflow-hidden
                        rounded-lg
                        bg-white
                        shadow-2xl
                        transition-all
                        max-w-lg
                        w-full
                    ">
                    <div class="flex items-center py-4 border-b border-b-gray-300">
                        <div class="text-[22px] font-semibold w-full text-center">
                            Detalhes do Agendamento
                        </div>
                        <div @click="$emit('close')"
                            class="absolute right-3 rounded-full p-1.5 bg-gray-200 hover:bg-gray-300 cursor-pointer">
                            <Icon name="mdi:close" size="25"/>
                        </div>
                    </div>
                    <div class="bg-white px-4 pb-4">
                        <div class="w-full">
                            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold my-4">
                                Usuários do Evento:
                                <span v-for="(user, index) in agendamento.users" :key="user.id">
                                    {{ user.name }}
                                    <span v-if="index < agendamento.users.length - 1">,</span>
                                </span>
                            </div>
                            <p class="block mt-1 text-lg leading-tight font-medium text-black my-4">
                                Data e Hora: {{ agendamento.datetime }} - {{ agendamento.time }}
                            </p>
                            <p class="mt-2 text-gray-500">Academia: {{ agendamento.academia.phone }}</p>
                            <ul class="max-w-md divide-y my-5  divide-gray-200">
                                <li class="pb-3 sm:pb-4 pt-5" v-for="user in agendamento.users">
      <div class="flex items-center space-x-4 rtl:space-x-reverse">
         <div class="flex-shrink-0">
            <img class="w-8 h-8 rounded-full" :src="user.image" alt="Neil image">
         </div>
         <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate ">
              {{  user.name }}
            </p>
            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
               {{ user.email }}
            </p>
         </div>
         <div class="inline-flex items-center text-base font-semibold text-green-500 cursor-pointer "  @click="presenca(user.id)" v-if="user.faltasEvento.some(falta => falta.event_id === agendamento.id)">
          Marcar Presença
         </div>
         <div v-else class="inline-flex items-center text-base font-semibold text-red-500 cursor-pointer " @click="miss(user.id)" >
          Marcar Falta
         </div>
      </div>
   </li>
                            </ul>
                            <div class="flex gap-4 mt-5">
                                <button @click="$emit('close')" class="flex items-center justify-center w-full py-3 rounded-full text-black font-semibold hover:bg-gray-100 focus:outline-none focus:ring-0 cursor-pointer">
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const props = defineProps(['agendamento'])
import { useAdminStore } from '~/stores/admin'
const { agendamento } = toRefs(props)
const adminStore = useAdminStore();

const miss = async (id) => {
    try {
        await adminStore.marcarFalta(id, agendamento.value.id)
        await adminStore.getAllAgendamentos()
    } catch(error) {
        console.log(error)
    }
 
}

const presenca  = async (id) => {
    try {
        await adminStore.marcarPresenca(id, agendamento.value.id)
        await adminStore.getAllAgendamentos()
    } catch(error) {
        console.log(error)
    }
}

</script>
