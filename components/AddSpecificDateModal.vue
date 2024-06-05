<template>
    <div class="fixed z-50 h-full">
        <div class="fixed inset-0 bg-black bg-opacity-60"></div>
        <div class="fixed inset-0 z-10 overflow-auto h-full">
            <div class="flex flex-col min-h-full justify-center items-center py-2">

                <div
                    class="
                        transform
                        overflow-hidden
                        rounded-lg
                        bg-white
                        shadow-2xl
                        transition-all
                        max-w-lg
                        w-full
                    "
                >
                    <div class="flex items-center  py-4 border-b border-b-gray-300">
                        <div class="text-[22px] font-semibold w-full text-center">
                            Adicionar Data
                        </div>
                        <div
                            @click="$emit('close')"
                            class="absolute right-3 rounded-full p-1.5 bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        >
                            <Icon name="mdi:close" size="25"/>
                        </div>
                    </div>

                    <div class="flex items-center bg-white px-4 pb-4">
                        <div class="w-full">
                            <div class="my-4">
                                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
          Horário de Início
        </label>
                                <input 
          
            type="time" 
            v-model="openingTime" 
            class="rounded-lg w-full border-gray-200  mr-2"
          />
                </div> 
                            <div class="my-4">
                                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
          Horário de Fechamento
        </label>
                                <input 
          
          type="time" 
          v-model="closingTime" 
          class="rounded-lg w-full border-gray-200  mr-2"
        />
                </div> 

               

              
              
                          
                                <button
                                    @click="adicionar()"
                                    class="
                                        flex 
                                        items-center 
                                        justify-center 
                                      
                                        w-full 
                                        py-3 
                                        rounded-full 
                                        text-white 
                                        font-semibold 
                                        bg-blue-500
                                        hover:bg-blue-600
                                        mb-2
                                        cursor-pointer
                                    "
                                >
                                    Adicionar
                                </button>
                       

                           

                            <div class="flex gap-4">
                                <button
                                    @click="$emit('close')"
                                    type="button"
                                    class="
                                        flex 
                                        items-center 
                                        border 
                                        justify-center 
                                        w-full 
                                        py-3 
                                        rounded-full 
                                        text-black 
                                        font-semibold 
                                        hover:bg-gray-100
                                        focus:outline-none
                                        focus:ring-0
                                        cursor-pointer
                                    "
                                >
                                    Cancelar
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
  
  import { useAdminStore } from '~/stores/admin';
  import { useGeneralStore } from '~/stores/general';
    const emit = defineEmits(['close', 'data'])
    const adminStore = useAdminStore();
    const generalStore = useGeneralStore()
 const props = defineProps(['date'])
 const { date } = toRefs(props)

    let role = ref('user');
    let email = ref(null)
let name = ref(null)
let errors = ref(null)
let ra  = ref(null)
let openingTime = ref(null)
let closingTime = ref(null)


 
    const adicionar = async() => {
        errors.value = null
        
        try {
          await adminStore.addDate(date.value, openingTime.value, closingTime.value)
          await generalStore.getAddedDates()
          emit('close')
        } catch (error) {
        console.log(error)
   
    }

      
    }

 


</script>