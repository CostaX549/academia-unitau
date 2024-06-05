<template>
    <div 
        id="AddLinkOverlay"
        class="fixed z-40 top-0 left-0 w-full h-full bg-white px-5"
    >
        <div class="flex items-center justify-start w-full py-[8px]">
            <button 
                type="button"
                @click="close()"
                class="rounded-full"
            >
                <Icon 
                    name="material-symbols:arrow-back-sharp" 
                    size="35" 
                    color="#676B5F" 
                />
            </button>

            <div class="text-lg font-semibold pl-8">Adicionar Agendamento</div>
        </div>

        <div class="text-2xl font-semibold pt-10">Coloque a Data</div>

        <form 
         
            class="flex flex-col items-center gap-4 w-full pt-4"
        >
            <div class="w-full">
                <div class="py-1" />
                <VDatePicker v-model="dateValue" expanded :attributes="attrs"   :disabled-dates="disabledDates" :min-date="new Date()"   class="my-custom-calendar"  />
  
            <div class="py-3" />
            <div class="flex flex-wrap gap-1">
              <Horarios
     
  
      :horarios="fakeHorarios"
    
      @update:horarioSelecionado="selectedHorario = $event"
    
    />
</div>
            </div>

            <button
          type="button"
          :disabled="!dateValue && !horario"
          @click="addLink()"
          class="rounded-full mt-5 w-full text-center p-3 px-6 bg-blue-500 hover:bg-blue-600 text-white"
          
        
          >
          Adicionar
          </button>
        </form>
    </div>
</template>

<script setup>

import { storeToRefs } from 'pinia';
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()
const { addLinkOverlay } = storeToRefs(userStore)
import { useGeneralStore } from '~~/stores/general'
const generalStore = useGeneralStore()
let disabledDates = ref([])



onMounted(async () =>  {
 
    userStore.hidePageOverflow(true, 'AdminPage')
    try {
          await generalStore.getDisabledDays()
          await generalStore.getAddedDates();
    await generalStore.getRemovedDates();       
         } catch(error) {
          console.log(error)
         }

         disabledDates.value = [
      {
        repeat: {
          weekdays: generalStore.disabledDays,
        },
      },
      ...generalStore.removedDates.map(date => ({
        start: new Date(date),
        end: new Date(date),
      })),
    ];

        
})

const close = () => addLinkOverlay.value = false




const emits = defineEmits(['close', 'update:selectedHorario'])
const dateValue = ref(null)

const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'green',
      fillMode: 'solid'
    },
    dates: new Date()
  },
 
])





let selectedHorario = ref(null)

let horario = ref(null)
let errors = ref(null)

let fakeHorarios = ref([])

const addLink = async () => {
    try {
        await userStore.addAgendamento(dateValue.value, selectedHorario.value)
        await userStore.getAllAgendamentos()
        setTimeout(() => { 
           
            addLinkOverlay.value = false
        }, 100)
    } catch (error) {
        console.log(error)
        errors.value = error.response.data.errors
    }
}

watch(dateValue, async (newDate) => {

try {
      const res = await generalStore.getDisponibleHours(newDate)
      fakeHorarios.value = res.data.horarios
   
    } catch (error) {
      console.error('Erro ao buscar horários disponíveis:', error)
    }


});

onUnmounted(() => {
    userStore.hidePageOverflow(false, 'AdminPage')
    addLinkOverlay.value = false
})
</script>