<template>
  <div>
    <h1 class="text-center font-bold pb-2 mb-2 text-2xl sm:text-3xl lg:text-4xl text-white">Adicionar ou Remover Datas</h1>
    <div class="flex justify-center mb-5 max-sm:mb-18 ">
      <ClientOnly>
      <CalendarDatePicker :attributes="todos" v-model:dateValue="dateValue" :columns="columns"  />
    </ClientOnly>
    </div>
    <div class="flex justify-center mb-5 max-sm:mb-24 ">
      <button
        type="button"
        v-if="isAdd && dateValue"
        @click="addDate"
        class="rounded-lg flex items-center justify-center font-semibold transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 mt-2 mb-3 w-[500px] text-center p-3 px-6 bg-blue-500 hover:bg-blue-600 text-white"
      >
        <span>Adicionar</span>
        <span v-if="isLoading"><Icon class="animate-spin ml-1" name="mingcute:loading-line" size="20" /></span>
      </button>
      <button
        type="button"
        v-if="!isAdd && dateValue"
        :disabled="isLoading"
        :class="{ 'opacity-50': isLoading }"
        @click="removeDate"
        class="rounded-lg flex items-center justify-center transition font-semibold ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 mt-2 mb-3 w-[500px] text-center p-3 px-6 bg-red-500 hover:bg-red-600 text-white"
      >
        <span>Remover</span>
        <span v-if="isLoading"><Icon class="animate-spin ml-1" name="mingcute:loading-line" size="20" /></span>
      </button>
     
     
    </div>
    <AddSpecificDateModal
                v-if="showAddSpecificDate"
                @data="data = $event"
                @close="showAddSpecificDate = false; updateDates()"
                :date="dateValue"
            />
  </div>
</template>

<script setup>

import { useAdminStore } from '~/stores/admin';
import { useGeneralStore } from '~/stores/general';
import { useScreens } from 'vue-screen-utils';
import { useUserStore } from '~~/stores/user'
  
  const userStore = useUserStore();


const generalStore = useGeneralStore();

let dateValue = ref(null);
let isAdd = ref(false);
let isLoading = ref(false);
let showAddSpecificDate = ref(false)

const { mapCurrent } = useScreens({ xs: '0px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px' });
const columns = mapCurrent({ xl: 5, lg: 4, md: 3, sm: 2 }, 1);

let removedDates = ref([]);
let addedDates = ref([])

const todos = ref([]);

const updateDates = () => {
  removedDates.value = generalStore.removedDates.map(date => new Date(date));
  addedDates.value = generalStore.addedDates.map(date => new Date(date))
  todos.value = [

  {
    key: 'added',
    bar: 'blue',
    dates: addedDates.value,
    order: 1  
  }
   ,
    {
      key: 'removedDays',
      bar: 'red',
      dates: [{ repeat: { weekdays: generalStore.disabledDays } }],
   
     

    },
    {
      key: 'removed',
      bar: 'red',
      dates: removedDates.value
    },
   
  ];
};

watch(() => generalStore.disabledDays, () => {
  updateDates();
});

onMounted(async () => {
  try {
    await generalStore.getDisabledDays();
    await generalStore.getAddedDates();
    await generalStore.getRemovedDates();
    updateDates();
  } catch (error) {
    console.error(error);
  }
});

watch(dateValue, (newValue) => {
  if (newValue) {
    const newValueDate = new Date(newValue.getFullYear(), newValue.getMonth(), newValue.getDate());
    const isDateRemoved = removedDates.value.some(date => date.getTime() === newValueDate.getTime());

    if (isDateRemoved) {
      // Se a data foi removida, definimos isAdd como true para exibir o botão de remover
      isAdd.value = true;
    } else {
      const isDateAdded = addedDates.value.some(date => date.getTime() === newValueDate.getTime());
      if (isDateAdded) {
        // Se a data foi adicionada, definimos isAdd como false para exibir o botão de adicionar
        isAdd.value = false;
      } else {
        // Se a data não foi nem removida nem adicionada, verificamos se é um dia da semana desabilitado
        const selectedDayOfWeek = newValue.getDay() + 1;
        isAdd.value = generalStore.disabledDays.includes(selectedDayOfWeek);
      }
    }
  }
});

const addDate = async () => {
  const newValueDate = new Date(dateValue.value.getFullYear(), dateValue.value.getMonth(), dateValue.value.getDate());
  const isDateRemoved = removedDates.value.some(date => date.getTime() === newValueDate.getTime());

  if (isDateRemoved) {
    isLoading.value = true;
    const adminStore = useAdminStore();
    try {
      await adminStore.addDate(dateValue.value);
      await generalStore.getRemovedDates();
      isLoading.value = false;
      isAdd.value = false;
      updateDates();
    } catch (error) {
      console.error(error);
    }
  } else {
    showAddSpecificDate.value = true
   
  }
};

const removeDate = async () => {
  isLoading.value = true;
  const adminStore = useAdminStore();
  try {
    await adminStore.removeDate(dateValue.value);
    await generalStore.getRemovedDates();
    await generalStore.getAddedDates();
    isLoading.value = false;
    updateDates();
    isAdd.value = true;
  } catch (error) {
    console.error(error);
  }
};

</script>
