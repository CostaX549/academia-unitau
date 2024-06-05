<template>
    <VDatePicker 
      v-model="computedDate"
      
     
      :min-date="new Date()" 
    />
  </template>
  
  <script setup>
 
  import { useGeneralStore } from '~~/stores/general';
  
 
  const generalStore = useGeneralStore();


  

  const props = defineProps(['dateValue']);

  const { dateValue } = toRefs(props)
  

  const emits = defineEmits(['update:dateValue']);
  

  
 

 

  

  const computedDate = computed({
    get(value) {
      return value;
    },
    set(value) {
      emits('update:dateValue', value);
    }
  });
  

  
  
 

  

  </script>
  