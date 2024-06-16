<template>
  <div class="flex flex-wrap gap-1">
    <button 
    type="button"
      v-for="(horario, index) in horarios"
      :key="index"
      @click="selectHorario(horario)"
      :class="{ 'bg-blue-500 text-white': horario === horarioSelecionado, 'bg-blue-50 text-blue-700': horario !== horarioSelecionado }"
      class="cursor-pointer inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ring-1 ring-inset ring-blue-700/10"
    >
      {{ horario }}
    </button>
 
  </div>
</template>

<script setup>


const props = defineProps(['horarios']);
let { horarios } = toRefs(props);

const horarioSelecionado = ref(null);


const emit = defineEmits(['update:horarioSelecionado']);

const selectHorario = async (horario) => {
 
  horarioSelecionado.value = horarioSelecionado.value === horario ? null : horario;
  emit('update:horarioSelecionado', horarioSelecionado.value);
}


</script>
