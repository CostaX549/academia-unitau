<template>
  <h1 class="text-[40px] text-center font-bold pb-2 text-white">Editar Academia</h1>
  <div class="bg-white shadow-md rounded-lg px-8 pt-6 mb-10 flex flex-col my-2 ">
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-1/2 px-3 mb-6 md:mb-0">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
          Nome
        </label>
        <TextInput 
          placeholder="Nome"
          v-model:input="name"
          inputType="text"
          :error="errors && errors.name ? errors.name[0] : ''"
        />
      </div>
      <div class="md:w-1/2 px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
          Telefone
        </label>
        <TextInput 
          placeholder="Telefone"
          v-model:input="telefone"
          inputType="tel"
          :error="errors && errors.telefone ? errors.telefone[0] : ''"
        />
      </div>
    </div>
    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
          CAPACIDADE
        </label>
        <TextInput 
          placeholder="Número"
          v-model:input="capacidade"
          inputType="number"
          :error="errors && errors.capacidade ? errors.capacidade[0] : ''"
        />
      </div>
    </div>

    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
          MÁXIMO DE FALTAS
        </label>
        <TextInput 
          placeholder="Número"
          v-model:input="faltas"
          inputType="number"
          :error="errors && errors.faltas ? errors.faltas[0] : ''"
        />
      </div>
    </div>

    <div class="-mx-3 md:flex mb-6">
      <div class="md:w-full px-3">
        <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
          Dias da Semana
        </label>
        <div v-for="(day, index) in daysOfWeek" :key="index" class="flex items-center mb-2">
          <input type="checkbox" :id="day" v-model="selectedDays"  :value="day" class="rounded-md mr-2" />
          <label :for="day" class="w-[120px] text-[15px] font-semibold mr-4">{{ day }}</label>
         
          <input 
            v-if="selectedDays.includes(day)"
            type="time" 
            v-model="openingTimes[day]" 
            class="rounded-lg border-gray-200 w-[50%] mr-2"
          />
          <input 
            v-if="selectedDays.includes(day)"
            type="time" 
            class="rounded-lg  border-gray-200 w-[50%]"
            v-model="closingTimes[day]" 
          />
        </div>
      </div>
    </div>

    <div class="-mx-3 md:flex mb-3">
      <div class="md:w-full px-3">
        <button
          @click="showAddLinkFunc()"
          :disabled="isLoading"
          :class="isLoading ? 'opacity-50' : ''"
          class="flex items-center justify-center w-full py-3 rounded-lg text-white font-semibold bg-blue-500 hover:bg-blue-600"
        >
        <div class="flex items-center">
          <span >Editar Academia</span>
          <span v-if="isLoading"><Icon class="animate-spin ml-1" name="mingcute:loading-line" size="20" /></span>
        </div>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>

import { useAdminStore } from '~/stores/admin';
import { useGeneralStore } from '~/stores/general';
let telefone = ref("")
let name = ref("")
let capacidade = ref(null)
let selectedDays = ref([])
let openingTimes = ref({})
let errors = ref(null)
let faltas = ref(null)
let closingTimes = ref({})
let daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const isLoading = ref(false);

const adminStore = useAdminStore();

const generalStore = useGeneralStore();
const showAddLinkFunc = async () => {
  const payload = {
    name: name.value,
    phone: telefone.value,
    max_faltas: faltas.value,
    capacidade: capacidade.value,
    schedule: selectedDays.value.map(day => ({
      day,
      openingTime: openingTimes.value[day],
      closingTime: closingTimes.value[day]
    }))
  };

  isLoading.value = true;
  try {
    await adminStore.updateAcademia(payload);
    await generalStore.getDisabledDays()
    errors.value = null;
  } catch (error) {
    console.log(error);
    errors.value = error.response.data.errors;
  } finally {
    isLoading.value = false;
  }
}

const props = defineProps({
  academia: Object,
})

const { academia } = toRefs(props)
onMounted(() => {

  name.value = academia.value.name
  telefone.value = academia.value.phone
  capacidade.value = academia.value.capacidade
  faltas.value = academia.value.faltas

  academia.value.schedules.forEach(schedule => {
  
    selectedDays.value.push(schedule.day.name)
    openingTimes.value[schedule.day.name] = schedule.opening_time
    closingTimes.value[schedule.day.name] = schedule.closing_time
  })
})
</script>
