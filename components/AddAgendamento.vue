<template>
    <div id="AddLink" class="w-full bg-white rounded-3xl overflow-hidden">
        <div class="flex items-center justify-between pb-2 p-6">
         <div class="text-[19px] font-semibold">Adicionar Agendamento</div>
         <button
         @click="$emit('close')"
         class="flex items-center rounded-full p-1.5 hover:bg-[#EFF0EA]"
         >
          <Icon
           name="mdi:close"
           size="20"
           color="#676B5F"
           />
         </button>
        </div>
        <form 
       
           class="flex flex-col items-center gap-4 w-full pt-2 p-6"
        >
          <div class="w-full">
           
            <div class="py-1" />
        

           <CalendarDatePicker 
          v-model:dateValue="dateValue" 
          
       
          :disabled-dates="disabledDates"
          :attributes="attrs"
        
        />

      

      
  
            <div class="py-3" />
            <div class="flex flex-wrap gap-1 ">
              <Horarios
     
  
      :horarios="fakeHorarios"
    
      @update:horarioSelecionado="selectedHorario = $event"
    
    />
</div>
<div class="text-green-500 font-lg mt-5" v-if="vagas > 0">Vagas Restantes: {{ vagas }}</div>
<div class="mt-2" v-if="errors">
<span v-if="errors?.date"  class="text-red-500 text-[14px] font-semibold">
            {{ errors.date ? errors.date[0] : '' }}
        </span>
<span v-else-if="errors?.time"  class="text-red-500  text-[14px] font-semibold">
            {{ errors.time ? errors.time[0] : '' }}
        </span>
        <span v-else  class="text-red-500  text-[14px] font-semibold">
            {{ errors   }}
        </span>
      </div>
            <button
          type="button"
         
          @click="addLink()"
          class="rounded-full mt-5 w-full text-center p-3 px-6 bg-blue-500 hover:bg-blue-600 text-white"
          
        
          >
          Adicionar
          </button>
          
          </div>
         
          
        </form>
    </div>
</template>
<script setup>
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()
import { useGeneralStore } from '~~/stores/general'
const generalStore = useGeneralStore()
const emits = defineEmits(['close', 'update:selectedHorario'])




let selectedHorario = ref(null)
let dateValue = ref(null)
let horario = ref(null)
let errors = ref(null)
let vagas = ref(0)

let fakeHorarios = ref([])
let disabledDates = ref([  ]);
watch(selectedHorario, (newHorario) => {
    // Aqui você pode chamar a função desejada
    handleSelectedHorarioUpdate(newHorario);
});

const handleSelectedHorarioUpdate = async (newHorario) => {
let res = await userStore.getVagas(dateValue.value, selectedHorario.value);
vagas.value = res;
   
   
};

onMounted( async () => {
    try {
     await generalStore.getDisabledDays()
     await generalStore.getRemovedDates()
     await generalStore.getAddedDates()
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
  

   


  const attrs = ref([
    {
      key: 'today',
      highlight: {
        color: 'green',
        fillMode: 'solid'
      },
      dates: new Date()
    },
   
  ]);
 
watch(dateValue, async (newDate) => {

  try {
        const res = await generalStore.getDisponibleHours(newDate)
        fakeHorarios.value = res.data.horarios
        
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error)
      }


});





const addLink = async () => {
 
   errors.value = null
    try {
   
        await userStore.addAgendamento(dateValue.value, selectedHorario.value)
        await userStore.getAllAgendamentos()
        handleSelectedHorarioUpdate()
        setTimeout(() => { 
            emits('close')
           
        }, 100)
    } catch (error) {
      
        errors.value = error.response.data.errors
      
    }
}


</script>